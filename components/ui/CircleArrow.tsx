import type { ReactNode } from "react";

import { ArrowRightIcon } from "./Icon";
import styles from "./CircleArrow.module.css";

export type CircleArrowProps = {
  size?: "sm" | "md" | "lg";
  /** Defaults to a right arrow. Pass another `Icon` to override. */
  icon?: ReactNode;
  /** Extra class — used by `PillButton` to drive the rotation from its own hover. */
  className?: string;
};

/**
 * The green circle-with-arrow badge from the legacy site. Decorative on its own
 * (it renders an `aria-hidden` icon); pair it with a real link/button label.
 */
export function CircleArrow({ size = "md", icon, className }: CircleArrowProps) {
  return (
    <span className={[styles.circle, styles[size], className].filter(Boolean).join(" ")}>
      {icon ?? <ArrowRightIcon />}
    </span>
  );
}
