import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import { Panel } from "../ds/editorial/Panel.jsx";
import "./ClinicalSessions.css";

export default function ClinicalSessions() {
  const { t } = useLanguage();
  const { sessions } = t;

  return (
    <section id="sessions" className="sessions">
      <Panel tone="paper" pad={0}>
        <div className="container section">
          <Caption>{sessions.eyebrow}</Caption>
          <DisplayHeading size="lg" style={{ marginTop: 20 }}>
            {sessions.heading}
          </DisplayHeading>
          <p className="sessions__intro">{sessions.subheading}</p>

          <div className="sessions__grid">
            {sessions.items.map((item, i) => {
              const index = String(i + 1).padStart(2, "0");
              return (
                <Figure
                  key={i}
                  src={`/images/sessions/${index}.jpg`}
                  alt={item.caption}
                  ratio="3/2"
                  caption={item.caption}
                />
              );
            })}
          </div>
        </div>
      </Panel>
    </section>
  );
}
