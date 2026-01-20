import { Container, AnimatedSection } from "@/components/ui";

export function Philosophy() {
  return (
    <section
      id="philosophy"
      className="py-16 md:py-24 bg-bg-deep border-y border-border-dim"
    >
      <Container>
        <AnimatedSection className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12 items-start">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Filosofía</h2>
            <div className="w-12 h-1 bg-primary rounded-full" />
          </div>

          <div className="flex flex-col gap-8">
            <blockquote className="text-2xl md:text-3xl font-display font-medium leading-tight text-white">
              "La mantenibilidad no es un extra: es la base de cualquier sistema
              que quiera escalar."
            </blockquote>

            <p className="text-lg text-text-dim leading-relaxed">
              Mi enfoque como ingeniero está centrado en construir software que
              pueda mantenerse en el tiempo. Prefiero decisiones técnicas claras,
              tecnologías probadas y sistemas entendibles por cualquier
              desarrollador que los herede. El objetivo no es usar lo último,
              sino lo correcto para el problema.
            </p>
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
