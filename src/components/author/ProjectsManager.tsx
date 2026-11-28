'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Star, X, Save, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabaseClient } from '@/lib/supabase';
import { ProjectWithOrder, usePortfolioData } from '@/context/PortfolioDataContext';
import { ProjectCategory } from '@/types/portfolio';

interface ProjectsManagerProps {
  onNotify: (msg: string) => void;
}

const EMPTY_PROJECT: ProjectWithOrder = {
  id: '',
  categories: ['web'],
  featured: true,
  visualType: 'orbitry',
  sortOrder: 0,
  en: {
    categoryLabel: 'Web App',
    title: '',
    role: 'Front-End Developer',
    status: 'Live Production',
    summary: '',
    highlights: [''],
    tags: [],
    links: [{ label: 'Launch Application', href: '', primary: true }],
  },
  id_lang: {
    categoryLabel: 'Aplikasi Web',
    title: '',
    role: 'Front-End Developer',
    status: 'Produksi Aktif',
    summary: '',
    highlights: [''],
    tags: [],
    links: [{ label: 'Buka Aplikasi', href: '', primary: true }],
  },
};

export function ProjectsManager({ onNotify }: ProjectsManagerProps) {
  const { projects, refreshData } = usePortfolioData();
  const [editing, setEditing] = useState<ProjectWithOrder | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [langTab, setLangTab] = useState<'en' | 'id'>('en');
  const [saving, setSaving] = useState(false);

  // Form helpers for multi-line arrays
  const [enHighlights, setEnHighlights] = useState('');
  const [idHighlights, setIdHighlights] = useState('');
  const [enTags, setEnTags] = useState('');
  const [idTags, setIdTags] = useState('');
  const [primaryUrl, setPrimaryUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');

  const openEditor = (project?: ProjectWithOrder) => {
    if (project) {
      setIsNew(false);
      setEditing(JSON.parse(JSON.stringify(project)));
      setEnHighlights(project.en.highlights.join('\n'));
      setIdHighlights(project.id_lang.highlights.join('\n'));
      setEnTags(project.en.tags.join(', '));
      setIdTags(project.id_lang.tags.join(', '));
      setPrimaryUrl(project.en.links[0]?.href || '');
      setRepoUrl(project.en.links[1]?.href || '');
    } else {
      setIsNew(true);
      setEditing({
        ...JSON.parse(JSON.stringify(EMPTY_PROJECT)),
        id: `project-${Date.now().toString(36)}`,
        sortOrder: projects.length,
      });
      setEnHighlights('');
      setIdHighlights('');
      setEnTags('Next.js, TypeScript, Tailwind CSS');
      setIdTags('Next.js, TypeScript, Tailwind CSS');
      setPrimaryUrl('');
      setRepoUrl('');
    }
    setLangTab('en');
  };

  const toggleCategory = (cat: ProjectCategory) => {
    if (!editing) return;
    const exists = editing.categories.includes(cat);
    const next = exists
      ? editing.categories.filter((c) => c !== cat)
      : [...editing.categories, cat];
    setEditing({ ...editing, categories: next.length > 0 ? next : ['web'] });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Supabase belum terhubung. Tambahkan env var terlebih dahulu.');
      return;
    }

    setSaving(true);
    try {
      const enLinks = [];
      const idLinks = [];
      if (primaryUrl.trim()) {
        enLinks.push({ label: 'Launch Application', href: primaryUrl.trim(), primary: true });
        idLinks.push({ label: 'Buka Aplikasi', href: primaryUrl.trim(), primary: true });
      }
      if (repoUrl.trim()) {
        enLinks.push({ label: 'GitHub Repository', href: repoUrl.trim(), primary: false });
        idLinks.push({ label: 'Repositori GitHub', href: repoUrl.trim(), primary: false });
      }

      const cleanEn = {
        ...editing.en,
        highlights: enHighlights
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        tags: enTags
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        links: enLinks,
      };

      const cleanId = {
        ...editing.id_lang,
        title: editing.id_lang.title.trim() || editing.en.title.trim(),
        highlights: idHighlights
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),
        tags: idTags
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        links: idLinks,
      };

      const { error } = await supabase.from('portfolio_projects').upsert(
        {
          id: editing.id.trim(),
          categories: editing.categories,
          featured: Boolean(editing.featured),
          visual_type: editing.visualType,
          en: cleanEn,
          id_lang: cleanId,
          sort_order: Number(editing.sortOrder ?? 0),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      );
      if (error) throw error;

      await refreshData();
      onNotify(isNew ? 'Proyek baru berhasil ditambahkan!' : 'Perubahan proyek disimpan!');
      setEditing(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan proyek';
      onNotify(`Error: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (p: ProjectWithOrder) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Hubungkan Supabase terlebih dahulu untuk menyimpan perubahan.');
      return;
    }
    try {
      const { error } = await supabase
        .from('portfolio_projects')
        .update({ featured: !p.featured })
        .eq('id', p.id);
      if (error) throw error;
      await refreshData();
      onNotify(
        !p.featured
          ? `${p.en.title} ditampilkan di Beranda!`
          : `${p.en.title} dipindahkan dari Beranda.`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal update featured';
      onNotify(`Error: ${msg}`);
    }
  };

  const handleDelete = async (p: ProjectWithOrder) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Hubungkan Supabase terlebih dahulu untuk menghapus data.');
      return;
    }
    if (!window.confirm(`Hapus permanen proyek "${p.en.title}"?`)) return;

    try {
      const { error } = await supabase.from('portfolio_projects').delete().eq('id', p.id);
      if (error) throw error;
      await refreshData();
      onNotify(`Proyek "${p.en.title}" dihapus.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menghapus proyek';
      onNotify(`Error: ${msg}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="liquid-glass p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
            Projects & Case Study Manager
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Tambah, hapus, atau ubah kartu proyek di Beranda serta isi Case Study Modal (highlights,
            peran, tautan demo/GitHub).
          </p>
        </div>

        <button
          type="button"
          onClick={() => openEditor()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer transition-colors shadow-lg shadow-indigo-500/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Proyek Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="liquid-glass p-5 rounded-2xl border border-white/10 flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-md bg-indigo-500/15 text-indigo-400 text-[11px] font-mono">
                    {project.en.categoryLabel}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400">
                    {project.en.status}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleToggleFeatured(project)}
                  title="Tampilkan di Beranda"
                  className={`p-1.5 rounded-lg border cursor-pointer transition-colors ${
                    project.featured
                      ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                      : 'surface-elevated border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
                </button>
              </div>

              <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                {project.en.title}
              </h3>
              <p className="text-xs text-secondary line-clamp-2">{project.en.summary}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {project.en.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="surface-elevated px-2 py-0.5 rounded text-[10px] font-mono text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-token gap-2">
              <div className="flex items-center gap-2">
                {project.en.links[0]?.href && (
                  <a
                    href={project.en.links[0].href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-mono text-indigo-400 hover:underline inline-flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span>Live</span>
                  </a>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => openEditor(project)}
                  className="surface-elevated inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-secondary hover:text-indigo-400 border border-white/10 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(project)}
                  aria-label={`Delete ${project.en.title}`}
                  className="surface-elevated p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 border border-white/10 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Project Modal */}
      <AnimatePresence>
        {editing && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditing(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.form
              onSubmit={handleSave}
              initial={{ opacity: 0, scale: 0.96, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="relative z-10 liquid-glass-modal w-full max-w-3xl rounded-2xl border border-white/15 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-token">
                <h3 className="font-display font-bold text-lg text-[var(--text-primary)]">
                  {isNew ? 'Tambah Proyek Baru' : `Edit Proyek: ${editing.en.title}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="p-6 overflow-y-auto no-scrollbar space-y-4 text-xs"
              >
                {/* Meta Row */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-mono text-muted mb-1">ID (Slug)</label>
                    <input
                      type="text"
                      required
                      disabled={!isNew}
                      value={editing.id}
                      onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Visual Card Style</label>
                    <select
                      value={editing.visualType}
                      onChange={(e) =>
                        setEditing({
                          ...editing,
                          visualType: e.target.value as ProjectWithOrder['visualType'],
                        })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    >
                      <option value="cytune">CyTune (Audio Core)</option>
                      <option value="grainox">Grainox (Web Utility)</option>
                      <option value="orbitry">Orbitry (WebGL Viewport)</option>
                      <option value="filra">Filra (Cinema Grid)</option>
                      <option value="bookshelf">Bookshelf (Java Mod)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Urutan</label>
                    <input
                      type="number"
                      value={editing.sortOrder ?? 0}
                      onChange={(e) =>
                        setEditing({ ...editing, sortOrder: Number(e.target.value) })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    />
                  </div>
                  <div className="flex items-end pb-1.5">
                    <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[var(--text-primary)]">
                      <input
                        type="checkbox"
                        checked={editing.featured}
                        onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>Featured Beranda</span>
                    </label>
                  </div>
                </div>

                {/* Categories */}
                <div className="flex items-center gap-3">
                  <span className="font-mono text-muted">Kategori:</span>
                  {(['web', '3d', 'mod'] as const).map((cat) => (
                    <label key={cat} className="inline-flex items-center gap-1.5 cursor-pointer font-mono">
                      <input
                        type="checkbox"
                        checked={editing.categories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                        className="accent-indigo-500"
                      />
                      <span className="uppercase">{cat}</span>
                    </label>
                  ))}
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-muted mb-1">Live App URL</label>
                    <input
                      type="url"
                      value={primaryUrl}
                      onChange={(e) => setPrimaryUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">GitHub Repo URL</label>
                    <input
                      type="url"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    />
                  </div>
                </div>

                {/* Language Tab Switcher for EN / ID content */}
                <div className="flex items-center gap-2 pt-2 border-t border-token">
                  <button
                    type="button"
                    onClick={() => setLangTab('en')}
                    className={`px-3 py-1.5 rounded-lg font-mono cursor-pointer ${
                      langTab === 'en'
                        ? 'bg-indigo-600 text-white'
                        : 'surface-elevated text-secondary'
                    }`}
                  >
                    Konten English (EN)
                  </button>
                  <button
                    type="button"
                    onClick={() => setLangTab('id')}
                    className={`px-3 py-1.5 rounded-lg font-mono cursor-pointer ${
                      langTab === 'id'
                        ? 'bg-indigo-600 text-white'
                        : 'surface-elevated text-secondary'
                    }`}
                  >
                    Konten Indonesia (ID)
                  </button>
                </div>

                {langTab === 'en' ? (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-muted mb-1">Judul (EN)</label>
                        <input
                          type="text"
                          required
                          value={editing.en.title}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              en: { ...editing.en, title: e.target.value },
                            })
                          }
                          className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-muted mb-1">Label Kategori</label>
                        <input
                          type="text"
                          required
                          value={editing.en.categoryLabel}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              en: { ...editing.en, categoryLabel: e.target.value },
                            })
                          }
                          className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-muted mb-1">Status</label>
                        <input
                          type="text"
                          required
                          value={editing.en.status}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              en: { ...editing.en, status: e.target.value },
                            })
                          }
                          className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">Peran / Role (Modal)</label>
                      <input
                        type="text"
                        required
                        value={editing.en.role}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            en: { ...editing.en, role: e.target.value },
                          })
                        }
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">
                        Ringkasan / Summary (Kartu Luar & Modal)
                      </label>
                      <textarea
                        rows={2}
                        required
                        value={editing.en.summary}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            en: { ...editing.en, summary: e.target.value },
                          })
                        }
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">
                        Highlights di Case Study Modal (1 poin per baris)
                      </label>
                      <textarea
                        rows={3}
                        value={enHighlights}
                        onChange={(e) => setEnHighlights(e.target.value)}
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">
                        Tags (pisahkan koma)
                      </label>
                      <input
                        type="text"
                        value={enTags}
                        onChange={(e) => setEnTags(e.target.value)}
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-mono text-muted mb-1">Judul (ID)</label>
                        <input
                          type="text"
                          value={editing.id_lang.title}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              id_lang: { ...editing.id_lang, title: e.target.value },
                            })
                          }
                          className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-muted mb-1">Label Kategori</label>
                        <input
                          type="text"
                          value={editing.id_lang.categoryLabel}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              id_lang: { ...editing.id_lang, categoryLabel: e.target.value },
                            })
                          }
                          className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-muted mb-1">Status</label>
                        <input
                          type="text"
                          value={editing.id_lang.status}
                          onChange={(e) =>
                            setEditing({
                              ...editing,
                              id_lang: { ...editing.id_lang, status: e.target.value },
                            })
                          }
                          className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">Peran / Role (Modal)</label>
                      <input
                        type="text"
                        value={editing.id_lang.role}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            id_lang: { ...editing.id_lang, role: e.target.value },
                          })
                        }
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">
                        Ringkasan / Summary (Kartu Luar & Modal)
                      </label>
                      <textarea
                        rows={2}
                        value={editing.id_lang.summary}
                        onChange={(e) =>
                          setEditing({
                            ...editing,
                            id_lang: { ...editing.id_lang, summary: e.target.value },
                          })
                        }
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">
                        Highlights di Case Study Modal (1 poin per baris)
                      </label>
                      <textarea
                        rows={3}
                        value={idHighlights}
                        onChange={(e) => setIdHighlights(e.target.value)}
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token resize-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-muted mb-1">
                        Tags (pisahkan koma)
                      </label>
                      <input
                        type="text"
                        value={idTags}
                        onChange={(e) => setIdTags(e.target.value)}
                        className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="px-6 py-4 border-t border-token flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="surface-card px-4 py-2 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer disabled:opacity-60"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{saving ? 'Menyimpan...' : 'Simpan Proyek'}</span>
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
