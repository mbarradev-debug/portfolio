import Link from "next/link";

import { routing } from "@/i18n/routing";
import messages from "@/messages/es.json";

import "./globals.css";

/**
 * Global 404 for URLs that don't match any route. The `[locale]` layout (fonts,
 * providers, header/footer) never runs here, so this renders its own minimal
 * document in the default locale — copy is read directly from the default
 * catalog. `app/[locale]/not-found.tsx` is the fully-localised version used when
 * a page inside a locale calls `notFound()`.
 */
const t = messages.NotFound;

export const metadata = {
  title: `${t.title} · ${messages.Meta.titleShort}`,
};

export default function GlobalNotFound() {
  return (
    <html lang={routing.defaultLocale}>
      <body className="text-text bg-bg flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-text-muted font-mono text-xs tracking-wider uppercase">{t.eyebrow}</p>
        <h1 className="font-serif text-3xl leading-tight tracking-tight">{t.title}</h1>
        <p className="text-text-soft text-md max-w-prose">{t.body}</p>
        <Link
          href={`/${routing.defaultLocale}`}
          className="bg-accent text-text-on-accent rounded-pill px-6 py-2 font-mono text-xs tracking-wider uppercase"
        >
          {t.cta}
        </Link>
      </body>
    </html>
  );
}
