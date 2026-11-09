import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import CartDrawer from "@/components/cart/CartDrawer";
import ItemCustomizationModal from "@/components/menu/ItemCustomizationModal";
import WhatsAppCheckoutModal from "@/components/cart/WhatsAppCheckoutModal";
import BurgerAssemblyReloadAnimation from "@/components/common/BurgerAssemblyReloadAnimation";
import { RESTAURANT_INFO } from "@/data/restaurant";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://krispy-restaurant.vercel.app"),
  title: {
    default: "Krispy | Fast Food Restaurant — Pizzas, Burgers & Deals in Vehari",
    template: "%s | Krispy (Vehari)",
  },
  description:
    "Krispy (Krispy Cottage) — Real Fried Chicken, Crown Crust Pizzas, Hot Wings, and Family Deals on 177 Jinnah Road, Vehari, Pakistan. Home Delivery, Takeaway, and Dine-in available daily from 11:00 AM to 2:00 AM.",
  keywords: [
    "Krispy",
    "Krispy Cottage",
    "Fast Food Vehari",
    "Pizza in Vehari",
    "Burger in Vehari",
    "Krispy fast food",
    "Vehari restaurant",
    "Hot wings Vehari",
    "Food delivery Vehari",
  ],
  authors: [{ name: "Krispy Restaurant" }],
  creator: "Krispy Restaurant",
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://krispy-restaurant.vercel.app",
    siteName: "Krispy Fast Food Restaurant",
    title: "Krispy | Good Food. Good Mood. — Vehari",
    description:
      "Order gourmet pizzas, crispy Zester burgers, hot wings, and family deals from Krispy Cottage in Vehari.",
    images: [
      {
        url: "/images/krispy-hero-feast.png",
        width: 1200,
        height: 630,
        alt: "Krispy Food Feast — Delicious Pizzas, Burgers and Wings",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Krispy | Fast Food Restaurant in Vehari",
    description:
      "Explore delicious pizzas, crispy burgers, wings, and combo deals in Vehari. Open 11:00 AM – 2:00 AM.",
    images: ["/images/krispy-hero-feast.png"],
  },
  icons: {
    icon: "/images/krispy-logo.png",
    apple: "/images/krispy-logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FF704D",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FastFoodRestaurant",
    name: "Krispy",
    legalName: RESTAURANT_INFO.fullName,
    image: "https://krispy-restaurant.vercel.app/images/krispy-hero-feast.png",
    telephone: RESTAURANT_INFO.phone,
    servesCuisine: "Fast Food, Pizza, Burgers, Fried Chicken",
    address: {
      "@type": "PostalAddress",
      streetAddress: "177 Jinnah Road, D Block",
      addressLocality: "Vehari",
      postalCode: "61100",
      addressCountry: "PK",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "02:00",
      },
    ],
    priceRange: "Rs. 200 - Rs. 2300",
    url: "https://krispy-restaurant.vercel.app",
    hasMenu: "https://krispy-restaurant.vercel.app/menu",
  };

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Critical synchronous blocking style to ensure zero-flash splash screen on first frame */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              #burger-splash-root {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                right: 0 !important;
                bottom: 0 !important;
                width: 100vw !important;
                height: 100vh !important;
                z-index: 999999 !important;
                background: radial-gradient(circle at center, #272A2E 0%, #1A1C1E 100%) !important;
              }
            `,
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans bg-krispy-bg text-krispy-dark antialiased">
        {/* Splash Animation — VERY FIRST element in body so it paints first */}
        <BurgerAssemblyReloadAnimation />

        <Header />
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <Footer />

        {/* Global Modals & Overlays */}
        <CartDrawer />
        <ItemCustomizationModal />
        <WhatsAppCheckoutModal />
        <MobileBottomNav />
      </body>
    </html>
  );
}

