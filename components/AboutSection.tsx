"use client";

import React from "react";
import { User, GraduationCap, Box, Gamepad2, Zap, Palette, Compass } from "lucide-react";

export function AboutSection() {
  const details = [
    {
      icon: <User className="w-4 h-4 text-[#8A6FB5]" />,
      label: "Full Name",
      value: "Dhitya Nurhadi",
    },
    {
      icon: <GraduationCap className="w-4 h-4 text-[#8A6FB5]" />,
      label: "Role",
      value: "Animation Student (SMK) / Aspiring 3D Artist",
    },
    {
      icon: <Box className="w-4 h-4 text-[#8A6FB5]" />,
      label: "Focus",
      value: "3D Modeling, Medium-Poly Art, Environments",
    },
    {
      icon: <Gamepad2 className="w-4 h-4 text-[#8A6FB5]" />,
      label: "Also Into",
      value: "Gaming, Minecraft Modding, Anime & Manhwa",
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      label: "Currently",
      value: "Practicing Blender, tinkering with small AI-assisted projects",
    },
  ];

  return (
    <section id="about" className="py-16 border-t border-[#30363d]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#8A6FB5]/15 border border-[#8A6FB5]/30 flex items-center justify-center text-[#8A6FB5]">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              About Me
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e]">
              Vocational animation background, passions, and creative focus
            </p>
          </div>
        </div>

        {/* Equal height grid with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Bio text card */}
          <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8 relative overflow-hidden shadow-xl flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8A6FB5]/10 blur-3xl pointer-events-none rounded-full" />
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#8A6FB5]" />
                The Creative Journey
              </h3>
              <p className="text-sm sm:text-base leading-relaxed text-[#c9d1d9] mb-5">
                I&apos;m a vocational school student majoring in{" "}
                <span className="text-white font-medium underline decoration-[#8A6FB5] underline-offset-4">
                  Animation
                </span>
                . Most of my time goes into{" "}
                <span className="text-[#c7b2e8] font-semibold">
                  3D art in Blender
                </span>
                , and I love games, so I like making things that feel like they
                belong in one.
              </p>
              <p className="text-sm sm:text-base leading-relaxed text-[#8b949e] mb-6">
                Sometimes I also build small coding experiments with the help of
                AI, just to understand how things work and to have fun. Whether
                it&apos;s crafting low/medium-poly architecture, sculpting lush
                game environments, or experimenting with procedural tools, I&apos;m
                always learning.
              </p>
            </div>

            <div className="pt-4 border-t border-[#30363d]/80 flex flex-wrap gap-2 text-xs mt-auto">
              <span className="px-3 py-1.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                📍 Vocational High School (SMK)
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                🎮 Game Environment Art
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                ⚡ AI-Assisted Prototyping
              </span>
            </div>
          </div>

          {/* Quick Info Table - equal height */}
          <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col justify-between h-full">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8b949e] mb-4">
                Quick Profile
              </h3>
              <div className="space-y-3">
                {details.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/60 flex items-start gap-3 transition-colors hover:border-[#8A6FB5]/40"
                  >
                    <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-[#161b22]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-[#8b949e] font-medium">
                        {item.label}
                      </div>
                      <div className="text-sm font-semibold text-white mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#30363d]/60 mt-4 flex items-center justify-between text-xs text-[#8b949e]">
              <span>Location: Indonesia</span>
              <span className="text-[#8A6FB5] font-semibold">Active Student</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
