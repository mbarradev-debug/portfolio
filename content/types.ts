// Tipos de la capa de contenido. Se consumen desde los componentes de sección.

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
