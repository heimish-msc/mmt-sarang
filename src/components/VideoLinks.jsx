import { useLanguage } from "../i18n/LanguageContext.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./VideoLinks.css";

const images = ["/images/videos/intro.jpg", "/images/videos/instrument.jpg"];

export default function VideoLinks() {
  const { t } = useLanguage();
  const { videos } = t;

  return (
    <section id="videos" className="section video-links">
      <div className="container">
        <div className="video-links__grid">
          {videos.map((video, i) => (
            <a
              className="video-links__item"
              href={video.href}
              target="_blank"
              rel="noopener noreferrer"
              key={i}
            >
              <Figure src={images[i]} alt={video.alt} ratio="16/9" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
