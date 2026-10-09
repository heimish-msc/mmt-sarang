import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { Figure } from "../ds/editorial/Figure.jsx";
import "./Recommendation.css";

export default function Recommendation() {
  const { t, lang } = useLanguage();
  const { recommendation } = t;

  return (
    <section id="recommendation" className="section recommendation">
      <div className="container">
        {recommendation.eyebrow ? <Caption>{recommendation.eyebrow}</Caption> : null}
        <DisplayHeading size="md" style={{ marginTop: recommendation.eyebrow ? 20 : 0 }}>
          {recommendation.heading}
        </DisplayHeading>
        {recommendation.intro ? (
          <p className="recommendation__intro">{recommendation.intro}</p>
        ) : null}

        <div className="recommendation__letters">
          {recommendation.letters.map((letter, i) => {
            const hasKo = lang === "ko" && Boolean(letter.paragraphsKo);
            const pair = hasKo && !letter.photo;
            const koBlock = hasKo ? (
              <div className="recommendation__block--ko">
                {letter.noteKo ? <p className="recommendation__note--ko">{letter.noteKo}</p> : null}
                {letter.headingKo ? (
                  <h4 className="recommendation__heading--ko">{letter.headingKo}</h4>
                ) : null}
                {letter.paragraphsKo.map((p, j) => (
                  <p className="recommendation__paragraph recommendation__paragraph--ko" key={j}>
                    {p}
                  </p>
                ))}
                <div className="recommendation__signature">
                  <Caption>{letter.nameKo}</Caption>
                  <Caption style={{ opacity: 0.65, marginTop: 4 }}>{letter.titleKo}</Caption>
                  <Caption style={{ opacity: 0.65, marginTop: 2 }}>{letter.affiliationKo}</Caption>
                </div>
              </div>
            ) : null;

            return (
            <div
              className={[
                "recommendation__letter",
                letter.photo ? "recommendation__letter--with-photo" : "",
                pair ? "recommendation__letter--pair" : "",
              ].join(" ")}
              key={i}
            >
              {letter.photo ? (
                <Figure
                  src={letter.photo}
                  alt={letter.name}
                  ratio="4/5"
                  className="recommendation__photo"
                />
              ) : null}
              <div className="recommendation__text">
                {letter.paragraphs.map((p, j) => (
                  <p className="recommendation__paragraph" key={j}>
                    {p}
                  </p>
                ))}
                <div className="recommendation__signature">
                  <Caption>{letter.name}</Caption>
                  <Caption style={{ opacity: 0.65, marginTop: 4 }}>{letter.title}</Caption>
                  <Caption style={{ opacity: 0.65, marginTop: 2 }}>
                    {letter.affiliation}
                  </Caption>
                </div>

                {!pair ? koBlock : null}
              </div>
              {pair ? <div className="recommendation__text">{koBlock}</div> : null}
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
