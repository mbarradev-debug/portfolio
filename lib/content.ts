/**
 * All site copy lives here as typed data. Components only render it.
 * Source of truth: references/portfolio-miguel-barra/{index,pulso}.html
 */

/** Paragraph made of plain strings and inline links. */
export type RichText = ReadonlyArray<string | { text: string; href: string }>;

export type IconName = "github" | "linkedin" | "mail" | "download";

export interface NavItem {
  label: string;
  href: string;
  icon?: IconName;
  external?: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface ProjectCard {
  slug: "pulso" | "pulso-extension";
  title: string;
  status: string;
  description: string;
  /** Only projects with a case study page have an href. */
  href?: string;
}

export interface ClientCase {
  period: string;
  client: string;
  title: string;
  description: string;
  tags: readonly string[];
}

export interface TimelineEntry {
  year: string;
  text: RichText;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: IconName;
}

export interface CaseMeta {
  label: string;
  value: string;
  href?: string;
}

export interface Finding {
  title: string;
  description: string;
}

export const CV_PATH = "/cv-miguel-barra.pdf";
export const EMAIL = "mbarra.git@gmail.com";
export const GITHUB_URL = "https://github.com/mbarradev-debug";
export const LINKEDIN_URL = "https://linkedin.com/in/miguelbarrarios";
export const PULSO_PATH = "/projects/pulso";

export const site = {
  name: "Miguel Barra",
  locale: "es_CL",
  lang: "es",
  title: "Miguel Barra · Desarrollador full stack",
  description:
    "Ingeniero en Computación e Informática y desarrollador full stack en Santiago de Chile. React, Next.js y TypeScript.",
  footer: "© 2026 Miguel Barra. Todos los derechos reservados.",
  themeToggleLabel: "Cambiar tema",
  menuLabel: "Abrir menú",
  mainNavLabel: "Navegación principal",
  skipToContent: "Saltar al contenido",
} as const;

export const navItems: readonly NavItem[] = [
  { label: "Proyectos", href: "/#proyectos" },
  { label: "Trayectoria", href: "/#trayectoria" },
  { label: "Stack", href: "/#stack" },
  { label: "GitHub", href: GITHUB_URL, icon: "github", external: true },
];

export const cvNavItem: NavItem = { label: "CV", href: CV_PATH, icon: "download" };

export const hero = {
  sceneAlt:
    "Gato en voxels tecleando frente a un monitor retro con una carita en la pantalla, escena 3D rotable",
  sceneLoading: "Cargando escena 3D",
  greeting:
    "Hola, soy desarrollador full stack y construyo productos web desde Santiago de Chile.",
  name: "Miguel Barra",
  role: "Ingeniero en Computación e Informática",
  tagline: "Desarrollador full stack · React · Next.js · TypeScript",
  availability: "Disponible para nuevas oportunidades",
  /** Placeholder until a real photo is added (see README). */
  avatarInitials: "MB",
  avatarAlt: "Foto de Miguel Barra (pendiente)",
} as const;

export const intro = {
  heading: "Qué hago",
  body: [
    "Construyo productos web de punta a punta: desde la base de datos y la API hasta la interfaz que usa la gente. Llevo más de dos años entregando software en producción para municipalidades, salud y energía, casi siempre a cargo de las decisiones técnicas del backend. Mi terreno es Next.js con TypeScript, y mi proyecto propio es ",
    { text: "Pulso", href: PULSO_PATH },
    ", un dashboard de indicadores económicos de Chile alimentado directo desde la API del Banco Central.",
  ] satisfies RichText,
  stats: [
    { value: "2+ años", label: "entregando productos en producción" },
    {
      value: "19 s → 0,23 s",
      label: "de carga en Pulso tras paralelizar el Banco Central",
    },
    {
      value: "Público y privado",
      label: "municipalidades, una Isapre y electromovilidad",
    },
  ] satisfies Stat[],
  cta: { label: "Ver proyectos", href: "#proyectos" },
} as const;

export const projects = {
  id: "proyectos",
  heading: "Proyectos propios",
  items: [
    {
      slug: "pulso",
      title: "Pulso",
      status: "En producción",
      description:
        "Dashboard de 10 indicadores económicos de Chile, con API propia sobre el Banco Central.",
      href: PULSO_PATH,
    },
    {
      slug: "pulso-extension",
      title: "Pulso UF y Dólar",
      status: "Publicada",
      description:
        "Extensión de Chrome con UF, dólar y conversor a CLP, conectada a la API de Pulso.",
    },
  ] satisfies ProjectCard[],
} as const;

export const clientCases = {
  heading: "Problemas que he resuelto",
  subheading: "Trabajo con clientes, contado por el problema y no por el cargo.",
  /** Accessible name for each case's tag list (not visible). */
  tagsLabel: "Tecnologías",
  items: [
    {
      period: "2025 – 2026",
      client: "DOM Digital · ITS Solutions, vía Forcast",
      title:
        "Municipalidades que dejan Microsoft Project por una plataforma propia",
      description:
        "Definí la arquitectura, diseñé la base de datos y lideré el backend completo (endpoints, seguridad y autenticación), coordinando a un practicante en el frontend.",
      tags: ["Líder técnico backend", "Next.js", "PostgreSQL", "Firebase Auth"],
    },
    {
      period: "2025 – 2026",
      client: "E-Hive, vía Forcast",
      title:
        "Cargar un auto eléctrico escaneando un QR, ahora también desde la web",
      description:
        "Llevé a la plataforma web el escaneo QR que existía en la app móvil: frontend en Angular y endpoints REST en el microservicio que verifica la patente antes de habilitar la carga.",
      tags: ["Angular", "Flask", "REST APIs"],
    },
    {
      period: "2022 – 2023",
      client: "iSalud · Isapre de Codelco, vía Valuesite",
      title: "Una sucursal virtual de salud que había quedado atrás",
      description:
        "Corregí el frontend legacy y sumé búsqueda de médicos y generación de documentos, desde los procedimientos en Oracle hasta los microservicios en .NET.",
      tags: ["ASP.NET MVC", "Oracle PL/SQL", "Microservicios"],
    },
  ] satisfies ClientCase[],
} as const;

export const timeline = {
  id: "trayectoria",
  heading: "Trayectoria",
  items: [
    {
      year: "2022",
      text: [
        "Entra a Valuesite como desarrollador full stack, construyendo para el sector salud.",
      ],
    },
    {
      year: "2024",
      text: [
        "Práctica profesional en Ewreka: módulo de carrito de compra en Flutter para regalos corporativos sustentables.",
      ],
    },
    {
      year: "2025",
      text: [
        "Se titula de Ingeniería en Computación e Informática en la Universidad Andrés Bello.",
      ],
    },
    {
      year: "2025",
      text: [
        "Se suma a Forcast, consultora de software, liderando backend para clientes públicos y privados.",
      ],
    },
    {
      year: "Hoy",
      text: [
        "Construye ",
        { text: "Pulso", href: PULSO_PATH },
        " y su extensión, y busca su próximo equipo.",
      ],
    },
  ] satisfies TimelineEntry[],
} as const;

export const stack = {
  id: "stack",
  heading: "Stack",
  groups: [
    {
      label: "Con lo que construyo hoy",
      variant: "primary",
      items: [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "shadcn/ui",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "Prisma",
        "Vercel",
        "GitHub Actions",
      ],
    },
    {
      label: "También lo he llevado a producción",
      variant: "secondary",
      items: [
        "Angular",
        "NestJS",
        "Python",
        "Flask",
        "ASP.NET MVC",
        "Oracle PL/SQL",
        "Firebase Auth",
        "Docker",
        "Azure",
        "GCP",
        "Flutter",
        "Ionic",
      ],
    },
  ],
} as const;

export const hobbies = {
  heading: "Fuera del código",
  body: "Guitarra, subir cerros en Santiago y el cine de terror japonés de los 2000, mientras más found footage, mejor.",
} as const;

export const contact = {
  id: "contacto",
  heading: "En la web",
  links: [
    { label: "@mbarradev-debug", href: GITHUB_URL, icon: "github" },
    { label: "in/miguelbarrarios", href: LINKEDIN_URL, icon: "linkedin" },
    { label: EMAIL, href: `mailto:${EMAIL}`, icon: "mail" },
  ] satisfies SocialLink[],
  cta: {
    heading: "¿Conversamos?",
    body: "Si buscas a alguien que tome decisiones técnicas y las lleve a producción, escríbeme.",
    primary: { label: "Descargar CV (PDF)", href: CV_PATH },
    secondary: { label: "Escríbeme", href: `mailto:${EMAIL}` },
  },
} as const;

export const notFound = {
  metaTitle: "Página no encontrada",
  heading: "No encontrado",
  body: "La página que buscas no existe.",
  back: { label: "Volver al inicio", href: "/" },
} as const;

export const pulsoCase = {
  metaTitle: "Pulso",
  metaDescription:
    "Caso de estudio de Pulso, dashboard de indicadores económicos de Chile con API propia sobre el Banco Central.",
  breadcrumb: {
    label: "Ruta de navegación",
    parent: "Proyectos",
    parentHref: "/#proyectos",
    current: "Pulso",
  },
  status: "En producción",
  title: "Indicadores económicos de Chile que cargan siempre",
  summary:
    "Pulso muestra en tiempo casi real 10 indicadores de la economía chilena (UF, dólar, euro, IPC, UTM, Imacec, TPM, cobre, IVP y desempleo) con grilla, gráfico histórico, favoritos y un conversor a pesos. Detrás hay una API propia que es la única que habla con el Banco Central.",
  meta: [
    {
      label: "Sitio",
      value: "pulso-cyan-zeta.vercel.app ↗",
      href: "https://pulso-cyan-zeta.vercel.app",
    },
    {
      label: "Stack",
      value: "Next.js 16 (App Router), React 19, TypeScript, SWR, Chart.js",
    },
    {
      label: "Calidad",
      value: "Vitest, Playwright (E2E), CI en GitHub Actions, deploy en Vercel",
    },
    { label: "Rol", value: "Todo: producto, arquitectura, backend y frontend" },
  ] satisfies CaseMeta[],
  /** Placeholders until real screenshots are added (see README). */
  screenshots: {
    main: "[CAPTURA DEL DASHBOARD DE PULSO]",
    chart: "[CAPTURA DEL GRÁFICO HISTÓRICO]",
    converter: "[CAPTURA DEL CONVERSOR]",
  },
  problem: {
    heading: "El problema",
    body: "La primera versión consumía mindicador.cl y en producción a veces simplemente no cargaba. La API oficial del Banco Central es estable, pero no está pensada para llamarse desde el navegador: si cada visitante pidiera los 10 indicadores y su histórico, las llamadas se multiplicarían con muy pocos usuarios.",
  },
  decision: {
    heading: "La decisión",
    body: "Construí una API intermedia propia: el frontend solo habla con ella y ella es la única que llama al Banco Central, con cache en memoria y fallback por indicador, así que si falla uno no se pierden los otros nueve.",
    findings: [
      {
        title: "ISO-8859-1",
        description:
          "Respuestas que hay que decodificar a mano antes de leerlas como JSON.",
      },
      {
        title: "Errores con 200 OK",
        description:
          "Los fallos vienen señalizados solo en el body, no en el status HTTP.",
      },
      {
        title: "Valores fantasma",
        description:
          "Fechas sin dato real que repiten el último valor y hay que descartar.",
      },
    ] satisfies Finding[],
  },
  result: {
    heading: "El resultado",
    before: "19 s",
    after: "0,23 s",
    body: "Al paralelizar las 10 llamadas al Banco Central, la carga bajó de unos 19 segundos a 0,23. Desde ahí el paralelismo quedó como requisito de la arquitectura, no como optimización.",
  },
  back: { label: "‹ Volver al inicio", href: "/" },
  /** The extension has no case page yet, so "next" points to the projects list. */
  next: { label: "Siguiente: Pulso UF y Dólar", href: "/#proyectos" },
} as const;
