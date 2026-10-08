import React, { useState, useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';

import heroBoutiqueRoom from '../assets/images/hero_boutique_room_bg_1791397307377.jpg';
import heroBouquet from '../assets/images/hero_bouquet_sharp_isolated_1791397318176.jpg';
import heroBoutiqueMarble from '../assets/images/hero_boutique_marble_1791396983616.jpg';

interface Slide {
  id: number;
  promoLabel: string;
  headline: string;
  headlineAccent?: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  secondaryActionType: 'subscriptions' | 'corporate' | 'protea';
  imageUrl: string;
  imageAlt: string;
  badgeTopText: string;
  badgeBottomText: string;
  badgeCenterText: string;
}

const HERO_SLIDES: Slide[] = [
  {
    id: 1,
    promoLabel: 'AUTUMN BOTANICAL COLLECTION · 2026 COUTURE',
    headline: 'Sculptural Blossoms & Timeless Romance',
    headlineAccent: 'Hand-Tied Couture',
    description: 'Crafted daily in our Johannesburg & Cape Town ateliérs using estate David Austin garden roses, rare Venetian ranunculus, and sustainable Cape foliage for extraordinary moments.',
    primaryCtaText: 'SHOP NOW',
    secondaryCtaText: 'Explore Weekly Subscriptions →',
    secondaryActionType: 'subscriptions',
    imageUrl: heroBoutiqueRoom,
    imageAlt: 'Elaborate bridal bouquet of David Austin garden roses and ranunculus',
    badgeTopText: '100% ESTATE HARVEST',
    badgeBottomText: 'MASTER FLORIST HAND-TIED',
    badgeCenterText: 'EST. 2021',
  },
  {
    id: 2,
    promoLabel: 'INDIGENOUS CAPE BOTANICAL HERITAGE',
    headline: 'The Sovereign King Protea Collection',
    headlineAccent: 'Cape Flora Grandeur',
    description: 'Sustainably hand-harvested from certified Cape mountain reserves. Monumental blush cynaroides proteas harmonized with wild scarlet pincushions and silver-tree foliage.',
    primaryCtaText: 'SHOP NOW',
    secondaryCtaText: 'Discover Protea Heritage →',
    secondaryActionType: 'protea',
    imageUrl: heroBouquet,
    imageAlt: 'Artisanal arrangement with King Proteas and endemic South African fynbos',
    badgeTopText: 'CERTIFIED CAPE FLORA',
    badgeBottomText: 'SAME-DAY GAUTENG & WC',
    badgeCenterText: 'NATIVE',
  },
  {
    id: 3,
    promoLabel: 'PRIVATE RESIDENCES & BOARDROOMS',
    headline: 'Living Floral Artistry for Elevated Spaces',
    headlineAccent: 'Curated Memberships',
    description: 'Transform your dining table or corporate reception with weekly bespoke floral drops in rotatable artisan ceramic urns, conditioned for long-lasting perfume and structural grandeur.',
    primaryCtaText: 'SHOP NOW',
    secondaryCtaText: 'Inquire for Corporate Styling →',
    secondaryActionType: 'corporate',
    imageUrl: heroBoutiqueMarble,
    imageAlt: 'Grand velvet hatbox arrangement with lavish pastel flowers',
    badgeTopText: 'WEEKLY LUXURY DROPS',
    badgeBottomText: 'FREE ARTISAN VASE',
    badgeCenterText: 'VIP CLUB',
  },
];
