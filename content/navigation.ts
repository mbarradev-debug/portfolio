import type { NavItem } from "./types";

/**
 * Primary navigation structure (the footer set). The visible label for each
 * item is `messages/{locale}.json` → `Nav.<key>`. Anchors point at the home
 * section ids. The header renders the subset `HEADER_NAV`.
 */
export const navItems: readonly NavItem[] = [
  { key: "about", href: "#about" },
  { key: "cases", href: "#casos" },
  { key: "services", href: "#servicios" },
  { key: "projects", href: "#proyectos" },
  { key: "contact", href: "#contacto" },
];

/** The links shown in the fixed header (Contacto is a separate CTA button). */
export const headerNav = navItems.filter(
  (item) => item.key === "about" || item.key === "cases" || item.key === "projects"
);
