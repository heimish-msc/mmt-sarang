import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { PullQuote } from "../ds/editorial/PullQuote.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./Hero.css";

export default function Hero() {
  const { t } = useLanguage();
  const { hero } = t;

  return (
    <section id="top" className="hero">
      <div className="container">
        <Figure
          src="/images/hero/01.png"
          alt={hero.name}
          ratio="16/9"
          className="hero__photo"
        />

        <div className="hero__identity">
          <DisplayHeading as="h1" size="xl">
            {hero.name}
          </DisplayHeading>
          <Caption tone="muted" style={{ marginTop: 20, marginLeft: 4, fontSize: 14 }}>
            {hero.role}
          </Caption>
        </div>

        <div className="hero__philosophy">
          <PullQuote>
            {hero.philosophy.map((line, i) => (
              <span className="hero__philosophy-line" key={i}>
                {line}
              </span>
            ))}
          </PullQuote>
        </div>
      </div>
    </section>
  );
}
