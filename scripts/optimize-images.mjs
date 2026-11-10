// ══════════════════════════════════════════════════════════════
//  Optimasi foto Miuw:
//  • Membaca semua .jpg/.png di root project (foto asli, tidak diubah)
//  • Menghasilkan versi teroptimasi di public/images/miuw-XX.jpg
//  • Menulis src/data/photoManifest.js (src + dimensi, anti layout-shift)
//
//  Jalankan:  npm run optimize
// ══════════════════════════════════════════════════════════════

import { readdir, writeFile, mkdir, stat, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST_PATH = path.join(ROOT, 'src', 'data', 'photoManifest.js');

const MAX_EDGE = 1800; // sisi terpanjang (px)
const QUALITY = 82; // kualitas JPEG

// File kerja/desain yang BUKAN foto asli Miuw (sheet QA cutout, contoh, dll.)
// — tidak dimasukkan ke galeri website.
const EXCLUDE_PATTERNS = [
  /^check_.*\.(png|jpe?g)$/i, // sheet QA hasil proses cutout/fix
  /^contoh\.\w+$/i, // contoh/screenshot referensi
  /^story_instagram\.\w+$/i, // draf desain Instagram story
];

const isExcluded = (f) => EXCLUDE_PATTERNS.some((p) => p.test(f));

// Urutkan berdasarkan tanggal di nama file (IMG_2026MMDD...)
const dateOf = (f) => f.match(/(\d{8})/)?.[1] ?? '00000000';

async function main() {
  if (!existsSync(OUT_DIR)) await mkdir(OUT_DIR, { recursive: true });

  // Bersihkan hasil generate sebelumnya agar tidak ada file basi
  for (const f of await readdir(OUT_DIR)) {
    if (/^miuw-\d+\.jpg$/i.test(f)) await rm(path.join(OUT_DIR, f));
  }

  const all = await readdir(ROOT);
  const sources = all
    .filter((f) => /\.(jpe?g|png)$/i.test(f) && !isExcluded(f))
    .sort((a, b) => dateOf(a).localeCompare(dateOf(b)) || a.localeCompare(b));

  if (sources.length === 0) {
    console.log('Tidak ada foto ditemukan di root project — manifest tidak diubah.');
    return;
  }

  const entries = [];
  let bytesIn = 0;
  let bytesOut = 0;

  for (let i = 0; i < sources.length; i++) {
    const srcName = sources[i];
    const file = `miuw-${String(i + 1).padStart(2, '0')}.jpg`;
    const inPath = path.join(ROOT, srcName);
    const outPath = path.join(OUT_DIR, file);

    const info = await sharp(inPath)
      .rotate() // patuhi orientasi EXIF (foto HP sering diputar via metadata)
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: 'inside', withoutEnlargement: true })
      .flatten({ background: '#FFFFFF' }) // aman untuk PNG transparan
      .jpeg({ quality: QUALITY, mozjpeg: true })
      .toFile(outPath);

    const { size: inSize } = await stat(inPath);
    bytesIn += inSize;
    bytesOut += info.size;

    entries.push({ file, src: `/images/${file}`, width: info.width, height: info.height });
    console.log(`✓ ${srcName} → ${file} (${info.width}×${info.height})`);
  }

  const header =
    '// ⚠️ AUTO-GENERATED oleh scripts/optimize-images.mjs — jangan edit manual.\n' +
    '// Jalankan `npm run optimize` setelah menambah/mengubah foto di root project.\n\n' +
    `export const photoManifest = ${JSON.stringify(entries, null, 2)};\n`;

  await writeFile(MANIFEST_PATH, header, 'utf8');

  console.log(`\n${entries.length} foto siap → public/images/`);
  console.log(`Manifest ditulis → src/data/photoManifest.js`);
  console.log(
    `Total ukuran: ${(bytesIn / 1048576).toFixed(1)} MB → ${(bytesOut / 1048576).toFixed(1)} MB`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
