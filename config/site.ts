export const siteConfig = {
  name: "Portfolio",
  description: "Professional portfolio",
  url: "https://example.com",
  author: {
    name: "",
    email: "",
  },
  links: {
    github: "",
    linkedin: "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
