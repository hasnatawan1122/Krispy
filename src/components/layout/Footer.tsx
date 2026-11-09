"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Clock, MessageSquare, Facebook, Instagram, Heart } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function Footer() {
  return (
    <footer className="bg-krispy-dark text-white pt-16 pb-24 md:pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 bg-white rounded-full p-1">
                <Image
                  src="/images/krispy-logo.png"
                  alt="Krispy Logo"
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                  KRISPY
                </span>
                <span className="text-xs text-krispy-yellow font-medium">
                  {RESTAURANT_INFO.fullName}
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Serving the crispiest chicken burgers, crown crust pizzas, hot wings, and hearty family deals in Vehari. Delicious food prepared fresh daily.
            </p>
            <div className="flex items-center space-x-3 pt-2">
              <a
                href={RESTAURANT_INFO.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-krispy-orange flex items-center justify-center transition-colors text-white"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href={RESTAURANT_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Page"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-krispy-orange flex items-center justify-center transition-colors text-white"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-emerald-600 flex items-center justify-center transition-colors text-white"
              >
                <MessageSquare className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-krispy-orange transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-krispy-orange transition">
                  Full Food Menu
                </Link>
              </li>
              <li>
                <Link href="/deals" className="hover:text-krispy-orange transition">
                  Jumbo & Family Deals
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-krispy-orange transition">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link href="/menu?category=kids" className="hover:text-krispy-orange transition">
                  Happy Kiddy Meals
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours & Services */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-4">
              Hours & Services
            </h3>
            <div className="space-y-3 text-sm text-gray-400">
              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-krispy-yellow flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Daily Operating Hours</p>
                  <p className="text-xs text-gray-400">11:00 AM – 2:00 AM (Next Day)</p>
                  <span className="inline-block mt-1 text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Open Now for Orders
                  </span>
                </div>
              </div>
              <div className="pt-2 border-t border-white/10 text-xs space-y-1">
                <p className="text-white font-medium">Available Dining Options:</p>
                <p>• Fast Home Delivery across Vehari</p>
                <p>• Quick Takeaway & Self-Pickup</p>
                <p>• Air-Conditioned Family Dine-in</p>
              </div>
            </div>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="font-display font-semibold text-lg text-white mb-4">
              Visit or Call Us
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-krispy-orange flex-shrink-0 mt-0.5" />
                <span className="leading-snug">
                  177 Jinnah Road, D Block, Vehari, 61100, Punjab, Pakistan
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-krispy-yellow flex-shrink-0" />
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="hover:text-white transition"
                >
                  {RESTAURANT_INFO.phone} / {RESTAURANT_INFO.phoneSecondary}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-400 transition"
                >
                  WhatsApp: {RESTAURANT_INFO.whatsappNumber}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Business Copyright & Developer Credit */}
        <div className="mt-12 pt-6 border-t border-white/10 text-center space-y-2 text-xs text-gray-400">
          <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            <span>© {new Date().getFullYear()} Krispy Cottage. All Rights Reserved.</span>
            <span className="hidden sm:inline text-gray-600">·</span>
            <span>177 Jinnah Road, D Block, Vehari, Punjab, Pakistan</span>
          </p>
          <p className="text-xs text-gray-300">
            Developed by{" "}
            <a
              href="https://www.linkedin.com/in/hasnat-awan-web-developer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#00E676] hover:text-[#00c864] font-semibold transition-colors hover:underline"
            >
              Hasnat
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

