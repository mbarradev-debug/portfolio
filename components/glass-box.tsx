import type { ReactNode } from "react";

type GlassBoxProps = {
  children: ReactNode;
  className?: string;
};

// Ported from /legacy-reference/css/style.css (.glass-box). rounded-lg
// (8px) already matches --radius-lg exactly; bg-glass-bg is the existing
// theme token (frosted white tint, light/dark).
export function GlassBox({ children, className }: GlassBoxProps) {
  const classes = [
    "bg-glass-bg mb-6 rounded-lg p-3 text-center backdrop-blur-[10px]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <div className={classes}>{children}</div>;
}
