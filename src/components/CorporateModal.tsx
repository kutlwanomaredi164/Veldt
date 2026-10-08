import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Building2, CheckCircle2, Send, Sparkles } from 'lucide-react';

export const CorporateModal: React.FC = () => {
  const { isCorporateModalOpen, setIsCorporateModalOpen } = useShop();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    email: '',
    phone: '',
    location: 'Sandton / Rosebank, Johannesburg',
    spaceType: 'Reception & Entrance Lobby',
    frequency: 'Weekly Monday Installation',
    estimatedBudget: 'R2,500 - R5,000 per week',
    notes: '',
  });

  if (!isCorporateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setIsCorporateModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#241C1A]/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 lg:p-10 animate-fade-in">
      <div 
        className="relative bg-[#FAF7F1] border border-[#D8C09A] max-w-2xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-9"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          aria-label="Close corporate modal"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#D8C09A] flex items-center justify-center text-[#5A1725] hover:bg-[#5A1725] hover:text-[#FAF7F1] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="text-center pb-6 border-b border-[#D8C09A]/40 mb-6">
              <span className="text-[10px] tracking-[0.24em] uppercase text-[#B97882] font-semibold block mb-1">
                CORPORATE & COMMERCIAL SERVICES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#5A1725] font-normal">
                Bespoke Corporate Floral Proposal
              </h2>
              <p className="text-xs text-[#574B48] font-light max-w-md mx-auto mt-2">
                Elevate your commercial premises with weekly architectural arrangements, executive boardroom vessels, and corporate gifting accounts.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                    Company / Organization *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Private Wealth"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Victoria Sterling"
                    value={formData.contactName}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                    Work Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="victoria@apexwealth.co.za"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                    Phone / Mobile *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+27 (0)82 555 1234"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                    Premises Location
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                  >
                    <option value="Sandton / Rosebank, Johannesburg">Sandton / Rosebank, Johannesburg</option>
                    <option value="Pretoria East / Menlyn">Pretoria East / Menlyn</option>
                    <option value="Cape Town CBD / Waterfront">Cape Town CBD / Waterfront</option>
                    <option value="Franschhoek / Stellenbosch">Franschhoek / Stellenbosch</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                    Space Application
                  </label>
                  <select
                    value={formData.spaceType}
                    onChange={(e) => setFormData({ ...formData, spaceType: e.target.value })}
                    className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                  >
                    <option value="Reception & Entrance Lobby">Reception & Entrance Lobby</option>
                    <option value="Executive Boardroom Suite">Executive Boardroom Suite</option>
                    <option value="Luxury Boutique / Hotel Showroom">Luxury Boutique / Hotel Showroom</option>
                    <option value="Executive Client Gifting Hamper Program">Executive Client Gifting Hamper Program</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                  Estimated Weekly / Monthly Floral Investment
                </label>
                <select
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                >
                  <option value="R1,500 - R3,000 per week">R1,500 – R3,000 per week (Single Statement Vessel)</option>
                  <option value="R3,000 - R6,000 per week">R3,000 – R6,000 per week (Reception & Boardroom Suite)</option>
                  <option value="R6,000+ per week">R6,000+ per week (Multi-floor Corporate / Boutique Hotel)</option>
                  <option value="Ad-hoc Corporate Gifting Only">Ad-hoc Corporate Gifting Only</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-semibold uppercase tracking-wider text-[#241C1A] block mb-1">
                  Specific Requests or Aesthetic Vision
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Architectural King Proteas with white orchids suited for contemporary marble interior..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#FAF7F1] border border-[#D8C09A] p-2.5 text-xs text-[#241C1A]"
                />
              </div>

              <div className="pt-4 border-t border-[#D8C09A]/40 flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#3D0F19] transition-all flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5 text-[#D8C09A]" />
                  <span>Submit Corporate Inquiry</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-10 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="font-serif text-3xl text-[#5A1725]">
              Proposal Request Received
            </h3>

            <p className="text-xs text-[#574B48] max-w-md mx-auto leading-relaxed font-light">
              Thank you, {formData.contactName}. Our Head of Corporate Floral Styling will contact you within two business hours with a custom digital moodboard and vessel catalogue for {formData.companyName}.
            </p>

            <div className="pt-4">
              <button
                onClick={handleClose}
                className="px-8 py-3 bg-[#5A1725] text-[#FAF7F1] text-xs font-semibold tracking-widest uppercase hover:bg-[#3D0F19]"
              >
                Close Window
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
