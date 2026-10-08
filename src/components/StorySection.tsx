import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Sparkles, Award } from 'lucide-react';

export const StorySection: React.FC = () => {
  const { setActiveView } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F1] border-b border-[#D8C09A]/40" id="story-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero Story */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-16">
          
          <div className="lg:col-span-5 order-2 lg:order-1">
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#B97882] font-semibold block mb-2">
              HERITAGE & BOTANICAL REVERENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#5A1725] font-normal tracking-tight mb-6 leading-tight">
              Where Cape Wildflower Grandeur Meets Old-World European Couture
            </h2>
            <div className="space-y-4 text-xs sm:text-sm text-[#574B48] font-light leading-relaxed">
              <p>
                Founded in Johannesburg and expanding to the coastal ateliers of the Cape Winelands, Vanderlyn was conceived out of a singular desire: to liberate floral design from the commonplace and restore it as a fine artistic medium.
              </p>
              <p>
                Every stem that enters our studio is conditioned by hand according to master European floristry disciplines. We marry the dramatic architecture of certified Cape mountain King Proteas with the lush, scented perfume of English David Austin garden roses and imported Dutch parrot tulips.
              </p>
              <p>
                Our signature burgundy and champagne velvet cylinders, fluted hand-blown Italian glassware, and wax-sealed calligraphy notes ensure that receiving a Vanderlyn arrangement is an unforgettable ceremonial occasion.
              </p>
            </div>

            <div className="pt-8">
              <button
                onClick={() => setActiveView('shop')}
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#3D0F19] transition-all"
              >
                <span>Explore The Autumn Collection</span>
                <ArrowRight className="w-4 h-4 text-[#D8C09A]" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="aspect-[3/4] overflow-hidden border border-[#D8C09A] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80"
                  alt="Florist conditioning garden roses"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-[3/4] overflow-hidden border border-[#D8C09A] shadow-lg mt-8">
                <img
                  src="https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80"
                  alt="King Proteas harvested in Cape mountains"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#D8C09A]/40 text-center">
          <div className="p-6 bg-[#F4EFE6] border border-[#D8C09A]/50">
            <Sparkles className="w-6 h-6 text-[#5A1725] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#5A1725] font-medium mb-2">Sustainable Cape Stewardship</h3>
            <p className="text-xs text-[#574B48] font-light leading-relaxed">
              We work exclusively with certified mountain reserves ensuring zero over-harvesting of endemic South African flora.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFE6] border border-[#D8C09A]/50">
            <Award className="w-6 h-6 text-[#5A1725] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#5A1725] font-medium mb-2">Master Florist Hand-Craft</h3>
            <p className="text-xs text-[#574B48] font-light leading-relaxed">
              Each arrangement is uniquely composed stem-by-stem, tied with French velvet ribbons and accompanied by wax-sealed calligraphy.
            </p>
          </div>

          <div className="p-6 bg-[#F4EFE6] border border-[#D8C09A]/50">
            <Sparkles className="w-6 h-6 text-[#5A1725] mx-auto mb-3" />
            <h3 className="font-serif text-xl text-[#5A1725] font-medium mb-2">Temperature-Controlled Care</h3>
            <p className="text-xs text-[#574B48] font-light leading-relaxed">
              Dispatched in specialized refrigerated courier transports to ensure dewy morning freshness upon arrival.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
