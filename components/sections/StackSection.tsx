"use client";

import { useEffect, useRef, useState } from "react";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";
import {
  ReactIcon,
  NextjsIcon,
  TypeScriptIcon,
  NodejsIcon,
  PostgreSQLIcon,
  PrismaIcon,
  DockerIcon,
  GitIcon,
  ApiIcon,
  ArchitectureIcon,
  MonitorIcon,
  ServerIcon,
  DatabaseIcon,
} from "@/components/icons";

const competencias = [
  {
    titulo: "Arquitectura de aplicaciones",
    descripcion:
      "Diseño arquitecturas alineadas al contexto del proyecto, cuidando la separación de responsabilidades y la evolución futura del sistema.",
    icon: ArchitectureIcon,
  },
  {
    titulo: "Desarrollo Frontend",
    descripcion:
      "Construyo interfaces claras y mantenibles, basadas en una correcta componentización, priorizando rendimiento y experiencia de usuario.",
    icon: MonitorIcon,
  },
  {
    titulo: "Desarrollo Backend",
    descripcion:
      "Implemento lógica de negocio desacoplada mediante APIs bien definidas, con foco en robustez, validación y control de errores.",
    icon: ServerIcon,
  },
  {
    titulo: "Datos y persistencia",
    descripcion:
      "Diseño modelos relacionales consistentes, considerando integridad, claridad del dominio y crecimiento a largo plazo.",
    icon: DatabaseIcon,
  },
];

const techCategories = [
  {
    name: "Frontend",
    items: [
      { nombre: "React", icon: ReactIcon },
      { nombre: "Next.js", icon: NextjsIcon },
      { nombre: "TypeScript", icon: TypeScriptIcon },
    ],
  },
  {
    name: "Backend",
    items: [
      { nombre: "Node.js", icon: NodejsIcon },
      { nombre: "APIs REST", icon: ApiIcon },
      { nombre: "PostgreSQL", icon: PostgreSQLIcon },
      { nombre: "Prisma", icon: PrismaIcon },
    ],
  },
  {
    name: "DevOps & Tools",
    items: [
      { nombre: "Docker", icon: DockerIcon },
      { nombre: "Git", icon: GitIcon },
    ],
  },
];

export default function StackSection() {
  const techGridRef = useRef<HTMLDivElement>(null);
  const [techVisible, setTechVisible] = useState(false);

  useEffect(() => {
    const element = techGridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTechVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Section variant="primary" separator="visible">
      <Container>
        <AnimateOnScroll className="max-w-3xl">
          <p className="mb-3 text-sm font-medium tracking-wide text-accent">
            Tecnología
          </p>
          <h2
            id="stack"
            className="text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl"
          >
            Stack & Engineering Approach
          </h2>

          <p className="mt-6 text-base leading-relaxed text-text-secondary sm:text-lg">
            Selecciono el stack tecnológico y los patrones de diseño según las
            necesidades específicas de cada proyecto, priorizando la
            escalabilidad, la mantenibilidad y la claridad arquitectónica desde
            el inicio.
          </p>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-16">
          <h3 className="text-lg font-medium text-text-primary">
            Áreas de competencia
          </h3>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {competencias.map((item) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={item.titulo}
                  className="competency-card group rounded-lg border border-border-subtle bg-surface p-6"
                >
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    <IconComponent className="h-5 w-5 text-accent" />
                  </div>
                  <h4 className="competency-title font-medium text-text-primary">
                    {item.titulo}
                  </h4>
                  <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                    {item.descripcion}
                  </p>
                </div>
              );
            })}
          </div>
        </AnimateOnScroll>

        <AnimateOnScroll className="mt-16">
          <h3 className="text-lg font-medium text-text-primary">
            Stack principal
          </h3>
          <div
            ref={techGridRef}
            className="mt-6 rounded-xl border border-border-subtle bg-surface p-6 sm:p-8"
          >
            <div className="space-y-8">
              {techCategories.map((category, categoryIndex) => {
                let globalIndex = 0;
                for (let i = 0; i < categoryIndex; i++) {
                  globalIndex += techCategories[i].items.length;
                }

                return (
                  <div key={category.name}>
                    <h4 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-secondary/70">
                      {category.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                      {category.items.map((tech, index) => {
                        const IconComponent = tech.icon;
                        const itemIndex = globalIndex + index;
                        return (
                          <div
                            key={tech.nombre}
                            className={`tech-item flex items-center gap-3 rounded-lg px-4 py-3 ${
                              techVisible
                                ? "animate-in fade-in slide-in-from-bottom-3 duration-300"
                                : "opacity-0 translate-y-3"
                            }`}
                            style={{
                              animationDelay: techVisible
                                ? `${itemIndex * 50}ms`
                                : "0ms",
                            }}
                          >
                            <IconComponent className="tech-icon h-5 w-5 text-text-secondary" />
                            <span className="tech-name text-sm font-medium text-text-primary">
                              {tech.nombre}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
