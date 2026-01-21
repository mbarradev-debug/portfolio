/**
 * Theme Management
 *
 * Handles dark/light mode with:
 * - localStorage persistence
 * - System preference detection (prefers-color-scheme)
 * - FOUC prevention via inline script
 */

export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEMES = {
  DARK: "dark" as const,
  LIGHT: "light" as const,
};

/**
 * Inline script to prevent FOUC (Flash of Unstyled Content).
 * This script runs before React hydration to set the correct theme class.
 *
 * Priority:
 * 1. localStorage preference (user explicitly set)
 * 2. System preference (prefers-color-scheme)
 * 3. Default to dark
 */
export const themeInitScript = `
(function() {
  try {
    var stored = localStorage.getItem('${THEME_STORAGE_KEY}');
    var theme = stored || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
    document.documentElement.classList.remove('dark', 'light');
    document.documentElement.classList.add(theme);
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;
