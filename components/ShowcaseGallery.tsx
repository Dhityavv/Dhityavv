"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  Maximize2,
  X,
  Sparkles,
  Info,
  Film,
  TreePine,
  Home,
  ExternalLink,
} from "lucide-react";

interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  subtitle: string;
  filename: string;
  description: string;
  tags: string[];
  type: "image" | "animation";
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
    category: "Architecture",
    filename: "/assets/Rumah Vale Render1.png",
    description:
      "A stylized medium-poly architectural render of a traditional house with custom wooden textures, tiled rooftops, and warm ambient lighting modeled and arranged in Blender.",
    tags: ["Blender", "Medium-Poly", "Architecture", "Environment"],
    type: "image",
    stats: {
      tool: "Blender 3D",
      style: "Medium-Poly",
      renderNote: "Custom lighting & textures",
    },
  },
  {
    id: "link-envi",
    title: "A Forest",
    subtitle: "Link Envi SH2 Render",
    category: "Environment",
    filename: "/assets/Link Envi SH2 Render.png",
    description:
      "An atmospheric nature environment render featuring tall canopy trees, forest undergrowth, mood mist, and stylized scenic foliage.",
    tags: ["Blender", "Environment Art", "Nature", "Lighting"],
    type: "image",
    stats: {
      tool: "Blender 3D",
      style: "Stylized Nature",
      renderNote: "Atmospheric depth & vegetation",
    },
  },
  {
    id: "redmi-animation",
    title: "Redmi Note 13 4G Animation",
    subtitle: "3D Product Animation",
    category: "Animation & Motion",
    filename: "/assets/Redmi Note 13 4G Animation.gif",
    description:
      "A dynamic 3D commercial animation showcasing the Redmi Note 13 4G with smooth camera rotations, metallic material reflections, and motion design.",
    tags: ["Blender", "Motion Design", "3D Animation", "Commercial"],
    type: "animation",
    stats: {
      tool: "Blender Animation",
      style: "Motion Graphics",
      renderNote: "Camera rig & keyframe easing",
    },
  },
];

export function ShowcaseGallery() {
  const [selectedItem, setSelectedItem] = useState<ShowcaseItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Architecture", "Environment", "Animation & Motion"];

  const filteredItems =
    activeFilter === "All"
      ? SHOWCASE_ITEMS
      : SHOWCASE_ITEMS.filter((item) => item.category === activeFilter);

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
              Handcrafted 3D renders and animations directly from the original
              showcase
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeFilter === cat
                    ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/25"
                    : "bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-white hover:bg-[#21262d]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedItem(item)}
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

                {/* Badge Top Left */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#0d1117]/80 backdrop-blur-md border border-white/10 text-[11px] font-medium text-white">
                  {item.type === "animation" ? (
                    <Film className="w-3 h-3 text-[#8A6FB5]" />
                  ) : item.category === "Architecture" ? (
                    <Home className="w-3 h-3 text-[#8A6FB5]" />
                  ) : (
                    <TreePine className="w-3 h-3 text-[#8A6FB5]" />
                  )}
                  <span>{item.category}</span>
                </div>

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
                      Inspect <Maximize2 className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
            onClick={() => setSelectedItem(null)}
          >
            <div
              className="bg-[#161b22] border border-[#30363d] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]/60">
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedItem.title}
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    {selectedItem.subtitle} · {selectedItem.category}
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
              <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] bg-[#0d1117] flex items-center justify-center overflow-auto p-4">
                <img
                  src={selectedItem.filename}
                  alt={selectedItem.title}
                  className="max-h-[60vh] max-w-full object-contain rounded-lg shadow-lg"
                />
              </div>

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
                    href={selectedItem.filename}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-xs font-semibold text-white transition-colors"
                  >
                    Open Raw Asset <ExternalLink className="w-3.5 h-3.5" />
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
