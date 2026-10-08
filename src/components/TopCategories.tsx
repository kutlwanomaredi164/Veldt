import React from 'react';
import { useShop } from '../context/ShopContext';
import { FlowerCategory } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface CategoryCard {
  title: FlowerCategory;
  subtitle: string;
  image: string;
  itemCount: number;
}

const TOP_CATEGORIES: CategoryCard[] = [
  {
    title: 'Signature Bouquets',
    subtitle: 'Estate garden roses, sweet peas & delicate Cape flora hand-tied with velvet ribbon',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
    itemCount: 14,
  },
  {
    title: 'Grand Hatboxes',
    subtitle: 'Opulent domes of hydrangeas & roses nested in handcrafted velvet presentation boxes',
    image: 'https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80',
    itemCount: 8,
  },
  {
    title: 'Sculptural Vases',
    subtitle: 'Artisanal ceramics & ribbed glassware paired with architectural white lilies and orchids',
    image: 'https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80',
    itemCount: 11,
  },
  {
    title: 'Protea & Fynbos Heritage',
    subtitle: 'Certified sustainable Cape King Proteas, wild crimson pincushions & endemic fynbos',
    image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80',
    itemCount: 9,
  },
  {
    title: 'Dried & Preserved',
    subtitle: 'Everlasting botanicals treated with natural vegetable glycerin to endure for years',
    image: 'https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80',
    itemCount: 6,
  },
  {
    title: 'Luxury Gifting Sets',
    subtitle: 'Curated arrangements paired with Graham Beck Cap Classique & Winelands truffles',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
    itemCount: 5,
  },
];

export const TopCategories: React.FC = () => {
  const { setSelectedCategory, setActiveView } = useShop();

  const handleSelectCategory = (cat: FlowerCategory) => {
    setSelectedCategory(cat);
    setActiveView('shop');
    const shopEl = document.getElementById('shop-section');
    if (shopEl) {
      shopEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-[#FAF7F1] border-b border-[#D8C09A]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with generous whitespace */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div className="max-w-xl">
            <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#B97882] block mb-2">
              CURATED BOTANICAL REALMS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#5A1725] font-normal tracking-tight">
              Explore Our Signature Categories
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-[#574B48] max-w-sm mt-4 md:mt-0 font-light leading-relaxed">
            From regal King Proteas harvested on Western Cape slopes to romantic David Austin garden roses delivered same-day in Gauteng.
          </p>
        </div>

        {/* Categories Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TOP_CATEGORIES.map((cat, idx) => (
            <div
              key={cat.title}
              onClick={() => handleSelectCategory(cat.title)}
              className="group cursor-pointer bg-[#FAF7F1] border border-[#D8C09A]/50 p-3 sm:p-4 hover:border-[#5A1725] transition-all duration-300 flex flex-col justify-between hover:shadow-lg"
            >
              {/* Image with subtle zoom */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EBE3D5] mb-4">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                />
                <div className="absolute inset-0 bg-[#241C1A]/10 group-hover:bg-transparent transition-colors" />
                
                {/* Floating item count */}
                <div className="absolute top-3 right-3 bg-[#FAF7F1]/95 text-[#5A1725] text-[10px] font-semibold tracking-widest px-2.5 py-1 border border-[#D8C09A]">
                  0{idx + 1}
                </div>
              </div>

              {/* Text Info */}
              <div className="pt-2">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-serif text-xl sm:text-2xl text-[#5A1725] font-medium group-hover:text-[#3D0F19] transition-colors">
                    {cat.title}
                  </h3>
                  <div className="w-7 h-7 rounded-full border border-[#D8C09A] flex items-center justify-center text-[#5A1725] group-hover:bg-[#5A1725] group-hover:text-[#FAF7F1] group-hover:border-[#5A1725] transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                <p className="text-xs text-[#574B48] font-light leading-relaxed mb-3 line-clamp-2">
                  {cat.subtitle}
                </p>

                <div className="text-[10px] tracking-[0.16em] uppercase text-[#B97882] font-semibold flex items-center gap-1 group-hover:text-[#5A1725]">
                  <span>DISCOVER COLLECTION</span>
                  <span>→</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
