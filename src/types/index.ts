export interface WatchProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  isBestseller?: boolean;
  category: 'automatic' | 'chronograph' | 'heritage' | 'minimalist';
  description: string;
  story: string;
  specs: {
    caseDiameter: string;
    caseThickness: string;
    caseMaterial: string;
    dialColor: string;
    movement: string;
    powerReserve: string;
    waterResistance: string;
    glass: string;
    strapMaterial: string;
    lugWidth: string;
  };
  features: string[];
  images: {
    primary: string;
    angle: string;
    macro: string;
    wrist: string;
  };
  colorOptions: {
    name: string;
    caseColor: string;
    strapColor: string;
    dialColor: string;
  }[];
}

export interface CartItem {
  product: WatchProduct;
  quantity: number;
  selectedCase: string;
  selectedStrap: string;
  selectedDial: string;
  customEngraving?: string;
}

export interface JournalArticle {
  id: string;
  title: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string[];
  quote: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location: string;
  watchModel: string;
  rating: number;
}
