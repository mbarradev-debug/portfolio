import { getLocale, getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/Reveal";
import { ArrowUpRightIcon, Badge, Tag } from "@/components/ui";
import { pickLocale, projects } from "@/content";

import styles from "./ProjectsSection.module.css";

/** Projects section (Server): a list of `content/projects`, each row a link. */
export async function ProjectsSection() {
  const [t, locale] = await Promise.all([getTranslations("Projects"), getLocale()]);

  return (
    <section id="proyectos" className={styles.projects} aria-labelledby="projects-title">
      <div className={styles.wrap}>
        <Badge tone="inverse">{t("badge")}</Badge>
        <h2 id="projects-title" className={styles.ghost}>
          {t("heading")}
        </h2>
      </div>

      <div className={styles.list}>
        {projects.map((project) => {
          const summary = pickLocale(project.desc, locale).split(".")[0];
          return (
            <Reveal key={project.name}>
              <a
                className={styles.row}
                href={project.url}
                target="_blank"
                rel="noopener"
                aria-label={t("openExternal", { name: project.name })}
              >
                <div className={styles.year}>{project.year}</div>
                <div>
                  <h3 className={styles.name}>
                    {project.name}
                    <ArrowUpRightIcon className={styles.ext} />
                  </h3>
                  <p className={styles.summary}>{summary}</p>
                </div>
                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <Tag key={tag} tone="inverse">
                      {tag}
                    </Tag>
                  ))}
                </div>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
