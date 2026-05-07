'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { useScrolled } from '@/hooks/use-scrolled'
import { useActiveSection } from '@/hooks/use-active-section'
import { useTheme } from '@/hooks/use-theme'

const NAV_LINKS = [
  { label: 'Sobre mí', href: '#about' },
  { label: 'Experiencia', href: '#experience' },
  { label: 'Proyectos', href: '#projects' },
  { label: 'Contacto', href: '#contact' },
] as const

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

export function Navbar() {
  const scrolled = useScrolled()
  const active = useActiveSection(SECTION_IDS)
  const { toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  function closeMobile() {
    setMobileOpen(false)
  }

  return (
    <>
      <nav
        className="fixed inset-x-0 top-0 z-50 h-16"
        style={{
          backgroundColor: scrolled
            ? 'color-mix(in oklch, var(--bg-base) 85%, transparent)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
          transition:
            'background-color 300ms ease, border-color 300ms ease, backdrop-filter 300ms ease',
        }}
      >
        <div className="mx-auto flex h-full max-w-[1100px] items-center justify-between px-4 md:px-6 xl:px-8">
          {/* Logo */}
          <a
            href="#"
            onClick={closeMobile}
            className="font-display text-lg font-bold tracking-tight text-primary transition-colors duration-150 hover:text-accent"
          >
            MB
          </a>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            <ul className="flex items-center gap-6" role="list">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.slice(1)
                const isActive = active === id
                return (
                  <li key={href}>
                    <a
                      href={href}
                      className={cn(
                        'relative py-1 font-body text-sm transition-colors duration-200',
                        'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:rounded-full',
                        'after:bg-accent after:origin-left after:transition-transform after:duration-200',
                        isActive
                          ? 'font-medium text-primary after:scale-x-100'
                          : 'text-secondary hover:text-primary after:scale-x-0 hover:after:scale-x-100'
                      )}
                    >
                      {label}
                    </a>
                  </li>
                )
              })}
            </ul>
            <ThemeToggle onToggle={toggleTheme} />
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle onToggle={toggleTheme} />
            <button
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((o) => !o)}
              className="rounded-md p-2 text-secondary transition-colors duration-150 hover:bg-elevated hover:text-primary"
            >
              {mobileOpen ? <CloseIcon /> : <HamburgerIcon />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        aria-hidden="true"
        onClick={closeMobile}
        className={cn(
          'fixed inset-0 z-40 bg-black/40 md:hidden',
          'transition-opacity duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      />

      {/* Mobile drawer */}
      <aside
        aria-label="Navegación móvil"
        className={cn(
          'fixed inset-y-0 right-0 z-50 w-64 md:hidden',
          'flex flex-col px-6 pb-8 pt-20',
          'transition-transform duration-300 [transition-timing-function:var(--ease-out-expo)]',
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        )}
        style={{ backgroundColor: 'var(--bg-surface)', borderLeft: '1px solid var(--line)' }}
      >
        <ul className="flex flex-col gap-1" role="list">
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1)
            const isActive = active === id
            return (
              <li key={href}>
                <a
                  href={href}
                  onClick={closeMobile}
                  className={cn(
                    'block rounded-md px-3 py-2.5 font-body text-base transition-colors duration-150',
                    isActive
                      ? 'font-medium text-primary bg-elevated'
                      : 'text-secondary hover:text-primary hover:bg-elevated'
                  )}
                >
                  {label}
                </a>
              </li>
            )
          })}
        </ul>
      </aside>
    </>
  )
}

function ThemeToggle({ onToggle }: { onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      aria-label="Cambiar tema"
      className="rounded-md p-2 text-secondary transition-colors duration-150 hover:bg-elevated hover:text-primary"
    >
      {/* Both icons rendered; CSS controls which is visible via data-theme on <html> */}
      <span className="theme-icon-sun" aria-hidden="true"><SunIcon /></span>
      <span className="theme-icon-moon" aria-hidden="true"><MoonIcon /></span>
    </button>
  )
}

function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="4" y1="6" x2="20" y2="6" />
      <line x1="4" y1="12" x2="20" y2="12" />
      <line x1="4" y1="18" x2="20" y2="18" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}
