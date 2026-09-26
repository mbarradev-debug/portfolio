/** Data that is the same in every language: contact handles, URLs, files. */

export const EMAIL = "mbarra.git@gmail.com";
export const GITHUB_URL = "https://github.com/mbarradev-debug";
export const LINKEDIN_URL = "https://linkedin.com/in/miguelbarrarios";
export const PULSO_SITE_URL = "https://pulso-cyan-zeta.vercel.app";
export const PULSO_PATH = "/projects/pulso";

/** CV per language. The English PDF doesn't exist yet (see README placeholders). */
export const CV_FILES = {
  es: "/cv-miguel-barra-es.pdf",
  en: "/cv-miguel-barra-es.pdf",
} as const;

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
  "Tailwind CSS",
  "shadcn/ui",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Prisma",
  "Vercel",
  "GitHub Actions",
] as const;

export const STACK_ALSO = [
  "Angular",
  "NestJS",
  "Python",
  "Flask",
  "ASP.NET MVC",
  "Oracle PL/SQL",
  "Firebase Auth",
  "Docker",
  "Azure",
  "GCP",
  "Flutter",
  "Ionic",
] as const;
