import type { Metadata } from "next";
import { Box, Heading, Text } from "@chakra-ui/react";
import { ButtonLink } from "@/components/ui/button-link";
import { getContent } from "@/content";

export async function generateMetadata(): Promise<Metadata> {
  const { notFound } = await getContent();
  return { title: notFound.metaTitle, robots: { index: false } };
}

export default async function NotFound() {
  const { notFound } = await getContent();
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
