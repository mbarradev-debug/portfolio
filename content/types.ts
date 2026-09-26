/**
 * Shape of every language's content. `es.ts` and `en.ts` must both satisfy it,
 * so a string missing in one language fails the type check.
 */

/** Paragraph made of plain strings and inline links. */
export type RichText = ReadonlyArray<string | { text: string; href: string }>;

export type IconName = "github" | "linkedin" | "mail" | "download";

export type ProjectSlug = "pulso" | "pulso-extension";

export interface NavItem {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
  /** Path prefix (without locale) that marks this item as the current section. */
  activeOn?: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProjectCard {
  slug: ProjectSlug;
  title: string;
  status: string;
  description: string;
  /** Only projects with a case study page have an href. */
  href?: string;
}

export interface ClientCase {
  period: string;
  client: string;
  title: string;
  description: string;
  tags: readonly string[];
}

export interface TimelineEntry {
  year: string;
  text: RichText;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface CaseMeta {
  label: string;
  value: string;
  href?: string;
}

/** Image in public/ with its intrinsic size, so next/image reserves the space (no CLS). */
export interface Screenshot {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Finding {
  title: string;
  description: string;
}

export interface LinkText {
  label: string;
  href: string;
}

export interface Content {
  site: {
    name: string;
    /** Open Graph locale, e.g. es_CL. */
    locale: string;
    lang: "es" | "en";
    title: string;
    description: string;
    footer: string;
    themeToggleLabel: string;
    menuLabel: string;
    mainNavLabel: string;
    skipToContent: string;
    /** Accessible name of the ES | EN switcher and each option's full language name. */
    languageSwitcher: { label: string; es: string; en: string };
  };
  navItems: readonly NavItem[];
  cvNavItem: NavItem;
  hero: {
    sceneAlt: string;
    sceneLoading: string;
    greeting: string;
    name: string;
    role: string;
    tagline: string;
    /** Job title used in structured data. */
    jobTitle: string;
    availability: string;
    avatarInitials: string;
    avatarAlt: string;
  };
  intro: {
    heading: string;
    body: RichText;
    stats: readonly Stat[];
    cta: LinkText;
  };
  projects: {
    id: string;
    heading: string;
    items: readonly ProjectCard[];
  };
  clientCases: {
    heading: string;
    subheading: string;
    tagsLabel: string;
    items: readonly ClientCase[];
  };
  timeline: {
    id: string;
    heading: string;
    items: readonly TimelineEntry[];
  };
  stack: {
    id: string;
    heading: string;
    groups: readonly { label: string; variant: "primary" | "secondary"; items: readonly string[] }[];
  };
  hobbies: { heading: string; body: string };
  contact: {
    id: string;
    heading: string;
    links: readonly SocialLink[];
    cta: { heading: string; body: string; primary: LinkText; secondary: LinkText };
  };
  notFound: { metaTitle: string; heading: string; body: string; back: LinkText };
  pulsoCase: {
    metaTitle: string;
    metaDescription: string;
    breadcrumb: { label: string; parent: string; parentHref: string; current: string };
    status: string;
    title: string;
    summary: string;
    meta: readonly CaseMeta[];
    screenshots: { main: Screenshot; chart: Screenshot; converter: Screenshot };
    problem: { heading: string; body: string };
    decision: { heading: string; body: string; findings: readonly Finding[] };
    result: { heading: string; before: string; after: string; body: string };
    back: LinkText;
    next: LinkText;
  };
}
