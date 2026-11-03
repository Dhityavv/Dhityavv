"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Keyboard,
  Mousewheel,
} from "swiper/modules";

// Swiper CSS styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { useLanguage } from "@/lib/LanguageContext";
import { BLENDER_SHOWCASE, BlenderShowcaseItem } from "@/lib/blender-showcase";
import {
  Layers,
  Box,
  Maximize2,
  X,
  ExternalLink,
  ArrowRight,
  Images,
  ChevronLeft,
  ChevronRight,
  Eye,
} from "lucide-react";

export function ShowcaseGallery() {
  const { lang } = useLanguage();
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [selectedItem, setSelectedItem] = useState<BlenderShowcaseItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [activeRealIndex, setActiveRealIndex] = useState<number>(2);

  // Prevent background scroll when modal lightbox is open
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

  const openModal = (item: BlenderShowcaseItem) => {
    setSelectedItem(item);
    setActivePhotoIdx(0);
  };

  return (
    <section
      id="showcase"
      className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative overflow-hidden"
    >
      {/* Global Swiper custom styling: STRICTLY SHOW EXACTLY 3 CARDS AT A TIME */}
      <style jsx global>{`
        .showcase-swiper {
          overflow: visible !important;
          width: 100%;
        }
        .showcase-swiper .swiper-wrapper {
          align-items: stretch;
          display: flex;
        }
        /* Hide all slides further than 1 position away from center */
        .showcase-swiper .swiper-slide {
          transition: opacity 0.45s cubic-bezier(0.25, 1, 0.5, 1),
            transform 0.45s cubic-bezier(0.25, 1, 0.5, 1);
          opacity: 0 !important;
          pointer-events: none !important;
          visibility: hidden !important;
        }
        /* ONLY the active slide and immediate prev/next slides are visible */
        .showcase-swiper .swiper-slide-prev,
        .showcase-swiper .swiper-slide-next {
          opacity: 0.58 !important;
          pointer-events: auto !important;
          visibility: visible !important;
        }
        .showcase-swiper .swiper-slide-prev:hover,
        .showcase-swiper .swiper-slide-next:hover {
          opacity: 0.85 !important;
        }
        .showcase-swiper .swiper-slide-active {
          opacity: 1 !important;
          pointer-events: auto !important;
          visibility: visible !important;
          z-index: 25;
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row: Clean, without < > or small Hub button as requested */}
        <div className="mb-8 max-md:mb-6">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
            <Layers className="w-4 h-4" />
            <span>{lang === "EN" ? "Blender 3D Portfolio" : "Portofolio 3D Blender"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === "EN" ? "Showcase & Renders" : "Galeri Karya & Render 3D"}
          </h2>
          <p className="text-sm text-[#8b949e] mt-1">
            {lang === "EN"
              ? "Handcrafted 3D renders and animations directly from Dhitya's Blender archive — scroll horizontally to explore"
              : "Koleksi render 3D dan animasi buatan Dhitya langsung dari arsip Blender — geser ke samping untuk menjelajah"}
          </p>
        </div>

        {/* Carousel Viewport */}
        <div className="relative py-4 -mx-4 sm:-mx-6">
          {/* Edge Vignette Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-r from-[#0d1117] to-transparent z-30" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-24 bg-gradient-to-l from-[#0d1117] to-transparent z-30" />

          {/* Floating Navigation Chevrons directly beside the center GUI image */}
          <button
            type="button"
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous project card"
            className="absolute left-2 sm:left-[calc(50%-235px)] md:left-[calc(50%-255px)] top-[38%] -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/85 hover:bg-black border border-white/25 hover:border-[#8A6FB5] text-white hover:text-[#c7b2e8] backdrop-blur-md flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next project card"
            className="absolute right-2 sm:right-[calc(50%-235px)] md:right-[calc(50%-255px)] top-[38%] -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/85 hover:bg-black border border-white/25 hover:border-[#8A6FB5] text-white hover:text-[#c7b2e8] backdrop-blur-md flex items-center justify-center transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Swiper Coverflow Infinite Side-Scrolling Carousel */}
          <Swiper
            modules={[EffectCoverflow, Pagination, Navigation, Keyboard, Mousewheel]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            initialSlide={2}
            loop={true}
            loopAdditionalSlides={3}
            slideToClickedSlide={true}
            keyboard={{ enabled: true }}
            mousewheel={{ forceToAxis: true, sensitivity: 1 }}
            speed={500}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 80,
              modifier: 1,
              scale: 0.88,
              slideShadows: false,
            }}
            onSwiper={(swiper) => {
              setSwiperInstance(swiper);
              setActiveRealIndex(swiper.realIndex);
            }}
            onSlideChange={(swiper) => {
              setActiveRealIndex(swiper.realIndex);
            }}
            className="showcase-swiper !py-4"
          >
            {BLENDER_SHOWCASE.map((item, idx) => (
              <SwiperSlide
                key={item.id}
                className="!w-[84vw] !max-w-[340px] sm:!max-w-[400px] md:!w-[440px] !h-auto flex"
              >
                {({ isActive }) => (
                  <div
                    onClick={() => {
                      if (isActive) {
                        openModal(item);
                      }
                    }}
                    className={`w-full cursor-pointer bg-[#161b22] rounded-3xl overflow-hidden border flex flex-col justify-between transition-all duration-500 ease-out select-none ${
                      isActive
                        ? "border-[#8A6FB5] ring-1 ring-[#8A6FB5]/40 shadow-2xl shadow-[#8A6FB5]/25"
                        : "border-[#30363d] shadow-lg hover:border-[#8A6FB5]/50"
                    }`}
                  >
                    {/* Media Container */}
                    <div className="relative aspect-[16/10] w-full bg-[#0d1117] overflow-hidden flex items-center justify-center">
                      <Image
                        src={item.filename}
                        alt={item.title}
                        fill
                        className={`object-cover transition-transform duration-700 ${
                          isActive ? "hover:scale-105" : ""
                        }`}
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-85" />

                      {/* Active Card Glow Pill */}
                      {isActive && (
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8A6FB5]/30 backdrop-blur-md border border-[#8A6FB5]/60 text-[10px] font-bold text-white shadow-sm">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>{lang === "EN" ? "Featured 3D" : "Pilihan Unggulan"}</span>
                        </div>
                      )}

                      {/* Multi-angle photos badge */}
                      {item.photos.length > 1 && (
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#0d1117]/90 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                          <Images className="w-3.5 h-3.5 text-[#8A6FB5]" />
                          <span>
                            {item.photos.length} {lang === "EN" ? "Angles" : "Sudut"}
                          </span>
                        </div>
                      )}

                      {/* Inspect / Zoom Icon Top Right */}
                      <div className="absolute top-3 right-3 w-8 h-8 rounded-xl bg-[#0d1117]/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:scale-110 transition-all">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Card Content Info */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-[11px] font-mono text-[#8A6FB5] font-semibold uppercase tracking-wider truncate">
                            {item.subtitle}
                          </span>
                          <span className="text-[10px] text-[#8b949e] font-mono shrink-0">
                            {idx + 1} / {BLENDER_SHOWCASE.length}
                          </span>
                        </div>

                        <h3 className="text-lg font-bold text-white hover:text-[#c7b2e8] transition-colors mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-[#8b949e] line-clamp-2 leading-relaxed mb-4">
                          {item.description}
                        </p>
                      </div>

                      <div>
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {item.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-lg bg-[#0d1117] border border-[#30363d]/80 text-[10px] text-[#8b949e]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>

                        {/* Card Footer Info */}
                        <div className="pt-3.5 border-t border-[#30363d]/60 flex items-center justify-between text-xs">
                          <span className="text-[#8A6FB5] font-medium font-mono text-[11px]">
                            {item.stats.tool}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openModal(item);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1117] hover:bg-[#8A6FB5]/20 border border-[#30363d] hover:border-[#8A6FB5]/50 text-xs font-semibold text-[#c7b2e8] hover:text-white transition-all shadow-sm cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-[#8A6FB5]" />
                            <span>
                              {item.photos.length > 1
                                ? `${lang === "EN" ? "View" : "Lihat"} ${item.photos.length}`
                                : "Inspect"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Interactive Pagination Dots (5 items looping indicator) */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {BLENDER_SHOWCASE.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => swiperInstance?.slideToLoop(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  activeRealIndex === idx
                    ? "w-8 h-2 bg-[#8A6FB5] shadow-md shadow-[#8A6FB5]/50"
                    : "w-2 h-2 bg-[#30363d] hover:bg-[#8A6FB5]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Dedicated Gallery Action Banner */}
        <div className="mt-8 max-md:mt-5 p-6 max-md:p-4 rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1a202c] to-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5 max-md:items-start">
            <div className="w-10 h-10 rounded-xl bg-[#8A6FB5]/20 border border-[#8A6FB5]/40 flex items-center justify-center text-[#8A6FB5] shrink-0">
              <Box className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {lang === "EN"
                  ? "Explore All 16+ 3D Blender Works & Archive"
                  : "Jelajahi Seluruh 16+ Karya & Arsip 3D Blender"}
              </h4>
              <p className="text-xs text-[#8b949e]">
                {lang === "EN"
                  ? "Dedicated 3D Hub with complete cultural flags, fish revisions, katana, ricefield, and turnarounds."
                  : "Hub 3D khusus dengan bendera budaya lengkap, revisi ikan, katana, persawahan, dan animasi produk."}
              </p>
            </div>
          </div>

          <Link
            href="/blender"
            className="inline-flex items-center gap-2 px-5 py-2.5 max-md:w-full max-md:justify-center rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/25 hover:shadow-[#8A6FB5]/40 transition-all shrink-0 hover:-translate-y-0.5"
          >
            <span>{lang === "EN" ? "Open 3D Blender Hub" : "Buka Blender 3D Hub"}</span>
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
                  <p className="text-xs text-[#8b949e]">{selectedItem.subtitle}</p>
                </div>
                <button
                  type="button"
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
                      type="button"
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
                      type="button"
                      onClick={() =>
                        setActivePhotoIdx((prev) => (prev + 1) % selectedItem.photos.length)
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
                      type="button"
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
                <p className="text-sm text-[#c9d1d9] leading-relaxed">{selectedItem.description}</p>

                <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Software</span>
                    <span className="font-semibold text-white">{selectedItem.stats.tool}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">Style</span>
                    <span className="font-semibold text-white">{selectedItem.stats.style}</span>
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
