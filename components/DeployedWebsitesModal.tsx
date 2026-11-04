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
                  {lang === "EN" ? "Custom Web Services & Stock" : "Layanan Web Kustom & Stok Siap Beli"}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white mt-1">
                {lang === "EN" ? "Client Websites & Ready-to-Buy Catalog" : "Website Klien Aktif & Katalog Siap Beli"}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Tutup"
            className="w-9 h-9 rounded-xl bg-[#0d1117] border border-[#30363d] flex items-center justify-center text-[#8b949e] hover:text-white hover:border-[#8A6FB5]/50 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content list */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {/* Order banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#161b22] to-emerald-950/30 border border-emerald-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                {lang === "EN" ? "✨ Open for Custom Website Orders" : "✨ Buka Jasa Pembuatan Website Kustom"}
              </span>
              <p className="text-xs text-[#c9d1d9] mt-0.5">
                {lang === "EN"
                  ? "Need a tailor-made website from scratch? Contact me directly to discuss your project, stack, and design!"
                  : "Butuh website yang dibuat khusus dari nol? Hubungi saya langsung via WhatsApp untuk diskusi dan order!"}
              </p>
            </div>
            <a
              href="https://wa.me/6289638194578"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-black shrink-0 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>{lang === "EN" ? "Order via WhatsApp" : "Order via WhatsApp"}</span>
            </a>
          </div>

          <p className="text-xs text-[#8b949e] leading-relaxed">
            {lang === "EN"
              ? "Browse live website projects below — including active commissioned client sites and finished templates that are ready to buy immediately:"
              : "Jelajahi daftar website di bawah ini — mencakup website pesanan klien yang aktif serta website jadi yang siap dibeli langsung:"}
          </p>

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
                          <span className="text-amber-400 font-medium">
                            {lang === "EN" ? "Status: Ready to Buy (Idle / Unclaimed)" : "Status: Siap Dibeli (Website Jadi & Menganggur)"}
                          </span>
                        ) : (
                          <span className="text-emerald-400">
                            {lang === "EN" ? "Client:" : "Klien:"} {site.clientName} ({site.clientHandle}) · {lang === "EN" ? "Purchased & Active" : "Sudah Dibeli & Aktif"}
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
                  <div className="space-y-1.5 mb-4 p-3 rounded-xl bg-[#161b22] border border-[#30363d]/60 text-xs">
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

                  {/* Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#30363d]/50">
                    <div className="flex items-center gap-2">
                      {site.url && (
                        <a
                          href={site.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-xs font-bold text-black transition-all shadow-md shadow-emerald-500/20"
                        >
                          <Globe className="w-3.5 h-3.5" />
                          <span>{lang === "EN" ? "Visit Live Site" : "Kunjungi Website"}</span>
                          <ExternalLink className="w-3 h-3 text-black/80" />
                        </a>
                      )}

                      {isReadyToBuy && (
                        <a
                          href="https://wa.me/6289638194578"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-xs font-bold text-black transition-all shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>{lang === "EN" ? "Buy This Template" : "Beli Website Ini"}</span>
                        </a>
                      )}
                    </div>

                    {onOpenMockup && (
                      <button
                        onClick={() => {
                          onClose();
                          onOpenMockup();
                        }}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#8A6FB5]/20 hover:bg-[#8A6FB5]/30 border border-[#8A6FB5]/50 text-xs font-semibold text-[#c7b2e8] hover:text-white transition-colors cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#8A6FB5]" />
                        <span>{lang === "EN" ? "View Full GUI" : "Buka GUI Detail"}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3.5 bg-[#0d1117] border-t border-[#30363d] flex items-center justify-between text-xs text-[#8b949e]">
          <span>
            {lang === "EN"
              ? `Catalog: 1 Commissioned site + 2 Ready-to-buy templates`
              : `Katalog: 1 Website pesanan + 2 Template siap dibeli`}
          </span>
          <button
            onClick={onClose}
            className="hover:text-white transition-colors cursor-pointer"
          >
            {lang === "EN" ? "Close" : "Tutup"}
          </button>
        </div>
      </div>
    </div>
  );
}
