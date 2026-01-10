import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "./animations.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import I18nClientProvider from "@/components/providers/I18nClientProvider";
import SkipLink from "@/components/ui/SkipLink";

const GTM_ID = "GTM-WQT7LXCX";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Miguel Barra | Ingeniero de Software",
  description:
    "Ingeniero en Computación e Informática especializado en desarrollo web. Diseño y desarrollo soluciones escalables con React, Next.js, TypeScript y Node.js.",
  keywords: [
    "Ingeniero de Software",
    "Desarrollador Web",
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Chile",
  ],
  authors: [{ name: "Miguel Barra" }],
  creator: "Miguel Barra",
  openGraph: {
    type: "website",
    locale: "es_CL",
    title: "Miguel Barra | Ingeniero de Software",
    description:
      "Ingeniero en Computación e Informática. Soluciones web escalables y mantenibles.",
    siteName: "Miguel Barra Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Miguel Barra | Ingeniero de Software",
    description:
      "Ingeniero en Computación e Informática. Soluciones web escalables y mantenibles.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} min-h-screen bg-bg-primary text-text-primary antialiased`}
      >
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <I18nClientProvider>
          <SkipLink />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </I18nClientProvider>
      </body>
    </html>
  );
}
