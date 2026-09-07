import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ========================================================
// 1. LIGHTWEIGHT ZERO-DEPENDENCY .ENV LOADER
// ========================================================
function loadEnv() {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const [key, ...vals] = trimmed.split('=');
        if (key && vals.length > 0) {
          process.env[key.trim()] = vals.join('=').trim().replace(/^["']|["']$/g, '');
        }
      }
    });
  }
}
loadEnv();

const PORT = parseInt(process.env.PORT, 10) || 3000;
const DB_DIR = path.join(__dirname, 'database');
const BACKUP_DIR = path.join(DB_DIR, 'backups');

// Ensure database and backup directories exist
if (!fs.existsSync(DB_DIR)) fs.mkdirSync(DB_DIR, { recursive: true });
if (!fs.existsSync(BACKUP_DIR)) fs.mkdirSync(BACKUP_DIR, { recursive: true });

// ========================================================
// 2. ENTERPRISE ACID ATOMIC DATABASE UTILITIES & BACKUPS
// ========================================================
function readDb(file, defaultData = []) {
  const p = path.join(DB_DIR, file);
  try {
    if (fs.existsSync(p)) {
      const raw = fs.readFileSync(p, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`[Super DB Error] Read failed for ${file}:`, err.message);
  }
  return defaultData;
}

function writeDbAtomic(file, data) {
  const targetPath = path.join(DB_DIR, file);
  const tempPath = path.join(DB_DIR, `${file}.tmp.${Date.now()}`);
  try {
    const jsonStr = JSON.stringify(data, null, 2);
    fs.writeFileSync(tempPath, jsonStr, 'utf8');
    fs.renameSync(tempPath, targetPath); // Atomic file replace
    return true;
  } catch (err) {
    console.error(`[Super DB Error] Atomic write failed for ${file}:`, err.message);
    if (fs.existsSync(tempPath)) {
      try { fs.unlinkSync(tempPath); } catch {}
    }
    return false;
  }
}

function createBackupSnapshot() {
  const dateTag = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  const snapshotFolder = path.join(BACKUP_DIR, `snapshot_${dateTag}`);
  try {
    if (!fs.existsSync(snapshotFolder)) fs.mkdirSync(snapshotFolder, { recursive: true });
    const files = fs.readdirSync(DB_DIR).filter(f => f.endsWith('.json'));
    files.forEach(f => {
      fs.copyFileSync(path.join(DB_DIR, f), path.join(snapshotFolder, f));
    });
    console.log(`[Super DB Backup] Snapshot created: ${path.basename(snapshotFolder)} (${files.length} tables backed up)`);
  } catch (err) {
    console.error('[Super DB Backup Error]:', err.message);
  }
}

// Initial snapshot on startup
createBackupSnapshot();

// Periodic automatic snapshot every hour
setInterval(createBackupSnapshot, 60 * 60 * 1000);

// ========================================================
// 3. GOHIGHLEVEL (GHL) CRM INTEGRATION ENGINE
// ========================================================
async function syncToGHL(eventType, payload) {
  const config = readDb('config.json', {});
  const locationId = process.env.GHL_LOCATION_ID || config.ghl_location_id || 'FZk2lJCGtgBs4vri470h';
  const apiKey = process.env.GHL_API_KEY || config.ghl_api_key || '';
  const webhookUrl = process.env.GHL_WEBHOOK_URL || config.ghl_webhook_url || '';

  console.log(`[GoHighLevel CRM] ⚡ Triggered event "${eventType}" for Location: ${locationId}`);

  // 1. Webhook Dispatch (Instant Trigger for GHL Automations)
  if (webhookUrl) {
    try {
      const resp = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'ARVÉN Luxury Timepieces',
          eventType,
          locationId,
          timestamp: new Date().toISOString(),
          data: payload
        })
      });
      console.log(`[GoHighLevel Webhook] ✅ Dispatched ${eventType} -> HTTP ${resp.status}`);
    } catch (err) {
      console.error(`[GoHighLevel Webhook Error]:`, err.message);
    }
  }

  // 2. Direct GoHighLevel REST API Dispatch
  if (apiKey) {
    try {
      let contactData = { locationId };
      if (eventType === 'NEW_ORDER') {
        const parts = (payload.client_name || '').trim().split(' ');
        contactData.firstName = parts[0] || 'VIP';
        contactData.lastName = parts.slice(1).join(' ') || 'Client';
        contactData.name = payload.client_name;
        contactData.email = payload.client_email;
        contactData.phone = payload.client_phone;
        contactData.tags = ['ARVEN-CUSTOMER', 'VIP-COMMISSION', `ORDER-${payload.id}`];
        contactData.customFields = [
          { key: 'order_id', field_value: payload.id },
          { key: 'order_total', field_value: `$${payload.total}` }
        ];
      } else if (eventType === 'VIP_INQUIRY') {
        const parts = (payload.name || '').trim().split(' ');
        contactData.firstName = parts[0] || 'VIP';
        contactData.lastName = parts.slice(1).join(' ') || 'Connoisseur';
        contactData.name = payload.name;
        contactData.email = payload.email;
        contactData.phone = payload.phone;
        contactData.tags = ['ARVEN-SALON-INQUIRY', payload.inquiry_type || 'VIP-Bespoke'];
      } else if (eventType === 'NEWSLETTER') {
        contactData.email = payload.email;
        contactData.tags = ['ARVEN-NEWSLETTER-SUBSCRIBER'];
      }

      if (contactData.email || contactData.phone) {
        const ghlRes = await fetch('https://services.leadconnectorhq.com/contacts/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
            'Version': '2021-07-28'
          },
          body: JSON.stringify(contactData)
        });
        console.log(`[GoHighLevel API] ✅ Contact synced to Location ${locationId} -> HTTP ${ghlRes.status}`);
      }
    } catch (err) {
      console.error(`[GoHighLevel API Error]:`, err.message);
    }
  }
}

// ========================================================
// 4. REST API HELPERS & VALIDATION
// ========================================================
function parseBody(req) {
  return new Promise((resolve) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
  });
  res.end(JSON.stringify(data));
}

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.ts': 'application/javascript; charset=utf-8',
  '.tsx': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.sql': 'text/plain; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8'
};

const startTime = Date.now();

// ========================================================
// 4. HTTP SERVER & REST ROUTER
// ========================================================
const server = http.createServer(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
    });
    res.end();
    return;
  }

  const urlObj = new URL(req.url, `http://localhost:${PORT}`);
  const reqPath = urlObj.pathname;

  // ==========================================
  // REST API: SUPER DATABASE ENDPOINTS
  // ==========================================
  if (reqPath.startsWith('/api/')) {
    const query = Object.fromEntries(urlObj.searchParams);

    // --- System Status & Telemetry ---
    if (reqPath === '/api/status' && req.method === 'GET') {
      const products = readDb('products.json', []);
      const orders = readDb('orders.json', []);
      const inquiries = readDb('inquiries.json', []);
      const promos = readDb('promos.json', []);
      const subscribers = readDb('subscribers.json', []);

      return sendJson(res, 200, {
        status: 'online',
        database: 'ARVÉN Super Database (Enterprise ACID + Supabase Ready)',
        version: '2.0.0',
        uptimeSeconds: Math.floor((Date.now() - startTime) / 1000),
        tables: {
          products: products.length,
          orders: orders.length,
          inquiries: inquiries.length,
          promos: promos.length,
          subscribers: subscribers.length
        },
        supabaseCloudConfigured: Boolean(process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY),
        timestamp: new Date().toISOString()
      });
    }

    // --- 1. Products API ---
    if (reqPath === '/api/products' && req.method === 'GET') {
      let products = readDb('products.json', []);
      if (query.category && query.category !== 'all') {
        products = products.filter(p => p.category === query.category);
      }
      if (query.search) {
        const s = query.search.toLowerCase();
        products = products.filter(p => p.name.toLowerCase().includes(s) || (p.subtitle && p.subtitle.toLowerCase().includes(s)));
      }
      return sendJson(res, 200, { success: true, count: products.length, data: products });
    }

    if (reqPath.startsWith('/api/products/') && req.method === 'GET') {
      const id = decodeURIComponent(reqPath.replace('/api/products/', ''));
      const products = readDb('products.json', []);
      const match = products.find(p => p.id === id);
      if (match) return sendJson(res, 200, { success: true, data: match });
      return sendJson(res, 404, { success: false, message: 'Timepiece not found' });
    }

    if (reqPath === '/api/products' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.name || !body.price) {
        return sendJson(res, 400, { success: false, message: 'Product name and price are required' });
      }

      const products = readDb('products.json', []);
      const existingIdx = products.findIndex(p => p.id === body.id);
      const record = {
        id: body.id || `arven-${body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`,
        name: body.name.toUpperCase().trim(),
        subtitle: body.subtitle || '',
        price: parseFloat(body.price) || 3950,
        category: body.category || 'classic',
        badge: body.badge || 'ATELIER SPECIAL',
        image: body.image || '/images/arven-exact-watch.png',
        size: body.size || '40mm',
        description: body.description || 'Precision Swiss horology.',
        specs: body.specs || { caseDiameter: '40 mm', movement: 'Calibre AV-105 Automatic' },
        color_options: body.color_options || body.colorOptions || [],
        stock: parseInt(body.stock, 10) || 10,
        updated_at: new Date().toISOString()
      };

      if (existingIdx >= 0) {
        products[existingIdx] = { ...products[existingIdx], ...record };
      } else {
        record.created_at = new Date().toISOString();
        products.unshift(record);
      }

      writeDbAtomic('products.json', products);
      return sendJson(res, 200, { success: true, data: record });
    }

    if (reqPath.startsWith('/api/products/') && req.method === 'DELETE') {
      const id = decodeURIComponent(reqPath.replace('/api/products/', ''));
      let products = readDb('products.json', []);
      const beforeCount = products.length;
      products = products.filter(p => p.id !== id);
      if (products.length !== beforeCount) {
        writeDbAtomic('products.json', products);
        return sendJson(res, 200, { success: true, message: `Archived timepiece ${id}` });
      }
      return sendJson(res, 404, { success: false, message: 'Timepiece not found' });
    }

    // --- 2. Orders & Live Tracking API ---
    if (reqPath === '/api/orders' && req.method === 'GET') {
      let orders = readDb('orders.json', []);
      if (query.status && query.status !== 'ALL') {
        orders = orders.filter(o => o.status === query.status);
      }
      return sendJson(res, 200, { success: true, count: orders.length, data: orders });
    }

    // Customer Live Order Tracking by Order ID
    if (reqPath.startsWith('/api/orders/') && req.method === 'GET') {
      const id = decodeURIComponent(reqPath.replace('/api/orders/', '')).trim().toUpperCase();
      const orders = readDb('orders.json', []);
      const match = orders.find(o => o.id.toUpperCase() === id);

      if (match) {
        return sendJson(res, 200, {
          success: true,
          order: match,
          trackingSummary: {
            orderId: match.id,
            clientName: match.client_name || match.clientName,
            status: match.status,
            total: match.total,
            itemsCount: match.items ? match.items.length : 1,
            estimatedDispatch: '2-4 Business Days via Armored Courier',
            atelierOrigin: 'ARVÉN Manufacture Atelier, Le Locle, Switzerland',
            authenticityCertificate: 'Verified Swiss Chronometer Standard'
          }
        });
      }
      return sendJson(res, 404, { success: false, message: `Commission #${id} not found in Atelier Archives.` });
    }

    if (reqPath === '/api/orders' && req.method === 'POST') {
      const body = await parseBody(req);
      const orders = readDb('orders.json', []);
      const products = readDb('products.json', []);

      const orderId = body.id || `AV-${Math.floor(100000 + Math.random() * 900000)}`;
      const now = new Date().toISOString();

      const newOrder = {
        id: orderId,
        client_name: (body.client_name || body.clientName || 'VIP Collector').trim(),
        client_email: (body.client_email || body.clientEmail || '').trim(),
        client_phone: (body.client_phone || body.clientPhone || '').trim(),
        shipping_address: body.shipping_address || body.shippingAddress || {},
        items: body.items || [],
        subtotal: parseFloat(body.subtotal) || parseFloat(body.total) || 0,
        discount: parseFloat(body.discount) || 0,
        promo_code: body.promo_code || body.promoCode || null,
        total: parseFloat(body.total) || 0,
        engraving: body.engraving || null,
        strap_choice: body.strap_choice || body.strapChoice || null,
        status: body.status || 'In Assembly',
        timeline: [
          { status: 'Commission Registered', timestamp: now, note: 'Order registered at Geneva Atelier.' },
          { status: 'In Assembly', timestamp: now, note: 'Calibre assembly initiated by Master Horologist.' }
        ],
        created_at: now,
        updated_at: now
      };

      // Automatic Stock Management (Decrement inventory stock for ordered items)
      if (Array.isArray(newOrder.items)) {
        newOrder.items.forEach(item => {
          const pMatch = products.find(p => p.id === (item.id || item.product?.id));
          if (pMatch && pMatch.stock > 0) {
            pMatch.stock = Math.max(0, pMatch.stock - (item.quantity || 1));
          }
        });
        writeDbAtomic('products.json', products);
      }

      orders.unshift(newOrder);
      writeDbAtomic('orders.json', orders);
      console.log(`[Super DB] ✨ Commission Registered: #${newOrder.id} | Total: $${newOrder.total} | Client: ${newOrder.client_name}`);

      // Auto-sync to GoHighLevel CRM
      syncToGHL('NEW_ORDER', newOrder);

      return sendJson(res, 201, { success: true, data: newOrder, id: newOrder.id });
    }

    if (reqPath.startsWith('/api/orders/') && (req.method === 'PATCH' || req.method === 'PUT')) {
      const id = decodeURIComponent(reqPath.replace('/api/orders/', '')).trim();
      const body = await parseBody(req);
      const orders = readDb('orders.json', []);
      const target = orders.find(o => o.id === id);

      if (target) {
        const prevStatus = target.status;
        Object.assign(target, body, { updated_at: new Date().toISOString() });

        if (body.status && body.status !== prevStatus) {
          if (!target.timeline) target.timeline = [];
          target.timeline.push({
            status: body.status,
            timestamp: new Date().toISOString(),
            note: `Status updated to ${body.status}`
          });
        }

        writeDbAtomic('orders.json', orders);
        return sendJson(res, 200, { success: true, data: target });
      }
      return sendJson(res, 404, { success: false, message: 'Order not found' });
    }

    // --- 3. Inquiries API ---
    if (reqPath === '/api/inquiries' && req.method === 'GET') {
      const inquiries = readDb('inquiries.json', []);
      return sendJson(res, 200, { success: true, count: inquiries.length, data: inquiries });
    }

    if (reqPath === '/api/inquiries' && req.method === 'POST') {
      const body = await parseBody(req);
      const inquiries = readDb('inquiries.json', []);
      const refNum = body.id || `ARV-VIP-${Math.floor(1000 + Math.random() * 9000)}`;

      const newInquiry = {
        id: refNum,
        name: (body.name || 'Valued Connoisseur').trim(),
        email: (body.email || '').trim(),
        phone: (body.phone || 'N/A').trim(),
        inquiry_type: body.inquiry_type || body.type || 'Bespoke 3D Commission',
        model_interest: body.model_interest || body.model || 'All Timepieces',
        notes: body.notes || body.message || '',
        video_call: Boolean(body.video_call ?? body.videoCall),
        catalog_requested: Boolean(body.catalog_requested ?? body.catalog),
        status: body.status || 'New',
        created_at: new Date().toISOString()
      };

      inquiries.unshift(newInquiry);
      writeDbAtomic('inquiries.json', inquiries);
      console.log(`[Super DB] ✉️ VIP Salon Dossier: #${newInquiry.id} from ${newInquiry.name}`);

      // Auto-sync to GoHighLevel CRM
      syncToGHL('VIP_INQUIRY', newInquiry);

      return sendJson(res, 201, { success: true, data: newInquiry, id: newInquiry.id });
    }

    if (reqPath.startsWith('/api/inquiries/') && (req.method === 'PATCH' || req.method === 'PUT')) {
      const id = decodeURIComponent(reqPath.replace('/api/inquiries/', ''));
      const body = await parseBody(req);
      const inquiries = readDb('inquiries.json', []);
      const target = inquiries.find(i => i.id === id);

      if (target) {
        Object.assign(target, body, { updated_at: new Date().toISOString() });
        writeDbAtomic('inquiries.json', inquiries);
        return sendJson(res, 200, { success: true, data: target });
      }
      return sendJson(res, 404, { success: false, message: 'Inquiry not found' });
    }

    // --- 4. Promo Codes API ---
    if (reqPath === '/api/promos' && req.method === 'GET') {
      const promos = readDb('promos.json', []);
      return sendJson(res, 200, { success: true, count: promos.length, data: promos });
    }

    if (reqPath === '/api/promos/validate' && req.method === 'POST') {
      const body = await parseBody(req);
      const code = (body.code || '').trim().toUpperCase();
      const promos = readDb('promos.json', []);
      const match = promos.find(p => p.code.toUpperCase() === code && (p.status || 'Active') === 'Active');

      if (match) {
        return sendJson(res, 200, { success: true, valid: true, promo: match });
      }
      return sendJson(res, 404, { success: false, valid: false, message: 'Invalid or expired promotional privilege code.' });
    }

    if (reqPath === '/api/promos' && req.method === 'POST') {
      const body = await parseBody(req);
      if (!body.code || !body.discount) {
        return sendJson(res, 400, { success: false, message: 'Code and discount are required' });
      }

      const promos = readDb('promos.json', []);
      const cleanCode = body.code.trim().toUpperCase();
      const idx = promos.findIndex(p => p.code.toUpperCase() === cleanCode);

      const record = {
        code: cleanCode,
        discount: parseInt(body.discount, 10) || 10,
        target: body.target || 'VIP Connoisseur Allocation',
        status: body.status || 'Active',
        created_at: new Date().toISOString()
      };

      if (idx >= 0) promos[idx] = { ...promos[idx], ...record };
      else promos.unshift(record);

      writeDbAtomic('promos.json', promos);
      return sendJson(res, 200, { success: true, data: record });
    }

    if (reqPath.startsWith('/api/promos/') && req.method === 'DELETE') {
      const code = decodeURIComponent(reqPath.replace('/api/promos/', '')).toUpperCase();
      let promos = readDb('promos.json', []);
      promos = promos.filter(p => p.code.toUpperCase() !== code);
      writeDbAtomic('promos.json', promos);
      return sendJson(res, 200, { success: true, message: `Archived code ${code}` });
    }

    // --- 5. Subscribers API ---
    if (reqPath === '/api/subscribers' && req.method === 'POST') {
      const body = await parseBody(req);
      const subscribers = readDb('subscribers.json', []);
      const email = (body.email || '').trim().toLowerCase();

      if (email && email.includes('@')) {
        if (!subscribers.some(s => s.email.toLowerCase() === email)) {
          subscribers.push({ email, created_at: new Date().toISOString() });
          writeDbAtomic('subscribers.json', subscribers);
        }
        syncToGHL('NEWSLETTER', { email });
        return sendJson(res, 200, { success: true, message: 'Subscribed to ARVÉN Society' });
      }
      return sendJson(res, 400, { success: false, message: 'Valid email required' });
    }

    // --- 6. Export Ledger API (CSV / JSON) ---
    if (reqPath.startsWith('/api/export/')) {
      const table = reqPath.replace('/api/export/', '');
      const validTables = ['orders', 'products', 'inquiries', 'promos', 'subscribers'];
      if (validTables.includes(table)) {
        const data = readDb(`${table}.json`, []);
        res.writeHead(200, {
          'Content-Type': 'application/json',
          'Content-Disposition': `attachment; filename="arven_${table}_${Date.now()}.json"`
        });
        return res.end(JSON.stringify(data, null, 2));
      }
    }

    // --- 7. Config API ---
    if (reqPath === '/api/config' && req.method === 'GET') {
      const config = readDb('config.json', {});
      return sendJson(res, 200, {
        success: true,
        data: {
          ...config,
          env_supabase_url: process.env.SUPABASE_URL || '',
          env_supabase_key: process.env.SUPABASE_ANON_KEY ? '••••••••' : '',
          ghl_location_id: process.env.GHL_LOCATION_ID || config.ghl_location_id || 'FZk2lJCGtgBs4vri470h',
          ghl_webhook_url: process.env.GHL_WEBHOOK_URL || config.ghl_webhook_url || '',
          has_ghl_key: Boolean(process.env.GHL_API_KEY || config.ghl_api_key)
        }
      });
    }

    if (reqPath === '/api/config' && req.method === 'POST') {
      const body = await parseBody(req);
      const config = readDb('config.json', {});
      const updated = { ...config, ...body, updated_at: new Date().toISOString() };
      writeDbAtomic('config.json', updated);
      return sendJson(res, 200, { success: true, data: updated });
    }

    // --- 8. Admin Authentication API ---
    if (reqPath === '/api/admin/login' && req.method === 'POST') {
      const body = await parseBody(req);
      const username = (body.username || '').trim();
      const password = (body.password || '').trim();

      // Required credentials:
      // Username: "ARVINs collections"
      // Password: "12@arvin"
      if (username === 'ARVINs collections' && password === '12@arvin') {
        const token = `arven_sec_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
        console.log(`[Super DB Security] 👑 Director logged in: "${username}" at ${new Date().toLocaleTimeString()}`);
        return sendJson(res, 200, {
          success: true,
          message: 'Director Authenticated Successfully',
          token,
          user: {
            username: 'ARVINs collections',
            role: 'Atelier Director & Master Connoisseur'
          }
        });
      }

      console.warn(`[Super DB Security] ⚠️ Failed login attempt with username: "${username}"`);
      return sendJson(res, 401, {
        success: false,
        message: 'Invalid Director Credentials. Access Denied.'
      });
    }

    // --- 9. GoHighLevel (GHL) Dedicated API ---
    if (reqPath === '/api/ghl/config' && req.method === 'GET') {
      const config = readDb('config.json', {});
      return sendJson(res, 200, {
        success: true,
        data: {
          location_id: process.env.GHL_LOCATION_ID || config.ghl_location_id || 'FZk2lJCGtgBs4vri470h',
          webhook_url: process.env.GHL_WEBHOOK_URL || config.ghl_webhook_url || '',
          has_api_key: Boolean(process.env.GHL_API_KEY || config.ghl_api_key)
        }
      });
    }

    if (reqPath === '/api/ghl/config' && req.method === 'POST') {
      const body = await parseBody(req);
      const config = readDb('config.json', {});
      const updated = {
        ...config,
        ghl_location_id: body.location_id || body.locationId || config.ghl_location_id || 'FZk2lJCGtgBs4vri470h',
        ghl_webhook_url: body.webhook_url || body.webhookUrl || config.ghl_webhook_url || '',
        ghl_api_key: body.api_key || body.apiKey || config.ghl_api_key || '',
        updated_at: new Date().toISOString()
      };
      writeDbAtomic('config.json', updated);
      console.log(`[GoHighLevel Config] Settings updated: Location ID = ${updated.ghl_location_id}`);
      return sendJson(res, 200, { success: true, message: 'GoHighLevel settings updated', data: updated });
    }

    if (reqPath === '/api/ghl/test' && req.method === 'POST') {
      const testPayload = {
        id: `TEST-${Math.floor(1000 + Math.random() * 9000)}`,
        client_name: 'ARVÉN VIP Connoisseur (Test Ping)',
        client_email: 'vip.test@arven-geneva.ch',
        client_phone: '+41 22 819 9000',
        total: 4200,
        model: 'Royal Tourbillon 40mm'
      };
      await syncToGHL('TEST_PING', testPayload);
      return sendJson(res, 200, {
        success: true,
        message: 'Test event dispatched to GoHighLevel CRM.',
        locationId: process.env.GHL_LOCATION_ID || 'FZk2lJCGtgBs4vri470h'
      });
    }

    return sendJson(res, 404, { success: false, message: 'API Endpoint not found' });
  }

  // ==========================================
  // STATIC FILES HANDLER & URL REWRITES
  // ==========================================
  let cleanPath = reqPath;
  if (cleanPath === '/' || cleanPath === '') {
    cleanPath = '/index.html';
  } else if (cleanPath === '/admin' || cleanPath === '/admin/') {
    cleanPath = '/admin.html';
  }

  const filePath = path.join(__dirname, cleanPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      const indexPath = path.join(__dirname, 'index.html');
      fs.readFile(indexPath, (readErr, content) => {
        if (readErr) {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
      });
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
        return;
      }
      res.writeHead(200, {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`=============================================================`);
  console.log(`✨ ARVÉN Luxury Timepieces — Professional Enterprise Database`);
  console.log(`🌐 Public Boutique:        http://localhost:${PORT}`);
  console.log(`👑 Director Admin Portal:  http://localhost:${PORT}/admin.html`);
  console.log(`⚡ Live Telemetry Status:  http://localhost:${PORT}/api/status`);
  console.log(`📦 Orders Tracking Engine: http://localhost:${PORT}/api/orders/AV-892104`);
  console.log(`=============================================================`);
});
