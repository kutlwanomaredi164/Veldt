import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  Tag
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    setIsCheckoutOpen,
    setActiveView 
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 1500;
  const progressPercent = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountRemaining = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const discountAmount = Math.round((cartTotal * discountPercent) / 100);
  const finalTotal = cartTotal - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccess('');
    const code = promoCode.trim().toUpperCase();
    if (code === 'ATELIER10' || code === 'BLOOM10' || code === 'WELCOME10') {
      setDiscountPercent(10);
      setPromoSuccess('10% Atelier Privilege discount applied!');
    } else {
      setPromoError('Invalid promotion code. Try code "ATELIER10"');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#241C1A]/60 backdrop-blur-xs flex justify-end animate-fade-in">
      <div 
        className="w-full max-w-md bg-[#FAF7F1] h-full shadow-2xl flex flex-col justify-between border-l border-[#D8C09A] animate-slide-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-5 sm:p-6 border-b border-[#D8C09A]/50 bg-[#FAF7F1] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#5A1725]" />
            <h2 className="font-serif text-2xl text-[#5A1725] font-normal tracking-wide">
              Your Botanical Basket
            </h2>
            <span className="text-xs text-[#574B48] font-sans">
              ({cart.reduce((s, i) => s + i.quantity, 0)})
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Free Delivery Progress Indicator */}
        <div className="bg-[#F4EFE6] px-6 py-3 border-b border-[#D8C09A]/40 text-xs">
          {amountRemaining === 0 ? (
            <p className="text-emerald-800 font-medium flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-700" />
              <span>Complimentary Express Courier unlocked across Gauteng & WC!</span>
            </p>
          ) : (
            <div className="space-y-1.5">
              <p className="text-[#574B48] font-light">
                Add <strong className="text-[#5A1725] font-semibold">R {amountRemaining.toLocaleString('en-ZA')}</strong> more for complimentary white-glove courier delivery
              </p>
              <div className="w-full h-1.5 bg-[#D8C09A]/40 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#5A1725] transition-all duration-500"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {cart.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <ShoppingBag className="w-12 h-12 text-[#D8C09A] mx-auto" />
              <p className="font-serif text-2xl text-[#5A1725]">Your basket is empty</p>
              <p className="text-xs text-[#574B48] max-w-xs mx-auto font-light">
                Explore our couture garden roses, royal King Proteas, and signature velvet hatboxes.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setActiveView('shop');
                }}
                className="inline-block mt-2 px-6 py-3 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase"
              >
                Explore Arrangements
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 pb-5 border-b border-[#D8C09A]/40 last:border-b-0"
              >
                {/* Product Thumbnail */}
                <div className="w-20 h-24 bg-[#EBE3D5] shrink-0 overflow-hidden border border-[#D8C09A]">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="font-serif text-base text-[#5A1725] font-medium leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-[#574B48] hover:text-[#5A1725] p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <p className="text-[11px] text-[#B97882] font-medium mt-0.5">
                      Volume: {item.selectedSize} · {item.selectedVase.name}
                    </p>

                    {item.recipientName && (
                      <p className="text-[10px] text-[#574B48] italic mt-0.5">
                        For: {item.recipientName}
                      </p>
                    )}

                    {item.deliveryDate && (
                      <p className="text-[10px] text-[#574B48] mt-0.5 flex items-center gap-1">
                        <Truck className="w-2.5 h-2.5 text-[#B97882]" />
                        Delivery: {item.deliveryDate} ({item.deliveryTimeSlot || 'Anytime'})
                      </p>
                    )}
                  </div>

                  {/* Quantity and Price */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#D8C09A]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#241C1A] hover:bg-[#D8C09A]/30"
                      >
                        –
                      </button>
                      <span className="w-7 text-center text-xs font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-xs text-[#241C1A] hover:bg-[#D8C09A]/30"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-serif text-base text-[#241C1A] font-medium">
                      R {(item.itemPrice * item.quantity).toLocaleString('en-ZA')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with Totals and Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 sm:p-6 bg-[#FAF7F1] border-t border-[#D8C09A] space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Promo Code (Try ATELIER10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] pl-8 pr-3 py-2 text-xs uppercase text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
                <Tag className="w-3.5 h-3.5 text-[#B97882] absolute left-2.5 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-wider uppercase hover:bg-[#3D0F19]"
              >
                Apply
              </button>
            </form>

            {promoError && <p className="text-[11px] text-red-700 font-medium">{promoError}</p>}
            {promoSuccess && <p className="text-[11px] text-emerald-800 font-medium">{promoSuccess}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#574B48] pt-2 border-t border-[#D8C09A]/30">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>R {cartTotal.toLocaleString('en-ZA')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-800 font-medium">
                  <span>VIP Atelier Privilege (10%)</span>
                  <span>- R {discountAmount.toLocaleString('en-ZA')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Courier Delivery</span>
                <span>{amountRemaining === 0 ? 'Complimentary' : 'R 180'}</span>
              </div>
              <div className="flex justify-between font-serif text-xl text-[#5A1725] font-semibold pt-2 border-t border-[#D8C09A]/40">
                <span>Total (ZAR)</span>
                <span>
                  R {(finalTotal + (amountRemaining === 0 ? 0 : 180)).toLocaleString('en-ZA')}
                </span>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              onClick={handleProceedCheckout}
              className="w-full py-4 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#3D0F19] transition-all flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Proceed To Checkout</span>
              <ArrowRight className="w-4 h-4 text-[#D8C09A]" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[#574B48] font-light pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B97882]" /> Secure Ozow / PayFlex Checkout
              </span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
