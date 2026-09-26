import { Flex } from "@chakra-ui/react";
import { ChevronRightIcon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { TextLink } from "@/components/ui/text-link";
import { getContent } from "@/content";

export async function CaseFooter() {
  const { pulsoCase } = await getContent();
  return (
    <Flex
      mt="48px"
      pt="24px"
      borderTop="1px solid"
      borderColor="border"
      justify="space-between"
      align="center"
      gap="16px"
      wrap="wrap"
    >
      <TextLink href={pulsoCase.back.href} fontSize="15px">
        {pulsoCase.back.label}
      </TextLink>
      <ButtonLink href={pulsoCase.next.href}>
        {pulsoCase.next.label}
        <ChevronRightIcon size={16} />
      </ButtonLink>
    </Flex>
  );
}
