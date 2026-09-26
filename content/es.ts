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
 * Spanish (primary language). Source of truth for the original copy:
 * references/portfolio-miguel-barra/{index,pulso}.html
 */
const r = (path: string) => route("es", path);

export const es = {
  site: {
    name: "Miguel Barra",
    locale: "es_CL",
    lang: "es",
    title: "Miguel Barra · Desarrollador full stack",
    description:
      "Ingeniero en Computación e Informática y desarrollador full stack en Santiago de Chile. Construyo productos web de punta a punta: React, Next.js y TypeScript.",
    footer: "© 2026 Miguel Barra. Todos los derechos reservados.",
    themeToggleLabel: "Cambiar tema",
    menuLabel: "Abrir menú",
    mainNavLabel: "Navegación principal",
    skipToContent: "Saltar al contenido",
    // Each option is named in its own language (the link carries lang="…").
    languageSwitcher: { label: "Idioma", es: "Español", en: "English" },
  },

  navItems: [
    { label: "Proyectos", href: r("/#proyectos"), activeOn: "/projects" },
    { label: "Trayectoria", href: r("/#trayectoria") },
    { label: "Stack", href: r("/#stack") },
    { label: "GitHub", href: GITHUB_URL, icon: "github", external: true },
  ],

  cvNavItem: { label: "CV", href: CV_FILES.es, icon: "download" },

  hero: {
    sceneAlt:
      "Gato en voxels tecleando frente a un monitor retro con una carita en la pantalla, escena 3D rotable",
    sceneLoading: "Cargando escena 3D",
    greeting:
      "Hola, soy desarrollador full stack y construyo productos web desde Santiago de Chile.",
    name: "Miguel Barra",
    role: "Ingeniero en Computación e Informática",
    tagline: "Desarrollador full stack · React · Next.js · TypeScript",
    jobTitle: "Desarrollador full stack",
    availability: "Disponible para nuevas oportunidades",
    /** Placeholder until a real photo is added (see README). */
    avatarInitials: "MB",
    avatarAlt: "Foto de Miguel Barra (pendiente)",
  },

  intro: {
    heading: "Qué hago",
    body: [
      "Construyo productos web de punta a punta: desde la base de datos y la API hasta la interfaz que usa la gente. Llevo más de dos años entregando software en producción para municipalidades, salud y energía, casi siempre a cargo de las decisiones técnicas del backend. Mi terreno es Next.js con TypeScript, y mi proyecto propio es ",
      { text: "Pulso", href: r(PULSO_PATH) },
      ", un dashboard de indicadores económicos de Chile alimentado directo desde la API del Banco Central.",
    ],
    stats: [
      { value: "2+ años", label: "entregando productos en producción" },
      { value: "19 s → 0,23 s", label: "de carga en Pulso tras paralelizar el Banco Central" },
      { value: "Público y privado", label: "municipalidades, una Isapre y electromovilidad" },
    ],
    cta: { label: "Ver proyectos", href: "#proyectos" },
  },

  projects: {
    id: "proyectos",
    heading: "Proyectos propios",
    items: [
      {
        slug: "pulso",
        title: "Pulso",
        status: "En producción",
        description:
          "Dashboard de 10 indicadores económicos de Chile, con API propia sobre el Banco Central.",
        href: r(PULSO_PATH),
      },
      {
        slug: "pulso-extension",
        title: "Pulso UF y Dólar",
        status: "Publicada",
        description:
          "Extensión de Chrome con UF, dólar y conversor a CLP, conectada a la API de Pulso.",
      },
    ],
  },

  clientCases: {
    heading: "Problemas que he resuelto",
    subheading: "Trabajo con clientes, contado por el problema y no por el cargo.",
    tagsLabel: "Tecnologías",
    items: [
      {
        period: "2025 – 2026",
        client: "DOM Digital · ITS Solutions, vía Forcast",
        title: "Municipalidades que dejan Microsoft Project por una plataforma propia",
        description:
          "Definí la arquitectura, diseñé la base de datos y lideré el backend completo (endpoints, seguridad y autenticación), coordinando a un practicante en el frontend.",
        tags: ["Líder técnico backend", "Next.js", "PostgreSQL", "Firebase Auth"],
      },
      {
        period: "2025 – 2026",
        client: "E-Hive, vía Forcast",
        title: "Cargar un auto eléctrico escaneando un QR, ahora también desde la web",
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
    ],
  },

  timeline: {
    id: "trayectoria",
    heading: "Trayectoria",
    items: [
      {
        year: "2022",
        text: ["Entra a Valuesite como desarrollador full stack, construyendo para el sector salud."],
      },
      {
        year: "2024",
        text: [
          "Práctica profesional en Ewreka: módulo de carrito de compra en Flutter para regalos corporativos sustentables.",
        ],
      },
      {
        year: "2025",
        text: ["Se titula de Ingeniería en Computación e Informática en la Universidad Andrés Bello."],
      },
      {
        year: "2025",
        text: [
          "Se suma a Forcast, consultora de software, liderando backend para clientes públicos y privados.",
        ],
      },
      {
        year: "Hoy",
        text: ["Construye ", { text: "Pulso", href: r(PULSO_PATH) }, " y su extensión, y busca su próximo equipo."],
      },
    ],
  },

  stack: {
    id: "stack",
    heading: "Stack",
    groups: [
      { label: "Con lo que construyo hoy", variant: "primary", items: STACK_CURRENT },
      { label: "También lo he llevado a producción", variant: "secondary", items: STACK_ALSO },
    ],
  },

  hobbies: {
    heading: "Fuera del código",
    body: "Guitarra, subir cerros en Santiago y el cine de terror japonés de los 2000, mientras más found footage, mejor.",
  },

  contact: {
    id: "contacto",
    heading: "En la web",
    links: [
      { label: "@mbarradev-debug", href: GITHUB_URL, icon: "github" },
      { label: "in/miguelbarrarios", href: LINKEDIN_URL, icon: "linkedin" },
      { label: EMAIL, href: `mailto:${EMAIL}`, icon: "mail" },
    ],
    cta: {
      heading: "¿Conversamos?",
      body: "Si buscas a alguien que tome decisiones técnicas y las lleve a producción, escríbeme.",
      primary: { label: "Descargar CV (PDF)", href: CV_FILES.es },
      secondary: { label: "Escríbeme", href: `mailto:${EMAIL}` },
    },
  },

  notFound: {
    metaTitle: "Página no encontrada",
    heading: "No encontrado",
    body: "La página que buscas no existe.",
    back: { label: "Volver al inicio", href: r("/") },
  },

  pulsoCase: {
    metaTitle: "Pulso",
    metaDescription:
      "Caso de estudio de Pulso, dashboard de 10 indicadores económicos de Chile con API propia sobre el Banco Central: la carga bajó de 19 s a 0,23 s al paralelizar.",
    breadcrumb: {
      label: "Ruta de navegación",
      parent: "Proyectos",
      parentHref: r("/#proyectos"),
      current: "Pulso",
    },
    status: "En producción",
    title: "Indicadores económicos de Chile que cargan siempre",
    summary:
      "Pulso muestra en tiempo casi real 10 indicadores de la economía chilena (UF, dólar, euro, IPC, UTM, Imacec, TPM, cobre, IVP y desempleo) con grilla, gráfico histórico, favoritos y un conversor a pesos. Detrás hay una API propia que es la única que habla con el Banco Central.",
    meta: [
      { label: "Sitio", value: "pulso-cyan-zeta.vercel.app ↗", href: PULSO_SITE_URL },
      { label: "Stack", value: "Next.js 16 (App Router), React 19, TypeScript, SWR, Chart.js" },
      { label: "Calidad", value: "Vitest, Playwright (E2E), CI en GitHub Actions, deploy en Vercel" },
      { label: "Rol", value: "Todo: producto, arquitectura, backend y frontend" },
    ],
    screenshots: {
      main: {
        ...PULSO_SCREENSHOTS.main,
        alt: "Dashboard de Pulso: gráfico del dólar observado en el último mes y grilla con los indicadores económicos de Chile.",
      },
      chart: {
        ...PULSO_SCREENSHOTS.chart,
        alt: "Gráfico histórico de Pulso con la evolución del dólar observado en el último mes y filtros de 1 mes, 1 año y 2 años.",
      },
      converter: {
        ...PULSO_SCREENSHOTS.converter,
        alt: "Conversor de Pulso: 100.000 pesos chilenos equivalen a 2,4381 UF.",
      },
    },
    problem: {
      heading: "El problema",
      body: "La primera versión consumía mindicador.cl y en producción a veces simplemente no cargaba. La API oficial del Banco Central es estable, pero no está pensada para llamarse desde el navegador: si cada visitante pidiera los 10 indicadores y su histórico, las llamadas se multiplicarían con muy pocos usuarios.",
    },
    decision: {
      heading: "La decisión",
      body: "Construí una API intermedia propia: el frontend solo habla con ella y ella es la única que llama al Banco Central, con cache en memoria y fallback por indicador, así que si falla uno no se pierden los otros nueve.",
      findings: [
        { title: "ISO-8859-1", description: "Respuestas que hay que decodificar a mano antes de leerlas como JSON." },
        { title: "Errores con 200 OK", description: "Los fallos vienen señalizados solo en el body, no en el status HTTP." },
        { title: "Valores fantasma", description: "Fechas sin dato real que repiten el último valor y hay que descartar." },
      ],
    },
    result: {
      heading: "El resultado",
      before: "19 s",
      after: "0,23 s",
      body: "Al paralelizar las 10 llamadas al Banco Central, la carga bajó de unos 19 segundos a 0,23. Desde ahí el paralelismo quedó como requisito de la arquitectura, no como optimización.",
    },
    back: { label: "‹ Volver al inicio", href: r("/") },
    /** The extension has no case page yet, so "next" points to the projects list. */
    next: { label: "Siguiente: Pulso UF y Dólar", href: r("/#proyectos") },
  },
} satisfies Content;
