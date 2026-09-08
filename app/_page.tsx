import { RevealController } from "@/components/RevealController";
import {
  About,
  Arsenal,
  CaseStudies,
  FooterCta,
  Hero,
  Projects,
  Services,
  Testimonials,
} from "@/components/sections";
import { getContent, type Locale } from "@/content";

/** Home compartida: mismas secciones, contenido según el idioma. */
export function SitePage({ locale }: { locale: Locale }) {
  const c = getContent(locale);

  return (
    <>
      <RevealController />
      <main id="top">
        <Hero c={c} />
        <About c={c} />
        <Testimonials items={c.testimonials} section={c.testimonialsSection} />
        <Services c={c} />
        <Arsenal c={c} />
        <CaseStudies items={c.cases} section={c.casesSection} />
        <Projects c={c} />
      </main>
      <FooterCta c={c} />
    </>
  );
}
