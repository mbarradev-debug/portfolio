import type messages from "./messages/en.json";
import type { routing } from "./i18n/routing";

/**
 * Strongly-types next-intl: `Locale` is `'es' | 'en'` and message keys are
 * checked against `messages/en.json`. Referencing a key that doesn't exist is
 * a compile error.
 */
declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
  }
}
