# ARVÉN Luxury Timepieces — Supabase (Super Database) Setup Guide

Yeh guide aapko **Supabase ("Super Database")** ko apne ARVÉN Luxury Watches project ke sath connect karne ka step-by-step tareeqa batati hai.

---

## 🚀 Quick Setup (2 Minutes / 2 Minute ka Kaam)

### Step 1: Create a Free Supabase Project
1. Open [https://supabase.com](https://supabase.com) aur **Start your project** (Free Account) par click karein.
2. Naya project banayein:
   - **Project Name:** `arven-timepieces` (ya koi bhi naam)
   - **Database Password:** Strong password set karein aur save kar lein.
   - **Region:** Apni pasandeeda region select karein (e.g. Frankfurt / Singapore).
3. **Create New Project** par click karein (10-20 seconds me database ready ho jayega).

---

### Step 2: Run Database Schema (Tables & Sample Data)
1. Supabase Dashboard ke left menu me **SQL Editor** (`>_` icon) par click karein.
2. **New query** par click karein.
3. Is project ki [`supabase-schema.sql`](./supabase-schema.sql) file ka sara code copy karein aur SQL Editor me paste karein.
4. Bottom right me **RUN** (ya `Ctrl + Enter`) par click karein.
5. `Success. No rows returned` show hoga — Is se aapki sari tables ready ho jayengi:
   - `products` (All 8 handcrafted luxury timepieces with specs & prices)
   - `orders` (Client commissions, custom engravings, addresses & totals)
   - `inquiries` (VIP Atelier Salon bookings & concierge dossiers)
   - `promos` (VIP Privilege discount codes like `ARVEN10`, `GENEVA20`, `BESPOKE15`)
   - `subscribers` (Newsletter subscribers)

---

### Step 3: Copy Supabase Credentials (URL & Anon Key)
1. Supabase Dashboard me bottom left par **Project Settings** (⚙️ icon) par click karein.
2. **API** tab me jayein:
   - **Project URL:** Copy karein (e.g. `https://xyzabcdefghijkl.supabase.co`)
   - **Project API keys (`anon` `public`):** Copy karein (e.g. `eyJhbGciOi...`)

---

### Step 4: Connect in Admin Dashboard (1-Click Connection)
1. Apni website open karein aur **Admin Panel** me jayein:
   - Direct link: [http://localhost:3000/admin](http://localhost:3000/admin) (ya `/admin.html`)
   - Ya website par keyboard shortcut press karein: `Ctrl + Shift + A`
   - **Director Login Credentials:**
     - **Username:** `ARVINs collections`
     - **Password:** `12@arvin`
2. Top bar me **"Supabase Cloud: Local"** ya sidebar me **"⚡ Supabase Cloud DB"** par click karein.
3. Modal khulay ga:
   - **Project URL** me paste karein
   - **Anon Public API Key** me paste karein
4. **"⚡ Test Connection"** par click karein taake connection verify ho sake.
5. **"SAVE & CONNECT SUPABASE"** par click karein.
6. Agar chahain to **"🌱 Seed Initial Data"** button dabayein taake default luxury catalog cloud me populate ho jaye!

---

## 🌟 Key Features Enabled by Supabase:

| Feature | Description |
| :--- | :--- |
| **Dynamic Products Catalog** | Admin panel ya Supabase table me watch add/edit karein, live website par foran update ho jayegi. |
| **Live Order Commissions** | Customer checkout karega to live order `orders` table me save hoga with unique tracking ID (e.g. `AV-892104`). |
| **VIP Atelier Salon Booking** | Contact page se VIP clients ke consultation requests `inquiries` table me live sync honge. |
| **VIP Promo Codes** | Admin panel se discount codes banayein (e.g. `VIP25`), checkout foran validate karega. |
| **Newsletter Cloud Sync** | Footers se subscribers seedha `subscribers` table me capture honge. |
| **Smart Offline Fallback** | Agar Supabase keys na bhi daali hon to system **LocalStorage Cache** par 100% smooth chalta rahega — website kabhi break nahi hogi! |

---

## 📁 Files Created for this Integration:
- [`supabase-schema.sql`](./supabase-schema.sql) — PostgreSQL Database Schema + RLS Security Policies + Seed Data.
- [`supabaseClient.js`](./supabaseClient.js) — Universal JavaScript Client & CRUD helper for storefront and admin dashboard.
- [`src/lib/supabase.ts`](./src/lib/supabase.ts) — TypeScript Supabase Client for React/Vite.
- [`admin.html`](./admin.html) — Admin Dashboard with live connection health pill, credentials manager & seed tool.
- [`app.js`](./app.js) — Storefront connected to live database.

---
*ARVÉN — Haute Horlogerie & Bespoke Watchmaking*
