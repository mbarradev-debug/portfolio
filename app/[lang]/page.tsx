import { ClientCases } from "@/components/home/client-cases";
import { Contact } from "@/components/home/contact";
import { Hero } from "@/components/home/hero";
import { Hobbies } from "@/components/home/hobbies";
import { Identity } from "@/components/home/identity";
import { Intro } from "@/components/home/intro";
import { IntroGreeting } from "@/components/home/intro-greeting";
import { Projects } from "@/components/home/projects";
import { Stack } from "@/components/home/stack";
import { Timeline } from "@/components/home/timeline";
import { JsonLd } from "@/components/seo/json-ld";
import { Section } from "@/components/ui/section";
import type { Metadata } from "next";
import { contentFor } from "@/content";
import { hasLocale, route } from "@/lib/i18n";
import { baseOpenGraph, languageAlternates } from "@/lib/metadata";
import { personJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const content = contentFor(lang);
  const alternates = languageAlternates(lang, "/");
  // A page's openGraph replaces the layout's, so it carries every field.
  return {
    alternates,
    openGraph: {
      ...baseOpenGraph(content),
      type: "website",
      title: content.site.title,
      description: content.site.description,
      url: route(lang, "/"),
    },
  };
}

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  return (
    <>
      <JsonLd data={personJsonLd(contentFor(lang), lang)} />
      <Hero />
      <Section reveal={false}>
        <IntroGreeting />
        <Identity />
      </Section>
      <Intro />
      <Projects />
      <ClientCases />
      <Timeline />
      <Stack />
      <Hobbies />
      <Contact />
    </>
  );
}
