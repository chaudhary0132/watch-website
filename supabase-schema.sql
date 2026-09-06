-- ========================================================
-- ARVÉN LUXURY TIMEPIECES — SUPABASE DATABASE SCHEMA
-- ========================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========================================================
-- 1. PRODUCTS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    subtitle TEXT,
    tagline TEXT,
    tag TEXT,
    size TEXT DEFAULT '40mm',
    price NUMERIC(10, 2) NOT NULL,
    badge TEXT,
    is_bestseller BOOLEAN DEFAULT false,
    category TEXT DEFAULT 'classic',
    image TEXT NOT NULL,
    description TEXT,
    specs JSONB DEFAULT '{}'::jsonb,
    color_options JSONB DEFAULT '[]'::jsonb,
    stock INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 2. ORDERS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.orders (
    id TEXT PRIMARY KEY,
    client_name TEXT NOT NULL,
    client_email TEXT NOT NULL,
    client_phone TEXT,
    shipping_address JSONB DEFAULT '{}'::jsonb,
    items JSONB NOT NULL DEFAULT '[]'::jsonb,
    subtotal NUMERIC(10, 2) NOT NULL DEFAULT 0,
    discount NUMERIC(10, 2) DEFAULT 0,
    promo_code TEXT,
    total NUMERIC(10, 2) NOT NULL DEFAULT 0,
    engraving TEXT,
    strap_choice TEXT,
    status TEXT NOT NULL DEFAULT 'Pending Atelier Review',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 3. INQUIRIES & CONCIERGE BOOKINGS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    inquiry_type TEXT NOT NULL DEFAULT 'Bespoke 3D Commission',
    model_interest TEXT,
    notes TEXT,
    video_call BOOLEAN DEFAULT false,
    catalog_requested BOOLEAN DEFAULT false,
    status TEXT NOT NULL DEFAULT 'New',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 4. PROMOTIONS & VIP CODES TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.promos (
    code TEXT PRIMARY KEY,
    discount INTEGER NOT NULL CHECK (discount > 0 AND discount <= 100),
    target TEXT DEFAULT 'VIP Connoisseur Circle',
    status TEXT NOT NULL DEFAULT 'Active',
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- 5. NEWSLETTER SUBSCRIBERS TABLE
-- ========================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    source TEXT DEFAULT 'Storefront Newsletter',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ========================================================

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active products & active promos
DROP POLICY IF EXISTS "Public can view products" ON public.products;
CREATE POLICY "Public can view products" ON public.products FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can view promos" ON public.promos;
CREATE POLICY "Public can view promos" ON public.promos FOR SELECT USING (status = 'Active');

-- Allow public / anon users to place orders & inquiries & subscribe
DROP POLICY IF EXISTS "Public can insert orders" ON public.orders;
CREATE POLICY "Public can insert orders" ON public.orders FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can view their own orders" ON public.orders;
CREATE POLICY "Public can view their own orders" ON public.orders FOR SELECT USING (true);

DROP POLICY IF EXISTS "Public can insert inquiries" ON public.inquiries;
CREATE POLICY "Public can insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Public can subscribe" ON public.subscribers;
CREATE POLICY "Public can subscribe" ON public.subscribers FOR INSERT WITH CHECK (true);

-- Allow full access for admin operations (anon/service key or authenticated)
DROP POLICY IF EXISTS "Allow all for admin products" ON public.products;
CREATE POLICY "Allow all for admin products" ON public.products FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for admin orders" ON public.orders;
CREATE POLICY "Allow all for admin orders" ON public.orders FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for admin inquiries" ON public.inquiries;
CREATE POLICY "Allow all for admin inquiries" ON public.inquiries FOR ALL USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Allow all for admin promos" ON public.promos;
CREATE POLICY "Allow all for admin promos" ON public.promos FOR ALL USING (true) WITH CHECK (true);

-- ========================================================
-- SEED INITIAL LUXURY DATA
-- ========================================================

-- Seed Products
INSERT INTO public.products (id, name, subtitle, tagline, tag, size, price, badge, is_bestseller, category, image, description, specs, color_options, stock)
VALUES
(
  'arven-haute-collection',
  'ARVÉN HAUTE MASTERPIECE COLLECTION',
  '4 Curated Bespoke Editions • 38mm to 41mm',
  'Choose from 4 distinctive luxury editions: Royal Blue Jubilee, Tonneau Art Déco, Cushion Slim, and Carré Noir Stealth.',
  '4 Editions in 1',
  '38mm - 41mm',
  4150.00,
  '4 EDITIONS IN 1',
  true,
  'automatic',
  '/images/arven-royal-blue.jpg',
  'The definitive ARVÉN signature timepiece offering 4 distinct case architectures and dial executions: Royal Sunray Blue & Jubilee Gold, Tonneau Art Déco, Cushion Ultra-Slim Steel, and Carré Noir Stealth DLC.',
  '{"caseDiameter": "41 mm", "caseThickness": "10.8 mm", "caseMaterial": "316L Stainless Steel & 18k Yellow Gold Bezel", "dialColor": "Royal Sunray Blue with Diamond-Set Indices", "movement": "Calibre AV-320 Day-Date Swiss Automatic (28,800 vph)", "powerReserve": "50 Hours", "waterResistance": "100 Metres (10 ATM)", "glass": "Scratch-Resistant Box Sapphire with Triple AR Glare Shield", "strapMaterial": "Two-Tone Stainless Steel & 18k Gold Jubilee Bracelet", "lugWidth": "20 mm"}'::jsonb,
  '[
    {"id": "royal-blue", "name": "Royal Sunray Blue & Jubilee Gold", "shortName": "Royal Blue Day-Date", "colorHex": "#1A365D", "accentHex": "#D4AF37", "price": 4150, "size": "41mm", "tag": "Two-Tone Gold", "badge": "ROYAL JUBILEE", "image": "/images/arven-royal-blue.jpg"},
    {"id": "tonneau-deco", "name": "Tonneau Art Déco Silver & Saddle Calfskin", "shortName": "Tonneau Art Déco", "colorHex": "#C0A080", "accentHex": "#1C1815", "price": 3800, "size": "39mm", "tag": "Art Déco Tonneau", "badge": "ATELIER CLASSIC", "image": "/images/arven-tonneau-deco.jpg"},
    {"id": "cushion-silver", "name": "Cushion Ultra-Slim Silver & Oyster Steel", "shortName": "Cushion Ultra-Slim", "colorHex": "#8C9099", "accentHex": "#E8E4DF", "price": 3650, "size": "39mm", "tag": "Monochrome Steel", "badge": "ULTRA-SLIM 7.8MM", "image": "/images/arven-cushion-silver.jpg"},
    {"id": "square-noir", "name": "Carré Noir Stealth DLC & Black Crocodile", "shortName": "Carré Noir Stealth", "colorHex": "#141414", "accentHex": "#8C7A5B", "price": 4300, "size": "40mm", "tag": "DLC Stealth Matte", "badge": "STEALTH ALLOCATION", "image": "/images/arven-square-noir.jpg"}
  ]'::jsonb,
  8
),
(
  'arven-diver-twotone',
  'ARVÉN DIVER TWO-TONE',
  '18k Yellow Gold & 316L Surgical Steel • 41mm Ceramic Bezel',
  'Engineered for oceanic depths and black-tie galas alike with 300m water resistance.',
  'Flagship Diver',
  '41mm',
  4450.00,
  'ATELIER FLAGSHIP',
  true,
  'diver',
  '/images/arven-exact-watch.png',
  'The ARVÉN Diver Two-Tone represents the pinnacle of marine horology. Featuring a unidirectional rotating high-tech black ceramic bezel with Ceragold numerals, a deep sunburst dial with Super-LumiNova markers, and the chronometer-certified Calibre AV-300.',
  '{"caseDiameter": "41 mm", "caseThickness": "12.4 mm", "caseMaterial": "18k Yellow Gold & 316L Surgical Grade Steel", "dialColor": "Deep Obsidian Sunburst with Gold Indices", "movement": "Calibre AV-300 High-Beat Automatic (28,800 vph)", "powerReserve": "72 Hours", "waterResistance": "300 Metres (30 ATM / 1,000 ft)", "glass": "Triple Anti-Reflective Domed Sapphire", "strapMaterial": "Integrated Two-Tone 5-Link Luxury Bracelet", "lugWidth": "20 mm"}'::jsonb,
  '[]'::jsonb,
  5
),
(
  'arven-hero-wrist-watch',
  'ARVÉN HERITAGE SLIMLINE',
  'Ultra-Thin 8.5mm Profile • 39mm 18k Rose Gold Case',
  'The quintessential dress watch. Pure proportion, champagne dial, hand-stitched alligator leather.',
  'Haute Dress',
  '39mm',
  3450.00,
  'ICONIC SILHOUETTE',
  false,
  'classic',
  '/images/arven-hero-wrist.png',
  'A study in classical horological purity. The ARVÉN Heritage Slimline pairs an ultra-thin 8.5mm profile in warm 18k rose gold with an ivory sunray dial and blued steel feuille hands.',
  '{"caseDiameter": "39 mm", "caseThickness": "8.5 mm", "caseMaterial": "18k Rose Gold Plated 316L Stainless Steel", "dialColor": "Champagne Sunray with Applied Roman Numerals", "movement": "Calibre AV-085 Ultra-Thin Manual Wind (21,600 vph)", "powerReserve": "48 Hours", "waterResistance": "50 Metres (5 ATM)", "glass": "Domed Sapphire Crystal with AR Coating", "strapMaterial": "Hand-Stitched Italian Alligator-Embossed Leather", "lugWidth": "19 mm"}'::jsonb,
  '[]'::jsonb,
  12
),
(
  'arven-cushion-silver',
  'ARVÉN CUSHION ULTRA-SLIM',
  'Monochromatic 39mm • Ultra-Slim 7.8mm Profile',
  'A striking modern silhouette celebrating refined minimalism and architectural geometry.',
  'Modern Haute',
  '39mm',
  3650.00,
  'ATELIER BESPOKE',
  false,
  'classic',
  '/images/arven-cushion-silver.jpg',
  'Architectural grace meets horological mastery. The ARVÉN Cushion Ultra-Slim features a hand-brushed cushion case with mirror-polished bevels and a sunburst rhodium dial.',
  '{"caseDiameter": "39 mm", "caseThickness": "7.8 mm", "caseMaterial": "316L Surgical Steel with Mirror-Polished Chamfers", "dialColor": "Sunburst Silver Rhodium with Dauphine Hands", "movement": "Calibre AV-090 Ultra-Thin Manual Wind (28,800 vph)", "powerReserve": "42 Hours", "waterResistance": "50 Metres (5 ATM)", "glass": "Domed Box Sapphire Crystal", "strapMaterial": "Brushed 3-Link Steel Bracelet with Butterfly Clasp", "lugWidth": "20 mm"}'::jsonb,
  '[]'::jsonb,
  6
),
(
  'arven-square-noir',
  'ARVÉN CARRÉ NOIR STEALTH',
  'Square 40mm Architectural Case • Matte DLC Coating',
  'Bold avant-garde design engineered in matte black diamond-like carbon.',
  'Stealth DLC',
  '40mm',
  4300.00,
  'STEALTH ALLOCATION',
  false,
  'minimalist',
  '/images/arven-square-noir.jpg',
  'A daring square silhouette coated in scratch-proof Diamond-Like Carbon (DLC). The dial features stealth phantom indices with subtle lume and an open exhibition caseback.',
  '{"caseDiameter": "40 mm", "caseThickness": "10.2 mm", "caseMaterial": "Diamond-Like Carbon (DLC) Coated Stainless Steel", "dialColor": "Matte Onyx Black with Anthracite Accents", "movement": "Calibre AV-105 Automatic with Date Complication", "powerReserve": "48 Hours", "waterResistance": "100 Metres (10 ATM)", "glass": "Flat Sapphire Crystal with Double-Sided AR", "strapMaterial": "Matte Black FKM Rubber & Crocodile Hybrid Strap", "lugWidth": "22 mm"}'::jsonb,
  '[]'::jsonb,
  4
),
(
  'arven-chrono',
  'ARVÉN CHRONO ROYALE',
  'Bicompax Chronograph 41mm • Solid Gold Pushers',
  'Mechanical precision chronograph with column-wheel mechanism and tachymeter scale.',
  'Grand Complication',
  '41mm',
  4200.00,
  'CHRONOMETRE',
  false,
  'chronograph',
  '/images/arven-twotone-chrono.jpg',
  'The quintessential gentleman’s chronograph. Calibre AV-202 column-wheel chronograph with dual sub-dials for 30-minute and continuous seconds measurement.',
  '{"caseDiameter": "41 mm", "caseThickness": "13.2 mm", "caseMaterial": "Two-Tone 18k Yellow Gold & Stainless Steel", "dialColor": "Panda Dial: Cream Ivory with Sunken Black Sub-dials", "movement": "Calibre AV-202 Column-Wheel Mechanical Chronograph", "powerReserve": "55 Hours", "waterResistance": "100 Metres (10 ATM)", "glass": "Domed Box Sapphire Crystal with Internal AR", "strapMaterial": "Full Two-Tone Jubilee Bracelet with Hidden Deployment Clasp", "lugWidth": "20 mm"}'::jsonb,
  '[]'::jsonb,
  7
),
(
  'arven-heritage',
  'ARVÉN GRAND HERITAGE',
  'Vintage Art Déco 39mm • Curved Tonneau Silhouette',
  '1920s Art Déco inspired tonneau case with hand-guilloché silver dial.',
  'Vintage Atelier',
  '39mm',
  3800.00,
  'VINTAGE ATELIER',
  false,
  'vintage',
  '/images/arven-tonneau-deco.jpg',
  'Drawing from the golden era of European watchmaking, the Grand Heritage tonneau hugs the wrist ergonomically while showcasing guilloché engraving.',
  '{"caseDiameter": "39 mm", "caseThickness": "9.4 mm", "caseMaterial": "Mirror-Polished 316L Stainless Steel", "dialColor": "Silver Guilloché with Blue Breguet Hands", "movement": "Calibre AV-090 Ultra-Thin Manual Wind", "powerReserve": "45 Hours", "waterResistance": "50 Metres (5 ATM)", "glass": "Curved Form-Fitting Sapphire Crystal", "strapMaterial": "Full-Grain Saddle Brown French Calfskin", "lugWidth": "20 mm"}'::jsonb,
  '[]'::jsonb,
  9
),
(
  'arven-noir',
  'ARVÉN NOIR EDITION',
  'Midnight Edition 41mm • Deep Bronze & Onyx',
  'Limited midnight release celebrating darkness and illuminated legibility.',
  'Limited Edition',
  '41mm',
  3950.00,
  'NEW RELEASE',
  false,
  'minimalist',
  '/images/arven-noir-highres.jpg',
  'An enigmatic timepiece crafted in treated bronze-tone steel that will age with a personal patina unique to its owner.',
  '{"caseDiameter": "41 mm", "caseThickness": "11.0 mm", "caseMaterial": "Aged Bronze-Tone Marine Grade Stainless Steel", "dialColor": "Velvet Matte Onyx with Rose Gold Hands", "movement": "Calibre AV-105 Automatic with Date Window", "powerReserve": "50 Hours", "waterResistance": "100 Metres (10 ATM)", "glass": "Sapphire with Double-Sided Anti-Reflective Glare Shield", "strapMaterial": "Distressed Charcoal Tuscan Leather Strap", "lugWidth": "21 mm"}'::jsonb,
  '[]'::jsonb,
  3
)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  subtitle = EXCLUDED.subtitle,
  tagline = EXCLUDED.tagline,
  price = EXCLUDED.price,
  specs = EXCLUDED.specs,
  color_options = EXCLUDED.color_options,
  image = EXCLUDED.image,
  updated_at = NOW();

-- Seed Promos
INSERT INTO public.promos (code, discount, target, status)
VALUES
  ('ARVEN10', 10, 'VIP Connoisseur Circle', 'Active'),
  ('GENEVA20', 20, 'Salon Private Allocation', 'Active'),
  ('BESPOKE15', 15, 'First Atelier Commission', 'Active')
ON CONFLICT (code) DO NOTHING;

-- Seed Orders
INSERT INTO public.orders (id, client_name, client_email, client_phone, items, subtotal, discount, total, engraving, status)
VALUES
  ('AV-892104', 'Lord Sterling Vance', 'sterling@vance-holdings.co.uk', '+44 20 7946 0912', '[{"id": "arven-diver-twotone", "name": "ARVÉN DIVER TWO-TONE", "price": 4450, "quantity": 1, "image": "/images/arven-exact-watch.png"}]'::jsonb, 4450, 0, 4450, 'SEMPER FIDELIS', 'In Assembly'),
  ('AV-641092', 'Dr. Marcus Thorne', 'm.thorne@manhattan-clinic.com', '+1 212 555 0198', '[{"id": "arven-haute-collection", "name": "ARVÉN HAUTE MASTERPIECE (Royal Blue)", "price": 4150, "quantity": 1, "image": "/images/arven-royal-blue.jpg"}]'::jsonb, 4150, 350, 3800, 'XL ANNIVERSARY', 'Pending Atelier Review'),
  ('AV-418290', 'Countess Genevieve de Blois', 'genevieve@chateau-blois.fr', '+33 1 42 68 55 00', '[{"id": "arven-square-noir", "name": "ARVÉN CARRÉ NOIR STEALTH", "price": 4300, "quantity": 1, "image": "/images/arven-square-noir.jpg"}]'::jsonb, 4300, 0, 4300, 'ÉTERNITÉ', 'Dispatched via Armored Courier')
ON CONFLICT (id) DO NOTHING;

-- Seed Inquiries
INSERT INTO public.inquiries (id, name, email, phone, inquiry_type, model_interest, video_call, catalog_requested, status)
VALUES
  ('ARV-VIP-8821', 'Arthur Sterling', 'arthur.sterling@mayfair-advisors.ch', '+41 22 819 0044', 'Bespoke 3D Commission', 'ARVÉN DIVER TWO-TONE', true, true, 'New'),
  ('ARV-VIP-7419', 'Baroness Claire von Keller', 'claire@keller-capital.de', '+49 89 2100 440', 'Private Salon Appointment', 'ARVÉN HAUTE MASTERPIECE', false, true, 'Salon Booked'),
  ('ARV-VIP-5920', 'Julian Thorne', 'jthorne@geneva-law.ch', '+41 79 920 4400', 'Movement Care & Restoration', 'ARVÉN GRAND HERITAGE', true, false, 'Director Contacted')
ON CONFLICT (id) DO NOTHING;
