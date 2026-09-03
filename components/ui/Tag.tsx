import type { ReactNode } from "react";

import styles from "./Tag.module.css";

export type TagProps = {
  children: ReactNode;
  /** `"inverse"` for dark surfaces. */
  tone?: "default" | "inverse";
  className?: string;
};

/** A small technology chip (e.g. a project's stack). */
export function Tag({ children, tone = "default", className }: TagProps) {
  return (
    <span
      className={[styles.tag, tone === "inverse" && styles.inverse, className]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
}
