'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Box, Globe, Sparkles, MapPin } from 'lucide-react';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { useLanguage } from '@/context/LanguageContext';
import { QUICK_PROFILE } from '@/data/portfolioData';

export function About() {
  const { language, t } = useLanguage();

  const role = language === 'id' ? QUICK_PROFILE.roleId : QUICK_PROFILE.roleEn;
  const focus = language === 'id' ? QUICK_PROFILE.focusId : QUICK_PROFILE.focusEn;
  const interests = language === 'id' ? QUICK_PROFILE.interestsId : QUICK_PROFILE.interestsEn;
  const loc = language === 'id' ? QUICK_PROFILE.locationId : QUICK_PROFILE.locationEn;

  return (
    <section id="about" className="scroll-mt-24 space-y-8">
      <div className="space-y-1.5">
        <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {t.about.eyebrow}
        </span>
        <SplitRevealTitle
          text={t.about.title}
          className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Column: The Creative Journey Story (Condensed to 2 Crisp Paragraphs) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24 }}
          className="lg:col-span-7 liquid-glass p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-6 border border-white/10 hover:border-indigo-500/35"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <h3 className="font-display font-bold text-xl text-[var(--text-primary)]">
                {t.about.journeyTitle}
              </h3>
            </div>
            <p className="text-secondary leading-relaxed text-sm sm:text-base">
              {t.about.journeyP1}
            </p>
            <p className="text-secondary leading-relaxed text-sm sm:text-base">
              {t.about.journeyP2}
            </p>
          </div>

          {/* Core Pillars Strip: Interactive pop-up badges without text truncation */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-token text-xs font-mono">
            <div className="surface-elevated group p-2.5 rounded-xl flex items-center gap-2 border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.08] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
              <GraduationCap className="w-4 h-4 text-indigo-400 shrink-0 group-hover:scale-125 transition-transform duration-200" />
              <span className="font-medium text-zinc-200 whitespace-nowrap">{t.about.tagSchool}</span>
            </div>
            <div className="surface-elevated group p-2.5 rounded-xl flex items-center gap-2 border border-white/10 hover:border-emerald-500/50 hover:bg-white/[0.08] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
              <Box className="w-4 h-4 text-emerald-400 shrink-0 group-hover:scale-125 transition-transform duration-200" />
              <span className="font-medium text-zinc-200 whitespace-nowrap">{t.about.tag3d}</span>
            </div>
            <div className="surface-elevated group p-2.5 rounded-xl flex items-center gap-2 border border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.08] hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-default">
              <Globe className="w-4 h-4 text-cyan-400 shrink-0 group-hover:scale-125 transition-transform duration-200" />
              <span className="font-medium text-zinc-200 whitespace-nowrap">{t.about.tagWeb}</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Quick Profile Card (Redesigned Balanced Bento GUI) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          whileHover={{ y: -4 }}
          transition={{ type: 'spring', stiffness: 280, damping: 24, delay: 0.08 }}
          className="lg:col-span-5 liquid-glass p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-4 border border-white/10 hover:border-indigo-500/35"
        >
          {/* Header row */}
          <div className="flex items-center justify-between pb-3.5 border-b border-token">
            <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
              {t.about.quickProfileTitle}
            </h3>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono font-medium border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Active Student
            </span>
          </div>

          {/* Balanced Structured Tiles */}
          <div className="space-y-2.5 text-xs font-mono">
            {/* Identity Tile */}
            <div className="surface-elevated p-3 rounded-xl border border-white/10 space-y-1 transition-all hover:border-white/20">
              <span className="text-[10px] uppercase tracking-wider text-muted font-semibold block">
                {t.about.fieldFullName}
              </span>
              <p className="font-display font-bold text-sm text-[var(--text-primary)]">
                {QUICK_PROFILE.name}
              </p>
              <p className="text-xs text-indigo-400 font-medium pt-0.5">
                {role}
              </p>
            </div>

            {/* Core Focus Tile */}
            <div className="surface-elevated p-3 rounded-xl border border-white/10 space-y-1 transition-all hover:border-white/20">
              <span className="text-[10px] uppercase tracking-wider text-muted font-semibold block">
                {t.about.fieldFocus}
              </span>
              <p className="text-xs text-secondary leading-relaxed">
                {focus}
              </p>
            </div>

            {/* Interests Tile */}
            <div className="surface-elevated p-3 rounded-xl border border-white/10 space-y-1 transition-all hover:border-white/20">
              <span className="text-[10px] uppercase tracking-wider text-muted font-semibold block">
                {t.about.fieldInterests}
              </span>
              <p className="text-xs text-secondary leading-relaxed">
                {interests}
              </p>
            </div>
          </div>

          {/* Status & Location Footer Strip */}
          <div className="pt-3 border-t border-token flex items-center justify-between text-xs font-mono text-secondary">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{loc}</span>
            </div>
            <span className="text-[10px] uppercase tracking-wider text-indigo-400 font-semibold">
              SMK Animasi
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
