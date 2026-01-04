import Container from "./Container";
import { DownloadIcon } from "@/components/icons";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <a
            href="#"
            className="text-lg font-semibold text-text-primary transition-colors hover:text-accent"
          >
            MB
          </a>
          <div className="flex items-center gap-8">
            <a
              href="/cv/cv.pdf"
              className="group flex items-center gap-2 text-sm text-text-secondary transition-colors duration-200 hover:text-text-primary"
            >
              <DownloadIcon className="h-4 w-4 transition-colors duration-200 group-hover:text-accent" />
              <span className="relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-accent after:transition-all after:duration-200 group-hover:after:w-full">
                CV
              </span>
            </a>
            <a
              href="#contacto"
              className="rounded-md bg-accent px-4 py-2 text-sm font-medium text-bg-primary transition-all duration-200 hover:bg-accent-hover active:scale-[0.98]"
            >
              Contacto
            </a>
          </div>
        </nav>
      </Container>
    </header>
  );
}
