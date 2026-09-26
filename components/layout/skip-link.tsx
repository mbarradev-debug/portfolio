import { Link } from "@chakra-ui/react";
import { focusRing } from "@/components/ui/interaction";
import { getContent } from "@/content";
import { MAIN_ID } from "./main-id";

/** Visible only on keyboard focus; jumps past the navbar. */
export async function SkipLink() {
  const { site } = await getContent();
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
