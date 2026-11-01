"use client";

import React from "react";
import { Rocket, Box, Gamepad2, Sparkles, ExternalLink, Clock, Film, Globe } from "lucide-react";

interface ProjectItem {
  title: string;
  category: string;
  status: "Live" | "In Progress" | "Coming Soon" | "Experimental";
  description: string;
  icon: React.ReactNode;
  tags: string[];
  link: string;
  liveUrl?: string;
}

const PROJECTS: ProjectItem[] = [
  {
    title: "Filra",
    category: "Full-Stack Web App",
    status: "Live",
    description:
      "A responsive movie discovery and rating web application built with Next.js, TMDB API, Clerk Auth, and Supabase database. Browse films, track ratings, and sync personal watchlists.",
    icon: <Film className="w-5 h-5 text-[#8A6FB5]" />,
    tags: ["Next.js", "TMDB", "Clerk", "Supabase", "Tailwind CSS"],
    link: "https://github.com/Dhityavv/Filra",
    liveUrl: "https://filra.vercel.app",
  },
  {
    title: "Medium-Poly Low Fantasy World",
    category: "3D Environment",
    status: "In Progress",
    description:
      "A complete stylized cliff and waterfall environment built using Blender Geometry Nodes with custom shaders and atmospheric lighting.",
    icon: <Box className="w-5 h-5 text-[#8A6FB5]" />,
    tags: ["Blender", "Geometry Nodes", "Stylized 3D"],
    link: "https://github.com/Dhityavv",
  },
  {
    title: "Fabric Custom Performance Modpack",
    category: "Minecraft Modding",
    status: "Experimental",
    description:
      "Tuned Minecraft Fabric configuration focused on rendering optimization, sodium-based shaders, and visual fidelity.",
    icon: <Gamepad2 className="w-5 h-5 text-emerald-400" />,
    tags: ["Fabric", "Minecraft", "Optimization"],
    link: "https://github.com/Dhityavv",
  },
  {
    title: "AI-Assisted Web & 3D Interactive Lab",
    category: "Web & AI",
    status: "Coming Soon",
    description:
      "Interactive 3D web experiments powered by WebGL and AI prototyping to showcase animations and game assets in browser.",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
    tags: ["Next.js", "AI Prototyping", "3D Web"],
    link: "https://github.com/Dhityavv",
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="py-16 border-t border-[#30363d]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
              <Rocket className="w-4 h-4" />
              <span>Exploration & Code</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Small Projects & Experiments
            </h2>
            <p className="text-sm text-[#8b949e] mt-1">
              Little experiments and practice builds. Nothing huge, just things I
              learn from.
            </p>
          </div>
          <a
            href="https://github.com/Dhityavv?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/50 text-xs font-semibold text-white transition-colors"
          >
            <span>View All Repositories</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#8A6FB5]" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80">
                    {proj.icon}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      proj.status === "Live"
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                        : proj.status === "In Progress"
                        ? "bg-[#8A6FB5]/15 border-[#8A6FB5]/40 text-[#c7b2e8]"
                        : proj.status === "Experimental"
                        ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                        : "bg-[#21262d] border-[#30363d] text-[#8b949e]"
                    }`}
                  >
                    {proj.status === "Live" ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    ) : (
                      <Clock className="w-3 h-3" />
                    )}
                    {proj.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{proj.title}</h3>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-4">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d]/80 text-[10px] text-[#8b949e]"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#8A6FB5]/50 hover:bg-[#21262d] text-xs font-medium text-white transition-colors"
                  >
                    <span>Repo</span>
                    <ExternalLink className="w-3 h-3 text-[#8b949e]" />
                  </a>
                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-semibold text-white transition-colors shadow-sm"
                    >
                      <Globe className="w-3 h-3" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
