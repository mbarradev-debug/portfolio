import { Link } from "@/i18n/navigation";

/**
 * Global banner. Intentionally minimal — the real navigation is built in
 * PMB-011. It exists here so every page gets the `<header>` landmark (outside
 * `<main>`) from the start.
 */
export function SiteHeader() {
  return (
    <header className="border-border border-b">
      <div className="max-w-page mx-auto flex w-full items-center justify-between px-6 py-4">
        <Link href="/" className="font-serif text-lg tracking-tight">
          Miguel Barra
        </Link>
      </div>
    </header>
  );
}
