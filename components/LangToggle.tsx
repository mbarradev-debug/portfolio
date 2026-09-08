"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/content";

// Cambia entre la versión ES (`/`) y EN (`/en`). El botón del idioma activo es
// estático; el otro es un enlace a la home del otro idioma, conservando el hash
// de sección visible (`#casos`, …) para no perder el sitio al cambiar.
const OTHER_HOME: Record<Locale, string> = { es: "/en", en: "/" };

export function LangToggle({
  variant,
  locale,
  group,
  switchLabel,
}: {
  variant: "header" | "footer";
  locale: Locale;
  group: string;
  switchLabel: string;
}) {
  const className = variant === "header" ? "lang-toggle" : "footer-lang";
  const [hash, setHash] = useState("");

  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  const target = OTHER_HOME[locale] + hash;
  const other: Locale = locale === "es" ? "en" : "es";
  const buttons: Locale[] = ["en", "es"];

  return (
    <div className={className} role="group" aria-label={group}>
      {buttons.map((code) =>
        code === locale ? (
          <button
            key={code}
            type="button"
            data-lang={code}
            className="active"
            aria-pressed={true}
          >
            {code.toUpperCase()}
          </button>
        ) : (
          <Link
            key={code}
            href={target}
            hrefLang={other}
            data-lang={code}
            aria-label={switchLabel}
          >
            {code.toUpperCase()}
          </Link>
        ),
      )}
    </div>
  );
}
