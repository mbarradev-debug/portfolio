import type { SystemStyleObject } from "@chakra-ui/react";

/**
 * Shared interaction states. Every link, button and card spreads these so
 * hover, press and keyboard focus look and feel the same across the site.
 * Timings come from the `durations`/`easings` tokens (lib/motion.ts).
 */

/** The one focus ring used by every interactive element. */
export const focusRing = {
  outline: "2px solid",
  outlineColor: "link",
  outlineOffset: "2px",
} as const satisfies SystemStyleObject;

/** Transition for hover/press feedback; only compositor-friendly properties. */
export const interactiveTransition = {
  transitionProperty: "transform, filter, background-color, opacity",
  transitionDuration: "micro",
  transitionTimingFunction: "enter",
} as const satisfies SystemStyleObject;

/** Press feedback for buttons and button-like links. */
export const pressed = {
  transform: "scale(0.97)",
} as const satisfies SystemStyleObject;
