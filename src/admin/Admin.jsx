import { useCallback, useEffect, useMemo, useState } from "react";
import { content as koDefault } from "../i18n/content.ko.js";
import { content as enDefault } from "../i18n/content.en.js";
import { deepMerge, diff, isObj } from "../i18n/merge.js";
import Node from "./TreeEditor.jsx";
import { SECTIONS } from "./labels.js";
import "./admin.css";

const defaults = { ko: koDefault, en: enDefault };
const OTHER = { ko: "en", en: "ko" };

const getIn = (obj, path) => path.reduce((acc, key) => acc?.[key], obj);

function setIn(obj, path, value) {
  if (!path.length) return value;
  const [key, ...rest] = path;
  const copy = Array.isArray(obj) ? [...obj] : { ...obj };
  copy[key] = setIn(obj?.[key], rest, value);
  return copy;
}

function blank(v) {
  if (typeof v === "string") return "";
  if (typeof v === "number") return 0;
  if (typeof v === "boolean") return v;
  if (Array.isArray(v)) return [];
  if (isObj(v)) return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, blank(x)]));
  return null;
}

const isImagePath = (path) => {
  const key = path[path.length - 1];
  return key === "photo" || key === "image" || path[path.length - 2] === "images";
};

async function api(action, options) {
  const res = await fetch(`/api/admin?action=${action}`, { credentials: "same-origin", ...options });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

function Login({ session, onDone }) {
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    const { ok, data } = await api("login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    setBusy(false);
    if (ok) onDone();
    else setError(data.error === "Wrong password" ? "비밀번호가 맞지 않아요." : "로그인할 수 없어요. 잠시 후 다시 시도해 주세요.");
  };

  return (
    <div className="adm adm-login">
      <form className="adm-login__box" onSubmit={submit}>
        <h1>사이트 관리</h1>
        {session && !session.configured ? (
          <p className="adm-error">서버에 관리자 비밀번호(ADMIN_PASSWORD)가 아직 설정되지 않았어요.</p>
        ) : (
          <>
            <input
              type="password"
              autoFocus
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="adm-btn adm-btn--primary" disabled={busy || !password}>
              {busy ? "확인 중…" : "로그인"}
            </button>
            {error ? <p className="adm-error">{error}</p> : null}
          </>
        )}
      </form>
    </div>
  );
}

function Editor({ session, onLogout }) {
  const [draft, setDraft] = useState(null);
  const [savedJson, setSavedJson] = useState("");
  const [lang, setLang] = useState("ko");
  const [section, setSection] = useState("hero");
  const [sync, setSync] = useState(true);
  const [status, setStatus] = useState({ kind: "", text: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    api("content").then(({ ok, data }) => {
      if (!ok) return setStatus({ kind: "error", text: "내용을 불러오지 못했어요. 새로고침해 주세요." });
      const next = {
        ko: deepMerge(defaults.ko, data.ko),
        en: deepMerge(defaults.en, data.en),
      };
      setDraft(next);
      setSavedJson(JSON.stringify(next));
    });
  }, []);

  const dirty = draft && JSON.stringify(draft) !== savedJson;

  useEffect(() => {
    if (!dirty) return undefined;
    const warn = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const edit = useCallback(
    (fn) => {
      setDraft((d) => fn(d));
      setStatus({ kind: "", text: "" });
    },
    []
  );

  const ctx = useMemo(() => {
    const langs = (l) => (sync ? [l, OTHER[l]] : [l]);

    return {
      update(path, value) {
        edit((d) => {
          const next = { ...d, [lang]: setIn(d[lang], path, value) };
          if (sync && isImagePath(path)) {
            const o = OTHER[lang];
            if (JSON.stringify(getIn(d[o], path)) === JSON.stringify(getIn(d[lang], path))) {
              next[o] = setIn(d[o], path, value);
            }
          }
          return next;
        });
      },
      arrayAdd(path) {
        edit((d) => {
          const next = { ...d };
          for (const l of langs(lang)) {
            const arr = getIn(d[l], path);
            if (!Array.isArray(arr)) continue;
            const key = path[path.length - 1];
            let item;
            if (key === "images") item = null;
            else if (key === "quotes" && !arr.length) item = { en: "", ko: "" };
            else item = blank(arr[arr.length - 1] ?? "");
            next[l] = setIn(d[l], path, [...arr, item]);
          }
          return next;
        });
      },
      arrayRemove(path, index) {
        edit((d) => {
          const next = { ...d };
          const len = getIn(d[lang], path).length;
          for (const l of langs(lang)) {
            const arr = getIn(d[l], path);
            if (!Array.isArray(arr) || (l !== lang && arr.length !== len)) continue;
            next[l] = setIn(d[l], path, arr.filter((_, i) => i !== index));
          }
          return next;
        });
      },
      arrayMove(path, from, to) {
        edit((d) => {
          const next = { ...d };
          const len = getIn(d[lang], path).length;
          for (const l of langs(lang)) {
            const arr = getIn(d[l], path);
            if (!Array.isArray(arr) || (l !== lang && arr.length !== len)) continue;
            const copy = [...arr];
            const [moved] = copy.splice(from, 1);
            copy.splice(to, 0, moved);
            next[l] = setIn(d[l], path, copy);
          }
          return next;
        });
      },
    };
  }, [lang, sync, edit]);

  const save = async () => {
    setSaving(true);
    setStatus({ kind: "", text: "" });
    const payload = {
      ko: diff(defaults.ko, draft.ko) ?? {},
      en: diff(defaults.en, draft.en) ?? {},
    };
    const { ok, status: code } = await api("save", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSaving(false);
    if (ok) {
      setSavedJson(JSON.stringify(draft));
      setStatus({ kind: "ok", text: "저장됐어요. 사이트에는 최대 1분 안에 반영돼요." });
    } else if (code === 401) {
      setStatus({ kind: "error", text: "로그인이 만료됐어요. 새로고침 후 다시 로그인해 주세요." });
    } else {
      setStatus({ kind: "error", text: "저장하지 못했어요. 잠시 후 다시 시도해 주세요." });
    }
  };

  if (!draft) {
    return <div className="adm adm-loading">{status.text || "불러오는 중…"}</div>;
  }

  const value = draft[lang][section];

  return (
    <div className="adm">
      <header className="adm-bar">
        <strong className="adm-bar__title">사이트 관리</strong>
        <div className="adm-seg" role="tablist" aria-label="언어">
          {["ko", "en"].map((l) => (
            <button key={l} type="button" className={lang === l ? "is-on" : ""} onClick={() => setLang(l)}>
              {l === "ko" ? "한국어 페이지" : "English 페이지"}
            </button>
          ))}
        </div>
        <label className="adm-sync" title="항목을 추가·삭제·이동하거나 사진을 바꿀 때 두 언어에 함께 적용해요.">
          <input type="checkbox" checked={sync} onChange={(e) => setSync(e.target.checked)} />
          한/영 함께 변경
        </label>
        <span className="adm-spacer" />
        {status.text ? <span className={status.kind === "error" ? "adm-error" : "adm-ok"}>{status.text}</span> : null}
        {dirty && !status.text ? <span className="adm-dirty">저장하지 않은 변경이 있어요</span> : null}
        <a className="adm-btn" href={`${window.location.pathname}#/`} target="_blank" rel="noreferrer">
          사이트 보기
        </a>
        <button type="button" className="adm-btn adm-btn--primary" disabled={!dirty || saving} onClick={save}>
          {saving ? "저장 중…" : "저장하기"}
        </button>
        <button type="button" className="adm-btn" onClick={onLogout}>
          로그아웃
        </button>
      </header>

      {session.storage === "local" ? (
        <div className="adm-notice">개발용 로컬 저장 모드예요. 저장한 내용은 이 컴퓨터의 .data 폴더에만 기록돼요.</div>
      ) : null}

      <div className="adm-body">
        <nav className="adm-side" aria-label="페이지 섹션">
          {SECTIONS.map((s) => (
            <button
              key={s.key}
              type="button"
              className={section === s.key ? "is-on" : ""}
              onClick={() => {
                setSection(s.key);
                window.scrollTo({ top: 0 });
              }}
            >
              {s.label}
            </button>
          ))}
        </nav>

        <main className="adm-main">
          <h2>{SECTIONS.find((s) => s.key === section)?.label}</h2>
          <p className="adm-lead">
            {lang === "ko" ? "한국어" : "영어"} 페이지에 보이는 내용을 수정해요. 모두 고친 뒤 위의 <b>저장하기</b>를 눌러야 사이트에 반영돼요.
          </p>
          {Array.isArray(value) ? (
            <Node value={value} path={[section]} ctx={ctx} />
          ) : isObj(value) ? (
            Object.keys(value).map((k) => <Node key={`${lang}-${section}-${k}`} value={value[k]} path={[section, k]} ctx={ctx} />)
          ) : null}
        </main>
      </div>
    </div>
  );
}

export default function Admin() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    document.title = "사이트 관리";
    const meta = document.createElement("meta");
    meta.name = "robots";
    meta.content = "noindex,nofollow";
    document.head.appendChild(meta);
    return () => meta.remove();
  }, []);

  const refresh = useCallback(() => {
    api("session").then(({ data }) => setSession(data));
  }, []);

  useEffect(refresh, [refresh]);

  const logout = async () => {
    await api("logout", { method: "POST" });
    refresh();
  };

  if (!session) return <div className="adm adm-loading">불러오는 중…</div>;
  if (!session.authed) return <Login session={session} onDone={refresh} />;
  return <Editor session={session} onLogout={logout} />;
}

