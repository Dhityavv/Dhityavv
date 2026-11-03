"use client";

import React from "react";
import { User, GraduationCap, Box, Gamepad2, Zap, Palette, Compass } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export function AboutSection() {
  const { lang } = useLanguage();

  const details = [
    {
      icon: <User className="w-4 h-4 text-[#8A6FB5]" />,
      label: lang === "EN" ? "Full Name" : "Nama Lengkap",
      value: "Dhitya Nurhadi",
    },
    {
      icon: <GraduationCap className="w-4 h-4 text-[#8A6FB5]" />,
      label: lang === "EN" ? "Role" : "Peran",
      value:
        lang === "EN"
          ? "Animation Student (SMK) / Aspiring 3D Artist"
          : "Siswa Jurusan Animasi (SMK) / Calon 3D Artist",
    },
    {
      icon: <Box className="w-4 h-4 text-[#8A6FB5]" />,
      label: lang === "EN" ? "Focus" : "Fokus Utama",
      value:
        lang === "EN"
          ? "3D Modeling, Medium-Poly Art, Environments"
          : "Pemodelan 3D, Seni Medium-Poly, Lingkungan",
    },
    {
      icon: <Gamepad2 className="w-4 h-4 text-[#8A6FB5]" />,
      label: lang === "EN" ? "Also Into" : "Minat Lain",
      value: "Gaming, Minecraft Modding, Anime & Manhwa",
    },
    {
      icon: <Zap className="w-4 h-4 text-amber-400" />,
      label: lang === "EN" ? "Currently" : "Aktivitas Saat Ini",
      value:
        lang === "EN"
          ? "Practicing Blender, building web apps & client websites"
          : "Berlatih Blender, membangun web app & website klien",
    },
  ];

  return (
    <section id="about" className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-xl bg-[#8A6FB5]/15 border border-[#8A6FB5]/30 flex items-center justify-center text-[#8A6FB5]">
            <Palette className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              {lang === "EN" ? "About Me" : "Tentang Saya"}
            </h2>
            <p className="text-xs sm:text-sm text-[#8b949e]">
              {lang === "EN"
                ? "Vocational animation background, passions, and creative focus"
                : "Latar belakang animasi SMK, minat, dan fokus karya kreatif"}
            </p>
          </div>
        </div>

        {/* Equal height grid with items-stretch */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-md:gap-4 items-stretch">
          {/* Bio text card */}
          <div className="lg:col-span-7 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8 max-md:p-5 relative overflow-hidden shadow-xl flex flex-col justify-between h-full">
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#8A6FB5]/10 blur-3xl pointer-events-none rounded-full" />
            <div>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#8A6FB5]" />
                {lang === "EN" ? "The Creative Journey" : "Perjalanan Kreatif"}
              </h3>

              {lang === "EN" ? (
                <>
                  <p className="text-sm sm:text-base leading-relaxed text-[#c9d1d9] mb-5">
                    I&apos;m a vocational high school student majoring in{" "}
                    <span className="text-white font-medium underline decoration-[#8A6FB5] underline-offset-4">
                      Animation
                    </span>
                    . Most of my creative time goes into{" "}
                    <span className="text-[#c7b2e8] font-semibold">
                      3D art in Blender
                    </span>
                    , and I love games, so I craft scenes and assets that feel like they belong inside one.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-[#8b949e] mb-6">
                    I also design and develop modern web applications, interactive 3D tools, and client websites that are fast, intuitive, and production-ready. Whether it&apos;s crafting low/medium-poly architecture, sculpting lush game environments, or engineering clean web platforms, I&apos;m always learning and building.
                  </p>
                </>
              ) : (
                <>
                  <p className="text-sm sm:text-base leading-relaxed text-[#c9d1d9] mb-5">
                    Saya adalah siswa SMK jurusan{" "}
                    <span className="text-white font-medium underline decoration-[#8A6FB5] underline-offset-4">
                      Animasi
                    </span>
                    . Sebagian besar waktu berkarya saya dedikasikan untuk{" "}
                    <span className="text-[#c7b2e8] font-semibold">
                      seni 3D di Blender
                    </span>
                    . Kecintaan saya pada game mendorong saya membuat objek dan lingkungan yang bernuansa dunia game.
                  </p>
                  <p className="text-sm sm:text-base leading-relaxed text-[#8b949e] mb-6">
                    Saya juga merancang dan mengembangkan aplikasi web modern, alat 3D interaktif, serta website klien yang cepat, intuitif, dan siap produksi. Baik itu membuat arsitektur low/medium-poly, lingkungan alam game, maupun rekayasa platform web yang modular, saya selalu belajar dan berkarya.
                  </p>
                </>
              )}
            </div>

            <div className="pt-4 border-t border-[#30363d]/80 flex flex-wrap gap-2 text-xs mt-auto">
              <span className="px-3 py-1.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                📍 {lang === "EN" ? "Vocational High School (SMK)" : "SMK Jurusan Animasi"}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                🎮 {lang === "EN" ? "Game Environment Art" : "Seni Lingkungan Game"}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                ⚡ {lang === "EN" ? "Web & Client Projects" : "Web Development & Proyek Klien"}
              </span>
            </div>
          </div>

          {/* Quick Info Table */}
          <div className="lg:col-span-5 bg-[#161b22] border border-[#30363d] rounded-2xl p-6 sm:p-8 max-md:p-5 shadow-xl flex flex-col justify-between h-full">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-[#8b949e] mb-4">
                {lang === "EN" ? "Quick Profile" : "Profil Singkat"}
              </h3>
              <div className="space-y-3 max-md:grid max-md:grid-cols-2 max-md:gap-2 max-md:space-y-0">
                {details.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 max-md:p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d]/60 flex items-start gap-3 max-md:flex-col max-md:gap-1.5 transition-colors hover:border-[#8A6FB5]/40"
                  >
                    <div className="mt-0.5 shrink-0 p-1.5 rounded-lg bg-[#161b22]">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs text-[#8b949e] font-medium">
                        {item.label}
                      </div>
                      <div className="text-sm max-md:text-xs font-semibold text-white mt-0.5">
                        {item.value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#30363d]/60 mt-4 flex items-center justify-between text-xs text-[#8b949e]">
              <span>{lang === "EN" ? "Location: Indonesia" : "Lokasi: Indonesia"}</span>
              <span className="text-[#8A6FB5] font-semibold">
                {lang === "EN" ? "Active Student" : "Siswa Aktif"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
