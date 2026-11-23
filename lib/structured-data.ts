import type { Content } from "@/content/types";
import { AVATAR, EMAIL, GITHUB_URL, LINKEDIN_URL, PULSO_PATH, PULSO_SITE_URL, UNIVERSITY } from "@/content/shared";
import { route, type Locale } from "./i18n";
import { siteUrl } from "./site-url";

/** JSON-LD (schema.org) built only from the site's own content, per language. */

const PERSON_ID = `${siteUrl}/#person`;

export function personJsonLd(content: Content, locale: Locale) {
  const { site, hero, stack } = content;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: `${siteUrl}${route(locale, "/")}`,
    jobTitle: hero.jobTitle,
    description: site.description,
    image: `${siteUrl}${AVATAR.src}`,
    email: `mailto:${EMAIL}`,
    address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
    hasCredential: { "@type": "EducationalOccupationalCredential", name: hero.role },
    alumniOf: { "@type": "CollegeOrUniversity", name: UNIVERSITY },
    knowsAbout: stack.groups[0]?.items ?? [],
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

export function pulsoJsonLd(content: Content, locale: Locale) {
  const { site, pulsoCase } = content;
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: pulsoCase.title,
    headline: pulsoCase.title,
    description: pulsoCase.metaDescription,
    url: `${siteUrl}${route(locale, PULSO_PATH)}`,
    inLanguage: locale,
    author: { "@type": "Person", "@id": PERSON_ID, name: site.name, url: `${siteUrl}${route(locale, "/")}` },
    about: {
      "@type": "SoftwareApplication",
      name: pulsoCase.metaTitle,
      description: pulsoCase.summary,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      url: PULSO_SITE_URL,
    },
  };
}
