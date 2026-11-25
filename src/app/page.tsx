import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Interactive3D } from '@/components/Interactive3D';
import { About } from '@/components/About';
import { Showcase3D } from '@/components/Showcase3D';
import { Projects } from '@/components/Projects';
import { Experience } from '@/components/Experience';
import { Skills } from '@/components/Skills';
import { Contact } from '@/components/Contact';
import { CaseStudyModal } from '@/components/CaseStudyModal';
import { CvModal } from '@/components/CvModal';
import { ContactFormModal } from '@/components/ContactFormModal';
import { Toast } from '@/components/Toast';
import DataRain from '@/components/ui/data-rain';

export default function Home() {
  return (
    <>
      {/* 21st.dev Fluid Data Rain Cyber Ambient Background Stack (Fixed Behind Screen) */}
      <div className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <DataRain
          count={1100}
          flowSpeed={0.65}
          autopilot={false}
          interactive={false}
          fullscreen={true}
        />
        <div className="absolute inset-0 bg-tech-grid opacity-50 pointer-events-none" />
      </div>

      {/* Centered Floating Capsule Glass Dock Navigation */}
      <Navbar />

      {/* Main Portfolio Sections */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 sm:pt-28 pb-12 sm:pb-20 space-y-24 sm:space-y-32">
        <Hero />
        <Interactive3D />
        <About />
        <Showcase3D />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>

      {/* Interactive Modals & Toast Notifications */}
      <CaseStudyModal />
      <CvModal />
      <ContactFormModal />
      <Toast />
    </>
  );
}
