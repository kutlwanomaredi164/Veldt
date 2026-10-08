import { Review } from '../types';

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    author: 'Celia van der Merwe',
    location: 'Hyde Park, Johannesburg',
    rating: 5,
    date: '3 days ago',
    title: 'Unrivalled floral artistry in South Africa',
    content: 'I ordered the Sandton Grand Velvet Hatbox for my sister’s 40th birthday dinner in Sandhurst. The craftsmanship was breathtaking—the David Austin roses were so fragrant they perfumed the entire dining room for over ten days. The wax-sealed calligraphy card was such a regal touch.',
    verifiedPurchase: true,
    productName: 'The Sandton Grand Velvet Hatbox',
  },
  {
    id: 'rev-2',
    author: 'Dr. Thabo Khumalo',
    location: 'Waterkloof Ridge, Pretoria',
    rating: 5,
    date: '1 week ago',
    title: 'Exceeded every expectation for our anniversary',
    content: 'From the discreet courier in smart attire to the sheer volume of King Proteas and garden roses in the Franschhoek Symphony, Vanderlyn operates on a level well beyond standard florists. My wife was genuinely emotional. Worth every cent.',
    verifiedPurchase: true,
    productName: 'The Franschhoek Garden Rose Symphony',
  },
  {
    id: 'rev-3',
    author: 'Margaux De Villiers',
    location: 'Constantia, Cape Town',
    rating: 5,
    date: '2 weeks ago',
    title: 'Weekly subscription transforms our home',
    content: 'We joined the Grand Residence weekly subscription three months ago. Every Thursday, a pristine arrangement arrives in a gorgeous fresh ceramic urn. The floral curation changes with the Cape seasons—last week we had coral peonies and wild fynbos. Outstanding service.',
    verifiedPurchase: true,
    productName: 'Weekly Residence Subscription',
  },
  {
    id: 'rev-4',
    author: 'Liam & Sarah Sterling',
    location: 'Camps Bay, Cape Town',
    rating: 5,
    date: '3 weeks ago',
    title: 'Sculptural elegance for our corporate boardroom',
    content: 'We engaged Vanderlyn for our private wealth firm’s reception in Sandton. Their King Protea architectural arrangements make an unforgettable impression on our international clients. Flawless execution and reliable weekly turnover.',
    verifiedPurchase: true,
    productName: 'Executive Boardroom Architectural Bloom',
  },
  {
    id: 'rev-5',
    author: 'Ananya Pillay',
    location: 'Rosebank, Johannesburg',
    rating: 5,
    date: '1 month ago',
    title: 'The Cap Classique gift hamper was perfection',
    content: 'Ordered the Hyde Park Imperial Hamper with Graham Beck Cuvée Clive for our wedding anniversary. The flowers remained pristine for nearly two weeks! Beautifully packaged and arrived exactly on time.',
    verifiedPurchase: true,
    productName: 'The Hyde Park Imperial Gift Box & MCC',
  }
];

export const PRESS_ACCOLADES = [
  {
    source: 'VOGUE LIVING',
    quote: 'The atelier redefining South African floral couture with museum-grade botanical reverence.'
  },
  {
    source: 'HOUSE & LEISURE',
    quote: 'Sculptural King Proteas and David Austin garden roses styled to breathtaking perfection.'
  },
  {
    source: 'FINANCIAL MAIL LUXE',
    quote: 'Johannesburg and Cape Town’s most coveted private floral membership.'
  },
  {
    source: 'CONDÉ NAST',
    quote: 'Uncompromising romance, sustainable fynbos harvesting, and old-world European elegance.'
  }
];
