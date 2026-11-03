"use client";

import React, { useState } from "react";
import {
  Send,
  Mail,
  Camera,
  Video,
  MessageSquare,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function ContactSection() {
  const { lang } = useLanguage();
  const [copiedDiscord, setCopiedDiscord] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const EMAIL_ADDRESS = "dhityanurhadi3011@gmail.com";

  const copyDiscord = () => {
    navigator.clipboard.writeText("@dhityavv");
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const copyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(EMAIL_ADDRESS);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <section id="connect" className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8A6FB5] mb-3">
          <Send className="w-3.5 h-3.5" />
          <span>{lang === "EN" ? "Get in Touch" : "Hubungi Saya"}</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          {lang === "EN" ? "Let's Connect" : "Mari Terhubung"}
        </h2>
        <p className="text-sm text-[#8b949e] max-w-lg mx-auto mb-10">
          {lang === "EN"
            ? "Interested in 3D art, Minecraft modding, or custom website development? Reach out anytime!"
            : "Tertarik dengan pemodelan 3D, modding Minecraft, atau pembuatan website kustom? Silakan hubungi saya!"}
        </p>

        {/* Featured Email Banner Card */}
        <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1c2333] to-[#161b22] border border-amber-500/35 hover:border-amber-400/70 transition-all shadow-xl max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div className="truncate">
              <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                {lang === "EN" ? "Official Direct Email" : "Kontak Email Resmi"}
              </span>
              <a
                href={`mailto:${EMAIL_ADDRESS}`}
                className="text-sm sm:text-base font-bold text-white hover:text-amber-300 transition-colors truncate block"
              >
                {EMAIL_ADDRESS}
              </a>
              <span className="text-xs text-[#8b949e]">
                {lang === "EN" ? "Open for client commissions & collaborations" : "Terbuka untuk pesanan website & kolaborasi"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={copyEmail}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-amber-500/50 text-xs font-semibold text-[#c9d1d9] hover:text-white transition-all shadow-sm"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">{lang === "EN" ? "Copied!" : "Tersalin!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#8b949e]" />
                  <span>{lang === "EN" ? "Copy" : "Salin"}</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${EMAIL_ADDRESS}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-black transition-all shadow-md shadow-amber-500/20"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{lang === "EN" ? "Send Email" : "Kirim Email"}</span>
            </a>
          </div>
        </div>

        {/* Social Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-md:gap-3 max-md:mb-9 mb-12">
          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@dhityavv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 max-md:p-3.5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-rose-500/50 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-between group"
          >
            <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 mb-3 group-hover:scale-110 transition-transform">
              <Video className="w-5 h-5 text-rose-400" />
            </div>
            <div className="text-sm font-bold text-white mb-0.5">TikTok</div>
            <div className="text-xs text-[#8b949e] font-mono mb-3">@dhityavv</div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A6FB5] group-hover:text-white transition-colors">
              {lang === "EN" ? "Visit Profile" : "Kunjungi Profil"} <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/dhityavv/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 max-md:p-3.5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-pink-500/50 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-between group"
          >
            <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 mb-3 group-hover:scale-110 transition-transform">
              <Camera className="w-5 h-5 text-pink-400" />
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Instagram</div>
            <div className="text-xs text-[#8b949e] font-mono mb-3">@dhityavv</div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A6FB5] group-hover:text-white transition-colors">
              {lang === "EN" ? "Visit Profile" : "Kunjungi Profil"} <ExternalLink className="w-3 h-3" />
            </span>
          </a>

          {/* Discord */}
          <button
            onClick={copyDiscord}
            className="p-5 max-md:p-3.5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-indigo-500/50 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-between group text-center w-full"
          >
            <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 mb-3 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5 text-indigo-400" />
            </div>
            <div className="text-sm font-bold text-white mb-0.5">Discord</div>
            <div className="text-xs text-[#8b949e] font-mono mb-3">@dhityavv</div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A6FB5] group-hover:text-white transition-colors">
              {copiedDiscord ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">{lang === "EN" ? "Copied!" : "Tersalin!"}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>{lang === "EN" ? "Copy Tag" : "Salin Tag"}</span>
                </>
              )}
            </span>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/Dhityavv"
            target="_blank"
            rel="noopener noreferrer"
            className="p-5 max-md:p-3.5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-between group"
          >
            <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 mb-3 group-hover:scale-110 transition-transform">
              <Code2 className="w-5 h-5 text-white" />
            </div>
            <div className="text-sm font-bold text-white mb-0.5">GitHub</div>
            <div className="text-xs text-[#8b949e] font-mono mb-3">Dhityavv</div>
            <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A6FB5] group-hover:text-white transition-colors">
              {lang === "EN" ? "Follow Profile" : "Kunjungi Repo"} <ExternalLink className="w-3 h-3" />
            </span>
          </a>
        </div>

        {/* Motto */}
        <div className="inline-flex items-center gap-2 text-sm text-[#8b949e] italic mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{lang === "EN" ? "Always learning, always building. ⚡" : "Selalu belajar, selalu berkarya. ⚡"}</span>
        </div>
      </div>
    </section>
  );
}
