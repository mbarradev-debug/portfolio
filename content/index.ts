import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import { hasLocale } from "@/lib/i18n";
import { contentFor } from "./dictionaries";
import type { Content } from "./types";

export type * from "./types";
export { contentFor };

/**
 * Content for the current request's locale, read from the `[lang]` root
 * segment, so Server Components don't need `lang` passed down as a prop.
 * Only for Server Components; route handlers use `contentFor` from ./dictionaries.
 */
export async function getContent(): Promise<Content> {
  const locale = await lang();
  if (!hasLocale(locale)) notFound();
  return contentFor(locale);
}
