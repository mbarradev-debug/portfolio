import * as z from "zod";

/**
 * Contact form — shared schema, types and the in-memory rate limiter.
 *
 * This module is deliberately free of the `"use server"` directive so it can
 * export non-function values; the Server Action lives in
 * `app/actions/contact.ts`. Contract and rationale: `CLAUDE.md` → "Formulario
 * de contacto".
 */

/** Field bounds — mirrored by the `<input>` HTML attributes in `ContactForm`. */
export const CONTACT_LIMITS = {
  name: { min: 2, max: 80 },
  email: { max: 254 },
  message: { min: 10, max: 2000 },
} as const;

export const contactSchema = z.object({
  name: z.string().trim().min(CONTACT_LIMITS.name.min).max(CONTACT_LIMITS.name.max),
  email: z.email().max(CONTACT_LIMITS.email.max),
  message: z.string().trim().min(CONTACT_LIMITS.message.min).max(CONTACT_LIMITS.message.max),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Fields the UI renders errors for, in focus order. */
export const CONTACT_FIELDS = ["name", "email", "message"] as const;
export type ContactField = (typeof CONTACT_FIELDS)[number];

/**
 * Return shape of `submitContact`. Never throws — every outcome is one of these.
 * `{}` is the initial (nothing-submitted) state.
 */
export type ContactState = {
  success?: boolean;
  /** Form-level error (rate limit, provider failure). */
  error?: string;
  /** Per-field validation messages, keyed by field name. */
  fieldErrors?: Partial<Record<ContactField, string>>;
};

export const initialContactState: ContactState = {};

/** Default submissions allowed per IP per hour when `CONTACT_RATE_LIMIT` is unset. */
export const RATE_LIMIT_DEFAULT = 5;

const WINDOW_MS = 60 * 60 * 1000;
const MAX_TRACKED_KEYS = 5000;
const hitsByKey = new Map<string, number[]>();

/**
 * Fixed-window limiter over an in-process `Map` (basic, per the issue — resets
 * on restart and is per-instance). Returns `true` when the call is allowed and
 * records it, `false` when `key` is over `limit` for the trailing hour.
 */
export function checkRateLimit(key: string, limit: number): boolean {
  const now = Date.now();
  const recent = (hitsByKey.get(key) ?? []).filter((ts) => now - ts < WINDOW_MS);

  if (recent.length >= limit) {
    hitsByKey.set(key, recent);
    return false;
  }

  recent.push(now);
  hitsByKey.set(key, recent);

  // Cheap bound: once the map grows large, drop keys with no live hits.
  if (hitsByKey.size > MAX_TRACKED_KEYS) {
    for (const [k, times] of hitsByKey) {
      if (times.every((ts) => now - ts >= WINDOW_MS)) hitsByKey.delete(k);
    }
  }

  return true;
}
