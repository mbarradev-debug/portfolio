import { Flex, Heading, Text } from "@chakra-ui/react";
import { StatusBadge } from "@/components/ui/status-badge";
import { TextLink } from "@/components/ui/text-link";
import { pulsoCase } from "@/lib/content";

export function CaseHeader() {
  const { breadcrumb } = pulsoCase;
  return (
    <>
      <Flex
        as="nav"
        aria-label={breadcrumb.label}
        align="center"
        gap="8px"
        wrap="wrap"
        fontFamily="heading"
        fontSize="20px"
        fontWeight="700"
        mb="16px"
      >
        <TextLink href={breadcrumb.parentHref}>{breadcrumb.parent}</TextLink>
        <span aria-hidden="true">›</span>
        <span aria-current="page">{breadcrumb.current}</span>
        <StatusBadge>{pulsoCase.status}</StatusBadge>
      </Flex>

      <Heading
        as="h1"
        m="0 0 12px"
        fontFamily="heading"
        fontWeight="800"
        fontSize={{ base: "28px", sm: "34px" }}
        lineHeight="1.25"
      >
        {pulsoCase.title}
      </Heading>
      <Text m={0} textAlign={{ base: "left", sm: "justify" }}>
        {pulsoCase.summary}
      </Text>

      <Flex as="dl" direction="column" gap="8px" mt="24px" mb={0} fontSize="15px">
        {pulsoCase.meta.map((item) => (
          <Flex key={item.label} align={{ base: "flex-start", sm: "center" }} gap="10px">
            <Text as="dt" w="88px" flexShrink={0} m={0}>
              <StatusBadge>{item.label}</StatusBadge>
            </Text>
            <Text as="dd" m={0} minW={0}>
              {item.href ? <TextLink href={item.href}>{item.value}</TextLink> : item.value}
            </Text>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
