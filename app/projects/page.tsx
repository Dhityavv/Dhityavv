"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Rocket,
  Film,
  Gamepad2,
  Sparkles,
  ExternalLink,
  Globe,
  Clock,
  Search,
  CheckCircle2,
  Layers,
  Code2,
  BookOpen,
} from "lucide-react";
import { PROJECTS as ALL_PROJECTS } from "@/lib/projects";

const CATEGORIES = ["All Projects", "Full-Stack Web", "Game Modding"];

export default function ProjectsHubPage() {
  const [activeCategory, setActiveCategory] = useState<string>("All Projects");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredProjects = ALL_PROJECTS.filter((proj) => {
    const matchesCat =
      activeCategory === "All Projects" || proj.category === activeCategory;
    const matchesSearch =
      searchQuery.trim() === "" ||
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.techStack.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col selection:bg-[#8A6FB5]/30 selection:text-white">
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/85 backdrop-blur-md border-b border-[#30363d] py-3.5 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 text-xs font-semibold text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#8A6FB5]" />
              <span>Back to Portfolio</span>
            </Link>
            <span className="text-[#30363d] hidden sm:inline">/</span>
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#8b949e]">
              <Rocket className="w-3.5 h-3.5 text-[#8A6FB5]" />
              <span className="font-semibold text-white">Dhitya Nurhadi</span>
              <span>· Projects Directory</span>
            </div>
          </div>

          <a
            href="https://github.com/Dhityavv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-[#8A6FB5] hover:text-white transition-colors"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Hero Section */}
        <div className="mb-12 text-center max-w-3xl mx-auto relative">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#8A6FB5]/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8A6FB5] mb-4">
            <Rocket className="w-3.5 h-3.5" />
            <span>Dedicated Projects & Engineering Lab</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Projects & Practice Builds
          </h1>
          <p className="text-sm sm:text-base text-[#8b949e] leading-relaxed">
            Full-stack web applications, 3D environment scenes, and game modding
            experiments built by{" "}
            <span className="text-white font-medium">Dhitya Nurhadi</span>.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-2.5 rounded-2xl bg-[#161b22] border border-[#30363d] mb-10 shadow-lg">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeCategory === cat
                    ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/25"
                    : "text-[#8b949e] hover:text-white hover:bg-[#0d1117]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8b949e]" />
            <input
              type="text"
              placeholder="Search tech or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#0d1117] border border-[#30363d] rounded-xl text-white placeholder-[#8b949e] focus:outline-none focus:border-[#8A6FB5]"
            />
          </div>
        </div>

        {/* Projects List Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className={`p-7 rounded-3xl bg-[#161b22] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                proj.featured
                  ? "border-[#8A6FB5]/60 hover:border-[#8A6FB5] shadow-lg shadow-[#8A6FB5]/5"
                  : "border-[#30363d] hover:border-[#8A6FB5]/50"
              }`}
            >
              <div>
                {/* Header row */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d]">
                      {proj.id === "universal-chiseled-bookshelf" ? (
                        <BookOpen className="w-5 h-5 text-[#8A6FB5]" />
                      ) : proj.category === "Full-Stack Web" ? (
                        <Film className="w-5 h-5 text-[#8A6FB5]" />
                      ) : (
                        <Gamepad2 className="w-5 h-5 text-emerald-400" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-mono text-[#8b949e] block">
                        {proj.category}
                      </span>
                      <h3 className="text-xl font-bold text-white">{proj.title}</h3>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${
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

                <p className="text-sm text-[#c9d1d9] leading-relaxed mb-5">
                  {proj.description}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6 p-4 rounded-2xl bg-[#0d1117] border border-[#30363d]/70 text-xs">
                  <span className="font-semibold text-white block mb-1">
                    Key Highlights & Features:
                  </span>
                  {proj.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[#8b949e]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6FB5] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {proj.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-lg bg-[#0d1117] border border-[#30363d] text-[11px] font-mono text-[#c7b2e8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions row */}
                <div className="pt-4 border-t border-[#30363d]/60 flex items-center gap-3">
                  <a
                    href={proj.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#8A6FB5]/60 hover:bg-[#21262d] text-xs font-semibold text-white transition-all shadow-sm"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#8A6FB5]" />
                    <span>View Repository</span>
                    <ExternalLink className="w-3 h-3 text-[#8b949e]" />
                  </a>

                  {proj.liveUrl && (
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>{proj.liveLabel ?? "Open the Website"}</span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#30363d] bg-[#0d1117] py-8 text-center text-xs text-[#8b949e]">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5 text-[#8A6FB5]" />
            <span>Return to Portfolio</span>
          </Link>
          <span>Projects Directory · Dhitya Nurhadi</span>
        </div>
      </footer>
    </div>
  );
}
