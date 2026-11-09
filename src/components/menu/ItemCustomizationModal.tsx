"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X, Plus, Minus, Check, ShoppingBag, Info } from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { EXTRAS } from "@/data/menu";
import { formatCurrency } from "@/lib/currency";
import { PizzaSize } from "@/types/menu";

export default function ItemCustomizationModal() {
  const item = useUiStore((state) => state.customizingItem);
  const isOpen = useUiStore((state) => state.isCustomizingOpen);
  const closeModal = useUiStore((state) => state.closeCustomization);

  const addItemToCart = useCartStore((state) => state.addItem);

  // Local customization states
  const [selectedSize, setSelectedSize] = useState<PizzaSize | undefined>(undefined);
  const [selectedExtraIds, setSelectedExtraIds] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Initialize modal state when opened
  useEffect(() => {
    if (item) {
      if (item.sizePrices && item.sizePrices.length > 0) {
        // default to medium if available, or first available size
        const defaultChoice =
          item.sizePrices.find((s) => s.size === item.defaultSize) ||
          item.sizePrices[0];
        setSelectedSize(defaultChoice.size);
      } else {
        setSelectedSize(undefined);
      }
      setSelectedExtraIds([]);
      setQuantity(1);
      setSpecialInstructions("");
    }
  }, [item]);

  if (!isOpen || !item) return null;

  // Compute current base price
  let basePrice = item.price || 0;
  let sizeLabel = "";
  if (item.sizePrices && selectedSize) {
    const matched = item.sizePrices.find((s) => s.size === selectedSize);
    if (matched) {
      basePrice = matched.price;
      sizeLabel = matched.label;
    }
  }

  // Filter allowed extras
  const availableExtras = EXTRAS.filter((extra) =>
    item.allowedExtras ? item.allowedExtras.includes(extra.id) : false
  );

  // Compute extra item pricing
  const getExtraPrice = (extra: typeof EXTRAS[0]) => {
    if (extra.pizzaPrices && selectedSize) {
      return extra.pizzaPrices[selectedSize];
    }
    return extra.price;
  };

  const selectedExtrasList = availableExtras
    .filter((e) => selectedExtraIds.includes(e.id))
    .map((e) => ({
      id: e.id,
      name: e.name,
      price: getExtraPrice(e),
    }));

  const extrasTotal = selectedExtrasList.reduce((sum, e) => sum + e.price, 0);
  const unitPrice = basePrice + extrasTotal;
  const totalPrice = unitPrice * quantity;

  const toggleExtra = (extraId: string) => {
    setSelectedExtraIds((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  const handleAddToCart = () => {
    addItemToCart(item, {
      size: selectedSize,
      sizeLabel: sizeLabel || undefined,
      sizePrice: basePrice,
      selectedExtras: selectedExtrasList,
      specialInstructions: specialInstructions.trim() || undefined,
      quantity,
    });
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
        {/* Header with image */}
        <div className="relative h-48 sm:h-56 w-full bg-gray-100 flex-shrink-0">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Close button */}
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 text-white backdrop-blur-md transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Item Title on overlay */}
          <div className="absolute bottom-3 left-4 right-4 text-white">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-krispy-orange/90 inline-block mb-1">
              {item.category.toUpperCase()}
            </span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl leading-tight">
              {item.name}
            </h2>
          </div>
        </div>

        {/* Scrollable Configuration Body */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Description */}
          {item.description && (
            <p className="text-sm text-krispy-muted leading-relaxed">
              {item.description}
            </p>
          )}

          {/* Included Items for Deals */}
          {item.includedItems && item.includedItems.length > 0 && (
            <div className="p-3.5 rounded-2xl bg-orange-50/80 border border-orange-100 space-y-1.5">
              <span className="text-xs font-bold text-krispy-orange uppercase tracking-wide flex items-center gap-1">
                <Info className="w-3.5 h-3.5" /> What&apos;s Included:
              </span>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs text-krispy-dark">
                {item.includedItems.map((inc, i) => (
                  <li key={i} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-krispy-orange" />
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Size Selector (If pizza/sized product) */}
          {item.sizePrices && item.sizePrices.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-krispy-dark">
                  Select Size <span className="text-krispy-orange">*</span>
                </label>
                <span className="text-xs text-krispy-muted">Choose 1</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {item.sizePrices.map((sizeOpt) => {
                  const isSelected = selectedSize === sizeOpt.size;
                  return (
                    <button
                      key={sizeOpt.size}
                      type="button"
                      onClick={() => setSelectedSize(sizeOpt.size)}
                      className={`p-3 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? "border-krispy-orange bg-orange-50 text-krispy-dark shadow-sm ring-2 ring-krispy-orange/30"
                          : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs capitalize">
                          {sizeOpt.label}
                        </span>
                        {isSelected && (
                          <span className="w-4 h-4 rounded-full bg-krispy-orange text-white flex items-center justify-center">
                            <Check className="w-2.5 h-2.5 stroke-[3]" />
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-bold text-krispy-orange">
                        {formatCurrency(sizeOpt.price)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extras & Add-ons */}
          {availableExtras.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <label className="text-sm font-bold text-krispy-dark">
                  Add Extras & Dips (Optional)
                </label>
                <span className="text-xs text-krispy-muted">Customize</span>
              </div>
              <div className="space-y-2">
                {availableExtras.map((extra) => {
                  const isSelected = selectedExtraIds.includes(extra.id);
                  const extraPrice = getExtraPrice(extra);
                  return (
                    <button
                      key={extra.id}
                      type="button"
                      onClick={() => toggleExtra(extra.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        isSelected
                          ? "border-krispy-orange bg-orange-50/70 text-krispy-dark"
                          : "border-gray-200 hover:bg-gray-50 text-gray-700"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                            isSelected
                              ? "bg-krispy-orange border-krispy-orange text-white"
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span className="text-sm font-medium">{extra.name}</span>
                      </div>
                      <span className="text-xs font-bold text-krispy-orange">
                        +{formatCurrency(extraPrice)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-krispy-dark">
              Special Instructions (e.g. less spicy, no ketchup)
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="Any requests for the kitchen?"
              maxLength={120}
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
            />
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="p-4 sm:p-5 bg-gray-50 border-t border-gray-100 flex items-center justify-between gap-4 flex-shrink-0">
          {/* Quantity selector */}
          <div className="flex items-center gap-2.5 bg-white border border-gray-200 rounded-full px-3 py-1.5 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-krispy-dark disabled:opacity-30 transition"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-sm font-bold w-5 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 text-krispy-dark transition"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            onClick={handleAddToCart}
            className="flex-1 py-3 px-5 rounded-full bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-sm shadow-md transition-all flex items-center justify-between active:scale-95"
          >
            <span className="flex items-center gap-1.5">
              <ShoppingBag className="w-4 h-4" />
              Add to Cart
            </span>
            <span>{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

