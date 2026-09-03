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
  `next/font` (PMB-005). Página de referencia: `/{locale}/design-system`.
- i18n operativo con **next-intl** (PMB-006): rutas `/es` y `/en`, proxy de
  negociación de locale, mensajes tipados.
- Todo el copy de la UI extraído a `messages/{es,en}.json` con traducción EN
  completa (PMB-009); regla ESLint contra literales en JSX.
- Primitivos de UI tipados en `components/ui/` (PMB-010): `Button`,
  `PillButton`, `CircleArrow`, `Badge`, `Tag`, `SectionHeading`, set de `Icon`s.
  Verificación visual en `/[locale]/dev`.
- Layout raíz ensamblado (PMB-007): `<html lang>`, fuentes, skip-link,
  header/footer landmarks, `Providers`, `error`/`not-found`, metadata y
  `viewport` base.
- Capa de contenido tipada en `content/` (PMB-008): testimonios, casos,
  proyectos, tech stack, nav, servicios — migrados del `index.html` legacy.
- Primitivos de UI (PMB-010), **home portada** (PMB-011) y **hojas Client de
  interactividad** (PMB-012): `MobileNav`, `HeroVideo`, `Reveal`/`HeroReveal`.
- Sección de testimonios (PMB-013): `TestimonialsSection` (Server) +
  `TestimonialsSlider` (Client hoja) — rotación, dots, autoplay, crossfade;
  listo para 1 o N testimonios.
- Sección de casos (PMB-014): `CaseStudiesSection` (Server) + `CaseStudiesCarousel`
  (Client hoja) — prev/next con wrap, contador, crossfade del panel, marco de
  navegador con captura (`next/image`) o mock de texto de fallback.

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
| i18n               | `next-intl` (`i18n/`, `proxy.ts`) — locales `es` / `en` (ver abajo)                          |

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

### Orden: proxy de i18n vs. headers

1. **`proxy.ts`** (middleware next-intl) corre **primero**: negocia el locale,
   redirige `/` → `/{locale}` (307) y prefijos desconocidos al fallback `es`.
2. Luego el enrutado de Next resuelve la página.
3. `headers()` de `next.config.ts` aplica la CSP y las cabeceras a la respuesta
   final. Las redirecciones 307 del proxy también llevan las cabeceras.

No hay conflicto: el proxy sólo redirige/reescribe rutas; no toca la CSP.

### `NODE_ENV` en `next.config.ts`

`headers()` se resuelve en build, antes de que `@/env` esté poblado (su default
`NODE_ENV` ganaría y `isProd` sería `false` → CSP con `'unsafe-eval'` y sin HSTS
en producción). Por eso `next.config.ts` lee `process.env.NODE_ENV` **directo**
(lo controla Next en ese momento) y está exento de la regla ESLint `no-process-env`.

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

## Internacionalización (i18n)

**next-intl** (estándar de App Router). Config en `i18n/`, proxy en `proxy.ts`,
plugin en `next.config.ts` (`withNextIntl`).

| Aspecto               | Decisión                                                                                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Locales               | `['es', 'en']`, `defaultLocale: 'es'`                                                                                                                                             |
| Estrategia de prefijo | **`localePrefix: 'always'`** — toda ruta lleva prefijo (`/es/…`, `/en/…`); `/` redirige al locale negociado. Elegido sobre `as-needed` para URLs simétricas y `hreflang` estable. |
| Negociación           | prefijo de URL → `Accept-Language` → `defaultLocale`                                                                                                                              |
| Fallback              | locale no soportado (`/fr`) → el proxy antepone `es` (`/es/fr`) → 404 localizado, **nunca 500**                                                                                   |
| Zona horaria          | `America/Santiago` fija en `i18n/request.ts` (formateo de fechas determinista server/cliente)                                                                                     |
| Locale inválido       | `initLocale()` (en `i18n/locale.ts`) llama `notFound()` y hace `setRequestLocale`                                                                                                 |

### Archivos

```
i18n/routing.ts      defineRouting (locales, defaultLocale, localePrefix)
i18n/navigation.ts   Link, redirect, usePathname, useRouter, getPathname (tipados)
i18n/request.ts      getRequestConfig → carga messages/{locale}.json
i18n/locale.ts       initLocale(locale): valida + setRequestLocale (usar en cada page/layout de [locale])
proxy.ts             createMiddleware(routing) + matcher que excluye api/_next/assets
global.d.ts          augmenta next-intl AppConfig (Locale + Messages tipados)
messages/{es,en}.json  catálogos (se llenan en PMB-009)
```

### Reglas

- **Navegación entre rutas**: usa `Link` / `redirect` / `useRouter` de
  `@/i18n/navigation`, nunca `next/link` ni `next/navigation` (perderían el
  prefijo de locale).
- **Toda page/layout bajo `app/[locale]/`** llama `initLocale(locale)` al inicio
  (valida el locale y habilita render estático).
- **Claves de mensajes tipadas**: referenciar una clave inexistente en
  `t('…')` es error de compilación (augmentación en `global.d.ts` contra
  `messages/en.json`).
- El `matcher` del proxy excluye `api`, `_next`, `_vercel` y archivos con
  extensión → no interfiere con `/public` ni las APIs.

### Copy de la UI — `messages/{es,en}.json`

Todo el texto visible de la interfaz vive aquí (el contenido de dominio —
proyectos, casos… — va en `content/`, ver abajo).

- **Namespace por sección**, en `PascalCase`: `Meta`, `A11y`, `Nav`,
  `LocaleSwitcher`, `Hero`, `About`, `Testimonials`, `Services`, `Arsenal`,
  `Cases`, `Projects`, `Footer`, `Loading`, `Error`, `Home`, `NotFound`.
- **`es.json`**: texto verbatim del sitio, con tildes correctas.
  **`en.json`**: traducción profesional (no literal), registro cercano de "tú".
- **Cero literales en JSX**: la regla ESLint `react/jsx-no-literals`
  (`app/**`, `components/**`; excluye `**/design-system/**`) bloquea cualquier
  texto suelto. Todo pasa por `useTranslations` / `getTranslations`.
- **Valores dinámicos**: sintaxis ICU con placeholders `{name}` — ej.
  `Cases.counter` = `"{current} / {total}"`, `Footer.copyright` = `"© {year} …"`
  (pasar `year` como **string** para que ICU no lo formatee como número).
- **Ambos catálogos tienen las mismas claves**: `npm run messages:check`
  (`scripts/check-messages.mjs`) hace el diff y falla si divergen.
- **Añadir una clave**: agrégala en el namespace correspondiente en **ambos**
  archivos; `messages:check` y el typecheck (`global.d.ts` deriva `Messages` de
  `en.json`) lo verifican.

## Layout raíz y providers

### Anatomía

```
app/layout.tsx            passthrough (`return children`) — no html/body
app/[locale]/layout.tsx   layout real:
  <html lang={locale} class="{fuentes next/font} h-full antialiased">
    <body class="flex min-h-full flex-col">
      <a.skip-link href="#top">          ← visible sólo al enfocar con teclado
      <Providers locale messages>        ← árbol de providers cliente
        <SiteHeader/>                    ← <header> landmark, FUERA de <main>
        <main id="top" class="flex flex-1 flex-col">{children}</main>
        <SiteFooter/>                    ← <footer> landmark, FUERA de <main>
      </Providers>
```

Las **páginas no renderizan `<main>`** (lo pone el layout); devuelven una
`<section>` / `<div>` que rellena el `<main>` (`flex-1`).

### Providers

`components/Providers.tsx` (`"use client"`) es el único punto de contexto de
cliente. Hoy sólo `NextIntlClientProvider` (recibe `locale` + `messages` del
layout servidor). Para añadir otro provider (tema, analítica, query client) se
anida **aquí dentro**, sin tocar el layout.

### UI del sistema

| Archivo                      | Qué                                                                                                        |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `app/[locale]/error.tsx`     | Error boundary del segmento (Client). Props `{ error, retry }` (Next 16 — no `reset`). Botón de reintento. |
| `app/[locale]/not-found.tsx` | 404 localizado **con chrome**, para `notFound()` explícito desde páginas (con contexto de locale).         |
| `app/not-found.tsx`          | 404 global (documento propio, sin chrome, en `es`). Cubre URLs totalmente sin ruta, incl. `/xx/typo`.      |

> **Sin `loading.tsx` en la raíz de `[locale]`**: un `loading.tsx` de segmento
> mete la página tras un Suspense, y con contenido async (las secciones RSC de
> la home) Next serializa el shell con el fallback incluso en SSG. Un sitio
> estático no lo quiere. Cuando una ruta futura haga fetch lento, añade su
> `loading.tsx` acotado a ese segmento.

> **Límite conocido**: una URL sin ruta bajo un locale válido (`/en/typo`) cae en
> el 404 global (en `es`), no en el localizado con chrome. Se revisa con PPR más
> adelante.

### Metadata / viewport (base)

`generateMetadata` en `app/[locale]/layout.tsx` (locale-aware): `metadataBase`
desde `env`, `title.template` `"%s · Miguel Barra"`, `description`, `openGraph` /
`twitter` genéricos, `alternates.languages` (`es` / `en` / `x-default`). El
detalle fino (OG images, etc.) es PMB-016. `viewport`: `colorScheme: "light"`,
`themeColor: "#15181a"` (`--ink`).

## Capa de contenido

"Lo que dice el sitio", tipado y separado de los componentes. Vive en
**`content/`**. Los strings puramente de UI (botones, "Cargando", labels de nav)
**no** van aquí — esos son `messages/` (PMB-009).

### Archivos

```
content/types.ts        Interfaces de todos los dominios + Localized<T> / pickLocale
content/testimonials.ts  testimonials: Testimonial[]
content/case-studies.ts  caseStudies: CaseStudy[]
content/projects.ts      projects: Project[]
content/tech-stack.ts    techStackRows: TechItem[][]  (2 filas, como el marquee legacy)
content/navigation.ts    navItems: NavItem[]  (label vía messages Nav.<key>)
content/services.ts      services: ServiceCard[]  (title/desc vía messages Services.<key>)
content/index.ts         barrel — `import { projects, pickLocale } from "@/content"`
```

### Contenido por idioma

Los campos que difieren por locale son `Localized<T>` = `{ es: T; en: T }`:
títulos y descripciones de casos y proyectos, `imageAlt`, `role` de testimonios.
El `image` de un testimonio (retrato bajo `/public`) es opcional y no localizado.
Se resuelven con `pickLocale(value, locale)`. Nav y servicios sólo guardan
estructura (`key`, `index`, `icon`); su texto va en `messages/` (PMB-009).

- Las **citas** de testimonios (`quote`) NO se traducen — se guardan verbatim en
  su idioma original.
- Los `label` de tech-stack se guardan en su forma canónica (`"Next.js"`); el
  look en mayúsculas del marquee es CSS.

### Añadir un item

1. Añade el objeto al array del dominio en `content/<dominio>.ts`.
2. Rellena **todos** los campos `Localized` con `es` y `en` (TS obliga).
3. Un campo que falta o está mal escrito es error de compilación en el consumidor.

`caseStudies` tiene un `TODO(PMB-008)` para el segundo caso de Pulso (extensión de
Chrome), pendiente de descripción/stack/link.

En `CaseStudy`, `image` + `imageAlt`, `mockTag` + `mockHeadline` y `url` son
**opcionales**: un caso trae imagen (`image` + `imageAlt`) **o** mock de texto
(`mockTag` + `mockHeadline`); sin `url` el enlace cae al ancla de contacto. Ver
"CaseStudiesCarousel (PMB-014)".

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

| Grupo        | Tokens                                                                                                                                                                                                                                                                                  |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Espaciado    | `--space-3xs`(4) … `--space-4xl`(128). **En componentes usa la escala numérica de Tailwind** (`p-4`, `gap-6`, `py-24`) — no se remapea `--spacing-*` porque los nombres t-shirt chocan con `--container-*` y romperían `max-w-*`. `--space-*` documenta los pasos y sirve para `var()`. |
| Anchos       | `--measure` (44rem, columna de lectura) → `max-w-measure` · `--page-width` (64rem) → `max-w-page`                                                                                                                                                                                       |
| Tipografía   | `--text-2xs`(11) `xs`(12) `sm`(14) `base`(16) `md`(18) `lg`(22) `xl`(28) · `--text-2xl/3xl/display` fluidos (`clamp`)                                                                                                                                                                   |
| Interlineado | `--leading-none/tight`(1.1)`/snug/normal`(1.5)`/relaxed`(1.65)                                                                                                                                                                                                                          |
| Tracking     | `--tracking-tighter`(−.025em) `tight` `normal` `wide` `wider`(.08em, labels mono) `widest`                                                                                                                                                                                              |
| Sombra       | `--shadow-hairline` (1:1), `--shadow-sm`, `--shadow-md`, `--shadow-lg` (1:1)                                                                                                                                                                                                            |

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

## Primitivos de UI

Piezas reutilizables en `components/ui/` (`import { Button, Tag } from
"@/components/ui"`). Estilos con **CSS Modules** (`*.module.css`) usando
**exclusivamente tokens** de PMB-005 (`var(--…)`); las únicas medidas literales
son diámetros de controles (44/52 px), para los que no hay escala de tokens.
Todos exportan su tipo `Props`; sin `any`; `ref` como prop (React 19, sin
`forwardRef`).

| Primitivo        | Para qué                                                                                                                                                                                                                                                                |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`         | Botón/enlace polimórfico (`as="a"`). Variantes `dark` / `light` / `outline` / `link`, tamaños `sm` / `md`. Feedback `:active` (escala), hover con `@media (hover: hover)`.                                                                                              |
| `PillButton`     | CTA compuesto: pastilla oscura + `CircleArrow` que rota 45° al hacer hover del control.                                                                                                                                                                                 |
| `CircleArrow`    | El círculo verde con flecha (`sm` / `md` / `lg`); acepta otro `icon`.                                                                                                                                                                                                   |
| `Badge`          | Eyebrow con punto de acento. `tone="inverse"` para secciones oscuras.                                                                                                                                                                                                   |
| `Tag`            | Chip de tecnología. `tone="inverse"` para fondos oscuros.                                                                                                                                                                                                               |
| `SectionHeading` | Eyebrow + título (+ subtítulo). `as` = `h1..h3`; `variant="ghost"` = título grande y desvaído.                                                                                                                                                                          |
| `Icon` (set)     | SVGs de la referencia como componentes (`ArrowRightIcon`, `MenuIcon`, `FrontendIcon`, `GithubIcon`, …). **Decorativos por defecto**: `aria-hidden` + `focusable="false"`; se sobreescribe si el icono aporta significado. Tamaño = `font-size`, color = `currentColor`. |

### Ruta de verificación: `/[locale]/dev`

**Decisión: ruta de app, no Storybook.** Renderiza cada primitivo con sus
variantes y estados (hover, `:active`, foco, disabled) usando el runtime real y
los tokens ya cargados — sin dependencia ni build extra que mantener. `noindex`,
igual que `/[locale]/design-system`.

## Árbol de la home · patrón Server padre / Client hoja

La home entera es **Server Component**. La interactividad son **hojas Client**,
lo más abajo posible del árbol: los Server padres pasan datos/labels por props y
la hoja Client sólo hace la parte que necesita el navegador.

```
app/[locale]/layout.tsx  (Server)
  <script>html.classList.add('js')</script>   — antes del primer paint
  <SiteHeader>            (Server)
    <LanguageSwitcher/>    ← CLIENT hoja — cambia /es ↔ /en preservando ruta + ancla
    <MobileNav/>           ← CLIENT hoja — burger + dialog modal (portal a <body>)
  <main>
    app/[locale]/page.tsx (Server):
      <HeroSection>        id=hero-title
        <HeroVideo/>        ← CLIENT hoja — <video> lazy (0.55x, fade sobre poster)
        <HeroReveal>        ← CLIENT hoja — fade del contenido al cargar (rAF)
      <AboutSection>       id=about   · next/image, t.rich heading   →  <Reveal>
      <TestimonialsSection> id=testimonios · fondo teal, <h2 sr-only>  →  <Reveal>
        <TestimonialsSlider/> ← CLIENT hoja — <blockquote> rotatorio, dots, autoplay 6s
      <ServicesSection>    id=servicios · 3 cards desde content       →  <Reveal> (stagger)
      <ArsenalSection>     id=arsenal · marquee CSS + <ul.sr-only>
      <CaseStudiesSection> id=casos   · <h2 id=cases-title>              →  <Reveal>
        <CaseStudiesCarousel/> ← CLIENT hoja — prev/next, contador, crossfade, marco navegador
      <ProjectsSection>    id=proyectos · filas-enlace                →  <Reveal> (stagger)
  <SiteFooter>           (Server)
```

### Motion (PMB-012)

- **`Reveal`** (`components/motion/`): wrapper Client. Fade + `translateY` al
  entrar en viewport (`IntersectionObserver`, `rootMargin` inferior negativo),
  stagger automático entre `[data-reveal]` hermanos. El hero se **excluye**.
- **`HeroReveal`**: fade del contenido del hero **al cargar** (rAF + red de
  seguridad `setTimeout`), nunca ligado al scroll.
- **`HeroVideo`**: descarga y reproduce el vídeo **solo si conviene** — sin
  `prefers-reduced-motion`, sin `saveData`, viewport `≥ 761px`. Si no, queda el
  poster. `playbackRate = 0.55`; fade-in con fallback 2.5s.
- **Progressive enhancement**: el script inline añade `js` a `<html>` antes del
  paint. El CSS oculta un `Reveal` **solo** bajo `html.js` y antes de `.in`
  → **sin JS todo es visible**. `prefers-reduced-motion` → sin movimiento.

### TestimonialsSlider (PMB-013)

Hoja Client (`components/sections/TestimonialsSlider.tsx`). El padre
`TestimonialsSection` (Server) resuelve el contenido para el locale activo
(`pickLocale` de `content/testimonials`) y le pasa por props:

| Prop          | Tipo                                              | Qué                                     |
| ------------- | ------------------------------------------------- | --------------------------------------- |
| `items`       | `{ quote; name; role; image? }[]` (ya localizado) | Una recomendación por entrada.          |
| `linkedinUrl` | `string`                                          | URL absoluta del CTA "Ver en LinkedIn". |

Los textos de UI (`photoAlt`, `selectLabel`, `dotLabel`, `viewOnLinkedin`,
`source`) los lee la propia hoja con `useTranslations("Testimonials")`.

- **Avatar**: `next/image` (52×52, `object-fit: cover`) cuando el testimonio
  trae `image` (ruta bajo `/public`); si no, cae al `UserIcon` genérico.

- **1 testimonio**: se muestra la cita, los dots van `hidden` y **no hay
  autoplay** ni maquinaria de crossfade.
- **N testimonios**: dots (uno por testimonio, `≥44px` de área táctil,
  `aria-current` en el activo, `role="group"` + `aria-label`), autoplay cada 6s
  que **se reinicia al interactuar** (estado `interactions` en las deps del
  efecto), y crossfade del `<blockquote>` (`opacity` vía clase `.fading`).
- **Sin colas**: `index` es el destino único; `visibleIndex` sólo lo alcanza
  cuando la cita saliente ya se desvaneció, así el texto nunca queda a medias
  aunque se cambie rápido. El `setTimeout` del swap se cancela en cada cambio.
- **`prefers-reduced-motion`**: swap instantáneo (sin retardo ni transición; la
  media query anula `transition` y el efecto salta el `setTimeout`).

### CaseStudiesCarousel (PMB-014)

Hoja Client (`components/sections/CaseStudiesCarousel.tsx`). El padre
`CaseStudiesSection` (Server) resuelve `content/case-studies` para el locale y le
pasa `items: CarouselCase[]`. Los textos (`heading`, `subtitle`, `counter`,
`previous`, `next`, `linkDefault`, `linkProject`) los lee la hoja con
`useTranslations("Cases")`. La hoja renderiza el `<h2 id="cases-title">` (SSR
igual); la sección sigue Server.

- **1 caso**: la tarjeta sola, sin flechas.
- **N casos**: prev/next con wrap, contador (ligado a `visibleIndex`, cambia con
  la tarjeta), crossfade de opacidad del panel de info + media (el marco del
  navegador no se mueve). Misma mecánica `index` / `visibleIndex` que el slider
  de testimonios → un doble-clic rápido nunca deja la tarjeta a medias.
- **`aria-live="polite"`** en la tarjeta anuncia el caso nuevo al navegar.
- **`prefers-reduced-motion`**: cambio instantáneo.

**Un caso con imagen** trae `image` (ruta bajo `/public`) + `imageAlt`
(`Localized`): se renderiza con `next/image` (`width`/`height` 1200×630 + `sizes`,
caja con `aspect-ratio` → sin layout shift) dentro del marco de navegador.
**Un caso sin imagen** omite `image` y trae `mockTag` (string) + `mockHeadline`
(`Localized`): se renderiza el mock de texto de fallback.
**El enlace** es "Ver el proyecto" (`target="_blank" rel="noopener"`) si el caso
trae `url`; si no, "Hablemos" → `/#contacto`.

### Convenciones de las secciones

- Componente Server `export function XSection()` en `components/sections/`, un
  `*.module.css` por sección, **solo tokens** (`var(--…)`).
- `<section id="…" aria-labelledby="…-title">`; un `<h2 id="…-title">` por
  sección; `<h3>` para tarjetas/filas.
- Texto: `getTranslations("<Namespace>")`. Datos: `content/`. Locale para
  `pickLocale`: `getLocale()`.
- El header es `position: fixed`; `main` lleva `padding-top: var(--header-height)`
  y el `HeroSection` lo contrarresta con `margin-top` negativo para quedar detrás.
- Media queries 1:1 con la referencia: burger a ≤900px, servicios 3→1 a ≤900px,
  hero anclado abajo a ≤900px, header sin Contacto/idioma a ≤760px.

## Estructura de carpetas objetivo

```
app/
  layout.tsx         Root layout passthrough (`return children`)
  not-found.tsx      404 global (documento propio)
  [locale]/          Rutas localizadas — raíz real: layout (html/body/providers),
                     page, loading, error, not-found
  styles/tokens.css  Design tokens (única fuente de valores visuales)
  globals.css        Tailwind + @theme + estilos base + .skip-link
i18n/                routing, navigation, request, locale (config next-intl)
proxy.ts             Middleware de i18n (negociación de locale)
messages/            Catálogos de traducción por idioma (es.json, en.json)
components/
  Providers.tsx      Árbol de providers cliente
  layout/            SiteHeader, SiteFooter (Server) · LanguageSwitcher, MobileNav (Client)
  ui/                Primitivos tipados + CSS Modules (ver "Primitivos de UI")
  sections/          Secciones Server de la home + hojas Client (HeroVideo, TestimonialsSlider, CaseStudiesCarousel)
  motion/            Reveal, HeroReveal (Client hojas — ver "Motion")
content/             Contenido del sitio como datos tipados (ver "Capa de contenido")
lib/                 Utilidades puras, helpers de datos, config compartida      ← pendiente
public/              Assets estáticos servidos desde "/"
references/          Sitio estático original (sólo local, en .gitignore)
```

> `lib/` aún no existe; se crea cuando una issue lo necesite, con
> esta forma canónica.

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

- Estrategia de animación (CSS puro vs. librería) para reproducir el hero original.
- Plataforma de despliegue (Vercel es el candidato por defecto).

## Bitácora de decisiones

Ver `AGENTS.md` → **Bitácora de decisiones**. Toda issue añade su entrada allí.
