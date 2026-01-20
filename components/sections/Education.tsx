import { Container } from "@/components/ui";

interface EducationItem {
  degree: string;
  institution: string;
  period: string;
}

const educationItems: EducationItem[] = [
  {
    degree: "Ingeniería en Computación e Informática",
    institution: "Universidad Andrés Bello",
    period: "2020–2025",
  },
  {
    degree: "Analista Programador Computacional",
    institution: "Duoc UC",
    period: "2013–2015",
  },
];

export function Education() {
  return (
    <section className="py-20 bg-bg-dark">
      <Container>
        <div className="border-t border-border-dim pt-12">
          <h2 className="text-2xl font-bold text-white mb-8">Educación</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {educationItems.map((item) => (
              <div key={item.degree}>
                <h3 className="text-lg font-bold text-white">
                  {item.institution}
                </h3>
                <p className="text-text-dim">{item.degree}</p>
                <p className="text-sm text-primary mt-1">{item.period}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
