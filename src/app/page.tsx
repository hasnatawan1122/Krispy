import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ServicesSection from "@/components/home/ServicesSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedMenuSection from "@/components/home/FeaturedMenuSection";
import SpecialDealsSection from "@/components/home/SpecialDealsSection";
import MidnightDealSection from "@/components/home/MidnightDealSection";
import CustomerFeedbackSection from "@/components/home/CustomerFeedbackSection";
import LocationContactSection from "@/components/home/LocationContactSection";

export const metadata = {
  title: "Krispy | Fast Food Restaurant in Vehari — Pizzas, Burgers & Deals",
  description:
    "Welcome to Krispy (Krispy Cottage) in Vehari. Discover our delicious gourmet pizzas, crispy chicken burgers, hot wings, and jumbo family deals. Home delivery, takeaway, and dine-in.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* SECTION 2: HERO */}
      <HeroSection />

      {/* SECTION 3: SERVICES */}
      <ServicesSection />

      {/* SECTION 4: FOOD CATEGORIES */}
      <CategorySection />

      {/* SECTION 5: FEATURED MENU */}
      <FeaturedMenuSection />

      {/* SECTION 6: SPECIAL DEALS */}
      <SpecialDealsSection />

      {/* SECTION 7: MIDNIGHT DEAL */}
      <MidnightDealSection />

      {/* SECTION 8: CUSTOMER FEEDBACK */}
      <CustomerFeedbackSection />

      {/* SECTION 9: LOCATION & CONTACT CTA */}
      <LocationContactSection />
    </div>
  );
}

