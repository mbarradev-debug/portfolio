import { en } from "./en";
import { es } from "./es";
import type { Locale, SiteContent } from "./types";

export * from "./types";

const DICTS: Record<Locale, SiteContent> = { es, en };

/** Contenido completo del sitio para un idioma. */
export function getContent(locale: Locale): SiteContent {
  return DICTS[locale];
}

/** Las dos variantes, para sitemap / alternates / generateStaticParams. */
export const LOCALES: Locale[] = ["es", "en"];
