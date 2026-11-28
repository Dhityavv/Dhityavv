'use client';

import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Star, Search, Upload, X, Save, Film } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSupabaseClient, PORTFOLIO_BUCKET } from '@/lib/supabase';
import { RenderItemWithOrder, usePortfolioData } from '@/context/PortfolioDataContext';
import { RenderItem } from '@/types/portfolio';

interface BlenderManagerProps {
  onNotify: (msg: string) => void;
}

const CATEGORY_MAP: Record<RenderItem['category'], { en: string; id: string }> = {
  environment: { en: 'Environment', id: 'Lingkungan' },
  animation: { en: 'Animation', id: 'Animasi' },
  character: { en: 'Character', id: 'Karakter' },
  architecture: { en: 'Architecture', id: 'Arsitektur' },
  prop: { en: 'Props', id: 'Props' },
};

const EMPTY_RENDER: RenderItemWithOrder = {
  id: '',
  category: 'environment',
  categoryLabelEn: 'Environment',
  categoryLabelId: 'Lingkungan',
  titleEn: '',
  titleId: '',
  descEn: '',
  descId: '',
  image: '',
  images: [],
  video: '',
  renderEngine: 'Cycles',
  blenderVersion: 'Blender 5.3',
  year: '2026',
  tags: [],
  isFeatured: false,
  sortOrder: 0,
};

export function BlenderManager({ onNotify }: BlenderManagerProps) {
  const { allRenders, refreshData } = usePortfolioData();
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState<string>('all');
  const [editingItem, setEditingItem] = useState<RenderItemWithOrder | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [tagsText, setTagsText] = useState('');
  const [imagesText, setImagesText] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const openEditor = (item?: RenderItemWithOrder) => {
    if (item) {
      setIsNew(false);
      setEditingItem({ ...item });
      setTagsText((item.tags || []).join(', '));
      setImagesText((item.images || []).join('\n'));
    } else {
      setIsNew(true);
      const slug = `render-${Date.now().toString(36)}`;
      setEditingItem({
        ...EMPTY_RENDER,
        id: slug,
        sortOrder: allRenders.length,
      });
      setTagsText('');
      setImagesText('');
    }
  };

  const handleUploadAsset = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: 'image' | 'images' | 'video'
  ) => {
    const file = e.target.files?.[0];
    if (!file || !editingItem) return;
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Supabase belum dikonfigurasi. Tidak bisa upload file.');
      return;
    }

    setUploadingField(target);
    try {
      const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
      const { error } = await supabase.storage
        .from(PORTFOLIO_BUCKET)
        .upload(cleanName, file, { upsert: true });
      if (error) throw error;

      const { data: pub } = supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(cleanName);
      const url = pub.publicUrl;

      if (target === 'image') {
        setEditingItem((prev) => (prev ? { ...prev, image: url } : null));
        if (!imagesText.trim()) setImagesText(url);
      } else if (target === 'video') {
        setEditingItem((prev) => (prev ? { ...prev, video: url } : null));
      } else {
        setImagesText((prev) => (prev.trim() ? `${prev.trim()}\n${url}` : url));
      }
      onNotify('Media berhasil diunggah!');
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal upload';
      onNotify(`Error: ${msg}`);
    } finally {
      setUploadingField(null);
      e.target.value = '';
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Supabase belum terhubung. Tambahkan env var terlebih dahulu.');
      return;
    }

    setSaving(true);
    try {
      const catLabels = CATEGORY_MAP[editingItem.category];
      const parsedTags = tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const parsedImages = imagesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean);
      const primaryImage = editingItem.image.trim() || parsedImages[0] || '/assets/Tree.webp';
      const finalImages = parsedImages.length > 0 ? parsedImages : [primaryImage];

      const row = {
        id: editingItem.id.trim() || `render-${Date.now().toString(36)}`,
        category: editingItem.category,
        category_label_en: catLabels.en,
        category_label_id: catLabels.id,
        title_en: editingItem.titleEn.trim(),
        title_id: editingItem.titleId.trim() || editingItem.titleEn.trim(),
        desc_en: editingItem.descEn.trim(),
        desc_id: editingItem.descId.trim() || editingItem.descEn.trim(),
        image: primaryImage,
        images: finalImages,
        video: editingItem.video?.trim() || null,
        render_engine: editingItem.renderEngine,
        blender_version: editingItem.blenderVersion || 'Blender 5.3',
        year: editingItem.year,
        tags: parsedTags,
        is_featured: Boolean(editingItem.isFeatured),
        sort_order: Number(editingItem.sortOrder ?? 0),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('portfolio_renders')
        .upsert(row, { onConflict: 'id' });
      if (error) throw error;

      await refreshData();
      onNotify(
        isNew ? 'Karya Blender baru berhasil ditambahkan!' : 'Perubahan karya Blender disimpan!'
      );
      setEditingItem(null);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menyimpan ke Supabase';
      onNotify(`Error: ${msg}`);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleFeatured = async (item: RenderItemWithOrder) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Hubungkan Supabase terlebih dahulu untuk menyimpan perubahan.');
      return;
    }
    try {
      const { error } = await supabase
        .from('portfolio_renders')
        .update({ is_featured: !item.isFeatured })
        .eq('id', item.id);
      if (error) throw error;
      await refreshData();
      onNotify(
        !item.isFeatured
          ? `${item.titleEn} ditampilkan di Featured Beranda!`
          : `${item.titleEn} dilepas dari Featured Beranda.`
      );
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal update featured';
      onNotify(`Error: ${msg}`);
    }
  };

  const handleDelete = async (item: RenderItemWithOrder) => {
    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Hubungkan Supabase terlebih dahulu untuk menghapus data.');
      return;
    }
    if (!window.confirm(`Hapus permanen "${item.titleEn}"?`)) return;

    try {
      const { error } = await supabase.from('portfolio_renders').delete().eq('id', item.id);
      if (error) throw error;
      await refreshData();
      onNotify(`"${item.titleEn}" berhasil dihapus.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal menghapus';
      onNotify(`Error: ${msg}`);
    }
  };

  const filtered = allRenders.filter((item) => {
    const matchCat = filterCat === 'all' || item.category === filterCat;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      item.titleEn.toLowerCase().includes(q) ||
      item.titleId.toLowerCase().includes(q) ||
      item.tags.some((t) => t.toLowerCase().includes(q));
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-5">
      {/* Header Toolbar */}
      <div className="liquid-glass p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
            Blender Showcase Manager
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Ubah informasi kartu luar & detail di dalam GUI modal (judul, deskripsi EN/ID, foto
            multi-angle, video animasi, tag).
          </p>
        </div>

        <button
          type="button"
          onClick={() => openEditor()}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer transition-colors shadow-lg shadow-indigo-500/20 self-start md:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Karya 3D</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari judul atau tag karya 3D..."
            className="w-full surface-elevated pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono text-[var(--text-primary)] border border-white/10 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {(['all', 'environment', 'animation', 'character', 'architecture', 'prop'] as const).map(
            (cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setFilterCat(cat)}
                className={`px-3 py-2 rounded-xl text-xs font-mono cursor-pointer transition-colors border ${
                  filterCat === cat
                    ? 'bg-indigo-600 text-white border-indigo-500'
                    : 'surface-elevated text-secondary border-white/10 hover:text-[var(--text-primary)]'
                }`}
              >
                {cat === 'all' ? 'All' : CATEGORY_MAP[cat].en}
              </button>
            )
          )}
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="liquid-glass rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
          >
            <div className="relative aspect-[16/10] bg-black/50 overflow-hidden">
              {item.video ? (
                <video
                  src={item.video}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.image} alt={item.titleEn} className="w-full h-full object-cover" />
              )}
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                <span className="px-2 py-0.5 rounded-md bg-black/75 text-[10px] font-mono text-zinc-200 border border-white/10">
                  {item.categoryLabelEn}
                </span>
                {item.video && (
                  <span className="px-2 py-0.5 rounded-md bg-indigo-600/80 text-[10px] font-mono text-white flex items-center gap-1">
                    <Film className="w-2.5 h-2.5" /> Video
                  </span>
                )}
              </div>
              <button
                type="button"
                onClick={() => handleToggleFeatured(item)}
                title="Featured di Beranda (maks 3)"
                className={`absolute top-2.5 right-2.5 p-1.5 rounded-lg border cursor-pointer transition-colors ${
                  item.isFeatured
                    ? 'bg-amber-500/20 border-amber-400/50 text-amber-300'
                    : 'bg-black/60 border-white/10 text-zinc-400 hover:text-white'
                }`}
              >
                <Star className={`w-3.5 h-3.5 ${item.isFeatured ? 'fill-current' : ''}`} />
              </button>
            </div>

            <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-bold text-sm text-[var(--text-primary)] line-clamp-1">
                  {item.titleEn}
                </h3>
                <p className="text-xs text-secondary line-clamp-2 mt-1">{item.descEn}</p>
                <p className="text-[10px] font-mono text-muted mt-1.5">
                  {item.images.length} foto • {item.blenderVersion} • {item.renderEngine}
                </p>
              </div>

              <div className="flex items-center gap-2 pt-2 border-t border-token">
                <button
                  type="button"
                  onClick={() => openEditor(item)}
                  className="flex-1 surface-elevated inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-mono text-secondary hover:text-indigo-400 border border-white/10 cursor-pointer"
                >
                  <Pencil className="w-3.5 h-3.5" />
                  <span>Edit Lengkap</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(item)}
                  aria-label={`Delete ${item.titleEn}`}
                  className="surface-elevated p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 border border-white/10 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Modal */}
      <AnimatePresence>
        {editingItem && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setEditingItem(null)}
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
                  {isNew ? 'Tambah Karya Blender Baru' : `Edit: ${editingItem.titleEn}`}
                </h3>
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div
                data-lenis-prevent
                className="p-6 overflow-y-auto no-scrollbar space-y-4 text-xs"
              >
                {/* Row 1: ID, Category, Order, Featured */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block font-mono text-muted mb-1">ID (Slug)</label>
                    <input
                      type="text"
                      required
                      disabled={!isNew}
                      value={editingItem.id}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, id: e.target.value })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono disabled:opacity-60"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Kategori</label>
                    <select
                      value={editingItem.category}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          category: e.target.value as RenderItem['category'],
                        })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    >
                      <option value="environment">Environment</option>
                      <option value="animation">Animation</option>
                      <option value="character">Character</option>
                      <option value="architecture">Architecture</option>
                      <option value="prop">Props</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Urutan</label>
                    <input
                      type="number"
                      value={editingItem.sortOrder ?? 0}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, sortOrder: Number(e.target.value) })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    />
                  </div>
                  <div className="flex items-end pb-1.5">
                    <label className="inline-flex items-center gap-2 cursor-pointer font-mono text-[var(--text-primary)]">
                      <input
                        type="checkbox"
                        checked={Boolean(editingItem.isFeatured)}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, isFeatured: e.target.checked })
                        }
                        className="accent-indigo-500 w-4 h-4"
                      />
                      <span>Featured Beranda</span>
                    </label>
                  </div>
                </div>

                {/* Row 2: Titles EN & ID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-muted mb-1">Judul (English)</label>
                    <input
                      type="text"
                      required
                      value={editingItem.titleEn}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, titleEn: e.target.value })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Judul (Indonesia)</label>
                    <input
                      type="text"
                      required
                      value={editingItem.titleId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, titleId: e.target.value })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token"
                    />
                  </div>
                </div>

                {/* Row 3: Descriptions EN & ID (Shown inside GUI modal) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-mono text-muted mb-1">
                      Deskripsi Modal (English)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.descEn}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, descEn: e.target.value })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token resize-none"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">
                      Deskripsi Modal (Indonesia)
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={editingItem.descId}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, descId: e.target.value })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token resize-none"
                    />
                  </div>
                </div>

                {/* Row 4: Technical Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-mono text-muted mb-1">Blender Version</label>
                    <input
                      type="text"
                      value={editingItem.blenderVersion || 'Blender 5.3'}
                      onChange={(e) =>
                        setEditingItem({ ...editingItem, blenderVersion: e.target.value })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Render Engine</label>
                    <select
                      value={editingItem.renderEngine}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          renderEngine: e.target.value as 'Cycles' | 'Eevee',
                        })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    >
                      <option value="Cycles">Cycles</option>
                      <option value="Eevee">Eevee</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-mono text-muted mb-1">Tahun</label>
                    <select
                      value={editingItem.year}
                      onChange={(e) =>
                        setEditingItem({
                          ...editingItem,
                          year: e.target.value as '2025' | '2026',
                        })
                      }
                      className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                    >
                      <option value="2026">2026</option>
                      <option value="2025">2025</option>
                    </select>
                  </div>
                </div>

                {/* Row 5: Primary Image + Upload */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-mono text-muted">Foto Utama (URL / Path)</label>
                    <label className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer font-mono">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingField === 'image' ? 'Uploading...' : 'Upload Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadAsset(e, 'image')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={editingItem.image}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, image: e.target.value })
                    }
                    placeholder="/assets/..."
                    className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                  />
                </div>

                {/* Row 6: Multi-Angle Images */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-mono text-muted">
                      Galeri Foto Multi-Angle (1 URL per baris)
                    </label>
                    <label className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer font-mono">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingField === 'images' ? 'Uploading...' : '+ Tambah Foto'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleUploadAsset(e, 'images')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <textarea
                    rows={3}
                    value={imagesText}
                    onChange={(e) => setImagesText(e.target.value)}
                    placeholder="/assets/render-1.webp&#10;/assets/render-2.webp"
                    className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono resize-none"
                  />
                </div>

                {/* Row 7: Optional Video */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-mono text-muted">Video Animasi Opsional (.mp4)</label>
                    <label className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300 cursor-pointer font-mono">
                      <Upload className="w-3 h-3" />
                      <span>{uploadingField === 'video' ? 'Uploading...' : 'Upload Video'}</span>
                      <input
                        type="file"
                        accept="video/mp4,video/webm"
                        onChange={(e) => handleUploadAsset(e, 'video')}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <input
                    type="text"
                    value={editingItem.video || ''}
                    onChange={(e) =>
                      setEditingItem({ ...editingItem, video: e.target.value })
                    }
                    placeholder="/assets/animation.mp4 (kosongkan jika hanya foto)"
                    className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                  />
                </div>

                {/* Row 8: Tags */}
                <div>
                  <label className="block font-mono text-muted mb-1">
                    Tags (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    placeholder="Cycles, PBR Texturing, Quad Topology"
                    className="w-full surface-elevated px-3 py-2 rounded-lg border border-token font-mono"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-token flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
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
                  <span>{saving ? 'Menyimpan...' : 'Simpan Karya'}</span>
                </button>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
