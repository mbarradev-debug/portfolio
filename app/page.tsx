import type { Metadata } from "next";
import { Avatar } from "@/components/avatar";
import { BioList } from "@/components/bio-list";
import { Button } from "@/components/button";
import { GlassBox } from "@/components/glass-box";
import { MascotScene } from "@/components/mascot-scene";
import { SectionTitle } from "@/components/section-title";

const bioItems = [
  {
    label: "2022 – 2023",
    description:
      "Desarrollador full stack en Valuesite Ltda. — modernización de plataformas de salud para Codelco (iSalud).",
  },
  {
    label: "2024",
    description:
      "Práctica profesional en Ewreka — desarrollo móvil con Flutter.",
  },
  {
    label: "2025",
    description:
      "Titulado en Ingeniería en Computación e Informática, Universidad Andrés Bello.",
  },
  {
    label: "2025 – 2026",
    description:
      "Desarrollador full stack en Forcast — SaaS de gestión municipal (DOM Digital) y app de carga eléctrica (E-Hive).",
  },
];

const stackItems = [
  {
    label: "Frontend",
    description: "React, Next.js, TypeScript, Tailwind CSS, Angular, Shadcn/ui",
  },
  {
    label: "Backend",
    description: "Node.js, NestJS, ASP.NET MVC (.NET), REST APIs, Prisma ORM",
  },
  { label: "Datos", description: "PostgreSQL, Oracle PL/SQL, Supabase" },
  {
    label: "Infra",
    description: "Docker, Azure, GCP, Vercel, CI/CD, Git, Firebase Auth",
  },
  { label: "Mobile", description: "Flutter, Ionic (Angular)" },
];

const ArrowIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path
      d="M9 6l6 6-6 6"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const metadata: Metadata = {
  title: "Miguel Barra - Desarrollador Full Stack",
  description:
    "Portfolio de Miguel Barra, desarrollador full stack especializado en React, Next.js y TypeScript.",
};

// Ported from /legacy-reference/index.html (main.page > .container.content)
// and css/style.css (.page, .content, .hero, .hero-text, .page-title,
// .tagline, .avatar-wrap). sm: (640px) is Tailwind's default breakpoint
// and matches legacy's @media (max-width: 640px) exactly, so the
// mobile-collapse classes need no arbitrary values.
export default function Home() {
  return (
    <main id="top" className="pb-8">
      <div className="mx-auto max-w-[768px] px-4 pt-14">
        <div className="mx-auto mb-2 h-[260px] w-full max-w-[300px]">
          <MascotScene />
        </div>

        <article>
          <GlassBox>
            ¡Hola! Soy desarrollador full stack desde Santiago, Chile.
          </GlassBox>

          <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
            <div className="grow">
              <h2 className="font-heading text-page-title mb-1 font-extrabold tracking-[-0.02em]">
                Miguel Barra
              </h2>
              <p className="text-text-soft">
                Desarrollador Full Stack — React · Next.js · TypeScript
              </p>
            </div>
            <div className="mt-4 shrink-0 text-center sm:mt-0 sm:ml-6">
              <Avatar
                src="/avatar-placeholder.png"
                alt="Foto de Miguel Barra"
              />
            </div>
          </div>
        </article>

        <section className="mb-6">
          <SectionTitle>Trabajo</SectionTitle>
          <p className="text-justify indent-[1em] hyphens-auto">
            Miguel es desarrollador full stack con más de 2 años de experiencia
            entregando productos en producción para los sectores público y
            privado. Construyó desde cero un SaaS para transformación digital
            municipal, modernizó plataformas de salud utilizadas por más de
            18.000 beneficiarios de Codelco, y desarrolla herramientas propias
            orientadas al mercado chileno. Su stack principal es React, Next.js
            y TypeScript, cubriendo diseño de base de datos, APIs, autenticación
            e infraestructura en la nube. Actualmente construye{" "}
            <a
              href="https://pulso-cyan-zeta.vercel.app"
              target="_blank"
              rel="noopener"
              className="text-link underline-offset-[3px] hover:underline"
            >
              Pulso
            </a>
            , un dashboard de indicadores económicos de Chile en tiempo casi
            real.
          </p>
          <div className="my-4 text-center">
            <Button href="#proyectos" variant="solid" icon={ArrowIcon}>
              Ver proyectos
            </Button>
          </div>
        </section>

        <section className="mb-6">
          <SectionTitle>Bio</SectionTitle>
          <BioList items={bioItems} />
        </section>

        <section className="mb-6">
          <SectionTitle>Stack</SectionTitle>
          <BioList items={stackItems} />
        </section>
      </div>
    </main>
  );
}
