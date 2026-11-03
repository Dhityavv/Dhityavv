"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, Download, Clock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

interface UcbDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UcbDownloadModal({ isOpen, onClose }: UcbDownloadModalProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const downloadOptions = [
    {
      id: "discord",
      name: "Discord",
      descriptionEn: "Direct community download & beta feedback channel",
      descriptionId: "Unduh file mod langsung & channel masukan beta komunitas",
      url: "https://discord.gg/sFC8P5DFEN",
      badge: "Available Now",
      badgeColor: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
      isComingSoon: false,
      ctaEn: "Join & Download",
      ctaId: "Masuk & Unduh",
      iconColor: "text-[#5865F2]",
    },
    {
      id: "modrinth",
      name: "Modrinth",
      descriptionEn: "Official open source mod repository listing",
      descriptionId: "Listing repositori mod open source resmi",
      url: "https://modrinth.com/mod/universal-chiseled-bookshelf",
      badge: "Coming Soon",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      isComingSoon: true,
      ctaEn: "Visit Listing",
      ctaId: "Lihat Halaman",
      iconColor: "text-[#00AF5C]",
    },
    {
      id: "curseforge",
      name: "CurseForge",
      descriptionEn: "Official CurseForge mod ecosystem publication",
      descriptionId: "Publikasi resmi ekosistem mod CurseForge",
      url: "https://www.curseforge.com/minecraft/mc-mods/universal-chiseled-bookshelf",
      badge: "Coming Soon",
      badgeColor: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      isComingSoon: true,
      ctaEn: "Visit Listing",
      ctaId: "Lihat Halaman",
      iconColor: "text-[#F16436]",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#161b22] border border-[#30363d] rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                {lang === "EN"
                  ? "Download Universal Chiseled Bookshelf"
                  : "Unduh Universal Chiseled Bookshelf"}
              </h3>
              <p className="text-[11px] text-[#8b949e]">
                {lang === "EN"
                  ? "Select your preferred distribution platform:"
                  : "Pilih platform distribusi unduhan yang diinginkan:"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#161b22] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Options List */}
        <div className="p-5 space-y-3 bg-[#0d1117]/60 max-h-[70vh] overflow-y-auto">
          {downloadOptions.map((opt) => (
            <div
              key={opt.id}
              className={`p-4 rounded-xl border transition-all ${
                opt.isComingSoon
                  ? "bg-[#0d1117] border-[#30363d] opacity-90"
                  : "bg-[#161b22] border-[#8A6FB5]/40 hover:border-[#8A6FB5] shadow-lg shadow-[#8A6FB5]/5"
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">{opt.name}</h4>
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border ${opt.badgeColor}`}
                  >
                    {opt.isComingSoon ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    )}
                    {opt.badge}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#8b949e] mb-3">
                {lang === "EN" ? opt.descriptionEn : opt.descriptionId}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-[#30363d]/50">
                <span className="text-[11px] font-mono text-[#6e7681] truncate max-w-[200px] sm:max-w-xs">
                  {opt.url.replace(/^https?:\/\//, "")}
                </span>

                <a
                  href={opt.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    opt.isComingSoon
                      ? "bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d]"
                      : "bg-[#8A6FB5] hover:bg-[#795ea3] text-white shadow-sm"
                  }`}
                >
                  <span>{lang === "EN" ? opt.ctaEn : opt.ctaId}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footer info */}
        <div className="px-5 py-3 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between text-[11px] text-[#8b949e]">
          <span>Minecraft 1.20+ · Fabric Mod Loader</span>
          <span>Open Source</span>
        </div>
      </div>
    </div>
  );
}
