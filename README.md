# Portfolio — Miguel Barra

Sitio personal / portfolio construido con **Next.js (App Router)**. Reemplaza al
sitio estático anterior (`index.html`), que se conserva sólo como referencia local
en `/references` (no versionado).

## Stack y decisiones base

| Decisión           | Elección                                    | Motivo                                                                                                                     |
| ------------------ | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| Framework          | Next.js `16.3.4`                            | App Router + React Server Components + Turbopack por defecto.                                                              |
| Lenguaje           | TypeScript `strict: true`                   | Seguridad de tipos desde el arranque.                                                                                      |
| Gestor de paquetes | **npm** (`package-lock.json`)               | Cero configuración extra, lockfile ya presente en el scaffold.                                                             |
| Directorio `src/`  | **No** se usa                               | Estructura plana (`app/` en la raíz), menos indirección para un proyecto de un sitio. Config y código conviven en la raíz. |
| Import alias       | `@/*` → raíz del proyecto (`tsconfig.json`) | Import absolutos estables.                                                                                                 |
| Bundler            | Turbopack (default en Next 16)              | —                                                                                                                          |
| Estilos            | Tailwind CSS v4                             | Incluido en el scaffold.                                                                                                   |

Estas decisiones se replicarán en `CLAUDE.md` / `AGENTS.md` en la issue siguiente
(PMB-002).

## Requisitos

- Node.js `>= 20.9`
- npm `>= 10`

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # ajusta valores si hace falta
npm run dev                  # http://localhost:3000
```

## Scripts npm

| Script                 | Acción                                                         |
| ---------------------- | -------------------------------------------------------------- |
| `npm run dev`          | Servidor de desarrollo (Turbopack) en `http://localhost:3000`. |
| `npm run build`        | Build de producción.                                           |
| `npm run start`        | Sirve el build de producción.                                  |
| `npm run lint`         | ESLint (config `eslint-config-next`, flat config).             |
| `npm run typecheck`    | `tsc --noEmit` con `strict: true`.                             |
| `npm run format`       | Prettier `--write` sobre todo el repo.                         |
| `npm run format:check` | Prettier `--check` (no modifica, útil en CI).                  |

## Calidad automática

- **Prettier** (`.prettierrc.json`) + **EditorConfig** (`.editorconfig`) fijan el
  estilo de código y de editor.
- **Husky** + **lint-staged** instalan un hook `pre-commit` que ejecuta:
  1. `lint-staged` → `eslint --fix` + `prettier --write` sobre los archivos en stage.
  2. `npm run typecheck` → bloquea el commit si hay errores de tipos.

  El hook se instala solo tras `npm install` (script `prepare`). Para saltarlo de
  forma puntual: `git commit --no-verify`.

## Estructura

```
app/                 App Router (layout, page, estilos globales)
public/              Assets estáticos servidos desde "/"
references/          Sitio estático original (sólo local, en .gitignore)
.husky/              Hooks de Git
```

## `.gitignore`

Cubre: `node_modules`, `.next`, `out`, `build`, `coverage`, `.env*`
(excepto `.env.example`), `/references`, `.DS_Store`, `*.tsbuildinfo`,
`next-env.d.ts`.

## `/references`

Contiene `index.html`, el sitio estático original, conservado sólo como material
de consulta durante la migración. Está en `.gitignore` (`/references`) y no forma
parte del build.

## Inventario de `/public`

### Assets del portfolio

| Archivo               | Uso                                                                                               |
| --------------------- | ------------------------------------------------------------------------------------------------- |
| `avatar-900.jpg`      | Retrato optimizado (900 px). Imagen de Open Graph / Twitter y foto en la sección de testimonios.  |
| `avatar.jpeg`         | Retrato original sin optimizar. Fuente para regenerar recortes/tamaños; no se sirve directamente. |
| `hero.mp4`            | Vídeo de fondo del hero (carga diferida, `muted`/`loop`).                                         |
| `hero-poster.jpg`     | Póster del `<video>` del hero: primer frame mientras el vídeo no ha cargado.                      |
| `opengraph-image.png` | Imagen social alternativa (previsualización al compartir el enlace).                              |
| `miguelbarra-cv.pdf`  | CV descargable enlazado desde el hero / contacto.                                                 |

### Assets del scaffold (`create-next-app`)

| Archivo      | Uso                                                       |
| ------------ | --------------------------------------------------------- |
| `file.svg`   | Icono decorativo de la página de bienvenida del scaffold. |
| `globe.svg`  | Icono decorativo de la página de bienvenida del scaffold. |
| `next.svg`   | Logo de Next.js en la página de bienvenida del scaffold.  |
| `vercel.svg` | Logo de Vercel en la página de bienvenida del scaffold.   |
| `window.svg` | Icono decorativo de la página de bienvenida del scaffold. |

> Los SVG del scaffold se retirarán cuando se reconstruya la home real y dejen de
> usarse.
