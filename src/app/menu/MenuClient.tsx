"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, X, Sparkles, Filter, Smile } from "lucide-react";
import { MENU_ITEMS, CATEGORIES } from "@/data/menu";
import ProductCard from "@/components/menu/ProductCard";
import MainMenuCard from "@/components/menu/MainMenuCard";
import { CategoryId } from "@/types/menu";

export default function MenuClient() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category") as CategoryId | null;

  const [activeCategory, setActiveCategory] = useState<CategoryId>(
    categoryParam || "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [categoryParam]);

  // Filter items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      // Category match
      const matchesCategory =
        activeCategory === "all" || item.category === activeCategory;

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        item.name.toLowerCase().includes(query) ||
        (item.description && item.description.toLowerCase().includes(query)) ||
        (item.includedItems &&
          item.includedItems.some((inc) => inc.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="py-8 sm:py-12 bg-krispy-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Title & Search Header */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-krispy-orange uppercase tracking-wider block mb-1">
                OUR DELICIOUS SELECTION
              </span>
              <h1 className="font-display font-black text-3xl sm:text-4xl text-krispy-dark">
                Krispy Food Menu
              </h1>
              <p className="text-xs sm:text-sm text-krispy-muted mt-1">
                Real fried chicken, authentic pizzas, loaded sides & special deals in Vehari.
              </p>
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for something tasty..."
                className="w-full pl-10 pr-9 py-2.5 rounded-full bg-white border border-gray-200 text-sm focus:outline-none focus:border-krispy-orange focus:ring-2 focus:ring-krispy-orange/20 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-krispy-dark"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Interactive Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 border-b border-gray-200/80">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryId)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isActive
                      ? "bg-krispy-orange text-white shadow-md scale-105"
                      : "bg-white text-krispy-dark hover:bg-orange-50/50 border border-gray-200/80"
                  }`}
                >
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Main Deals Menu Card (High Quality Flyer Preview) */}
        {(!searchQuery || activeCategory === "all" || activeCategory === "deals") && (
          <MainMenuCard />
        )}

        {/* Kids Promotion Highlight Banner if Kids category or All */}
        {(activeCategory === "kids" || activeCategory === "all") && (
          <div className="mb-8 rounded-3xl p-4 sm:p-6 bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 text-white shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center flex-shrink-0 text-white">
                <Smile className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/90">
                  HAPPY KIDDY MEALS SPECIAL
                </span>
                <h3 className="font-display font-black text-xl sm:text-2xl leading-tight">
                  Take 1 Happy Kiddy Meal, Get 1 Free Toy!
                </h3>
                <p className="text-xs text-white/90">
                  Includes nuggets, fries, juice, and a cheerful collectible toy for your kids.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveCategory("kids")}
              className="px-5 py-2.5 rounded-full bg-white text-krispy-dark font-extrabold text-xs shadow-md hover:bg-gray-50 transition whitespace-nowrap"
            >
              Browse Kids Deals
            </button>
          </div>
        )}

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-6 text-xs text-krispy-muted">
          <span>
            Showing <strong className="text-krispy-dark">{filteredItems.length}</strong> items
            {activeCategory !== "all" && ` in ${CATEGORIES.find((c) => c.id === activeCategory)?.name}`}
            {searchQuery && ` matching "${searchQuery}"`}
          </span>

          {(searchQuery || activeCategory !== "all") && (
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="text-krispy-orange hover:underline font-semibold"
            >
              Reset Filters
            </button>
          )}
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-md mx-auto my-12">
            <div className="w-16 h-16 rounded-full bg-orange-50 text-krispy-orange flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-krispy-dark mb-1">
              No menu items found
            </h3>
            <p className="text-xs text-krispy-muted mb-6">
              We couldn&apos;t find anything matching &quot;{searchQuery}&quot;. Try searching for &quot;pizza&quot;, &quot;burger&quot;, or &quot;wings&quot;.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setActiveCategory("all");
              }}
              className="px-6 py-2.5 rounded-full bg-krispy-orange text-white font-semibold text-xs shadow-md"
            >
              Show All Menu Items
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredItems.map((item) => (
              <ProductCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

