"use client";

import React, { useState } from "react";
import { BarChart3, Code2, Flame, Star, GitCommit, Copy, Check } from "lucide-react";

export function GitHubStatsSection() {
  const [copied, setCopied] = useState(false);

  const copyUsername = () => {
    navigator.clipboard.writeText("Dhityavv");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="stats" className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
              <BarChart3 className="w-4 h-4" />
              <span>Developer Activity</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              GitHub Stats & Streaks
            </h2>
            <p className="text-sm text-[#8b949e] mt-1">
              Live statistics and contribution badges from @Dhityavv
            </p>
          </div>

          <div className="flex items-center gap-2 max-md:flex-wrap">
            <button
              onClick={copyUsername}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#c9d1d9] hover:text-white hover:border-[#8A6FB5]/50 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Copied Username</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#8b949e]" />
                  <span>Copy @Dhityavv</span>
                </>
              )}
            </button>
            <a
              href="https://github.com/Dhityavv"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-semibold text-white transition-colors shadow-sm"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Follow on GitHub</span>
            </a>
          </div>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-md:gap-4 max-md:mb-4 mb-6">
          {/* Card 1: Main Stats */}
          <div className="p-6 max-md:p-4 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col items-center justify-center text-center shadow-lg overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-[#30363d]/60 text-xs font-semibold text-[#8b949e]">
              <span className="flex items-center gap-1.5 text-white">
                <GitCommit className="w-4 h-4 text-[#8A6FB5]" />
                Repository Overview
              </span>
              <span className="text-[#8A6FB5] font-mono">@Dhityavv</span>
            </div>
            <div className="w-full flex justify-center py-2">
              <img
                src="https://github-stats-extended.vercel.app/api?username=Dhityavv&show_icons=true&hide_border=false&bg_color=0D1117&title_color=8A6FB5&icon_color=8A6FB5&text_color=C9D1D9&border_color=30363D"
                alt="Dhitya GitHub stats"
                className="max-w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>

          {/* Card 2: Top Languages */}
          <div className="p-6 max-md:p-4 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col items-center justify-center text-center shadow-lg overflow-hidden">
            <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-[#30363d]/60 text-xs font-semibold text-[#8b949e]">
              <span className="flex items-center gap-1.5 text-white">
                <Star className="w-4 h-4 text-[#8A6FB5]" />
                Top Languages
              </span>
              <span className="text-[#8b949e]">Usage Breakdown</span>
            </div>
            <div className="w-full flex justify-center py-2">
              <img
                src="https://github-stats-extended.vercel.app/api/top-langs/?username=Dhityavv&layout=compact&bg_color=0D1117&title_color=8A6FB5&text_color=C9D1D9&border_color=30363D"
                alt="Dhitya Top Languages"
                className="max-w-full h-auto rounded-lg"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Streak Stats */}
        <div className="p-6 max-md:p-4 rounded-2xl bg-[#161b22] border border-[#30363d] flex flex-col items-center justify-center text-center shadow-lg">
          <div className="w-full flex items-center justify-between pb-4 mb-4 border-b border-[#30363d]/60 text-xs font-semibold text-[#8b949e]">
            <span className="flex items-center gap-1.5 text-white">
              <Flame className="w-4 h-4 text-orange-400" />
              Contribution Streak
            </span>
            <span className="text-emerald-400 font-mono">Keep Building</span>
          </div>
          <div className="w-full flex justify-center py-2">
            <img
              src="https://streak-stats.demolab.com?user=Dhityavv&background=0D1117&stroke=30363D&ring=8A6FB5&fire=8A6FB5&currStreakNum=FFFFFF&sideNums=FFFFFF&currStreakLabel=8A6FB5&sideLabels=C9D1D9&dates=8B949E&border=30363D"
              alt="Dhitya Streak stats"
              className="max-w-full h-auto rounded-lg"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
