import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";

import { ArrowUpRightIcon, Badge, CircleArrow } from "@/components/ui";
import { caseStudies, pickLocale } from "@/content";

import styles from "./CaseStudiesSection.module.css";

/**
 * Case studies section (Server). Renders the heading and the current case card
 * statically; the prev/next carousel navigation is added in PMB-014.
 */
export async function CaseStudiesSection() {
  const [t, locale] = await Promise.all([getTranslations("Cases"), getLocale()]);
  const [study] = caseStudies;

  if (!study) return null;

  return (
    <section id="casos" className={styles.cases} aria-labelledby="cases-title">
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <h2 id="cases-title" className={styles.title}>
              {t("heading")}
            </h2>
            <p className={styles.desc}>{t("subtitle")}</p>
          </div>
          <div className={styles.nav}>
            <span className={styles.counter}>
              {t("counter", { current: "01", total: String(caseStudies.length).padStart(2, "0") })}
            </span>
          </div>
        </div>

        <article className={styles.card}>
          <div className={styles.media} style={{ background: study.gradient }}>
            <div className={styles.mock}>
              <div className={styles.mockBar} aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <Image
                src={study.image}
                alt={pickLocale(study.imageAlt, locale)}
                width={1200}
                height={630}
              />
            </div>
          </div>
          <div className={styles.info}>
            <div className={styles.meta}>
              <Badge>{study.tag}</Badge>
              <span className={styles.date}>{study.date}</span>
            </div>
            <div>
              <h3 className={styles.title}>{pickLocale(study.title, locale)}</h3>
              <p className={styles.desc}>{pickLocale(study.desc, locale)}</p>
            </div>
            <a
              className={styles.link}
              href={study.url}
              target="_blank"
              rel="noopener"
              aria-label={t("linkProject")}
            >
              <span className={styles.linkLabel}>{t("linkProject")}</span>
              <CircleArrow size="lg" icon={<ArrowUpRightIcon />} />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
