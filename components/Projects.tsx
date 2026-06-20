'use client';

import { motion } from 'framer-motion';

const projects = [
  {
    title: 'Pulso',
    url: 'https://pulso-self.vercel.app',
    description:
      'Herramienta de diagnóstico financiero para deudores del crédito CAE en Chile. Determina en tiempo real si el usuario está en zona de riesgo de embargo por la TGR según su saldo, ingreso y estado de pago, y entrega un plan de acción concreto.',
    tech: [
      'Next.js 16',
      'App Router',
      'Supabase',
      'PostgreSQL',
      'Resend',
      'Vitest',
      'Playwright',
    ],
  },
];

export default function Projects() {
  return (
    <section id="proyectos">
      <motion.h2
        className="font-heading border-craftz-primary mb-6 border-l-2 pl-3 text-xl font-bold text-zinc-100 md:text-2xl"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        Proyectos
      </motion.h2>

      <div className="grid gap-4">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="bg-craftz-box rounded-lg border border-white/10 p-5 transition-colors hover:border-white/20"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-semibold text-zinc-100">{project.title}</h3>
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-craftz-primary hover:text-craftz-primary/80 font-mono shrink-0 text-xs transition-colors hover:underline"
              >
                {project.url.replace('https://', '')}
              </a>
            </div>

            <p className="mt-2 text-sm text-zinc-400">{project.description}</p>

            <ul className="mt-3 text-sm text-zinc-400">
              <li>
                <span className="text-zinc-300">Wizard de 3 pasos</span>,
                generación de informes PDF server-side, alertas mensuales por
                email vía cron jobs, y cobertura de tests unitarios y E2E.
              </li>
            </ul>

            <div className="mt-4 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="border-craftz-primary/30 text-craftz-primary font-mono rounded-md border px-2 py-0.5 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
