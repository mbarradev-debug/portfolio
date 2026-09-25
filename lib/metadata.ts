import type { Metadata } from "next";
import { site } from "./content";

/**
 * Open Graph fields shared by every page. A page's `openGraph` object replaces
 * the layout's instead of merging with it, so each page spreads these in.
 */
export const baseOpenGraph = {
  locale: site.locale,
  siteName: site.name,
} satisfies NonNullable<Metadata["openGraph"]>;

/** Large preview card; the image comes from each route's `opengraph-image`. */
export const twitterCard = "summary_large_image" as const;
