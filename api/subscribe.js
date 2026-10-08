import { readBody, sendJson } from "./_lib/http.js";
import { addSubscriber } from "./_lib/store.js";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function limited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

export default async function handler(req, res) {
  const headers = { "Cache-Control": "no-store" };
  if (req.method !== "POST") return sendJson(res, 405, { error: "Method not allowed" }, headers);

  try {
    const ip = String(req.headers["x-forwarded-for"] ?? req.socket?.remoteAddress ?? "").split(",")[0].trim();
    if (limited(ip)) return sendJson(res, 429, { error: "Too many requests" }, headers);

    const body = JSON.parse((await readBody(req, 5_000)).toString() || "{}");
    if (body.website) return sendJson(res, 200, { ok: true }, headers);

    const email = String(body.email ?? "").trim().toLowerCase();
    if (email.length > 254 || !EMAIL.test(email)) {
      return sendJson(res, 400, { error: "Invalid email" }, headers);
    }

    const lang = body.lang === "en" ? "en" : "ko";
    const result = await addSubscriber(email, lang);
    return sendJson(res, 200, { ok: true, status: result }, headers);
  } catch {
    return sendJson(res, 500, { error: "Server error" }, headers);
  }
}
