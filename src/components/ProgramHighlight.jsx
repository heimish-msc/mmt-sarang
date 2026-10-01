import "./ProgramHighlight.css";

export default function ProgramHighlight({ highlight }) {
  return (
    <div className="program-highlight">
      <img className="program-highlight__image" src={highlight.image} alt={highlight.alt} />
      <a className="program-highlight__apply" href={highlight.applyHref}>
        {highlight.applyLabel} &#8599;
      </a>
    </div>
  );
}
