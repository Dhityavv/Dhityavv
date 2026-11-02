"use client";

import React from "react";
import Link from "next/link";
import {
  Rocket,
  Sparkles,
  ExternalLink,
  Clock,
  Film,
  Globe,
  ArrowRight,
  BookOpen,
} from "lucide-react";
import { PROJECTS } from "@/lib/projects";

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
          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8A6FB5] to-[#71529e] hover:from-[#967cc2] hover:to-[#7e5eb0] text-xs font-semibold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all"
            >
              <span>Full Projects Hub</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <a
              href="https://github.com/Dhityavv?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/50 text-xs font-semibold text-white transition-colors"
            >
              <span>GitHub Repos</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#8A6FB5]" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 transition-all hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80">
                    {proj.id === "universal-chiseled-bookshelf" ? (
                      <BookOpen className="w-5 h-5 text-[#8A6FB5]" />
                    ) : proj.category === "Full-Stack Web" && proj.id === "filra" ? (
                      <Film className="w-5 h-5 text-[#8A6FB5]" />
                    ) : (
                      <Sparkles className="w-5 h-5 text-amber-400" />
                    )}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                      proj.status === "Live"
                        ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                        : proj.status === "In Progress"
                        ? "bg-[#8A6FB5]/15 border-[#8A6FB5]/40 text-[#c7b2e8]"
                        : proj.status === "Experimental"
                        ? "bg-sky-500/10 border-sky-500/30 text-sky-300"
                        : proj.status === "Under Review on Modrinth"
                        ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
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
                <span className="text-[11px] font-mono text-[#8b949e] block mb-1">
                  {proj.category}
                </span>
                <h3 className="text-lg font-bold text-white mb-1">{proj.title}</h3>
                <p className="text-[11px] text-[#8A6FB5] mb-2">{proj.subtitle}</p>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-4">
                  {proj.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {proj.techStack.map((t) => (
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
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#8A6FB5]/50 hover:bg-[#21262d] text-xs font-medium text-white transition-colors"
                  >
                    <span>View Repository</span>
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
                      <span>{proj.liveLabel ?? "Open the Website"}</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dedicated Projects Hub Action Banner */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1a202c] to-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#8A6FB5]/20 border border-[#8A6FB5]/40 flex items-center justify-center text-[#8A6FB5] shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Discover More Web & Creative Experiments
              </h4>
              <p className="text-xs text-[#8b949e]">
                Explore full interactive demos, architecture stack, features list, and upcoming roadmap.
              </p>
            </div>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/25 hover:shadow-[#8A6FB5]/40 transition-all shrink-0 hover:-translate-y-0.5"
          >
            <span>Open Projects Hub</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
