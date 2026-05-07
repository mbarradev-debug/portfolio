import type { PortfolioData } from '@/types'

export const portfolio: PortfolioData = {
  personal: {
    name: 'Miguel Barra',
    title: 'Full Stack Developer',
    email: 'mbarra.git@gmail.com',
    location: 'Santiago, Chile',
    bio: 'Full Stack Developer con más de 3 años de experiencia construyendo aplicaciones web en producción. React, Next.js, TypeScript.',
    socials: [
      { label: 'GitHub', url: 'https://github.com/mbarradev-debug' },
      { label: 'LinkedIn', url: 'https://linkedin.com/in/miguelbarrarios' },
    ],
  },
  experience: [],
  education: [],
  projects: [],
  skills: [
    {
      category: 'frontend',
      label: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Angular', 'Shadcn/ui'],
    },
    {
      category: 'backend',
      label: 'Backend',
      items: ['Node.js', 'NestJS', 'ASP.NET MVC (.NET)', 'REST APIs', 'Prisma ORM'],
    },
    {
      category: 'databases',
      label: 'Bases de datos',
      items: ['PostgreSQL', 'Oracle PL/SQL', 'Supabase'],
    },
    {
      category: 'infrastructure',
      label: 'Infraestructura',
      items: ['Docker', 'GCP', 'Vercel', 'CI/CD', 'Git / GitHub'],
    },
    {
      category: 'mobile',
      label: 'Mobile',
      items: ['Flutter', 'Ionic (Angular)'],
    },
  ],
}
