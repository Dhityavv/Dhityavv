'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { Box, X, ArrowRight, Eye, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { RenderItem } from '@/types/portfolio';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { ArtworkMediaStage } from '@/components/ArtworkMediaStage';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { usePortfolioData } from '@/context/PortfolioDataContext';

interface ShowcaseCardProps {
  item: RenderItem;
  idx: number;
  language: string;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  onOpen: (item: RenderItem) => void;
  wasDraggingRef: React.MutableRefObject<boolean>;
}

function ShowcaseCarouselCard({
  item,
  idx,
  language,
  scrollContainerRef,
  onOpen,
  wasDraggingRef,
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const title = language === 'id' ? item.titleId : item.titleEn;
  const categoryLabel = language === 'id' ? item.categoryLabelId : item.categoryLabelEn;

  const { scrollXProgress } = useScroll({
    container: scrollContainerRef,
    target: cardRef,
    axis: 'x',
    offset: ['start end', 'end start'],
  });

  const rawScale = useTransform(scrollXProgress, [0, 0.16, 0.5, 0.84, 1], [0.88, 0.94, 1, 0.94, 0.88]);
  const rawOpacity = useTransform(scrollXProgress, [0, 0.16, 0.5, 0.84, 1], [0.42, 0.72, 1, 0.72, 0.42]);

  const scale = useSpring(rawScale, { stiffness: 260, damping: 28, mass: 0.6 });
  const opacity = useSpring(rawOpacity, { stiffness: 260, damping: 28, mass: 0.6 });

  return (
    <motion.div
      ref={cardRef}
      style={{ scale, opacity }}
      initial={{ y: 20 }}
      whileInView={{ y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 320, damping: 24, delay: Math.min(idx * 0.05, 0.25) }}
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
      className="snap-center shrink-0 w-[84%] sm:w-[48%] lg:w-[calc(33.333%-14px)] liquid-glass group cursor-pointer rounded-2xl overflow-hidden flex flex-col justify-between hover:shadow-2xl border border-white/10 hover:border-indigo-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 select-none"
    >
      {/* Media Preview Slot */}
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-black/40">
        {item.video ? (
          <video
            src={item.video}
            title={title}
            aria-label={title}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
          />
        ) : (
          <Image
            src={item.image}
            alt={title}
            fill
            draggable={false}
            sizes="(max-width: 640px) 84vw, (max-width: 1024px) 48vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity pointer-events-none" />

        <div className="absolute top-3 left-3">
          <span className="surface-elevated/90 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono font-medium text-zinc-100 dark:text-zinc-200 border border-white/10 shadow-sm">
            {categoryLabel}
          </span>
        </div>

        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="w-7 h-7 rounded-lg surface-elevated/90 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
            <Eye className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="p-5 space-y-2.5">
        <h3 className="font-display font-bold text-lg group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-secondary leading-relaxed line-clamp-2">
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
  const [activeSlide, setActiveSlide] = useState(0);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const isDraggingRef = useRef(false);
  const wasDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartScrollRef = useRef(0);

  const handleOpenArtwork = (item: RenderItem) => {
    setSelectedAngleIndex(0);
    openArtwork(item);
  };

  const scrollByCard = useCallback((direction: 'prev' | 'next') => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const step = Math.max(280, Math.round(el.clientWidth * 0.36));
    const target =
      direction === 'next'
        ? Math.min(el.scrollWidth - el.clientWidth, el.scrollLeft + step)
        : Math.max(0, el.scrollLeft - step);

    gsap.to(el, {
      scrollLeft: target,
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  const scrollToIndex = useCallback((index: number) => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const children = el.children;
    const targetChild = children[index] as HTMLElement | undefined;
    if (!targetChild) return;
    const targetLeft =
      targetChild.offsetLeft - (el.clientWidth - targetChild.clientWidth) / 2;

    gsap.to(el, {
      scrollLeft: Math.max(0, targetLeft),
      duration: 0.65,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  }, []);

  const handleTrackScroll = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || rendersShowcase.length === 0) return;
    const maxScroll = Math.max(1, el.scrollWidth - el.clientWidth);
    const ratio = el.scrollLeft / maxScroll;
    const idx = Math.round(ratio * (rendersShowcase.length - 1));
    setActiveSlide(Math.max(0, Math.min(rendersShowcase.length - 1, idx)));
  }, [rendersShowcase.length]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    wasDraggingRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartScrollRef.current = el.scrollLeft;
    gsap.killTweensOf(el);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    const el = scrollContainerRef.current;
    if (!el) return;
    const dx = e.clientX - dragStartXRef.current;
    if (Math.abs(dx) > 6) {
      wasDraggingRef.current = true;
    }
    el.scrollLeft = dragStartScrollRef.current - dx;
  };

  const handlePointerUpOrLeave = () => {
    isDraggingRef.current = false;
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

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="liquid-glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-secondary">
            <Box className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>{rendersShowcase.length} Featured Renders</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollByCard('prev')}
              aria-label="Previous render"
              className="liquid-glass p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] hover:border-indigo-500/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard('next')}
              aria-label="Next render"
              className="liquid-glass p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] hover:border-indigo-500/40 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal Smooth-Scroll 6-Card Carousel (Edge fade/scale via Motion useScroll) */}
      <div className="relative">
        <div
          ref={scrollContainerRef}
          onScroll={handleTrackScroll}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUpOrLeave}
          onPointerLeave={handlePointerUpOrLeave}
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)',
          }}
          className="flex items-stretch gap-5 overflow-x-auto no-scrollbar snap-x snap-mandatory py-3 px-4 sm:px-6 cursor-grab active:cursor-grabbing"
        >
          {rendersShowcase.map((item, idx) => (
            <ShowcaseCarouselCard
              key={item.id}
              item={item}
              idx={idx}
              language={language}
              scrollContainerRef={scrollContainerRef}
              onOpen={handleOpenArtwork}
              wasDraggingRef={wasDraggingRef}
            />
          ))}
        </div>

        {/* Carousel Slide Dots */}
        {rendersShowcase.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 pt-2">
            {rendersShowcase.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => scrollToIndex(idx)}
                aria-label={`Go to render ${idx + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  activeSlide === idx
                    ? 'w-6 bg-indigo-500'
                    : 'w-1.5 bg-white/25 hover:bg-white/45'
                }`}
              />
            ))}
          </div>
        )}
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
