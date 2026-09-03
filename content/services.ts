import type { ServiceCard } from "./types";

/**
 * The three service cards. Titles and descriptions are marketing copy, so they
 * live in `messages/{locale}.json` under `Services.<key>` (PMB-009); here we
 * keep only the structure (order, index label, icon).
 */
export const services: readonly ServiceCard[] = [
  { index: "01.", icon: "frontend", key: "frontend" },
  { index: "02.", icon: "backend", key: "backend" },
  { index: "03.", icon: "cloud", key: "data" },
];
