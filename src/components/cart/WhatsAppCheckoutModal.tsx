"use client";

import React, { useState } from "react";
import {
  X,
  MessageSquare,
  Copy,
  Check,
  Bike,
  ShoppingBag,
  UtensilsCrossed,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";
import { useUiStore } from "@/store/ui-store";
import { useCartStore } from "@/store/cart-store";
import { ServiceType, CheckoutDetails } from "@/types/menu";
import { generateWhatsAppMessage, createWhatsAppOrderUrl } from "@/lib/whatsapp";
import { formatCurrency } from "@/lib/currency";
import { RESTAURANT_INFO } from "@/data/restaurant";

export default function WhatsAppCheckoutModal() {
  const isOpen = useUiStore((state) => state.isCheckoutOpen);
  const closeModal = useUiStore((state) => state.closeCheckout);

  const items = useCartStore((state) => state.items);
  const getSubtotal = useCartStore((state) => state.getSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceType, setServiceType] = useState<ServiceType>("delivery");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");

  const [copied, setCopied] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formError, setFormError] = useState("");

  if (!isOpen) return null;

  const subtotal = getSubtotal();

  const checkoutDetails: CheckoutDetails = {
    name: name.trim() || "Customer",
    phone: phone.trim() || "03000000000",
    serviceType,
    address: address.trim(),
    notes: notes.trim(),
  };

  const previewMessage = generateWhatsAppMessage(items, checkoutDetails, subtotal);
  const whatsappUrl = createWhatsAppOrderUrl(previewMessage);

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(previewMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleValidateAndProceed = (action: "open" | "copy") => {
    if (!name.trim()) {
      setFormError("Please enter your name.");
      return;
    }
    if (!phone.trim() || phone.trim().length < 8) {
      setFormError("Please enter a valid phone number.");
      return;
    }
    if (serviceType === "delivery" && !address.trim()) {
      setFormError("Please provide your delivery address in Vehari.");
      return;
    }
    setFormError("");

    if (action === "copy") {
      handleCopyMessage();
    } else {
      // Open WhatsApp order url
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 flex items-center justify-center">
      {/* Backdrop */}
      <div
        onClick={closeModal}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      {/* Modal Dialog */}
      <div className="relative bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl z-10 animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-krispy-dark text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-full bg-emerald-500/20 text-emerald-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display font-bold text-lg leading-tight">
                WhatsApp Order Checkout
              </h2>
              <p className="text-xs text-gray-400">
                Demo ordering workflow for Krispy Cottage
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {formError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          {/* Service Type Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-krispy-dark mb-2">
              Select Dining / Service Option
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setServiceType("delivery")}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  serviceType === "delivery"
                    ? "border-krispy-orange bg-orange-50 text-krispy-orange font-bold ring-2 ring-krispy-orange/30"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <Bike className="w-5 h-5 mb-1" />
                <span className="text-xs">Home Delivery</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceType("takeaway")}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  serviceType === "takeaway"
                    ? "border-krispy-orange bg-orange-50 text-krispy-orange font-bold ring-2 ring-krispy-orange/30"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <ShoppingBag className="w-5 h-5 mb-1" />
                <span className="text-xs">Takeaway</span>
              </button>
              <button
                type="button"
                onClick={() => setServiceType("dinein")}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center justify-center text-center transition-all ${
                  serviceType === "dinein"
                    ? "border-krispy-orange bg-orange-50 text-krispy-orange font-bold ring-2 ring-krispy-orange/30"
                    : "border-gray-200 text-gray-600 hover:border-gray-300"
                }`}
              >
                <UtensilsCrossed className="w-5 h-5 mb-1" />
                <span className="text-xs">Dine-in Order</span>
              </button>
            </div>
          </div>

          {/* Customer Name & Phone */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-krispy-dark mb-1">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setFormError("");
                }}
                placeholder="e.g. Usman Khan"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-krispy-dark mb-1">
                Phone / WhatsApp Number <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  setFormError("");
                }}
                placeholder="0302XXXXXXX"
                className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
              />
            </div>
          </div>

          {/* Delivery Address (required if delivery) */}
          {serviceType === "delivery" && (
            <div>
              <label className="block text-xs font-semibold text-krispy-dark mb-1">
                Delivery Address in Vehari <span className="text-rose-500">*</span>
              </label>
              <textarea
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setFormError("");
                }}
                placeholder="Street address, house/shop #, landmark, Vehari"
                rows={2}
                className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-krispy-orange focus:ring-1 focus:ring-krispy-orange"
              />
            </div>
          )}

          {/* Special Notes */}
          <div>
            <label className="block text-xs font-semibold text-krispy-dark mb-1">
              Additional Notes (Optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Ring bell upon arrival, extra napkins"
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 focus:outline-none focus:border-krispy-orange"
            />
          </div>

          {/* Order Summary Recap */}
          <div className="p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-2">
            <div className="flex justify-between items-center font-bold text-krispy-dark">
              <span>Items Total ({items.reduce((s, i) => s + i.quantity, 0)})</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-krispy-muted text-[11px]">
              <span>Delivery charges:</span>
              <span className="text-krispy-orange font-medium">To be confirmed</span>
            </div>
            <p className="text-[10px] text-gray-400 italic">
              *{RESTAURANT_INFO.deliveryDisclaimer}
            </p>
          </div>

          {/* Message Preview Accordion */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <button
              type="button"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full px-4 py-2.5 bg-gray-50 hover:bg-gray-100 flex items-center justify-between text-xs font-semibold text-krispy-dark transition"
            >
              <span>{showPreview ? "Hide" : "Preview"} Formatted WhatsApp Message</span>
              <span className="text-krispy-orange">{showPreview ? "▲" : "▼"}</span>
            </button>
            {showPreview && (
              <div className="p-4 bg-emerald-50/50 border-t border-gray-200 text-xs font-mono whitespace-pre-wrap text-emerald-950 max-h-48 overflow-y-auto">
                {previewMessage}
              </div>
            )}
          </div>

          {/* Demonstration Notice */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-700 flex-shrink-0 mt-0.5" />
            <p>
              <strong>Demo Mode Notice:</strong> Clicking &quot;Send to WhatsApp&quot; will open WhatsApp with your formatted order ready to send to{" "}
              <strong>{RESTAURANT_INFO.whatsappNumber}</strong>. You can also copy the text directly.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-center gap-2.5">
          <button
            type="button"
            onClick={() => handleValidateAndProceed("copy")}
            className="w-full sm:w-auto px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 font-semibold text-xs text-krispy-dark transition flex items-center justify-center gap-1.5"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Order Text</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => handleValidateAndProceed("open")}
            className="w-full sm:flex-1 py-3 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 transition flex items-center justify-center gap-2 active:scale-95"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Send to WhatsApp ({formatCurrency(subtotal)})</span>
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </button>
        </div>
      </div>
    </div>
  );
}

