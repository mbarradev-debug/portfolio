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
import { Section } from "@/components/ui/section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Section delay={0}>
        <IntroGreeting />
        <Identity />
      </Section>
      <Intro delay={1} />
      <Projects delay={2} />
      <ClientCases delay={3} />
      <Timeline delay={4} />
      <Stack delay={5} />
      <Hobbies delay={6} />
      <Contact delay={7} />
    </>
  );
}
