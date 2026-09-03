import { getTranslations } from "next-intl/server";

import { PillButton } from "@/components/ui";

import styles from "./HeroSection.module.css";

/**
 * Full-viewport hero (Server). The animated background `<video>` and its logic
 * are a slot filled by `HeroVideo` in PMB-012.
 */
export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        {/* HeroVideo slot — PMB-012 */}
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <div className={styles.content}>
        <h1 id="hero-title" className={styles.title}>
          {t("title")}
        </h1>
        <div className={styles.bottom}>
          <p className={styles.subtitle}>{t("subtitle")}</p>
          <div className={styles.ctaRow}>
            <PillButton as="a" href="/#contacto">
              {t("cta")}
            </PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
