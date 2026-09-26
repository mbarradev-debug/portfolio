import { Box } from "@chakra-ui/react";
import { getContent } from "@/content";

export async function Footer() {
  const { site } = await getContent();
  return (
    <Box
      as="footer"
      mt="56px"
      pb="32px"
      textAlign="center"
      fontSize="14px"
      color="fg.muted"
    >
      {site.footer}
    </Box>
  );
}
