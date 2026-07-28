"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "@/app/theme-provider";

// Ported from /legacy-reference/css/style.css (.theme-toggle, .icon-sun,
// .icon-moon) and /legacy-reference/js/app.js (click toggles + persists
// via ThemeProvider, already wired in PMB-007). Icon shown = the theme
// you'd switch *to*: moon while light, sun while dark — same as legacy's
// `:root[data-theme='light'] .icon-moon` / `[data-theme='dark'] .icon-sun`.
const iconBaseClasses =
  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 [transition:opacity_0.3s_ease,transform_0.4s_ease]";

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

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Tema ${isLight ? "claro" : "oscuro"} activo, cambiar a tema ${
        isLight ? "oscuro" : "claro"
      }`}
      className="bg-toggle-bg text-toggle-fg relative inline-flex size-10 items-center justify-center rounded-md transition-[background-color,transform] duration-150 hover:scale-105"
    >
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={`${iconBaseClasses} ${
          isLight
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-50 opacity-0"
        }`}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" />
      </svg>
      <svg
        aria-hidden="true"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className={`${iconBaseClasses} ${
          isLight
            ? "rotate-90 scale-50 opacity-0"
            : "rotate-0 scale-100 opacity-100"
        }`}
      >
        <path d="M12 4V2m0 20v-2M4 12H2m20 0h-2M5.64 5.64 4.22 4.22m15.56 1.42 1.42-1.42M5.64 18.36l-1.42 1.42m15.56-1.42 1.42 1.42M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
      </svg>
    </button>
  );
}
