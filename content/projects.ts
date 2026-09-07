import type { Project } from "./types";

export const projects: Project[] = [
  {
    year: "2025",
    name: "Pulso",
    desc: "Dashboard de indicadores económicos de Chile en producción. API intermedia propia (Route Handlers de Next.js) sobre la API SI3 del Banco Central, con caché en memoria y fallback. 10 indicadores en tiempo casi real, gráfico histórico, favoritos y conversor. Tests E2E con Playwright y CI en GitHub Actions.",
    tags: ["Next.js 16", "React 19", "TypeScript", "SWR", "Chart.js", "Vercel"],
    url: "https://pulso-cyan-zeta.vercel.app",
  },
];
