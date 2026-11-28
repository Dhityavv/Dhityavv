'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  Eye,
  Users,
  Monitor,
  Smartphone,
  Box,
  FolderGit2,
  Database,
  Sparkles,
  RefreshCw,
} from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { usePortfolioData } from '@/context/PortfolioDataContext';
import {
  ALL_BLENDER_ARCHIVES,
  EXPERIENCES,
  PROJECTS,
  QUICK_PROFILE,
  RENDERS_SHOWCASE,
  SKILL_CATEGORIES,
} from '@/data/portfolioData';

interface PageViewRow {
  path: string;
  session_id: string;
  device_type: string;
  created_at: string;
}

interface AuthorOverviewProps {
  onNotify: (msg: string) => void;
  onNavigateTab: (tab: 'blender' | 'projects' | 'media' | 'profile' | 'setup') => void;
}

export function AuthorOverview({ onNotify, onNavigateTab }: AuthorOverviewProps) {
  const { allRenders, rendersShowcase, projects, dataSource, refreshData } = usePortfolioData();
  const [views, setViews] = useState<PageViewRow[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [seeding, setSeeding] = useState(false);
  const [referenceNowMs] = useState(() => Date.now());

  const loadAnalytics = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    setLoadingAnalytics(true);
    try {
      const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
      const { data, error } = await supabase
        .from('page_views')
        .select('path, session_id, device_type, created_at')
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(2000);
      if (!error && data) {
        setViews(data);
      }
    } finally {
      setLoadingAnalytics(false);
    }
  };

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    let cancelled = false;
    const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
    supabase
      .from('page_views')
      .select('path, session_id, device_type, created_at')
      .gte('created_at', since)
      .order('created_at', { ascending: false })
      .limit(2000)
      .then(({ data, error }) => {
        if (!cancelled && !error && data) {
          setViews(data);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSeedInitialData = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Supabase belum dikonfigurasi. Buka tab Setup & SQL.');
      return;
    }
    setSeeding(true);
    try {
      const featuredSet = new Set(RENDERS_SHOWCASE.map((r) => r.id));
      const renderRows = ALL_BLENDER_ARCHIVES.map((r, idx) => ({
        id: r.id,
        category: r.category,
        category_label_en: r.categoryLabelEn,
        category_label_id: r.categoryLabelId,
        title_en: r.titleEn,
        title_id: r.titleId,
        desc_en: r.descEn,
        desc_id: r.descId,
        image: r.image,
        images: r.images,
        video: r.video || null,
        render_engine: r.renderEngine,
        blender_version: r.blenderVersion || 'Blender 5.3',
        year: r.year,
        tags: r.tags,
        is_featured: featuredSet.has(r.id),
        sort_order: idx,
      }));

      const projectRows = PROJECTS.map((p, idx) => ({
        id: p.id,
        categories: p.categories,
        featured: p.featured,
        visual_type: p.visualType,
        en: p.en,
        id_lang: p.id_lang,
        sort_order: idx,
      }));

      const { error: rErr } = await supabase
        .from('portfolio_renders')
        .upsert(renderRows, { onConflict: 'id' });
      if (rErr) throw rErr;

      const { error: pErr } = await supabase
        .from('portfolio_projects')
        .upsert(projectRows, { onConflict: 'id' });
      if (pErr) throw pErr;

      const { error: profErr } = await supabase.from('portfolio_profile').upsert(
        {
          id: 'main',
          quick_profile: QUICK_PROFILE,
          experiences: EXPERIENCES,
          skill_categories: SKILL_CATEGORIES,
        },
        { onConflict: 'id' }
      );
      if (profErr) throw profErr;

      await refreshData();
      onNotify('Berhasil sinkronisasi semua data awal ke Supabase!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal seed data ke Supabase';
      onNotify(`Error: ${msg}`);
    } finally {
      setSeeding(false);
    }
  };

  // Compute analytics metrics
  const totalViews = views.length;
  const uniqueSessions = new Set(views.map((v) => v.session_id)).size;
  const todayStr = new Date(referenceNowMs).toISOString().slice(0, 10);
  const todayViews = views.filter((v) => v.created_at.slice(0, 10) === todayStr).length;
  const mobileViews = views.filter((v) => v.device_type === 'mobile').length;
  const mobilePct = totalViews > 0 ? Math.round((mobileViews / totalViews) * 100) : 0;

  // Last 7 days bar chart data
  const days: { label: string; dateStr: string; count: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(referenceNowMs - i * 24 * 60 * 60 * 1000);
    const dateStr = d.toISOString().slice(0, 10);
    const label = d.toLocaleDateString('id-ID', { weekday: 'short' });
    days.push({
      label,
      dateStr,
      count: views.filter((v) => v.created_at.slice(0, 10) === dateStr).length,
    });
  }
  const maxDayCount = Math.max(1, ...days.map((d) => d.count));

  // Top paths
  const pathCounts = new Map<string, number>();
  views.forEach((v) => {
    pathCounts.set(v.path, (pathCounts.get(v.path) || 0) + 1);
  });
  const topPaths = Array.from(pathCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Top Status Banner */}
      <div className="liquid-glass rounded-2xl p-5 sm:p-6 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span
              className={`w-2 h-2 rounded-full ${
                dataSource === 'supabase' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
              }`}
            />
            <span className="text-xs font-mono uppercase tracking-wider text-secondary">
              {dataSource === 'supabase'
                ? 'Live Mode — Terhubung ke Supabase'
                : 'Fallback Mode — Menggunakan Data Lokal (portfolioData.ts)'}
            </span>
          </div>
          <h2 className="font-display font-bold text-xl sm:text-2xl text-[var(--text-primary)]">
            Ringkasan Studio & Insight Pengunjung
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={loadAnalytics}
            disabled={loadingAnalytics}
            className="surface-elevated inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-mono text-secondary hover:text-[var(--text-primary)] border border-white/10 cursor-pointer transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loadingAnalytics ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            type="button"
            onClick={handleSeedInitialData}
            disabled={seeding}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer transition-colors shadow-lg shadow-indigo-500/20 disabled:opacity-60"
          >
            <Database className="w-3.5 h-3.5" />
            <span>{seeding ? 'Menyinkronkan...' : 'Seed Data Awal ke Supabase'}</span>
          </button>
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ y: -3 }}
          className="liquid-glass p-5 rounded-2xl border border-white/10 space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>TOTAL VIEWS (30D)</span>
            <Eye className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="font-display font-bold text-3xl text-[var(--text-primary)]">{totalViews}</p>
          <p className="text-xs text-emerald-400 font-mono">+{todayViews} hari ini</p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          className="liquid-glass p-5 rounded-2xl border border-white/10 space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>PENGUNJUNG UNIK</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-display font-bold text-3xl text-[var(--text-primary)]">
            {uniqueSessions}
          </p>
          <p className="text-xs text-secondary font-mono flex items-center gap-2">
            <span className="inline-flex items-center gap-1">
              <Monitor className="w-3 h-3" /> {100 - mobilePct}%
            </span>
            <span className="inline-flex items-center gap-1">
              <Smartphone className="w-3 h-3" /> {mobilePct}%
            </span>
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateTab('blender')}
          className="liquid-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/40 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>BLENDER RENDERS</span>
            <Box className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-display font-bold text-3xl text-[var(--text-primary)]">
            {allRenders.length}
          </p>
          <p className="text-xs text-indigo-400 font-mono">
            {rendersShowcase.length} featured di beranda →
          </p>
        </motion.div>

        <motion.div
          whileHover={{ y: -3 }}
          onClick={() => onNavigateTab('projects')}
          className="liquid-glass p-5 rounded-2xl border border-white/10 hover:border-indigo-500/40 cursor-pointer space-y-2"
        >
          <div className="flex items-center justify-between text-xs font-mono text-muted">
            <span>WEB & 3D PROJECTS</span>
            <FolderGit2 className="w-4 h-4 text-purple-400" />
          </div>
          <p className="font-display font-bold text-3xl text-[var(--text-primary)]">
            {projects.length}
          </p>
          <p className="text-xs text-indigo-400 font-mono">
            {projects.filter((p) => p.featured).length} featured di beranda →
          </p>
        </motion.div>
      </div>

      {/* 7-Day Visitor Trend & Top Pages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-7 liquid-glass p-6 rounded-2xl border border-white/10 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display font-bold text-base text-[var(--text-primary)] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span>Tren Kunjungan 7 Hari Terakhir</span>
            </h3>
            <span className="text-xs font-mono text-muted">Page Views</span>
          </div>

          <div className="h-44 flex items-end justify-between gap-2 pt-4">
            {days.map((d) => {
              const heightPct = Math.max(8, Math.round((d.count / maxDayCount) * 100));
              return (
                <div key={d.dateStr} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="text-[11px] font-mono text-secondary">{d.count}</span>
                  <div className="w-full max-w-[38px] bg-white/5 rounded-t-lg h-full flex items-end overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-md"
                    />
                  </div>
                  <span className="text-[11px] font-mono text-muted">{d.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-5 liquid-glass p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="font-display font-bold text-base text-[var(--text-primary)]">
            Halaman Paling Sering Dikunjungi
          </h3>
          {topPaths.length === 0 ? (
            <div className="py-10 text-center text-xs font-mono text-muted">
              Belum ada data kunjungan tercatat. Setelah Supabase terhubung, setiap kunjungan ke
              website akan otomatis tercatat di sini.
            </div>
          ) : (
            <div className="space-y-2.5">
              {topPaths.map(([path, count]) => (
                <div
                  key={path}
                  className="surface-elevated p-3 rounded-xl border border-white/10 flex items-center justify-between text-xs font-mono"
                >
                  <span className="text-[var(--text-primary)] truncate">{path}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/15 text-indigo-400 font-semibold">
                    {count} views
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
