import type { CaseStudy } from "./types";

/**
 * Falta un segundo caso: "Pulso — Extensión de Chrome". Se añadirá cuando haya
 * descripción, stack usado y enlace (Chrome Web Store / GitHub); no se inventan
 * datos. (Nota trasladada del TODO de references/index.html.)
 */
export const cases: CaseStudy[] = [
  {
    tag: "DASHBOARD",
    date: "2025",
    title: "Pulso — Indicadores económicos de Chile",
    desc: "Dashboard en producción con una API intermedia propia (Route Handlers de Next.js) sobre la API SI3 del Banco Central, con caché y fallback ante fallos externos. 10 indicadores en tiempo casi real, gráfico histórico, favoritos y conversor. SWR + Chart.js, tests E2E con Playwright y CI en GitHub Actions.",
    image: "/opengraph-image.png",
    imageAlt:
      "Dashboard Pulso mostrando UF, dólar, euro y cobre en tiempo real",
    grad: "linear-gradient(155deg,#e7e5f0,#dde1ee 55%, #ece7f2)",
    url: "https://pulso-cyan-zeta.vercel.app",
  },
];
