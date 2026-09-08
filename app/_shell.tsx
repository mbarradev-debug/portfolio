import { Analytics } from "@vercel/analytics/next";
import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { getContent, type Locale } from "@/content";
import { buildJsonLd } from "./_shared";
import { jetbrainsMono, playfairDisplay, plusJakartaSans } from "./fonts";

const fontVars = `${plusJakartaSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`;

/**
 * Documento raíz compartido por los dos layouts de idioma (`app/(es)` y
 * `app/(en)`). Cada uno solo aporta su `locale`; aquí se resuelve el
 * `<html lang>`, el JSON-LD, el header y el contenido.
 */
export function Shell({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const c = getContent(locale);

  return (
    <html lang={c.htmlLang} suppressHydrationWarning className={fontVars}>
      <head>
        {/* JSON-LD en el <head>, no en el <body>: es la convención y lo que
            esperan varios validadores de terceros. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(locale)),
          }}
        />
      </head>
      <body>
        {/* Antes del primer paint: "arma" los bloques .reveal (fuera del hero)
            para que RevealController los anime al hacer scroll. El contenido se
            pinta visible; si este script no corre, nada queda oculto.
            suppressHydrationWarning cubre la clase añadida. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('reveal-armed')`,
          }}
        />
        <a className="skip-link" href="#top">
          {c.chrome.skipLink}
        </a>
        <Header c={c} />
        {children}
        {/* Analítica de Vercel: sin cookies ni datos personales (no requiere
            banner de consentimiento). El componente oficial inyecta el script
            de forma diferida, después de la hidratación. Solo emite en
            producción; en local queda en modo debug sin enviar eventos. */}
        <Analytics />
      </body>
    </html>
  );
}
