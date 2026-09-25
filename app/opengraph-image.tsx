import { hero, site } from "@/lib/content";
import { ogColors, ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

export const alt = site.title;
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return renderOgImage({
    kicker: site.name,
    title: hero.name,
    subtitle: hero.role,
    highlight: <div style={{ fontSize: 30, fontWeight: 700, color: ogColors.brand }}>{hero.tagline}</div>,
  });
}
