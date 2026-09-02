import type { Metadata } from "next";
import type { CSSProperties } from "react";

import { initLocale } from "@/i18n/locale";

export const metadata: Metadata = {
  title: "Design system",
  robots: { index: false },
};

/**
 * Living reference for the design tokens. Every value on this page is read from
 * a CSS variable — there are no hardcoded colours, sizes or durations here.
 * Canonical documentation: CLAUDE.md → "Sistema de design tokens".
 */

const PRIMITIVE_COLORS = [
  "--cream",
  "--hero-bg-1",
  "--hero-bg-2",
  "--ink",
  "--ink-soft",
  "--muted",
  "--line",
  "--green",
  "--green-dark",
  "--teal",
  "--teal-dark",
  "--card-gray",
  "--white",
];

const SEMANTIC_COLORS = [
  "--color-bg",
  "--color-surface",
  "--color-surface-sunken",
  "--color-surface-inverse",
  "--color-surface-inverse-soft",
  "--color-text",
  "--color-text-soft",
  "--color-text-muted",
  "--color-text-inverse",
  "--color-text-on-accent",
  "--color-border",
  "--color-accent",
  "--color-accent-strong",
  "--color-hero-from",
  "--color-hero-to",
];

const TYPE_SCALE = [
  "--text-2xs",
  "--text-xs",
  "--text-sm",
  "--text-base",
  "--text-md",
  "--text-lg",
  "--text-xl",
  "--text-2xl",
  "--text-3xl",
  "--text-display",
];

const SPACE_SCALE = [
  "--space-px",
  "--space-3xs",
  "--space-2xs",
  "--space-xs",
  "--space-sm",
  "--space-md",
  "--space-lg",
  "--space-xl",
  "--space-2xl",
  "--space-3xl",
  "--space-4xl",
];

const RADII = ["--radius-chip", "--radius-control", "--radius-card", "--radius-pill"];

const SHADOWS = ["--shadow-hairline", "--shadow-sm", "--shadow-md", "--shadow-lg"];

const DURATIONS = ["--duration-press", "--duration-transition", "--duration-reveal"];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-border flex flex-col gap-6 border-t pt-8">
      <h2 className="text-text-muted font-mono text-xs tracking-wider uppercase">{title}</h2>
      {children}
    </section>
  );
}

function Swatch({ token }: { token: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className="rounded-chip border-border h-16 w-full border"
        style={{ background: `var(${token})` }}
      />
      <code className="text-2xs text-text-soft font-mono">{token}</code>
    </div>
  );
}

export default async function DesignSystemPage({ params }: PageProps<"/[locale]/design-system">) {
  const { locale } = await params;
  initLocale(locale);

  return (
    <main className="max-w-page mx-auto flex w-full flex-col gap-16 px-6 py-16">
      <header className="flex flex-col gap-3">
        <p className="text-text-muted font-mono text-xs tracking-wider uppercase">
          Portfolio · PMB-005
        </p>
        <h1 className="font-serif text-3xl leading-tight tracking-tight">Design system</h1>
        <p className="text-md text-text-soft max-w-prose">
          Referencia viva de los design tokens. Ningún valor de esta página está escrito a mano:
          todo se lee de una variable CSS definida en{" "}
          <code className="font-mono">app/styles/tokens.css</code>.
        </p>
      </header>

      <Section title="Tipografías">
        <div className="flex flex-col gap-6">
          <p className="font-sans text-xl">
            Sans · Plus Jakarta Sans — cuerpo, UI y titulares
            <span className="text-text-muted block text-sm">
              The quick brown fox jumps over the lazy dog · 0123456789
            </span>
          </p>
          <p className="font-serif text-xl italic">
            Serif · Playfair Display italic — acentos decorativos
            <span className="text-text-muted block text-sm not-italic">
              The quick brown fox jumps over the lazy dog
            </span>
          </p>
          <p className="font-mono text-xl">
            Mono · JetBrains Mono — código y etiquetas
            <span className="text-text-muted block text-sm">
              const quick = &quot;brown fox&quot; · 0123456789
            </span>
          </p>
        </div>
      </Section>

      <Section title="Escala tipográfica">
        <div className="flex flex-col gap-4">
          {TYPE_SCALE.map((token) => (
            <div key={token} className="flex items-baseline gap-6">
              <code className="text-2xs text-text-muted w-28 shrink-0 font-mono">{token}</code>
              <span
                className="leading-tight tracking-tight"
                style={{ fontSize: `var(${token})` } as CSSProperties}
              >
                Grafismo
              </span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Color · primitivos">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {PRIMITIVE_COLORS.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </div>
      </Section>

      <Section title="Color · semánticos (usar estos en componentes)">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {SEMANTIC_COLORS.map((token) => (
            <Swatch key={token} token={token} />
          ))}
        </div>
      </Section>

      <Section title="Espaciado">
        <div className="flex flex-col gap-2">
          {SPACE_SCALE.map((token) => (
            <div key={token} className="flex items-center gap-6">
              <code className="text-2xs text-text-muted w-24 shrink-0 font-mono">{token}</code>
              <span className="bg-accent h-4" style={{ width: `var(${token})` } as CSSProperties} />
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radios">
        <div className="flex flex-wrap gap-6">
          {RADII.map((token) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div
                className="border-border bg-surface-sunken size-20 border"
                style={{ borderRadius: `var(${token})` } as CSSProperties}
              />
              <code className="text-2xs text-text-soft font-mono">{token}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sombras">
        <div className="bg-bg flex flex-wrap gap-12 p-6">
          {SHADOWS.map((token) => (
            <div key={token} className="flex flex-col items-center gap-2">
              <div
                className="rounded-card bg-surface size-20"
                style={{ boxShadow: `var(${token})` } as CSSProperties}
              />
              <code className="text-2xs text-text-soft font-mono">{token}</code>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Motion">
        <ul className="flex flex-col gap-2">
          <li className="text-text-soft font-mono text-xs">
            --ease-standard ·{" "}
            <span style={{ font: "inherit" }}>cubic-bezier(0.22, 1, 0.36, 1)</span>
          </li>
          {DURATIONS.map((token) => (
            <li key={token} className="text-text-soft font-mono text-xs">
              {token}
            </li>
          ))}
        </ul>
      </Section>
    </main>
  );
}
