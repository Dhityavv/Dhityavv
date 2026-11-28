'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Search, ArrowUpRight, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { ProjectCategory } from '@/types/portfolio';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { usePortfolioData } from '@/context/PortfolioDataContext';
import { ProjectCardVisual } from '@/components/ProjectCardVisual';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { Toast } from '@/components/Toast';

export default function ProjectsPage() {
  const router = useRouter();
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { projects } = usePortfolioData();
  const { openCaseStudy } = useModal();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Ensure page always starts at top immediately upon navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const categories = [
    { id: 'all', en: 'All Projects', id_label: 'Semua Proyek' },
    { id: 'web', en: 'Web Apps', id_label: 'Aplikasi Web' },
    { id: '3d', en: '3D & WebGL', id_label: '3D & WebGL' },
    { id: 'mod', en: 'Minecraft Mod', id_label: 'Mod Minecraft' },
  ];

  const filteredProjects = projects.filter((project) => {
    const content = language === 'id' ? project.id_lang : project.en;
    const matchesCategory =
      selectedCategory === 'all' || project.categories.includes(selectedCategory as ProjectCategory);

    const matchesSearch =
      searchQuery.trim() === '' ||
      content.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      content.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
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
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-9">
        {/* Title & Introduction */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-2.5"
        >
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 text-xs font-mono font-medium border border-indigo-500/20">
            <span>{language === 'id' ? 'Katalog Proyek Terkurasi' : 'Curated Project Catalog'}</span>
          </div>
          <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--text-primary)]">
            {language === 'id' ? 'Semua Proyek & Repositori' : 'All Projects & Repositories'}
          </h1>
          <p className="text-secondary text-sm sm:text-base max-w-2xl leading-relaxed">
            {language === 'id'
              ? 'Koleksi aplikasi web Next.js, platform audio CyTune, tool 3D WebGL Orbitry, dan mod Minecraft Fabric yang siap pakai.'
              : 'Curated Next.js web platforms, CyTune music streamer, Orbitry 3D viewer, and production-ready Fabric mods.'}
          </p>
        </motion.div>

        {/* Filter and Search Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          {/* Category Tabs with Liquid Sliding Pill */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl liquid-glass">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'text-white'
                    : 'text-secondary hover:text-[var(--text-primary)]'
                }`}
              >
                {selectedCategory === cat.id && (
                  <motion.span
                    layoutId="active-project-cat"
                    className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{language === 'id' ? cat.id_label : cat.en}</span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={language === 'id' ? 'Cari proyek atau teknologi...' : 'Search projects or tech...'}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs font-mono surface-elevated text-[var(--text-primary)] placeholder:text-muted border border-token focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Smooth, Fluid Category Switcher (No Layout Jitter) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch"
          >
            {filteredProjects.map((project) => {
              const content = language === 'id' ? project.id_lang : project.en;
              return (
                <article
                  key={project.id}
                  onClick={() => openCaseStudy(project)}
                  tabIndex={0}
                  role="button"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openCaseStudy(project);
                    }
                  }}
                  className="liquid-glass group relative cursor-pointer rounded-2xl overflow-hidden flex flex-col justify-between border border-white/12 hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  {/* Subtle top specular sheen */}
                  <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

                  {/* Distinct GUI Header */}
                  <ProjectCardVisual type={project.visualType} />

                  <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 border border-indigo-500/20">
                          {content.categoryLabel}
                        </span>
                        <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                          <span>{content.status}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-indigo-400 transition-colors" />
                        </div>
                      </div>
                      <h3 className="font-display font-bold text-xl group-hover:text-indigo-400 transition-colors tracking-tight">
                        {content.title}
                      </h3>
                      <p className="text-sm text-secondary leading-relaxed line-clamp-2">
                        {content.summary}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-token">
                      {content.tags.map((tag) => (
                        <span
                          key={tag}
                          className="surface-elevated px-2 py-0.5 rounded text-[10px] font-mono text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 space-y-2">
            <p className="text-secondary text-sm font-mono">
              {language === 'id' ? 'Tidak ada proyek yang sesuai pencarian.' : 'No projects match your search.'}
            </p>
          </div>
        )}
      </main>

      {/* Case Study Modal & Toast */}
      <CaseStudyModal />
      <Toast />
    </>
  );
}
