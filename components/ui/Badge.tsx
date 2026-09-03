import type { ReactNode } from "react";

import styles from "./Badge.module.css";

export type BadgeProps = {
  children: ReactNode;
  /** `"inverse"` for dark sections (projects on `--color-surface-inverse`). */
  tone?: "default" | "inverse";
  className?: string;
};

/** Small uppercase eyebrow label with a leading accent dot. */
export function Badge({ children, tone = "default", className }: BadgeProps) {
  return (
    <span
      className={[styles.badge, tone === "inverse" && styles.inverse, className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.dot} aria-hidden="true" />
      {children}
    </span>
  );
}
