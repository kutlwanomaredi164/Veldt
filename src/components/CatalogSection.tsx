import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from './ProductCard';
import { 
  Filter, 
  X, 
  Grid3X3, 
  LayoutGrid, 
  SlidersHorizontal,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { FlowerCategory, OccasionType, FlowerType } from '../types';

export const CatalogSection: React.FC = () => {
  const { 
    products, 
    selectedCategory, 
    setSelectedCategory,
    selectedOccasion, 
    setSelectedOccasion,
    selectedFlowerType, 
    setSelectedFlowerType,
    searchQuery,
    setSearchQuery 
  } = useShop();

  const [sortOption, setSortOption] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(3500);
  const [gridCols, setGridCols] = useState<3 | 4>(4);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories: FlowerCategory[] = [
    'Signature Bouquets',
    'Grand Hatboxes',
    'Sculptural Vases',
    'Protea & Fynbos Heritage',
    'Dried & Preserved',
    'Luxury Gifting Sets'
  ];

  const occasions: OccasionType[] = [
    'Romance & Anniversary',
    'Birthday & Celebration',
    'Sympathy & Grace',
    'Congratulations',
    'Just Because',
    'Corporate Elegance'
  ];

  const flowerTypes: FlowerType[] = [
    'Garden Roses',
    'King Proteas',
    'Phalaenopsis Orchids',
    'Peonies & Ranunculus',
    'Dutch Tulips',
    'Fynbos Botanicals'
  ];

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Occasion filter
      if (selectedOccasion && !p.occasions.includes(selectedOccasion as OccasionType)) return false;

      // Flower Type filter
      if (selectedFlowerType && !p.flowerTypes.includes(selectedFlowerType as FlowerType)) return false;

      // Max price
      if (p.price > maxPrice) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesSubtitle = p.subtitle.toLowerCase().includes(query);
        const matchesDesc = p.description.toLowerCase().includes(query);
        const matchesCategory = p.category.toLowerCase().includes(query);
        const matchesFlowers = p.flowerTypes.some((f) => f.toLowerCase().includes(query));
        if (!matchesName && !matchesSubtitle && !matchesDesc && !matchesCategory && !matchesFlowers) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortOption === 'price-asc') return a.price - b.price;
      if (sortOption === 'price-desc') return b.price - a.price;
      if (sortOption === 'rating') return b.rating - a.rating;
      if (sortOption === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      // featured
      return (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0);
    });
  }, [products, selectedCategory, selectedOccasion, selectedFlowerType, maxPrice, searchQuery, sortOption]);

  const activeFilterCount = 
    (selectedCategory ? 1 : 0) + 
    (selectedOccasion ? 1 : 0) + 
    (selectedFlowerType ? 1 : 0) + 
    (maxPrice < 3500 ? 1 : 0) + 
    (searchQuery ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedOccasion(null);
    setSelectedFlowerType(null);
    setMaxPrice(3500);
    setSearchQuery('');
  };

  return (
    <section className="py-12 sm:py-20 bg-[#FAF7F1]" id="shop-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="border-b border-[#D8C09A]/40 pb-8 mb-8 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B97882] font-semibold block mb-1">
                ATELIER CATALOGUE · BESPOKE BOTANICALS
              </span>
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#5A1725] font-normal tracking-tight">
                {selectedCategory || selectedOccasion || selectedFlowerType || 'All Arrangements & Floral Gifts'}
              </h1>
            </div>
            
            <p className="text-xs text-[#574B48] font-light max-w-sm font-sans">
              Hand-tied daily with seasonal South African fynbos, heirloom roses, and luxury stem varietals.
            </p>
          </div>
        </div>

        {/* Toolbar: Filter Toggle, Sort & Grid Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-[#D8C09A]/30 mb-8">
          
          {/* Left: Mobile filter trigger & Filter chips */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs font-semibold tracking-wider uppercase"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFilterCount > 0 ? `(${activeFilterCount})` : ''}</span>
            </button>

            <span className="text-xs text-[#574B48] font-light tracking-wider">
              Showing <strong className="font-semibold text-[#241C1A]">{filteredProducts.length}</strong> creations
            </span>

            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-xs text-[#5A1725] underline hover:text-[#3D0F19] tracking-wider font-medium ml-2"
              >
                Reset All
              </button>
            )}
          </div>

          {/* Right: Sort Dropdown & Layout Buttons */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
            
            {/* Sort Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#574B48] uppercase tracking-wider font-medium hidden sm:inline">
                Sort:
              </span>
              <div className="relative">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="bg-[#FAF7F1] border border-[#D8C09A] py-1.5 pl-3 pr-8 text-xs text-[#241C1A] uppercase tracking-wider font-medium focus:outline-none focus:border-[#5A1725] appearance-none cursor-pointer"
                >
                  <option value="featured">Featured Florist Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">New Arrivals</option>
                </select>
                <ChevronDown className="w-3 h-3 text-[#574B48] absolute right-2.5 top-2.5 pointer-events-none" />
              </div>
            </div>

            {/* Grid toggle desktop */}
            <div className="hidden md:flex items-center gap-1 border border-[#D8C09A] p-0.5">
              <button
                onClick={() => setGridCols(3)}
                aria-label="3 columns grid"
                className={`p-1.5 transition-colors ${gridCols === 3 ? 'bg-[#5A1725] text-[#FAF7F1]' : 'text-[#574B48] hover:text-[#241C1A]'}`}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setGridCols(4)}
                aria-label="4 columns grid"
                className={`p-1.5 transition-colors ${gridCols === 4 ? 'bg-[#5A1725] text-[#FAF7F1]' : 'text-[#574B48] hover:text-[#241C1A]'}`}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Active Filter Badges */}
        {activeFilterCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {selectedCategory && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs px-3 py-1 font-medium">
                Category: {selectedCategory}
                <button onClick={() => setSelectedCategory(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedOccasion && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs px-3 py-1 font-medium">
                Occasion: {selectedOccasion}
                <button onClick={() => setSelectedOccasion(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {selectedFlowerType && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs px-3 py-1 font-medium">
                Flower: {selectedFlowerType}
                <button onClick={() => setSelectedFlowerType(null)}><X className="w-3 h-3" /></button>
              </span>
            )}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs px-3 py-1 font-medium">
                Search: "{searchQuery}"
                <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
              </span>
            )}
            {maxPrice < 3500 && (
              <span className="inline-flex items-center gap-1.5 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs px-3 py-1 font-medium">
                Under R {maxPrice}
                <button onClick={() => setMaxPrice(3500)}><X className="w-3 h-3" /></button>
              </span>
            )}
          </div>
        )}

        {/* Main Layout: Left Sidebar Filters + Right Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ========================================= */}
          {/* DESKTOP SIDEBAR FILTERS (Col 3)           */}
          {/* ========================================= */}
          <aside className={`lg:col-span-3 space-y-8 pr-4 lg:block ${mobileFilterOpen ? 'block fixed inset-0 z-50 bg-[#FAF7F1] p-6 overflow-y-auto' : 'hidden'}`}>
            
            {mobileFilterOpen && (
              <div className="flex items-center justify-between pb-4 border-b border-[#D8C09A] mb-4 lg:hidden">
                <span className="font-serif text-2xl text-[#5A1725]">Filter Creations</span>
                <button onClick={() => setMobileFilterOpen(false)} className="p-1 text-[#241C1A]">
                  <X className="w-6 h-6" />
                </button>
              </div>
            )}

            {/* Filter by Category */}
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5A1725] border-b border-[#D8C09A] pb-2 mb-3">
                COLLECTIONS
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                    selectedCategory === null ? 'text-[#5A1725] font-semibold' : 'text-[#241C1A] hover:text-[#5A1725]'
                  }`}
                >
                  <span>All Collections</span>
                  <span className="text-[11px] text-[#B97882]">{products.length}</span>
                </button>
                {categories.map((c) => {
                  const count = products.filter((p) => p.category === c).length;
                  return (
                    <button
                      key={c}
                      onClick={() => {
                        setSelectedCategory(selectedCategory === c ? null : c);
                        if (mobileFilterOpen) setMobileFilterOpen(false);
                      }}
                      className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                        selectedCategory === c ? 'text-[#5A1725] font-semibold' : 'text-[#241C1A] hover:text-[#5A1725]'
                      }`}
                    >
                      <span>{c}</span>
                      <span className="text-[11px] text-[#B97882]">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Filter by Occasion */}
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5A1725] border-b border-[#D8C09A] pb-2 mb-3">
                OCCASIONS
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedOccasion(null)}
                  className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                    selectedOccasion === null ? 'text-[#5A1725] font-semibold' : 'text-[#241C1A] hover:text-[#5A1725]'
                  }`}
                >
                  <span>All Occasions</span>
                </button>
                {occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => {
                      setSelectedOccasion(selectedOccasion === o ? null : o);
                      if (mobileFilterOpen) setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                      selectedOccasion === o ? 'text-[#5A1725] font-semibold' : 'text-[#241C1A] hover:text-[#5A1725]'
                    }`}
                  >
                    <span>{o}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Filter by Flower Type */}
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5A1725] border-b border-[#D8C09A] pb-2 mb-3">
                FLOWER VARIETAL
              </h3>
              <div className="space-y-1.5">
                <button
                  onClick={() => setSelectedFlowerType(null)}
                  className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                    selectedFlowerType === null ? 'text-[#5A1725] font-semibold' : 'text-[#241C1A] hover:text-[#5A1725]'
                  }`}
                >
                  <span>All Blooms</span>
                </button>
                {flowerTypes.map((f) => (
                  <button
                    key={f}
                    onClick={() => {
                      setSelectedFlowerType(selectedFlowerType === f ? null : f);
                      if (mobileFilterOpen) setMobileFilterOpen(false);
                    }}
                    className={`w-full text-left text-xs py-1 transition-colors flex items-center justify-between ${
                      selectedFlowerType === f ? 'text-[#5A1725] font-semibold' : 'text-[#241C1A] hover:text-[#5A1725]'
                    }`}
                  >
                    <span>{f}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div>
              <h3 className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#5A1725] border-b border-[#D8C09A] pb-2 mb-3">
                PRICE RANGE (ZAR)
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1000"
                  max="3500"
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#5A1725] cursor-pointer"
                />
                <div className="flex items-center justify-between text-xs text-[#574B48]">
                  <span>R 1,000</span>
                  <span className="font-semibold text-[#5A1725]">Up to R {maxPrice}</span>
                  <span>R 3,500</span>
                </div>
              </div>
            </div>

            {/* Mobile close button */}
            {mobileFilterOpen && (
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-3 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase mt-6"
              >
                Apply Filters ({filteredProducts.length})
              </button>
            )}

          </aside>

          {/* ========================================= */}
          {/* RIGHT PRODUCT GRID (Col 9)                */}
          {/* ========================================= */}
          <div className="lg:col-span-9">
            
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center border border-dashed border-[#D8C09A] p-8">
                <Sparkles className="w-8 h-8 text-[#B97882] mx-auto mb-3" />
                <h3 className="font-serif text-2xl text-[#5A1725] mb-2">No Floral Arrangements Found</h3>
                <p className="text-xs text-[#574B48] font-light max-w-md mx-auto mb-6">
                  We could not find any arrangements matching your selected filters. Try clearing some selections or search for another flower type.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="px-6 py-2.5 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${gridCols === 4 ? 'xl:grid-cols-3' : 'xl:grid-cols-3'} gap-6 sm:gap-7`}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
