import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    // e2e/ holds Playwright specs (playwright.config.ts's testDir) — they
    // use an incompatible test() API and must never be picked up here.
    exclude: ["node_modules", "legacy-reference", ".next", "e2e"],
  },
});
