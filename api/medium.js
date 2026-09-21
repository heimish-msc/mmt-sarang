const FEED_URL = "https://medium.com/feed/@medicalmusictherapist.sarang";
const LIMIT = 6;

const decode = (str) =>
  str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));

const pick = (block, tag) => {
  const match = block.match(new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`));
  if (!match) return "";
  return match[1].replace(/^<!\[CDATA\[|\]\]>$/g, "").trim();
};

function parseFeed(xml) {
  const items = xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
  return items.slice(0, LIMIT).map((block) => {
    const content = pick(block, "content:encoded");
    const image = [...content.matchAll(/<img[^>]+src="([^"]+)"/g)]
      .map((m) => m[1])
      .find((src) => !src.includes("/_/stat"));
    return {
      title: decode(pick(block, "title")),
      url: pick(block, "link").split("?")[0],
      image: image ?? null,
    };
  });
}

export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  try {
    const response = await fetch(FEED_URL, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!response.ok) throw new Error(`Medium responded ${response.status}`);
    const posts = parseFeed(await response.text());
    res.setHeader("Cache-Control", "public, s-maxage=1800, stale-while-revalidate=86400");
    res.statusCode = 200;
    res.end(JSON.stringify({ posts }));
  } catch {
    res.statusCode = 502;
    res.end(JSON.stringify({ posts: [] }));
  }
}
