"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { motion, useAnimate } from "motion/react";
import { duration, easing, nextRevealDelay, revealOffset } from "@/lib/motion";

type SectionProps = Omit<BoxProps, "id"> & { id?: string };

/**
 * Reveals once when it scrolls into view: fade + short rise, staggered with
 * the other sections that enter at the same time (craftz.dog-style Section).
 * Under reduced motion the global `[data-reveal]` rule keeps it visible and
 * static from the first paint, and MotionConfig skips the transform.
 */
export function Section({ id, children, ...rest }: SectionProps) {
  const [scope, animate] = useAnimate<HTMLElement>();

  return (
    <motion.section
      ref={scope}
      id={id}
      data-reveal=""
      initial={{ opacity: 0, y: revealOffset }}
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => {
        animate(
          scope.current,
          { opacity: 1, y: 0 },
          { duration: duration.section, ease: easing.enter, delay: nextRevealDelay() },
        );
      }}
    >
      <Box {...rest}>{children}</Box>
    </motion.section>
  );
}
