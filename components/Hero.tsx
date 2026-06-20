'use client';

import Image from 'next/image';
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';
import { motion } from 'framer-motion';

const links = [
  { href: 'https://github.com/mbarradev', icon: FaGithub, label: 'GitHub' },
  {
    href: 'https://www.linkedin.com/in/miguelbarrarios',
    icon: FaLinkedin,
    label: 'LinkedIn',
  },
  { href: 'mailto:mbarra.git@gmail.com', icon: FaEnvelope, label: 'Email' },
  { href: 'https://miguelbarra.cl', icon: FaGlobe, label: 'Sitio web' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

export default function Hero() {
  return (
    <motion.section
      id="inicio"
      className="w-full"
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.1 } },
      }}
    >
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="mb-8 flex justify-center"
      >
        <div className="bg-craftz-box ring-craftz-primary/20 inline-flex items-center gap-2 rounded-full px-4 py-2 ring-1">
          <span className="text-craftz-primary inline-block animate-pulse text-[10px] leading-none">
            ●
          </span>
          <span className="text-craftz-primary font-mono text-[10px] font-medium sm:text-xs sm:tracking-wide">
            Disponible para nuevas oportunidades
          </span>
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="flex flex-row items-center justify-between gap-6"
      >
        <div className="flex flex-col">
          <h1 className="font-heading text-4xl font-bold tracking-tight">
            Miguel Barra
          </h1>
          <p className="text-craftz-primary mt-1 font-mono text-xs md:text-sm">
            Full Stack Developer — React · Next.js · TypeScript
          </p>
          <p className="mt-1 font-mono text-xs text-zinc-500">
            Santiago, Chile
          </p>

          <div className="mt-5 flex gap-2">
            {links.map(({ href, icon: Icon, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('mailto') ? undefined : '_blank'}
                rel={
                  href.startsWith('mailto') ? undefined : 'noopener noreferrer'
                }
                aria-label={label}
                className="bg-craftz-box hover:text-craftz-primary focus-visible:text-craftz-primary focus-visible:ring-craftz-primary rounded-lg p-2 text-zinc-400 transition-colors focus-visible:outline-none focus-visible:ring-2"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </div>
        </div>

        <div className="ring-craftz-primary/30 h-28 w-28 shrink-0 overflow-hidden rounded-full ring-2">
          <Image
            src="/profile.webp"
            alt="Foto de perfil de Miguel Barra"
            width={112}
            height={112}
            className="h-full w-full object-cover"
          />
        </div>
      </motion.div>

      <motion.p
        variants={fadeUp}
        transition={{ duration: 0.4 }}
        className="mt-8 text-[15px] leading-relaxed text-zinc-400"
      >
        Full Stack Developer con más de{' '}
        <span className="text-craftz-highlight font-medium">
          2 años de experiencia
        </span>{' '}
        entregando productos en producción para los sectores público y privado.
        He construido desde cero un SaaS completo para transformación digital
        municipal, modernizado plataformas de salud utilizadas por más de{' '}
        <span className="text-craftz-highlight font-medium">
          18.000 beneficiarios
        </span>{' '}
        de Codelco, y desarrollado herramientas propias orientadas al mercado
        chileno. Especializado en React, Next.js y TypeScript, con manejo del
        stack completo: diseño de base de datos, desarrollo de APIs,
        autenticación e infraestructura en la nube.
      </motion.p>
    </motion.section>
  );
}
