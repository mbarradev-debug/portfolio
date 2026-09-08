import type { SiteContent } from "./types";
import { techRow1, techRow2 } from "./tech";

// BORRADOR de traducción — pendiente de revisión de Miguel antes de publicar.
// Los testimonios se mantienen en su idioma original (cita de terceros).

const site = {
  logo: "Miguel",
  email: "mbarra.git@gmail.com",
  cvUrl: "/miguelbarra-cv.pdf",
  github: "https://github.com/mbarradev-debug",
  linkedin: "https://www.linkedin.com/in/miguelbarrarios",
};

export const en: SiteContent = {
  locale: "en",
  home: "/en",
  htmlLang: "en",
  site,

  nav: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#proyectos" },
  ],
  navContact: { label: "Contact", href: "#contacto" },

  hero: {
    eyebrow: "Miguel Barra · Full Stack Developer",
    title: "I build full-stack products and take them to production.",
    intro:
      "Over 2 years shipping software for public- and private-sector clients in Chile, with React, Next.js and TypeScript — and command of the whole stack.",
    cta: { label: "Have a project in mind?", href: "#contacto" },
  },

  about: {
    badge: "MIGUEL BARRA",
    headingLead: "I bring frontend, backend and infrastructure together",
    headingFade: "to ship complete products that work end to end.",
    body: "I'm a Full Stack Developer with over 2 years shipping software for the public and private sectors: a SaaS to digitize municipal paperwork, the redesign of the online self-service portal for a Codelco health-insurance provider, and my own tools for the Chilean market. I work with React, Next.js and TypeScript, and move comfortably across the whole stack: databases, APIs, authentication and infrastructure.",
    photoAlt: "Portrait of Miguel Barra, Full Stack Developer",
    actions: {
      primary: { label: "Let's talk", href: "#contacto" },
      cv: { label: "Download my CV", href: "/miguelbarra-cv.pdf" },
      recommendations: {
        label: "Read the recommendations",
        href: "#testimonios",
      },
    },
  },

  testimonials: [
    {
      quote:
        "Conocí a Miguel en su práctica en Ewreka Chile, como Software Developer Trainee. Demostró un alto nivel de compromiso, perseverancia y trabajo dedicado, y fue un gran aporte en la entrega final de la app en la que trabajó junto al equipo. Recomiendo en un 100% su incorporación a un equipo de alto nivel.",
      name: "Paola Quiroga Olivares",
      role: "Founder of Ewreka Chile",
    },
  ],
  testimonialsSection: {
    srTitle: "Recommendations",
    cta: {
      label: "View on LinkedIn",
      href: "https://www.linkedin.com/in/miguelbarrarios",
    },
    source: "SOURCE: LINKEDIN",
    pickLabel: "Select recommendation",
    viewLabelPrefix: "View recommendation",
    pauseLabel: "Pause the recommendations rotation",
    resumeLabel: "Resume the recommendations rotation",
  },

  services: {
    srTitle: "Services",
    cards: [
      {
        index: "01.",
        title: "Frontend",
        text: "Fast, accessible, maintainable interfaces with React, Next.js, TypeScript and Tailwind CSS.",
      },
      {
        index: "02.",
        title: "Backend & APIs",
        text: "Solid business logic and REST APIs with Node.js, NestJS, ASP.NET and Python/Flask.",
      },
      {
        index: "03.",
        title: "Data & Cloud",
        text: "Databases, containers and deployment: PostgreSQL, Oracle, Docker, Azure, GCP and Vercel, with CI/CD on GitHub Actions.",
      },
    ],
  },

  arsenal: {
    badge: "Tech stack",
    pauseLabel: "Pause the tech stack animation",
    resumeLabel: "Resume the tech stack animation",
  },
  techRow1,
  techRow2,

  cases: [
    {
      tag: "DASHBOARD",
      date: "2025",
      title: "Pulso — Chile's economic indicators",
      desc: "Production dashboard with a custom intermediate API (Next.js Route Handlers) over the Central Bank's SI3 API, with caching and fallback when the upstream fails. 10 near-real-time indicators, historical chart, favorites and a converter. SWR + Chart.js, E2E tests with Playwright and CI on GitHub Actions.",
      image: "/pulso-dashboard.png",
      imageAlt:
        "Pulso dashboard showing UF, US dollar, euro and copper in real time",
      imageWidth: 1200,
      imageHeight: 630,
      grad: "linear-gradient(155deg,#e7e5f0,#dde1ee 55%, #ece7f2)",
      url: "https://pulso-cyan-zeta.vercel.app",
    },
    {
      tag: "EXTENSION",
      date: "2026",
      title: "Pulso UF y Dólar — Chrome extension",
      desc: "Chrome extension that shows Chile's UF, US dollar and other Central Bank indicators right in the browser popup, with their daily change and a converter to pesos with a swap button. Pick which indicators to show, get a factual notice when a value hasn't updated yet, and keep preferences in the browser only: no accounts, ads or tracking. Consumes the public Pulso API.",
      image: "/pulso-extension.png",
      imageAlt:
        "Pulso UF y Dólar extension popup showing the UF, observed dollar and the converter to pesos",
      imageWidth: 1280,
      imageHeight: 800,
      grad: "linear-gradient(155deg,#e6f0da,#d9e9c9 55%,#eef4e2)",
      url: "https://chromewebstore.google.com/detail/pulso-uf-y-d%C3%B3lar/opakpmmcepebnccjjkhkgioopeadgihp",
    },
  ],
  casesSection: {
    badge: "SELECTED WORK",
    title: "Projects",
    sub: "Not just what I build, but how I build it and how I test it.",
    linkLabelWithUrl: "View the project",
    linkLabelDefault: "Let's talk",
    defaultHref: "#contacto",
    prevLabel: "Previous project",
    nextLabel: "Next project",
  },

  footer: {
    heading:
      "Got a new idea or a half-built product? I can take it end to end.",
    cta: { label: "Get in touch", href: "mailto:mbarra.git@gmail.com" },
    navHeading: "NAVIGATE",
    nav: [
      { label: "About", href: "#about" },
      { label: "Services", href: "#servicios" },
      { label: "Projects", href: "#proyectos" },
      { label: "Contact", href: "#contacto" },
    ],
    connectHeading: "CONNECT",
    connect: [
      { label: "GitHub", href: "https://github.com/mbarradev-debug" },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/miguelbarrarios",
      },
      { label: "Email", href: "mailto:mbarra.git@gmail.com" },
    ],
    copyright: "© 2026 Miguel Barra. All rights reserved.",
  },

  notFound: {
    code: "Error 404",
    title: "This page doesn't exist.",
    body: "The link is broken or the page moved. Everything is reachable from the home page.",
    home: "Back to home",
    sectionsNav: "Site sections",
  },

  error: {
    code: "Something broke",
    title: "We couldn't load this section.",
    body: "A one-off rendering problem. Try again; if it persists, head back home.",
    retry: "Try again",
    home: "Back to home",
  },

  chrome: {
    skipLink: "Skip to content",
    navPrimary: "Primary navigation",
    navMobile: "Mobile navigation",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    backToTop: "Back to top",
    langGroup: "Language",
    switchLanguage: "Ver el sitio en español",
  },
};
