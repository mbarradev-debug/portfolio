"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type NavItem = {
  href: string;
  label: string;
  target?: string;
  rel?: string;
};

const MOBILE_LINKS: NavItem[] = [
  { href: "#top", label: "Inicio" },
  { href: "#proyectos", label: "Proyectos" },
  {
    href: "https://github.com/mbarradev-debug",
    label: "GitHub",
    target: "_blank",
    rel: "noopener",
  },
  {
    href: "https://www.linkedin.com/in/miguelbarrarios",
    label: "LinkedIn",
    target: "_blank",
    rel: "noopener",
  },
  { href: "mailto:mbarra.git@gmail.com", label: "Contacto" },
];

const barClasses =
  "h-0.5 w-4 rounded-sm bg-current [transition:transform_0.25s_ease,opacity_0.2s_ease]";

// Ported from /legacy-reference/css/style.css (.menu-toggle, .bar,
// .mobile-menu) and js/app.js (setMenuOpen). The toggle button lives
// inside .nav-right (next to ThemeToggle) while the sliding panel is a
// sibling of .navbar-inner — two DOM positions sharing one open/closed
// state. Context keeps that state out of Navbar (a Server Component)
// while Navbar's server-rendered children (logo, desktop links) pass
// through MobileNavProvider untouched.
type MobileNavState = {
  open: boolean;
  toggle: () => void;
  close: () => void;
};

const MobileNavContext = createContext<MobileNavState | null>(null);

function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) {
    throw new Error("useMobileNav must be used within MobileNavProvider");
  }
  return ctx;
}

export function MobileNavProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <MobileNavContext.Provider
      value={{
        open,
        toggle: () => setOpen((prev) => !prev),
        close: () => setOpen(false),
      }}
    >
      {children}
    </MobileNavContext.Provider>
  );
}

export function MobileNavButton() {
  const { open, toggle } = useMobileNav();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      aria-expanded={open}
      className="border-border-soft flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-md border md:hidden"
    >
      <span
        className={`${barClasses} ${open ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span className={`${barClasses} ${open ? "opacity-0" : ""}`} />
      <span
        className={`${barClasses} ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </button>
  );
}

export function MobileNavPanel() {
  const { open, close } = useMobileNav();

  return (
    <div
      data-testid="mobile-nav-panel"
      className={`border-border-soft flex flex-col overflow-hidden px-4 [transition:max-height_0.3s_ease,opacity_0.25s_ease] md:hidden ${
        open
          ? "max-h-[320px] pt-2 pb-4 opacity-100"
          : "pointer-events-none max-h-0 opacity-0"
      }`}
    >
      {MOBILE_LINKS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.target}
          rel={link.rel}
          onClick={close}
          className="border-border-soft border-b px-1 py-2.5"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}
