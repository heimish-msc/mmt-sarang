import { useEffect, useRef, useState } from "react";
import { HINTS, HIDDEN_PATHS, labelFor } from "./labels.js";
import { uploadImage } from "./image.js";

const IMAGE_KEYS = new Set(["photo", "image"]);
const LONG_TEXT = 48;
const OBJECT_LIST_KEYS = new Set(["quotes", "items", "letters", "members", "programs", "videos"]);

const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

function itemTitle(item, i) {
  const pick =
    item.title ?? item.name ?? item.heading ?? item.label ?? item.linesEn?.[0] ?? item.paragraphs?.[0] ?? item.en;
  const text = typeof pick === "string" ? pick.replace(/\s+/g, " ").slice(0, 36) : "";
  return `${i + 1}. ${text || "새 항목"}`;
}

function AutoTextarea({ value, onChange }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight + 2}px`;
  }, [value]);
  return <textarea ref={ref} rows={2} value={value} onChange={(e) => onChange(e.target.value)} />;
}

function TextInput({ value, onChange }) {
  if (value.length > LONG_TEXT || value.includes("\n")) return <AutoTextarea value={value} onChange={onChange} />;
  return <input type="text" value={value} onChange={(e) => onChange(e.target.value)} />;
}

function Row({ label, hint, children }) {
  return (
    <label className="adm-field">
      <span className="adm-label">{label}</span>
      {children}
      {hint ? <span className="adm-hint">{hint}</span> : null}
    </label>
  );
}

function ImageBox({ value, onChange, compact }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const input = useRef(null);

  const pick = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      onChange(await uploadImage(file));
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className={compact ? "adm-image adm-image--compact" : "adm-image"}>
      <div className="adm-image__thumb">{value ? <img src={value} alt="" /> : <span>사진 없음</span>}</div>
      <div className="adm-image__actions">
        <button type="button" className="adm-btn adm-btn--small" disabled={busy} onClick={() => input.current?.click()}>
          {busy ? "올리는 중…" : value ? "사진 교체" : "사진 올리기"}
        </button>
        {error ? <span className="adm-error">{error}</span> : null}
      </div>
      <input ref={input} type="file" accept="image/*" hidden onChange={pick} />
    </div>
  );
}

function ListFrame({ title, hint, count, onAdd, addLabel, children }) {
  return (
    <div className="adm-list">
      <div className="adm-list__head">
        <span className="adm-label">
          {title} <em>{count}개</em>
        </span>
        <button type="button" className="adm-btn adm-btn--small" onClick={onAdd}>
          + {addLabel}
        </button>
      </div>
      {hint ? <span className="adm-hint">{hint}</span> : null}
      {children}
    </div>
  );
}

function ItemTools({ index, count, onMove, onRemove }) {
  const stop = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  };
  return (
    <div className="adm-tools">
      <button type="button" className="adm-icon" disabled={index === 0} onClick={stop(() => onMove(index, index - 1))} title="위로">
        ↑
      </button>
      <button type="button" className="adm-icon" disabled={index === count - 1} onClick={stop(() => onMove(index, index + 1))} title="아래로">
        ↓
      </button>
      <button
        type="button"
        className="adm-icon adm-icon--danger"
        onClick={stop(() => window.confirm("이 항목을 삭제할까요?") && onRemove(index))}
        title="삭제"
      >
        ✕
      </button>
    </div>
  );
}

export default function Node({ value, path, ctx }) {
  const key = path[path.length - 1];
  const pathStr = path.join(".");
  if (HIDDEN_PATHS.has(pathStr)) return null;
  const label = typeof key === "number" ? "" : labelFor(key);
  const hint = HINTS[key];
  const set = (v) => ctx.update(path, v);
  const tools = (count) => ({
    onMove: (a, b) => ctx.arrayMove(path, a, b),
    onRemove: (a) => ctx.arrayRemove(path, a),
    count,
  });

  if (typeof value === "string") {
    if (IMAGE_KEYS.has(key)) {
      return (
        <div className="adm-field">
          <span className="adm-label">{label}</span>
          <ImageBox value={value} onChange={set} />
        </div>
      );
    }
    return (
      <Row label={label} hint={hint}>
        <TextInput value={value} onChange={set} />
      </Row>
    );
  }

  if (typeof value === "boolean") {
    return (
      <label className="adm-check">
        <input type="checkbox" checked={value} onChange={(e) => set(e.target.checked)} />
        <span>{label}</span>
      </label>
    );
  }

  if (typeof value === "number") {
    return (
      <Row label={label}>
        <input type="number" value={value} onChange={(e) => set(Number(e.target.value))} />
      </Row>
    );
  }

  if (Array.isArray(value)) {
    const count = value.length;
    const allObjects = count > 0 && value.every(isObj);

    if (key === "images") {
      return (
        <ListFrame title={label} count={count} addLabel="사진 칸 추가" onAdd={() => ctx.arrayAdd(path)}>
          <div className="adm-image-grid">
            {value.map((src, i) => (
              <div className="adm-image-cell" key={i}>
                <ImageBox compact value={src} onChange={(v) => ctx.update([...path, i], v)} />
                <ItemTools index={i} {...tools(count)} />
              </div>
            ))}
          </div>
        </ListFrame>
      );
    }

    if (allObjects || (count === 0 && OBJECT_LIST_KEYS.has(key))) {
      return (
        <ListFrame title={label} count={count} addLabel="항목 추가" onAdd={() => ctx.arrayAdd(path)}>
          {value.map((item, i) => (
            <details className="adm-card" key={i} open={count <= 2}>
              <summary>
                <span>{itemTitle(item, i)}</span>
                <ItemTools index={i} {...tools(count)} />
              </summary>
              <div className="adm-card__body">
                {Object.keys(item).map((k) => (
                  <Node key={k} value={item[k]} path={[...path, i, k]} ctx={ctx} />
                ))}
              </div>
            </details>
          ))}
        </ListFrame>
      );
    }

    return (
      <ListFrame title={label} hint={hint} count={count} addLabel="문단 추가" onAdd={() => ctx.arrayAdd(path)}>
        {value.map((text, i) => (
          <div className="adm-string-item" key={i}>
            <TextInput value={text} onChange={(v) => ctx.update([...path, i], v)} />
            <ItemTools index={i} {...tools(count)} />
          </div>
        ))}
      </ListFrame>
    );
  }

  if (isObj(value)) {
    const inner = Object.keys(value).map((k) => <Node key={k} value={value[k]} path={[...path, k]} ctx={ctx} />);
    if (path.length === 0) return <div className="adm-group adm-group--top">{inner}</div>;
    return (
      <fieldset className="adm-group">
        <legend>{label}</legend>
        {inner}
      </fieldset>
    );
  }

  return null;
}
