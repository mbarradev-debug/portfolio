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
  images: {
    // AVIF primero (mejor ratio), WebP de fallback; el optimizador negocia con
    // el header Accept del navegador y sirve JPEG/PNG si ninguno encaja.
    formats: ["image/avif", "image/webp"],
    // Anclados a los breakpoints reales del sitio (760 / 900 / 980 px y el wrap
    // de 1320 px) y al mayor asset que pasa por next/image (el mock de casos,
    // 1200 px). No hay imágenes de contenido más grandes, así que se corta ahí.
    deviceSizes: [640, 750, 828, 1080, 1200],
    // El avatar se pinta a ~240 px (móvil) / ~320 px (desktop): 256 y 384 cubren
    // esos anchos a 1x/1.5x sin subir al primer deviceSize.
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
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
