export type ProjectStatus =
  | "Active"
  | "In Progress"
  | "Experimental"
  | "Coming Soon"
  | "Under Review on Modrinth";

export type WebsiteAvailability = "Purchased & Active" | "Ready to Buy";

export interface DeployedWebsite {
  id: string;
  title: string;
  titleEn?: string;
  titleId?: string;
  clientName: string;
  clientHandle?: string;
  clientInstagramUrl?: string;
  clientWhatsapp?: string;
  url: string;
  category: string;
  status: string;
  availability: WebsiteAvailability;
  techStack: string[];
  frameworkType: "Next.js" | "HTML5 / Vanilla Stack";
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
    titleEn: "Juna — 3D Animator & LRC Portfolio",
    titleId: "Juna — Portofolio 3D Animator & LRC",
    clientName: "Juna",
    clientHandle: "@sayycheseeeee",
    clientInstagramUrl: "https://www.instagram.com/sayycheseeeee",
    clientWhatsapp: "https://wa.me/6285183174542",
    url: "https://kejuuanimator-portfolio.vercel.app",
    category: "Personal Portfolio & Exhibition",
    status: "Active",
    availability: "Purchased & Active",
    techStack: ["HTML5", "CSS3 Glassmorphism", "Pure JavaScript", "SVG Animation", "Vercel"],
    frameworkType: "HTML5 / Vanilla Stack",
    descriptionEn:
      "Commissioned & purchased production portfolio website custom-built for professional 3D Animator & LRC Artist Juna (@sayycheseeeee). Engineered with an ultra-fast zero-runtime stack (<100ms load speed), custom rotating geometric SVG portal, and dual-render video comparison.",
    descriptionId:
      "Website portofolio resmi pesanan yang telah dibeli & aktif digunakan oleh 3D Animator & LRC Artist profesional Juna (@sayycheseeeee). Dirancang dengan stack vanilla tanpa dependensi runtime untuk akses super cepat (<100ms), animasi portal SVG geometris kustom, dan video komparasi dual-render.",
    deliverablesEn: [
      "Custom responsive portfolio layout with dynamic dark aesthetic",
      "Interactive All-Projects archive gallery with category filters",
      "Hardware-accelerated video dialog player (Final Render vs Viewport)",
      "Instant 1-tap WhatsApp consultation & Instagram connection",
    ],
    deliverablesId: [
      "Tata letak portofolio responsif dengan estetika gelap dinamis",
      "Galeri arsip All-Projects interaktif dengan filter kategori proyek",
      "Pemutar dialog video native HTML5 (Final Render vs Viewport)",
      "Integrasi tombol WhatsApp & profil Instagram klien langsung",
    ],
  },
  {
    id: "template-website-1",
    title: "Minimalist Modern Portfolio & Agency (Template 1)",
    titleEn: "Minimalist Modern Portfolio & Agency (Template 1)",
    titleId: "Portofolio Minimalis Modern & Agensi (Template 1)",
    clientName: "Ready to Own",
    clientHandle: "Template Website #1",
    url: "https://templatewebsite1bydhitya.netlify.app",
    category: "Full-Stack Next.js Portfolio",
    status: "Active",
    availability: "Ready to Buy",
    techStack: ["Next.js 16", "React 19", "Tailwind CSS v4", "Framer Motion", "TypeScript", "Netlify"],
    frameworkType: "Next.js",
    descriptionEn:
      "A complete, ready-to-buy Next.js portfolio website template. Built with Next.js 16, React 19, Tailwind CSS v4, and smooth Framer Motion animations. Ideal for developers, designers, agencies, and creative professionals seeking an ultra-modern, editorial-style online identity.",
    descriptionId:
      "Template website portofolio siap pakai & siap beli berbasis Next.js modern. Dibangun menggunakan Next.js 16, React 19, Tailwind CSS v4, dan animasi halus Framer Motion. Sangat cocok untuk developer, desainer, freelancer, maupun agensi kreatif yang menginginkan identitas web kelas atas bertaraf editorial.",
    deliverablesEn: [
      "Production-ready Next.js 16 & React 19 architecture with App Router",
      "High-converting editorial design layout with typography hierarchy",
      "Pre-built Work showcase, About story, and interactive Contact section",
      "Ready to be customized with your branding, domain, and content immediately",
    ],
    deliverablesId: [
      "Arsitektur produksi siap pakai Next.js 16 & React 19 App Router",
      "Desain tipografi editorial modern dengan konversi pengunjung tinggi",
      "Sudah lengkap dengan showcase karya, cerita profile, dan form kontak interaktif",
      "Langsung siap dikustomisasi nama, warna, konten, dan domain milik Anda",
    ],
  },
  {
    id: "template-website-2",
    title: "HS Premium Design Studio & Agency (Template 2)",
    titleEn: "HS Premium Design Studio & Agency (Template 2)",
    titleId: "HS Studio Desain Premium & Agensi (Template 2)",
    clientName: "Ready to Own",
    clientHandle: "Template Website #2",
    url: "https://templatewebsite2bydhitya.netlify.app",
    category: "Creative Agency & Studio Website",
    status: "Active",
    availability: "Ready to Buy",
    techStack: ["HTML5 Semantic", "CSS3 Custom Animations", "Vanilla JS", "SVG Chrome Ornaments", "Netlify"],
    frameworkType: "HTML5 / Vanilla Stack",
    descriptionEn:
      "A stunning, ready-to-buy studio website featuring metallic chrome SVG ornaments, continuous infinite marquee, animated stat counters, dynamic client testimonial carousel slider, and interactive project cards with high-conversion contact form.",
    descriptionId:
      "Template website agensi & studio desain premium siap beli. Menghadirkan ornamen chrome SVG futuristik, teks marquee berjalan terus menerus, penghitung statistik beranimasi, slider testimoni klien interaktif, galeri proyek berkelas, serta formulir pemesanan langsung.",
    deliverablesEn: [
      "Zero-dependency ultra-lightweight HTML5 & CSS3 stack (instant 100/100 speed)",
      "Futuristic chrome iridescent gradient vector illustrations",
      "Animated statistics counter and interactive client review carousel",
      "Ready to deploy immediately for your studio, agency, or personal brand",
    ],
    deliverablesId: [
      "Stack HTML5 & CSS3 ringan tanpa dependensi (kecepatan maksimal 100/100)",
      "Ilustrasi vektor chrome dengan gradien warna hologram modern",
      "Counter angka statistik otomatis dan slider ulasan testimoni klien",
      "Tinggal ganti teks & logo Anda, langsung siap online untuk bisnis Anda",
    ],
  },
];

export const PROJECTS: ProjectDetail[] = [
  {
    id: "client-showcase",
    title: "Custom Web Development & Ready-to-Buy Websites",
    titleEn: "Custom Web Development & Ready-to-Buy Websites",
    titleId: "Jasa Pembuatan Website Kustom & Website Siap Pakai",
    subtitle: "Custom Web Engineering Orders & Production-Ready Website Templates",
    subtitleEn: "Custom Web Engineering Orders & Production-Ready Website Templates",
    subtitleId: "Buka Jasa Pembuatan Website Kustom & Koleksi Website Siap Beli",
    category: "Client Showcase",
    status: "Active",
    featured: true,
    description:
      "I engineer bespoke, high-performance websites for clients, businesses, and creators — from full-stack Next.js applications to ultra-fast zero-runtime HTML/CSS/JS websites. Explore ordered websites actively deployed for clients as well as ready-to-buy completed website templates that you can purchase and launch immediately.",
    descriptionEn:
      "I engineer bespoke, high-performance websites for clients, businesses, and creators — from full-stack Next.js applications to ultra-fast zero-runtime HTML/CSS/JS websites. Explore ordered websites actively deployed for clients as well as ready-to-buy completed website templates that you can purchase and launch immediately.",
    descriptionId:
      "Saya membuka jasa pembuatan website profesional untuk klien, bisnis, kreator, dan personal — mulai dari web aplikasi modern Next.js hingga website berkecepatan tinggi berbasis HTML/CSS/JS. Jelajahi portofolio website yang sudah dibeli dan aktif digunakan klien, serta website siap pakai yang sudah jadi dan bisa langsung dibeli hari ini.",
    techStack: [
      "Next.js 16",
      "React 19",
      "HTML5 / CSS3",
      "Tailwind CSS",
      "TypeScript",
      "JavaScript",
      "Framer Motion",
      "Netlify & Vercel",
    ],
    features: [
      "Open for website commission orders: Personal portfolios, company profiles, landing pages, and interactive web tools",
      "Choice of modern full-stack frameworks (Next.js / React) or lightweight zero-runtime vanilla stacks",
      "Browse ready-to-buy website templates built and deployed for instant acquisition",
      "Includes responsive mobile design, fast load speed (>95 Lighthouse), and custom animations",
      "Direct 1-on-1 consultation via WhatsApp with quick delivery and custom revision support",
    ],
    featuresEn: [
      "Open for website commission orders: Personal portfolios, company profiles, landing pages, and interactive web tools",
      "Choice of modern full-stack frameworks (Next.js / React) or lightweight zero-runtime vanilla stacks",
      "Browse ready-to-buy website templates built and deployed for instant acquisition",
      "Includes responsive mobile design, fast load speed (>95 Lighthouse), and custom animations",
      "Direct 1-on-1 consultation via WhatsApp with quick delivery and custom revision support",
    ],
    featuresId: [
      "Buka pesanan pembuatan website kustom: Portofolio pribadi, company profile bisnis, landing page, dan web apps interaktif",
      "Tersedia pilihan framework Next.js / React modern maupun teknologi Vanilla HTML/CSS/JS super ringan",
      "Tersedia katalog website yang sudah jadi dan menganggur, siap langsung Anda beli dan pakai sekarang",
      "Semua website sudah responsif di HP/laptop, kecepatan tinggi (>95 Lighthouse), dan animasi estetis",
      "Konsultasi langsung 1-on-1 via WhatsApp dengan pengerjaan terarah dan dukungan revisi",
    ],
    repoUrl: "https://github.com/Dhityavv",
    liveUrl: "https://kejuuanimator-portfolio.vercel.app",
    liveLabel: "Browse Websites",
    liveLabelEn: "Browse Websites",
    liveLabelId: "Lihat Koleksi Website",
    longOverview:
      "I provide professional custom web development services for individuals, businesses, and creators who need modern, standout websites tailored to their exact goals. Every project is crafted with high attention to speed, clean maintainable code, responsive aesthetics, and intuitive user experiences.\n\nIn addition to custom orders from scratch, I also build and maintain ready-to-buy website templates (available in Next.js and pure HTML/CSS/JS). These websites are fully designed, functional, and deployed—meaning you can acquire them immediately without waiting for long development timelines. Simply pick the design you love, and I will personalize it with your brand, content, and domain.",
    longOverviewEn:
      "I provide professional custom web development services for individuals, businesses, and creators who need modern, standout websites tailored to their exact goals. Every project is crafted with high attention to speed, clean maintainable code, responsive aesthetics, and intuitive user experiences.\n\nIn addition to custom orders from scratch, I also build and maintain ready-to-buy website templates (available in Next.js and pure HTML/CSS/JS). These websites are fully designed, functional, and deployed—meaning you can acquire them immediately without waiting for long development timelines. Simply pick the design you love, and I will personalize it with your brand, content, and domain.",
    longOverviewId:
      "Saya menyediakan layanan jasa pembuatan website profesional bagi Anda yang membutuhkan website modern, elegan, dan berkinerja tinggi sesuai kebutuhan. Setiap website dikerjakan dengan standar performa tinggi, struktur kode yang rapi, tampilan responsif di semua perangkat, serta desain visual yang berkarakter.\n\nSelain melayani pesanan pembuatan website dari nol (kustom), saya juga memiliki koleksi website yang sudah jadi dan menganggur (tersedia dalam Next.js maupun HTML/CSS/JS). Website ini sudah live dan siap digunakan, sehingga Anda bisa langsung membelinya tanpa harus menunggu proses pembuatan dari awal. Anda cukup memilih desain yang disukai, dan saya akan bantu sesuaikan dengan nama, logo, konten, serta domain milik Anda.",
    architecturePoints: [
      "Tailored Tech Stack: Built using Next.js 16 App Router for complex dynamic projects, or Vanilla HTML5/CSS3/JS for ultra-lightweight zero-dependency websites.",
      "High Performance Engineering: Optimized assets, responsive image scaling, and semantic layouts ensuring fast load times on all network speeds.",
      "Seamless Deployment & Domain: Hosted on global edge networks (Vercel and Netlify) with instant SSL encryption and custom domain configuration.",
      "Fast Turnaround & Handover: Ready templates can be deployed immediately; custom bespoke builds are delivered with step-by-step updates and revisions.",
    ],
    architecturePointsEn: [
      "Tailored Tech Stack: Built using Next.js 16 App Router for complex dynamic projects, or Vanilla HTML5/CSS3/JS for ultra-lightweight zero-dependency websites.",
      "High Performance Engineering: Optimized assets, responsive image scaling, and semantic layouts ensuring fast load times on all network speeds.",
      "Seamless Deployment & Domain: Hosted on global edge networks (Vercel and Netlify) with instant SSL encryption and custom domain configuration.",
      "Fast Turnaround & Handover: Ready templates can be deployed immediately; custom bespoke builds are delivered with step-by-step updates and revisions.",
    ],
    architecturePointsId: [
      "Pilihan Teknologi Fleksibel: Menggunakan Next.js 16 App Router untuk proyek dinamis modern, atau Vanilla HTML5/CSS3/JS murni untuk website super ringan tanpa dependensi.",
      "Rekayasa Performa Tinggi: Optimasi aset, skala gambar responsif, dan struktur kode semantik untuk kecepatan akses maksimal.",
      "Deployment & Setup Domain: Dihosting di jaringan edge global (Vercel & Netlify) dengan enkripsi SSL otomatis dan kemudahan pasang domain sendiri.",
      "Serah Terima Cepat: Website template yang sudah jadi bisa langsung diambil & online, sedangkan website kustom dikerjakan secara transparan dengan revisi.",
    ],
    clientShowcase: {
      clientName: "Dhitya Web Service",
      clientRoleEn: "Web Engineer & Digital Solutions",
      clientRoleId: "Web Engineer & Solusi Digital",
      clientInstagram: "@dhityanurhadi",
      clientInstagramUrl: "https://www.instagram.com",
      clientWhatsapp: "https://wa.me/6289638194578",
      usageDescriptionEn:
        "Bespoke web development services and production-ready websites open for acquisition. Clients can order custom website development or purchase ready-made completed websites.",
      usageDescriptionId:
        "Layanan pembuatan website kustom serta koleksi website siap pakai yang siap dibeli. Pembeli dapat memesan pembuatan website baru dari nol atau langsung membeli website yang sudah jadi.",
      siteTypeEn: "Custom Web Development & Production Ready Websites",
      siteTypeId: "Jasa Pembuatan Website Kustom & Website Siap Beli",
      deliverablesEn: [
        "Bespoke website development based on client request & design preferences",
        "Ready-to-buy pre-built website templates in Next.js and HTML5 stacks",
        "Direct consultation and quick setup for custom domain & hosting",
        "Mobile responsive optimization, SEO fundamentals, and custom interactive features",
      ],
      deliverablesId: [
        "Jasa pembuatan website baru sesuai kebutuhan dan preferensi desain Anda",
        "Koleksi website siap beli yang sudah jadi (tersedia versi Next.js dan HTML5)",
        "Konsultasi 1-on-1 dan bantuan pasang domain serta hosting hingga online",
        "Optimasi responsif mobile, dasar-dasar SEO, dan animasi interaktif kustom",
      ],
      keyHighlightsEn: [
        "Open for Custom Web Development: Ready to build custom websites for businesses, creators, and freelancers.",
        "Ready-to-Buy Stock: Browse completed websites and acquire them instantly.",
        "Flexible Stacks: Next.js 16 modern dynamic apps or zero-dependency pure HTML/CSS/JS.",
      ],
      keyHighlightsId: [
        "Buka Jasa Pembuatan Website: Siap membuatkan website custom untuk bisnis, kreator, dan profesional.",
        "Koleksi Website Siap Beli: Tersedia website yang sudah selesai dan tinggal dibeli langsung.",
        "Pilihan Stack Fleksibel: Mulai dari Next.js 16 modern hingga Vanilla HTML/CSS/JS super ringan.",
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
