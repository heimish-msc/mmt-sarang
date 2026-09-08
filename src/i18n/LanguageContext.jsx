import { createContext, useContext, useState } from "react";
import { content as ko } from "./content.ko.js";
import { content as en } from "./content.en.js";

const dictionaries = { ko, en };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");

  const toggleLang = () => setLang((prev) => (prev === "ko" ? "en" : "ko"));

  const value = { lang, toggleLang, t: dictionaries[lang] };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
