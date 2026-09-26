"use client";

import { chakra } from "@chakra-ui/react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";
import { focusRing, interactiveTransition, pressed } from "@/components/ui/interaction";
import { duration, easing } from "@/lib/motion";
import { useIsClient } from "@/lib/use-is-client";

/** Before hydration the icon is picked by CSS (.dark class), so SSR markup never mismatches. */
function CssThemeIcon() {
  return (
    <>
      <chakra.span display="none" _dark={{ display: "inline-flex" }}>
        <SunIcon size={18} />
      </chakra.span>
      <chakra.span display="inline-flex" _dark={{ display: "none" }}>
        <MoonIcon size={18} />
      </chakra.span>
    </>
  );
}

export function ThemeToggle({ label }: { label: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();
  // The key only changes on click, so the icon never animates on page load.
  const [switches, setSwitches] = useState(0);

  const icon = !isClient ? (
    <CssThemeIcon />
  ) : resolvedTheme === "dark" ? (
    <SunIcon size={18} />
  ) : (
    <MoonIcon size={18} />
  );

  return (
    <chakra.button
      type="button"
      aria-label={label}
      onClick={() => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        setSwitches((n) => n + 1);
      }}
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
      {...interactiveTransition}
      _hover={{ filter: "brightness(1.08)" }}
      _active={pressed}
      _focusVisible={focusRing}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={switches}
          style={{ display: "inline-flex" }}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: duration.short, ease: easing.enter } }}
          exit={{ y: 20, opacity: 0, transition: { duration: duration.micro, ease: easing.exit } }}
        >
          {icon}
        </motion.span>
      </AnimatePresence>
    </chakra.button>
  );
}
