import Container from "./Container";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800 py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-gray-500">
            © {currentYear} MB. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
            <a
              href="mailto:contacto@ejemplo.com"
              className="text-sm text-gray-500 transition-colors hover:text-white"
            >
              Email
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
