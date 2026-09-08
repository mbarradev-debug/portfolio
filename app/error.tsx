"use client"; // Los error boundaries deben ser Client Components.

import { useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { getContent } from "@/content";

// `app/error.tsx` envuelve `page.tsx` (y sus hijos) en un React Error Boundary.
// No cubre el layout raíz —Header, fuentes, JSON-LD siguen en pie— ni haría falta
// `global-error.tsx` para este sitio (ver docs/routing.md). El HTML servido es
// español, así que el copy va fijo en ES como en `not-found.tsx`.
const c = getContent("es");

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    // En producción Vercel captura esto en los logs del servidor; el `digest`
    // permite cruzarlo con el error original.
    console.error(error);
  }, [error]);

  return (
    <main
      id="top"
      className="wrap"
      style={{
        minHeight: "70vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 24,
        paddingBlock: "160px 96px",
      }}
    >
      <p className="mono" style={{ color: "var(--color-muted)" }}>
        {c.error.code}
      </p>
      <h1
        style={{
          fontSize: "clamp(2rem, 5vw, 3.4rem)",
          fontWeight: 500,
          letterSpacing: "-0.03em",
          lineHeight: 1.1,
          margin: 0,
        }}
      >
        {c.error.title}
      </h1>
      <p
        style={{
          maxWidth: "46ch",
          color: "var(--color-ink-soft)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        {c.error.body}
      </p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 24,
          flexWrap: "wrap",
          marginTop: 8,
        }}
      >
        <button type="button" className="pill-btn" onClick={() => retry()}>
          <span className="label">{c.error.retry}</span>
          <span className="circle-arrow" aria-hidden="true">
            <ArrowRight stroke="#15181a" />
          </span>
        </button>
        <Link className="link-underline" href="/">
          {c.error.home}
        </Link>
      </div>
    </main>
  );
}
