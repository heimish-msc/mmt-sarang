import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import { Panel } from "../ds/editorial/Panel.jsx";
import { PullQuote } from "../ds/editorial/PullQuote.jsx";
import "./Testimonials.css";

export default function Testimonials() {
  const { t } = useLanguage();
  const { testimonials } = t;

  return (
    <section id="testimonials" className="testimonials">
      <Panel tone="ink" pad={0}>
        <div className="container section">
          <Caption tone="invert">{testimonials.eyebrow}</Caption>
          <DisplayHeading invert size="lg" style={{ marginTop: 20 }}>
            {testimonials.heading}
          </DisplayHeading>

          <div className="testimonial-head">
            <PullQuote
              invert
              attribution={`${testimonials.head.name} — ${testimonials.head.title}`}
            >
              {testimonials.head.quote}
            </PullQuote>
          </div>
        </div>
      </Panel>

      <div className="container section testimonials__patients">
        {testimonials.patients.map((patient, i) => {
          const index = String(i + 1).padStart(2, "0");
          return (
            <div className="testimonial-card" key={i}>
              <Figure
                src={`/images/testimonials/patient-${index}.jpg`}
                alt={patient.name}
                ratio="1/1"
              />
              <p className="testimonial-card__quote">{patient.quote}</p>
              <Caption tone="faint">{patient.name}</Caption>
            </div>
          );
        })}
      </div>
    </section>
  );
}
