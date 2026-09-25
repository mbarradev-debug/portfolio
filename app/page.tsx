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
import { personJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />
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
