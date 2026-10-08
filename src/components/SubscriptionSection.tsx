import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { SUBSCRIPTION_PLANS } from '../data/products';
import { SubscriptionPlan } from '../types';
import { Check, Sparkles, Calendar, Gift, RefreshCw, Truck } from 'lucide-react';

export const SubscriptionSection: React.FC = () => {
  const { openSubscriptionModal } = useShop();
  const [selectedCadence, setSelectedCadence] = useState<'Weekly' | 'Fortnightly' | 'Monthly'>('Weekly');

  const getPriceForCadence = (baseWeekly: number, cadence: 'Weekly' | 'Fortnightly' | 'Monthly') => {
    if (cadence === 'Weekly') return baseWeekly;
    if (cadence === 'Fortnightly') return Math.round(baseWeekly * 1.1);
    return Math.round(baseWeekly * 1.25);
  };

  return (
    <section className="py-16 sm:py-24 bg-[#F4EFE6] border-b border-[#D8C09A]/40" id="subscriptions-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with generous editorial spacing */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <Calendar className="w-3.5 h-3.5 text-[#B97882]" />
            <span className="text-[11px] font-semibold tracking-[0.24em] uppercase text-[#B97882]">
              THE ATELIER PRIVATE MEMBERSHIP
            </span>
            <Calendar className="w-3.5 h-3.5 text-[#B97882]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#5A1725] font-normal tracking-tight mb-4">
            Bespoke Flower Subscriptions
          </h2>
          <p className="font-sans text-xs sm:text-sm text-[#574B48] font-light max-w-2xl mx-auto leading-relaxed">
            Invite timeless botanical beauty into your home, office, or gift a seasonal floral membership to someone cherished. Always fresh, hand-conditioned, and delivered on your preferred schedule.
          </p>

          {/* Delivery Frequency Switcher */}
          <div className="inline-flex p-1 bg-[#FAF7F1] border border-[#D8C09A] mt-8 shadow-xs">
            {(['Weekly', 'Fortnightly', 'Monthly'] as const).map((freq) => (
              <button
                key={freq}
                onClick={() => setSelectedCadence(freq)}
                className={`px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase transition-all ${
                  selectedCadence === freq
                    ? 'bg-[#5A1725] text-[#FAF7F1]'
                    : 'text-[#241C1A] hover:text-[#5A1725]'
                }`}
              >
                {freq} Delivery
              </button>
            ))}
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mb-16">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const currentPrice = getPriceForCadence(plan.basePrice, selectedCadence);
            return (
              <div
                key={plan.id}
                className={`relative flex flex-col justify-between bg-[#FAF7F1] border p-6 sm:p-8 transition-all duration-300 hover:shadow-xl ${
                  plan.popular
                    ? 'border-[#5A1725] shadow-md ring-1 ring-[#5A1725]'
                    : 'border-[#D8C09A]/60 hover:border-[#5A1725]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#5A1725] text-[#FAF7F1] text-[9.5px] font-bold tracking-[0.2em] uppercase px-4 py-1 border border-[#D8C09A]">
                    MOST COVETED MEMBERSHIP
                  </div>
                )}

                <div>
                  {/* Image Thumbnail */}
                  <div className="aspect-[16/10] w-full overflow-hidden mb-6 bg-[#EBE3D5]">
                    <img
                      src={plan.image}
                      alt={plan.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>

                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#B97882] block mb-1">
                    {plan.tier}
                  </span>
                  <h3 className="font-serif text-2xl text-[#5A1725] font-medium mb-2">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-[#574B48] font-light leading-relaxed mb-6">
                    {plan.subtitle}
                  </p>

                  {/* Price */}
                  <div className="pb-6 border-b border-[#D8C09A]/40 mb-6">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-3xl sm:text-4xl text-[#241C1A] font-medium">
                        R {currentPrice.toLocaleString('en-ZA')}
                      </span>
                      <span className="text-xs text-[#574B48] font-sans">
                        / {selectedCadence.toLowerCase().replace('ly', '')}
                      </span>
                    </div>
                    <span className="text-[11px] text-[#B97882] block mt-1">
                      {plan.stemsPerDelivery}
                    </span>
                  </div>

                  {/* Feature checklist */}
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-[#241C1A] font-light">
                        <Check className="w-4 h-4 text-[#5A1725] shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Subscription Action Button */}
                <button
                  onClick={() => openSubscriptionModal(plan)}
                  className={`w-full py-3.5 text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-200 text-center ${
                    plan.popular
                      ? 'bg-[#5A1725] text-[#FAF7F1] hover:bg-[#3D0F19]'
                      : 'bg-transparent border border-[#5A1725] text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1]'
                  }`}
                >
                  Configure & Subscribe
                </button>
              </div>
            );
          })}
        </div>

        {/* Value Proposition Triad (How It Works & Benefits) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-10 border-t border-[#D8C09A]/40">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F1] border border-[#D8C09A] flex items-center justify-center text-[#5A1725] shrink-0">
              <Sparkles className="w-4 h-4 text-[#D8C09A]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#5A1725] font-medium mb-1">
                Curated Farm-to-Vase
              </h4>
              <p className="text-xs text-[#574B48] font-light leading-relaxed">
                Directly harvested from certified Cape Winelands growers and Dutch glasshouses.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F1] border border-[#D8C09A] flex items-center justify-center text-[#5A1725] shrink-0">
              <Gift className="w-4 h-4 text-[#D8C09A]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#5A1725] font-medium mb-1">
                Complimentary Vessel
              </h4>
              <p className="text-xs text-[#574B48] font-light leading-relaxed">
                Receive an artisan glass or ceramic urn on your inaugural delivery.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F1] border border-[#D8C09A] flex items-center justify-center text-[#5A1725] shrink-0">
              <RefreshCw className="w-4 h-4 text-[#D8C09A]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#5A1725] font-medium mb-1">
                Complete Flexibility
              </h4>
              <p className="text-xs text-[#574B48] font-light leading-relaxed">
                Going on holiday to Plettenberg Bay or Kruger? Pause or reschedule with one click.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-full bg-[#FAF7F1] border border-[#D8C09A] flex items-center justify-center text-[#5A1725] shrink-0">
              <Truck className="w-4 h-4 text-[#D8C09A]" />
            </div>
            <div>
              <h4 className="font-serif text-lg text-[#5A1725] font-medium mb-1">
                White-Glove Delivery
              </h4>
              <p className="text-xs text-[#574B48] font-light leading-relaxed">
                Hand-delivered in temperature-controlled vans across Gauteng and Western Cape.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
