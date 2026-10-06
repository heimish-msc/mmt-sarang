import { mkdir, readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";

const useBlob = Boolean(process.env.BLOB_READ_WRITE_TOKEN);
const KEEP_VERSIONS = 30;
const DATA_DIR = path.join(process.cwd(), ".data", "content");
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export const storageKind = () => (useBlob ? "blob" : "local");

async function blob() {
  return import("@vercel/blob");
}

export async function loadContent() {
  if (useBlob) {
    const { list } = await blob();
    const { blobs } = await list({ prefix: "content/" });
    if (!blobs.length) return null;
    const latest = blobs.reduce((a, b) => (new Date(a.uploadedAt) > new Date(b.uploadedAt) ? a : b));
    const res = await fetch(latest.url);
    if (!res.ok) throw new Error(`content fetch failed: ${res.status}`);
    return res.json();
  }
  try {
    const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith(".json")).sort();
    if (!files.length) return null;
    return JSON.parse(await readFile(path.join(DATA_DIR, files.at(-1)), "utf8"));
  } catch {
    return null;
  }
}

export async function saveContent(data) {
  const name = `${Date.now()}.json`;
  const body = JSON.stringify(data);
  if (useBlob) {
    const { put, list, del } = await blob();
    await put(`content/${name}`, body, {
      access: "public",
      addRandomSuffix: false,
      contentType: "application/json",
    });
    const { blobs } = await list({ prefix: "content/" });
    const old = blobs
      .sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt))
      .slice(KEEP_VERSIONS);
    if (old.length) await del(old.map((b) => b.url));
    return;
  }
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, name), body);
  const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith(".json")).sort();
  for (const f of files.slice(0, Math.max(0, files.length - KEEP_VERSIONS))) {
    await unlink(path.join(DATA_DIR, f));
  }
}

export async function saveImage(buffer, filename, contentType) {
  const safe = filename.toLowerCase().replace(/[^a-z0-9._-]/g, "-").replace(/-+/g, "-").slice(-60);
  const name = `${Date.now()}-${safe}`;
  if (useBlob) {
    const { put } = await blob();
    const result = await put(`uploads/${name}`, buffer, {
      access: "public",
      addRandomSuffix: true,
      contentType,
    });
    return result.url;
  }
  await mkdir(UPLOAD_DIR, { recursive: true });
  await writeFile(path.join(UPLOAD_DIR, name), buffer);
  return `/uploads/${name}`;
}
