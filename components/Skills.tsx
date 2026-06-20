'use client';

import { motion } from 'framer-motion';

const categories = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Angular', 'Shadcn/ui'],
  },
  {
    label: 'Backend',
    skills: ['Node.js', 'NestJS', 'ASP.NET MVC (.NET)', 'REST APIs', 'Prisma ORM'],
  },
  {
    label: 'Bases de datos',
    skills: ['PostgreSQL', 'Oracle PL/SQL', 'Supabase'],
  },
  {
    label: 'Infraestructura',
    skills: ['Docker', 'Azure', 'GCP', 'Vercel', 'CI/CD', 'Git / GitHub', 'Firebase Auth'],
  },
  {
    label: 'Mobile',
    skills: ['Flutter', 'Ionic (Angular)'],
  },
];

export default function Skills() {
  return (
    <section id="habilidades">
      <motion.h2
        className="font-heading border-craftz-primary mb-6 border-l-2 pl-3 text-xl font-bold text-zinc-100 md:text-2xl"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        Habilidades
      </motion.h2>

      <motion.div
        className="bg-craftz-box rounded-lg border border-white/10 p-5 transition-colors hover:border-white/20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        <dl className="flex flex-col gap-5">
          {categories.map(({ label, skills }) => (
            <div key={label} className="flex flex-col gap-2 sm:flex-row sm:gap-6">
              <dt className="font-mono w-36 shrink-0 text-xs font-semibold text-zinc-100 uppercase tracking-wider pt-0.5">
                {label}
              </dt>
              <dd className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono rounded-md border border-white/10 px-2 py-0.5 text-xs text-zinc-400"
                  >
                    {skill}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
