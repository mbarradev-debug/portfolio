import type { Metadata } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";

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

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: "Miguel Barra — Full Stack Developer",
  description: "Portfolio de Miguel Barra, Full Stack Developer en Santiago de Chile.",
};

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  initLocale(locale);

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} ${playfair.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
