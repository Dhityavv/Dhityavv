"use client";

import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ShowcaseGallery } from "@/components/ShowcaseGallery";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { GitHubStatsSection } from "@/components/GitHubStatsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] flex flex-col selection:bg-[#8A6FB5]/30 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <AboutSection />
        <ShowcaseGallery />
        <SkillsSection />
        <ProjectsSection />
        <GitHubStatsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
