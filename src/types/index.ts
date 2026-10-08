export type FlowerCategory = 
  | 'Signature Bouquets'
  | 'Grand Hatboxes'
  | 'Sculptural Vases'
  | 'Protea & Fynbos Heritage'
  | 'Dried & Preserved'
  | 'Luxury Gifting Sets';

export type FlowerType = 
  | 'Garden Roses'
  | 'King Proteas'
  | 'Phalaenopsis Orchids'
  | 'Peonies & Ranunculus'
  | 'Dutch Tulips'
  | 'Hydrangeas & Delphinium'
  | 'Fynbos Botanicals';

export type OccasionType = 
  | 'Romance & Anniversary'
  | 'Birthday & Celebration'
  | 'Sympathy & Grace'
  | 'Congratulations'
  | 'Just Because'
  | 'Corporate Elegance';

export interface ProductOption {
  name: 'Petite' | 'Classic' | 'Grand' | 'Opulent';
  priceMultiplier: number;
  stemCount: string;
  description: string;
}

export interface VaseOption {
  id: string;
  name: string;
  price: number;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  price: number; // Base price in ZAR (Rands)
  category: FlowerCategory;
  flowerTypes: FlowerType[];
  occasions: OccasionType[];
  images: string[];
  description: string;
  stems: string[];
  dimensions: string;
  isBestSeller?: boolean;
  isNew?: boolean;
  isSeasonalLimited?: boolean;
  rating: number;
  reviewCount: number;
}

export interface CartItem {
  id: string; // unique item id including options
  productId: string;
  product: Product;
  selectedSize: 'Petite' | 'Classic' | 'Grand' | 'Opulent';
  selectedVase: VaseOption;
  recipientName?: string;
  cardMessage?: string;
  deliveryDate?: string;
  deliveryTimeSlot?: 'Morning (09:00 - 13:00)' | 'Afternoon (13:00 - 18:00)' | 'Anytime';
  quantity: number;
  itemPrice: number;
}

export interface SubscriptionPlan {
  id: string;
  title: string;
  subtitle: string;
  basePrice: number; // in ZAR
  frequency: 'Weekly' | 'Fortnightly' | 'Monthly';
  tier: 'Petite Atelier' | 'Classic Grand' | 'Opulent Residence';
  stemsPerDelivery: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  content: string;
  verifiedPurchase: boolean;
  productName?: string;
}
