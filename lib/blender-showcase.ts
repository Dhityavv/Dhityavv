export interface BlenderShowcasePhoto {
  label: string;
  url: string;
}

export interface BlenderShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  photos: BlenderShowcasePhoto[];
  description: string;
  tags: string[];
  stats: {
    tool: string;
    style: string;
    renderNote: string;
  };
}

export const BLENDER_SHOWCASE: BlenderShowcaseItem[] = [
  {
    id: "indonesian-traditional-house",
    title: "Traditional Indonesian House",
    subtitle: "Indonesian Traditional Architecture",
    filename: "/assets/Rumah Vale Render1.png",
    photos: [
      { label: "Main Exterior View", url: "/assets/Rumah Vale Render1.png" },
    ],
    description:
      "A medium-poly study of a traditional Indonesian house, featuring timber details, a tiled roof, and warm architectural lighting.",
    tags: ["Architecture", "House"],
    stats: {
      tool: "Blender · Cycles",
      style: "Medium-Poly Architecture",
      renderNote: "Wood textures & warm lighting",
    },
  },
  {
    id: "layouting-envi",
    title: "Layouting Environment Ricefield",
    subtitle: "Ricefield Environment Layout",
    filename: "/assets/Layouting Envi Render.png",
    photos: [
      { label: "Ricefield Layout", url: "/assets/Layouting Envi Render.png" },
    ],
    description:
      "A staged ricefield environment layout arranged in Blender, with layered scenery and a clear focal composition.",
    tags: ["Environment", "Ricefield Layout"],
    stats: {
      tool: "Blender · Cycles",
      style: "Environment Layout",
      renderNote: "1,597,600 triangles",
    },
  },
  {
    id: "redmi-animation",
    title: "Redmi Note 13 4G Animation",
    subtitle: "Product Animation",
    filename: "/assets/Redmi Note 13 4G Animation.gif",
    photos: [
      {
        label: "Product Animation",
        url: "/assets/Redmi Note 13 4G Animation.gif",
      },
    ],
    description:
      "A product animation featuring the Redmi Note 13 4G, with smooth camera movement, reflective materials, and motion design.",
    tags: ["Animation", "Product Animation", "Redmi Note 13 4G"],
    stats: {
      tool: "Blender · Cycles",
      style: "Product Motion",
      renderNote: "Camera animation & lighting",
    },
  },
  {
    id: "ikan-v1",
    title: "3 Types of Fish v1",
    subtitle: "Three Fish Models · Version 1",
    filename: "/assets/Ikan 1 v1.png",
    photos: [
      { label: "Ikan 1 v1", url: "/assets/Ikan 1 v1.png" },
      { label: "Ikan 2 v1", url: "/assets/Ikan 2 v1.png" },
      { label: "Ikan 3 v1", url: "/assets/Ikan 3 v1.png" },
    ],
    description:
      "A 3D character study of three distinct fish species modeled in Blender with clean quad topology, aquatic body curves, and stylized fin geometries.",
    tags: ["Creatures", "Fish", "Characters"],
    stats: {
      tool: "Blender · Cycles",
      style: "Creature & Character",
      renderNote: "Three angle variations",
    },
  },
  {
    id: "tedung-keraton",
    title: "Tedung Keraton",
    subtitle: "Traditional Balinese Ceremonial Umbrella",
    filename: "/assets/Tedung Keraton.png",
    photos: [
      { label: "Front Angle", url: "/assets/Tedung Keraton.png" },
      { label: "Perspective Angle", url: "/assets/Tedung Keraton 2.png" },
    ],
    description:
      "An authentic 3D recreation of the Balinese Tedung Keraton ceremonial umbrella, featuring tiered golden fabric draping, timber carving, and ritual tassel details.",
    tags: ["Props", "Balinese Culture", "Traditional Umbrella"],
    stats: {
      tool: "Blender · Cycles",
      style: "Cultural Heritage Prop",
      renderNote: "Multi-angle render study",
    },
  },
];
