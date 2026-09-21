import { useState } from "react";
import ImageSlot from "./ImageSlot.jsx";
import "./MediaItem.css";

function EqualHeightImages({ images, alt }) {
  const [ratios, setRatios] = useState({});

  return (
    <div className="media-item__images media-item__images--equal">
      {images.map((src, i) => (
        <img
          key={i}
          className="image-slot__img"
          src={src}
          alt={alt}
          style={{ flex: `${ratios[i] ?? 1} 1 0` }}
          onLoad={(e) => {
            const { naturalWidth, naturalHeight } = e.currentTarget;
            setRatios((prev) => ({ ...prev, [i]: naturalWidth / naturalHeight }));
          }}
        />
      ))}
    </div>
  );
}

export default function MediaItem({ title, description, images, captionBelow = false }) {
  return (
    <article
      className={captionBelow ? "media-item media-item--caption-below" : "media-item"}
      style={{ "--n": images.length }}
    >
      {captionBelow ? (
        <EqualHeightImages images={images} alt={title} />
      ) : (
        <div className="media-item__images">
          {images.map((src, i) => (
            <ImageSlot key={i} src={src} alt={title} />
          ))}
        </div>
      )}
      <div className="media-item__text">
        <h3 className="media-item__title">{title}</h3>
        <p className="media-item__description">{description}</p>
      </div>
    </article>
  );
}
