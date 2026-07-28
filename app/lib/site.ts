// Shared production URL for metadata routes (sitemap.ts, robots.ts) and
// app/layout.tsx's metadataBase. Overridable via NEXT_PUBLIC_SITE_URL for
// preview/staging deployments; defaults to the real production domain.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://miguelbarra.cl";
