"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/LanguageContext";
import { BLENDER_SHOWCASE, BlenderShowcaseItem } from "@/lib/blender-showcase";
import {
  Layers,
  Maximize2,
  X,
  ExternalLink,
  ArrowRight,
  Images,
  ChevronLeft,
  ChevronRight,
  RotateCw,
} from "lucide-react";

export function ShowcaseGallery() {
  const { lang } = useLanguage();
  const [selectedItem, setSelectedItem] = useState<BlenderShowcaseItem | null>(null);
  const [activePhotoIdx, setActivePhotoIdx] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);

  // 3D Cylinder state
  const rotationRef = useRef<number>(0);
  const targetRotationRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const startXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);
  const worldRef = useRef<HTMLDivElement | null>(null);
  const animFrameIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Prevent background scroll when modal lightbox is open
  useEffect(() => {
    if (!selectedItem) {
      setAutoRotate(true);
      return;
    }

    setAutoRotate(false);
    const bodyOverflow = document.body.style.overflow;
    const documentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = bodyOverflow;
      document.documentElement.style.overflow = documentOverflow;
    };
  }, [selectedItem]);

  // Smooth Animation Loop
  useEffect(() => {
    const animate = (time: number) => {
      const delta = lastTimeRef.current ? (time - lastTimeRef.current) / 1000 : 0.016;
      lastTimeRef.current = time;

      if (autoRotate && !isDraggingRef.current && !selectedItem) {
        targetRotationRef.current += 9 * delta;
      }

      const diff = targetRotationRef.current - rotationRef.current;
      rotationRef.current += diff * 0.08;

      if (worldRef.current) {
        worldRef.current.style.transform = `rotateY(${rotationRef.current}deg)`;
      }

      animFrameIdRef.current = requestAnimationFrame(animate);
    };

    animFrameIdRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [autoRotate, selectedItem]);

  // Pointer & Drag handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const deltaX = e.clientX - startXRef.current;
    dragDistanceRef.current += Math.abs(deltaX);
    targetRotationRef.current += deltaX * 0.3;
    startXRef.current = e.clientX;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e: React.WheelEvent) => {
    const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY * 0.5;
    if (Math.abs(delta) > 4) {
      targetRotationRef.current -= delta * 0.08;
    }
  };

  const openModal = (item: BlenderShowcaseItem) => {
    if (dragDistanceRef.current > 10) return;
    setSelectedItem(item);
    setActivePhotoIdx(0);
  };

  const items = BLENDER_SHOWCASE;
  const count = items.length;
  const angleStep = 360 / count;
  const radius = 430;

  return (
    <section
      id="showcase"
      className="py-14 sm:py-24 border-t border-[#30363d]/60 relative select-none overflow-visible"
    >
      {/* 3D Global Perspective without any bounding clipping */}
      <style jsx global>{`
        .cylinder-viewport-open {
          perspective: 1200px;
          perspective-origin: 50% 46%;
          width: 100%;
          min-height: 560px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          touch-action: pan-y;
          overflow: visible !important;
        }
        @media (max-width: 640px) {
          .cylinder-viewport-open {
            perspective: 850px;
            min-height: 490px;
          }
        }
        .cylinder-world-open {
          transform-style: preserve-3d;
          width: 0;
          height: 0;
          position: relative;
          will-change: transform;
        }
        .cylinder-card-open {
          position: absolute;
          width: 250px;
          height: 360px;
          left: -125px;
          top: -180px;
          transform-style: preserve-3d;
          cursor: pointer;
          transition: border-color 0.3s ease, box-shadow 0.3s ease;
          border-radius: 18px;
          background: rgba(22, 27, 34, 0.85);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.7);
        }
        @media (max-width: 640px) {
          .cylinder-card-open {
            width: 210px;
            height: 310px;
            left: -105px;
            top: -155px;
          }
        }
        .cylinder-card-open:hover {
          border-color: rgba(138, 111, 181, 0.9);
          box-shadow: 0 0 35px rgba(138, 111, 181, 0.45), 0 25px 50px rgba(0, 0, 0, 0.85);
        }
        /* Floor glass reflection extending naturally below */
        .card-reflection-open {
          position: absolute;
          width: 250px;
          height: 250px;
          top: 365px;
          left: 0;
          transform: scaleY(-1);
          opacity: 0.22;
          mask-image: linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 65%);
          -webkit-mask-image: linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 65%);
          pointer-events: none;
          border-radius: 18px;
          overflow: hidden;
        }
        @media (max-width: 640px) {
          .card-reflection-open {
            width: 210px;
            height: 200px;
            top: 315px;
          }
        }
      `}</style>

      {/* Radial soft ambient glow in the section background */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_52%,rgba(138,111,181,0.14)_0%,transparent_60%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
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
                ? "3D cylinder showcase directly from Dhitya's Blender archive — drag or swipe to rotate"
                : "Galeri 3D melingkar langsung dari arsip Blender Dhitya — geser untuk memutar karya"}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/blender"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161b22] hover:bg-[#8A6FB5]/20 border border-[#30363d] hover:border-[#8A6FB5]/50 text-xs font-bold text-[#c7b2e8] hover:text-white transition-all shadow-sm"
            >
              <span>{lang === "EN" ? "Open 3D Hub" : "Buka Hub 3D"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 3D Cylinder Stage - OPEN (No bounding box / No clipping borders) */}
        <div
          className="relative py-8 overflow-visible"
          onWheel={handleWheel}
        >
          {/* Navigation arrow buttons positioned at the edges */}
          <button
            type="button"
            onClick={() => {
              targetRotationRef.current += angleStep;
            }}
            aria-label="Previous artwork"
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-black/75 hover:bg-black border border-white/20 hover:border-[#8A6FB5] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            type="button"
            onClick={() => {
              targetRotationRef.current -= angleStep;
            }}
            aria-label="Next artwork"
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-black/75 hover:bg-black border border-white/20 hover:border-[#8A6FB5] text-white flex items-center justify-center backdrop-blur-md transition-all shadow-2xl hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Interactive 3D Viewport: Completely unconstrained */}
          <div
            className="cylinder-viewport-open cursor-grab active:cursor-grabbing"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div ref={worldRef} className="cylinder-world-open">
              {items.map((item, index) => {
                const angle = index * angleStep;
                const rad = angle * (Math.PI / 180);
                const x = radius * Math.sin(rad);
                const z = radius * Math.cos(rad);

                const itemTitle =
                  lang === "EN" ? item.titleEn || item.title : item.titleId || item.title;
                const itemSubtitle =
                  lang === "EN"
                    ? item.subtitleEn || item.subtitle
                    : item.subtitleId || item.subtitle;

                return (
                  <div
                    key={item.id}
                    className="cylinder-card-open group flex flex-col justify-between overflow-hidden"
                    style={{
                      transform: `translateX(${x}px) translateZ(${z}px) rotateY(${angle}deg)`,
                    }}
                    onClick={() => openModal(item)}
                  >
                    {/* Top Image Thumbnail */}
                    <div className="relative aspect-[16/11] w-full bg-[#0d1117] overflow-hidden">
                      <Image
                        src={item.filename}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-108"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#161b22] via-transparent to-transparent opacity-90" />

                      {/* Zoom button on thumbnail */}
                      <div className="absolute top-2.5 right-2.5 w-7 h-7 rounded-xl bg-black/75 border border-white/15 flex items-center justify-center text-white/90 group-hover:scale-110 transition-transform">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </div>

                      {/* Angles count pill if multi-angle */}
                      {item.photos.length > 1 && (
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-[10px] font-mono text-white">
                          <Images className="w-3 h-3 text-[#8A6FB5]" />
                          <span>
                            {item.photos.length} {lang === "EN" ? "Angles" : "Sudut"}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between gap-1 mb-1">
                          <span className="text-[10px] font-mono text-[#8A6FB5] uppercase font-semibold tracking-wider truncate">
                            {itemSubtitle}
                          </span>
                          <span className="text-[9px] font-mono text-[#8b949e] shrink-0">
                            {index + 1}/{count}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-white group-hover:text-[#c7b2e8] transition-colors line-clamp-1">
                          {itemTitle}
                        </h4>
                        <p className="text-[11px] text-[#8b949e] line-clamp-2 mt-1 leading-snug">
                          {lang === "EN"
                            ? item.descriptionEn || item.description
                            : item.descriptionId || item.description}
                        </p>
                      </div>

                      {/* Footer Info & Click hint */}
                      <div className="pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px]">
                        <span className="text-[#8A6FB5] font-mono font-semibold">
                          {item.stats.tool}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-white/5 border border-white/10 text-white font-medium group-hover:bg-[#8A6FB5] group-hover:border-[#8A6FB5] transition-colors">
                          {lang === "EN" ? "Open Details" : "Lihat Detail"}
                        </span>
                      </div>
                    </div>

                    {/* Floor Reflection effect below the card */}
                    <div className="card-reflection-open">
                      <Image
                        src={item.filename}
                        alt=""
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Floating Controls Bar at Bottom */}
          <div className="flex items-center justify-between mt-2 pt-2 px-2">
            <div className="flex items-center gap-2 text-xs text-[#8b949e]">
              <span className="w-2 h-2 rounded-full bg-[#8A6FB5] animate-ping" />
              <span>
                {lang === "EN"
                  ? "Click any card to inspect · Drag or swipe horizontally to rotate"
                  : "Klik kartu untuk melihat detail · Geser ke samping untuk memutar"}
              </span>
            </div>

            {/* Auto Rotate Switch Button */}
            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#161b22]/90 border border-[#30363d] backdrop-blur-md shadow-lg">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                <RotateCw
                  className={`w-3.5 h-3.5 text-[#8A6FB5] ${autoRotate ? "animate-spin" : ""}`}
                  style={{ animationDuration: "6s" }}
                />
                AUTO-ROTATE
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={autoRotate}
                onClick={() => setAutoRotate(!autoRotate)}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  autoRotate ? "bg-[#8A6FB5]" : "bg-white/20"
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    autoRotate ? "translate-x-4.5" : "translate-x-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Lightbox / Details GUI (re-activates auto-rotate upon closing) */}
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
                    <span>
                      {lang === "EN"
                        ? selectedItem.titleEn || selectedItem.title
                        : selectedItem.titleId || selectedItem.title}
                    </span>
                    {selectedItem.photos.length > 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#8A6FB5]/20 text-[#c7b2e8] border border-[#8A6FB5]/30">
                        {activePhotoIdx + 1} {lang === "EN" ? "of" : "dari"}{" "}
                        {selectedItem.photos.length}
                      </span>
                    )}
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    {lang === "EN"
                      ? selectedItem.subtitleEn || selectedItem.subtitle
                      : selectedItem.subtitleId || selectedItem.subtitle}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-lg bg-[#21262d] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:bg-[#30363d] transition-colors cursor-pointer"
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

                {selectedItem.photos.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIdx((prev) =>
                          prev === 0 ? selectedItem.photos.length - 1 : prev - 1
                        )
                      }
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setActivePhotoIdx((prev) => (prev + 1) % selectedItem.photos.length)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-xl bg-black/60 hover:bg-black/90 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
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
                    {lang === "EN" ? "Angles:" : "Sudut Pandang:"}
                  </span>
                  {selectedItem.photos.map((p, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActivePhotoIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all shrink-0 cursor-pointer ${
                        activePhotoIdx === idx
                          ? "bg-[#8A6FB5] border-[#8A6FB5] text-white"
                          : "bg-[#161b22] border-[#30363d] text-[#8b949e] hover:text-white"
                      }`}
                    >
                      <span>{lang === "EN" ? p.labelEn || p.label : p.labelId || p.label}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Modal Details Footer */}
              <div className="p-5 border-t border-[#30363d] bg-[#161b22] space-y-3">
                <p className="text-sm text-[#c9d1d9] leading-relaxed">
                  {lang === "EN"
                    ? selectedItem.descriptionEn || selectedItem.description
                    : selectedItem.descriptionId || selectedItem.description}
                </p>

                <div className="grid grid-cols-3 gap-2 text-xs pt-2">
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">{lang === "EN" ? "Software" : "Software"}</span>
                    <span className="font-semibold text-white">{selectedItem.stats.tool}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">{lang === "EN" ? "Style" : "Gaya Desain"}</span>
                    <span className="font-semibold text-white">
                      {lang === "EN"
                        ? selectedItem.stats.styleEn || selectedItem.stats.style
                        : selectedItem.stats.styleId || selectedItem.stats.style}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#0d1117] border border-[#30363d]">
                    <span className="text-[#8b949e] block">{lang === "EN" ? "Note" : "Catatan Teknis"}</span>
                    <span className="font-semibold text-white truncate block">
                      {lang === "EN"
                        ? selectedItem.stats.renderNoteEn || selectedItem.stats.renderNote
                        : selectedItem.stats.renderNoteId || selectedItem.stats.renderNote}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex flex-wrap gap-1.5">
                    {(lang === "EN"
                      ? selectedItem.tagsEn || selectedItem.tags
                      : selectedItem.tagsId || selectedItem.tags
                    ).map((tag) => (
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
                    <span>{lang === "EN" ? "Open Current Asset" : "Buka Aset Gambar"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
