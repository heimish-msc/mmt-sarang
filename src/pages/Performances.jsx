import { useLanguage } from "../i18n/LanguageContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import ImageSlot from "../components/ImageSlot.jsx";
import "./Page.css";
import "./Performances.css";

export default function Performances() {
  const { t } = useLanguage();
  const { performances } = t;

  return (
    <section id="top" className="section page">
      <div className="container">
        <PageHeader eyebrow={performances.eyebrow} heading={performances.heading} />
        <p className="performances__intro">{performances.intro}</p>

        <div className="performances__grid">
          {performances.images.map((src, i) => (
            <ImageSlot key={i} src={src} alt={performances.heading} ratio="3/4" />
          ))}
        </div>
      </div>
    </section>
  );
}
