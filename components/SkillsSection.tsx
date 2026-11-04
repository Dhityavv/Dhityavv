"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import {
  Wrench,
  Sparkles,
  Box,
  Layers,
  Gamepad2,
  Terminal,
  GitBranch,
  Code2,
  CheckCircle2,
} from "lucide-react";

interface SkillItem {
  name: string;
  category: "3D & Art" | "Gaming & Modding" | "Development";
  badge: string;
  badgeEn?: string;
  badgeId?: string;
  desc: string;
  descEn?: string;
  descId?: string;
  level: string;
  levelEn?: string;
  levelId?: string;
  icon: React.ReactNode;
}

const SKILLS: SkillItem[] = [
  {
    name: "Blender 3D",
    category: "3D & Art",
    badge: "Primary Tool",
    badgeEn: "Primary Tool",
    badgeId: "Alat Utama",
    desc: "Medium-poly modeling, scene layout, procedural materials, and lighting setups.",
    descEn: "Medium-poly modeling, scene layout, procedural materials, and lighting setups.",
    descId: "Pemodelan medium-poly, penataan layout scene, material prosedural, dan setup tata cahaya.",
    level: "Core Focus",
    levelEn: "Core Focus",
    levelId: "Fokus Utama",
    icon: <Box className="w-5 h-5 text-[#8A6FB5]" />,
  },
  {
    name: "Geometry Nodes",
    category: "3D & Art",
    badge: "Procedural",
    badgeEn: "Procedural",
    badgeId: "Prosedural",
    desc: "Procedural generation, scattering foliage, terrain creation, and node-based workflows.",
    descEn: "Procedural generation, scattering foliage, terrain creation, and node-based workflows.",
    descId: "Generasi prosedural, penyebaran vegetasi daun, pembentukan kontur tanah, dan alur node.",
    level: "Practicing",
    levelEn: "Practicing",
    levelId: "Berlatih Aktif",
    icon: <Layers className="w-5 h-5 text-[#8A6FB5]" />,
  },
  {
    name: "Canva & Graphics",
    category: "3D & Art",
    badge: "Design",
    badgeEn: "Design",
    badgeId: "Desain Grafis",
    desc: "Post-processing, visual layout, presentation boards, and portfolio graphic cards.",
    descEn: "Post-processing, visual layout, presentation boards, and portfolio graphic cards.",
    descId: "Post-processing gambar render, tata letak visual, papan presentasi, dan kartu grafis portofolio.",
    level: "Proficient",
    levelEn: "Proficient",
    levelId: "Mahir",
    icon: <Sparkles className="w-5 h-5 text-amber-400" />,
  },
  {
    name: "Minecraft",
    category: "Gaming & Modding",
    badge: "Creative",
    badgeEn: "Creative",
    badgeId: "Kreatif",
    desc: "World building, architectural builds, aesthetics, and technical game mechanics.",
    descEn: "World building, architectural builds, aesthetics, and technical game mechanics.",
    descId: "Pembangunan dunia survival, kreasi arsitektur, estetika blok, dan mekanika teknis game.",
    level: "Enthusiast",
    levelEn: "Enthusiast",
    levelId: "Penggemar",
    icon: <Gamepad2 className="w-5 h-5 text-emerald-400" />,
  },
  {
    name: "Fabric Mod Loader",
    category: "Gaming & Modding",
    badge: "Modding",
    badgeEn: "Modding",
    badgeId: "Modifikasi",
    desc: "Configuring client & server optimization mods, shaderpacks, and custom modpacks.",
    descEn: "Configuring client & server optimization mods, shaderpacks, and custom modpacks.",
    descId: "Konfigurasi mod optimasi client & server, shaderpack realistis, dan kustomisasi modpack Fabric.",
    level: "Active",
    levelEn: "Active",
    levelId: "Aktif",
    icon: <Wrench className="w-5 h-5 text-blue-400" />,
  },
  {
    name: "Node.js & JavaScript",
    category: "Development",
    badge: "Code",
    badgeEn: "Code",
    badgeId: "Pemrograman",
    desc: "Building small web experiments, scripting tools, and running local developer environments.",
    descEn: "Building small web experiments, scripting tools, and running local developer environments.",
    descId: "Membangun eksperimen aplikasi web, otomasi skrip, dan konfigurasi lingkungan developer lokal.",
    level: "Learning",
    levelEn: "Learning",
    levelId: "Mempelajari",
    icon: <Terminal className="w-5 h-5 text-green-400" />,
  },
  {
    name: "Git & Version Control",
    category: "Development",
    badge: "Workflow",
    badgeEn: "Workflow",
    badgeId: "Alur Kerja",
    desc: "Branching, commits, asset tracking, and collaborative GitHub repository management.",
    descEn: "Branching, commits, asset tracking, and collaborative GitHub repository management.",
    descId: "Manajemen branch, commit terstruktur, pelacakan revisi aset, dan kolaborasi repositori.",
    level: "Practicing",
    levelEn: "Practicing",
    levelId: "Menerapkan",
    icon: <GitBranch className="w-5 h-5 text-orange-400" />,
  },
  {
    name: "GitHub",
    category: "Development",
    badge: "Showcase",
    badgeEn: "Showcase",
    badgeId: "Showcase",
    desc: "Hosting projects, managing profile READMEs, documentation, and open source exploration.",
    descEn: "Hosting projects, managing profile READMEs, documentation, and open source exploration.",
    descId: "Hosting repositori proyek, pengelolaan dokumentasi README profil, dan eksplorasi open-source.",
    level: "Active",
    levelEn: "Active",
    levelId: "Aktif",
    icon: <Code2 className="w-5 h-5 text-purple-400" />,
  },
];

const PRACTICE_AREAS_EN = [
  "Medium-poly modeling",
  "Geometry Nodes",
  "Environment layout",
  "Stylized materials & PBR",
  "Armature & weight painting",
  "Creative web design",
];

const PRACTICE_AREAS_ID = [
  "Pemodelan medium-poly",
  "Geometry Nodes",
  "Tata letak lingkungan",
  "Material stylized & PBR",
  "Armature & weight painting",
  "Desain web kreatif",
];

export function SkillsSection() {
  const { lang } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: lang === "EN" ? "All" : "Semua" },
    { id: "3D & Art", label: lang === "EN" ? "3D & Art" : "Seni & 3D" },
    { id: "Gaming & Modding", label: lang === "EN" ? "Gaming & Modding" : "Game & Modding" },
    { id: "Development", label: lang === "EN" ? "Development" : "Pemrograman" },
  ];

  const filteredSkills =
    selectedCategory === "All"
      ? SKILLS
      : SKILLS.filter((s) => s.category === selectedCategory);

  const practiceAreas = lang === "EN" ? PRACTICE_AREAS_EN : PRACTICE_AREAS_ID;

  return (
    <section id="skills" className="py-16 max-md:py-12 border-t border-[#30363d]/60 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#161b22] border border-[#30363d] text-xs font-semibold text-[#8A6FB5] mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>{lang === "EN" ? "Tools & Workflow" : "Alat & Alur Kerja"}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {lang === "EN" ? "Tools, Technologies & Interests" : "Alat, Teknologi & Keahlian"}
          </h2>
          <p className="text-sm text-[#8b949e] mt-2">
            {lang === "EN"
              ? "The software, frameworks, and creative disciplines I practice daily"
              : "Software, framework, dan keahlian kreatif yang saya gunakan sehari-hari"}
          </p>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6 max-md:flex-nowrap max-md:justify-start max-md:overflow-x-auto max-md:-mx-4 max-md:px-4 max-md:pb-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 max-md:shrink-0 rounded-lg text-xs font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#8A6FB5] text-white shadow-md shadow-[#8A6FB5]/25"
                    : "bg-[#161b22] text-[#8b949e] border border-[#30363d] hover:text-white hover:bg-[#21262d]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-md:grid-cols-2 max-md:gap-3 max-md:mb-7 mb-10">
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              className="p-5 max-md:p-3.5 rounded-2xl bg-[#161b22] border border-[#30363d] hover:border-[#8A6FB5]/60 transition-all hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2.5 rounded-xl bg-[#0d1117] border border-[#30363d]/80">
                    {skill.icon}
                  </div>
                  <span className="text-[11px] max-md:text-[9px] font-mono px-2 max-md:px-1.5 py-0.5 rounded-md bg-[#0d1117] border border-[#30363d] text-[#8b949e]">
                    {lang === "EN" ? skill.badgeEn || skill.badge : skill.badgeId || skill.badge}
                  </span>
                </div>
                <h3 className="text-base max-md:text-sm font-bold text-white mb-1">
                  {skill.name}
                </h3>
                <p className="text-xs text-[#8b949e] leading-relaxed">
                  {lang === "EN" ? skill.descEn || skill.desc : skill.descId || skill.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#30363d]/50 flex items-center justify-between text-xs">
                <span className="text-[#8b949e]">{lang === "EN" ? "Focus" : "Fokus"}</span>
                <span className="font-semibold text-[#8A6FB5]">
                  {lang === "EN" ? skill.levelEn || skill.level : skill.levelId || skill.level}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* What I've been practicing callout from README */}
        <div className="p-6 max-md:p-4 rounded-2xl bg-gradient-to-r from-[#161b22] to-[#1c222c] border border-[#30363d] shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-bold uppercase tracking-wider text-white">
              {lang === "EN" ? "What I've Been Actively Practicing" : "Keahlian yang Sedang Aktif Dipelajari"}
            </h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-md:gap-2 pt-2">
            {practiceAreas.map((area, idx) => (
              <div
                key={idx}
                className="p-3 max-md:p-2 rounded-xl bg-[#0d1117] border border-[#30363d]/80 text-xs max-md:text-[10px] font-medium text-[#c9d1d9] flex items-center gap-2 max-md:gap-1.5 hover:border-[#8A6FB5]/50 transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#8A6FB5] shrink-0" />
                <span className="line-clamp-2">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
