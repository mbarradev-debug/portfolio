"use client";

import { Box, Flex, Heading, Text, chakra } from "@chakra-ui/react";
import { useEffect } from "react";
import { useErrorCopy } from "@/components/layout/error-copy";
import { ButtonLink } from "@/components/ui/button-link";
import { focusRing, interactiveTransition, pressed } from "@/components/ui/interaction";

/**
 * Unexpected runtime error inside a page. The navbar and footer (root layout)
 * stay in place; same layout as the 404 page.
 */
export default function ErrorPage({ error, retry }: { error: unknown; retry: () => void }) {
  const copy = useErrorCopy();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Box pt="48px" textAlign="center">
      <Heading as="h1" fontFamily="heading" fontWeight="800" fontSize="34px" mb="12px">
        {copy.heading}
      </Heading>
      <Text mb="24px">{copy.body}</Text>
      <Flex gap="12px" wrap="wrap" justify="center">
        <chakra.button
          type="button"
          onClick={() => retry()}
          h="44px"
          px="18px"
          borderRadius="6px"
          fontWeight="600"
          bg="btn.bg"
          color="btn.fg"
          cursor="pointer"
          {...interactiveTransition}
          _hover={{ filter: "brightness(0.92)", _dark: { filter: "brightness(1.08)" } }}
          _active={pressed}
          _focusVisible={focusRing}
        >
          {copy.retry}
        </chakra.button>
        <ButtonLink href={copy.back.href} variant="outline">
          {copy.back.label}
        </ButtonLink>
      </Flex>
    </Box>
  );
}
