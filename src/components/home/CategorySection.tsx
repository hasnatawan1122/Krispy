"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Pizza, Flame, Beef, Sandwich, Tag, Smile } from "lucide-react";

export default function CategorySection() {
  const categoryTiles = [
    {
      id: "pizzas",
      title: "Gourmet Pizzas",
      subtitle: "10 delicious recipes",
      image: "/images/krispy-featured-pizza.png",
      tag: "Small • Med • Large",
      icon: Pizza,
    },
    {
      id: "burgers",
      title: "Burgers & Rolls",
      subtitle: "Zester & Chapli",
      image: "/images/krispy-featured-burger.png",
      tag: "Crispy Fried",
      icon: Beef,
    },
    {
      id: "wings",
      title: "Crispy Wings",
      subtitle: "Hot & Flaming styles",
      image: "/images/krispy-wings-fries-deal.png",
      tag: "10 & 20 pcs",
      icon: Flame,
    },
    {
      id: "sides",
      title: "Sides & Parathas",
      subtitle: "Loaded fries, rolls & wraps",
      image: "/images/sides/loaded-fries.png",
      tag: "Snack Time",
      icon: Sandwich,
    },
    {
      id: "deals",
      title: "Jumbo & Combos",
      subtitle: "Full feasts from Rs. 650",
      image: "/images/deals/deal-17-family.png",
      tag: "Best Value",
      icon: Tag,
    },
    {
      id: "kids",
      title: "Happy Kiddy Meals",
      subtitle: "Nuggets, juice + free toy",
      image: "/images/krispy-kids-meal.png",
      tag: "Free Toy Included",
      icon: Smile,
    },
  ];

  return (
    <section className="py-14 bg-krispy-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-krispy-orange uppercase tracking-wider mb-1">
              <span>EXPLORE BY CATEGORY</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-krispy-dark">
              What Are You Craving Today?
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-xs sm:text-sm font-bold text-krispy-orange hover:text-krispy-orange-hover flex items-center gap-1 transition group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Category Grid (Responsive: 2 on mobile, 3 on tablet, 6 on desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
          {categoryTiles.map((cat) => (
            <Link
              key={cat.id}
              href={`/menu?category=${cat.id}`}
              className="group bg-white rounded-3xl p-3 sm:p-4 border border-gray-100 card-shadow card-shadow-hover flex flex-col items-center text-center transition-all"
            >
              {/* Image Circle / Container */}
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden bg-orange-50/50 mb-3 group-hover:scale-105 transition-transform">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 640px) 100px, 120px"
                  className="object-cover"
                />
              </div>

              {/* Tag */}
              <span className="text-[10px] font-semibold text-krispy-orange uppercase tracking-wider mb-1">
                {cat.tag}
              </span>

              {/* Title */}
              <h3 className="font-display font-bold text-xs sm:text-sm text-krispy-dark leading-tight group-hover:text-krispy-orange transition-colors">
                {cat.title}
              </h3>

              {/* Subtitle */}
              <p className="text-[11px] text-krispy-muted mt-0.5 line-clamp-1">
                {cat.subtitle}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

