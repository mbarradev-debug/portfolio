import type { MetadataRoute } from "next";

// Fecha de la última edición real del contenido de la home (textos, casos,
// proyectos). Se actualiza a mano cuando cambia el contenido, NO en cada
// deploy: `new Date()` haría que el sitemap reporte "modificado hoy" tras
// cualquier despliegue, una señal de cambio poco fiable para los crawlers.
const LAST_CONTENT_UPDATE = new Date("2026-09-08");

const SITE_URL = "https://miguelbarra.cl";

// hreflang recíprocos: cada variante lista a la otra. x-default -> español.
const languages = {
  "es-CL": SITE_URL,
  en: `${SITE_URL}/en`,
};

// Solo rutas indexables. `/style-check` queda fuera por ser `noindex`.
// Sin `changefreq` / `priority`: Google los ignora desde hace años.
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: LAST_CONTENT_UPDATE,
      alternates: { languages },
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: LAST_CONTENT_UPDATE,
      alternates: { languages },
    },
  ];
}
