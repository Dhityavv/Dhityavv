"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Box,
  Layers,
  Sparkles,
  Maximize2,
  X,
  Film,
  TreePine,
  Home,
  ExternalLink,
  Cpu,
  ChevronLeft,
  ChevronRight,
  Images,
  CheckCircle2,
  Search,
} from "lucide-react";

export interface RenderPhoto {
  label: string;
  url: string;
}

export interface BlenderProject {
  id: string;
  title: string;
  subtitle: string;
  category:
    | "Architecture & Culture"
    | "Environment & Nature"
    | "Characters & Creatures"
    | "Props & Objects"
    | "Animation & Motion";
  coverImage: string;
  photos: RenderPhoto[];
  videoUrl?: string;
  description: string;
  tags: string[];
  stats: {
    engine: string;
    style: string;
    polyCount: string;
    lighting: string;
  };
  features: string[];
}

const ALL_BLENDER_PROJECTS: BlenderProject[] = [
  // 1. Architecture & Culture
  {
    id: "rumah-vale",
    title: "Traditional House",
    subtitle: "Rumah Vale",
    category: "Architecture & Culture",
    coverImage: "/assets/Rumah Vale Render1.png",
    photos: [
      {
        label: "Main Exterior View",
        url: "/assets/Rumah Vale Render1.png",
      },
    ],
    description: "3D model of a traditional house, Rumah Vale.",
    tags: ["Architecture", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Stylized Medium-Poly",
      polyCount: "1,317,600",
      lighting: "Warm Golden HDRI + Directional Sun",
    },
    features: [
      "Custom wooden beams with authentic Indonesian timber wear",
      "Hand-placed curved roof tiles with stylized edge bevels",
      "Traditional raised stilt deck architecture",
      "Atmospheric evening ambient occlusion and warm lighting",
    ],
  },
  {
    id: "tedung-keraton",
    title: "Tedung Keraton",
    subtitle: "Traditional Umbrella",
    category: "Architecture & Culture",
    coverImage: "/assets/Tedung Keraton.png",
    photos: [
      {
        label: "Front Angle",
        url: "/assets/Tedung Keraton.png",
      },
      {
        label: "Perspective Angle",
        url: "/assets/Tedung Keraton 2.png",
      },
    ],
    description: "3D model of a Tedung Keraton.",
    tags: ["Tedung Keraton", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Intricate Traditional Craft",
      polyCount: "218,300",
      lighting: "Ceremonial Studio Rim Lighting",
    },
    features: [
      "Includes 2 distinct camera angles in full render quality",
      "Procedural gold metallic shaders with specular highlights",
      "Tiered cloth drape simulation with hanging decorative fringe",
      "Ornamental wood pole with ceremonial Balinese engravings",
    ],
  },
  {
    id: "bendera-tradisional",
    title: "3 Flags",
    subtitle: "Amertha, Kshetra, and Madya",
    category: "Architecture & Culture",
    coverImage: "/assets/Bendera Amertha.png",
    photos: [
      {
        label: "Bendera Amertha",
        url: "/assets/Bendera Amertha.png",
      },
      {
        label: "Bendera Kshetra",
        url: "/assets/Bendera Kshetra.png",
      },
      {
        label: "Bendera Madya",
        url: "/assets/Bendera Madya.png",
      },
    ],
    description: "Three flag models: Amertha, Kshetra, and Madya.",
    tags: ["Flags", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Traditional Indonesian Standards",
      polyCount: "156,500 total (3 flags)",
      lighting: "Warm Sunlight + Diffuse Fill",
    },
    features: [
      "Includes all 3 ceremonial variants (Amertha, Kshetra, Madya)",
      "Realistic cloth folds and micro-wrinkle normals",
      "Hand-carved wooden base stands with traditional motifs",
      "High-resolution 4K render exports for each standard",
    ],
  },

  // 2. Environment & Nature
  {
    id: "link-envi",
    title: "Layouting Environment Hutan",
    subtitle: "Forest Environment Layout",
    category: "Environment & Nature",
    coverImage: "/assets/Link Envi SH2 Render.png",
    photos: [
      {
        label: "Forest Canopy View",
        url: "/assets/Link Envi SH2 Render.png",
      },
    ],
    description: "Layout of a forest environment in Blender.",
    tags: ["Forest Environment", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Atmospheric Stylized",
      polyCount: "Not provided",
      lighting: "Volumetric Mist + God Rays",
    },
    features: [
      "Instanced vegetation particle system for dense foliage",
      "Layered fog shaders creating deep atmospheric depth",
      "Stylized bark and needle materials",
      "Cinematic low-angle camera framing",
    ],
  },
  {
    id: "sawah-terrace",
    title: "Ricefield",
    subtitle: "Environment Model",
    category: "Environment & Nature",
    coverImage: "/assets/Sawah Render viewport.png",
    photos: [
      {
        label: "Viewport & Field Layout",
        url: "/assets/Sawah Render viewport.png",
      },
    ],
    description: "3D model of a ricefield environment.",
    tags: ["Ricefield", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Terrain Modeling",
      polyCount: "14,600",
      lighting: "Overhead Daylight & Sky Reflection",
    },
    features: [
      "Multi-tier contoured embankment curves",
      "Dynamic water mirror planes reflecting open sky",
      "Modular paddy boundary segments for landscape assembly",
      "Terrain heightmap modeling and erosion slopes",
    ],
  },
  {
    id: "layouting-envi",
    title: "Layouting Environment Sawah",
    subtitle: "Ricefield Environment Layout",
    category: "Environment & Nature",
    coverImage: "/assets/Layouting Envi Render.png",
    photos: [
      {
        label: "Composition Blockout",
        url: "/assets/Layouting Envi Render.png",
      },
    ],
    description: "Layout of a ricefield environment in Blender.",
    tags: ["Environment Layout", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Environment Staging",
      polyCount: "1,597,600",
      lighting: "Atmospheric Ambient + Direct Sun",
    },
    features: [
      "Focal point composition using the rule of thirds",
      "Layered foreground, midground, and background visual hierarchy",
      "Foliage cluster distribution for natural transitions",
      "Clean modular prop placement for game engine export",
    ],
  },
  {
    id: "stylized-tree",
    title: "Stylized Tree",
    subtitle: "Tree Model",
    category: "Environment & Nature",
    coverImage: "/assets/Tree.png",
    photos: [
      {
        label: "Stylized Tree Still Render",
        url: "/assets/Tree.png",
      },
    ],
    description: "Stylized 3D tree model.",
    tags: ["Tree", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Sculpting Study",
      polyCount: "313,300",
      lighting: "Not specified",
    },
    features: [
      "Ground shaped using Blender Sculpt Mode",
      "Tree placed as a scene element",
      "Static study with no animation",
    ],
  },

  // 3. Characters & Creatures
  {
    id: "ikan-v1",
    title: "3 Jenis Ikan v1",
    subtitle: "Three Fish Models · Version 1",
    category: "Characters & Creatures",
    coverImage: "/assets/Ikan 1 v1.png",
    photos: [
      {
        label: "Ikan 1 v1",
        url: "/assets/Ikan 1 v1.png",
      },
      {
        label: "Ikan 2 v1",
        url: "/assets/Ikan 2 v1.png",
      },
      {
        label: "Ikan 3 v1",
        url: "/assets/Ikan 3 v1.png",
      },
    ],
    description:
      "Three fish models, version 1. Triangle counts are listed in order for fish 1, fish 2, and fish 3.",
    tags: ["Fish", "Version 1", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Low-Poly Creature",
      polyCount: "253 / 253 / 5,803",
      lighting: "Underwater Soft Diffuse",
    },
    features: [
      "Original baseline silhouette and character proportions",
      "Broad fin profiles designed for swimming deformations",
      "Simplified eye and gill geometry",
      "Established the foundation for Version 2",
    ],
  },
  {
    id: "ikan-v2",
    title: "3 Jenis Ikan v2",
    subtitle: "Three Fish Models · Version 2",
    category: "Characters & Creatures",
    coverImage: "/assets/Ikan 1 v2.png",
    photos: [
      {
        label: "Ikan 1 v2",
        url: "/assets/Ikan 1 v2.png",
      },
      {
        label: "Ikan 2 v2",
        url: "/assets/Ikan 2 v2.png",
      },
      {
        label: "Ikan 3 v2",
        url: "/assets/Ikan 3 v2.png",
      },
    ],
    description: "Three fish models, version 2.",
    tags: ["Fish", "Version 2", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Stylized Semi-Realistic",
      polyCount: "189,500 total (3 fish)",
      lighting: "Studio Softbox + Rim Backlight",
    },
    features: [
      "Overhauled edge flow for organic rigging and swimming animation",
      "Subsurface scattering and translucent fin edge effects",
      "Vibrant tropical aquatic color gradient mapping",
      "Multi-angle studio turnaround renders",
    ],
  },
  {
    id: "ninja-model",
    title: "Ninja",
    subtitle: "Character Model",
    category: "Characters & Creatures",
    coverImage: "/assets/Ninja 1.png",
    photos: [
      {
        label: "Front Stance (Render 1)",
        url: "/assets/Ninja 1.png",
      },
      {
        label: "Side Action Stance (Render 2)",
        url: "/assets/Ninja 2.png",
      },
    ],
    description: "3D model of a ninja character.",
    tags: ["Ninja", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Stylized Shinobi",
      polyCount: "36,145",
      lighting: "Dark Noir Studio Rim Lighting",
    },
    features: [
      "Includes 2 distinct render poses and camera perspectives",
      "Layered dark cloth folds and utility belt attachments",
      "Defined muscle silhouettes and anime-inspired proportions",
      "Ready for bipedal armature rigging and weight painting",
    ],
  },

  // 4. Props & Objects
  {
    id: "sushi-sashimi",
    title: "Sushi",
    subtitle: "Food Model",
    category: "Props & Objects",
    coverImage: "/assets/Sushi & Sashimi.png",
    photos: [
      {
        label: "Platter Presentation",
        url: "/assets/Sushi & Sashimi.png",
      },
    ],
    description: "3D model of sushi and sashimi.",
    tags: ["Sushi", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Stylized Food Art",
      polyCount: "1,200,000",
      lighting: "Warm Restaurant Key Light",
    },
    features: [
      "Subsurface scattering giving raw fish cuts natural translucency",
      "Textured rice grain procedural bump and gloss mapping",
      "Handcrafted wasabi paste and garnish details",
      "Dark timber geta board with satin lacquer reflections",
    ],
  },
  {
    id: "katana",
    title: "Katana",
    subtitle: "3D Model",
    category: "Props & Objects",
    coverImage: "/assets/Katana.jpg",
    photos: [
      {
        label: "Blade & Saya Display",
        url: "/assets/Katana.jpg",
      },
    ],
    description: "3D model of a katana.",
    tags: ["Katana", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Hard-Surface Samurai Sword",
      polyCount: "Not provided",
      lighting: "Studio Rim Highlights on Steel Edge",
    },
    features: [
      "Detailed diamond-pattern tsuka-ito hilt wrap geometry",
      "Metallic blade shader with wave hamon temper line reflections",
      "Custom gold-engraved tsuba handguard",
      "High-gloss black lacquer finish on wooden scabbard",
    ],
  },
  {
    id: "mug",
    title: "Mug",
    subtitle: "3D Model",
    category: "Props & Objects",
    coverImage: "/assets/Mug.png",
    photos: [
      {
        label: "Ceramic Mug Render",
        url: "/assets/Mug.png",
      },
    ],
    description: "3D model of a mug.",
    tags: ["Mug", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Clean Product Prop",
      polyCount: "74,200",
      lighting: "Studio Softbox Highlight Setup",
    },
    features: [
      "Subdivision surface modeling with clean round edge loops",
      "Clearcoat ceramic shader with specular reflection highlights",
      "Modeled coffee liquid surface and inner wall meniscus",
      "Clean bevel modifiers with zero shading artifacts",
    ],
  },
  {
    id: "meja",
    title: "Table (Meja)",
    subtitle: "3D Model",
    category: "Props & Objects",
    coverImage: "/assets/Meja.png",
    photos: [
      {
        label: "Table Isometric View",
        url: "/assets/Meja.png",
      },
    ],
    description: "3D model of a table.",
    tags: ["Table", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Rustic Wood Furniture",
      polyCount: "3,315",
      lighting: "Warm Diffuse Interior Lighting",
    },
    features: [
      "Custom wood grain UV mapping aligned with timber grain directions",
      "Subtle beveled corners preventing sharp digital edges",
      "Sturdy leg joinery and cross-beam construction",
      "Low draw-call geometry ideal for game environments",
    ],
  },
  {
    id: "book-on-floor",
    title: "Book on Floor",
    subtitle: "3D Scene",
    category: "Props & Objects",
    coverImage: "/assets/Book In Floor.png",
    photos: [
      {
        label: "Low-Angle Still Life",
        url: "/assets/Book In Floor.png",
      },
    ],
    description: "3D scene of a book on the floor.",
    tags: ["Book", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Cinematic Mood Piece",
      polyCount: "1,638",
      lighting: "Directional Window Shaft Lighting",
    },
    features: [
      "Curved open book pages with paper translucency",
      "Rustic wooden plank floor with micro-surface displacement",
      "Cinematic shallow depth of field (DoF)",
      "High-contrast chiaroscuro lighting mood",
    ],
  },

  // 5. Animation & Motion
  {
    id: "redmi-animation",
    title: "Redmi Note 13 4G",
    subtitle: "Product Animation",
    category: "Animation & Motion",
    coverImage: "/assets/Redmi Note 13 4G Animation.gif",
    photos: [
      {
        label: "Commercial Animation GIF",
        url: "/assets/Redmi Note 13 4G Animation.gif",
      },
    ],
    description: "3D animation featuring a Redmi Note 13 4G.",
    tags: ["Redmi Note 13 4G", "Animation", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Commercial Product Motion",
      polyCount: "31,836",
      lighting: "Studio Softbox Rig + Rim Lights",
    },
    features: [
      "Choreographed camera rig with smooth easing curves",
      "High-fidelity PBR glass, aluminium, and sapphire lens shaders",
      "Studio light sweep highlighting the slim form factor",
      "Clean hard-surface topology and bevel modifiers",
    ],
  },
  {
    id: "tree-animation",
    title: "Simple Tree",
    subtitle: "Animation",
    category: "Animation & Motion",
    coverImage: "/assets/Tree Animation.gif",
    photos: [
      {
        label: "Simple Tree Animation",
        url: "/assets/Tree Animation.gif",
      },
    ],
    description: "Simple tree animation created in Blender.",
    tags: ["Tree", "Animation", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Simple Animation",
      polyCount: "41,200",
      lighting: "Not specified",
    },
    features: [
      "Animated tree scene",
      "Rendered with Cycles",
      "41,200 triangles",
    ],
  },
  {
    id: "ricefield-animation",
    title: "Ricefield",
    subtitle: "Animation",
    category: "Animation & Motion",
    coverImage: "/assets/Sawah Render viewport.png",
    photos: [
      {
        label: "Ricefield",
        url: "/assets/Sawah Render viewport.png",
      },
    ],
    description: "Ricefield animation scene created in Blender.",
    tags: ["Ricefield", "Animation", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Animation",
      polyCount: "131,000",
      lighting: "Not specified",
    },
    features: ["Ricefield animation", "Rendered with Cycles", "131,000 triangles"],
  },
  {
    id: "among-us",
    title: "Among Us",
    subtitle: "3D Model",
    category: "Characters & Creatures",
    coverImage: "/assets/Among Us.png",
    photos: [{ label: "Among Us", url: "/assets/Among Us.png" }],
    description: "3D model of an Among Us character.",
    tags: ["Character", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Character Model",
      polyCount: "19,806",
      lighting: "Not specified",
    },
    features: ["3D model", "Rendered with Cycles", "19,806 triangles"],
  },
  {
    id: "hydrant",
    title: "Hydrant",
    subtitle: "3D Model",
    category: "Props & Objects",
    coverImage: "/assets/Hydrant.png",
    photos: [{ label: "Hydrant", url: "/assets/Hydrant.png" }],
    description: "3D model of a hydrant.",
    tags: ["Prop", "Cycles"],
    stats: {
      engine: "Cycles",
      style: "Prop Model",
      polyCount: "24,368",
      lighting: "Not specified",
    },
    features: ["3D model", "Rendered with Cycles", "24,368 triangles"],
  },
  {
    id: "nintendo-switch",
    title: "Nintendo Switch",
    subtitle: "3D Model",
    category: "Props & Objects",
    coverImage: "/assets/Nintendo Switch.png",
    photos: [{ label: "Nintendo Switch", url: "/assets/Nintendo Switch.png" }],
    description: "3D model of a Nintendo Switch.",
    tags: ["Electronics", "Eevee"],
    stats: {
      engine: "Eevee",
      style: "Product Model",
      polyCount: "25,550",
      lighting: "Not specified",
    },
    features: ["3D model", "Rendered with Eevee", "25,550 triangles"],
  },
];

const CATEGORIES = [
  "All Works",
  "Architecture & Culture",
  "Environment & Nature",
  "Characters & Creatures",
  "Props & Objects",
  "Animation & Motion",
];

export default function BlenderStudioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Works");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<BlenderProject | null>(
    null
  );
  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);

  useEffect(() => {
    if (!selectedProject) return;

    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
    };
  }, [selectedProject]);

  const filteredProjects = ALL_BLENDER_PROJECTS.filter((proj) => {
    const matchesCategory =
      activeCategory === "All Works" || proj.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const openModal = (proj: BlenderProject) => {
    setSelectedProject(proj);
    setActivePhotoIndex(0);
  };

  const handleNextPhoto = () => {
    if (!selectedProject) return;
    setActivePhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
  };

  const handlePrevPhoto = () => {
    if (!selectedProject) return;
    setActivePhotoIndex((prev) =>
      prev === 0 ? selectedProject.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col selection:bg-[#8A6FB5]/30 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/85 backdrop-blur-md border-b border-[#30363d] py-3.5 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 text-xs font-semibold text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8A6FB5]" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-[#30363d] hidden sm:inline">/</span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8b949e]">
              <Box className="w-3.5 h-3.5 text-[#8A6FB5]" />
              <span className="font-semibold text-white">Dhitya Nurhadi</span>
              <span>· 3D Blender Studio & Renders</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-[#8A6FB5] font-mono">
              {ALL_BLENDER_PROJECTS.length} Works Catalogued
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Hero Banner */}
        <div className="mb-12 text-center max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[280px] bg-[#8A6FB5]/10 blur-[120px] pointer-events-none rounded-full" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8A6FB5] mb-4">
            <Box className="w-3.5 h-3.5" />
            <span>Complete 3D Blender Archive</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Blender 3D Works & Renders
          </h1>
          <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
            Full gallery of 3D architecture, cultural artifacts, environments,
            character models, and product animations modeled by{" "}
            <span className="text-white font-medium">Dhitya Nurhadi</span> in
            Blender.
          </p>
        </div>

        {/* Category Toggles & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#161b22] border border-[#30363d] mb-10 shadow-lg">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/25"
                    : "text-[#8b949e] hover:text-white hover:bg-[#0d1117]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[210px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search render or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-[#8b949e] focus:outline-none focus:border-[#8A6FB5]"
            />
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProjects.map((work) => (
            <div
              key={work.id}
              onClick={() => openModal(work)}
              className="group cursor-pointer bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden hover:border-[#8A6FB5] transition-all duration-300 hover:shadow-2xl hover:shadow-[#8A6FB5]/10 flex flex-col justify-between"
            >
              {/* Image Preview Container */}
              <div className="relative aspect-[4/3] w-full bg-[#0d1117] overflow-hidden">
                {work.videoUrl ? (
                  <video
                    src={work.videoUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={work.title}
                    className="absolute inset-0 w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                  />
                ) : (
                  <Image
                    src={work.coverImage}
                    alt={work.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                    unoptimized
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-85" />

                {/* Badge Category */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117]/85 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white">
                  {work.category === "Animation & Motion" ? (
                    <Film className="w-3 h-3 text-[#8A6FB5]" />
                  ) : work.category === "Architecture & Culture" ? (
                    <Home className="w-3 h-3 text-[#8A6FB5]" />
                  ) : work.category === "Environment & Nature" ? (
                    <TreePine className="w-3 h-3 text-[#8A6FB5]" />
                  ) : (
                    <Box className="w-3 h-3 text-[#8A6FB5]" />
                  )}
                  <span>{work.category}</span>
                </div>

                {/* Multi-Photo Count Badge */}
                {work.photos.length > 1 && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-[#0d1117]/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                    <Images className="w-3 h-3 text-[#8A6FB5]" />
                    <span>{work.photos.length} Renders</span>
                  </div>
                )}

                {/* Inspect Button Icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0d1117]/85 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Information Section */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs text-[#8A6FB5] font-mono mb-1">
                    {work.subtitle}
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#c7b2e8] transition-colors mb-2">
                    {work.title}
                  </h3>
                  <p className="text-xs text-[#8b949e] leading-relaxed mb-4 line-clamp-2">
                    {work.description}
                  </p>
                </div>

                <div>
                  {/* Technical Specs Strip */}
                  <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 text-[11px] mb-4">
                    <div>
                      <span className="text-[#8b949e] block">Render Engine</span>
                      <span className="font-semibold text-white truncate block">
                        {work.stats.engine}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#8b949e] block">Tris</span>
                      <span className="font-semibold text-white truncate block">
                        {work.stats.polyCount}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {work.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d]/60 text-[10px] text-[#8b949e]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-[#30363d]/60 flex items-center justify-between text-xs text-[#8A6FB5] font-semibold">
                    <span>
                      {work.videoUrl
                        ? "Click to Watch Animation"
                        : work.photos.length > 1
                        ? `Click to View ${work.photos.length} Renders`
                        : "Click to Inspect Render"}
                    </span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox with Multi-Render Switcher */}
        {selectedProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedProject(null)}
          >
            <div
              className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-4xl w-full max-h-[94dvh] overflow-x-hidden overflow-y-auto overscroll-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-3.5 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]/85">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedProject.title}</span>
                    {selectedProject.photos.length > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#8A6FB5]/20 text-[#c7b2e8] border border-[#8A6FB5]/30">
                        {activePhotoIndex + 1} of {selectedProject.photos.length}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    {selectedProject.subtitle} · {selectedProject.category}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="w-8 h-8 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Main Media Viewer */}
              <div className="relative min-h-[300px] sm:min-h-[460px] bg-[#0d1117] flex items-center justify-center overflow-hidden p-4 group">
                {selectedProject.videoUrl ? (
                  <video
                    src={selectedProject.videoUrl}
                    autoPlay
                    controls
                    muted
                    loop
                    playsInline
                    className="max-h-[58vh] max-w-full rounded-lg bg-black shadow-2xl"
                  />
                ) : (
                  <img
                    src={
                      selectedProject.photos[activePhotoIndex]?.url ||
                      selectedProject.coverImage
                    }
                    alt={selectedProject.title}
                    className="max-h-[58vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-300"
                  />
                )}

                {/* Left / Right Arrows for Multi-Photo Items */}
                {selectedProject.photos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                      title="Previous angle"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all hover:scale-105"
                      title="Next angle"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails Row for Multi-Render items (e.g. Bendera, Tedung, Ninja, Ikan) */}
              {selectedProject.photos.length > 1 && (
                <div className="px-5 py-2.5 bg-[#0d1117] border-t border-[#30363d] flex items-center gap-2 overflow-x-auto">
                  <span className="text-[11px] font-semibold text-[#8b949e] shrink-0 mr-2 flex items-center gap-1">
                    <Images className="w-3.5 h-3.5 text-[#8A6FB5]" />
                    Angles / Variations:
                  </span>
                  {selectedProject.photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIndex(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium border flex items-center gap-2 transition-all shrink-0 ${
                        activePhotoIndex === idx
                          ? "bg-[#8A6FB5] border-[#8A6FB5] text-white shadow-sm shadow-[#8A6FB5]/30"
                          : "bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white"
                      }`}
                    >
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Details and Technical Specs */}
              <div className="p-5 border-t border-[#30363d] bg-[#161b22] space-y-3.5">
                <p className="text-sm text-[#c9d1d9] leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Render Engine</span>
                    <span className="font-semibold text-white truncate block">
                      {selectedProject.stats.engine}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Tris</span>
                    <span className="font-semibold text-white">
                      {selectedProject.stats.polyCount}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#30363d]/60">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[11px] text-[#8A6FB5]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={
                      selectedProject.photos[activePhotoIndex]?.url ||
                      selectedProject.coverImage
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-white transition-colors"
                  >
                    Open Current Asset <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] bg-[#0d1117] py-8 text-center text-xs text-[#8b949e]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>Return to Portfolio</span>
          </Link>
          <span>Blender 3D Studio & Works · Dhitya Nurhadi</span>
        </div>
      </footer>
    </div>
  );
}
