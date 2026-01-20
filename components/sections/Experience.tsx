import { Container } from "@/components/ui";

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    role: "Full Stack Developer",
    company: "Forcast",
    period: "Jul 2025 – Presente",
    description: [
      "Desarrollo y mantenimiento de soluciones full stack en entorno productivo.",
      "Evolución de plataformas internas con foco en escalabilidad y mantenibilidad.",
      "Integración frontend, backend y bases de datos en sistemas reales.",
    ],
    isCurrent: true,
  },
  {
    role: "Full Stack Developer",
    company: "DOB Protocol",
    period: "2024 – 2025",
    description: [
      "Desarrollo y mantenimiento del landing page de dobprotocol.com.",
      "Participación en plataforma orientada a tokenización de proyectos.",
      "Frontend con Angular y backend con PostgreSQL.",
      "Despliegue y operación en Google Cloud Platform.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "E-Hive",
    period: "2024",
    description: [
      "Desarrollo de aplicaciones web y móviles.",
      "Implementación de funcionalidades como escaneo de códigos QR.",
      "Angular, Ionic y PostgreSQL.",
      "Publicación y gestión de versiones en Google Play Console.",
      "Soporte y despliegue en GCP.",
    ],
  },
  {
    role: "Full Stack Developer",
    company: "ITS Solutions",
    period: "2024",
    description: [
      "Desarrollo de un SaaS en producción.",
      "Stack: Next.js, Prisma, PostgreSQL.",
      "Contenerización con Docker.",
      "UI con Tailwind CSS.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 bg-bg-dark">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-12 md:mb-16">Experiencia</h2>

        <div className="relative border-l border-border-dim ml-3 md:ml-6 space-y-12 md:space-y-16">
          {experiences.map((exp, index) => (
            <div key={index} className="relative pl-8 md:pl-12">
              <div
                className={`absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full ring-4 ring-bg-dark ${
                  exp.isCurrent ? "bg-primary" : "bg-border-dim"
                }`}
              />

              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between mb-2">
                <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                <span className="font-mono text-sm text-text-dim">
                  {exp.period}
                </span>
              </div>

              <div className="text-primary font-medium mb-4">{exp.company}</div>

              <ul className="list-disc list-outside ml-4 space-y-2 text-text-dim marker:text-primary/50">
                {exp.description.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
