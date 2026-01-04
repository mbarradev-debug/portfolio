"use client";

import { useState, FormEvent } from "react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  ExternalLinkIcon,
} from "@/components/icons";

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

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Simular envío (reemplazar con lógica real cuando se implemente backend)
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Por ahora, mostrar mensaje de éxito
    setFormStatus("success");

    // Reset form
    (e.target as HTMLFormElement).reset();

    // Volver a idle después de 5 segundos
    setTimeout(() => setFormStatus("idle"), 5000);
  };

  return (
    <Section variant="primary" spacing="relaxed" separator="none">
      <Container>
        <AnimateOnScroll className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Conversemos
          </p>
          <h2
            id="contacto"
            className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl"
          >
            Contacto
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Si buscas construir una solución sólida desde el inicio, con
            decisiones técnicas conscientes y una visión de largo plazo,
            conversemos.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
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
                      className="contact-link group flex items-center gap-4 rounded-lg px-4 py-3"
                    >
                      <span className="contact-link-icon-wrapper flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary">
                        <IconComponent className="contact-link-icon h-5 w-5 text-text-secondary" />
                      </span>
                      <div className="flex-1">
                        <span className="text-xs font-medium uppercase tracking-wider text-text-secondary">
                          {link.label}
                        </span>
                        <span className="contact-link-value mt-0.5 flex items-center gap-1.5 text-sm text-text-primary">
                          {link.value}
                          {link.external && (
                            <ExternalLinkIcon className="contact-link-external h-3 w-3 opacity-50" />
                          )}
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

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Nombre <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  disabled={formStatus === "submitting"}
                  placeholder="Tu nombre"
                  className="form-input mt-2 block w-full rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Email <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={formStatus === "submitting"}
                  placeholder="tu@email.com"
                  className="form-input mt-2 block w-full rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-text-secondary"
                >
                  Mensaje <span className="text-accent">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  disabled={formStatus === "submitting"}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className="form-input mt-2 block w-full resize-none rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="btn-primary mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {formStatus === "submitting" ? "Enviando..." : "Enviar mensaje"}
              </button>

              {formStatus === "success" && (
                <p className="animate-fade-in text-sm text-accent">
                  Mensaje enviado correctamente. Te responderé pronto.
                </p>
              )}

              {formStatus === "error" && (
                <p className="animate-fade-in text-sm text-red-400">
                  Hubo un error al enviar el mensaje. Intenta de nuevo.
                </p>
              )}
            </form>

            <p className="mt-6 text-sm text-text-secondary">
              También puedes escribirme directamente a{" "}
              <a
                href="mailto:contacto@miguelbarra.dev"
                className="text-link text-accent"
                aria-label="Enviar correo a contacto@miguelbarra.dev"
              >
                mi correo
              </a>
              .
            </p>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
