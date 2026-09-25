import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { ReactNode } from "react";

/** Shared Open Graph card (1200×630) in the site's dark palette and heading font. */

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Fixed hex values mirror the dark-mode tokens in lib/theme.ts (ImageResponse can't read Chakra tokens).
const colors = {
  bg: "#202023",
  fg: "rgba(255,255,255,0.92)",
  muted: "rgba(255,255,255,0.64)",
  brand: "#88ccca",
  accent: "#88ccca",
};

// TTF subsets (Satori can't read woff2); used only at build time.
const fontFile = (weight: 700 | 800) =>
  readFile(join(process.cwd(), `app/fonts/m-plus-rounded-1c-${weight}-og.ttf`));

function LogoMark() {
  return (
    <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
      <path d="M2 20 L9 8 L13 14 L16 10 L22 20 Z" fill={colors.brand} />
      <path d="M9 8 L11 11.4 L9.6 12.4 L8 10.4 Z" fill={colors.fg} />
    </svg>
  );
}

type OgCardProps = {
  /** Small line next to the logo (site name, breadcrumb). */
  kicker: string;
  title: string;
  subtitle?: string;
  /** Optional highlighted element under the subtitle. */
  highlight?: ReactNode;
};

export async function renderOgImage({ kicker, title, subtitle, highlight }: OgCardProps) {
  const [bold, extraBold] = await Promise.all([fontFile(700), fontFile(800)]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: colors.bg,
          color: colors.fg,
          fontFamily: "M PLUS Rounded 1c",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 32, fontWeight: 800 }}>
          <LogoMark />
          {kicker}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: title.length > 30 ? 64 : 88, fontWeight: 800, lineHeight: 1.15 }}>{title}</div>
          {subtitle && <div style={{ fontSize: 34, fontWeight: 700, color: colors.muted }}>{subtitle}</div>}
          {highlight}
        </div>
        <div style={{ display: "flex", height: 10, width: 160, borderRadius: 5, background: colors.brand }} />
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "M PLUS Rounded 1c", data: bold, weight: 700, style: "normal" },
        { name: "M PLUS Rounded 1c", data: extraBold, weight: 800, style: "normal" },
      ],
    },
  );
}

export const ogColors = colors;
