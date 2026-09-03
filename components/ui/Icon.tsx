import type { SVGProps } from "react";

/**
 * SVG icon set ported from the legacy `index.html`.
 *
 * Every icon is **decorative by default**: `aria-hidden` + `focusable="false"`,
 * so it stays out of the accessibility tree. If an icon must convey meaning,
 * override with `aria-hidden={undefined}` and add `role="img"` + `aria-label`.
 *
 * Sizing follows `font-size` (`width`/`height` are `1em`); colour follows
 * `currentColor`.
 */
export type IconProps = Omit<SVGProps<SVGSVGElement>, "viewBox" | "children" | "fill" | "stroke">;

type SvgBaseProps = SVGProps<SVGSVGElement> & {
  viewBox: string;
  /** `"stroke"` (default) or `"fill"` — filled is used for brand marks. */
  paint?: "stroke" | "fill";
};

function SvgBase({ viewBox, strokeWidth = 2, paint = "stroke", children, ...props }: SvgBaseProps) {
  return (
    <svg
      viewBox={viewBox}
      width="1em"
      height="1em"
      fill={paint === "fill" ? "currentColor" : "none"}
      stroke={paint === "fill" ? "none" : "currentColor"}
      strokeWidth={paint === "fill" ? undefined : strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

/* ── Arrows ──────────────────────────────────────────────────────────────── */

export function ArrowRightIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </SvgBase>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" {...props}>
      <path d="M19 12H5M11 6l-6 6 6 6" />
    </SvgBase>
  );
}

export function ArrowUpIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" {...props}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </SvgBase>
  );
}

/** Diagonal "external / go to" arrow. */
export function ArrowUpRightIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" {...props}>
      <path d="M7 17L17 7M8 7h9v9" />
    </SvgBase>
  );
}

/* ── Chrome ──────────────────────────────────────────────────────────────── */

export function MenuIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 18 12" strokeWidth={1.6} {...props}>
      <path d="M1 1h16M1 11h16" />
    </SvgBase>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </SvgBase>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6" />
    </SvgBase>
  );
}

/* ── Service icons (48×48, thin stroke) ──────────────────────────────────── */

export function FrontendIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 48 48" strokeWidth={1.4} {...props}>
      <path d="M24 4v10M24 34v10M4 24h10M34 24h10M9.5 9.5l7 7M31.5 31.5l7 7M38.5 9.5l-7 7M16.5 31.5l-7 7" />
    </SvgBase>
  );
}

export function BackendIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 48 48" strokeWidth={1.4} {...props}>
      <path d="M24 4l18 10v20L24 44 6 34V14L24 4z" />
      <path d="M24 4v40M6 14l18 10 18-10M6 34l18-10 18 10" />
    </SvgBase>
  );
}

export function DataIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 48 48" strokeWidth={1.4} {...props}>
      <path d="M6 16l18-10 18 10-18 10-18-10z" />
      <path d="M6 24l18 10 18-10M6 32l18 10 18-10" />
    </SvgBase>
  );
}

/* ── Social / brand marks (filled) ──────────────────────────────────────── */

export function GithubIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" paint="fill" {...props}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </SvgBase>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" paint="fill" {...props}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </SvgBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <SvgBase viewBox="0 0 24 24" strokeWidth={1.6} {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M4 7l8 6 8-6" />
    </SvgBase>
  );
}
