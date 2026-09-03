import { getTranslations } from "next-intl/server";

import { Button } from "@/components/ui";
import { headerNav, navItems } from "@/content";
import { Link } from "@/i18n/navigation";

import { LanguageSwitcher } from "./LanguageSwitcher";
import { MobileNav } from "./MobileNav";
import styles from "./SiteHeader.module.css";

/**
 * Fixed site header (Server): wordmark, section nav, contact CTA, the (Client)
 * `LanguageSwitcher`, and the (Client) `MobileNav` — burger + full-screen menu.
 */
export async function SiteHeader() {
  const t = await getTranslations("Nav");

  const itemLabels = Object.fromEntries(navItems.map((item) => [item.key, t(item.key)]));

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
          <MobileNav
            items={navItems}
            itemLabels={itemLabels}
            labels={{
              open: t("openMenu"),
              close: t("closeMenu"),
              dialog: t("mobileLabel"),
            }}
          />
        </div>
      </div>
    </header>
  );
}
