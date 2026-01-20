import { Container, AnimatedSection } from "@/components/ui";
import { Monitor, Server, Cloud, Wrench, type LucideIcon } from "lucide-react";

interface SkillCategory {
  title: string;
  skills: string[];
  icon?: LucideIcon;
}

const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Monitor,
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
    icon: Server,
    skills: [".NET (ASP.NET MVC)", "PostgreSQL", "Prisma ORM"],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["Docker", "Google Cloud Platform", "Google Play Console"],
  },
  {
    title: "Ingeniería",
    icon: Wrench,
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
    <section className="py-16 md:py-24 bg-bg-dark border-t border-border-dim">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-white mb-8 md:mb-12">Stack Técnico</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {skillCategories.map((category) => (
              <div key={category.title} className="space-y-4">
                <h3 className="font-bold text-white border-b border-primary/30 pb-2 inline-flex items-center gap-2">
                  {category.icon && (
                    <category.icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  )}
                  {category.title}
                </h3>
                <ul className="space-y-2 text-sm text-text-dim">
                  {category.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </Container>
    </section>
  );
}
