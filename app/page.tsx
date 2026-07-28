import type { Metadata } from "next";
import { ArticleReveal } from "@/components/article-reveal";
import { Avatar } from "@/components/avatar";
import { BioList } from "@/components/bio-list";
import { Button } from "@/components/button";
import { GlassBox } from "@/components/glass-box";
import { IconLink } from "@/components/icon-link";
import { MascotScene } from "@/components/mascot-scene";
import type { ProjectCardProps } from "@/components/project-card";
import { ProjectsGrid } from "@/components/projects-grid";
import { Reveal } from "@/components/reveal";
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

const GithubIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.22.66.8.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
  </svg>
);

const LinkedinIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
);

const SiteIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.7 3.8 6 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-6-3.8-9s1.3-6.3 3.8-9Z" />
  </svg>
);

const MailIcon = (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" strokeLinecap="round" />
  </svg>
);

const ContactMailIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18v12H3z" stroke="currentColor" strokeWidth="2" />
    <path d="m3 7 9 6 9-6" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const projectItems: ProjectCardProps[] = [
  {
    href: "https://pulso-cyan-zeta.vercel.app",
    title: "Pulso",
    description: "Dashboard de indicadores económicos de Chile",
    image: {
      src: "https://pulso-cyan-zeta.vercel.app/opengraph-image?0ca38ad918dcc728",
      alt: "Pulso — Dashboard de indicadores económicos de Chile",
    },
    target: "_blank",
    rel: "noopener",
  },
  {
    href: "https://github.com/mbarradev-debug/pulso",
    title: "Código fuente",
    description: "Repositorio de Pulso en GitHub",
    fallbackIcon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.57.1.79-.25.79-.55v-1.94c-3.2.7-3.88-1.54-3.88-1.54-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.7 5.4-5.27 5.69.42.36.78 1.07.78 2.16v3.2c0 .3.22.66.8.55A10.51 10.51 0 0 0 23.5 12c0-6.27-5.23-11.5-11.5-11.5Z" />
      </svg>
    ),
    target: "_blank",
    rel: "noopener",
  },
];

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

        <ArticleReveal>
          <Reveal>
            <GlassBox>
              ¡Hola! Soy desarrollador full stack desde Santiago, Chile.
            </GlassBox>
          </Reveal>

          <Reveal className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
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
          </Reveal>

          <Reveal as="section" delay={0.1} className="mb-6">
            <SectionTitle>Trabajo</SectionTitle>
            <p className="text-justify indent-[1em] hyphens-auto">
              Miguel es desarrollador full stack con más de 2 años de
              experiencia entregando productos en producción para los sectores
              público y privado. Construyó desde cero un SaaS para
              transformación digital municipal, modernizó plataformas de salud
              utilizadas por más de 18.000 beneficiarios de Codelco, y
              desarrolla herramientas propias orientadas al mercado chileno. Su
              stack principal es React, Next.js y TypeScript, cubriendo diseño
              de base de datos, APIs, autenticación e infraestructura en la
              nube. Actualmente construye{" "}
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
          </Reveal>

          <Reveal as="section" delay={0.2} className="mb-6">
            <SectionTitle>Bio</SectionTitle>
            <BioList items={bioItems} />
          </Reveal>

          <Reveal as="section" delay={0.3} className="mb-6">
            <SectionTitle>Stack</SectionTitle>
            <BioList items={stackItems} />
          </Reveal>

          <Reveal as="section" delay={0.3} className="mb-6">
            <SectionTitle>En la web</SectionTitle>
            <ul className="mb-4">
              <li className="mb-0.5">
                <IconLink
                  href="https://github.com/mbarradev-debug"
                  icon={GithubIcon}
                  target="_blank"
                  rel="noopener"
                >
                  @mbarradev-debug
                </IconLink>
              </li>
              <li className="mb-0.5">
                <IconLink
                  href="https://www.linkedin.com/in/miguelbarrarios"
                  icon={LinkedinIcon}
                  target="_blank"
                  rel="noopener"
                >
                  miguelbarrarios
                </IconLink>
              </li>
              <li className="mb-0.5">
                <IconLink
                  href="https://miguelbarra.cl"
                  icon={SiteIcon}
                  target="_blank"
                  rel="noopener"
                >
                  miguelbarra.cl
                </IconLink>
              </li>
              <li className="mb-0.5">
                <IconLink href="mailto:mbarra.git@gmail.com" icon={MailIcon}>
                  mbarra.git@gmail.com
                </IconLink>
              </li>
            </ul>

            <SectionTitle id="proyectos">Proyectos</SectionTitle>
            <ProjectsGrid items={projectItems} />
          </Reveal>

          <Reveal as="section" delay={0.3} className="mb-6">
            <SectionTitle>Contacto</SectionTitle>
            <p>
              ¿Buscas un desarrollador full stack para tu equipo o proyecto?
              Escríbeme y conversemos.
            </p>
            <div className="my-4 text-center">
              <Button
                href="mailto:mbarra.git@gmail.com"
                variant="solid"
                icon={ContactMailIcon}
                iconPosition="leading"
              >
                Escríbeme
              </Button>
            </div>
          </Reveal>
        </ArticleReveal>
      </div>

      <footer className="text-caption mt-2 text-center opacity-40">
        © {new Date().getFullYear()} Miguel Barra. Todos los derechos
        reservados.
      </footer>
    </main>
  );
}
