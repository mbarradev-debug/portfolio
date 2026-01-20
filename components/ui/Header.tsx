"use client";

import { useState } from "react";
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

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border-dim glass">
      <Container className="h-16 flex items-center justify-between">
        {/* Logo / Home link */}
        <a
          href="#"
          className="font-display font-bold text-xl tracking-tight text-white hover:text-primary transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark rounded"
        >
          {siteConfig.author.name}
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="group relative text-sm font-medium text-text-dim hover:text-white transition-colors duration-200 ease-out focus-visible:outline-none focus-visible:text-white py-1"
            >
              {link.label}
              <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-primary transition-all duration-200 ease-out group-hover:w-full group-focus-visible:w-full" />
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden text-white p-2 -mr-2 rounded transition-colors duration-200 ease-out hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg-dark"
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

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <nav className="md:hidden border-t border-border-dim glass">
          <Container className="py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-sm font-medium text-text-dim hover:text-white hover:bg-white/5 transition-colors duration-200 ease-out py-3 px-2 -mx-2 rounded focus-visible:outline-none focus-visible:text-white focus-visible:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </Container>
        </nav>
      )}
    </header>
  );
}
