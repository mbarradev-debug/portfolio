"use server";

import { headers } from "next/headers";

import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";

import { env } from "@/env";
import { routing } from "@/i18n/routing";
import {
  checkRateLimit,
  contactSchema,
  RATE_LIMIT_DEFAULT,
  type ContactState,
} from "@/lib/contact";

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Best-effort client IP for rate limiting (proxy headers, then a fallback). */
async function clientIp(): Promise<string> {
  const h = await headers();
  const forwarded = h.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || h.get("x-real-ip")?.trim() || "unknown";
}

/**
 * Contact form Server Action. `useActionState` signature: `(prevState,
 * formData)`. Always returns a {@link ContactState} — it never throws a bare
 * exception. It does **not** revalidate any route: the site has no cached data
 * that a submission mutates, so there is nothing to invalidate.
 *
 * Contract, Zod schema, email provider and rate-limit config: `CLAUDE.md` →
 * "Formulario de contacto".
 */
export async function submitContact(
  _prevState: ContactState,
  formData: FormData
): Promise<ContactState> {
  const requestedLocale = String(formData.get("locale"));
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
  const t = await getTranslations({ locale, namespace: "Contact" });

  // Honeypot: a real user never fills this. Pretend it worked, send nothing.
  const honeypot = formData.get("company");
  if (typeof honeypot === "string" && honeypot.trim() !== "") {
    return { success: true };
  }

  const parsed = contactSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    message: formData.get("message"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    return {
      success: false,
      fieldErrors: {
        ...(fieldErrors.name ? { name: t("errorName") } : {}),
        ...(fieldErrors.email ? { email: t("errorEmail") } : {}),
        ...(fieldErrors.message ? { message: t("errorMessage") } : {}),
      },
    };
  }

  const limit = env.CONTACT_RATE_LIMIT ?? RATE_LIMIT_DEFAULT;
  if (!checkRateLimit(await clientIp(), limit)) {
    return { success: false, error: t("errorRateLimit") };
  }

  const { name, email, message } = parsed.data;

  try {
    const response = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: env.CONTACT_TO_EMAIL,
        to: [env.CONTACT_TO_EMAIL],
        reply_to: email,
        subject: `Portfolio · ${name}`,
        text: `${message}\n\n— ${name} <${email}>`,
      }),
    });

    if (!response.ok) {
      console.error(
        "[contact] Resend responded",
        response.status,
        await response.text().catch(() => "")
      );
      return { success: false, error: t("errorGeneric") };
    }
  } catch (error) {
    console.error("[contact] send failed", error);
    return { success: false, error: t("errorGeneric") };
  }

  return { success: true };
}
