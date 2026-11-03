"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "EN" | "ID";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
}

const LanguageContext = createContext<LanguageContextType>({
  lang: "EN",
  setLang: () => {},
  toggleLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Default to English as explicitly requested: "by default English"
  const [lang, setLangState] = useState<Language>("EN");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_lang") as Language;
      if (saved === "EN" || saved === "ID") {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable or restricted
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem("portfolio_lang", newLang);
    } catch {
      // ignore
    }
  };

  const toggleLang = () => {
    setLang(lang === "EN" ? "ID" : "EN");
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
