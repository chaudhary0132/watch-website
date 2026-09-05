import { WatchProduct } from '../types';

export const PRODUCTS: WatchProduct[] = [
  {
    id: 'arven-classic',
    name: 'ARVÉN CLASSIC',
    subtitle: 'Automatic 40mm • Champagne & Cognac',
    tagline: 'Timeless symmetry and horological purity.',
    price: 3450,
    badge: 'SIGNATURE',
    isBestseller: true,
    category: 'automatic',
    description: 'A pure expression of fine watchmaking, featuring a bespoke sunburst champagne dial, hand-applied gold indices, and a genuine calfskin strap.',
    story: 'The ARVÉN Classic was born from a desire to strip away the superfluous and elevate the essential. Hand-assembled in Le Locle, Switzerland, its balanced 40mm case houses our proprietary Calibre AV-101 automatic movement with an open sapphire exhibition back.',
    specs: {
      caseDiameter: '40 mm',
      caseThickness: '9.8 mm',
      caseMaterial: '316L Stainless Steel with 18k Yellow Gold PVD',
      dialColor: 'Sunburst Champagne with Ivory Undertone',
      movement: 'Calibre AV-101 Automatic (28,800 vph)',
      powerReserve: '48 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Double-Domed Sapphire Crystal with Anti-Reflective Coating',
      strapMaterial: 'Handcrafted Cognac Italian Calfskin Leather',
      lugWidth: '20 mm'
    },
    features: [
      'Swiss Calibre AV-101 Automatic Movement',
      'Double-domed scratch-resistant sapphire crystal',
      'Hand-applied 18k gold faceted hour markers',
      'Exhibition caseback with gold skeletonized rotor',
      'Handcrafted Italian full-grain leather strap with quick-release'
    ],
    images: {
      primary: '/images/watches/classic-champagne.webp',
      angle: '/images/watches/classic-angle.webp',
      macro: '/images/watches/classic-macro.webp',
      wrist: '/images/watches/classic-wrist.webp'
    },
    colorOptions: [
      { name: 'Yellow Gold & Cognac', caseColor: '#B08A45', strapColor: '#4A3325', dialColor: '#F5EEE5' },
      { name: 'Rose Gold & Espresso', caseColor: '#C98B75', strapColor: '#2C1E17', dialColor: '#FBF8F3' },
      { name: 'Platinum Silver & Black', caseColor: '#D8D8D8', strapColor: '#1A1817', dialColor: '#EBEBEB' }
    ]
  },
  {
    id: 'arven-chrono',
    name: 'ARVÉN CHRONO',
    subtitle: 'Bicompax Chronograph 41mm • Gold & Slate',
    tagline: 'High-precision mechanical timing meets architectural elegance.',
    price: 4200,
    originalPrice: 4600,
    badge: 'BESTSELLER',
    isBestseller: true,
    category: 'chronograph',
    description: 'Engineered for commanding presence, the ARVÉN Chrono features dual sub-dials with concentric snailing, column-wheel precision, and a warm gold-brushed bezel.',
    story: 'Conceived for those who navigate life with decisive timing. The bicompax layout balances the running seconds and a 30-minute counter in harmonious symmetry, finished with flame-blued and gold hands.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '11.4 mm',
      caseMaterial: 'Polished & Brushed 18k Yellow Gold Alloy',
      dialColor: 'Warm Champagne & Dual Guilloché Sub-dials',
      movement: 'Calibre AV-202 Column-Wheel Chronograph',
      powerReserve: '54 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Box-Shape Sapphire Crystal with Triple AR Coating',
      strapMaterial: 'Espresso Brown Alligator-Embossed Leather',
      lugWidth: '21 mm'
    },
    features: [
      'Column-wheel mechanical chronograph with tactile pushers',
      'Bicompax sub-dials with circular guilloché texture',
      'Tachymeter scale finely engraved on the inner rehaut',
      'Applied Roman XII and faceted diamond-cut markers',
      'Solid 18k gold deployant safety clasp'
    ],
    images: {
      primary: '/images/watches/chrono-gold.webp',
      angle: '/images/watches/chrono-angle.webp',
      macro: '/images/watches/chrono-macro.webp',
      wrist: '/images/watches/chrono-wrist.webp'
    },
    colorOptions: [
      { name: 'Champagne & Espresso', caseColor: '#B08A45', strapColor: '#3A271D', dialColor: '#F5EEE5' },
      { name: 'Rose Gold & Tobacco', caseColor: '#C98B75', strapColor: '#4A3325', dialColor: '#FDFCF7' },
      { name: 'Polished Steel & Marine', caseColor: '#D8D8D8', strapColor: '#1F2A38', dialColor: '#E9DED1' }
    ]
  },
  {
    id: 'arven-heritage',
    name: 'ARVÉN HERITAGE',
    subtitle: 'Vintage Edition 39mm • Ivory & Saddle Tan',
    tagline: 'A tribute to the golden era of mid-century watchmaking.',
    price: 3800,
    badge: 'LIMITED EDITION',
    isBestseller: true,
    category: 'heritage',
    description: 'A vintage-inspired 39mm case with curved wire lugs, an ivory enamel dial, and warm heat-tempered Breguet-style hands.',
    story: 'Drawing inspiration from bespoke horological commissions of the 1950s, the Heritage captures the nostalgic warmth of aged parchment and polished warm gold, updated with modern Swiss tolerance.',
    specs: {
      caseDiameter: '39 mm',
      caseThickness: '9.2 mm',
      caseMaterial: 'Warm 18k Rose Gold with Brushed Flanks',
      dialColor: 'Grand Feu Ivory Enamel with Warm Patina',
      movement: 'Calibre AV-090 Ultra-Thin Manual Wind',
      powerReserve: '50 Hours',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Domed Sapphire Crystal with Internal Anti-Reflective',
      strapMaterial: 'Vintage Saddle Tan Horween Leather with Contrast Stitching',
      lugWidth: '19 mm'
    },
    features: [
      'Ultra-thin 9.2mm profile sliding effortlessly beneath shirt cuffs',
      'Grand Feu ivory enamel dial with permanent lustre',
      'Flame-tempered blue steel seconds hand',
      'Vintage fluted onion crown with embossed ARVÉN crest',
      'Numbered limited series engraving on case perimeter'
    ],
    images: {
      primary: '/images/watches/heritage-ivory.webp',
      angle: '/images/watches/heritage-angle.webp',
      macro: '/images/watches/heritage-macro.webp',
      wrist: '/images/watches/heritage-wrist.webp'
    },
    colorOptions: [
      { name: 'Rose Gold & Saddle Tan', caseColor: '#C98B75', strapColor: '#8C5A3C', dialColor: '#FDF8F0' },
      { name: 'Yellow Gold & Walnut', caseColor: '#B08A45', strapColor: '#3A271D', dialColor: '#F5EEE5' },
      { name: 'White Gold & Slate', caseColor: '#D8D8D8', strapColor: '#33251D', dialColor: '#FBF8F3' }
    ]
  },
  {
    id: 'arven-noir',
    name: 'ARVÉN NOIR',
    subtitle: 'Midnight Edition 41mm • Deep Bronze & Onyx',
    tagline: 'Modern luxury veiled in deep mysterious tones.',
    price: 3950,
    badge: 'NEW RELEASE',
    isBestseller: false,
    category: 'minimalist',
    description: 'A striking interplay of deep charcoal sunburst dial, brushed champagne gold accents, and a matte black vegetable-tanned bridle leather strap.',
    story: 'For the individual who commands subtlety. The Noir balances high-contrast gold hands against a dark velvet dial, creating an indelible statement under evening lights.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '10.2 mm',
      caseMaterial: 'Black DLC coated 316L Steel with 18k Gold Bezel',
      dialColor: 'Matte Onyx Black with Gold Sunray Sub-layer',
      movement: 'Calibre AV-105 Automatic with Date Window',
      powerReserve: '45 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Sapphire Crystal with Double-Sided Anti-Reflective',
      strapMaterial: 'Matte Black Vegetable-Tanned Bridle Leather',
      lugWidth: '20 mm'
    },
    features: [
      'High-contrast brushed gold hands with Super-LumiNova luminescence',
      'Scratch-resistant Diamond-Like Carbon (DLC) case finish',
      'Subtle date aperture at 6 o’clock with matching black disc',
      'Solid sapphire crystal with hydrophobic coating',
      'Dual-texture strap combining matte leather with gold stitching'
    ],
    images: {
      primary: '/images/watches/noir-black.webp',
      angle: '/images/watches/noir-angle.webp',
      macro: '/images/watches/noir-macro.webp',
      wrist: '/images/watches/noir-wrist.webp'
    },
    colorOptions: [
      { name: 'Onyx & Champagne Gold', caseColor: '#B08A45', strapColor: '#1A1817', dialColor: '#2C1E17' },
      { name: 'Deep Bronze & Espresso', caseColor: '#A87948', strapColor: '#2C1E17', dialColor: '#1C1512' },
      { name: 'Monochrome Steel', caseColor: '#CCCCCC', strapColor: '#111111', dialColor: '#222222' }
    ]
  },
  {
    id: 'arven-royal-tourbillon',
    name: 'ARVÉN ROYAL TOURBILLON',
    subtitle: 'Grand Complication 42mm • 18k Rose Gold Skeleton',
    tagline: 'The pinnacle of high-complication Swiss horology with exposed flying tourbillon.',
    price: 6850,
    badge: 'GRAND COMPLICATION',
    isBestseller: true,
    category: 'automatic',
    description: 'An extraordinary haute horlogerie tourbillon masterpiece showcasing hand-beveled rose gold bridges, fully skeletonized openwork mechanical movement, and an exposed flying tourbillon cage.',
    story: 'The ARVÉN Royal Tourbillon represents the zenith of our master horologists’ craft. Every bridge is hand-chamfered and black-polished, housing a twin-barrel movement with 72 hours of power reserve.',
    specs: {
      caseDiameter: '42 mm',
      caseThickness: '11.2 mm',
      caseMaterial: 'Solid 18k Rose Gold with Hand-Polished Mirror Chamfers',
      dialColor: 'Skeletonized Openwork with Rose Gold Roman Numerals',
      movement: 'Calibre AV-700 Flying Tourbillon Manual-Wind (21,600 vph)',
      powerReserve: '72 Hours Twin-Barrel',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Double-Domed Box Sapphire Crystal with Double Anti-Reflective',
      strapMaterial: 'Handcrafted Espresso Brown Alligator-Embossed Italian Leather',
      lugWidth: '22 mm'
    },
    features: [
      'Exposed 60-second flying tourbillon carriage at 6 o’clock',
      'Twin-barrel 72-hour power reserve with open spring architecture',
      'Solid 18k rose gold case with hand-chamfered mirror edges',
      'Double-domed anti-reflective scratchproof box sapphire crystal',
      'Hand-stitched Italian alligator-embossed leather strap with 18k gold clasp'
    ],
    images: {
      primary: '/images/arven-royal-tourbillon.jpg',
      angle: '/images/arven-royal-tourbillon.jpg',
      macro: '/images/arven-royal-tourbillon.jpg',
      wrist: '/images/arven-royal-tourbillon.jpg'
    },
    colorOptions: [
      { name: '18k Rose Gold & Espresso', caseColor: '#C98B75', strapColor: '#3A271D', dialColor: '#E8D4C4' },
      { name: 'Solid Yellow Gold & Cognac', caseColor: '#B08A45', strapColor: '#4A3325', dialColor: '#F5EEE5' },
      { name: 'Platinum & Midnight Noir', caseColor: '#D8D8D8', strapColor: '#1A1817', dialColor: '#1A1817' }
    ]
  }
];

export const EDIT_PRODUCTS: WatchProduct[] = [
  PRODUCTS[0], // Classic
  PRODUCTS[1], // Chrono
  PRODUCTS[2]  // Heritage
];
