import type { PortfolioData } from '@/types'

export const portfolio = {
  personal: {
    name: 'Miguel Barra',
    title: 'Software Engineer',
    email: 'mbarra.git@gmail.com',
    location: 'Santiago, Chile',
    bio: 'Software engineer focused on building clean, performant web products.',
    socials: [
      { label: 'GitHub', url: 'https://github.com/mbarradev-debug' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/miguelbarra' },
    ],
  },
  experience: [],
  education: [],
  projects: [],
  skills: [],
} as const satisfies PortfolioData
