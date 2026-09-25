import { Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { hobbies } from "@/lib/content";

export function Hobbies() {
  return (
    <Section mt="48px">
      <SectionHeading>{hobbies.heading}</SectionHeading>
      <Text m={0}>{hobbies.body}</Text>
    </Section>
  );
}
