import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-text-secondary">
            © {currentYear} Miguel Barra. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/miguelbarra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/miguelbarra"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
            >
              LinkedIn
            </a>
            <a
              href="mailto:contacto@miguelbarra.dev"
              className="text-sm text-text-secondary transition-colors duration-200 hover:text-accent"
            >
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
