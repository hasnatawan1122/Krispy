"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ZoomIn, ZoomOut, RotateCcw, Sparkles, Download } from "lucide-react";

export default function MainMenuCard() {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleOpen = () => {
    setIsLightboxOpen(true);
    setZoomLevel(1);
    document.body.style.overflow = "hidden";
  };

  const handleClose = () => {
    setIsLightboxOpen(false);
    setZoomLevel(1);
    document.body.style.overflow = "";
  };

  const zoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.35, 2.8));
  const zoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.35, 0.7));
  const resetZoom = () => setZoomLevel(1);

  return (
    <>
      {/* Featured Main Menu Card Showcase Container */}
      <div className="mb-10 bg-white rounded-3xl p-5 sm:p-7 border border-orange-100/80 shadow-lg card-shadow">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-4 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-xs font-bold text-krispy-orange uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL MAIN MENU CARD</span>
              </span>
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                HD Original Quality
              </span>
            </div>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-krispy-dark">
              Krispy Fantastic Deals & Combos Card
            </h2>
            <p className="text-xs sm:text-sm text-krispy-muted">
              Official printed menu flyer covering Deals 13–20, Family Meals, Midnight Cravings & Kids Deals.
            </p>
          </div>

          {/* Action Button: Click to view HD Fullscreen */}
          <button
            onClick={handleOpen}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-krispy-dark hover:bg-black text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <Maximize2 className="w-4 h-4 text-krispy-yellow" />
            <span>Click to Enlarge / Full HD</span>
          </button>
        </div>

        {/* High-Resolution Interactive Card Display */}
        <div
          onClick={handleOpen}
          className="group relative w-full aspect-[21/9] sm:aspect-[24/10] md:aspect-[26/10] rounded-2xl overflow-hidden bg-orange-50/40 border border-orange-200/70 cursor-zoom-in shadow-inner transition-all hover:border-krispy-orange hover:shadow-xl"
        >
          <Image
            src="/images/krispy-official-deals-menu-card.jpg"
            alt="Krispy Cottage Official Deals Menu Card"
            fill
            quality={100}
            unoptimized
            priority
            className="object-cover object-top sm:object-contain group-hover:scale-[1.01] transition-transform duration-300"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md text-krispy-dark font-extrabold text-xs sm:text-sm shadow-2xl flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-transform">
              <ZoomIn className="w-4 h-4 text-krispy-orange" />
              <span>Tap to Open High-Resolution Full View</span>
            </span>
          </div>

          {/* Corner Badge */}
          <div className="absolute bottom-2.5 right-2.5 bg-krispy-dark/85 backdrop-blur-md text-white text-[10px] sm:text-xs font-semibold px-3 py-1 rounded-xl shadow-md flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-krispy-yellow" />
            <span>Full Menu Preview</span>
          </div>
        </div>

        {/* Helper Footer Hint */}
        <div className="mt-3 flex flex-wrap items-center justify-between text-[11px] text-krispy-muted gap-2 pt-2">
          <span>*Every deal on this card is available to order below with custom sizes and add-ons.</span>
          <button
            onClick={handleOpen}
            className="text-krispy-orange hover:underline font-bold flex items-center gap-1"
          >
            <span>View detailed flyer text & pricing</span>
            <span>→</span>
          </button>
        </div>
      </div>

      {/* FULL-SCREEN HIGH QUALITY LIGHTBOX MODAL */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-3 sm:p-6 animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="w-full max-w-5xl flex items-center justify-between text-white pb-3 border-b border-white/10 z-20">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-sm sm:text-base text-white">
                Krispy Official Deals Menu Card
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-krispy-orange text-white uppercase">
                Original HD
              </span>
            </div>

            {/* Zoom & Action Controls */}
            <div className="flex items-center gap-2">
              <div className="flex items-center bg-white/10 rounded-xl p-1 gap-1 border border-white/15">
                <button
                  onClick={zoomOut}
                  title="Zoom Out"
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono font-bold px-2 text-krispy-yellow">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <button
                  onClick={zoomIn}
                  title="Zoom In"
                  className="p-1.5 rounded-lg hover:bg-white/20 text-white transition"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <button
                  onClick={resetZoom}
                  title="Reset Zoom"
                  className="p-1.5 rounded-lg hover:bg-white/20 text-gray-300 hover:text-white transition"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Direct Image Link / Download */}
              <a
                href="/images/krispy-official-deals-menu-card.jpg"
                download="Krispy-Deals-Menu-Card.jpg"
                title="Download Menu Card"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition border border-white/15"
              >
                <Download className="w-4 h-4" />
              </a>

              {/* Close Button */}
              <button
                onClick={handleClose}
                className="p-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white transition font-bold"
                aria-label="Close Fullscreen"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Middle Pan/Zoom Canvas */}
          <div className="flex-1 w-full max-w-6xl overflow-auto flex items-center justify-center p-2 sm:p-4 my-auto">
            <div
              style={{
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.15s ease-out",
                transformOrigin: "center center",
              }}
              className="relative max-w-full max-h-[82vh] flex items-center justify-center"
            >
              <img
                src="/images/krispy-official-deals-menu-card.jpg"
                alt="Krispy Deals Menu Card Full View"
                className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />
            </div>
          </div>

          {/* Bottom Info Bar */}
          <div className="w-full max-w-4xl text-center text-xs text-gray-400 py-1 flex items-center justify-between">
            <span>Scroll or use +/- to zoom. All menu prices in PKR (Rs).</span>
            <button
              onClick={handleClose}
              className="px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-semibold transition"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </>
  );
}

