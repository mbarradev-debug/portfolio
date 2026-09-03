import { getTranslations } from "next-intl/server";

import { HeroReveal } from "@/components/motion/HeroReveal";
import { PillButton } from "@/components/ui";

import { HeroVideo } from "./HeroVideo";
import styles from "./HeroSection.module.css";

/**
 * Full-viewport hero (Server). `HeroVideo` (Client leaf) fills the background;
 * `HeroReveal` (Client leaf) fades the content in on load.
 */
export async function HeroSection() {
  const t = await getTranslations("Hero");

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.bg} aria-hidden="true">
        <HeroVideo src="/hero.mp4" poster="/hero-poster.jpg" />
      </div>
      <div className={styles.overlay} aria-hidden="true" />

      <HeroReveal className={styles.content}>
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
      </HeroReveal>
    </section>
  );
}
