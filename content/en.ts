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
 * English. Mirrors es.ts section by section; proper and product names
 * (Pulso, DOM Digital, E-Hive, iSalud, Forcast, Valuesite, Ewreka,
 * Universidad Andrés Bello) stay untranslated.
 */
const r = (path: string) => route("en", path);

export const en = {
  site: {
    name: "Miguel Barra",
    locale: "en_US",
    lang: "en",
    title: "Miguel Barra · Full stack developer",
    description:
      "Computer Science Engineer and full stack developer in Santiago, Chile. I build web products end to end, from database to UI: React, Next.js and TypeScript.",
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

  // The English CV isn't available yet; this downloads the Spanish one.
  cvNavItem: { label: "CV", href: CV_FILES.en, icon: "download" },

  hero: {
    sceneAlt:
      "Voxel cat typing in front of a retro monitor with a smiley face on its screen, rotatable 3D scene",
    sceneLoading: "Loading 3D scene",
    greeting: "Hi, I'm a full stack developer building web products from Santiago, Chile.",
    name: "Miguel Barra",
    role: "Computer Science Engineer",
    tagline: "Full stack developer · React · Next.js · TypeScript",
    jobTitle: "Full stack developer",
    availability: "Open to new opportunities",
    /** Placeholder until a real photo is added (see README). */
    avatarInitials: "MB",
    avatarAlt: "Photo of Miguel Barra (coming soon)",
  },

  intro: {
    heading: "What I do",
    body: [
      "I build web products end to end: from the database and the API to the interface people actually use. I've spent more than two years shipping production software for municipalities, healthcare and energy, usually owning the technical decisions on the backend. Next.js with TypeScript is my home turf, and my own project is ",
      { text: "Pulso", href: r(PULSO_PATH) },
      ", a dashboard of Chilean economic indicators fed straight from the Central Bank's API.",
    ],
    stats: [
      { value: "2+ years", label: "shipping products to production" },
      { value: "19 s → 0.23 s", label: "load time in Pulso after parallelizing the Central Bank calls" },
      { value: "Public and private", label: "municipalities, a private health insurer and e-mobility" },
    ],
    cta: { label: "See projects", href: "#projects" },
  },

  projects: {
    id: "projects",
    heading: "Personal projects",
    items: [
      {
        slug: "pulso",
        title: "Pulso",
        status: "In production",
        description: "Dashboard of 10 Chilean economic indicators, with its own API on top of the Central Bank.",
        href: r(PULSO_PATH),
      },
      {
        slug: "pulso-extension",
        title: "Pulso UF y Dólar",
        status: "Published",
        description:
          "Chrome extension with the UF, the dollar rate and a CLP converter, connected to the Pulso API.",
      },
    ],
  },

  clientCases: {
    heading: "Problems I've solved",
    subheading: "Client work, told through the problem rather than the job title.",
    tagsLabel: "Technologies",
    items: [
      {
        period: "2025 – 2026",
        client: "DOM Digital · ITS Solutions, via Forcast",
        title: "Municipalities moving off Microsoft Project onto a platform of their own",
        description:
          "I defined the architecture, designed the database and led the entire backend (endpoints, security and authentication), while coordinating an intern on the frontend.",
        tags: ["Backend tech lead", "Next.js", "PostgreSQL", "Firebase Auth"],
      },
      {
        period: "2025 – 2026",
        client: "E-Hive, via Forcast",
        title: "Charging an electric car by scanning a QR code, now from the web too",
        description:
          "I brought the QR scanning that already existed in the mobile app to the web platform: an Angular frontend plus REST endpoints in the microservice that verifies the license plate before charging starts.",
        tags: ["Angular", "Flask", "REST APIs"],
      },
      {
        period: "2022 – 2023",
        client: "iSalud · Codelco's health insurer, via Valuesite",
        title: "A virtual health branch that had fallen behind",
        description:
          "I fixed the legacy frontend and added doctor search and document generation, from the Oracle procedures all the way to the .NET microservices.",
        tags: ["ASP.NET MVC", "Oracle PL/SQL", "Microservices"],
      },
    ],
  },

  timeline: {
    id: "experience",
    heading: "Experience",
    items: [
      {
        year: "2022",
        text: ["Joins Valuesite as a full stack developer, building for the healthcare sector."],
      },
      {
        year: "2024",
        text: ["Internship at Ewreka: a Flutter shopping cart module for sustainable corporate gifts."],
      },
      {
        year: "2025",
        text: ["Earns a degree in Computer Science Engineering from Universidad Andrés Bello."],
      },
      {
        year: "2025",
        text: ["Joins Forcast, a software consultancy, leading backend work for public and private clients."],
      },
      {
        year: "Today",
        text: ["Builds ", { text: "Pulso", href: r(PULSO_PATH) }, " and its extension while looking for a new team."],
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
      body: "If you're looking for someone who makes technical decisions and takes them to production, get in touch.",
      // Falls back to the Spanish CV until the English PDF exists (see README).
      primary: { label: "Download CV (Spanish, PDF)", href: CV_FILES.en },
      secondary: { label: "Email me", href: `mailto:${EMAIL}` },
    },
  },

  notFound: {
    metaTitle: "Page not found",
    heading: "Not found",
    body: "The page you're looking for doesn't exist.",
    back: { label: "Back to home", href: r("/") },
  },

  pulsoCase: {
    metaTitle: "Pulso",
    metaDescription:
      "Case study of Pulso, a dashboard of 10 Chilean economic indicators with its own API on top of the Central Bank: load time dropped from 19 s to 0.23 s.",
    breadcrumb: {
      label: "Breadcrumb",
      parent: "Projects",
      parentHref: r("/#projects"),
      current: "Pulso",
    },
    status: "In production",
    title: "Chilean economic indicators that always load",
    summary:
      "Pulso shows 10 indicators of the Chilean economy in near real time (UF, dollar, euro, CPI, UTM, Imacec, policy rate, copper, IVP and unemployment) with a grid, a historical chart, favorites and a peso converter. Behind it sits its own API, the only piece that talks to the Central Bank.",
    meta: [
      { label: "Site", value: "pulso-cyan-zeta.vercel.app ↗", href: PULSO_SITE_URL },
      { label: "Stack", value: "Next.js 16 (App Router), React 19, TypeScript, SWR, Chart.js" },
      { label: "Quality", value: "Vitest, Playwright (E2E), CI on GitHub Actions, deployed on Vercel" },
      { label: "Role", value: "Everything: product, architecture, backend and frontend" },
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
      body: "The first version used mindicador.cl, and in production it sometimes just didn't load. The Central Bank's official API is stable, but it isn't meant to be called from the browser: if every visitor requested the 10 indicators and their history, the calls would multiply with only a handful of users.",
    },
    decision: {
      heading: "The decision",
      body: "I built my own intermediate API: the frontend only talks to it, and it's the only thing that calls the Central Bank, with in-memory caching and a per-indicator fallback, so if one indicator fails the other nine still load.",
      findings: [
        { title: "ISO-8859-1", description: "Responses that have to be decoded by hand before they can be read as JSON." },
        { title: "Errors with 200 OK", description: "Failures are only signaled in the body, not in the HTTP status." },
        { title: "Ghost values", description: "Dates with no real data that repeat the last value and have to be discarded." },
      ],
    },
    result: {
      heading: "The result",
      before: "19 s",
      after: "0.23 s",
      body: "Parallelizing the 10 calls to the Central Bank cut load time from about 19 seconds to 0.23. From then on, parallelism became an architectural requirement rather than an optimization.",
    },
    back: { label: "‹ Back to home", href: r("/") },
    /** The extension has no case page yet, so "next" points to the projects list. */
    next: { label: "Next: Pulso UF y Dólar", href: r("/#projects") },
  },
} satisfies Content;
