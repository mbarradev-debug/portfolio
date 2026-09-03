import type { CaseStudy } from "./types";

export const caseStudies: readonly CaseStudy[] = [
  {
    tag: "DASHBOARD",
    date: "2025",
    title: {
      es: "Pulso — Indicadores económicos de Chile",
      en: "Pulso — Chilean economic indicators",
    },
    desc: {
      es: "Dashboard en producción con una API intermedia propia (Route Handlers de Next.js) sobre la API SI3 del Banco Central, con caché y fallback ante fallos externos. 10 indicadores en tiempo casi real, gráfico histórico, favoritos y conversor. SWR + Chart.js, tests E2E con Playwright y CI en GitHub Actions.",
      en: "Production dashboard with a custom intermediate API (Next.js Route Handlers) over the Central Bank's SI3 API, with caching and fallback on external failures. 10 near-real-time indicators, historical chart, favourites and a converter. SWR + Chart.js, E2E tests with Playwright and CI on GitHub Actions.",
    },
    image: "/opengraph-image.png",
    imageAlt: {
      es: "Dashboard Pulso mostrando UF, dólar, euro y cobre en tiempo real",
      en: "Pulso dashboard showing UF, dollar, euro and copper in real time",
    },
    url: "https://pulso-cyan-zeta.vercel.app",
    gradient: "linear-gradient(155deg, #e7e5f0, #dde1ee 55%, #ece7f2)",
  },
  // TODO(PMB-008): añadir "Pulso — Extensión de Chrome" cuando haya descripción,
  // stack y link (Chrome Web Store / GitHub). El comentario original vive en el
  // `<script>` de `references/index.html`.
];
