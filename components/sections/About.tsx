import Image from "next/image";
import { about } from "@/content";

export function About() {
  return (
    <section className="about" id="about" aria-labelledby="about-title">
      <div className="about-card reveal">
        <div>
          <span className="badge">
            <span className="dot" aria-hidden="true" />
            {about.badge}
          </span>
          <div className="about-photo">
            <div className="frame">
              <Image
                src="/avatar-900.jpg"
                width={900}
                height={900}
                loading="lazy"
                // El marco mide ~320px en desktop y ~240px en móvil (< 980px).
                sizes="(max-width: 980px) 240px, 320px"
                alt="Retrato de Miguel Barra, Full Stack Developer"
              />
            </div>
          </div>
        </div>
        <div>
          <h2 className="about-heading" id="about-title">
            {about.headingLead}{" "}
            <span className="fade">{about.headingFade}</span>
          </h2>
          <div className="about-text">
            <p>{about.body}</p>
          </div>
          <div className="about-actions">
            <a className="btn-dark" href={about.actions.primary.href}>
              {about.actions.primary.label}
            </a>
            <a
              className="link-underline"
              href={about.actions.cv.href}
              target="_blank"
              rel="noopener"
            >
              {about.actions.cv.label}
            </a>
            <a
              className="link-underline"
              href={about.actions.recommendations.href}
            >
              {about.actions.recommendations.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
