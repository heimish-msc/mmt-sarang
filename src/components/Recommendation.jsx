import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./Recommendation.css";

export default function Recommendation() {
  const { t } = useLanguage();
  const { recommendation } = t;

  return (
    <section id="recommendation" className="section recommendation">
      <div className="container">
        {recommendation.eyebrow ? <Caption>{recommendation.eyebrow}</Caption> : null}
        <DisplayHeading size="md" style={{ marginTop: recommendation.eyebrow ? 20 : 0 }}>
          {recommendation.heading}
        </DisplayHeading>

        <div className="recommendation__letters">
          {recommendation.letters.map((letter, i) => (
            <div
              className={
                letter.photo
                  ? "recommendation__letter recommendation__letter--with-photo"
                  : "recommendation__letter"
              }
              key={i}
            >
              {letter.photo ? (
                <Figure
                  src={letter.photo}
                  alt={letter.name}
                  ratio="4/5"
                  className="recommendation__photo"
                />
              ) : null}
              <div className="recommendation__text">
                {letter.paragraphs.map((p, j) => (
                  <p className="recommendation__paragraph" key={j}>
                    {p}
                  </p>
                ))}
                <div className="recommendation__signature">
                  <Caption>{letter.name}</Caption>
                  <Caption style={{ opacity: 0.65, marginTop: 4 }}>{letter.title}</Caption>
                  <Caption style={{ opacity: 0.65, marginTop: 2 }}>
                    {letter.affiliation}
                  </Caption>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
