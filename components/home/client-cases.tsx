import { Flex, Heading, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { clientCases } from "@/lib/content";

export function ClientCases() {
  return (
    <Section mt="48px">
      <SectionHeading mb="8px">{clientCases.heading}</SectionHeading>
      <Text m="0 0 20px" color="fg.muted" fontSize="15px">
        {clientCases.subheading}
      </Text>
      <Flex direction="column" gap="12px">
        {clientCases.items.map((item) => (
          <Flex
            as="article"
            key={item.title}
            direction={{ base: "column", sm: "row" }}
            gap={{ base: "12px", sm: "20px" }}
            bg="card"
            border="1px solid"
            borderColor="border"
            borderRadius="12px"
            px={{ base: "16px", sm: "20px" }}
            py="18px"
          >
            <Flex direction="column" gap="2px" w={{ base: "auto", sm: "120px" }} flexShrink={0}>
              <Text as="span" fontFamily="heading" fontWeight="700" fontSize="15px">
                {item.period}
              </Text>
              <Text as="span" fontSize="13px" color="fg.muted" lineHeight="1.4">
                {item.client}
              </Text>
            </Flex>
            <Flex direction="column" gap="8px" flexGrow={1} minW={0}>
              <Heading as="h3" m={0} fontFamily="heading" fontWeight="700" fontSize="17px" lineHeight="1.35">
                {item.title}
              </Heading>
              <Text m={0} fontSize="15px" lineHeight="1.55">
                {item.description}
              </Text>
              <Flex as="ul" gap="6px" wrap="wrap" listStyle="none" m={0} p={0} aria-label={clientCases.tagsLabel}>
                {item.tags.map((tag) => (
                  <Text as="li" key={tag} fontSize="12px" px="8px" py="2px" borderRadius="999px" bg="chip">
                    {tag}
                  </Text>
                ))}
              </Flex>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Section>
  );
}
