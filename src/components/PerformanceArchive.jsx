import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./PerformanceArchive.css";

const POSTER_COUNT = 10;

export default function PerformanceArchive() {
  const { t } = useLanguage();
  const { performances } = t;

  return (
    <section id="performances" className="section performances">
      <div className="container">
        <Caption>{performances.eyebrow}</Caption>
        <DisplayHeading size="lg" style={{ marginTop: 20 }}>
          {performances.heading}
        </DisplayHeading>
        <p className="performances__intro">{performances.subheading}</p>

        <div className="performances__grid">
          {Array.from({ length: POSTER_COUNT }).map((_, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <Figure
                key={i}
                src={`/images/performances/${index}.jpg`}
                alt=""
                ratio="2/3"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
