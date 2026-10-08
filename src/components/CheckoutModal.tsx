import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  X, 
  CheckCircle2, 
  Truck, 
  CreditCard, 
  Lock, 
  Calendar, 
  MapPin, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const { isCheckoutOpen, setIsCheckoutOpen, cart, cartTotal, clearCart } = useShop();

  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [formData, setFormData] = useState({
    senderName: '',
    senderEmail: '',
    senderPhone: '',
    recipientName: '',
    recipientPhone: '',
    streetAddress: '',
    suburb: '',
    city: 'Johannesburg',
    postalCode: '',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliverySlot: 'Morning (09:00 - 13:00)',
    cardMessage: '',
    deliveryNotes: 'Please ring the intercom or leave with front estate concierge.',
    paymentMethod: 'card' as 'card' | 'eft' | 'payflex',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const generatedRef = `VND-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderRef(generatedRef);
      setIsProcessing(false);
      setStep('success');
      clearCart();
    }, 1500);
  };

  const deliveryFee = cartTotal >= 1500 ? 0 : 180;
  const grandTotal = cartTotal + deliveryFee;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C1A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in">
      <div 
        className="relative bg-[#FAF7F1] border border-[#D8C09A] max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        {step !== 'success' && (
          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close checkout"
            className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        )}

        {/* Header */}
        <div className="text-center pb-6 border-b border-[#D8C09A]/40 mb-6">
          <span className="font-serif text-3xl sm:text-4xl text-[#5A1725] block">
            Vanderlyn Atelier Checkout
          </span>
          <span className="text-[10px] tracking-[0.24em] uppercase text-[#B97882] font-semibold mt-1 block">
            SECURE SOUTH AFRICAN BOTANICAL DISPATCH
          </span>
        </div>

        {/* STEP 1: DELIVERY & RECIPIENT DETAILS */}
        {step === 'details' && (
          <form onSubmit={handleDetailsSubmit} className="space-y-6">
            
            {/* Sender details */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#5A1725] mb-3 flex items-center gap-1.5">
                <span>1. Sender Details</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <input
                  type="text"
                  name="senderName"
                  placeholder="Your Full Name *"
                  required
                  value={formData.senderName}
                  onChange={handleInputChange}
                  className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
                <input
                  type="email"
                  name="senderEmail"
                  placeholder="Your Email Address *"
                  required
                  value={formData.senderEmail}
                  onChange={handleInputChange}
                  className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
                <input
                  type="tel"
                  name="senderPhone"
                  placeholder="Your Phone Number *"
                  required
                  value={formData.senderPhone}
                  onChange={handleInputChange}
                  className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
              </div>
            </div>

            {/* Recipient Details & Delivery Address */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#5A1725] mb-3 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#B97882]" />
                <span>2. Recipient & South African Address</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <input
                  type="text"
                  name="recipientName"
                  placeholder="Recipient Name (Who receives the blooms?) *"
                  required
                  value={formData.recipientName}
                  onChange={handleInputChange}
                  className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
                <input
                  type="tel"
                  name="recipientPhone"
                  placeholder="Recipient Mobile (For courier delivery only)"
                  value={formData.recipientPhone}
                  onChange={handleInputChange}
                  className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  name="streetAddress"
                  placeholder="Street Address (e.g. 44 Fourth Avenue, Inanda) *"
                  required
                  value={formData.streetAddress}
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    name="suburb"
                    placeholder="Suburb / Estate (e.g. Sandhurst / Camps Bay) *"
                    required
                    value={formData.suburb}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                  />
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                  >
                    <option value="Johannesburg">Johannesburg & Sandton</option>
                    <option value="Pretoria">Pretoria & Centurion</option>
                    <option value="Cape Town">Cape Town & Atlantic Seaboard</option>
                    <option value="Winelands">Franschhoek & Stellenbosch</option>
                  </select>
                  <input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code *"
                    required
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    className="bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Date & Card Message */}
            <div>
              <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#5A1725] mb-3 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#B97882]" />
                <span>3. Delivery Date & Handwritten Message</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#574B48] block mb-1">
                    Select Dispatch Date:
                  </label>
                  <input
                    type="date"
                    name="deliveryDate"
                    required
                    value={formData.deliveryDate}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2 text-xs text-[#241C1A]"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-wider text-[#574B48] block mb-1">
                    Preferred Window:
                  </label>
                  <select
                    name="deliverySlot"
                    value={formData.deliverySlot}
                    onChange={handleInputChange}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2 text-xs text-[#241C1A]"
                  >
                    <option value="Morning (09:00 - 13:00)">Morning Window (09:00 - 13:00)</option>
                    <option value="Afternoon (13:00 - 18:00)">Afternoon Window (13:00 - 18:00)</option>
                    <option value="Executive Anytime">Anytime Business Hours</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] uppercase tracking-wider text-[#574B48] block mb-1">
                  Card Message (Calligraphy on Fine Textured Stationery):
                </label>
                <textarea
                  name="cardMessage"
                  rows={2}
                  placeholder="e.g. Wishing you endless joy and blooming beauty on your special anniversary..."
                  value={formData.cardMessage}
                  onChange={handleInputChange}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A] font-serif italic text-sm"
                />
              </div>
            </div>

            {/* Bottom summary and next step */}
            <div className="pt-4 border-t border-[#D8C09A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-[#574B48]">
                <span>Order Total: </span>
                <strong className="font-serif text-xl text-[#5A1725] font-semibold">
                  R {grandTotal.toLocaleString('en-ZA')}
                </strong>
                <span className="text-[10px] text-[#B97882] block">
                  {deliveryFee === 0 ? 'Complimentary Courier Included' : 'Includes R 180 Courier'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#3D0F19] transition-all flex items-center justify-center gap-2"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4 text-[#D8C09A]" />
              </button>
            </div>

          </form>
        )}

        {/* STEP 2: PAYMENT METHOD SELECTION */}
        {step === 'payment' && (
          <form onSubmit={handleCompleteOrder} className="space-y-6">
            
            <div className="bg-[#F4EFE6] p-4 border border-[#D8C09A]/60 flex items-center justify-between text-xs">
              <div>
                <span className="font-semibold text-[#5A1725] block">
                  Dispatching to: {formData.recipientName || 'Recipient'} ({formData.suburb}, {formData.city})
                </span>
                <span className="text-[#574B48] text-[11px]">
                  Scheduled for: {formData.deliveryDate} ({formData.deliverySlot})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#5A1725] underline hover:text-[#3D0F19]"
              >
                Edit
              </button>
            </div>

            <div>
              <h3 className="text-xs font-bold tracking-[0.16em] uppercase text-[#5A1725] mb-3">
                Select Secure Payment Method (South Africa)
              </h3>
              
              <div className="space-y-3">
                {/* Credit Card */}
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'card' ? 'border-[#5A1725] bg-[#FAF7F1]' : 'border-[#D8C09A]/60'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={formData.paymentMethod === 'card'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'card' })}
                    className="mt-1 accent-[#5A1725]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#241C1A]">Visa / Mastercard / Amex (3D Secure)</span>
                      <div className="flex gap-1.5 text-[10px] text-[#5A1725] font-bold">
                        <span>VISA</span> · <span>MC</span>
                      </div>
                    </div>
                    <p className="text-[11px] text-[#574B48] mt-1 font-light">
                      Encrypted end-to-end payment gateway via Peach Payments / PayGate.
                    </p>
                  </div>
                </label>

                {/* Instant EFT (Ozow) */}
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'eft' ? 'border-[#5A1725] bg-[#FAF7F1]' : 'border-[#D8C09A]/60'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="eft"
                    checked={formData.paymentMethod === 'eft'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'eft' })}
                    className="mt-1 accent-[#5A1725]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#241C1A]">Ozow / Instant EFT</span>
                      <span className="text-[10px] bg-[#5A1725] text-[#FAF7F1] px-1.5 py-0.5 font-bold">OZOW</span>
                    </div>
                    <p className="text-[11px] text-[#574B48] mt-1 font-light">
                      Immediate confirmation via FNB, Standard Bank, ABSA, Nedbank, Capitec or Investec.
                    </p>
                  </div>
                </label>

                {/* PayFlex (4 interest-free installments) */}
                <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-all ${
                  formData.paymentMethod === 'payflex' ? 'border-[#5A1725] bg-[#FAF7F1]' : 'border-[#D8C09A]/60'
                }`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="payflex"
                    checked={formData.paymentMethod === 'payflex'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'payflex' })}
                    className="mt-1 accent-[#5A1725]"
                  />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-[#241C1A]">PayFlex (4x Interest-Free Installments)</span>
                      <span className="text-[10px] text-[#5A1725] font-bold">PAYFLEX</span>
                    </div>
                    <p className="text-[11px] text-[#574B48] mt-1 font-light">
                      Pay 4 equal fortnightly payments of R {Math.round(grandTotal / 4).toLocaleString('en-ZA')} with zero interest.
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Total and Place Order */}
            <div className="pt-4 border-t border-[#D8C09A]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="text-xs text-[#574B48] underline hover:text-[#5A1725]"
              >
                ← Back to Details
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full sm:w-auto px-10 py-4 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.22em] uppercase hover:bg-[#3D0F19] transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                <Lock className="w-3.5 h-3.5 text-[#D8C09A]" />
                <span>
                  {isProcessing ? 'Confirming with Atelier...' : `Authorise & Pay R ${grandTotal.toLocaleString('en-ZA')}`}
                </span>
              </button>
            </div>

          </form>
        )}

        {/* STEP 3: ORDER CONFIRMATION / SUCCESS */}
        {step === 'success' && (
          <div className="text-center py-6 space-y-5 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B97882] font-semibold">
                PAYMENT RECEIVED & BOTANICAL ORDER CONFIRMED
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#5A1725] font-normal">
                Thank You, {formData.senderName || 'Valued Client'}
              </h3>
            </div>

            <p className="text-xs text-[#574B48] max-w-md mx-auto leading-relaxed font-light">
              Your arrangement has been transmitted to our master florists. We are conditioning the stems and preparing your wax-sealed calligraphy card.
            </p>

            {/* Order Details Voucher */}
            <div className="bg-[#F4EFE6] border border-[#D8C09A] max-w-md mx-auto p-5 text-left text-xs space-y-2">
              <div className="flex justify-between border-b border-[#D8C09A]/40 pb-2">
                <span className="text-[#574B48]">Order Reference:</span>
                <span className="font-mono font-bold text-[#5A1725]">{orderRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#574B48]">Recipient:</span>
                <span className="font-medium text-[#241C1A]">{formData.recipientName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#574B48]">Destination:</span>
                <span className="font-medium text-[#241C1A]">{formData.suburb}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#574B48]">Scheduled Date:</span>
                <span className="font-medium text-[#241C1A]">{formData.deliveryDate} ({formData.deliverySlot})</span>
              </div>
              <div className="flex justify-between border-t border-[#D8C09A]/40 pt-2 font-serif text-base font-semibold text-[#5A1725]">
                <span>Total Paid:</span>
                <span>R {grandTotal.toLocaleString('en-ZA')}</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => {
                  setIsCheckoutOpen(false);
                  setStep('details');
                }}
                className="px-8 py-3.5 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase hover:bg-[#3D0F19] transition-all"
              >
                Return to Vanderlyn Atelier
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
