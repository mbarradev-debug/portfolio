import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

/**
 * Fixed site time zone (the portfolio is single-timezone, Santiago de Chile).
 * Setting it explicitly keeps date/time formatting deterministic between server
 * and client — otherwise next-intl falls back to the runtime zone and can cause
 * hydration mismatches. Also passed to `NextIntlClientProvider` in the layout.
 */
export const TIME_ZONE = "America/Santiago";

/**
 * Per-request i18n config. Loads `messages/{locale}.json`. An unsupported or
 * missing locale falls back to `routing.defaultLocale` ('es') rather than
 * throwing. Message files are populated in PMB-009.
 */
export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    timeZone: TIME_ZONE,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
