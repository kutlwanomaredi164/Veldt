import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, VaseOption, SubscriptionPlan } from '../types';
import { PRODUCTS, VASE_OPTIONS, SUBSCRIPTION_PLANS } from '../data/products';

interface ShopContextType {
  products: Product[];
  cart: CartItem[];
  wishlist: string[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isQuickViewOpen: boolean;
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isCorporateModalOpen: boolean;
  setIsCorporateModalOpen: (open: boolean) => void;
  isSubscriptionModalOpen: boolean;
  setIsSubscriptionModalOpen: (open: boolean) => void;
  selectedSubPlan: SubscriptionPlan | null;
  openSubscriptionModal: (plan?: SubscriptionPlan) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeView: 'home' | 'shop' | 'subscriptions' | 'corporate' | 'story';
  setActiveView: (view: 'home' | 'shop' | 'subscriptions' | 'corporate' | 'story') => void;
  
  // Filtering & Catalog navigation
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedOccasion: string | null;
  setSelectedOccasion: (occ: string | null) => void;
  selectedFlowerType: string | null;
  setSelectedFlowerType: (type: string | null) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Actions
  addToCart: (params: {
    product: Product;
    selectedSize?: 'Petite' | 'Classic' | 'Grand' | 'Opulent';
    selectedVase?: VaseOption;
    recipientName?: string;
    cardMessage?: string;
    deliveryDate?: string;
    deliveryTimeSlot?: 'Morning (09:00 - 13:00)' | 'Afternoon (13:00 - 18:00)' | 'Anytime';
    quantity?: number;
  }) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotal: number;
  cartCount: number;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products] = useState<Product[]>(PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('vanderlyn_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('vanderlyn_wishlist');
      return saved ? JSON.parse(saved) : ['vnd-01', 'vnd-03'];
    } catch {
      return ['vnd-01', 'vnd-03'];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCorporateModalOpen, setIsCorporateModalOpen] = useState(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false);
  const [selectedSubPlan, setSelectedSubPlan] = useState<SubscriptionPlan | null>(SUBSCRIPTION_PLANS[1]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeView, setActiveView] = useState<'home' | 'shop' | 'subscriptions' | 'corporate' | 'story'>('home');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOccasion, setSelectedOccasion] = useState<string | null>(null);
  const [selectedFlowerType, setSelectedFlowerType] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('vanderlyn_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('vanderlyn_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3800);
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setIsQuickViewOpen(true);
  };

  const closeQuickView = () => {
    setIsQuickViewOpen(false);
    setQuickViewProduct(null);
  };

  const openSubscriptionModal = (plan?: SubscriptionPlan) => {
    setSelectedSubPlan(plan || SUBSCRIPTION_PLANS[1]);
    setIsSubscriptionModalOpen(true);
  };

  const calculateItemPrice = (
    basePrice: number,
    size: 'Petite' | 'Classic' | 'Grand' | 'Opulent',
    vase: VaseOption
  ) => {
    let multiplier = 1.0;
    if (size === 'Petite') multiplier = 0.8;
    if (size === 'Grand') multiplier = 1.35;
    if (size === 'Opulent') multiplier = 1.8;
    return Math.round(basePrice * multiplier) + vase.price;
  };

  const addToCart = ({
    product,
    selectedSize = 'Classic',
    selectedVase = VASE_OPTIONS[0],
    recipientName = '',
    cardMessage = '',
    deliveryDate = '',
    deliveryTimeSlot = 'Anytime',
    quantity = 1,
  }: {
    product: Product;
    selectedSize?: 'Petite' | 'Classic' | 'Grand' | 'Opulent';
    selectedVase?: VaseOption;
    recipientName?: string;
    cardMessage?: string;
    deliveryDate?: string;
    deliveryTimeSlot?: 'Morning (09:00 - 13:00)' | 'Afternoon (13:00 - 18:00)' | 'Anytime';
    quantity?: number;
  }) => {
    const calculatedUnitPrice = calculateItemPrice(product.price, selectedSize, selectedVase);
    const cartItemId = `${product.id}-${selectedSize}-${selectedVase.id}-${deliveryDate || 'nodate'}-${recipientName.trim().toLowerCase()}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          id: cartItemId,
          productId: product.id,
          product,
          selectedSize,
          selectedVase,
          recipientName,
          cardMessage,
          deliveryDate,
          deliveryTimeSlot,
          quantity,
          itemPrice: calculatedUnitPrice,
        },
      ];
    });

    showToast(`"${product.name}" added to your botanical basket`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from basket');
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      showToast(exists ? 'Removed from your curated wishlist' : 'Saved to your curated wishlist');
      return next;
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartTotal = cart.reduce((sum, item) => sum + item.itemPrice * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        products,
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isQuickViewOpen,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isCorporateModalOpen,
        setIsCorporateModalOpen,
        isSubscriptionModalOpen,
        setIsSubscriptionModalOpen,
        selectedSubPlan,
        openSubscriptionModal,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeView,
        setActiveView,
        selectedCategory,
        setSelectedCategory,
        selectedOccasion,
        setSelectedOccasion,
        selectedFlowerType,
        setSelectedFlowerType,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotal,
        cartCount,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
