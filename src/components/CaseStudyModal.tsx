'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { useLanguage } from '@/context/LanguageContext';

export function CaseStudyModal() {
  const { activeCaseStudy, closeCaseStudy } = useModal();
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCaseStudy();
    };
    if (activeCaseStudy) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeCaseStudy, closeCaseStudy]);

  if (!activeCaseStudy) return null;

  const content = language === 'id' ? activeCaseStudy.id_lang : activeCaseStudy.en;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cs-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeCaseStudy}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 liquid-glass-modal w-full max-w-2xl rounded-2xl overflow-hidden flex flex-col max-h-[85vh] overscroll-contain"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-6 border-b border-token">
            <div className="space-y-1.5">
              <span className="inline-block px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 text-xs font-mono font-medium">
                {content.categoryLabel}
              </span>
              <h3 id="cs-title" className="font-display font-bold text-2xl">
                {content.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={closeCaseStudy}
              aria-label="Close Modal"
              className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Content Body */}
          <div data-lenis-prevent className="p-6 space-y-5 overflow-y-auto no-scrollbar">
            {/* Metadata Badges */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl surface-elevated text-xs font-mono">
              <div>
                <span className="text-muted block">{t.modal.roleLabel}</span>
                <span className="font-semibold mt-0.5 block text-[var(--text-primary)]">
                  {content.role}
                </span>
              </div>
              <div>
                <span className="text-muted block">{t.modal.statusLabel}</span>
                <span className="font-semibold text-emerald-400 mt-0.5 block">
                  {content.status}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                {t.modal.overview}
              </h4>
              <p className="text-sm sm:text-[15px] text-secondary leading-relaxed">
                {content.summary}
              </p>
            </div>

            {/* Key Highlights */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                {t.modal.impact}
              </h4>
              <ul className="space-y-2 text-sm text-secondary">
                {content.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="space-y-2">
              <h4 className="text-xs font-mono font-semibold uppercase tracking-wider text-muted">
                {t.modal.techStack}
              </h4>
              <div className="flex flex-wrap gap-2">
                {content.tags.map((tag) => (
                  <span
                    key={tag}
                    className="surface-elevated px-2.5 py-1 rounded-lg text-xs font-mono text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action CTAs (Using button triggers to prevent browser URL preview hover tooltips) */}
          <div className="p-5 surface-elevated border-t border-token flex flex-wrap items-center justify-end gap-2.5">
            {content.links.map((link, idx) => {
              const isExternal = link.href.startsWith('http');
              const handleNavigate = () => {
                if (isExternal) {
                  window.open(link.href, '_blank', 'noopener,noreferrer');
                } else {
                  closeCaseStudy();
                  window.location.href = link.href;
                }
              };

              if (link.primary) {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={handleNavigate}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs sm:text-sm font-medium transition-all hover:-translate-y-0.5 cursor-pointer shadow-sm"
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                );
              }
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={handleNavigate}
                  className="surface-card inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:border-indigo-500/50 transition-all hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-secondary" />
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
