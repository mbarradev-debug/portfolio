import { Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContent } from "@/content";

export async function Hobbies() {
  const { hobbies } = await getContent();
  return (
    <Section mt="48px">
      <SectionHeading>{hobbies.heading}</SectionHeading>
      <Text m={0}>{hobbies.body}</Text>
    </Section>
  );
}
