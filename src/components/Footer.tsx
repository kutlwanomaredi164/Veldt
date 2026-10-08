import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowRight, 
  ShieldCheck, 
  Heart,
  Instagram,
  Facebook
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView, setSelectedCategory, setIsCorporateModalOpen, openSubscriptionModal } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#241C1A] text-[#FAF7F1] pt-16 sm:pt-20 pb-10 border-t-2 border-[#5A1725]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Privilege Section */}
        <div className="bg-[#3D0F19] border border-[#731E30] p-8 sm:p-12 mb-16 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-[10px] tracking-[0.24em] uppercase text-[#D8C09A] font-bold block mb-2">
              THE VANDERLYN PRIVILEGE
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#FAF7F1] font-normal mb-2">
              Receive 10% Off Your Inaugural Floral Order
            </h3>
            <p className="text-xs text-[#FAF7F1]/80 font-light leading-relaxed">
              Subscribe to the Atelier dispatch for invitations to private seasonal drops, botanical workshops, and exclusive subscriber perks.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {!subscribed ? (
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md w-full">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#241C1A] border border-[#D8C09A]/60 px-4 py-3 text-xs text-[#FAF7F1] placeholder-[#FAF7F1]/50 focus:outline-none focus:border-[#D8C09A] flex-1 font-sans"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#FAF7F1] hover:text-[#5A1725] transition-colors whitespace-nowrap border border-[#D8C09A]"
                >
                  Join Circle
                </button>
              </form>
            ) : (
              <div className="p-3 bg-[#5A1725] border border-[#D8C09A] text-xs text-[#FAF7F1] flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#D8C09A] fill-[#D8C09A]" />
                <span>Welcome to the Atelier Circle. Use code <strong>ATELIER10</strong> at checkout.</span>
              </div>
            )}
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 pb-16 border-b border-[#FAF7F1]/10 text-xs">
          
          {/* Column 1: Brand Atelier Identity */}
          <div className="space-y-4">
            <span className="font-serif text-3xl tracking-widest uppercase text-[#FAF7F1] block">
              VANDERLYN
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#D8C09A] block font-medium">
              Botanical Atelier · Est. 2021
            </span>
            <p className="text-[#FAF7F1]/70 font-light leading-relaxed pt-2">
              South Africa’s premier luxury botanical house. Hand-crafting fine art floral arrangements with certified estate garden roses, endemic King Proteas, and European varietals.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#instagram" className="w-8 h-8 rounded-full border border-[#D8C09A]/40 flex items-center justify-center text-[#D8C09A] hover:bg-[#5A1725] hover:text-white transition-colors">
                <Instagram className="w-3.5 h-3.5" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-full border border-[#D8C09A]/40 flex items-center justify-center text-[#D8C09A] hover:bg-[#5A1725] hover:text-white transition-colors">
                <Facebook className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Column 2: Floral Collections */}
          <div className="space-y-3">
            <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#D8C09A] pb-1 border-b border-[#FAF7F1]/10">
              COLLECTIONS
            </h4>
            <ul className="space-y-2 text-[#FAF7F1]/80 font-light">
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Signature Bouquets'); setActiveView('shop'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Signature Hand-Tied Bouquets
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Grand Hatboxes'); setActiveView('shop'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Grand Velvet Hatboxes
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Sculptural Vases'); setActiveView('shop'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Architectural Ceramic & Glass Urns
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Protea & Fynbos Heritage'); setActiveView('shop'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Cape King Proteas & Wild Fynbos
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Dried & Preserved'); setActiveView('shop'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Preserved & Everlasting Stems
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setSelectedCategory('Luxury Gifting Sets'); setActiveView('shop'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Cap Classique Gifting Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Atelier Services */}
          <div className="space-y-3">
            <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#D8C09A] pb-1 border-b border-[#FAF7F1]/10">
              SERVICES & INQUIRIES
            </h4>
            <ul className="space-y-2 text-[#FAF7F1]/80 font-light">
              <li>
                <button 
                  onClick={() => openSubscriptionModal()}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Residence Flower Subscriptions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsCorporateModalOpen(true)}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Executive Corporate Styling
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsCorporateModalOpen(true)}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  Luxury Wedding Scenography
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveView('story'); }}
                  className="hover:text-[#D8C09A] transition-colors"
                >
                  The Vanderlyn Philosophy
                </button>
              </li>
              <li>
                <span className="text-[#D8C09A]">
                  Same-Day Delivery cut-off: 12:00 PM Daily
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Atelier Studios & Contact */}
          <div className="space-y-3">
            <h4 className="font-sans text-[11px] font-bold tracking-[0.2em] uppercase text-[#D8C09A] pb-1 border-b border-[#FAF7F1]/10">
              SOUTH AFRICAN ATELIERS
            </h4>
            
            <div className="space-y-3 text-[#FAF7F1]/80 font-light">
              <div>
                <strong className="text-white block font-medium">Sandton Studio:</strong>
                <span>140 West Street, Sandhurst, Sandton, Johannesburg</span>
              </div>

              <div>
                <strong className="text-white block font-medium">Cape Town Studio:</strong>
                <span>The Silo District, V&A Waterfront, Cape Town</span>
              </div>

              <div className="pt-2 border-t border-[#FAF7F1]/10">
                <span className="block flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#D8C09A]" />
                  +27 (0)11 884 9200
                </span>
                <span className="block flex items-center gap-2 mt-1">
                  <Mail className="w-3.5 h-3.5 text-[#D8C09A]" />
                  concierge@vanderlyn.co.za
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment Icons */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#FAF7F1]/60 font-light">
          <div>
            © {new Date().getFullYear()} Vanderlyn Botanical Atelier (Pty) Ltd. All rights reserved.
          </div>

          {/* South African Payment Badges */}
          <div className="flex items-center gap-3 text-[10px] tracking-wider uppercase text-[#D8C09A]">
            <span>VISA</span>
            <span>·</span>
            <span>MASTERCARD</span>
            <span>·</span>
            <span>OZOW INSTANT EFT</span>
            <span>·</span>
            <span>PAYFLEX</span>
            <span>·</span>
            <span>SNAPSCAN</span>
          </div>

          <div>
            <span>Johannesburg · Pretoria · Cape Town · Franschhoek</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
