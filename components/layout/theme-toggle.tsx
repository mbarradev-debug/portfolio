"use client";

import { chakra } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@/components/icons";
import { site } from "@/lib/content";
import { useIsClient } from "@/lib/use-is-client";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  // Before hydration the icon is picked by CSS (.dark class), so SSR markup never mismatches.
  const key = isClient ? resolvedTheme : "ssr";

  return (
    <chakra.button
      type="button"
      aria-label={site.themeToggleLabel}
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      w="44px"
      h="44px"
      flexShrink={0}
      borderRadius="8px"
      bg="toggle.bg"
      color="toggle.fg"
      display="flex"
      alignItems="center"
      justifyContent="center"
      cursor="pointer"
      overflow="hidden"
      _hover={{ filter: "brightness(1.08)" }}
      _focusVisible={{ outline: "2px solid", outlineColor: "link", outlineOffset: "2px" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={key}
          style={{ display: "inline-flex" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <chakra.span display="none" _dark={{ display: "inline-flex" }}>
            <SunIcon size={18} />
          </chakra.span>
          <chakra.span display="inline-flex" _dark={{ display: "none" }}>
            <MoonIcon size={18} />
          </chakra.span>
        </motion.span>
      </AnimatePresence>
    </chakra.button>
  );
}
