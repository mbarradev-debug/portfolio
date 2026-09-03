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
2. Rellena **`NEXT_PUBLIC_SITE_URL`** (la única requerida hoy; en local vale
   `http://localhost:3000`).
3. Deja vacías las de servidor (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`,
   `CONTACT_RATE_LIMIT`) hasta que PMB-015 las necesite.
4. `.env.local` está en `.gitignore` — no lo commitees. El inventario completo
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

| Fecha      | Issue   | Decisión                                                                                                                                                                                                        |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-02 | PMB-001 | **Sin directorio `src/`**: estructura plana con `app/` en la raíz; menos indirección para un sitio pequeño.                                                                                                     |
| 2026-09-02 | PMB-001 | **Gestor de paquetes: npm** (lockfile `package-lock.json` ya presente en el scaffold; cero setup extra).                                                                                                        |
| 2026-09-02 | PMB-001 | **Next.js `16.3.4`** (App Router + Turbopack por defecto) como versión base del proyecto.                                                                                                                       |
| 2026-09-02 | PMB-001 | `index.html` legacy movido a `/references` (en `.gitignore`); assets reales del portfolio en `/public`.                                                                                                         |
| 2026-09-02 | PMB-002 | Se crean `CLAUDE.md` (contexto) y `AGENTS.md` (operativa) con protocolo "leer al iniciar / actualizar al finalizar" y esta bitácora.                                                                            |
| 2026-09-02 | PMB-002 | Arquitectura objetivo fijada: **RSC por defecto, Client Components sólo como hojas**; estructura `app/[locale]`, `components/`, `content/`, `messages/`, `lib/`.                                                |
| 2026-09-02 | PMB-003 | Cabeceras de seguridad y CSP en `next.config.ts` (`headers()` estático), no en middleware.                                                                                                                      |
| 2026-09-02 | PMB-003 | CSP `script-src` con `'unsafe-inline'` en vez de nonce: el nonce forzaría render dinámico en todo el sitio (choca con SSG); riesgo bajo sin auth/formularios. Revisar en PMB-006.                               |
| 2026-09-02 | PMB-003 | Sin Google Fonts en la CSP: `next/font` sirve las fuentes self-hosted.                                                                                                                                          |
| 2026-09-02 | PMB-003 | `Strict-Transport-Security` sólo en producción (`NODE_ENV === 'production'`).                                                                                                                                   |
| 2026-09-02 | PMB-003 | Redirect `/` → locale por defecto delegado al middleware de i18n de PMB-006 (aún no existe `app/[locale]`).                                                                                                     |
| 2026-09-02 | PMB-003 | `images.formats = ['image/avif', 'image/webp']`; `remotePatterns` vacío (sin imágenes remotas por ahora).                                                                                                       |
| 2026-09-02 | PMB-004 | Variables de entorno centralizadas en `env.ts` con `@t3-oss/env-nextjs` + Zod (bloques `server` / `client` / `shared`).                                                                                         |
| 2026-09-02 | PMB-004 | `process.env` prohibido fuera de `env.ts` vía ESLint `no-restricted-properties`; `next.config.ts` migrado a `env.NODE_ENV`.                                                                                     |
| 2026-09-02 | PMB-004 | Separación server/client la garantiza t3-env en **runtime** (lanza al acceder desde cliente) + el bundling de Next, no el compilador.                                                                           |
| 2026-09-02 | PMB-004 | `RESEND_API_KEY` / `CONTACT_TO_EMAIL` / `CONTACT_RATE_LIMIT` quedan `optional()` hasta PMB-015. Única requerida hoy: `NEXT_PUBLIC_SITE_URL`.                                                                    |
| 2026-09-02 | PMB-005 | Design tokens en `app/styles/tokens.css` en 3 capas (primitivos 1:1 del legacy / escalas / semánticos); componentes usan sólo la capa semántica.                                                                |
| 2026-09-02 | PMB-005 | Tokens expuestos a Tailwind con `@theme inline` en `globals.css` (permite re-map en runtime para dark mode).                                                                                                    |
| 2026-09-02 | PMB-005 | Tipografías: Plus Jakarta Sans / Playfair Display italic / JetBrains Mono vía `next/font/google` (self-hosted, `variable`).                                                                                     |
| 2026-09-02 | PMB-005 | Dark mode: estructura preparada (bloque `@media` comentado en `tokens.css`), no activado.                                                                                                                       |
| 2026-09-02 | PMB-005 | `app/page.tsx` (placeholder de CNA) sustituido por un home mínimo basado en tokens con link a `/design-system`; UI real desde PMB-007.                                                                          |
| 2026-09-02 | PMB-006 | i18n con **next-intl** (estándar App Router). `localePrefix: 'always'`; `/` redirige por `Accept-Language` con fallback a `es`.                                                                                 |
| 2026-09-02 | PMB-006 | Middleware en `proxy.ts` (nombre de Next 16, no `middleware.ts`). Orden: proxy → routing → `headers()` de `next.config.ts`.                                                                                     |
| 2026-09-02 | PMB-006 | Todas las rutas bajo `app/[locale]/`; `app/layout.tsx` es passthrough (`return children`). Helper `i18n/locale.ts#initLocale` en cada page/layout.                                                              |
| 2026-09-02 | PMB-006 | Locale no soportado (`/fr`) → proxy reescribe a `/es/fr` → 404 localizado, nunca 500.                                                                                                                           |
| 2026-09-02 | PMB-006 | **Fix regresión PMB-004**: `next.config.ts` vuelve a `process.env.NODE_ENV` (vía `env.NODE_ENV` daba `isProd=false` en build → CSP con `unsafe-eval` y sin HSTS). Exento en ESLint.                             |
| 2026-09-02 | PMB-006 | **Fix PMB-005**: no se remapea `--spacing-*` (los nombres t-shirt chocaban con `--container-*` y rompían `max-w-*`). Componentes usan la escala numérica de Tailwind; `--measure` / `--page-width` para anchos. |
| 2026-09-02 | PMB-007 | Layout: `app/[locale]/layout.tsx` es el real; `<header>`/`<footer>` como landmarks fuera de `<main id="top">`; las páginas ya no renderizan `<main>`.                                                           |
| 2026-09-02 | PMB-007 | `components/Providers.tsx` (`"use client"`) es el único punto de contexto cliente; recibe `locale` + `messages` del layout (un boundary cliente no puede inferirlos).                                           |
| 2026-09-02 | PMB-007 | `error.tsx` usa la prop `retry` (Next 16 renombró `reset` → `retry`). `loading.tsx` y `error.tsx` son Client (`useTranslations`).                                                                               |
| 2026-09-02 | PMB-007 | 404: `[locale]/not-found.tsx` (localizado, con chrome) para `notFound()` explícito; `app/not-found.tsx` (global, `es`, documento propio) para URLs sin ruta. Límite: `/en/typo` cae en el global (`es`).        |
| 2026-09-02 | PMB-007 | Skip-link con `.skip-link:focus` (no `:focus-visible`, para que funcione con cualquier foco de teclado). `scroll-padding-top` compensa el header.                                                               |
| 2026-09-02 | PMB-007 | `timeZone: "America/Santiago"` fijo en `i18n/request.ts` (sitio de una sola zona) — evita el warning `ENVIRONMENT_FALLBACK` y mismatches de hidratación en fechas.                                              |
| 2026-09-02 | PMB-008 | Capa de contenido en `content/` (un archivo por dominio + `types.ts` + barrel). Sin `any`; todo `readonly`. Campos con variante por idioma como `Localized<T>` (`{ es, en }`) + `pickLocale`.                   |
| 2026-09-02 | PMB-008 | Citas de testimonios NO se traducen (verbatim). Labels de tech-stack en forma canónica (`"Next.js"`), no en mayúsculas (eso es CSS). `repoUrl` de Pulso añadido desde el CV.                                    |
| 2026-09-02 | PMB-008 | Nav y servicios también migrados a `content/` (tienen tipo en la issue y datos en la referencia); el 2º caso de Pulso queda como `TODO(PMB-008)` en `case-studies.ts`.                                          |
| 2026-09-02 | PMB-009 | Todo el copy de la UI en `messages/{es,en}.json`, namespace por sección en `PascalCase`. EN = traducción profesional. `content/services.ts` pasa a sólo estructura (`key`); su texto va a `Services.<key>`.     |
| 2026-09-02 | PMB-009 | Regla ESLint `react/jsx-no-literals` (`app/**`, `components/**`; excluye `**/design-system/**`). `npm run messages:check` (`scripts/check-messages.mjs`) verifica que ambos catálogos tengan las mismas claves. |
| 2026-09-02 | PMB-009 | ICU con placeholders para valores dinámicos (`Cases.counter`, `Footer.copyright`). `year` se pasa como string para que ICU no lo formatee como número ("2.026").                                                |
