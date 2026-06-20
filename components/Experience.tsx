'use client';

import { type ReactNode } from 'react';
import { motion } from 'framer-motion';

type Item = { prefix?: string; text: ReactNode };

const jobs: {
  role: string;
  company: string;
  period: string;
  location: string;
  items: Item[];
}[] = [
  {
    role: 'Full Stack Developer',
    company: 'Forcast',
    period: 'Jul 2024 — Ene 2026',
    location: 'Consultoría de desarrollo de software, Santiago',
    items: [
      {
        prefix: 'ITS Solutions (DOM Digital)',
        text: 'Construí de cero un SaaS para digitalizar la gestión de trámites de construcción municipal (DOM), reemplazando un sistema legacy en Microsoft Project. Diseñé el esquema de base de datos en PostgreSQL, implementé autenticación con Firebase, desarrollé el frontend en Next.js y el backend en Node.js, y coordiné directamente con el cliente para iterar sobre requerimientos. Desplegado en Azure.',
      },
      {
        prefix: 'E-Hive',
        text: 'Desarrollé en solitario el módulo completo de escaneo QR en Angular, que verifica la patente del vehículo contra la base de datos y habilita el inicio de carga eléctrica a través de los microservicios de la plataforma, integrados en Docker.',
      },
    ],
  },
  {
    role: 'Full Stack Developer',
    company: 'Valuesite Ltda.',
    period: 'Mar 2022 — Jul 2024',
    location: 'Desarrollo de soluciones para sector salud, Santiago',
    items: [
      {
        text: (
          <>
            Modernicé la Sucursal Virtual de iSalud (Isapre de Codelco),
            plataforma utilizada por más de{' '}
            <span className="text-craftz-highlight font-medium">
              18.000 afiliados
            </span>{' '}
            y sus cargas familiares para gestionar bonos, reembolsos y
            certificados en línea. Migré funcionalidades críticas del frontend
            legacy y conecté la interfaz con el backend existente.
          </>
        ),
      },
      {
        text: 'Implementé nuevos métodos en microservicios ASP.NET MVC (.NET) para exponer datos de la base de datos Oracle (PL/SQL): listado de médicos por especialidad, consulta de pacientes y otros flujos clínicos requeridos por el frontend.',
      },
    ],
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

export default function Experience() {
  return (
    <section id="experiencia">
      <motion.h2
        className="font-heading border-craftz-primary mb-6 border-l-2 pl-3 text-xl font-bold text-zinc-100 md:text-2xl"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        Experiencia
      </motion.h2>

      <div className="flex flex-col gap-4">
        {jobs.map((job, i) => (
          <motion.div
            key={job.company}
            className="bg-craftz-box rounded-lg border border-white/10 p-5 transition-colors hover:border-white/20"
            variants={cardVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-semibold text-zinc-100">
                  {job.role}
                  <br className="sm:hidden" />
                  <span className="hidden sm:inline"> — </span>
                  <span className="text-craftz-primary">{job.company}</span>
                </h3>
                <p className="font-mono text-xs text-zinc-500">{job.location}</p>
              </div>
              <span className="font-mono shrink-0 text-xs text-zinc-500 mt-0.5">
                {job.period}
              </span>
            </div>

            <ul className="mt-3 list-disc space-y-2 pl-4">
              {job.items.map((item, i) => (
                <li key={i} className="text-sm text-zinc-400">
                  {item.prefix && (
                    <span className="font-medium text-zinc-300">
                      {item.prefix}:{' '}
                    </span>
                  )}
                  {item.text}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
