import type { Locale } from "next-intl";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";

import { routing } from "./routing";

/**
 * Call at the top of every `[locale]` page/layout: rejects an unknown locale
 * with `notFound()` and opts the route into static rendering. Returns the
 * validated, narrowed `Locale`.
 */
export function initLocale(locale: string): Locale {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);
  return locale;
}
