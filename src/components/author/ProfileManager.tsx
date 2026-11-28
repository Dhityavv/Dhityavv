'use client';

import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { getSupabaseClient } from '@/lib/supabase';
import { QuickProfileData, usePortfolioData } from '@/context/PortfolioDataContext';

interface ProfileManagerProps {
  onNotify: (msg: string) => void;
}

export function ProfileManager({ onNotify }: ProfileManagerProps) {
  const { quickProfile, experiences, skills, refreshData } = usePortfolioData();
  const [form, setForm] = useState<QuickProfileData>(quickProfile);
  const [saving, setSaving] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Supabase belum terhubung.');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.from('portfolio_profile').upsert(
        {
          id: 'main',
          quick_profile: form,
          experiences,
          skill_categories: skills,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
      if (error) throw error;
      await refreshData();
      onNotify('Profil Quick Profile berhasil diperbarui secara live!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan profil';
      onNotify(`Error: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-5">
      <div className="liquid-glass p-6 rounded-2xl border border-white/10 space-y-5 text-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-token">
          <div>
            <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
              Quick Profile Editor
            </h2>
            <p className="text-xs text-secondary mt-0.5">
              Ubah informasi kartu Quick Profile di bagian About Me secara langsung (bilingual EN &
              ID).
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer disabled:opacity-60 self-start sm:self-auto"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{saving ? 'Menyimpan...' : 'Simpan Profil'}</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-mono text-muted mb-1">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Availability Badge</label>
            <input
              type="text"
              value={form.availability || ''}
              onChange={(e) => setForm({ ...form, availability: e.target.value })}
              placeholder="Active Student"
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Role (English)</label>
            <input
              type="text"
              value={form.roleEn}
              onChange={(e) => setForm({ ...form, roleEn: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Role (Indonesia)</label>
            <input
              type="text"
              value={form.roleId}
              onChange={(e) => setForm({ ...form, roleId: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Core Focus (English)</label>
            <input
              type="text"
              value={form.focusEn}
              onChange={(e) => setForm({ ...form, focusEn: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Fokus Utama (Indonesia)</label>
            <input
              type="text"
              value={form.focusId}
              onChange={(e) => setForm({ ...form, focusId: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Interests (English)</label>
            <input
              type="text"
              value={form.interestsEn}
              onChange={(e) => setForm({ ...form, interestsEn: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Minat & Hobi (Indonesia)</label>
            <input
              type="text"
              value={form.interestsId}
              onChange={(e) => setForm({ ...form, interestsId: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Location (English)</label>
            <input
              type="text"
              value={form.locationEn}
              onChange={(e) => setForm({ ...form, locationEn: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
          <div>
            <label className="block font-mono text-muted mb-1">Lokasi (Indonesia)</label>
            <input
              type="text"
              value={form.locationId}
              onChange={(e) => setForm({ ...form, locationId: e.target.value })}
              className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
            />
          </div>
        </div>
      </div>
    </form>
  );
}
