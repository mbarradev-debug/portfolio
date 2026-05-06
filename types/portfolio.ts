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
  start: string
  end: string | null
  description: string
  stack: string[]
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
  description: string
  url: string | null
  repo: string | null
  stack: string[]
  featured: boolean
}

export interface PortfolioData {
  personal: PersonalInfo
  experience: WorkExperience[]
  education: Education[]
  projects: Project[]
  skills: string[]
}
