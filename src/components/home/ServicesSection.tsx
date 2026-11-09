"use client";

import React from "react";
import { Bike, ShoppingBag, UtensilsCrossed } from "lucide-react";

export default function ServicesSection() {
  const services = [
    {
      title: "Home Delivery",
      description: "Fast, hot, and insulated packaging delivered directly across Vehari city.",
      icon: Bike,
      badge: "Fast Delivery",
      color: "from-orange-500/10 to-amber-500/10",
      iconColor: "text-krispy-orange",
      iconBg: "bg-orange-100",
    },
    {
      title: "Takeaway / Pickup",
      description: "Quick self-pickup. Call or order via WhatsApp and pick up piping fresh.",
      icon: ShoppingBag,
      badge: "No Wait",
      color: "from-yellow-500/10 to-orange-500/10",
      iconColor: "text-amber-600",
      iconBg: "bg-amber-100",
    },
    {
      title: "Dine-in Experience",
      description: "Clean, relaxed air-conditioned family restaurant on Jinnah Road, Vehari.",
      icon: UtensilsCrossed,
      badge: "Family Dining",
      color: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-emerald-600",
      iconBg: "bg-emerald-100",
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="relative rounded-3xl p-6 bg-gradient-to-br border border-gray-100/80 hover:border-gray-200 transition-all hover:shadow-lg flex items-start gap-4 group"
              >
                <div
                  className={`w-14 h-14 rounded-2xl ${service.iconBg} ${service.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}
                >
                  <Icon className="w-7 h-7 stroke-[2]" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-bold text-base sm:text-lg text-krispy-dark">
                      {service.title}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-krispy-dark">
                      {service.badge}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-krispy-muted leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

