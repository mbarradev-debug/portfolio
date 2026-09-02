import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

/**
 * i18n proxy (Next 16's renamed `middleware`). Negotiates the locale from the
 * URL prefix and `Accept-Language`, redirects `/` to the negotiated locale and
 * unknown prefixes to the `es` fallback.
 *
 * Order: this proxy runs *before* routing, so its redirects happen first; the
 * security headers from `next.config.ts` are then applied to the final response.
 * See `CLAUDE.md` → "Internacionalización (i18n)".
 */
export default createMiddleware(routing);

export const config = {
  // Everything except API routes, Next internals and files with an extension
  // (static assets under /public).
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
