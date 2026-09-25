import { Link } from "@chakra-ui/react";
import { focusRing } from "@/components/ui/interaction";
import { site } from "@/lib/content";

export const MAIN_ID = "contenido";

/** Visible only on keyboard focus; jumps past the navbar. */
export function SkipLink() {
  return (
    <Link
      href={`#${MAIN_ID}`}
      position="absolute"
      left="16px"
      top="-100px"
      zIndex={20}
      px="12px"
      py="8px"
      borderRadius="6px"
      bg="btn.bg"
      color="btn.fg"
      fontWeight="600"
      textDecoration="none"
      _focusVisible={{ ...focusRing, top: "8px" }}
    >
      {site.skipToContent}
    </Link>
  );
}
