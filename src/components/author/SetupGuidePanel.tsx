'use client';

import React from 'react';
import { Copy, CheckCircle2, AlertTriangle, Database, KeyRound } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

interface SetupGuidePanelProps {
  onNotify: (msg: string) => void;
}

const ENV_TEMPLATE = `NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key`;

export function SetupGuidePanel({ onNotify }: SetupGuidePanelProps) {
  const copyText = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    onNotify(`${label} disalin ke clipboard!`);
  };

  return (
    <div className="space-y-5">
      <div className="liquid-glass p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center gap-3">
          {isSupabaseConfigured ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-amber-400 shrink-0" />
          )}
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
              Status Koneksi Supabase
            </h2>
            <p className="text-xs text-secondary">
              {isSupabaseConfigured
                ? 'Environment variable Supabase terdeteksi. Pastikan SQL Schema sudah dijalankan dan akun Author sudah dibuat.'
                : 'Belum terhubung ke Supabase. Ikuti 3 langkah cepat di bawah ini agar perubahan dari /author-studio tersimpan permanen secara live.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="surface-elevated p-4 rounded-xl border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-indigo-400 font-semibold">LANGKAH 1</span>
            <h3 className="font-display font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
              <Database className="w-4 h-4 text-indigo-400" />
              <span>Jalankan SQL Schema</span>
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              Buat project gratis di Supabase, buka <strong>SQL Editor</strong>, lalu jalankan isi
              file <code className="text-indigo-300">supabase/schema.sql</code> yang sudah tersedia
              di repo ini.
            </p>
          </div>

          <div className="surface-elevated p-4 rounded-xl border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-emerald-400 font-semibold">LANGKAH 2</span>
            <h3 className="font-display font-bold text-sm text-[var(--text-primary)] flex items-center gap-1.5">
              <KeyRound className="w-4 h-4 text-emerald-400" />
              <span>Buat Akun Author</span>
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              Di Supabase Dashboard → <strong>Authentication → Users</strong>, klik{' '}
              <strong>Add User</strong> menggunakan email & password kamu untuk login ke{' '}
              <code>/author-studio</code>.
            </p>
          </div>

          <div className="surface-elevated p-4 rounded-xl border border-white/10 space-y-2">
            <span className="text-[11px] font-mono text-cyan-400 font-semibold">LANGKAH 3</span>
            <h3 className="font-display font-bold text-sm text-[var(--text-primary)]">
              Pasang Env di Vercel & .env.local
            </h3>
            <p className="text-xs text-secondary leading-relaxed">
              Tambahkan <code>NEXT_PUBLIC_SUPABASE_URL</code> dan{' '}
              <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> di Vercel Project Settings → Environment
              Variables, lalu redeploy.
            </p>
          </div>
        </div>

        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono text-muted">Template .env.local / Vercel Env</span>
            <button
              type="button"
              onClick={() => copyText(ENV_TEMPLATE, 'Template .env')}
              className="surface-elevated inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono text-secondary hover:text-indigo-400 border border-white/10 cursor-pointer"
            >
              <Copy className="w-3 h-3" />
              <span>Salin Env</span>
            </button>
          </div>
          <pre className="p-4 rounded-xl bg-black/70 border border-white/10 text-xs font-mono text-emerald-300 overflow-x-auto">
            {ENV_TEMPLATE}
          </pre>
        </div>
      </div>
    </div>
  );
}
