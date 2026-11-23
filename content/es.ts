import { route } from "@/lib/i18n";
import {
  CV_FILES,
  EMAIL,
  GITHUB_URL,
  LINKEDIN_URL,
  PULSO_PATH,
  PULSO_REPO_URL,
  PULSO_SCREENSHOTS,
  PULSO_SITE_URL,
  STACK_ALSO,
  STACK_CURRENT,
} from "./shared";
import type { Content } from "./types";

/**
 * Spanish (primary language). Every claim about the profile must come from the
 * CV (public/miguel-barra-cv-es.pdf); the layout comes from references/.
 */
const r = (path: string) => route("es", path);

export const es = {
  site: {
    name: "Miguel Barra",
    locale: "es_CL",
    lang: "es",
    title: "Miguel Barra · Desarrollador full stack",
    description:
      "Desarrollador full stack en Santiago de Chile, con 4 años creando aplicaciones web en producción con React, Next.js, TypeScript y Node.js.",
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
    avatarAlt: "Retrato de Miguel Barra",
  },

  intro: {
    heading: "Qué hago",
    body: [
      "Desarrollo aplicaciones web en producción de punta a punta: desde el modelo de datos y la API hasta la interfaz. Llevo 4 años construyendo para los sectores público, salud y electromovilidad con React, Next.js, TypeScript y Node.js, y hoy construyo microservicios con NestJS y Docker, apoyado a diario en desarrollo con IA. Mi proyecto en producción es ",
      { text: "Pulso", href: r(PULSO_PATH) },
      ", un dashboard de indicadores económicos de Chile con API propia sobre la del Banco Central.",
    ],
    stats: [
      { value: "4 años", label: "creando aplicaciones web en producción" },
      { value: "~19 s → ~0,23 s", label: "de carga en Pulso tras paralelizar las llamadas al Banco Central" },
      { value: "3 sectores", label: "público, salud y electromovilidad" },
    ],
    cta: { label: "Ver proyectos", href: "#proyectos" },
  },

  projects: {
    id: "proyectos",
    heading: "Proyectos destacados",
    items: [
      {
        slug: "pulso",
        title: "Pulso",
        status: "En producción",
        description: "Dashboard de indicadores económicos de Chile con API propia sobre la del Banco Central.",
        href: r(PULSO_PATH),
      },
      {
        slug: "pulso-extension",
        title: "Pulso UF y Dólar",
        status: "Publicada",
        description: "Extensión de navegador de Pulso (WXT), publicada en Chrome Web Store y Firefox Add-ons.",
      },
      {
        slug: "tasklane",
        title: "Tasklane",
        status: "Proyecto propio",
        description:
          "Gestor de tareas con dos microservicios NestJS, cada uno con su base PostgreSQL, y Next.js como BFF; el backend se levanta con Docker Compose.",
      },
      {
        slug: "linear-issue-to-pr",
        title: "linear-issue-to-pr",
        status: "Publicada",
        description:
          "Skill open source para agentes de IA que lleva un issue de Linear hasta un pull request; compatible con Claude Code, Cursor y Codex.",
      },
    ],
  },

  clientCases: {
    heading: "Problemas que he resuelto",
    subheading: "Trabajo con clientes, contado por el problema y no por el cargo.",
    tagsLabel: "Tecnologías",
    items: [
      {
        period: "2024 – 2026",
        client: "DOM Digital · ITS Solutions, vía Forcast",
        title: "Planificación de obras municipales: de Microsoft Project a una plataforma web propia",
        description:
          "Lideré la migración: definí la arquitectura (Next.js, PostgreSQL, Azure), diseñé el modelo de datos y desarrollé el backend completo (endpoints REST, seguridad y autenticación Firebase), coordinando a un practicante.",
        tags: ["Next.js", "PostgreSQL", "Azure", "Firebase Auth"],
      },
      {
        period: "2024 – 2026",
        client: "E-Hive, vía Forcast",
        title: "Cargar un auto eléctrico escaneando un QR, ahora también desde la web",
        description:
          "Llevé a la web en Angular el escaneo QR que solo existía en la app móvil y agregué al microservicio Flask los endpoints REST que validan la patente antes de habilitar la carga.",
        tags: ["Angular", "Flask", "APIs REST"],
      },
      {
        period: "2021 – 2023",
        client: "iSalud · Isapre de Codelco, vía Valuesite",
        title: "Modernizar la sucursal virtual de una Isapre",
        description:
          "Modernicé la Sucursal Virtual donde los afiliados gestionan bonos, reembolsos y certificados: reparé el JavaScript que no funcionaba, actualicé Bootstrap y agregué la búsqueda de médicos (por RUT o área médica) y la generación de documentos, con procedimientos almacenados en Oracle PL/SQL y métodos en los microservicios ASP.NET MVC existentes.",
        tags: ["ASP.NET MVC", "Oracle PL/SQL", "Bootstrap"],
      },
    ],
  },

  timeline: {
    id: "trayectoria",
    heading: "Trayectoria",
    items: [
      {
        year: "2021",
        text: ["Entra a Valuesite como desarrollador full stack, desarrollando soluciones para el sector salud."],
      },
      {
        year: "2023",
        text: [
          "Práctica profesional en Ewreka: desarrolla en Flutter el carrito de productos de su app de regalos corporativos y diseña su base de datos junto al equipo.",
        ],
      },
      {
        year: "2024",
        text: ["Se suma a Forcast, consultora de desarrollo de software, como desarrollador full stack."],
      },
      {
        year: "2025",
        text: ["Se titula de Ingeniería en Computación e Informática en la Universidad Andrés Bello."],
      },
      {
        year: "Hoy",
        text: [
          "Construye proyectos propios como ",
          { text: "Pulso", href: r(PULSO_PATH) },
          " y Tasklane, y busca su próximo equipo.",
        ],
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
      body: "Si buscas un desarrollador full stack que lleve aplicaciones web a producción, escríbeme.",
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
      "Caso de estudio de Pulso, dashboard de indicadores económicos de Chile con API propia sobre la del Banco Central: la carga bajó de ~19 s a ~0,23 s al paralelizar sus 10 llamadas.",
    breadcrumb: {
      label: "Ruta de navegación",
      parent: "Proyectos",
      parentHref: r("/#proyectos"),
      current: "Pulso",
    },
    status: "En producción",
    title: "Dashboard de indicadores económicos de Chile",
    summary:
      "Pulso es un dashboard de indicadores económicos de Chile que funciona sobre una API propia, construida encima de la del Banco Central de Chile.",
    meta: [
      { label: "Sitio", value: "pulso-cyan-zeta.vercel.app ↗", href: PULSO_SITE_URL },
      { label: "Código", value: "github.com/mbarradev-debug/pulso ↗", href: PULSO_REPO_URL },
      { label: "Stack", value: "Next.js 16, React 19, TypeScript, SWR, Chart.js" },
      { label: "Calidad", value: "Vitest, Playwright (E2E), CI en GitHub Actions, despliegue en Vercel" },
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
      body: "La primera versión dependía de mindicador.cl, que resultó inestable en producción.",
    },
    decision: {
      heading: "La decisión",
      body: "Reemplacé mindicador.cl por una API propia sobre la del Banco Central de Chile, con cache y fallback por indicador. En el camino resolví dos particularidades de esa API:",
      findings: [
        { title: "ISO-8859-1", description: "Sus respuestas vienen en esta codificación y hubo que resolverla." },
        { title: "Errores en el body", description: "Los errores llegan en el cuerpo de la respuesta." },
      ],
    },
    result: {
      heading: "El resultado",
      before: "~19 s",
      after: "~0,23 s",
      body: "Al paralelizar sus 10 llamadas a la API del Banco Central, la carga bajó de ~19 s a ~0,23 s.",
    },
    back: { label: "‹ Volver al inicio", href: r("/") },
    /** The extension has no case page yet, so "next" points to the projects list. */
    next: { label: "Siguiente: Pulso UF y Dólar", href: r("/#proyectos") },
  },
} satisfies Content;
