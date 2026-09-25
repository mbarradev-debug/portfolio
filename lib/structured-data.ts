import {
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PULSO_PATH,
  hero,
  pulsoCase,
  site,
  stack,
  timeline,
} from "./content";
import { siteUrl } from "./site-url";

/** JSON-LD (schema.org) built only from the site's own content. */

const PERSON_ID = `${siteUrl}/#person`;
const pulsoSite = pulsoCase.meta.find((item) => item.href)?.href;
const university = "Universidad Andrés Bello";

export function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: site.name,
    url: siteUrl,
    jobTitle: hero.tagline.split(" · ")[0],
    description: site.description,
    email: `mailto:${EMAIL}`,
    address: { "@type": "PostalAddress", addressLocality: "Santiago", addressCountry: "CL" },
    hasCredential: { "@type": "EducationalOccupationalCredential", name: hero.role },
    // The timeline mentions the degree from this university.
    alumniOf: timeline.items.some((item) => item.text.some((part) => typeof part === "string" && part.includes(university)))
      ? { "@type": "CollegeOrUniversity", name: university }
      : undefined,
    knowsAbout: stack.groups[0].items,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

export function pulsoJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: pulsoCase.title,
    headline: pulsoCase.title,
    description: pulsoCase.metaDescription,
    url: `${siteUrl}${PULSO_PATH}`,
    inLanguage: site.lang,
    author: { "@type": "Person", "@id": PERSON_ID, name: site.name, url: siteUrl },
    about: {
      "@type": "SoftwareApplication",
      name: pulsoCase.metaTitle,
      description: pulsoCase.summary,
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      ...(pulsoSite ? { url: pulsoSite } : {}),
    },
  };
}
