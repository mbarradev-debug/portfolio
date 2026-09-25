import type { MetadataRoute } from "next";
import { PULSO_PATH } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}${PULSO_PATH}`, changeFrequency: "monthly", priority: 0.8 },
  ];
}
