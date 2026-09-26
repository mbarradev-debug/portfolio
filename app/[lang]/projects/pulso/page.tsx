import type { Metadata } from "next";
import { CaseFooter } from "@/components/pulso/case-footer";
import { CaseHeader } from "@/components/pulso/case-header";
import { Decision, Problem, Result, Screenshots } from "@/components/pulso/case-body";
import { Screenshot } from "@/components/ui/screenshot";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { contentFor, getContent } from "@/content";
import { PULSO_PATH } from "@/content/shared";
import { hasLocale, route } from "@/lib/i18n";
import { baseOpenGraph, languageAlternates, twitterCard } from "@/lib/metadata";
import { pulsoJsonLd } from "@/lib/structured-data";

export async function generateMetadata({ params }: PageProps<"/[lang]/projects/pulso">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const content = contentFor(lang);
  const { site, pulsoCase } = content;
  const alternates = languageAlternates(lang, PULSO_PATH);
  const title = `${pulsoCase.metaTitle} · ${site.name}`;
  return {
    title: pulsoCase.metaTitle,
    description: pulsoCase.metaDescription,
    alternates,
    openGraph: {
      ...baseOpenGraph(content),
      type: "article",
      title,
      description: pulsoCase.metaDescription,
      url: route(lang, PULSO_PATH),
    },
    // Without this the page inherits the home page's X/Twitter title and description.
    twitter: { card: twitterCard, title, description: pulsoCase.metaDescription },
  };
}

export default async function PulsoPage({ params }: PageProps<"/[lang]/projects/pulso">) {
  const { lang } = await params;
  if (!hasLocale(lang)) return null;
  const content = await getContent();
  const { pulsoCase } = content;
  return (
    <>
      <JsonLd data={pulsoJsonLd(content, lang)} />
      <Section reveal={false} pt="48px">
        <CaseHeader />
      </Section>
      {/* Visible from the server HTML: this screenshot is the LCP element on mobile. */}
      <Section reveal={false} mt="32px">
        <Screenshot image={pulsoCase.screenshots.main} sizes="(max-width: 768px) 100vw, 736px" eager />
      </Section>
      <Problem />
      <Decision />
      <Result />
      <Screenshots />
      <CaseFooter />
    </>
  );
}
