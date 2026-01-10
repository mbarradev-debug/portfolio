"use client";

import { useI18n, type Locale } from "@/i18n";

const locales: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
];

export default function LanguageSelector() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center">
      {locales.map(({ code, label }, index) => (
        <span key={code} className="flex items-center">
          <button
            onClick={() => setLocale(code)}
            className={`px-1 text-[9px] font-medium transition-colors sm:px-1.5 sm:text-[10px] ${
              locale === code
                ? "text-bg-primary/90"
                : "text-bg-secondary/50 hover:text-bg-secondary/80"
            }`}
            aria-label={code === "es" ? "Cambiar a español" : "Switch to English"}
            aria-pressed={locale === code}
          >
            {label}
          </button>
          {index < locales.length - 1 && (
            <span className="text-[9px] text-bg-secondary/30 sm:text-[10px]">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
