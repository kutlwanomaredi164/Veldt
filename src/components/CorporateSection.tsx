import React from 'react';
import { useShop } from '../context/ShopContext';
import { Building2, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const CorporateSection: React.FC = () => {
  const { setIsCorporateModalOpen } = useShop();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F1] border-b border-[#D8C09A]/40" id="corporate-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] sm:aspect-[16/11] overflow-hidden shadow-2xl border border-[#D8C09A]">
              <img
                src="https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=85"
                alt="Corporate floral styling for luxury interior"
                className="w-full h-full object-cover filter saturate-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241C1A]/40 via-transparent to-transparent" />
            </div>

            {/* Overlapping smaller inset image */}
            <div className="hidden sm:block absolute -bottom-8 -right-6 w-3/5 aspect-[4/3] shadow-2xl border-2 border-[#FAF7F1] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80"
                alt="Architectural King Proteas on boardroom marble table"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating luxury stamp */}
            <div className="absolute top-4 left-4 bg-[#5A1725] text-[#FAF7F1] px-4 py-2 text-[10px] tracking-[0.2em] uppercase font-semibold border border-[#D8C09A]">
              Sandton · Waterfront · Rosebank
            </div>
          </div>

          {/* Right Column: Copy & Offerings */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-3">
              <Building2 className="w-3.5 h-3.5 text-[#B97882]" />
              <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#B97882]">
                CORPORATE & COMMERCIAL CLIENTELE
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#5A1725] font-normal tracking-tight mb-5 leading-tight">
              Bespoke Floral Styling for Prestigious Workspaces
            </h2>

            <p className="font-sans text-sm text-[#574B48] font-light leading-relaxed mb-6">
              Create an indelible first impression. Vanderlyn Botanical Atelier designs, installs, and maintains architectural living botanical centerpieces for private equity firms, luxury automotive showrooms, five-star boutique hotels, and executive suites across Gauteng and the Western Cape.
            </p>

            {/* Key Commercial Pillars */}
            <div className="space-y-3.5 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5A1725] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-[#241C1A] uppercase tracking-wider block">
                    Weekly Reception & Boardroom Turnover
                  </span>
                  <span className="text-xs text-[#574B48] font-light">
                    Fresh installation every Monday before 08:00 AM, in pristine rotated Italian and Cape ceramic vessels.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5A1725] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-[#241C1A] uppercase tracking-wider block">
                    VIP Executive & Client Gifting Accounts
                  </span>
                  <span className="text-xs text-[#574B48] font-light">
                    On-demand hand-tied arrangements and Cap Classique hampers dispatched with your bespoke branded card.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-[#5A1725] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-semibold text-[#241C1A] uppercase tracking-wider block">
                    Private Brand Activations & Gala Banquets
                  </span>
                  <span className="text-xs text-[#574B48] font-light">
                    Complete floral scenography, suspended installations, and dramatic botanical tablescapes.
                  </span>
                </div>
              </div>
            </div>

            {/* CTA Trigger */}
            <div>
              <button
                onClick={() => setIsCorporateModalOpen(true)}
                className="inline-flex items-center gap-3 px-8 py-4 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#3D0F19] transition-all duration-200 shadow-md group"
              >
                <span>Request Corporate Proposal</span>
                <ArrowRight className="w-4 h-4 text-[#D8C09A] transition-transform group-hover:translate-x-1" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
