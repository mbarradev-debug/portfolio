/**
 * Shared motion tokens. Every animation and CSS transition reads its timing
 * from here (motion via these constants, Chakra via the `durations` and
 * `easings` tokens registered in lib/theme.ts).
 *
 * Decision (DBO-1317): hybrid timing. Sections keep a craftz.dog-like reveal
 * within the ≤400 ms guideline; micro-interactions use 150–200 ms.
 */

/** Durations in seconds (motion's unit). */
export const duration = {
  /** Hover, press and focus feedback. */
  micro: 0.15,
  /** Small state changes: theme icon swap, menu open/close. */
  short: 0.2,
  /** Section reveal. */
  section: 0.4,
} as const;

/**
 * Hero 3D scene (DBO-1318). Deliberate exception to the ≤400 ms guideline:
 * the camera entrance is the page's one orchestrated moment, so it runs longer
 * than UI transitions, but shorter than the original 1.8 s / 1.5 turns.
 */
export const heroScene = {
  /** Camera entrance duration, in seconds. */
  introSeconds: 1.2,
  /** Extra turns the camera spins through during the entrance. */
  introTurns: 1,
  /** Auto-rotation after the entrance stops after this long, or on the first drag. */
  autoRotateSeconds: 8,
  /** Canvas fade-in once the scene is ready. */
  fadeIn: "section",
} as const;

/** Delay between sections that enter the viewport together, in seconds. */
export const stagger = {
  section: 0.08,
} as const;

/** Cubic-bezier curves: ease-out to enter, ease-in to exit. */
export const easing = {
  enter: [0.16, 1, 0.3, 1],
  exit: [0.7, 0, 0.84, 0],
} as const;

/** Distance (px) a section rises while revealing. */
export const revealOffset = 10;

const ms = (seconds: number) => `${Math.round(seconds * 1000)}ms`;
const bezier = (curve: readonly number[]) => `cubic-bezier(${curve.join(", ")})`;

/** Chakra token values derived from the constants above. */
export const chakraMotionTokens = {
  durations: {
    micro: { value: ms(duration.micro) },
    short: { value: ms(duration.short) },
    section: { value: ms(duration.section) },
  },
  easings: {
    enter: { value: bezier(easing.enter) },
    exit: { value: bezier(easing.exit) },
  },
};

/**
 * Sections whose reveal starts within this window are treated as one visible
 * group and staggered; a section scrolled into view later starts right away.
 */
const REVEAL_GROUP_WINDOW_MS = 120;
let lastRevealAt = Number.NEGATIVE_INFINITY;
let revealIndex = 0;

/** Delay for the next section reveal, based on the group it belongs to. */
export function nextRevealDelay(now: number = performance.now()): number {
  revealIndex = now - lastRevealAt < REVEAL_GROUP_WINDOW_MS ? revealIndex + 1 : 0;
  lastRevealAt = now;
  return revealIndex * stagger.section;
}
