"use client";

import type { ReactNode } from "react";

import type { Locale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";

/**
 * Global client provider tree. `locale`, `messages` and `timeZone` are passed
 * from the server layout — a client boundary can't read the request config
 * itself, and `NextIntlClientProvider` needs the full config so client-side
 * `useTranslations` / date formatting stays deterministic.
 *
 * To add another client-side provider (theme, analytics, a query client, …)
 * nest it here — this is the single place components rely on for context.
 */
export function Providers({
  locale,
  messages,
  timeZone,
  children,
}: {
  locale: Locale;
  messages: Record<string, unknown>;
  timeZone: string;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
      {children}
    </NextIntlClientProvider>
  );
}
