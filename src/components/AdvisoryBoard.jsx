import { useLanguage } from "../i18n/LanguageContext.jsx";
import { DisplayHeading } from "../ds/editorial/DisplayHeading.jsx";
import { Caption } from "../ds/editorial/Caption.jsx";
import { CircleBadge } from "../ds/core/CircleBadge.jsx";
import "./AdvisoryBoard.css";

export default function AdvisoryBoard() {
  const { t } = useLanguage();
  const { advisoryBoard } = t;

  return (
    <section id="advisory-board" className="section advisory-board">
      <div className="container">
        {advisoryBoard.eyebrow ? <Caption>{advisoryBoard.eyebrow}</Caption> : null}
        <DisplayHeading size="md" style={{ marginTop: advisoryBoard.eyebrow ? 20 : 0 }}>
          {advisoryBoard.heading}
        </DisplayHeading>

        <div className="advisory-board__grid">
          {advisoryBoard.members.map((member, i) => {
            const index = String(i + 1).padStart(2, "0");
            const [nameEn, ...restEn] = member.linesEn;
            return (
              <div className="advisory-board__card" key={i}>
                <CircleBadge>{index}</CircleBadge>

                <div className="advisory-board__name">
                  <span className="advisory-board__name-text">{nameEn}</span>
                </div>

                <div className="advisory-board__block">
                  {restEn.map((line, j) => (
                    <p className="advisory-board__line" key={j}>
                      {line}
                    </p>
                  ))}
                </div>

                <div className="advisory-board__block advisory-board__block--ko">
                  {member.linesKo.map((line, j) => (
                    <p className="advisory-board__line advisory-board__line--ko" key={j}>
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
