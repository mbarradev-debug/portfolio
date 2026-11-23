import { route } from "@/lib/i18n";
import {
  CV_FILES,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PULSO_PATH,
  PULSO_SCREENSHOTS,
  PULSO_SITE_URL,
  STACK_ALSO,
  STACK_CURRENT,
} from "./shared";
import type { Content } from "./types";

/**
 * English. Mirrors es.ts section by section and follows the English CV
 * (public/miguel-barra-cv-en.pdf); proper and product names stay untranslated
 * (see AGENTS.md).
 */
const r = (path: string) => route("en", path);

export const en = {
  site: {
    name: "Miguel Barra",
    locale: "en_US",
    lang: "en",
    title: "Miguel Barra · Full stack developer",
    description:
      "Full stack developer in Santiago, Chile, with 4 years building production web applications with React, Next.js, TypeScript and Node.js.",
    footer: "© 2026 Miguel Barra. All rights reserved.",
    themeToggleLabel: "Toggle theme",
    menuLabel: "Open menu",
    mainNavLabel: "Main navigation",
    skipToContent: "Skip to content",
    // Each option is named in its own language (the link carries lang="…").
    languageSwitcher: { label: "Language", es: "Español", en: "English" },
  },

  navItems: [
    { label: "Projects", href: r("/#projects"), activeOn: "/projects" },
    { label: "Experience", href: r("/#experience") },
    { label: "Stack", href: r("/#stack") },
    { label: "GitHub", href: GITHUB_URL, icon: "github", external: true },
  ],

  cvNavItem: { label: "CV", href: CV_FILES.en, icon: "download" },

  hero: {
    sceneAlt:
      "Voxel cat typing in front of a retro monitor with a smiley face on its screen, rotatable 3D scene",
    sceneLoading: "Loading 3D scene",
    greeting: "Hi, I'm a full stack developer building web products from Santiago, Chile.",
    name: "Miguel Barra",
    role: "Computer Science and Informatics Engineer",
    tagline: "Full stack developer · React · Next.js · TypeScript",
    jobTitle: "Full stack developer",
    availability: "Open to new opportunities",
    avatarAlt: "Portrait of Miguel Barra",
  },

  intro: {
    heading: "What I do",
    body: [
      "I build production web applications end to end: from the data model and the API to the interface. I've spent 4 years building for the public, healthcare and e-mobility sectors with React, Next.js, TypeScript and Node.js, and I now build microservices with NestJS and Docker, using AI-assisted development daily. My project in production is ",
      { text: "Pulso", href: r(PULSO_PATH) },
      ", a dashboard of Chilean economic indicators with its own API on top of the Central Bank's.",
    ],
    stats: [
      { value: "4 years", label: "building production web applications" },
      { value: "~19 s → ~0.23 s", label: "load time in Pulso after parallelizing the Central Bank calls" },
      { value: "Public sector", label: "healthcare and e-mobility" },
    ],
    cta: { label: "See projects", href: "#projects" },
  },

  projects: {
    id: "projects",
    heading: "Featured projects",
    items: [
      {
        slug: "tasklane",
        title: "Tasklane",
        status: "Personal project",
        description:
          "Task manager split into two NestJS microservices, each with its own PostgreSQL database, plus Next.js as a BFF; the backend starts with Docker Compose.",
      },
      {
        slug: "pulso",
        title: "Pulso",
        status: "In production",
        description: "Dashboard of Chilean economic indicators with its own API on top of the Central Bank's.",
        href: r(PULSO_PATH),
      },
      {
        slug: "pulso-extension",
        title: "Pulso UF y Dólar",
        status: "Published",
        description: "Pulso's browser extension (WXT), published on the Chrome Web Store and Firefox Add-ons.",
      },
      {
        slug: "linear-issue-to-pr",
        title: "linear-issue-to-pr",
        status: "Published",
        description:
          "Open source skill for AI agents that takes a Linear issue all the way to a pull request; works with Claude Code, Cursor and Codex.",
      },
    ],
  },

  clientCases: {
    heading: "Problems I've solved",
    subheading: "Client work, told through the problem rather than the job title.",
    tagsLabel: "Technologies",
    items: [
      {
        period: "2024 – 2026",
        client: "DOM Digital · ITS Solutions, via Forcast",
        title: "Municipal public works planning: from Microsoft Project to an in-house web platform",
        description:
          "I led the migration: defined the architecture (Next.js, PostgreSQL, Azure), designed the data model and built the entire backend (REST endpoints, security and Firebase authentication), coordinating an intern.",
        tags: ["Next.js", "PostgreSQL", "Azure", "Firebase Auth"],
      },
      {
        period: "2024 – 2026",
        client: "E-Hive, via Forcast",
        title: "Charging an electric car by scanning a QR code, now from the web too",
        description:
          "I brought QR code scanning, previously mobile-only, to the Angular web platform and added REST endpoints to the Flask microservice that verifies the license plate before enabling charging.",
        tags: ["Angular", "Flask", "REST APIs"],
      },
      {
        period: "2021 – 2023",
        client: "iSalud · Codelco's health insurer, via Valuesite",
        title: "Modernizing a health insurer's member portal",
        description:
          "I modernized the online portal where members manage claims, reimbursements and certificates: fixed broken JavaScript, upgraded Bootstrap and added doctor search (by RUT or medical specialty) and document generation, with Oracle PL/SQL stored procedures and methods in existing ASP.NET MVC microservices.",
        tags: ["ASP.NET MVC", "Oracle PL/SQL", "Bootstrap"],
      },
    ],
  },

  timeline: {
    id: "experience",
    heading: "Experience",
    items: [
      {
        year: "2021",
        text: ["Joins Valuesite as a full stack developer, building healthcare software solutions."],
      },
      {
        year: "2023",
        text: [
          "Professional internship at Ewreka: builds the shopping cart module of its corporate gifts app in Flutter and designs its database with the team.",
        ],
      },
      {
        year: "2024",
        text: ["Joins Forcast, a software development consultancy, as a full stack developer."],
      },
      {
        year: "2025",
        text: ["Graduates with a B.Eng. in Computer Science and Informatics from Universidad Andrés Bello."],
      },
      {
        year: "Today",
        text: [
          "Builds personal projects such as ",
          { text: "Pulso", href: r(PULSO_PATH) },
          " and Tasklane while looking for a new team.",
        ],
      },
    ],
  },

  stack: {
    id: "stack",
    heading: "Stack",
    groups: [
      { label: "What I build with today", variant: "primary", items: STACK_CURRENT },
      { label: "Also shipped to production", variant: "secondary", items: STACK_ALSO },
    ],
  },

  hobbies: {
    heading: "Outside of code",
    body: "Guitar, hiking the hills around Santiago, and 2000s Japanese horror films: the more found footage, the better.",
  },

  contact: {
    id: "contact",
    heading: "Find me online",
    links: [
      { label: "@mbarradev-debug", href: GITHUB_URL, icon: "github" },
      { label: "in/miguelbarrarios", href: LINKEDIN_URL, icon: "linkedin" },
      { label: EMAIL, href: `mailto:${EMAIL}`, icon: "mail" },
    ],
    cta: {
      heading: "Want to talk?",
      body: "If you're looking for a full stack developer who takes web applications to production, get in touch.",
      primary: { label: "Download CV (PDF)", href: CV_FILES.en },
      secondary: { label: "Email me", href: `mailto:${EMAIL}` },
    },
  },

  notFound: {
    metaTitle: "Page not found",
    heading: "Not found",
    body: "The page you're looking for doesn't exist.",
    back: { label: "Back to home", href: r("/") },
  },

  error: {
    heading: "Something went wrong",
    body: "We couldn't show this page. Try again or go back to the home page.",
    retry: "Try again",
    back: { label: "Back to home", href: r("/") },
  },

  pulsoCase: {
    metaTitle: "Pulso",
    metaDescription:
      "Case study of Pulso, a dashboard of Chilean economic indicators with its own API on top of the Central Bank's: load time dropped from ~19 s to ~0.23 s by parallelizing its 10 calls.",
    breadcrumb: {
      label: "Breadcrumb",
      parent: "Projects",
      parentHref: r("/#projects"),
      current: "Pulso",
    },
    status: "In production",
    title: "Chilean economic indicators dashboard",
    summary:
      "Pulso is a dashboard of Chilean economic indicators that runs on its own API, built on top of the Central Bank of Chile's.",
    meta: [
      { label: "Site", value: "pulso-cyan-zeta.vercel.app ↗", href: PULSO_SITE_URL },
      { label: "Stack", value: "Next.js 16, React 19, TypeScript, SWR, Chart.js" },
      { label: "Quality", value: "Vitest, Playwright (E2E), CI on GitHub Actions, deployed on Vercel" },
    ],
    screenshots: {
      main: {
        ...PULSO_SCREENSHOTS.main,
        alt: "Pulso dashboard (interface in Spanish): chart of the observed dollar rate over the last month and a grid with Chile's economic indicators.",
      },
      chart: {
        ...PULSO_SCREENSHOTS.chart,
        alt: "Pulso historical chart showing the observed dollar rate over the last month, with 1-month, 1-year and 2-year filters.",
      },
      converter: {
        ...PULSO_SCREENSHOTS.converter,
        alt: "Pulso converter: 100,000 Chilean pesos equal 2.4381 UF.",
      },
    },
    problem: {
      heading: "The problem",
      body: "The first version relied on mindicador.cl, which proved unreliable in production.",
    },
    decision: {
      heading: "The decision",
      body: "I replaced mindicador.cl with my own API on top of the Central Bank of Chile's, with caching and a per-indicator fallback. Along the way I handled two quirks of that API:",
      findings: [
        { title: "ISO-8859-1", description: "Its responses come in this encoding, which had to be handled." },
        { title: "Body-only errors", description: "Errors are reported in the response body." },
      ],
    },
    result: {
      heading: "The result",
      before: "~19 s",
      after: "~0.23 s",
      body: "Parallelizing its 10 calls to the Central Bank API cut load time from ~19 s to ~0.23 s.",
    },
    back: { label: "‹ Back to home", href: r("/") },
    /** The extension has no case page yet, so "next" points to the projects list. */
    next: { label: "Next: Pulso UF y Dólar", href: r("/#projects") },
  },
} satisfies Content;
