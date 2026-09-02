import { getTranslations } from "next-intl/server";

import { initLocale } from "@/i18n/locale";
import { Link } from "@/i18n/navigation";

/**
 * Placeholder home. The real hero/landing is rebuilt in PMB-007+. Kept minimal
 * and token-driven; copy comes from `messages/{locale}.json` so `/es` and `/en`
 * render different text.
 */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  initLocale(locale);

  const t = await getTranslations("Home");
  const badge = await getTranslations("LocaleBadge");

  return (
    <main className="flex flex-1 flex-col justify-center">
      <div className="max-w-measure mx-auto flex w-full flex-col gap-6 px-6 py-24">
        <p className="text-text-muted font-mono text-xs tracking-wider uppercase">{t("eyebrow")}</p>
        <h1 className="text-text font-serif text-3xl leading-tight tracking-tight text-balance">
          {t("titleBefore")}
          <span className="italic">{t("titleEmphasis")}</span>.
        </h1>
        <p className="text-text-soft text-md max-w-prose">{t("body")}</p>
        <Link
          href="/design-system"
          className="bg-accent text-text-on-accent ease-standard hover:bg-accent-strong rounded-pill w-fit px-6 py-2 font-mono text-xs tracking-wider uppercase transition-colors"
        >
          {t("cta")}
        </Link>
        <p className="text-text-muted text-2xs font-mono">
          {badge("label")}: {badge("value")}
        </p>
      </div>
    </main>
  );
}
