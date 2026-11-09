"use client";

import React, { useEffect, useState } from "react";

export default function BurgerAssemblyReloadAnimation() {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // 1. If user prefers reduced motion, skip animation immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsFinished(true);
      return;
    }

    // 2. Lock page scrolling while animation is running
    document.body.style.overflow = "hidden";

    // 3. Smooth fade out at 2.8s, complete unmount at 3.2s
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 2800);

    const finishTimer = setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = "";
    }, 3200);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (isFinished) {
    return null;
  }

  return (
    <div
      id="burger-splash-root"
      role="status"
      aria-live="polite"
      aria-label="Freshly Made. Ready to Serve!"
      className={`fixed inset-0 z-[999999] flex flex-col items-center justify-center select-none transition-opacity duration-400 ease-out ${
        isFadingOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 999999,
        background: "radial-gradient(circle at center, #272A2E 0%, #1A1C1E 100%)",
      }}
    >
      {/* Background ambient glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#FF704D]/15 to-[#FFC83D]/10 blur-3xl pointer-events-none" />

      {/* Assembly Container */}
      <div className="relative w-80 h-72 sm:w-96 sm:h-84 flex items-center justify-center">
        {/* Contact Shadow Under Burger */}
        <div className="absolute bottom-2 w-52 sm:w-64 h-5 rounded-[100%] bg-black/50 blur-sm burger-shadow-anim" />

        <svg
          viewBox="0 0 400 360"
          className="w-full h-full overflow-visible burger-bounce-complete"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Top Bun Gradient */}
            <linearGradient id="topBunGrad" x1="200" y1="40" x2="200" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F9A43F" />
              <stop offset="40%" stopColor="#E2781E" />
              <stop offset="85%" stopColor="#C4560D" />
              <stop offset="100%" stopColor="#A84408" />
            </linearGradient>

            {/* Top Bun Sheen */}
            <linearGradient id="topBunSheen" x1="150" y1="50" x2="250" y2="110" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE0B2" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#F9A43F" stopOpacity="0" />
            </linearGradient>

            {/* Patty Gradient */}
            <linearGradient id="pattyGrad" x1="200" y1="210" x2="200" y2="255" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#6E3113" />
              <stop offset="35%" stopColor="#55240B" />
              <stop offset="80%" stopColor="#3E1805" />
              <stop offset="100%" stopColor="#2B0E02" />
            </linearGradient>

            {/* Cheese Gradient */}
            <linearGradient id="cheeseGrad" x1="200" y1="190" x2="200" y2="235" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFDE59" />
              <stop offset="60%" stopColor="#FFB800" />
              <stop offset="100%" stopColor="#E69500" />
            </linearGradient>

            {/* Tomato Gradient */}
            <linearGradient id="tomatoGrad" x1="200" y1="165" x2="200" y2="195" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF4B4B" />
              <stop offset="50%" stopColor="#E52222" />
              <stop offset="100%" stopColor="#BA0F0F" />
            </linearGradient>

            {/* Lettuce Gradient */}
            <linearGradient id="lettuceGrad" x1="200" y1="140" x2="200" y2="175" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#80D627" />
              <stop offset="50%" stopColor="#5EA913" />
              <stop offset="100%" stopColor="#437D0A" />
            </linearGradient>

            {/* Bottom Bun Gradient */}
            <linearGradient id="bottomBunGrad" x1="200" y1="250" x2="200" y2="305" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F5A23C" />
              <stop offset="40%" stopColor="#DE741A" />
              <stop offset="85%" stopColor="#BA4E08" />
              <stop offset="100%" stopColor="#963A04" />
            </linearGradient>

            {/* Drop Shadows */}
            <filter id="layerShadow" x="-10%" y="-10%" width="120%" height="130%" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.35" />
            </filter>
          </defs>

          {/* ========================================== */}
          {/* STAGE 1: BOTTOM BUN (Enters from bottom)   */}
          {/* ========================================== */}
          <g className="burger-layer-bottom-bun" filter="url(#layerShadow)">
            <path
              d="M75 258 C75 258, 70 300, 105 310 C140 320, 260 320, 295 310 C330 300, 325 258, 325 258 C325 253, 315 250, 200 250 C85 250, 75 253, 75 258 Z"
              fill="url(#bottomBunGrad)"
            />
            <ellipse cx="200" cy="254" rx="122" ry="7" fill="#FCE5B8" opacity="0.65" />
            <path
              d="M80 262 C115 267, 285 267, 320 262"
              stroke="#FFE8BE"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>

          {/* ========================================== */}
          {/* STAGE 2: GRILLED PATTY (Drops from above)  */}
          {/* ========================================== */}
          <g className="burger-layer-patty" filter="url(#layerShadow)">
            <path
              d="M60 226 C58 214, 75 208, 100 208 C135 207, 265 207, 300 208 C325 208, 342 214, 340 226 C338 239, 330 250, 295 253 C260 256, 140 256, 105 253 C70 250, 62 239, 60 226 Z"
              fill="url(#pattyGrad)"
            />
            <g opacity="0.55" stroke="#1D0800" strokeWidth="3" strokeLinecap="round">
              <line x1="120" y1="216" x2="145" y2="246" />
              <line x1="165" y1="214" x2="190" y2="248" />
              <line x1="210" y1="214" x2="235" y2="248" />
              <line x1="255" y1="216" x2="280" y2="246" />
            </g>
            <path
              d="M68 220 C105 214, 295 214, 332 220"
              stroke="#A8572A"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.6"
            />
          </g>

          {/* ========================================== */}
          {/* STAGE 3: MELTED CHEESE (Drapes over patty) */}
          {/* ========================================== */}
          <g className="burger-layer-cheese" filter="url(#layerShadow)">
            <path
              d="M80 206 C105 203, 295 203, 320 206 C326 210, 335 224, 328 238 C323 248, 312 235, 306 226 C280 220, 260 228, 245 244 C236 254, 226 238, 222 230 C200 224, 185 226, 175 242 C168 252, 160 238, 156 228 C135 222, 120 236, 114 246 C108 254, 100 234, 96 224 C82 220, 72 216, 80 206 Z"
              fill="url(#cheeseGrad)"
            />
            <path
              d="M95 210 C140 206, 260 206, 305 210"
              stroke="#FFF59D"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.75"
            />
          </g>

          {/* ========================================== */}
          {/* STAGE 4A: CRISP ONION RINGS                */}
          {/* ========================================== */}
          <g className="burger-layer-onions" filter="url(#layerShadow)">
            <g transform="translate(100, 186) rotate(-4)">
              <ellipse cx="40" cy="10" rx="36" ry="9" stroke="#9C27B0" strokeWidth="4.5" fill="#F3E5F5" opacity="0.9" />
              <ellipse cx="40" cy="10" rx="30" ry="6.5" stroke="#BA68C8" strokeWidth="2.5" fill="none" />
            </g>
            <g transform="translate(205, 184) rotate(5)">
              <ellipse cx="45" cy="11" rx="42" ry="9.5" stroke="#9C27B0" strokeWidth="4.5" fill="#F3E5F5" opacity="0.9" />
              <ellipse cx="45" cy="11" rx="35" ry="7" stroke="#BA68C8" strokeWidth="2.5" fill="none" />
            </g>
          </g>

          {/* ========================================== */}
          {/* STAGE 4B: RIPE TOMATO SLICES               */}
          {/* ========================================== */}
          <g className="burger-layer-tomatoes" filter="url(#layerShadow)">
            <g transform="translate(70, 162)">
              <path
                d="M10 20 C10 10, 45 4, 85 4 C125 4, 155 10, 155 20 C155 30, 125 35, 85 35 C45 35, 10 30, 10 20 Z"
                fill="url(#tomatoGrad)"
              />
              <ellipse cx="55" cy="19" rx="14" ry="5.5" fill="#8B0000" opacity="0.6" />
              <circle cx="53" cy="18" r="2" fill="#FFEB3B" opacity="0.8" />
              <circle cx="58" cy="20" r="1.8" fill="#FFEB3B" opacity="0.8" />
              <ellipse cx="110" cy="19" rx="14" ry="5.5" fill="#8B0000" opacity="0.6" />
              <circle cx="108" cy="18" r="2" fill="#FFEB3B" opacity="0.8" />
              <circle cx="113" cy="20" r="1.8" fill="#FFEB3B" opacity="0.8" />
              <path d="M30 14 C55 9, 115 9, 140 14" stroke="#FFA4A4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            </g>

            <g transform="translate(180, 160)">
              <path
                d="M10 20 C10 10, 45 4, 85 4 C125 4, 155 10, 155 20 C155 30, 125 35, 85 35 C45 35, 10 30, 10 20 Z"
                fill="url(#tomatoGrad)"
              />
              <ellipse cx="60" cy="19" rx="14" ry="5.5" fill="#8B0000" opacity="0.6" />
              <circle cx="58" cy="18" r="2" fill="#FFEB3B" opacity="0.8" />
              <ellipse cx="115" cy="19" rx="14" ry="5.5" fill="#8B0000" opacity="0.6" />
              <circle cx="113" cy="18" r="2" fill="#FFEB3B" opacity="0.8" />
              <path d="M30 14 C55 9, 115 9, 140 14" stroke="#FFA4A4" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
            </g>
          </g>

          {/* ========================================== */}
          {/* STAGE 4C: CRISP GREEN LETTUCE              */}
          {/* ========================================== */}
          <g className="burger-layer-lettuce" filter="url(#layerShadow)">
            <path
              d="M52 152 C48 142, 60 136, 74 140 C88 132, 105 130, 118 138 C132 128, 154 126, 168 136 C184 126, 212 125, 228 136 C245 127, 268 128, 282 138 C296 130, 316 132, 328 140 C342 136, 354 142, 350 152 C345 165, 332 170, 318 162 C302 172, 280 171, 265 161 C248 171, 222 172, 204 162 C186 172, 160 171, 142 161 C126 171, 102 171, 88 162 C72 170, 56 164, 52 152 Z"
              fill="url(#lettuceGrad)"
            />
            <path
              d="M85 146 Q120 152 155 144 M175 142 Q210 150 245 143 M265 144 Q295 150 325 145"
              stroke="#A0E842"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.8"
            />
          </g>

          {/* ========================================== */}
          {/* STAGE 5: TOP BRIOCHE BUN (Drops & Bounces) */}
          {/* ========================================== */}
          <g className="burger-layer-top-bun" filter="url(#layerShadow)">
            <path
              d="M65 138 C60 85, 115 36, 200 36 C285 36, 340 85, 335 138 C335 143, 325 147, 200 147 C75 147, 65 143, 65 138 Z"
              fill="url(#topBunGrad)"
            />
            <path
              d="M95 90 C125 55, 200 48, 260 56 C230 46, 155 50, 110 74 C92 84, 85 96, 95 90 Z"
              fill="url(#topBunSheen)"
            />
            <path
              d="M70 138 C115 144, 285 144, 330 138"
              stroke="#FFD59E"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.45"
            />

            {/* Toasted white & golden sesame seeds */}
            <g fill="#FFF8E7" opacity="0.95">
              <ellipse cx="195" cy="58" rx="4" ry="2.2" transform="rotate(-15 195 58)" />
              <ellipse cx="230" cy="62" rx="4" ry="2.2" transform="rotate(25 230 62)" />
              <ellipse cx="160" cy="66" rx="4" ry="2.2" transform="rotate(-30 160 66)" />
              <ellipse cx="130" cy="85" rx="4" ry="2.2" transform="rotate(-40 130 85)" />
              <ellipse cx="268" cy="82" rx="4" ry="2.2" transform="rotate(35 268 82)" />
              <ellipse cx="185" cy="82" rx="4.2" ry="2.2" transform="rotate(10 185 82)" />
              <ellipse cx="215" cy="86" rx="4.2" ry="2.2" transform="rotate(-20 215 86)" />
              <ellipse cx="150" cy="102" rx="4.2" ry="2.2" transform="rotate(15 150 102)" />
              <ellipse cx="245" cy="104" rx="4.2" ry="2.2" transform="rotate(-10 245 104)" />
              <ellipse cx="108" cy="112" rx="4" ry="2.2" transform="rotate(-45 108 112)" />
              <ellipse cx="292" cy="108" rx="4" ry="2.2" transform="rotate(40 292 108)" />
              <ellipse cx="180" cy="118" rx="4" ry="2.2" transform="rotate(-5 180 118)" />
              <ellipse cx="220" cy="120" rx="4" ry="2.2" transform="rotate(20 220 120)" />
            </g>
          </g>
        </svg>
      </div>

      {/* ========================================== */}
      {/* STAGE 6: TEXT BADGE & SLOGAN               */}
      {/* ========================================== */}
      <div className="mt-5 flex flex-col items-center justify-center text-center px-4 burger-text-fade">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-lg mb-2">
          <span className="w-2 h-2 rounded-full bg-[#FFC83D] animate-ping" />
          <span className="text-[11px] font-extrabold tracking-widest text-[#FFC83D] uppercase">
            Krispy Cottage
          </span>
        </div>
        <h2 className="font-display font-black text-2xl sm:text-3xl text-white tracking-tight leading-tight drop-shadow-md">
          Freshly Made. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF704D] to-[#FFC83D]">Ready to Serve!</span>
        </h2>
        <p className="text-xs text-gray-400 mt-1 font-medium">
          Preparing your delicious menu experience...
        </p>
      </div>
    </div>
  );
}
