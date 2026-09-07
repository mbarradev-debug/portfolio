"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { nav, navContact, site } from "@/content";
import { LangToggle } from "./LangToggle";

const MENU_LINKS = [...nav, navContact];

export function Header() {
  const [open, setOpen] = useState(false);
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

  return (
    <>
      <header>
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
