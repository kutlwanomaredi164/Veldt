import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist, openQuickView } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isFavorited = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      selectedSize: 'Classic',
      quantity: 1,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  };

  const handleSelectOptions = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  return (
    <article
      className="group relative flex flex-col bg-[#FAF7F1] border border-[#D8C09A]/40 hover:border-[#5A1725] transition-all duration-300 p-3 sm:p-4 hover:shadow-xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container */}
      <div 
        onClick={() => openQuickView(product)}
        className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4EFE6] cursor-pointer"
      >
        <img
          src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
        />

        {/* Tag Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#5A1725] text-[#FAF7F1] text-[9.5px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 shadow-xs">
              Best Seller
            </span>
          )}
          {product.isSeasonalLimited && (
            <span className="bg-[#B97882] text-[#FAF7F1] text-[9.5px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1 shadow-xs">
              Seasonal Limited
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#D8C09A] text-[#241C1A] text-[9.5px] font-bold tracking-[0.16em] uppercase px-2.5 py-1 shadow-xs">
              New Arrival
            </span>
          )}
        </div>

        {/* Top Right Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-[#FAF7F1]/90 backdrop-blur-md border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-all duration-200 z-10 shadow-xs"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#5A1725] text-[#5A1725]' : ''}`} />
        </button>

        {/* Quick View Button overlay on hover */}
        <div className="absolute inset-x-3 bottom-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="w-full py-2.5 bg-[#FAF7F1]/95 backdrop-blur-md text-[#5A1725] border border-[#5A1725] text-[11px] font-semibold tracking-[0.18em] uppercase flex items-center justify-center gap-1.5 hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-all shadow-md"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="pt-4 flex flex-col flex-1 justify-between">
        
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[10px] tracking-[0.18em] uppercase text-[#B97882] mb-1 font-medium">
            <span>{product.category}</span>
            <span className="text-[#574B48] flex items-center gap-1">
              ★ {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </div>

          {/* Product Name */}
          <h3 
            onClick={() => openQuickView(product)}
            className="font-serif text-xl sm:text-2xl text-[#5A1725] font-medium leading-snug cursor-pointer hover:text-[#3D0F19] transition-colors line-clamp-1 mb-1.5"
          >
            {product.name}
          </h3>

          {/* Short subtitle preview */}
          <p className="text-xs text-[#574B48] font-light line-clamp-2 mb-3 leading-relaxed">
            {product.subtitle}
          </p>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-4 pt-1 border-t border-[#D8C09A]/30">
            <span className="text-xs text-[#574B48] tracking-widest uppercase font-medium">FROM</span>
            <span className="font-serif text-xl sm:text-2xl text-[#241C1A] font-medium">
              R {product.price.toLocaleString('en-ZA')}
            </span>
            <span className="text-[10px] text-[#B97882] font-sans">ZAR · Incl. VAT</span>
          </div>

          {/* Interactive CTAs: Select Options & Add to Basket */}
          <div className="grid grid-cols-2 gap-2">
            
            {/* Select Options */}
            <button
              onClick={handleSelectOptions}
              className="py-2.5 px-2 bg-transparent border border-[#5A1725] text-[#5A1725] text-[10.5px] font-semibold tracking-[0.14em] uppercase hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-all text-center flex items-center justify-center"
            >
              Select Options
            </button>

            {/* Add to Basket */}
            <button
              onClick={handleQuickAdd}
              className={`py-2.5 px-2 text-[10.5px] font-semibold tracking-[0.14em] uppercase transition-all flex items-center justify-center gap-1.5 text-center ${
                justAdded
                  ? 'bg-emerald-800 text-white border border-emerald-800'
                  : 'bg-[#5A1725] text-[#FAF7F1] hover:bg-[#3D0F19] border border-[#5A1725]'
              }`}
            >
              {justAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D8C09A]" />
                  <span>Add To Basket</span>
                </>
              )}
            </button>

          </div>
        </div>

      </div>
    </article>
  );
};
