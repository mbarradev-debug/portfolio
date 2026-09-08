import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { getContent } from "@/content";
import { jetbrainsMono, playfairDisplay, plusJakartaSans } from "./fonts";
import "./globals.css";

// 404 global (x-default, español). Con varios layouts raíz, una URL que no cae
// en ningún grupo de idioma renderiza este archivo SIN layout, así que aquí se
// monta el documento completo. Los anclas apuntan a `/#seccion`.
const fontVars = `${plusJakartaSans.variable} ${playfairDisplay.variable} ${jetbrainsMono.variable}`;

export default function NotFound() {
  const c = getContent("es");
  const sections = [...c.nav, c.navContact];

  return (
    <html lang="es" className={fontVars}>
      <body>
        <main
          id="top"
          className="wrap"
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 24,
            paddingBlock: "160px 96px",
          }}
        >
          <p className="mono" style={{ color: "var(--color-muted)" }}>
            {c.notFound.code}
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
            {c.notFound.title}
          </h1>
          <p
            style={{
              maxWidth: "46ch",
              color: "var(--color-ink-soft)",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            {c.notFound.body}
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
              <span className="label">{c.notFound.home}</span>
              <span className="circle-arrow" aria-hidden="true">
                <ArrowRight stroke="#15181a" />
              </span>
            </Link>
            <nav
              aria-label={c.notFound.sectionsNav}
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
      </body>
    </html>
  );
}
