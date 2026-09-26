/**
 * Locale configuration and path helpers. Dependency-free so proxy.ts can use it.
 */

export const locales = ["es", "en"] as const;
export type Locale = (typeof locales)[number];

/** Spanish is the primary language (and the hreflang x-default). */
export const defaultLocale: Locale = "es";

/** Set by the language switcher; wins over Accept-Language on later visits. */
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function hasLocale(value: string | undefined | null): value is Locale {
  return (locales as readonly string[]).includes(value ?? "");
}

/**
 * Locale-prefixed path: route("en", "/projects/pulso") → "/en/projects/pulso",
 * route("es", "/#proyectos") → "/es#proyectos", route("en", "/") → "/en".
 */
export function route(locale: Locale, path: string): string {
  const [pathname, hash] = path.split("#");
  const rest = pathname === "/" || pathname === "" ? "" : pathname;
  return `/${locale}${rest}${hash !== undefined ? `#${hash}` : ""}`;
}

/** Locale of a pathname, or undefined when it has no locale prefix. */
export function localeOf(pathname: string): Locale | undefined {
  const first = pathname.split("/")[1];
  return hasLocale(first) ? first : undefined;
}

/** Pathname without its locale prefix: "/en/projects/pulso" → "/projects/pulso". */
export function stripLocale(pathname: string): string {
  const locale = localeOf(pathname);
  if (!locale) return pathname;
  const rest = pathname.slice(locale.length + 1);
  return rest === "" ? "/" : rest;
}

/** Same page in another locale: "/es/projects/pulso" → "/en/projects/pulso". */
export function switchLocale(pathname: string, locale: Locale): string {
  return route(locale, stripLocale(pathname));
}

/**
 * Picks the locale from an Accept-Language header: English when it's the
 * highest-weighted supported language, Spanish in every other case.
 */
export function localeFromAcceptLanguage(header: string | null): Locale {
  if (!header) return defaultLocale;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag = "", ...params] = part.trim().split(";");
      const q = params.map((p) => p.trim()).find((p) => p.startsWith("q="));
      return { base: tag.trim().toLowerCase().split("-")[0], q: q ? Number(q.slice(2)) : 1 };
    })
    .filter((entry) => entry.base && Number.isFinite(entry.q) && entry.q > 0)
    .sort((a, b) => b.q - a.q);
  const best = ranked.find((entry) => hasLocale(entry.base));
  return best?.base === "en" ? "en" : defaultLocale;
}
