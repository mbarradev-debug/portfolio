"use client";

import type { ReactNode } from "react";

import type { Locale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";

/**
 * Global client provider tree. `locale` and `messages` are passed from the
 * server layout (a client boundary can't read the request context itself).
 *
 * To add another client-side provider (theme, analytics, a query client, …)
 * nest it here — this is the single place components rely on for context.
 */
export function Providers({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Record<string, unknown>;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
