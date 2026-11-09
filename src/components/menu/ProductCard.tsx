"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check, Sparkles, SlidersHorizontal } from "lucide-react";
import { MenuItem, PizzaSize } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { formatCurrency } from "@/lib/currency";

interface ProductCardProps {
  item: MenuItem;
}

export default function ProductCard({ item }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCustomization = useUiStore((state) => state.openCustomization);

  // For pizzas with size choices on card
  const [selectedSize, setSelectedSize] = useState<PizzaSize | undefined>(
    item.sizePrices ? item.defaultSize || item.sizePrices[0]?.size : undefined
  );
  const [justAdded, setJustAdded] = useState(false);

  // Compute current display price
  let currentPrice = item.price || 0;
  let currentSizeLabel = "";
  if (item.sizePrices && selectedSize) {
    const sizeObj = item.sizePrices.find((s) => s.size === selectedSize);
    if (sizeObj) {
      currentPrice = sizeObj.price;
      currentSizeLabel = sizeObj.label;
    }
  }

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();

    // If item has allowed extras, opening customization is great, but quick add works directly too!
    addItem(item, {
      size: selectedSize,
      sizeLabel: currentSizeLabel || undefined,
      sizePrice: currentPrice,
      quantity: 1,
    });

    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => openCustomization(item)}
      className="group bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 card-shadow card-shadow-hover flex flex-col justify-between cursor-pointer relative overflow-hidden"
    >
      {/* Top Media Container */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50 mb-3">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badge */}
        {item.badge && (
          <span className="absolute top-2.5 left-2.5 bg-krispy-orange text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            {item.badge}
          </span>
        )}

        {/* Time restriction tag */}
        {item.timeRestricted && (
          <span className="absolute top-2.5 right-2.5 bg-krispy-dark/90 backdrop-blur-md text-krispy-yellow text-[10px] font-bold px-2 py-0.5 rounded-md shadow">
            {item.timeRestricted.label}
          </span>
        )}

        {/* Quick Customize Hint on hover */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3 py-1.5 rounded-full bg-white text-krispy-dark text-xs font-bold shadow-lg flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-krispy-orange" />
            Customize
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-1 mb-1">
            <h3 className="font-display font-bold text-sm sm:text-base text-krispy-dark leading-snug group-hover:text-krispy-orange transition-colors">
              {item.name}
            </h3>
          </div>

          <p className="text-xs text-krispy-muted line-clamp-2 mb-3 leading-relaxed">
            {item.description}
          </p>

          {/* Deal Included items summary */}
          {item.includedItems && (
            <div className="mb-3 space-y-0.5">
              {item.includedItems.slice(0, 2).map((inc, i) => (
                <div key={i} className="text-[11px] text-gray-500 flex items-center gap-1 truncate">
                  <span className="w-1 h-1 rounded-full bg-krispy-orange flex-shrink-0" />
                  <span className="truncate">{inc}</span>
                </div>
              ))}
              {item.includedItems.length > 2 && (
                <span className="text-[10px] text-krispy-orange font-semibold">
                  +{item.includedItems.length - 2} more items
                </span>
              )}
            </div>
          )}
        </div>

        {/* Size Selection Pills (If Pizza) */}
        {item.sizePrices && item.sizePrices.length > 0 && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-1 mb-3 overflow-x-auto no-scrollbar py-0.5"
          >
            {item.sizePrices.map((s) => (
              <button
                key={s.size}
                type="button"
                onClick={() => setSelectedSize(s.size)}
                className={`text-[10px] sm:text-xs font-semibold px-2 py-0.5 rounded-lg border transition-all ${
                  selectedSize === s.size
                    ? "bg-krispy-orange text-white border-krispy-orange shadow-sm"
                    : "bg-gray-50 text-gray-600 border-gray-200 hover:border-gray-300"
                }`}
              >
                {s.size.charAt(0).toUpperCase() + s.size.slice(1)}
              </button>
            ))}
          </div>
        )}

        {/* Price & Add to Cart Button */}
        <div className="pt-2 border-t border-gray-50 flex items-center justify-between gap-2">
          <div className="flex flex-col">
            <span className="text-[10px] text-krispy-muted font-medium">Price</span>
            <span className="font-display font-extrabold text-sm sm:text-base text-krispy-dark">
              {formatCurrency(currentPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`px-3 sm:px-4 py-2 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-sm ${
              justAdded
                ? "bg-emerald-600 text-white scale-105"
                : "bg-krispy-orange hover:bg-krispy-orange-hover text-white hover:shadow-orange-500/20 hover:scale-105 active:scale-95"
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span className="hidden sm:inline">Added</span>
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 stroke-[3]" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

