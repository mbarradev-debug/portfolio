import type { Metadata } from "next";
import { GlassBox } from "@/components/glass-box";
import { SectionTitle } from "@/components/section-title";

export const metadata: Metadata = {
  title: "SectionTitle / GlassBox (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-013): verifies SectionTitle's thick underline
 * and GlassBox's frosted background against
 * /legacy-reference/css/style.css (.section-title, .glass-box) in both
 * themes. `data-theme` is set locally on each panel since these isolated
 * routes don't wire up the real theme toggle. A striped background sits
 * behind GlassBox so the backdrop-blur is visible.
 */

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="bg-bg text-text flex-1 rounded-lg border border-black/10 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold capitalize">{theme} theme</h2>

      <div
        className="mb-6 rounded-lg p-4"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, var(--brand-teal-500), var(--brand-teal-500) 10px, var(--brand-grass-teal) 10px, var(--brand-grass-teal) 20px)",
        }}
      >
        <GlassBox>¡Hola! Soy desarrollador full stack.</GlassBox>
      </div>

      <SectionTitle>Trabajo</SectionTitle>
      <p className="text-sm">Texto de ejemplo bajo el título de sección.</p>
    </div>
  );
}

export default function DevSectionGlassPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">SectionTitle / GlassBox</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-013 — ported from
        /legacy-reference/css/style.css.
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
