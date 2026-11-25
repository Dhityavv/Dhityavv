'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { Project, RenderItem } from '@/types/portfolio';

interface ModalContextType {
  activeCaseStudy: Project | null;
  openCaseStudy: (project: Project) => void;
  closeCaseStudy: () => void;
  selectedArtwork: RenderItem | null;
  openArtwork: (artwork: RenderItem) => void;
  closeArtwork: () => void;
  isCvOpen: boolean;
  openCv: () => void;
  closeCv: () => void;
  isContactFormOpen: boolean;
  openContactForm: () => void;
  closeContactForm: () => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  isAnyModalOpen: boolean;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const [activeCaseStudy, setActiveCaseStudy] = useState<Project | null>(null);
  const [selectedArtwork, setSelectedArtwork] = useState<RenderItem | null>(null);
  const [isCvOpen, setIsCvOpen] = useState(false);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Close any open modals when route changes so browser Back/Forward never leaks scroll-lock
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    if (activeCaseStudy !== null) setActiveCaseStudy(null);
    if (selectedArtwork !== null) setSelectedArtwork(null);
    if (isCvOpen) setIsCvOpen(false);
    if (isContactFormOpen) setIsContactFormOpen(false);
  }

  const openCaseStudy = useCallback((project: Project) => setActiveCaseStudy(project), []);
  const closeCaseStudy = useCallback(() => setActiveCaseStudy(null), []);

  const openArtwork = useCallback((artwork: RenderItem) => setSelectedArtwork(artwork), []);
  const closeArtwork = useCallback(() => setSelectedArtwork(null), []);

  const openCv = useCallback(() => setIsCvOpen(true), []);
  const closeCv = useCallback(() => setIsCvOpen(false), []);

  const openContactForm = useCallback(() => setIsContactFormOpen(true), []);
  const closeContactForm = useCallback(() => setIsContactFormOpen(false), []);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  // Comprehensive Body & HTML Scroll Lock whenever any modal / GUI is open
  useEffect(() => {
    const isAnyModalOpen =
      activeCaseStudy !== null ||
      selectedArtwork !== null ||
      isCvOpen ||
      isContactFormOpen;

    if (isAnyModalOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      if (scrollBarWidth > 0) {
        document.body.style.paddingRight = `${scrollBarWidth}px`;
      }
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      document.body.style.touchAction = '';
      document.body.style.paddingRight = '';
    };
  }, [activeCaseStudy, selectedArtwork, isCvOpen, isContactFormOpen]);

  const isAnyModalOpen =
    activeCaseStudy !== null ||
    selectedArtwork !== null ||
    isCvOpen ||
    isContactFormOpen;

  return (
    <ModalContext.Provider
      value={{
        activeCaseStudy,
        openCaseStudy,
        closeCaseStudy,
        selectedArtwork,
        openArtwork,
        closeArtwork,
        isCvOpen,
        openCv,
        closeCv,
        isContactFormOpen,
        openContactForm,
        closeContactForm,
        toastMessage,
        showToast,
        isAnyModalOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
