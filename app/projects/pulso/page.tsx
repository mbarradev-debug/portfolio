import type { Metadata } from "next";
import { CaseFooter } from "@/components/pulso/case-footer";
import { CaseHeader } from "@/components/pulso/case-header";
import { Decision, Problem, Result, Screenshots } from "@/components/pulso/case-body";
import { Screenshot } from "@/components/ui/screenshot";
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
