import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";

export default function PageHeader({ eyebrow, heading }) {
  return (
    <>
      {eyebrow ? <Caption>{eyebrow}</Caption> : null}
      <DisplayHeading size="md" style={{ marginTop: eyebrow ? 20 : 0 }}>
        {heading}
      </DisplayHeading>
    </>
  );
}
