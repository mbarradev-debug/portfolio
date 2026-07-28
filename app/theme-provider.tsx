"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

export type Theme = "light" | "dark";

const STORAGE_KEY = "theme";

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

  // React's own hydration commit for <html> strips `data-theme` shortly
  // after mount, since it's not part of React's rendered attribute set for
  // that element (it was set by the pre-hydration blocking script instead).
  // useLayoutEffect re-asserts it synchronously before the browser paints,
  // on every commit, so it self-heals regardless of what stripped it.
  useLayoutEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
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
