import { useLanguage } from "../i18n/LanguageContext.jsx";
import "./CulturalRespect.css";

export default function CulturalRespect() {
  const { t, lang } = useLanguage();
  const { culturalRespect } = t;

  return (
    <section id="cultural-respect" className="section cultural-respect">
      <div className="container">
        <div className="cultural-respect__block">
          <h3 className="cultural-respect__title">{culturalRespect.titleEn}</h3>
          {culturalRespect.bodyEn.map((p, i) => (
            <p className="cultural-respect__body" key={i}>
              {p}
            </p>
          ))}
        </div>

        {lang === "ko" ? (
          <div className="cultural-respect__block cultural-respect__block--ko">
            <h3 className="cultural-respect__title cultural-respect__title--ko">
              {culturalRespect.titleKo}
            </h3>
            {culturalRespect.bodyKo.map((p, i) => (
              <p className="cultural-respect__body cultural-respect__body--ko" key={i}>
                {p}
              </p>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
