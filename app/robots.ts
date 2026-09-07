import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://miguelbarra.cl/sitemap.xml",
    host: "https://miguelbarra.cl",
  };
}
