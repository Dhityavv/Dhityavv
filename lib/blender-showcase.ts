export interface BlenderShowcasePhoto {
  label: string;
  labelEn?: string;
  labelId?: string;
  url: string;
}

export interface BlenderShowcaseItem {
  id: string;
  title: string;
  titleEn?: string;
  titleId?: string;
  subtitle: string;
  subtitleEn?: string;
  subtitleId?: string;
  filename: string;
  photos: BlenderShowcasePhoto[];
  description: string;
  descriptionEn?: string;
  descriptionId?: string;
  tags: string[];
  tagsEn?: string[];
  tagsId?: string[];
  stats: {
    tool: string;
    style: string;
    styleEn?: string;
    styleId?: string;
    renderNote: string;
    renderNoteEn?: string;
    renderNoteId?: string;
  };
}

export const BLENDER_SHOWCASE: BlenderShowcaseItem[] = [
  {
    id: "indonesian-traditional-house",
    title: "Traditional Indonesian House",
    titleEn: "Traditional Indonesian House",
    titleId: "Rumah Tradisional Indonesia",
    subtitle: "Indonesian Traditional Architecture",
    subtitleEn: "Indonesian Traditional Architecture",
    subtitleId: "Arsitektur Tradisional Indonesia",
    filename: "/assets/Rumah Vale Render1.png",
    photos: [
      {
        label: "Main Exterior View",
        labelEn: "Main Exterior View",
        labelId: "Tampilan Eksterior Utama",
        url: "/assets/Rumah Vale Render1.png",
      },
    ],
    description:
      "A medium-poly study of a traditional Indonesian house, featuring timber details, a tiled roof, and warm architectural lighting.",
    descriptionEn:
      "A medium-poly study of a traditional Indonesian house, featuring timber details, a tiled roof, and warm architectural lighting.",
    descriptionId:
      "Studi pemodelan 3D medium-poly rumah adat tradisional Indonesia dengan detail struktur kayu panggung, susunan genteng bernuansa lokal, dan pencahayaan arsitektur hangat.",
    tags: ["Architecture", "House"],
    tagsEn: ["Architecture", "House"],
    tagsId: ["Arsitektur", "Rumah Adat"],
    stats: {
      tool: "Blender · Cycles",
      style: "Medium-Poly Architecture",
      styleEn: "Medium-Poly Architecture",
      styleId: "Arsitektur Medium-Poly",
      renderNote: "Wood textures & warm lighting",
      renderNoteEn: "Wood textures & warm lighting",
      renderNoteId: "Tekstur kayu & pencahayaan hangat",
    },
  },
  {
    id: "layouting-envi",
    title: "Layouting Environment Ricefield",
    titleEn: "Layouting Environment Ricefield",
    titleId: "Tata Lingkungan Area Persawahan",
    subtitle: "Ricefield Environment Layout",
    subtitleEn: "Ricefield Environment Layout",
    subtitleId: "Tata Lingkungan Alam Persawahan",
    filename: "/assets/Layouting Envi Render.png",
    photos: [
      {
        label: "Ricefield Layout",
        labelEn: "Ricefield Layout",
        labelId: "Tata Lingkungan Sawah",
        url: "/assets/Layouting Envi Render.png",
      },
    ],
    description:
      "A staged ricefield environment layout arranged in Blender, with layered scenery and a clear focal composition.",
    descriptionEn:
      "A staged ricefield environment layout arranged in Blender, with layered scenery and a clear focal composition.",
    descriptionId:
      "Komposisi tata lingkungan persawahan tropis berundak di Blender dengan lapisan vegetasi alami, perbukitan hijau, dan titik fokus gubuk petani.",
    tags: ["Environment", "Ricefield Layout"],
    tagsEn: ["Environment", "Ricefield Layout"],
    tagsId: ["Lingkungan Alam", "Area Sawah"],
    stats: {
      tool: "Blender · Cycles",
      style: "Environment Layout",
      styleEn: "Environment Layout",
      styleId: "Tata Letak Lingkungan",
      renderNote: "1,597,600 triangles",
      renderNoteEn: "1,597,600 triangles",
      renderNoteId: "1.597.600 segitiga",
    },
  },
  {
    id: "redmi-animation",
    title: "Redmi Note 13 4G Animation",
    titleEn: "Redmi Note 13 4G Animation",
    titleId: "Animasi Produk Redmi Note 13 4G",
    subtitle: "Product Animation",
    subtitleEn: "Product Animation",
    subtitleId: "Animasi Iklan Produk Komersial",
    filename: "/assets/Redmi Note 13 4G Animation.gif",
    photos: [
      {
        label: "Product Animation",
        labelEn: "Product Animation",
        labelId: "Animasi Produk",
        url: "/assets/Redmi Note 13 4G Animation.gif",
      },
    ],
    description:
      "A product animation featuring the Redmi Note 13 4G, with smooth camera movement, reflective materials, and motion design.",
    descriptionEn:
      "A product animation featuring the Redmi Note 13 4G, with smooth camera movement, reflective materials, and motion design.",
    descriptionId:
      "Animasi motion produk komersial Redmi Note 13 4G dengan gerakan kamera melengkung halus, material kaca & aluminium reflektif, serta pencahayaan studio.",
    tags: ["Animation", "Product Animation", "Redmi Note 13 4G"],
    tagsEn: ["Animation", "Product Animation", "Redmi Note 13 4G"],
    tagsId: ["Animasi", "Animasi Produk", "Redmi Note 13 4G"],
    stats: {
      tool: "Blender · Cycles",
      style: "Product Motion",
      styleEn: "Product Motion",
      styleId: "Animasi Produk",
      renderNote: "Camera animation & lighting",
      renderNoteEn: "Camera animation & lighting",
      renderNoteId: "Animasi kamera & lighting studio",
    },
  },
  {
    id: "ikan-v1",
    title: "3 Types of Fish v1",
    titleEn: "3 Types of Fish v1",
    titleId: "3 Jenis Ikan v1",
    subtitle: "Three Fish Models · Version 1",
    subtitleEn: "Three Fish Models · Version 1",
    subtitleId: "Model Tiga Ikan Air Tawar · Versi 1",
    filename: "/assets/Ikan 1 v1.png",
    photos: [
      {
        label: "Ikan 1 v1",
        labelEn: "Fish 1 v1",
        labelId: "Ikan 1 v1",
        url: "/assets/Ikan 1 v1.png",
      },
      {
        label: "Ikan 2 v1",
        labelEn: "Fish 2 v1",
        labelId: "Ikan 2 v1",
        url: "/assets/Ikan 2 v1.png",
      },
      {
        label: "Ikan 3 v1",
        labelEn: "Fish 3 v1",
        labelId: "Ikan 3 v1",
        url: "/assets/Ikan 3 v1.png",
      },
    ],
    description:
      "A 3D character study of three distinct fish species modeled in Blender with clean quad topology, aquatic body curves, and stylized fin geometries.",
    descriptionEn:
      "A 3D character study of three distinct fish species modeled in Blender with clean quad topology, aquatic body curves, and stylized fin geometries.",
    descriptionId:
      "Studi karakter 3D tiga spesies ikan yang dimodelkan di Blender dengan topologi quad rapi, lekukan tubuh akuatik alami, dan sirip bersisik khas.",
    tags: ["Creatures", "Fish", "Characters"],
    tagsEn: ["Creatures", "Fish", "Characters"],
    tagsId: ["Makhluk Hidup", "Ikan", "Karakter 3D"],
    stats: {
      tool: "Blender · Cycles",
      style: "Creature & Character",
      styleEn: "Creature & Character",
      styleId: "Makhluk & Karakter",
      renderNote: "Three angle variations",
      renderNoteEn: "Three angle variations",
      renderNoteId: "Tiga variasi sudut pandang",
    },
  },
  {
    id: "tedung-keraton",
    title: "Tedung Keraton",
    titleEn: "Tedung Keraton",
    titleId: "Payung Tedung Keraton",
    subtitle: "Traditional Balinese Ceremonial Umbrella",
    subtitleEn: "Traditional Balinese Ceremonial Umbrella",
    subtitleId: "Payung Upacara Adat Tradisional Bali",
    filename: "/assets/Tedung Keraton.png",
    photos: [
      {
        label: "Front Angle",
        labelEn: "Front Angle",
        labelId: "Sudut Depan",
        url: "/assets/Tedung Keraton.png",
      },
      {
        label: "Perspective Angle",
        labelEn: "Perspective Angle",
        labelId: "Sudut Perspektif",
        url: "/assets/Tedung Keraton 2.png",
      },
    ],
    description:
      "An authentic 3D recreation of the Balinese Tedung Keraton ceremonial umbrella, featuring tiered golden fabric draping, timber carving, and ritual tassel details.",
    descriptionEn:
      "An authentic 3D recreation of the Balinese Tedung Keraton ceremonial umbrella, featuring tiered golden fabric draping, timber carving, and ritual tassel details.",
    descriptionId:
      "Rekreasi 3D autentik payung upacara adat Tedung Keraton Bali dengan drapery kain emas bertingkat, ukiran kayu tradisional, dan rumbai ornamen ritual.",
    tags: ["Props", "Balinese Culture", "Traditional Umbrella"],
    tagsEn: ["Props", "Balinese Culture", "Traditional Umbrella"],
    tagsId: ["Properti", "Budaya Bali", "Payung Tradisional"],
    stats: {
      tool: "Blender · Cycles",
      style: "Cultural Heritage Prop",
      styleEn: "Cultural Heritage Prop",
      styleId: "Properti Warisan Budaya",
      renderNote: "Multi-angle render study",
      renderNoteEn: "Multi-angle render study",
      renderNoteId: "Studi render berbagai sudut",
    },
  },
];
