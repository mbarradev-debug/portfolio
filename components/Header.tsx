"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, navContact, site } from "@/content";
import { LangToggle } from "./LangToggle";

const MENU_LINKS = [...nav, navContact];

export function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const menuRef = useRef<HTMLElement | null>(null);
  const burgerRef = useRef<HTMLButtonElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const openMenu = useCallback(() => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
    lastFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;

    document.body.style.overflow = "hidden";
    closeBtnRef.current?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        return;
      }
      if (e.key !== "Tab" || !menuRef.current) return;
      const focusables =
        menuRef.current.querySelectorAll<HTMLElement>("a, button");
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  // Header adaptativo: sombra al hacer scroll + cristal oscuro sobre secciones
  // [data-nav-dark]. Portado de references/index.html.
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const darkSections = [
      ...document.querySelectorAll<HTMLElement>("[data-nav-dark]"),
    ];
    let ticking = false;

    const update = () => {
      ticking = false;
      header.classList.toggle("nav-scrolled", window.scrollY > 12);
      const probe = header.getBoundingClientRect().bottom - 6;
      let overDark = false;
      for (const section of darkSections) {
        const r = section.getBoundingClientRect();
        if (r.top <= probe && r.bottom >= probe) {
          overDark = true;
          break;
        }
      }
      header.classList.toggle("nav-over-dark", overDark);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <>
      <header ref={headerRef}>
        <div className="nav-inner">
          <a className="logo" href="#top">
            {site.logo}
          </a>
          <nav className="nav-links" aria-label="Navegación principal">
            {nav.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </nav>
          <div className="nav-right">
            <a className="btn-contact" href={navContact.href}>
              {navContact.label}
            </a>
            <LangToggle variant="header" />
            <button
              ref={burgerRef}
              className="burger"
              type="button"
              aria-label="Abrir menú"
              aria-expanded={open}
              aria-controls="mobileMenu"
              onClick={openMenu}
            >
              <svg
                viewBox="0 0 18 12"
                fill="none"
                stroke="#fff"
                strokeWidth={1.6}
                aria-hidden="true"
                focusable="false"
              >
                <path d="M1 1h16M1 11h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <nav
        ref={menuRef}
        className={open ? "mobile-menu open" : "mobile-menu"}
        id="mobileMenu"
        aria-label="Navegación móvil"
        aria-hidden={!open}
      >
        <button
          ref={closeBtnRef}
          className="close-btn"
          type="button"
          aria-label="Cerrar menú"
          onClick={closeMenu}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
        {MENU_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
      </nav>
    </>
  );
}
