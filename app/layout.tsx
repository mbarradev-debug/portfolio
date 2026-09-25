import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Box } from "@chakra-ui/react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MAIN_ID, SkipLink } from "@/components/layout/skip-link";
import { Providers } from "@/components/providers";
import { site } from "@/lib/content";
import { siteUrl } from "@/lib/site-url";

/**
 * M PLUS Rounded 1c, self-hosted as its Latin subset (see app/fonts/OFL.txt).
 * next/font/google preloaded all ~240 unicode-range slices of this Japanese
 * font (3.2 MB); headings only use weights 700 and 800 and Latin text.
 */
const mPlusRounded = localFont({
  src: [
    { path: "./fonts/m-plus-rounded-1c-700-latin.woff2", weight: "700", style: "normal" },
    { path: "./fonts/m-plus-rounded-1c-800-latin.woff2", weight: "800", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mplus",
  // Metric-matched Arial fallback, so swapping in the web font causes no layout shift.
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: site.title, template: `%s · ${site.name}` },
  description: site.description,
  authors: [{ name: site.name }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    siteName: site.name,
    title: site.title,
    description: site.description,
    url: "/",
  },
  twitter: { card: "summary", title: site.title, description: site.description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0e7db" },
    { media: "(prefers-color-scheme: dark)", color: "#202023" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang={site.lang} className={mPlusRounded.variable} suppressHydrationWarning>
      <body>
        <Providers>
          <SkipLink />
          <Navbar />
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
