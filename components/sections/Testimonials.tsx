import { testimonials, testimonialsSection } from "@/content";
import { PersonIcon } from "../icons";

export function Testimonials() {
  // Estado inicial (primer testimonio). El slider llega en PNX-007.
  const current = testimonials[0];
  const single = testimonials.length <= 1;

  return (
    <section
      className="testimonials"
      id="testimonios"
      data-nav-dark
      aria-labelledby="testi-title"
    >
      <div className="testi-inner">
        <h2 className="sr-only" id="testi-title">
          {testimonialsSection.srTitle}
        </h2>
        <div className="testi-top">
          <div
            className="testi-dots"
            id="testiDots"
            role="tablist"
            aria-label="Seleccionar recomendación"
            hidden={single}
          />
          <a
            className="testi-cta"
            href={testimonialsSection.cta.href}
            target="_blank"
            rel="noopener"
          >
            {testimonialsSection.cta.label}
          </a>
        </div>
        <blockquote className="testi-quote" id="testiQuote">
          {`“${current.quote}”`}
        </blockquote>
        <div className="testi-author">
          <span className="testi-avatar" aria-hidden="true">
            <PersonIcon />
          </span>
          <div>
            <div className="name" id="testiName">
              {current.name}
            </div>
            <div className="role" id="testiRole">
              {current.role}
            </div>
            <div className="source">{testimonialsSection.source}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
