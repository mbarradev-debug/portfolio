import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center"
      style={{
        paddingTop: 'clamp(8rem, 18vw, 14rem)',
        paddingBottom: 'clamp(6rem, 12vw, 10rem)',
        background: [
          'radial-gradient(ellipse 60% 40% at 70% 50%, rgba(79,142,247,0.07) 0%, transparent 70%)',
          'radial-gradient(ellipse 40% 60% at 20% 80%, rgba(62,207,178,0.05) 0%, transparent 70%)',
          'var(--bg-base)',
        ].join(','),
      }}
    >
      {/* Decorative section number — grid-breaker per design system */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-4 top-24 hidden select-none font-display font-extrabold leading-none text-primary xl:block"
        style={{ fontSize: 'var(--text-hero)', opacity: 0.04 }}
      >
        01
      </span>

      <div className="relative mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        {/* 60/40 grid: single col on mobile, asymmetric on desktop */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1fr_0.65fr] md:gap-[var(--space-16)]">

          {/* Left: text content */}
          <div className="flex flex-col gap-6">
            <h1
              className="hero-name font-display font-extrabold leading-[0.95] tracking-[-0.03em] text-primary"
              style={{ fontSize: 'var(--text-hero)' }}
            >
              Miguel Barra
            </h1>

            <p
              className="hero-role font-body text-secondary"
              style={{ fontSize: 'var(--text-2xl)', fontWeight: 400, lineHeight: 1.2 }}
            >
              Full Stack Developer
            </p>

            <p
              className="hero-tagline font-mono tracking-wide text-accent-alt"
              style={{ fontSize: 'var(--text-sm)' }}
            >
              React · Next.js · TypeScript
            </p>

            <p
              className="hero-tagline font-body text-secondary"
              style={{ fontSize: 'var(--text-lg)', lineHeight: 1.65, maxWidth: '38ch' }}
            >
              Construyo aplicaciones web que funcionan en producción.
              <br />
              Tres años trabajando en salud digital y SaaS B2B.
            </p>

            <div className="hero-ctas flex flex-wrap items-center gap-3 pt-2">
              <Button href="#projects" variant="primary" size="lg">
                Ver proyectos ↓
              </Button>
              <Button
                href="https://github.com/mbarradev"
                variant="ghost"
                size="lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub ↗
              </Button>
            </div>
          </div>

          {/* Right: avatar */}
          <div className="hero-avatar flex justify-center md:justify-end">
            <Avatar />
          </div>
        </div>
      </div>
    </section>
  )
}

function Avatar() {
  return (
    <div className="avatar">
      <Image
        src="/images/profile.webp"
        alt="Miguel Barra — Full Stack Developer"
        fill
        sizes="(max-width: 768px) 160px, 200px"
        style={{ objectFit: 'cover' }}
        priority
      />
    </div>
  )
}
