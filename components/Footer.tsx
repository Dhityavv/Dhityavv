"use client";

import React from "react";
import { ArrowUp, Box, Heart } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[#30363d] bg-[#0d1117] pt-12 pb-16 overflow-hidden">
      {/* Decorative gradient wave line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#8A6FB5] to-transparent opacity-70" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#8A6FB5] to-[#5a3e85] flex items-center justify-center text-white shadow-md shadow-[#8A6FB5]/20">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              Dhitya<span className="text-[#8A6FB5]">.3D</span>
            </div>
            <div className="text-xs text-[#8b949e]">
              3D Artist · Gamer · Tinkerer
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#8b949e]">
          <span>Crafted with</span>
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>for 3D Art & Animation</span>
        </div>

        <button
          onClick={scrollToTop}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8b949e] hover:text-white hover:border-[#8A6FB5]/50 transition-colors"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5 text-[#8A6FB5]" />
        </button>
      </div>
    </footer>
  );
}
