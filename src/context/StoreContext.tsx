import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  category: 'Furniture' | 'Timepieces' | 'Silverware' | 'Jewelry' | 'Art';
  price: number;
  year: string;
  origin: string;
  description: string;
  specs: string[];
  story: string;
  images: string[];
  isFeatured?: boolean;
}

interface InquiryData {
  name: string;
  email: string;
  phone: string;
  message: string;
  productId?: string;
}

interface StoreContextType {
  products: Product[];
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOption: string;
  setSortOption: (option: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  inquireProduct: (product: Product) => void;
  submitInquiry: (data: InquiryData) => Promise<boolean>;
  activePage: string;
  setActivePage: (page: string) => void;
  cartCount: number;
  addToCart: () => void;
}

const PRODUCTS_DATA: Product[] = [
  {
    id: 'ormolu-clock',
    name: '18th-Century French Ormolu Clock',
    category: 'Timepieces',
    price: 24500,
    year: 'c. 1765',
    origin: 'Paris, France',
    description: 'An exquisite French gilt bronze clock featuring classical ornamentation and meticulous craftsmanship, depicting the allegorical figure of Urania, Muse of Astronomy.',
    specs: [
      'Height: 48 cm',
      'Width: 35 cm',
      'Material: Gilt Bronze (Ormolu), White Marble',
      'Movement: 8-day anchor escapement with bell strike',
      'Condition: Excellent original gilding, movement fully overhauled'
    ],
    story: 'This clock was commissioned during the peak of Louis XV\'s reign for a noble aristocratic salon in the Marais district of Paris. The fine fire-gilding (mercury gilding) retains its original deep, glowing luster, and the detailed engraving showcases the pinnacle of French neoclassical horology. The allegorical details, including the celestial sphere, reflect the 18th-century Enlightenment era\'s passion for astronomy and scientific discovery.',
    images: [
      'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517594422361-5eeb8ae275a9?auto=format&fit=crop&w=800&q=80'
    ],
    isFeatured: true
  },
  {
    id: 'mahogany-desk',
    name: 'Victorian Mahogany Partner\'s Desk',
    category: 'Furniture',
    price: 8700,
    year: 'c. 1880',
    origin: 'London, England',
    description: 'A classic Victorian mahogany double pedestal partner\'s desk with a hand-tooled forest green leather writing surface and refined gold leaf detail.',
    specs: [
      'Dimensions: 152 cm x 91 cm x 76 cm',
      'Material: Premium Cuban Mahogany, Genuine Leather',
      'Drawers: 9 active drawers per pedestal with hand-cut dovetails',
      'Key Features: Original solid brass handles and working safety locks'
    ],
    story: 'Dating back to the late Victorian era, this double-sided partner\'s desk was recovered from an old solicitor\'s chambers in Lincoln\'s Inn Fields, London. It is built from dense, slow-growth Cuban mahogany, displaying a deep rich grain pattern that has seasoned beautifully over more than a century. The gold-tooled leather writing surface has been meticulously preserved.',
    images: [
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'silver-chalice',
    name: 'Imperial Russian Cloisonné Enamel Chalice',
    category: 'Silverware',
    price: 12400,
    year: 'c. 1895',
    origin: 'St. Petersburg, Russia',
    description: 'An exceptionally rare cloisonné enamel on gilt silver liturgical chalice, bearing the official 84 Zolotnik hallmarks of Czarist Russia.',
    specs: [
      'Height: 18 cm',
      'Weight: 420 grams',
      'Material: Sterling Silver (Gilt), Cloisonné Enamel',
      'Hallmarks: St. Petersburg active mark, 84 standard Zolotnik'
    ],
    story: 'Crafted in the late Imperial era of Russia, this gilt-silver chalice presents breathtaking cloisonné enameling in sapphire, emerald, and cream. The fine craftsmanship represents the peak of St. Petersburg silversmith techniques, showcasing rich cultural iconography and regal luxury. The chalice survived the early 20th century in a private Parisian collection.',
    images: [
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'art-deco-brooch',
    name: 'Art Deco Diamond Filigree Brooch',
    category: 'Jewelry',
    price: 15900,
    year: 'c. 1925',
    origin: 'New York, USA',
    description: 'An elegant platinum brooch studded with old European-cut diamonds and fine calibrated sapphires in a symmetrical geometric design.',
    specs: [
      'Diamonds: 3.5 carats total weight (G-H color, VS clarity)',
      'Sapphires: 1.2 carats caliber-cut natural Royal Blue sapphires',
      'Material: Solid Platinum (hallmarked)',
      'Design: Classic geometric Art Deco scroll pattern with milgrain edges'
    ],
    story: 'Embodying the roaring twenties, this platinum filigree brooch features the bold, geometric elegance that characterized the Art Deco movement in New York. The delicate openwork filigree looks like metallic lace, individually hand-fabricated with exquisite milgrain detailing.',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'ming-vase',
    name: 'Ming Dynasty Glazed Dragon Vase',
    category: 'Art',
    price: 32000,
    year: 'c. 1580',
    origin: 'Jingdezhen, China',
    description: 'A beautifully preserved blue and white porcelain vase with flying dragon motifs, dating back to the late Ming Dynasty (Wanli Period).',
    specs: [
      'Height: 34 cm',
      'Diameter: 22 cm',
      'Material: Fine Jingdezhen Kaolin Porcelain',
      'Glaze: Underglaze cobalt blue, natural wax polish'
    ],
    story: 'Recovered from an old collector\'s estate in Lisbon, this vase features the classic Imperial five-clawed dragon flying through stylized clouds and flame scrolls. The cobalt pigment, imported to China along Central Asian trade routes, gives that unique, rich blue glaze characteristic of high-quality late Ming porcelain.',
    images: [
      'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'marine-chronometer',
    name: '19th-Century Marine Chronometer',
    category: 'Timepieces',
    price: 14000,
    year: 'c. 1850',
    origin: 'Liverpool, England',
    description: 'An antique 2-day brass marine chronometer housed in its original three-part brass-bound mahogany box.',
    specs: [
      'Box Dimensions: 19 cm x 19 cm x 19 cm',
      'Dial: Engraved silvered dial, Roman numerals, power reserve dial',
      'Mechanism: Earnshaw spring detent escapement with fusee chain drive',
      'Gimbal: Fully gimballed brass tub with locking lever'
    ],
    story: 'Essential for old seafaring ships to calculate longitude, this chronometer was crafted by L.A. Dent in Liverpool, standard suppliers to the Royal Navy. Housed in its original mahogany box with brass inlay, it retains its gimbal balance, showing beautiful antique craftsmanship and functional history.',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508847154043-be12a62861c1?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'louis-armchair',
    name: 'Louis XIV Giltwood Armchair',
    category: 'Furniture',
    price: 19500,
    year: 'c. 1700',
    origin: 'Versailles, France',
    description: 'An imposing baroque period carved giltwood armchair upholstered in rich burgundy silk damask.',
    specs: [
      'Dimensions: 110 cm x 75 cm x 68 cm',
      'Material: Carved Walnut, 24k Gold Leaf Gilding',
      'Upholstery: Italian silk damask (historic style replacement)',
      'Structure: Original peg-joined mortise and tenon joints'
    ],
    story: 'Dating back to the golden age of French Baroque, this armchair exhibits the heavy, symmetric carving and classical scrolls popular at the Court of Versailles under Louis XIV. The gilding is mostly original, showing authentic signs of age and prestige.',
    images: [
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80'
    ]
  },
  {
    id: 'silver-tea-set',
    name: 'Victorian Sterling Silver Tea Set',
    category: 'Silverware',
    price: 6500,
    year: 'c. 1872',
    origin: 'Sheffield, England',
    description: 'A beautifully chased four-piece sterling silver tea and coffee service with floral motifs and ivory insulated handles.',
    specs: [
      'Set Includes: Teapot, Coffee Pot, Sugar Bowl, Creamer',
      'Total Weight: 2,150 grams of sterling silver',
      'Hallmark: Sheffield, 1872, James Dixon & Sons silversmiths'
    ],
    story: 'An outstanding example of high-Victorian craftsmanship, this set features detailed hand-chased repoussé work depicting climbing ivy and wild roses. Ideal for formal displays or high tea, representing the social luxury of the 19th-century British Empire.',
    images: [
      'https://images.unsplash.com/photo-1576016770956-debb63d900bb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=800&q=80'
    ]
  }
];

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activePage, setActivePage] = useState<string>('home');
  const [cartCount, setCartCount] = useState<number>(0);

  const inquireProduct = (product: Product) => {
    const text = `Hello Antique Heritage, I am highly interested in inquiring about the "${product.name}" (${product.year}, listed at $${product.price.toLocaleString()}). Please let me know its availability and shipping details.`;
    const whatsappUrl = `https://wa.me/15550199?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
  };

  const submitInquiry = async (data: InquiryData): Promise<boolean> => {
    // Simulate API call to backend
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Inquiry submitted successfully:', data);
        resolve(true);
      }, 1500);
    });
  };

  const addToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <StoreContext.Provider
      value={{
        products: PRODUCTS_DATA,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        sortOption,
        setSortOption,
        priceRange,
        setPriceRange,
        currentPage,
        setCurrentPage,
        selectedProduct,
        setSelectedProduct,
        inquireProduct,
        submitInquiry,
        activePage,
        setActivePage,
        cartCount,
        addToCart
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
