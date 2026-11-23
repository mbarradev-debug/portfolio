import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

/** Unit tests for content, helpers and config. They run in Node; no DOM is needed. */
export default defineConfig({
  resolve: {
    // Same alias as tsconfig.json "paths".
    alias: { "@": fileURLToPath(new URL(".", import.meta.url)) },
  },
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
    exclude: ["node_modules/**", ".next/**", "references/**"],
  },
});
