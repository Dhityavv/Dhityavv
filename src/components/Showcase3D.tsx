'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Box, X, ArrowRight, Eye, Play } from 'lucide-react';
import { RENDERS_SHOWCASE } from '@/data/portfolioData';
import { RenderItem } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';

export function Showcase3D() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { selectedArtwork, openArtwork, closeArtwork } = useModal();
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);

  const handleOpenArtwork = (item: RenderItem) => {
    setSelectedAngleIndex(0);
    openArtwork(item);
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
          <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]">
            {t.showcase.title}
          </h2>
          <p className="text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
            {t.showcase.desc}
          </p>
        </div>

        <div className="liquid-glass inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-mono text-secondary self-start md:self-auto">
          <Box className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>3D Pipeline Archive</span>
        </div>
      </div>

      {/* Grid of Exactly 3 Real 3D Renders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {RENDERS_SHOWCASE.map((item, idx) => {
          const title = language === 'id' ? item.titleId : item.titleEn;
          const categoryLabel = language === 'id' ? item.categoryLabelId : item.categoryLabelEn;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => handleOpenArtwork(item)}
              tabIndex={0}
              role="button"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenArtwork(item);
                }
              }}
              className="liquid-glass group cursor-pointer rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-white/10 hover:border-indigo-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <Image
                    src={item.image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-75 group-hover:opacity-40 transition-opacity pointer-events-none" />

                {/* Clean, Readable Category Badge (No Year/Engine clutter on outer card) */}
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
        })}
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

              <div className="overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4">
                {/* Active Media Display */}
                <div className="relative w-full rounded-xl overflow-hidden bg-black/60 max-h-[55vh] flex items-center justify-center border border-token">
                  {selectedArtwork.video && selectedAngleIndex === 0 ? (
                    <video
                      src={selectedArtwork.video}
                      autoPlay
                      loop
                      muted
                      controls
                      playsInline
                      className="max-h-[55vh] w-full object-contain"
                    />
                  ) : (
                    <Image
                      src={
                        selectedArtwork.images && selectedArtwork.images.length > 0
                          ? selectedArtwork.images[selectedArtwork.video ? selectedAngleIndex - 1 : selectedAngleIndex] || selectedArtwork.image
                          : selectedArtwork.image
                      }
                      alt={selectedArtwork.titleEn}
                      width={1200}
                      height={800}
                      sizes="(max-width: 768px) 100vw, 768px"
                      className="max-h-[55vh] w-auto h-auto object-contain"
                    />
                  )}
                </div>

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
