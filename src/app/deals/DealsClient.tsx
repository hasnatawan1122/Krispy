"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Tag, Users, Moon, Smile, Sparkles, AlertCircle } from "lucide-react";
import { MENU_ITEMS } from "@/data/menu";
import DealCard from "@/components/deals/DealCard";

export default function DealsClient() {
  const [activeTab, setActiveTab] = useState<
    "all" | "jumbo" | "regular" | "family" | "midnight" | "kids"
  >("all");

  const jumboDeals = MENU_ITEMS.filter((item) => item.dealType === "jumbo");
  const regularDeals = MENU_ITEMS.filter(
    (item) => item.dealType === "regular" && !item.id.includes("family") && !item.id.includes("big-meal")
  );
  const familyDeals = MENU_ITEMS.filter((item) => item.dealType === "family");
  const midnightDeals = MENU_ITEMS.filter((item) => item.dealType === "midnight");
  const kidsDeals = MENU_ITEMS.filter((item) => item.category === "kids");

  const filteredDeals = MENU_ITEMS.filter((item) => {
    if (activeTab === "all") return item.isDeal || item.category === "kids";
    if (activeTab === "kids") return item.category === "kids";
    return item.dealType === activeTab;
  });

  return (
    <div className="py-8 sm:py-12 bg-krispy-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-xs font-bold text-krispy-orange">
            <Tag className="w-3.5 h-3.5" />
            <span>FANTASTIC RESTAURANT OFFERS</span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-krispy-dark">
            Special Deals & Combos
          </h1>
          <p className="text-xs sm:text-sm text-krispy-muted">
            Enjoy maximum flavor and great value with our classic Jumbo Deals, Family Feasts, Midnight Specials, and Kids Meals.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pb-6 mb-4">
          {[
            { id: "all", label: "All Deals", count: 16 },
            { id: "jumbo", label: "Jumbo Deals (1-6)", count: 6 },
            { id: "family", label: "Family Feasts", count: 3 },
            { id: "regular", label: "Regular Combos", count: 5 },
            { id: "midnight", label: "Midnight Offers", count: 2 },
            { id: "kids", label: "Happy Kiddy Meals", count: 3 },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-krispy-orange text-white shadow-md scale-105"
                    : "bg-white text-krispy-dark hover:bg-orange-50 border border-gray-200"
                }`}
              >
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Jumbo Deal Notice */}
        {(activeTab === "all" || activeTab === "jumbo") && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Jumbo Deal Pizza Note:</strong> Specialty and premium crust pizzas (such as Crown Crust, Chapli Kabab, Super Supreme, Extreme, Behari, and Bonefire Crust) are excluded from Jumbo Deals. Classic pizza recipes apply.
            </p>
          </div>
        )}

        {/* Midnight Deal Notice */}
        {(activeTab === "all" || activeTab === "midnight") && (
          <div className="mb-8 p-4 rounded-2xl bg-purple-900 text-white flex items-center justify-between gap-4 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center text-krispy-yellow flex-shrink-0">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white">
                  Midnight Hours: 11:00 PM – 2:00 AM
                </h3>
                <p className="text-xs text-purple-200">
                  Special midnight discounts are active every night during the late hours!
                </p>
              </div>
            </div>
            <span className="hidden sm:inline-block text-xs font-bold px-3 py-1 rounded-full bg-krispy-yellow text-krispy-dark">
              Available Nightly
            </span>
          </div>
        )}

        {/* Deals Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDeals.map((deal) => (
            <DealCard key={deal.id} deal={deal} />
          ))}
        </div>
      </div>
    </div>
  );
}

