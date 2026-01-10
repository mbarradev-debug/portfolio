import type { Translations } from "./types";

export const en: Translations = {
  meta: {
    title: "Miguel Barra | Software Engineer",
    description:
      "Computer Science Engineer specialized in web development. I design and develop scalable solutions with React, Next.js, TypeScript and Node.js.",
    ogDescription:
      "Computer Science Engineer. Scalable and maintainable web solutions.",
  },
  a11y: {
    skipToContent: "Skip to main content",
    mainMenu: "Main menu",
    home: "Home",
    downloadCV: "Download CV",
    goToContact: "Go to contact",
    externalLink: "opens in new tab",
    scrollToNextSection: "Scroll to next section",
  },
  nav: {
    profile: "Profile",
    contact: "Contact",
  },
  hero: {
    imageAlt: "Miguel Barra - Software Engineer",
    badge: "Senior Fullstack Engineer",
    headline: "From problem to product.",
    subheadline: "Architecture that scales. Code that lasts.",
    credential: "+5 years bringing startup ideas to production.",
    ctaStack: "View projects",
    ctaStackAria: "View my tech stack",
    ctaCV: "Download CV",
    ctaCVAria: "Download resume in PDF",
    scroll: "Scroll",
  },
  about: {
    label: "Profile",
    title: "About me",
    quote: "The right architecture today prevents tomorrow's rewrite.",
    approachLabel: "My approach",
    approach: {
      architecture: {
        title: "Architecture from day one",
        description: "I define structure before writing code.",
      },
      stack: {
        title: "Stack for durability",
        description: "I choose technologies for longevity, not trends.",
      },
      production: {
        title: "Code in production",
        description: "I deliver software serving real users.",
      },
    },
    idealForLabel: "Ideal for",
    idealFor: ["Startups", "Small teams", "Purpose-driven projects"],
    expandButton: "Read full story",
    collapseButton: "Show less",
    bio: {
      p1: ", with university education and a clear focus on solving real problems through well-designed technology.",
      p1Strong: "Computer Science Engineer",
      p2: ". Before writing code, I analyze the context, define the appropriate tech stack and select design patterns suited to the specific needs of the project.",
      p2Strong: "engineering problem",
      p3: ", where software serves people and generates real value in their daily lives.",
      p3Strong: "tangible short-term impact",
      p4: ", designed to grow sustainably, avoiding technical improvisation and hasty decisions that compromise the product's future.",
      p4Strong: "responsible software development",
    },
  },
  stack: {
    label: "Technology",
    title: "Stack & Engineering Approach",
    description:
      "I select the tech stack and design patterns based on each project's specific needs, prioritizing scalability, maintainability and architectural clarity from the start.",
    competenciesLabel: "Areas of expertise",
    competencies: {
      architecture: {
        title: "Application Architecture",
        description:
          "I design architectures aligned with the project context, ensuring separation of concerns and future system evolution.",
      },
      frontend: {
        title: "Frontend Development",
        description:
          "I build clear and maintainable interfaces, based on proper componentization, prioritizing performance and user experience.",
      },
      backend: {
        title: "Backend Development",
        description:
          "I implement decoupled business logic through well-defined APIs, focusing on robustness, validation and error handling.",
      },
      data: {
        title: "Data & Persistence",
        description:
          "I design consistent relational models, considering integrity, domain clarity and long-term growth.",
      },
    },
    mainStackLabel: "Main stack",
  },
  contact: {
    label: "Let's talk",
    title: "Contact",
    description:
      "If you're looking to build a solid solution from the start, with conscious technical decisions and a long-term vision, let's talk.",
    directContactLabel: "Direct contact",
    formTitle: "Send me a message",
    formDescription:
      "Tell me briefly about your project or idea and I'll get back to you soon.",
    form: {
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "you@email.com",
      message: "Message",
      messagePlaceholder: "Tell me about your project...",
      submit: "Send message",
      submitting: "Sending...",
      success: "Message sent successfully. I'll get back to you soon.",
      error: "There was an error sending the message. Please try again.",
    },
    alternativeContact: "You can also write me directly at",
    alternativeContactLink: "my email",
  },
  footer: {
    copyright: "All rights reserved.",
  },
};
