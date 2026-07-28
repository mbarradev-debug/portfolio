import type { Metadata } from "next";
import { Button } from "@/components/button";

export const metadata: Metadata = {
  title: "Button (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-009): verifies the Button component's solid/ghost
 * variants, optional icon, and disabled state against
 * /legacy-reference/css/style.css in both themes. `data-theme` is set
 * locally on each panel since these isolated routes don't wire up the real
 * theme toggle. Tab through the buttons to check the focus-visible ring.
 */

const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const MailIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" strokeLinecap="round" />
  </svg>
);

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="bg-bg text-text flex-1 rounded-lg border border-black/10 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold capitalize">{theme} theme</h2>
      <div className="flex flex-col items-start gap-4">
        <Button variant="solid" icon={ArrowIcon}>
          Ver proyectos
        </Button>
        <Button variant="ghost" icon={MailIcon} iconPosition="leading">
          mbarra.git@gmail.com
        </Button>
        <Button variant="solid">Sin ícono</Button>
        <Button variant="solid" disabled>
          Deshabilitado
        </Button>
        <Button variant="ghost" href="#" aria-disabled="true">
          Enlace deshabilitado
        </Button>
      </div>
    </div>
  );
}

export default function DevButtonPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">Button</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-009 — ported from
        /legacy-reference/css/style.css. Tab through the buttons to verify the
        keyboard focus-visible ring.
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
