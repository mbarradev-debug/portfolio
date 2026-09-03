import { getLocale } from "next-intl/server";

import { Reveal } from "@/components/motion/Reveal";
import { caseStudies, pickLocale } from "@/content";

import { CaseStudiesCarousel } from "./CaseStudiesCarousel";
import styles from "./CaseStudiesSection.module.css";

/**
 * Case studies section (Server). Resolves the content for the active locale and
 * hands it to the `CaseStudiesCarousel` Client leaf, which owns the heading,
 * counter, prev/next and the browser-framed card.
 */
export async function CaseStudiesSection() {
  const locale = await getLocale();

  if (caseStudies.length === 0) return null;

  const items = caseStudies.map((study) => ({
    tag: study.tag,
    date: study.date,
    title: pickLocale(study.title, locale),
    desc: pickLocale(study.desc, locale),
    image: study.image,
    imageAlt: study.imageAlt ? pickLocale(study.imageAlt, locale) : undefined,
    url: study.url,
    gradient: study.gradient,
    mockTag: study.mockTag,
    mockHeadline: study.mockHeadline ? pickLocale(study.mockHeadline, locale) : undefined,
  }));

  return (
    <section id="casos" className={styles.cases} aria-labelledby="cases-title">
      <div className={styles.inner}>
        <Reveal>
          <CaseStudiesCarousel items={items} />
        </Reveal>
      </div>
    </section>
  );
}
