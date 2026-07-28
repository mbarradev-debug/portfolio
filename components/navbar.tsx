import { IconLink } from "@/components/icon-link";
import {
  MobileNavButton,
  MobileNavPanel,
  MobileNavProvider,
} from "@/components/mobile-nav";
import { ThemeToggle } from "@/components/theme-toggle";

const GithubIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.22.66.8.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);

const LinkedinIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

// Ported from /legacy-reference/index.html + css/style.css (.navbar,
// .navbar-inner, .logo, .nav-links) and js/app.js. The mobile hamburger
// button + sliding panel are Client Components (mobile-nav.tsx); this
// shell — logo, desktop nav-links (via IconLink), layout — stays a Server
// Component.
export function Navbar() {
  return (
    <nav className="bg-nav-bg fixed top-0 left-0 z-20 w-full backdrop-blur-[10px]">
      <MobileNavProvider>
        <div className="mx-auto flex max-w-[768px] flex-wrap items-center justify-between px-4 py-2">
          <a
            href="#top"
            className="group text-text inline-flex h-[30px] items-center gap-2.5 p-[10px]"
          >
            <span
              aria-hidden="true"
              className="text-brand-teal-500 inline-flex transition-transform duration-200 group-hover:rotate-[20deg]"
            >
              <svg width="22" height="22" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="12" fill="currentColor" />
                <text
                  x="12"
                  y="16.5"
                  textAnchor="middle"
                  className="font-heading font-bold"
                  fontSize="12"
                  fill="#fff"
                >
                  M
                </text>
              </svg>
            </span>
            <span className="font-heading text-logo font-bold">
              Miguel Barra
            </span>
          </a>

          <div className="hidden grow items-center gap-1 md:ml-5 md:flex">
            <IconLink href="#proyectos">Proyectos</IconLink>
            <IconLink
              href="https://github.com/mbarradev-debug"
              icon={GithubIcon}
              target="_blank"
              rel="noopener"
            >
              GitHub
            </IconLink>
            <IconLink
              href="https://www.linkedin.com/in/miguelbarrarios"
              icon={LinkedinIcon}
              target="_blank"
              rel="noopener"
            >
              LinkedIn
            </IconLink>
            <IconLink href="mailto:mbarra.git@gmail.com">Contacto</IconLink>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <MobileNavButton />
          </div>
        </div>

        <MobileNavPanel />
      </MobileNavProvider>
    </nav>
  );
}
