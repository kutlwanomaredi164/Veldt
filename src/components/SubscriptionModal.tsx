import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { SUBSCRIPTION_PLANS } from '../data/products';
import { SubscriptionPlan } from '../types';
import { X, Calendar, Check, Sparkles, Gift } from 'lucide-react';

export const SubscriptionModal: React.FC = () => {
  const { 
    isSubscriptionModalOpen, 
    setIsSubscriptionModalOpen, 
    selectedSubPlan, 
    addToCart,
    products 
  } = useShop();

  const [activePlan, setActivePlan] = useState<SubscriptionPlan>(selectedSubPlan || SUBSCRIPTION_PLANS[1]);
  const [cadence, setCadence] = useState<'Weekly' | 'Fortnightly' | 'Monthly'>('Weekly');
  const [deliveryDay, setDeliveryDay] = useState<'Tuesday' | 'Thursday' | 'Friday'>('Thursday');
  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [giftNote, setGiftNote] = useState('');

  useEffect(() => {
    if (selectedSubPlan) {
      setActivePlan(selectedSubPlan);
    }
  }, [selectedSubPlan]);

  if (!isSubscriptionModalOpen) return null;

  const getPrice = () => {
    if (cadence === 'Weekly') return activePlan.basePrice;
    if (cadence === 'Fortnightly') return Math.round(activePlan.basePrice * 1.1);
    return Math.round(activePlan.basePrice * 1.25);
  };

  const handleSubscribe = () => {
    // Treat subscription as special cart item
    const dummyProduct = {
      ...products[0],
      id: `sub-${activePlan.tier.toLowerCase().replace(/\s+/g, '-')}`,
      name: `${activePlan.title} (${cadence} Floral Membership)`,
      price: getPrice(),
      subtitle: `${activePlan.stemsPerDelivery} · Every ${deliveryDay}`,
      images: [activePlan.image],
    };

    addToCart({
      product: dummyProduct,
      selectedSize: activePlan.tier === 'Petite Atelier' ? 'Petite' : activePlan.tier === 'Classic Grand' ? 'Classic' : 'Opulent',
      recipientName: isGift ? recipientName : 'Self (Residence)',
      cardMessage: isGift ? giftNote : 'Atelier Welcome Note with Shears & Vase Included',
      deliveryDate: `Next ${deliveryDay}`,
      quantity: 1,
    });

    setIsSubscriptionModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C1A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in">
      <div 
        className="relative bg-[#FAF7F1] border border-[#D8C09A] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setIsSubscriptionModalOpen(false)}
          aria-label="Close subscription modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center pb-6 border-b border-[#D8C09A]/40 mb-6">
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#B97882] font-semibold block mb-1">
            BESPOKE BOTANICAL MEMBERSHIP
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#5A1725] font-normal">
            Configure Your Flower Subscription
          </h2>
          <p className="text-xs text-[#574B48] font-light max-w-md mx-auto mt-2">
            Enjoy living seasonal blooms refreshed on your schedule with a complimentary artisan vessel included on your first drop.
          </p>
        </div>

        {/* 1. Plan Tier Selection */}
        <div className="mb-6">
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#241C1A] block mb-2">
            1. Select Subscription Tier:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {SUBSCRIPTION_PLANS.map((plan) => (
              <button
                key={plan.id}
                onClick={() => setActivePlan(plan)}
                className={`p-3.5 text-left border transition-all ${
                  activePlan.id === plan.id
                    ? 'border-[#5A1725] bg-[#F4EFE6] ring-1 ring-[#5A1725]'
                    : 'border-[#D8C09A]/60 bg-transparent hover:border-[#5A1725]'
                }`}
              >
                <span className="text-[10px] text-[#B97882] font-bold tracking-wider uppercase block">
                  {plan.tier}
                </span>
                <span className="font-serif text-lg text-[#5A1725] font-medium block leading-snug">
                  {plan.title.replace('The ', '')}
                </span>
                <span className="text-xs font-semibold text-[#241C1A] block mt-1">
                  R {plan.basePrice.toLocaleString('en-ZA')} / wk
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. Frequency Cadence */}
        <div className="mb-6">
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#241C1A] block mb-2">
            2. Delivery Cadence:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Weekly', 'Fortnightly', 'Monthly'] as const).map((c) => (
              <button
                key={c}
                onClick={() => setCadence(c)}
                className={`py-2.5 text-center text-xs font-semibold tracking-wider uppercase border transition-all ${
                  cadence === c
                    ? 'border-[#5A1725] bg-[#5A1725] text-[#FAF7F1]'
                    : 'border-[#D8C09A] bg-transparent text-[#241C1A] hover:border-[#5A1725]'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Preferred Day */}
        <div className="mb-6">
          <label className="text-[11px] font-bold tracking-wider uppercase text-[#241C1A] block mb-2">
            3. Scheduled Delivery Day:
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['Tuesday', 'Thursday', 'Friday'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setDeliveryDay(day)}
                className={`py-2 text-center text-xs font-medium border transition-all ${
                  deliveryDay === day
                    ? 'border-[#5A1725] bg-[#F4EFE6] text-[#5A1725] font-semibold'
                    : 'border-[#D8C09A]/60 text-[#241C1A]'
                }`}
              >
                Every {day}
              </button>
            ))}
          </div>
        </div>

        {/* 4. Gifting Option */}
        <div className="mb-6 pt-4 border-t border-[#D8C09A]/40">
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#5A1725] uppercase tracking-wider">
            <input
              type="checkbox"
              checked={isGift}
              onChange={(e) => setIsGift(e.target.checked)}
              className="accent-[#5A1725]"
            />
            <Gift className="w-4 h-4 text-[#B97882]" />
            <span>Is this a gift subscription for someone special?</span>
          </label>

          {isGift && (
            <div className="mt-3 space-y-3 bg-[#F4EFE6] p-4 border border-[#D8C09A]/60 animate-fade-in">
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#574B48] block mb-1">
                  Recipient Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Eleanor Vance"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2 text-xs text-[#241C1A]"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#574B48] block mb-1">
                  Inaugural Gift Greeting Note
                </label>
                <textarea
                  rows={2}
                  placeholder="A recurring gathering of fresh blooms for your home..."
                  value={giftNote}
                  onChange={(e) => setGiftNote(e.target.value)}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2 text-xs text-[#241C1A] font-serif italic"
                />
              </div>
            </div>
          )}
        </div>

        {/* Pricing Summary and CTA */}
        <div className="pt-6 border-t border-[#D8C09A]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl text-[#5A1725] font-semibold">
                R {getPrice().toLocaleString('en-ZA')}
              </span>
              <span className="text-xs text-[#574B48]">
                / {cadence.toLowerCase().replace('ly', '')}
              </span>
            </div>
            <span className="text-[11px] text-[#B97882] block">
              Includes complimentary vase & shears on drop #1
            </span>
          </div>

          <button
            onClick={handleSubscribe}
            className="w-full sm:w-auto px-8 py-3.5 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#3D0F19] transition-all"
          >
            Add Subscription To Basket
          </button>
        </div>

      </div>
    </div>
  );
};
