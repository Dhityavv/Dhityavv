'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from 'framer-motion';
import { Box, X, ArrowRight, Eye, Play } from 'lucide-react';
import { RenderItem } from '@/types/portfolio';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { ArtworkMediaStage } from '@/components/ArtworkMediaStage';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { usePortfolioData } from '@/context/PortfolioDataContext';

interface CircularCardProps {
  index: number;
  count: number;
  item: RenderItem;
  language: string;
  smoothOffset: MotionValue<number>;
  stepPx: number;
  onOpen: (item: RenderItem) => void;
  wasDraggingRef: React.MutableRefObject<boolean>;
}

/**
 * Computes shortest signed circular offset in [-count/2, +count/2]
 * so cards wrap cleanly behind opacity: 0 without ever unmounting.
 */
function circularOffset(index: number, offset: number, count: number): number {
  const mod = (((index - offset) % count) + count) % count;
  return mod > count / 2 ? mod - count : mod;
}

function VirtualShowcaseCard({
  index,
  count,
  item,
  language,
  smoothOffset,
  stepPx,
  onOpen,
  wasDraggingRef,
}: CircularCardProps) {
  const title = language === 'id' ? item.titleId : item.titleEn;
  const categoryLabel = language === 'id' ? item.categoryLabelId : item.categoryLabelEn;

  const x = useTransform(smoothOffset, (v) => circularOffset(index, v, count) * stepPx);
  const y = useTransform(smoothOffset, (v) => {
    const abs = Math.abs(circularOffset(index, v, count));
    if (abs <= 1) return -10 + abs * 14; // center: -10px (elevated), side: +4px
    if (abs <= 2) return 4 + (abs - 1) * 12; // preview: +16px
    return 16;
  });
  const scale = useTransform(smoothOffset, (v) => {
    const abs = Math.abs(circularOffset(index, v, count));
    if (abs <= 1) return 1.05 - abs * 0.09; // center: 1.05, side: 0.96
    if (abs <= 2) return 0.96 - (abs - 1) * 0.16; // preview: 0.80
    const t = Math.min(1, (abs - 2) / 0.6);
    return 0.8 - t * 0.1;
  });
  const opacity = useTransform(smoothOffset, (v) => {
    const abs = Math.abs(circularOffset(index, v, count));
    if (abs <= 1) return 1 - abs * 0.08; // center: 1, side: 0.92
    if (abs <= 2) return 0.92 - (abs - 1) * 0.62; // preview: 0.30
    const t = Math.min(1, (abs - 2) / 0.5);
    return Math.max(0, 0.3 * (1 - t));
  });
  const zIndex = useTransform(smoothOffset, (v) => {
    const abs = Math.abs(circularOffset(index, v, count));
    return abs <= 0.45 ? 30 : abs <= 1.45 ? 20 : abs <= 2.3 ? 10 : 1;
  });
  const pointerEvents = useTransform(smoothOffset, (v) =>
    Math.abs(circularOffset(index, v, count)) > 2.35 ? 'none' : 'auto'
  );

  return (
    <motion.div
      style={{ x, y, scale, opacity, zIndex, pointerEvents }}
      onClick={() => {
        if (wasDraggingRef.current) return;
        onOpen(item);
      }}
      tabIndex={0}
      role="button"
      aria-label={`View 3D render: ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpen(item);
        }
      }}
      className="absolute left-1/2 top-4 -ml-[145px] sm:-ml-[153px] w-[290px] sm:w-[306px] liquid-glass group cursor-grab active:cursor-grabbing rounded-2xl overflow-hidden flex flex-col justify-between border border-white/10 hover:border-indigo-500/45 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 select-none"
    >
      {/* Media Preview Slot (always show crisp cover image on outer card; video plays inside modal) */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/40">
        <Image
          src={item.image}
          alt={title}
          fill
          draggable={false}
          sizes="306px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity pointer-events-none" />

        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="surface-elevated/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-zinc-100 dark:text-zinc-200 border border-white/10 shadow-sm">
            {categoryLabel}
          </span>
          {item.video && (
            <span
              className="surface-elevated/90 backdrop-blur-md p-1 rounded-md text-indigo-300 border border-white/10 shadow-sm"
              title="Video available"
            >
              <Play className="w-3 h-3 fill-current" />
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-7 h-7 rounded-lg surface-elevated/90 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="p-5 space-y-2.5">
        <h3 className="font-display font-bold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
          {title}
        </h3>
        <p className="text-xs text-secondary leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {language === 'id' ? item.descId : item.descEn}
        </p>

        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-token">
          {item.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="surface-elevated px-2 py-0.5 rounded text-[10px] font-mono text-secondary"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Showcase3D() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { rendersShowcase } = usePortfolioData();
  const { selectedArtwork, openArtwork, closeArtwork } = useModal();
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);
  const [stepPx, setStepPx] = useState(330);

  const stageRef = useRef<HTMLDivElement | null>(null);
  const targetOffset = useMotionValue(1);
  const smoothOffset = useSpring(targetOffset, { stiffness: 190, damping: 26, mass: 0.7 });

  const isDraggingRef = useRef(false);
  const wasDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(1);
  const lastWheelStepMsRef = useRef(0);

  const handleOpenArtwork = (item: RenderItem) => {
    setSelectedAngleIndex(0);
    openArtwork(item);
  };

  // Responsive card step spacing
  useEffect(() => {
    const updateStep = () => {
      setStepPx(window.innerWidth < 640 ? 310 : 330);
    };
    updateStep();
    window.addEventListener('resize', updateStep);
    return () => window.removeEventListener('resize', updateStep);
  }, []);

  // Hold Shift + Scroll wheel: strictly 1 card per notch with 200ms cooldown (never slippery)
  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      if (!e.shiftKey) return;
      e.preventDefault();
      e.stopPropagation();

      const now = performance.now();
      if (now - lastWheelStepMsRef.current < 200) return;

      const rawDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(rawDelta) < 12) return;

      lastWheelStepMsRef.current = now;
      const dir = rawDelta > 0 ? 1 : -1;
      targetOffset.set(Math.round(targetOffset.get()) + dir);
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [targetOffset]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    isDraggingRef.current = true;
    wasDraggingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = targetOffset.get();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      wasDraggingRef.current = true;
    }
    targetOffset.set(dragStartOffsetRef.current - dx / stepPx);
  };

  const handlePointerUpOrLeave = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    targetOffset.set(Math.round(targetOffset.get()));
    setTimeout(() => {
      wasDraggingRef.current = false;
    }, 60);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeArtwork();
    };
    if (selectedArtwork) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedArtwork, closeArtwork]);

  const count = rendersShowcase.length;

  return (
    <section id="showcase" className="scroll-mt-24 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t.showcase.eyebrow}
          </span>
          <SplitRevealTitle
            text={t.showcase.title}
            className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]"
          />
          <p className="text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
            {t.showcase.desc}
          </p>
        </div>

        <div className="liquid-glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-secondary self-start md:self-auto">
          <Box className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{count} Featured Renders</span>
        </div>
      </div>

      {/* Glitch-Free Virtualized Infinite Carousel:
          - Normal scroll = vertical page scroll (Lenis)
          - Hold Shift + Scroll or Left-Click + Drag = smooth infinite horizontal shift
          - 3 center cards at full scale/opacity + left/right dimmed preview cards */}
      <div
        ref={stageRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpOrLeave}
        onPointerLeave={handlePointerUpOrLeave}
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
        className="relative w-screen left-1/2 -translate-x-1/2 max-w-[1440px] h-[420px] sm:h-[430px] overflow-hidden cursor-grab active:cursor-grabbing"
      >
        {count > 0 &&
          rendersShowcase.map((item, idx) => (
            <VirtualShowcaseCard
              key={item.id}
              index={idx}
              count={count}
              item={item}
              language={language}
              smoothOffset={smoothOffset}
              stepPx={stepPx}
              onOpen={handleOpenArtwork}
              wasDraggingRef={wasDraggingRef}
            />
          ))}
      </div>

      {/* Button: View All 3D Archives (Internal Route /blender-showcase with 0 URL preview popup) */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={() => router.push('/blender-showcase')}
          className="liquid-glass group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-secondary hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span>{t.showcase.viewAllBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-indigo-500" />
        </button>
      </div>

      {/* Inspect Artwork Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeArtwork}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 liquid-glass-modal w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] overscroll-contain"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-token">
                <div className="flex items-center gap-2">
                  <Box className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {language === 'id' ? selectedArtwork.titleId : selectedArtwork.titleEn}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeArtwork}
                  aria-label="Close"
                  className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div data-lenis-prevent className="overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4">
                {/* Fixed-Height Preloaded Smooth Crossfade Media Display */}
                <ArtworkMediaStage
                  artwork={selectedArtwork}
                  selectedAngleIndex={selectedAngleIndex}
                  title={language === 'id' ? selectedArtwork.titleId : selectedArtwork.titleEn}
                />

                {/* Multi-angle / Animation & Render switcher */}
                {((selectedArtwork.video && selectedArtwork.images && selectedArtwork.images.length > 0) ||
                  (selectedArtwork.images && selectedArtwork.images.length > 1)) && (
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-mono text-muted mr-1">
                      {selectedArtwork.video
                        ? language === 'id'
                          ? 'Media / Render:'
                          : 'Media / Render:'
                        : 'Angles / Variants:'}
                    </span>
                    {selectedArtwork.video && (
                      <button
                        type="button"
                        onClick={() => setSelectedAngleIndex(0)}
                        className={`relative w-14 h-12 rounded-lg overflow-hidden border bg-black/70 flex flex-col items-center justify-center gap-0.5 transition-all cursor-pointer ${
                          selectedAngleIndex === 0
                            ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105 text-indigo-400'
                            : 'border-white/10 text-secondary opacity-75 hover:opacity-100'
                        }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span className="text-[9px] font-mono uppercase">Anim</span>
                      </button>
                    )}
                    {selectedArtwork.images.map((imgUrl: string, idx: number) => {
                      const targetIndex = selectedArtwork.video ? idx + 1 : idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedAngleIndex(targetIndex)}
                          className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all cursor-pointer ${
                            selectedAngleIndex === targetIndex
                              ? 'border-indigo-500 ring-2 ring-indigo-500/40 scale-105'
                              : 'border-white/10 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image src={imgUrl} alt={`Render ${idx + 1}`} fill sizes="48px" className="object-cover" />
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Specs and Technical Breakdown */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="surface-elevated px-2.5 py-1 rounded-md text-xs font-mono text-indigo-600 dark:text-indigo-400 border border-token">
                      {selectedArtwork.blenderVersion || 'Blender 5.3'} • {selectedArtwork.renderEngine || 'Cycles'}
                    </span>
                    <span className="surface-elevated px-2.5 py-1 rounded-md text-xs font-mono text-emerald-600 dark:text-emerald-400 border border-token">
                      Year: {selectedArtwork.year || '2026'}
                    </span>
                    <span className="surface-elevated px-2.5 py-1 rounded-md text-xs font-mono text-secondary border border-token">
                      Category: {language === 'id' ? selectedArtwork.categoryLabelId : selectedArtwork.categoryLabelEn}
                    </span>
                  </div>
                  <p className="text-sm text-secondary leading-relaxed pt-1">
                    {language === 'id' ? selectedArtwork.descId : selectedArtwork.descEn}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-token">
                  {selectedArtwork.tags.map((tag: string) => (
                    <span
                      key={tag}
                      className="surface-elevated px-2.5 py-1 rounded-md text-xs font-mono text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
