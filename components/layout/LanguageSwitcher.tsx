"use client";

import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

import styles from "./LanguageSwitcher.module.css";

/**
 * The only Client component of the home shell (PMB-011). Switches locale while
 * keeping the current path and anchor; the polished mobile wiring is PMB-012.
 */
export function LanguageSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const active = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(locale: (typeof routing.locales)[number]) {
    if (locale === active) return;
    const hash = typeof window === "undefined" ? "" : window.location.hash;
    router.replace(`${pathname}${hash}`, { locale });
  }

  return (
    <div className={styles.group} role="group" aria-label={t("label")}>
      {routing.locales.map((locale) => {
        const isActive = locale === active;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-pressed={isActive}
            aria-label={t("switchTo", { language: t(locale) })}
            className={[styles.button, isActive && styles.active].filter(Boolean).join(" ")}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
