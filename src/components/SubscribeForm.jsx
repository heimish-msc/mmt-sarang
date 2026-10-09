import { useState } from "react";
import "./SubscribeForm.css";

export default function SubscribeForm({ copy, lang }) {
  const [email, setEmail] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [state, setState] = useState("idle");

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
    <div className="subscribe">
      <h3 className="subscribe__title">{copy.title}</h3>
      <p className="subscribe__description">{copy.description}</p>

      {done ? (
        <p className="subscribe__message subscribe__message--ok" role="status">
          {message}
        </p>
      ) : (
        <form className="subscribe__form" onSubmit={submit} noValidate>
          <div className="subscribe__row">
            <input
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
            <button type="submit" disabled={state === "sending"}>
              {state === "sending" ? copy.sending : copy.submit}
            </button>
          </div>
          {message ? (
            <p className="subscribe__message subscribe__message--error" role="alert">
              {message}
            </p>
          ) : null}
        </form>
      )}

      <p className="subscribe__privacy">{copy.privacy}</p>
    </div>
  );
}
