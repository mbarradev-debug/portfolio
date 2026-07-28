import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-bg text-text flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-heading text-page-title font-extrabold">404</h1>
      <p className="text-text-soft font-body text-body max-w-md">
        No encontramos la pagina que buscas. Puede que el enlace este roto o que
        la pagina se haya movido.
      </p>
      <Link
        href="/"
        className="text-link font-body text-body font-medium hover:underline"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
