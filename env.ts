import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

/**
 * Single source of truth for environment variables, validated once at startup.
 *
 * Import `env` from `@/env` everywhere — reading `process.env` directly is
 * banned by ESLint. Inventory and rationale for each variable live in
 * `CLAUDE.md` → "Variables de entorno".
 */
export const env = createEnv({
  /**
   * Server-only. Never sent to the browser; accessing these in client code
   * throws at runtime.
   */
  server: {
    // Contact form (PMB-015). Required — the form is the site's primary
    // conversion path. Container builds without them use SKIP_ENV_VALIDATION.
    RESEND_API_KEY: z.string().min(1),
    CONTACT_TO_EMAIL: z.email(),
    // Submissions allowed per IP per hour. Optional — defaults in `lib/contact`.
    CONTACT_RATE_LIMIT: z.coerce.number().int().positive().optional(),
  },

  /**
   * Exposed to the browser. Must be prefixed with `NEXT_PUBLIC_` (enforced by
   * the type system).
   */
  client: {
    NEXT_PUBLIC_SITE_URL: z.url(),
  },

  /**
   * Available on both server and client.
   */
  shared: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Next.js >= 13.4.4 only statically analyses client-side `process.env`, so
   * only client and shared vars need to be listed here; server vars are read
   * automatically.
   */
  experimental__runtimeEnv: {
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NODE_ENV: process.env.NODE_ENV,
  },

  /** Treat empty strings (`FOO=`) as missing rather than valid values. */
  emptyStringAsUndefined: true,

  /** Escape hatch for containerised builds that validate env at deploy time. */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
