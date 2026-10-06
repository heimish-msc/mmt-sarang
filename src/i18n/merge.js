export const isObj = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

export function deepMerge(base, over) {
  if (over === undefined) return base;
  if (isObj(base) && isObj(over)) {
    const out = { ...base };
    for (const key of Object.keys(over)) out[key] = deepMerge(base[key], over[key]);
    return out;
  }
  return over;
}

export function diff(base, draft) {
  if (isObj(base) && isObj(draft)) {
    const out = {};
    for (const key of Object.keys(draft)) {
      const d = diff(base[key], draft[key]);
      if (d !== undefined) out[key] = d;
    }
    return Object.keys(out).length ? out : undefined;
  }
  return JSON.stringify(base) === JSON.stringify(draft) ? undefined : draft;
}
