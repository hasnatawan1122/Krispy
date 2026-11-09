"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Flame } from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";
import ProductCard from "@/components/menu/ProductCard";

export default function FeaturedMenuSection() {
  // Select authentic featured items representing different categories
  const featuredIds = [
    "pizza-crown-crust",
    "pizza-chapli-kabab",
    "deal-14",
    "side-loaded-fries",
    "deal-13",
    "side-pizza-paratha",
  ];

  const featuredItems = MENU_ITEMS.filter((item) =>
    featuredIds.includes(item.id)
  );

  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-krispy-orange uppercase tracking-wider mb-1">
              <Flame className="w-3.5 h-3.5 text-krispy-orange" />
              <span>HAND-PICKED FAVORITES</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-krispy-dark">
              Featured Restaurant Delights
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs sm:text-sm font-bold text-krispy-orange hover:text-krispy-orange-hover flex items-center gap-1 transition group"
          >
            <span>See Complete Menu</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Responsive Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3.5 sm:gap-6">
          {featuredItems.map((item) => (
            <ProductCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

