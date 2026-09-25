import { pulsoCase, site } from "@/lib/content";
import { ogColors, ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = `${pulsoCase.metaTitle} · ${pulsoCase.title}`;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  const { breadcrumb, result } = pulsoCase;
  return renderOgImage({
    kicker: `${site.name} · ${breadcrumb.parent} › ${breadcrumb.current}`,
    title: pulsoCase.title,
    highlight: (
      <div style={{ display: "flex", alignItems: "baseline", gap: 24, fontWeight: 800 }}>
        <span style={{ fontSize: 44, color: ogColors.muted, textDecoration: "line-through" }}>{result.before}</span>
        <span style={{ fontSize: 72, color: ogColors.accent }}>{result.after}</span>
      </div>
    ),
  });
}
