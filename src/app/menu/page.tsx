import React, { Suspense } from "react";
import MenuClient from "./MenuClient";

export const metadata = {
  title: "Food Menu | Krispy (Vehari) — Pizzas, Burgers, Wings & Sides",
  description:
    "Explore the official menu of Krispy (Krispy Cottage) in Vehari. Crown crust pizza, Chicago deep dish, Zester burgers, loaded fries, hot wings, and family meals.",
};

export default function MenuPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center">
          <div className="w-10 h-10 border-4 border-krispy-orange border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs text-krispy-muted font-medium">Loading delicious Krispy menu...</p>
        </div>
      }
    >
      <MenuClient />
    </Suspense>
  );
}

