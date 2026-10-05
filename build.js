import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dist = path.join(__dirname, 'dist');
if (fs.existsSync(dist)) {
  fs.rmSync(dist, { recursive: true, force: true });
}
fs.mkdirSync(dist, { recursive: true });

function copyRecursive(src, dest) {
  if (!fs.existsSync(src)) return;
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    fs.readdirSync(src).forEach(child => {
      copyRecursive(path.join(src, child), path.join(dest, child));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

// Copy essential root files to dist
const filesToCopy = [
  'index.html',
  'admin.html',
  'app.js',
  'supabaseClient.js',
  'vercel.json',
  '_redirects'
];

filesToCopy.forEach(f => {
  const p = path.join(__dirname, f);
  if (fs.existsSync(p)) {
    fs.copyFileSync(p, path.join(dist, f));
  }
});

// Copy directories
const dirsToCopy = ['images', 'src', 'admin', 'database'];
dirsToCopy.forEach(d => {
  copyRecursive(path.join(__dirname, d), path.join(dist, d));
});

console.log('✅ ARVEN Luxury Timepieces Static Distribution Build Complete -> dist/');
