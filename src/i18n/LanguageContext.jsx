import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { content as ko } from "./content.ko.js";
import { content as en } from "./content.en.js";
import { deepMerge } from "./merge.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("ko");
  const [overrides, setOverrides] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 2000);
    fetch("/api/content", { signal: controller.signal, cache: "no-cache" })
      .then((res) => (res.ok ? res.json() : {}))
      .catch(() => ({}))
      .then((data) => setOverrides(data && typeof data === "object" ? data : {}))
      .finally(() => clearTimeout(timer));
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  const dictionaries = useMemo(
    () => ({ ko: deepMerge(ko, overrides?.ko), en: deepMerge(en, overrides?.en) }),
    [overrides]
  );

  if (overrides === null) return null;

  const toggleLang = () => setLang((prev) => (prev === "ko" ? "en" : "ko"));
  const value = { lang, toggleLang, t: dictionaries[lang] };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
