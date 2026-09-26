import { Flex, Text } from "@chakra-ui/react";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContent } from "@/content";

export async function Timeline() {
  const { timeline } = await getContent();
  return (
    <Section id={timeline.id} mt="48px">
      <SectionHeading>{timeline.heading}</SectionHeading>
      <Flex direction="column" gap="6px" fontSize="16px">
        {timeline.items.map((item, i) => (
          // Hanging indent: the year sits in the gutter, wrapped lines align with the text.
          <Text key={i} m={0} pl="52px" textIndent="-52px">
            <Text as="strong" fontWeight="700" mr="16px">
              {item.year}
            </Text>
            <RichText value={item.text} />
          </Text>
        ))}
      </Flex>
    </Section>
  );
}
