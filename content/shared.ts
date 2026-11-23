/** Data that is the same in every language: contact handles, URLs, files. */

export const EMAIL = "mbarrarios.8080@gmail.com";
export const GITHUB_URL = "https://github.com/mbarradev-debug";
export const LINKEDIN_URL = "https://linkedin.com/in/miguelbarrarios";
export const PULSO_SITE_URL = "https://pulso-cyan-zeta.vercel.app";
export const PULSO_REPO_URL = "https://github.com/mbarradev-debug/pulso";
export const PULSO_PATH = "/projects/pulso";

/** CV per language, served from public/. The PDFs are the source of truth for the profile copy. */
export const CV_FILES = {
  es: "/miguel-barra-cv-es.pdf",
  en: "/miguel-barra-cv-en.pdf",
} as const;

/** Former CV URL, already shared; next.config.ts redirects it permanently to the Spanish CV. */
export const LEGACY_CV_PATH = "/cv-miguel-barra-es.pdf";

/** Screenshot files and sizes; only the alt text is translated. */
export const PULSO_SCREENSHOTS = {
  main: { src: "/pulso-dashboard.png", width: 1472, height: 800 },
  chart: { src: "/pulso-historical-chart.png", width: 1080, height: 660 },
  converter: { src: "/pulso-converter.png", width: 1080, height: 660 },
} as const;

/** Technologies are proper names: identical in both languages. */
export const STACK_CURRENT = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "NestJS",
  "PostgreSQL",
  "Docker",
  "Tailwind CSS",
  "shadcn/ui",
  "Supabase",
  "Prisma",
  "Vercel",
  "GitHub Actions",
] as const;

export const STACK_ALSO = [
  "Angular",
  "Python",
  "Flask",
  "ASP.NET MVC",
  "Oracle PL/SQL",
  "Firebase Auth",
  "Azure",
  "GCP",
  "Flutter",
  "Ionic",
] as const;
