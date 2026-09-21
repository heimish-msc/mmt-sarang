import { useLanguage } from "../i18n/LanguageContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import "./Page.css";

export default function Program() {
  const { t } = useLanguage();
  const { program } = t;

  return (
    <section id="top" className="section page">
      <div className="container">
        <PageHeader eyebrow={program.eyebrow} heading={program.heading} />
      </div>
    </section>
  );
}
