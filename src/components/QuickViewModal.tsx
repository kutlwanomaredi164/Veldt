import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { VASE_OPTIONS } from '../data/products';
import { VaseOption } from '../types';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Check, 
  Truck, 
  Calendar, 
  ShieldCheck, 
  Sparkles,
  PenTool
} from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { 
    isQuickViewOpen, 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist 
  } = useShop();

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<'Petite' | 'Classic' | 'Grand' | 'Opulent'>('Classic');
  const [selectedVase, setSelectedVase] = useState<VaseOption>(VASE_OPTIONS[0]);
  const [recipientName, setRecipientName] = useState('');
  const [cardMessage, setCardMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState<'Morning (09:00 - 13:00)' | 'Afternoon (13:00 - 18:00)' | 'Anytime'>('Anytime');
  const [quantity, setQuantity] = useState(1);
  const [showCardInput, setShowCardInput] = useState(false);

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImageIndex(0);
      setSelectedSize('Classic');
      setSelectedVase(VASE_OPTIONS[0]);
      setRecipientName('');
      setCardMessage('');
      setQuantity(1);
      setShowCardInput(false);
      // Default delivery date to tomorrow or today
      const today = new Date();
      const dateStr = today.toISOString().split('T')[0];
      setDeliveryDate(dateStr);
    }
  }, [quickViewProduct]);

  if (!isQuickViewOpen || !quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);

  // Price calculations based on size & vase
  const getSizeMultiplier = (size: 'Petite' | 'Classic' | 'Grand' | 'Opulent') => {
    switch (size) {
      case 'Petite': return 0.8;
      case 'Classic': return 1.0;
      case 'Grand': return 1.35;
      case 'Opulent': return 1.8;
    }
  };

  const calculatedUnitPrice = Math.round(quickViewProduct.price * getSizeMultiplier(selectedSize)) + selectedVase.price;
  const totalPrice = calculatedUnitPrice * quantity;

  const handleAdd = () => {
    addToCart({
      product: quickViewProduct,
      selectedSize,
      selectedVase,
      recipientName,
      cardMessage,
      deliveryDate,
      deliveryTimeSlot,
      quantity,
    });
    closeQuickView();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C1A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in">
      <div 
        className="relative bg-[#FAF7F1] border border-[#D8C09A] max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          aria-label="Close modal"
          className="absolute top-3 right-3 z-20 w-9 h-9 rounded-full bg-[#FAF7F1]/90 border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Gallery (md: 48%) */}
        <div className="md:w-1/2 p-6 sm:p-8 bg-[#F4EFE6] border-b md:border-b-0 md:border-r border-[#D8C09A]/40 flex flex-col justify-between">
          <div>
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-[#D8C09A]/60 shadow-md mb-4 bg-white">
              <img
                src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover object-center transition-all duration-500"
              />
              <div className="absolute top-3 left-3 bg-[#5A1725] text-[#FAF7F1] text-[9px] font-semibold tracking-widest uppercase px-2.5 py-1">
                {quickViewProduct.category}
              </div>
            </div>

            {/* Thumbnail selector if multiple images */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 mb-4">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-16 border overflow-hidden ${
                      selectedImageIndex === idx ? 'border-[#5A1725] ring-1 ring-[#5A1725]' : 'border-[#D8C09A]/60 opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Botanical Stem Recipe */}
          <div className="bg-[#FAF7F1] p-3.5 border border-[#D8C09A]/60 text-xs text-[#574B48]">
            <span className="font-semibold text-[#5A1725] uppercase tracking-wider block mb-1.5 text-[10px]">
              Floral Stem Composition
            </span>
            <ul className="space-y-1">
              {quickViewProduct.stems.map((stem, i) => (
                <li key={i} className="flex items-center gap-1.5 text-[11px] font-light">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B97882]"></span>
                  <span>{stem}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Customization Controls (md: 52%) */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            
            {/* Top metadata & Wishlist */}
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#B97882] font-semibold">
                Bespoke Atelier Creation
              </span>
              <button
                onClick={() => toggleWishlist(quickViewProduct.id)}
                className="flex items-center gap-1 text-xs text-[#5A1725] hover:text-[#3D0F19]"
              >
                <Heart className={`w-4 h-4 ${isFavorited ? 'fill-[#5A1725] text-[#5A1725]' : ''}`} />
                <span className="text-[11px] font-medium">{isFavorited ? 'Saved' : 'Save'}</span>
              </button>
            </div>

            {/* Product Title */}
            <h2 className="font-serif text-2xl sm:text-3xl text-[#5A1725] font-normal leading-tight mb-2">
              {quickViewProduct.name}
            </h2>

            {/* Price display */}
            <div className="flex items-baseline gap-2 mb-4 pb-4 border-b border-[#D8C09A]/40">
              <span className="font-serif text-3xl text-[#241C1A] font-medium">
                R {calculatedUnitPrice.toLocaleString('en-ZA')}
              </span>
              <span className="text-xs text-[#574B48]">ZAR · VAT Included</span>
            </div>

            <p className="text-xs text-[#574B48] font-light leading-relaxed mb-6">
              {quickViewProduct.description}
            </p>

            {/* 1. Size Options */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-[#241C1A]">
                  Select Bouquet Volume:
                </span>
                <span className="text-[11px] text-[#B97882] font-medium">
                  {selectedSize === 'Classic' ? 'Signature Size' : selectedSize}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {(['Petite', 'Classic', 'Grand', 'Opulent'] as const).map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 px-1 text-center border text-[11px] font-medium uppercase tracking-wider transition-all ${
                      selectedSize === size
                        ? 'border-[#5A1725] bg-[#5A1725] text-[#FAF7F1]'
                        : 'border-[#D8C09A] bg-transparent text-[#241C1A] hover:border-[#5A1725]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Vessel / Vase Option */}
            <div className="mb-5">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#241C1A] block mb-2">
                Presentation & Vessel:
              </label>
              <div className="space-y-1.5">
                {VASE_OPTIONS.map((vase) => (
                  <label
                    key={vase.id}
                    className={`flex items-center justify-between p-2.5 border text-xs cursor-pointer transition-all ${
                      selectedVase.id === vase.id
                        ? 'border-[#5A1725] bg-[#F4EFE6]'
                        : 'border-[#D8C09A]/50 bg-transparent hover:border-[#5A1725]'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="vase"
                        checked={selectedVase.id === vase.id}
                        onChange={() => setSelectedVase(vase)}
                        className="accent-[#5A1725]"
                      />
                      <span className="font-medium text-[#241C1A] text-[11px]">{vase.name}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#5A1725]">
                      {vase.price === 0 ? 'Included' : `+R ${vase.price}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 3. Complimentary Calligraphy Card */}
            <div className="mb-5 border-t border-[#D8C09A]/40 pt-4">
              <button
                onClick={() => setShowCardInput(!showCardInput)}
                className="flex items-center justify-between w-full text-xs font-semibold tracking-wider uppercase text-[#5A1725] hover:text-[#3D0F19]"
              >
                <span className="flex items-center gap-1.5">
                  <PenTool className="w-3.5 h-3.5 text-[#B97882]" />
                  Complimentary Calligraphy Card (Wax-Sealed)
                </span>
                <span className="text-xs">{showCardInput ? '–' : '+'}</span>
              </button>

              {showCardInput && (
                <div className="mt-3 space-y-2.5 bg-[#F4EFE6] p-3 border border-[#D8C09A]/60 animate-fade-in">
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-semibold text-[#574B48] block mb-1">
                      Recipient Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lady Vivienne"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full bg-[#FAF7F1] border border-[#D8C09A] px-2.5 py-1.5 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-widest uppercase font-semibold text-[#574B48] block mb-1">
                      Card Message
                    </label>
                    <textarea
                      rows={2}
                      placeholder="Write your heartfelt sentiments..."
                      value={cardMessage}
                      onChange={(e) => setCardMessage(e.target.value)}
                      className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725] font-serif italic text-sm"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* 4. Preferred Delivery Date */}
            <div className="mb-6">
              <label className="text-[11px] font-semibold tracking-wider uppercase text-[#241C1A] flex items-center gap-1.5 mb-2">
                <Calendar className="w-3.5 h-3.5 text-[#B97882]" />
                Preferred Delivery Date (Gauteng & Western Cape):
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="bg-[#FAF7F1] border border-[#D8C09A] px-3 py-2 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                />
                <select
                  value={deliveryTimeSlot}
                  onChange={(e) => setDeliveryTimeSlot(e.target.value as any)}
                  className="bg-[#FAF7F1] border border-[#D8C09A] px-3 py-2 text-xs text-[#241C1A] focus:outline-none focus:border-[#5A1725]"
                >
                  <option value="Anytime">Anytime (09:00 - 18:00)</option>
                  <option value="Morning (09:00 - 13:00)">Morning Slot (09:00 - 13:00)</option>
                  <option value="Afternoon (13:00 - 18:00)">Afternoon Slot (13:00 - 18:00)</option>
                </select>
              </div>
            </div>

          </div>

          {/* Quantity and Final Add to Basket CTA */}
          <div className="pt-4 border-t border-[#D8C09A]/40">
            <div className="flex items-center gap-4">
              
              {/* Quantity Adjuster */}
              <div className="flex items-center border border-[#D8C09A]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-9 h-11 flex items-center justify-center text-[#241C1A] hover:bg-[#D8C09A]/30 text-sm font-semibold"
                >
                  –
                </button>
                <span className="w-10 text-center font-serif text-base text-[#241C1A]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-9 h-11 flex items-center justify-center text-[#241C1A] hover:bg-[#D8C09A]/30 text-sm font-semibold"
                >
                  +
                </button>
              </div>

              {/* Add to Basket Button */}
              <button
                onClick={handleAdd}
                className="flex-1 py-3.5 px-6 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#3D0F19] transition-all flex items-center justify-center gap-2 shadow-md group"
              >
                <ShoppingBag className="w-4 h-4 text-[#D8C09A]" />
                <span>Add To Basket · R {totalPrice.toLocaleString('en-ZA')}</span>
              </button>

            </div>

            <div className="flex items-center justify-center gap-4 mt-3 text-[10px] text-[#574B48] font-light">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-[#B97882]" /> Same-day delivery available
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#B97882]" /> 100% Freshness Guarantee
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
