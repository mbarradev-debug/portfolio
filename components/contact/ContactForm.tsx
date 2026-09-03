"use client";

import { useActionState, useEffect, useId, useRef } from "react";

import { useLocale, useTranslations } from "next-intl";

import { submitContact } from "@/app/actions/contact";
import { Button } from "@/components/ui";
import { CONTACT_FIELDS, CONTACT_LIMITS, initialContactState } from "@/lib/contact";

import styles from "./ContactForm.module.css";

/**
 * Contact form — Client leaf. Progressively enhanced: with no JS the `<form>`
 * POSTs straight to the Server Action and the result is server-rendered here.
 * With JS, `useActionState` shows inline field errors, a pending state, and
 * moves focus to the first error (or the result message).
 */
export function ContactForm() {
  const t = useTranslations("Contact");
  const locale = useLocale();
  const [state, formAction, pending] = useActionState(submitContact, initialContactState);

  const formRef = useRef<HTMLFormElement>(null);
  const messageRef = useRef<HTMLParagraphElement>(null);
  const id = useId();

  useEffect(() => {
    if (state.fieldErrors) {
      const firstInvalid = CONTACT_FIELDS.find((field) => state.fieldErrors?.[field]);
      if (firstInvalid) {
        formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }
    if (state.success) {
      formRef.current?.reset();
      messageRef.current?.focus();
      return;
    }
    if (state.error) {
      messageRef.current?.focus();
    }
  }, [state]);

  const fieldId = (name: string) => `${id}-${name}`;
  const errorId = (name: string) => `${id}-${name}-error`;
  const describedBy = (name: (typeof CONTACT_FIELDS)[number]) =>
    state.fieldErrors?.[name] ? errorId(name) : undefined;

  return (
    <form ref={formRef} action={formAction} className={styles.form} noValidate>
      <input type="hidden" name="locale" value={locale} />

      {/* Honeypot — off-screen, skipped by keyboard and AT. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={fieldId("company")}>{t("honeypotLabel")}</label>
        <input
          id={fieldId("company")}
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className={styles.field}>
        <label htmlFor={fieldId("name")}>{t("nameLabel")}</label>
        <input
          id={fieldId("name")}
          name="name"
          type="text"
          required
          minLength={CONTACT_LIMITS.name.min}
          maxLength={CONTACT_LIMITS.name.max}
          autoComplete="name"
          aria-invalid={state.fieldErrors?.name ? true : undefined}
          aria-describedby={describedBy("name")}
        />
        {state.fieldErrors?.name ? (
          <p id={errorId("name")} className={styles.fieldError}>
            {state.fieldErrors.name}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor={fieldId("email")}>{t("emailLabel")}</label>
        <input
          id={fieldId("email")}
          name="email"
          type="email"
          required
          maxLength={CONTACT_LIMITS.email.max}
          autoComplete="email"
          aria-invalid={state.fieldErrors?.email ? true : undefined}
          aria-describedby={describedBy("email")}
        />
        {state.fieldErrors?.email ? (
          <p id={errorId("email")} className={styles.fieldError}>
            {state.fieldErrors.email}
          </p>
        ) : null}
      </div>

      <div className={styles.field}>
        <label htmlFor={fieldId("message")}>{t("messageLabel")}</label>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          rows={5}
          minLength={CONTACT_LIMITS.message.min}
          maxLength={CONTACT_LIMITS.message.max}
          aria-invalid={state.fieldErrors?.message ? true : undefined}
          aria-describedby={describedBy("message")}
        />
        {state.fieldErrors?.message ? (
          <p id={errorId("message")} className={styles.fieldError}>
            {state.fieldErrors.message}
          </p>
        ) : null}
      </div>

      <Button type="submit" variant="dark" disabled={pending}>
        {pending ? t("submitting") : t("submit")}
      </Button>

      {state.success ? (
        <p ref={messageRef} tabIndex={-1} role="status" className={styles.ok}>
          <span className={styles.okTitle}>{t("successTitle")}</span> {t("successBody")}
        </p>
      ) : state.error ? (
        <p ref={messageRef} tabIndex={-1} role="alert" className={styles.formError}>
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
