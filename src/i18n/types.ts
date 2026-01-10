export type Locale = "es" | "en";

export interface Translations {
  meta: {
    title: string;
    description: string;
    ogDescription: string;
  };
  a11y: {
    skipToContent: string;
    mainMenu: string;
    home: string;
    downloadCV: string;
    goToContact: string;
    externalLink: string;
    scrollToNextSection: string;
  };
  nav: {
    profile: string;
    contact: string;
  };
  hero: {
    imageAlt: string;
    badge: string;
    headline: string;
    subheadline: string;
    credential: string;
    ctaStack: string;
    ctaStackAria: string;
    ctaCV: string;
    ctaCVAria: string;
    scroll: string;
  };
  about: {
    label: string;
    title: string;
    quote: string;
    approachLabel: string;
    approach: {
      architecture: { title: string; description: string };
      stack: { title: string; description: string };
      production: { title: string; description: string };
    };
    idealForLabel: string;
    idealFor: string[];
    expandButton: string;
    collapseButton: string;
    bio: {
      p1: string;
      p1Strong: string;
      p2: string;
      p2Strong: string;
      p3: string;
      p3Strong: string;
      p4: string;
      p4Strong: string;
    };
  };
  stack: {
    label: string;
    title: string;
    description: string;
    competenciesLabel: string;
    competencies: {
      architecture: { title: string; description: string };
      frontend: { title: string; description: string };
      backend: { title: string; description: string };
      data: { title: string; description: string };
    };
    mainStackLabel: string;
  };
  contact: {
    label: string;
    title: string;
    description: string;
    directContactLabel: string;
    formTitle: string;
    formDescription: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      message: string;
      messagePlaceholder: string;
      submit: string;
      submitting: string;
      success: string;
      error: string;
    };
    alternativeContact: string;
    alternativeContactLink: string;
  };
  footer: {
    copyright: string;
  };
}
