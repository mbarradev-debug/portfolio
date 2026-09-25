"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Remounts on every navigation, so each page enters with the same
 * fade + rise used by craftz.dog's article layout. MotionConfig drops the
 * Y offset when the user prefers reduced motion.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}
