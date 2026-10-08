import React, { useState, useEffect } from 'react';
import { Phone, Clock, ShieldCheck, ChevronRight } from 'lucide-react';

const ANNOUNCEMENTS = [
  'SAME-DAY BOTANICAL DELIVERY ACROSS GAUTENG & CAPE TOWN · ORDERS BEFORE 12:00 PM',
  'COMPLIMENTARY WAX-SEALED CALLIGRAPHY CARD INCLUDED WITH EVERY ARRANGEMENT',
  'BESPOKE WEEKLY FLOWER SUBSCRIPTIONS FOR RESIDENCES & EXECUTIVE BOARDROOMS',
  '100% FRESH ESTATE-GROWN BLOOMS & SUSTAINABLE CAPE FYNBOS HARVEST',
];

export const AnnouncementBar: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <aside aria-label="Store Announcements" className="bg-[#5A1725] text-[#FAF7F1] text-[11px] tracking-[0.16em] uppercase py-2 px-4 border-b border-[#731E30]/40 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left helper info */}
        <div className="hidden lg:flex items-center gap-6 text-[#D8C09A]/80 font-medium tracking-widest text-[10px]">
          <span className="flex items-center gap-1.5 hover:text-[#FAF7F1] transition-colors">
            <Phone className="w-3 h-3 text-[#D8C09A]" />
            +27 (0)11 884 9200
          </span>
          <span className="flex items-center gap-1.5 hover:text-[#FAF7F1] transition-colors">
            <Clock className="w-3 h-3 text-[#D8C09A]" />
            ATELIER: MON–SAT 08:30–18:00
          </span>
        </div>

        {/* Center rotating promo */}
        <div className="flex items-center justify-center gap-2 text-center overflow-hidden h-5">
          <p className="font-medium text-[#FAF7F1] tracking-[0.18em] animate-fade-in flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D8C09A]"></span>
            {ANNOUNCEMENTS[currentIndex]}
          </p>
        </div>

        {/* Right currency & guarantee */}
        <div className="hidden sm:flex items-center gap-4 text-[#D8C09A] font-medium text-[10px] tracking-widest">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8C09A]" />
            FRESHNESS GUARANTEE
          </span>
          <span className="text-[#FAF7F1]/30">|</span>
          <span className="bg-[#4D131F] px-2 py-0.5 rounded text-[#D8C09A] border border-[#731E30] font-semibold">
            ZAR (R)
          </span>
        </div>
      </div>
    </aside>
  );
};
