import { Container } from "@/components/ui";

interface SkillCategory {
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      "JavaScript / TypeScript",
      "Angular",
      "React",
      "Next.js",
      "Ionic",
      "Flutter",
    ],
  },
  {
    title: "Backend",
    skills: [".NET (ASP.NET MVC)", "PostgreSQL", "Prisma ORM"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["Docker", "Google Cloud Platform", "Google Play Console"],
  },
  {
    title: "Ingeniería",
    skills: [
      "Desarrollo Full Stack",
      "Arquitecturas escalables",
      "Integración de datos",
      "Despliegues en producción",
    ],
  },
];

export function TechnicalInventory() {
  return (
    <section className="py-24 bg-bg-dark border-t border-border-dim">
      <Container>
        <h2 className="text-3xl font-bold text-white mb-12">Stack Técnico</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {skillCategories.map((category) => (
            <div key={category.title} className="space-y-4">
              <h4 className="font-bold text-white border-b border-primary/30 pb-2 inline-block">
                {category.title}
              </h4>
              <ul className="space-y-2 text-sm text-text-dim">
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
