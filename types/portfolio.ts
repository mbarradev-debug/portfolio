export interface SocialLink {
  label: string
  url: string
}

export interface PersonalInfo {
  name: string
  title: string
  email: string
  location: string
  bio: string
  socials: SocialLink[]
}

export interface WorkExperience {
  company: string
  role: string
  type: string
  location: string
  start: string
  end: string | null
  highlights: string[]
}

export interface Education {
  institution: string
  degree: string
  field: string
  start: string
  end: string
}

export interface Project {
  name: string
  tagline: string
  problem: string
  solution: string
  outcome: string
  url: string | null
  repo: string | null
  stack: string[]
  featured: boolean
}

export interface SkillCategory {
  category: string
  label: string
  items: string[]
}

export interface PortfolioData {
  personal: PersonalInfo
  experience: WorkExperience[]
  education: Education[]
  projects: Project[]
  skills: SkillCategory[]
}
