'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Copy } from 'lucide-react';
import { useModal } from '@/context/ModalContext';
import { useLanguage } from '@/context/LanguageContext';
import { SOCIAL_LINKS } from '@/data/portfolioData';

export function ContactFormModal() {
  const { isContactFormOpen, closeContactForm, showToast } = useModal();
  const { t } = useLanguage();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeContactForm();
    };
    if (isContactFormOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactFormOpen, closeContactForm]);

  if (!isContactFormOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name || 'Visitor'}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );
    const mailto = `mailto:${SOCIAL_LINKS.email}?subject=${subject}&body=${body}`;

    window.location.href = mailto;
    showToast(t.toast.openingEmail);
    setName('');
    setEmail('');
    setMessage('');
    closeContactForm();
  };

  const handleCopyMessage = async () => {
    const fullText = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    try {
      await navigator.clipboard.writeText(fullText);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = fullText;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    showToast(t.toast.copiedMessage);
  };

  return (
    <AnimatePresence>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-form-title"
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={closeContactForm}
          className="fixed inset-0 bg-black/75 backdrop-blur-md"
        />

        {/* Modal Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 liquid-glass-modal w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden overscroll-contain"
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-4 p-6 border-b border-token">
            <div className="space-y-1">
              <h3 id="contact-form-title" className="font-display font-bold text-xl text-[var(--text-primary)]">
                {t.contact.formTitle}
              </h3>
              <p className="text-xs text-secondary">{t.contact.formDesc}</p>
            </div>
            <button
              type="button"
              onClick={closeContactForm}
              aria-label="Close"
              className="surface-elevated p-2 rounded-lg text-secondary hover:text-[var(--text-primary)] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label
                htmlFor="cf-name"
                className="block text-xs font-mono font-medium text-secondary mb-1.5"
              >
                {t.contact.nameLabel}
              </label>
              <input
                id="cf-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full surface-elevated px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all border border-token"
              />
            </div>

            <div>
              <label
                htmlFor="cf-email"
                className="block text-xs font-mono font-medium text-secondary mb-1.5"
              >
                {t.contact.emailLabel}
              </label>
              <input
                id="cf-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full surface-elevated px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all border border-token"
              />
            </div>

            <div>
              <label
                htmlFor="cf-msg"
                className="block text-xs font-mono font-medium text-secondary mb-1.5"
              >
                {t.contact.messageLabel}
              </label>
              <textarea
                id="cf-msg"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Hi Dhitya, we would like to invite you for an internship..."
                className="w-full surface-elevated px-3.5 py-2.5 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all border border-token resize-none"
              />
            </div>

            <div className="pt-2 flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleCopyMessage}
                disabled={!message}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg surface-elevated text-xs font-mono text-secondary hover:text-[var(--text-primary)] transition-colors disabled:opacity-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{t.contact.copyBtn}</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeContactForm}
                  className="surface-card px-4 py-2 rounded-lg text-xs sm:text-sm font-medium hover:border-indigo-500/50 transition-colors cursor-pointer"
                >
                  {t.contact.cancelBtn}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-500 hover:bg-indigo-600 text-white font-medium text-xs sm:text-sm transition-colors shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.sendBtn}</span>
                </button>
              </div>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
