import type { MetadataRoute } from "next";

// Fecha de la última edición real del contenido de la home (textos, casos,
// proyectos). Se actualiza a mano cuando cambia el contenido, NO en cada
// deploy: `new Date()` haría que el sitemap reporte "modificado hoy" tras
// cualquier despliegue, una señal de cambio poco fiable para los crawlers.
const LAST_CONTENT_UPDATE = new Date("2026-09-07");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://miguelbarra.cl",
      lastModified: LAST_CONTENT_UPDATE,
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
