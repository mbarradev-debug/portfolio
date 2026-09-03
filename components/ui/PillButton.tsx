import type { ComponentPropsWithRef, ReactNode } from "react";

import { CircleArrow, type CircleArrowProps } from "./CircleArrow";
import styles from "./PillButton.module.css";

type SharedProps = {
  children: ReactNode;
  arrowSize?: CircleArrowProps["size"];
};

/**
 * Composite CTA: a dark label pill followed by the green {@link CircleArrow},
 * which rotates on hover of the whole control. Polymorphic like {@link Button}
 * (`as="a"` for links). Pass `ref` directly (React 19).
 */
export type PillButtonProps = SharedProps &
  (
    | ({ as?: "button" } & Omit<ComponentPropsWithRef<"button">, "children">)
    | ({ as: "a" } & Omit<ComponentPropsWithRef<"a">, "children">)
  );

export function PillButton({ children, arrowSize = "md", className, ...rest }: PillButtonProps) {
  const classNames = [styles.pill, className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <CircleArrow size={arrowSize} className={styles.arrow} />
    </>
  );

  if (rest.as === "a") {
    const { as: _as, ...anchorProps } = rest;
    return (
      <a className={classNames} {...anchorProps}>
        {inner}
      </a>
    );
  }

  const { as: _as, type, ...buttonProps } = rest;
  return (
    <button className={classNames} type={type ?? "button"} {...buttonProps}>
      {inner}
    </button>
  );
}
