/**
 * ARVÉN LUXURY TIMEPIECES — SUPABASE CLIENT & DATABASE SERVICE
 * Universal ESM Database Client with Smart Offline / LocalStorage Fallback.
 */

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

// Storage Keys
const CONFIG_KEYS = {
  URL: 'arven_supabase_url',
  ANON_KEY: 'arven_supabase_anon_key'
};

// Default Fallback Data
export const INITIAL_PRODUCTS = [
  {
    id: 'arven-haute-collection',
    name: 'ARVÉN HAUTE MASTERPIECE COLLECTION',
    subtitle: '4 Curated Bespoke Editions • 38mm to 41mm',
    tagline: 'Choose from 4 distinctive luxury editions: Royal Blue Jubilee, Tonneau Art Déco, Cushion Slim, and Carré Noir Stealth.',
    tag: '4 Editions in 1',
    size: '38mm - 41mm',
    price: 4150,
    badge: '4 EDITIONS IN 1',
    is_bestseller: true,
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
    color_options: [
      { id: 'royal-blue', name: 'Royal Sunray Blue & Jubilee Gold', shortName: 'Royal Blue Day-Date', colorHex: '#1A365D', accentHex: '#D4AF37', price: 4150, size: '41mm', tag: 'Two-Tone Gold', badge: 'ROYAL JUBILEE', image: '/images/arven-royal-blue.jpg' },
      { id: 'tonneau-deco', name: 'Tonneau Art Déco Silver & Saddle Calfskin', shortName: 'Tonneau Art Déco', colorHex: '#C0A080', accentHex: '#1C1815', price: 3800, size: '39mm', tag: 'Art Déco Tonneau', badge: 'ATELIER CLASSIC', image: '/images/arven-tonneau-deco.jpg' },
      { id: 'cushion-silver', name: 'Cushion Ultra-Slim Silver & Oyster Steel', shortName: 'Cushion Ultra-Slim', colorHex: '#8C9099', accentHex: '#E8E4DF', price: 3650, size: '39mm', tag: 'Monochrome Steel', badge: 'ULTRA-SLIM 7.8MM', image: '/images/arven-cushion-silver.jpg' },
      { id: 'square-noir', name: 'Carré Noir Stealth DLC & Black Crocodile', shortName: 'Carré Noir Stealth', colorHex: '#141414', accentHex: '#8C7A5B', price: 4300, size: '40mm', tag: 'DLC Stealth Matte', badge: 'STEALTH ALLOCATION', image: '/images/arven-square-noir.jpg' }
    ],
    stock: 8
  },
  {
    id: 'arven-diver-twotone',
    name: 'ARVÉN DIVER TWO-TONE',
    subtitle: '18k Yellow Gold & 316L Surgical Steel • 41mm Ceramic Bezel',
    tagline: 'Engineered for oceanic depths and black-tie galas alike with 300m water resistance.',
    tag: 'Flagship Diver',
    size: '41mm',
    price: 4450,
    badge: 'ATELIER FLAGSHIP',
    is_bestseller: true,
    category: 'diver',
    image: '/images/arven-exact-watch.png',
    description: 'The ARVÉN Diver Two-Tone represents the pinnacle of marine horology. Featuring a unidirectional rotating high-tech black ceramic bezel with Ceragold numerals, a deep sunburst dial with Super-LumiNova markers, and the chronometer-certified Calibre AV-300.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '12.4 mm',
      caseMaterial: '18k Yellow Gold & 316L Surgical Grade Steel',
      dialColor: 'Deep Obsidian Sunburst with Gold Indices',
      movement: 'Calibre AV-300 High-Beat Automatic (28,800 vph)',
      powerReserve: '72 Hours',
      waterResistance: '300 Metres (30 ATM / 1,000 ft)',
      glass: 'Triple Anti-Reflective Domed Sapphire',
      strapMaterial: 'Integrated Two-Tone 5-Link Luxury Bracelet',
      lugWidth: '20 mm'
    },
    color_options: [],
    stock: 5
  },
  {
    id: 'arven-hero-wrist-watch',
    name: 'ARVÉN HERITAGE SLIMLINE',
    subtitle: 'Ultra-Thin 8.5mm Profile • 39mm 18k Rose Gold Case',
    tagline: 'The quintessential dress watch. Pure proportion, champagne dial, hand-stitched alligator leather.',
    tag: 'Haute Dress',
    size: '39mm',
    price: 3450,
    badge: 'ICONIC SILHOUETTE',
    is_bestseller: false,
    category: 'classic',
    image: '/images/arven-hero-wrist.png',
    description: 'A study in classical horological purity. The ARVÉN Heritage Slimline pairs an ultra-thin 8.5mm profile in warm 18k rose gold with an ivory sunray dial and blued steel feuille hands.',
    specs: {
      caseDiameter: '39 mm',
      caseThickness: '8.5 mm',
      caseMaterial: '18k Rose Gold Plated 316L Stainless Steel',
      dialColor: 'Champagne Sunray with Applied Roman Numerals',
      movement: 'Calibre AV-085 Ultra-Thin Manual Wind (21,600 vph)',
      powerReserve: '48 Hours',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Domed Sapphire Crystal with AR Coating',
      strapMaterial: 'Hand-Stitched Italian Alligator-Embossed Leather',
      lugWidth: '19 mm'
    },
    color_options: [],
    stock: 12
  },
  {
    id: 'arven-cushion-silver',
    name: 'ARVÉN CUSHION ULTRA-SLIM',
    subtitle: 'Monochromatic 39mm • Ultra-Slim 7.8mm Profile',
    tagline: 'A striking modern silhouette celebrating refined minimalism and architectural geometry.',
    tag: 'Modern Haute',
    size: '39mm',
    price: 3650,
    badge: 'ATELIER BESPOKE',
    is_bestseller: false,
    category: 'classic',
    image: '/images/arven-cushion-silver.jpg',
    description: 'Architectural grace meets horological mastery. The ARVÉN Cushion Ultra-Slim features a hand-brushed cushion case with mirror-polished bevels and a sunburst rhodium dial.',
    specs: {
      caseDiameter: '39 mm',
      caseThickness: '7.8 mm',
      caseMaterial: '316L Surgical Steel with Mirror-Polished Chamfers',
      dialColor: 'Sunburst Silver Rhodium with Dauphine Hands',
      movement: 'Calibre AV-090 Ultra-Thin Manual Wind (28,800 vph)',
      powerReserve: '42 Hours',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Domed Box Sapphire Crystal',
      strapMaterial: 'Brushed 3-Link Steel Bracelet with Butterfly Clasp',
      lugWidth: '20 mm'
    },
    color_options: [],
    stock: 6
  },
  {
    id: 'arven-square-noir',
    name: 'ARVÉN CARRÉ NOIR STEALTH',
    subtitle: 'Square 40mm Architectural Case • Matte DLC Coating',
    tagline: 'Bold avant-garde design engineered in matte black diamond-like carbon.',
    tag: 'Stealth DLC',
    size: '40mm',
    price: 4300,
    badge: 'STEALTH ALLOCATION',
    is_bestseller: false,
    category: 'minimalist',
    image: '/images/arven-square-noir.jpg',
    description: 'A daring square silhouette coated in scratch-proof Diamond-Like Carbon (DLC). The dial features stealth phantom indices with subtle lume and an open exhibition caseback.',
    specs: {
      caseDiameter: '40 mm',
      caseThickness: '10.2 mm',
      caseMaterial: 'Diamond-Like Carbon (DLC) Coated Stainless Steel',
      dialColor: 'Matte Onyx Black with Anthracite Accents',
      movement: 'Calibre AV-105 Automatic with Date Complication',
      powerReserve: '48 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Flat Sapphire Crystal with Double-Sided AR',
      strapMaterial: 'Matte Black FKM Rubber & Crocodile Hybrid Strap',
      lugWidth: '22 mm'
    },
    color_options: [],
    stock: 4
  },
  {
    id: 'arven-chrono',
    name: 'ARVÉN CHRONO ROYALE',
    subtitle: 'Bicompax Chronograph 41mm • Solid Gold Pushers',
    tagline: 'Mechanical precision chronograph with column-wheel mechanism and tachymeter scale.',
    tag: 'Grand Complication',
    size: '41mm',
    price: 4200,
    badge: 'CHRONOMETRE',
    is_bestseller: false,
    category: 'chronograph',
    image: '/images/arven-twotone-chrono.jpg',
    description: 'The quintessential gentleman’s chronograph. Calibre AV-202 column-wheel chronograph with dual sub-dials for 30-minute and continuous seconds measurement.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '13.2 mm',
      caseMaterial: 'Two-Tone 18k Yellow Gold & Stainless Steel',
      dialColor: 'Panda Dial: Cream Ivory with Sunken Black Sub-dials',
      movement: 'Calibre AV-202 Column-Wheel Mechanical Chronograph',
      powerReserve: '55 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Domed Box Sapphire Crystal with Internal AR',
      strapMaterial: 'Full Two-Tone Jubilee Bracelet with Hidden Deployment Clasp',
      lugWidth: '20 mm'
    },
    color_options: [],
    stock: 7
  },
  {
    id: 'arven-heritage',
    name: 'ARVÉN GRAND HERITAGE',
    subtitle: 'Vintage Art Déco 39mm • Curved Tonneau Silhouette',
    tagline: '1920s Art Déco inspired tonneau case with hand-guilloché silver dial.',
    tag: 'Vintage Atelier',
    size: '39mm',
    price: 3800,
    badge: 'VINTAGE ATELIER',
    is_bestseller: false,
    category: 'vintage',
    image: '/images/arven-tonneau-deco.jpg',
    description: 'Drawing from the golden era of European watchmaking, the Grand Heritage tonneau hugs the wrist ergonomically while showcasing guilloché engraving.',
    specs: {
      caseDiameter: '39 mm',
      caseThickness: '9.4 mm',
      caseMaterial: 'Mirror-Polished 316L Stainless Steel',
      dialColor: 'Silver Guilloché with Blue Breguet Hands',
      movement: 'Calibre AV-090 Ultra-Thin Manual Wind',
      powerReserve: '45 Hours',
      waterResistance: '50 Metres (5 ATM)',
      glass: 'Curved Form-Fitting Sapphire Crystal',
      strapMaterial: 'Full-Grain Saddle Brown French Calfskin',
      lugWidth: '20 mm'
    },
    color_options: [],
    stock: 9
  },
  {
    id: 'arven-noir',
    name: 'ARVÉN NOIR EDITION',
    subtitle: 'Midnight Edition 41mm • Deep Bronze & Onyx',
    tagline: 'Limited midnight release celebrating darkness and illuminated legibility.',
    tag: 'Limited Edition',
    size: '41mm',
    price: 3950,
    badge: 'NEW RELEASE',
    is_bestseller: false,
    category: 'minimalist',
    image: '/images/arven-noir-highres.jpg',
    description: 'An enigmatic timepiece crafted in treated bronze-tone steel that will age with a personal patina unique to its owner.',
    specs: {
      caseDiameter: '41 mm',
      caseThickness: '11.0 mm',
      caseMaterial: 'Aged Bronze-Tone Marine Grade Stainless Steel',
      dialColor: 'Velvet Matte Onyx with Rose Gold Hands',
      movement: 'Calibre AV-105 Automatic with Date Window',
      powerReserve: '50 Hours',
      waterResistance: '100 Metres (10 ATM)',
      glass: 'Sapphire with Double-Sided Anti-Reflective Glare Shield',
      strapMaterial: 'Distressed Charcoal Tuscan Leather Strap',
      lugWidth: '21 mm'
    },
    color_options: [],
    stock: 3
  }
];

export const INITIAL_PROMOS = [
  { code: 'ARVEN10', discount: 10, target: 'VIP Connoisseur Circle', status: 'Active' },
  { code: 'GENEVA20', discount: 20, target: 'Salon Private Allocation', status: 'Active' },
  { code: 'BESPOKE15', discount: 15, target: 'First Atelier Commission', status: 'Active' }
];

export const INITIAL_ORDERS = [
  {
    id: 'AV-892104',
    date: '2026-02-28T14:30:00Z',
    client_name: 'Lord Sterling Vance',
    client_email: 'sterling@vance-holdings.co.uk',
    client_phone: '+44 20 7946 0912',
    items: [{ id: 'arven-diver-twotone', name: 'ARVÉN DIVER TWO-TONE', price: 4450, quantity: 1, image: '/images/arven-exact-watch.png' }],
    subtotal: 4450,
    discount: 0,
    total: 4450,
    engraving: 'SEMPER FIDELIS',
    status: 'In Assembly'
  },
  {
    id: 'AV-641092',
    date: '2026-02-27T09:15:00Z',
    client_name: 'Dr. Marcus Thorne',
    client_email: 'm.thorne@manhattan-clinic.com',
    client_phone: '+1 212 555 0198',
    items: [{ id: 'arven-haute-collection', name: 'ARVÉN HAUTE MASTERPIECE (Royal Blue)', price: 4150, quantity: 1, image: '/images/arven-royal-blue.jpg' }],
    subtotal: 4150,
    discount: 350,
    total: 3800,
    engraving: 'XL ANNIVERSARY',
    status: 'Pending Atelier Review'
  },
  {
    id: 'AV-418290',
    date: '2026-02-25T17:45:00Z',
    client_name: 'Countess Genevieve de Blois',
    client_email: 'genevieve@chateau-blois.fr',
    client_phone: '+33 1 42 68 55 00',
    items: [{ id: 'arven-square-noir', name: 'ARVÉN CARRÉ NOIR STEALTH', price: 4300, quantity: 1, image: '/images/arven-square-noir.jpg' }],
    subtotal: 4300,
    discount: 0,
    total: 4300,
    engraving: 'ÉTERNITÉ',
    status: 'Dispatched via Armored Courier'
  }
];

export const INITIAL_INQUIRIES = [
  {
    id: 'ARV-VIP-8821',
    date: '2026-03-01T08:12:00Z',
    name: 'Arthur Sterling',
    email: 'arthur.sterling@mayfair-advisors.ch',
    phone: '+41 22 819 0044',
    inquiry_type: 'Bespoke 3D Commission',
    model_interest: 'ARVÉN DIVER TWO-TONE',
    video_call: true,
    catalog_requested: true,
    status: 'New'
  },
  {
    id: 'ARV-VIP-7419',
    date: '2026-02-28T16:20:00Z',
    name: 'Baroness Claire von Keller',
    email: 'claire@keller-capital.de',
    phone: '+49 89 2100 440',
    inquiry_type: 'Private Salon Appointment',
    model_interest: 'ARVÉN HAUTE MASTERPIECE',
    video_call: false,
    catalog_requested: true,
    status: 'Salon Booked'
  },
  {
    id: 'ARV-VIP-5920',
    date: '2026-02-26T11:05:00Z',
    name: 'Julian Thorne',
    email: 'jthorne@geneva-law.ch',
    phone: '+41 79 920 4400',
    inquiry_type: 'Movement Care & Restoration',
    model_interest: 'ARVÉN GRAND HERITAGE',
    video_call: true,
    catalog_requested: false,
    status: 'Director Contacted'
  }
];

let supabaseClient = null;

/**
 * Get configured Supabase Client instance or null
 */
export function getSupabase() {
  const url = localStorage.getItem(CONFIG_KEYS.URL);
  const key = localStorage.getItem(CONFIG_KEYS.ANON_KEY);

  if (!url || !key) {
    return null;
  }

  if (!supabaseClient) {
    try {
      supabaseClient = createClient(url, key);
    } catch (err) {
      console.warn('ARVÉN Supabase Client Init Warning:', err);
      return null;
    }
  }
  return supabaseClient;
}

/**
 * Check if Supabase connection credentials exist
 */
export function isSupabaseConfigured() {
  const url = localStorage.getItem(CONFIG_KEYS.URL);
  const key = localStorage.getItem(CONFIG_KEYS.ANON_KEY);
  return Boolean(url && key && url.trim().length > 10 && key.trim().length > 15);
}

/**
 * Get currently stored Supabase credentials
 */
export function getSupabaseConfig() {
  return {
    url: localStorage.getItem(CONFIG_KEYS.URL) || '',
    anonKey: localStorage.getItem(CONFIG_KEYS.ANON_KEY) || ''
  };
}

/**
 * Save new Supabase credentials and re-init client
 */
export function saveSupabaseConfig(url, anonKey) {
  if (url && anonKey) {
    localStorage.setItem(CONFIG_KEYS.URL, url.trim());
    localStorage.setItem(CONFIG_KEYS.ANON_KEY, anonKey.trim());
    supabaseClient = createClient(url.trim(), anonKey.trim());
  } else {
    localStorage.removeItem(CONFIG_KEYS.URL);
    localStorage.removeItem(CONFIG_KEYS.ANON_KEY);
    supabaseClient = null;
  }
}

/**
 * Test connectivity against a specified or stored Supabase instance
 */
export async function testSupabaseConnection(customUrl = null, customKey = null) {
  try {
    const url = customUrl || localStorage.getItem(CONFIG_KEYS.URL);
    const key = customKey || localStorage.getItem(CONFIG_KEYS.ANON_KEY);

    if (!url || !key) {
      return { success: false, message: 'Supabase URL and Anon Key are missing.' };
    }

    const testClient = createClient(url.trim(), key.trim());
    // Quick test query against products or schema
    const { data, error } = await testClient.from('products').select('id').limit(1);

    if (error) {
      // If table doesn't exist yet, but connection authenticated
      if (error.code === '42P01') {
        return {
          success: true,
          schemaNeeded: true,
          message: 'Connected to Supabase successfully! Tables need to be created using supabase-schema.sql.'
        };
      }
      return { success: false, message: `Supabase Error: ${error.message}` };
    }

    return {
      success: true,
      dataCount: data ? data.length : 0,
      message: 'Supabase cloud database is connected and ready!'
    };
  } catch (err) {
    return { success: false, message: `Connection failed: ${err.message}` };
  }
}

/* ========================================================
   PRODUCTS SERVICE
   ======================================================== */

export async function fetchProducts() {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('products')
        .select('*')
        .order('price', { ascending: false });

      if (!error && data && data.length > 0) {
        localStorage.setItem('arven_products', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetchProducts fallback to backend API:', err);
    }
  }

  // Backend API Fallback
  try {
    const res = await fetch('/api/products');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data && json.data.length > 0) {
        localStorage.setItem('arven_products', JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (apiErr) {
    // offline
  }

  // Fallback to LocalStorage or Default Seed
  const local = localStorage.getItem('arven_products');
  if (local) {
    try {
      return JSON.parse(local);
    } catch {
      // fallback
    }
  }
  return INITIAL_PRODUCTS;
}

export async function saveProduct(product) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('products')
        .upsert(product)
        .select()
        .single();
      if (error) throw error;
      return { success: true, data };
    } catch (err) {
      console.warn('Supabase saveProduct error, syncing to local API:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });
  } catch (e) {
    // offline
  }

  // Local fallback
  const products = await fetchProducts();
  const index = products.findIndex(p => p.id === product.id);
  if (index >= 0) {
    products[index] = { ...products[index], ...product };
  } else {
    products.unshift(product);
  }
  localStorage.setItem('arven_products', JSON.stringify(products));
  return { success: true, data: product, isLocal: true };
}

export async function deleteProduct(productId) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('products').delete().eq('id', productId);
      if (error) throw error;
    } catch (err) {
      console.warn('Supabase deleteProduct error:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch(`/api/products/${encodeURIComponent(productId)}`, { method: 'DELETE' });
  } catch (e) {
    // offline
  }

  // Update local
  const products = (await fetchProducts()).filter(p => p.id !== productId);
  localStorage.setItem('arven_products', JSON.stringify(products));
  return { success: true };
}

/* ========================================================
   ORDERS SERVICE
   ======================================================== */

export async function fetchOrders() {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        localStorage.setItem('arven_orders', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetchOrders fallback:', err);
    }
  }

  // Backend API Fallback
  try {
    const res = await fetch('/api/orders');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        localStorage.setItem('arven_orders', JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (apiErr) {
    // offline
  }

  const local = localStorage.getItem('arven_orders');
  return local ? JSON.parse(local) : INITIAL_ORDERS;
}

export async function createOrder(orderData) {
  const sb = getSupabase();
  const orderRecord = {
    id: orderData.id || `AV-${Math.floor(100000 + Math.random() * 900000)}`,
    client_name: orderData.client_name || orderData.clientName || 'Anonymous Collector',
    client_email: orderData.client_email || orderData.clientEmail || '',
    client_phone: orderData.client_phone || orderData.clientPhone || '',
    shipping_address: orderData.shipping_address || orderData.shippingAddress || {},
    items: orderData.items || [],
    subtotal: orderData.subtotal || orderData.total || 0,
    discount: orderData.discount || 0,
    promo_code: orderData.promo_code || orderData.promoCode || null,
    total: orderData.total || 0,
    engraving: orderData.engraving || null,
    strap_choice: orderData.strap_choice || orderData.strapChoice || null,
    status: orderData.status || 'In Assembly',
    created_at: new Date().toISOString()
  };

  if (sb) {
    try {
      const { data, error } = await sb
        .from('orders')
        .insert([orderRecord])
        .select()
        .single();
      if (!error && data) {
        const local = await fetchOrders();
        local.unshift(data);
        localStorage.setItem('arven_orders', JSON.stringify(local));
        return { success: true, data, id: data.id };
      }
    } catch (err) {
      console.warn('Supabase createOrder error, storing in local DB:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderRecord)
    });
  } catch (e) {
    // offline
  }

  // Fallback to local
  const orders = await fetchOrders();
  orders.unshift(orderRecord);
  localStorage.setItem('arven_orders', JSON.stringify(orders));
  return { success: true, data: orderRecord, id: orderRecord.id, isLocal: true };
}

export async function updateOrderStatus(orderId, status) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('orders')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', orderId)
        .select()
        .single();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Supabase updateOrderStatus error:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch(`/api/orders/${encodeURIComponent(orderId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (e) {
    // offline
  }

  // Local update
  const orders = await fetchOrders();
  const target = orders.find(o => o.id === orderId);
  if (target) {
    target.status = status;
    localStorage.setItem('arven_orders', JSON.stringify(orders));
  }
  return { success: true, isLocal: true };
}

/* ========================================================
   INQUIRIES / CONCIERGE SERVICE
   ======================================================== */

export async function fetchInquiries() {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        localStorage.setItem('arven_inquiries', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetchInquiries fallback:', err);
    }
  }

  // Backend API Fallback
  try {
    const res = await fetch('/api/inquiries');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        localStorage.setItem('arven_inquiries', JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (apiErr) {
    // offline
  }

  const local = localStorage.getItem('arven_inquiries');
  return local ? JSON.parse(local) : INITIAL_INQUIRIES;
}

export async function createInquiry(inquiryData) {
  const sb = getSupabase();
  const record = {
    id: inquiryData.id || `ARV-VIP-${Math.floor(1000 + Math.random() * 9000)}`,
    name: inquiryData.name || '',
    email: inquiryData.email || '',
    phone: inquiryData.phone || '',
    inquiry_type: inquiryData.inquiry_type || inquiryData.type || 'Bespoke 3D Commission',
    model_interest: inquiryData.model_interest || inquiryData.model || '',
    notes: inquiryData.notes || '',
    video_call: Boolean(inquiryData.video_call ?? inquiryData.videoCall),
    catalog_requested: Boolean(inquiryData.catalog_requested ?? inquiryData.catalog),
    status: inquiryData.status || 'New',
    created_at: new Date().toISOString()
  };

  if (sb) {
    try {
      const { data, error } = await sb
        .from('inquiries')
        .insert([record])
        .select()
        .single();
      if (!error && data) {
        const local = await fetchInquiries();
        local.unshift(data);
        localStorage.setItem('arven_inquiries', JSON.stringify(local));
        return { success: true, data, id: data.id };
      }
    } catch (err) {
      console.warn('Supabase createInquiry error, storing local:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(record)
    });
  } catch (e) {
    // offline
  }

  const inquiries = await fetchInquiries();
  inquiries.unshift(record);
  localStorage.setItem('arven_inquiries', JSON.stringify(inquiries));
  return { success: true, data: record, id: record.id, isLocal: true };
}

export async function updateInquiryStatus(inquiryId, status) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('inquiries')
        .update({ status, updated_at: new Date().toISOString() })
        .eq('id', inquiryId)
        .select()
        .single();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Supabase updateInquiryStatus error:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch(`/api/inquiries/${encodeURIComponent(inquiryId)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
  } catch (e) {
    // offline
  }

  const inquiries = await fetchInquiries();
  const target = inquiries.find(i => i.id === inquiryId);
  if (target) {
    target.status = status;
    localStorage.setItem('arven_inquiries', JSON.stringify(inquiries));
  }
  return { success: true, isLocal: true };
}

/* ========================================================
   PROMOTIONS & DISCOUNTS SERVICE
   ======================================================== */

export async function fetchPromos() {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb
        .from('promos')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        localStorage.setItem('arven_promos', JSON.stringify(data));
        return data;
      }
    } catch (err) {
      console.warn('Supabase fetchPromos fallback:', err);
    }
  }

  // Backend API Fallback
  try {
    const res = await fetch('/api/promos');
    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        localStorage.setItem('arven_promos', JSON.stringify(json.data));
        return json.data;
      }
    }
  } catch (apiErr) {
    // offline
  }

  const local = localStorage.getItem('arven_promos');
  return local ? JSON.parse(local) : INITIAL_PROMOS;
}

export async function validatePromo(code) {
  const cleanCode = (code || '').trim().toUpperCase();
  const promos = await fetchPromos();
  const match = promos.find(p => p.code.toUpperCase() === cleanCode && p.status === 'Active');
  return match || null;
}

export async function savePromo(promo) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { data, error } = await sb.from('promos').upsert(promo).select().single();
      if (!error) return { success: true, data };
    } catch (err) {
      console.warn('Supabase savePromo error:', err);
    }
  }

  // Sync to Backend Server API
  try {
    await fetch('/api/promos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(promo)
    });
  } catch (e) {
    // offline
  }

  const promos = await fetchPromos();
  const idx = promos.findIndex(p => p.code.toUpperCase() === promo.code.toUpperCase());
  if (idx >= 0) promos[idx] = { ...promos[idx], ...promo };
  else promos.unshift(promo);
  localStorage.setItem('arven_promos', JSON.stringify(promos));
  return { success: true, data: promo, isLocal: true };
}

/* ========================================================
   NEWSLETTER SERVICE
   ======================================================== */

export async function subscribeNewsletter(email) {
  const sb = getSupabase();
  if (sb) {
    try {
      const { error } = await sb.from('subscribers').insert([{ email: email.trim().toLowerCase() }]);
      if (error && error.code !== '23505') { // ignore duplicate unique key error
        console.warn('Supabase newsletter error:', error);
      }
    } catch (err) {
      console.warn('Supabase subscriber error:', err);
    }
  }
  return { success: true };
}

/* ========================================================
   SEED CLOUD DATABASE
   ======================================================== */

export async function seedCloudDatabase() {
  const sb = getSupabase();
  if (!sb) {
    return { success: false, message: 'Please enter Supabase URL and Anon Key first.' };
  }

  try {
    // 1. Seed Products
    const { error: prodError } = await sb.from('products').upsert(INITIAL_PRODUCTS);
    if (prodError) throw prodError;

    // 2. Seed Promos
    const { error: promoError } = await sb.from('promos').upsert(INITIAL_PROMOS);
    if (promoError) throw promoError;

    // 3. Seed Orders
    const { error: orderError } = await sb.from('orders').upsert(INITIAL_ORDERS);
    if (orderError) throw orderError;

    // 4. Seed Inquiries
    const { error: inqError } = await sb.from('inquiries').upsert(INITIAL_INQUIRIES);
    if (inqError) throw inqError;

    return { success: true, message: 'Successfully seeded Supabase with luxury timepieces, orders, and inquiries!' };
  } catch (err) {
    return { success: false, message: `Failed to seed database: ${err.message}` };
  }
}
