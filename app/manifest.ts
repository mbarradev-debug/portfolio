import type { MetadataRoute } from "next";

// Web App Manifest. Los íconos se generan desde app/icon.svg con
// scripts/generate-icons.mjs.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miguel Barra — Full Stack Developer",
    short_name: "Miguel Barra",
    description:
      "Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.",
    start_url: "/",
    display: "standalone",
    background_color: "#fcfcfa",
    theme_color: "#15181a",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
