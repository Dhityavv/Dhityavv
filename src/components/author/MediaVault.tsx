'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { Upload, Copy, Trash2, RefreshCw, Film, Image as ImageIcon } from 'lucide-react';
import { getSupabaseClient, PORTFOLIO_BUCKET } from '@/lib/supabase';

interface StorageFile {
  name: string;
  url: string;
  isVideo: boolean;
  sizeKb: number;
}

interface MediaVaultProps {
  onNotify: (msg: string) => void;
}

export function MediaVault({ onNotify }: MediaVaultProps) {
  const [files, setFiles] = useState<StorageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const loadFiles = useCallback(async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.storage.from(PORTFOLIO_BUCKET).list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      });
      if (error) throw error;
      const mapped: StorageFile[] = (data || [])
        .filter((f) => f.name && !f.name.startsWith('.'))
        .map((f) => {
          const { data: pub } = supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(f.name);
          const isVideo = /\.(mp4|webm|mov)$/i.test(f.name);
          return {
            name: f.name,
            url: pub.publicUrl,
            isVideo,
            sizeKb: Math.round(((f.metadata?.size as number) || 0) / 1024),
          };
        });
      setFiles(mapped);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal memuat Media Vault';
      onNotify(msg);
    } finally {
      setLoading(false);
    }
  }, [onNotify]);

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    let cancelled = false;
    supabase.storage
      .from(PORTFOLIO_BUCKET)
      .list('', {
        limit: 100,
        sortBy: { column: 'created_at', order: 'desc' },
      })
      .then(({ data, error }) => {
        if (cancelled || error || !data) return;
        const mapped: StorageFile[] = data
          .filter((f) => f.name && !f.name.startsWith('.'))
          .map((f) => {
            const { data: pub } = supabase.storage.from(PORTFOLIO_BUCKET).getPublicUrl(f.name);
            const isVideo = /\.(mp4|webm|mov)$/i.test(f.name);
            return {
              name: f.name,
              url: pub.publicUrl,
              isVideo,
              sizeKb: Math.round(((f.metadata?.size as number) || 0) / 1024),
            };
          });
        setFiles(mapped);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList || fileList.length === 0) return;

    const supabase = getSupabaseClient();
    if (!supabase) {
      onNotify('Supabase belum dikonfigurasi.');
      return;
    }

    setUploading(true);
    try {
      for (const file of Array.from(fileList)) {
        const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;
        const { error } = await supabase.storage
          .from(PORTFOLIO_BUCKET)
          .upload(cleanName, file, { upsert: true });
        if (error) throw error;
      }
      onNotify(`${fileList.length} file berhasil diunggah ke Media Vault!`);
      await loadFiles();
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal upload file';
      onNotify(`Error: ${msg}`);
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleDelete = async (name: string) => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    try {
      const { error } = await supabase.storage.from(PORTFOLIO_BUCKET).remove([name]);
      if (error) throw error;
      setFiles((prev) => prev.filter((f) => f.name !== name));
      onNotify(`File ${name} dihapus.`);
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Gagal hapus file';
      onNotify(`Error: ${msg}`);
    }
  };

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    onNotify('URL publik media disalin ke clipboard!');
  };

  return (
    <div className="space-y-5">
      <div className="liquid-glass p-5 sm:p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[var(--text-primary)]">
            Media Vault (Supabase Storage)
          </h2>
          <p className="text-xs text-secondary mt-0.5">
            Unggah foto render (.webp/.png/.jpg) atau video animasi (.mp4) lalu salin URL-nya untuk
            Blender Showcase & Projects.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={loadFiles}
            className="surface-elevated inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-secondary hover:text-[var(--text-primary)] border border-white/10 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Reload</span>
          </button>

          <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer transition-colors shadow-lg shadow-indigo-500/20">
            <Upload className="w-3.5 h-3.5" />
            <span>{uploading ? 'Mengunggah...' : 'Upload Foto / Video'}</span>
            <input
              type="file"
              multiple
              accept="image/*,video/mp4,video/webm"
              onChange={handleUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {files.length === 0 ? (
        <div className="liquid-glass rounded-2xl p-12 text-center border border-white/10 text-sm text-secondary">
          {loading
            ? 'Memuat file dari bucket portfolio-media...'
            : 'Belum ada file di Media Vault. Klik "Upload Foto / Video" di atas untuk menambahkan.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="liquid-glass rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between"
            >
              <div className="relative aspect-video bg-black/60 flex items-center justify-center overflow-hidden">
                {file.isVideo ? (
                  <video src={file.url} muted loop playsInline className="w-full h-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                )}
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/70 text-[10px] font-mono text-zinc-200 flex items-center gap-1 border border-white/10">
                  {file.isVideo ? <Film className="w-3 h-3" /> : <ImageIcon className="w-3 h-3" />}
                  {file.sizeKb} KB
                </span>
              </div>

              <div className="p-3.5 space-y-2.5">
                <p className="text-xs font-mono text-[var(--text-primary)] truncate" title={file.name}>
                  {file.name}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopy(file.url)}
                    className="flex-1 surface-elevated inline-flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-mono text-secondary hover:text-indigo-400 border border-white/10 cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>Salin URL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(file.name)}
                    aria-label={`Delete ${file.name}`}
                    className="surface-elevated p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/15 border border-white/10 cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
