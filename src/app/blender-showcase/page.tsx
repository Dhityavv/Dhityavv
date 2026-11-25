'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Box, X, Sun, Moon, Eye, Play } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ALL_BLENDER_ARCHIVES } from '@/data/portfolioData';
import { RenderItem } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { Toast } from '@/components/Toast';

export default function BlenderShowcasePage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { selectedArtwork, openArtwork, closeArtwork } = useModal();

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedAngleIndex, setSelectedAngleIndex] = useState(0);

  // Ensure page always starts at top immediately upon navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

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

  const categories = [
    { id: 'all', en: 'All Renders', id_label: 'Semua Karya' },
    { id: 'environment', en: 'Environment', id_label: 'Lingkungan' },
    { id: 'animation', en: 'Animation', id_label: 'Animasi' },
    { id: 'character', en: 'Character', id_label: 'Karakter' },
    { id: 'architecture', en: 'Architecture', id_label: 'Arsitektur' },
    { id: 'prop', en: 'Props', id_label: 'Props' },
  ];

  const filteredArchives = ALL_BLENDER_ARCHIVES.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category === activeCategory;
  });

  return (
    <>
      {/* 21st.dev Style Ambient Liquid Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[480px] rounded-full bg-gradient-to-b from-indigo-500/20 via-purple-600/15 to-transparent blur-[120px] animate-liquid-blob-1" />
        <div className="absolute top-[35%] -right-24 w-[520px] h-[520px] rounded-full bg-gradient-to-bl from-emerald-500/12 via-teal-500/10 to-transparent blur-[130px] animate-liquid-blob-2" />
        <div className="absolute top-[65%] -left-32 w-[560px] h-[560px] rounded-full bg-gradient-to-tr from-indigo-600/15 via-blue-500/10 to-transparent blur-[140px] animate-liquid-blob-3" />
        <div className="absolute inset-0 bg-tech-grid opacity-90" />
      </div>

      {/* Subpage Header Navigation */}
      <header
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
        className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-300"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg surface-elevated text-xs font-mono font-medium text-secondary hover:text-[var(--text-primary)] hover:border-token transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
          </button>

          <div className="flex items-center gap-2">
            {/* Language Switcher: Clean Segmented Control without cross-page flying glitch */}
            <div className="relative surface-elevated p-0.5 rounded-full flex items-center text-xs font-mono font-semibold border border-white/10">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === 'en'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-secondary hover:text-[var(--text-primary)]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLanguage('id')}
                className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer ${
                  language === 'id'
                    ? 'bg-indigo-600 text-white font-bold shadow-sm'
                    : 'text-secondary hover:text-[var(--text-primary)]'
                }`}
              >
                ID
              </button>
            </div>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer"
            >
              <Sun className="w-4 h-4 hidden dark:block" />
              <Moon className="w-4 h-4 block dark:hidden" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content (Direct top entrance without awkward bottom-up sliding) */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-9">
        {/* Title & Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 text-xs font-mono font-medium border border-indigo-500/20">
            <Box className="w-3.5 h-3.5" />
            <span>{language === 'id' ? 'Arsip 3D Blender Terkurasi' : 'Curated Blender 3D Archive'}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text-primary)]">
            {language === 'id' ? 'Galeri Karya 3D & Animasi' : '3D Art & Animation Showcase'}
          </h1>
          <p className="text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
            {language === 'id'
              ? 'Koleksi studi lingkungan 3D, animasi produk komersial, topologi karakter, dan aset warisan budaya yang dimodelkan serta dirender dengan Blender.'
              : 'Curated 3D environment layouts, product motion commercials, character topologies, and cultural heritage assets modeled and rendered in Blender.'}
          </p>
        </motion.div>

        {/* Category Tabs with Liquid Sliding Pill */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl liquid-glass">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                activeCategory === cat.id
                  ? 'text-white'
                  : 'text-secondary hover:text-[var(--text-primary)]'
              }`}
            >
              {activeCategory === cat.id && (
                <motion.span
                  layoutId="active-blender-cat"
                  className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                />
              )}
              <span className="relative z-10">{language === 'id' ? cat.id_label : cat.en}</span>
            </button>
          ))}
        </div>

        {/* Smooth, Fluid Category Switcher (No Layout Jitter) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
          >
            {filteredArchives.map((item) => {
              const title = language === 'id' ? item.titleId : item.titleEn;
              const categoryLabel = language === 'id' ? item.categoryLabelId : item.categoryLabelEn;

              return (
                <div
                  key={item.id}
                  onClick={() => handleOpenArtwork(item)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleOpenArtwork(item);
                    }
                  }}
                  className="liquid-glass group relative cursor-pointer rounded-2xl overflow-hidden flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-indigo-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
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
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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

                  {/* Card Info */}
                  <div className="p-5 space-y-2.5">
                    <h3 className="font-display font-bold text-lg group-hover:text-indigo-400 transition-colors">
                      {title}
                    </h3>
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-token">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="surface-elevated px-2 py-0.5 rounded text-[10px] font-mono text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Inspect Artwork Modal with Multi-Angle Gallery Switcher */}
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
                  <Box className="w-4 h-4 text-indigo-400" />
                  <span className="font-display font-bold text-lg text-[var(--text-primary)]">
                    {language === 'id' ? selectedArtwork.titleId : selectedArtwork.titleEn}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={closeArtwork}
                  aria-label="Close"
                  className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-y-auto no-scrollbar p-4 sm:p-6 space-y-4">
                {/* Active Media View */}
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
                      alt={language === 'id' ? selectedArtwork.titleId : selectedArtwork.titleEn}
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
                      {selectedArtwork.video ? 'Media / Render:' : 'Angles / Variants:'}
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

                {/* Technical Specs & Details (Render Mode, Year & Category inside GUI) */}
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="surface-elevated px-2.5 py-1 rounded-md text-xs font-mono text-indigo-400 border border-token">
                      {selectedArtwork.blenderVersion || 'Blender 5.3'} • {selectedArtwork.renderEngine || 'Cycles'}
                    </span>
                    <span className="surface-elevated px-2.5 py-1 rounded-md text-xs font-mono text-emerald-400 border border-token">
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

      <Toast />
    </>
  );
}
