import ReactDOM from "react-dom";
import type { SiteContent } from "@/content";
import { ArrowRight } from "../icons";
import { HeroVideo } from "./HeroVideo";

export function Hero({ c }: { c: SiteContent }) {
  const { hero } = c;

  // El poster del hero es candidato a LCP: se precarga con prioridad alta para
  // que el navegador lo descubra en el parse del HTML, no al llegar al <video>.
  ReactDOM.preload("/hero-poster.jpg", { as: "image", fetchPriority: "high" });

  return (
    <section className="hero" data-nav-dark aria-labelledby="hero-title">
      <div className="hero-bg" aria-hidden="true">
        <HeroVideo />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <h1 className="reveal" id="hero-title">
          <span className="hero-eyebrow">{hero.eyebrow}</span>
          <span className="hero-headline">{hero.title}</span>
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
