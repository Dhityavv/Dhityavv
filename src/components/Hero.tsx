'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Code2, Box } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Hero() {
  const { language, t } = useLanguage();
  const [roleIndex, setRoleIndex] = useState(0);

  const scrollToSection = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % t.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [t.roles.length]);

  return (
    <section id="hero" className="scroll-mt-24 space-y-10 pt-4 sm:pt-6">
      {/* Centered Hero Copy & CTAs */}
      <div className="flex flex-col items-center text-center space-y-5 max-w-3xl mx-auto">
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08] tracking-[-0.03em] text-[var(--text-primary)]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="block"
            >
              {t.hero.line1}
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.16 }}
              className="block"
            >
              <span>{t.hero.line2a} </span>
              <span className="text-gradient-shimmer">{t.hero.line2b}</span>
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: '110%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.24 }}
              className="block"
            >
              {t.hero.line3}
            </motion.span>
          </span>
        </h1>

        {/* Centered Rotating Creative Role Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 text-base sm:text-lg font-display font-semibold"
        >
          <span className="inline-block w-2 h-2 rounded-full bg-indigo-500 animate-pulse shrink-0" />
          <span className="text-secondary font-medium">
            {language === 'id' ? 'Berkarya sebagai' : 'Specializing as a'}
          </span>
          <span
            aria-live="polite"
            className="relative inline-flex h-7 overflow-hidden align-bottom text-indigo-600 dark:text-indigo-400 min-w-[230px] sm:min-w-[250px] justify-center sm:justify-start"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                initial={{ y: '100%', opacity: 0, filter: 'blur(4px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: '-100%', opacity: 0, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 flex items-center justify-center sm:justify-start whitespace-nowrap"
              >
                {t.roles[roleIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.div>

        {/* Centered 2-Sentence Concise Bio */}
        <motion.p
          initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="text-sm sm:text-base leading-relaxed text-secondary max-w-2xl"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* Centered Primary & Secondary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.44, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 pt-2"
        >
          <button
            type="button"
            onClick={() => scrollToSection('#projects')}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_24px_rgba(99,102,241,0.3)] hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <span>{t.hero.ctaProjects}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => scrollToSection('#showcase')}
            className="liquid-glass inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium text-sm hover:border-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            <Box className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            <span>{t.hero.ctaShowcase}</span>
          </button>
        </motion.div>
      </div>

      {/* Highlight Metrics Strip */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-token"
      >
        <div className="liquid-glass p-4 rounded-xl flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-mono font-bold text-sm shrink-0">
            03
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-[var(--text-primary)]">{t.metrics.m1Title}</p>
            <p className="text-xs text-muted">{t.metrics.m1Sub}</p>
          </div>
        </div>

        <div className="liquid-glass p-4 rounded-xl flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-[var(--text-primary)]">{t.metrics.m2Title}</p>
            <p className="text-xs text-muted">{t.metrics.m2Sub}</p>
          </div>
        </div>

        <div className="liquid-glass p-4 rounded-xl flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <p className="font-display font-semibold text-sm text-[var(--text-primary)]">{t.metrics.m3Title}</p>
            <p className="text-xs text-muted">{t.metrics.m3Sub}</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
