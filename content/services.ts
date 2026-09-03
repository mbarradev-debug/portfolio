import type { ServiceCard } from "./types";

export const services: readonly ServiceCard[] = [
  {
    index: "01.",
    icon: "frontend",
    title: { es: "Frontend", en: "Frontend" },
    desc: {
      es: "Interfaces rápidas, accesibles y fáciles de mantener con React, Next.js, TypeScript y Tailwind CSS.",
      en: "Fast, accessible and maintainable interfaces with React, Next.js, TypeScript and Tailwind CSS.",
    },
  },
  {
    index: "02.",
    icon: "backend",
    title: { es: "Backend & APIs", en: "Backend & APIs" },
    desc: {
      es: "Lógica de negocio y APIs REST sólidas con Node.js, NestJS, ASP.NET y Python/Flask.",
      en: "Solid business logic and REST APIs with Node.js, NestJS, ASP.NET and Python/Flask.",
    },
  },
  {
    index: "03.",
    icon: "cloud",
    title: { es: "Datos & Cloud", en: "Data & Cloud" },
    desc: {
      es: "Base de datos, contenedores y despliegue: PostgreSQL, Oracle, Docker, Azure, GCP y Vercel, con CI/CD en GitHub Actions.",
      en: "Databases, containers and deployment: PostgreSQL, Oracle, Docker, Azure, GCP and Vercel, with CI/CD on GitHub Actions.",
    },
  },
];
