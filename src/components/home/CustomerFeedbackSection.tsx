"use client";

import React from "react";
import { Star, Quote, MessageSquareHeart } from "lucide-react";
import { SAMPLE_REVIEWS } from "@/data/reviews";

export default function CustomerFeedbackSection() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 border border-orange-100 text-xs font-bold text-krispy-orange">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>CUSTOMER EXPERIENCE</span>
          </div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-krispy-dark">
            Sample Customer Reviews — Demo Content
          </h2>
          <p className="text-xs sm:text-sm text-krispy-muted">
            Illustrative reviews for website demonstration only. Showcasing what dining at Krispy feels like.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-gray-50/70 rounded-3xl p-6 border border-gray-100 flex flex-col justify-between hover:bg-white hover:shadow-lg transition-all"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-krispy-yellow text-krispy-yellow"
                      />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-orange-200" />
                </div>

                {/* Dish Tag */}
                <span className="inline-block text-[10px] font-bold uppercase tracking-wider text-krispy-orange bg-orange-100/70 px-2.5 py-0.5 rounded-full mb-2">
                  {review.tag}
                </span>

                {/* Review Text */}
                <p className="text-sm text-gray-700 leading-relaxed italic">
                  &quot;{review.comment}&quot;
                </p>
              </div>

              {/* Author & Illustrative Label */}
              <div className="pt-4 mt-4 border-t border-gray-200/60 flex items-center justify-between text-xs">
                <span className="font-bold text-krispy-dark">{review.author}</span>
                <span className="text-krispy-muted text-[11px]">{review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Required Visible Disclaimer */}
        <div className="mt-8 text-center">
          <p className="text-xs text-krispy-muted italic">
            *Illustrative reviews for website demonstration only. Not collected from Google or Facebook.
          </p>
        </div>
      </div>
    </section>
  );
}

