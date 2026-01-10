"use client";

import { I18nProvider } from "@/i18n";
import type { ReactNode } from "react";

export default function I18nClientProvider({ children }: { children: ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}
