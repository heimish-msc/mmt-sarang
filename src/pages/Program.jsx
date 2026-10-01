import { useLanguage } from "../i18n/LanguageContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ProgramApproach from "../components/ProgramApproach.jsx";
import ProgramTable from "../components/ProgramTable.jsx";
import ProgramHighlight from "../components/ProgramHighlight.jsx";
import TestimonialCarousel from "../components/TestimonialCarousel.jsx";
import "./Page.css";
import "./Program.css";

export default function Program() {
  const { t } = useLanguage();
  const { program } = t;

  return (
    <section id="top" className="section page">
      <div className="container">
        <PageHeader eyebrow={program.eyebrow} heading={program.heading} />

        <ProgramApproach approach={program.approach} />

        <div className="program-page__block">
          <ProgramTable
            rows={program.programs}
            labels={{ program: "Program", format: "Format", experience: "Experience" }}
          />
        </div>

        <div className="program-page__block" id="embodied-listening">
          <ProgramHighlight highlight={program.highlight} />
        </div>

        <div className="program-page__block">
          <TestimonialCarousel {...program.testimonials} />
        </div>
      </div>
    </section>
  );
}
