import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Placeholder } from "@/components/ui/placeholder";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { pulsoCase } from "@/lib/content";

export function Problem({ delay }: { delay: number }) {
  return (
    <Section delay={delay} mt="40px">
      <SectionHeading>{pulsoCase.problem.heading}</SectionHeading>
      <Text m={0} textAlign={{ base: "left", sm: "justify" }}>
        {pulsoCase.problem.body}
      </Text>
    </Section>
  );
}

export function Decision({ delay }: { delay: number }) {
  const { decision } = pulsoCase;
  return (
    <Section delay={delay} mt="32px">
      <SectionHeading>{decision.heading}</SectionHeading>
      <Text m="0 0 16px" textAlign={{ base: "left", sm: "justify" }}>
        {decision.body}
      </Text>
      <SimpleGrid columns={{ base: 1, sm: 3 }} gap="12px">
        {decision.findings.map((finding) => (
          <Flex
            key={finding.title}
            direction="column"
            gap="4px"
            bg="card"
            border="1px solid"
            borderColor="border"
            borderRadius="10px"
            px="16px"
            py="14px"
          >
            <Text as="span" fontFamily="heading" fontWeight="700" fontSize="15px">
              {finding.title}
            </Text>
            <Text as="span" fontSize="14px" color="fg.muted" lineHeight="1.45">
              {finding.description}
            </Text>
          </Flex>
        ))}
      </SimpleGrid>
    </Section>
  );
}

export function Result({ delay }: { delay: number }) {
  const { result } = pulsoCase;
  return (
    <Section delay={delay} mt="32px">
      <SectionHeading>{result.heading}</SectionHeading>
      <Flex
        direction={{ base: "column", sm: "row" }}
        align={{ base: "flex-start", sm: "center" }}
        gap={{ base: "12px", sm: "24px" }}
        bg="glass"
        borderRadius="12px"
        px={{ base: "20px", sm: "28px" }}
        py="24px"
      >
        <Flex align="baseline" gap="14px" fontFamily="heading" fontWeight="800" flexShrink={0}>
          <Text as="del" fontSize="30px" color="fg.muted" textDecorationThickness="2px">
            {result.before}
          </Text>
          <Text as="ins" fontSize="44px" color="accent" textDecoration="none">
            {result.after}
          </Text>
        </Flex>
        <Text m={0} fontSize="15px" lineHeight="1.55">
          {result.body}
        </Text>
      </Flex>
    </Section>
  );
}

export function Screenshots({ delay }: { delay: number }) {
  const { screenshots } = pulsoCase;
  return (
    <Section delay={delay} mt="32px">
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="16px">
        <Placeholder label={screenshots.chart} h="220px" />
        <Placeholder label={screenshots.converter} h="220px" />
      </SimpleGrid>
    </Section>
  );
}
