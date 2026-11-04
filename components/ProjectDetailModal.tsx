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
  Eye,
  Film,
  BookOpen,
  Gamepad2,
  Cpu,
  ShieldCheck,
  MessageSquare,
  Box,
  Download,
} from "lucide-react";
import { ProjectDetail, DEPLOYED_CLIENT_WEBSITES } from "@/lib/projects";
import { useLanguage } from "@/lib/LanguageContext";
import { UcbDownloadModal } from "@/components/UcbDownloadModal";

interface ProjectDetailModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
  initialTab?: "overview" | "architecture" | "deliverables" | "websites";
}

export function ProjectDetailModal({
  project,
  onClose,
  initialTab = "overview",
}: ProjectDetailModalProps) {
  const { lang } = useLanguage();
  const [activeTab, setActiveTab] = useState<
    "overview" | "architecture" | "deliverables" | "websites"
  >(initialTab);
  const [isUcbModalOpen, setIsUcbModalOpen] = useState(false);

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

  if (!project) return null;

  const isClientShowcase = project.id === "client-showcase";
  const isOrbitry = project.id === "orbitry";
  const isRimba = project.id === "rimba";

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
                    project.status === "Active"
                      ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                      : project.status === "In Progress"
                      ? "bg-[#8A6FB5]/15 border-[#8A6FB5]/40 text-[#c7b2e8]"
                      : project.status === "Under Review on Modrinth"
                      ? "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      : "bg-[#21262d] border-[#30363d] text-[#8b949e]"
                  }`}
                >
                  {project.status === "Active" && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  {project.status}
                </span>
                {isClientShowcase && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/35 text-emerald-300">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {lang === "EN" ? "Active" : "Active"}
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
            {lang === "EN" ? "Project Overview" : "Ringkasan Proyek"}
          </button>

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
                {lang === "EN" ? "Active Sites in Use" : "Website Aktif Digunakan"}
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
              {/* General Project Description */}
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-[#8A6FB5] mb-2">
                  {lang === "EN" ? "Project Overview & Engineering Scope" : "Deskripsi Lengkap & Ruang Lingkup Rekayasa"}
                </h3>
                <div className="text-sm sm:text-base text-[#c9d1d9] leading-relaxed whitespace-pre-line">
                  {longOverview}
                </div>
              </div>

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

          {/* TAB 2: ACTIVE SITES IN USE & READY-TO-BUY SITES */}
          {activeTab === "websites" && isClientShowcase && (
            <div className="space-y-5">
              {/* Service & Order Banner */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#161b22] to-[#161b22] border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-[11px] font-bold text-emerald-300 mb-1">
                    <Sparkles className="w-3 h-3 text-emerald-400" />
                    <span>{lang === "EN" ? "OPEN FOR WEB ORDERS" : "TERIMA JASA PEMBUATAN WEBSITE"}</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white">
                    {lang === "EN"
                      ? "Order a Custom Website or Buy a Ready-Made Template"
                      : "Pesan Website Kustom Baru atau Beli Template yang Sudah Jadi"}
                  </h4>
                  <p className="text-xs text-[#8b949e] mt-1 max-w-xl leading-relaxed">
                    {lang === "EN"
                      ? "I build personal portfolios, company profiles, landing pages, and interactive web apps using modern Next.js or pure lightweight vanilla HTML/CSS/JS. Have an idea? Let's discuss directly on WhatsApp!"
                      : "Saya melayani pembuatan website portofolio, profil perusahaan, landing page, dan aplikasi web interaktif menggunakan Next.js modern maupun HTML/CSS/JS ringan. Ingin konsultasi atau langsung beli website? Hubungi via WhatsApp!"}
                  </p>
                </div>

                <a
                  href="https://wa.me/6289638194578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-black transition-all shadow-md shadow-emerald-500/25 shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{lang === "EN" ? "Order via WhatsApp" : "Order via WhatsApp"}</span>
                </a>
              </div>

              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Globe className="w-4 h-4 text-emerald-400" />
                  <span>
                    {lang === "EN"
                      ? "Website Portfolio & Ready-to-Buy Stock"
                      : "Koleksi Website: Terjual Aktif & Stok Siap Beli"}
                  </span>
                </h3>
                <p className="text-xs text-[#8b949e] mt-1">
                  {lang === "EN"
                    ? "Below are commissioned client websites currently active in production, as well as ready-to-buy completed websites available for immediate purchase:"
                    : "Berikut adalah daftar website pesanan klien yang aktif digunakan, serta website siap pakai yang sudah jadi dan bisa langsung Anda beli:"}
                </p>
              </div>

              <div className="space-y-4">
                {DEPLOYED_CLIENT_WEBSITES.map((site) => {
                  const isReadyToBuy = site.availability === "Ready to Buy";
                  const siteTitle = lang === "EN" ? site.titleEn || site.title : site.titleId || site.title;
                  return (
                    <div
                      key={site.id}
                      className={`p-5 rounded-2xl bg-[#0d1117] border transition-all shadow-lg ${
                        isReadyToBuy
                          ? "border-[#8A6FB5]/50 hover:border-[#8A6FB5]"
                          : "border-emerald-500/35 hover:border-emerald-400/70"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className={`text-[10px] font-mono uppercase tracking-wider font-semibold ${
                                isReadyToBuy ? "text-[#c7b2e8]" : "text-emerald-400"
                              }`}
                            >
                              {site.category}
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#161b22] border border-[#30363d] font-mono text-[#8b949e]">
                              {site.frameworkType}
                            </span>
                          </div>
                          <h4 className="text-base font-bold text-white">{siteTitle}</h4>
                          <p className="text-xs text-[#8b949e] mt-0.5">
                            {isReadyToBuy ? (
                              <span className="text-amber-400 font-semibold">
                                {lang === "EN" ? "Status: Ready to Buy (Idle / Unclaimed Template)" : "Status: Siap Dibeli (Website Jadi & Menganggur)"}
                              </span>
                            ) : (
                              <span className="text-emerald-400">
                                {lang === "EN" ? "Client:" : "Klien:"} {site.clientName} ({site.clientHandle}) · {lang === "EN" ? "Purchased & Active in Production" : "Sudah Dibeli & Aktif Digunakan"}
                              </span>
                            )}
                          </p>
                        </div>

                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold self-start sm:self-center border ${
                            isReadyToBuy
                              ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                              : "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isReadyToBuy ? "bg-amber-400" : "bg-emerald-400 animate-pulse"
                            }`}
                          />
                          <span>
                            {isReadyToBuy
                              ? lang === "EN"
                                ? "Ready to Buy"
                                : "Siap Dibeli"
                              : lang === "EN"
                              ? "Active / Purchased"
                              : "Aktif Digunakan"}
                          </span>
                        </span>
                      </div>

                      <p className="text-xs text-[#c9d1d9] leading-relaxed mb-3">
                        {lang === "EN" ? site.descriptionEn : site.descriptionId}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-3.5">
                        {site.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 rounded-md bg-[#161b22] border border-[#30363d] text-[10px] font-mono text-[#c7b2e8]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Key deliverables */}
                      <div className="space-y-1.5 mb-4 p-3.5 rounded-xl bg-[#161b22] border border-[#30363d]/60 text-xs">
                        <span className="font-semibold text-white block mb-1">
                          {lang === "EN" ? "Highlights & Deliverables:" : "Nilai Unggulan & Fitur Jadi:"}
                        </span>
                        {(lang === "EN" ? site.deliverablesEn : site.deliverablesId).map(
                          (d, idx) => (
                            <div key={idx} className="flex items-start gap-2 text-[#8b949e]">
                              <CheckCircle2
                                className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  isReadyToBuy ? "text-[#8A6FB5]" : "text-emerald-400"
                                }`}
                              />
                              <span>{d}</span>
                            </div>
                          )
                        )}
                      </div>

                      {/* Actions for this deployed site */}
                      <div className="flex flex-wrap items-center gap-2.5 pt-3 border-t border-[#30363d]/50">
                        {site.url && (
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
                        )}

                        {isReadyToBuy && (
                          <a
                            href="https://wa.me/6289638194578"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-black transition-all shadow-md shadow-amber-500/20"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                            <span>{lang === "EN" ? "Buy This Template via WA" : "Beli Website Ini via WhatsApp"}</span>
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
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
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-4 sm:px-6 bg-[#0d1117] border-t border-[#30363d] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-[#8b949e] flex items-center gap-2">
            <span>{lang === "EN" ? "Official links and repositories" : "Repositori & Link Resmi"}</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {isClientShowcase ? (
              <>
                {/* Dhitya's Repository Button */}
                <a
                  href="https://github.com/Dhityavv"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 hover:bg-[#21262d] text-xs font-semibold text-white transition-all shadow-sm"
                >
                  <Code2 className="w-3.5 h-3.5 text-[#8A6FB5]" />
                  <span>{lang === "EN" ? "View Repository" : "Lihat Repositori"}</span>
                  <ExternalLink className="w-3 h-3 text-[#8b949e]" />
                </a>

                {/* Direct Contact Me WhatsApp Button */}
                <a
                  href="https://wa.me/6289638194578"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-black transition-all shadow-md shadow-emerald-500/20"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>{lang === "EN" ? "Contact Me" : "Hubungi Saya"}</span>
                </a>
              </>
            ) : (
              <>
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

                {project.liveUrl && (
                  project.id === "universal-chiseled-bookshelf" ? (
                    <button
                      onClick={() => setIsUcbModalOpen(true)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-black shadow-md shadow-amber-500/20 hover:shadow-amber-500/35 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>
                        {lang === "EN"
                          ? project.liveLabelEn || "Download"
                          : project.liveLabelId || "Download"}
                      </span>
                    </button>
                  ) : (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#8A6FB5] hover:bg-[#795ea3] text-xs font-bold text-white shadow-md shadow-[#8A6FB5]/20 hover:shadow-[#8A6FB5]/35 transition-all"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      <span>
                        {lang === "EN"
                          ? project.liveLabelEn || "Open the Websites"
                          : project.liveLabelId || "Buka Website"}
                      </span>
                      <ExternalLink className="w-3 h-3 text-white/80" />
                    </a>
                  )
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* UCB Download Modal */}
      <UcbDownloadModal
        isOpen={isUcbModalOpen}
        onClose={() => setIsUcbModalOpen(false)}
      />
    </div>
  );
}
