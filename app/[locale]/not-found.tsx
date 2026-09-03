import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

/**
 * Localised 404 with full site chrome. Rendered when a page inside a locale
 * calls `notFound()` explicitly (e.g. a detail route with an unknown slug) —
 * the page has already set the request locale, so translations resolve to it.
 *
 * Fully unmatched URLs (`/es/typo`) don't run a page, so they fall through to
 * the global `app/not-found.tsx` instead — see `CLAUDE.md` → "Layout raíz…".
 * The `<main>` / header / footer come from the layout.
 */
export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <section className="flex flex-1 flex-col justify-center px-6 py-24">
      <div className="max-w-measure mx-auto flex w-full flex-col gap-6">
        <p className="text-text-muted font-mono text-xs tracking-wider uppercase">{t("eyebrow")}</p>
        <h1 className="text-text text-3xl leading-tight font-semibold tracking-tight">
          {t("title")}
        </h1>
        <p className="text-text-soft text-md max-w-prose">{t("body")}</p>
        <Link
          href="/"
          className="bg-accent text-text-on-accent ease-standard hover:bg-accent-strong rounded-pill w-fit px-6 py-2 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </section>
  );
}
