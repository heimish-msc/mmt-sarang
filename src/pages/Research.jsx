import { useLanguage } from "../i18n/LanguageContext.jsx";
import PageHeader from "../components/PageHeader.jsx";
import MediaItem from "../components/MediaItem.jsx";
import MediumPosts from "../components/MediumPosts.jsx";
import "./Page.css";

export default function Research() {
  const { t } = useLanguage();
  const { research } = t;
  const { writing } = research;

  return (
    <section id="top" className="section page">
      <div className="container">
        <PageHeader eyebrow={research.eyebrow} heading={research.heading} />

        <div className="media-list">
          {research.items.map((item, i) => (
            <MediaItem key={i} {...item} />
          ))}

          <MediumPosts {...writing} />
        </div>
      </div>
    </section>
  );
}
