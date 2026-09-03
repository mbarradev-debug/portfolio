import { getTranslations } from "next-intl/server";

import { ContactForm } from "@/components/contact/ContactForm";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

/** Public contact address — kept as the secondary, no-JS-proof way to reach out. */
const CONTACT_EMAIL = "mbarra.git@gmail.com";

/**
 * Global footer + contact section. Owns the `#contacto` anchor every "get in
 * touch" CTA points at: heading, the `ContactForm` (Client leaf, Server Action),
 * and the direct email link as a fallback. Copyright + language switch sit
 * below. It also gives every page the `<footer>` landmark outside `<main>`.
 */
export async function SiteFooter() {
  const [t, tc, tls] = await Promise.all([
    getTranslations("Footer"),
    getTranslations("Contact"),
    getTranslations("LocaleSwitcher"),
  ]);
  const year = new Date().getFullYear();

  return (
    <footer id="contacto" className="border-border border-t" aria-labelledby="contact-title">
      <div className="max-w-page mx-auto w-full px-6 py-16 sm:py-20">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-4">
            <h2 id="contact-title" className="text-2xl leading-tight font-medium tracking-tight">
              {t("heading")}
            </h2>
            <p className="text-text-soft max-w-measure leading-relaxed">{tc("intro")}</p>
            <p className="text-text-muted flex flex-wrap gap-x-1.5 font-mono text-xs">
              <span>{tc("directIntro")}</span>
              <a
                className="text-text hover:text-accent-strong underline"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>

          <ContactForm />
        </div>

        <div className="border-border text-text-muted mt-14 flex flex-col gap-4 border-t pt-8 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>{t("copyright", { year: String(year) })}</p>
          <ul className="flex gap-4" aria-label={tls("label")}>
            {routing.locales.map((loc) => (
              <li key={loc}>
                <Link
                  href="/"
                  locale={loc}
                  aria-label={tls("switchTo", { language: tls(loc) })}
                  className="hover:text-text tracking-wider uppercase transition-colors"
                >
                  {loc}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
