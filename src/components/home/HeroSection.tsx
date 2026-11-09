"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Sparkles, Clock, Flame, ShieldCheck } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-krispy-dark via-[#1a1b1e] to-krispy-dark text-white pt-8 pb-16 lg:py-20">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-krispy-orange/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-krispy-yellow/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* Left Column: Headline & Content */}
          <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
            {/* Top Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-krispy-yellow">
              <Sparkles className="w-3.5 h-3.5 text-krispy-yellow animate-pulse" />
              <span>Vehari&apos;s Favorite Fast Food Restaurant</span>
            </div>

            {/* Headline */}
            <h1 className="font-display font-black text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.08] text-white">
              GOOD FOOD. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-krispy-orange via-[#FF9266] to-krispy-yellow">
                GOOD MOOD.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              {RESTAURANT_INFO.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link
                href="/menu"
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-base shadow-lg shadow-orange-500/30 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/deals"
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-base border border-white/20 backdrop-blur-sm transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                <span>View Special Deals</span>
              </Link>
            </div>

            {/* Key Value Micro Badges */}
            <div className="grid grid-cols-3 gap-2 pt-6 border-t border-white/10 max-w-lg mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-krispy-yellow block">
                  10+
                </span>
                <span className="text-[11px] text-gray-400">Pizza Flavors</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-krispy-orange block">
                  Rs. 220
                </span>
                <span className="text-[11px] text-gray-400">Deals Starting At</span>
              </div>
              <div className="text-center lg:text-left">
                <span className="font-display font-extrabold text-xl sm:text-2xl text-emerald-400 block">
                  2:00 AM
                </span>
                <span className="text-[11px] text-gray-400">Late Night Hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Main Feast Image Container */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-2 border-white/10 bg-black/40">
                <Image
                  src="/images/krispy-hero-feast.png"
                  alt="Krispy Feast: Delicious pizza, crispy chicken burger, hot wings, and golden fries"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
              </div>

              {/* Floating Pill Badge 1: Fresh & Piping Hot */}
              <div className="absolute -bottom-4 left-4 sm:left-6 bg-white/95 backdrop-blur-md text-krispy-dark p-3 rounded-2xl shadow-xl border border-white flex items-center gap-3 animate-bounce duration-1000">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-krispy-orange flex items-center justify-center font-bold">
                  <Flame className="w-5 h-5 text-krispy-orange" />
                </div>
                <div>
                  <span className="text-xs font-bold block leading-none">Fresh & Piping Hot</span>
                  <span className="text-[10px] text-krispy-muted">Made fresh to order daily</span>
                </div>
              </div>

              {/* Floating Pill Badge 2: Open Late Night */}
              <div className="hidden sm:flex absolute -top-4 right-4 bg-krispy-dark/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-xl border border-white/15 items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-semibold text-gray-200">
                  Open till <strong className="text-krispy-yellow font-bold">2:00 AM</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

