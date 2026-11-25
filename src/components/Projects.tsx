'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { PROJECTS } from '@/data/portfolioData';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { ProjectCardVisual } from '@/components/ProjectCardVisual';

export function Projects() {
  const router = useRouter();
  const { language, t } = useLanguage();
  const { openCaseStudy } = useModal();

  // Strictly 4 Featured Projects on Homepage: CyTune, Grainox, Orbitry, Filra
  const featuredProjects = PROJECTS.filter((project) => project.featured);

  return (
    <section id="projects" className="scroll-mt-24 space-y-8">
      {/* Header (No Category Filter on Homepage as requested) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1.5">
          <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t.projects.eyebrow}
          </span>
          <SplitRevealTitle
            text={t.projects.title}
            className="font-display font-bold text-3xl sm:text-4xl tracking-tight text-[var(--text-primary)]"
          />
        </div>
      </div>

      {/* Case Study Grid (CyTune, Grainox, Orbitry, Filra with distinct GUI styling) */}
      <div id="projects-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {featuredProjects.map((project, idx) => {
          const content = language === 'id' ? project.id_lang : project.en;
          return (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 320, damping: 24, delay: idx * 0.06 }}
              key={project.id}
              onClick={() => openCaseStudy(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openCaseStudy(project);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${content.title}`}
              className="liquid-glass group relative cursor-pointer rounded-2xl overflow-hidden flex flex-col justify-between border border-white/12 hover:border-indigo-500/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              {/* Subtle top specular sheen */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />

              {/* Visual Prototype GUI Header */}
              <ProjectCardVisual type={project.visualType} />

              {/* Card Content & Meta */}
              <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono font-medium px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
                      {content.categoryLabel}
                    </span>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-muted">
                      <span>{content.status}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-muted group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-xl group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors tracking-tight">
                    {content.title}
                  </h3>
                  <p className="text-sm text-secondary leading-relaxed line-clamp-2">
                    {content.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-token">
                  {content.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="surface-elevated px-2 py-0.5 rounded text-[10px] font-mono text-secondary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {/* Button: View All Projects (Internal Route /projects with 0 URL preview popup) */}
      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={() => router.push('/projects')}
          className="liquid-glass group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-secondary hover:text-[var(--text-primary)] hover:border-indigo-500/50 transition-all hover:-translate-y-0.5 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span>{t.projects.viewAllBtn}</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 text-indigo-500" />
        </button>
      </div>
    </section>
  );
}
