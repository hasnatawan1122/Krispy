import React from "react";
import Link from "next/link";
import { Utensils, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-krispy-bg">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 text-center border border-gray-100 shadow-xl space-y-5">
        <div className="w-20 h-20 rounded-full bg-orange-50 text-krispy-orange flex items-center justify-center mx-auto">
          <Utensils className="w-10 h-10" />
        </div>
        <div>
          <span className="font-display font-black text-5xl text-krispy-orange block">
            404
          </span>
          <h1 className="font-display font-bold text-2xl text-krispy-dark mt-2">
            Page Not Found
          </h1>
          <p className="text-xs sm:text-sm text-krispy-muted mt-2">
            Oops! The page you are looking for seems to have been eaten or moved. Let&apos;s get you back to the fresh menu.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <Link
            href="/"
            className="flex-1 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-krispy-dark font-semibold text-xs flex items-center justify-center gap-2 transition"
          >
            <Home className="w-4 h-4" />
            <span>Return Home</span>
          </Link>
          <Link
            href="/menu"
            className="flex-1 py-3 px-4 rounded-xl bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition"
          >
            <Utensils className="w-4 h-4" />
            <span>Explore Menu</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

