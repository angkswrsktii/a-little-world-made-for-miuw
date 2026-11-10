// ══════════════════════════════════════════════════════════════
//  DATA FOTO MIUW
//  Daftar foto (src, lebar, tinggi) dibuat otomatis oleh
//  scripts/optimize-images.mjs → src/data/photoManifest.js
//  Caption, rotasi & washi tape diatur di sini.
// ══════════════════════════════════════════════════════════════

import { photoManifest } from './photoManifest.js';
import { birthdayConfig } from './config.js';

// Caption generik (jangan mengarang tanggal/tempat/peristiwa)
const CAPTIONS = [
  'Simply beautiful, Miuw.',
  'A lovely little moment.',
  'A smile worth celebrating.',
  'Forever lovely.',
  'Just being you.',
];

// Rotasi kecil yang seimbang (derajat) untuk nuansa scrapbook
const ROTATIONS = [-2.2, 1.6, -1.1, 2.4, -1.8, 1.2, -2.6, 2, -1.4, 1.8, -2, 1.1];

// Pola washi tape per kartu (null = tanpa tape)
const TAPES = ['blush', 'rose', null, 'ivory', null, 'blush', null, 'rose', null, 'ivory', null, null];

export const photos = photoManifest.map((p, i) => ({
  ...p,
  id: `${p.file}-${i}`,
  caption: CAPTIONS[i % CAPTIONS.length],
  rotation: ROTATIONS[i % ROTATIONS.length],
  tape: TAPES[i % TAPES.length],
  alt: `Photo of ${birthdayConfig.name}`,
}));

const findBySrc = (src) => photos.find((p) => p.src === src);

// Foto hero & foto penutup — dikontrol lewat src/data/config.js
export const heroPhoto = findBySrc(birthdayConfig.heroImage) ?? photos[0];
export const closingPhoto =
  findBySrc(birthdayConfig.closingImage) ?? photos[photos.length - 1] ?? photos[0];
