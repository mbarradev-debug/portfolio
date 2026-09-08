import { footer } from "@/content";
import { BackToTop } from "../BackToTop";
import { ArrowUp, ArrowUpRight } from "../icons";
import { LangToggle } from "../LangToggle";

export function FooterCta() {
  return (
    <footer
      className="footer-cta"
      id="contacto"
      data-nav-dark
      aria-labelledby="footer-title"
    >
      <div className="footer-top">
        <div>
          <p className="footer-heading reveal" id="footer-title">
            {footer.heading}
          </p>
          <div className="footer-actions">
            <a className="btn-dark btn-dark--light" href={footer.cta.href}>
              {footer.cta.label}
            </a>
            <span className="circle-arrow" aria-hidden="true">
              <ArrowUpRight stroke="#15181a" />
            </span>
            <LangToggle variant="footer" />
          </div>
        </div>

        <nav className="footer-col" aria-label="Navegación del pie de página">
          <h4>{footer.navHeading}</h4>
          <ul>
            {footer.nav.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <h4>{footer.connectHeading}</h4>
          <BackToTop>
            <ArrowUp />
          </BackToTop>
          <ul className="footer-connect-list">
            {footer.connect.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener me" }
                      : {})}
                  >
                    {link.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">{footer.copyright}</div>
    </footer>
  );
}
