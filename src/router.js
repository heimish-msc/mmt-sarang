import { useEffect, useState } from "react";

export const ROUTES = ["home", "program", "research", "workshops", "performances"];
const HIDDEN_ROUTES = ["admin"];

function parse(hash) {
  const match = hash.match(/^#\/(.*)$/);
  if (!match) return null;
  return ROUTES.includes(match[1]) || HIDDEN_ROUTES.includes(match[1]) ? match[1] : "home";
}

export const hrefFor = (route) => (route === "home" ? "#/" : `#/${route}`);

export function useRoute() {
  const [route, setRoute] = useState(() => parse(window.location.hash) ?? "home");

  useEffect(() => {
    const onHashChange = () => {
      const next = parse(window.location.hash);
      if (!next) return;
      setRoute(next);
      window.scrollTo({ top: 0, behavior: "instant" });
    };
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return route;
}
