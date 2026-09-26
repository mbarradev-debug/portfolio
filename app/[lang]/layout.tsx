import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import { Box } from "@chakra-ui/react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MAIN_ID } from "@/components/layout/main-id";
import { SkipLink } from "@/components/layout/skip-link";
import { Providers } from "@/components/providers";
import { contentFor } from "@/content";
import { hasLocale, locales } from "@/lib/i18n";
import { baseOpenGraph, twitterCard } from "@/lib/metadata";
import { siteUrl } from "@/lib/site-url";

/**
 * M PLUS Rounded 1c, self-hosted as its Latin subset (see app/fonts/OFL.txt).
 * next/font/google preloaded all ~240 unicode-range slices of this Japanese
 * font (3.2 MB); headings only use weights 700 and 800 and Latin text.
 */
const mPlusRounded = localFont({
  src: [
    { path: "../fonts/m-plus-rounded-1c-700-latin.woff2", weight: "700", style: "normal" },
    { path: "../fonts/m-plus-rounded-1c-800-latin.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mplus",
  // Metric-matched Arial fallback, so swapping in the web font causes no layout shift.
  adjustFontFallback: "Arial",
});

/** One static version of every page per language; any other prefix is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const content = contentFor(lang);
  const { site } = content;
  return {
    metadataBase: new URL(siteUrl),
    title: { default: site.title, template: `%s · ${site.name}` },
    description: site.description,
    authors: [{ name: site.name }],
    openGraph: {
      ...baseOpenGraph(content),
      type: "website",
      title: site.title,
      description: site.description,
    },
    twitter: { card: twitterCard, title: site.title, description: site.description },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0e7db" },
    { media: "(prefers-color-scheme: dark)", color: "#202023" },
  ],
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const { site, navItems, cvNavItem } = contentFor(lang);

  return (
    <html lang={lang} className={mPlusRounded.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <SkipLink />
          <Navbar site={site} navItems={navItems} cvNavItem={cvNavItem} />
          <Box
            as="main"
            id={MAIN_ID}
            tabIndex={-1}
            w="100%"
            maxW="768px"
            mx="auto"
            px="16px"
            _focus={{ outline: "none" }}
          >
            {children}
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
