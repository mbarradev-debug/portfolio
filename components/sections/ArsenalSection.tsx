import { Fragment } from "react";

import { getTranslations } from "next-intl/server";

import { techStackRows } from "@/content";

import styles from "./ArsenalSection.module.css";

/**
 * Tech-stack marquee (Server). The moving rows are decorative (`aria-hidden`);
 * the real list is the `sr-only` `<ul>`. Animation + hover-pause are pure CSS.
 */
export async function ArsenalSection() {
  const t = await getTranslations("Arsenal");
  const allTech = techStackRows.flat();

  return (
    <section className={styles.arsenal} aria-labelledby="arsenal-title">
      <div className={styles.wrap}>
        <h2 id="arsenal-title" className={styles.heading}>
          <span className={styles.headingDot} aria-hidden="true" />
          {t("heading")}
        </h2>
      </div>

      <ul className="sr-only">
        {allTech.map((tech) => (
          <li key={tech.label}>{tech.label}</li>
        ))}
      </ul>

      {techStackRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.row} aria-hidden="true">
          <div className={`${styles.track} ${rowIndex % 2 === 1 ? styles.reverse : ""}`}>
            {[...row, ...row].map((tech, i) => (
              <Fragment key={i}>
                <span className={styles.word}>{tech.label}</span>
                <span className={styles.dot} />
              </Fragment>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
