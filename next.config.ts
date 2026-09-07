import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  // Dominio canónico: https://miguelbarra.cl (sin www), igual que metadataBase.
  // http→https lo fuerza Vercel automáticamente. Ver DEPLOYMENT.md.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.miguelbarra.cl" }],
        destination: "https://miguelbarra.cl/:path*",
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
