import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  promoLabel: string;
  headline: string;
  headlineAccent?: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryActionType: 'subscriptions' | 'corporate' | 'protea';
  imageUrl: string;
  imageAlt: string;
  badgeTopText: string;
  badgeBottomText: string;
  badgeCenterText: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    promoLabel: 'AUTUMN BOTANICAL COLLECTION · 2026 COUTURE',
    headline: 'Sculptural Blossoms & Timeless Romance',
    headlineAccent: 'Hand-Tied Couture',
    description: 'Crafted daily in our Johannesburg & Cape Town ateliérs using estate David Austin garden roses, rare Venetian ranunculus, and sustainable Cape foliage for extraordinary moments.',
    primaryCtaText: 'SHOP NOW',
    secondaryCtaText: 'Explore Weekly Subscriptions →',
    secondaryActionType: 'subscriptions',
    imageUrl: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Elaborate bridal bouquet of David Austin garden roses and ranunculus',
    badgeTopText: '100% ESTATE HARVEST',
    badgeBottomText: 'MASTER FLORIST HAND-TIED',
    badgeCenterText: 'EST. 2021',
  },
  {
    id: 2,
    promoLabel: 'INDIGENOUS CAPE BOTANICAL HERITAGE',
    headline: 'The Sovereign King Protea Collection',
    headlineAccent: 'Cape Flora Grandeur',
    description: 'Sustainably hand-harvested from certified Cape mountain reserves. Monumental blush cynaroides proteas harmonized with wild scarlet pincushions and silver-tree foliage.',
    primaryCtaText: 'SHOP NOW',
    secondaryCtaText: 'Discover Protea Heritage →',
    secondaryActionType: 'protea',
    imageUrl: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Artisanal arrangement with King Proteas and endemic South African fynbos',
    badgeTopText: 'CERTIFIED CAPE FLORA',
    badgeBottomText: 'SAME-DAY GAUTENG & WC',
    badgeCenterText: 'NATIVE',
  },
  {
    id: 3,
    promoLabel: 'PRIVATE RESIDENCES & BOARDROOMS',
    headline: 'Living Floral Artistry for Elevated Spaces',
    headlineAccent: 'Curated Memberships',
    description: 'Transform your dining table or corporate reception with weekly bespoke floral drops in rotatable artisan ceramic urns, conditioned for long-lasting perfume and structural grandeur.',
    primaryCtaText: 'SHOP NOW',
    secondaryCtaText: 'Inquire for Corporate Styling →',
    secondaryActionType: 'corporate',
    imageUrl: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=1600&q=85',
    imageAlt: 'Grand velvet hatbox arrangement with lavish pastel flowers',
    badgeTopText: 'WEEKLY LUXURY DROPS',
    badgeBottomText: 'FREE ARTISAN VASE',
    badgeCenterText: 'VIP CLUB',
  },
];

export const HeroSlider: React.FC = () => {
  const { setActiveView, setSelectedCategory, openSubscriptionModal, setIsCorporateModalOpen } = useShop();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slideCount = HERO_SLIDES.length;

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount);
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount);
  };

  const handlePrimaryCta = () => {
    setActiveView('shop');
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSecondaryCta = (actionType: 'subscriptions' | 'corporate' | 'protea') => {
    if (actionType === 'subscriptions') {
      openSubscriptionModal();
    } else if (actionType === 'corporate') {
      setIsCorporateModalOpen(true);
    } else if (actionType === 'protea') {
      setSelectedCategory('Protea & Fynbos Heritage');
      setActiveView('shop');
    }
  };

  const slide = HERO_SLIDES[currentSlide];

  return (
    <section 
      className="relative bg-[#FAF7F1] border-b border-[#D8C09A]/40 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="Featured Floral Collections"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-14">
        
        {/* Split Screen Container: LEFT 42% / RIGHT 58% */}
        <div className="flex flex-col lg:flex-row items-stretch min-h-[580px] lg:min-h-[660px] gap-8 lg:gap-10">
          
          {/* ========================================================= */}
          {/* LEFT 42%: Promotional Label, Headline, Desc, SHOP NOW, Link */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[42%] flex flex-col justify-center pr-0 lg:pr-6 z-10 order-2 lg:order-1">
            
            {/* Small uppercase promotional label */}
            <div className="inline-flex items-center gap-2 mb-4 sm:mb-6">
              <span className="w-6 h-[1.5px] bg-[#B97882]"></span>
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.24em] uppercase text-[#B97882]">
                {slide.promoLabel}
              </span>
            </div>

            {/* Large elegant headline (Cormorant Garamond) */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-[68px] leading-[1.08] text-[#5A1725] font-normal tracking-tight mb-5 sm:mb-6">
              {slide.headline}
            </h1>

            {/* Short supporting description (Montserrat) */}
            <p className="font-sans text-sm sm:text-base text-[#574B48] leading-relaxed max-w-lg mb-8 font-light">
              {slide.description}
            </p>

            {/* CTAs: Primary SHOP NOW button + Small secondary text link */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 pt-2">
              
              {/* Primary "SHOP NOW" Button */}
              <button
                onClick={handlePrimaryCta}
                className="inline-flex items-center justify-center px-9 py-4 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.24em] uppercase hover:bg-[#3D0F19] active:scale-[0.99] transition-all duration-200 shadow-md group"
              >
                <span>{slide.primaryCtaText}</span>
                <ArrowRight className="w-4 h-4 ml-2.5 text-[#D8C09A] transition-transform group-hover:translate-x-1" />
              </button>

              {/* Small secondary text link */}
              <button
                onClick={() => handleSecondaryCta(slide.secondaryActionType)}
                className="inline-flex items-center text-xs tracking-[0.16em] uppercase font-medium text-[#241C1A] hover:text-[#5A1725] transition-colors border-b border-[#241C1A]/30 hover:border-[#5A1725] pb-0.5 self-start sm:self-auto group"
              >
                <span>{slide.secondaryCtaText}</span>
              </button>

            </div>

            {/* Slide Navigation Controls & Counter */}
            <div className="flex items-center justify-between pt-10 sm:pt-14 mt-auto border-t border-[#D8C09A]/40">
              {/* Slide Counter */}
              <div className="flex items-center gap-3">
                <span className="font-serif text-2xl text-[#5A1725] font-light">
                  0{slide.id}
                </span>
                <span className="text-[#D8C09A] text-xs">/</span>
                <span className="text-xs text-[#574B48] tracking-widest font-sans">
                  0{slideCount}
                </span>
              </div>

              {/* Slide Progress Dots */}
              <div className="flex items-center gap-2">
                {HERO_SLIDES.map((s, idx) => (
                  <button
                    key={s.id}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`h-1.5 transition-all duration-300 rounded-none ${
                      idx === currentSlide
                        ? 'w-8 bg-[#5A1725]'
                        : 'w-2 bg-[#D8C09A]/60 hover:bg-[#B97882]'
                    }`}
                  />
                ))}
              </div>

              {/* Prev / Next Arrows */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous slide"
                  className="w-10 h-10 border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] hover:border-[#5A1725] transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next slide"
                  className="w-10 h-10 border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] hover:border-[#5A1725] transition-all"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>

          {/* ========================================================= */}
          {/* RIGHT 58%: Large Editorial Photograph extending to edges  */}
          {/* With circular badge overlapping lower-left corner         */}
          {/* ========================================================= */}
          <div className="w-full lg:w-[58%] relative min-h-[380px] sm:min-h-[480px] lg:min-h-[620px] order-1 lg:order-2">
            
            {/* The Image Container extending almost to the edges */}
            <div className="relative w-full h-full overflow-hidden shadow-xl bg-[#FAF7F1] border border-[#D8C09A]/60">
              
              <img
                key={slide.imageUrl}
                src={slide.imageUrl}
                alt={slide.imageAlt}
                className="w-full h-full object-cover object-center filter saturate-[1.05] brightness-[0.98] transition-transform duration-1000 ease-out hover:scale-102"
              />

              {/* Subtle luxury vignette gradient overlay for artistic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C1A]/40 via-transparent to-transparent pointer-events-none" />

              {/* Top right subtle luxury tag */}
              <div className="absolute top-4 right-4 bg-[#FAF7F1]/90 backdrop-blur-md px-3.5 py-1.5 border border-[#D8C09A]/80 text-[10px] tracking-[0.2em] uppercase font-semibold text-[#5A1725] shadow-xs">
                South African Floral Artistry
              </div>
            </div>

            {/* ========================================================= */}
            {/* CIRCULAR BADGE OVERLAPPING LOWER-LEFT CORNER OF THE IMAGE */}
            {/* ========================================================= */}
            <div className="absolute -bottom-5 sm:-bottom-7 -left-3 sm:-left-6 lg:-left-8 z-20">
              <div className="relative w-28 h-28 sm:w-34 sm:h-34 rounded-full bg-[#5A1725] text-[#FAF7F1] p-1.5 shadow-2xl border-2 border-[#D8C09A] flex items-center justify-center text-center transform transition-transform hover:scale-105 group cursor-default">
                
                {/* Outer delicate dashed champagne ring */}
                <div className="absolute inset-1.5 rounded-full border border-dashed border-[#D8C09A]/60 pointer-events-none animate-[spin_40s_linear_infinite]" />
                
                {/* Badge Center Contents */}
                <div className="flex flex-col items-center justify-center p-2 z-10">
                  <Sparkles className="w-3.5 h-3.5 text-[#D8C09A] mb-1 group-hover:rotate-45 transition-transform" />
                  <span className="text-[7.5px] sm:text-[9px] uppercase tracking-[0.18em] font-medium text-[#FAF7F1] leading-tight">
                    {slide.badgeTopText}
                  </span>
                  <div className="w-8 h-[1px] bg-[#D8C09A] my-1"></div>
                  <span className="font-serif text-xs sm:text-sm font-semibold tracking-wider text-[#D8C09A]">
                    {slide.badgeCenterText}
                  </span>
                  <span className="text-[7px] sm:text-[8px] uppercase tracking-[0.14em] text-[#D8C09A]/90 leading-tight mt-0.5">
                    {slide.badgeBottomText}
                  </span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
