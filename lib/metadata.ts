import type { Metadata } from "next";
import { contentFor } from "@/content/dictionaries";
import type { Content } from "@/content/types";
import { defaultLocale, locales, route, type Locale } from "./i18n";

/**
 * Open Graph fields shared by every page. A page's `openGraph` object replaces
 * the layout's instead of merging with it, so each page spreads these in.
 */
export function baseOpenGraph(content: Content) {
  const otherLocales = locales.filter((locale) => locale !== content.site.lang);
  return {
    locale: content.site.locale,
    alternateLocale: otherLocales.map((locale) => contentFor(locale).site.locale),
    siteName: content.site.name,
  } satisfies NonNullable<Metadata["openGraph"]>;
}

/** Large preview card; the image comes from each route's `opengraph-image`. */
export const twitterCard = "summary_large_image" as const;

/**
 * Canonical URL for this language plus hreflang alternates for every language,
 * with x-default pointing to Spanish. `path` has no locale prefix.
 */
export function languageAlternates(locale: Locale, path: string): NonNullable<Metadata["alternates"]> {
  return {
    canonical: route(locale, path),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, route(l, path)])),
      "x-default": route(defaultLocale, path),
    },
  };
}
