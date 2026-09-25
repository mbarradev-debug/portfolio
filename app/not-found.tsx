import type { Metadata } from "next";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ButtonLink } from "@/components/ui/button-link";
import { notFound } from "@/lib/content";

export const metadata: Metadata = {
  title: notFound.metaTitle,
  robots: { index: false },
};

export default function NotFound() {
  return (
    <Box pt="48px" textAlign="center">
      <Heading as="h1" fontFamily="heading" fontWeight="800" fontSize="34px" mb="12px">
        {notFound.heading}
      </Heading>
      <Text mb="24px">{notFound.body}</Text>
      <ButtonLink href={notFound.back.href}>{notFound.back.label}</ButtonLink>
    </Box>
  );
}
