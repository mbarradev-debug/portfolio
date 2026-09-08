"use client";

import { RevealController } from "@/components/RevealController";
import {
  About,
  Arsenal,
  FooterCta,
  Hero,
  Projects,
  Services,
  Testimonials,
} from "@/components/sections";
import { getContent } from "@/content";
import { useLocale } from "./LocaleProvider";

// Cuerpo de la home. Cliente: lee el idioma del contexto y pasa el contenido a
// cada sección. El HTML inicial (SSR) sale en español; si el navegador está en
// inglés, LocaleProvider dispara un re-render con el diccionario EN.
export function SiteBody() {
  const { locale } = useLocale();
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
        <Projects items={c.cases} section={c.casesSection} />
      </main>
      <FooterCta c={c} />
    </>
  );
}
