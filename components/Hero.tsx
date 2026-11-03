"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, Box, Sparkles, Gamepad2, Eye, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const TYPING_LINES_EN = [
  "Animation student in vocational school",
  "Building medium-poly worlds in Blender",
  "Gamer | Minecraft tinkerer",
  "Building modern web apps & client websites",
];

const TYPING_LINES_ID = [
  "Siswa SMK jurusan Animasi",
  "Membangun dunia medium-poly di Blender",
  "Gamer | Penggemar modding Minecraft",
  "Membangun web app modern & website klien",
];

export function Hero() {
  const { lang } = useLanguage();
  const typingLines = lang === "EN" ? TYPING_LINES_EN : TYPING_LINES_ID;

  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Reset typewriter when language changes
  useEffect(() => {
    setLineIndex(0);
    setDisplayedText("");
    setIsDeleting(false);
  }, [lang]);

  useEffect(() => {
    const currentLine = typingLines[lineIndex] || typingLines[0];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentLine.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentLine.substring(0, displayedText.length + 1));
        }, 50);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentLine.substring(0, displayedText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % typingLines.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, lineIndex, typingLines]);

  return (
    <section id="hero" className="relative pt-24 pb-16 max-md:pt-24 max-md:pb-12 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#8A6FB5]/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 max-md:px-4 relative z-10 text-center">
        {/* Profile Status Badge */}
        <div className="inline-flex items-center gap-2 max-md:gap-1.5 px-3 max-md:px-2.5 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs max-md:text-[10px] font-medium text-[#c9d1d9] mb-6 max-md:mb-5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Status:</span>
          <span className="text-[#8A6FB5] font-semibold">
            {lang === "EN" ? "Learning & Creating" : "Belajar & Berkarya"}
          </span>
          <span className="text-[#8b949e]">· {lang === "EN" ? "SMK Animation" : "SMK Animasi"}</span>
        </div>

        {/* Big Name Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl max-md:text-[2.35rem] max-md:leading-[1.08] font-extrabold tracking-tight text-white mb-4 max-md:mb-3">
          {lang === "EN" ? "Hi, I'm" : "Halo, Saya"}{" "}
          <span className="bg-gradient-to-r from-white via-[#8A6FB5] to-[#c7b2e8] bg-clip-text text-transparent">
            Dhitya Nurhadi
          </span>
        </h1>

        {/* Subtitle Roles */}
        <p className="text-lg sm:text-xl max-md:text-base font-medium text-[#8b949e] mb-6 max-md:mb-4 flex flex-wrap items-center justify-center gap-2 max-md:gap-1.5">
          <span className="text-[#c9d1d9]">3D Artist</span>
          <span>·</span>
          <span className="text-[#c9d1d9]">Gamer</span>
          <span>·</span>
          <span className="text-[#c9d1d9]">Tinkerer</span>
        </p>

        {/* Animated Typewriter Box */}
        <div className="min-h-[44px] max-md:min-h-[52px] flex items-center justify-center mb-8 max-md:mb-6">
          <div className="inline-flex max-w-full items-center gap-2 max-md:gap-1.5 bg-[#161b22]/90 border border-[#30363d] px-5 max-md:px-3 py-2.5 rounded-xl text-sm sm:text-base max-md:text-xs font-mono text-[#8A6FB5] shadow-inner">
            <Sparkles className="w-4 h-4 text-[#8A6FB5] shrink-0" />
            <span className="font-semibold text-white/90 break-words">{displayedText}</span>
            <span className="w-2 h-4 bg-[#8A6FB5] animate-pulse inline-block" />
          </div>
        </div>

        {/* Quick Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-md:gap-2 mb-10 max-md:mb-7">
          <div className="flex items-center gap-2 max-md:gap-1.5 px-3 max-md:px-2.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs max-md:text-[10px] font-semibold text-white">
            <Box className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>Blender 3D</span>
          </div>
          <div className="flex items-center gap-2 max-md:gap-1.5 px-3 max-md:px-2.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs max-md:text-[10px] font-semibold text-white">
            <span className="text-[#8A6FB5]">#</span>
            <span>{lang === "EN" ? "Medium-Poly Worlds" : "Dunia Medium-Poly"}</span>
          </div>
          <div className="flex items-center gap-2 max-md:gap-1.5 px-3 max-md:px-2.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs max-md:text-[10px] font-semibold text-white">
            <Gamepad2 className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>Minecraft Modding</span>
          </div>
          <div className="flex items-center gap-2 max-md:gap-1.5 px-3 max-md:px-2.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs max-md:text-[10px] font-semibold text-white">
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>{lang === "EN" ? "Web & Client Showcase" : "Karya Web & Klien"}</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 max-md:gap-2.5">
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 px-6 py-3 max-md:px-4 max-md:py-2.5 max-md:w-full max-md:max-w-xs max-md:justify-center rounded-xl bg-gradient-to-r from-[#8A6FB5] to-[#71529e] hover:from-[#967cc2] hover:to-[#7e5eb0] text-white font-semibold text-sm transition-all shadow-lg shadow-[#8A6FB5]/25 hover:shadow-[#8A6FB5]/40 hover:-translate-y-0.5"
          >
            <Eye className="w-4 h-4" />
            <span>{lang === "EN" ? "View 3D Renders" : "Lihat Render 3D"}</span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 max-md:px-4 max-md:py-2.5 max-md:w-full max-md:max-w-xs max-md:justify-center rounded-xl bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] hover:border-[#8A6FB5]/50 text-[#c9d1d9] font-medium text-sm transition-all hover:-translate-y-0.5"
          >
            <span>{lang === "EN" ? "About Me" : "Tentang Saya"}</span>
            <ArrowDown className="w-4 h-4 text-[#8b949e]" />
          </a>
        </div>
      </div>
    </section>
  );
}
