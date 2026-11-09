"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Utensils, Tag, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/store/cart-store";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const itemCount = hasHydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Menu", href: "/menu", icon: Utensils },
    { label: "Deals", href: "/deals", icon: Tag },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200/80 px-2 py-2 shadow-lg pb-safe">
      <div className="grid grid-cols-4 items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center py-1 transition-colors ${
                isActive
                  ? "text-krispy-orange font-bold scale-105"
                  : "text-krispy-muted hover:text-krispy-dark"
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[11px] leading-tight">{item.label}</span>
            </Link>
          );
        })}

        {/* Cart button */}
        <button
          onClick={openCart}
          className="flex flex-col items-center justify-center py-1 text-krispy-dark hover:text-krispy-orange transition-colors relative"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 mb-0.5" />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-krispy-orange text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow">
                {itemCount}
              </span>
            )}
          </div>
          <span className="text-[11px] font-medium leading-tight">Cart</span>
        </button>
      </div>
    </div>
  );
}

