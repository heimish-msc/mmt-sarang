import { useEffect, useRef, useState } from "react";
import { EqualHeightImages } from "./MediaItem.jsx";
import "./WorkshopItem.css";

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return [ref, visible];
}

function StackedImages({ images, alt }) {
  const [ratios, setRatios] = useState(null);

  useEffect(() => {
    let alive = true;
    Promise.all(
      images.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img.naturalWidth / img.naturalHeight);
            img.onerror = () => resolve(1);
            img.src = src;
          })
      )
    ).then((r) => alive && setRatios(r));
    return () => {
      alive = false;
    };
  }, [images]);

  if (!ratios) {
    return <EqualHeightImages images={images} alt={alt} className="workshop__images" />;
  }

  const widest = ratios.indexOf(Math.max(...ratios));
  const rest = images.filter((_, i) => i !== widest);

  return (
    <div className="workshop__stack">
      <EqualHeightImages images={rest} alt={alt} className="workshop__images" />
      <img className="image-slot__img" src={images[widest]} alt={alt} />
    </div>
  );
}

export default function WorkshopItem({ index, title, description, images }) {
  const [ref, visible] = useReveal();
  const number = String(index + 1).padStart(2, "0");
  const stacked = images.length >= 3;
  const wide = images.length > 1 && !stacked;

  return (
    <article
      ref={ref}
      className={[
        "workshop",
        index % 2 === 1 ? "workshop--reverse" : "",
        wide ? "workshop--wide" : "",
        stacked ? "workshop--stacked" : "",
        visible ? "is-visible" : "",
      ].join(" ")}
    >
      <div className="workshop__media">
        {stacked ? (
          <StackedImages images={images} alt={title} />
        ) : (
          <EqualHeightImages images={images} alt={title} className="workshop__images" />
        )}
      </div>
      <div className="workshop__text">
        <span className="workshop__number" aria-hidden="true">
          {number}
        </span>
        <h3 className="workshop__title">{title}</h3>
        <p className="workshop__description">{description}</p>
      </div>
    </article>
  );
}
