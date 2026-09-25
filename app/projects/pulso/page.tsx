import type { Metadata } from "next";
import { CaseFooter } from "@/components/pulso/case-footer";
import { CaseHeader } from "@/components/pulso/case-header";
import { Decision, Problem, Result, Screenshots } from "@/components/pulso/case-body";
import { Placeholder } from "@/components/ui/placeholder";
import { Section } from "@/components/ui/section";
import { JsonLd } from "@/components/seo/json-ld";
import { PULSO_PATH, pulsoCase, site } from "@/lib/content";
import { baseOpenGraph, twitterCard } from "@/lib/metadata";
import { pulsoJsonLd } from "@/lib/structured-data";

export const metadata: Metadata = {
  title: pulsoCase.metaTitle,
  description: pulsoCase.metaDescription,
  alternates: { canonical: PULSO_PATH },
  openGraph: {
    ...baseOpenGraph,
    type: "article",
    title: `${pulsoCase.metaTitle} · ${site.name}`,
    description: pulsoCase.metaDescription,
    url: PULSO_PATH,
  },
  // Without this the page inherits the home page's X/Twitter title and description.
  twitter: {
    card: twitterCard,
    title: `${pulsoCase.metaTitle} · ${site.name}`,
    description: pulsoCase.metaDescription,
  },
};

export default function PulsoPage() {
  return (
    <>
      <JsonLd data={pulsoJsonLd()} />
      <Section reveal={false} pt="48px">
        <CaseHeader />
      </Section>
      <Section mt="32px">
        <Placeholder label={pulsoCase.screenshots.main} h={{ base: "220px", sm: "400px" }} />
      </Section>
      <Problem />
      <Decision />
      <Result />
      <Screenshots />
      <CaseFooter />
    </>
  );
}
