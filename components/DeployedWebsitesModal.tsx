"use client";

import React, { useEffect } from "react";
import {
  X,
  Globe,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { DEPLOYED_CLIENT_WEBSITES } from "@/lib/projects";
import { useLanguage } from "@/lib/LanguageContext";

interface DeployedWebsitesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMockup?: () => void;
}

export function DeployedWebsitesModal({
  isOpen,
  onClose,
  onOpenMockup,
}: DeployedWebsitesModalProps) {
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

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-[#161b22] border border-[#30363d] rounded-2xl sm:rounded-3xl max-w-2xl w-full max-h-[90dvh] flex flex-col overflow-hidden shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-[#30363d] flex items-center justify-between bg-[#0d1117]/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/35 flex items-center justify-center text-emerald-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 border border-emerald-500/35 text-emerald-300">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>
                  {lang === "EN" ? "Verified Active Production" : "Terverifikasi Aktif Digunakan"}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {lang === "EN" ? "Client Websites in Production" : "Daftar Website Klien yang Sudah Dipakai"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="w-9 h-9 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#8A6FB5]/50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          <p className="text-xs text-[#8b949e] leading-relaxed">
            {lang === "EN"
              ? "Here are the production websites designed, coded, and deployed by Dhitya Nurhadi that are currently used actively by clients:"
              : "Berikut adalah daftar website produksi yang dirancang dan dibangun oleh Dhitya Nurhadi yang saat ini telah aktif digunakan oleh klien:"}
          </p>

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
                    <span>{lang === "EN" ? "Visit Website" : "Kunjungi Website"}</span>
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

                  {site.clientInstagramUrl && (
                    <a
                      href={site.clientInstagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#161b22] border border-[#30363d] hover:border-pink-500/50 text-xs font-semibold text-pink-300 transition-colors"
                    >
                      <span>Instagram</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}

                  {onOpenMockup && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenMockup();
                      }}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8A6FB5]/20 hover:bg-[#8A6FB5]/30 border border-[#8A6FB5]/50 text-xs font-semibold text-[#c7b2e8] hover:text-white transition-colors ml-auto"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#8A6FB5]" />
                      <span>{lang === "EN" ? "View GUI Details" : "Lihat GUI Detail"}</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
          <span>{lang === "EN" ? "Total verified production sites: 1" : "Total website aktif terverifikasi: 1"}</span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors"
          >
            {lang === "EN" ? "Close" : "Tutup"}
          </button>
        </div>
      </div>
    </div>
  );
}
