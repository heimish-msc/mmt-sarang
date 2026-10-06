import { useEffect, useState } from "react";
import { useLanguage } from "../i18n/LanguageContext.jsx";
import { ROUTES, hrefFor } from "../router.js";
import "./Header.css";

function MenuIcon({ open }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" aria-hidden="true">
      {open ? (
        <>
          <path d="M5 5L19 19" />
          <path d="M19 5L5 19" />
        </>
      ) : (
        <>
          <path d="M3 7H21" />
          <path d="M3 12H21" />
          <path d="M3 17H21" />
        </>
      )}
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  );
}

export default function Header({ route }) {
  const { t, lang, toggleLang } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#/" className="header__wordmark">
          <img src="/images/name.png" alt={t.nav.name} className="header__logo" />
        </a>
        <div className="header__actions">
          <button
            type="button"
            className="header__toggle"
            onClick={toggleLang}
            aria-label="Toggle language"
          >
            <span className={lang === "ko" ? "is-active" : ""}>KO</span>
            <span className="header__toggle-sep">/</span>
            <span className={lang === "en" ? "is-active" : ""}>EN</span>
          </button>
          <button
            type="button"
            className="header__menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="site-menu"
          >
            <MenuIcon open={false} />
          </button>
        </div>
      </div>

      <div
        className={open ? "header__backdrop is-open" : "header__backdrop"}
        onClick={() => setOpen(false)}
      />
      <aside
        id="site-menu"
        className={open ? "header__drawer is-open" : "header__drawer"}
        aria-label="Menu"
      >
        <button
          type="button"
          className="header__menu-button header__drawer-close"
          onClick={() => setOpen(false)}
          aria-label="Close menu"
        >
          <MenuIcon open />
        </button>
        <nav className="header__nav" aria-label="Primary">
          {ROUTES.map((r) => (
            <a
              key={r}
              href={hrefFor(r)}
              className={r === route ? "header__nav-link is-active" : "header__nav-link"}
              aria-current={r === route ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {t.nav[r]}
            </a>
          ))}
        </nav>
        <a href="#/admin" className="header__settings" aria-label="Admin" onClick={() => setOpen(false)}>
          <SettingsIcon />
        </a>
      </aside>
    </header>
  );
}
