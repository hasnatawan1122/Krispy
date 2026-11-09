"use client";

import React from "react";
import { MapPin, Phone, MessageSquare, Clock, Navigation, ExternalLink } from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function LocationContactSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50/50 via-white to-amber-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl overflow-hidden relative">
          {/* Decorative background accent */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-krispy-orange uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" />
                <span>FIND US IN VEHARI</span>
              </span>
              <h2 className="font-display font-black text-2xl sm:text-4xl text-krispy-dark">
                Craving Hot & Crispy Food? <br />
                We Are Ready For You.
              </h2>
              <p className="text-sm sm:text-base text-krispy-muted leading-relaxed">
                Whether you want rapid home delivery to your doorstep, a quick takeaway pickup, or a sit-down meal with family, visit us on Jinnah Road or order via phone & WhatsApp.
              </p>

              {/* Info grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <div className="flex items-center gap-2 text-krispy-orange font-bold text-xs uppercase tracking-wide">
                    <MapPin className="w-4 h-4" />
                    <span>Restaurant Location</span>
                  </div>
                  <p className="text-xs sm:text-sm text-krispy-dark font-medium">
                    {RESTAURANT_INFO.address}
                  </p>
                  <span className="inline-block text-[10px] font-bold text-krispy-orange bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                    Plus Code: {RESTAURANT_INFO.plusCode}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 space-y-1">
                  <div className="flex items-center gap-2 text-krispy-yellow font-bold text-xs uppercase tracking-wide">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span>Opening Hours</span>
                  </div>
                  <p className="text-xs sm:text-sm text-krispy-dark font-medium">
                    11:00 AM – 2:00 AM (Next Day)
                  </p>
                  <p className="text-[11px] text-emerald-600 font-semibold">
                    7 Days a Week
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="px-6 py-3.5 rounded-2xl bg-krispy-dark hover:bg-black text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-krispy-yellow" />
                  <span>Call: {RESTAURANT_INFO.phone}</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition flex items-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3.5 rounded-2xl bg-orange-50 hover:bg-orange-100 text-krispy-orange font-bold text-sm border border-orange-200 transition flex items-center gap-2"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-70" />
                </a>
              </div>
            </div>

            {/* Right Map Card Visual */}
            <div className="lg:col-span-5">
              <div className="bg-gradient-to-br from-krispy-dark to-[#161719] rounded-3xl p-6 text-white shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-bold text-lg text-white">
                      {RESTAURANT_INFO.fullName}
                    </h3>
                    <p className="text-xs text-krispy-yellow">Vehari, Punjab</p>
                  </div>
                  <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    Open Now
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 text-xs text-gray-300">
                  <div className="flex items-start gap-2">
                    <span className="text-krispy-orange font-bold">📍</span>
                    <span>177 Jinnah Road, D Block, Vehari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-krispy-yellow font-bold">📞</span>
                    <span>{RESTAURANT_INFO.phone} / {RESTAURANT_INFO.phoneSecondary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-bold">💬</span>
                    <span>WhatsApp Orders: {RESTAURANT_INFO.whatsappNumber}</span>
                  </div>
                </div>

                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-2xl bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-xs uppercase tracking-wider text-center block transition shadow-md"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

