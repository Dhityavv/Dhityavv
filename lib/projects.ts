export type ProjectStatus =
  | "Active"
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
    status: "Active",
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
    subtitle: "Production Portfolio Websites — Active & In Real-World Use",
    subtitleEn: "Production Portfolio Websites — Active & In Real-World Use",
    subtitleId: "Website Portofolio Profesional Klien · Aktif Digunakan di Industri Animasi",
    category: "Client Showcase",
    status: "Active",
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
    repoUrl: "https://github.com/Dhityavv",
    liveUrl: "https://kejuuanimator-portfolio.vercel.app",
    liveLabel: "Open the Websites",
    liveLabelEn: "Open the Websites",
    liveLabelId: "Buka Website",
    longOverview:
      "This showcase presents bespoke production web development engineered for clients who require durable, ultra-fast websites with distinct visual identities and custom interactive capabilities. Each web build is tailored from the ground up—prioritizing performance, responsive geometry, clean semantic code, and zero unnecessary runtime bloat to guarantee enduring production longevity.",
    longOverviewEn:
      "This showcase presents bespoke production web development engineered for clients who require durable, ultra-fast websites with distinct visual identities and custom interactive capabilities. Each web build is tailored from the ground up—prioritizing performance, responsive geometry, clean semantic code, and zero unnecessary runtime bloat to guarantee enduring production longevity.",
    longOverviewId:
      "Showcase ini mempersembahkan hasil pembuatan website produksi kustom untuk klien yang membutuhkan website berkinerja tinggi, berkecepatan instan, dan memiliki identitas visual yang khas. Setiap website dirancang dan dibangun dari nol dengan fokus utama pada efisiensi performa, tata letak responsif, kode semantik yang bersih, serta bebas dari bloatware runtime sehingga dapat digunakan dalam jangka panjang secara andal.",
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
      liveStatusEn: "Active",
      liveStatusId: "Active",
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
    status: "Active",
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
    liveUrl: "https://orbitry-models.vercel.app",
    liveLabel: "Open the Websites",
    liveLabelEn: "Open the Websites",
    liveLabelId: "Buka Website",
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
    status: "Active",
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
    liveUrl: "https://rimba-worlds.vercel.app",
    liveLabel: "Open the Websites",
    liveLabelEn: "Open the Websites",
    liveLabelId: "Buka Website",
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
    subtitleId: "Platform Eksplorasi Sinema & Rating Film Personal",
    category: "Full-Stack Web",
    status: "Active",
    featured: true,
    description:
      "Filra is a high-performance, modern movie discovery platform and personal cinema catalog built on Next.js 15, TMDB API, Clerk Authentication, and Supabase PostgreSQL. Engineered for film aficionados and casual viewers alike, Filra allows anyone to explore trending, top-rated, and newly released films with zero latency and no upfront account requirements. Authenticating via Clerk unlocks a cloud-synced personal watchlist, user rating system, custom profile customization, and community activity tracking powered by Supabase Row-Level Security.",
    descriptionEn:
      "Filra is a high-performance, modern movie discovery platform and personal cinema catalog built on Next.js 15, TMDB API, Clerk Authentication, and Supabase PostgreSQL. Engineered for film aficionados and casual viewers alike, Filra allows anyone to explore trending, top-rated, and newly released films with zero latency and no upfront account requirements. Authenticating via Clerk unlocks a cloud-synced personal watchlist, user rating system, custom profile customization, and community activity tracking powered by Supabase Row-Level Security.",
    descriptionId:
      "Filra adalah platform web modern untuk eksplorasi film dan katalog sinema personal berkecepatan tinggi yang dibangun dengan Next.js 15, TMDB API, Clerk Authentication, dan database Supabase PostgreSQL. Dirancang untuk para penikmat sinema maupun penonton kasual, Filra memungkinkan siapa saja menjelajahi tren film, film terpopuler, dan rilisan terkini tanpa hambatan registrasi. Autentikasi aman melalui Clerk membuka fitur watchlist pribadi yang tersinkronisasi di cloud, sistem pemberian rating film, kustomisasi profil, serta interaksi komunitas dengan proteksi keamanan Supabase Row-Level Security.",
    techStack: [
      "Next.js 15",
      "TMDB API",
      "Clerk Auth",
      "Supabase",
      "Tailwind CSS",
      "TypeScript",
    ],
    features: [
      "Real-Time TMDB Catalog Stream: Instant access to tens of thousands of movies with live search, genre filters, and release sorting",
      "Frictionless Public Exploration: Browse full synopses, ratings, cast profiles, and watch official trailers without mandatory sign-in",
      "Clerk Auth & Personal Profiles: Seamless social & email authentication generating custom user profiles and activity badges",
      "Cloud-Synced Watchlists & Ratings: Curate a private watch queue and store personal star ratings with instant cloud persistence",
      "Cinematic Dark Glassmorphism: Tailored responsive UI designed for mobile, tablet, and desktop with high visual contrast",
      "Edge-Optimized Performance: Server components and API route caching ensure instant page loads without hydration layout shifts",
    ],
    featuresEn: [
      "Real-Time TMDB Catalog Stream: Instant access to tens of thousands of movies with live search, genre filters, and release sorting",
      "Frictionless Public Exploration: Browse full synopses, ratings, cast profiles, and watch official trailers without mandatory sign-in",
      "Clerk Auth & Personal Profiles: Seamless social & email authentication generating custom user profiles and activity badges",
      "Cloud-Synced Watchlists & Ratings: Curate a private watch queue and store personal star ratings with instant cloud persistence",
      "Cinematic Dark Glassmorphism: Tailored responsive UI designed for mobile, tablet, and desktop with high visual contrast",
      "Edge-Optimized Performance: Server components and API route caching ensure instant page loads without hydration layout shifts",
    ],
    featuresId: [
      "Streaming Katalog TMDB Real-Time: Akses langsung ke puluhan ribu judul film dengan pencarian instan, filter genre, dan rilis terbaru",
      "Eksplorasi Publik Tanpa Hambatan: Telusuri sinopsis lengkap, skor rating, profil pemeran, dan tonton trailer resmi tanpa harus login",
      "Autentikasi Modern Clerk: Pendaftaran instan via email dan akun sosial yang menghasilkan profil pengguna dan badge aktivitas",
      "Watchlist & Rating Cloud: Kurasi daftar tontonan pribadi dan simpan rating film personal yang tersinkronisasi instan di cloud",
      "Estetika Dark Mode Sinematik: Antarmuka glassmorphic responsif yang dioptimalkan untuk kenyamanan mata di smartphone dan desktop",
      "Performa Teroptimasi di Edge: Server Components dan caching API cerdas memastikan halaman terbuka cepat tanpa pergeseran tata letak",
    ],
    repoUrl: "https://github.com/Dhityavv/Filra",
    liveUrl: "https://filra.vercel.app",
    liveLabel: "Open the Websites",
    liveLabelEn: "Open the Websites",
    liveLabelId: "Buka Website",
    longOverview:
      "Filra was born out of the frustration of using slow, ad-heavy movie review sites that force users through aggressive paywalls and mandatory registrations before showing basic information. Filra delivers an instant, cinematic browsing experience centered on high-fidelity poster art, contextual plot synopses, cast breakdowns, and YouTube trailer embeds.\n\nUnder the hood, Filra leverages Next.js 15 App Router with React Server Components, server-side caching, and incremental data revalidation to fetch and stream real-time data from The Movie Database (TMDB) with sub-second response times. Client-side state transitions are rendered with buttery-smooth CSS animations and glassmorphic dark styling. User sessions are governed by Clerk Edge Middleware, granting immediate token issuance. Whenever an authenticated user rates a film or updates their watchlist, operations settle securely in Supabase PostgreSQL guarded by strict Row Level Security (RLS) policies, ensuring total user data isolation and instant multi-device synchronization.",
    longOverviewEn:
      "Filra was born out of the frustration of using slow, ad-heavy movie review sites that force users through aggressive paywalls and mandatory registrations before showing basic information. Filra delivers an instant, cinematic browsing experience centered on high-fidelity poster art, contextual plot synopses, cast breakdowns, and YouTube trailer embeds.\n\nUnder the hood, Filra leverages Next.js 15 App Router with React Server Components, server-side caching, and incremental data revalidation to fetch and stream real-time data from The Movie Database (TMDB) with sub-second response times. Client-side state transitions are rendered with buttery-smooth CSS animations and glassmorphic dark styling. User sessions are governed by Clerk Edge Middleware, granting immediate token issuance. Whenever an authenticated user rates a film or updates their watchlist, operations settle securely in Supabase PostgreSQL guarded by strict Row Level Security (RLS) policies, ensuring total user data isolation and instant multi-device synchronization.",
    longOverviewId:
      "Filra lahir dari keresahan akan banyaknya website review film yang lambat, dipenuhi iklan mengganggu, serta mewajibkan pendaftaran rumit hanya untuk melihat informasi sinematik mendasar. Filra menghadirkan antarmuka eksplorasi sinematik ultra-cepat yang mengedepankan poster beresolusi tinggi, sinopsis mendalam, detail sutradara & pemeran, serta pemutar trailer YouTube terintegrasi.\n\nDi balik layar, Filra dibangun di atas arsitektur Next.js 15 App Router dengan React Server Components, server-side caching, dan Incremental Static Regeneration (ISR) untuk melakukan streaming data real-time dari TMDB dengan kecepatan respons di bawah satu detik. Transisi antarmuka pengguna dirancang responsif dengan estetika dark mode modern dan glassmorphism halus. Sistem autentikasi dikelola oleh Clerk Edge Middleware untuk keamanan sesi yang cepat, sementara seluruh rating dan watchlist pengguna disimpan di Supabase PostgreSQL dengan pengamanan ketat Row Level Security (RLS) agar data antar pengguna tetap terisolasi dan tersinkronisasi instan di semua perangkat.",
    architecturePoints: [
      "Next.js 15 App Router & Server Components: Minimizes client bundle footprint by pre-rendering movie catalogs on the edge server.",
      "Clerk Edge Middleware: Validates JWT session tokens at the network edge before requests touch backend database handlers.",
      "Supabase PostgreSQL with Row Level Security: Enforces database-level authorization policies so users can only read and mutate their own ratings.",
      "Stale-While-Revalidate TMDB Proxy: Caches API responses efficiently to prevent TMDB rate-limiting while serving fresh data to users.",
    ],
    architecturePointsEn: [
      "Next.js 15 App Router & Server Components: Minimizes client bundle footprint by pre-rendering movie catalogs on the edge server.",
      "Clerk Edge Middleware: Validates JWT session tokens at the network edge before requests touch backend database handlers.",
      "Supabase PostgreSQL with Row Level Security: Enforces database-level authorization policies so users can only read and mutate their own ratings.",
      "Stale-While-Revalidate TMDB Proxy: Caches API responses efficiently to prevent TMDB rate-limiting while serving fresh data to users.",
    ],
    architecturePointsId: [
      "Next.js 15 App Router & Server Components: Memangkas ukuran bundle JavaScript klien dengan me-render katalog film langsung di server.",
      "Clerk Edge Middleware: Melakukan validasi token sesi JWT langsung di edge sebelum request mencapai endpoint database.",
      "Supabase PostgreSQL dengan Row Level Security (RLS): Menegakkan izin akses level database sehingga pengguna hanya dapat memanipulasi data miliknya sendiri.",
      "Proxy Caching Stale-While-Revalidate: Menyimpan cache respons TMDB secara efisien untuk menghindari batas rate limit dan menjaga kecepatan muat.",
    ],
  },
  {
    id: "universal-chiseled-bookshelf",
    title: "Universal Chiseled Bookshelf",
    titleEn: "Universal Chiseled Bookshelf",
    titleId: "Universal Chiseled Bookshelf",
    subtitle: "Minecraft Vanilla+ Bookshelf Storage Expansion",
    subtitleEn: "Minecraft Vanilla+ Bookshelf Storage Expansion",
    subtitleId: "Ekspansi Penyimpanan Rak Buku Minecraft Vanilla+",
    category: "Game Modding",
    status: "Active",
    featured: true,
    description:
      "Universal Chiseled Bookshelf is a meticulously engineered Vanilla+ Fabric mod that transforms Minecraft's Chiseled Bookshelf into an expansive, multi-category storage and organization system. While vanilla chiseled bookshelves are strictly limited to holding 6 books, this mod breaks conventional limitations by enabling survival players to store, retrieve, and showcase a wider array of essential items—including enchanted books, scrolls, written tomes, maps, toolkits, and survival artifacts—directly inside the block. Designed with pure vanilla fidelity in mind, it introduces zero foreign blocks or artificial textures, preserving the authentic visual aesthetic and performance of Minecraft survival worlds.",
    descriptionEn:
      "Universal Chiseled Bookshelf is a meticulously engineered Vanilla+ Fabric mod that transforms Minecraft's Chiseled Bookshelf into an expansive, multi-category storage and organization system. While vanilla chiseled bookshelves are strictly limited to holding 6 books, this mod breaks conventional limitations by enabling survival players to store, retrieve, and showcase a wider array of essential items—including enchanted books, scrolls, written tomes, maps, toolkits, and survival artifacts—directly inside the block. Designed with pure vanilla fidelity in mind, it introduces zero foreign blocks or artificial textures, preserving the authentic visual aesthetic and performance of Minecraft survival worlds.",
    descriptionId:
      "Universal Chiseled Bookshelf adalah mod Fabric Vanilla+ yang dirancang dengan presisi untuk merevolusi Chiseled Bookshelf Minecraft menjadi sistem penyimpanan dan organisasi barang yang serbaguna. Jika pada vanilla chiseled bookshelf hanya mampu menampung 6 buku biasa, mod ini mendobrak batasan tersebut dengan memungkinkan pemain survival menyimpan, mengambil, dan memamerkan berbagai variasi item penting—seperti buku sihir, peta penjelajahan, perkakas, potion, dan artefak survival—langsung di dalam slot rak buku. Dibuat dengan filosofi Vanilla-Friendly murni tanpa menambahkan blok asing atau tekstur buatan, mod ini tetap menjaga estetika orisinal dan stabilitas performa dunia survival Anda.",
    techStack: ["Minecraft 26.3", "Fabric / Vanilla+", "Java", "NBT Persistence"],
    features: [
      "Universal Item Storage: Store more than just standard books—place enchanted tomes, scrolls, maps, and specialized survival gear",
      "Zero Custom Blocks: Retains pure vanilla block definitions, ensuring seamless rendering without requiring resource packs or client modpacks",
      "Redstone Comparator Integration: Generates authentic analog redstone signal strengths (1–6) matching slot occupancy for secret contraptions",
      "Server-Friendly & SMP Ready: Fully synchronized client-server packet lifecycle prevents inventory desyncs and item ghosting",
      "Tactile Sound & Feedback: Custom sound triggers and interaction particles matching standard wood and parchment soundscapes",
      "Safe NBT Persistence: Matches Minecraft's official chunk serializing specifications, guaranteeing zero risk of world corruption",
    ],
    featuresEn: [
      "Universal Item Storage: Store more than just standard books—place enchanted tomes, scrolls, maps, and specialized survival gear",
      "Zero Custom Blocks: Retains pure vanilla block definitions, ensuring seamless rendering without requiring resource packs or client modpacks",
      "Redstone Comparator Integration: Generates authentic analog redstone signal strengths (1–6) matching slot occupancy for secret contraptions",
      "Server-Friendly & SMP Ready: Fully synchronized client-server packet lifecycle prevents inventory desyncs and item ghosting",
      "Tactile Sound & Feedback: Custom sound triggers and interaction particles matching standard wood and parchment soundscapes",
      "Safe NBT Persistence: Matches Minecraft's official chunk serializing specifications, guaranteeing zero risk of world corruption",
    ],
    featuresId: [
      "Penyimpanan Item Universal: Dapat menampung lebih dari sekadar buku biasa—simpan buku sihir, peta petualangan, perkakas, dan perbekalan survival",
      "100% Vanilla Parity: Tanpa penambahan blok tiruan, memastikan tampilan tetap selaras dengan dunia bawaan tanpa modpack berat",
      "Integrasi Redstone Comparator: Menghasilkan kekuatan sinyal redstone analog (1–6) sesuai isi slot untuk pintu rahasia dan teka-teki",
      "Kompatibilitas Penuh Server SMP: Sinkronisasi paket client-server secara real-time mencegah terjadinya bug duplikasi atau desync inventaris",
      "Efek Suara & Partikel Taktil: Dilengkapi efek suara interaksi kayu dan kertas yang selaras dengan audio vanilla Minecraft",
      "Keamanan Data NBT Maksimal: Mengikuti spesifikasi serialisasi chunk resmi Minecraft, menjamin dunia survival tidak mengalami korupsi data",
    ],
    repoUrl: "https://github.com/Dhityavv/Universal-Chiseled-Bookshelf",
    liveUrl: "https://discord.gg/sFC8P5DFEN",
    liveLabel: "Download",
    liveLabelEn: "Download",
    liveLabelId: "Download",
    longOverview:
      "Minecraft survival players frequently struggle with cluttered chest rooms, unsightly item frames, and decorative blocks that lack real functional utility. The Chiseled Bookshelf introduced in modern vanilla updates was a welcome visual addition, yet was hampered by strict item-type constraints. Universal Chiseled Bookshelf bridges this gap by extending the block entity's internal capability without violating game immersion.\n\nBuilt natively on the Fabric Mod Loader framework, the mod hooks cleanly into block interaction and player raycast events. Players can naturally insert and extract items with intuitive right-click gestures, accompanied by authentic tactile sound effects and synchronized NBT data persistence. The mod seamlessly respects Minecraft's comparator redstone logic, emitting variable signal strengths based on slot occupancy, enabling secret book-switch doors, custom puzzle mechanisms, and automated redstone libraries. Whether playing on local singleplayer or on large Fabric SMP servers, Universal Chiseled Bookshelf runs with zero tick-rate degradation (rock-solid 20 TPS), zero desynchronization issues, and full compatibility with chunk saving formats.",
    longOverviewEn:
      "Minecraft survival players frequently struggle with cluttered chest rooms, unsightly item frames, and decorative blocks that lack real functional utility. The Chiseled Bookshelf introduced in modern vanilla updates was a welcome visual addition, yet was hampered by strict item-type constraints. Universal Chiseled Bookshelf bridges this gap by extending the block entity's internal capability without violating game immersion.\n\nBuilt natively on the Fabric Mod Loader framework, the mod hooks cleanly into block interaction and player raycast events. Players can naturally insert and extract items with intuitive right-click gestures, accompanied by authentic tactile sound effects and synchronized NBT data persistence. The mod seamlessly respects Minecraft's comparator redstone logic, emitting variable signal strengths based on slot occupancy, enabling secret book-switch doors, custom puzzle mechanisms, and automated redstone libraries. Whether playing on local singleplayer or on large Fabric SMP servers, Universal Chiseled Bookshelf runs with zero tick-rate degradation (rock-solid 20 TPS), zero desynchronization issues, and full compatibility with chunk saving formats.",
    longOverviewId:
      "Pemain Minecraft survival sering kali menghadapi dilema ruang penyimpanan: ruang peti (chest room) yang terlalu padat, tumpukan item frame yang menurunkan performa render, serta blok dekoratif yang minim fungsi praktis. Kehadiran Chiseled Bookshelf pada pembaruan resmi Minecraft memberikan sentuhan visual yang indah, namun fungsinya terbatas hanya untuk jenis buku tertentu. Universal Chiseled Bookshelf hadir menjembatani kebutuhan tersebut dengan memperluas kapabilitas internal blok tanpa merusak imersi gameplay.\n\nDibangun secara native menggunakan Fabric Mod Loader, mod ini menghubungkan logika interaksi secara presisi ke event raycast pemain. Pemain dapat memasukkan dan mengambil item secara instan lewat klik kanan yang intuitif, lengkap dengan efek suara taktil vanilla dan sinkronisasi NBT data real-time. Mod ini juga mempertahankan kalkulasi sinyal redstone comparator bawaan Minecraft secara akurat berdasarkan slot yang terisi, membuka potensi tak terbatas untuk ruang rahasia, mekanisme teka-teki, dan perpustakaan redstone otomatis. Baik dimainkan dalam singleplayer maupun server Fabric SMP multiplayer dengan puluhan pemain, Universal Chiseled Bookshelf berjalan tanpa menurunkan tick-rate (stabil 20 TPS), tanpa bug duplikasi item, dan 100% kompatibel dengan sistem penyimpanan chunk Minecraft.",
    architecturePoints: [
      "Fabric Lifecycle Mixin Hooks: Safely injects into ChiseledBookshelfBlock and ChiseledBookshelfBlockEntity interaction events.",
      "Safe NBT Compound Serialization: Handles custom inventory slots using Minecraft's standard CompoundTag format, preserving data integrity through world backups.",
      "Analog Comparator Logic: Dynamically calculates redstone output power based on active slot indices, mirroring vanilla behavioral formulas.",
      "Tick-Zero Performance Footprint: Event-driven execution ensures no persistent ticking loops occur on the server CPU, maintaining a stable 20 TPS.",
    ],
    architecturePointsEn: [
      "Fabric Lifecycle Mixin Hooks: Safely injects into ChiseledBookshelfBlock and ChiseledBookshelfBlockEntity interaction events.",
      "Safe NBT Compound Serialization: Handles custom inventory slots using Minecraft's standard CompoundTag format, preserving data integrity through world backups.",
      "Analog Comparator Logic: Dynamically calculates redstone output power based on active slot indices, mirroring vanilla behavioral formulas.",
      "Tick-Zero Performance Footprint: Event-driven execution ensures no persistent ticking loops occur on the server CPU, maintaining a stable 20 TPS.",
    ],
    architecturePointsId: [
      "Fabric Lifecycle Mixin Hooks: Menginjeksi logika secara bersih ke dalam event ChiseledBookshelfBlock dan ChiseledBookshelfBlockEntity.",
      "Serialisasi Data NBT Aman: Mengelola slot inventaris tambahan menggunakan format CompoundTag standar Minecraft, menjamin keutuhan data saat backup.",
      "Kalkulasi Sinyal Redstone Analog: Menghitung output daya redstone secara dinamis berdasarkan indeks slot yang aktif persis rumus matematika vanilla.",
      "Zero Tick Overhead: Berbasis event-driven tanpa loop ticking terus-menerus di server CPU, memastikan tick-rate server tetap konstan pada 20 TPS.",
    ],
  },
];
