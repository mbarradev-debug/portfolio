// Tipos de la capa de contenido. Se consumen desde los componentes de sección.

export type Locale = "es" | "en";

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export interface CaseStudy {
  tag: string;
  date: string;
  title: string;
  desc: string;
  image?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  grad?: string;
  mockTag?: string;
  mockHeadline?: string;
  url?: string;
}

export interface Project {
  year: string;
  name: string;
  desc: string;
  tags: string[];
  url?: string;
}

export interface ServiceCard {
  index: string;
  title: string;
  text: string;
}

export interface Link {
  label: string;
  href: string;
}

// ---------------------------------------------------------------------------
// Diccionario de contenido por idioma. `getContent(locale)` devuelve un
// `SiteContent`; los datos que no dependen del idioma (URLs, email) se repiten
// idénticos en cada diccionario para no partir el objeto en dos.
// ---------------------------------------------------------------------------

export interface SiteMeta {
  logo: string;
  email: string;
  cvUrl: string;
  github: string;
  linkedin: string;
}

export interface HeroContent {
  eyebrow: string;
  title: string;
  intro: string;
  cta: Link;
}

export interface AboutContent {
  badge: string;
  headingLead: string;
  headingFade: string;
  body: string;
  photoAlt: string;
  actions: {
    primary: Link;
    cv: Link;
    recommendations: Link;
  };
}

export interface TestimonialsContent {
  srTitle: string;
  cta: Link;
  source: string;
  pickLabel: string;
  viewLabelPrefix: string;
}

export interface ServicesContent {
  srTitle: string;
  cards: ServiceCard[];
}

export interface ArsenalContent {
  badge: string;
}

export interface CasesContent {
  title: string;
  sub: string;
  linkLabelWithUrl: string;
  linkLabelDefault: string;
  defaultHref: string;
  prevLabel: string;
  nextLabel: string;
}

export interface ProjectsContent {
  badge: string;
  title: string;
}

export interface FooterContent {
  heading: string;
  cta: Link;
  navHeading: string;
  nav: Link[];
  connectHeading: string;
  connect: Link[];
  copyright: string;
}

export interface NotFoundContent {
  code: string;
  title: string;
  body: string;
  home: string;
  sectionsNav: string;
}

// Textos del "chrome" del sitio (header, menú, toggles). Aria-labels incluidos.
export interface ChromeContent {
  skipLink: string;
  navPrimary: string;
  navMobile: string;
  openMenu: string;
  closeMenu: string;
  backToTop: string;
  langGroup: string;
  // Nombre del cambio de idioma en el idioma de destino ("View in English" en la
  // versión ES, "Ver en español" en la EN).
  switchLanguage: string;
}

export interface SiteContent {
  locale: Locale;
  // Ruta raíz de esta variante ("/" para ES, "/en" para EN).
  home: string;
  // Código para <html lang> (BCP 47).
  htmlLang: string;
  site: SiteMeta;
  nav: Link[];
  navContact: Link;
  hero: HeroContent;
  about: AboutContent;
  testimonials: Testimonial[];
  testimonialsSection: TestimonialsContent;
  services: ServicesContent;
  arsenal: ArsenalContent;
  techRow1: string[];
  techRow2: string[];
  cases: CaseStudy[];
  casesSection: CasesContent;
  projects: Project[];
  projectsSection: ProjectsContent;
  footer: FooterContent;
  notFound: NotFoundContent;
  chrome: ChromeContent;
}
