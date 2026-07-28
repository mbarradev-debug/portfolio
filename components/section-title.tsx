import type { ReactNode } from "react";

type SectionTitleProps = {
  children: ReactNode;
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.section-title). rounded
// text/color tokens (font-heading, text-section-title, underline) already
// exist, and decoration-4 matches --underline's 4px thickness exactly.
export function SectionTitle({ children, className }: SectionTitleProps) {
  const classes = [
    "font-heading text-section-title mt-3 mb-4 font-bold underline",
    "decoration-underline decoration-4 underline-offset-[6px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <h3 className={classes}>{children}</h3>;
}
