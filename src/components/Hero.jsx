import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { PullQuote } from "../ds/editorial/PullQuote.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import { withBold } from "../lib/richText.jsx";
import SubscribeForm from "./SubscribeForm.jsx";
import "./Hero.css";

function ActionLink({ href, className, children }) {
  const external = /^https?:/.test(href);
  return (
    <a
      className={className}
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const { hero } = t;

  return (
    <section id="top" className="hero">
      <div className="container">
        <img src="/favicon.png" alt="" className="hero__logo" />

        {hero.courseButton?.label ? (
          <div className="hero__cta">
            <ActionLink className="hero__course-button" href={hero.courseButton.href}>
              {hero.courseButton.label}
            </ActionLink>
          </div>
        ) : null}

        <Figure
          src={hero.photo}
          alt={hero.name}
          ratio="16/9"
          className="hero__photo"
        />

        <div className="hero__intro">
          <div className="hero__identity">
            <DisplayHeading as="h1" size="xl">
              {hero.name}
            </DisplayHeading>
            <Caption tone="muted" style={{ marginTop: 20, marginLeft: 4, fontSize: 14 }}>
              {hero.role}
            </Caption>
          </div>

          {hero.bio ? (
            <div className="hero__bio">
              {hero.bio.map((p, i) => (
                <p className="hero__bio-paragraph" key={i}>
                  {withBold(p)}
                </p>
              ))}
              {hero.subscribeButton?.title ? <SubscribeForm copy={hero.subscribeButton} lang={lang} /> : null}
            </div>
          ) : null}
        </div>

        <div className="hero__philosophy">
          <PullQuote>
            {hero.philosophy.map((line, i) => (
              <span className={`hero__philosophy-line hero__philosophy-line--${i}`} key={i}>
                {line}
              </span>
            ))}
          </PullQuote>
        </div>
      </div>

    </section>
  );
}
