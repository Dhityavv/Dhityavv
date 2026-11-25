'use client';

import React from 'react';

interface ProjectVisualProps {
  type: 'cytune' | 'grainox' | 'orbitry' | 'filra' | 'bookshelf';
}

export function ProjectCardVisual({ type }: ProjectVisualProps) {
  if (type === 'cytune') {
    return (
      <div className="surface-subtle p-5">
        <div className="liquid-glass rounded-xl p-3.5 space-y-2.5 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-token">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>CYTUNE_STREAM_ENGINE</span>
            </div>
            <span className="px-2 py-0.5 rounded surface-elevated text-[10px] font-mono text-blue-500 font-semibold">
              Audio Core
            </span>
          </div>

          {/* Equalizer / Audio Waveform Bars Simulation */}
          <div className="flex items-center justify-between gap-1 h-7 px-2 surface-elevated rounded-lg">
            <div className="flex items-end gap-1 h-5 flex-1">
              {[40, 75, 55, 95, 65, 80, 45, 90, 70, 85, 50, 100, 60, 40].map((h, i) => (
                <span
                  key={i}
                  style={{ height: `${h}%` }}
                  className="w-full bg-gradient-to-t from-blue-600 to-indigo-400 rounded-xs opacity-85"
                />
              ))}
            </div>
            <span className="text-[9px] font-mono font-semibold text-secondary ml-1">320kbps</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/25">
              <div className="text-[9px] text-blue-400 font-bold">STREAM</div>
              <div className="font-semibold mt-0.5">Hi-Fi Audio</div>
            </div>
            <div className="p-1.5 rounded-lg surface-elevated">
              <div className="text-[9px] text-muted font-bold">STATE</div>
              <div className="font-semibold mt-0.5">Persistent</div>
            </div>
            <div className="p-1.5 rounded-lg surface-elevated">
              <div className="text-[9px] text-muted font-bold">DATABASE</div>
              <div className="font-semibold mt-0.5">Supabase</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  if (type === 'orbitry') {
    return (
      <div className="surface-subtle p-5">
        <div className="surface-card rounded-xl p-3.5 space-y-2.5 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-token">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span className="text-[10px] font-mono font-semibold text-[var(--text-primary)]">
                ORBITRY_VIEWPORT
              </span>
            </div>
            <span className="px-2 py-0.5 rounded surface-elevated text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
              WebGL 2.0
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/25">
              <div className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">MODE</div>
              <div className="font-semibold mt-0.5">Shaded</div>
            </div>
            <div className="p-2 rounded-lg surface-elevated">
              <div className="text-[9px] text-muted font-bold">LIGHT</div>
              <div className="font-semibold mt-0.5">3-Point</div>
            </div>
            <div className="p-2 rounded-lg surface-elevated">
              <div className="text-[9px] text-muted font-bold">FORMATS</div>
              <div className="font-semibold mt-0.5">GLB / FBX</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'filra') {
    return (
      <div className="surface-subtle p-5">
        <div className="surface-card rounded-xl p-3.5 space-y-2.5 transition-transform duration-300">
          <div className="flex items-center justify-between pb-2 border-b border-token">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-semibold text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              <span>FILRA_CINEMA</span>
            </div>
            <span className="text-[10px] font-mono text-indigo-600 dark:text-indigo-400 font-semibold">
              Supabase Auth
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-[10px] font-mono">
            <div className="p-2 rounded-lg surface-elevated">
              <div className="text-[9px] text-muted">RATINGS</div>
              <div className="font-semibold text-indigo-600 dark:text-indigo-400">★ 4.9/5.0</div>
            </div>
            <div className="p-2 rounded-lg bg-indigo-500/10 border border-indigo-500/25">
              <div className="text-[9px] text-indigo-600 dark:text-indigo-400 font-bold">REVIEWS</div>
              <div className="font-semibold">Curated</div>
            </div>
            <div className="p-2 rounded-lg surface-elevated">
              <div className="text-[9px] text-muted">ROUTING</div>
              <div className="font-semibold">Proxy API</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (type === 'bookshelf') {
    return (
      <div className="surface-subtle p-5">
        <div className="surface-card rounded-xl p-3.5 flex items-center justify-between gap-4 transition-transform duration-300">
          <div className="flex-1 font-mono text-[10px] leading-relaxed space-y-1 text-secondary">
            <div className="flex items-center gap-1.5 font-semibold text-[var(--text-primary)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>BookshelfMixin.java</span>
            </div>
            <div className="pl-3 text-muted">@Inject(method = &quot;canInsert&quot;)</div>
            <div className="pl-3">
              <span className="text-indigo-600 dark:text-indigo-400">return</span> item.isAllowed();
            </div>
            <div className="pt-1 flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-semibold">
                CC0-1.0
              </span>
              <span className="surface-elevated px-1.5 py-0.5 rounded text-[9px]">Fabric API</span>
            </div>
          </div>
          <svg className="w-20 h-20 shrink-0" viewBox="0 0 84 84" fill="none">
            <rect
              x="4"
              y="4"
              width="76"
              height="76"
              rx="12"
              stroke="currentColor"
              strokeOpacity="0.2"
              strokeWidth="1.5"
            />
            <rect x="12" y="14" width="16" height="24" rx="3" fill="#6366F1" fillOpacity="0.85" />
            <rect x="34" y="14" width="16" height="24" rx="3" fill="currentColor" fillOpacity="0.16" />
            <rect x="56" y="14" width="16" height="24" rx="3" fill="#10B981" fillOpacity="0.8" />
            <rect x="12" y="46" width="16" height="24" rx="3" fill="currentColor" fillOpacity="0.16" />
            <rect x="34" y="46" width="16" height="24" rx="3" fill="#818CF8" fillOpacity="0.8" />
            <rect
              x="56"
              y="46"
              width="16"
              height="24"
              rx="3"
              stroke="currentColor"
              strokeOpacity="0.3"
              strokeDasharray="3 2"
            />
          </svg>
        </div>
      </div>
    );
  }

  // Grainox
  return (
    <div className="surface-subtle p-5">
      <div className="surface-card rounded-xl p-3.5 space-y-3 transition-transform duration-300">
        <div className="flex items-center justify-between pb-2 border-b border-token">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-zinc-500/40" />
            <span className="w-2 h-2 rounded-full bg-zinc-500/40" />
            <span className="w-2 h-2 rounded-full bg-zinc-500/40" />
          </div>
          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">200 OK</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div className="p-2.5 rounded-lg bg-indigo-500/10 border border-indigo-500/25">
            <div className="text-[9px] font-mono font-semibold text-indigo-600 dark:text-indigo-400">AI</div>
            <div className="text-[11px] font-semibold mt-0.5 truncate">Upscaler</div>
            <div className="mt-2 h-1 rounded-full bg-indigo-500/20 overflow-hidden">
              <div className="h-full w-4/5 bg-indigo-500 rounded-full" />
            </div>
          </div>
          <div className="p-2.5 rounded-lg surface-elevated">
            <div className="text-[9px] font-mono font-semibold text-muted">MEDIA</div>
            <div className="text-[11px] font-semibold mt-0.5 truncate">Downloader</div>
            <div className="mt-1.5 text-[9px] font-mono text-muted">MP4 / MP3</div>
          </div>
          <div className="p-2.5 rounded-lg surface-elevated">
            <div className="text-[9px] font-mono font-semibold text-muted">UTILS</div>
            <div className="text-[11px] font-semibold mt-0.5 truncate">Converter</div>
            <div className="mt-1.5 text-[9px] font-mono text-muted">WEBP / PDF</div>
          </div>
        </div>
      </div>
    </div>
  );
}
