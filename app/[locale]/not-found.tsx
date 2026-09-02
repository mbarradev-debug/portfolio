import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";

/**
 * Localised 404. Also the landing spot for unsupported locale prefixes: the
 * proxy rewrites e.g. `/fr` to `/es/fr`, which has no route and renders here
 * (a 404, never a 500). See `CLAUDE.md` → "Internacionalización (i18n)".
 */
export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="flex flex-1 flex-col justify-center">
      <div className="max-w-measure mx-auto flex w-full flex-col gap-6 px-6 py-24">
        <p className="text-text-muted font-mono text-xs tracking-wider uppercase">404</p>
        <h1 className="text-text font-serif text-3xl leading-tight tracking-tight">{t("title")}</h1>
        <p className="text-text-soft text-md max-w-prose">{t("body")}</p>
        <Link
          href="/"
          className="bg-accent text-text-on-accent ease-standard hover:bg-accent-strong rounded-pill w-fit px-6 py-2 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          {t("cta")}
        </Link>
      </div>
    </main>
  );
}
