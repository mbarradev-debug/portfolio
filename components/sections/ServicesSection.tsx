import type { ComponentType } from "react";

import { getTranslations } from "next-intl/server";

import { BackendIcon, DataIcon, FrontendIcon, type IconProps } from "@/components/ui";
import { services } from "@/content";
import type { ServiceIcon } from "@/content";

import styles from "./ServicesSection.module.css";

const ICON: Record<ServiceIcon, ComponentType<IconProps>> = {
  frontend: FrontendIcon,
  backend: BackendIcon,
  cloud: DataIcon,
};

const TONE = [styles.green, styles.dark, styles.gray] as const;

/** Services section (Server): 3 cards from `content/services`. */
export async function ServicesSection() {
  const t = await getTranslations("Services");

  return (
    <section id="servicios" className={styles.services} aria-labelledby="services-title">
      <h2 id="services-title" className="sr-only">
        {t("heading")}
      </h2>
      {services.map((service, i) => {
        const Icon = ICON[service.icon];
        return (
          <article key={service.key} className={`${styles.card} ${TONE[i]}`}>
            <div className={styles.top}>
              <span className={styles.icon}>
                <Icon />
              </span>
              <span className={styles.index}>{service.index}</span>
            </div>
            <div>
              <h3 className={styles.title}>{t(`${service.key}.title`)}</h3>
              <p className={styles.desc}>{t(`${service.key}.desc`)}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}
