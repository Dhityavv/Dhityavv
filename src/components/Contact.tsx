'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare } from 'lucide-react';
import { SOCIAL_LINKS } from '@/data/portfolioData';
import { SplitRevealTitle } from '@/components/SplitRevealTitle';
import { useLanguage } from '@/context/LanguageContext';
import { useModal } from '@/context/ModalContext';

export function Contact() {
  const { language, t } = useLanguage();
  const { openContactForm, showToast } = useModal();

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleSendEmail = () => {
    const email = 'dhityanurhadi3011@gmail.com';
    const subject = encodeURIComponent(t.mailto.subject);
    const body = encodeURIComponent(t.mailto.body);
    const mailtoUrl = `mailto:${email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  const handleCopyDiscord = async () => {
    try {
      await navigator.clipboard.writeText(SOCIAL_LINKS.discord);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = SOCIAL_LINKS.discord;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast(t.toast.copiedDiscord);
  };

  const whatsappUrl = `${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(t.whatsappText)}`;

  return (
    <footer id="contact" className="scroll-mt-24 pt-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 280, damping: 24 }}
        className="liquid-glass rounded-2xl p-6 sm:p-8 lg:p-10 space-y-8 border border-white/12"
      >
        {/* Header Block: Title & Subtitle (Email copy pill removed per request) */}
        <div className="space-y-2.5 max-w-2xl pb-6 border-b border-token">
          <span className="text-xs font-mono font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {t.contact.eyebrow}
          </span>
          <SplitRevealTitle
            text={t.contact.title}
            className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight text-[var(--text-primary)]"
          />
          <p className="text-sm sm:text-base text-secondary leading-relaxed">
            {t.contact.desc}
          </p>
        </div>

        {/* Structured Action Area */}
        <div className="space-y-4">
          {/* Primary Action Row: Balanced Two-Column CTAs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <button
              type="button"
              onClick={handleSendEmail}
              className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-all duration-300 hover:-translate-y-0.5 shadow-[0_0_24px_rgba(99,102,241,0.25)] hover:shadow-[0_0_32px_rgba(99,102,241,0.45)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <Mail className="w-4 h-4" />
              <span>{t.contact.sendEmail}</span>
            </button>

            <button
              type="button"
              onClick={openContactForm}
              className="w-full surface-elevated inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-medium text-sm text-[var(--text-primary)] hover:border-indigo-500/50 hover:bg-white/[0.06] transition-all duration-300 hover:-translate-y-0.5 border border-white/10 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              <span>{t.contact.openForm}</span>
            </button>
          </div>

          {/* Social & Direct Channels: Rich Brand Colors on Hover, Normal State on Mouse Leave */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 pt-1">
            {/* WhatsApp — Emerald Green Aura */}
            <button
              type="button"
              onClick={() => openLink(whatsappUrl)}
              className="surface-elevated group relative w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-xs font-mono font-medium text-secondary hover:text-[#25D366] hover:border-[#25D366]/70 hover:bg-[#25D366]/15 hover:shadow-[0_0_28px_rgba(37,211,102,0.4)] transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366]"
            >
              <svg className="w-4 h-4 text-zinc-400 group-hover:text-[#25D366] group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.031 2c-5.516 0-9.969 4.453-9.969 9.969 0 1.766.469 3.484 1.344 5l-1.406 5.156 5.281-1.391c1.469.797 3.109 1.219 4.75 1.219 5.516 0 9.969-4.453 9.969-9.969S17.547 2 12.031 2zm5.828 14.078c-.25.703-1.438 1.344-2 1.422-.516.078-1.188.109-1.922-.125-.453-.141-1.031-.328-1.766-.656-3.109-1.344-5.141-4.484-5.297-4.688-.156-.203-1.266-1.688-1.266-3.219s.797-2.281 1.078-2.594c.281-.312.625-.391.828-.391.203 0 .406.016.594.016.188 0 .438-.078.688.531.25.609.859 2.094.938 2.25.078.156.125.344.031.547-.094.203-.141.328-.297.5-.156.172-.312.391-.453.531-.156.156-.312.312-.141.609.172.297.766 1.266 1.656 2.047 1.141 1.016 2.094 1.328 2.391 1.484.297.156.469.125.641-.078.172-.203.75-.875.953-1.172.203-.297.406-.25.688-.141.281.109 1.781.844 2.094 1 .312.156.516.234.594.359.078.125.078.734-.172 1.438z" />
              </svg>
              <span>WhatsApp</span>
            </button>

            {/* GitHub — Monochromatic Electric Silver Aura */}
            <button
              type="button"
              onClick={() => openLink(SOCIAL_LINKS.github)}
              className="surface-elevated group relative w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-xs font-mono font-medium text-secondary hover:text-white hover:border-white/60 hover:bg-white/15 hover:shadow-[0_0_28px_rgba(255,255,255,0.3)] transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <svg className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                />
              </svg>
              <span>GitHub</span>
            </button>

            {/* Instagram — Radiant Sunset Magenta Aura */}
            <button
              type="button"
              onClick={() => openLink(SOCIAL_LINKS.instagram)}
              className="surface-elevated group relative w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-xs font-mono font-medium text-secondary hover:text-pink-300 hover:border-pink-500/70 hover:bg-gradient-to-r hover:from-amber-500/20 hover:via-pink-500/25 hover:to-purple-600/25 hover:shadow-[0_0_28px_rgba(236,72,153,0.45)] transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500"
            >
              <svg
                className="w-4 h-4 text-zinc-400 group-hover:text-pink-400 group-hover:scale-125 group-hover:rotate-12 transition-all duration-300"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </button>

            {/* TikTok — Cyber Chromatic Cyan & Crimson Aura */}
            <button
              type="button"
              onClick={() => openLink(SOCIAL_LINKS.tiktok)}
              className="surface-elevated group relative w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-xs font-mono font-medium text-secondary hover:text-cyan-300 hover:border-cyan-400/70 hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-rose-500/20 hover:shadow-[0_0_28px_rgba(34,211,238,0.4),0_0_15px_rgba(244,63,94,0.3)] transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              <svg className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400 group-hover:scale-125 group-hover:rotate-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.33a8.27 8.27 0 0 0 3.77.92V6.69z" />
              </svg>
              <span>TikTok</span>
            </button>

            {/* Discord — Vibrant Blurple Electric Aura */}
            <button
              type="button"
              onClick={handleCopyDiscord}
              title={language === 'id' ? 'Klik untuk menyalin username Discord @dhityavv' : 'Click to copy Discord handle @dhityavv'}
              className="surface-elevated group relative w-full h-11 inline-flex items-center justify-center gap-2 px-3 rounded-xl text-xs font-mono font-medium text-secondary hover:text-[#5865F2] hover:border-[#5865F2]/80 hover:bg-[#5865F2]/20 hover:shadow-[0_0_28px_rgba(88,101,242,0.45)] transition-all duration-300 ease-out hover:-translate-y-1 cursor-pointer border border-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5865F2] col-span-2 sm:col-span-1"
            >
              <svg className="w-4 h-4 text-zinc-400 group-hover:text-[#5865F2] group-hover:scale-125 group-hover:-rotate-6 transition-all duration-300" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>Discord</span>
            </button>
          </div>
        </div>

        {/* Footer Metadata */}
        <div className="pt-6 border-t border-token flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-mono text-muted">
          <p>© 2026 Dhitya Nurhadi (Dhityavv).</p>
          <p>{t.contact.footerLocation}</p>
        </div>
      </motion.div>
    </footer>
  );
}
