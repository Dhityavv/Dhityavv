"use client";

import React, { useState, useEffect } from "react";
import { Box, Layers, User, Sparkles, Code2, ExternalLink } from "lucide-react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

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
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
        <a
          href="#hero"
          className="group flex items-center gap-2.5 font-bold text-lg tracking-tight text-white"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8A6FB5] to-[#5a3e85] flex items-center justify-center text-white shadow-md shadow-[#8A6FB5]/20 group-hover:scale-105 transition-transform">
            <Box className="w-4 h-4" />
          </div>
          <span>
            Dhitya<span className="text-[#8A6FB5]">.3d</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#8b949e]">
          <a
            href="#about"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <User className="w-4 h-4" /> About
          </a>
          <a
            href="#showcase"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <Layers className="w-4 h-4" /> 3D Showcase
          </a>
          <a
            href="#projects"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <Box className="w-4 h-4" /> Projects
          </a>
          <a
            href="#skills"
            className="hover:text-[#8A6FB5] transition-colors flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4" /> Skills & Tools
          </a>
          <a
            href="#stats"
            className="hover:text-[#8A6FB5] transition-colors"
          >
            Stats
          </a>
          <a
            href="#connect"
            className="hover:text-[#8A6FB5] transition-colors"
          >
            Connect
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Dhityavv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#8A6FB5]/50 text-xs font-semibold text-white transition-all shadow-sm"
          >
            <Code2 className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3 text-[#8b949e]" />
          </a>
        </div>
      </div>
    </header>
  );
}
