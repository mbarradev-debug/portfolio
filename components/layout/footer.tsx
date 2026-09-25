import { Box } from "@chakra-ui/react";
import { site } from "@/lib/content";

export function Footer() {
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
