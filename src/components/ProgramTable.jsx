import "./ProgramTable.css";

export default function ProgramTable({ rows, labels }) {
  return (
    <div className="program-table">
      <div className="program-table__row program-table__row--head">
        <span>{labels.program}</span>
        <span>{labels.format}</span>
        <span>{labels.experience}</span>
      </div>
      {rows.map((row, i) => (
        <div className="program-table__row" key={i}>
          <span className="program-table__name">{row.name}</span>
          <span className="program-table__format">{row.format}</span>
          <span className="program-table__experience">{row.experience}</span>
        </div>
      ))}
    </div>
  );
}
