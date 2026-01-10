import type { Translations } from "./types";

export const es: Translations = {
  meta: {
    title: "Miguel Barra | Ingeniero de Software",
    description:
      "Ingeniero en Computación e Informática especializado en desarrollo web. Diseño y desarrollo soluciones escalables con React, Next.js, TypeScript y Node.js.",
    ogDescription:
      "Ingeniero en Computación e Informática. Soluciones web escalables y mantenibles.",
  },
  a11y: {
    skipToContent: "Saltar al contenido principal",
    mainMenu: "Menú principal",
    home: "Inicio",
    downloadCV: "Descargar CV",
    goToContact: "Ir a contacto",
    externalLink: "abre en nueva pestaña",
    scrollToNextSection: "Desplazarse a la siguiente sección",
  },
  nav: {
    profile: "Perfil",
    contact: "Contacto",
  },
  hero: {
    imageAlt: "Miguel Barra - Ingeniero de Software",
    badge: "Senior Fullstack Engineer",
    headline: "Del problema al producto.",
    subheadline: "Arquitectura que escala. Código que perdura.",
    credential: "+5 años llevando ideas de startups a producción.",
    ctaStack: "Ver proyectos",
    ctaStackAria: "Ver mi stack tecnológico",
    ctaCV: "Descargar CV",
    ctaCVAria: "Descargar currículum en PDF",
    scroll: "Scroll",
  },
  about: {
    label: "Perfil",
    title: "Sobre mí",
    quote: "La arquitectura correcta hoy evita el rewrite de mañana.",
    approachLabel: "Mi enfoque",
    approach: {
      architecture: {
        title: "Arquitectura desde el día uno",
        description: "Defino estructura antes de escribir código.",
      },
      stack: {
        title: "Stack por durabilidad",
        description: "Elijo tecnologías por longevidad, no por moda.",
      },
      production: {
        title: "Código en producción",
        description: "Entrego software sirviendo usuarios reales.",
      },
    },
    idealForLabel: "Ideal para",
    idealFor: ["Startups", "Equipos pequeños", "Proyectos con propósito"],
    expandButton: "Leer historia completa",
    collapseButton: "Ver menos",
    bio: {
      p1: ", con formación universitaria y una orientación clara a resolver problemas reales mediante tecnología bien diseñada.",
      p1Strong: "Ingeniero en Computación e Informática",
      p2: ". Antes de escribir código, analizo el contexto, defino el stack tecnológico adecuado y selecciono patrones de diseño acordes a las necesidades específicas del proyecto.",
      p2Strong: "problema de ingeniería",
      p3: ", donde el software esté al servicio de las personas y genere valor real en su día a día.",
      p3Strong: "impacto tangible a corto plazo",
      p4: ", pensado para crecer de forma sostenible, evitando la improvisación técnica y las decisiones apresuradas que comprometen el futuro del producto.",
      p4Strong: "desarrollo de software responsable",
    },
  },
  stack: {
    label: "Tecnología",
    title: "Stack & Engineering Approach",
    description:
      "Selecciono el stack tecnológico y los patrones de diseño según las necesidades específicas de cada proyecto, priorizando la escalabilidad, la mantenibilidad y la claridad arquitectónica desde el inicio.",
    competenciesLabel: "Áreas de competencia",
    competencies: {
      architecture: {
        title: "Arquitectura de aplicaciones",
        description:
          "Diseño arquitecturas alineadas al contexto del proyecto, cuidando la separación de responsabilidades y la evolución futura del sistema.",
      },
      frontend: {
        title: "Desarrollo Frontend",
        description:
          "Construyo interfaces claras y mantenibles, basadas en una correcta componentización, priorizando rendimiento y experiencia de usuario.",
      },
      backend: {
        title: "Desarrollo Backend",
        description:
          "Implemento lógica de negocio desacoplada mediante APIs bien definidas, con foco en robustez, validación y control de errores.",
      },
      data: {
        title: "Datos y persistencia",
        description:
          "Diseño modelos relacionales consistentes, considerando integridad, claridad del dominio y crecimiento a largo plazo.",
      },
    },
    mainStackLabel: "Stack principal",
  },
  contact: {
    label: "Conversemos",
    title: "Contacto",
    description:
      "Si buscas construir una solución sólida desde el inicio, con decisiones técnicas conscientes y una visión de largo plazo, conversemos.",
    directContactLabel: "Contacto directo",
    formTitle: "Envíame un mensaje",
    formDescription:
      "Cuéntame brevemente sobre tu proyecto o idea y te responderé a la brevedad.",
    form: {
      name: "Nombre",
      namePlaceholder: "Tu nombre",
      email: "Email",
      emailPlaceholder: "tu@email.com",
      message: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu proyecto...",
      submit: "Enviar mensaje",
      submitting: "Enviando...",
      success: "Mensaje enviado correctamente. Te responderé pronto.",
      error: "Hubo un error al enviar el mensaje. Intenta de nuevo.",
    },
    alternativeContact: "También puedes escribirme directamente a",
    alternativeContactLink: "mi correo",
  },
  footer: {
    copyright: "Todos los derechos reservados.",
  },
};
