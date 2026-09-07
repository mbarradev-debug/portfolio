import { Fragment } from "react";
import { arsenalSection, techRow1, techRow2 } from "@/content";

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

export function Arsenal() {
  return (
    <section className="arsenal" aria-labelledby="arsenal-title">
      <div className="wrap">
        <h2 className="badge" id="arsenal-title">
          <span className="dot" aria-hidden="true" />
          {arsenalSection.badge}
        </h2>
      </div>
      <ul className="sr-only" id="techList">
        {[...techRow1, ...techRow2].map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>
      <div className="marquee-row" aria-hidden="true">
        <Track words={techRow1} />
      </div>
      <div className="marquee-row" aria-hidden="true">
        <Track words={techRow2} reverse />
      </div>
    </section>
  );
}
