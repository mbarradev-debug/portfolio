"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import { useTheme } from "@/app/theme-provider";

// Ported from /legacy-reference/css/style.css (.theme-toggle, .icon-sun,
// .icon-moon) and /legacy-reference/js/app.js (click toggles + persists
// via ThemeProvider, already wired in PMB-007). Icon shown = the theme
// you'd switch *to*: moon while light, sun while dark — same as legacy's
// `:root[data-theme='light'] .icon-moon` / `[data-theme='dark'] .icon-sun`.
const faceClasses =
  "bg-toggle-bg text-toggle-fg absolute inset-0 flex items-center justify-center rounded-md [backface-visibility:hidden]";

function noopSubscribe() {
  return () => {};
}

/** True once hydrated on the client, false during SSR — never changes after mount. */
function useHasMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  // ThemeProvider's initial state is "light" on the server (no `document`)
  // but reads the real, already-applied theme on client hydration (the
  // blocking script in layout.tsx sets `data-theme` before React runs) —
  // so `theme` itself disagrees between server and client on first render.
  // Render the server's "light" state until mounted to avoid a hydration
  // mismatch on aria-label/icon state, then switch to the real theme.
  const mounted = useHasMounted();
  const isLight = !mounted || theme === "light";
  const reduceMotion = useReducedMotion();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Tema ${isLight ? "claro" : "oscuro"} activo, cambiar a tema ${
        isLight ? "oscuro" : "claro"
      }`}
      className="relative inline-flex size-10 transition-transform duration-150 hover:scale-105"
      style={{ perspective: "200px" }}
    >
      {/* Classic flip-card rig: both faces sit stacked, each with
          backface-visibility hidden, and the back face is pre-rotated
          180deg. Rotating this wrapper 0<->180 flips the whole button —
          background and icon together — like a card/window turning over,
          instead of just crossfading the icon inside a static button. */}
      <motion.div
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
        initial={false}
        animate={{ rotateX: isLight ? 0 : 180 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeInOut" }}
      >
        <div className={faceClasses}>
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
          </svg>
        </div>
        <div
          className={faceClasses}
          style={{ transform: "rotateX(180deg)" }}
        >
          <svg
            aria-hidden="true"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 1.42 1.42-1.42M5.64 18.36l-1.42 1.42m15.56-1.42 1.42 1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
          </svg>
        </div>
      </motion.div>
    </button>
  );
}
