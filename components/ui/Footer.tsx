import { Container } from "./Container";
import { siteConfig } from "@/config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="bg-bg-footer py-16 md:py-20 border-t border-border-dim text-center md:text-left"
    >
      <Container className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">
        <div className="flex flex-col gap-2">
          <p className="text-2xl font-bold text-white">
            {siteConfig.author.name}
          </p>
          <p className="text-text-dim">
            Construyendo sistemas pensados para durar.
          </p>
        </div>

        <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 md:gap-8">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-text-dim hover:text-white transition-colors duration-200 ease-out rounded py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-footer"
          >
            <span className="text-sm font-medium">GitHub</span>
            <svg
              className="w-[18px] h-[18px] transition-colors duration-200 ease-out group-hover:text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>

          <a
            href={siteConfig.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-2 text-text-dim hover:text-white transition-colors duration-200 ease-out rounded py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-footer"
          >
            <span className="text-sm font-medium">LinkedIn</span>
            <svg
              className="w-[18px] h-[18px] transition-colors duration-200 ease-out group-hover:text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 17L17 7M17 7H7M17 7V17"
              />
            </svg>
          </a>

          <a
            href={`mailto:${siteConfig.author.email}`}
            className="group flex items-center gap-2 text-text-dim hover:text-white transition-colors duration-200 ease-out rounded py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-footer"
          >
            <span className="text-sm font-medium">Email</span>
            <svg
              className="w-[18px] h-[18px] transition-colors duration-200 ease-out group-hover:text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </a>
        </div>
      </Container>

      <Container className="mt-12 md:mt-16 pt-6 md:pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-2 md:gap-4 text-xs text-zinc-600">
        <p>© {currentYear} {siteConfig.author.name}. Todos los derechos reservados.</p>
        <p>Diseñado con código.</p>
      </Container>
    </footer>
  );
}
