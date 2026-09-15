import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./Thesis.css";

export default function Thesis() {
  const { t } = useLanguage();
  const { thesis } = t;

  return (
    <section id="thesis" className="section thesis">
      <div className="container">
        {thesis.eyebrow ? <Caption>{thesis.eyebrow}</Caption> : null}
        <DisplayHeading size="md" style={{ marginTop: thesis.eyebrow ? 20 : 0 }}>
          {thesis.heading}
        </DisplayHeading>

        <div className="thesis__layout">
          <Figure
            src="/images/thesis/02.jpg"
            alt={thesis.heading}
            ratio="2/3"
            className="thesis__photo"
          />
          <p className="thesis__summary">{thesis.summary}</p>
        </div>
      </div>
    </section>
  );
}
