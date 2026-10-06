import { useLanguage } from "../i18n/LanguageContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import WorkshopItem from "../components/WorkshopItem.jsx";
import "./Page.css";

export default function Workshops() {
  const { t } = useLanguage();
  const { workshops } = t;

  return (
    <section id="top" className="section page">
      <div className="container">
        <PageHeader eyebrow={workshops.eyebrow} heading={workshops.heading} />

        <div className="workshop-list">
          {workshops.items.map((item, i) => (
            <WorkshopItem key={i} index={i} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
