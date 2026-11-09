"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Clock, Plus, Check } from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";
import { useCartStore } from "@/store/cart-store";
import { formatCurrency } from "@/lib/currency";

export default function MidnightDealSection() {
  const addItem = useCartStore((state) => state.addItem);
  const [addedId, setAddedId] = useState<string | null>(null);
  const [isCurrentlyMidnightTime, setIsCurrentlyMidnightTime] = useState(false);

  useEffect(() => {
    // Check if client local time is between 23:00 and 02:00
    const now = new Date();
    const hour = now.getHours();
    setIsCurrentlyMidnightTime(hour >= 23 || hour < 2);
  }, []);

  const midnightDeals = MENU_ITEMS.filter((item) => item.dealType === "midnight");

  const handleQuickAdd = (deal: typeof midnightDeals[0]) => {
    addItem(deal, { quantity: 1 });
    setAddedId(deal.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  return (
    <section className="py-16 bg-[#161719] text-white relative overflow-hidden">
      {/* Subtle night-time ambient lighting */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-purple-900/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-krispy-orange/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs font-bold text-krispy-yellow">
            <Moon className="w-3.5 h-3.5 text-krispy-yellow animate-pulse" />
            <span>LATE NIGHT EXCLUSIVE</span>
          </div>
          <h2 className="font-display font-black text-3xl sm:text-4xl text-white">
            Midnight Cravings?
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Satisfy late-night hunger with special midnight-only pricing. Freshly baked and sizzling hot until 2:00 AM.
          </p>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-300">
            <Clock className="w-3.5 h-3.5 text-krispy-orange" />
            <span>Available daily from <strong>11:00 PM to 2:00 AM</strong></span>
            {isCurrentlyMidnightTime && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping ml-1" />
            )}
          </div>
        </div>

        {/* 2 Actual Midnight Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {midnightDeals.map((deal) => (
            <div
              key={deal.id}
              className="bg-[#202225] border border-white/10 rounded-3xl p-5 hover:border-krispy-orange/50 transition-all hover:shadow-2xl flex flex-col justify-between group"
            >
              <div>
                {/* Media banner */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/40 mb-4">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-purple-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Moon className="w-3 h-3" />
                    11 PM – 2 AM
                  </span>
                </div>

                {/* Details */}
                <h3 className="font-display font-extrabold text-xl text-white group-hover:text-krispy-yellow transition-colors">
                  {deal.name}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                  {deal.description}
                </p>

                {/* Included items */}
                {deal.includedItems && (
                  <div className="mt-3 inline-block px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-gray-300 font-medium">
                    Includes: {deal.includedItems.join(" + ")}
                  </div>
                )}
              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase tracking-wider">
                    Midnight Price
                  </span>
                  <span className="font-display font-extrabold text-2xl text-krispy-yellow">
                    {formatCurrency(deal.price || 0)}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickAdd(deal)}
                  className={`px-5 py-2.5 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-1.5 transition-all shadow-md ${
                    addedId === deal.id
                      ? "bg-emerald-600 text-white"
                      : "bg-krispy-orange hover:bg-krispy-orange-hover text-white shadow-orange-500/20 hover:scale-105 active:scale-95"
                  }`}
                >
                  {addedId === deal.id ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4 stroke-[3]" />
                      <span>Order Midnight Deal</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

