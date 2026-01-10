"use client";

import { useI18n, type Locale } from "@/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full bg-bg-secondary/50 p-0.5">
      {locales.map(({ code, label }) => (
        <button
          key={code}
          onClick={() => setLocale(code)}
          className={`rounded-full px-2 py-0.5 text-[10px] font-medium transition-colors sm:px-2.5 sm:py-1 sm:text-[11px] ${
            locale === code
              ? "bg-accent text-bg-primary"
              : "text-bg-secondary/70 hover:text-bg-primary"
          }`}
          aria-label={code === "es" ? "Cambiar a español" : "Switch to English"}
          aria-pressed={locale === code}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
