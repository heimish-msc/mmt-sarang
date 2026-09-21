import "./ImageSlot.css";

export default function ImageSlot({ src, alt = "", ratio = "4/3" }) {
  if (src) return <img className="image-slot__img" src={src} alt={alt} />;
  return <div className="image-slot" style={{ aspectRatio: ratio }} role="img" aria-label={alt} />;
}
