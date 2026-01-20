"use client";

import { useState, useEffect } from "react";
import { Container } from "./Container";
import { siteConfig } from "@/config";

const navLinks = [
  { href: "#philosophy", label: "Filosofía" },
  { href: "#experience", label: "Experiencia" },
  { href: "#work", label: "Proyectos" },
  { href: "#contact", label: "Contacto" },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-bg-base">
      <Container className="h-16 flex items-center justify-between">
        {/* Logo / Home link */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight text-text-primary hover:text-primary transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base rounded"
        >
          {siteConfig.author.name}
        </a>

        {/* Desktop Navigation */}
        <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:text-text-primary py-1"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden text-text-primary p-2 -mr-2 rounded transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-base"
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={isMenuOpen}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </Container>

      {/* Mobile Navigation Overlay */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-overlay backdrop-blur-sm transition-opacity duration-200 ease-out ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Navigation Menu */}
      <nav
        aria-label="Navegación principal"
        className={`md:hidden absolute top-full left-0 w-full bg-bg-base transition-all duration-200 ease-out ${
          isMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <Container className="py-4 flex flex-col gap-1">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-sm font-medium text-text-secondary hover:text-text-primary hover:bg-surface-hover transition-all duration-200 ease-out py-3 px-2 -mx-2 rounded focus-visible:outline-none focus-visible:text-text-primary focus-visible:bg-surface-hover"
              style={{
                transitionDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
              }}
            >
              {link.label}
            </a>
          ))}
        </Container>
      </nav>
    </header>
  );
}
