import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./Header.css";

export default function Header() {
  const { t, lang, toggleLang } = useLanguage();

  return (
    <header className="header">
      <div className="container header__inner">
        <a href="#top" className="header__wordmark">
          <img src="/images/name.png" alt={t.nav.name} className="header__logo" />
        </a>
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
      </div>
    </header>
  );
}
