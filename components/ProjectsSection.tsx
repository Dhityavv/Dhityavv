"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Rocket,
  ExternalLink,
  Clock,
  Film,
  Globe,
  ArrowRight,
  BookOpen,
  Box,
  Gamepad2,
  Eye,
  ShieldCheck,
  Code2,
} from "lucide-react";
import { PROJECTS, ProjectDetail } from "@/lib/projects";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";
import { DeployedWebsitesModal } from "@/components/DeployedWebsitesModal";
import { useLanguage } from "@/lib/LanguageContext";

export function ProjectsSection() {
  const { lang } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [isWebsitesModalOpen, setIsWebsitesModalOpen] = useState(false);

  const clientShowcaseProject = PROJECTS.find((p) => p.id === "client-showcase") || null;

  return (
    <section id="projects" className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 max-md:mb-7">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
              <Rocket className="w-4 h-4" />
              <span>
                {lang === "EN" ? "Full-Stack Web & Creative Engineering" : "Rekayasa Web & Kreasi Digital"}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lang === "EN" ? "Featured Projects & Web Showcase" : "Proyek Unggulan & Showcase Web"}
            </h2>
            <p className="text-sm text-[#8b949e] mt-1">
              {lang === "EN"
                ? "Real client websites in production, browser 3D tools, 2.5D web game, and game modding."
                : "Website klien nyata yang aktif digunakan, alat 3D browser, game web 2.5D, dan modifikasi game."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Link
              href="/projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#8A6FB5] to-[#71529e] hover:from-[#967cc2] hover:to-[#7e5eb0] text-xs font-semibold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all"
            >
              <span>{lang === "EN" ? "Full Projects Hub" : "Buka Projects Hub"}</span>
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

        {/* Projects Cards Grid */}
        <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto -mx-4 px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3">
          {PROJECTS.map((proj) => {
            const isClientShowcase = proj.id === "client-showcase";

            const projTitle =
              lang === "EN" ? proj.titleEn || proj.title : proj.titleId || proj.title;
            const projSubtitle =
              lang === "EN" ? proj.subtitleEn || proj.subtitle : proj.subtitleId || proj.subtitle;
            const projDesc =
              lang === "EN" ? proj.descriptionEn || proj.description : proj.descriptionId || proj.description;

            return (
              <div
                key={proj.id}
                className={`w-[86vw] max-w-[360px] shrink-0 snap-start sm:w-auto sm:max-w-none p-6 max-md:p-4 rounded-2xl bg-[#161b22] border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between ${
                  isClientShowcase
                    ? "border-emerald-500/40 hover:border-emerald-400/80 shadow-lg shadow-emerald-500/5"
                    : "border-[#30363d] hover:border-[#8A6FB5]/60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80">
                      {isClientShowcase ? (
                        <Globe className="w-5 h-5 text-emerald-400" />
                      ) : proj.id === "orbitry" ? (
                        <Box className="w-5 h-5 text-[#8A6FB5]" />
                      ) : proj.id === "rimba" ? (
                        <Gamepad2 className="w-5 h-5 text-emerald-400" />
                      ) : proj.id === "universal-chiseled-bookshelf" ? (
                        <BookOpen className="w-5 h-5 text-amber-400" />
                      ) : (
                        <Film className="w-5 h-5 text-[#8A6FB5]" />
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {isClientShowcase && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300">
                          <ShieldCheck className="w-3 h-3 text-emerald-400" />
                          <span>{lang === "EN" ? "In Production" : "Sudah Digunakan"}</span>
                        </span>
                      )}

                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                          proj.status === "Live"
                            ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                            : proj.status === "In Progress"
                            ? "bg-[#8A6FB5]/15 border-[#8A6FB5]/40 text-[#c7b2e8]"
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
                  </div>

                  <span className="text-[11px] font-mono text-[#8b949e] block mb-1">
                    {proj.category}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-1 leading-snug">
                    {projTitle}
                  </h3>
                  <p className="text-[11px] text-[#8A6FB5] mb-2 leading-relaxed">
                    {projSubtitle}
                  </p>
                  <p className="text-xs text-[#8b949e] leading-relaxed mb-4 line-clamp-3">
                    {projDesc}
                  </p>
                </div>

                <div>
                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {proj.techStack.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#0d1117] border border-[#30363d]/80 text-[10px] text-[#8b949e]"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 rounded bg-[#0d1117] border border-[#30363d]/80 text-[10px] text-[#8A6FB5]">
                        +{proj.techStack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Primary Button: View GUI Details */}
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="w-full mb-2.5 inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-[#8A6FB5]/15 hover:bg-[#8A6FB5]/25 border border-[#8A6FB5]/40 hover:border-[#8A6FB5] text-[#c7b2e8] hover:text-white text-xs font-semibold transition-all shadow-sm group"
                  >
                    <Eye className="w-3.5 h-3.5 text-[#8A6FB5] group-hover:scale-110 transition-transform" />
                    <span>{lang === "EN" ? "View GUI Details" : "Lihat GUI Detail"}</span>
                  </button>

                  {/* Actions Row */}
                  <div className="flex items-center gap-2">
                    {isClientShowcase ? (
                      /* Cleaned up symmetrical buttons for Project Showcase */
                      <>
                        <button
                          onClick={() => setIsWebsitesModalOpen(true)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0d1117] border border-emerald-500/40 hover:border-emerald-400 text-xs font-medium text-emerald-300 hover:text-white hover:bg-[#21262d] transition-all"
                        >
                          <Globe className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{lang === "EN" ? "Client Sites" : "Daftar Website"}</span>
                        </button>

                        <a
                          href="https://kejuuanimator-portfolio.vercel.app"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-semibold text-white transition-colors shadow-sm"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>{lang === "EN" ? "Open Website" : "Buka Website"}</span>
                        </a>
                      </>
                    ) : (
                      <>
                        <a
                          href={proj.repoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0d1117] border border-[#30363d] hover:border-[#8A6FB5]/50 hover:bg-[#21262d] text-xs font-medium text-white transition-colors"
                        >
                          <Code2 className="w-3 h-3 text-[#8A6FB5]" />
                          <span>{lang === "EN" ? "Repository" : "Repo"}</span>
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
                            <span>
                              {lang === "EN"
                                ? proj.liveLabelEn || "Open Demo"
                                : proj.liveLabelId || "Buka Website"}
                            </span>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Dedicated Projects Hub Action Banner */}
        <div className="mt-8 max-md:mt-5 p-6 max-md:p-4 rounded-2xl bg-gradient-to-r from-[#161b22] via-[#1a202c] to-[#161b22] border border-[#30363d] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-[#8A6FB5]/20 border border-[#8A6FB5]/40 flex items-center justify-center text-[#8A6FB5] shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                {lang === "EN"
                  ? "Explore Full Archive of Web & Modding Projects"
                  : "Temukan Lebih Banyak Proyek Web & Modding"}
              </h4>
              <p className="text-xs text-[#8b949e]">
                {lang === "EN"
                  ? "Explore full interactive demos, system architecture stack, features list, and upcoming roadmap."
                  : "Eksplorasi arsip proyek lengkap, arsitektur teknis, filter kategori, dan status pengembangan."}
              </p>
            </div>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 max-md:w-full max-md:justify-center rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/25 hover:shadow-[#8A6FB5]/40 transition-all shrink-0 hover:-translate-y-0.5"
          >
            <span>{lang === "EN" ? "Open Projects Hub" : "Buka Projects Hub"}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* GUI Detail Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Deployed Websites List Modal */}
      <DeployedWebsitesModal
        isOpen={isWebsitesModalOpen}
        onClose={() => setIsWebsitesModalOpen(false)}
        onOpenMockup={() => {
          setIsWebsitesModalOpen(false);
          setSelectedProject(clientShowcaseProject);
        }}
      />
    </section>
  );
}
