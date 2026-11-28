'use client';

import React from 'react';
import { Move3d } from 'lucide-react';
import { InteractiveRobot3D } from '@/components/ui/interactive-robot-3d';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { useLanguage } from '@/context/LanguageContext';

export function Interactive3D() {
  const { t } = useLanguage();

  return (
    <section aria-label={t.interactive3d.title} className="relative">
      {/* Seamless, borderless stage floating directly over background (zero boxy GUI frame) */}
      <div className="relative w-full grid grid-cols-1 md:grid-cols-12 items-center gap-6 md:gap-4">
        {/* Subtle studio radial aura behind the 3D character */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute top-4 right-4 sm:right-12 w-[340px] h-[340px] rounded-full bg-gradient-to-b from-indigo-500/12 via-white/8 to-transparent blur-[85px]"
        />

        {/* Left Content */}
        <div className="md:col-span-5 space-y-5 relative z-10 text-center md:text-left flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full surface-elevated/80 border border-white/10 text-[11px] font-mono font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            <Move3d className="w-3.5 h-3.5" />
            <span>{t.interactive3d.badge}</span>
          </div>

          <div className="space-y-3">
            <SplitRevealTitle
              text={t.interactive3d.title}
              className="font-display font-bold text-3xl sm:text-4xl lg:text-[2.65rem] tracking-tight"
              wordClassName="bg-clip-text text-transparent bg-gradient-to-b from-[var(--text-primary)] via-[var(--text-primary)] to-zinc-500"
            />
            <p className="text-sm sm:text-base text-secondary leading-relaxed max-w-md">
              {t.interactive3d.desc}
            </p>
          </div>
        </div>

        {/* Right 3D Interactive Humanoid Robot Viewport (Larger, commanding stage) */}
        <div className="md:col-span-7 relative h-[420px] sm:h-[490px] lg:h-[540px] w-full">
          <InteractiveRobot3D />
        </div>
      </div>
    </section>
  );
}
