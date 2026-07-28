"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { animate } from "framer-motion";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

// Custom properties that differ between [data-theme="light"] and
// [data-theme="dark"] in app/globals.css. Tweened on toggle so the switch
// reads as a transition instead of the instant swap the CSS cascade does
// on its own — every Tailwind color utility resolves through one of these
// via `@theme inline`, so animating them here covers the whole page.
const THEME_VARS = [
  "--bg",
  "--text",
  "--text-soft",
  "--link",
  "--nav-bg",
  "--glass-bg",
  "--underline",
  "--ghost-text",
  "--toggle-bg",
  "--toggle-fg",
  "--avatar-border",
  "--thumb-bg",
  "--border-soft",
  "--scrollbar",
  "--thumb-app-from",
  "--thumb-app-to",
  "--thumb-app-text",
] as const;

const THEME_TRANSITION_SECONDS = 0.4;

function readThemeVars(root: HTMLElement): Record<string, string> {
  const computed = getComputedStyle(root);
  const values: Record<string, string> = {};
  for (const name of THEME_VARS) {
    values[name] = computed.getPropertyValue(name).trim();
  }
  return values;
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function readStoredTheme(): Theme | null {
  try {
    return localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : null;
  } catch {
    return null;
  }
}

/**
 * Reads the theme already applied to <html> by the blocking script in
 * app/layout.tsx (see AC: theme must apply before first paint). Reading
 * it back here — instead of recomputing from scratch — keeps this
 * component's state in sync with the DOM on first client render.
 */
function readInitialTheme(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.getAttribute("data-theme") === "dark"
    ? "dark"
    : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme_] = useState<Theme>(readInitialTheme);
  const isFirstRun = useRef(true);

  // React's own hydration commit for <html> strips `data-theme` shortly
  // after mount, since it's not part of React's rendered attribute set for
  // that element (it was set by the pre-hydration blocking script instead).
  // useLayoutEffect re-asserts it synchronously before the browser paints,
  // on every commit, so it self-heals regardless of what stripped it.
  useLayoutEffect(() => {
    const root = document.documentElement;

    // First commit just re-applies the theme the blocking script already
    // painted — nothing changed, so nothing to animate.
    if (isFirstRun.current) {
      isFirstRun.current = false;
      root.setAttribute("data-theme", theme);
      return;
    }

    if (prefersReducedMotion()) {
      root.setAttribute("data-theme", theme);
      THEME_VARS.forEach((name) => root.style.removeProperty(name));
      return;
    }

    const from = readThemeVars(root);
    root.setAttribute("data-theme", theme);
    const to = readThemeVars(root);

    // Pin the outgoing colors as inline overrides so the attribute swap
    // above doesn't jump instantly, then tween each one to its new value.
    THEME_VARS.forEach((name) => root.style.setProperty(name, from[name]));

    const controls = animate(
      root,
      Object.fromEntries(THEME_VARS.map((name) => [name, to[name]])),
      {
        duration: THEME_TRANSITION_SECONDS,
        ease: "easeInOut",
        onComplete: () => {
          THEME_VARS.forEach((name) => root.style.removeProperty(name));
        },
      },
    );

    return () => controls.stop();
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    setTheme_(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // localStorage unavailable (private mode, disabled, etc.) — theme
      // still applies for this session, just doesn't persist.
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [theme, setTheme]);

  // Matches /legacy-reference/js/app.js: only follow OS theme changes while
  // the user hasn't made an explicit choice (nothing in localStorage).
  useEffect(() => {
    if (readStoredTheme()) return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      if (!readStoredTheme()) {
        setTheme_(e.matches ? "dark" : "light");
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return ctx;
}
