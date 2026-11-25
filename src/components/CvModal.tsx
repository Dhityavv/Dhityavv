'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Printer, Download } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { EXPERIENCES, PROJECTS, SOCIAL_LINKS } from '@/data/portfolioData';

export function CvModal() {
  const { isCvOpen, closeCv } = useModal();
  const { language, t } = useLanguage();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCv();
    };
    if (isCvOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCvOpen, closeCv]);

  if (!isCvOpen) return null;

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Resume Preview"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeCv}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 liquid-glass-modal w-full max-w-3xl rounded-2xl overflow-hidden flex flex-col max-h-[90vh] overscroll-contain"
        >
          {/* Top Control Toolbar (Hidden during print) */}
          <div className="no-print flex items-center justify-between gap-4 px-6 py-3.5 border-b border-token surface-elevated">
            <div className="flex items-center gap-2 text-xs font-mono text-secondary">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>{t.cv.filename}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white text-xs font-medium transition-colors cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>{t.cv.printBtn}</span>
              </button>
              <button
                type="button"
                onClick={() => window.print()}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg surface-card text-secondary hover:text-[var(--text-primary)] text-xs font-medium transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{t.cv.downloadBtn}</span>
              </button>
              <button
                type="button"
                onClick={closeCv}
                aria-label="Close Resume"
                className="surface-card p-1.5 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* ATS-Friendly Black-on-White Sheet */}
          <div
            id="cv-printable"
            className="p-6 sm:p-8 overflow-y-auto no-scrollbar bg-white text-[#09090b] space-y-5 text-sm"
          >
            {/* Header */}
            <div className="border-b-2 border-[#09090b] pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
              <div>
                <h2 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-[#09090b]">
                  Dhitya Nurhadi
                </h2>
                <p className="text-sm font-medium text-indigo-600 mt-0.5">
                  {t.cv.role}
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-600 sm:text-right space-y-0.5">
                <p>{SOCIAL_LINKS.email}</p>
                <p>github.com/Dhityavv • orbitry-models.vercel.app</p>
                <p>{t.cv.location}</p>
              </div>
            </div>

            {/* Profile Summary */}
            <div className="space-y-1">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500">
                {t.cv.summaryTitle}
              </h3>
              <p className="text-zinc-700 leading-relaxed text-[13px]">
                {t.cv.summaryText}
              </p>
            </div>

            {/* Experience & Education Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 pb-1">
                  {t.cv.expTitle}
                </h3>
                {EXPERIENCES.slice(0, 3).map((exp) => (
                  <div key={exp.id} className="space-y-0.5">
                    <div className="flex justify-between font-semibold text-[13px] text-zinc-900">
                      <span>{language === 'id' ? exp.roleId : exp.roleEn}</span>
                      <span className="font-mono text-[11px] text-zinc-500">{exp.date}</span>
                    </div>
                    <p className="text-[11px] font-mono text-zinc-500">
                      {language === 'id' ? exp.orgId : exp.orgEn}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 pb-1">
                  {t.cv.eduTitle}
                </h3>
                <div className="space-y-0.5">
                  <div className="flex justify-between font-semibold text-[13px] text-zinc-900">
                    <span>
                      {language === 'id' ? EXPERIENCES[3].roleId : EXPERIENCES[3].roleEn}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">
                      {EXPERIENCES[3].date}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-zinc-500">
                    {language === 'id' ? EXPERIENCES[3].orgId : EXPERIENCES[3].orgEn}
                  </p>
                  <p className="text-xs text-zinc-600 leading-relaxed pt-1">
                    {t.cv.eduDesc}
                  </p>
                </div>
              </div>
            </div>

            {/* Selected Projects */}
            <div className="space-y-2">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 pb-1">
                {t.cv.projTitle}
              </h3>
              <div className="space-y-1.5 text-[13px] text-zinc-700">
                {PROJECTS.map((proj) => {
                  const data = language === 'id' ? proj.id_lang : proj.en;
                  return (
                    <p key={proj.id}>
                      <strong className="text-[#09090b]">{data.title}:</strong>{' '}
                      <span>{data.summary}</span>
                    </p>
                  );
                })}
              </div>
            </div>

            {/* Technical Stack */}
            <div className="space-y-1.5">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-500 border-b border-zinc-200 pb-1">
                {t.cv.skillsTitle}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-zinc-700">
                <div>
                  <strong className="block text-[#09090b]">3D &amp; Animation</strong>
                  Blender (5.3 Personal / 4.5 PKL / 3.6 Tutor Sebaya), Cycles &amp; Eevee, Geometry Nodes, Quad Topology, PBR Texturing
                </div>
                <div>
                  <strong className="block text-[#09090b]">Web Development</strong>
                  Next.js App Router, React, TypeScript, Three.js/WebGL, Tailwind CSS, Supabase
                </div>
                <div>
                  <strong className="block text-[#09090b]">Systems &amp; Tools</strong>
                  Git/GitHub, Java/Fabric API, Linux/WSL, Roblox Luau, Obsidian
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
