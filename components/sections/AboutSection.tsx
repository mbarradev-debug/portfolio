import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { Badge, Button } from "@/components/ui";
import { Link } from "@/i18n/navigation";

import styles from "./AboutSection.module.css";

/** About section (Server): badge, portrait, heading, body, actions. */
export async function AboutSection() {
  const t = await getTranslations("About");

  return (
    <section id="about" className={styles.about} aria-labelledby="about-title">
      <div className={styles.card}>
        <div>
          <div className={styles.badgeRow}>
            <Badge>{t("badge")}</Badge>
          </div>
          <div className={styles.photo}>
            <div className={styles.frame}>
              <Image
                src="/avatar-900.jpg"
                alt={t("photoAlt")}
                fill
                sizes="(max-width: 980px) 16rem, 21rem"
              />
            </div>
          </div>
        </div>

        <div>
          <h2 id="about-title" className={styles.heading}>
            {t.rich("headingRich", {
              muted: (chunks) => <span className={styles.muted}>{chunks}</span>,
            })}
          </h2>
          <p className={styles.body}>{t("body")}</p>
          <div className={styles.actions}>
            <Button as="a" href="/#contacto" variant="dark">
              {t("talk")}
            </Button>
            <Button as="a" href="/miguelbarra-cv.pdf" target="_blank" rel="noopener" variant="link">
              {t("downloadCv")}
            </Button>
            <Link href="/#testimonios" className={styles.readTestimonials}>
              {t("readTestimonials")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
