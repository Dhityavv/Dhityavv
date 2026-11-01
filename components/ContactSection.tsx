"use client";

import React, { useState } from "react";
import {
  Send,
  Camera,
  Video,
  MessageSquare,
  Code2,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
} from "lucide-react";

export function ContactSection() {
  const [copiedDiscord, setCopiedDiscord] = useState(false);

  const copyDiscord = () => {
    navigator.clipboard.writeText("@dhityavv");
    setCopiedDiscord(true);
    setTimeout(() => setCopiedDiscord(false), 2000);
  };

  const socials = [
    {
      name: "TikTok",
      handle: "@dhityavv",
      url: "https://www.tiktok.com/@dhityavv",
      icon: <Video className="w-5 h-5 text-rose-400" />,
      color: "hover:border-rose-500/50",
      action: "Visit Profile",
      isLink: true,
    },
    {
      name: "Instagram",
      handle: "@dhityavv",
      url: "https://www.instagram.com/dhityavv/",
      icon: <Camera className="w-5 h-5 text-pink-400" />,
      color: "hover:border-pink-500/50",
      action: "Visit Profile",
      isLink: true,
    },
    {
      name: "Discord",
      handle: "@dhityavv",
      icon: <MessageSquare className="w-5 h-5 text-indigo-400" />,
      color: "hover:border-indigo-500/50",
      action: copiedDiscord ? "Copied handle!" : "Copy Tag",
      isLink: false,
      onClick: copyDiscord,
    },
    {
      name: "GitHub",
      handle: "Dhityavv",
      url: "https://github.com/Dhityavv",
      icon: <Code2 className="w-5 h-5 text-white" />,
      color: "hover:border-[#8A6FB5]/60",
      action: "Follow",
      isLink: true,
    },
  ];

  return (
    <section id="connect" className="py-16 border-t border-[#30363d]/60 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8A6FB5] mb-3">
          <Send className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-2">
          Let&apos;s Connect
        </h2>
        <p className="text-sm text-[#8b949e] max-w-lg mx-auto mb-10">
          Interested in 3D art, Minecraft modding, or collaborating on creative
          experiments? Reach out anytime!
        </p>

        {/* Social Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {socials.map((s, idx) =>
            s.isLink ? (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-5 rounded-2xl bg-[#161b22] border border-[#30363d] ${s.color} transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-between group`}
              >
                <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 mb-3 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="text-sm font-bold text-white mb-0.5">{s.name}</div>
                <div className="text-xs text-[#8b949e] font-mono mb-3">
                  {s.handle}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A6FB5] group-hover:text-white transition-colors">
                  {s.action} <ExternalLink className="w-3 h-3" />
                </span>
              </a>
            ) : (
              <button
                key={idx}
                onClick={s.onClick}
                className={`p-5 rounded-2xl bg-[#161b22] border border-[#30363d] ${s.color} transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col items-center justify-between group text-left w-full`}
              >
                <div className="p-3 rounded-xl bg-[#0d1117] border border-[#30363d]/80 mb-3 group-hover:scale-110 transition-transform">
                  {s.icon}
                </div>
                <div className="text-sm font-bold text-white mb-0.5">{s.name}</div>
                <div className="text-xs text-[#8b949e] font-mono mb-3">
                  {s.handle}
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#8A6FB5] group-hover:text-white transition-colors">
                  {copiedDiscord ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Copied tag</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Tag</span>
                    </>
                  )}
                </span>
              </button>
            )
          )}
        </div>

        {/* Motto from README */}
        <div className="inline-flex items-center gap-2 text-sm text-[#8b949e] italic mb-6">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Always learning, always building. ⚡</span>
        </div>
      </div>
    </section>
  );
}
