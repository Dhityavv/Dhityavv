"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
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
  const [selectedItem, setSelectedItem] = useState<BlenderShowcaseItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  // Default to index 2 (Redmi Note 13 4G Animation) matching the 3-card stage in photo 2
  const [activeIndex, setActiveIndex] = useState<number>(2);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Touch and drag swipe state
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const mouseStartX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);
  const wheelLock = useRef<boolean>(false);

  // Detect viewport size for responsive coverflow translation offsets
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

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

  // Infinite looping prev/next navigation
  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + BLENDER_SHOWCASE.length) % BLENDER_SHOWCASE.length);
  }, []);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % BLENDER_SHOWCASE.length);
  }, []);

  // Keyboard navigation when modal is not open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedItem) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlePrev, handleNext, selectedItem]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - (touchStartY.current || 0);

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    mouseStartX.current = e.clientX;
    isDragging.current = true;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging.current || mouseStartX.current === null) return;
    const deltaX = e.clientX - mouseStartX.current;
    if (Math.abs(deltaX) > 50) {
      if (deltaX < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    mouseStartX.current = null;
    isDragging.current = false;
  };

  // Horizontal wheel / trackpad swipe
  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
    if (Math.abs(delta) > 30) {
      if (wheelLock.current) return;
      wheelLock.current = true;
      if (delta > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTimeout(() => {
        wheelLock.current = false;
      }, 350);
    }
  };

  // Compute circular distance diff: -2, -1, 0, 1, 2
  const getCardTransform = (idx: number) => {
    let diff = (idx - activeIndex) % BLENDER_SHOWCASE.length;
    if (diff < -2) diff += BLENDER_SHOWCASE.length;
    if (diff > 2) diff -= BLENDER_SHOWCASE.length;

    const isActive = diff === 0;
    const isLeft = diff === -1;
    const isRight = diff === 1;

    let translateX = "0%";
    let scale = 0.72;
    let opacity = 0;
    let zIndex = 0;
    let pointerEvents: "auto" | "none" = "none";

    if (isMobile) {
      if (diff === 0) {
        translateX = "0%";
        scale = 1;
        opacity = 1;
        zIndex = 30;
        pointerEvents = "auto";
      } else if (diff === -1) {
        translateX = "-78%";
        scale = 0.86;
        opacity = 0.55;
        zIndex = 20;
        pointerEvents = "auto";
      } else if (diff === 1) {
        translateX = "78%";
        scale = 0.86;
        opacity = 0.55;
        zIndex = 20;
        pointerEvents = "auto";
      } else if (diff === -2) {
        translateX = "-150%";
        scale = 0.7;
        opacity = 0;
        zIndex = 10;
        pointerEvents = "none";
      } else if (diff === 2) {
        translateX = "150%";
        scale = 0.7;
        opacity = 0;
        zIndex = 10;
        pointerEvents = "none";
      }
    } else {
      if (diff === 0) {
        translateX = "0%";
        scale = 1;
        opacity = 1;
        zIndex = 30;
        pointerEvents = "auto";
      } else if (diff === -1) {
        translateX = "-104%";
        scale = 0.88;
        opacity = 0.6;
        zIndex = 20;
        pointerEvents = "auto";
      } else if (diff === 1) {
        translateX = "104%";
        scale = 0.88;
        opacity = 0.6;
        zIndex = 20;
        pointerEvents = "auto";
      } else if (diff === -2) {
        translateX = "-208%";
        scale = 0.75;
        opacity = 0;
        zIndex = 10;
        pointerEvents = "none";
      } else if (diff === 2) {
        translateX = "208%";
        scale = 0.75;
        opacity = 0;
        zIndex = 10;
        pointerEvents = "none";
      }
    }

    return {
      diff,
      isActive,
      isLeft,
      isRight,
      style: {
        transform: `translateX(${translateX}) scale(${scale})`,
        opacity,
        zIndex,
        pointerEvents,
        transition:
          Math.abs(diff) === 2
            ? "opacity 280ms ease"
            : "transform 500ms cubic-bezier(0.25, 1, 0.5, 1), opacity 500ms ease, box-shadow 500ms ease, border-color 500ms ease",
      },
    };
  };

  return (
    <section id="showcase" className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 max-md:mb-6">
          <div>
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

          <div className="flex items-center gap-2.5">
            {/* Arrow Controls on top right for quick cyclic navigation */}
            <div className="flex items-center gap-1.5 mr-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous Project"
                className="w-9 h-9 rounded-xl border border-[#30363d] bg-[#161b22] text-white hover:border-[#8A6FB5] hover:text-[#c7b2e8] flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next Project"
                className="w-9 h-9 rounded-xl border border-[#30363d] bg-[#161b22] text-white hover:border-[#8A6FB5] hover:text-[#c7b2e8] flex items-center justify-center transition-all shadow-sm hover:scale-105 active:scale-95"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              href="/blender"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8A6FB5] to-[#71529e] hover:from-[#967cc2] hover:to-[#7e5eb0] text-xs font-semibold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all shrink-0"
            >
              <span>{lang === "EN" ? "Open 3D Blender Hub" : "Buka Blender 3D Hub"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3D Infinite Looping Carousel Stage */}
        <div className="relative py-4 -mx-4 sm:-mx-6">
          {/* Edge Vignette Fades */}
          <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#0d1117] to-transparent z-35" />
          <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#0d1117] to-transparent z-35" />

          {/* Floating Navigation Chevrons directly on Carousel Stage */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous project card"
            className="absolute left-3 sm:left-6 md:left-[calc(50%-255px)] top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/75 hover:bg-black/95 border border-white/20 hover:border-[#8A6FB5] text-white hover:text-[#c7b2e8] backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next project card"
            className="absolute right-3 sm:right-6 md:right-[calc(50%-255px)] top-1/2 -translate-y-1/2 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-black/75 hover:bg-black/95 border border-white/20 hover:border-[#8A6FB5] text-white hover:text-[#c7b2e8] backdrop-blur-md flex items-center justify-center transition-all shadow-xl hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Centered Stage Container */}
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            className="relative w-full h-[550px] sm:h-[600px] md:h-[640px] flex items-center justify-center select-none"
          >
            {BLENDER_SHOWCASE.map((item, idx) => {
              const { diff, isActive, isLeft, isRight, style } = getCardTransform(idx);

              return (
                <div
                  key={item.id}
                  style={style}
                  onClick={() => {
                    if (isActive) {
                      openModal(item);
                    } else if (isLeft) {
                      handlePrev();
                    } else if (isRight) {
                      handleNext();
                    } else {
                      setActiveIndex(idx);
                    }
                  }}
                  className={`absolute w-[86vw] max-w-[340px] sm:max-w-[400px] md:w-[440px] cursor-pointer bg-[#161b22] rounded-3xl overflow-hidden border flex flex-col justify-between transform-gpu ${
                    isActive
                      ? "border-[#8A6FB5] ring-1 ring-[#8A6FB5]/40 shadow-2xl shadow-[#8A6FB5]/25"
                      : "border-[#30363d] shadow-lg hover:border-[#8A6FB5]/50 hover:opacity-85"
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
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0d1117] hover:bg-[#8A6FB5]/20 border border-[#30363d] hover:border-[#8A6FB5]/50 text-xs font-semibold text-[#c7b2e8] hover:text-white transition-all shadow-sm"
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
              );
            })}
          </div>

          {/* Interactive Pagination Dots (5 items looping indicator) */}
          <div className="flex items-center justify-center gap-2 mt-4">
            {BLENDER_SHOWCASE.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}: ${item.title}`}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
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
