import { Flex, Text } from "@chakra-ui/react";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContent } from "@/content";

export async function Stack() {
  const { stack } = await getContent();
  return (
    <Section id={stack.id} mt="48px">
      <SectionHeading>{stack.heading}</SectionHeading>
      <Flex direction="column" gap="20px">
        {stack.groups.map((group) => {
          const primary = group.variant === "primary";
          return (
            <Flex key={group.label} direction="column" gap="10px">
              <Text as="span" fontSize="14px" color="fg.muted">
                {group.label}
              </Text>
              <Flex as="ul" gap="8px" wrap="wrap" listStyle="none" m={0} p={0} aria-label={group.label}>
                {group.items.map((item) => (
                  <Text
                    as="li"
                    key={item}
                    fontSize="14px"
                    fontWeight={primary ? "600" : undefined}
                    px="12px"
                    py="6px"
                    borderRadius="8px"
                    bg={primary ? "glass" : undefined}
                    border="1px solid"
                    borderColor="border"
                    color={primary ? "fg" : "fg.muted"}
                  >
                    {item}
                  </Text>
                ))}
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Section>
  );
}
