import { Project, ExperienceItem, SkillCategory, RenderItem } from '@/types/portfolio';

export const SOCIAL_LINKS = {
  email: 'dhityanurhadi3011@gmail.com',
  whatsapp: 'https://wa.me/6289638194578',
  github: 'https://github.com/Dhityavv',
  githubProjects: 'https://github.com/Dhityavv?tab=repositories',
  instagram: 'https://www.instagram.com/dhityavv/',
  tiktok: 'https://www.tiktok.com/@dhityavv',
  discord: '@dhityavv',
  liveSite: 'https://www.dhitya-space.my.id',
};

export const PROJECTS: Project[] = [
  {
    id: 'cytune',
    categories: ['web'],
    featured: true,
    visualType: 'cytune',
    en: {
      categoryLabel: 'Music Platform',
      title: 'CyTune',
      role: 'Full-Stack Developer & UI Architect',
      status: 'Live Production',
      summary: 'High-fidelity music streaming platform combining low-latency audio playback, Supabase user persistence, dynamic queueing, and a tactile dark UI.',
      highlights: [
        'Engineered persistent HTML5 audio core with seamless track switching and queue management.',
        'Integrated Supabase database tables for playlist curation, favorites, and user library sync.',
        'Designed an editorial artwork-first music interface with responsive controls.'
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      links: [
        { label: 'Launch Application', href: 'https://cytune-music.vercel.app', primary: true },
        { label: 'GitHub Repository', href: 'https://github.com/Dhityavv/CyTune', primary: false }
      ]
    },
    id_lang: {
      categoryLabel: 'Platform Musik',
      title: 'CyTune',
      role: 'Full-Stack Developer & UI Architect',
      status: 'Produksi Aktif',
      summary: 'Platform streaming musik modern dengan pemutar audio latensi rendah, sinkronisasi Supabase, manajemen antrean dinamis, dan antarmuka gelap yang presisi.',
      highlights: [
        'Membangun engine pemutar audio HTML5 persisten dengan transisi lagu dan antrean mulus.',
        'Mengintegrasikan Supabase untuk sinkronisasi playlist, lagu favorit, dan pustaka pengguna.',
        'Merancang antarmuka musik berfokus pada artwork dengan kontrol navigasi responsif.'
      ],
      tags: ['Next.js', 'React', 'TypeScript', 'Supabase', 'Tailwind CSS'],
      links: [
        { label: 'Buka Aplikasi', href: 'https://cytune-music.vercel.app', primary: true },
        { label: 'Repositori GitHub', href: 'https://github.com/Dhityavv/CyTune', primary: false }
      ]
    }
  },
  {
    id: 'grainox',
    categories: ['web'],
    featured: true,
    visualType: 'grainox',
    en: {
      categoryLabel: 'Web Utility',
      title: 'Grainox',
      role: 'Front-End Developer',
      status: 'Live Production',
      summary: 'Fast, minimal web utility hub combining AI image upscaling, media downloading, and format conversion inside one unified dashboard.',
      highlights: [
        'Built modular Next.js components with instant status feedback and low bundle overhead.',
        'Optimized for mobile and desktop screens with zero-distraction workflows.'
      ],
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      links: [
        { label: 'Open Application', href: 'https://grainox.vercel.app', primary: true },
        { label: 'GitHub Repository', href: 'https://github.com/Dhityavv/Grainox', primary: false }
      ]
    },
    id_lang: {
      categoryLabel: 'Utilitas Web',
      title: 'Grainox',
      role: 'Front-End Developer',
      status: 'Produksi Aktif',
      summary: 'Hub utilitas web cepat dan bersih yang menggabungkan AI image upscaler, pengunduh media, dan konverter format dalam satu dashboard terpadu.',
      highlights: [
        'Membangun komponen Next.js modular dengan feedback instan dan performa ringan.',
        'Dioptimalkan untuk kenyamanan di desktop dan ponsel dengan tata letak minimalis.'
      ],
      tags: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
      links: [
        { label: 'Buka Aplikasi', href: 'https://grainox.vercel.app', primary: true },
        { label: 'Repositori GitHub', href: 'https://github.com/Dhityavv/Grainox', primary: false }
      ]
    }
  },
  {
    id: 'orbitry',
    categories: ['3d', 'web'],
    featured: true,
    visualType: 'orbitry',
    en: {
      categoryLabel: '3D Web Tool',
      title: 'Orbitry',
      role: 'Creator & Frontend/WebGL Engineer',
      status: 'Live Production',
      summary: 'Browser-based 3D model converter & interactive viewer built with Next.js, TypeScript, and Three.js for inspecting GLTF, GLB, OBJ, and FBX assets with wireframe & lighting toggles.',
      highlights: [
        'Integrated Three.js/WebGL canvas with floating controls for directional light, wireframe inspection, and material shading.',
        'Bridges the gap between Blender 3D asset pipelines and browser accessibility without requiring local 3D software.',
        'Engineered responsive viewport camera controls with smooth orbit damping and bounding box calculations.'
      ],
      tags: ['Next.js', 'TypeScript', 'Three.js', 'WebGL', 'Tailwind CSS'],
      links: [
        { label: 'Launch Application', href: 'https://orbitry-models.vercel.app', primary: true },
        { label: 'GitHub Repository', href: 'https://github.com/Dhityavv/Orbitry', primary: false }
      ]
    },
    id_lang: {
      categoryLabel: '3D Web Tool',
      title: 'Orbitry',
      role: 'Kreator & Frontend/WebGL Engineer',
      status: 'Produksi Aktif',
      summary: 'Tool konversi dan penampil model 3D berbasis web yang dibangun dengan Next.js, TypeScript, dan Three.js untuk memuat dan menginspeksi file GLTF, GLB, OBJ, dan FBX.',
      highlights: [
        'Mengintegrasikan canvas Three.js/WebGL dengan floating control pencahayaan, inspeksi wireframe, dan shading material.',
        'Menjembatani alur kerja aset 3D Blender agar dapat diakses langsung melalui browser tanpa software lokal.',
        'Mengatur kontrol kamera viewport responsif dengan orbit damping halus dan kalkulasi bounding box.'
      ],
      tags: ['Next.js', 'TypeScript', 'Three.js', 'WebGL', 'Tailwind CSS'],
      links: [
        { label: 'Buka Aplikasi', href: 'https://orbitry-models.vercel.app', primary: true },
        { label: 'Repositori GitHub', href: 'https://github.com/Dhityavv/Orbitry', primary: false }
      ]
    }
  },
  {
    id: 'filra',
    categories: ['web'],
    featured: true,
    visualType: 'filra',
    en: {
      categoryLabel: 'Web Application',
      title: 'Filra',
      role: 'Full-Stack Developer',
      status: 'Live Production',
      summary: 'Cinematic film rating and curation platform built with Next.js App Router, Tailwind CSS, and Supabase for discovering movies, rating stars, and managing personal watchlists.',
      highlights: [
        'Engineered an internal proxy routing architecture to fetch film metadata seamlessly with low latency.',
        'Implemented Supabase database tables for personal reviews, star ratings, user authentication, and persistent watchlists.',
        'Designed a dark, distraction-free cinematic UI tailored for movie enthusiasts.'
      ],
      tags: ['Next.js App Router', 'React', 'Tailwind CSS', 'Supabase', 'Vercel'],
      links: [
        { label: 'Open Application', href: 'https://filra.vercel.app', primary: true },
        { label: 'GitHub Repository', href: 'https://github.com/Dhityavv/Filra', primary: false }
      ]
    },
    id_lang: {
      categoryLabel: 'Aplikasi Web',
      title: 'Filra',
      role: 'Full-Stack Developer',
      status: 'Produksi Aktif',
      summary: 'Platform rating dan kurasi film bernuansa sinematik yang dibangun dengan Next.js App Router, Tailwind CSS, dan Supabase untuk menemukan film, memberi rating, dan menyimpan watchlist.',
      highlights: [
        'Merancang arsitektur proxy internal untuk mengambil metadata film secara cepat dan efisien.',
        'Mengintegrasikan database Supabase untuk ulasan film, sistem rating bintang, autentikasi, dan daftar tontonan tersimpan.',
        'Mendesain antarmuka gelap yang fokus pada konten dan estetika poster sinematik.'
      ],
      tags: ['Next.js App Router', 'React', 'Tailwind CSS', 'Supabase', 'Vercel'],
      links: [
        { label: 'Buka Aplikasi', href: 'https://filra.vercel.app', primary: true },
        { label: 'Repositori GitHub', href: 'https://github.com/Dhityavv/Filra', primary: false }
      ]
    }
  },
  {
    id: 'bookshelf',
    categories: ['mod'],
    featured: false,
    visualType: 'bookshelf',
    en: {
      categoryLabel: 'Minecraft Mod',
      title: 'Universal Chiseled Bookshelf',
      role: 'Mod Author & Maintainer',
      status: 'Open Source • CC0-1.0',
      summary: 'A lightweight Minecraft Java Edition mod built with Fabric API that expands Chiseled Bookshelf storage and interactions while preserving vanilla game balance.',
      highlights: [
        'Engineered clean Java Mixins targeting block entity insertion logic for maximum compatibility with other mods.',
        'Released under CC0-1.0 public domain with structured version control, build workflows, and documentation on GitHub.'
      ],
      tags: ['Java', 'Fabric API', 'Mixins', 'Minecraft', 'CC0-1.0'],
      links: [
        { label: 'View on GitHub', href: 'https://github.com/Dhityavv/Universal-Chiseled-Bookshelf', primary: true }
      ]
    },
    id_lang: {
      categoryLabel: 'Mod Minecraft',
      title: 'Universal Chiseled Bookshelf',
      role: 'Pembuat & Pengelola Mod',
      status: 'Open Source • CC0-1.0',
      summary: 'Mod ringan Minecraft Java Edition berbasis Fabric API yang memperluas fungsi penyimpanan Chiseled Bookshelf dengan tetap menjaga keseimbangan gameplay vanilla.',
      highlights: [
        'Menerapkan Mixin Java yang bersih pada logika block entity demi kompatibilitas maksimal dengan mod lain.',
        'Dirilis di bawah lisensi CC0-1.0 public domain dengan alur kerja build dan dokumentasi rilis terstruktur di GitHub.'
      ],
      tags: ['Java', 'Fabric API', 'Mixins', 'Minecraft', 'CC0-1.0'],
      links: [
        { label: 'Lihat di GitHub', href: 'https://github.com/Dhityavv/Universal-Chiseled-Bookshelf', primary: true }
      ]
    }
  }
];

export const RENDERS_SHOWCASE: RenderItem[] = [
  {
    id: 'lenovo-loq',
    category: 'animation',
    categoryLabelEn: 'Animation',
    categoryLabelId: 'Animasi',
    titleEn: 'Lenovo LOQ 15ARP10E Cinematic',
    titleId: 'Sinematik Lenovo LOQ 15ARP10E',
    descEn: 'Commercial 3D laptop animation featuring camera orbit sweeps, metallic chassis reflection, keyboard glow, and studio key illumination.',
    descId: 'Animasi 3D komersial laptop dengan rotasi kamera dinamis, pantulan sasis metalik, pencahayaan keyboard, dan lighting studio.',
    image: '/assets/Lenovo LOQ 15ARP10E.png',
    images: ['/assets/Lenovo LOQ 15ARP10E.png'],
    video: '/assets/LOQ_Cinematic_0001-0240.mp4',
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Laptop Commercial', 'Motion Cinematic', 'PBR Metal', 'Key Lighting'],
  },
  {
    id: 'rumah-tradisional',
    category: 'architecture',
    categoryLabelEn: 'Architecture',
    categoryLabelId: 'Arsitektur',
    titleEn: 'Traditional Indonesian House',
    titleId: 'Rumah Tradisional Indonesia',
    descEn: 'Architectural 3D study of traditional Indonesian wooden countryside dwelling with layered roof shingles, dusk illumination, and stylized trees.',
    descId: 'Studi arsitektur 3D rumah kayu tradisional Indonesia dengan atap sirap bertingkat, tata cahaya senja hangat, dan vegetasi stylized.',
    image: '/assets/Rumah Tradisional Render1.webp',
    images: ['/assets/Rumah Tradisional Render1.webp', '/assets/Rumah Tradisional Render2.png'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Traditional House', 'Exterior Shading', 'Wood Tiles', 'Stylized Foliage'],
  },
  {
    id: 'ikan-3d',
    category: 'character',
    categoryLabelEn: 'Character',
    categoryLabelId: 'Karakter',
    titleEn: '3 Types of Fish v1',
    titleId: '3 Variasi Model Ikan v1',
    descEn: 'A 3D character study of three distinct fish species modeled in Blender with clean quad topology, aquatic body curves, and stylized fin geometries.',
    descId: 'Studi karakter 3D tiga spesies ikan yang dimodelkan di Blender dengan topologi quad rapi, lekukan tubuh dinamis, dan geometri sirip stylized.',
    image: '/assets/Ikan 1 v1.webp',
    images: ['/assets/Ikan 1 v1.webp', '/assets/Ikan 2 v1.webp', '/assets/Ikan 3 v1.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Aquatic Fauna', 'Quad Topology', 'Subsurface Shading', 'Stylized Fins'],
  },
];

// Complete 3D Archives for /blender-showcase (Curated Multi-Angle Artworks)
export const ALL_BLENDER_ARCHIVES: RenderItem[] = [
  {
    id: 'lenovo-loq',
    category: 'animation',
    categoryLabelEn: 'Animation',
    categoryLabelId: 'Animasi',
    titleEn: 'Lenovo LOQ 15ARP10E Cinematic',
    titleId: 'Sinematik Lenovo LOQ 15ARP10E',
    descEn: 'Commercial 3D laptop animation featuring camera orbit sweeps, metallic chassis reflection, keyboard glow, and studio key illumination.',
    descId: 'Animasi 3D komersial laptop dengan rotasi kamera dinamis, pantulan sasis metalik, pencahayaan keyboard, dan lighting studio.',
    image: '/assets/Lenovo LOQ 15ARP10E.png',
    images: ['/assets/Lenovo LOQ 15ARP10E.png'],
    video: '/assets/LOQ_Cinematic_0001-0240.mp4',
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Laptop Commercial', 'Motion Cinematic', 'PBR Metal', 'Key Lighting'],
  },
  {
    id: 'rumah-tradisional',
    category: 'architecture',
    categoryLabelEn: 'Architecture',
    categoryLabelId: 'Arsitektur',
    titleEn: 'Traditional Indonesian House',
    titleId: 'Rumah Tradisional Indonesia',
    descEn: 'Architectural 3D study of traditional Indonesian wooden countryside dwelling with layered roof shingles, dusk illumination, and stylized trees.',
    descId: 'Studi arsitektur 3D rumah kayu tradisional Indonesia dengan atap sirap bertingkat, tata cahaya senja hangat, dan vegetasi stylized.',
    image: '/assets/Rumah Tradisional Render1.webp',
    images: ['/assets/Rumah Tradisional Render1.webp', '/assets/Rumah Tradisional Render2.png'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Traditional House', 'Exterior Shading', 'Wood Tiles', 'Stylized Foliage'],
  },
  {
    id: 'ikan-3d',
    category: 'character',
    categoryLabelEn: 'Character',
    categoryLabelId: 'Karakter',
    titleEn: '3 Types of Fish v1',
    titleId: '3 Variasi Model Ikan v1',
    descEn: 'Three aquatic creature variants modeled with clean quad topology, subsurface scattering skin, and stylized fin curvature.',
    descId: 'Tiga variasi karakter ikan dengan topologi quad bersih, subsurface scattering, dan lekukan sirip dinamis.',
    image: '/assets/Ikan 1 v1.webp',
    images: ['/assets/Ikan 1 v1.webp', '/assets/Ikan 2 v1.webp', '/assets/Ikan 3 v1.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Creature Modeling', 'Quad Topology', 'Subsurface', 'Stylized'],
  },
  {
    id: 'ikan-3d-v2',
    category: 'character',
    categoryLabelEn: 'Character',
    categoryLabelId: 'Karakter',
    titleEn: '3 Types of Fish v2 (Revised)',
    titleId: '3 Variasi Model Ikan v2 (Revisi)',
    descEn: 'Revised 3D creature sculpt featuring optimized quad mesh flow, refined tail silhouette, and procedural fish scale reflections.',
    descId: 'Revisi model karakter 3D ikan dengan alur mesh quad teroptimasi, siluet ekor lebih luwes, dan pantulan sisik prosedural.',
    image: '/assets/Ikan 1 v2.webp',
    images: ['/assets/Ikan 1 v2.webp', '/assets/Ikan 2 v2.webp', '/assets/Ikan 3 v2.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Creature Modeling', 'Quad Topology', 'Mesh Revision', 'Fish Scales'],
  },
  {
    id: 'redmi-note13',
    category: 'animation',
    categoryLabelEn: 'Animation',
    categoryLabelId: 'Animasi',
    titleEn: 'Redmi Note 13 4G Animation',
    titleId: 'Animasi Redmi Note 13 4G',
    descEn: 'Commercial product visualization featuring curved edge geometry, dual glass layers, camera sweeps, and studio softbox setups.',
    descId: 'Visualisasi produk komersial dengan detail geometri bodi tipis, material kaca ganda, pergerakan kamera halus, dan studio lighting.',
    image: '/assets/Redmi Note 13 4G Animation.webp',
    images: ['/assets/Redmi Note 13 4G Animation.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Product Animation', 'Motion Design', 'Camera Staging', 'PBR Glass'],
  },
  {
    id: 'layouting-envi',
    category: 'environment',
    categoryLabelEn: 'Environment',
    categoryLabelId: 'Lingkungan',
    titleEn: 'Layouting Environment Ricefield',
    titleId: 'Layouting Lingkungan Sawah',
    descEn: 'Staged terraced ricefield landscape in Blender with procedural scattering, fog density layers, and natural daylight simulation.',
    descId: 'Lansekap pertanian berundak di Blender dengan scattering rumpun padi, kabut volumetrik, dan simulasi cahaya matahari natural.',
    image: '/assets/Layouting Envi Render.webp',
    images: ['/assets/Layouting Envi Render.webp', '/assets/Sawah Render viewport.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Ricefield Terraces', 'Procedural Scattering', 'Atmosphere', 'Daylight'],
  },
  {
    id: 'tree-animation',
    category: 'animation',
    categoryLabelEn: 'Animation',
    categoryLabelId: 'Animasi',
    titleEn: 'Wind-Swept Tree Dynamic',
    titleId: 'Dinamika Animasi Pohon Berangin',
    descEn: 'Tree animation with custom vertex weights and wind deformation modifiers for stylized environmental foliage movement.',
    descId: 'Animasi gerak pohon dengan pembobotan vertex khusus dan modifier deformasi angin untuk pergerakan dahan dedaunan alami.',
    image: '/assets/Tree Animation.webp',
    images: ['/assets/Tree Animation.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Nature Animation', 'Foliage Dynamics', 'Wind Rigging', 'Procedural'],
  },
  {
    id: 'stylized-tree',
    category: 'environment',
    categoryLabelEn: 'Environment',
    categoryLabelId: 'Lingkungan',
    titleEn: 'Stylized Foliage & Tree Study',
    titleId: 'Studi Pohon & Dedaunan Stylized',
    descEn: 'Detailed stylized 3D tree layout with clustered leaf mesh volumes, trunk curvature modeling, and ambient occlusion vertex shading.',
    descId: 'Studi pemodelan pohon stylized dengan klaster volume dedaunan rimbun, lekukan batang alami, dan shading ambient occlusion.',
    image: '/assets/Tree.webp',
    images: ['/assets/Tree.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Stylized Tree', 'Foliage Cluster', 'Trunk Modeling', 'Nature Asset'],
  },
  {
    id: 'layouting-forest',
    category: 'environment',
    categoryLabelEn: 'Environment',
    categoryLabelId: 'Lingkungan',
    titleEn: 'Layouting Forest Study',
    titleId: 'Studi Layouting Hutan Berkabut',
    descEn: 'Atmospheric environment study featuring deep volumetric mist, moody lighting, and weathered environmental set dressing.',
    descId: 'Studi lingkungan atmosferik dengan kabut volumetrik tebal, pencahayaan moody dramatis, dan set dressing detail.',
    image: '/assets/Layouting Forest Render.webp',
    images: ['/assets/Layouting Forest Render.webp', '/assets/Layouting Forest Viewport.png'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Forest Atmosphere', 'Volumetric Fog', 'Mood Lighting', 'Set Dressing'],
  },
  {
    id: 'mask-nara',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Mask Nara',
    titleId: 'Topeng Nara',
    descEn: 'Character face mask modeled with dual material variants: distressed leather stitching and glossy hard plastic.',
    descId: 'Topeng karakter yang dimodelkan dengan dua varian material: kulit bertekstur jahitan dan plastik mengkilap.',
    image: '/assets/Mask_Nara_Leather_Render_Front.png',
    images: ['/assets/Mask_Nara_Leather_Render_Front.png', '/assets/Mask_Nara_Plastic_Render_Front.png'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Character Mask', 'Leather Texture', 'Plastic Specular', 'PBR Props'],
  },
  {
    id: 'tedung-keraton',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Tedung Keraton',
    titleId: 'Tedung Keraton Tradisional',
    descEn: '3D model of royal ceremonial umbrella (Tedung Keraton) with golden fabric tassels, carved wooden stem, and fabric fold texturing.',
    descId: 'Model 3D payung upacara adat keraton dengan rumbai kain emas, ukiran kayu tradisional, dan tekstur lipatan kain realistis.',
    image: '/assets/Tedung Keraton.webp',
    images: ['/assets/Tedung Keraton.webp', '/assets/Tedung Keraton 2.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Cultural Heritage', 'Royal Umbrella', 'Wood Carving', 'Fabric Tassels'],
  },
  {
    id: 'book-floor',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Book on the Floor',
    titleId: 'Buku Tergeletak di Lantai',
    descEn: 'Photorealistic hard-surface prop study of an open book lying on floorboards with paper edge displacement and diffuse page textures.',
    descId: 'Studi prop 3D buku terbuka di atas lantai kayu dengan displacement tepi lembaran kertas dan tekstur halaman difus.',
    image: '/assets/Book In Floor.webp',
    images: ['/assets/Book In Floor.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Book Prop', 'Paper Shading', 'Floor Layout', 'Hard Surface'],
  },
  {
    id: 'meja-study',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Stylized Wooden Table',
    titleId: 'Meja Kayu Stylized',
    descEn: 'Hand-crafted stylized wooden table prop featuring bevelled planks, subtle wood grain displacement, and sturdy joinery geometry.',
    descId: 'Prop meja kayu stylized dengan sambungan sudut halus, alur serat kayu bertekstur, dan geometri konstruksi kokoh.',
    image: '/assets/Meja.webp',
    images: ['/assets/Meja.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Wooden Table', 'Bevel Geometry', 'Wood Planks', 'Interior Prop'],
  },
  {
    id: '3-flags',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: '3 Ceremonial Flags',
    titleId: '3 Bendera Upacara Adat',
    descEn: 'Traditional ceremonial flag trio (Amertha, Kshetra, Madya) featuring distinct Balinese banner emblems, fabric wrinkles, and ornamental tassels.',
    descId: 'Trio bendera upacara adat (Amertha, Kshetra, Madya) dengan lambang kain tradisional, kerutan bahan alami, dan rumbai ornamen.',
    image: '/assets/Bendera Amertha.webp',
    images: ['/assets/Bendera Amertha.webp', '/assets/Bendera Kshetra.webp', '/assets/Bendera Madya.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Ceremonial Banners', 'Balinese Flags', 'Cloth Physics', 'Cultural Heritage'],
  },
  {
    id: 'mug-ceramic',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Stylized Ceramic Mug',
    titleId: 'Cangkir Keramik Stylized',
    descEn: 'Smooth ceramic drinking mug modeled with curved ergonomic handle, glossy porcelain glaze specular, and subtle lip rim bevel.',
    descId: 'Cangkir minum keramik dengan gagang lengkung ergonomis, kilau glasir porselen halus, dan bevel bibir cangkir presisi.',
    image: '/assets/Mug.webp',
    images: ['/assets/Mug.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Ceramic Mug', 'Porcelain Glaze', 'Smooth Bevel', 'Stylized Prop'],
  },
  {
    id: 'ninja-character',
    category: 'character',
    categoryLabelEn: 'Character',
    categoryLabelId: 'Karakter',
    titleEn: 'Stylized Ninja Character',
    titleId: 'Karakter Pendekar Ninja Stylized',
    descEn: 'Stylized ninja warrior character modeled across dual stance angles with cloth cowl folds, ninja mask, and clean quad edge loops.',
    descId: 'Karakter pendekar ninja stylized dengan dua sudut pose, lipatan tudung kain, topeng ninja, dan edge loop quad rapi.',
    image: '/assets/Ninja 1.webp',
    images: ['/assets/Ninja 1.webp', '/assets/Ninja 2.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Ninja Character', 'Cloth Folds', 'Quad Topology', 'Stylized Anatomy'],
  },
  {
    id: 'fire-hydrant',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Fire Hydrant Prop',
    titleId: 'Hidran Pemadam Kebakaran',
    descEn: 'Hard-surface municipal fire hydrant prop with brass valve nozzles, embossed bolt heads, and vibrant industrial paint shader.',
    descId: 'Prop hidran pemadam kebakaran hard-surface dengan nozzle katup kuningan, baut timbul presisi, dan cat industri mencolok.',
    image: '/assets/Hydrant.webp',
    images: ['/assets/Hydrant.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Fire Hydrant', 'Brass Nozzle', 'Bolt Detailing', 'Urban Prop'],
  },
  {
    id: 'among-us-chicks',
    category: 'character',
    categoryLabelEn: 'Character',
    categoryLabelId: 'Karakter',
    titleEn: 'Among Us Crewmate & Chicks',
    titleId: 'Among Us & Anak Ayam',
    descEn: 'Playful character model of an Among Us crewmate astronaut accompanied by adorable stylized yellow chick companions.',
    descId: 'Model karakter astronot Among Us yang dipadukan dengan anak ayam kuning menggemaskan bergaya stylized.',
    image: '/assets/Among Us.webp',
    images: ['/assets/Among Us.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2026',
    tags: ['Among Us', 'Stylized Characters', 'Cute Fauna', 'Quad Mesh'],
  },
  {
    id: 'katana-weapon',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Katana',
    titleId: 'Katana',
    descEn: 'Traditional curved steel blade with hamon temper line, ray-skin tsuka wrap, brass tsuba, and lacquered saya reflection.',
    descId: 'Bilah baja melengkung dengan garis hamon, lilitan pegangan kulit ikan pari, tsuba kuningan, dan kilau sarung kayu pernis.',
    image: '/assets/Katana.webp',
    images: ['/assets/Katana.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Cycles',
    year: '2025',
    tags: ['Steel Blade', 'Tsuka Wrap', 'Hamon Line', 'Weapons'],
  },
  {
    id: 'sushi-sashimi',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Sushi & Sashimi',
    titleId: 'Sushi & Sashimi',
    descEn: 'Detailed food presentation with translucent salmon texture, nori roughness, sesame seed instancing, and lacquer wooden platter.',
    descId: 'Studi material makanan dengan tekstur salmon semi-transparan, kekasaran nori, instancing biji wijen, dan piring kayu pernis.',
    image: '/assets/Sushi & Sashimi.webp',
    images: ['/assets/Sushi & Sashimi.webp'],
    blenderVersion: 'Blender 5.3',
    renderEngine: 'Eevee',
    year: '2025',
    tags: ['Salmon Sashimi', 'Food Shading', 'Subsurface', 'Platter'],
  },
  {
    id: 'nintendo-switch',
    category: 'prop',
    categoryLabelEn: 'Props',
    categoryLabelId: 'Props',
    titleEn: 'Nintendo Switch Console',
    titleId: 'Konsol Nintendo Switch',
    descEn: 'Precision hard-surface modeling study of the handheld console, joycons, matte plastic shaders, and accurate button bevels created for 3D peer tutorial curriculum.',
    descId: 'Studi pemodelan hard-surface konsol genggam, joy-con, shader plastik matte, dan bevel tombol presisi yang dibuat untuk materi kurikulum Tutor Sebaya 3D.',
    image: '/assets/Nintendo Switch.webp',
    images: ['/assets/Nintendo Switch.webp'],
    blenderVersion: 'Blender 3.6 LTS',
    renderEngine: 'Eevee',
    year: '2026',
    tags: ['Handheld Console', 'Plastic Matte', 'Hard Surface', 'Tutor Sebaya'],
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'dev-indie',
    roleEn: 'Independent Creative Developer & 3D Artist',
    roleId: 'Independent Creative Developer & Seniman 3D',
    orgEn: 'Dhityavv • Web Tools, 3D Pipelines & Open-Source',
    orgId: 'Dhityavv • Web Tools, Pipeline 3D & Open-Source',
    date: '2026 – Present',
    dateEn: '2026 – Present',
    dateId: '2026 – Sekarang',
    bulletsEn: [
      'Crafted high-fidelity 3D assets, product motions, and stylized environments using Blender 5.3 (Cycles).',
      'Engineered CyTune music streaming player and Orbitry interactive 3D model viewer with Next.js & Three.js.',
      'Maintained open-source web platforms, image conversion utilities (Grainox), and Fabric mod repositories.'
    ],
    bulletsId: [
      'Membuat aset 3D fidelitas tinggi, animasi produk, dan lingkungan stylized menggunakan Blender 5.3 (Cycles).',
      'Membangun web pemutar musik CyTune dan penampil model 3D interaktif Orbitry dengan Next.js & Three.js.',
      'Mengembangkan platform web mandiri, utilitas konversi gambar (Grainox), serta repositori mod Fabric open-source.'
    ],
    isCurrent: true
  },
  {
    id: 'pkl-lys',
    roleEn: '3D Animation Production (PKL)',
    roleId: 'Produksi Animasi 3D (PKL)',
    orgEn: 'LYS Animation Studio',
    orgId: 'Studio Animasi LYS',
    date: '10 Jun – 20 Dec 2025',
    dateEn: '10 Jun – 20 Dec 2025',
    dateId: '10 Jun – 20 Des 2025',
    bulletsEn: [
      'Operated within the studio 3D pipeline using Blender 4.5 for production-grade asset modeling and set dressing.',
      'Executed studio lighting setups, camera staging, and managed render sequences following production model sheets.'
    ],
    bulletsId: [
      'Bekerja dalam pipeline produksi 3D studio menggunakan Blender 4.5 untuk pemodelan aset dan set dressing.',
      'Mengeksekusi tata cahaya studio, camera staging, serta pengelolaan render sequence sesuai model sheet produksi.'
    ],
    isCurrent: false
  },
  {
    id: 'tutor-sebaya',
    roleEn: '3D Blender Peer Tutor (Tutor Sebaya 3D)',
    roleId: 'Tutor Sebaya 3D — Blender',
    orgEn: 'Peer Mentorship Program — Batch 1 & Batch 2',
    orgId: 'Program Mentoring Sebaya — Batch 1 & Batch 2',
    date: 'Batch 1: 26–30 Oct • Batch 2: 9–13 Nov',
    dateEn: 'Batch 1: 26–30 Oct • Batch 2: 9–13 Nov',
    dateId: 'Batch 1: 26–30 Okt • Batch 2: 9–13 Nov',
    bulletsEn: [
      'Delivered intensive Blender 3.6 LTS peer tutoring across Batch 1 (26–30 Oct) and Batch 2 (9–13 Nov).',
      'Guided peer students through fundamental 3D concepts: primitive blocking, modifier stacks, quad topology, and low-poly asset creation.',
      'Demystified the Blender interface and viewport navigation to build student confidence and hands-on modeling skills.'
    ],
    bulletsId: [
      'Menyelenggarakan bimbingan intensif Blender 3.6 LTS untuk Batch 1 (26–30 Okt) dan Batch 2 (9–13 Nov).',
      'Membimbing rekan siswa memahami dasar 3D: blocking bentuk primitif, modifier stack, topologi quad, dan pembuatan aset low-poly.',
      'Menyederhanakan pemahaman antarmuka dan navigasi viewport Blender agar rekan sebaya percaya diri berkarya.'
    ],
    isCurrent: false
  },
  {
    id: 'smk-anim',
    roleEn: 'Vocational High School (SMK) — Animation',
    roleId: 'SMK Jurusan Animasi',
    orgEn: '3D Art, Asset Modeling & Animation Pipeline',
    orgId: 'Seni 3D, Pemodelan Aset & Pipeline Animasi',
    date: '2024 – Present',
    dateEn: '2024 – Present',
    dateId: '2024 – Sekarang',
    bulletsEn: [
      'Majoring in 3D animation, asset layouting, PBR shading, and commercial product visualization.',
      'Hands-on training in production controlling, storyboarding, quad-based mesh modeling, and camera composition.'
    ],
    bulletsId: [
      'Menempuh kejuruan animasi 3D, layouting aset, shading PBR, serta visualisasi produk komersial.',
      'Praktik langsung dalam controlling produksi, storyboard, pemodelan mesh berbasis quad, dan komposisi kamera.'
    ],
    isCurrent: false
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    titleEn: '3D & Animation',
    titleId: 'Seni 3D & Animasi',
    iconName: '3d',
    skills: ['Blender (5.3 / 4.5 / 3.6)', 'Cycles & Eevee', 'Geometry Nodes', 'Quad Topology', 'PBR Texturing', 'Camera Staging', 'Product Animation']
  },
  {
    titleEn: 'Web Development',
    titleId: 'Pengembangan Web',
    iconName: 'web',
    skills: ['Next.js App Router', 'React', 'TypeScript', 'Three.js / WebGL', 'Tailwind CSS', 'Supabase', 'Vercel']
  },
  {
    titleEn: 'Systems & Tools',
    titleId: 'Sistem, Game & Tools',
    iconName: 'sys',
    skills: ['Java / Fabric API', 'Git & GitHub', 'Roblox Studio (Luau)', 'Canva & Design', 'Linux / WSL', 'Obsidian']
  }
];

export const QUICK_PROFILE = {
  name: 'Dhitya Nurhadi',
  roleEn: 'SMK Animation Student / Creative Developer & 3D Artist',
  roleId: 'Siswa SMK Animasi / Creative Developer & 3D Artist',
  focusEn: '3D Modeling, Environment Art, Web Apps & Creative Tech',
  focusId: 'Pemodelan 3D, Environment Art, Aplikasi Web & Creative Tech',
  interestsEn: 'Gaming, Minecraft Modding, Anime & Manhwa, AI Workflows',
  interestsId: 'Gaming, Modding Minecraft, Anime & Manhwa, AI Workflows',
  locationEn: 'Indonesia • Open for Collaboration',
  locationId: 'Indonesia • Terbuka untuk Kolaborasi',
};
