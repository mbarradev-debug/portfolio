<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# AGENTS.md — Convenciones operativas

> Este archivo (y `CLAUDE.md`, que lo importa) es la **memoria viva** del proyecto.
> El bloque de arriba lo gestiona `next dev`; **no lo borres** — cualquier
> contenido antes o después se conserva.

## Protocolo obligatorio en cada issue

1. **Al iniciar**: leer `CLAUDE.md` y este `AGENTS.md` completos antes de tocar
   código. Son el contexto vigente (objetivo, arquitectura, stack, convenciones,
   decisiones ya tomadas).
2. **Durante**: respetar las convenciones aquí descritas. Si una decisión nueva
   contradice o amplía algo, es parte del trabajo de la issue actualizar estos
   archivos.
3. **Al finalizar**, antes de abrir la PR:
   - Añadir una entrada a la **Bitácora de decisiones** por cada decisión no
     trivial tomada (aunque sea "se mantiene X").
   - Actualizar `CLAUDE.md` si cambió el estado, la arquitectura objetivo, el
     stack, la estructura de carpetas o las decisiones abiertas.
   - Actualizar el `README.md` si cambió algo que afecta a levantar el proyecto.

## Cómo levantar el proyecto (desarrollador nuevo)

Requisitos: **Node.js ≥ 20.9**, **npm ≥ 10**.

```bash
git clone <repo> && cd portfolio
npm install                 # instala deps y, vía "prepare", los hooks de Husky
cp .env.example .env.local   # ajusta valores si hace falta
npm run dev                  # http://localhost:3000
```

Con eso el sitio corre en local. No hace falta ningún servicio externo para
desarrollo.

### Configurar `.env.local`

`env.ts` valida las variables al arrancar (Zod + `@t3-oss/env-nextjs`). Si falta
una requerida, `npm run dev` / `npm run build` **falla** nombrando la variable.

1. `cp .env.example .env.local`
2. Rellena **`NEXT_PUBLIC_SITE_URL`** (en local vale `http://localhost:3000`).
3. Rellena **`RESEND_API_KEY`** y **`CONTACT_TO_EMAIL`** (requeridas desde
   PMB-015). Para desarrollo de UI sin enviar emails de verdad, sirve cualquier
   valor no vacío / un email cualquiera: la action devuelve un error controlado
   al fallar el envío. `CONTACT_RATE_LIMIT` es opcional (default 5).
4. Alternativa para builds de contenedor: `SKIP_ENV_VALIDATION=1`.
5. `.env.local` está en `.gitignore` — no lo commitees. El inventario completo
   está en `CLAUDE.md` → "Variables de entorno".

En el código: importa `env` desde `@/env`, nunca `process.env` (ESLint lo
bloquea).

## Scripts npm

| Script                   | Para qué                                                              |
| ------------------------ | --------------------------------------------------------------------- |
| `npm run dev`            | Servidor de desarrollo (Turbopack) en `http://localhost:3000`.        |
| `npm run build`          | Build de producción.                                                  |
| `npm run start`          | Sirve el build de producción (requiere `build` previo).               |
| `npm run lint`           | ESLint sobre todo el repo.                                            |
| `npm run typecheck`      | `tsc --noEmit` con `strict: true`.                                    |
| `npm run format`         | Prettier `--write` sobre todo el repo.                                |
| `npm run format:check`   | Prettier `--check` (no modifica; útil en CI).                         |
| `npm run messages:check` | Verifica que `messages/es.json` y `en.json` tengan las mismas claves. |

## Cómo verificar las cabeceras de seguridad

La política vive en `next.config.ts`; su justificación en `CLAUDE.md` →
"Cabeceras de seguridad".

```bash
npm run build && npm run start        # servidor de producción en :3000
curl -sI http://localhost:3000        # inspecciona las cabeceras de respuesta
```

Comprobar:

- Presentes: `Content-Security-Policy`, `X-Frame-Options` (`DENY`),
  `X-Content-Type-Options` (`nosniff`), `Referrer-Policy`, `Permissions-Policy`.
- `X-Powered-By` **ausente**.
- `Strict-Transport-Security` presente con `npm run start` (producción) y
  **ausente** con `npm run dev`.
- En el navegador (DevTools → Console): cargar la home y confirmar **cero
  violaciones de CSP** (fuentes, imágenes y vídeo cargan).

## Cómo verificar i18n

```bash
npm run build && npm run start
curl -sI http://localhost:3000/                       # 307 → /es
curl -sI -H 'Accept-Language: en' http://localhost:3000/   # 307 → /en
curl -sI -H 'Accept-Language: fr' http://localhost:3000/   # 307 → /es (fallback)
curl -s -o /dev/null -w '%{http_code}\n' http://localhost:3000/es/fr   # 404, no 500
```

`/es` y `/en` deben renderizar texto distinto (leído de `messages/`). Referenciar
una clave inexistente en `t('…')` debe fallar en `npm run typecheck`.

## Cómo verificar el formulario de contacto

Contrato y flujo en `CLAUDE.md` → "Formulario de contacto".

Con `RESEND_API_KEY` / `CONTACT_TO_EMAIL` cualquiera (no vacías) en `.env.local`:

- **Válido**: rellenar los 3 campos y enviar. Con clave real → llega el email y
  la UI muestra "¡Mensaje enviado!". Con clave falsa → error genérico (la action
  loguea `[contact] Resend responded 401` y no lanza).
- **Inválido**: `name` < 2, email mal formado o `message` < 10 → error localizado
  bajo el campo, `aria-invalid`, foco al primero; no se envía.
- **Honeypot**: rellenar el campo oculto `company` por consola →
  `{ success: true }` y **cero** llamadas a Resend en el log.
- **Rate limit**: 6 envíos válidos seguidos desde la misma IP → el 6º devuelve el
  error de rate limit legible (`CONTACT_RATE_LIMIT` o default 5).
- **Sin clave en el bundle**: `grep -rl "api.resend.com\|RESEND" .next/static/` no
  debe encontrar nada.
- **Sin JS**: el `<form>` lleva `action` + campos `$ACTION_*`; el POST nativo
  ejecuta la action y el resultado se renderiza en el servidor.

## Flujo de ramas

- **Una rama por issue**, creada desde `main` actualizado.
- Nomenclatura: `duo-{número-issue}-{slug}` — número de la issue y un slug corto
  en `kebab-case` de la descripción. Ej.: `duo-1204-bootstrap-context-docs`.
- Linear genera además un nombre de rama canónico por issue (`mbarragit/dbo-{n}-…`);
  si trabajas desde Linear, **ese nombre generado es la fuente de verdad** y
  sustituye al patrón manual de arriba.
- No se commitea directamente a `main`. `main` sólo avanza por merge de PR.

## Política de commits

- **Conventional Commits**: `<tipo>(<id-issue>): <resumen en minúsculas>`.
  - Tipos: `feat`, `fix`, `refactor`, `chore`, `docs`, `test`, `perf`, `build`,
    `ci`.
  - `id-issue` en minúsculas, ej. `dbo-1204`.
  - Asunto ≤ 72 caracteres, sin punto final. Cuerpo sólo si aporta contexto real.
- El commit lo firma la persona desarrolladora. **Nada de atribución a IA** en el
  historial (mensajes, trailers, autoría, títulos/descripcion de PR).
- El hook de pre-commit (`lint-staged` + `typecheck`) debe pasar. Saltarlo
  (`--no-verify`) sólo en casos justificados y dejándolo anotado en la PR.

## Checklist de "definición de terminado" (DoD)

Antes de marcar una issue como lista / abrir la PR:

- [ ] Todos los criterios de aceptación de la issue se cumplen.
- [ ] `npm run lint`, `npm run typecheck` y `npm run build` pasan en verde.
- [ ] `npm run format:check` y `npm run messages:check` limpios.
- [ ] Ningún texto de UI hardcodeado: todo vía `messages/` (lo verifica ESLint).
- [ ] Cambios acotados al alcance de la issue (sin arreglos "de paso" no pedidos).
- [ ] RSC por defecto; `"use client"` sólo donde de verdad hace falta.
- [ ] Sin valores visuales a mano: colores/radios/duraciones sólo desde
      `app/styles/tokens.css`; los componentes usan tokens semánticos.
- [ ] `CLAUDE.md` / `AGENTS.md` actualizados si cambió contexto o convenciones.
- [ ] Nueva entrada en la **Bitácora de decisiones**.
- [ ] `README.md` actualizado si cambió el arranque del proyecto.
- [ ] PR abierta con el checklist; **no** se hace merge (lo hace la persona
      responsable).

## Bitácora de decisiones

Registro append-only. Cada issue añade una fila con **fecha (YYYY-MM-DD)**, la
**issue** y la **decisión** (con el porqué en una línea).

| Fecha      | Issue    | Decisión                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| ---------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-02 | PMB-001  | **Sin directorio `src/`**: estructura plana con `app/` en la raíz; menos indirección para un sitio pequeño.                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-02 | PMB-001  | **Gestor de paquetes: npm** (lockfile `package-lock.json` ya presente en el scaffold; cero setup extra).                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-09-02 | PMB-001  | **Next.js `16.3.4`** (App Router + Turbopack por defecto) como versión base del proyecto.                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-09-02 | PMB-001  | `index.html` legacy movido a `/references` (en `.gitignore`); assets reales del portfolio en `/public`.                                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-09-02 | PMB-002  | Se crean `CLAUDE.md` (contexto) y `AGENTS.md` (operativa) con protocolo "leer al iniciar / actualizar al finalizar" y esta bitácora.                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-09-02 | PMB-002  | Arquitectura objetivo fijada: **RSC por defecto, Client Components sólo como hojas**; estructura `app/[locale]`, `components/`, `content/`, `messages/`, `lib/`.                                                                                                                                                                                                                                                                                                                                         |
| 2026-09-02 | PMB-003  | Cabeceras de seguridad y CSP en `next.config.ts` (`headers()` estático), no en middleware.                                                                                                                                                                                                                                                                                                                                                                                                               |
| 2026-09-02 | PMB-003  | CSP `script-src` con `'unsafe-inline'` en vez de nonce: el nonce forzaría render dinámico en todo el sitio (choca con SSG); riesgo bajo sin auth/formularios. Revisar en PMB-006.                                                                                                                                                                                                                                                                                                                        |
| 2026-09-02 | PMB-003  | Sin Google Fonts en la CSP: `next/font` sirve las fuentes self-hosted.                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-09-02 | PMB-003  | `Strict-Transport-Security` sólo en producción (`NODE_ENV === 'production'`).                                                                                                                                                                                                                                                                                                                                                                                                                            |
| 2026-09-02 | PMB-003  | Redirect `/` → locale por defecto delegado al middleware de i18n de PMB-006 (aún no existe `app/[locale]`).                                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-02 | PMB-003  | `images.formats = ['image/avif', 'image/webp']`; `remotePatterns` vacío (sin imágenes remotas por ahora).                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-09-02 | PMB-004  | Variables de entorno centralizadas en `env.ts` con `@t3-oss/env-nextjs` + Zod (bloques `server` / `client` / `shared`).                                                                                                                                                                                                                                                                                                                                                                                  |
| 2026-09-02 | PMB-004  | `process.env` prohibido fuera de `env.ts` vía ESLint `no-restricted-properties`; `next.config.ts` migrado a `env.NODE_ENV`.                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-02 | PMB-004  | Separación server/client la garantiza t3-env en **runtime** (lanza al acceder desde cliente) + el bundling de Next, no el compilador.                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-09-02 | PMB-004  | `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_RATE_LIMIT` quedan `optional()` hasta PMB-015. Única requerida hoy: `NEXT_PUBLIC_SITE_URL`.                                                                                                                                                                                                                                                                                                                                                             |
| 2026-09-02 | PMB-005  | Design tokens en `app/styles/tokens.css` en 3 capas (primitivos 1:1 del legacy / escalas / semánticos); componentes usan sólo la capa semántica.                                                                                                                                                                                                                                                                                                                                                         |
| 2026-09-02 | PMB-005  | Tokens expuestos a Tailwind con `@theme inline` en `globals.css` (permite re-map en runtime para dark mode).                                                                                                                                                                                                                                                                                                                                                                                             |
| 2026-09-02 | PMB-005  | Tipografías: Plus Jakarta Sans / Playfair Display italic / JetBrains Mono vía `next/font/google` (self-hosted, `variable`).                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-02 | PMB-005  | Dark mode: estructura preparada (bloque `@media` comentado en `tokens.css`), no activado.                                                                                                                                                                                                                                                                                                                                                                                                                |
| 2026-09-02 | PMB-005  | `app/page.tsx` (placeholder de CNA) sustituido por un home mínimo basado en tokens con link a `/design-system`; UI real desde PMB-007.                                                                                                                                                                                                                                                                                                                                                                   |
| 2026-09-02 | PMB-006  | i18n con **next-intl** (estándar App Router). `localePrefix: 'always'`; `/` redirige por `Accept-Language` con fallback a `es`.                                                                                                                                                                                                                                                                                                                                                                          |
| 2026-09-02 | PMB-006  | Middleware en `proxy.ts` (nombre de Next 16, no `middleware.ts`). Orden: proxy → routing → `headers()` de `next.config.ts`.                                                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-02 | PMB-006  | Todas las rutas bajo `app/[locale]/`; `app/layout.tsx` es passthrough (`return children`). Helper `i18n/locale.ts#initLocale` en cada page/layout.                                                                                                                                                                                                                                                                                                                                                       |
| 2026-09-02 | PMB-006  | Locale no soportado (`/fr`) → proxy reescribe a `/es/fr` → 404 localizado, nunca 500.                                                                                                                                                                                                                                                                                                                                                                                                                    |
| 2026-09-02 | PMB-006  | **Fix regresión PMB-004**: `next.config.ts` vuelve a `process.env.NODE_ENV` (vía `env.NODE_ENV` daba `isProd=false` en build → CSP con `unsafe-eval` y sin HSTS). Exento en ESLint.                                                                                                                                                                                                                                                                                                                      |
| 2026-09-02 | PMB-006  | **Fix PMB-005**: no se remapea `--spacing-*` (los nombres t-shirt chocaban con `--container-*` y rompían `max-w-*`). Componentes usan la escala numérica de Tailwind; `--measure` / `--page-width` para anchos.                                                                                                                                                                                                                                                                                          |
| 2026-09-02 | PMB-007  | Layout: `app/[locale]/layout.tsx` es el real; `<header>`/`<footer>` como landmarks fuera de `<main id="top">`; las páginas ya no renderizan `<main>`.                                                                                                                                                                                                                                                                                                                                                    |
| 2026-09-02 | PMB-007  | `components/Providers.tsx` (`"use client"`) es el único punto de contexto cliente; recibe `locale` + `messages` del layout (un boundary cliente no puede inferirlos).                                                                                                                                                                                                                                                                                                                                    |
| 2026-09-02 | PMB-007  | `error.tsx` usa la prop `retry` (Next 16 renombró `reset` → `retry`); es Client (`useTranslations`).                                                                                                                                                                                                                                                                                                                                                                                                     |
| 2026-09-02 | PMB-007  | 404: `[locale]/not-found.tsx` (localizado, con chrome) para `notFound()` explícito; `app/not-found.tsx` (global, `es`, documento propio) para URLs sin ruta. Límite: `/en/typo` cae en el global (`es`).                                                                                                                                                                                                                                                                                                 |
| 2026-09-02 | PMB-007  | Skip-link con `.skip-link:focus` (no `:focus-visible`, para que funcione con cualquier foco de teclado). `scroll-padding-top` compensa el header.                                                                                                                                                                                                                                                                                                                                                        |
| 2026-09-02 | PMB-007  | `timeZone: "America/Santiago"` fijo en `i18n/request.ts` (sitio de una sola zona) — evita el warning `ENVIRONMENT_FALLBACK` y mismatches de hidratación en fechas.                                                                                                                                                                                                                                                                                                                                       |
| 2026-09-02 | PMB-008  | Capa de contenido en `content/` (un archivo por dominio + `types.ts` + barrel). Sin `any`; todo `readonly`. Campos con variante por idioma como `Localized<T>` (`{ es, en }`) + `pickLocale`.                                                                                                                                                                                                                                                                                                            |
| 2026-09-02 | PMB-008  | Citas de testimonios NO se traducen (verbatim). Labels de tech-stack en forma canónica (`"Next.js"`), no en mayúsculas (eso es CSS). `repoUrl` de Pulso añadido desde el CV.                                                                                                                                                                                                                                                                                                                             |
| 2026-09-02 | PMB-008  | Nav y servicios también migrados a `content/` (tienen tipo en la issue y datos en la referencia); el 2º caso de Pulso queda como `TODO(PMB-008)` en `case-studies.ts`.                                                                                                                                                                                                                                                                                                                                   |
| 2026-09-02 | PMB-009  | Todo el copy de la UI en `messages/{es,en}.json`, namespace por sección en `PascalCase`. EN = traducción profesional. `content/services.ts` pasa a sólo estructura (`key`); su texto va a `Services.<key>`.                                                                                                                                                                                                                                                                                              |
| 2026-09-02 | PMB-009  | Regla ESLint `react/jsx-no-literals` (`app/**`, `components/**`; excluye `**/design-system/**`). `npm run messages:check` (`scripts/check-messages.mjs`) verifica que ambos catálogos tengan las mismas claves.                                                                                                                                                                                                                                                                                          |
| 2026-09-02 | PMB-009  | ICU con placeholders para valores dinámicos (`Cases.counter`, `Footer.copyright`). `year` se pasa como string para que ICU no lo formatee como número ("2.026").                                                                                                                                                                                                                                                                                                                                         |
| 2026-09-02 | PMB-010  | Primitivos de UI en `components/ui/` con **CSS Modules** + tokens de PMB-005. `ref` como prop (React 19, sin `forwardRef`). `Button`/`PillButton` polimórficos (`as="a"`).                                                                                                                                                                                                                                                                                                                               |
| 2026-09-02 | PMB-010  | **Ruta de app `/[locale]/dev`, no Storybook** — runtime real, sin dependencia ni build extra; `noindex`.                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2026-09-02 | PMB-010  | Iconos SVG como componentes, `aria-hidden` + `focusable="false"` por defecto. ESLint `react/jsx-no-literals` ahora también excluye `**/dev/**`; `no-unused-vars` ignora identificadores `_*`.                                                                                                                                                                                                                                                                                                            |
| 2026-09-02 | PMB-011  | Home = secciones Server en `components/sections/` (Hero/About/Services/Arsenal/CaseStudies/Projects). Único Client: `LanguageSwitcher`. Un `*.module.css` por sección, solo tokens.                                                                                                                                                                                                                                                                                                                      |
| 2026-09-02 | PMB-011  | **`loading.tsx` de la raíz de `[locale]` eliminado**: metía la home tras un Suspense y Next serializaba el shell con el fallback incluso en SSG. Los `loading.tsx` futuros van acotados a su segmento.                                                                                                                                                                                                                                                                                                   |
| 2026-09-02 | PMB-011  | Header `position: fixed`; `main { padding-top: var(--header-height) }` (globals) y el hero lo contrarresta con `margin-top` negativo. `NavItem.key` / `ServiceCard.key` pasan a uniones literales (typed `t()`).                                                                                                                                                                                                                                                                                         |
| 2026-09-02 | PMB-011  | CaseStudiesSection renderiza la card estática; el carrusel prev/next es PMB-014. `content/services.ts` vuelve a estructura + `ServiceKey`/`ServiceIcon`.                                                                                                                                                                                                                                                                                                                                                 |
| 2026-09-02 | PMB-012  | Interactividad como hojas Client: `MobileNav` (burger + dialog, portal a `<body>` para escapar el `backdrop-filter`), `HeroVideo`, `Reveal`/`HeroReveal`. Sus padres siguen Server.                                                                                                                                                                                                                                                                                                                      |
| 2026-09-02 | PMB-012  | Progressive enhancement del reveal: script inline añade `js` a `<html>` antes del paint; el CSS oculta un `Reveal` solo bajo `html.js` → sin JS todo visible. El `<html>` lleva `suppressHydrationWarning` (React sí avisa por el `class` extra).                                                                                                                                                                                                                                                        |
| 2026-09-02 | PMB-012  | `HeroVideo`: descarga el vídeo solo sin reduced-motion, sin save-data y viewport ≥761px; `playbackRate = 0.55`; fade sobre el poster con fallback 2.5s.                                                                                                                                                                                                                                                                                                                                                  |
| 2026-09-02 | PMB-012  | ESLint `react-hooks/set-state-in-effect` bajado a `warn`: `setState` en efecto es el patrón seguro para estado sólo-cliente (mounted, matchMedia, IntersectionObserver) sin mismatch de hidratación.                                                                                                                                                                                                                                                                                                     |
| 2026-09-03 | PMB-013  | `TestimonialsSection` (Server) resuelve el contenido por locale y lo pasa a `TestimonialsSlider` (Client hoja); los textos de UI los lee la hoja con `useTranslations` (no prop-drilling), porque `dotLabel` necesita un `{index}` por dot.                                                                                                                                                                                                                                                              |
| 2026-09-03 | PMB-013  | Slider sin cola de transiciones: `index` (destino) + `visibleIndex` (se actualiza sólo tras el fade-out); el `setTimeout` del swap se cancela en cada cambio de `index`. `fading` = `index !== visibleIndex`; `prefers-reduced-motion` → swap directo.                                                                                                                                                                                                                                                   |
| 2026-09-03 | PMB-013  | Dots: `role="group"` + `aria-label` (no `role="tablist"` — los `<button>` no son `role="tab"` y la cita no es un `tabpanel`); `aria-current` en el activo; área táctil 44px vía `background-clip: content-box` (44px es el literal de control documentado).                                                                                                                                                                                                                                              |
| 2026-09-03 | PMB-013  | `TestimonialsSection` se inserta entre About y Services (orden del `index.html` legacy). Se envuelve en `<Reveal>` como el resto de secciones bajo el fold.                                                                                                                                                                                                                                                                                                                                              |
| 2026-09-03 | PMB-013  | `Testimonial.image` (opcional, ruta bajo `/public`, no localizado) → avatar con `next/image` (52×52, `object-fit: cover`); sin `image` cae al `UserIcon`. `alt` vía `Testimonials.photoAlt` (`{name}`). Retrato real de Paola Quiroga.                                                                                                                                                                                                                                                                   |
| 2026-09-03 | PMB-014  | `CaseStudiesCarousel` (Client hoja) renderiza heading + contador + prev/next + tarjeta; `CaseStudiesSection` (Server) sólo resuelve el contenido y envuelve en `<Reveal>`. El `<h2 id="cases-title">` va en la hoja (SSR igual); una sola isla interactiva cohesiva.                                                                                                                                                                                                                                     |
| 2026-09-03 | PMB-014  | `CaseStudy`: `image`/`imageAlt`, `mockTag`/`mockHeadline` y `url` pasan a opcionales. Caso con imagen → `next/image` (1200×630 + `sizes`, `aspect-ratio` → sin CLS); sin imagen → mock de texto. Sin `url` → enlace "Hablemos" a `/#contacto`.                                                                                                                                                                                                                                                           |
| 2026-09-03 | PMB-014  | Contador ligado a `visibleIndex` (no `index`): cambia junto con la tarjeta tras el crossfade, como el legacy. Misma mecánica `index`/`visibleIndex` + `setTimeout` cancelable que el slider de testimonios. `aria-live="polite"` en la tarjeta.                                                                                                                                                                                                                                                          |
| 2026-09-03 | PMB-015  | Email vía `fetch` server-side a la API de Resend (sin SDK `resend` — cero deps nuevas; la CSP no aplica a fetch de servidor). `from` y `to` = `CONTACT_TO_EMAIL` (su dominio debe estar verificado en Resend), `reply_to` = email del visitante.                                                                                                                                                                                                                                                         |
| 2026-09-03 | PMB-015  | `RESEND_API_KEY` + `CONTACT_TO_EMAIL` pasan a **requeridas** (revierte el plan "optional hasta PMB-015" de PMB-004). Sin clave válida la action devuelve `errorGeneric`, no rompe. `CONTACT_RATE_LIMIT` sigue opcional (default 5 en `lib/contact.ts`).                                                                                                                                                                                                                                                  |
| 2026-09-03 | PMB-015  | Locale de la action vía `<input hidden name="locale">` (no el header de i18n): funciona con JS deshabilitado y no obliga a render dinámico. `getTranslations({ locale })` localiza los mensajes de error dentro de la action.                                                                                                                                                                                                                                                                            |
| 2026-09-03 | PMB-015  | `ContactForm` con `noValidate`: toda la validación pasa por el servidor (Zod) para tener mensajes únicos y localizados; los atributos HTML (`required`, `type=email`, `minLength`) quedan como semántica y red de seguridad.                                                                                                                                                                                                                                                                             |
| 2026-09-03 | PMB-015  | Rate limiter en memoria (`Map` en proceso, ventana fija 1 h) en `lib/contact.ts` — básico y por instancia, como pide la issue. `lib/` se crea aquí con su forma canónica. Nuevo token `--color-danger` (`--red` `#b42318`) para errores de validación.                                                                                                                                                                                                                                                   |
| 2026-09-03 | PMB-015  | El formulario se integra en el footer (`SiteFooter` gana `id="contacto"` + heading + email directo como alternativa), no como sección aparte ni modal — es el destino natural de los CTA "Contáctame" y da chrome mínimo. La action **no** revalida rutas (nada cacheado que mutar).                                                                                                                                                                                                                     |
| 2026-09-03 | DBO-1225 | Se retira el `<script>` inline que ponía `html.js` (daba "Encountered a script tag while rendering" al cambiar de locale, porque `LocaleLayout` se re-renderiza en cliente). El CSS de `Reveal`/`HeroReveal` oculta `.reveal:not(.in)` sin gate (hoja render-blocking → sin FOUC); el fallback sin JS pasa a `<noscript><style>[data-reveal]{opacity:1!important…}</style></noscript>` (`HeroReveal` gana `data-reveal`). Se quita también `suppressHydrationWarning` del `<html>`.                      |
| 2026-09-03 | DBO-1226 | Se **elimina la familia serif** del sistema (probadas ~10 alternativas — Fraunces, Instrument Serif… — el responsable las descartó; nada de itálica). Fuera `--font-serif`, la 3ª fuente de `next/font` y la utilidad `font-serif` de Tailwind → 2 familias (sans + mono, −176K de webfonts). Wordmark del header: Plus Jakarta Sans **600**, `tracking-tight`, upright. Títulos fantasma y `<h1>` de error/404 → sans (`font-semibold`). `app/not-found.tsx` global: sin `next/font` → sans de sistema. |
| 2026-09-03 | DBO-1227 | Anillo de foco `:focus-visible` de **dos tonos** (`outline` ink + `box-shadow` paper rellenando el offset): al menos una capa da ≥ 3:1 en cream/white/teal/teal-dark, sin overrides por sección. El verde `--color-accent-strong` (1.7:1 sobre claro) deja de ser el color de foco. `ContactForm` deja de hacer `outline: none` en los inputs (solo oscurece el borde como "campo activo"). Ver `CLAUDE.md` → "Foco de teclado".                                                                         |
| 2026-09-03 | DBO-1228 | `PillButton .label`: se quita el `max-width: 14rem` que partía el CTA del hero en 2 líneas (el label mide 271px, el cap 224px). Nuevo `max-width: 22rem` como guarda laxa + `white-space: nowrap` a `≥ 768px` (desktop siempre en una línea; por debajo el label puede envolver para que la píldora no desborde un móvil estrecho). `PillButton` solo se usa en el hero y en `/dev`.                                                                                                                     |
| 2026-09-03 | DBO-1229 | Un único label para el CTA de contacto: **"Hablemos" / "Let's talk"** (elegido por el responsable, encaja con el registro de "tú" y con `Contact.intro`). Aplica a header (`Nav.contact`), hero (`Hero.cta`) y About (`About.talk`, ya lo tenía) + fallback de Casos (`Cases.linkDefault`, ya lo tenía). Se elimina la clave muerta `Footer.contactCta` ("Contáctame"/"Get in touch", sin consumidores). El `Footer.heading` sigue siendo una frase; el botón del form sigue "Enviar mensaje".           |
| 2026-09-03 | DBO-1230 | Titular del hero: peso **400 → 600** y `letter-spacing` a un token nuevo `--tracking-display` (−0.03em); `--text-display` (clamp 2.75rem→7rem) sin tocar. A ~100px el 400 se leía fino/anémico; el 600 da presencia editorial sin caer en "bold gritón" (700 descartado por genérico). Tracking un pelo más cerrado para compensar el peso. `text-wrap: balance` sigue repartiendo bien (3 líneas en es y en); móvil sin regresión (el clamp min y las media queries del hero no cambian).               |
