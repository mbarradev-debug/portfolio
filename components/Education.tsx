'use client';

import { motion } from 'framer-motion';

export default function Education() {
  return (
    <section id="educacion">
      <motion.h2
        className="font-heading border-craftz-primary mb-6 border-l-2 pl-3 text-xl font-bold text-zinc-100 md:text-2xl"
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        Educación
      </motion.h2>

      <motion.div
        className="bg-craftz-box rounded-lg border border-white/10 p-5 transition-colors hover:border-white/20"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center">
          <div>
            <h3 className="font-semibold text-zinc-100">
              Ingeniería en Computación e Informática
            </h3>
            <p className="text-craftz-primary text-sm">
              Universidad Andrés Bello
            </p>
          </div>
          <span className="font-mono text-xs text-zinc-500">Titulado 2025</span>
        </div>
      </motion.div>
    </section>
  );
}
