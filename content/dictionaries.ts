import type { Locale } from "@/lib/i18n";
import { en } from "./en";
import { es } from "./es";
import type { Content } from "./types";

const dictionaries: Record<Locale, Content> = { es, en };

/**
 * Content for an explicit locale. Safe anywhere on the server, including route
 * handlers (OG images, sitemap) where next/root-params isn't available.
 */
export function contentFor(locale: Locale): Content {
  return dictionaries[locale];
}
