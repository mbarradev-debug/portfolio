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
import { useI18n } from "@/i18n";

const contactLinks = [
  {
    label: "Email",
    value: "mbarra.3690@gmail.com",
    href: "mailto:mbarra.3690@gmail.com",
    icon: EmailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/miguelbarrarios",
    href: "https://www.linkedin.com/in/miguelbarrarios/",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/mbarradev-debug",
    href: "https://github.com/mbarradev-debug",
    icon: GitHubIcon,
    external: true,
  },
];

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { t } = useI18n();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("submitting");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = {
      nombre: formData.get("nombre"),
      email: formData.get("email"),
      mensaje: formData.get("mensaje"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || t.contact.form.error);
      }

      setFormStatus("success");
      form.reset();
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (err) {
      setFormStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : t.contact.form.error
      );
      setTimeout(() => {
        setFormStatus("idle");
        setErrorMessage("");
      }, 5000);
    }
  };

  return (
    <Section variant="primary" spacing="relaxed" separator="none">
      <Container>
        <AnimateOnScroll className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            {t.contact.label}
          </p>
          <h2
            id="contacto"
            className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            {t.contact.title}
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            {t.contact.description}
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="rounded-lg border border-border-subtle bg-surface p-8">
            <h3 className="text-lg font-medium text-text-primary">
              {t.contact.directContactLabel}
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
              {t.contact.formTitle}
            </h3>
            <p className="mt-2 text-sm text-text-secondary">
              {t.contact.formDescription}
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="nombre"
                  className="block text-sm font-medium text-text-secondary"
                >
                  {t.contact.form.name} <span className="text-accent">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  disabled={formStatus === "submitting"}
                  placeholder={t.contact.form.namePlaceholder}
                  className="form-input mt-2 block w-full rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-text-secondary"
                >
                  {t.contact.form.email} <span className="text-accent">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  disabled={formStatus === "submitting"}
                  placeholder={t.contact.form.emailPlaceholder}
                  className="form-input mt-2 block w-full rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div>
                <label
                  htmlFor="mensaje"
                  className="block text-sm font-medium text-text-secondary"
                >
                  {t.contact.form.message} <span className="text-accent">*</span>
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={4}
                  required
                  disabled={formStatus === "submitting"}
                  placeholder={t.contact.form.messagePlaceholder}
                  className="form-input mt-2 block w-full resize-none rounded-md border border-border-subtle bg-bg-secondary px-4 py-3 text-text-primary placeholder-text-secondary/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="btn-primary mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
              >
                {formStatus === "submitting" ? t.contact.form.submitting : t.contact.form.submit}
              </button>

              {formStatus === "success" && (
                <p className="animate-fade-in text-sm text-accent">
                  {t.contact.form.success}
                </p>
              )}

              {formStatus === "error" && (
                <p className="animate-fade-in text-sm text-error">
                  {errorMessage || t.contact.form.error}
                </p>
              )}
            </form>

            <p className="mt-6 text-sm text-text-secondary">
              {t.contact.alternativeContact}{" "}
              <a
                href="mailto:mbarra.3690@gmail.com"
                className="text-link text-accent"
              >
                {t.contact.alternativeContactLink}
              </a>
              .
            </p>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
