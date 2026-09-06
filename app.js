import * as THREE from 'https://esm.sh/three@0.165.0';
import { OrbitControls } from 'https://esm.sh/three@0.165.0/examples/jsm/controls/OrbitControls.js';
import confetti from 'https://esm.sh/canvas-confetti@1.9.3';
import {
  fetchProducts,
  createOrder,
  createInquiry,
  validatePromo,
  subscribeNewsletter,
  isSupabaseConfigured,
  INITIAL_PRODUCTS
} from './supabaseClient.js';

/* ========================================================
   ARVÉN LUXURY TIMEPIECES — DATA STORE
   ======================================================== */

let PRODUCTS = [
  {
    id: 'arven-haute-collection',
    name: 'ARVÉN HAUTE MASTERPIECE COLLECTION',
    subtitle: '4 Curated Bespoke Editions • 38mm to 41mm',
    tagline: 'Choose from 4 distinctive luxury editions: Royal Blue Jubilee, Tonneau Art Déco, Cushion Slim, and Carré Noir Stealth.',
    tag: '4 Editions in 1',
    size: '38mm - 41mm',
    price: 4150,
    badge: '4 EDITIONS IN 1',
    isBestseller: true,
    category: 'automatic',
    image: '/images/arven-royal-blue.jpg',
    description: 'The definitive ARVÉN signature timepiece offering 4 distinct case architectures and dial executions: Royal Sunray Blue & Jubilee Gold, Tonneau Art Déco, Cushion Ultra-Slim Steel, and Carré Noir Stealth DLC.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '10.8 mm',
      caseMaterial: '316L Stainless Steel & 18k Yellow Gold Bezel',
      dialColor: 'Royal Sunray Blue with Diamond-Set Indices',
      movement: 'Calibre AV-320 Day-Date Swiss Automatic (28,800 vph)',
      powerReserve: '50 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Scratch-Resistant Box Sapphire with Triple AR Glare Shield',
      strapMaterial: 'Two-Tone Stainless Steel & 18k Gold Jubilee Bracelet',
      lugWidth: '20 mm'
    },
    colorOptions: [
      {
        id: 'royal-blue',
        name: 'Royal Sunray Blue & Jubilee Gold',
        shortName: 'Royal Blue Day-Date',
        colorHex: '#1A365D',
        accentHex: '#D4AF37',
        price: 4150,
        size: '41mm',
        tag: 'Two-Tone Gold',
        badge: 'ROYAL JUBILEE',
        image: '/images/arven-royal-blue.jpg',
        specs: {
          caseDiameter: '41 mm',
          caseThickness: '10.8 mm',
          movement: 'Calibre AV-320 Day-Date Swiss Automatic',
          glass: 'Scratch-Resistant Box Sapphire AR',
          waterResistance: '100 Metres (10 ATM)',
          strapMaterial: 'Two-Tone 18k Gold & Steel Jubilee Bracelet'
        }
      },
      {
        id: 'tonneau-deco',
        name: 'Tonneau Art Déco Silver & Saddle Calfskin',
        shortName: 'Tonneau Art Déco',
        colorHex: '#C0A080',
        accentHex: '#D8D8D8',
        price: 3850,
        size: '38mm',
        tag: 'Art Déco Tonneau',
        badge: 'ART DÉCO HERITAGE',
        image: '/images/arven-tonneau-deco.jpg',
        specs: {
          caseDiameter: '38 mm x 44 mm',
          caseThickness: '9.4 mm',
          movement: 'Calibre AV-180 Slimline Automatic',
          glass: 'Curved Cambered Sapphire Crystal',
          waterResistance: '50 Metres (5 ATM)',
          strapMaterial: 'Handcrafted Saddle Brown Italian Calfskin'
        }
      },
      {
        id: 'cushion-silver',
        name: 'Cushion Ultra-Slim Monochromatic Silver',
        shortName: 'Cushion Ultra-Slim',
        colorHex: '#D8D8D8',
        accentHex: '#EBEBEB',
        price: 3650,
        size: '39mm',
        tag: 'Stainless Steel',
        badge: 'ULTRA-SLIM STEEL',
        image: '/images/arven-cushion-silver.jpg',
        specs: {
          caseDiameter: '39 mm',
          caseThickness: '7.8 mm Ultra-Thin',
          movement: 'Calibre AV-088 Ultra-Thin Precision Movement',
          glass: 'Flat Low-Profile Scratch Sapphire',
          waterResistance: '50 Metres (5 ATM)',
          strapMaterial: 'Integrated Brushed Multi-Link Steel Bracelet'
        }
      },
      {
        id: 'square-noir',
        name: 'Carré Noir Stealth DLC & Gilt Gold',
        shortName: 'Carré Noir Stealth',
        colorHex: '#181716',
        accentHex: '#D4AF37',
        price: 4300,
        size: '40mm',
        tag: 'DLC Stealth',
        badge: 'STEALTH NOIR DLC',
        image: '/images/arven-square-noir.jpg',
        specs: {
          caseDiameter: '40 mm x 40 mm',
          caseThickness: '10.2 mm',
          movement: 'Calibre AV-210 Petite Seconde Mechanical',
          glass: 'Faceted Beveled Sapphire Crystal',
          waterResistance: '100 Metres (10 ATM)',
          strapMaterial: 'Matching Matte DLC Black PVD Link Bracelet'
        }
      }
    ]
  },
  {
    id: 'arven-diver-twotone',
    name: 'ARVÉN DIVER TWO-TONE',
    subtitle: 'Two-Tone 41mm • 18k Yellow Gold & Black Ceramic',
    tagline: 'The pinnacle of luxury aquatic performance and dual-metal prestige.',
    tag: 'Gold & Ceramic',
    size: '41mm',
    price: 4450,
    badge: 'FLAGSHIP DIVER',
    isBestseller: true,
    category: 'diver',
    image: '/images/arven-exact-watch.png',
    description: 'The definitive ARVÉN luxury diver timepiece featuring a serrated 18k gold coin-edge bezel, black ceramic numbered insert, applied luminous gold pips, and a multi-link two-tone gold & ceramic bracelet.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '11.8 mm',
      caseMaterial: 'Gunmetal DLC Steel & 18k Yellow Gold Coin-Edge Bezel',
      dialColor: 'Onyx Black Sunray with Luminous Gold Pip Indices',
      movement: 'Calibre AV-300 High-Beat Swiss Automatic',
      powerReserve: '60 Hours',
      waterResistance: '300 Metres (30 ATM)',
      glass: 'Double-Domed Sapphire Crystal with Triple AR Coating',
      strapMaterial: 'Two-Tone DLC Steel & 18k Yellow Gold Multi-Link Bracelet',
      lugWidth: '20 mm'
    },
    colorOptions: [
      {
        id: 'gold-ceramic-diver',
        name: '18k Gold & Black Ceramic Diver',
        shortName: 'Two-Tone Diver',
        colorHex: '#D4AF37',
        accentHex: '#181716',
        price: 4450,
        size: '41mm',
        tag: 'Gold & Ceramic',
        badge: 'FLAGSHIP DIVER',
        image: '/images/arven-exact-watch.png',
        specs: {
          caseDiameter: '41 mm',
          caseThickness: '11.8 mm',
          movement: 'Calibre AV-300 High-Beat Swiss Automatic',
          glass: 'Double-Domed Sapphire Crystal Triple AR',
          waterResistance: '300 Metres (30 ATM)',
          strapMaterial: 'Two-Tone DLC Steel & 18k Gold Multi-Link Bracelet'
        }
      }
    ]
  },
  {
    id: 'arven-hero-wrist-watch',
    name: 'ARVÉN HERITAGE SLIMLINE',
    subtitle: 'Ultra-Slim 40mm • Sunburst Silver & Black Bridle',
    tagline: 'Timeless tailored elegance with a high-polish slim bezel and date aperture.',
    tag: 'Classic Silver',
    size: '40mm',
    price: 3450,
    badge: 'EDITORIAL WRIST',
    isBestseller: true,
    category: 'automatic',
    image: '/images/arven-hero-wrist.png',
    description: 'Featured in the ARVÉN flagship campaign: an ultra-thin stainless steel dress watch with a radiant sunburst silver dial, minimalist baton indices, and a black bridle calfskin strap.',
    specs: {
      caseDiameter: '40 mm',
      caseThickness: '8.2 mm',
      caseMaterial: '316L Mirror Polished Stainless Steel',
      dialColor: 'Sunburst Silver with Linear Baton Indices & Date at 3H',
      movement: 'Calibre AV-101 Slim Date Automatic',
      powerReserve: '48 Hours',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Ultra-Clear Sapphire Crystal with AR Coating',
      strapMaterial: 'Onyx Black Handcrafted Calfskin Leather',
      lugWidth: '20 mm'
    },
    colorOptions: [
      {
        id: 'silver-black-wrist',
        name: 'Sunburst Silver & Onyx Black Strap',
        shortName: 'Silver & Black',
        colorHex: '#D8D8D8',
        accentHex: '#141312',
        price: 3450,
        size: '40mm',
        tag: 'Classic Silver',
        badge: 'EDITORIAL WRIST',
        image: '/images/arven-hero-wrist.png',
        specs: {
          caseDiameter: '40 mm',
          caseThickness: '8.2 mm',
          movement: 'Calibre AV-101 Slim Date Automatic',
          glass: 'Ultra-Clear Sapphire Crystal with AR',
          waterResistance: '50 Metres (5 ATM)',
          strapMaterial: 'Onyx Black Handcrafted Calfskin Leather'
        }
      }
    ]
  },
  {
    id: 'arven-chrono',
    name: 'ARVÉN CHRONO ROYALE',
    subtitle: 'Bicompax Chronograph 41mm • Gold & Slate',
    tagline: 'High-precision mechanical timing meets architectural elegance.',
    tag: 'White Gold',
    size: '41mm',
    price: 4200,
    badge: 'BESTSELLER',
    isBestseller: true,
    category: 'chronograph',
    image: '/images/arven-twotone-chrono.jpg',
    description: 'Engineered for commanding presence, the ARVÉN Chrono features dual sub-dials with concentric snailing, column-wheel precision, and a warm gold-brushed bezel.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '11.4 mm',
      caseMaterial: 'Polished & Brushed 18k White Gold / Alloy',
      dialColor: 'Warm Champagne & Dual Guilloché Sub-dials',
      movement: 'Calibre AV-202 Column-Wheel Chronograph',
      powerReserve: '54 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Box-Shape Sapphire Crystal with Triple AR Coating',
      strapMaterial: 'Espresso Brown Alligator-Embossed Leather',
      lugWidth: '21 mm'
    },
    colorOptions: [
      { id: 'chrono-white', name: 'White Gold & Marine Slate', shortName: 'White Gold Chrono', colorHex: '#D8D8D8', accentHex: '#1F2A38', price: 4200, size: '41mm', tag: 'White Gold', badge: 'BESTSELLER', image: '/images/arven-twotone-chrono.jpg', specs: { caseDiameter: '41 mm', caseThickness: '11.4 mm', movement: 'Calibre AV-202 Column-Wheel Chronograph', glass: 'Box-Shape Sapphire Triple AR', waterResistance: '100 Metres (10 ATM)', strapMaterial: 'Marine Slate Alligator Leather' } },
      { id: 'chrono-yellow', name: 'Yellow Gold & Espresso', shortName: 'Yellow Gold Chrono', colorHex: '#B08A45', accentHex: '#3A271D', price: 4400, size: '41mm', tag: 'Yellow Gold', badge: 'GOLD EDITION', image: '/images/arven-royal-blue.jpg', specs: { caseDiameter: '41 mm', caseThickness: '11.4 mm', movement: 'Calibre AV-202 Column-Wheel Chronograph', glass: 'Box-Shape Sapphire Triple AR', waterResistance: '100 Metres (10 ATM)', strapMaterial: 'Espresso Leather' } }
    ]
  },
  {
    id: 'arven-heritage',
    name: 'ARVÉN GRAND HERITAGE',
    subtitle: 'Vintage Edition 39mm • Ivory & Saddle Tan',
    tagline: 'A tribute to the golden era of mid-century watchmaking.',
    tag: 'Everose Gold',
    size: '39mm',
    price: 3800,
    badge: 'LIMITED EDITION',
    isBestseller: true,
    category: 'heritage',
    image: '/images/arven-tonneau-deco.jpg',
    description: 'A vintage-inspired 39mm case with curved wire lugs, an ivory enamel dial, and warm heat-tempered Breguet-style hands.',
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
    colorOptions: [
      { id: 'heritage-rose', name: 'Rose Gold & Saddle Tan', shortName: 'Everose Heritage', colorHex: '#C98B75', accentHex: '#8C5A3C', price: 3800, size: '39mm', tag: 'Everose Gold', badge: 'LIMITED EDITION', image: '/images/arven-tonneau-deco.jpg', specs: { caseDiameter: '39 mm', caseThickness: '9.2 mm', movement: 'Calibre AV-090 Ultra-Thin Manual Wind', glass: 'Domed Sapphire Crystal', waterResistance: '50 Metres (5 ATM)', strapMaterial: 'Saddle Tan Horween Leather' } },
      { id: 'heritage-yellow', name: 'Yellow Gold & Walnut', shortName: 'Yellow Gold Heritage', colorHex: '#B08A45', accentHex: '#3A271D', price: 3800, size: '39mm', tag: 'Yellow Gold', badge: 'HERITAGE', image: '/images/arven-royal-blue.jpg', specs: { caseDiameter: '39 mm', caseThickness: '9.2 mm', movement: 'Calibre AV-090 Ultra-Thin Manual Wind', glass: 'Domed Sapphire Crystal', waterResistance: '50 Metres (5 ATM)', strapMaterial: 'Walnut Leather' } }
    ]
  },
  {
    id: 'arven-noir',
    name: 'ARVÉN NOIR EDITION',
    subtitle: 'Midnight Edition 41mm • Deep Bronze & Onyx',
    tagline: 'Modern luxury veiled in deep mysterious tones.',
    tag: 'DLC Midnight',
    size: '41mm',
    price: 3950,
    badge: 'NEW RELEASE',
    isBestseller: false,
    category: 'minimalist',
    image: '/images/arven-noir-highres.jpg',
    description: 'A striking interplay of deep charcoal sunburst dial, brushed champagne gold accents, and a matte black vegetable-tanned bridle leather strap.',
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
    colorOptions: [
      { id: 'noir-champagne', name: 'Onyx & Champagne Gold', shortName: 'DLC Midnight', colorHex: '#181716', accentHex: '#D4AF37', price: 3950, size: '41mm', tag: 'DLC Midnight', badge: 'NEW RELEASE', image: '/images/arven-noir-highres.jpg', specs: { caseDiameter: '41 mm', caseThickness: '10.2 mm', movement: 'Calibre AV-105 Automatic with Date', glass: 'Sapphire Double-Sided AR', waterResistance: '100 Metres (10 ATM)', strapMaterial: 'Matte Black Bridle Leather' } },
      { id: 'noir-bronze', name: 'Deep Bronze & Espresso', shortName: 'Deep Bronze', colorHex: '#A87948', accentHex: '#2C1E17', price: 4150, size: '41mm', tag: 'Bronze DLC', badge: 'BRONZE EDITION', image: '/images/arven-square-noir.jpg', specs: { caseDiameter: '41 mm', caseThickness: '10.2 mm', movement: 'Calibre AV-105 Automatic with Date', glass: 'Sapphire Double-Sided AR', waterResistance: '100 Metres (10 ATM)', strapMaterial: 'Espresso Bridle Leather' } }
    ]
  },
  {
    id: 'arven-cushion-silver',
    name: 'ARVÉN CUSHION ULTRA-SLIM',
    subtitle: 'Monochromatic 39mm • Ultra-Slim 7.8mm',
    tagline: 'Ultra-thin architectural silhouette sculpted in high-grade 316L stainless steel.',
    tag: 'Stainless Steel',
    size: '39mm',
    price: 3650,
    badge: 'ULTRA-SLIM STEEL',
    isBestseller: true,
    category: 'minimalist',
    image: '/images/arven-cushion-silver.jpg',
    description: 'An ultra-slim 7.8mm monochromatic timepiece crafted in brushed 316L stainless steel, paired with a sunray rhodium dial and an integrated multi-link steel bracelet.',
    specs: {
      caseDiameter: '39 mm',
      caseThickness: '7.8 mm Ultra-Thin',
      caseMaterial: '316L Fine-Brushed & Mirror-Polished Stainless Steel',
      dialColor: 'Sunray Rhodium Silver with Applied Baton Indices',
      movement: 'Calibre AV-088 Ultra-Thin Precision Mechanical',
      powerReserve: '46 Hours',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Flat Low-Profile Scratch-Resistant Sapphire Crystal',
      strapMaterial: 'Integrated Brushed Multi-Link Stainless Steel Bracelet',
      lugWidth: '20 mm'
    },
    colorOptions: [
      {
        id: 'cushion-silver-opt',
        name: 'Monochromatic Stainless Steel',
        shortName: 'Cushion Steel',
        colorHex: '#D8D8D8',
        accentHex: '#EBEBEB',
        price: 3650,
        size: '39mm',
        tag: 'Stainless Steel',
        badge: 'ULTRA-SLIM STEEL',
        image: '/images/arven-cushion-silver.jpg',
        specs: {
          caseDiameter: '39 mm',
          caseThickness: '7.8 mm Ultra-Thin',
          movement: 'Calibre AV-088 Ultra-Thin Precision Mechanical',
          glass: 'Flat Low-Profile Scratch Sapphire',
          waterResistance: '50 Metres (5 ATM)',
          strapMaterial: 'Integrated Brushed Multi-Link Steel Bracelet'
        }
      }
    ]
  },
  {
    id: 'arven-square-noir',
    name: 'ARVÉN CARRÉ NOIR STEALTH',
    subtitle: 'DLC Stealth 40mm • Matte DLC & Gilt Gold',
    tagline: 'Bold avant-garde geometry in deep satin black DLC coating.',
    tag: 'DLC Stealth',
    size: '40mm',
    price: 4300,
    badge: 'STEALTH NOIR DLC',
    isBestseller: true,
    category: 'minimalist',
    image: '/images/arven-square-noir.jpg',
    description: 'An avant-garde square case draped in diamond-like carbon (DLC), showcasing a matte noir dial with warm gold crosshairs and a separate petite seconde subdial.',
    specs: {
      caseDiameter: '40 mm x 40 mm',
      caseThickness: '10.2 mm',
      caseMaterial: 'Matte Diamond-Like Carbon (DLC) Coated 316L Steel',
      dialColor: 'Deep Velvet Matte Noir with Gilt Gold Accents',
      movement: 'Calibre AV-210 Petite Seconde Mechanical (28,800 vph)',
      powerReserve: '52 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Faceted Beveled Box Sapphire Crystal with Anti-Reflective',
      strapMaterial: 'Matching Matte DLC Black PVD Link Bracelet',
      lugWidth: '22 mm'
    },
    colorOptions: [
      {
        id: 'square-noir-opt',
        name: 'Matte DLC Stealth & Gilt Gold',
        shortName: 'Carré Noir',
        colorHex: '#181716',
        accentHex: '#D4AF37',
        price: 4300,
        size: '40mm',
        tag: 'DLC Stealth',
        badge: 'STEALTH NOIR DLC',
        image: '/images/arven-square-noir.jpg',
        specs: {
          caseDiameter: '40 mm x 40 mm',
          caseThickness: '10.2 mm',
          movement: 'Calibre AV-210 Petite Seconde Mechanical',
          glass: 'Faceted Beveled Sapphire Crystal',
          waterResistance: '100 Metres (10 ATM)',
          strapMaterial: 'Matching Matte DLC Black PVD Link Bracelet'
        }
      }
    ]
  },
  {
    id: 'arven-royal-tourbillon',
    name: 'ARVÉN ROYAL TOURBILLON',
    subtitle: 'Grand Complication 42mm • 18k Rose Gold Skeleton',
    tagline: 'The pinnacle of high-complication Swiss horology with exposed flying tourbillon.',
    tag: 'Rose Gold Tourbillon',
    size: '42mm',
    price: 6850,
    badge: 'GRAND COMPLICATION',
    isBestseller: true,
    category: 'automatic',
    image: '/images/arven-royal-tourbillon.jpg',
    description: 'An extraordinary haute horlogerie tourbillon masterpiece showcasing hand-beveled rose gold bridges, fully skeletonized openwork mechanical movement, and an exposed flying tourbillon cage at 6 o’clock.',
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
    colorOptions: [
      {
        id: 'tourbillon-rose-gold',
        name: '18k Rose Gold & Espresso Alligator',
        shortName: 'Rose Gold Tourbillon',
        colorHex: '#C98B75',
        accentHex: '#3A271D',
        price: 6850,
        size: '42mm',
        tag: 'Rose Gold',
        badge: 'GRAND COMPLICATION',
        image: '/images/arven-royal-tourbillon.jpg',
        specs: {
          caseDiameter: '42 mm',
          caseThickness: '11.2 mm',
          movement: 'Calibre AV-700 Flying Tourbillon (72h Power Reserve)',
          glass: 'Double-Domed Box Sapphire Crystal',
          waterResistance: '50 Metres (5 ATM)',
          strapMaterial: 'Espresso Brown Alligator-Embossed Leather'
        }
      }
    ]
  }
];

const JOURNAL_ARTICLES = [
  {
    id: 'art-of-watchmaking',
    title: 'The Art of Swiss Watchmaking: Precision in Every Second',
    category: 'HOROLOGY',
    readTime: '5 MIN READ',
    date: 'FEBRUARY 2026',
    author: 'Henri Laurent, Master Horologist',
    image: '/images/arven-hero-wrist.png',
    watchId: 'arven-hero-wrist-watch',
    excerpt: 'Inside our Le Locle manufacture, where micro-mechanics transcend engineering to become pure kinetic sculpture.',
    quote: 'A mechanical timepiece does not merely count seconds; it captures the human pulse of patience, metallurgy, and perfection.',
    content: [
      'In a world dominated by digital speed, mechanical watchmaking remains a sacred sanctuary of deliberateness. Each ARVÉN calibre begins not on a silicon wafer, but with high-precision metallurgy, micro-milling, and the ancient art of hand-finishing.',
      'From the delicate glucydur balance wheel oscillating at 28,800 vibrations per hour to the mirror-polished anglage on every bridge, our watchmakers devote up to 140 hours to each individual movement. Tolerances are measured in microns—one tenth the thickness of a human hair.',
      'When you hold an ARVÉN, you hold the synthesis of three centuries of Swiss horological heritage, refined for the modern connoisseur.'
    ]
  },
  {
    id: 'two-tone-renaissance',
    title: 'The Two-Tone Renaissance: Gold Coin-Edges & Ceramic Engineering',
    category: 'DESIGN',
    readTime: '6 MIN READ',
    date: 'FEBRUARY 2026',
    author: 'Elena Vance, Head of Aesthetic Direction',
    image: '/images/arven-exact-watch.png',
    watchId: 'arven-diver-twotone',
    excerpt: 'How dual-metallurgy cases bridge aquatic 300M performance with black-tie salon elegance.',
    quote: 'True luxury whisperers through proportion, the weight of gold against skin, and the quiet satisfaction of a perfect coin-edge bezel.',
    content: [
      'The two-tone watch is experiencing a glorious renaissance. Combining the utilitarian resilience of 316L brushed surgical steel with the warm radiance of 18k solid yellow gold creates a dialogue between tool-watch ruggedness and haute horlogerie splendour.',
      'In the ARVÉN Diver Two-Tone, our engineers incorporated a unidirectional 120-click ceramic bezel insert with laser-engraved gold graduations that will never fade or oxidize.',
      'Paired with an integrated Jubilee bracelet, this timepiece transitions effortlessly from offshore maritime depths to private evening galas.'
    ]
  },
  {
    id: 'inside-automatic-chronograph',
    title: 'The Anatomy of Column-Wheel Chronographs: Tactile Mechanics',
    category: 'MECHANICS',
    readTime: '7 MIN READ',
    date: 'JANUARY 2026',
    author: 'Marc Dubois, Technical Director',
    image: '/images/arven-twotone-chrono.jpg',
    watchId: 'arven-chrono',
    excerpt: 'Understanding the self-winding oscillating rotor, the column-wheel actuation, and the perpetual heartbeat on your wrist.',
    quote: 'The wearer provides the energy, the watch provides the cadence. A symbiotic relationship that never requires a battery.',
    content: [
      'An automatic chronograph is the pinnacle of mechanical micro-engineering. Unlike generic cam-actuated systems, a column-wheel chronograph delivers a silky-smooth, crisp tactile feedback when engaging the start/stop pusher.',
      'Our Calibre AV-202 bicompax architecture features 28 synthetic ruby jewels that reduce friction virtually to zero at high-wear pivots, delivering a robust 48-hour power reserve.',
      'Through the sapphire exhibition caseback, one can witness the intricate kinetic ballet of the balance spring beating 4 times every second with unwavering precision.'
    ]
  },
  {
    id: 'royal-sunray-blue',
    title: 'Royal Sunray Blue Dials: Galactic Guilloché & Light Refraction',
    category: 'HOROLOGY',
    readTime: '4 MIN READ',
    date: 'JANUARY 2026',
    author: 'Céleste Monnier, Master Enameller',
    image: '/images/arven-royal-blue.jpg',
    watchId: 'arven-haute-collection',
    excerpt: 'How galvanic lacquering and concentric sunburst brushing create a dynamic dial that shifts with every ray of light.',
    quote: 'A dial is the face of a watch, but its colour is its soul. Blue is the color of infinite depths and Swiss alpine skies.',
    content: [
      'Creating the deep royal blue dial of the ARVÉN Haute Masterpiece requires over twelve individual galvanic baths and precise circular brushing to achieve a true sunburst effect.',
      'As natural light sweeps across the dial, it scatters into a thousand radiant filaments, alternating between deep midnight navy and luminous cobalt.',
      'Applied gold faceted hour markers with hand-filled Super-LumiNova ensure optimal legibility in any lighting condition.'
    ]
  },
  {
    id: 'art-deco-revival',
    title: 'Art Déco Tonneau & Cushion Cases: 1920s Elegance Reimagined',
    category: 'GUIDES',
    readTime: '6 MIN READ',
    date: 'DECEMBER 2025',
    author: 'Dr. Julian Thorne, Horological Historian',
    image: '/images/arven-tonneau-deco.jpg',
    watchId: 'arven-heritage',
    excerpt: 'The revival of shaped cases—why square, tonneau, and cushion silhouettes define the connoisseur’s collection.',
    quote: 'Round watches tell the time; shaped watches tell a story of architectural courage and vintage glamour.',
    content: [
      'During the Roaring Twenties, avant-garde horologists broke free from the traditional pocket-watch circular mould, inventing the tonneau (barrel) and cushion silhouettes that redefined wrist luxury.',
      'In the ARVÉN Grand Heritage and Cushion Ultra-Slim, we honored this golden era with curved ergonomic casebacks that hug the wrist seamlessly and domed anti-reflective sapphire crystals.',
      'For collectors seeking distinction beyond ubiquitous circular watches, the tonneau profile represents the ultimate connoisseur statement.'
    ]
  },
  {
    id: 'stealth-dlc-horology',
    title: 'Stealth in Haute Horlogerie: Diamond-Like Carbon (DLC) Metallurgy',
    category: 'DESIGN',
    readTime: '5 MIN READ',
    date: 'NOVEMBER 2025',
    author: 'Elena Vance, Head of Aesthetic Direction',
    image: '/images/arven-noir-highres.jpg',
    watchId: 'arven-noir',
    excerpt: 'How aerospace-grade DLC coatings transform traditional steel into matte black light-absorbing masterpieces.',
    quote: 'True power needs no spotlight; it commands attention in the deepest shadows.',
    content: [
      'Diamond-Like Carbon (DLC) is not merely a coating; it is a molecular bonding process derived from aerospace engineering that imparts diamond-like hardness (over 3,000 Vickers) to surgical steel.',
      'The ARVÉN Noir Edition and Carré Noir Stealth feature a velvety matte DLC finish that absorbs reflections while resisting scuffs and scratches.',
      'Accented by warm champagne gold hands and a discreet running small seconds sub-dial, it represents modern minimalist luxury at its purest.'
    ]
  }
];

const TESTIMONIALS = [
  {
    quote: 'The ARVÉN Classic is without question the most balanced timepiece in my collection. The champagne dial has a depth in direct sunlight that photographs simply cannot capture. Exceptional Swiss craftsmanship.',
    author: 'Julian Sterling',
    location: 'Geneva, Switzerland',
    watchModel: 'ARVÉN CLASSIC (Gold & Cognac)'
  },
  {
    quote: 'From the tactile click of the chronograph pushers to the softness of the Italian leather strap, everything about ARVÉN exudes understated mastery. It feels like an heirloom on day one.',
    author: 'Alexander Laurent',
    location: 'London, Mayfair',
    watchModel: 'ARVÉN CHRONO (Bicompax 41mm)'
  },
  {
    quote: 'I purchased the Heritage edition for my 40th birthday. The proportions are absolute perfection on the wrist, and the customer concierge service was world-class from order to doorstep.',
    author: 'Dr. Marcus Thorne',
    location: 'New York, Manhattan',
    watchModel: 'ARVÉN HERITAGE (Vintage Edition)'
  }
];

/* ========================================================
   GLOBAL STATE & TOAST SYSTEM
   ======================================================== */

let cart = JSON.parse(localStorage.getItem('arven_cart') || '[]');
let promoDiscount = 0;
let promoCode = '';

function saveCart() {
  localStorage.setItem('arven_cart', JSON.stringify(cart));
  updateCartUI();
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.style.cssText = `
    background: #FFFFFF;
    border: 1px solid var(--border-gold);
    border-radius: var(--radius-md);
    padding: 14px 20px;
    box-shadow: var(--shadow-xl);
    display: flex;
    align-items: center;
    gap: 12px;
    min-width: 320px;
    max-width: 420px;
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    pointer-events: auto;
  `;

  const iconColor = type === 'success' ? '#B08A45' : type === 'error' ? '#C2410C' : '#4A3325';
  toast.innerHTML = `
    <div style="width: 8px; height: 8px; border-radius: 50%; background: ${iconColor}; flex-shrink: 0;"></div>
    <span style="font-size: 0.85rem; color: var(--text-primary); flex: 1; font-weight: 500;">${message}</span>
    <button style="color: var(--text-muted); cursor: pointer; padding: 4px;" onclick="this.parentElement.remove()">✕</button>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) toast.remove();
  }, 4500);
}

/* ========================================================
   THREE.JS 3D PROCEDURAL WATCH ENGINE (TWO-TONE GOLD & BLACK DIVER)
   ======================================================== */

function createDiveBezelTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Transparent clear background
  ctx.clearRect(0, 0, 1024, 1024);

  ctx.save();
  ctx.translate(512, 512);

  // Draw Deep Glossy Black Ceramic Ring Band (r = 385px to 500px)
  ctx.beginPath();
  ctx.arc(0, 0, 500, 0, Math.PI * 2);
  ctx.arc(0, 0, 385, 0, Math.PI * 2, true);
  ctx.fillStyle = '#11100F';
  ctx.fill();

  // Outer gold border line
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 12;
  ctx.beginPath();
  ctx.arc(0, 0, 492, 0, Math.PI * 2);
  ctx.stroke();

  // Inner gold border line
  ctx.lineWidth = 8;
  ctx.beginPath();
  ctx.arc(0, 0, 392, 0, Math.PI * 2);
  ctx.stroke();

  // Diamond Pip at 12 o'clock (0 deg / top)
  ctx.fillStyle = '#FFFFFF';
  ctx.beginPath();
  ctx.moveTo(0, -470);
  ctx.lineTo(26, -440);
  ctx.lineTo(0, -410);
  ctx.lineTo(-26, -440);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 6;
  ctx.stroke();

  // Numerals 15, 30, 45 in bold white
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '900 80px "Inter", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  // 15 at 3 o'clock (90 deg)
  ctx.save();
  ctx.rotate(Math.PI / 2);
  ctx.fillText('15', 0, -442);
  ctx.restore();

  // 30 at 6 o'clock (180 deg)
  ctx.save();
  ctx.rotate(Math.PI);
  ctx.fillText('30', 0, -442);
  ctx.restore();

  // 45 at 9 o'clock (270 deg)
  ctx.save();
  ctx.rotate(-Math.PI / 2);
  ctx.fillText('45', 0, -442);
  ctx.restore();

  // Minute Graduations & Hash Marks
  for (let i = 1; i < 60; i++) {
    if (i % 15 === 0) continue;
    const angle = (i * Math.PI) / 30;
    ctx.save();
    ctx.rotate(angle);
    ctx.strokeStyle = '#FFFFFF';
    ctx.beginPath();
    if (i <= 15 || i % 5 === 0) {
      ctx.lineWidth = (i % 5 === 0) ? 10 : 6;
      ctx.moveTo(0, -482);
      ctx.lineTo(0, (i % 5 === 0) ? -430 : -448);
    } else {
      ctx.lineWidth = 4;
      ctx.moveTo(0, -482);
      ctx.lineTo(0, -455);
    }
    ctx.stroke();
    ctx.restore();
  }

  ctx.restore();
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createTwoToneDialTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Deep Glossy Black Sunburst Dial
  const grad = ctx.createRadialGradient(512, 512, 50, 512, 512, 512);
  grad.addColorStop(0, '#24201D');
  grad.addColorStop(0.55, '#141210');
  grad.addColorStop(1, '#090807');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  ctx.save();
  ctx.translate(512, 512);

  // Outer Golden Minute Track
  ctx.strokeStyle = '#D4AF37';
  ctx.lineWidth = 4;
  for (let i = 0; i < 60; i++) {
    const angle = (i * Math.PI) / 30;
    ctx.save();
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.moveTo(0, -480);
    ctx.lineTo(0, (i % 5 === 0) ? -450 : -465);
    ctx.stroke();
    ctx.restore();
  }

  // Gold ARVÉN Wordmark at 12 o'clock
  ctx.fillStyle = '#D4AF37';
  ctx.font = 'bold 64px "Playfair Display", Georgia, serif';
  ctx.textAlign = 'center';
  ctx.fillText('ARVÉN', 0, -220);

  ctx.font = 'bold 24px "Inter", sans-serif';
  ctx.letterSpacing = '6px';
  ctx.fillStyle = '#E2C98A';
  ctx.fillText('SWISS CALIBRE', 0, -172);

  // Automatic / 300m at 6 o'clock
  ctx.font = 'bold 32px "Inter", sans-serif';
  ctx.fillStyle = '#FFFFFF';
  ctx.fillText('AUTOMATIC', 0, 220);

  ctx.font = '600 22px "Inter", sans-serif';
  ctx.fillStyle = '#D4AF37';
  ctx.fillText('300M / 1000FT', 0, 260);

  ctx.restore();
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createWatch3D(container, options = {}) {
  const {
    autoRotate = true,
    interactive = true
  } = options;

  const width = container.clientWidth || 420;
  const height = container.clientHeight || 460;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 2.0, 5.0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.5;
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // Studio Lighting tailored for Gold & Polished Ceramic Reflection
  const ambientLight = new THREE.AmbientLight(0xFFF6EC, 1.6);
  scene.add(ambientLight);

  const keyLight = new THREE.DirectionalLight(0xFFFFFF, 3.5);
  keyLight.position.set(5, 8, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xFDF1DB, 2.4);
  fillLight.position.set(-6, 4, 4);
  scene.add(fillLight);

  const goldHighlightLight = new THREE.DirectionalLight(0xFFD700, 2.8);
  goldHighlightLight.position.set(0, 7, -3);
  scene.add(goldHighlightLight);

  const rimLight = new THREE.DirectionalLight(0xE2C98A, 2.6);
  rimLight.position.set(0, -4, -4.5);
  scene.add(rimLight);

  // Root Floating Rig
  const floatingRoot = new THREE.Group();
  scene.add(floatingRoot);

  const watchGroup = new THREE.Group();
  watchGroup.rotation.set(0.35, -0.35, 0.08);
  floatingRoot.add(watchGroup);

  // ==========================================
  // MATERIALS
  // ==========================================
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#D4AF37'),
    metalness: 0.98,
    roughness: 0.12,
    envMapIntensity: 1.6
  });

  const gunmetalSteelMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22201E'),
    metalness: 0.92,
    roughness: 0.20
  });

  const dialTexture = createTwoToneDialTexture();
  const dialMaterial = new THREE.MeshStandardMaterial({
    map: dialTexture,
    metalness: 0.25,
    roughness: 0.3
  });

  const bezelTexture = createDiveBezelTexture();
  const bezelInsertMaterial = new THREE.MeshStandardMaterial({
    map: bezelTexture,
    metalness: 0.6,
    roughness: 0.12,
    transparent: true,
    side: THREE.DoubleSide
  });

  const luminousMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color('#FFFFFF'),
    emissive: new THREE.Color('#FFFFF0'),
    emissiveIntensity: 0.45,
    roughness: 0.08
  });

  const sapphireMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#FFFFFF'),
    transparent: true,
    opacity: 0.24,
    roughness: 0.02,
    metalness: 0.05,
    transmission: 0.96,
    clearcoat: 1.0,
    clearcoatRoughness: 0.03,
    reflectivity: 0.95
  });

  // ==========================================
  // 1. CASE BODY & CROWN GUARDS
  // ==========================================
  const caseMesh = new THREE.Mesh(new THREE.CylinderGeometry(1.64, 1.60, 0.40, 64), gunmetalSteelMaterial);
  watchGroup.add(caseMesh);

  // Crown Guards at 3 o'clock
  const guardMesh = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.26, 0.70), gunmetalSteelMaterial);
  guardMesh.position.set(1.60, 0.02, 0);
  watchGroup.add(guardMesh);

  // Fluted 18k Gold Screw-down Crown
  const crownMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.28, 32), goldMaterial);
  crownMesh.rotation.z = Math.PI / 2;
  crownMesh.position.set(1.80, 0.02, 0);
  watchGroup.add(crownMesh);

  // Chrono Pushers at 2 and 4 o'clock
  const pusherTop = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.24, 24), gunmetalSteelMaterial);
  pusherTop.rotation.z = Math.PI / 2;
  pusherTop.position.set(1.70, 0.08, -0.76);
  watchGroup.add(pusherTop);

  const pusherBot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.24, 24), gunmetalSteelMaterial);
  pusherBot.rotation.z = Math.PI / 2;
  pusherBot.position.set(1.70, 0.08, 0.76);
  watchGroup.add(pusherBot);

  // ==========================================
  // 2. BEZEL (COIN-EDGE GOLD + BLACK CERAMIC NUMBERED RING INSERT)
  // ==========================================
  // Outer Coin-Edge 18k Gold Fluted Ring
  const outerGoldBezel = new THREE.Mesh(new THREE.CylinderGeometry(1.70, 1.64, 0.14, 72), goldMaterial);
  outerGoldBezel.position.y = 0.20;
  watchGroup.add(outerGoldBezel);

  // Inner Black Ceramic Diver Insert Ring (Open washer ring)
  const bezelInsert = new THREE.Mesh(new THREE.RingGeometry(1.24, 1.64, 64), bezelInsertMaterial);
  bezelInsert.rotation.x = -Math.PI / 2;
  bezelInsert.position.y = 0.272;
  watchGroup.add(bezelInsert);

  // ==========================================
  // 3. DIAL FACE & 3D LUMINOUS GOLD MARKERS
  // ==========================================
  const dialGroup = new THREE.Group();
  dialGroup.position.y = 0.22;
  dialGroup.rotation.x = -Math.PI / 2;

  const dialBase = new THREE.Mesh(new THREE.CircleGeometry(1.24, 64), dialMaterial);
  dialGroup.add(dialBase);

  // Applied Gold Dot Luminous Pip Markers (at 1, 2, 4, 5, 7, 8, 10, 11 o'clock)
  for (let i = 0; i < 12; i++) {
    const angle = (i * Math.PI) / 6;
    const r = 1.04;

    if (i === 0 || i === 3 || i === 6 || i === 9) {
      // Double Gold Batons at 12, 3, 6, 9
      const baton1 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.03), goldMaterial);
      baton1.position.set(Math.sin(angle) * r - 0.03, Math.cos(angle) * r, 0.02);
      baton1.rotation.z = -angle;
      dialGroup.add(baton1);

      const baton2 = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.18, 0.03), goldMaterial);
      baton2.position.set(Math.sin(angle) * r + 0.03, Math.cos(angle) * r, 0.02);
      baton2.rotation.z = -angle;
      dialGroup.add(baton2);
    } else {
      // Circular Gold Rim + Luminous Center Dot Pip
      const outerRim = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.025, 24), goldMaterial);
      outerRim.rotation.x = Math.PI / 2;
      outerRim.position.set(Math.sin(angle) * r, Math.cos(angle) * r, 0.02);
      dialGroup.add(outerRim);

      const lumCenter = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.048, 0.03, 24), luminousMaterial);
      lumCenter.rotation.x = Math.PI / 2;
      lumCenter.position.set(Math.sin(angle) * r, Math.cos(angle) * r, 0.025);
      dialGroup.add(lumCenter);
    }
  }

  // ==========================================
  // 4. GOLD SWORD HANDS & SWEEPING SECONDS
  // ==========================================
  // Gold Hour Hand
  const hourHand = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.64, 0.03), goldMaterial);
  hourHand.position.set(0, 0.32, 0.04);
  const hourLum = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.48, 0.035), luminousMaterial);
  hourLum.position.set(0, 0.32, 0.042);
  const hourGroup = new THREE.Group();
  hourGroup.rotation.z = -Math.PI / 3.2;
  hourGroup.add(hourHand);
  hourGroup.add(hourLum);
  dialGroup.add(hourGroup);

  // Gold Minute Hand
  const minHand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.98, 0.03), goldMaterial);
  minHand.position.set(0, 0.49, 0.06);
  const minLum = new THREE.Mesh(new THREE.BoxGeometry(0.04, 0.80, 0.035), luminousMaterial);
  minLum.position.set(0, 0.49, 0.062);
  const minGroup = new THREE.Group();
  minGroup.rotation.z = Math.PI / 5.5;
  minGroup.add(minHand);
  minGroup.add(minLum);
  dialGroup.add(minGroup);

  // Gold Sweeping Seconds Hand with Circular Counterweight
  const secHand = new THREE.Mesh(new THREE.BoxGeometry(0.02, 1.15, 0.02), goldMaterial);
  secHand.position.set(0, 0.48, 0.08);
  const secPip = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.025, 16), luminousMaterial);
  secPip.rotation.x = Math.PI / 2;
  secPip.position.set(0, 0.70, 0.082);

  const secGroup = new THREE.Group();
  secGroup.add(secHand);
  secGroup.add(secPip);
  dialGroup.add(secGroup);

  // Gold Center Cap
  const centerCap = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.09, 24), goldMaterial);
  centerCap.rotation.x = Math.PI / 2;
  centerCap.position.set(0, 0, 0.09);
  dialGroup.add(centerCap);

  watchGroup.add(dialGroup);

  // ==========================================
  // 5. DOUBLE-DOMED SAPPHIRE CRYSTAL
  // ==========================================
  const glass = new THREE.Mesh(new THREE.CylinderGeometry(1.58, 1.58, 0.12, 64), sapphireMat);
  glass.position.y = 0.30;
  watchGroup.add(glass);

  // ==========================================
  // 6. TWO-TONE CERAMIC & GOLD MULTI-LINK BRACELET
  // ==========================================
  function createTwoToneBraceletRow(isTop) {
    const braceletGroup = new THREE.Group();
    const count = 5;

    for (let i = 0; i < count; i++) {
      const zOffset = (isTop ? 1 : -1) * (1.8 + i * 0.42);
      const yOffset = -0.05 - Math.pow(i * 0.14, 2);
      const rotX = (isTop ? -1 : 1) * (0.08 + i * 0.07);

      const linkRow = new THREE.Group();
      linkRow.position.set(0, yOffset, zOffset);
      linkRow.rotation.x = rotX;

      // Outer Gunmetal/Black Links (Left & Right)
      const outerLeft = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.15, 0.38), gunmetalSteelMaterial);
      outerLeft.position.x = -0.54;
      linkRow.add(outerLeft);

      const outerRight = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.15, 0.38), gunmetalSteelMaterial);
      outerRight.position.x = 0.54;
      linkRow.add(outerRight);

      // Center High-Polish Gold Dual Stripe Links
      const goldCenter1 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.17, 0.38), goldMaterial);
      goldCenter1.position.x = -0.16;
      linkRow.add(goldCenter1);

      const goldCenter2 = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.17, 0.38), goldMaterial);
      goldCenter2.position.x = 0.16;
      linkRow.add(goldCenter2);

      // Center Divider Link
      const centerDivider = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.38), gunmetalSteelMaterial);
      centerDivider.position.x = 0;
      linkRow.add(centerDivider);

      braceletGroup.add(linkRow);
    }
    return braceletGroup;
  }

  watchGroup.add(createTwoToneBraceletRow(true));
  watchGroup.add(createTwoToneBraceletRow(false));

  // ==========================================
  // 7. ORBIT CONTROLS & KINETIC "3D EMOTIONS"
  // ==========================================
  let controls = null;
  if (interactive) {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.autoRotate = autoRotate;
    controls.autoRotateSpeed = 0.75;
    controls.minDistance = 2.4;
    controls.maxDistance = 7.5;
  }

  let animId;
  const clock = new THREE.Clock();

  function animate() {
    animId = requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Smooth Kinetic Floating / Breathing ("3D emotions")
    floatingRoot.position.y = Math.sin(elapsedTime * 1.5) * 0.08;
    floatingRoot.rotation.x = Math.sin(elapsedTime * 0.85) * 0.04;
    floatingRoot.rotation.z = Math.cos(elapsedTime * 0.65) * 0.03;

    // Sweeping Seconds Hand
    secGroup.rotation.z -= delta * 1.25;

    if (controls) controls.update();
    renderer.render(scene, camera);
  }
  animate();

  return {
    updateMaterials({ newCaseColor, newStrapColor, newDialColor }) {
      if (newCaseColor) {
        goldMaterial.color.set(newCaseColor);
      }
      if (newStrapColor) {
        gunmetalSteelMaterial.color.set(newStrapColor);
      }
    }
  };
}

/* ========================================================
   APPLICATION INITIALIZATION & INTERACTIVITY
   ======================================================== */

window.addEventListener('DOMContentLoaded', async () => {
  // Load live cloud products from Supabase (or fallback)
  try {
    const cloudProducts = await fetchProducts();
    if (cloudProducts && cloudProducts.length > 0) {
      PRODUCTS = cloudProducts;
    }
  } catch (e) {
    console.warn('Using default product catalog', e);
  }

  initNavbar();
  initHeroSection();
  initSpecialAdditions();
  initBrandsAccordion();
  initBespokeCustomizer();
  initJournal();
  initTestimonials();
  initNewsletter();
  initSearch();
  initCart();
  initQuickView();
  initArticleModal();
  initCheckout();
  initContactForm();
  initOrderTracking();

  // Secret Director Admin Shortcut (Ctrl + Shift + A)
  window.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      window.open('/admin.html', '_blank');
    }
  });
});

/* 1. Navbar */
function initNavbar() {
  const navbar = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('glass-nav');
      navbar.style.padding = '14px 0';
    } else {
      navbar.classList.remove('glass-nav');
      navbar.style.padding = '24px 0';
    }
  }, { passive: true });

  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = mobileDrawer.style.display === 'flex';
      mobileDrawer.style.display = isOpen ? 'none' : 'flex';
    });
  }
}

/* 2. Hero Section Switcher & 3D Parallax Rig */
function initHeroSection() {
  const exactView = document.getElementById('hero-exact-watch-view');
  const d3View = document.getElementById('hero-3d-view');
  const toggleBtn = document.getElementById('hero-view-toggle-btn');
  const cardWrapper = document.getElementById('hero-watch-card-wrapper');
  const watchRig = document.getElementById('hero-exact-watch-rig');
  let is3DActive = false;
  let hero3DEngine = null;

  // Interactive 3D Gyro / Mouse Parallax on Flagship Exact Watch Card
  if (cardWrapper && watchRig) {
    cardWrapper.addEventListener('mousemove', (e) => {
      if (is3DActive) return;
      const rect = cardWrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      watchRig.style.transform = `perspective(1000px) rotateY(${x * 24}deg) rotateX(${-y * 24}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    cardWrapper.addEventListener('mouseleave', () => {
      if (is3DActive) return;
      watchRig.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    });
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      is3DActive = !is3DActive;
      if (is3DActive) {
        if (exactView) exactView.style.display = 'none';
        if (d3View) d3View.style.display = 'flex';
        toggleBtn.textContent = 'SWITCH TO FLAGSHIP EXACT PHOTO';
        if (!hero3DEngine) {
          const container = document.getElementById('hero-3d-canvas-container');
          if (container) {
            hero3DEngine = createWatch3D(container, {
              interactive: true,
              autoRotate: true
            });
          }
        }
      } else {
        if (d3View) d3View.style.display = 'none';
        if (exactView) exactView.style.display = 'flex';
        toggleBtn.textContent = 'SWITCH TO 3D PROCEDURAL VIEW';
      }
    });
  }

  // Render top right preview watches in Hero
  const heroTopPreview = document.getElementById('hero-top-preview-watches');
  if (heroTopPreview) {
    heroTopPreview.innerHTML = PRODUCTS.slice(0, 3).map(p => {
      const watchImg = p.colorOptions?.[0]?.image || p.image;
      const isPngCutout = watchImg && watchImg.endsWith('.png') && !watchImg.includes('wrist');
      return `
      <div onclick="window.openQuickView('${p.id}')" style="background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-sm); padding: 12px; display: flex; flex-direction: column; align-items: center; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <div style="width: 70px; height: 90px; display: flex; align-items: center; justify-content: center; overflow: hidden;">
          ${watchImg ? `<img src="${watchImg}" alt="${p.name}" style="max-height: 78px; max-width: 60px; object-fit: ${isPngCutout ? 'contain' : 'cover'};">` : getWatchSVG(p.colorOptions[0].caseColor, p.colorOptions[0].dialColor, p.colorOptions[0].strapColor, p.category === 'chronograph', 60)}
        </div>
        <span style="font-size: 0.72rem; font-weight: 600; color: var(--color-deep-brown); margin-top: 4px; text-align: center;">${p.name.replace('ARVÉN ', '')}</span>
        <span style="font-size: 0.68rem; color: var(--text-muted);">$${p.price.toLocaleString()}</span>
      </div>
    `;
    }).join('');
  }
}

/* 3. Special Additions (Matching Reference Image 3) */
function initSpecialAdditions() {
  const container = document.getElementById('special-additions-grid');
  if (!container) return;

  container.innerHTML = PRODUCTS.map(p => `
    <div class="showcase-tile" onclick="window.openQuickViewModal('${p.id}')" style="cursor: pointer; position: relative;">
      <!-- Top Pill Tag & Size -->
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
        <span class="pill-tag" id="card-tag-${p.id}">
          <span style="width: 6px; height: 6px; border-radius: 50%; background: ${p.colorOptions[0].colorHex || '#B08A45'};"></span>
          ${p.colorOptions[0].tag || p.tag} • ${p.colorOptions[0].size || p.size}
        </span>
        <span style="font-size: 0.72rem; color: var(--color-champagne-gold); font-weight: 700; letter-spacing: 0.08em;">${p.badge}</span>
      </div>

      <!-- Watch Visual -->
      <div style="height: 240px; width: 100%; display: flex; align-items: center; justify-content: center; background: radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%); border-radius: var(--radius-sm); margin: 8px 0; overflow: hidden; position: relative;">
        <img id="card-img-${p.id}" src="${p.colorOptions[0].image || p.image}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: ${(p.colorOptions[0].image || p.image || '').endsWith('.png') && p.id !== 'arven-hero-wrist-watch' ? 'contain' : 'cover'}; object-position: center; transition: transform 0.4s ease, opacity 0.2s ease;" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
      </div>

      <!-- Colors / Editions Swatch Switcher (if product has multiple color options) -->
      ${p.colorOptions.length > 1 ? `
        <div style="display: flex; gap: 8px; justify-content: center; align-items: center; margin: 10px 0 6px 0; background: rgba(0,0,0,0.03); padding: 6px 12px; border-radius: 9999px;" onclick="event.stopPropagation()">
          <span style="font-size: 0.68rem; color: var(--text-muted); font-weight: 600; text-transform: uppercase; margin-right: 4px;">${p.colorOptions.length} Styles:</span>
          ${p.colorOptions.map((opt, oIdx) => `
            <button id="swatch-${p.id}-${oIdx}" class="color-swatch-dot" title="${opt.name}" onclick="window.switchCardVariant('${p.id}', ${oIdx})" style="width: 20px; height: 20px; border-radius: 50%; background: ${opt.colorHex}; border: 2px solid ${oIdx === 0 ? 'var(--color-champagne-gold)' : '#FFFFFF'}; box-shadow: 0 2px 5px rgba(0,0,0,0.25); cursor: pointer; transition: all 0.2s; transform: ${oIdx === 0 ? 'scale(1.2)' : 'scale(1)'};"></button>
          `).join('')}
        </div>
      ` : ''}

      <!-- Name & Price -->
      <div style="border-top: 1px solid var(--border-subtle); padding-top: 14px; margin-top: 6px;">
        <h4 id="card-name-${p.id}" style="font-size: 0.95rem; font-weight: 600; color: var(--color-deep-brown); letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 4px;">
          ${p.name}
        </h4>
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <span id="card-price-${p.id}" style="font-family: var(--font-serif); font-size: 1.15rem; font-weight: 600; color: var(--color-deep-brown);">
            $${(p.colorOptions[0].price || p.price).toLocaleString()}.00
          </span>
          <button class="btn btn-outline" style="padding: 6px 14px; font-size: 0.7rem;" onclick="event.stopPropagation(); window.addToBagDirect('${p.id}')">
            ${p.colorOptions.length > 1 ? 'SELECT OPTIONS' : 'ADD TO BAG'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

window.switchCardVariant = (productId, colorIdx) => {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;
  const opt = p.colorOptions[colorIdx];
  if (!opt) return;

  const imgEl = document.getElementById(`card-img-${productId}`);
  if (imgEl && opt.image) {
    imgEl.style.opacity = '0.3';
    setTimeout(() => {
      imgEl.src = opt.image;
      imgEl.style.objectFit = opt.image.endsWith('.png') && !opt.image.includes('wrist') ? 'contain' : 'cover';
      imgEl.style.opacity = '1';
    }, 150);
  }

  const priceEl = document.getElementById(`card-price-${productId}`);
  if (priceEl) {
    priceEl.textContent = `$${(opt.price || p.price).toLocaleString()}.00`;
  }

  const tagEl = document.getElementById(`card-tag-${productId}`);
  if (tagEl) {
    tagEl.innerHTML = `
      <span style="width: 6px; height: 6px; border-radius: 50%; background: ${opt.colorHex}; display: inline-block;"></span>
      ${opt.tag || p.tag} • ${opt.size || p.size}
    `;
  }

  const nameEl = document.getElementById(`card-name-${productId}`);
  if (nameEl && opt.shortName) {
    nameEl.textContent = `ARVÉN ${opt.shortName.toUpperCase()}`;
  }

  p.colorOptions.forEach((_, idx) => {
    const dot = document.getElementById(`swatch-${productId}-${idx}`);
    if (dot) {
      dot.style.borderColor = idx === colorIdx ? 'var(--color-champagne-gold)' : '#FFFFFF';
      dot.style.transform = idx === colorIdx ? 'scale(1.2)' : 'scale(1)';
    }
  });
};

/* 4. "SHOP OUR BRANDS" / SIGNATURE COLLECTIONS ACCORDION (Matching Reference) */
const COLLECTION_MODELS = [
  { name: 'Haute Horlogerie 4-Editions Series', count: '4 Curated Bespoke Styles', refProduct: PRODUCTS[0] },
  { name: 'Calibre AV-300 Diver Two-Tone', count: '18k Gold Coin-Edge & Ceramic', refProduct: PRODUCTS[1] },
  { name: 'Heritage Slimline Dress Watch', count: 'Calibre AV-101 Slim Date', refProduct: PRODUCTS[2] },
  { name: 'Chronographe Bicompax Royale', count: 'Column-Wheel Mechanical', refProduct: PRODUCTS[3] },
  { name: 'Grand Heritage Vintage 1954', count: 'Curved Wire Lugs Manual Wind', refProduct: PRODUCTS[4] },
  { name: 'Atelier Noir DLC Stealth', count: 'Deep Bronze & Onyx Edition', refProduct: PRODUCTS[5] }
];

function initBrandsAccordion() {
  const list = document.getElementById('brands-accordion-list');
  if (!list) return;

  renderAccordion(0);
}

function renderAccordion(activeIdx) {
  const list = document.getElementById('brands-accordion-list');
  const rightDisplay = document.getElementById('brands-showcase-pair');
  if (!list) return;

  list.innerHTML = COLLECTION_MODELS.map((item, idx) => `
    <div onclick="window.selectAccordion(${idx})" style="padding: 16px 20px; border-radius: var(--radius-sm); border: 1px solid ${activeIdx === idx ? 'var(--color-champagne-gold)' : 'var(--border-subtle)'}; background: ${activeIdx === idx ? '#FFFFFF' : 'transparent'}; cursor: pointer; display: flex; justify-content: space-between; align-items: center; transition: all 0.2s;">
      <div>
        <h4 style="font-size: 1.05rem; color: var(--color-deep-brown); margin-bottom: 2px;">${item.name}</h4>
        <span style="font-size: 0.75rem; color: var(--text-muted);">${item.count}</span>
      </div>
      <span style="font-size: 1.1rem; color: var(--color-champagne-gold);">${activeIdx === idx ? '→' : '+'}</span>
    </div>
  `).join('');

  if (rightDisplay) {
    const selected = COLLECTION_MODELS[activeIdx].refProduct;
    const second = PRODUCTS[(PRODUCTS.indexOf(selected) + 1) % PRODUCTS.length];

    rightDisplay.innerHTML = `
      <div class="showcase-tile" onclick="window.openQuickViewModal('${selected.id}')" style="cursor: pointer;">
        <span class="pill-tag">${selected.tag} • ${selected.size}</span>
        <div style="height: 170px; width: 100%; display: flex; align-items: center; justify-content: center; margin: 10px 0; overflow: hidden; border-radius: var(--radius-sm); background: radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%);">
          ${selected.image ? `<img src="${selected.image}" alt="${selected.name}" style="height: 100%; width: 100%; object-fit: ${selected.image.endsWith('.png') && selected.id !== 'arven-hero-wrist-watch' ? 'contain' : 'cover'}; object-position: center;">` : getWatchSVG(selected.colorOptions[0].caseColor, selected.colorOptions[0].dialColor, selected.colorOptions[0].strapColor, selected.category === 'chronograph', 130)}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid var(--border-subtle); padding-top: 10px;">
          <span style="font-size: 0.85rem; font-weight: 600;">${selected.name}</span>
          <span style="font-family: var(--font-serif); font-weight: 600;">$${selected.price.toLocaleString()}</span>
        </div>
      </div>
      <div class="showcase-tile" onclick="window.openQuickViewModal('${second.id}')" style="cursor: pointer;">
        <span class="pill-tag">${second.tag} • ${second.size}</span>
        <div style="height: 170px; width: 100%; display: flex; align-items: center; justify-content: center; margin: 10px 0; overflow: hidden; border-radius: var(--radius-sm); background: radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%);">
          ${second.image ? `<img src="${second.image}" alt="${second.name}" style="height: 100%; width: 100%; object-fit: ${second.image.endsWith('.png') && second.id !== 'arven-hero-wrist-watch' ? 'contain' : 'cover'}; object-position: center;">` : getWatchSVG(second.colorOptions[0].caseColor, second.colorOptions[0].dialColor, second.colorOptions[0].strapColor, second.category === 'chronograph', 130)}
        </div>
        <div style="display: flex; justify-content: space-between; align-items: baseline; border-top: 1px solid var(--border-subtle); padding-top: 10px;">
          <span style="font-size: 0.85rem; font-weight: 600;">${second.name}</span>
          <span style="font-family: var(--font-serif); font-weight: 600;">$${second.price.toLocaleString()}</span>
        </div>
      </div>
    `;
  }
}

window.selectAccordion = (idx) => {
  renderAccordion(idx);
};

/* 5. Bespoke 3D Studio */
let bespokeWatchEngine = null;
let bespokeConfig = {
  caseColor: '#D4AF37',
  caseName: 'Two-Tone 18k Gold & Black Ceramic',
  strapColor: '#22201E',
  strapName: 'Two-Tone Multi-Link Ceramic & Gold',
  strapType: 'mesh',
  dialColor: '#121110',
  dialName: 'Onyx Noir Sunray',
  basePrice: 4450,
  caseMod: 0,
  strapMod: 0,
  dialMod: 0,
  engraving: ''
};

function initBespokeCustomizer() {
  const container = document.getElementById('bespoke-watch-container');
  const visualCard = document.getElementById('bespoke-visual-card');
  const exactRig = document.getElementById('bespoke-exact-rig');

  // Interactive 3D Gyro / Mouse Parallax on Bespoke Card
  if (visualCard && exactRig) {
    visualCard.addEventListener('mousemove', (e) => {
      const rect = visualCard.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      exactRig.style.transform = `perspective(1000px) rotateY(${x * 24}deg) rotateX(${-y * 24}deg) scale3d(1.05, 1.05, 1.05)`;
    });

    visualCard.addEventListener('mouseleave', () => {
      exactRig.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)';
    });
  }

  if (container) {
    bespokeWatchEngine = createWatch3D(container, {
      caseColor: bespokeConfig.caseColor,
      strapColor: bespokeConfig.strapColor,
      dialColor: bespokeConfig.dialColor,
      interactive: true,
      autoRotate: true
    });
  }

  document.querySelectorAll('.bespoke-case-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bespoke-case-btn').forEach(b => b.classList.remove('active-option'));
      btn.classList.add('active-option');
      bespokeConfig.caseColor = btn.dataset.color;
      bespokeConfig.caseName = btn.dataset.name;
      bespokeConfig.caseMod = parseInt(btn.dataset.priceMod, 10) || 0;
      updateBespoke();
    });
  });

  document.querySelectorAll('.bespoke-strap-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bespoke-strap-btn').forEach(b => b.classList.remove('active-option'));
      btn.classList.add('active-option');
      bespokeConfig.strapColor = btn.dataset.color;
      bespokeConfig.strapName = btn.dataset.name;
      bespokeConfig.strapType = btn.dataset.type || 'leather';
      bespokeConfig.strapMod = parseInt(btn.dataset.priceMod, 10) || 0;
      updateBespoke();
    });
  });

  document.querySelectorAll('.bespoke-dial-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.bespoke-dial-btn').forEach(b => b.classList.remove('active-option'));
      btn.classList.add('active-option');
      bespokeConfig.dialColor = btn.dataset.color;
      bespokeConfig.dialName = btn.dataset.name;
      bespokeConfig.dialMod = parseInt(btn.dataset.priceMod, 10) || 0;
      updateBespoke();
    });
  });

  document.getElementById('bespoke-engraving-input')?.addEventListener('input', (e) => {
    bespokeConfig.engraving = e.target.value.toUpperCase();
  });

  document.getElementById('bespoke-add-to-bag')?.addEventListener('click', () => {
    const finalPrice = bespokeConfig.basePrice + bespokeConfig.caseMod + bespokeConfig.strapMod + bespokeConfig.dialMod;
    const bespokeItem = {
      id: `bespoke-${Date.now()}`,
      name: 'ARVÉN BESPOKE COMMISSION',
      subtitle: `${bespokeConfig.caseName} • ${bespokeConfig.strapName}`,
      price: finalPrice,
      colorOptions: [{ caseColor: bespokeConfig.caseColor, dialColor: bespokeConfig.dialColor, strapColor: bespokeConfig.strapColor }]
    };

    cart.push({
      product: bespokeItem,
      quantity: 1,
      selectedCase: bespokeConfig.caseName,
      selectedStrap: bespokeConfig.strapName,
      selectedDial: bespokeConfig.dialName,
      customEngraving: bespokeConfig.engraving || undefined
    });

    saveCart();
    showToast(`Bespoke Commission ($${finalPrice.toLocaleString()}) added to your bag.`);
    openCartDrawer();
  });
}

function updateBespoke() {
  if (bespokeWatchEngine) {
    bespokeWatchEngine.updateMaterials({
      newCaseColor: bespokeConfig.caseColor,
      newStrapColor: bespokeConfig.strapColor,
      newDialColor: bespokeConfig.dialColor
    });
  }
  const glow = document.getElementById('bespoke-glow');
  if (glow) {
    glow.style.background = `radial-gradient(circle, ${bespokeConfig.caseColor}44 0%, transparent 70%)`;
  }
  const total = bespokeConfig.basePrice + bespokeConfig.caseMod + bespokeConfig.strapMod + bespokeConfig.dialMod;
  const priceDisplay = document.getElementById('bespoke-total-price');
  if (priceDisplay) priceDisplay.textContent = `$${total.toLocaleString()}`;
  const caseDisplay = document.getElementById('bespoke-selected-case-name');
  if (caseDisplay) caseDisplay.textContent = bespokeConfig.caseName;
}

/* 6. Journal & Blogs */
let activeJournalCategory = 'all';

function initJournal() {
  renderJournalGrid();
}

function renderJournalGrid() {
  const grid = document.getElementById('journal-grid');
  if (!grid) return;

  const filtered = activeJournalCategory === 'all' 
    ? JOURNAL_ARTICLES 
    : JOURNAL_ARTICLES.filter(a => a.category.toUpperCase().includes(activeJournalCategory.toUpperCase()));

  grid.innerHTML = filtered.map((article, idx) => `
    <article class="showcase-tile" onclick="window.openArticleModal('${article.id}')" style="cursor: pointer; padding: 0; overflow: hidden; transition: transform 0.35s ease, box-shadow 0.35s ease; border: 1px solid var(--border-light); background: #FFFFFF;">
      <!-- Top High-Definition Editorial Photograph -->
      <div style="height: 230px; position: relative; overflow: hidden; background: #2C1E17;">
        <img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: ${article.image.endsWith('.png') && !article.image.includes('wrist') ? 'contain' : 'cover'}; transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);" onmouseover="this.style.transform='scale(1.06)'" onmouseout="this.style.transform='scale(1)'">
        <div style="position: absolute; inset: 0; background: linear-gradient(180deg, rgba(44,30,23,0.05) 0%, rgba(44,30,23,0.7) 100%);"></div>
        
        <!-- Top Issue Badge -->
        <div style="position: absolute; top: 14px; left: 14px; display: flex; gap: 8px;">
          <span style="background: rgba(255,255,255,0.92); backdrop-filter: blur(8px); padding: 4px 12px; border-radius: var(--radius-full); font-size: 0.68rem; font-weight: 700; color: var(--color-deep-brown); letter-spacing: 0.12em; text-transform: uppercase; box-shadow: 0 2px 8px rgba(0,0,0,0.15);">
            ESSAY 0${idx + 1}
          </span>
        </div>
        
        <!-- Read Time Pill -->
        <div style="position: absolute; bottom: 12px; right: 14px;">
          <span style="background: rgba(44,30,23,0.85); backdrop-filter: blur(8px); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.68rem; font-weight: 600; color: var(--color-champagne-gold); letter-spacing: 0.08em; text-transform: uppercase;">
            ${article.readTime}
          </span>
        </div>
      </div>

      <!-- Article Content Body -->
      <div style="padding: 26px 24px;">
        <span style="font-size: 0.72rem; font-weight: 700; color: var(--color-champagne-gold); text-transform: uppercase; letter-spacing: 0.14em;">${article.category}</span>
        <h4 style="font-size: 1.22rem; color: var(--color-deep-brown); margin: 8px 0 12px 0; line-height: 1.35; font-family: var(--font-serif); font-weight: 600;">${article.title}</h4>
        <p style="font-size: 0.86rem; color: var(--text-secondary); margin-bottom: 20px; line-height: 1.6;">${article.excerpt}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; border-top: 1px solid var(--border-subtle); padding-top: 14px;">
          <span style="font-weight: 600; color: var(--color-dark-brown); letter-spacing: 0.05em; display: flex; align-items: center; gap: 4px;">READ ESSAY <span style="color: var(--color-champagne-gold);">→</span></span>
          <span style="color: var(--text-muted);">${article.date}</span>
        </div>
      </div>
    </article>
  `).join('');
}

window.filterJournal = (category) => {
  activeJournalCategory = category;
  ['all', 'HOROLOGY', 'DESIGN', 'MECHANICS', 'GUIDES'].forEach(cat => {
    const btn = document.getElementById(`journal-filter-${cat}`);
    if (btn) {
      if (cat === category) {
        btn.className = 'btn btn-primary';
        btn.style.background = '';
      } else {
        btn.className = 'btn btn-outline';
        btn.style.background = '#FFF';
      }
    }
  });
  renderJournalGrid();
};

/* 7. Testimonials */
let currentTestimonial = 0;
function initTestimonials() {
  renderTestimonial();
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length;
    renderTestimonial();
  }, 7000);

  document.getElementById('test-prev')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial === 0 ? TESTIMONIALS.length - 1 : currentTestimonial - 1);
    renderTestimonial();
  });
  document.getElementById('test-next')?.addEventListener('click', () => {
    currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS.length;
    renderTestimonial();
  });
}

function renderTestimonial() {
  const item = TESTIMONIALS[currentTestimonial];
  const quoteEl = document.getElementById('testimonial-quote');
  const authorEl = document.getElementById('testimonial-author');
  const locEl = document.getElementById('testimonial-location');
  const modelEl = document.getElementById('testimonial-model');
  const dots = document.getElementById('testimonial-dots');

  if (quoteEl) quoteEl.textContent = `“${item.quote}”`;
  if (authorEl) authorEl.textContent = item.author;
  if (locEl) locEl.textContent = item.location;
  if (modelEl) modelEl.textContent = `Timepiece: ${item.watchModel}`;

  if (dots) {
    dots.innerHTML = TESTIMONIALS.map((_, i) => `
      <div style="width: ${i === currentTestimonial ? '24px' : '8px'}; height: 8px; border-radius: 4px; background: ${i === currentTestimonial ? 'var(--color-champagne-gold)' : 'var(--border-light)'}; transition: all 0.3s ease;"></div>
    `).join('');
  }
}

/* 8. Newsletter */
function initNewsletter() {
  document.getElementById('newsletter-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('newsletter-email');
    if (input && input.value) {
      await subscribeNewsletter(input.value);
      showToast('Welcome to the ARVÉN Society. Your VIP 10% privilege code is ARVEN10.');
      input.value = '';
    }
  });
}

/* 9. Search */
function initSearch() {
  const searchModal = document.getElementById('search-modal');
  const searchInput = document.getElementById('search-input');
  document.getElementById('nav-search-btn')?.addEventListener('click', () => {
    searchModal.style.display = 'flex';
    searchInput?.focus();
    renderSearchResults('');
  });
  document.getElementById('search-close-btn')?.addEventListener('click', () => {
    searchModal.style.display = 'none';
  });
  searchInput?.addEventListener('input', (e) => {
    renderSearchResults(e.target.value.trim().toLowerCase());
  });
}

function renderSearchResults(query) {
  const resultsContainer = document.getElementById('search-results-list');
  if (!resultsContainer) return;

  const matches = query
    ? PRODUCTS.filter(p => p.name.toLowerCase().includes(query) || p.subtitle.toLowerCase().includes(query))
    : PRODUCTS;

  resultsContainer.innerHTML = matches.map(p => {
    const watchImg = p.colorOptions?.[0]?.image || p.image;
    const isPngCutout = watchImg && watchImg.endsWith('.png') && !watchImg.includes('wrist');

    return `
    <div onclick="document.getElementById('search-modal').style.display='none'; window.openQuickView('${p.id}')" style="display: flex; align-items: center; gap: 16px; padding: 12px 16px; background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-light); cursor: pointer; margin-bottom: 10px; transition: transform 0.2s ease, border-color 0.2s ease;" onmouseover="this.style.transform='translateX(4px)'; this.style.borderColor='var(--color-champagne-gold)'" onmouseout="this.style.transform='translateX(0)'; this.style.borderColor='var(--border-light)'">
      <div style="width: 52px; height: 64px; background: radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; overflow: hidden; flex-shrink: 0;">
        ${watchImg ? `<img src="${watchImg}" alt="${p.name}" style="width: 100%; height: 100%; object-fit: ${isPngCutout ? 'contain' : 'cover'}; object-position: center;">` : getWatchSVG(p.colorOptions?.[0]?.caseColor || '#B08A45', p.colorOptions?.[0]?.dialColor || '#F5EEE5', p.colorOptions?.[0]?.strapColor || '#4A3325', p.category === 'chronograph', 40)}
      </div>
      <div style="flex: 1;">
        <h4 style="font-size: 0.95rem; color: var(--color-deep-brown); margin-bottom: 2px;">${p.name}</h4>
        <p style="font-size: 0.78rem; color: var(--text-secondary);">${p.subtitle}</p>
      </div>
      <span style="font-family: var(--font-serif); font-size: 1rem; font-weight: 600; color: var(--color-deep-brown);">$${(p.colorOptions?.[0]?.price || p.price).toLocaleString()}</span>
    </div>
  `;
  }).join('');
}

/* 10. Shopping Bag */
function initCart() {
  updateCartUI();
  document.getElementById('nav-bag-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCartDrawer);

  document.getElementById('promo-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const code = document.getElementById('promo-input')?.value.trim().toUpperCase();
    if (!code) return;

    const validPromo = await validatePromo(code);
    if (validPromo) {
      promoDiscount = validPromo.discount / 100;
      promoCode = validPromo.code;
      showToast(`VIP Privilege Applied: ${validPromo.discount}% OFF! (${validPromo.code})`);
      updateCartUI();
    } else if (code === 'ARVEN10' || code === 'TIME10') {
      promoDiscount = 0.10;
      promoCode = code;
      showToast('VIP Collector 10% privilege applied!');
      updateCartUI();
    } else {
      showToast('Invalid or expired promotional code.', 'error');
    }
  });

  document.getElementById('proceed-to-checkout-btn')?.addEventListener('click', () => {
    closeCartDrawer();
    openCheckoutModal();
  });
}

function openCartDrawer() {
  document.getElementById('cart-drawer').style.display = 'flex';
}
function closeCartDrawer() {
  document.getElementById('cart-drawer').style.display = 'none';
}

function updateCartUI() {
  const badge = document.getElementById('bag-count-badge');
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }

  const itemsContainer = document.getElementById('cart-items-container');
  const emptyState = document.getElementById('cart-empty-state');
  const footerArea = document.getElementById('cart-footer-area');

  if (!itemsContainer) return;

  if (cart.length === 0) {
    if (emptyState) emptyState.style.display = 'block';
    if (footerArea) footerArea.style.display = 'none';
    itemsContainer.innerHTML = '';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';
  if (footerArea) footerArea.style.display = 'block';

  itemsContainer.innerHTML = cart.map((item, idx) => {
    let itemImg = item.product.image;
    if (!itemImg) {
      const match = PRODUCTS.find(p => p.id === item.product.id || p.name === item.product.name);
      if (match) itemImg = match.image || (match.colorOptions && match.colorOptions[0] && match.colorOptions[0].image);
    }
    const isPngCutout = itemImg && itemImg.endsWith('.png') && !itemImg.includes('wrist');

    return `
    <div style="display: flex; gap: 16px; padding: 16px; background: #FFFFFF; border-radius: var(--radius-md); border: 1px solid var(--border-light); margin-bottom: 14px; position: relative;">
      <div style="width: 76px; height: 92px; background: radial-gradient(circle, #FFFFFF 0%, #F5EEE5 100%); border-radius: var(--radius-sm); display: flex; align-items: center; justify-content: center; flex-shrink: 0; overflow: hidden;">
        ${itemImg ? `<img src="${itemImg}" alt="${item.product.name}" style="width: 100%; height: 100%; object-fit: ${isPngCutout ? 'contain' : 'cover'}; object-position: center;">` : getWatchSVG(item.product.colorOptions?.[0]?.caseColor || '#B08A45', item.product.colorOptions?.[0]?.dialColor || '#F5EEE5', item.product.colorOptions?.[0]?.strapColor || '#4A3325', false, 55)}
      </div>

      <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <div style="display: flex; justify-content: space-between;">
            <h4 style="font-size: 0.95rem; color: var(--color-deep-brown);">${item.product.name}</h4>
            <button onclick="window.removeCartItem(${idx})" style="color: var(--text-muted); cursor: pointer; padding: 2px;">✕</button>
          </div>
          <p style="font-size: 0.75rem; color: var(--text-secondary);">${item.selectedCase} • ${item.selectedStrap}</p>
          ${item.customEngraving ? `<p style="font-size: 0.72rem; color: var(--color-champagne-gold); font-style: italic;">“${item.customEngraving}”</p>` : ''}
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
          <div style="display: flex; align-items: center; border: 1px solid var(--border-light); border-radius: var(--radius-sm); background: var(--bg-cream);">
            <button onclick="window.changeCartQty(${idx}, -1)" style="padding: 4px 8px; cursor: pointer;">-</button>
            <span style="font-size: 0.8rem; font-weight: 600; padding: 0 8px;">${item.quantity}</span>
            <button onclick="window.changeCartQty(${idx}, 1)" style="padding: 4px 8px; cursor: pointer;">+</button>
          </div>
          <span style="font-family: var(--font-serif); font-size: 1.05rem; font-weight: 600; color: var(--color-deep-brown);">$${(item.product.price * item.quantity).toLocaleString()}</span>
        </div>
      </div>
    </div>
  `;
  }).join('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * promoDiscount;
  const total = Math.max(0, subtotal - discount);

  document.getElementById('cart-subtotal-val').textContent = `$${subtotal.toLocaleString()}`;
  document.getElementById('cart-discount-row').style.display = discount > 0 ? 'flex' : 'none';
  document.getElementById('cart-discount-val').textContent = `-$${discount.toLocaleString()}`;
  document.getElementById('cart-total-val').textContent = `$${total.toLocaleString()}`;
}

window.removeCartItem = (idx) => {
  cart.splice(idx, 1);
  saveCart();
};

window.changeCartQty = (idx, delta) => {
  cart[idx].quantity += delta;
  if (cart[idx].quantity <= 0) cart.splice(idx, 1);
  saveCart();
};

window.addToBagDirect = (productId) => {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;
  const opt = p.colorOptions[0];
  cart.push({
    product: {
      id: p.id,
      name: p.name,
      subtitle: opt.name || p.subtitle,
      price: opt.price || p.price,
      image: opt.image || p.image,
      colorOptions: p.colorOptions
    },
    quantity: 1,
    selectedCase: opt.name,
    selectedStrap: (opt.specs && opt.specs.strapMaterial) || 'Handcrafted Strap',
    selectedDial: opt.name
  });
  saveCart();
  showToast(`Added ${p.name} to your shopping bag.`);
  openCartDrawer();
};

/* 11. Quick View Modal */
let activeQuickProduct = null;
let activeQuickColorIdx = 0;

function initQuickView() {
  document.getElementById('quick-view-close-btn')?.addEventListener('click', () => {
    document.getElementById('quick-view-modal').style.display = 'none';
  });

  document.getElementById('quick-view-add-to-bag')?.addEventListener('click', () => {
    if (!activeQuickProduct) return;
    const opt = activeQuickProduct.colorOptions[activeQuickColorIdx] || activeQuickProduct.colorOptions[0];
    cart.push({
      product: {
        id: `${activeQuickProduct.id}-${opt.id || activeQuickColorIdx}`,
        name: opt.shortName ? `ARVÉN ${opt.shortName.toUpperCase()}` : activeQuickProduct.name,
        subtitle: opt.name || activeQuickProduct.subtitle,
        price: opt.price || activeQuickProduct.price,
        image: opt.image || activeQuickProduct.image,
        colorOptions: [{ caseColor: opt.colorHex || '#D4AF37', dialColor: opt.colorHex || '#121110', strapColor: opt.accentHex || '#22201E' }]
      },
      quantity: 1,
      selectedCase: opt.name,
      selectedStrap: (opt.specs && opt.specs.strapMaterial) || 'Handcrafted Strap',
      selectedDial: opt.name
    });
    saveCart();
    showToast(`Added ${opt.name} ($${(opt.price || activeQuickProduct.price).toLocaleString()}) to your bag.`);
    document.getElementById('quick-view-modal').style.display = 'none';
    openCartDrawer();
  });
}

window.openQuickViewModal = (productId) => {
  activeQuickProduct = PRODUCTS.find(p => p.id === productId);
  if (!activeQuickProduct) return;
  activeQuickColorIdx = 0;
  document.getElementById('quick-view-modal').style.display = 'flex';
  renderQuickViewContent();
};

function renderQuickViewContent() {
  const p = activeQuickProduct;
  const opt = p.colorOptions[activeQuickColorIdx] || p.colorOptions[0];

  document.getElementById('quick-view-title').textContent = opt.shortName ? `ARVÉN ${opt.shortName.toUpperCase()}` : p.name;
  document.getElementById('quick-view-subtitle').textContent = opt.name || p.subtitle;
  document.getElementById('quick-view-price').textContent = `$${(opt.price || p.price).toLocaleString()}`;
  document.getElementById('quick-view-desc').textContent = p.description;
  document.getElementById('quick-view-spec-diam').textContent = (opt.specs && opt.specs.caseDiameter) || p.specs.caseDiameter;
  document.getElementById('quick-view-spec-mov').textContent = (opt.specs && opt.specs.movement) || p.specs.movement;
  document.getElementById('quick-view-spec-glass').textContent = (opt.specs && opt.specs.glass) || p.specs.glass;
  document.getElementById('quick-view-spec-water').textContent = (opt.specs && opt.specs.waterResistance) || p.specs.waterResistance;

  const visualContainer = document.getElementById('quick-view-visual');
  if (visualContainer) {
    const displayImg = opt.image || p.image;
    visualContainer.innerHTML = displayImg ? `<img src="${displayImg}" alt="${p.name}" style="width: 100%; height: 100%; max-height: 380px; max-width: 380px; object-fit: contain; filter: drop-shadow(0 20px 32px rgba(0,0,0,0.35)); transition: all 0.35s ease; border-radius: var(--radius-sm);">` : getWatchSVG(opt.colorHex || '#D4AF37', '#121110', '#22201E', false, 220);
  }

  const finishContainer = document.getElementById('quick-view-finishes');
  if (finishContainer) {
    finishContainer.innerHTML = p.colorOptions.map((o, idx) => `
      <button class="btn ${idx === activeQuickColorIdx ? 'btn-primary' : 'btn-outline'}" style="padding: 8px 14px; font-size: 0.76rem; display: flex; align-items: center; gap: 8px; border-radius: var(--radius-sm); border-color: ${idx === activeQuickColorIdx ? 'var(--color-champagne-gold)' : 'var(--border-light)'};" onclick="window.setQuickColorIdx(${idx})">
        <span style="width: 12px; height: 12px; border-radius: 50%; background: ${o.colorHex}; border: 1px solid rgba(255,255,255,0.7); display: inline-block;"></span>
        <span>${o.name} ($${o.price.toLocaleString()})</span>
      </button>
    `).join('');
  }
}

window.setQuickColorIdx = (idx) => {
  activeQuickColorIdx = idx;
  renderQuickViewContent();
};

/* 12. Article Modal */
function initArticleModal() {
  document.getElementById('article-modal-close-btn')?.addEventListener('click', () => {
    document.getElementById('article-modal').style.display = 'none';
  });
}

window.openArticleModal = (articleId) => {
  const article = JOURNAL_ARTICLES.find(a => a.id === articleId);
  if (!article) return;

  const imgContainer = document.getElementById('article-modal-image');
  if (imgContainer) {
    imgContainer.innerHTML = `<img src="${article.image}" alt="${article.title}" style="width: 100%; height: 100%; object-fit: ${article.image.endsWith('.png') && !article.image.includes('wrist') ? 'contain' : 'cover'}; object-position: center; background: #2C1E17;">`;
  }

  document.getElementById('article-modal-category').textContent = article.category;
  document.getElementById('article-modal-time').textContent = article.readTime;
  document.getElementById('article-modal-date').textContent = article.date;
  document.getElementById('article-modal-title').textContent = article.title;
  document.getElementById('article-modal-author').textContent = article.author;
  document.getElementById('article-modal-quote').textContent = `“${article.quote}”`;

  const bodyEl = document.getElementById('article-modal-body');
  if (bodyEl) {
    let html = article.content.map(para => `<p style="font-size: 1rem; line-height: 1.85; color: var(--text-primary); margin-bottom: 18px;">${para}</p>`).join('');
    if (article.watchId) {
      html += `
        <div style="margin-top: 28px; padding: 22px 24px; background: #FFFFFF; border: 1px solid var(--border-gold); border-radius: var(--radius-md); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px; box-shadow: var(--shadow-sm);">
          <div>
            <span style="font-size: 0.7rem; color: var(--color-champagne-gold); font-weight: 700; text-transform: uppercase; letter-spacing: 0.12em; display: block; margin-bottom: 4px;">FEATURED HOROLOGY CALIBRE</span>
            <h4 style="font-size: 1.15rem; color: var(--color-deep-brown);">Discover the Handcrafted Masterpiece</h4>
          </div>
          <button class="btn btn-primary" onclick="document.getElementById('article-modal').style.display='none'; window.openQuickView('${article.watchId}')" style="padding: 12px 22px; font-size: 0.78rem;">
            VIEW TIMEPIECE →
          </button>
        </div>
      `;
    }
    bodyEl.innerHTML = html;
  }

  document.getElementById('article-modal').style.display = 'flex';
};

/* 13. Checkout Modal */
function initCheckout() {
  document.getElementById('checkout-close-btn')?.addEventListener('click', closeCheckoutModal);

  document.getElementById('checkout-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const firstName = document.getElementById('checkout-first-name')?.value || 'Valued';
    const lastName = document.getElementById('checkout-last-name')?.value || 'Collector';
    const email = document.getElementById('checkout-email')?.value || 'client@arven-vip.ch';
    const phone = document.getElementById('checkout-phone')?.value || '';
    const address = document.getElementById('checkout-address')?.value || '';
    const city = document.getElementById('checkout-city')?.value || '';
    const country = document.getElementById('checkout-country')?.value || '';

    const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const discount = subtotal * promoDiscount;
    const total = Math.max(0, subtotal - discount);

    const orderPayload = {
      client_name: `${firstName} ${lastName}`.trim(),
      client_email: email,
      client_phone: phone,
      shipping_address: { address, city, country },
      items: cart.map(i => ({
        id: i.product.id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity,
        selectedCase: i.selectedCase,
        selectedStrap: i.selectedStrap,
        customEngraving: i.customEngraving,
        image: i.product.image
      })),
      subtotal: subtotal,
      discount: discount,
      promo_code: promoCode || null,
      total: total,
      engraving: cart[0]?.customEngraving || '',
      strap_choice: cart[0]?.selectedStrap || '',
      status: 'In Assembly'
    };

    const res = await createOrder(orderPayload);
    const orderNum = res.id || `AV-${Math.floor(100000 + Math.random() * 900000)}`;
    document.getElementById('order-confirmed-num').textContent = orderNum;

    document.getElementById('checkout-form-view').style.display = 'none';
    document.getElementById('checkout-success-view').style.display = 'block';

    confetti({
      particleCount: 90,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#B08A45', '#DFCDBC', '#4A3325', '#F5EEE5']
    });

    cart = [];
    saveCart();
  });

  document.getElementById('checkout-return-btn')?.addEventListener('click', closeCheckoutModal);
}

function openCheckoutModal() {
  const modal = document.getElementById('checkout-modal');
  modal.style.display = 'flex';
  document.getElementById('checkout-form-view').style.display = 'block';
  document.getElementById('checkout-success-view').style.display = 'none';

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = subtotal * promoDiscount;
  const total = Math.max(0, subtotal - discount);

  document.getElementById('checkout-item-count').textContent = `${cart.length} timepiece(s)`;
  document.getElementById('checkout-total-display').textContent = `$${total.toLocaleString()}`;
  document.getElementById('checkout-submit-btn-text').textContent = `AUTHORIZE COMMISSION ($${total.toLocaleString()})`;
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').style.display = 'none';
}

/* ========================================================
   VECTOR SVG WATCH RENDERER
   ======================================================== */

function getWatchSVG(caseColor = '#B08A45', dialColor = '#F5EEE5', strapColor = '#4A3325', hasChrono = false, size = 180) {
  const isNoir = dialColor === '#2C1E17' || dialColor === '#1C1512';
  const markerColor = isNoir ? '#D4AF37' : '#B08A45';
  const textColor = isNoir ? '#FFFFFF' : '#33251D';

  return `
    <svg viewBox="0 0 300 400" width="${size}" height="${size * 1.33}" style="overflow: visible;">
      <defs>
        <linearGradient id="bezel-${caseColor}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#DFC386"/>
          <stop offset="35%" stop-color="${caseColor}"/>
          <stop offset="70%" stop-color="#876527"/>
          <stop offset="100%" stop-color="#DFC386"/>
        </linearGradient>
        <linearGradient id="strap-${strapColor}" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${strapColor}" stop-opacity="0.9"/>
          <stop offset="50%" stop-color="${strapColor}"/>
          <stop offset="100%" stop-color="${strapColor}" stop-opacity="0.8"/>
        </linearGradient>
        <radialGradient id="dial-${dialColor}" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="${isNoir ? '#3A2E28' : '#FFFDF9'}"/>
          <stop offset="75%" stop-color="${dialColor}"/>
          <stop offset="100%" stop-color="${isNoir ? '#1C1410' : '#E8DDD0'}"/>
        </radialGradient>
      </defs>
      <g>
        <path d="M 95,20 L 205,20 L 195,130 L 105,130 Z" fill="url(#strap-${strapColor})"/>
        <line x1="102" y1="25" x2="110" y2="125" stroke="#C9A98B" stroke-width="1.5" stroke-dasharray="3 3"/>
        <line x1="198" y1="25" x2="190" y2="125" stroke="#C9A98B" stroke-width="1.5" stroke-dasharray="3 3"/>
        <path d="M 105,270 L 195,270 L 205,380 L 95,380 Z" fill="url(#strap-${strapColor})"/>
        <line x1="110" y1="275" x2="102" y2="375" stroke="#C9A98B" stroke-width="1.5" stroke-dasharray="3 3"/>
        <line x1="190" y1="275" x2="198" y2="375" stroke="#C9A98B" stroke-width="1.5" stroke-dasharray="3 3"/>

        <circle cx="150" cy="200" r="76" fill="url(#bezel-${caseColor})"/>
        <circle cx="150" cy="200" r="69" fill="url(#bezel-${caseColor})"/>
        <circle cx="150" cy="200" r="64" fill="url(#dial-${dialColor})"/>
        <circle cx="150" cy="200" r="42" fill="none" stroke="${markerColor}" stroke-width="0.5" stroke-dasharray="1 3" opacity="0.6"/>

        <rect x="224" y="193" width="9" height="14" rx="2" fill="url(#bezel-${caseColor})"/>
        ${hasChrono ? `<rect x="220" y="165" width="7" height="10" rx="1.5" fill="url(#bezel-${caseColor})"/><rect x="220" y="225" width="7" height="10" rx="1.5" fill="url(#bezel-${caseColor})"/>` : ''}

        <rect x="147.5" y="142" width="2" height="11" fill="${markerColor}"/>
        <rect x="150.5" y="142" width="2" height="11" fill="${markerColor}"/>
        <rect x="201" y="198.5" width="10" height="3" fill="${markerColor}"/>
        <rect x="148.5" y="247" width="3" height="10" fill="${markerColor}"/>
        <rect x="139" y="198.5" width="10" height="3" fill="${markerColor}"/>

        <text x="150" y="172" text-anchor="middle" fill="${textColor}" font-family="'Playfair Display', Georgia, serif" font-size="7.5" font-weight="bold" letter-spacing="1.8">ARVÉN</text>
        <text x="150" y="179" text-anchor="middle" fill="${markerColor}" font-family="'Inter', sans-serif" font-size="3.2" letter-spacing="0.8">AUTOMATIC</text>

        ${hasChrono ? `
          <circle cx="128" cy="200" r="13" fill="none" stroke="${markerColor}" stroke-width="0.6"/>
          <line x1="128" y1="200" x2="134" y2="196" stroke="${markerColor}" stroke-width="1"/>
          <circle cx="172" cy="200" r="13" fill="none" stroke="${markerColor}" stroke-width="0.6"/>
          <line x1="172" y1="200" x2="167" y2="205" stroke="${markerColor}" stroke-width="1"/>
        ` : ''}

        <polygon points="150,200 147,198 126,178 149,176" fill="${markerColor}"/>
        <polygon points="150,200 148,198 178,154 152,156" fill="${markerColor}"/>
        <circle cx="150" cy="200" r="4.5" fill="${markerColor}"/>
        <line x1="150" y1="214" x2="150" y2="148" stroke="#B08A45" stroke-width="0.8"/>
      </g>
    </svg>
  `;
}

/* 14. Private Concierge & Atelier Contact Form */
function initContactForm() {
  const form = document.getElementById('contact-inquiry-form');
  const successState = document.getElementById('contact-success-state');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-fullname')?.value || 'Valued Connoisseur';
    const email = document.getElementById('contact-email')?.value || '';
    const title = document.getElementById('contact-title')?.value || '';
    const phone = document.getElementById('contact-phone')?.value || 'N/A';
    const inquiryType = document.getElementById('contact-inquiry-type')?.selectedOptions?.[0]?.textContent || 'Bespoke 3D Commission';
    const modelInterest = document.getElementById('contact-model-interest')?.selectedOptions?.[0]?.textContent || 'All Timepieces';
    const message = document.getElementById('contact-message')?.value || '';
    const videoCall = document.getElementById('contact-video-call')?.checked || false;
    const catalog = document.getElementById('contact-catalog')?.checked || false;

    const newInquiry = {
      name: `${title} ${name}`.trim(),
      email: email,
      phone: phone,
      inquiry_type: inquiryType,
      model_interest: modelInterest,
      notes: message,
      video_call: videoCall,
      catalog_requested: catalog,
      status: 'New'
    };

    const res = await createInquiry(newInquiry);
    const refNum = res.id || `ARV-VIP-${Math.floor(1000 + Math.random() * 9000)}`;

    const refEl = document.getElementById('contact-ref-code');
    if (refEl) refEl.textContent = `#${refNum}`;

    form.style.display = 'none';
    if (successState) successState.style.display = 'block';

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#D4AF37', '#2C1E17', '#E5D5C5']
    });

    showToast(`Dossier #${refNum} transmitted to our Geneva Salon Concierge.`);
  });
}

window.resetContactForm = () => {
  const form = document.getElementById('contact-inquiry-form');
  const successState = document.getElementById('contact-success-state');
  if (form) {
    form.reset();
    form.style.display = 'flex';
  }
  if (successState) {
    successState.style.display = 'none';
  }
};

/* 15. Live Commission Order Tracker */
function initOrderTracking() {
  const navTrackBtn = document.getElementById('nav-track-btn');
  const checkoutTrackBtn = document.getElementById('checkout-track-btn');
  const modal = document.getElementById('tracking-modal');
  const closeBtn = document.getElementById('tracking-close-btn');
  const form = document.getElementById('tracking-search-form');
  const input = document.getElementById('tracking-input-id');
  const resultsCard = document.getElementById('tracking-results-card');

  const openTracker = (orderId = '') => {
    if (modal) modal.style.display = 'flex';
    if (input && orderId) {
      input.value = orderId;
      queryOrder(orderId);
    }
  };

  navTrackBtn?.addEventListener('click', () => openTracker());
  checkoutTrackBtn?.addEventListener('click', () => {
    const num = document.getElementById('order-confirmed-num')?.textContent;
    document.getElementById('checkout-modal').style.display = 'none';
    openTracker(num);
  });

  closeBtn?.addEventListener('click', () => {
    if (modal) modal.style.display = 'none';
  });

  async function queryOrder(id) {
    const cleanId = id.trim().toUpperCase();
    showToast(`Querying Atelier Database for #${cleanId}...`);

    try {
      const res = await fetch(`/api/orders/${encodeURIComponent(cleanId)}`);
      if (res.ok) {
        const json = await res.json();
        const o = json.order;
        if (o) {
          renderOrderResults(o);
          return;
        }
      }
    } catch (e) {
      // offline
    }

    // Fallback to local
    const local = JSON.parse(localStorage.getItem('arven_orders') || '[]');
    const match = local.find(ord => ord.id.toUpperCase() === cleanId);
    if (match) {
      renderOrderResults(match);
    } else {
      showToast(`Commission #${cleanId} not found in Atelier Archives.`, 'error');
      if (resultsCard) resultsCard.style.display = 'none';
    }
  }

  function renderOrderResults(o) {
    if (!resultsCard) return;
    resultsCard.style.display = 'block';

    document.getElementById('track-res-id').textContent = o.id;
    document.getElementById('track-res-badge').textContent = o.status;
    document.getElementById('track-res-client').textContent = o.client_name || o.clientName || 'VIP Collector';
    document.getElementById('track-res-item').textContent = o.itemName || (o.items && o.items[0]?.name) || (o.items && o.items[0]?.product?.name) || 'ARVÉN Calibre';
    document.getElementById('track-res-total').textContent = `$${(Number(o.total) || 3800).toLocaleString()}`;

    const timelineContainer = document.getElementById('track-timeline-steps');
    if (timelineContainer) {
      const steps = [
        { title: 'Commission Registered & Certified', done: true, time: o.created_at ? new Date(o.created_at).toLocaleDateString() : 'Active' },
        { title: 'Calibre Hand-Assembly (Le Locle Atelier)', done: o.status !== 'Pending Review' && o.status !== 'Pending Atelier Review', time: 'In Progress' },
        { title: 'Chronometer Precision & Pressure Testing', done: o.status === 'Quality Inspection' || o.status === 'Dispatched via Armored Courier' || o.status === 'Delivered', time: 'Certified' },
        { title: 'Armored Diplomatic Courier Dispatch', done: o.status === 'Dispatched via Armored Courier' || o.status === 'Delivered', time: 'Global Logistics' },
        { title: 'Delivered to Private Residence', done: o.status === 'Delivered', time: 'Completed' }
      ];

      timelineContainer.innerHTML = steps.map(s => `
        <div style="display: flex; align-items: center; gap: 10px;">
          <span style="width: 8px; height: 8px; border-radius: 50%; background: ${s.done ? 'var(--color-champagne-gold)' : '#E5D5C5'}; flex-shrink: 0;"></span>
          <span style="color: ${s.done ? 'var(--color-deep-brown)' : 'var(--text-muted)'}; font-weight: ${s.done ? '600' : '400'}; flex: 1;">${s.title}</span>
          <span style="font-size: 0.7rem; color: var(--text-muted);">${s.time}</span>
        </div>
      `).join('');
    }
  }

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input?.value) {
      queryOrder(input.value);
    }
  });
}

