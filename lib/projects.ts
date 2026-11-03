export type ProjectStatus =
  | "Live"
  | "In Progress"
  | "Experimental"
  | "Coming Soon"
  | "Under Review on Modrinth";

export interface DeployedWebsite {
  id: string;
  title: string;
  clientName: string;
  clientHandle?: string;
  clientInstagramUrl?: string;
  clientWhatsapp?: string;
  url: string;
  category: string;
  status: string;
  descriptionEn: string;
  descriptionId: string;
  deliverablesEn: string[];
  deliverablesId: string[];
}

export interface ClientWebsiteShowcase {
  clientName: string;
  clientRoleEn: string;
  clientRoleId: string;
  clientInstagram?: string;
  clientInstagramUrl?: string;
  clientWhatsapp?: string;
  usageDescriptionEn: string;
  usageDescriptionId: string;
  siteTypeEn: string;
  siteTypeId: string;
  deliverablesEn: string[];
  deliverablesId: string[];
  keyHighlightsEn: string[];
  keyHighlightsId: string[];
  liveStatusEn: string;
  liveStatusId: string;
  verifiedInUse: boolean;
  deployedWebsites: DeployedWebsite[];
}

export interface ProjectDetail {
  id: string;
  title: string;
  titleEn: string;
  titleId: string;
  subtitle: string;
  subtitleEn: string;
  subtitleId: string;
  category: "Full-Stack Web" | "Game Modding" | "Client Showcase";
  status: ProjectStatus;
  description: string;
  descriptionEn: string;
  descriptionId: string;
  techStack: string[];
  features: string[];
  featuresEn: string[];
  featuresId: string[];
  repoUrl: string;
  liveUrl?: string;
  liveLabel?: string;
  liveLabelEn?: string;
  liveLabelId?: string;
  featured?: boolean;
  longOverview?: string;
  longOverviewEn?: string;
  longOverviewId?: string;
  architecturePoints?: string[];
  architecturePointsEn?: string[];
  architecturePointsId?: string[];
  clientShowcase?: ClientWebsiteShowcase;
}

export const DEPLOYED_CLIENT_WEBSITES: DeployedWebsite[] = [
  {
    id: "juna-portfolio",
    title: "Juna — 3D Animator & LRC Portfolio",
    clientName: "Juna",
    clientHandle: "@sayycheseeeee",
    clientInstagramUrl: "https://www.instagram.com/sayycheseeeee",
    clientWhatsapp: "https://wa.me/6285183174542",
    url: "https://kejuuanimator-portfolio.vercel.app",
    category: "3D Animation & Video Exhibition",
    status: "Live in Production",
    descriptionEn:
      "Official production portfolio website built for professional 3D Animator & LRC Artist Juna (@sayycheseeeee). Features an ultra-fast zero-runtime vanilla stack, custom geometric portal SVG animation, and dual-render video modal.",
    descriptionId:
      "Website portofolio resmi produksi yang dibangun khusus untuk 3D Animator & LRC Artist profesional Juna (@sayycheseeeee). Menghadirkan stack vanilla ultra-cepat tanpa dependensi runtime, animasi portal geometris SVG kustom, dan modal video dual-render.",
    deliverablesEn: [
      "Responsive Portfolio Homepage with dynamic monochrome aesthetic",
      "Interactive All-Projects archive gallery with category filters",
      "Hardware-accelerated video dialog player (Final Render vs Viewport)",
      "Instant 1-tap WhatsApp consultation & Instagram connection",
    ],
    deliverablesId: [
      "Beranda portofolio responsif dengan estetika gelap monokromik dinamis",
      "Galeri arsip All-Projects interaktif dengan filter kategori proyek",
      "Pemutar video native HTML5 hardware-accelerated (Final Render vs Viewport)",
      "Tombol kontak langsung 1-ketukan ke WhatsApp klien & profil Instagram",
    ],
  },
];

export const PROJECTS: ProjectDetail[] = [
  {
    id: "client-showcase",
    title: "Project Showcase: Client Websites",
    titleEn: "Project Showcase: Client Websites",
    titleId: "Project Showcase: Hasil Pembuatan Website",
    subtitle: "Production Portfolio Websites — Live & In Active Use",
    subtitleEn: "Production Portfolio Websites — Live & In Active Use",
    subtitleId: "Website Portofolio Profesional Klien · Aktif Digunakan di Industri Animasi",
    category: "Client Showcase",
    status: "Live",
    featured: true,
    description:
      "Showcase of custom production websites engineered for clients and actively used in real-world creative industries. Featured is the official portfolio of 3D Animator & LRC Artist Juna (kejuuanimator-portfolio.vercel.app), engineered with a zero-runtime architecture for instant loading (<100ms), geometric SVG portal animation, and dual-render video comparison.",
    descriptionEn:
      "Showcase of custom production websites engineered for clients and actively used in real-world creative industries. Featured is the official portfolio of 3D Animator & LRC Artist Juna (kejuuanimator-portfolio.vercel.app), engineered with a zero-runtime architecture for instant loading (<100ms), geometric SVG portal animation, and dual-render video comparison.",
    descriptionId:
      "Showcase hasil pembuatan website kustom untuk klien yang telah live dan aktif digunakan. Salah satu karya unggulan adalah website portofolio resmi 3D Animator & LRC Artist (Juna / kejuuanimator-portfolio.vercel.app). Dibangun dengan arsitektur Zero-Dependency Vanilla yang menghasilkan kecepatan muat instan (<100ms), animasi portal SVG geometris yang memukau, navigasi glassmorphic modern, serta dual-render video showcase.",
    techStack: [
      "HTML5 Semantic",
      "Modern CSS3 Glassmorphism",
      "Pure JavaScript",
      "SVG Vector Animation",
      "Vercel Edge Network",
      "Responsive Layout",
    ],
    features: [
      "Actively used by industry clients for studio pitches and professional representation",
      "Zero-runtime dependency architecture (<100ms load time) with zero framework bloat",
      "Custom rotating geometric portal SVG animation with radial glow",
      "Dual-render video modal: instant switching between Final Render and Viewport Wireframe",
      "Mobile-first responsive design with direct WhatsApp & social booking integration",
    ],
    featuresEn: [
      "Actively used by industry clients for studio pitches and professional representation",
      "Zero-runtime dependency architecture (<100ms load time) with zero framework bloat",
      "Custom rotating geometric portal SVG animation with radial glow",
      "Dual-render video modal: instant switching between Final Render and Viewport Wireframe",
      "Mobile-first responsive design with direct WhatsApp & social booking integration",
    ],
    featuresId: [
      "Sudah aktif dipakai klien sebagai media portofolio resmi industri animasi",
      "Zero-runtime dependency (<100ms load time) tanpa framework berat di browser",
      "Intro animasi portal SVG geometris kustom dengan efek glow dinamis",
      "Dual-render video modal: toggle instan antara Final Render dan Viewport Render",
      "Desain responsif mobile-first dengan integrasi langsung WhatsApp & Instagram",
    ],
    repoUrl: "https://github.com/kejuuanimator/kejuuanimator",
    liveUrl: "https://kejuuanimator-portfolio.vercel.app",
    liveLabel: "Open Website",
    liveLabelEn: "Open Website",
    liveLabelId: "Buka Website",
    longOverview:
      "This project showcases professional web engineering and tailored design for clients who require long-lasting, ultra-fast websites with distinct visual identities. Built from scratch for 3D Animator & LRC Artist Juna, it delivers an interactive video exhibition where clients can compare final shaded renders against raw viewport geometry with zero lag.",
    longOverviewEn:
      "This project showcases professional web engineering and tailored design for clients who require long-lasting, ultra-fast websites with distinct visual identities. Built from scratch for 3D Animator & LRC Artist Juna, it delivers an interactive video exhibition where clients can compare final shaded renders against raw viewport geometry with zero lag.",
    longOverviewId:
      "Proyek ini membuktikan kapabilitas engineering dan desain web modern dalam mewujudkan website portofolio klien yang tahan lama, ultra-cepat, dan memiliki identitas visual kuat. Dibuat khusus untuk Juna, seorang 3D Animator dan LRC Artist, website ini menyajikan galeri video interaktif yang dapat membandingkan render final dengan viewport Blender secara real-time.",
    architecturePoints: [
      "Zero Runtime Overhead: Pure HTML5, CSS3, and Vanilla JS so browsers download zero heavy framework JavaScript bundles.",
      "Hardware-Accelerated Video Dialog: Native HTML5 dialog element optimized for 60 FPS video playback without stutter or frame drops.",
      "Custom Geometric Portal SVG: Trigonometrically calculated orbital vector emblem with dynamic radial gradients.",
      "Clean URL Architecture: Vercel routing rewrites /all-project to all-project.html without trailing file extensions.",
    ],
    architecturePointsEn: [
      "Zero Runtime Overhead: Pure HTML5, CSS3, and Vanilla JS so browsers download zero heavy framework JavaScript bundles.",
      "Hardware-Accelerated Video Dialog: Native HTML5 dialog element optimized for 60 FPS video playback without stutter or frame drops.",
      "Custom Geometric Portal SVG: Trigonometrically calculated orbital vector emblem with dynamic radial gradients.",
      "Clean URL Architecture: Vercel routing rewrites /all-project to all-project.html without trailing file extensions.",
    ],
    architecturePointsId: [
      "Zero Runtime Overhead: Murni HTML5, CSS3, dan Vanilla JS sehingga browser tidak perlu mengunduh bundle JavaScript framework yang besar.",
      "Hardware-Accelerated Video Dialog: Menggunakan elemen dialog native HTML5 yang dioptimalkan untuk pemutaran video 60 FPS tanpa lag atau frame drop.",
      "Custom Geometric Portal SVG: Animasi portal geometris orbital yang dihitung dengan trigonometri SVG presisi tinggi dan gradien dinamis.",
      "Clean URL Architecture: Konfigurasi routing Vercel untuk rewrite /all-project menuju all-project.html tanpa ekstensi file di address bar.",
    ],
    clientShowcase: {
      clientName: "Juna",
      clientRoleEn: "3D Animator & Lighting / Rendering / Compositing (LRC) Artist",
      clientRoleId: "3D Animator & Lighting / Rendering / Compositing (LRC) Artist",
      clientInstagram: "@sayycheseeeee",
      clientInstagramUrl: "https://www.instagram.com/sayycheseeeee",
      clientWhatsapp: "https://wa.me/6285183174542",
      usageDescriptionEn:
        "Official production portfolio actively used by Juna to showcase 3D animation, character rigging, creature walk-cycles, and lighting breakdowns to animation studios and commercial clients.",
      usageDescriptionId:
        "Website portofolio resmi yang aktif digunakan oleh Juna untuk mempresentasikan karya animasi 3D, character rigging, creature walk-cycles, dan breakdown lighting kepada studio animasi dan calon klien komersial.",
      siteTypeEn: "Professional 3D Artist Portfolio & Interactive Video Exhibition",
      siteTypeId: "Portofolio Profesional 3D Artist & Pameran Video Interaktif",
      deliverablesEn: [
        "Complete responsive personal portfolio (Homepage & All-Projects Archive)",
        "Rotating geometric portal SVG animation emblem with dynamic glow",
        "Interactive dual-mode video modal dialog (Final Render / Viewport)",
        "Dynamic category filter system with responsive card & list views",
        "Direct one-tap WhatsApp and Instagram consultation CTA links",
      ],
      deliverablesId: [
        "Website portofolio personal lengkap (Halaman Utama & Arsip All-Projects)",
        "Intro animasi portal SVG geometris dengan simbol kosmik dan rotasi orbital",
        "Modal video interaktif dengan switcher dua mode (Final Render / Viewport)",
        "Filter kategori dinamis dan galeri proyek responsif (mode kartu & list)",
        "Tombol panggilan aksi langsung ke WhatsApp dan tautan profil Instagram",
      ],
      keyHighlightsEn: [
        "100% Zero-Dependency: No node modules required in the browser, guaranteeing permanent durability.",
        "Extreme Performance: Perfect 100/100 performance score with instant rendering across mobile and desktop.",
        "Verified Production Usage: Fully delivered and actively utilized by the client in industry communications.",
      ],
      keyHighlightsId: [
        "100% Zero-Dependency: Tidak memerlukan runtime node modules di browser, menjamin keawetan website.",
        "Performa Ekstrem: Skor performa Lighthouse 100/100 dengan waktu render instan di desktop maupun ponsel.",
        "Verifikasi Pemakaian Nyata: Website telah diserahterimakan dan secara resmi digunakan oleh klien.",
      ],
      liveStatusEn: "Live in Production & Actively Used",
      liveStatusId: "Aktif digunakan secara publik oleh klien",
      verifiedInUse: true,
      deployedWebsites: DEPLOYED_CLIENT_WEBSITES,
    },
  },
  {
    id: "orbitry",
    title: "Orbitry",
    titleEn: "Orbitry",
    titleId: "Orbitry",
    subtitle: "Browser-Based 3D Asset Previewer & Model Converter",
    subtitleEn: "Browser-Based 3D Asset Previewer & Model Converter",
    subtitleId: "Browser-Based 3D Asset Previewer & Model Converter",
    category: "Full-Stack Web",
    status: "Live",
    featured: true,
    description:
      "A high-performance browser-based 3D asset previewer and converter built with Next.js 16 and Three.js. Supports client-side direct Blender (.blend) parsing with Zstandard decompression, instant conversion to glTF/GLB and quad-preserving Wavefront OBJ, upright texture alignment (flipY), UV seam splitting, and fast keyboard pie menus.",
    descriptionEn:
      "A high-performance browser-based 3D asset previewer and converter built with Next.js 16 and Three.js. Supports client-side direct Blender (.blend) parsing with Zstandard decompression, instant conversion to glTF/GLB and quad-preserving Wavefront OBJ, upright texture alignment (flipY), UV seam splitting, and fast keyboard pie menus.",
    descriptionId:
      "Orbitry adalah aplikasi web modern dan berkinerja tinggi untuk preview serta konversi model 3D (.blend, .glb, .gltf, .obj) langsung di browser berbasis Next.js 16 dan Three.js. Mendukung parsing file Blender langsung di client-side dengan dekompresi Zstandard, konversi otomatis ke GLB dan Wavefront OBJ ber-topologi rapi, perbaikan UV seam splitting, dan navigasi pie menu cepat.",
    techStack: [
      "Next.js 16",
      "Three.js",
      "React 19",
      "jsblender",
      "WebGL",
      "TypeScript",
      "fzstd",
    ],
    features: [
      "Direct client-side parsing of .blend files (Blender 3.x–5.2) without server uploads",
      "Instant 1-click automated conversion to web-standard glTF/GLB (PBR) and Wavefront OBJ",
      "Quad and n-gon polygon preservation with consistent Newell face normal windings",
      "Upright texture alignment (flipY correction) and UV seam split smoothing",
      "Keyboard-based radial pie menus (Hold Z for Shading Modes, Hold X for View Controls)",
    ],
    featuresEn: [
      "Direct client-side parsing of .blend files (Blender 3.x–5.2) without server uploads",
      "Instant 1-click automated conversion to web-standard glTF/GLB (PBR) and Wavefront OBJ",
      "Quad and n-gon polygon preservation with consistent Newell face normal windings",
      "Upright texture alignment (flipY correction) and UV seam split smoothing",
      "Keyboard-based radial pie menus (Hold Z for Shading Modes, Hold X for View Controls)",
    ],
    featuresId: [
      "Parsing langsung file .blend (Blender 3.x–5.2) di memori peramban tanpa upload ke server",
      "Konversi otomatis 1-klik ke standar web glTF/GLB (PBR materials) dan Wavefront OBJ",
      "Preservasi topologi poligon quad/n-gon dan kalkulasi normal vertex Newell konsisten",
      "Perbaikan upright texture alignment (flipY) dan pemisahan seam UV tanpa tekstur bocor",
      "Pie menu interaktif berbasis keyboard (Tahan Z untuk Shading Mode, Tahan X untuk Kontrol Kamera)",
    ],
    repoUrl: "https://github.com/Dhityavv/Orbitry",
    longOverview:
      "Orbitry solves the barrier 3D artists face when sharing or inspecting models without launching heavy desktop software. Built on Three.js and jsblender with Zstandard decompression, Orbitry reads SDNA / AttributeStorage data structures directly in client memory, exporting to web standards instantly with complete asset privacy.",
    longOverviewEn:
      "Orbitry solves the barrier 3D artists face when sharing or inspecting models without launching heavy desktop software. Built on Three.js and jsblender with Zstandard decompression, Orbitry reads SDNA / AttributeStorage data structures directly in client memory, exporting to web standards instantly with complete asset privacy.",
    longOverviewId:
      "Orbitry dirancang untuk memecahkan masalah para 3D artist yang ingin membagikan atau memvalidasi aset 3D secara instan tanpa harus membuka software desktop berat. Menggunakan Three.js dan parser jsblender dengan dukungan Zstandard, Orbitry membaca struktur data SDNA / AttributeStorage Blender dan mengekspornya ke format web standar secara instan.",
    architecturePoints: [
      "Client-Side Conversion Pipeline: All geometry and texture parsing runs in browser memory, ensuring 100% asset privacy.",
      "Topology-Preserving OBJ Engine: Retains native quad face loops during Wavefront OBJ generation.",
      "Multi-Shading Viewport: Real-time PBR Render, Solid, Material Preview, and stored-edge Wireframe.",
      "Pie Menu Interaction System: Rapid radial gestures modeled after industry standard 3D suites.",
    ],
    architecturePointsEn: [
      "Client-Side Conversion Pipeline: All geometry and texture parsing runs in browser memory, ensuring 100% asset privacy.",
      "Topology-Preserving OBJ Engine: Retains native quad face loops during Wavefront OBJ generation.",
      "Multi-Shading Viewport: Real-time PBR Render, Solid, Material Preview, and stored-edge Wireframe.",
      "Pie Menu Interaction System: Rapid radial gestures modeled after industry standard 3D suites.",
    ],
    architecturePointsId: [
      "Client-Side Conversion Pipeline: Seluruh parsing data geometri dan tekstur diproses di Web Worker / memori lokal peramban, menjaga privasi file 3D pengguna.",
      "Topology-Preserving OBJ Engine: Mengekstrak loop face asli Blender sehingga model yang diekspor tetap mempertahankan susunan quad dan n-gon.",
      "Multi-Shading Viewport: Mode Render PBR, Solid, Material Preview, dan Wireframe dengan penanda tepi asli.",
      "Pie Menu Interaction System: Navigasi cepat berbasis radial gesture untuk alur kerja secepat software 3D profesional.",
    ],
  },
  {
    id: "rimba",
    title: "Rimba",
    titleEn: "Rimba",
    titleId: "Rimba",
    subtitle: "2.5D Isometric Survival Town Web Game",
    subtitleEn: "2.5D Isometric Survival Town Web Game",
    subtitleId: "2.5D Isometric Survival Town Web Game",
    category: "Full-Stack Web",
    status: "In Progress",
    featured: true,
    description:
      "A 2.5D isometric browser survival town prototype uniting Phaser 3.90, Supabase Realtime, and atomic Postgres RPC. Explore forest and Central zones with guest/email authentication, WASD/click movement, transactional citizen ID generation, private inventory, resource gathering, cottage/garden construction, and player escrow marketplace.",
    descriptionEn:
      "A 2.5D isometric browser survival town prototype uniting Phaser 3.90, Supabase Realtime, and atomic Postgres RPC. Explore forest and Central zones with guest/email authentication, WASD/click movement, transactional citizen ID generation, private inventory, resource gathering, cottage/garden construction, and player escrow marketplace.",
    descriptionId:
      "Prototipe game web survival isometrik 2.5D yang menggabungkan Phaser 3.90, Supabase Realtime, dan Postgres atomic RPC. Menghadirkan eksplorasi dunia hutan dan Central, mode tamu tanpa akun, gerak WASD / klik tanah, nomor KTP warga fiktif otomatis, inventaris privat, pemanenan sumber daya (kayu/batu), pembangunan pondok & kebun, serta sistem pasar escrow antar pemain.",
    techStack: [
      "Phaser 3.90",
      "TypeScript",
      "Supabase Realtime",
      "Postgres RPC & RLS",
      "Vite",
      "Cloudflare Pages",
    ],
    features: [
      "Isometric 2.5D geometry projected from 2D canvas coordinates without third-party tile art",
      "Multiplayer presence and positional broadcast synchronized via Supabase Realtime",
      "Atomic character creation with unique sequence IDs supporting guest mode and email linking",
      "Private inventory system, timed resource nodes, and collision-checked building placement",
      "Escrow marketplace: listings lock inventory and transactions settle atomically in Postgres",
    ],
    featuresEn: [
      "Isometric 2.5D geometry projected from 2D canvas coordinates without third-party tile art",
      "Multiplayer presence and positional broadcast synchronized via Supabase Realtime",
      "Atomic character creation with unique sequence IDs supporting guest mode and email linking",
      "Private inventory system, timed resource nodes, and collision-checked building placement",
      "Escrow marketplace: listings lock inventory and transactions settle atomically in Postgres",
    ],
    featuresId: [
      "Dunia isometrik 2.5D diproyeksikan dari koordinat 2D Canvas tanpa aset tile pihak ketiga",
      "Sinkronisasi kehadiran pemain (Realtime Presence) dan broadcast pergerakan posisi",
      "Pembuatan karakter & nomor warga atomik dengan Supabase Auth (Mode Tamu & Email)",
      "Sistem inventaris privat, titik panen resource berwaktu, dan penempatan bangunan struktural",
      "Pasar berbasis escrow: barang dikunci saat dipasang dan transaksi dituntaskan dalam satu operasi",
    ],
    repoUrl: "https://github.com/Dhityavv/Rimba",
    longOverview:
      "Rimba combines 2.5D canvas gameplay with robust relational database architecture. By enforcing crucial rules (inventory balance, boundary validation, movement speeds, and trade escrow) directly on PostgreSQL via transactional RPCs and Row Level Security, the game prevents client tampering.",
    longOverviewEn:
      "Rimba combines 2.5D canvas gameplay with robust relational database architecture. By enforcing crucial rules (inventory balance, boundary validation, movement speeds, and trade escrow) directly on PostgreSQL via transactional RPCs and Row Level Security, the game prevents client tampering.",
    longOverviewId:
      "Rimba memadukan keindahan visual 2.5D canvas dengan ketangguhan backend database relasional modern. Dengan menempatkan seluruh aturan krusial (seperti saldo inventaris, koordinat daratan, validasi kecepatan, dan transaksi pasar) di PostgreSQL via RPC dan Row Level Security, game ini mencegah manipulasi data dari sisi klien.",
    architecturePoints: [
      "Geometric Isometric Projection: Calculates 2.5D coordinates mathematically on Phaser's 2D canvas without external tile dependencies.",
      "Atomic Database Sequences: Generates distinct citizen registration IDs safely across concurrent requests.",
      "Realtime Broadcast & Presence: Broadcasts player positions periodically and tracks active room inhabitants.",
      "Escrow Marketplace Logic: Swaps items and player currencies atomically inside Postgres transactions.",
    ],
    architecturePointsEn: [
      "Geometric Isometric Projection: Calculates 2.5D coordinates mathematically on Phaser's 2D canvas without external tile dependencies.",
      "Atomic Database Sequences: Generates distinct citizen registration IDs safely across concurrent requests.",
      "Realtime Broadcast & Presence: Broadcasts player positions periodically and tracks active room inhabitants.",
      "Escrow Marketplace Logic: Swaps items and player currencies atomically inside Postgres transactions.",
    ],
    architecturePointsId: [
      "Geometric Isometric Projection: Menghitung transformasi isometrik 2.5D secara matematis pada Canvas 2D Phaser tanpa memerlukan sprite tile art luar.",
      "Atomic Database Sequences: Menghasilkan nomor registrasi KTP warga yang unik dan berurutan secara transaksional di database.",
      "Realtime Broadcast & Presence: Mengirimkan posisi karakter secara periodik dan mendeteksi pemain aktif di peta wilayah tanpa server game terpisah.",
      "Escrow Marketplace Logic: Memastikan item dan saldo pemain ditukar secara atomik di Postgres sehingga tidak ada risiko item duplikasi saat transaksi.",
    ],
  },
  {
    id: "filra",
    title: "Filra",
    titleEn: "Filra",
    titleId: "Filra",
    subtitle: "Movie Discovery & Social Rating Platform",
    subtitleEn: "Movie Discovery & Social Rating Platform",
    subtitleId: "Movie Discovery & Social Rating Platform",
    category: "Full-Stack Web",
    status: "Live",
    featured: true,
    description:
      "Filra is a fast, responsive movie discovery and personal rating web app. Users can browse trending, top-rated, and upcoming cinema without an account. Authenticating via Clerk unlocks a custom profile, synced user ratings, watchlist curation, and community features with Supabase persistence.",
    descriptionEn:
      "Filra is a fast, responsive movie discovery and personal rating web app. Users can browse trending, top-rated, and upcoming cinema without an account. Authenticating via Clerk unlocks a custom profile, synced user ratings, watchlist curation, and community features with Supabase persistence.",
    descriptionId:
      "Filra adalah platform web eksplorasi dan rating film yang responsif dan cepat. Pengguna dapat menjelajahi film yang sedang tren, terpopuler, dan rilisan terbaru tanpa akun. Autentikasi Clerk membuka profil kustom, sinkronisasi rating pengguna, kurasi daftar pantauan (watchlist), dan aktivitas komunitas dengan database Supabase.",
    techStack: [
      "Next.js 15",
      "TMDB API",
      "Clerk Auth",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
    ],
    features: [
      "Real-time movie search and TMDB catalog exploration",
      "Seamless guest mode with optional Clerk authentication",
      "Cloud-synced user ratings and personal watchlist",
      "Responsive cinematic UI with dark mode styling",
    ],
    featuresEn: [
      "Real-time movie search and TMDB catalog exploration",
      "Seamless guest mode with optional Clerk authentication",
      "Cloud-synced user ratings and personal watchlist",
      "Responsive cinematic UI with dark mode styling",
    ],
    featuresId: [
      "Pencarian film real-time dan integrasi katalog lengkap TMDB",
      "Mode tamu instan dengan opsi login akun melalui Clerk",
      "Sinkronisasi cloud untuk rating personal dan watchlist film",
      "Antarmuka sinematik responsif dengan dark mode berkelas",
    ],
    repoUrl: "https://github.com/Dhityavv/Filra",
    liveUrl: "https://filra.vercel.app",
    liveLabel: "Open Live Demo",
    liveLabelEn: "Open Live Demo",
    liveLabelId: "Buka Live Demo",
    longOverview:
      "Filra integrates seamless public cinema browsing with modern user authentication. Powered by Next.js App Router and API edge caching, pages load instantly with smooth animated transitions.",
    longOverviewEn:
      "Filra integrates seamless public cinema browsing with modern user authentication. Powered by Next.js App Router and API edge caching, pages load instantly with smooth animated transitions.",
    longOverviewId:
      "Filra memadukan kemudahan eksplorasi film publik dengan manajemen akun pengguna modern. Menggunakan Next.js App Router dan API caching, halaman memuat secara instan dengan transisi animasi halus.",
    architecturePoints: [
      "App Router Server Components for SEO indexing and rapid TMDB catalog queries.",
      "Clerk Edge Middleware protecting authenticated routes and managing sessions.",
      "Supabase PostgreSQL with RLS ensuring private ratings and watchlist isolation.",
    ],
    architecturePointsEn: [
      "App Router Server Components for SEO indexing and rapid TMDB catalog queries.",
      "Clerk Edge Middleware protecting authenticated routes and managing sessions.",
      "Supabase PostgreSQL with RLS ensuring private ratings and watchlist isolation.",
    ],
    architecturePointsId: [
      "App Router Server Components untuk optimasi SEO dan rendering data TMDB yang cepat.",
      "Clerk Middleware untuk proteksi rute pengguna dan sinkronisasi metadata sesi.",
      "PostgreSQL Supabase dengan RLS untuk penyimpanan watchlist dan skor film personal.",
    ],
  },
  {
    id: "universal-chiseled-bookshelf",
    title: "Universal Chiseled Bookshelf",
    titleEn: "Universal Chiseled Bookshelf",
    titleId: "Universal Chiseled Bookshelf",
    subtitle: "Minecraft Vanilla+ Bookshelf Storage Expansion",
    subtitleEn: "Minecraft Vanilla+ Bookshelf Storage Expansion",
    subtitleId: "Minecraft Vanilla+ Bookshelf Storage Expansion",
    category: "Game Modding",
    status: "Under Review on Modrinth",
    featured: true,
    description:
      "Universal Chiseled Bookshelf expands the existing Minecraft bookshelf system without adding new blocks or items. Store and organize more useful items inside your bookshelves while keeping the original Minecraft look, feel, and vanilla mechanics intact.",
    descriptionEn:
      "Universal Chiseled Bookshelf expands the existing Minecraft bookshelf system without adding new blocks or items. Store and organize more useful items inside your bookshelves while keeping the original Minecraft look, feel, and vanilla mechanics intact.",
    descriptionId:
      "Universal Chiseled Bookshelf memperluas fungsionalitas rak buku Minecraft tanpa menambahkan blok atau item baru. Simpan dan atur lebih banyak perkakas serta barang berguna di dalam rak buku berukir dengan tetap mempertahankan estetika, nuansa, dan mekanik bawaan game Minecraft vanilla.",
    techStack: ["Minecraft 26.3", "Fabric / Vanilla+"],
    features: [
      "Expands item storage capacity within vanilla chiseled bookshelves",
      "No custom blocks required — 100% vanilla game parity and aesthetics",
      "Clean, non-intrusive implementation for survival worlds",
    ],
    featuresEn: [
      "Expands item storage capacity within vanilla chiseled bookshelves",
      "No custom blocks required — 100% vanilla game parity and aesthetics",
      "Clean, non-intrusive implementation for survival worlds",
    ],
    featuresId: [
      "Memperluas kapasitas penyimpanan barang di dalam chiseled bookshelf vanilla",
      "100% kompatibel dengan gaya grafis dan tekstur bawaan Minecraft",
      "Implementasi rapi, ringan, dan tidak merusak integritas dunia survival",
    ],
    repoUrl: "https://github.com/Dhityavv/Universal-Chiseled-Bookshelf",
    liveUrl: "https://discord.gg/VKsfPzC2g",
    liveLabel: "Download on Discord",
    liveLabelEn: "Download on Discord",
    liveLabelId: "Unduh di Discord",
    longOverview:
      "Engineered for Minecraft survival enthusiasts who seek functional decoration without cluttering the game world with arbitrary modded blocks.",
    longOverviewEn:
      "Engineered for Minecraft survival enthusiasts who seek functional decoration without cluttering the game world with arbitrary modded blocks.",
    longOverviewId:
      "Mod ini diciptakan untuk pemain yang menginginkan fleksibilitas dekorasi fungsional dalam survival Minecraft tanpa harus menambahkan ratusan item buatan yang merusak rasa bermain vanilla.",
    architecturePoints: [
      "Fabric Mod Loader hook into vanilla chiseled bookshelf interaction events.",
      "Safe NBT data persistence matching standard Minecraft chunk save formats.",
    ],
    architecturePointsEn: [
      "Fabric Mod Loader hook into vanilla chiseled bookshelf interaction events.",
      "Safe NBT data persistence matching standard Minecraft chunk save formats.",
    ],
    architecturePointsId: [
      "Fabric Mod Loader hook ke interaksi chiseled bookshelf vanilla.",
      "Penyimpanan NBT data yang aman dan kompatibel dengan penyimpanan chunk Minecraft.",
    ],
  },
];
