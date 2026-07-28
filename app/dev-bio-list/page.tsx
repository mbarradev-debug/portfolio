import type { Metadata } from "next";
import { BioList } from "@/components/bio-list";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "BioList / BioItem (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-016): verifies BioList/BioItem's hanging-indent
 * layout against /legacy-reference/css/style.css (.bio-item, .bio-year)
 * in both themes, using the same example data (Bio + Stack sections)
 * found in /legacy-reference/index.html. `data-theme` is set locally on
 * each panel since these isolated routes don't wire up the real theme
 * toggle.
 */

const bioItems = [
  {
    label: "2022 – 2023",
    description:
      "Desarrollador full stack en Valuesite Ltda. — modernización de plataformas de salud para Codelco (iSalud).",
  },
  {
    label: "2024",
    description:
      "Práctica profesional en Ewreka — desarrollo móvil con Flutter.",
  },
  {
    label: "2025",
    description:
      "Titulado en Ingeniería en Computación e Informática, Universidad Andrés Bello.",
  },
  {
    label: "2025 – 2026",
    description:
      "Desarrollador full stack en Forcast — SaaS de gestión municipal (DOM Digital) y app de carga eléctrica (E-Hive).",
  },
];

const stackItems = [
  {
    label: "Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS, Angular, Shadcn/ui",
  },
  {
    label: "Backend",
    description: "Node.js, NestJS, ASP.NET MVC (.NET), REST APIs, Prisma ORM",
  },
  { label: "Datos", description: "PostgreSQL, Oracle PL/SQL, Supabase" },
];

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="bg-bg text-text flex-1 rounded-lg border border-black/10 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold capitalize">{theme} theme</h2>
      <SectionTitle>Bio</SectionTitle>
      <BioList items={bioItems} />
      <SectionTitle>Stack</SectionTitle>
      <BioList items={stackItems} />
    </div>
  );
}

export default function DevBioListPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">BioList / BioItem</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-016 — ported from
        /legacy-reference/css/style.css.
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
