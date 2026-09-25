"use client";

import { Box, type BoxProps } from "@chakra-ui/react";
import { motion } from "motion/react";

type SectionProps = Omit<BoxProps, "id"> & {
  id?: string;
  /** Stagger index; each step adds 0.1 s like craftz.dog's Section. */
  delay?: number;
};

/**
 * Fades in and rises 10px on mount. Reduced motion is handled globally by
 * MotionConfig (transforms are skipped, only the fade remains).
 */
export function Section({ id, delay = 0, children, ...rest }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: delay * 0.1 }}
    >
      <Box {...rest}>{children}</Box>
    </motion.section>
  );
}
