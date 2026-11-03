"use client";

import React, { useState, useEffect } from "react";
import { Box, Layers, User, Sparkles, MessageSquare, ExternalLink, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { lang, setLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d1117]/85 backdrop-blur-md border-b border-[#30363d] py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      } max-md:py-3`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 max-md:px-3 flex items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center gap-2.5 max-md:gap-2 font-bold text-lg max-md:text-base tracking-tight text-white"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8A6FB5] to-[#5a3e85] flex items-center justify-center text-white shadow-md shadow-[#8A6FB5]/20 group-hover:scale-105 transition-transform">
            <Box className="w-4 h-4" />
          </div>
          <span>
            Dhitya<span className="text-[#8A6FB5]">.3D</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#8b949e]">
          <a
            href="#about"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <User className="w-4 h-4" /> {lang === "EN" ? "About" : "Tentang"}
          </a>
          <a
            href="#showcase"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" /> {lang === "EN" ? "3D Showcase" : "Galeri 3D"}
          </a>
          <a
            href="#projects"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <Box className="w-4 h-4" /> {lang === "EN" ? "Projects" : "Proyek"}
          </a>
          <a
            href="#skills"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> {lang === "EN" ? "Skills & Tools" : "Skill & Alat"}
          </a>
          <a
            href="#connect"
            className="hover:text-[#8A6FB5] transition-colors"
          >
            {lang === "EN" ? "Connect" : "Kontak"}
          </a>
        </nav>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Language Switcher Toggle EN / ID */}
          <div
            className="inline-flex items-center p-0.5 rounded-xl bg-[#161b22] border border-[#30363d] text-xs font-semibold shadow-inner"
            role="group"
            aria-label="Language selection"
          >
            <button
              onClick={() => setLang("EN")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                lang === "EN"
                  ? "bg-[#8A6FB5] text-white shadow-sm"
                  : "text-[#8b949e] hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ID")}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                lang === "ID"
                  ? "bg-[#8A6FB5] text-white shadow-sm"
                  : "text-[#8b949e] hover:text-white"
              }`}
            >
              ID
            </button>
          </div>

          <a
            href="https://wa.me/6289638194578"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 max-md:h-8 max-md:w-8 max-md:justify-center max-md:p-0 rounded-lg border border-emerald-500/40 bg-[#161b22] hover:bg-emerald-500/15 hover:border-emerald-400 text-xs font-semibold text-emerald-300 transition-all shadow-sm"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span className="max-md:hidden">WhatsApp</span>
            <ExternalLink className="w-3 h-3 text-emerald-400/70 max-md:hidden" />
          </a>
        </div>
      </div>
    </header>
  );
}
