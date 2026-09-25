import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { ChevronRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { RichText } from "@/components/ui/rich-text";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { intro } from "@/lib/content";

export function Intro({ delay }: { delay: number }) {
  return (
    <Section delay={delay} mt="40px">
      <SectionHeading>{intro.heading}</SectionHeading>
      <Text m={0} textAlign={{ base: "left", sm: "justify" }} hyphens="auto">
        <RichText value={intro.body} />
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="12px" mt="24px">
        {intro.stats.map((stat) => (
          <Flex key={stat.value} direction="column" gap="2px" bg="glass" borderRadius="10px" px="16px" py="14px">
            <Text as="span" fontFamily="heading" fontWeight="800" fontSize="24px" lineHeight="1.4">
              {stat.value}
            </Text>
            <Text as="span" fontSize="13px" color="fg.muted" lineHeight="1.4">
              {stat.label}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
      <Flex justify="center" mt="24px">
        <ButtonLink href={intro.cta.href}>
          {intro.cta.label}
          <ChevronRightIcon size={16} />
        </ButtonLink>
      </Flex>
    </Section>
  );
}
