import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export const WishlistDrawer: React.FC = () => {
  const { 
    products, 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart,
    openQuickView,
    setActiveView 
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#241C1A]/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF7F1] h-full shadow-2xl flex flex-col justify-between border-l border-[#D8C09A] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#D8C09A]/50 bg-[#FAF7F1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#5A1725] fill-[#5A1725]" />
            <h2 className="font-serif text-2xl text-[#5A1725] font-normal tracking-wide">
              Curated Wishlist
            </h2>
            <span className="text-xs text-[#574B48] font-sans">
              ({wishlistProducts.length})
            </span>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close wishlist"
            className="w-8 h-8 rounded-full border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <Heart className="w-12 h-12 text-[#D8C09A] mx-auto" />
              <p className="font-serif text-2xl text-[#5A1725]">No saved creations</p>
              <p className="text-xs text-[#574B48] max-w-xs mx-auto font-light">
                Save your cherished bouquets and table arrangements to revisit anytime.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setActiveView('shop');
                }}
                className="inline-block mt-2 px-6 py-3 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase"
              >
                Browse Atelier
              </button>
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex gap-4 pb-4 border-b border-[#D8C09A]/40 last:border-b-0"
              >
                <div 
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openQuickView(p);
                  }}
                  className="w-20 h-24 bg-[#EBE3D5] shrink-0 overflow-hidden border border-[#D8C09A] cursor-pointer"
                >
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openQuickView(p);
                        }}
                        className="font-serif text-base text-[#5A1725] font-medium leading-snug cursor-pointer hover:underline"
                      >
                        {p.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(p.id)}
                        className="text-[#574B48] hover:text-[#5A1725] p-1"
                        aria-label="Remove from wishlist"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-xs text-[#241C1A] font-serif font-medium mt-1">
                      R {p.price.toLocaleString('en-ZA')}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        addToCart({ product: p, selectedSize: 'Classic', quantity: 1 });
                      }}
                      className="flex-1 py-2 px-3 bg-[#5A1725] text-[#FAF7F1] text-[10.5px] font-semibold tracking-widest uppercase hover:bg-[#3D0F19] flex items-center justify-center gap-1.5"
                    >
                      <ShoppingBag className="w-3 h-3 text-[#D8C09A]" />
                      <span>Move to Basket</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlistProducts.length > 0 && (
          <div className="p-5 border-t border-[#D8C09A] bg-[#FAF7F1]">
            <button
              onClick={() => {
                wishlistProducts.forEach((p) => {
                  addToCart({ product: p, selectedSize: 'Classic', quantity: 1 });
                });
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 bg-[#FAF7F1] border border-[#5A1725] text-[#5A1725] text-xs font-semibold tracking-widest uppercase hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-all"
            >
              Add All To Basket
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
