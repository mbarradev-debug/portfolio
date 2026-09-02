import type { NextConfig } from "next";

import { env } from "./env";

/**
 * Security headers. The rationale for every directive and header lives in
 * `CLAUDE.md` → "Cabeceras de seguridad". Keep both in sync.
 */
const isProd = env.NODE_ENV === "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // Next.js App Router streams the RSC payload through per-page inline <script>
  // tags that can't be stably hashed; removing 'unsafe-inline' here would force
  // nonce-based CSP via middleware, which turns every route dynamic (no static
  // generation / ISR / CDN cache). For a static site with no auth and no user
  // input that trade-off isn't worth it. 'unsafe-eval' is dev-only (React error
  // overlay). See CLAUDE.md for the full rationale and the planned upgrade path.
  `script-src 'self' 'unsafe-inline'${isProd ? "" : " 'unsafe-eval'"}`,
  // Next.js / React also inject inline <style> tags; style injection is not an
  // XSS vector, so 'unsafe-inline' here is a safe trade-off.
  "style-src 'self' 'unsafe-inline'",
  // Own assets in /public plus the Next image optimizer (data:/blob: previews).
  "img-src 'self' data: blob:",
  // Hero video served from /public.
  "media-src 'self'",
  // Fonts are self-hosted by next/font — no external font origins needed.
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
  ...(isProd
    ? [
        {
          key: "Strict-Transport-Security",
          value: "max-age=63072000; includeSubDomains; preload",
        },
      ]
    : []),
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default nextConfig;
