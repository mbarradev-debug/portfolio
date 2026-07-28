import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";

export const metadata: Metadata = {
  title: "Avatar (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-012): verifies the Avatar component's circular
 * crop, themed border, and hover scale against
 * /legacy-reference/css/style.css (.avatar) in both themes. `data-theme`
 * is set locally on each panel since these isolated routes don't wire up
 * the real theme toggle. Hover to check the scale transition.
 *
 */

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="bg-bg text-text flex-1 rounded-lg border border-black/10 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold capitalize">{theme} theme</h2>
      <Avatar src="/avatar.jpg" alt="Foto de Miguel Barra" />
    </div>
  );
}

export default function DevAvatarPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">Avatar</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-012 — ported from
        /legacy-reference/css/style.css. Hover to check the scale transition.
      </p>

      <div className="flex flex-col gap-6 md:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
