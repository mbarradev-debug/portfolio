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
  const { site } = contentFor(await localeOf(params));
  return [{ id: "card", alt: site.title, size: ogSize, contentType: ogContentType }];
}

export default async function Image({ params }: { params: Params | Promise<Params> }) {
  const { site, hero } = contentFor(await localeOf(params));
  return renderOgImage({
    kicker: site.name,
    title: hero.name,
    subtitle: hero.role,
    highlight: <div style={{ fontSize: 30, fontWeight: 700, color: ogColors.brand }}>{hero.tagline}</div>,
  });
}
