import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./Achievements.css";

export default function Achievements() {
  const { t } = useLanguage();
  const { achievements } = t;

  return (
    <section id="achievements" className="section achievements">
      <div className="container">
        <Caption>{achievements.eyebrow}</Caption>
        <DisplayHeading size="lg" style={{ marginTop: 20 }}>
          {achievements.heading}
        </DisplayHeading>
        <p className="achievements__intro">{achievements.subheading}</p>

        <div className="achievements__grid">
          {achievements.items.map((item, i) => {
            const index = String(i + 1).padStart(2, "0");
            return (
              <div className="achievement-card" key={i}>
                <Figure
                  src={`/images/achievements/${index}.jpg`}
                  alt={item.caption}
                  ratio="4/5"
                  index={index}
                />
                <div className="achievement-card__meta">
                  <Caption tone="signal">{item.tag}</Caption>
                  <Caption tone="faint">{item.year}</Caption>
                </div>
                <p className="achievement-card__caption">{item.caption}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
