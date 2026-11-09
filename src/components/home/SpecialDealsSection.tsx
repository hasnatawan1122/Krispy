"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Tag, Users } from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";
import DealCard from "@/components/deals/DealCard";

export default function SpecialDealsSection() {
  // Select top jumbo & family deals
  const dealIds = [
    "deal-17-family", // Family Deal 5 Zester burgers + 5 Fries + 1.5L drink
    "deal-jumbo-2",   // 1 Medium Pizza + 10 Hot Wings + 0.5L drink
    "deal-18-family", // 10 Pieces Chicken + 5 Fries + 1.5L drink
    "deal-jumbo-6",   // 2 Large Pizzas + 1.5L Coke
  ];

  const deals = MENU_ITEMS.filter((item) => dealIds.includes(item.id));

  return (
    <section className="py-16 bg-krispy-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-krispy-orange uppercase tracking-wider mb-1">
              <Users className="w-3.5 h-3.5 text-krispy-orange" />
              <span>PERFECT FOR GATHERINGS</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-krispy-dark">
              Jumbo Combos & Family Meals
            </h2>
          </div>
          <Link
            href="/deals"
            className="text-xs sm:text-sm font-bold text-krispy-orange hover:text-krispy-orange-hover flex items-center gap-1 transition group"
          >
            <span>Explore All Deals</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {deals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </section>
  );
}

