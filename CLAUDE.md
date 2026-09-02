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
- Cabeceras de seguridad configuradas en `next.config.ts` (PMB-003): CSP + headers
  anti-clickjacking/sniffing, HSTS en producción, sin `X-Powered-By`.
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

| Capa               | Elección                                                     |
| ------------------ | ------------------------------------------------------------ |
| Framework          | Next.js `16.3.4` (App Router, Turbopack por defecto)         |
| UI                 | React 19                                                     |
| Lenguaje           | TypeScript, `strict: true`                                   |
| Estilos            | Tailwind CSS v4                                              |
| Fuentes            | `next/font` (self-hosted, sin requests a Google en runtime)  |
| Gestor de paquetes | **npm** (lockfile `package-lock.json`)                       |
| Lint / formato     | ESLint (`eslint-config-next`, flat config) + Prettier        |
| Hooks              | Husky + lint-staged (pre-commit: lint + format + typecheck)  |
| Seguridad          | CSP + cabeceras de seguridad en `next.config.ts` (ver abajo) |

## Cabeceras de seguridad

Configuradas en `next.config.ts` (`headers()` para `/:path*`). Todo cambio en la
política debe reflejarse aquí.

### Content-Security-Policy

| Directiva                   | Valor                                               | Motivo                                                                                                                                                                                        |
| --------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `default-src`               | `'self'`                                            | Base restrictiva: sólo el propio origen salvo que una directiva lo amplíe.                                                                                                                    |
| `script-src`                | `'self' 'unsafe-inline'` (+ `'unsafe-eval'` en dev) | Next App Router inyecta el payload RSC en `<script>` inline por página, no hasheables de forma estable. `'unsafe-eval'` sólo lo pide React en dev (overlay de errores). Ver "Decisión" abajo. |
| `style-src`                 | `'self' 'unsafe-inline'`                            | Next/React inyectan `<style>` inline; la inyección de estilos no es vector de XSS.                                                                                                            |
| `img-src`                   | `'self' data: blob:`                                | Assets de `/public` + optimizador de imágenes de Next (previews `data:`/`blob:`).                                                                                                             |
| `media-src`                 | `'self'`                                            | Vídeo del hero servido desde `/public`.                                                                                                                                                       |
| `font-src`                  | `'self'`                                            | Fuentes self-hosted por `next/font`; sin orígenes externos (ni Google Fonts).                                                                                                                 |
| `connect-src`               | `'self'`                                            | No hay APIs de terceros; fetch/XHR sólo al propio origen.                                                                                                                                     |
| `object-src`                | `'none'`                                            | Bloquea `<object>`/`<embed>`/plugins.                                                                                                                                                         |
| `base-uri`                  | `'self'`                                            | Impide inyección de `<base>` para secuestrar rutas relativas.                                                                                                                                 |
| `form-action`               | `'self'`                                            | Los formularios sólo pueden enviar al propio origen.                                                                                                                                          |
| `frame-ancestors`           | `'none'`                                            | Nadie puede embeber el sitio (anti-clickjacking, refuerza `X-Frame-Options`).                                                                                                                 |
| `upgrade-insecure-requests` | —                                                   | Fuerza HTTPS en subrecursos.                                                                                                                                                                  |

### Otras cabeceras

| Cabecera                    | Valor                                                                | Motivo                                                                       |
| --------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `X-Frame-Options`           | `DENY`                                                               | Anti-clickjacking para navegadores antiguos sin CSP `frame-ancestors`.       |
| `X-Content-Type-Options`    | `nosniff`                                                            | El navegador no adivina el MIME type; evita ejecución por confusión.         |
| `Referrer-Policy`           | `strict-origin-when-cross-origin`                                    | Envía la URL completa same-origin, sólo el origen cross-origin, nada a HTTP. |
| `Permissions-Policy`        | `camera=(), microphone=(), geolocation=(), browsing-topics=()`       | Desactiva APIs sensibles del dispositivo y Topics; el sitio no las usa.      |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` (**sólo producción**) | Fuerza HTTPS 2 años; no se emite en dev para no fijar HSTS en `localhost`.   |
| `X-Powered-By`              | _(eliminada)_                                                        | `poweredByHeader: false` — no revelar el framework.                          |

### Decisión: `script-src` con `'unsafe-inline'` en vez de nonce

Eliminar `'unsafe-inline'` de `script-src` exige CSP con nonce por request vía
`proxy.ts`, lo que obliga a **render dinámico en todas las rutas** (sin SSG, ISR,
PPR ni caché de CDN) — choca con la arquitectura estática del proyecto. Para un
sitio sin auth, sin contenido de usuario y sin formularios con datos sensibles, el
riesgo residual de `'unsafe-inline'` es bajo, y `object-src 'none'`, `base-uri
'self'`, `frame-ancestors 'none'` y `form-action 'self'` cierran los vectores de
mayor impacto. `experimental.sri` tampoco resuelve los `<script>` inline del
payload RSC. **Revisar en PMB-006**: si el middleware de i18n vuelve dinámicas las
rutas de todos modos, mover la CSP a `proxy.ts` con nonce + `'strict-dynamic'`.

### Redirect `/` → locale por defecto

Se **delega en el middleware de i18n de PMB-006**. Añadir un redirect en
`next.config.ts` ahora daría 404 (todavía no existe `app/[locale]`).

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
