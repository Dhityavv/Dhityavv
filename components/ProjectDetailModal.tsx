"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ExternalLink,
  Globe,
  Code2,
  CheckCircle2,
  Layers,
  Sparkles,
  Clock,
  Laptop,
  Eye,
  Film,
  BookOpen,
  Gamepad2,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Box,
  Check,
  Play,
  RotateCw,
  Pause,
} from "lucide-react";
import { ProjectDetail, DEPLOYED_CLIENT_WEBSITES } from "@/lib/projects";
import { useLanguage } from "@/lib/LanguageContext";

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  initialTab?: "overview" | "preview" | "architecture" | "deliverables" | "websites";
}

export function ProjectDetailModal({
  project,
  onClose,
  initialTab = "overview",
}: ProjectDetailModalProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    "overview" | "preview" | "architecture" | "deliverables" | "websites"
  >(initialTab);

  // Live iframe state for Juna's portfolio with paused videos
  const [junaIframeDoc, setJunaIframeDoc] = useState<string | null>(null);
  const [isLoadingIframe, setIsLoadingIframe] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  // Prevent background scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  // Reset tab when project changes
  useEffect(() => {
    setActiveTab(initialTab);
  }, [project?.id, initialTab]);

  // Fetch real website HTML for Juna portfolio and pause videos by default
  useEffect(() => {
    if (project?.id !== "client-showcase") return;

    let isMounted = true;
    setIsLoadingIframe(true);

    fetch("https://kejuuanimator-portfolio.vercel.app")
      .then((res) => res.text())
      .then((html) => {
        if (!isMounted) return;

        // 1. Add base href so all relative assets (images, CSS, JS, fonts) resolve properly to Vercel
        let modifiedHtml = html.replace(
          "<head>",
          `<head><base href="https://kejuuanimator-portfolio.vercel.app/">`
        );

        // 2. Remove autoplay attribute from all <video> tags so they don't load/play heavy data automatically
        modifiedHtml = modifiedHtml.replace(
          /<video([^>]*)autoplay/gi,
          "<video$1"
        );

        // 3. Inject pause script to guarantee all videos remain paused by default for memory savings
        const pauseScript = `
          <script>
            function forcePauseVideos() {
              try {
                var vids = document.querySelectorAll('video');
                vids.forEach(function(v) {
                  v.removeAttribute('autoplay');
                  v.autoplay = false;
                  v.pause();
                });
              } catch(e) {}
            }
            window.addEventListener('load', forcePauseVideos);
            document.addEventListener('DOMContentLoaded', forcePauseVideos);
            // Run on interval for the first few seconds to catch lazy video inits
            var timer = setInterval(forcePauseVideos, 500);
            setTimeout(function() { clearInterval(timer); }, 4000);
          </script>
        `;

        if (modifiedHtml.includes("</body>")) {
          modifiedHtml = modifiedHtml.replace("</body>", `${pauseScript}</body>`);
        } else {
          modifiedHtml += pauseScript;
        }

        setJunaIframeDoc(modifiedHtml);
        setIsLoadingIframe(false);
      })
      .catch(() => {
        if (!isMounted) return;
        // If fetch fails (e.g. offline), fallback will be standard iframe
        setIsLoadingIframe(false);
      });

    return () => {
      isMounted = false;
    };
  }, [project?.id, iframeKey]);

  if (!project) return null;

  const isClientShowcase = project.id === "client-showcase";
  const isOrbitry = project.id === "orbitry";
  const isRimba = project.id === "rimba";

  const reloadIframe = () => {
    setIsLoadingIframe(true);
    setIframeKey((prev) => prev + 1);
  };

  const title = lang === "EN" ? project.titleEn || project.title : project.titleId || project.title;
  const subtitle =
    lang === "EN" ? project.subtitleEn || project.subtitle : project.subtitleId || project.subtitle;
  const description =
    lang === "EN"
      ? project.descriptionEn || project.description
      : project.descriptionId || project.description;
  const longOverview =
    lang === "EN"
      ? project.longOverviewEn || project.longOverview || description
      : project.longOverviewId || project.longOverview || description;
  const features =
    lang === "EN" ? project.featuresEn || project.features : project.featuresId || project.features;
  const archPoints =
    lang === "EN"
      ? project.architecturePointsEn || project.architecturePoints || []
      : project.architecturePointsId || project.architecturePoints || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-[#30363d] rounded-2xl sm:rounded-3xl max-w-5xl w-full max-h-[94dvh] flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]/85 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center shrink-0">
              {isClientShowcase ? (
                <Globe className="w-5 h-5 text-emerald-400" />
              ) : isOrbitry ? (
                <Box className="w-5 h-5 text-[#8A6FB5]" />
              ) : isRimba ? (
                <Gamepad2 className="w-5 h-5 text-emerald-400" />
              ) : project.id === "filra" ? (
                <Film className="w-5 h-5 text-[#8A6FB5]" />
              ) : (
                <BookOpen className="w-5 h-5 text-amber-400" />
              )}
            </div>

            <div className="truncate">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono text-[#8A6FB5] uppercase tracking-wider font-semibold">
                  {project.category}
                </span>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                    project.status === "Live"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : project.status === "In Progress"
                      ? "bg-[#8A6FB5]/15 border-[#8A6FB5]/40 text-[#c7b2e8]"
                      : "bg-[#21262d] border-[#30363d] text-[#8b949e]"
                  }`}
                >
                  {project.status === "Live" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  {project.status}
                </span>
                {isClientShowcase && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/35 text-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {lang === "EN" ? "In Active Production" : "Sudah Dipakai Klien"}
                  </span>
                )}
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-white truncate mt-0.5">
                {title}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close GUI Detail"
            className="w-9 h-9 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#8A6FB5]/50 transition-colors shrink-0 ml-3"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Sub-Navigation Tabs */}
        <div className="px-5 sm:px-6 py-2.5 bg-[#0d1117] border-b border-[#30363d]/80 flex items-center gap-2 overflow-x-auto shrink-0">
          <button
            onClick={() => setActiveTab("overview")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              activeTab === "overview"
                ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/20"
                : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
            }`}
          >
            {isClientShowcase
              ? lang === "EN"
                ? "Client & Overview"
                : "Profil Klien & Ringkasan"
              : lang === "EN"
              ? "Project Overview"
              : "Ringkasan Proyek"}
          </button>

          {isClientShowcase && (
            <button
              onClick={() => setActiveTab("preview")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "preview"
                  ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/20"
                  : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
              }`}
            >
              <Laptop className="w-3.5 h-3.5" />
              <span>
                {lang === "EN" ? "Live Website Mockup" : "Mockup Website Asli"}
              </span>
            </button>
          )}

          {isClientShowcase && (
            <button
              onClick={() => setActiveTab("websites")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === "websites"
                  ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/20"
                  : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
              }`}
            >
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>
                {lang === "EN" ? "Live Sites in Use" : "Daftar Website Terpakai"}
              </span>
            </button>
          )}

          <button
            onClick={() => setActiveTab("architecture")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "architecture"
                ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/20"
                : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>
              {lang === "EN" ? "Architecture & Stack" : "Spesifikasi & Arsitektur"}
            </span>
          </button>

          <button
            onClick={() => setActiveTab("deliverables")}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
              activeTab === "deliverables"
                ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/20"
                : "text-[#8b949e] hover:text-white hover:bg-[#161b22]"
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>
              {lang === "EN" ? "Features & Deliverables" : "Fitur & Deliverables"}
            </span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 overflow-y-auto space-y-6 flex-1 text-sm text-[#c9d1d9] leading-relaxed">
          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Highlight Banner for Client Website */}
              {isClientShowcase && project.clientShowcase && (
                <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-[#161b22] to-[#8A6FB5]/10 border border-emerald-500/30">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0 mt-0.5">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        <span>
                          {lang === "EN"
                            ? "Verified Production Website Actively Used by Client"
                            : "Hasil Pembuatan Website Resmi yang Sudah Aktif Digunakan"}
                        </span>
                        <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-semibold">
                          Live Production
                        </span>
                      </h4>
                      <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed">
                        {lang === "EN" ? (
                          <>
                            This professional portfolio was designed and engineered from scratch by{" "}
                            <span className="text-white font-medium">Dhitya Nurhadi</span> for client{" "}
                            <span className="text-emerald-300 font-semibold">{project.clientShowcase.clientName}</span>{" "}
                            ({project.clientShowcase.clientRoleEn}). It is actively deployed at{" "}
                            <a
                              href="https://kejuuanimator-portfolio.vercel.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white underline hover:text-emerald-400"
                            >
                              kejuuanimator-portfolio.vercel.app
                            </a>{" "}
                            for animation studio pitches and showcasing industry work.
                          </>
                        ) : (
                          <>
                            Website portofolio profesional ini dirancang dan dikembangkan dari nol oleh{" "}
                            <span className="text-white font-medium">Dhitya Nurhadi</span> untuk klien{" "}
                            <span className="text-emerald-300 font-semibold">{project.clientShowcase.clientName}</span>{" "}
                            ({project.clientShowcase.clientRoleId}). Sudah aktif digunakan secara publik di{" "}
                            <a
                              href="https://kejuuanimator-portfolio.vercel.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white underline hover:text-emerald-400"
                            >
                              kejuuanimator-portfolio.vercel.app
                            </a>{" "}
                            untuk pitch ke studio animasi dan representasi industri.
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* General Project Description */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
                  {lang === "EN" ? "Project Overview" : "Deskripsi Lengkap"}
                </h3>
                <p className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed">
                  {longOverview}
                </p>
              </div>

              {/* Client Profile Box */}
              {isClientShowcase && project.clientShowcase && (
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>{lang === "EN" ? "Client Profile & Objectives" : "Profil Klien & Kebutuhan Solusi"}</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/70">
                      <span className="text-[#8b949e] block text-[11px]">
                        {lang === "EN" ? "Client Name:" : "Nama Klien:"}
                      </span>
                      <span className="font-bold text-white text-sm">{project.clientShowcase.clientName}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/70">
                      <span className="text-[#8b949e] block text-[11px]">
                        {lang === "EN" ? "Industry / Discipline:" : "Profesi / Industri:"}
                      </span>
                      <span className="font-semibold text-emerald-300">
                        {lang === "EN" ? project.clientShowcase.clientRoleEn : project.clientShowcase.clientRoleId}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/70">
                      <span className="text-[#8b949e] block text-[11px]">
                        {lang === "EN" ? "Product Category:" : "Tipe Produk Website:"}
                      </span>
                      <span className="font-semibold text-white">
                        {lang === "EN" ? project.clientShowcase.siteTypeEn : project.clientShowcase.siteTypeId}
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/70">
                      <span className="text-[#8b949e] block text-[11px]">
                        {lang === "EN" ? "Operational Status:" : "Status Operasional:"}
                      </span>
                      <span className="font-semibold text-emerald-400 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        {lang === "EN"
                          ? project.clientShowcase.liveStatusEn
                          : project.clientShowcase.liveStatusId}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#161b22]/70 border border-[#30363d]/60 text-xs text-[#8b949e] leading-relaxed">
                    <span className="font-semibold text-white block mb-1">
                      {lang === "EN" ? "Client Purpose & Usage:" : "Tujuan Penggunaan Klien:"}
                    </span>
                    {lang === "EN"
                      ? project.clientShowcase.usageDescriptionEn
                      : project.clientShowcase.usageDescriptionId}
                  </div>
                </div>
              )}

              {/* Orbitry Special Info */}
              {isOrbitry && (
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Box className="w-4 h-4 text-[#8A6FB5]" />
                    <span>{lang === "EN" ? "Orbitry 3D Previewer Highlights" : "Kemampuan Inti Orbitry 3D Previewer"}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60">
                      <span className="text-[#8A6FB5] font-bold block mb-1">Client-Side Engine</span>
                      <span className="text-[#8b949e]">
                        {lang === "EN"
                          ? "Parses Blender (.blend) files directly in memory with zero cloud uploads."
                          : "Membaca file Blender (.blend) di browser tanpa upload data ke server luar."}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60">
                      <span className="text-emerald-400 font-bold block mb-1">Instant GLB/OBJ Export</span>
                      <span className="text-[#8b949e]">
                        {lang === "EN"
                          ? "1-click automated conversion to PBR glTF/GLB and quad-preserved OBJ."
                          : "Konversi 1-klik ke format standar web GLB (PBR) dan OBJ ber-topologi rapi."}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60">
                      <span className="text-amber-400 font-bold block mb-1">Pie Menu Gestures</span>
                      <span className="text-[#8b949e]">
                        {lang === "EN"
                          ? "Rapid keyboard radial workflows: Hold Z for Shading, Hold X for Camera."
                          : "Kontrol viewport cepat menggunakan hotkey Z (Shading) dan X (View)."}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Rimba Special Info */}
              {isRimba && (
                <div className="p-5 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                    <Gamepad2 className="w-4 h-4 text-emerald-400" />
                    <span>{lang === "EN" ? "Rimba 2.5D Survival Mechanics" : "Fitur Eksplorasi & Survival Rimba 2.5D"}</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60">
                      <span className="text-emerald-400 font-bold block mb-1">Isometric Canvas</span>
                      <span className="text-[#8b949e]">
                        {lang === "EN"
                          ? "Pure mathematical 2.5D projection rendered on Phaser 3.90 HTML canvas."
                          : "Proyeksi isometrik 2.5D matematis murni dengan Phaser 3.90 di HTML Canvas."}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60">
                      <span className="text-[#8A6FB5] font-bold block mb-1">Supabase Realtime</span>
                      <span className="text-[#8b949e]">
                        {lang === "EN"
                          ? "Active player presence detection and periodic positional movement broadcast."
                          : "Deteksi kehadiran pemain (Presence) dan broadcast posisi berjalan real-time."}
                      </span>
                    </div>
                    <div className="p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60">
                      <span className="text-amber-400 font-bold block mb-1">Escrow Marketplace</span>
                      <span className="text-[#8b949e]">
                        {lang === "EN"
                          ? "Harvesting nodes, cottage construction, and secure Postgres escrow exchange."
                          : "Sistem panen resource, pondok/kebun, dan pasar escrow berbasis transaksi Postgres."}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tech Stack Badges */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2.5">
                  {lang === "EN" ? "Technologies & Toolchain" : "Teknologi & Toolchain yang Digunakan"}
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-xl bg-[#0d1117] border border-[#30363d] text-xs font-mono text-[#c7b2e8]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE MOCKUP PREVIEW (REAL WEBSITE OF JUNA WITH VIDEOS PAUSED BY DEFAULT) */}
          {activeTab === "preview" && isClientShowcase && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <span>
                      {lang === "EN"
                        ? "Live Mockup: Juna's Official Portfolio Website"
                        : "Mockup GUI: Website Asli Portofolio Juna"}
                    </span>
                  </h3>
                  <p className="text-xs text-[#8b949e]">
                    {lang === "EN"
                      ? "Direct embedded preview of kejuuanimator-portfolio.vercel.app with videos paused by default for lightweight performance."
                      : "Menampilkan website asli kejuuanimator-portfolio.vercel.app dengan video dijeda default agar hemat memori dan ringan."}
                  </p>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/10 border border-amber-500/30 text-[11px] font-mono text-amber-300">
                    <Pause className="w-3 h-3 text-amber-400" />
                    <span>{lang === "EN" ? "Videos Paused" : "Video Dijeda Default"}</span>
                  </span>

                  <button
                    onClick={reloadIframe}
                    title="Reload Preview"
                    className="p-1.5 rounded-lg bg-[#0d1117] border border-[#30363d] text-[#8b949e] hover:text-white transition-colors"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Simulated Browser Frame with REAL LIVE IFRAME */}
              <div className="rounded-2xl border border-[#30363d] bg-[#0d1117] overflow-hidden shadow-2xl flex flex-col">
                {/* Browser Address Bar */}
                <div className="px-4 py-2.5 bg-[#161b22] border-b border-[#30363d] flex items-center justify-between gap-3 text-xs shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                  </div>

                  <div className="flex-1 max-w-md mx-auto px-3 py-1 rounded-lg bg-[#0d1117] border border-[#30363d]/80 text-[#8b949e] text-[11px] font-mono flex items-center justify-center gap-2 truncate">
                    <span className="text-emerald-400">🔒</span>
                    <span className="text-white/90">https://kejuuanimator-portfolio.vercel.app</span>
                  </div>

                  <a
                    href="https://kejuuanimator-portfolio.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0d1117] border border-[#30363d] text-[11px] text-[#8b949e] hover:text-white hover:border-emerald-500/50 transition-colors"
                  >
                    <span>{lang === "EN" ? "Open Tab" : "Buka Tab Baru"}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Embedded Live Webpage Container */}
                <div className="relative w-full h-[540px] sm:h-[620px] bg-[#0a0d12]">
                  {isLoadingIframe && (
                    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117] gap-3 text-xs text-[#8b949e]">
                      <div className="w-8 h-8 rounded-full border-2 border-[#8A6FB5] border-t-transparent animate-spin" />
                      <span>{lang === "EN" ? "Loading real client website..." : "Memuat website klien asli..."}</span>
                    </div>
                  )}

                  {junaIframeDoc ? (
                    <iframe
                      key={iframeKey}
                      srcDoc={junaIframeDoc}
                      title="Juna Portfolio Live Mockup"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  ) : (
                    <iframe
                      key={iframeKey}
                      src="https://kejuuanimator-portfolio.vercel.app"
                      title="Juna Portfolio Live Mockup"
                      allow="autoplay 'none'"
                      className="w-full h-full border-0"
                      loading="lazy"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: WEBSITES IN PRODUCTION */}
          {activeTab === "websites" && isClientShowcase && (
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  {lang === "EN" ? "Live Client Websites in Production" : "Daftar Website Klien yang Sudah Dipakai"}
                </h3>
                <p className="text-xs text-[#8b949e]">
                  {lang === "EN"
                    ? "Official production websites engineered by Dhitya Nurhadi and actively deployed:"
                    : "Website resmi produksi yang dirancang dan dibangun oleh Dhitya Nurhadi yang sudah aktif digunakan:"}
                </p>
              </div>

              <div className="space-y-4">
                {DEPLOYED_CLIENT_WEBSITES.map((site) => (
                  <div
                    key={site.id}
                    className="p-5 rounded-2xl bg-[#0d1117] border border-emerald-500/35 hover:border-emerald-400/70 transition-all shadow-lg"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold block mb-0.5">
                          {site.category}
                        </span>
                        <h4 className="text-base font-bold text-white">{site.title}</h4>
                        <p className="text-xs text-[#8A6FB5] mt-0.5">
                          {lang === "EN" ? "Client:" : "Klien:"} {site.clientName} ({site.clientHandle})
                        </p>
                      </div>

                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 self-start sm:self-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{site.status}</span>
                      </span>
                    </div>

                    <p className="text-xs text-[#c9d1d9] leading-relaxed mb-4">
                      {lang === "EN" ? site.descriptionEn : site.descriptionId}
                    </p>

                    {/* Key deliverables */}
                    <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60 text-xs">
                      {(lang === "EN" ? site.deliverablesEn : site.deliverablesId).map(
                        (d, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[#8b949e]">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{d}</span>
                          </div>
                        )
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#30363d]/50">
                      <a
                        href={site.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-black transition-all shadow-md shadow-emerald-500/20"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>{lang === "EN" ? "Visit Live Site" : "Kunjungi Website Asli"}</span>
                        <ExternalLink className="w-3 h-3 text-black/80" />
                      </a>

                      {site.clientWhatsapp && (
                        <a
                          href={site.clientWhatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-emerald-500/50 text-xs font-semibold text-emerald-300 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{lang === "EN" ? "Client WhatsApp" : "WhatsApp Klien"}</span>
                        </a>
                      )}

                      <button
                        onClick={() => setActiveTab("preview")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8A6FB5]/20 hover:bg-[#8A6FB5]/30 border border-[#8A6FB5]/50 text-xs font-semibold text-[#c7b2e8] hover:text-white transition-colors ml-auto"
                      >
                        <Laptop className="w-3.5 h-3.5 text-[#8A6FB5]" />
                        <span>{lang === "EN" ? "View in Mockup GUI" : "Buka di Mockup GUI"}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ARCHITECTURE & TECHNICAL SPECS */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
                  {lang === "EN" ? "Technical Architecture & Design Specs" : "Arsitektur & Spesifikasi Rekayasa Teknis"}
                </h3>
                <p className="text-xs sm:text-sm text-[#8b949e] leading-relaxed">
                  {lang === "EN"
                    ? "Key engineering principles and system designs applied to this build:"
                    : "Prinsip desain rekayasa perangkat lunak yang diimplementasikan pada proyek ini:"}
                </p>
              </div>

              <div className="space-y-3">
                {archPoints.map((point, idx) => {
                  const [pointTitle, ...rest] = point.split(":");
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-[#0d1117] border border-[#30363d]/80 flex items-start gap-3"
                    >
                      <div className="w-6 h-6 rounded-lg bg-[#8A6FB5]/20 border border-[#8A6FB5]/40 flex items-center justify-center text-[#8A6FB5] shrink-0 mt-0.5 text-xs font-bold font-mono">
                        {idx + 1}
                      </div>
                      <div className="text-xs sm:text-sm">
                        <strong className="text-white block font-semibold mb-0.5">
                          {pointTitle}
                        </strong>
                        <span className="text-[#8b949e] leading-relaxed">
                          {rest.join(":")}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {isClientShowcase && (
                <div className="p-4 rounded-2xl bg-[#0d1117] border border-[#30363d] space-y-2 text-xs">
                  <span className="font-bold text-white block">
                    {lang === "EN" ? "Production Client Directory Structure:" : "Struktur Direktori Solusi Klien:"}
                  </span>
                  <pre className="font-mono text-[11px] text-[#c7b2e8] bg-[#161b22] p-3 rounded-xl overflow-x-auto">
{`Juna-Portfolio/
├── index.html           # Home, Geometric Portal SVG, Dual-Hero, & Video Cards
├── all-project.html     # Project archive gallery with category filters
├── vercel.json          # Clean route rewrite /all-project -> all-project.html
├── assets/
│   ├── favicon.svg      # Geometric brand icon
│   └── videos/          # 3D video renders (final vs viewport)
├── css/style.css        # Responsive glassmorphism & CSS grid
└── js/main.js           # Native HTML5 dialog & video switcher`}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: DELIVERABLES & FEATURES */}
          {activeTab === "deliverables" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
                  {lang === "EN" ? "Features & Deliverables" : "Daftar Fitur & Nilai Unggulan"}
                </h3>
                <p className="text-xs sm:text-sm text-[#8b949e]">
                  {lang === "EN"
                    ? "Completed functional capabilities and verification standards:"
                    : "Solusi fungsional yang telah diselesaikan dan dapat diuji:"}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-[#0d1117] border border-[#30363d]/80 flex items-start gap-2.5 text-xs"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="text-[#c9d1d9] leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>

              {isClientShowcase && project.clientShowcase && (
                <div className="space-y-3 pt-4 border-t border-[#30363d]/80">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {lang === "EN"
                      ? "Deliverables Handed Over to Client:"
                      : "Deliverables yang Diserahkan ke Klien:"}
                  </h4>
                  <div className="space-y-2">
                    {(lang === "EN"
                      ? project.clientShowcase.deliverablesEn
                      : project.clientShowcase.deliverablesId
                    ).map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2.5 text-xs text-[#8b949e] p-2 rounded-lg bg-[#0d1117]/50"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8A6FB5]" />
                        <span className="text-white/90">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 sm:px-6 bg-[#0d1117] border-t border-[#30363d] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#8b949e] flex items-center gap-2">
            <span>{lang === "EN" ? "Official links and repositories" : "Repositori & Live Link Resmi"}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isClientShowcase ? (
              <button
                onClick={() => setActiveTab("websites")}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-emerald-500/40 hover:border-emerald-400 text-xs font-semibold text-emerald-300 transition-all shadow-sm"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "Client Sites List" : "Daftar Website Terpakai"}</span>
              </button>
            ) : (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 hover:bg-[#21262d] text-xs font-semibold text-white transition-all shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5 text-[#8A6FB5]" />
                <span>{lang === "EN" ? "View Repository" : "Lihat Repositori"}</span>
                <ExternalLink className="w-3 h-3 text-[#8b949e]" />
              </a>
            )}

            {isClientShowcase && project.clientShowcase?.clientWhatsapp && (
              <a
                href={project.clientShowcase.clientWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-emerald-500/50 text-xs font-semibold text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? "Contact Client" : "Hubungi Klien"}</span>
              </a>
            )}

            {isClientShowcase && project.clientShowcase?.clientInstagramUrl && (
              <a
                href={project.clientShowcase.clientInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-pink-500/50 text-xs font-semibold text-pink-300 transition-colors"
              >
                <span>Instagram</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{lang === "EN" ? project.liveLabelEn || "Open Website" : project.liveLabelId || "Buka Website"}</span>
                <ExternalLink className="w-3 h-3 text-white/80" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
