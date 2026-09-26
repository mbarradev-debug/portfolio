import { Flex, Heading, Link, Text } from "@chakra-ui/react";
import { DownloadIcon, Icon } from "@/components/icons";
import { ButtonLink } from "@/components/ui/button-link";
import { focusRing, interactiveTransition, pressed } from "@/components/ui/interaction";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { getContent } from "@/content";

export async function Contact() {
  const { contact } = await getContent();
  const { cta } = contact;
  return (
    <Section id={contact.id} mt="48px">
      <SectionHeading>{contact.heading}</SectionHeading>
      <Flex direction="column" gap="2px" align="flex-start">
        {contact.links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            display="flex"
            alignItems="center"
            gap="10px"
            h="44px"
            px="16px"
            borderRadius="6px"
            color="ghost"
            fontWeight="600"
            maxW="100%"
            wordBreak="break-all"
            textDecoration="none"
            {...interactiveTransition}
            _hover={{ textDecoration: "underline", bg: "glass" }}
            _active={pressed}
            _focusVisible={focusRing}
          >
            <Icon name={link.icon} size={18} />
            {link.label}
          </Link>
        ))}
      </Flex>

      <Flex
        mt="32px"
        borderRadius="12px"
        bg="glass"
        p={{ base: "24px 16px", sm: "28px" }}
        direction="column"
        align="center"
        gap="10px"
        textAlign="center"
      >
        <Heading as="h3" m={0} fontFamily="heading" fontWeight="800" fontSize="22px">
          {cta.heading}
        </Heading>
        <Text m={0} fontSize="15px" color="fg.muted">
          {cta.body}
        </Text>
        <Flex gap="12px" mt="8px" wrap="wrap" justify="center">
          <ButtonLink href={cta.primary.href} download>
            <DownloadIcon size={16} strokeWidth={2.5} />
            {cta.primary.label}
          </ButtonLink>
          <ButtonLink href={cta.secondary.href} variant="outline">
            {cta.secondary.label}
          </ButtonLink>
        </Flex>
      </Flex>
    </Section>
  );
}
