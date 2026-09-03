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
  // Allow `_`-prefixed identifiers to be intentionally unused (e.g. discarding a
  // prop while spreading the rest).
  {
    name: "portfolio/unused-vars-underscore",
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Advisory: `setState` inside an effect is the hydration-safe way to defer
      // client-only state (mounted guards, matchMedia, IntersectionObserver).
      "react-hooks/set-state-in-effect": "warn",
    },
  },
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
    // The design-system and dev pages are internal (noindex) references full of
    // technical labels, not product copy.
    ignores: ["**/design-system/**", "**/dev/**"],
    rules: {
      "react/jsx-no-literals": [
        "error",
        { noStrings: true, ignoreProps: true, allowedStrings: ["·", "—", "/", ":", "©"] },
      ],
    },
  },
]);

export default eslintConfig;
