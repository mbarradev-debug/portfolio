"use client";

import { getContent, type Locale } from "@/content";
import { useLocale } from "./LocaleProvider";

// Conmuta el idioma de la interfaz in situ (sin navegar). La elección se guarda
// en localStorage vía LocaleProvider y gana sobre la detección del navegador.
const OPTIONS: Locale[] = ["en", "es"];

export function LangToggle({ variant }: { variant: "header" | "footer" }) {
  const { locale, setLocale } = useLocale();
  const { chrome } = getContent(locale);
  const className = variant === "header" ? "lang-toggle" : "footer-lang";

  return (
    <div className={className} role="group" aria-label={chrome.langGroup}>
      {OPTIONS.map((code) => {
        const active = code === locale;
        return (
          <button
            key={code}
            type="button"
            data-lang={code}
            className={active ? "active" : undefined}
            aria-pressed={active}
            aria-current={active ? "true" : undefined}
            // El botón inactivo describe a qué idioma cambia, en ese idioma.
            aria-label={active ? undefined : chrome.switchLanguage}
            onClick={active ? undefined : () => setLocale(code)}
          >
            {code.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
