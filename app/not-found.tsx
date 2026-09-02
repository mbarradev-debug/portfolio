import Link from "next/link";

import "./globals.css";

/**
 * Global 404 for URLs that don't match any route. The `[locale]` layout (fonts,
 * providers, header/footer) never runs here, so this renders its own minimal
 * document in the default locale. `app/[locale]/not-found.tsx` is the richer,
 * fully-localised version used when a page inside a locale calls `notFound()`.
 */
export const metadata = {
  title: "Página no encontrada · Miguel Barra",
};

export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="text-text bg-bg flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
        <p className="text-text-muted font-mono text-xs tracking-wider uppercase">404</p>
        <h1 className="font-serif text-3xl leading-tight tracking-tight">Página no encontrada</h1>
        <p className="text-text-soft text-md max-w-prose">La ruta que buscas no existe.</p>
        <Link
          href="/"
          className="bg-accent text-text-on-accent rounded-pill px-6 py-2 font-mono text-xs tracking-wider uppercase"
        >
          Volver al inicio
        </Link>
      </body>
    </html>
  );
}
