"use client";

import { useEffect } from "react";

export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="bg-bg text-text flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-heading text-section-title font-bold">
        Algo salio mal
      </h1>
      <p className="text-text-soft font-body text-body max-w-md">
        Ocurrio un error inesperado al cargar esta pagina. Podes intentar de
        nuevo.
      </p>
      <button
        onClick={() => unstable_retry()}
        className="bg-text text-bg font-body text-body rounded-full px-5 py-2 font-semibold transition-colors hover:opacity-90"
      >
        Reintentar
      </button>
    </div>
  );
}
