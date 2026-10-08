import React, { useState } from 'react';
import { REVIEWS, PRESS_ACCOLADES } from '../data/reviews';
import { Star, ShieldCheck, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [activeReviewIdx, setActiveReviewIdx] = useState(0);

  const nextReview = () => {
    setActiveReviewIdx((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIdx((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const current = REVIEWS[activeReviewIdx];

  return (
    <section className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-[#D8C09A]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Google Review Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pb-10 border-b border-[#D8C09A]/40 mb-12 sm:mb-16 gap-4">
          <div className="flex items-center gap-4">
            {/* Google G icon representation */}
            <div className="w-12 h-12 bg-white border border-[#D8C09A] flex items-center justify-center font-bold text-lg text-[#5A1725] shadow-xs">
              G
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-amber-600">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                ))}
                <span className="font-bold text-sm text-[#241C1A] ml-1">4.9 / 5.0</span>
              </div>
              <span className="text-[11px] text-[#574B48] tracking-wider uppercase font-medium">
                Verified Google Customer Reviews · 280+ Reviews Across Gauteng & Western Cape
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF7F1] px-4 py-2 border border-[#D8C09A] text-xs text-[#5A1725] font-semibold tracking-wider uppercase">
            <ShieldCheck className="w-4 h-4 text-[#B97882]" />
            <span>100% Genuine Client Endorsements</span>
          </div>
        </div>

        {/* Featured Testimonial Spotlight */}
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <Quote className="w-10 h-10 text-[#D8C09A] mx-auto mb-4" />
          
          <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#5A1725] font-normal leading-snug mb-6">
            "{current.content}"
          </h3>

          <div className="space-y-1">
            <h4 className="font-sans text-sm font-semibold tracking-[0.16em] uppercase text-[#241C1A]">
              {current.author}
            </h4>
            <p className="text-xs text-[#B97882] font-medium">
              {current.location} · {current.productName}
            </p>
          </div>

          {/* Testimonial arrows */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevReview}
              aria-label="Previous review"
              className="w-10 h-10 border border-[#D8C09A] rounded-full flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex gap-1.5">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReviewIdx(idx)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === activeReviewIdx ? 'w-6 bg-[#5A1725]' : 'bg-[#D8C09A]'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextReview}
              aria-label="Next review"
              className="w-10 h-10 border border-[#D8C09A] rounded-full flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Press Accolades Grid */}
        <div className="border-t border-[#D8C09A]/40 pt-12">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold tracking-[0.24em] uppercase text-[#B97882]">
              AS CELEBRATED IN PREMIER PUBLICATIONS
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {PRESS_ACCOLADES.map((item, i) => (
              <div 
                key={i}
                className="bg-[#FAF7F1] p-6 border border-[#D8C09A]/50 text-center flex flex-col justify-between"
              >
                <p className="font-serif italic text-sm text-[#574B48] leading-relaxed mb-4">
                  "{item.quote}"
                </p>
                <span className="font-sans text-xs font-bold tracking-[0.2em] text-[#5A1725] uppercase">
                  {item.source}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
