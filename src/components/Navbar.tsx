'use client';

import React, { useState } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Home } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from '@/components/ui/liquid-glass-navbar';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { isAnyModalOpen } = useModal();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const currentTheme = mounted ? (resolvedTheme || theme) : 'dark';
  const navTone = currentTheme === 'light' ? 'light' : 'dark';

  const toggleTheme = () => {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  const navItems: LiquidNavItem[] = [
    { label: t.nav.about, href: '#about', icon: NimbusIcons.user, fx: 'wave' },
    { label: t.nav.showcase, href: '#showcase', icon: NimbusIcons.box, fx: 'spin' },
    { label: t.nav.projects, href: '#projects', icon: NimbusIcons.code, fx: 'pop' },
    { label: t.nav.experience, href: '#experience', icon: NimbusIcons.briefcase, fx: 'drop' },
    { label: t.nav.skills, href: '#skills', icon: NimbusIcons.cpu, fx: 'glow' },
    { label: t.nav.contact, href: '#contact', icon: NimbusIcons.mail, fx: 'plane' },
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', href);
        }
      }
    }
  };

  return (
    <header
      className={`fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[96vw] transition-all duration-300 ease-out ${
        isAnyModalOpen
          ? 'opacity-0 pointer-events-none -translate-y-12'
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Floating Glass Pill Dock */}
      <div className="liquid-glass rounded-full p-1.5 sm:p-2 flex items-center gap-1.5 sm:gap-2 shadow-[0_12px_44px_rgba(0,0,0,0.55)] border border-white/15 dark:border-white/10 backdrop-blur-xl transition-all">
        {/* Brand Home Navigation Button with sleek Home icon */}
        <button
          type="button"
          onClick={handleScrollToTop}
          title={language === 'id' ? 'Beranda' : 'Home'}
          aria-label={language === 'id' ? 'Beranda' : 'Home'}
          className="group relative flex items-center gap-2 pl-1.5 pr-2.5 py-1 rounded-full surface-elevated/90 hover:surface-elevated border border-white/15 dark:border-white/10 hover:border-indigo-400/50 shadow-sm cursor-pointer transition-all duration-200 hover:-translate-y-0.5 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
        >
          <span className="w-6 h-6 sm:w-6.5 sm:h-6.5 rounded-full flex items-center justify-center bg-indigo-500/15 border border-indigo-500/25 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 group-hover:bg-indigo-500/25 group-hover:text-indigo-500 transition-all duration-200 shrink-0 shadow-inner">
            <Home className="w-3.5 h-3.5 transition-transform duration-200" />
          </span>
          <span className="font-display font-bold text-xs sm:text-[13px] tracking-tight text-[var(--text-primary)] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {language === 'id' ? 'Beranda' : 'Home'}
          </span>
        </button>

        {/* Vertical Glass Divider: Distinguishes brand anchor from section navigation tabs */}
        <div className="w-px h-5 bg-white/20 dark:bg-white/15 mx-0.5 hidden md:block" />

        {/* Desktop WebGL Physics Liquid Glass Navbar */}
        <div className="hidden md:block">
          <LiquidNavbar
            items={navItems}
            tone={navTone}
            sound={false}
          />
        </div>

        {/* Mobile View Minimal Title or Compact Indicator */}
        <div className="md:hidden flex items-center pl-1 pr-1">
          <button
            type="button"
            onClick={handleScrollToTop}
            title={language === 'id' ? 'Beranda' : 'Home'}
            aria-label={language === 'id' ? 'Beranda' : 'Home'}
            className="flex items-center gap-1.5 py-0.5 px-2 rounded-full surface-elevated border border-white/10 cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 shrink-0">
              <Home className="w-3 h-3" />
            </span>
            <span className="font-display font-bold text-xs text-[var(--text-primary)]">
              {language === 'id' ? 'Beranda' : 'Home'}
            </span>
          </button>
        </div>

        {/* Subtle Divider between Navigation Links and Controls */}
        <div className="w-px h-4 bg-white/20 dark:bg-white/15 mx-0.5" />

        {/* Language Switcher (EN | ID): Clean Segmented Control without cross-page flying glitch */}
        <div
          role="group"
          aria-label="Language Toggle"
          className="relative surface-elevated inline-flex items-center p-0.5 rounded-full text-[11px] font-mono font-semibold border border-white/10"
        >
          <button
            type="button"
            onClick={() => setLanguage('en')}
            className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 ${
              language === 'en'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : 'text-secondary hover:text-[var(--text-primary)]'
            }`}
          >
            EN
          </button>

          <button
            type="button"
            onClick={() => setLanguage('id')}
            className={`px-2.5 py-1 rounded-full transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 ${
              language === 'id'
                ? 'bg-indigo-600 text-white shadow-sm font-bold'
                : 'text-secondary hover:text-[var(--text-primary)]'
            }`}
          >
            ID
          </button>
        </div>

        {/* Theme Toggle Button with micro-rotation animation */}
        <motion.button
          type="button"
          onClick={toggleTheme}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle theme"
          className="surface-elevated p-2 rounded-full text-secondary hover:text-[var(--text-primary)] transition-all cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
        >
          {mounted && currentTheme === 'light' ? (
            <Moon className="w-3.5 h-3.5 text-indigo-600" />
          ) : (
            <Sun className="w-3.5 h-3.5 text-amber-400" />
          )}
        </motion.button>

        {/* Mobile Menu Toggle Button */}
        <motion.button
          type="button"
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
          className="md:hidden surface-elevated p-2 rounded-full text-secondary hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500"
        >
          {mobileMenuOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
        </motion.button>
      </div>

      {/* Mobile Drawer Dropdown Sheet */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden mt-2 rounded-2xl p-2 liquid-glass shadow-2xl border border-white/15 dark:border-white/10 flex flex-col gap-1 backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                handleScrollToTop();
              }}
              title={language === 'id' ? 'Beranda' : 'Home'}
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-secondary hover:text-[var(--text-primary)] hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-left cursor-pointer"
            >
              <span className="w-4 h-4 flex items-center justify-center text-indigo-400">
                <Home className="w-3.5 h-3.5" />
              </span>
              <span>{language === 'id' ? 'Beranda' : 'Home'}</span>
            </button>
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => handleMobileNavClick(item.href || '#')}
                className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-secondary hover:text-[var(--text-primary)] hover:bg-white/10 dark:hover:bg-white/10 transition-colors text-left cursor-pointer"
              >
                <span className="w-4 h-4 flex items-center justify-center text-indigo-500">
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
