/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Wine {
  id: string;
  name: string;
  year: number;
  type: 'Red' | 'White' | 'Rosé' | 'Sparkling';
  price: number;
  rating: number;
  description: string;
  longDescription: string;
  region: string;
  alcohol: string;
  grapes: string;
  volume: string;
  image: string;
  badge?: string;
  acidity: string;
  body: string;
}

export interface WineEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  price: number;
  description: string;
  image: string;
  availableSlots: number;
}

export interface ClubTier {
  id: string;
  name: string;
  price: number;
  period: string;
  badge: string;
  tagline: string;
  benefits: string[];
  popular?: boolean;
}

export interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
}

export const WINE_CATEGORIES = ['All', 'Red', 'White', 'Rosé', 'Sparkling'] as const;

export const WINES: Wine[] = [
  {
    id: 'chateau-grand-reserve',
    name: 'Château Grand Réserve',
    year: 2018,
    type: 'Red',
    price: 185,
    rating: 4.9,
    description: 'A sovereign Cabernet Sauvignon with rich dark chocolate, blackberry, and toasted oak notes.',
    longDescription: 'Crafted from our oldest parcel on the south-facing slopes, the Château Grand Réserve represents the pinnacle of our winemaking heritage. Aged for 24 months in new French oak barrels, it offers a harmonious blend of velvety tannins and complex aromatics.',
    region: 'Bordeaux Valley, France',
    alcohol: '14.5%',
    grapes: 'Cabernet Sauvignon, Merlot',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&w=600&q=80',
    badge: 'Award Winner',
    acidity: 'Medium',
    body: 'Full Body'
  },
  {
    id: 'domaine-lumineux-chardonnay',
    name: 'Domaine Lumineux Chardonnay',
    year: 2020,
    type: 'White',
    price: 95,
    rating: 4.7,
    description: 'Crisp green apple and buttery brioche with a smooth honeyed finish.',
    longDescription: 'Harvested in the cool morning twilight to preserve crispness, this Chardonnay is fermented on fine lees. Balanced acidity is coupled with vanilla bean and delicate toasted almond characters, making it highly sophisticated.',
    region: 'Napa Valley, California',
    alcohol: '13.5%',
    grapes: 'Chardonnay',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1603185734133-f14cd0a0ad4a?auto=format&fit=crop&w=600&q=80',
    badge: 'Highly Rated',
    acidity: 'Crisp & High',
    body: 'Medium'
  },
  {
    id: 'provence-rose-coeur',
    name: 'Provence Rosé Cœur',
    year: 2021,
    type: 'Rosé',
    price: 68,
    rating: 4.8,
    description: 'Pale salmon hue, carrying expressions of fresh wild strawberries, orange blossom, and sea salt.',
    longDescription: 'Inspired by the coastal winds of the French Riviera, this signature Rosé is a field blend of Grenache and Cinsault. Stainless steel tank-fermented to capture natural fruit vivacity and mineral complexity.',
    region: 'Côtes de Provence, France',
    alcohol: '12.8%',
    grapes: 'Grenache, Cinsault, Syrah',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1594372342415-468ece3ade1d?auto=format&fit=crop&w=600&q=80',
    acidity: 'High',
    body: 'Light & Crisp'
  },
  {
    id: 'imperial-cuvee-brut',
    name: 'Impérial Cuvée Brut',
    year: 2017,
    type: 'Sparkling',
    price: 240,
    rating: 4.9,
    description: 'An exceptional Champagne method sparkling wine with toasted hazelnut and white peach nuances.',
    longDescription: 'This sparkling review represents our dedication to traditional bottle secondary fermentation. It lies in our deep chalk cellars for over 48 months to develop its gorgeous creamy head and fine, persistent perlage.',
    region: 'Champagne Ardenne, France',
    alcohol: '12.2%',
    grapes: 'Pinot Noir, Chardonnay',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80',
    badge: 'Collector\'s Choice',
    acidity: 'Vibrant',
    body: 'Medium-Light'
  },
  {
    id: 'vignoble-royal-syrah',
    name: 'Vignoble Royal Syrah',
    year: 2019,
    type: 'Red',
    price: 135,
    rating: 4.8,
    description: 'Deep crimson with intense notes of black pepper, liquorice, and leather.',
    longDescription: 'Grown on steep granitic terraces, our Syrah showcases optimal grape structure. It possesses a wild character balanced by structured oak barrel refinement, offering a long, spicy and dry finish.',
    region: 'Rhône Valley, France',
    alcohol: '14.2%',
    grapes: 'Syrah (Shiraz)',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1553184658-4448514e9742?auto=format&fit=crop&w=600&q=80',
    acidity: 'Balanced',
    body: 'Full Body'
  },
  {
    id: 'villa-alta-pinot-grigio',
    name: 'Villa Alta Pinot Grigio',
    year: 2022,
    type: 'White',
    price: 74,
    rating: 4.6,
    description: 'Bright citrus blossoms, pear skins, and flinty volcanic mineral undertones.',
    longDescription: 'From high altitude northern Italian microclimates, this Pinot Grigio achieves perfect fruit maturation while maintaining its thrilling mountain-air acidity and linear focus.',
    region: 'Trentino-Alto Adige, Italy',
    alcohol: '12.5%',
    grapes: 'Pinot Grigio',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1569919650476-f543aa5555d1?auto=format&fit=crop&w=600&q=80',
    acidity: 'Crisp & Zesty',
    body: 'Light'
  },
  {
    id: 'reserva-del-sol-malbec',
    name: 'Reserva Del Sol Malbec',
    year: 2018,
    type: 'Red',
    price: 110,
    rating: 4.7,
    description: 'Luscious dark plum, violet aromatics, and velvet tannins with sweet smoke infusions.',
    longDescription: 'High-altitude sun-drenched vineyards in Mendoza yield extra concentrated berries. The slow, perfect maturation in French and American barrels gives rise to sweet spices and supple, smooth dark fruit palates.',
    region: 'Mendoza, Argentina',
    alcohol: '14.8%',
    grapes: 'Malbec',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1516594915697-87eb3b1c14ea?auto=format&fit=crop&w=600&q=80',
    badge: 'Popular',
    acidity: 'Soft',
    body: 'Full & Rich'
  },
  {
    id: 'brut-rose-prestige',
    name: 'Brut Rosé Prestige',
    year: 2019,
    type: 'Sparkling',
    price: 195,
    rating: 4.8,
    description: 'Graceful sparkling pink with notes of raspberry tart, pomegranate, and warm toast.',
    longDescription: 'A classic and expressive blend that utilizes gentle grape pressing to attain its beautiful pink coral tone. Lively carbonation lifts delicate summer berry pastries on the palate.',
    region: 'Champagne Ardenne, France',
    alcohol: '12.5%',
    grapes: 'Chardonnay, Pinot Meunier',
    volume: '750ml',
    image: 'https://images.unsplash.com/photo-1598555880561-1911fa9aa29c?auto=format&fit=crop&w=600&q=80',
    acidity: 'Refreshing',
    body: 'Medium'
  }
];

export const EVENTS: WineEvent[] = [
  {
    id: 'grand-cellar-tasting',
    title: 'Grand Cellar Vault Tasting',
    date: 'June 25, 2026',
    time: '18:00 - 21:30',
    location: 'Main Cellar Vault, Eastgate Liquid Gate Estate',
    price: 120,
    description: 'An intimate candlelit journey through our private library vintages, lead by head sommelier Marcus Sterling. Includes cheese pairings.',
    image: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80',
    availableSlots: 12
  },
  {
    id: 'sunset-harvest-dinner',
    title: 'Sunset Vineyard Harvest Dinner',
    date: 'July 12, 2026',
    time: '17:30 - 22:00',
    location: 'West Terrace, Cabernet Parcells',
    price: 250,
    description: 'A luxurious five-course gourmet menu prepared by Michelin-starred chef Isabella Vance, paired live with outstanding limited bottle releases.',
    image: 'https://images.unsplash.com/photo-1541250848049-b4f7141dca3f?auto=format&fit=crop&w=600&q=80',
    availableSlots: 24
  },
  {
    id: 'masterclass-blending',
    title: 'Winery Masterclass: Art of Blending',
    date: 'August 01, 2026',
    time: '14:00 - 17:00',
    location: 'Production Hall & Laboratory',
    price: 180,
    description: 'Become the vintner. Learn the balance of Bordeaux composition and assemble custom oak-infused test formulations to bottle and take home.',
    image: 'https://images.unsplash.com/photo-1568219656418-15c329dea10e?auto=format&fit=crop&w=600&q=80',
    availableSlots: 8
  }
];

export const CLUB_TIERS: ClubTier[] = [
  {
    id: 'sovereign',
    name: 'Sovereign Circle',
    price: 49,
    period: 'month',
    badge: 'Bronze',
    tagline: 'Ideal introduction to pristine bottles and exclusive tastings.',
    benefits: [
      '2 hand-selected reserve bottles shipped monthly',
      '10% checkout discount on all cellar catalog items',
      'Complimentary estate tastings for 2 persons yearly',
      'Priority registration for open winery dining/events',
      'Monthly digital sommelier notes and recipes'
    ]
  },
  {
    id: 'imperial',
    name: 'Imperial Club',
    price: 99,
    period: 'month',
    badge: 'Gold',
    tagline: 'Our most valued subscription for curious aficionados.',
    benefits: [
      '4 estate-exclusive/vintage bottles shipped monthly',
      '15% checkout discount on all cellar catalog items',
      'Unlimited complimentary tastings for 2 persons',
      '2 VIP tickets to the exclusive Annual Harvest Dinner',
      'Direct email access to the Cellar Sommelier Council',
      'Free nationwide carbon-neutral shipping'
    ],
    popular: true
  },
  {
    id: 'centurion',
    name: 'Centurion Vault',
    price: 249,
    period: 'month',
    badge: 'Platinum',
    tagline: 'For true collectors and connoisseurs who demand perfection.',
    benefits: [
      '6 ultra-rare pre-release & library bottles shipped monthly',
      '20% lifetime catalog discount with customized bottle styling',
      'Private estate lounge access with up to 4 guests',
      '4 VIP fast-passes to all Gourmet & Harvest events',
      'Annual private wine-blending workshop with our Head Winemaker',
      'Priority allocation for limited-edition wooden cask batches',
      'Temperature-controlled climate storage lockers at our estate'
    ]
  }
];

export const TIMELINE: TimelineMilestone[] = [
  {
    year: '1895',
    title: 'The First Vines Planted',
    description: 'Lord Arthur de Sterling acquired our south-facing stone terraces and planted the first Cabernet Sauvignon imports from Bordeaux.'
  },
  {
    year: '1924',
    title: 'Architectural Heritage Cellars',
    description: 'Excavation of our master chalk cellars finished, establishing a constant climate of 12°C for optimal bottle fermentation.'
  },
  {
    year: '1958',
    title: 'Invention of the Royal Oak Barrel Reserve',
    description: 'Pioneered custom toast levels on Slavonian and French oak barrels, introducing the famous rich vanilla & toast signature flavor and character.'
  },
  {
    year: '1998',
    title: 'Transition to Certified Organic Winemaking',
    description: 'Eliminated synthetic fertilizers completely. Welcomed local wild vegetation biodynamics to create healthier roots and distinct mineral profiles.'
  },
  {
    year: '2016',
    title: 'Best Global Red Wine Award',
    description: 'Château Grand Réserve 2012 awarded prestigious "Gold Master Award" in Paris, cementing our winery in global vintage heritage.'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "The Château Grand Réserve 2018 is an astonishing expression of Bordeaux grapes. Structurally magnificent with rich velvet layers that evolve dynamically in the glass.",
    author: "Eleanor Vance",
    role: "Senior Critic, Decanter Magazine",
    rating: 5
  },
  {
    id: '2',
    quote: "Their Champagne method Brut stands shoulder-to-shoulder with the grandest French houses. The persistent perlage and biscuit aroma are masterfully executed.",
    author: "Jean-Louis Dubois",
    role: "President, Sommelier Association Paris",
    rating: 5
  },
  {
    id: '3',
    quote: "Eastgate Liquid Gate is not just a merchant, it is a custodian of sensory history. Their wine tasting events are a sensory education like no other.",
    author: "William Sterling III",
    role: "Private Vault Collector & Wine Connoisseur",
    rating: 5
  }
];
