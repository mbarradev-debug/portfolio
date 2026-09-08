import type { Metadata } from "next";
import { getContent, type Locale } from "@/content";

export const SITE_URL = "https://miguelbarra.cl";
export const SITE_NAME = "Miguel Barra";

// `metadataBase` + rutas home de cada idioma. ES vive en `/`, EN en `/en`.
const HOME_PATH: Record<Locale, string> = { es: "/", en: "/en" };

// hreflang recíprocos: los mismos en las dos variantes. `x-default` → español.
const LANGUAGE_ALTERNATES: Record<string, string> = {
  "es-CL": "/",
  en: "/en",
  "x-default": "/",
};

const OG_LOCALE: Record<Locale, string> = { es: "es_CL", en: "en_US" };

interface Copy {
  title: string;
  description: string;
  social: string;
}

const COPY: Record<Locale, Copy> = {
  es: {
    title: "Miguel Barra — Full Stack Developer · Santiago de Chile",
    description:
      "Miguel Barra, Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.",
    social:
      "Full Stack Developer en Santiago de Chile. Construyo productos completos con React, Next.js y TypeScript, de la base de datos a la nube.",
  },
  en: {
    title: "Miguel Barra — Full Stack Developer · Santiago, Chile",
    description:
      "Miguel Barra, Full Stack Developer in Santiago, Chile. I build complete products with React, Next.js and TypeScript, from the database to the cloud.",
    social:
      "Full Stack Developer in Santiago, Chile. I build complete products with React, Next.js and TypeScript, from the database to the cloud.",
  },
};

// Token de verificación de Google Search Console (env var en Vercel). Ver
// DEPLOYMENT.md. Solo se emite si está definido.
const googleSiteVerification = process.env.GOOGLE_SITE_VERIFICATION;

/** Metadata del layout raíz de un idioma. */
export function buildMetadata(locale: Locale): Metadata {
  const copy = COPY[locale];
  const home = HOME_PATH[locale];

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: copy.title,
      template: `%s · ${SITE_NAME}`,
    },
    description: copy.description,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    alternates: {
      canonical: home,
      languages: LANGUAGE_ALTERNATES,
    },
    // La imagen social la resuelve Next desde app/opengraph-image.tsx (compartida
    // por ambos idiomas: es una tarjeta de marca sin texto de párrafo).
    openGraph: {
      type: "profile",
      firstName: "Miguel",
      lastName: "Barra",
      title: copy.title,
      description: copy.social,
      locale: OG_LOCALE[locale],
      alternateLocale: locale === "es" ? [OG_LOCALE.en] : [OG_LOCALE.es],
      url: home,
      siteName: SITE_NAME,
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.social,
    },
    ...(googleSiteVerification
      ? { verification: { google: googleSiteVerification } }
      : {}),
  };
}

/** Grafo JSON-LD (WebSite + ProfilePage + Person) para un idioma. */
export function buildJsonLd(locale: Locale) {
  const c = getContent(locale);
  const copy = COPY[locale];
  const pageUrl = locale === "es" ? SITE_URL : `${SITE_URL}/en`;
  const inLanguage = locale === "es" ? "es-CL" : "en";

  const PERSON_ID = `${SITE_URL}/#person`;
  const WEBSITE_ID = `${SITE_URL}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: ["es-CL", "en"],
        publisher: { "@id": PERSON_ID },
      },
      {
        "@type": "ProfilePage",
        "@id": `${pageUrl}/#profilepage`,
        url: pageUrl,
        name: copy.title,
        isPartOf: { "@id": WEBSITE_ID },
        about: { "@id": PERSON_ID },
        mainEntity: { "@id": PERSON_ID },
        inLanguage,
      },
      {
        "@type": "Person",
        "@id": PERSON_ID,
        name: SITE_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/avatar-900.jpg`,
        jobTitle: "Full Stack Developer",
        email: c.site.email,
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
        sameAs: [c.site.github, c.site.linkedin],
      },
    ],
  };
}
