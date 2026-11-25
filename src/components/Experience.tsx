'use client';

import React from 'react';
import { EXPERIENCES } from '@/data/portfolioData';
import { useLanguage } from '@/context/LanguageContext';

export function Experience() {
  const { language, t } = useLanguage();

  return (
    <section id="experience" className="scroll-mt-24 space-y-8">
      <div className="space-y-1.5">
        <span className="inline-block text-xs font-mono font-semibold uppercase tracking-widest text-indigo-400">
          {t.experience.eyebrow}
        </span>
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight">
          {t.experience.title}
        </h2>
      </div>

      <div className="relative pl-6 sm:pl-8 border-l border-token space-y-6">
        {EXPERIENCES.map((item) => {
          const role = language === 'id' ? item.roleId : item.roleEn;
          const org = language === 'id' ? item.orgId : item.orgEn;
          const bullets = language === 'id' ? item.bulletsId : item.bulletsEn;

          return (
            <div key={item.id} className="relative">
              {/* Timeline Marker Dot */}
              <span
                style={{ backgroundColor: 'var(--bg-primary)' }}
                className={`absolute -left-[29px] sm:-left-[37px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 ${
                  item.isCurrent ? 'border-indigo-500' : 'border-zinc-500'
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    item.isCurrent ? 'bg-indigo-500' : 'bg-zinc-500'
                  }`}
                />
              </span>

              {/* Timeline Card */}
              <div className="liquid-glass p-6 rounded-2xl space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                      {role}
                    </h3>
                    <p
                      className={`text-sm font-medium ${
                        item.isCurrent ? 'text-indigo-400' : 'text-muted'
                      }`}
                    >
                      {org}
                    </p>
                  </div>
                  <span className="surface-elevated px-3 py-1 rounded-full text-xs font-mono text-secondary self-start sm:self-auto">
                    {language === 'id' ? (item.dateId || item.date) : (item.dateEn || item.date)}
                  </span>
                </div>

                <ul className="space-y-1.5 text-sm text-secondary">
                  {bullets.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span
                        className={`mt-2 w-1.5 h-1.5 rounded-full shrink-0 ${
                          item.isCurrent ? 'bg-indigo-400' : 'bg-zinc-500'
                        }`}
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
