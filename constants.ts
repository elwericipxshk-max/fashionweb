import { TShirtColor, FontOption, Review } from './types';

// Using solid colors for the SVG overlay simulation
export const TSHIRT_COLORS: TShirtColor[] = [
  { 
    id: 'white', 
    name: 'Ekru Beyaz', 
    hex: '#F5F5F5', 
    imageFront: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop', // Placeholder for front
    imageBack: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800&auto=format&fit=crop' // Placeholder for back (using same for demo simplicity logic)
  },
  { 
    id: 'black', 
    name: 'Gece Siyahı', 
    hex: '#1a1a1a', 
    imageFront: 'https://images.unsplash.com/photo-1503341504253-dff481d5d474?q=80&w=800&auto=format&fit=crop',
    imageBack: 'https://images.unsplash.com/photo-1503341504253-dff481d5d474?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'beige', 
    name: 'Toprak', 
    hex: '#D2B48C', 
    imageFront: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop',
    imageBack: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800&auto=format&fit=crop'
  },
  { 
    id: 'navy', 
    name: 'Okyanus', 
    hex: '#2c3e50', 
    imageFront: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop',
    imageBack: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?q=80&w=800&auto=format&fit=crop'
  },
];

export const FONT_OPTIONS: FontOption[] = [
  { id: 'bold', name: 'HYPEBEAST', cssValue: 'font-street-bold tracking-widest' },
  { id: 'gothic', name: 'GOTHIC', cssValue: 'font-street-gothic tracking-tight' },
  { id: 'marker', name: 'GRAFFITI', cssValue: 'font-street-marker' },
  { id: 'glitch', name: 'CYBER', cssValue: 'font-street-glitch' },
  { id: 'mono', name: 'RAW', cssValue: 'font-street-mono font-bold' },
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: '1',
    userName: 'Elif Y.',
    rating: 5,
    comment: 'Kumaş kalitesi inanılmaz. Nakış tam istediğim gibi duruyor. Cosna farkı!',
    date: '2 gün önce',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&auto=format&fit=crop&q=60'
  },
  {
    id: '2',
    userName: 'Caner K.',
    rating: 4,
    comment: 'Baskı kalitesi güzel ama kargo bir tık geç geldi. Ürün harika.',
    date: '1 hafta önce'
  }
];