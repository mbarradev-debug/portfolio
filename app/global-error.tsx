"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Last-resort fallback when the root layout itself fails, so it can't use
 * Chakra, the theme or the dictionaries (the owner chose not to bundle them
 * here). Exception to the "no copy in components" rule: a short bilingual
 * message, Spanish first, each block with its own lang.
 * Colors mirror lib/theme.ts (light: #f0e7db / #202023, dark: #202023 / white).
 */
const styles = `
  :root { color-scheme: light dark; }
  body { margin: 0; min-height: 100vh; display: flex; align-items: center; justify-content: center;
    background: #f0e7db; color: #202023; font-family: system-ui, sans-serif; line-height: 1.6; text-align: center; }
  @media (prefers-color-scheme: dark) { body { background: #202023; color: rgba(255,255,255,0.92); } }
  main { max-width: 480px; padding: 24px 16px; }
  h1, h2 { font-size: 26px; margin: 0 0 4px; }
  p { margin: 0 0 20px; }
  .actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; }
  button, a { display: inline-flex; align-items: center; height: 44px; padding: 0 18px; border-radius: 6px;
    font: 600 16px system-ui, sans-serif; cursor: pointer; text-decoration: none; }
  button { border: 0; background: #2C7A7B; color: #fff; }
  a { border: 1px solid currentColor; color: inherit; }
  button:focus-visible, a:focus-visible { outline: 2px solid #88ccca; outline-offset: 2px; }
`;

export default function GlobalError({ error, retry }: { error: unknown; retry: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="es">
      <head>
        <title>Error · Miguel Barra</title>
        <meta name="robots" content="noindex" />
        <style>{styles}</style>
      </head>
      <body>
        <main>
          <h1>Algo salió mal</h1>
          <p>No pudimos cargar el sitio. Inténtalo de nuevo.</p>
          <div lang="en">
            <h2>Something went wrong</h2>
            <p>We couldn&apos;t load the site. Please try again.</p>
          </div>
          <div className="actions">
            <button type="button" onClick={() => retry()}>
              Reintentar <span lang="en">&nbsp;/ Try again</span>
            </button>
            <Link href="/">
              Inicio <span lang="en">&nbsp;/ Home</span>
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
