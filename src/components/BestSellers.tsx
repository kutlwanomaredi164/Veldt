import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { ArrowRight, Sparkles } from 'lucide-react';

export const BestSellers: React.FC = () => {
  const { products, setActiveView, setSelectedCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | 'roses' | 'proteas' | 'hatboxes'>('all');

  // Filter products for the best sellers section
  const filteredProducts = products.filter((p) => {
    if (activeTab === 'all') return p.isBestSeller;
    if (activeTab === 'roses') return p.flowerTypes.includes('Garden Roses');
    if (activeTab === 'proteas') return p.flowerTypes.includes('King Proteas') || p.category === 'Protea & Fynbos Heritage';
    if (activeTab === 'hatboxes') return p.category === 'Grand Hatboxes';
    return true;
  });

  const handleViewAll = () => {
    setActiveView('shop');
    setSelectedCategory(null);
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F1] border-b border-[#D8C09A]/40" id="best-sellers-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#B97882]" />
            <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#B97882]">
              MOST COVETED BOTANICALS
            </span>
            <Sparkles className="w-3.5 h-3.5 text-[#B97882]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#5A1725] font-normal tracking-tight mb-4">
            Curated Best Sellers
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#574B48] font-light max-w-xl mx-auto leading-relaxed">
            Our most requested couture floral creations, lovingly arranged by master florists and delivered across Johannesburg, Pretoria, and Cape Town with utmost care.
          </p>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-all ${
                activeTab === 'all'
                  ? 'bg-[#5A1725] text-[#FAF7F1] border border-[#5A1725] shadow-xs'
                  : 'bg-transparent text-[#241C1A] border border-[#D8C09A] hover:border-[#5A1725]'
              }`}
            >
              All Best Sellers
            </button>
            <button
              onClick={() => setActiveTab('roses')}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-all ${
                activeTab === 'roses'
                  ? 'bg-[#5A1725] text-[#FAF7F1] border border-[#5A1725] shadow-xs'
                  : 'bg-transparent text-[#241C1A] border border-[#D8C09A] hover:border-[#5A1725]'
              }`}
            >
              Estate Garden Roses
            </button>
            <button
              onClick={() => setActiveTab('proteas')}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-all ${
                activeTab === 'proteas'
                  ? 'bg-[#5A1725] text-[#FAF7F1] border border-[#5A1725] shadow-xs'
                  : 'bg-transparent text-[#241C1A] border border-[#D8C09A] hover:border-[#5A1725]'
              }`}
            >
              Cape King Proteas
            </button>
            <button
              onClick={() => setActiveTab('hatboxes')}
              className={`px-5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-all ${
                activeTab === 'hatboxes'
                  ? 'bg-[#5A1725] text-[#FAF7F1] border border-[#5A1725] shadow-xs'
                  : 'bg-transparent text-[#241C1A] border border-[#D8C09A] hover:border-[#5A1725]'
              }`}
            >
              Grand Velvet Hatboxes
            </button>
          </div>
        </div>

        {/* Product Cards Grid: 4 columns on large screens, 2 on mobile/tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom CTA to View Full Catalog */}
        <div className="text-center mt-12 sm:mt-16">
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-3 px-8 py-3.5 bg-transparent border border-[#5A1725] text-[#5A1725] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-all duration-200"
          >
            <span>Explore All 24+ Atelier Creations</span>
            <ArrowRight className="w-4 h-4 text-[#B97882]" />
          </button>
        </div>

      </div>
    </section>
  );
};
