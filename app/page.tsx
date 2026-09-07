import type { Metadata } from "next";
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

// El home usa el `title.default` y la `description` del layout raíz. Cada ruta
// nueva indexable debe exportar aquí su propio `title` (recibe el sufijo de
// marca vía `title.template`) y su propia `description`.
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <RevealController />
      <main id="top">
        <Hero />
        <About />
        <Testimonials />
        <Services />
        <Arsenal />
        <CaseStudies />
        <Projects />
      </main>
      <FooterCta />
    </>
  );
}
