import type { ComponentPropsWithRef } from "react";

import styles from "./Button.module.css";

export type ButtonVariant = "dark" | "light" | "outline" | "link";
export type ButtonSize = "sm" | "md";

type SharedProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

/**
 * Polymorphic button. `as="a"` renders an anchor (for links), otherwise a
 * native `<button type="button">`. Pass `ref` directly (React 19).
 */
export type ButtonProps = SharedProps &
  (
    | ({ as?: "button" } & Omit<ComponentPropsWithRef<"button">, "size">)
    | ({ as: "a" } & Omit<ComponentPropsWithRef<"a">, "size">)
  );

export function Button(props: ButtonProps) {
  const { variant = "dark", size = "md", className, ...rest } = props;
  const classNames = [styles.button, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");

  if (rest.as === "a") {
    const { as: _as, ...anchorProps } = rest;
    return <a className={classNames} {...anchorProps} />;
  }

  const { as: _as, type, ...buttonProps } = rest;
  return <button className={classNames} type={type ?? "button"} {...buttonProps} />;
}
