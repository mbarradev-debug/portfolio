import type { ReactNode } from "react";
import type { SiteContent } from "@/content";

// Icono y color por posición (presentación, no dato de contenido).
const FrontendIcon = (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#222f30"
    strokeWidth={1.4}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M24 4v10M24 34v10M4 24h10M34 24h10M9.5 9.5l7 7M31.5 31.5l7 7M38.5 9.5l-7 7M16.5 31.5l-7 7" />
  </svg>
);

const BackendIcon = (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#fff"
    strokeWidth={1.4}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M24 4l18 10v20L24 44 6 34V14L24 4z" />
    <path d="M24 4v40M6 14l18 10 18-10M6 34l18-10 18 10" />
  </svg>
);

const CloudIcon = (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    stroke="#222f30"
    strokeWidth={1.4}
    aria-hidden="true"
    focusable="false"
  >
    <path d="M6 16l18-10 18 10-18 10-18-10z" />
    <path d="M6 24l18 10 18-10M6 32l18 10 18-10" />
  </svg>
);

const presentation: { variant: string; icon: ReactNode }[] = [
  { variant: "green", icon: FrontendIcon },
  { variant: "dark", icon: BackendIcon },
  { variant: "gray", icon: CloudIcon },
];

export function Services({ c }: { c: SiteContent }) {
  const { services } = c;

  return (
    <section
      className="services"
      id="servicios"
      aria-labelledby="services-title"
    >
      <h2 className="sr-only" id="services-title">
        {services.srTitle}
      </h2>
      {services.cards.map((card, i) => (
        <div
          key={card.index}
          className={`service-card ${presentation[i].variant} reveal`}
        >
          <div className="service-top">
            <span className="service-icon">{presentation[i].icon}</span>
            <span className="service-index mono">{card.index}</span>
          </div>
          <div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </div>
        </div>
      ))}
    </section>
  );
}
