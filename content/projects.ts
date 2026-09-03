import type { Project } from "./types";

export const projects: readonly Project[] = [
  {
    year: "2025",
    name: "Pulso",
    desc: {
      es: "Dashboard de indicadores económicos de Chile en producción. API intermedia propia (Route Handlers de Next.js) sobre la API SI3 del Banco Central, con caché en memoria y fallback. 10 indicadores en tiempo casi real, gráfico histórico, favoritos y conversor. Tests E2E con Playwright y CI en GitHub Actions.",
      en: "Production dashboard of Chilean economic indicators. Custom intermediate API (Next.js Route Handlers) over the Central Bank's SI3 API, with in-memory caching and fallback. 10 near-real-time indicators, historical chart, favourites and a converter. E2E tests with Playwright and CI on GitHub Actions.",
    },
    tags: ["Next.js 16", "React 19", "TypeScript", "SWR", "Chart.js", "Vercel"],
    url: "https://pulso-cyan-zeta.vercel.app",
    repoUrl: "https://github.com/mbarradev-debug/pulso",
  },
];
