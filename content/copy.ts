import type { Link, ServiceCard } from "./types";

// Datos de contacto y perfiles, referenciados desde varias secciones.
export const site = {
  logo: "Miguel",
  skipLink: "Saltar al contenido",
  email: "mbarra.git@gmail.com",
  cvUrl: "/miguelbarra-cv.pdf",
  github: "https://github.com/mbarradev-debug",
  linkedin: "https://www.linkedin.com/in/miguelbarrarios",
};

// Navegación principal (header) + enlace de contacto destacado.
export const nav: Link[] = [
  { label: "Acerca de", href: "#about" },
  { label: "Casos de estudio", href: "#casos" },
  { label: "Proyectos", href: "#proyectos" },
];

export const navContact: Link = { label: "Contacto", href: "#contacto" };

export const hero = {
  title: "Construyo productos full stack y los llevo a producción.",
  intro:
    "Más de 2 años entregando software para clientes públicos y privados en Chile, con React, Next.js y TypeScript y dominio de todo el stack.",
  cta: {
    label: "¿Tienes un proyecto en mente?",
    href: "#contacto",
  } satisfies Link,
};

export const about = {
  badge: "MIGUEL BARRA",
  headingLead: "Integro frontend, backend e infraestructura",
  headingFade:
    "para entregar productos completos que funcionan de punta a punta.",
  body: "Soy Full Stack Developer con más de 2 años entregando software para los sectores público y privado: un SaaS para digitalizar trámites municipales, la modernización de la Sucursal Virtual de una Isapre de Codelco y herramientas propias para el mercado chileno. Trabajo con React, Next.js y TypeScript, y me muevo con soltura en todo el stack: base de datos, APIs, autenticación e infraestructura.",
  actions: {
    primary: { label: "Hablemos", href: "#contacto" },
    cv: { label: "Descarga mi CV", href: "/miguelbarra-cv.pdf" },
    recommendations: {
      label: "Lee las recomendaciones",
      href: "#testimonios",
    },
  } satisfies Record<string, Link>,
};

export const testimonialsSection = {
  srTitle: "Recomendaciones",
  cta: {
    label: "Ver en LinkedIn",
    href: "https://www.linkedin.com/in/miguelbarrarios",
  } satisfies Link,
  source: "FUENTE: LINKEDIN",
};

export const servicesSection = {
  srTitle: "Servicios",
  cards: [
    {
      index: "01.",
      title: "Frontend",
      text: "Interfaces rápidas, accesibles y fáciles de mantener con React, Next.js, TypeScript y Tailwind CSS.",
    },
    {
      index: "02.",
      title: "Backend & APIs",
      text: "Lógica de negocio y APIs REST sólidas con Node.js, NestJS, ASP.NET y Python/Flask.",
    },
    {
      index: "03.",
      title: "Datos & Cloud",
      text: "Base de datos, contenedores y despliegue: PostgreSQL, Oracle, Docker, Azure, GCP y Vercel, con CI/CD en GitHub Actions.",
    },
  ] satisfies ServiceCard[],
};

export const arsenalSection = {
  badge: "Stack técnico",
};

export const casesSection = {
  title: "Casos de estudio",
  sub: "No solo qué construyo, también cómo lo construyo y cómo lo pruebo.",
  linkLabelWithUrl: "Ver el proyecto",
  linkLabelDefault: "Hablemos",
  defaultHref: "#contacto",
};

export const projectsSection = {
  badge: "TRABAJO SELECCIONADO",
  title: "Proyectos",
};

export const footer = {
  heading:
    "¿Tienes una idea nueva o un producto a medio construir? Puedo llevarlo de punta a punta.",
  cta: {
    label: "Contáctame",
    href: "mailto:mbarra.git@gmail.com",
  } satisfies Link,
  navHeading: "NAVEGAR",
  nav: [
    { label: "Acerca de", href: "#about" },
    { label: "Casos de estudio", href: "#casos" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proyectos", href: "#proyectos" },
    { label: "Contacto", href: "#contacto" },
  ] satisfies Link[],
  connectHeading: "CONECTAR",
  connect: [
    { label: "GitHub", href: "https://github.com/mbarradev-debug" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/miguelbarrarios" },
    { label: "Email", href: "mailto:mbarra.git@gmail.com" },
  ] satisfies Link[],
  copyright: "© 2026 Miguel Barra. Todos los derechos reservados.",
};
