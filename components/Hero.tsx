"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ArrowDown, Box, Sparkles, Gamepad2, Eye } from "lucide-react";

const TYPING_LINES = [
  "Animation student @ vocational school",
  "Building medium-poly worlds in Blender",
  "Gamer | Minecraft tinkerer",
  "Learning by building small projects with AI",
];

export function Hero() {
  const [lineIndex, setLineIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentLine = TYPING_LINES[lineIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayedText.length < currentLine.length) {
        timer = setTimeout(() => {
          setDisplayedText(currentLine.substring(0, displayedText.length + 1));
        }, 50);
      } else {
        // Finished typing current line, pause before deleting
        timer = setTimeout(() => setIsDeleting(true), 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(currentLine.substring(0, displayedText.length - 1));
        }, 25);
      } else {
        setIsDeleting(false);
        setLineIndex((prev) => (prev + 1) % TYPING_LINES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, lineIndex]);

  return (
    <section id="hero" className="relative pt-24 pb-16 overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-[#8A6FB5]/15 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Profile Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-medium text-[#c9d1d9] mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Status:</span>
          <span className="text-[#8A6FB5] font-semibold">Learning & Creating</span>
          <span className="text-[#8b949e]">· SMK Animation</span>
        </div>

        {/* Big Name Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4">
          Hi, I&apos;m{" "}
          <span className="bg-gradient-to-r from-white via-[#8A6FB5] to-[#c7b2e8] bg-clip-text text-transparent">
            Dhitya
          </span>
        </h1>

        {/* Subtitle Roles */}
        <p className="text-lg sm:text-xl font-medium text-[#8b949e] mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="text-[#c9d1d9]">3D Artist</span>
          <span>·</span>
          <span className="text-[#c9d1d9]">Gamer</span>
          <span>·</span>
          <span className="text-[#c9d1d9]">Tinkerer</span>
        </p>

        {/* Animated Typewriter Box */}
        <div className="min-h-[44px] flex items-center justify-center mb-8">
          <div className="inline-flex items-center gap-2 bg-[#161b22]/90 border border-[#30363d] px-5 py-2.5 rounded-xl text-sm sm:text-base font-mono text-[#8A6FB5] shadow-inner">
            <Sparkles className="w-4 h-4 text-[#8A6FB5] shrink-0" />
            <span className="font-semibold text-white/90">{displayedText}</span>
            <span className="w-2 h-4 bg-[#8A6FB5] animate-pulse inline-block" />
          </div>
        </div>

        {/* Quick Badges matching README */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-semibold text-white">
            <Box className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>Blender 3D</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-semibold text-white">
            <span className="text-[#8A6FB5]">#</span>
            <span>Medium-Poly Worlds</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-semibold text-white">
            <Gamepad2 className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>Minecraft Modding</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-semibold text-white">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Experiments</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="#showcase"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8A6FB5] to-[#71529e] hover:from-[#967cc2] hover:to-[#7e5eb0] text-white font-semibold text-sm transition-all shadow-lg shadow-[#8A6FB5]/25 hover:shadow-[#8A6FB5]/40 hover:-translate-y-0.5"
          >
            <Eye className="w-4 h-4" />
            <span>View 3D Renders</span>
          </a>
          <a
            href="#about"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#161b22] border border-[#30363d] hover:bg-[#21262d] hover:border-[#8A6FB5]/50 text-[#c9d1d9] font-medium text-sm transition-all hover:-translate-y-0.5"
          >
            <span>About Me</span>
            <ArrowDown className="w-4 h-4 text-[#8b949e]" />
          </a>
        </div>
      </div>
    </section>
  );
}
