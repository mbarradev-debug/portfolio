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
- Variables de entorno centralizadas y validadas en `env.ts` (PMB-004): Zod +
  `@t3-oss/env-nextjs`, `process.env` prohibido fuera de `env.ts` por ESLint.
- Sistema de design tokens en `app/styles/tokens.css` + 3 tipografías vía
  `next/font` (PMB-005). Página de referencia: `/design-system`.
- La home es un placeholder mínimo (link a `/design-system`); la UI real se
  reconstruye a partir de PMB-007.

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

| Capa               | Elección                                                                                     |
| ------------------ | -------------------------------------------------------------------------------------------- |
| Framework          | Next.js `16.3.4` (App Router, Turbopack por defecto)                                         |
| UI                 | React 19                                                                                     |
| Lenguaje           | TypeScript, `strict: true`                                                                   |
| Estilos            | Tailwind CSS v4 + design tokens (`app/styles/tokens.css`)                                    |
| Fuentes            | `next/font/google` self-hosted: Plus Jakarta Sans / Playfair Display italic / JetBrains Mono |
| Gestor de paquetes | **npm** (lockfile `package-lock.json`)                                                       |
| Lint / formato     | ESLint (`eslint-config-next`, flat config) + Prettier                                        |
| Hooks              | Husky + lint-staged (pre-commit: lint + format + typecheck)                                  |
| Seguridad          | CSP + cabeceras de seguridad en `next.config.ts` (ver abajo)                                 |
| Config / env       | `env.ts` — `@t3-oss/env-nextjs` + Zod (ver abajo)                                            |

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

## Variables de entorno

Validadas una sola vez al arrancar en `env.ts` (`@t3-oss/env-nextjs` + Zod).
**Nunca leas `process.env` directamente** — importa `env` desde `@/env` (ESLint
lo bloquea con `no-restricted-properties`, excepto en `env.ts`). El único
consumidor de `process.env` es `env.ts`; `next.config.ts` ya usa `env`.

Si falta una variable requerida o tiene formato inválido, el build/dev **se
detiene** con un mensaje que nombra la variable (`❌ Invalid environment
variables: [ … path: ['NEXT_PUBLIC_SITE_URL'] … ]`).

### Inventario

| Variable               | Ámbito | Requerida          | Formato                         | Uso                                           |
| ---------------------- | ------ | ------------------ | ------------------------------- | --------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL` | client | **Sí**             | URL absoluta                    | `metadataBase` y URLs absolutas de OpenGraph. |
| `NODE_ENV`             | shared | no (`development`) | `development\|test\|production` | Modo de ejecución (lo inyecta Next).          |
| `RESEND_API_KEY`       | server | no (→ PMB-015)     | string no vacío                 | Envío de emails del formulario de contacto.   |
| `CONTACT_TO_EMAIL`     | server | no (→ PMB-015)     | email                           | Destinatario de los envíos del formulario.    |
| `CONTACT_RATE_LIMIT`   | server | no                 | entero positivo                 | Límite de envíos por IP/hora (opcional).      |
| `SKIP_ENV_VALIDATION`  | build  | no                 | cualquier valor                 | Salta la validación (builds de contenedor).   |

- **client** (`NEXT_PUBLIC_*`): tipadas y disponibles en navegador y servidor.
- **server**: sólo en código de servidor. Acceder a ellas desde un Client
  Component **lanza en runtime** (t3-env: _"Attempted to access a server-side
  environment variable on the client"_); además Next nunca las incluye en el
  bundle de cliente. La separación no es error de compilación: la garantía es
  runtime + bundling.
- Las variables de contacto son `optional()` hasta PMB-015, que las hará
  requeridas.

## Sistema de design tokens

Fuente única del idioma visual. Definido en **`app/styles/tokens.css`** (importado
desde `app/globals.css`) y expuesto a Tailwind vía `@theme inline`. Página viva de
referencia: **`/design-system`**.

### Regla de uso (obligatoria)

- Los componentes usan **sólo tokens semánticos** (capa 3): `--color-bg`,
  `--color-text`, `--color-accent`, `--radius-card`, … — **intención, no valor**.
- **Nunca** un valor crudo (hex, px de radio, duración) ni un primitivo (capa 1)
  ni un valor de escala (capa 2) directamente en un componente.
- En Tailwind: `bg-bg`, `text-text-soft`, `rounded-card`, `font-serif`,
  `text-xl`, `p-md`, `shadow-lg`, `ease-standard`, etc. (mapeados en
  `globals.css`). Para lo no mapeado: `style={{ … : "var(--token)" }}`.
- El único sitio con valores crudos es `tokens.css`. El dark mode (cuando llegue)
  sólo re-mapea la capa 3 — cero cambios en componentes.

### Capa 1 · Primitivos (portados 1:1 del `:root` legacy)

| Token          | Valor                            | Token          | Valor     |
| -------------- | -------------------------------- | -------------- | --------- |
| `--cream`      | `#fcfcfa`                        | `--teal`       | `#445e5f` |
| `--hero-bg-1`  | `#dcdbd4`                        | `--teal-dark`  | `#222f30` |
| `--hero-bg-2`  | `#c7c6bd`                        | `--card-gray`  | `#e6e4df` |
| `--ink`        | `#15181a`                        | `--white`      | `#ffffff` |
| `--ink-soft`   | `#4a4d47`                        | `--radius-lg`  | `28px`    |
| `--muted`      | `#70726b`                        | `--radius-md`  | `18px`    |
| `--line`       | `#dcdad2`                        | `--radius-sm`  | `12px`    |
| `--green`      | `#c9f59a`                        | `--dur-fast`   | `0.16s`   |
| `--green-dark` | `#9fd66a`                        | `--dur-mid`    | `0.3s`    |
| `--ease-out`   | `cubic-bezier(0.22, 1, 0.36, 1)` | `--dur-reveal` | `0.55s`   |

Familias (self-hosted vía `next/font`, fallbacks del sitio legacy):
`--font-sans` = Plus Jakarta Sans · `--font-serif` = Playfair Display _italic_
(decorativo) · `--font-mono` = JetBrains Mono.

### Capa 2 · Escalas (nuevas, coherentes)

| Grupo        | Tokens                                                                                                                |
| ------------ | --------------------------------------------------------------------------------------------------------------------- |
| Espaciado    | `--space-px`, `--space-3xs`(4) `2xs`(8) `xs`(12) `sm`(16) `md`(24) `lg`(32) `xl`(48) `2xl`(64) `3xl`(96) `4xl`(128)   |
| Tipografía   | `--text-2xs`(11) `xs`(12) `sm`(14) `base`(16) `md`(18) `lg`(22) `xl`(28) · `--text-2xl/3xl/display` fluidos (`clamp`) |
| Interlineado | `--leading-none/tight`(1.1)`/snug/normal`(1.5)`/relaxed`(1.65)                                                        |
| Tracking     | `--tracking-tighter`(−.025em) `tight` `normal` `wide` `wider`(.08em, labels mono) `widest`                            |
| Sombra       | `--shadow-hairline` (1:1), `--shadow-sm`, `--shadow-md`, `--shadow-lg` (1:1)                                          |

### Capa 3 · Semánticos (usar estos)

| Token                                | Mapea a                 | Uso                             |
| ------------------------------------ | ----------------------- | ------------------------------- |
| `--color-bg`                         | `--cream`               | Fondo de página                 |
| `--color-surface`                    | `--white`               | Tarjetas, paneles               |
| `--color-surface-sunken`             | `--card-gray`           | Insets, campos                  |
| `--color-surface-inverse`            | `--teal-dark`           | Secciones oscuras               |
| `--color-surface-inverse-soft`       | `--teal`                | Secciones oscuras (variante)    |
| `--color-text`                       | `--ink`                 | Texto principal                 |
| `--color-text-soft`                  | `--ink-soft`            | Texto secundario                |
| `--color-text-muted`                 | `--muted`               | Meta, captions, labels          |
| `--color-text-inverse`               | `--white`               | Texto sobre superficies oscuras |
| `--color-text-on-accent`             | `--teal-dark`           | Texto sobre `--color-accent`    |
| `--color-border`                     | `--line`                | Hairlines, divisores            |
| `--color-accent`                     | `--green`               | Acento primario (pills, CTAs)   |
| `--color-accent-strong`              | `--green-dark`          | Hover / énfasis del acento      |
| `--color-hero-from` / `-to`          | `--hero-bg-1/2`         | Gradiente del hero              |
| `--radius-chip/control/card`         | `--radius-sm/md/lg`     | Chips / controles / tarjetas    |
| `--radius-pill`                      | `999px`                 | Botones pill                    |
| `--ease-standard`                    | `--ease-out`            | Curva estándar                  |
| `--duration-press/transition/reveal` | `--dur-fast/mid/reveal` | Feedback / transición / reveal  |

### Dark mode

`color-scheme: light` declarado. La estructura está preparada: hay un bloque
`@media (prefers-color-scheme: dark)` **comentado** en `tokens.css` que re-mapea
la capa 3. Para activarlo: descomentar, ajustar valores y cambiar `color-scheme`
a `light dark`.

## Estructura de carpetas objetivo

```
app/
  [locale]/          Rutas localizadas (page, layout, loading, error por idioma)
  layout.tsx         Root layout (html/body, providers globales)
  styles/tokens.css  Design tokens (única fuente de valores visuales)
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
- **Nunca `process.env`** fuera de `env.ts`; importa `env` desde `@/env` (ESLint
  lo bloquea).
- **Sólo tokens semánticos** en componentes (ver "Sistema de design tokens").
  Nada de hex, px de radio ni duraciones a mano fuera de `app/styles/tokens.css`.
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
