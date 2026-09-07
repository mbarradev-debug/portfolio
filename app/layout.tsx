import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
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
// Versión para previews sociales (OG + Twitter): misma frase sin el nombre,
// dentro del largo legible de las tarjetas.
const socialDescription =
  "Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // `default` es el title del home; `template` añade la marca a las rutas que
  // exportan su propio `title` (p. ej. "Casos · Miguel Barra").
  title: {
    default: title,
    template: `%s · ${siteName}`,
  },
  description,
  authors: [{ name: "Miguel Barra", url: SITE_URL }],
  // El canonical se declara por ruta (cada page.tsx), no aquí: un canonical
  // estático en el layout se hereda por toda ruta hija que no lo sobrescriba.
  // La imagen social (og:image + twitter:image, con tipo, dimensiones y alt) la
  // resuelve Next desde app/opengraph-image.png y app/opengraph-image.alt.txt.
  // og:type "profile": el sitio es una página sobre una persona, no un sitio
  // genérico. LinkedIn / WhatsApp / Meta / X lo renderizan igual que "website".
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
};

export const viewport: Viewport = {
  themeColor: "#15181a",
  colorScheme: "light",
};

// Grafo JSON-LD: WebSite + ProfilePage + Person enlazados por @id.
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
      jobTitle: "Full Stack Developer",
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
      <body>
        {/* Progressive enhancement: marca que el JS está disponible antes de
            la hidratación. suppressHydrationWarning cubre la clase añadida. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <a className="skip-link" href="#top">
          Saltar al contenido
        </a>
        <Header />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
