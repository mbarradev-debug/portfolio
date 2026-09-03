import type { Locale } from "next-intl";

/**
 * Content layer — "what the site says", typed and kept apart from "how it
 * looks". Shape and conventions: `CLAUDE.md` → "Capa de contenido".
 *
 * Pure UI strings (button labels, "Loading", …) do NOT live here — those are in
 * `messages/{locale}.json` (PMB-009). This file is for domain content:
 * testimonials, case studies, projects, tech stack, nav structure, services.
 */

/** A value with a per-locale variant. Resolve with {@link pickLocale}. */
export type Localized<T> = { readonly [L in Locale]: T };

/** Resolve a {@link Localized} value for the active locale. */
export function pickLocale<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export interface Testimonial {
  /** Verbatim citation — kept in its original language, never translated. */
  readonly quote: string;
  readonly name: string;
  readonly role: Localized<string>;
  /** Where the recommendation comes from (LinkedIn, email, …). Optional. */
  readonly source?: string;
}

export interface CaseStudy {
  readonly tag: string;
  readonly date: string;
  readonly title: Localized<string>;
  readonly desc: Localized<string>;
  /** Path under `/public`. */
  readonly image: string;
  readonly imageAlt: Localized<string>;
  readonly url: string;
  /** CSS `background` value for the card. */
  readonly gradient: string;
}

export interface Project {
  readonly year: string;
  readonly name: string;
  readonly desc: Localized<string>;
  readonly tags: readonly string[];
  readonly url: string;
  readonly repoUrl?: string;
}

/**
 * One entry of the tech stack. The "(label, rows)" of the issue maps to: each
 * item has a `label`, and the stack is organised into `rows` (see
 * `tech-stack.ts`). Labels are stored canonical (`"Next.js"`, not `"NEXT.JS"`);
 * the legacy marquee's uppercase is a CSS `text-transform`.
 */
export interface TechItem {
  readonly label: string;
}

/** Keys under the `Nav` message namespace that name a navigable section. */
export type NavKey = "about" | "cases" | "services" | "projects" | "contact";

export interface NavItem {
  /** i18n message key: the visible label is `Nav.<key>` in `messages/` (PMB-009). */
  readonly key: NavKey;
  /** In-page anchor, e.g. `"#about"`. */
  readonly href: string;
}

export type ServiceKey = "frontend" | "backend" | "data";
export type ServiceIcon = "frontend" | "backend" | "cloud";

export interface ServiceCard {
  /** Display index, e.g. `"01."`. */
  readonly index: string;
  /** Semantic icon key, mapped to an icon component in PMB-011. */
  readonly icon: ServiceIcon;
  /**
   * i18n key: title/description are `Services.<key>.title` / `.desc` in
   * `messages/` (marketing copy → PMB-009).
   */
  readonly key: ServiceKey;
}
