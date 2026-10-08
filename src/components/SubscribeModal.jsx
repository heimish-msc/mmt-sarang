import { useEffect, useRef, useState } from "react";
import "./SubscribeModal.css";

export default function SubscribeModal({ onClose, copy, lang }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState("idle");
  const input = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    const focusTimer = setTimeout(() => input.current?.focus(), 50);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      clearTimeout(focusTimer);
    };
  }, [onClose]);

  const done = state === "success" || state === "already";

  const submit = async (e) => {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, lang, website: honeypot }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        setState(data.status === "exists" ? "already" : "success");
        setEmail("");
      } else {
        setState(res.status === 400 ? "invalid" : "error");
      }
    } catch {
      setState("error");
    }
  };

  const message = { success: copy.success, already: copy.already, invalid: copy.invalid, error: copy.error }[state];

  return (
    <div className="subscribe" role="presentation" onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className="subscribe__dialog" role="dialog" aria-modal="true" aria-labelledby="subscribe-title">
        <button type="button" className="subscribe__close" onClick={onClose} aria-label={copy.close}>
          &#10005;
        </button>
        <h2 id="subscribe-title" className="subscribe__title">
          {copy.title}
        </h2>
        <p className="subscribe__description">{copy.description}</p>

        {done ? (
          <p className="subscribe__message subscribe__message--ok" role="status">
            {message}
          </p>
        ) : (
          <form className="subscribe__form" onSubmit={submit} noValidate>
            <input
              ref={input}
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              placeholder={copy.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label={copy.placeholder}
            />
            <input
              className="subscribe__trap"
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
            />
            <button type="submit" disabled={state === "sending" || !email}>
              {state === "sending" ? copy.sending : copy.submit}
            </button>
            {message ? (
              <p className="subscribe__message subscribe__message--error" role="alert">
                {message}
              </p>
            ) : null}
          </form>
        )}

        <p className="subscribe__privacy">{copy.privacy}</p>
      </div>
    </div>
  );
}
