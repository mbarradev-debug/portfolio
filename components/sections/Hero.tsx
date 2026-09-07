import { hero } from "@/content";
import { ArrowRight } from "../icons";

export function Hero() {
  return (
    <section className="hero" data-nav-dark aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        {/* PNX-007 activa la carga del vídeo: aquí sólo poster + data-src. */}
        <video
          id="heroVideo"
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          poster="/hero-poster.jpg"
          data-src="/hero.mp4"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="reveal" id="hero-title">
          {hero.title}
        </h1>
        <div className="hero-bottom">
          <p className="reveal" style={{ transitionDelay: ".05s" }}>
            {hero.intro}
          </p>
          <div
            className="hero-cta-row reveal"
            style={{ transitionDelay: ".1s" }}
          >
            <a className="pill-btn" href={hero.cta.href}>
              <span className="label">{hero.cta.label}</span>
              <span className="circle-arrow" aria-hidden="true">
                <ArrowRight stroke="#15181a" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
