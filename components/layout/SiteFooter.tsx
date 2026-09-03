import { getTranslations } from "next-intl/server";

import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/**
 * Global footer. Minimal for now (copyright + language switch); refined in
 * PMB-013. It gives every page the `<footer>` landmark outside `<main>`.
 */
export async function SiteFooter() {
  const t = await getTranslations("Footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <div className="text-text-muted max-w-page mx-auto flex w-full flex-col gap-4 px-6 py-8 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Miguel Barra</p>
        <ul className="flex gap-4" aria-label={t("languages")}>
          {routing.locales.map((loc) => (
            <li key={loc}>
              <Link
                href="/"
                locale={loc}
                className="hover:text-text tracking-wider uppercase transition-colors"
              >
                {loc}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
