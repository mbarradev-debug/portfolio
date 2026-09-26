import { Box } from "@chakra-ui/react";
import Image from "next/image";
import type { Screenshot as ScreenshotData } from "@/content";

type ScreenshotProps = {
  image: ScreenshotData;
  /** Rendered widths per breakpoint, so the browser picks the right srcset entry. */
  sizes: string;
  /** Load right away and with high priority (the image that can be the page's LCP). */
  eager?: boolean;
};

/**
 * Product screenshot in a framed box. Width and height come from the image, so
 * the aspect ratio is reserved before it loads and nothing shifts.
 */
export function Screenshot({ image, sizes, eager = false }: ScreenshotProps) {
  return (
    <Box borderRadius="12px" overflow="hidden" border="1px solid" borderColor="border" bg="#0b0b0c">
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        style={{ display: "block", width: "100%", height: "auto" }}
      />
    </Box>
  );
}
