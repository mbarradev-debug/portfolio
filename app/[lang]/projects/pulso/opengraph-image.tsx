import { contentFor } from "@/content/dictionaries";
import { defaultLocale, hasLocale, type Locale } from "@/lib/i18n";
import { ogColors, ogContentType, ogSize, renderOgImage } from "@/lib/og-image";

type Params = { lang: string };
const localeOf = async (params: Params | Promise<Params>): Promise<Locale> => {
  const { lang } = await params;
  return hasLocale(lang) ? lang : defaultLocale;
};

/** Alt text depends on the language, so it's generated per route instead of exported as a constant. */
export async function generateImageMetadata({ params }: { params: Params | Promise<Params> }) {
  const { pulsoCase } = contentFor(await localeOf(params));
  return [
    { id: "card", alt: `${pulsoCase.metaTitle} · ${pulsoCase.title}`, size: ogSize, contentType: ogContentType },
  ];
}

export default async function Image({ params }: { params: Params | Promise<Params> }) {
  const { site, pulsoCase } = contentFor(await localeOf(params));
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
