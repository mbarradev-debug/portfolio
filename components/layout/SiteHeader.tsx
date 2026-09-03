import { getTranslations } from "next-intl/server";

import { Button, MenuIcon } from "@/components/ui";
import { headerNav } from "@/content";
import { Link } from "@/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher";
import styles from "./SiteHeader.module.css";

/**
 * Fixed site header: wordmark, section nav, Contacto CTA, the (Client)
 * `LanguageSwitcher` and a burger.
 *
 * The burger's menu is wired in PMB-012 (`MobileMenu`); here it's rendered with
 * the right ARIA hooks (`aria-controls` / `aria-expanded`) but inert.
 */
export async function SiteHeader() {
  const t = await getTranslations("Nav");

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          {t("logo")}
        </Link>

        <nav className={styles.nav} aria-label={t("label")}>
          {headerNav.map((item) => (
            <Link key={item.key} href={`/${item.href}`} className={styles.navLink}>
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className={styles.right}>
          <Button as="a" href="/#contacto" variant="dark" size="sm" className={styles.contact}>
            {t("contact")}
          </Button>
          <span className={styles.switcher}>
            <LanguageSwitcher />
          </span>
          <button
            type="button"
            className={styles.burger}
            aria-label={t("openMenu")}
            aria-controls="mobile-menu"
            aria-expanded="false"
          >
            <MenuIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
