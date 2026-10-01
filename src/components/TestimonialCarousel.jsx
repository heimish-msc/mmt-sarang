import { useRef, useState } from "react";
import { Caption } from "../ds/editorial/Caption.jsx";
import "./TestimonialCarousel.css";

const SWIPE_THRESHOLD = 50;

export default function TestimonialCarousel({ eyebrow, heading, intro, items }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = items.length;
  const item = items[index];
  const go = (delta) => {
    setDirection(delta);
    setIndex((i) => (i + delta + total) % total);
  };

  const dragRef = useRef(null);

  const handlePointerDown = (e) => {
    dragRef.current = { startX: e.clientX, dragging: true };
  };

  const endDrag = (e) => {
    if (!dragRef.current?.dragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    dragRef.current.dragging = false;
    if (deltaX <= -SWIPE_THRESHOLD) go(1);
    else if (deltaX >= SWIPE_THRESHOLD) go(-1);
  };

  const label = item.location ? `${item.name} · ${item.location}` : item.name;

  return (
    <div className="testimonials">
      {eyebrow ? <Caption>{eyebrow}</Caption> : null}
      <h2 className="testimonials__heading" style={{ marginTop: eyebrow ? 20 : 0 }}>
        {heading}
      </h2>
      <p className="testimonials__intro">{intro}</p>

      <div className="testimonials__viewport">
        <button
          type="button"
          className="testimonials__arrow testimonials__arrow--prev"
          onClick={() => go(-1)}
          aria-label="Previous"
        >
          &#8249;
        </button>

        <div
          className="testimonials__card"
          key={index}
          data-direction={direction}
          onPointerDown={handlePointerDown}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          <p className="testimonials__label">
            {String(item.number).padStart(2, "0")} · {label}
          </p>

          {item.quotes.map((q, i) => {
            const primary = item.reversed ? q.ko : q.en;
            const primaryLang = item.reversed ? "ko" : "en";
            const secondary = item.reversed ? q.en : q.ko;
            const secondaryLang = item.reversed ? "en" : "ko";
            return (
              <div className="testimonials__quote-pair" key={i}>
                <p className={`testimonials__quote testimonials__quote--${primaryLang}`}>
                  &ldquo;{primary}&rdquo;
                </p>
                <p
                  className={`testimonials__quote testimonials__quote--${secondaryLang} testimonials__quote--secondary`}
                >
                  &ldquo;{secondary}&rdquo;
                </p>
              </div>
            );
          })}

          <p className="testimonials__attribution">— {label}</p>
        </div>

        <button
          type="button"
          className="testimonials__arrow testimonials__arrow--next"
          onClick={() => go(1)}
          aria-label="Next"
        >
          &#8250;
        </button>
      </div>

      <div className="testimonials__controls">
        <span className="testimonials__counter">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>
    </div>
  );
}
