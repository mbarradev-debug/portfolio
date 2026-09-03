import {
  AboutSection,
  ArsenalSection,
  CaseStudiesSection,
  HeroSection,
  ProjectsSection,
  ServicesSection,
  TestimonialsSection,
} from "@/components/sections";
import { initLocale } from "@/i18n/locale";

/**
 * Home. Server Components all the way down — the only Client leaf is the
 * `LanguageSwitcher` in the header. Component tree and Server/Client split:
 * `CLAUDE.md` → "Árbol de la home".
 */
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  initLocale(locale);

  return (
    <>
      <HeroSection />
      <AboutSection />
      <TestimonialsSection />
      <ServicesSection />
      <ArsenalSection />
      <CaseStudiesSection />
      <ProjectsSection />
    </>
  );
}
