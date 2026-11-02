"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Layers,
  Box,
  Maximize2,
  X,
  Sparkles,
  Info,
  ExternalLink,
  ArrowRight,
  Images,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ShowcasePhoto {
  label: string;
  url: string;
}

interface ShowcaseItem {
  id: string;
  title: string;
  subtitle: string;
  filename: string;
  photos: ShowcasePhoto[];
  description: string;
  tags: string[];
  stats: {
    tool: string;
    style: string;
    renderNote: string;
  };
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: "rumah-vale",
    title: "Traditional House",
    subtitle: "Rumah Vale Render 1",
    filename: "/assets/Rumah Vale Render1.png",
    photos: [
      { label: "Exterior View", url: "/assets/Rumah Vale Render1.png" },
    ],
    description:
      "A stylized medium-poly architectural render of a traditional house with custom wooden textures, tiled rooftops, and warm ambient lighting modeled and arranged in Blender.",
    tags: ["Blender", "Medium-Poly", "Architecture", "Environment"],
    stats: {
      tool: "Blender 3D",
      style: "Medium-Poly",
      renderNote: "Custom lighting & textures",
    },
  },
  {
    id: "tedung-keraton",
    title: "Tedung Keraton",
    subtitle: "Royal Ceremonial Umbrella",
    filename: "/assets/Tedung Keraton.png",
    photos: [
      { label: "Front Angle", url: "/assets/Tedung Keraton.png" },
      { label: "Perspective Angle", url: "/assets/Tedung Keraton 2.png" },
    ],
    description:
      "Intricate 3D model of Tedung Keraton, the sacred ceremonial royal umbrella. Features ornate golden finials, tiered fabric canopy trims, decorative tassels, and authentic Balinese motifs.",
    tags: ["Culture", "Ceremonial", "Multi-Angle", "Gold Shader"],
    stats: {
      tool: "Blender Cycles",
      style: "Intricate Traditional Craft",
      renderNote: "Includes 2 distinct angles",
    },
  },
  {
    id: "link-envi",
    title: "A Forest",
    subtitle: "Link Envi SH2 Render",
    filename: "/assets/Link Envi SH2 Render.png",
    photos: [
      { label: "Canopy View", url: "/assets/Link Envi SH2 Render.png" },
    ],
    description:
      "An atmospheric nature environment render featuring tall canopy trees, forest undergrowth, mood mist, and stylized scenic foliage.",
    tags: ["Blender", "Environment Art", "Nature", "Lighting"],
    stats: {
      tool: "Blender 3D",
      style: "Stylized Nature",
      renderNote: "Atmospheric depth & vegetation",
    },
  },
  {
    id: "ninja-model",
    title: "Ninja Character Model",
    subtitle: "Shinobi Operative Turnaround",
    filename: "/assets/Ninja 1.png",
    photos: [
      { label: "Front Stance", url: "/assets/Ninja 1.png" },
      { label: "Side Action Stance", url: "/assets/Ninja 2.png" },
    ],
    description:
      "Stylized shinobi operative character turnaround featuring dark fabric cowl, arm wraps, utility sash, and balanced anime proportions.",
    tags: ["Character", "Shinobi", "2 Renders", "Game Ready"],
    stats: {
      tool: "Blender 3D",
      style: "Stylized Character",
      renderNote: "Includes 2 poses & angles",
    },
  },
  {
    id: "sushi-sashimi",
    title: "Sushi & Sashimi Platter",
    subtitle: "Japanese Culinary 3D Art",
    filename: "/assets/Sushi & Sashimi.png",
    photos: [
      { label: "Platter Render", url: "/assets/Sushi & Sashimi.png" },
    ],
    description:
      "Appetizing stylized food render of fresh nigiri sushi, tuna & salmon sashimi slices, wasabi quenelle, and lacquered ceramic presentation board.",
    tags: ["Food 3D", "Stylized Props", "Subsurface Scattering", "Culinary"],
    stats: {
      tool: "Blender Cycles",
      style: "Stylized Food Art",
      renderNote: "Subsurface scattering shaders",
    },
  },
  {
    id: "redmi-animation",
    title: "Redmi Note 13 4G Animation",
    subtitle: "3D Product Commercial Motion",
    filename: "/assets/Redmi Note 13 4G Animation.gif",
    photos: [
      { label: "Commercial Motion GIF", url: "/assets/Redmi Note 13 4G Animation.gif" },
    ],
    description:
      "A dynamic 3D commercial animation showcasing the Redmi Note 13 4G with smooth camera rotations, metallic material reflections, and motion design.",
    tags: ["Blender", "Motion Design", "3D Animation", "Commercial"],
    stats: {
      tool: "Blender Animation",
      style: "Motion Graphics",
      renderNote: "Camera rig & keyframe easing",
    },
  },
];

export function ShowcaseGallery() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  useEffect(() => {
    if (!selectedItem) return;

    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
    };
  }, [selectedItem]);

  const openModal = (item: ShowcaseItem) => {
    setSelectedItem(item);
    setActivePhotoIdx(0);
  };

  return (
    <section id="showcase" className="py-16 border-t border-[#30363d]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
              <Layers className="w-4 h-4" />
              <span>Blender 3D Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Showcase & Renders
            </h2>
            <p className="text-sm text-[#8b949e] mt-1">
              Handcrafted 3D renders and animations directly from Dhitya&apos;s Blender archive
            </p>
          </div>

          <Link
            href="/blender"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8A6FB5] to-[#71529e] hover:from-[#967cc2] hover:to-[#7e5eb0] text-xs font-semibold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all shrink-0"
          >
            <span>Open 3D Blender Hub</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SHOWCASE_ITEMS.map((item) => (
            <div
              key={item.id}
              onClick={() => openModal(item)}
              className="group cursor-pointer bg-[#161b22] border border-[#30363d] rounded-2xl overflow-hidden hover:border-[#8A6FB5] transition-all duration-300 hover:shadow-xl hover:shadow-[#8A6FB5]/10 flex flex-col"
            >
              {/* Media Container */}
              <div className="relative aspect-[4/3] w-full bg-[#0d1117] overflow-hidden flex items-center justify-center">
                <Image
                  src={item.filename}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-80" />

                {/* Multi-photo badge */}
                {item.photos.length > 1 && (
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-0.5 rounded bg-[#0d1117]/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                    <Images className="w-3 h-3 text-[#8A6FB5]" />
                    <span>{item.photos.length} Angles</span>
                  </div>
                )}

                {/* Zoom Icon Top Right */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0d1117]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Info Container */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-[#c7b2e8] transition-colors mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#8b949e] line-clamp-2 mb-4">
                    {item.description}
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d]/80 text-[10px] text-[#8b949e]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-[#30363d]/60 flex items-center justify-between text-xs text-[#8A6FB5] font-medium">
                    <span>{item.stats.tool}</span>
                    <span className="flex items-center gap-1 text-[#8b949e] group-hover:text-white transition-colors">
                      {item.photos.length > 1 ? `View ${item.photos.length} Renders` : "Inspect"} <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Gallery Action Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1a202c] to-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#8A6FB5]/20 border border-[#8A6FB5]/40 flex items-center justify-center text-[#8A6FB5] shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Explore All 16+ 3D Blender Works & Archive
              </h4>
              <p className="text-xs text-[#8b949e]">
                Dedicated website with complete cultural flags, fish revisions, katana, sawah, and turnarounds.
              </p>
            </div>
          </div>

          <Link
            href="/blender"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/25 hover:shadow-[#8A6FB5]/40 transition-all shrink-0 hover:-translate-y-0.5"
          >
            <span>Open 3D Blender Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Modal Lightbox */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-4xl w-full max-h-[92dvh] overflow-x-hidden overflow-y-auto overscroll-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]/60">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>{selectedItem.title}</span>
                    {selectedItem.photos.length > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#8A6FB5]/20 text-[#c7b2e8] border border-[#8A6FB5]/30">
                        {activePhotoIdx + 1} of {selectedItem.photos.length}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    {selectedItem.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image View */}
              <div className="relative min-h-[300px] sm:min-h-[460px] bg-[#0d1117] flex items-center justify-center overflow-hidden p-4 group">
                <img
                  src={selectedItem.photos[activePhotoIdx]?.url || selectedItem.filename}
                  alt={selectedItem.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
                />

                {/* Left/Right controls if multiple photos */}
                {selectedItem.photos.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setActivePhotoIdx((prev) =>
                          prev === 0 ? selectedItem.photos.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActivePhotoIdx((prev) =>
                          (prev + 1) % selectedItem.photos.length
                        )
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Angle Switcher Row */}
              {selectedItem.photos.length > 1 && (
                <div className="px-5 py-2.5 bg-[#0d1117] border-t border-[#30363d] flex items-center gap-2 overflow-x-auto">
                  <span className="text-[11px] font-semibold text-[#8b949e] shrink-0 mr-1 flex items-center gap-1">
                    <Images className="w-3.5 h-3.5 text-[#8A6FB5]" />
                    Angles:
                  </span>
                  {selectedItem.photos.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all shrink-0 ${
                        activePhotoIdx === idx
                          ? "bg-[#8A6FB5] border-[#8A6FB5] text-white"
                          : "bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white"
                      }`}
                    >
                      <span>{p.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Details Footer */}
              <div className="p-5 border-t border-[#30363d] bg-[#161b22] space-y-3">
                <p className="text-sm text-[#c9d1d9] leading-relaxed">
                  {selectedItem.description}
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Software</span>
                    <span className="font-semibold text-white">
                      {selectedItem.stats.tool}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Style</span>
                    <span className="font-semibold text-white">
                      {selectedItem.stats.style}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Note</span>
                    <span className="font-semibold text-white truncate block">
                      {selectedItem.stats.renderNote}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d] text-[11px] text-[#8A6FB5]"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={selectedItem.photos[activePhotoIdx]?.url || selectedItem.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-white transition-colors"
                  >
                    Open Current Asset <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
