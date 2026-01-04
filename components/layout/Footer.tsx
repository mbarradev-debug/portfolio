import Container from "./Container";
import {
  GitHubIcon,
  LinkedInIcon,
  EmailIcon,
  ExternalLinkIcon,
} from "@/components/icons";

const links = [
  {
    label: "GitHub",
    href: "https://github.com/miguelbarra",
    icon: GitHubIcon,
    external: true,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/miguelbarra",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "Email",
    href: "mailto:contacto@miguelbarra.dev",
    icon: EmailIcon,
    external: false,
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-text-secondary">
            © {currentYear} Miguel Barra. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            {links.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-2 rounded-md px-3 py-2 text-sm text-text-secondary transition-all duration-200 hover:bg-surface hover:text-text-primary"
                  aria-label={`${link.label}${link.external ? " (abre en nueva pestaña)" : ""}`}
                >
                  <IconComponent className="h-4 w-4 transition-colors duration-200 group-hover:text-accent" />
                  <span>{link.label}</span>
                  {link.external && (
                    <ExternalLinkIcon className="h-3 w-3 opacity-50" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </Container>
    </footer>
  );
}
