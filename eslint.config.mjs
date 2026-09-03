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
  // `process.env` may only be read in `env.ts` (which validates it) and in
  // `next.config.ts` (build-time `NODE_ENV`, owned by Next before `env` is
  // populated). Everywhere else, import the typed `env` from `@/env`.
  {
    name: "portfolio/no-direct-process-env",
    ignores: ["env.ts", "next.config.ts"],
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
  // No hardcoded user-facing text in JSX — every visible string goes through
  // `useTranslations` / `getTranslations` (PMB-009). `allowedStrings` covers
  // punctuation/separators that aren't copy.
  {
    name: "portfolio/no-jsx-literals",
    files: ["app/**/*.tsx", "components/**/*.tsx"],
    // The design-system page is an internal (noindex) token reference full of
    // technical identifiers, not product copy.
    ignores: ["**/design-system/**"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        { noStrings: true, ignoreProps: true, allowedStrings: ["·", "—", "/", ":", "©"] },
      ],
    },
  },
]);

export default eslintConfig;
