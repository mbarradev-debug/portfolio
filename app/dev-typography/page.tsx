import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography (dev)",
  robots: { index: false, follow: false },
};

/**
 * Temporary QA route (PMB-006): shows the full typographic hierarchy
 * ported from /legacy-reference/css/style.css — every heading-font
 * usage, every body-font size, and the FOUT/FOIT-free load of
 * M PLUS Rounded 1c via next/font/google.
 */

const headingSamples = [
  {
    label: "page-title",
    className: "font-heading text-page-title font-extrabold",
    size: "36px / 800",
  },
  {
    label: "section-title",
    className: "font-heading text-section-title font-bold",
    size: "20px / 700",
  },
  {
    label: "logo-text",
    className: "font-heading text-logo font-bold",
    size: "18px / 700",
  },
];

const bodySamples = [
  { label: "body / nav-link", className: "font-body text-body", size: "16px" },
  {
    label: "btn",
    className: "font-body text-button font-semibold",
    size: "15px",
  },
  {
    label: "grid-caption / footer",
    className: "font-body text-caption",
    size: "14px",
  },
];

export default function DevTypographyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="font-heading text-page-title mb-2 font-extrabold">
        Typography
      </h1>
      <p className="font-body text-text-soft mb-10 text-sm">
        Temporary QA route for PMB-006 — ported from
        /legacy-reference/css/style.css.
      </p>

      <h2 className="font-heading mb-4 text-lg font-bold">
        Heading font — M PLUS Rounded 1c
      </h2>
      <div className="mb-10 flex flex-col gap-6">
        {headingSamples.map((sample) => (
          <div key={sample.label}>
            <p className={sample.className}>The quick brown fox jumps</p>
            <span className="font-body text-text-soft text-xs">
              {sample.label} — {sample.size}
            </span>
          </div>
        ))}
      </div>

      <h2 className="font-heading mb-4 text-lg font-bold">
        Body font — system stack
      </h2>
      <div className="flex flex-col gap-6">
        {bodySamples.map((sample) => (
          <div key={sample.label}>
            <p className={sample.className}>The quick brown fox jumps</p>
            <span className="font-body text-text-soft text-xs">
              {sample.label} — {sample.size}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
