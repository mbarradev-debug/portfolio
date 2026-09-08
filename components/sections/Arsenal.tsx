"use client";

import { Fragment, useState } from "react";
import type { SiteContent } from "@/content";
import { PauseIcon, PlayIcon } from "../icons";

function Track({ words, reverse }: { words: string[]; reverse?: boolean }) {
  // Contenido duplicado para que el bucle del marquee sea continuo.
  const doubled = [...words, ...words];
  return (
    <div className={reverse ? "marquee-track reverse" : "marquee-track"}>
      {doubled.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span className="word">{word}</span>
          <span className="dot" />
        </Fragment>
      ))}
    </div>
  );
}

export function Arsenal({ c }: { c: SiteContent }) {
  const { arsenal, techRow1, techRow2 } = c;
  const all = [...techRow1, ...techRow2];

  // Pausa del marquee operable por teclado. El `:hover` de CSS y
  // `prefers-reduced-motion` siguen pausando/ocultando la animación; este botón
  // añade el control explícito que pide WCAG 2.2.2. Bajo movimiento reducido el
  // botón y las filas se ocultan por CSS y se muestra `.tech-list`.
  const [paused, setPaused] = useState(false);
  const rowClass = paused ? "marquee-row is-paused" : "marquee-row";

  return (
    <section className="arsenal" aria-labelledby="arsenal-title">
      <div className="wrap arsenal-head">
        <p className="badge" id="arsenal-title">
          <span className="dot" aria-hidden="true" />
          {arsenal.badge}
        </p>
        <button
          type="button"
          className="marquee-toggle"
          aria-pressed={paused}
          aria-label={paused ? arsenal.resumeLabel : arsenal.pauseLabel}
          onClick={() => setPaused((p) => !p)}
        >
          {paused ? <PlayIcon /> : <PauseIcon />}
        </button>
      </div>

      {/* Lista para AT (siempre) y para movimiento reducido (visible por CSS). */}
      <ul className="tech-list" id="techList">
        {all.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

      <div className={rowClass} aria-hidden="true">
        <Track words={techRow1} />
      </div>
      <div className={rowClass} aria-hidden="true">
        <Track words={techRow2} reverse />
      </div>
    </section>
  );
}
