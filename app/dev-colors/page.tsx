import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Color tokens (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-005): verifies every color token ported from
 * /legacy-reference/css/style.css renders correctly in both themes.
 * `data-theme` is set locally on each panel below since the real
 * theme toggle (PMB-007) doesn't exist yet.
 */

const brandSwatches: { label: string; value: string; className: string }[] = [
  { label: "brand-teal-500", value: "#319795", className: "bg-brand-teal-500" },
  { label: "brand-teal-600", value: "#2c7a7b", className: "bg-brand-teal-600" },
  { label: "brand-teal-200", value: "#81e6d9", className: "bg-brand-teal-200" },
  {
    label: "brand-grass-teal",
    value: "#88ccca",
    className: "bg-brand-grass-teal",
  },
  {
    label: "brand-purple-500",
    value: "#805ad5",
    className: "bg-brand-purple-500",
  },
  {
    label: "brand-orange-200",
    value: "#fbd38d",
    className: "bg-brand-orange-200",
  },
];

const semanticSwatches: {
  label: string;
  light: string;
  dark: string;
  className: string;
}[] = [
  { label: "bg", light: "#f0e7db", dark: "#202023", className: "bg-bg" },
  {
    label: "text",
    light: "#1a202c",
    dark: "rgba(255,255,255,.92)",
    className: "bg-text",
  },
  {
    label: "text-soft",
    light: "rgba(26,32,44,.75)",
    dark: "rgba(255,255,255,.6)",
    className: "bg-text-soft",
  },
  { label: "link", light: "#3d7aed", dark: "#ff63c3", className: "bg-link" },
  {
    label: "nav-bg",
    light: "rgba(255,255,255,.25)",
    dark: "rgba(32,32,35,.5)",
    className: "bg-nav-bg",
  },
  {
    label: "glass-bg",
    light: "rgba(255,255,255,.55)",
    dark: "rgba(255,255,255,.08)",
    className: "bg-glass-bg",
  },
  {
    label: "underline",
    light: "#525252",
    dark: "#a3a3a3",
    className: "bg-underline",
  },
  {
    label: "ghost-text",
    light: "brand-teal-600",
    dark: "brand-teal-200",
    className: "bg-ghost-text",
  },
  {
    label: "toggle-bg",
    light: "brand-purple-500",
    dark: "brand-orange-200",
    className: "bg-toggle-bg",
  },
  {
    label: "toggle-fg",
    light: "#ffffff",
    dark: "#1a202c",
    className: "bg-toggle-fg",
  },
  {
    label: "avatar-border",
    light: "rgba(255,255,255,.8)",
    dark: "rgba(255,255,255,.3)",
    className: "bg-avatar-border",
  },
  {
    label: "thumb-bg",
    light: "rgba(0,0,0,.05)",
    dark: "rgba(255,255,255,.06)",
    className: "bg-thumb-bg",
  },
  {
    label: "border-soft",
    light: "rgba(0,0,0,.08)",
    dark: "rgba(255,255,255,.08)",
    className: "bg-border-soft",
  },
  {
    label: "scrollbar",
    light: "rgba(0,0,0,.15)",
    dark: "rgba(255,255,255,.2)",
    className: "bg-scrollbar",
  },
  {
    label: "thumb-app-from",
    light: "#d9f4f2",
    dark: "#123634",
    className: "bg-thumb-app-from",
  },
  {
    label: "thumb-app-to",
    light: "#88ccca",
    dark: "#1f6b69",
    className: "bg-thumb-app-to",
  },
  {
    label: "thumb-app-text",
    light: "#1f6b69",
    dark: "#9be3df",
    className: "bg-thumb-app-text",
  },
];

function ThemePanel({ theme }: { theme: "light" | "dark" }) {
  return (
    <div
      data-theme={theme}
      className="bg-bg text-text flex-1 rounded-lg border border-black/10 p-6"
    >
      <h2 className="mb-4 text-lg font-semibold capitalize">{theme} theme</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {semanticSwatches.map((swatch) => (
          <div key={swatch.label} className="flex flex-col gap-1">
            <div
              className={`h-14 rounded border border-black/10 ${swatch.className}`}
            />
            <span className="text-xs font-medium">{swatch.label}</span>
            <span className="text-text-soft text-[10px]">
              {theme === "light" ? swatch.light : swatch.dark}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DevColorsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="mb-2 text-2xl font-bold">Color tokens</h1>
      <p className="mb-8 text-sm text-black/60">
        Temporary QA route for PMB-005 — ported from
        /legacy-reference/css/style.css.
      </p>

      <h2 className="mb-4 text-lg font-semibold">
        Brand palette (theme-independent)
      </h2>
      <div className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-6">
        {brandSwatches.map((swatch) => (
          <div key={swatch.label} className="flex flex-col gap-1">
            <div
              className={`h-14 rounded border border-black/10 ${swatch.className}`}
            />
            <span className="text-xs font-medium">{swatch.label}</span>
            <span className="text-[10px] text-black/60">{swatch.value}</span>
          </div>
        ))}
      </div>

      <h2 className="mb-4 text-lg font-semibold">Semantic tokens by theme</h2>
      <div className="flex flex-col gap-6 md:flex-row">
        <ThemePanel theme="light" />
        <ThemePanel theme="dark" />
      </div>
    </div>
  );
}
