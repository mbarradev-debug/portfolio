@AGENTS.md

# CLAUDE.md — Contexto del proyecto

> Memoria compartida para asistentes de IA y personas. **Léelo al iniciar cualquier
> issue y actualízalo al terminar** (ver protocolo en `AGENTS.md`). Las
> convenciones operativas (cómo correr, ramas, commits, checklist de terminado)
> viven en `AGENTS.md`.

## Objetivo

Portfolio / sitio personal de **Miguel Barra** (Full Stack Developer, Santiago de
Chile). Sustituye al sitio estático de un solo archivo (`index.html`) por un
proyecto Next.js real, versionado, con calidad automática y una base común para
todo el equipo.

## Estado actual

- Migración **en curso** desde el `index.html` estático. La copia original se
  conserva en `/references/index.html` (en `.gitignore`, sólo consulta local).
- Scaffold Next.js operativo (PMB-001): tooling, lint/format/typecheck, hooks de
  pre-commit y assets reales en `/public`.
- La home todavía muestra la página de bienvenida de `create-next-app`; aún no se
  ha reconstruido la UI real.

## Arquitectura objetivo

- **Next.js App Router** con **React Server Components por defecto**.
- **Client Components sólo como hojas del árbol**: se marca `"use client"` lo más
  abajo posible (un botón, un carrusel), nunca en layouts o páginas completas.
- Datos y contenido resueltos en el servidor; el cliente recibe el mínimo JS.
- Sitio **multi-idioma** con segmento de ruta `app/[locale]/…` y catálogos de
  traducción en `messages/`.
- Renderizado/generación estática siempre que se pueda (el contenido es
  mayormente estático).

## Stack

| Capa               | Elección                                                    |
| ------------------ | ----------------------------------------------------------- |
| Framework          | Next.js `16.3.4` (App Router, Turbopack por defecto)        |
| UI                 | React 19                                                    |
| Lenguaje           | TypeScript, `strict: true`                                  |
| Estilos            | Tailwind CSS v4                                             |
| Fuentes            | `next/font` (self-hosted, sin requests a Google en runtime) |
| Gestor de paquetes | **npm** (lockfile `package-lock.json`)                      |
| Lint / formato     | ESLint (`eslint-config-next`, flat config) + Prettier       |
| Hooks              | Husky + lint-staged (pre-commit: lint + format + typecheck) |

## Estructura de carpetas objetivo

```
app/
  [locale]/          Rutas localizadas (page, layout, loading, error por idioma)
  layout.tsx         Root layout (html/body, providers globales)
components/           Componentes de UI reutilizables (Server salvo que necesiten cliente)
content/             Contenido del sitio (proyectos, experiencia, testimonios) como datos tipados
messages/            Catálogos de traducción por idioma (es.json, en.json, …)
lib/                 Utilidades puras, helpers de datos, configuración compartida
public/              Assets estáticos servidos desde "/"
references/          Sitio estático original (sólo local, en .gitignore)
```

> Hoy sólo existen `app/` y `public/`. El resto se crea a medida que las issues
> lo necesiten; esta es la forma canónica cuando se cree cada carpeta.

## Convenciones de código

- **RSC por defecto.** `"use client"` sólo en el componente concreto que usa
  estado, efectos, o APIs del navegador.
- **TypeScript estricto.** Nada de `any` implícito; tipar el contenido de
  `content/` y los `props`.
- **Imports absolutos** con el alias `@/*` (raíz del proyecto). Nada de
  `../../../`.
- **Sin `src/`**: código y configuración conviven en la raíz.
- Formato y orden de imports los fija Prettier + ESLint; no pelear con el
  formateador.
- Prettier: comillas dobles, `semi: true`, `printWidth: 100`, plugin de Tailwind
  para ordenar clases.

## Convenciones de nombres

| Elemento                      | Convención                         | Ejemplo                         |
| ----------------------------- | ---------------------------------- | ------------------------------- |
| Componentes / archivos `.tsx` | `PascalCase`                       | `HeroSection.tsx`               |
| Utilidades / hooks `.ts`      | `camelCase`                        | `formatDate.ts`, `useInView.ts` |
| Carpetas de rutas             | `kebab-case` (o segmento Next)     | `app/[locale]/sobre-mi/`        |
| Archivos de contenido/datos   | `kebab-case`                       | `content/projects.ts`           |
| Catálogos i18n                | código ISO del idioma              | `messages/es.json`              |
| Variables de entorno públicas | `NEXT_PUBLIC_` + `SCREAMING_SNAKE` | `NEXT_PUBLIC_SITE_URL`          |

## Decisiones abiertas

- Librería de i18n (`next-intl` vs. solución propia sobre `[locale]`). Se decidirá
  al abordar la ruta localizada.
- Estrategia de animación (CSS puro vs. librería) para reproducir el hero original.
- Origen del contenido: archivos `.ts` tipados vs. MDX vs. CMS. Por defecto,
  archivos `.ts` en `content/` hasta que haya razón para más.
- Plataforma de despliegue (Vercel es el candidato por defecto).

## Bitácora de decisiones

Ver `AGENTS.md` → **Bitácora de decisiones**. Toda issue añade su entrada allí.
