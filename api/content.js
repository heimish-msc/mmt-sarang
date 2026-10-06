import { sendJson } from "./_lib/http.js";
import { loadContent } from "./_lib/store.js";

export default async function handler(req, res) {
  try {
    const content = (await loadContent()) ?? {};
    sendJson(res, 200, content, {
      "Cache-Control": "public, max-age=0, s-maxage=10, stale-while-revalidate=60",
    });
  } catch {
    sendJson(res, 200, {}, { "Cache-Control": "no-store" });
  }
}
