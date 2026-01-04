import Container from "./Container";

export default function Header() {
  return (
    <header className="py-4">
      <Container>
        <nav className="flex items-center justify-between">
          <span className="text-lg font-medium text-white">MB</span>
          <div className="flex items-center gap-6">
            <a
              href="/cv.pdf"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              CV
            </a>
            <a
              href="#contacto"
              className="text-sm text-gray-400 transition-colors hover:text-white"
            >
              Contacto
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
