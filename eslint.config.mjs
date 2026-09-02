import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // `process.env` may only be read in `env.ts`, which validates it. Everywhere
  // else, import the typed `env` from `@/env`.
  {
    name: "portfolio/no-direct-process-env",
    ignores: ["env.ts"],
    rules: {
      "no-restricted-properties": [
        "error",
        {
          object: "process",
          property: "env",
          message:
            "Import the validated `env` from '@/env' instead of reading process.env directly.",
        },
      ],
    },
  },
]);

export default eslintConfig;
