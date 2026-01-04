import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { GitHubIcon, LinkedInIcon, EmailIcon } from "@/components/icons";

const contactLinks = [
  {
    label: "Email",
    value: "contacto@miguelbarra.dev",
    href: "mailto:contacto@miguelbarra.dev",
    icon: EmailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/miguelbarra",
    href: "https://linkedin.com/in/miguelbarra",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/miguelbarra",
    href: "https://github.com/miguelbarra",
    icon: GitHubIcon,
    external: true,
  },
];

export default function ContactSection() {
  return (
    <Section variant="primary">
      <Container>
        <div className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Conversemos
          </p>
          <h2
            id="contacto"
            className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Contacto
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Si buscas construir una solución sólida desde el inicio, con
            decisiones técnicas conscientes y una visión de largo plazo,
            conversemos.
          </p>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-lg border border-border-subtle bg-surface p-8">
            <h3 className="text-lg font-medium text-text-primary">
              Contacto directo
            </h3>
            <ul className="mt-6 space-y-4">
              {contactLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="group flex items-center gap-4 rounded-lg px-4 py-3 transition-all duration-200 hover:-translate-y-0.5 hover:bg-bg-secondary"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary transition-colors duration-200 group-hover:bg-bg-primary">
                        <IconComponent className="h-5 w-5 text-text-secondary transition-colors duration-200 group-hover:text-accent" />
                      </span>
                      <div>
                        <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                          {link.label}
                        </span>
                        <span className="mt-0.5 block text-text-primary transition-colors duration-200 group-hover:text-accent">
                          {link.value}
                        </span>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-lg border border-border-subtle bg-surface p-8">
            <h3 className="text-lg font-medium text-text-primary">
              Envíame un mensaje
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              Cuéntame brevemente sobre tu proyecto o idea y te responderé a la
              brevedad.
            </p>

            <form className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Nombre
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  className="mt-2 block w-full rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-2 block w-full rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Mensaje
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  className="mt-2 block w-full resize-none rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 transition-all duration-200 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary transition-all duration-200 hover:bg-accent-hover active:scale-[0.98] sm:w-auto"
              >
                Enviar mensaje
              </button>
            </form>

            <p className="mt-6 text-sm text-text-secondary">
              También puedes escribirme directamente a{" "}
              <a
                href="mailto:contacto@miguelbarra.dev"
                className="text-accent transition-colors duration-200 hover:text-accent-hover"
              >
                mi correo
              </a>
              .
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
