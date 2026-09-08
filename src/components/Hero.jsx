import { useLanguage } from "../i18n/LanguageContext.jsx";
import { PageMeta } from "../ds/editorial/PageMeta.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();
  const { hero } = t;

  return (
    <section id="top" className="hero">
      <div className="container">
        <PageMeta items={hero.meta} />
        <div className="hero__body">
          <DisplayHeading as="h1" size="xxl">
            {hero.headline.map((line, i) => (
              <span key={i}>
                {line}
                {i < hero.headline.length - 1 ? <br /> : null}
              </span>
            ))}
          </DisplayHeading>
          <div className="hero__bio">
            {hero.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
