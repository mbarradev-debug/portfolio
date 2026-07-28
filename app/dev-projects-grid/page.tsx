import type { Metadata } from "next";
import type { ProjectCardProps } from "@/components/project-card";
import { ProjectsGrid } from "@/components/projects-grid";

export const metadata: Metadata = {
  title: "ProjectsGrid (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-017): verifies ProjectsGrid's 2-column desktop
 * layout collapsing to 1 column below 560px, against
 * /legacy-reference/css/style.css (.grid-2). Resize the viewport below
 * 560px to check the collapse.
 */

const GithubIcon = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.22.66.8.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);

const items: ProjectCardProps[] = [
  {
    href: "#pulso",
    title: "Pulso",
    description: "Dashboard de indicadores económicos de Chile",
    image: {
      src: "/project-thumb-placeholder.png",
      alt: "Pulso — Dashboard de indicadores económicos de Chile",
    },
    target: "_blank",
    rel: "noopener",
  },
  {
    href: "#pulso-repo",
    title: "Código fuente",
    description: "Repositorio de Pulso en GitHub",
    fallbackIcon: GithubIcon,
    target: "_blank",
    rel: "noopener",
  },
  {
    href: "#dom-digital",
    title: "DOM Digital",
    description: "SaaS de gestión municipal para transformación digital",
    fallbackIcon: GithubIcon,
    target: "_blank",
    rel: "noopener",
  },
  {
    href: "#e-hive",
    title: "E-Hive",
    description: "App de carga eléctrica para vehículos",
    fallbackIcon: GithubIcon,
    target: "_blank",
    rel: "noopener",
  },
];

export default function DevProjectsGridPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">ProjectsGrid</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-017 — ported from
        /legacy-reference/css/style.css. Resize the viewport below 560px to
        check the 2 → 1 column collapse.
      </p>

      <ProjectsGrid items={items} />
    </div>
  );
}
