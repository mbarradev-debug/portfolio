import type { Metadata } from "next";
import { CaseFooter } from "@/components/pulso/case-footer";
import { CaseHeader } from "@/components/pulso/case-header";
import { Decision, Problem, Result, Screenshots } from "@/components/pulso/case-body";
import { Placeholder } from "@/components/ui/placeholder";
import { Section } from "@/components/ui/section";
import { PULSO_PATH, pulsoCase } from "@/lib/content";

export const metadata: Metadata = {
  title: pulsoCase.metaTitle,
  description: pulsoCase.metaDescription,
  alternates: { canonical: PULSO_PATH },
  openGraph: {
    type: "article",
    title: `${pulsoCase.metaTitle} · Miguel Barra`,
    description: pulsoCase.metaDescription,
    url: PULSO_PATH,
  },
};

export default function PulsoPage() {
  return (
    <>
      <Section delay={0} pt="48px">
        <CaseHeader />
      </Section>
      <Section delay={1} mt="32px">
        <Placeholder label={pulsoCase.screenshots.main} h={{ base: "220px", sm: "400px" }} />
      </Section>
      <Problem delay={2} />
      <Decision delay={3} />
      <Result delay={4} />
      <Screenshots delay={5} />
      <CaseFooter />
    </>
  );
}
