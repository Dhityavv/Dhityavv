'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Session } from '@supabase/supabase-js';
import {
  ArrowLeft,
  BarChart3,
  Box,
  FolderGit2,
  Images,
  UserCog,
  Wrench,
  LogOut,
  Lock,
  Sparkles,
} from 'lucide-react';
import { getSupabaseClient, isSupabaseConfigured } from '@/lib/supabase';
import { useModal } from '@/context/ModalContext';
import { Toast } from '@/components/Toast';
import { AuthorOverview } from '@/components/author/AuthorOverview';
import { BlenderManager } from '@/components/author/BlenderManager';
import { ProjectsManager } from '@/components/author/ProjectsManager';
import { MediaVault } from '@/components/author/MediaVault';
import { ProfileManager } from '@/components/author/ProfileManager';
import { SetupGuidePanel } from '@/components/author/SetupGuidePanel';

type StudioTab = 'overview' | 'blender' | 'projects' | 'media' | 'profile' | 'setup';

export default function AuthorStudioPage() {
  const router = useRouter();
  const { showToast } = useModal();

  const [session, setSession] = useState<Session | null>(null);
  const [checkingAuth, setCheckingAuth] = useState<boolean>(isSupabaseConfigured);
  const [activeTab, setActiveTab] = useState<StudioTab>(
    isSupabaseConfigured ? 'overview' : 'setup'
  );

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const supabase = getSupabaseClient();
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setCheckingAuth(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const supabase = getSupabaseClient();
    if (!supabase) return;

    setAuthLoading(true);
    setAuthError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      if (error) throw error;
      showToast('Berhasil masuk ke Author Studio!');
    } catch (err) {
      setAuthError(err instanceof Error ? err.message : 'Email atau password salah.');
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = async () => {
    const supabase = getSupabaseClient();
    if (!supabase) return;
    await supabase.auth.signOut();
    showToast('Keluar dari Author Studio.');
  };

  const tabs: { id: StudioTab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview & Insights', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'blender', label: 'Blender Showcase', icon: <Box className="w-4 h-4" /> },
    { id: 'projects', label: 'Projects', icon: <FolderGit2 className="w-4 h-4" /> },
    { id: 'media', label: 'Media Vault', icon: <Images className="w-4 h-4" /> },
    { id: 'profile', label: 'Profile', icon: <UserCog className="w-4 h-4" /> },
    { id: 'setup', label: 'Setup & SQL', icon: <Wrench className="w-4 h-4" /> },
  ];

  // If Supabase IS configured and user is NOT signed in -> show Auth Gate
  const showLoginGate = isSupabaseConfigured && !checkingAuth && !session;

  return (
    <>
      {/* Ambient Obsidian Liquid Background matching Main Portfolio */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[680px] h-[480px] rounded-full bg-gradient-to-b from-indigo-500/20 via-purple-600/15 to-transparent blur-[120px]" />
        <div className="absolute top-[40%] -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-bl from-emerald-500/12 via-teal-500/10 to-transparent blur-[130px]" />
        <div className="absolute inset-0 bg-tech-grid opacity-80" />
      </div>

      {/* Top Sticky Studio Header */}
      <header
        style={{
          backgroundColor: 'var(--nav-bg)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
        className="sticky top-0 z-40 w-full backdrop-blur-xl"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => router.push('/')}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl surface-elevated text-xs font-mono font-medium text-secondary hover:text-[var(--text-primary)] border border-white/10 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Portfolio</span>
            </button>

            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="font-display font-bold text-sm sm:text-base text-[var(--text-primary)]">
                Author Studio
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {session && (
              <>
                <span className="hidden sm:inline-block text-xs font-mono text-secondary px-2.5 py-1 rounded-lg surface-elevated border border-white/10">
                  {session.user.email}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl surface-elevated text-xs font-mono text-rose-400 hover:bg-rose-500/15 border border-white/10 cursor-pointer transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Keluar</span>
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {checkingAuth ? (
          <div className="liquid-glass rounded-2xl p-12 text-center border border-white/10 text-sm font-mono text-secondary">
            Memeriksa sesi Author Studio...
          </div>
        ) : showLoginGate ? (
          <div className="max-w-md mx-auto pt-8">
            <motion.form
              onSubmit={handleLogin}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="liquid-glass rounded-2xl p-7 border border-white/12 space-y-5 shadow-2xl"
            >
              <div className="space-y-1.5 text-center">
                <div className="w-11 h-11 rounded-2xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center mx-auto mb-3">
                  <Lock className="w-5 h-5" />
                </div>
                <h1 className="font-display font-bold text-2xl text-[var(--text-primary)]">
                  Author Studio Login
                </h1>
                <p className="text-xs text-secondary">
                  Masuk dengan akun Supabase Author untuk mengelola Blender Showcase, Projects, dan
                  Insight Pengunjung.
                </p>
              </div>

              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-xs text-rose-300 font-mono">
                  {authError}
                </div>
              )}

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-mono text-muted mb-1.5">Email Author</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="dhityanurhadi3011@gmail.com"
                    className="w-full surface-elevated px-3.5 py-2.5 rounded-xl border border-token focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block font-mono text-muted mb-1.5">Password</label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full surface-elevated px-3.5 py-2.5 rounded-xl border border-token focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors shadow-lg shadow-indigo-500/25 cursor-pointer disabled:opacity-60"
              >
                {authLoading ? 'Memverifikasi...' : 'Masuk ke Author Studio'}
              </button>
            </motion.form>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Navigation Tab Pills */}
            <nav
              aria-label="Author Studio Navigation"
              className="liquid-glass p-1.5 rounded-2xl border border-white/10 flex flex-wrap gap-1.5"
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium cursor-pointer transition-colors ${
                      isActive ? 'text-white' : 'text-secondary hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="author-active-tab"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        className="absolute inset-0 rounded-xl bg-indigo-600 shadow-md shadow-indigo-500/25"
                      />
                    )}
                    <span className="relative z-10">{tab.icon}</span>
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Active Studio Panel */}
            <div>
              {activeTab === 'overview' && (
                <AuthorOverview onNotify={showToast} onNavigateTab={setActiveTab} />
              )}
              {activeTab === 'blender' && <BlenderManager onNotify={showToast} />}
              {activeTab === 'projects' && <ProjectsManager onNotify={showToast} />}
              {activeTab === 'media' && <MediaVault onNotify={showToast} />}
              {activeTab === 'profile' && <ProfileManager onNotify={showToast} />}
              {activeTab === 'setup' && <SetupGuidePanel onNotify={showToast} />}
            </div>
          </div>
        )}
      </main>

      <Toast />
    </>
  );
}
