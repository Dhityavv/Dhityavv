# Dhitya Nurhadi (Dhityavv) — Portfolio V2

Modern, production-ready portfolio web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **Lucide React**.

## 🚀 Fitur Utama

- **Tech Stack Modern:** Dibangun menggunakan Next.js App Router, TypeScript murni (type-safe), dan Tailwind CSS dengan desain tokenized.
- **Bilingual i18n Reaktif (EN | ID):** Toggle bahasa instan tanpa refresh/reload halaman, persist di `localStorage`, dan merender teks secara dinamis di seluruh komponen, modal, serta resume.
- **Dark & Light Mode:** Didukung `next-themes` dengan palet warna teknis yang konsisten (Dark mode default, Light mode secondary).
- **Animasi Halus & Interaktif:**
  - Masked line reveal & blur-to-sharp pada headline hero.
  - Slot teks peran dinamis berputar vertikal (*Front-End Developer*, *3D & Animation Artist*, *Creative Technologist*).
  - Efek hover *scramble text* ala cyberpunk/terminal pada tombol dan navigasi.
  - Sliding pill indicator berbasis *spring physics* (Framer Motion `layoutId`) pada tab filter proyek.
- **Studi Kasus Detail (Modal):**
  - Kartu proyek dengan ilustrasi vektor presisi (Grainox UI, Minecraft Fabric Bookshelf Mixin, Creative Campus Blueprint, LKPD Production Tracker).
  - Modal studi kasus lengkap dengan perincian peran, status, ikhtisar, sorotan teknis, tech stack, dan tautan live.
- **Printable ATS-Friendly CV (1 Halaman):**
  - Modal pratinjau CV dengan tombol cetak langsung (`window.print()`).
  - Dilengkapi CSS `@media print` khusus: hasil cetak / save PDF otomatis berformat hitam-putih bersih, rapi, dan lolos uji ATS scanner.
- **Dual-Mode Contact System:**
  - Quick action: Tombol email langsung dengan subjek & template otomatis sesuai bahasa aktif.
  - Tautan kontak sosial: **WhatsApp direct chat**, **GitHub profile**, **Instagram**, dan **Discord** (klik untuk menyalin `@dhityavv` beserta toast notification).
  - Modal formulir pesan langsung (*Direct Message Form*).

---

## 📁 Struktur Direktori

```
Dhitya Portfolio V2/
├── src/
│   ├── app/
│   │   ├── globals.css         # Desain token, tema, animasi shimmer, & print stylesheet
│   │   ├── layout.tsx          # Font (Inter, Plus Jakarta Sans, JetBrains Mono) & Root Providers
│   │   └── page.tsx            # Halaman utama portofolio
│   ├── components/
│   │   ├── Navbar.tsx          # Navigasi sticky glass, logo monogram, language & theme switcher
│   │   ├── Hero.tsx            # Headline bertingkat, live status badge, rotating roles & metric strip
│   │   ├── Projects.tsx        # Filter proyek dan grid kartu interaktif
│   │   ├── ProjectCardVisual.tsx # Visualisasi blueprint teknikal berbasis SVG
│   │   ├── Experience.tsx      # Garis waktu pengalaman & pendidikan
│   │   ├── Skills.tsx          # Pembagian kompetensi teknis (Web, 3D, Systems)
│   │   ├── Contact.tsx         # Kontak cepat & urutan sosial media
│   │   ├── CaseStudyModal.tsx  # Modal detail studi kasus
│   │   ├── CvModal.tsx         # Modal preview & cetak CV ATS-friendly
│   │   ├── ContactFormModal.tsx# Modal formulir kirim pesan
│   │   ├── ScrambleText.tsx    # Komponen efek animasi teks scramble
│   │   ├── ThemeProvider.tsx   # Provider tema next-themes
│   │   └── Toast.tsx           # Notifikasi mengambang saat menyalin username
│   ├── context/
│   │   ├── LanguageContext.tsx # State manajemen bilingual (EN/ID)
│   │   └── ModalContext.tsx    # State kontrol modal & toast
│   ├── data/
│   │   ├── portfolioData.ts    # Data proyek, pengalaman, keahlian, & tautan sosial
│   │   └── translations.ts     # Kamus terjemahan EN dan ID
│   └── types/
│       └── portfolio.ts        # TypeScript interface & types
├── package.json
└── tsconfig.json
```

---

## 🛠️ Cara Menjalankan Secara Lokal

1. **Pastikan Node.js terpasang** (disarankan Node.js v18 ke atas atau v20+).
2. **Jalankan development server:**
   ```bash
   npm run dev
   ```
3. Buka browser di [http://localhost:3000](http://localhost:3000).

---

## 📦 Build untuk Produksi & Deploy

Untuk menguji build produksi:
```bash
npm run build
npm run start
```

Portofolio ini dioptimalkan 100% untuk deploy satu klik di **[Vercel](https://vercel.com)** atau platform hosting modern lainnya.

---

## 📝 Mengubah Konten Portofolio

Semua data tersentralisasi di folder `src/data/`:
- Edit `src/data/portfolioData.ts` untuk menambah atau mengganti proyek, riwayat pengalaman, dan skill.
- Edit `src/data/translations.ts` jika ingin menyesuaikan kata-kata dalam bahasa Inggris maupun Indonesia.
