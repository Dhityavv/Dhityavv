'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Box, Terminal, Sparkles } from 'lucide-react';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { useLanguage } from '@/context/LanguageContext';
import { usePortfolioData } from '@/context/PortfolioDataContext';

export function Skills() {
  const { language, t } = useLanguage();
  const { skills } = usePortfolioData();

  const getCategoryMeta = (type: 'web' | '3d' | 'sys') => {
    switch (type) {
      case '3d':
        return {
          icon: <Box className="w-4 h-4 text-indigo-400" />,
          dotColor: 'bg-indigo-400 shadow-[0_0_8px_rgba(99,102,241,0.6)]',
          badgeText: language === 'id' ? 'Pipeline 3D' : '3D Pipeline',
          cardAccent: 'hover:border-indigo-500/40',
          gradientBg: 'from-indigo-500/10 via-transparent to-transparent',
        };
      case 'web':
        return {
          icon: <Code2 className="w-4 h-4 text-cyan-400" />,
          dotColor: 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.6)]',
          badgeText: language === 'id' ? 'Web Modern' : 'Modern Web',
          cardAccent: 'hover:border-cyan-500/40',
          gradientBg: 'from-cyan-500/10 via-transparent to-transparent',
        };
      case 'sys':
        return {
          icon: <Terminal className="w-4 h-4 text-emerald-400" />,
          dotColor: 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]',
          badgeText: language === 'id' ? 'Tools & OS' : 'Tools & OS',
          cardAccent: 'hover:border-emerald-500/40',
          gradientBg: 'from-emerald-500/10 via-transparent to-transparent',
        };
    }
  };

  return (
    <section id="skills" className="scroll-mt-24 space-y-6">
      <div className="space-y-1.5">
        <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {t.skills.eyebrow}
        </span>
        <SplitRevealTitle
          text={t.skills.title}
          className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]"
        />
      </div>

      {/* Creative Compact Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 sm:gap-5 items-stretch">
        {skills.map((cat, idx) => {
          const title = language === 'id' ? cat.titleId : cat.titleEn;
          const meta = getCategoryMeta(cat.iconName);

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -5, scale: 1.015 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24, delay: idx * 0.06 }}
              className={`liquid-glass group relative p-5 sm:p-6 rounded-2xl flex flex-col justify-between hover:shadow-xl ${meta.cardAccent} overflow-hidden`}
            >
              {/* Subtle top ambient glow */}
              <div
                className={`absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${meta.gradientBg} opacity-60 pointer-events-none`}
              />

              <div className="relative space-y-4">
                {/* Header row */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg surface-elevated flex items-center justify-center border border-token">
                      {meta.icon}
                    </div>
                    <h3 className="font-display font-bold text-base text-[var(--text-primary)] tracking-tight">
                      {title}
                    </h3>
                  </div>
                  <span className="surface-elevated px-2 py-0.5 rounded text-[10px] font-mono font-medium text-secondary border border-token">
                    {meta.badgeText}
                  </span>
                </div>

                {/* Skill Chips Matrix with Status Dots */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cat.skills.map((skill) => (
                    <div
                      key={skill}
                      className="surface-elevated/90 px-2.5 py-1 rounded-md text-[11px] font-mono text-secondary hover:text-[var(--text-primary)] hover:border-token flex items-center gap-1.5 border border-white/5 transition-all duration-200"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dotColor}`} />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Subtle Micro Counter */}
              <div className="relative pt-4 mt-4 border-t border-token/60 flex items-center justify-between text-[11px] font-mono text-muted">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-secondary/60" />
                  <span>{cat.skills.length} skills</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider text-emerald-500">
                  Active
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
