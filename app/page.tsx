import Link from "next/link";

/**
 * Placeholder home. The real hero/landing is rebuilt in PMB-007+. Kept minimal
 * and token-driven so it doesn't carry hardcoded values into the codebase.
 */
export default function Home() {
  return (
    <main className="gap-md px-md py-3xl mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center">
      <p className="text-text-muted font-mono text-xs tracking-wider uppercase">
        Portfolio · Miguel Barra
      </p>
      <h1 className="font-serif text-3xl leading-tight tracking-tight text-balance">
        Construyo productos full stack y los llevo a <span className="italic">producción</span>.
      </h1>
      <p className="text-md text-text-soft max-w-prose">
        Sitio en reconstrucción. El sistema de diseño ya está definido — revisa los tokens en la
        página de referencia.
      </p>
      <Link
        href="/design-system"
        className="rounded-pill bg-accent px-md py-2xs text-text-on-accent duration-transition ease-standard hover:bg-accent-strong w-fit font-mono text-xs tracking-wider uppercase transition-colors"
      >
        Ver design system
      </Link>
    </main>
  );
}
