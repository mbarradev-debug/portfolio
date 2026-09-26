import type { MetadataRoute } from "next";
import { PULSO_PATH } from "@/content/shared";
import { defaultLocale, locales, route } from "@/lib/i18n";
import { siteUrl } from "@/lib/site-url";

/** Every page in every language, each entry listing its hreflang alternates. */
const pages = [
  { path: "/", priority: 1 },
  { path: PULSO_PATH, priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ path, priority }) =>
    locales.map((locale) => ({
      url: `${siteUrl}${route(locale, path)}`,
      changeFrequency: "monthly" as const,
      // Spanish is the primary language.
      priority: locale === defaultLocale ? priority : +(priority * 0.9).toFixed(2),
      alternates: {
        languages: {
          ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}${route(l, path)}`])),
          "x-default": `${siteUrl}${route(defaultLocale, path)}`,
        },
      },
    })),
  );
}
