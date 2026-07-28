import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Vitest doesn't auto-register RTL's DOM cleanup between tests the way
// Jest does — without this, each `it()` in a file renders on top of the
// previous one's leftover DOM.
afterEach(() => {
  cleanup();
});

// jsdom doesn't implement matchMedia — ThemeProvider (and anything that
// reads prefers-color-scheme/prefers-reduced-motion) needs this mocked.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
