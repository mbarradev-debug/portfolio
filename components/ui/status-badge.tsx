import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

/** Small uppercase green label ("En producción", "Sitio", ...). */
export function StatusBadge({ children }: { children: ReactNode }) {
  return (
    <Box
      as="span"
      textStyle="label"
      lineHeight="1.6"
      px="6px"
      py="1px"
      borderRadius="3px"
      bg="badge.bg"
      color="badge.fg"
      whiteSpace="nowrap"
    >
      {children}
    </Box>
  );
}
