import { getUrl, readBody, sendJson } from "./_lib/http.js";
import { checkPassword, clearCookie, isAuthed, isConfigured, sessionCookie } from "./_lib/auth.js";
import { listSubscribers, loadContent, saveContent, saveImage, storageKind } from "./_lib/store.js";

const MAX_JSON = 1_000_000;
const MAX_IMAGE = 4_000_000;
const NO_STORE = { "Cache-Control": "no-store" };

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const isObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

function sniffImage(buf) {
  if (buf.length > 3 && buf[0] === 0xff && buf[1] === 0xd8) return "image/jpeg";
  if (buf.length > 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])))
    return "image/png";
  if (buf.length > 12 && buf.subarray(0, 4).toString() === "RIFF" && buf.subarray(8, 12).toString() === "WEBP")
    return "image/webp";
  return null;
}

export default async function handler(req, res) {
  const action = getUrl(req).searchParams.get("action");

  try {
    if (action === "login" && req.method === "POST") {
      if (!isConfigured()) return sendJson(res, 503, { error: "ADMIN_PASSWORD is not set" }, NO_STORE);
      const body = JSON.parse((await readBody(req, 10_000)).toString() || "{}");
      if (!checkPassword(body.password)) {
        await sleep(700);
        return sendJson(res, 401, { error: "Wrong password" }, NO_STORE);
      }
      return sendJson(res, 200, { ok: true }, { ...NO_STORE, "Set-Cookie": sessionCookie() });
    }

    if (action === "logout" && req.method === "POST") {
      return sendJson(res, 200, { ok: true }, { ...NO_STORE, "Set-Cookie": clearCookie() });
    }

    if (action === "session") {
      return sendJson(res, 200, { authed: isAuthed(req), configured: isConfigured(), storage: storageKind() }, NO_STORE);
    }

    if (!isAuthed(req)) return sendJson(res, 401, { error: "Unauthorized" }, NO_STORE);

    if (action === "content" && req.method === "GET") {
      return sendJson(res, 200, (await loadContent()) ?? {}, NO_STORE);
    }

    if (action === "subscribers" && req.method === "GET") {
      return sendJson(res, 200, { subscribers: await listSubscribers() }, NO_STORE);
    }

    if (action === "save" && req.method === "PUT") {
      const body = JSON.parse((await readBody(req, MAX_JSON)).toString());
      if (!isObject(body) || (body.ko !== undefined && !isObject(body.ko)) || (body.en !== undefined && !isObject(body.en))) {
        return sendJson(res, 400, { error: "Invalid content" }, NO_STORE);
      }
      await saveContent({ ko: body.ko ?? {}, en: body.en ?? {} });
      return sendJson(res, 200, { ok: true }, NO_STORE);
    }

    if (action === "upload" && req.method === "POST") {
      const buf = await readBody(req, MAX_IMAGE);
      const type = sniffImage(buf);
      if (!type) return sendJson(res, 415, { error: "JPG, PNG, WEBP only" }, NO_STORE);
      const name = getUrl(req).searchParams.get("name") || "image";
      const url = await saveImage(buf, name, type);
      return sendJson(res, 200, { url }, NO_STORE);
    }

    return sendJson(res, 404, { error: "Not found" }, NO_STORE);
  } catch (err) {
    const status = err.status ?? 500;
    return sendJson(res, status, { error: status === 413 ? "File too large" : "Server error" }, NO_STORE);
  }
}
