import type { TechItem } from "./types";

const row = (...labels: string[]): readonly TechItem[] => labels.map((label) => ({ label }));

/**
 * Tech stack, organised into the two rows of the legacy marquee. Labels are
 * canonical case — a consumer that wants the marquee look applies
 * `text-transform: uppercase`.
 */
export const techStackRows: readonly (readonly TechItem[])[] = [
  row(
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Angular",
    "shadcn/ui",
    "Flutter",
    "Ionic",
    "Prisma ORM"
  ),
  row(
    "Node.js",
    "NestJS",
    "ASP.NET",
    "Python",
    "Flask",
    "PostgreSQL",
    "Oracle PL/SQL",
    "Supabase",
    "Docker",
    "Azure",
    "GCP",
    "Vercel",
    "Firebase"
  ),
];
