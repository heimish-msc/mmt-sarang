import { createHmac, timingSafeEqual } from "node:crypto";
import { parseCookies } from "./http.js";

const COOKIE = "admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;
const isProd = process.env.VERCEL_ENV === "production" || process.env.NODE_ENV === "production";

function password() {
  return process.env.ADMIN_PASSWORD || "admin";
}

function secret() {
  return process.env.ADMIN_SECRET || `${password()}::portfolio-admin`;
}

const sign = (value) => createHmac("sha256", secret()).update(value).digest("hex");

function safeEqual(a, b) {
  const x = Buffer.from(String(a));
  const y = Buffer.from(String(b));
  return x.length === y.length && timingSafeEqual(x, y);
}

export const isConfigured = () => password() !== null;

export function checkPassword(input) {
  const pw = password();
  return pw !== null && safeEqual(input ?? "", pw);
}

export function sessionCookie() {
  const exp = String(Date.now() + MAX_AGE * 1000);
  const token = `${exp}.${sign(exp)}`;
  const secure = isProd ? "; Secure" : "";
  return `${COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${MAX_AGE}${secure}`;
}

export const clearCookie = () => `${COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0`;

export function isAuthed(req) {
  if (!isConfigured()) return false;
  const token = parseCookies(req)[COOKIE];
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  return safeEqual(sig, sign(exp));
}
