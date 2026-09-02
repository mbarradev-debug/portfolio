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

## Scripts npm

| Script                 | Para qué                                                       |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo (Turbopack) en `http://localhost:3000`. |
| `npm run build`        | Build de producción.                                           |
| `npm run start`        | Sirve el build de producción (requiere `build` previo).        |
| `npm run lint`         | ESLint sobre todo el repo.                                     |
| `npm run typecheck`    | `tsc --noEmit` con `strict: true`.                             |
| `npm run format`       | Prettier `--write` sobre todo el repo.                         |
| `npm run format:check` | Prettier `--check` (no modifica; útil en CI).                  |

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
- [ ] `npm run format:check` limpio.
- [ ] Cambios acotados al alcance de la issue (sin arreglos "de paso" no pedidos).
- [ ] RSC por defecto; `"use client"` sólo donde de verdad hace falta.
- [ ] `CLAUDE.md` / `AGENTS.md` actualizados si cambió contexto o convenciones.
- [ ] Nueva entrada en la **Bitácora de decisiones**.
- [ ] `README.md` actualizado si cambió el arranque del proyecto.
- [ ] PR abierta con el checklist; **no** se hace merge (lo hace la persona
      responsable).

## Bitácora de decisiones

Registro append-only. Cada issue añade una fila con **fecha (YYYY-MM-DD)**, la
**issue** y la **decisión** (con el porqué en una línea).

| Fecha      | Issue   | Decisión                                                                                                                                                         |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2026-09-02 | PMB-001 | **Sin directorio `src/`**: estructura plana con `app/` en la raíz; menos indirección para un sitio pequeño.                                                      |
| 2026-09-02 | PMB-001 | **Gestor de paquetes: npm** (lockfile `package-lock.json` ya presente en el scaffold; cero setup extra).                                                         |
| 2026-09-02 | PMB-001 | **Next.js `16.3.4`** (App Router + Turbopack por defecto) como versión base del proyecto.                                                                        |
| 2026-09-02 | PMB-001 | `index.html` legacy movido a `/references` (en `.gitignore`); assets reales del portfolio en `/public`.                                                          |
| 2026-09-02 | PMB-002 | Se crean `CLAUDE.md` (contexto) y `AGENTS.md` (operativa) con protocolo "leer al iniciar / actualizar al finalizar" y esta bitácora.                             |
| 2026-09-02 | PMB-002 | Arquitectura objetivo fijada: **RSC por defecto, Client Components sólo como hojas**; estructura `app/[locale]`, `components/`, `content/`, `messages/`, `lib/`. |
