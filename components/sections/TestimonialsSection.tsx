import { getLocale, getTranslations } from "next-intl/server";

import { Reveal } from "@/components/motion/Reveal";
import { pickLocale, testimonials } from "@/content";

import styles from "./TestimonialsSection.module.css";
import { TestimonialsSlider } from "./TestimonialsSlider";

/** Public LinkedIn profile the recommendations are pulled from. */
const LINKEDIN_URL = "https://www.linkedin.com/in/miguelbarrarios";

/**
 * Testimonials section (Server): teal background, `sr-only` heading, and the
 * author scaffolding. The rotation itself is the `TestimonialsSlider` Client
 * leaf — this component only resolves the content for the active locale.
 */
export async function TestimonialsSection() {
  const [t, locale] = await Promise.all([getTranslations("Testimonials"), getLocale()]);

  if (testimonials.length === 0) return null;

  const items = testimonials.map((item) => ({
    quote: item.quote,
    name: item.name,
    role: pickLocale(item.role, locale),
  }));

  return (
    <section id="testimonios" className={styles.testimonials} aria-labelledby="testimonials-title">
      <div className={styles.inner}>
        <h2 id="testimonials-title" className="sr-only">
          {t("heading")}
        </h2>
        <Reveal>
          <TestimonialsSlider items={items} linkedinUrl={LINKEDIN_URL} />
        </Reveal>
      </div>
    </section>
  );
}
