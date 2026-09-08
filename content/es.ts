import type { SiteContent } from "./types";
import { techRow1, techRow2 } from "./tech";

// Datos de contacto y perfiles, idénticos en cada idioma.
const site = {
  logo: "Miguel",
  email: "mbarra.git@gmail.com",
  cvUrl: "/miguelbarra-cv.pdf",
  github: "https://github.com/mbarradev-debug",
  linkedin: "https://www.linkedin.com/in/miguelbarrarios",
};

export const es: SiteContent = {
  locale: "es",
  home: "/",
  htmlLang: "es",
  site,

  nav: [
    { label: "Acerca de", href: "#about" },
    { label: "Casos de estudio", href: "#casos" },
    { label: "Proyectos", href: "#proyectos" },
  ],
  navContact: { label: "Contacto", href: "#contacto" },

  hero: {
    eyebrow: "Miguel Barra · Full Stack Developer",
    title: "Construyo productos full stack y los llevo a producción.",
    intro:
      "Más de 2 años entregando software para clientes públicos y privados en Chile, con React, Next.js y TypeScript y dominio de todo el stack.",
    cta: { label: "¿Tienes un proyecto en mente?", href: "#contacto" },
  },

  about: {
    badge: "MIGUEL BARRA",
    headingLead: "Integro frontend, backend e infraestructura",
    headingFade:
      "para entregar productos completos que funcionan de punta a punta.",
    body: "Soy Full Stack Developer con más de 2 años entregando software para los sectores público y privado: un SaaS para digitalizar trámites municipales, la modernización de la Sucursal Virtual de una Isapre de Codelco y herramientas propias para el mercado chileno. Trabajo con React, Next.js y TypeScript, y me muevo con soltura en todo el stack: base de datos, APIs, autenticación e infraestructura.",
    photoAlt: "Retrato de Miguel Barra, Full Stack Developer",
    actions: {
      primary: { label: "Hablemos", href: "#contacto" },
      cv: { label: "Descarga mi CV", href: "/miguelbarra-cv.pdf" },
      recommendations: {
        label: "Lee las recomendaciones",
        href: "#testimonios",
      },
    },
  },

  testimonials: [
    {
      quote:
        "Conocí a Miguel en su práctica en Ewreka Chile, como Software Developer Trainee. Demostró un alto nivel de compromiso, perseverancia y trabajo dedicado, y fue un gran aporte en la entrega final de la app en la que trabajó junto al equipo. Recomiendo en un 100% su incorporación a un equipo de alto nivel.",
      name: "Paola Quiroga Olivares",
      role: "Fundadora de Ewreka Chile",
    },
  ],
  testimonialsSection: {
    srTitle: "Recomendaciones",
    cta: {
      label: "Ver en LinkedIn",
      href: "https://www.linkedin.com/in/miguelbarrarios",
    },
    source: "FUENTE: LINKEDIN",
    pickLabel: "Seleccionar recomendación",
    viewLabelPrefix: "Ver recomendación",
  },

  services: {
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
    ],
  },

  arsenal: { badge: "Stack técnico" },
  techRow1,
  techRow2,

  cases: [
    {
      tag: "DASHBOARD",
      date: "2025",
      title: "Pulso — Indicadores económicos de Chile",
      desc: "Dashboard en producción con una API intermedia propia (Route Handlers de Next.js) sobre la API SI3 del Banco Central, con caché y fallback ante fallos externos. 10 indicadores en tiempo casi real, gráfico histórico, favoritos y conversor. SWR + Chart.js, tests E2E con Playwright y CI en GitHub Actions.",
      image: "/pulso-dashboard.png",
      imageAlt:
        "Dashboard Pulso mostrando UF, dólar, euro y cobre en tiempo real",
      imageWidth: 1200,
      imageHeight: 630,
      grad: "linear-gradient(155deg,#e7e5f0,#dde1ee 55%, #ece7f2)",
      url: "https://pulso-cyan-zeta.vercel.app",
    },
  ],
  casesSection: {
    title: "Casos de estudio",
    sub: "No solo qué construyo, también cómo lo construyo y cómo lo pruebo.",
    linkLabelWithUrl: "Ver el proyecto",
    linkLabelDefault: "Hablemos",
    defaultHref: "#contacto",
    prevLabel: "Caso anterior",
    nextLabel: "Caso siguiente",
  },

  projects: [
    {
      year: "2025",
      name: "Pulso",
      desc: "Dashboard de indicadores económicos de Chile en producción. API intermedia propia (Route Handlers de Next.js) sobre la API SI3 del Banco Central, con caché en memoria y fallback. 10 indicadores en tiempo casi real, gráfico histórico, favoritos y conversor. Tests E2E con Playwright y CI en GitHub Actions.",
      tags: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "SWR",
        "Chart.js",
        "Vercel",
      ],
      url: "https://pulso-cyan-zeta.vercel.app",
    },
  ],
  projectsSection: {
    badge: "TRABAJO SELECCIONADO",
    title: "Proyectos",
  },

  footer: {
    heading:
      "¿Tienes una idea nueva o un producto a medio construir? Puedo llevarlo de punta a punta.",
    cta: { label: "Contáctame", href: "mailto:mbarra.git@gmail.com" },
    navHeading: "NAVEGAR",
    nav: [
      { label: "Acerca de", href: "#about" },
      { label: "Casos de estudio", href: "#casos" },
      { label: "Servicios", href: "#servicios" },
      { label: "Proyectos", href: "#proyectos" },
      { label: "Contacto", href: "#contacto" },
    ],
    connectHeading: "CONECTAR",
    connect: [
      { label: "GitHub", href: "https://github.com/mbarradev-debug" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/miguelbarrarios",
      },
      { label: "Email", href: "mailto:mbarra.git@gmail.com" },
    ],
    copyright: "© 2026 Miguel Barra. Todos los derechos reservados.",
  },

  notFound: {
    code: "Error 404",
    title: "Esta página no existe.",
    body: "El enlace está roto o la página se movió. Desde el inicio llegas a todo.",
    home: "Volver al inicio",
    sectionsNav: "Secciones del sitio",
  },

  chrome: {
    skipLink: "Saltar al contenido",
    navPrimary: "Navegación principal",
    navMobile: "Navegación móvil",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    backToTop: "Volver arriba",
    langGroup: "Idioma",
    switchLanguage: "View in English",
  },
};
