import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/Header";
import { LocaleProvider } from "@/components/LocaleProvider";
import { jetbrainsMono, playfairDisplay, plusJakartaSans } from "./fonts";
import "./globals.css";

const SITE_URL = "https://miguelbarra.cl";

// Nombre de marca del sitio (og:site_name), sin sufijos.
const siteName = "Miguel Barra";
// <title>: identidad + rol + señal geográfica, ~55 caracteres.
const title = "Miguel Barra — Full Stack Developer · Santiago de Chile";
// ≤160 caracteres: propuesta de valor + señal geográfica en los primeros ~120.
const description =
  "Miguel Barra, Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.";
// Versión para previews sociales (OG + Twitter): misma frase sin el nombre.
const socialDescription =
  "Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.";

// Token de verificación de Google Search Console (env var en Vercel). Ver
// DEPLOYMENT.md. Solo se emite si está definido.
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

// El sitio se sirve e indexa en español; el inglés es una conveniencia que
// aplica el cliente según el idioma del navegador (ver LocaleProvider), sin
// URL ni HTML propios, así que la metadata es solo española.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: `%s · ${siteName}`,
  },
  description,
  authors: [{ name: "Miguel Barra", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "profile",
    firstName: "Miguel",
    lastName: "Barra",
    title,
    description: socialDescription,
    locale: "es_CL",
    url: "/",
    siteName,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
  },
  ...(googleSiteVerification
    ? { verification: { google: googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  themeColor: "#15181a",
  colorScheme: "light",
};

const PERSON_ID = `${SITE_URL}/#person`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: siteName,
      inLanguage: "es-CL",
      publisher: { "@id": PERSON_ID },
    },
    {
      "@type": "ProfilePage",
      "@id": `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: title,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": PERSON_ID },
      mainEntity: { "@id": PERSON_ID },
      inLanguage: "es-CL",
    },
    {
      "@type": "Person",
      "@id": PERSON_ID,
      name: siteName,
      url: SITE_URL,
      image: `${SITE_URL}/avatar-900.jpg`,
      jobTitle: "Full Stack Developer",
      email: "mbarra.git@gmail.com",
      knowsLanguage: ["es", "en"],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Santiago",
        addressCountry: "CL",
      },
      knowsAbout: [
        "React",
        "Next.js",
        "TypeScript",
        "Node.js",
        "NestJS",
        "PostgreSQL",
        "Docker",
        "Cloud",
      ],
      sameAs: [
        "https://github.com/mbarradev-debug",
        "https://www.linkedin.com/in/miguelbarrarios",
      ],
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        {/* Antes del primer paint: "arma" los bloques `.reveal` (fuera del hero)
            para que RevealController los revele al entrar en viewport. Solo toca
            `<html>` (con suppressHydrationWarning), nunca los elementos, para no
            provocar un desajuste de hidratación. Sin JS la clase no se añade y
            nada queda oculto. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('reveal-armed')`,
          }}
        />
        <LocaleProvider>
          <a className="skip-link" href="#top">
            Saltar al contenido
          </a>
          <Header />
          {children}
        </LocaleProvider>
        <Analytics />
      </body>
    </html>
  );
}
