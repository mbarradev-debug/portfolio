import { cases, casesSection } from "@/content";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "../icons";

export function CaseStudies() {
  const current = cases[0];
  const total = String(cases.length).padStart(2, "0");
  const single = cases.length <= 1;

  const hasUrl = Boolean(current.url);
  const linkHref = current.url ?? casesSection.defaultHref;
  const linkLabel = hasUrl
    ? casesSection.linkLabelWithUrl
    : casesSection.linkLabelDefault;

  return (
    <section className="cases" id="casos" aria-labelledby="cases-title">
      <div className="cases-inner">
        <div className="cases-top">
          <div>
            <h2 id="cases-title">{casesSection.title}</h2>
            <p className="cases-sub">{casesSection.sub}</p>
          </div>
          <div className="cases-nav">
            <span className="cases-counter">
              <span id="caseCounter">01</span> /{" "}
              <span id="caseTotal">{total}</span>
            </span>
            <div
              className="cases-arrows"
              style={single ? { display: "none" } : undefined}
            >
              <button
                className="arrow-circle"
                id="casePrev"
                type="button"
                aria-label="Caso anterior"
              >
                <ArrowLeft />
              </button>
              <button
                className="arrow-circle"
                id="caseNext"
                type="button"
                aria-label="Caso siguiente"
              >
                <ArrowRight />
              </button>
            </div>
          </div>
        </div>

        <div className="case-card reveal" id="caseCard" aria-live="polite">
          <div
            className="case-media"
            style={current.grad ? { background: current.grad } : undefined}
          >
            <div className="browser-mock">
              <div className="browser-bar" aria-hidden="true">
                <span />
                <span />
                <span />
              </div>
              <div
                className={
                  current.image ? "browser-body has-image" : "browser-body"
                }
                id="caseMockBody"
              >
                {current.image ? (
                  // Imagen intercambiable por el carrusel (PNX-007); <img> plano
                  // como en la referencia, no next/image.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={current.image}
                    alt={current.imageAlt ?? ""}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <>
                    <div className="tag">{current.mockTag ?? ""}</div>
                    <div className="headline">{current.mockHeadline ?? ""}</div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className="case-info">
            <div className="case-meta">
              <span className="case-tag">
                <span className="dot" />
                <span id="caseTag">{current.tag}</span>
              </span>
              <span className="case-date" id="caseDate">
                {current.date}
              </span>
            </div>
            <div>
              <h3 id="caseTitle">{current.title}</h3>
              <p id="caseDesc">{current.desc}</p>
            </div>
            <a
              className="case-link"
              id="caseLink"
              href={linkHref}
              {...(hasUrl ? { target: "_blank", rel: "noopener" } : {})}
            >
              <span className="label mono" id="caseLinkLabel">
                {linkLabel}
              </span>
              <span className="circle-arrow">
                <ArrowUpRight stroke="#15181a" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
