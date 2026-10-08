import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Navbar } from './components/Navbar';
import { HeroSlider } from './components/HeroSlider';
import { TopCategories } from './components/TopCategories';
import { BestSellers } from './components/BestSellers';
import { SubscriptionSection } from './components/SubscriptionSection';
import { CorporateSection } from './components/CorporateSection';
import { CatalogSection } from './components/CatalogSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { StorySection } from './components/StorySection';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SubscriptionModal } from './components/SubscriptionModal';
import { CorporateModal } from './components/CorporateModal';
import { Footer } from './components/Footer';
import { Sparkles, Heart } from 'lucide-react';

const MainContent: React.FC = () => {
  const { activeView, toastMessage } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7F1] text-[#241C1A]">
      {/* Announcement Shipping Bar */}
      <AnnouncementBar />

      {/* Main Luxury Navigation */}
      <Navbar />

      {/* Dynamic Content Views */}
      <main className="flex-1">
        {activeView === 'home' && (
          <>
            {/* The 42%/58% Split-Screen Hero Slider with Circular Badge */}
            <HeroSlider />

            {/* Top Categories Grid */}
            <TopCategories />

            {/* Best Sellers Section */}
            <BestSellers />

            {/* Flower Subscription Offering */}
            <SubscriptionSection />

            {/* Corporate Flower Offering */}
            <CorporateSection />

            {/* Google Reviews and Testimonials */}
            <TestimonialsSection />
          </>
        )}

        {activeView === 'shop' && (
          <>
            <CatalogSection />
            <TestimonialsSection />
          </>
        )}

        {activeView === 'subscriptions' && (
          <>
            <div className="bg-[#FAF7F1] pt-12 pb-6 border-b border-[#D8C09A]/40 text-center">
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#B97882] font-semibold block mb-2">
                THE ATELIER CIRCLE
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#5A1725]">
                Residence & Gifting Subscriptions
              </h1>
            </div>
            <SubscriptionSection />
            <TestimonialsSection />
          </>
        )}

        {activeView === 'corporate' && (
          <>
            <div className="bg-[#FAF7F1] pt-12 pb-6 border-b border-[#D8C09A]/40 text-center">
              <span className="text-[10px] tracking-[0.26em] uppercase text-[#B97882] font-semibold block mb-2">
                EXECUTIVE FLORAL STYLING
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl text-[#5A1725]">
                Corporate Floral Services & Accounts
              </h1>
            </div>
            <CorporateSection />
            <TestimonialsSection />
          </>
        )}

        {activeView === 'story' && (
          <>
            <StorySection />
            <TestimonialsSection />
          </>
        )}
      </main>

      {/* Luxury Footer */}
      <Footer />

      {/* Modals and Drawers */}
      <QuickViewModal />
      <CartDrawer />
      <CheckoutModal />
      <WishlistDrawer />
      <SubscriptionModal />
      <CorporateModal />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#5A1725] text-[#FAF7F1] border border-[#D8C09A] px-5 py-3 shadow-2xl flex items-center gap-3 animate-fade-in text-xs font-medium">
          <Sparkles className="w-4 h-4 text-[#D8C09A] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainContent />
    </ShopProvider>
  );
}
