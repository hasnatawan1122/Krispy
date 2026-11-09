"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { formatCurrency } from "@/lib/currency";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function CartDrawer() {
  const isCartOpen = useCartStore((state) => state.isCartOpen);
  const closeCart = useCartStore((state) => state.closeCart);
  const items = useCartStore((state) => state.items);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);
  const clearCart = useCartStore((state) => state.clearCart);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const openCheckout = useUiStore((state) => state.openCheckout);

  if (!isCartOpen) return null;

  const subtotal = hasHydrated ? getSubtotal() : 0;
  const currentItems = hasHydrated ? items : [];

  const handleProceedToCheckout = () => {
    closeCart();
    openCheckout();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col h-full animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="px-5 py-4 bg-krispy-dark text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-full bg-krispy-orange/20 text-krispy-orange">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-display font-bold text-lg leading-tight">Your Cart</h2>
                <p className="text-xs text-gray-400">
                  {currentItems.length} {currentItems.length === 1 ? "item" : "items"} selected
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {currentItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-xs text-gray-400 hover:text-rose-400 transition flex items-center gap-1 px-2 py-1 rounded"
                  title="Clear all items"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear
                </button>
              )}
              <button
                onClick={closeCart}
                aria-label="Close Cart"
                className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 divide-y divide-gray-100">
            {currentItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 px-4">
                <div className="w-20 h-20 rounded-full bg-orange-50 text-krispy-orange flex items-center justify-center mb-4">
                  <ShoppingBag className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="font-display font-bold text-xl text-krispy-dark mb-1">
                  Your cart is hungry!
                </h3>
                <p className="text-sm text-krispy-muted max-w-xs mb-6">
                  Explore our mouthwatering pizzas, crispy burgers, wings, and combo deals.
                </p>
                <Link
                  href="/menu"
                  onClick={closeCart}
                  className="px-6 py-3 rounded-full bg-krispy-orange hover:bg-krispy-orange-hover text-white font-semibold text-sm shadow-md transition-transform hover:scale-105"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              currentItems.map((item) => (
                <div key={item.cartItemId} className="py-4 first:pt-0 flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-100">
                    <Image
                      src={item.menuItem.image}
                      alt={item.menuItem.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-display font-semibold text-sm sm:text-base text-krispy-dark leading-tight">
                        {item.menuItem.name}
                      </h4>
                      <button
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-gray-300 hover:text-rose-500 transition p-1"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {item.sizeLabel && (
                      <span className="inline-block mt-0.5 text-xs font-semibold px-2 py-0.5 rounded bg-orange-100 text-krispy-orange">
                        Size: {item.sizeLabel}
                      </span>
                    )}

                    {item.selectedExtras && item.selectedExtras.length > 0 && (
                      <div className="mt-1 text-xs text-krispy-muted">
                        {item.selectedExtras.map((e) => (
                          <div key={e.id} className="text-[11px] text-gray-500">
                            + {e.name} ({formatCurrency(e.price)})
                          </div>
                        ))}
                      </div>
                    )}

                    {item.specialInstructions && (
                      <p className="text-[11px] text-gray-500 italic mt-0.5 line-clamp-1">
                        &quot;{item.specialInstructions}&quot;
                      </p>
                    )}

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-3 pt-1">
                      <span className="font-bold text-sm text-krispy-dark">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>

                      <div className="flex items-center gap-2 border border-gray-200 rounded-full bg-gray-50 px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 text-krispy-dark transition"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full hover:bg-gray-200 text-krispy-dark transition"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {currentItems.length > 0 && (
            <div className="p-5 bg-gray-50 border-t border-gray-200 space-y-3">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-krispy-muted">
                  <span>Subtotal</span>
                  <span className="font-semibold text-krispy-dark">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                <div className="flex justify-between text-xs text-krispy-muted">
                  <span>Delivery Charges</span>
                  <span className="text-krispy-orange font-medium">To be confirmed</span>
                </div>
                <p className="text-[11px] text-gray-400 italic">
                  *{RESTAURANT_INFO.deliveryDisclaimer}
                </p>
              </div>

              <div className="pt-2 border-t border-gray-200 flex justify-between items-center">
                <span className="font-display font-bold text-base text-krispy-dark">
                  Order Total
                </span>
                <span className="font-display font-extrabold text-xl text-krispy-orange">
                  {formatCurrency(subtotal)}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                <span>Proceed to WhatsApp Checkout</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

