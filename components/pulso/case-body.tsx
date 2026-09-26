import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { Screenshot } from "@/components/ui/screenshot";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContent } from "@/content";

export async function Problem() {
  const { pulsoCase } = await getContent();
  return (
    <Section mt="40px">
      <SectionHeading>{pulsoCase.problem.heading}</SectionHeading>
      <Text m={0} textAlign={{ base: "left", sm: "justify" }}>
        {pulsoCase.problem.body}
      </Text>
    </Section>
  );
}

export async function Decision() {
  const { pulsoCase } = await getContent();
  const { decision } = pulsoCase;
  return (
    <Section mt="32px">
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

export async function Result() {
  const { pulsoCase } = await getContent();
  const { result } = pulsoCase;
  return (
    <Section mt="32px">
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

export async function Screenshots() {
  const { pulsoCase } = await getContent();
  const { screenshots } = pulsoCase;
  return (
    <Section mt="32px">
      <SimpleGrid columns={{ base: 1, sm: 2 }} gap="16px">
        <Screenshot image={screenshots.chart} sizes="(max-width: 480px) 100vw, 360px" />
        <Screenshot image={screenshots.converter} sizes="(max-width: 480px) 100vw, 360px" />
      </SimpleGrid>
    </Section>
  );
}
