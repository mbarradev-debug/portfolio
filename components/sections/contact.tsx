import { ContactForm } from '@/components/ui/contact-form'

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative"
      style={{ paddingBlock: 'clamp(6rem, 12vw, 10rem)' }}
    >
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-6 xl:px-8">
        {/* Heading — centrado, simple, directo */}
        <div className="mb-10 text-center">
          <h2
            className="font-display font-bold text-primary"
            style={{ fontSize: 'var(--text-4xl)', letterSpacing: '-0.02em', lineHeight: 1.1 }}
          >
            Hablemos.
          </h2>
          <p
            className="font-body text-secondary mt-3"
            style={{ fontSize: 'var(--text-lg)' }}
          >
            Disponible para proyectos freelance y oportunidades full-time.
          </p>
        </div>

        {/* Contact links — visible email + social */}
        <div className="mb-10 flex flex-wrap items-center justify-center gap-6">
          <a
            href="mailto:mbarra.git@gmail.com"
            className="font-mono text-accent transition-colors duration-150 hover:text-accent-hover"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            mbarra.git@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/miguelbarrarios"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-secondary transition-colors duration-150 hover:text-primary"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/mbarradev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-secondary transition-colors duration-150 hover:text-primary"
            style={{ fontSize: 'var(--text-sm)' }}
          >
            GitHub ↗
          </a>
        </div>

        {/* Form */}
        <div className="mx-auto w-full max-w-[560px]">
          <ContactForm />
        </div>
      </div>
    </section>
  )
}
