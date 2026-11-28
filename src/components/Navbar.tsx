'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Home } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';
import { LiquidNavbar, NimbusIcons, type LiquidNavItem } from '@/components/ui/liquid-glass-navbar';
import { SparkleNavTrigger } from '@/components/ui/SparkleNavTrigger';

export function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { isAnyModalOpen } = useModal();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const lenis = useLenis();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isHoverPending, setIsHoverPending] = useState(false);
  const [expandedWidth, setExpandedWidth] = useState(660);
  const navMeasureRef = useRef<HTMLDivElement | null>(null);
  const hoverOpenTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverCloseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const measure = () => {
      if (navMeasureRef.current) {
        const w = navMeasureRef.current.scrollWidth;
        if (w > 0) setExpandedWidth(w + 16);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [language]);

  const clearHoverTimers = useCallback(() => {
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearHoverTimers();
  }, [clearHoverTimers]);

  const handleDesktopMouseEnter = () => {
    if (hoverCloseTimerRef.current) {
      clearTimeout(hoverCloseTimerRef.current);
      hoverCloseTimerRef.current = null;
    }
    if (isNavExpanded) return;
    setIsHoverPending(true);
    if (!hoverOpenTimerRef.current) {
      hoverOpenTimerRef.current = setTimeout(() => {
        hoverOpenTimerRef.current = null;
        setIsHoverPending(false);
        setIsNavExpanded(true);
      }, 500);
    }
  };

  const handleDesktopMouseLeave = () => {
    setIsHoverPending(false);
    if (hoverOpenTimerRef.current) {
      clearTimeout(hoverOpenTimerRef.current);
      hoverOpenTimerRef.current = null;
    }
    if (!isNavExpanded) return;
    if (!hoverCloseTimerRef.current) {
      hoverCloseTimerRef.current = setTimeout(() => {
        hoverCloseTimerRef.current = null;
        setIsNavExpanded(false);
      }, 500);
    }
  };
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
    { label: language === 'id' ? 'Beranda' : 'Home', href: '#top', icon: NimbusIcons.home, fx: 'glow' },
    { label: t.nav.about, href: '#about', icon: NimbusIcons.user, fx: 'wave' },
    { label: t.nav.showcase, href: '#showcase', icon: NimbusIcons.box, fx: 'spin' },
    { label: t.nav.projects, href: '#projects', icon: NimbusIcons.code, fx: 'pop' },
    { label: t.nav.experience, href: '#experience', icon: NimbusIcons.briefcase, fx: 'drop' },
    { label: t.nav.skills, href: '#skills', icon: NimbusIcons.cpu, fx: 'glow' },
    { label: t.nav.contact, href: '#contact', icon: NimbusIcons.mail, fx: 'plane' },
  ];

  const handleScrollToTop = () => {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.25 });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    }
    if (typeof window !== 'undefined') {
      window.history.replaceState(null, '', window.location.pathname);
    }
  };

  const handleMobileNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (href.startsWith('#')) {
      if (lenis) {
        lenis.scrollTo(href, { offset: -96, duration: 1.15 });
        if (typeof window !== 'undefined') {
          window.history.replaceState(null, '', href);
        }
        return;
      }
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
    <>
      {/* Centered Floating Glass Dock Navigation (Pure Sparkle Cluster when collapsed, smooth pill on expand) */}
      <header
        className={`fixed top-3.5 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-auto max-w-[92vw] transition-all duration-300 ease-out ${
          isAnyModalOpen
            ? 'opacity-0 pointer-events-none -translate-y-12'
            : 'opacity-100 translate-y-0'
        }`}
      >
        {/* Desktop: Pure Star Cluster (overflow-visible) -> Glass Pill shrinks/expands symmetrically */}
        <div
          onMouseEnter={handleDesktopMouseEnter}
          onMouseLeave={handleDesktopMouseLeave}
          onFocus={() => {
            clearHoverTimers();
            setIsHoverPending(false);
            setIsNavExpanded(true);
          }}
          onBlur={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
              clearHoverTimers();
              setIsHoverPending(false);
              setIsNavExpanded(false);
            }
          }}
          className="hidden md:flex relative items-center justify-center h-[54px]"
        >
          {/* Expanding / Shrinking Liquid Glass Pill Container */}
          <motion.div
            initial={false}
            animate={{
              width: isNavExpanded ? expandedWidth : 44,
              height: isNavExpanded ? 54 : 44,
              opacity: isNavExpanded ? 1 : 0,
              scale: isNavExpanded ? 1 : 0.6,
            }}
            transition={{
              duration: 0.72,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`liquid-glass rounded-full overflow-hidden flex items-center justify-center shadow-[0_12px_44px_rgba(0,0,0,0.55)] border border-white/15 dark:border-white/10 backdrop-blur-xl px-2 ${
              isNavExpanded ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
          >
            {/* LiquidNavbar stays mounted at natural width and fades smoothly inside the pill */}
            <motion.div
              ref={navMeasureRef}
              initial={false}
              animate={{
                opacity: isNavExpanded ? 1 : 0,
                scale: isNavExpanded ? 1 : 0.9,
              }}
              transition={{
                duration: isNavExpanded ? 0.5 : 0.38,
                delay: isNavExpanded ? 0.14 : 0,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="shrink-0"
            >
              <LiquidNavbar items={navItems} tone={navTone} sound={false} />
            </motion.div>
          </motion.div>

          {/* Absolute-centered Sparkle Trigger (always overflow-visible, blooms back as pill shrinks) */}
          <button
            type="button"
            onClick={() => {
              clearHoverTimers();
              setIsHoverPending(false);
              setIsNavExpanded((prev) => !prev);
            }}
            aria-label={isNavExpanded ? 'Collapse navigation' : 'Expand navigation'}
            aria-expanded={isNavExpanded}
            className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-full ${
              isNavExpanded ? 'pointer-events-none' : 'pointer-events-auto'
            }`}
          >
            <SparkleNavTrigger
              isExpanded={isNavExpanded}
              isHoverPending={isHoverPending}
            />
          </button>
        </div>

        {/* Mobile View: Compact Home Pill + Hamburger */}
        <div className="md:hidden liquid-glass rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_12px_44px_rgba(0,0,0,0.55)] border border-white/15 dark:border-white/10 backdrop-blur-xl">
          <button
            type="button"
            onClick={handleScrollToTop}
            title={language === 'id' ? 'Beranda' : 'Home'}
            aria-label={language === 'id' ? 'Beranda' : 'Home'}
            className="flex items-center gap-1.5 py-1 px-2.5 rounded-full surface-elevated border border-white/10 cursor-pointer"
          >
            <span className="w-5 h-5 rounded-full flex items-center justify-center bg-indigo-500/15 border border-indigo-500/25 text-indigo-400 shrink-0">
              <Home className="w-3 h-3" />
            </span>
            <span className="font-display font-bold text-xs text-[var(--text-primary)]">
              {language === 'id' ? 'Beranda' : 'Home'}
            </span>
          </button>

          <motion.button
            type="button"
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Navigation' : 'Open Navigation'}
            className="surface-elevated p-2 rounded-full text-secondary hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-500 cursor-pointer"
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

      {/* Separated Top-Right Controls: Language Switcher (EN | ID) & Theme Toggle */}
      <div
        className={`fixed top-3.5 sm:top-5 right-3.5 sm:right-6 z-50 transition-all duration-300 ease-out ${
          isAnyModalOpen
            ? 'opacity-0 pointer-events-none -translate-y-12'
            : 'opacity-100 translate-y-0'
        }`}
      >
        <div className="liquid-glass rounded-full p-1.5 flex items-center gap-1.5 shadow-[0_12px_44px_rgba(0,0,0,0.45)] border border-white/15 dark:border-white/10 backdrop-blur-xl">
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
        </div>
      </div>
    </>
  );
}
