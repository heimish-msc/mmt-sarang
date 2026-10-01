import { Caption } from "../ds/editorial/Caption.jsx";
import { withBold } from "../lib/richText.jsx";
import "./ProgramApproach.css";

export default function ProgramApproach({ approach }) {
  return (
    <div className="program-approach">
      {approach.eyebrow ? <Caption>{approach.eyebrow}</Caption> : null}
      <h2
        className="program-approach__heading"
        style={{ marginTop: approach.eyebrow ? 20 : 0 }}
      >
        {approach.heading}
      </h2>

      <div className="program-approach__block">
        <h3 className="program-approach__title">{approach.musicTherapyTitle}</h3>
        {approach.musicTherapyBody.map((p, i) => (
          <p className="program-approach__body" key={i}>
            {withBold(p)}
          </p>
        ))}
      </div>

      <div className="program-approach__block">
        <h3 className="program-approach__title">{approach.humanisticTitle}</h3>
        {approach.humanisticBody.map((p, i) => (
          <p className="program-approach__body" key={i}>
            {withBold(p)}
          </p>
        ))}
      </div>
    </div>
  );
}
