import { Container } from "./Container";

export function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-border-dim glass">
      <Container className="h-16 flex items-center justify-between">
        {/* Navigation content will be implemented in a future task */}
      </Container>
    </header>
  );
}
