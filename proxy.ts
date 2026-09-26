import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE, hasLocale, localeFromAcceptLanguage, localeOf, route } from "@/lib/i18n";

/**
 * Sends unprefixed URLs (/, /projects/pulso) to their localized version on the
 * server, so the page never renders in the wrong language first.
 * Priority: the switcher's cookie, then Accept-Language, then Spanish.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (localeOf(pathname)) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = hasLocale(saved) ? saved : localeFromAcceptLanguage(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = route(locale, pathname);
  url.search = search;
  // 307: the target depends on who's asking, so it must not be cached as permanent.
  const response = NextResponse.redirect(url, 307);
  response.headers.set("Vary", "Accept-Language, Cookie");
  return response;
}

export const config = {
  // Skip Next internals, Vercel's /_vercel endpoints (Analytics, Speed Insights) and any
  // file with an extension (sitemap.xml, robots.txt, icon.svg, PDFs, images).
  matcher: ["/((?!_next/|_vercel/|.*\\..*).*)"],
};
