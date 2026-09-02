import { defineRouting } from "next-intl/routing";

/**
 * i18n routing. Full rationale (prefix strategy, fallback, middleware order)
 * lives in `CLAUDE.md` → "Internacionalización (i18n)".
 */
export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  // 'always': every route carries a locale prefix (`/es/…`, `/en/…`) and `/`
  // redirects to the negotiated locale. Chosen over 'as-needed' so both locales
  // have symmetric, stable URLs for SEO / hreflang and `/es` is a real path.
  localePrefix: "always",
});
