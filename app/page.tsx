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
