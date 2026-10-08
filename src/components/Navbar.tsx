import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  Calendar,
  Building2
} from 'lucide-react';
import { FlowerCategory, OccasionType, FlowerType } from '../types';

export const Navbar: React.FC = () => {
  const { 
    cartCount, 
    wishlist, 
    setIsCartOpen, 
    setIsWishlistOpen,
    activeView,
    setActiveView,
    setSelectedCategory,
    setSelectedOccasion,
    setSelectedFlowerType,
    openSubscriptionModal,
    setIsCorporateModalOpen,
    searchQuery,
    setSearchQuery
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchActive, setIsSearchActive] = useState(false);

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

  const handleCategoryClick = (cat: FlowerCategory) => {
    setSelectedCategory(cat);
    setSelectedOccasion(null);
    setSelectedFlowerType(null);
    setActiveView('shop');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleOccasionClick = (occ: OccasionType) => {
    setSelectedOccasion(occ);
    setSelectedCategory(null);
    setSelectedFlowerType(null);
    setActiveView('shop');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleFlowerTypeClick = (type: FlowerType) => {
    setSelectedFlowerType(type);
    setSelectedCategory(null);
    setSelectedOccasion(null);
    setActiveView('shop');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  const handleViewAllShop = () => {
    setSelectedCategory(null);
    setSelectedOccasion(null);
    setSelectedFlowerType(null);
    setActiveView('shop');
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F1]/95 backdrop-blur-md border-b border-[#D8C09A]/40 transition-all duration-300">
      {/* Main Top Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-22 sm:h-24">
          
          {/* Mobile menu trigger */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#5A1725] hover:text-[#241C1A] transition-colors focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Left search for desktop */}
          <div className="hidden lg:flex items-center w-1/4">
            <div className="relative w-full max-w-xs">
              <input
                type="text"
                placeholder="Search garden roses, King proteas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeView !== 'shop') setActiveView('shop');
                }}
                className="w-full pl-9 pr-4 py-2 bg-transparent border-b border-[#D8C09A]/60 text-xs text-[#241C1A] placeholder-[#574B48]/60 focus:outline-none focus:border-[#5A1725] transition-colors font-sans"
              />
              <Search className="w-3.5 h-3.5 text-[#574B48]/70 absolute left-2 top-2.5" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-2 text-[10px] text-[#5A1725] font-semibold"
                >
                  CLEAR
                </button>
              )}
            </div>
          </div>

          {/* Center Brand Identity */}
          <div className="flex-1 text-center lg:w-2/4">
            <button 
              onClick={() => {
                setActiveView('home');
                setSelectedCategory(null);
                setSelectedOccasion(null);
                setSelectedFlowerType(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block group focus:outline-none text-center"
            >
              <span className="block font-serif text-3xl sm:text-4xl md:text-[42px] tracking-[0.14em] text-[#5A1725] uppercase font-light leading-none group-hover:text-[#3D0F19] transition-colors">
                Vanderlyn
              </span>
              <span className="block font-sans text-[9px] sm:text-[10px] tracking-[0.38em] uppercase text-[#B97882] mt-1 font-medium group-hover:text-[#5A1725] transition-colors">
                Botanical Atelier · South Africa
              </span>
            </button>
          </div>

          {/* Right Actions (Wishlist & Cart) */}
          <div className="flex items-center justify-end gap-3 sm:gap-6 w-1/4">
            {/* Mobile search toggle */}
            <button
              onClick={() => setIsSearchActive(!isSearchActive)}
              className="p-2 text-[#241C1A] hover:text-[#5A1725] transition-colors lg:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-[#241C1A] hover:text-[#5A1725] transition-colors group flex items-center gap-1.5"
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 transition-transform group-hover:scale-110 ${wishlist.length > 0 ? 'fill-[#5A1725] text-[#5A1725]' : ''}`} />
              <span className="hidden xl:inline text-xs font-medium tracking-wider uppercase text-[#241C1A] group-hover:text-[#5A1725]">
                Saved
              </span>
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#5A1725] text-[#FAF7F1] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative py-2 px-3 sm:px-4 bg-[#5A1725] text-[#FAF7F1] hover:bg-[#3D0F19] transition-all flex items-center gap-2 group shadow-xs"
              aria-label="Shopping Bag"
            >
              <ShoppingBag className="w-4 h-4 text-[#D8C09A] transition-transform group-hover:scale-105" />
              <span className="text-xs font-medium tracking-widest uppercase">
                Basket
              </span>
              <span className="ml-0.5 text-xs font-serif bg-[#D8C09A] text-[#5A1725] px-1.5 py-0.2 rounded-full font-bold">
                {cartCount}
              </span>
            </button>
          </div>

        </div>

        {/* Mobile search expanded */}
        {isSearchActive && (
          <div className="lg:hidden pb-3 pt-1 border-t border-[#D8C09A]/40">
            <div className="relative">
              <input
                type="text"
                placeholder="Search roses, proteas, arrangements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (activeView !== 'shop') setActiveView('shop');
                }}
                className="w-full pl-9 pr-8 py-2 bg-white/70 border border-[#D8C09A] text-xs text-[#241C1A] rounded-none focus:outline-none focus:border-[#5A1725]"
              />
              <Search className="w-4 h-4 text-[#574B48] absolute left-3 top-2.5" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-2 text-xs text-[#5A1725] font-medium"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Navigation Links (Montserrat Medium) */}
        <nav className="hidden lg:flex items-center justify-center border-t border-[#D8C09A]/30 py-3 font-sans">
          <ul className="flex items-center gap-8 xl:gap-10 text-[12px] font-medium tracking-[0.14em] uppercase text-[#241C1A]">
            
            {/* Home */}
            <li>
              <button
                onClick={() => {
                  setActiveView('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-1 transition-colors hover:text-[#5A1725] relative ${activeView === 'home' ? 'text-[#5A1725] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#5A1725]' : ''}`}
              >
                Home
              </button>
            </li>

            {/* Shop All */}
            <li>
              <button
                onClick={handleViewAllShop}
                className={`py-1 transition-colors hover:text-[#5A1725] relative ${activeView === 'shop' && !activeDropdown ? 'text-[#5A1725] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#5A1725]' : ''}`}
              >
                All Arrangements
              </button>
            </li>

            {/* Top Categories Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setActiveDropdown('categories')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={handleViewAllShop}
                className="py-1 flex items-center gap-1 hover:text-[#5A1725] transition-colors"
              >
                Categories
                <ChevronDown className="w-3 h-3 text-[#B97882]" />
              </button>

              {activeDropdown === 'categories' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#FAF7F1] border border-[#D8C09A] shadow-xl p-4 z-50">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#B97882] pb-2 border-b border-[#D8C09A]/40 mb-2 font-medium">
                    Signature Collections
                  </div>
                  <div className="flex flex-col gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => handleCategoryClick(cat)}
                        className="text-left text-xs tracking-wider normal-case font-medium text-[#241C1A] hover:text-[#5A1725] hover:translate-x-1 transition-all py-1"
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Occasions Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setActiveDropdown('occasions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="py-1 flex items-center gap-1 hover:text-[#5A1725] transition-colors"
              >
                Occasions
                <ChevronDown className="w-3 h-3 text-[#B97882]" />
              </button>

              {activeDropdown === 'occasions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#FAF7F1] border border-[#D8C09A] shadow-xl p-4 z-50">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#B97882] pb-2 border-b border-[#D8C09A]/40 mb-2 font-medium">
                    Curated by Occasion
                  </div>
                  <div className="flex flex-col gap-2">
                    {occasions.map((occ) => (
                      <button
                        key={occ}
                        onClick={() => handleOccasionClick(occ)}
                        className="text-left text-xs tracking-wider normal-case font-medium text-[#241C1A] hover:text-[#5A1725] hover:translate-x-1 transition-all py-1"
                      >
                        {occ}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Flower Types Dropdown */}
            <li 
              className="relative"
              onMouseEnter={() => setActiveDropdown('flowers')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                className="py-1 flex items-center gap-1 hover:text-[#5A1725] transition-colors"
              >
                Flower Types
                <ChevronDown className="w-3 h-3 text-[#B97882]" />
              </button>

              {activeDropdown === 'flowers' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-[#FAF7F1] border border-[#D8C09A] shadow-xl p-4 z-50">
                  <div className="text-[10px] tracking-[0.2em] uppercase text-[#B97882] pb-2 border-b border-[#D8C09A]/40 mb-2 font-medium">
                    Flora Varietals
                  </div>
                  <div className="flex flex-col gap-2">
                    {flowerTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => handleFlowerTypeClick(type)}
                        className="text-left text-xs tracking-wider normal-case font-medium text-[#241C1A] hover:text-[#5A1725] hover:translate-x-1 transition-all py-1"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </li>

            {/* Subscriptions */}
            <li>
              <button
                onClick={() => {
                  setActiveView('subscriptions');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-1 transition-colors hover:text-[#5A1725] flex items-center gap-1.5 ${activeView === 'subscriptions' ? 'text-[#5A1725] font-semibold' : ''}`}
              >
                <Calendar className="w-3.5 h-3.5 text-[#B97882]" />
                Subscriptions
              </button>
            </li>

            {/* Corporate */}
            <li>
              <button
                onClick={() => {
                  setActiveView('corporate');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-1 transition-colors hover:text-[#5A1725] flex items-center gap-1.5 ${activeView === 'corporate' ? 'text-[#5A1725] font-semibold' : ''}`}
              >
                <Building2 className="w-3.5 h-3.5 text-[#B97882]" />
                Corporate Flowers
              </button>
            </li>

            {/* Story */}
            <li>
              <button
                onClick={() => {
                  setActiveView('story');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`py-1 transition-colors hover:text-[#5A1725] ${activeView === 'story' ? 'text-[#5A1725] font-semibold' : ''}`}
              >
                Atelier Story
              </button>
            </li>

          </ul>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[115px] bg-[#FAF7F1] z-50 border-t border-[#D8C09A] overflow-y-auto px-6 py-6 font-sans">
          <div className="flex flex-col space-y-5 text-sm tracking-widest uppercase">
            <button
              onClick={() => {
                setActiveView('home');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#5A1725] font-semibold border-b border-[#D8C09A]/40"
            >
              Home
            </button>
            <button
              onClick={handleViewAllShop}
              className="text-left py-2 text-[#241C1A] border-b border-[#D8C09A]/40"
            >
              All Arrangements
            </button>

            {/* Categories Mobile */}
            <div className="py-2 border-b border-[#D8C09A]/40">
              <span className="text-[10px] text-[#B97882] block mb-2 font-bold tracking-widest">
                CATEGORIES
              </span>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {categories.map((c) => (
                  <button
                    key={c}
                    onClick={() => handleCategoryClick(c)}
                    className="text-left text-xs capitalize text-[#241C1A] py-1"
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasions Mobile */}
            <div className="py-2 border-b border-[#D8C09A]/40">
              <span className="text-[10px] text-[#B97882] block mb-2 font-bold tracking-widest">
                OCCASIONS
              </span>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {occasions.map((o) => (
                  <button
                    key={o}
                    onClick={() => handleOccasionClick(o)}
                    className="text-left text-xs capitalize text-[#241C1A] py-1"
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setActiveView('subscriptions');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#241C1A] border-b border-[#D8C09A]/40 flex items-center justify-between"
            >
              <span>Flower Subscriptions</span>
              <Sparkles className="w-4 h-4 text-[#B97882]" />
            </button>

            <button
              onClick={() => {
                setActiveView('corporate');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#241C1A] border-b border-[#D8C09A]/40"
            >
              Corporate Flowers
            </button>

            <button
              onClick={() => {
                setActiveView('story');
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 text-[#241C1A] border-b border-[#D8C09A]/40"
            >
              The Atelier Story
            </button>

            <div className="pt-4 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openSubscriptionModal();
                }}
                className="w-full py-3 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase text-center"
              >
                Join Flower Subscription
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCorporateModalOpen(true);
                }}
                className="w-full py-3 border border-[#5A1725] text-[#5A1725] text-xs font-semibold tracking-widest uppercase text-center"
              >
                Corporate Florist Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
