"use client";

import { ChakraProvider } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";
import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";
import { system } from "@/lib/theme";

export function Providers({ children }: { children: ReactNode }) {
  return (
    // ThemeProvider goes outside ChakraProvider so its inline script renders
    // before Emotion's global <style> tags (avoids a hydration mismatch).
    // Saved choice > system preference, persisted under "theme" like craftz.dog.
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      storageKey="theme"
      disableTransitionOnChange
    >
      <ChakraProvider value={system}>
        {/* Every motion animation respects prefers-reduced-motion. */}
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </ChakraProvider>
    </ThemeProvider>
  );
}
