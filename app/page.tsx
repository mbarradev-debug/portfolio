import { Container } from "@/components/ui";

export default function Home() {
  return (
    <section className="min-h-[90vh] flex flex-col justify-center bg-bg-dark">
      <Container>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
          Portfolio
        </h1>
        <p className="mt-4 text-xl text-text-dim max-w-2xl">
          Base layout configured
        </p>
      </Container>
    </section>
  );
}
