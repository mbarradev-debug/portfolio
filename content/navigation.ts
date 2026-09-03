import type { NavItem } from "./types";

/**
 * Primary navigation structure. The visible label for each item is
 * `messages/{locale}.json` → `Nav.<key>` (added in PMB-009). Anchors point at
 * the home sections built in PMB-011.
 */
export const navItems: readonly NavItem[] = [
  { key: "about", href: "#about" },
  { key: "cases", href: "#casos" },
  { key: "projects", href: "#proyectos" },
  { key: "contact", href: "#contacto" },
];
