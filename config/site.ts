export const siteConfig = {
  name: "Miguel Barra — Full Stack Software Engineer",
  description:
    "Portafolio profesional de Miguel Barra, Full Stack Software Engineer con experiencia real en sistemas escalables, mantenibles y en producción.",
  url: "https://example.com",
  author: {
    name: "Miguel Barra",
    email: "mbarra.3690@gmail.com",
  },
  links: {
    github: "https://github.com/mbarradev-debug",
    linkedin: "https://www.linkedin.com/in/miguelbarrarios",
  },
} as const;

export type SiteConfig = typeof siteConfig;
