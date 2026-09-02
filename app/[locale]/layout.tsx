import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { getMessages, getTranslations } from "next-intl/server";

import { Providers } from "@/components/Providers";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { env } from "@/env";
import { initLocale } from "@/i18n/locale";
import { routing } from "@/i18n/routing";

import "../globals.css";

/** Body / UI. Variable font — exposed as `--font-jakarta`, aliased to `--font-sans`. */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta",
});

/** Decorative italic only (headline accents) — `--font-playfair` → `--font-serif`. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  style: "italic",
  variable: "--font-playfair",
});

/** Code / eyebrow labels — `--font-jetbrains` → `--font-mono`. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

const fontVariables = `${jakarta.variable} ${playfair.variable} ${jetbrainsMono.variable}`;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#15181a", // --ink
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  const activeLocale = initLocale(locale);
  const t = await getTranslations({ locale: activeLocale, namespace: "Meta" });

  return {
    metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
    title: { default: t("title"), template: `%s · ${t("titleShort")}` },
    description: t("description"),
    // Fine-grained SEO / OG images land in PMB-016 — this is the base.
    alternates: {
      canonical: `/${activeLocale}`,
      languages: { es: "/es", en: "/en", "x-default": "/es" },
    },
    openGraph: {
      type: "website",
      siteName: t("titleShort"),
      locale: activeLocale === "es" ? "es_CL" : "en_US",
      url: `/${activeLocale}`,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  const activeLocale = initLocale(locale);

  const [messages, t] = await Promise.all([getMessages(), getTranslations("A11y")]);

  return (
    <html lang={activeLocale} className={`${fontVariables} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <a href="#top" className="skip-link">
          {t("skipToContent")}
        </a>
        <Providers locale={activeLocale} messages={messages}>
          <SiteHeader />
          <main id="top" className="flex flex-1 flex-col">
            {children}
          </main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
