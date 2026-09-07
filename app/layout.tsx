import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { jetbrainsMono, playfairDisplay, plusJakartaSans } from "./fonts";
import "./globals.css";

const SITE_URL = "https://miguelbarra.cl";

const title = "Miguel Barra — Full Stack Developer";
// ≤160 caracteres: propuesta de valor + señal geográfica en los primeros ~120.
const description =
  "Miguel Barra, Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.";
// Versión para previews sociales (OG + Twitter): misma frase sin el nombre,
// dentro del largo legible de las tarjetas.
const socialDescription =
  "Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title,
  description,
  authors: [{ name: "Miguel Barra", url: SITE_URL }],
  // El canonical se declara por ruta (cada page.tsx), no aquí: un canonical
  // estático en el layout se hereda por toda ruta hija que no lo sobrescriba.
  openGraph: {
    type: "website",
    title,
    description: socialDescription,
    locale: "es_CL",
    url: "/",
    siteName: title,
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: socialDescription,
    images: ["/opengraph-image.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#15181a",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miguel Barra",
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
