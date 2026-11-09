"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Plus, Check, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import { MenuItem } from "@/types/menu";
import { useCartStore } from "@/store/cart-store";
import { useUiStore } from "@/store/ui-store";
import { formatCurrency } from "@/lib/currency";

interface DealCardProps {
  deal: MenuItem;
  featured?: boolean;
}

export default function DealCard({ deal, featured = false }: DealCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const openCustomization = useUiStore((state) => state.openCustomization);
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(deal, { quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <div
      onClick={() => openCustomization(deal)}
      className={`group bg-white rounded-3xl p-4 sm:p-5 border border-gray-100 card-shadow card-shadow-hover flex flex-col justify-between cursor-pointer relative overflow-hidden ${
        featured ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-white via-orange-50/20 to-white" : ""
      }`}
    >
      <div>
        {/* Media Container */}
        <div className={`relative w-full rounded-2xl overflow-hidden bg-gray-100 mb-4 ${featured ? "aspect-[16/9] sm:aspect-[21/9]" : "aspect-[16/10]"}`}>
          <Image
            src={deal.image}
            alt={deal.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge */}
          {deal.badge && (
            <span className="absolute top-3 left-3 bg-krispy-orange text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {deal.badge}
            </span>
          )}

          {/* Time restriction */}
          {deal.timeRestricted && (
            <span className="absolute top-3 right-3 bg-krispy-dark text-krispy-yellow text-xs font-bold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
              <Clock className="w-3 h-3 text-krispy-yellow" />
              {deal.timeRestricted.label}
            </span>
          )}

          {/* Price badge overlaid on image */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl shadow-lg border border-white">
            <span className="font-display font-extrabold text-base sm:text-lg text-krispy-dark">
              {formatCurrency(deal.price || 0)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-2">
          <h3 className="font-display font-extrabold text-lg sm:text-xl text-krispy-dark group-hover:text-krispy-orange transition-colors">
            {deal.name}
          </h3>

          <p className="text-xs sm:text-sm text-krispy-muted leading-relaxed">
            {deal.description}
          </p>

          {/* Included Items */}
          {deal.includedItems && deal.includedItems.length > 0 && (
            <div className="pt-2 pb-1 space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-krispy-dark">
                Package Includes:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                {deal.includedItems.map((inc, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 text-xs text-krispy-dark/90 bg-gray-50 px-2.5 py-1.5 rounded-lg border border-gray-100"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    <span className="font-medium truncate">{inc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer CTA */}
      <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] text-krispy-muted block leading-none">Deal Price</span>
          <span className="font-display font-extrabold text-xl text-krispy-orange">
            {formatCurrency(deal.price || 0)}
          </span>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md ${
            added
              ? "bg-emerald-600 text-white"
              : "bg-krispy-orange hover:bg-krispy-orange-hover text-white shadow-orange-500/20 hover:scale-105 active:scale-95"
          }`}
        >
          {added ? (
            <>
              <Check className="w-4 h-4 stroke-[3]" />
              <span>Deal Added!</span>
            </>
          ) : (
            <>
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>Add to Order</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}

