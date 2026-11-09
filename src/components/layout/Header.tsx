"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ShoppingBag, Menu, X, Phone, Clock, MapPin } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const openCart = useCartStore((state) => state.openCart);
  const items = useCartStore((state) => state.items);
  const hasHydrated = useCartStore((state) => state.hasHydrated);

  const itemCount = hasHydrated
    ? items.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Deals", href: "/deals" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Top micro info banner (Desktop) */}
      <div className="hidden lg:block bg-krispy-dark text-white/80 text-xs py-1.5 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-krispy-yellow" />
              Open Daily: 11:00 AM – 2:00 AM
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-krispy-orange" />
              177 Jinnah Road, D Block, Vehari
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="hover:text-white transition flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5 text-krispy-yellow" />
              Call: {RESTAURANT_INFO.phone}
            </a>
            <span className="text-white/30">|</span>
            <span className="text-krispy-yellow font-medium">Free Delivery Available</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5"
            : "bg-white py-3.5 border-b border-gray-100"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 transition-transform group-hover:scale-105">
              <Image
                src="/images/krispy-logo.png"
                alt="Krispy Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-krispy-dark leading-none">
                KRISPY
              </span>
              <span className="text-[10px] tracking-wider font-semibold text-krispy-orange uppercase">
                Vehari, Pakistan
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                    isActive
                      ? "bg-krispy-orange text-white font-semibold shadow-sm"
                      : "text-krispy-dark/80 hover:text-krispy-orange hover:bg-orange-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons (Cart & Order Now) */}
          <div className="flex items-center space-x-3">
            {/* Cart Button */}
            <button
              onClick={openCart}
              aria-label="Open Shopping Cart"
              className="relative p-2.5 rounded-full bg-gray-100 hover:bg-orange-50 text-krispy-dark hover:text-krispy-orange transition-colors flex items-center justify-center"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-krispy-orange text-white font-bold text-xs w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Order Now CTA (Desktop) */}
            <Link
              href="/menu"
              className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-krispy-orange hover:bg-krispy-orange-hover text-white font-semibold text-sm shadow-md transition-transform hover:scale-105 active:scale-95"
            >
              Order Now
            </Link>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile navigation menu"
              className="md:hidden p-2 rounded-lg text-krispy-dark hover:bg-gray-100 transition"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Nav Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-6 space-y-2 shadow-xl animate-in slide-in-from-top duration-200">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl font-medium text-base ${
                    isActive
                      ? "bg-krispy-orange text-white font-semibold"
                      : "text-krispy-dark hover:bg-gray-50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="pt-2">
              <Link
                href="/menu"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center py-3 rounded-xl bg-krispy-orange text-white font-semibold shadow-md"
              >
                Browse Full Menu
              </Link>
            </div>
            <div className="pt-3 border-t border-gray-100 text-xs text-krispy-muted flex flex-col gap-1">
              <span>📍 177 Jinnah Road, D Block, Vehari</span>
              <span>⏰ 11:00 AM – 2:00 AM Daily</span>
              <span>📞 03023360008</span>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

