import type { ReactNode } from "react";

import styles from "./SectionHeading.module.css";

export type SectionHeadingProps = {
  title: ReactNode;
  /** Small label above the title (a plain string or a `<Badge>`). */
  eyebrow?: ReactNode;
  subtitle?: ReactNode;
  /** Heading level. Defaults to `h2`. */
  as?: "h1" | "h2" | "h3";
  /** `"ghost"` renders the oversized, faded legacy heading. */
  variant?: "default" | "ghost";
  /** Anchor id for `aria-labelledby`. */
  id?: string;
  className?: string;
};

/** Standard section header used across the home sections. */
export function SectionHeading({
  title,
  eyebrow,
  subtitle,
  as: Heading = "h2",
  variant = "default",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={[styles.root, variant === "ghost" && styles.ghost, className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow ? <div className={styles.eyebrow}>{eyebrow}</div> : null}
      <Heading id={id} className={styles.title}>
        {title}
      </Heading>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </div>
  );
}
