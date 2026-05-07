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
  experience: [
    {
      company: 'Forcast',
      role: 'Full Stack Developer',
      type: 'Consultoría de desarrollo de software',
      location: 'Santiago',
      start: 'Jul 2024',
      end: 'Ene 2026',
      highlights: [
        'Desarrollé un módulo completo de un SaaS B2B para ITS Solutions: diseño de esquema de base de datos en PostgreSQL, implementación de autenticación con Firebase y construcción del frontend con Next.js, React y Prisma ORM.',
        'Desarrollé el módulo de escaneo QR en E-Hive (app de gestión de carga para vehículos eléctricos), utilizando Angular e integrándolo con microservicios desplegados en Docker.',
        'Optimicé el rendimiento de aplicaciones Next.js mediante mejoras en estrategias de renderizado (SSR/SSG) y carga de datos, reduciendo tiempos de respuesta perceptibles por el usuario.',
        'Diseñé e integré APIs RESTful para comunicación entre servicios frontend y backend en entornos de producción.',
      ],
    },
    {
      company: 'Valuesite Ltda.',
      role: 'Full Stack Developer',
      type: 'Desarrollo de soluciones para sector salud',
      location: 'Santiago',
      start: 'Mar 2022',
      end: 'Jul 2024',
      highlights: [
        'Participé en la modernización del sistema legacy de iSalud (Isapre de Codelco), migrando funcionalidades críticas del frontend y mejorando la experiencia de la sucursal virtual utilizada por miles de afiliados.',
        'Desarrollé microservicios en ASP.NET MVC (.NET) e integré la lógica de negocio con base de datos Oracle mediante procedimientos almacenados y funciones PL/SQL.',
        'Colaboré en la integración de múltiples sistemas empresariales, garantizando continuidad operacional en plataformas de uso interno.',
      ],
    },
  ],
  education: [],
  projects: [
    {
      name: 'Divisapp',
      tagline: 'Indicadores económicos chilenos en un solo lugar',
      problem:
        'La información sobre UF, dólar e IPC está dispersa en múltiples sitios oficiales, sin historial visual ni conversión integrada.',
      solution:
        'Centraliza los indicadores desde la API mindicador.cl/api, con conversión de divisas, historial de los últimos 30 días y gráficos de fluctuación.',
      outcome:
        'Herramienta de uso cotidiano para consultar y convertir indicadores económicos sin saltar entre sitios.',
      url: 'https://divisapp.vercel.app',
      repo: 'https://github.com/mbarradev-debug/divisapp',
      stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Vercel'],
      featured: true,
    },
    {
      name: 'Bolsillo',
      tagline: 'Gestión de boletas de honorarios para independientes',
      problem:
        'Los trabajadores independientes en Chile deben gestionar sus boletas del SII manualmente, un proceso tedioso y propenso a errores.',
      solution:
        'App mobile-first que simplifica la emisión y seguimiento de boletas de honorarios, reduciendo la fricción del proceso administrativo.',
      outcome:
        'Simplifica un proceso burocrático frecuente para freelancers chilenos, reduciendo el tiempo dedicado a trámites del SII.',
      url: 'https://bolsillo-rho.vercel.app',
      repo: 'https://github.com/mbarradev-debug/bolsillo',
      stack: ['Next.js', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'Shadcn/ui'],
      featured: false,
    },
  ],
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
