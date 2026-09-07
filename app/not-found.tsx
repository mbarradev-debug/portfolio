import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { nav, navContact } from "@/content";

// Los anclas de contenido apuntan a `/#seccion` para funcionar desde cualquier
// URL rota, no solo desde el home.
const sections = [...nav, navContact];

export default function NotFound() {
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
        Error 404
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
        Esta página no existe.
      </h1>
      <p
        style={{
          maxWidth: "46ch",
          color: "var(--color-ink-soft)",
          lineHeight: 1.6,
          margin: 0,
        }}
      >
        El enlace está roto o la página se movió. Desde el inicio llegas a todo.
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
        <Link className="pill-btn" href="/">
          <span className="label">Volver al inicio</span>
          <span className="circle-arrow" aria-hidden="true">
            <ArrowRight stroke="#15181a" />
          </span>
        </Link>
        <nav
          aria-label="Secciones del sitio"
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          {sections.map((link) => (
            <Link
              key={link.href}
              className="link-underline"
              href={`/${link.href}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
