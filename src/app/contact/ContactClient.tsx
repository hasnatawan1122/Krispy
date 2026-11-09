"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Phone,
  MessageSquare,
  Clock,
  Facebook,
  Instagram,
  Navigation,
  Send,
  CheckCircle,
  ExternalLink,
} from "lucide-react";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function ContactClient() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    // Build inquiry message for WhatsApp
    const inquiryText = `*Inquiry / Message from Krispy Website*\n*Name:* ${name}\n*Phone:* ${phone}\n*Message:* ${message}`;
    const url = `https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}?text=${encodeURIComponent(inquiryText)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setSubmitted(true);
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <div className="py-8 sm:py-16 bg-krispy-bg min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs font-bold text-krispy-orange uppercase tracking-wider block">
            GET IN TOUCH
          </span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-krispy-dark">
            Contact Krispy Cottage
          </h1>
          <p className="text-xs sm:text-sm text-krispy-muted">
            Have a question, feedback, or need delivery assistance? Reach out to our team in Vehari.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards & Information */}
          <div className="lg:col-span-5 space-y-5">
            {/* Quick Contact Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md space-y-6">
              <h2 className="font-display font-bold text-xl text-krispy-dark">
                Restaurant Information
              </h2>

              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-krispy-orange flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-krispy-dark font-semibold">Address</strong>
                    <p className="text-xs text-krispy-muted leading-relaxed">
                      {RESTAURANT_INFO.address}
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-yellow-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-krispy-dark font-semibold">Opening Hours</strong>
                    <p className="text-xs text-krispy-muted">
                      Monday – Sunday: 11:00 AM – 2:00 AM (Next Day)
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
                      Open 7 Days a Week
                    </span>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-krispy-orange flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-krispy-dark font-semibold">Direct Calling</strong>
                    <div className="space-y-0.5">
                      <a
                        href={`tel:${RESTAURANT_INFO.phone}`}
                        className="text-xs text-krispy-dark font-medium hover:text-krispy-orange block"
                      >
                        {RESTAURANT_INFO.phone}
                      </a>
                      <a
                        href={`tel:${RESTAURANT_INFO.phoneSecondary}`}
                        className="text-xs text-krispy-dark font-medium hover:text-krispy-orange block"
                      >
                        {RESTAURANT_INFO.phoneSecondary}
                      </a>
                    </div>
                  </div>
                </li>

                <li className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-krispy-dark font-semibold">WhatsApp Chat</strong>
                    <a
                      href={`https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-emerald-700 font-medium hover:underline block"
                    >
                      {RESTAURANT_INFO.whatsappNumber}
                    </a>
                  </div>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row gap-2.5">
                <a
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="flex-1 py-3 px-4 rounded-xl bg-krispy-dark hover:bg-black text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4 text-krispy-yellow" />
                  <span>Call Now</span>
                </a>
                <a
                  href={`https://wa.me/${RESTAURANT_INFO.whatsappCleanNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>

              {/* Social Media Links */}
              <div className="pt-2 flex items-center justify-between text-xs text-krispy-muted">
                <span>Follow us on:</span>
                <div className="flex items-center gap-2">
                  <a
                    href={RESTAURANT_INFO.facebookUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-blue-50 hover:text-blue-600 transition"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href={RESTAURANT_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-gray-100 hover:bg-pink-50 hover:text-pink-600 transition"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Google Maps Directions Card */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-md flex items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-base text-krispy-dark">
                  Find on Google Maps
                </h3>
                <p className="text-xs text-krispy-muted mt-0.5">
                  177 Jinnah Road, D Block, Vehari
                </p>
                <span className="inline-block mt-1.5 text-[11px] font-bold text-krispy-orange bg-orange-50 px-2 py-0.5 rounded-md border border-orange-100">
                  Plus Code: {RESTAURANT_INFO.plusCode}
                </span>
              </div>
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-xs shadow transition flex items-center gap-1.5 flex-shrink-0"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-80" />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Send a Message Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-md">
            <h2 className="font-display font-bold text-2xl text-krispy-dark mb-2">
              Send an Inquiry or Feedback
            </h2>
            <p className="text-xs sm:text-sm text-krispy-muted mb-6">
              Fill out the form below. When submitted, your message will be prepared directly in WhatsApp for instant communication with the restaurant.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>
                  Thank you! Your inquiry has been forwarded to WhatsApp. We look forward to serving you!
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-krispy-dark mb-1">
                    Your Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ali Ahmed"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-krispy-dark mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0300XXXXXXX"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-krispy-dark mb-1">
                  Your Message or Special Request <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you'd like to ask or feedback about your experience..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/20 transition flex items-center justify-center gap-2 group active:scale-[0.99]"
              >
                <span>Send via WhatsApp</span>
                <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-[11px] text-gray-400 text-center italic mt-2">
                *This will open WhatsApp with your message pre-filled.
              </p>
            </form>
          </div>
        </div>

        {/* Full-width Interactive Google Map Preview Section with Zoom-Out */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-md overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-krispy-orange">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Google Map Preview</span>
                </span>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-gray-100 text-krispy-dark border border-gray-200">
                  Plus Code: {RESTAURANT_INFO.plusCode}
                </span>
              </div>
              <h2 className="font-display font-bold text-xl sm:text-2xl text-krispy-dark">
                Locate Krispy Cottage in Vehari
              </h2>
              <p className="text-xs sm:text-sm text-krispy-muted">
                177 Jinnah Road, D Block, Vehari, 61100, Punjab, Pakistan
              </p>
            </div>

            <a
              href={RESTAURANT_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-krispy-orange hover:bg-krispy-orange-hover text-white font-bold text-xs sm:text-sm shadow-md transition self-start md:self-auto"
            >
              <Navigation className="w-4 h-4" />
              <span>Open in Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Embedded Google Map Frame (Zoomed-Out z=14) */}
          <div className="relative w-full h-80 sm:h-96 md:h-[440px] rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 shadow-inner">
            <iframe
              title="Krispy Cottage Location Map"
              src={RESTAURANT_INFO.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}

