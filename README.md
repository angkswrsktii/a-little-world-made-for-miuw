# A Little World Made for Miuw ♡

Sebuah website ulang tahun personal & interaktif — dibuat khusus untuk Miuw.

> *"Every little detail is made to celebrate you."*

---

## ✨ Fitur

1. **Opening Surprise** — halaman pembuka full-screen dengan kelopak bunga, sparkles & tombol "Open Your Gift ♡" (meledakkan partikel hati).
2. **Hero** — "Happy Birthday, MIUW" dengan foto utama berbingkai elegan, badge berputar, parallax halus, dan catatan tulisan tangan.
3. **A Gallery of Miuw** — galeri masonry gaya polaroid/scrapbook (washi tape, caption tulisan tangan, film grain) + **lightbox** (klik, navigasi panah/swipe, keyboard Esc/←/→).
4. **Little Things That Make Miuw Special** — 6 kartu flip interaktif dengan pesan romantis.
5. **A Little Letter Just for Miuw** — amplop wax-seal yang dibuka → surat dengan efek typewriter & reveal paragraf + tanda tangan tulisan tangan.
6. **Wishes for Your New Chapter** — balon, kue ulang tahun ber-flame animasi, dan tombol "Make a Wish, Miuw! ✨" (confetti + hati + balon terbang).
7. **One Last Surprise** — foto reveal sinematik + tombol **Replay** untuk mengulang pengalaman dari awal.
8. **Back to top**, smooth scrolling, `prefers-reduced-motion` support, lazy loading, dan pemutar musik (aktif otomatis hanya jika file musik disediakan).

## 📁 Struktur Folder

```
├── public/
│   ├── images/          # hasil optimasi foto (miuw-01.jpg … miuw-42.jpg)
│   └── music/           # (opsional) taruh file musik di sini
├── scripts/
│   └── optimize-images.mjs  # konverter foto asli → public/images + manifest
├── src/
│   ├── components/      # AmbientParticles, FloralDecor, Lightbox, MusicPlayer, dll.
│   ├── sections/        # OpeningSurprise, Hero, Gallery, LittleThings, Letter, Wishes, FinalSurprise
│   ├── data/
│   │   ├── config.js        # ♥ KONFIGURASI UTAMA (nama, foto, musik, tanda tangan)
│   │   ├── memories.js      # daftar foto + caption + rotasi scrapbook
│   │   ├── photoManifest.js # (auto-generated) dimensi foto
│   │   ├── letterData.js    # isi surat
│   │   ├── littleThings.js  # isi kartu flip
│   │   └── wishes.js        # daftar wish
│   ├── utils/confetti.js    # partikel confetti & hati (canvas)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── *.jpg               # foto asli Miuw (sumber, jangan dihapus)
```

## 🔧 Mengedit Konten

| Ingin mengubah…            | Buka file                          |
| -------------------------- | ---------------------------------- |
| Nama, panggilan, tanda tangan | `src/data/config.js`           |
| Foto hero & foto penutup   | `src/data/config.js` (`heroImage`, `closingImage`) |
| Caption galeri             | `src/data/memories.js` (`CAPTIONS`) |
| Isi surat                  | `src/data/letterData.js`           |
| Pesan kartu flip           | `src/data/littleThings.js`         |
| Daftar wish                | `src/data/wishes.js`               |
| Musik latar                | `src/data/config.js` (`musicSrc`)  |

**Menambah foto baru:** taruh file `.jpg` di root project → jalankan `npm run optimize` → selesai (galeri & manifest ter-update otomatis).

**Mengaktifkan musik:** taruh file (mis. `our-song.mp3`) di `public/music/`, lalu isi `musicSrc: '/music/our-song.mp3'` di `src/data/config.js`. Tanpa file musik, pemutar otomatis disembunyikan.

## ▶️ Menjalankan Project

```bash
npm install      # sekali saja
npm run dev      # buka http://localhost:5173
```

> `npm run optimize` hanya perlu dijalankan lagi jika foto di root berubah.

## 📦 Production Build

```bash
npm run build    # output → dist/
npm run preview  # tes hasil build di http://localhost:4173
```

## 🚀 Deploy ke Vercel

**Cara 1 — GitHub + Vercel Dashboard (disarankan):**

1. Push project ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "A little world made for Miuw ♡"
   git branch -M main
   git remote add origin https://github.com/USERNAME/a-little-world-made-for-miuw.git
   git push -u origin main
   ```
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repository GitHub-nya.
3. Vercel otomatis mendeteksi **Vite** (framework: Vite, build: `npm run build`, output: `dist`). Klik **Deploy** — tidak perlu environment variable apa pun.

**Cara 2 — Vercel CLI:**

```bash
npm i -g vercel
vercel        # preview deploy
vercel --prod # production deploy
```

---

Made with love, just for Miuw. ❤️
