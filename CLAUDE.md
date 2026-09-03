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
  negociación de locale, mensajes tipados. El copy real se extrae en PMB-009.
- Layout raíz ensamblado (PMB-007): `<html lang>`, fuentes, skip-link,
  header/footer landmarks, `Providers`, `loading`/`error`/`not-found`, metadata
  y `viewport` base.
- La home y el header/footer son placeholders mínimos; la UI real se reconstruye
  desde PMB-011.

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
| `app/[locale]/loading.tsx`   | Fallback de Suspense (Client, `useTranslations`). Se muestra en navegaciones lentas.                       |
| `app/[locale]/error.tsx`     | Error boundary del segmento (Client). Props `{ error, retry }` (Next 16 — no `reset`). Botón de reintento. |
| `app/[locale]/not-found.tsx` | 404 localizado **con chrome**, para `notFound()` explícito desde páginas (con contexto de locale).         |
| `app/not-found.tsx`          | 404 global (documento propio, sin chrome, en `es`). Cubre URLs totalmente sin ruta, incl. `/xx/typo`.      |

> **Límite conocido**: una URL sin ruta bajo un locale válido (`/en/typo`) cae en
> el 404 global (en `es`), no en el localizado con chrome. Un catch-all
> `[locale]/[...rest]` lo arreglaría pero flashea `loading.tsx` en SSR sin JS y
> devuelve 200 en vez de 404. Se revisa si molesta (o con PPR más adelante).

### Metadata / viewport (base)

`generateMetadata` en `app/[locale]/layout.tsx` (locale-aware): `metadataBase`
desde `env`, `title.template` `"%s · Miguel Barra"`, `description`, `openGraph` /
`twitter` genéricos, `alternates.languages` (`es` / `en` / `x-default`). El
detalle fino (OG images, etc.) es PMB-016. `viewport`: `colorScheme: "light"`,
`themeColor: "#15181a"` (`--ink`).

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
  layout/            SiteHeader, SiteFooter
content/             Contenido del sitio como datos tipados                     ← pendiente
lib/                 Utilidades puras, helpers de datos, config compartida      ← pendiente
public/              Assets estáticos servidos desde "/"
references/          Sitio estático original (sólo local, en .gitignore)
```

> `content/` y `lib/` aún no existen; se crean cuando una issue lo necesite, con
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
- Origen del contenido: archivos `.ts` tipados vs. MDX vs. CMS. Por defecto,
  archivos `.ts` en `content/` hasta que haya razón para más.
- Plataforma de despliegue (Vercel es el candidato por defecto).

## Bitácora de decisiones

Ver `AGENTS.md` → **Bitácora de decisiones**. Toda issue añade su entrada allí.
