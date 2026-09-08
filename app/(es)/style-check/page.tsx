import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Style check",
  robots: { index: false, follow: false },
};

// Harness de QA de diseño. Solo disponible en desarrollo: en producción la ruta
// responde 404, así no suma superficie rastreable ni JS de sección al bundle.
const IS_PRODUCTION = process.env.NODE_ENV === "production";

const colors = [
  "cream",
  "hero-bg-1",
  "hero-bg-2",
  "ink",
  "ink-soft",
  "muted",
  "line",
  "green",
  "green-dark",
  "teal",
  "teal-dark",
  "card-gray",
];

const radii = ["sm", "md", "lg"];

/**
 * Página de contraste visual contra references/index.html: paleta, radios,
 * tipografías (next/font), utilidades globales, sistema .reveal, foco visible
 * y keyframes del marquee. No indexable, solo para QA de DBO-1258.
 */
export default function StyleCheck() {
  if (IS_PRODUCTION) notFound();

  return (
    <main
      id="top"
      className="wrap"
      style={{ paddingBlock: "64px", display: "grid", gap: "56px" }}
    >
      <header style={{ display: "grid", gap: "8px" }}>
        <p className="mono" style={{ color: "var(--color-muted)" }}>
          DBO-1258 · Style check
        </p>
        <h1
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 400,
            letterSpacing: "-0.025em",
          }}
        >
          Design tokens, tipografías y reglas de movimiento
        </h1>
      </header>

      <section style={{ display: "grid", gap: "16px" }}>
        <h2 className="mono" style={{ fontSize: "0.8rem" }}>
          Paleta
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))",
            gap: "12px",
          }}
        >
          {colors.map((name) => (
            <div
              key={name}
              style={{
                border: "1px solid var(--color-line)",
                borderRadius: "var(--radius-sm)",
                overflow: "hidden",
              }}
            >
              <div
                style={{ height: "64px", background: `var(--color-${name})` }}
              />
              <p
                className="mono"
                style={{ fontSize: "0.62rem", padding: "8px 10px" }}
              >
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ display: "grid", gap: "16px" }}>
        <h2 className="mono" style={{ fontSize: "0.8rem" }}>
          Radios
        </h2>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          {radii.map((size) => (
            <div
              key={size}
              style={{
                width: "120px",
                height: "80px",
                background: "var(--color-card-gray)",
                borderRadius: `var(--radius-${size})`,
                display: "grid",
                placeItems: "center",
              }}
            >
              <span className="mono" style={{ fontSize: "0.65rem" }}>
                {size}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section id="tipografia" style={{ display: "grid", gap: "16px" }}>
        <h2 className="mono" style={{ fontSize: "0.8rem" }}>
          Tipografías
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.4rem" }}>
          Plus Jakarta Sans —{" "}
          <strong style={{ fontWeight: 800 }}>peso 800</strong>,{" "}
          <span style={{ fontWeight: 500 }}>500</span>, 400. Cuerpo y UI del
          sitio.
        </p>
        <p
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "2rem",
          }}
        >
          Playfair Display — itálica 400, acento editorial.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "1rem" }}>
          JetBrains Mono — 400 / 500 / 600, etiquetas y kickers.
        </p>
      </section>

      <section style={{ display: "grid", gap: "16px" }}>
        <h2 className="mono" style={{ fontSize: "0.8rem" }}>
          Botones y foco visible
        </h2>
        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <button
            type="button"
            className="mono"
            style={{
              background: "var(--color-ink)",
              color: "#fff",
              padding: "16px 24px",
              borderRadius: "999px",
              fontSize: "0.74rem",
            }}
          >
            Hablemos
          </button>
          <a
            href="#tipografia"
            className="mono"
            style={{
              color: "var(--color-ink-soft)",
              borderBottom: "1px solid var(--color-line)",
              paddingBottom: "4px",
              fontSize: "0.74rem",
            }}
          >
            Enlace subrayado
          </a>
          <span
            className="nav-over-dark"
            style={{
              background: "var(--color-teal-dark)",
              padding: "12px",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <button
              type="button"
              className="mono"
              style={{
                background: "#fff",
                color: "var(--color-ink)",
                padding: "12px 20px",
                borderRadius: "12px",
                fontSize: "0.72rem",
              }}
            >
              Foco sobre oscuro
            </button>
          </span>
        </div>
        <p style={{ color: "var(--color-muted)", fontSize: "0.9rem" }}>
          Navega con Tab para ver el contorno oscuro + halo verde.
        </p>
      </section>

      <section style={{ display: "grid", gap: "16px" }}>
        <h2 className="mono" style={{ fontSize: "0.8rem" }}>
          Sistema .reveal (estado final)
        </h2>
        <p className="reveal in" style={{ maxWidth: "60ch", lineHeight: 1.6 }}>
          Este párrafo usa <code>.reveal.in</code>: opacidad 1 y sin
          desplazamiento. <code>.reveal</code> parte visible; solo se oculta
          cuando <code>html.reveal-armed</code> está presente y aún no tiene{" "}
          <code>.in</code>.
        </p>
      </section>

      <section style={{ display: "grid", gap: "16px" }}>
        <h2 className="mono" style={{ fontSize: "0.8rem" }}>
          Marquee (keyframes scroll-left / scroll-right)
        </h2>
        <div
          style={{
            overflow: "hidden",
            borderBlock: "1px solid var(--color-line)",
            padding: "20px 0",
          }}
        >
          <div
            className="marquee-track"
            style={{
              display: "flex",
              gap: "2.2rem",
              whiteSpace: "nowrap",
              animation: "scroll-left 20s linear infinite",
              width: "max-content",
            }}
          >
            {Array.from({ length: 2 }).map((_, group) => (
              <span key={group} style={{ display: "flex", gap: "2.2rem" }}>
                {[
                  "REACT",
                  "NEXT.JS",
                  "TYPESCRIPT",
                  "TAILWIND",
                  "NODE.JS",
                  "POSTGRESQL",
                ].map((word) => (
                  <span
                    key={word}
                    style={{ fontSize: "2rem", fontWeight: 600 }}
                  >
                    {word}
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
