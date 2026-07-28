import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";

export const metadata: Metadata = {
  title: "ProjectCard (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-014): verifies ProjectCard's image and fallback
 * thumbnail modes, plus the hover elevation + shadow, against
 * /legacy-reference/css/style.css (.grid-item, .thumb, .thumb-app) in both
 * themes. `data-theme` is set locally on each panel since these isolated
 * routes don't wire up the real theme toggle.
 *
 * No real project screenshot exists in /legacy-reference (PMB-001 only
 * copied markup/styles, no images), so this route uses a generated
 * gradient placeholder — /public/project-thumb-placeholder.png.
 */

const GithubIcon = (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.22.66.8.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="bg-bg text-text flex-1 rounded-lg border border-black/10 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold capitalize">{theme} theme</h2>
      <div className="grid grid-cols-2 gap-6">
        <ProjectCard
          href="#"
          title="Pulso"
          description="Dashboard de indicadores económicos de Chile"
          image={{
            src: "/project-thumb-placeholder.png",
            alt: "Pulso — Dashboard de indicadores económicos de Chile",
          }}
        />
        <ProjectCard
          href="#"
          title="Código fuente"
          description="Repositorio de Pulso en GitHub"
          fallbackIcon={GithubIcon}
        />
      </div>
    </div>
  );
}

export default function DevProjectCardPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">ProjectCard</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-014 — ported from
        /legacy-reference/css/style.css. Hover a card to check the elevation +
        shadow.
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
