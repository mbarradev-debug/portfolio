# Rutas y estados de navegación (App Router)

Referencia de las convenciones de estado de ruta del App Router en este sitio.
Origen: hallazgo **F6.1** de la auditoría de UI/UX (DBO-1309).

## Contexto: el sitio es de una sola página

`app/` sólo tiene `page.tsx` (el home, que monta `SiteBody`) y `not-found.tsx`.
No hay segmentos anidados ni rutas con datos que se carguen al navegar. La única
navegación de ruta real es volver a `/` desde la 404. El cambio de idioma es
100 % cliente (ver `LocaleProvider`), sin URL ni recarga.

## `loading.tsx` / `template.tsx` — no aplican hoy

No hay ningún segmento con carga perceptible, así que no se añade `loading.tsx`.

**Si en el futuro se añade una ruta navegable** (`/blog`, `/proyectos/[slug]`, un
panel…) con fetch en servidor o `await` perceptible: darle su `loading.tsx` en el
mismo segmento (Next lo envuelve en `<Suspense>` automáticamente). `template.tsx`
sólo si un segmento necesita re-montar estado o re-disparar una animación de
entrada en cada navegación; por defecto basta `layout.tsx`.

## `error.tsx` — añadido

`app/error.tsx` es un React Error Boundary que envuelve `page.tsx` y sus hijos.
Cliente (obligatorio para un boundary), copy fijo en ES, diseño alineado con
`not-found.tsx` (kicker `mono`, `<h1>`, `pill-btn`). Botón **Reintentar** →
`retry()` (prop estable desde Next 16.3), enlace de vuelta a `/`. Loguea el error
en `useEffect` (Vercel lo recoge en los logs del servidor; el `digest` cruza con
el error original).

**No** cubre el layout raíz (Header, fuentes, JSON-LD): esos errores sólo los
atraparía `global-error.tsx`.

### `global-error.tsx` — omitido a propósito

Reemplazaría al layout raíz y tendría que redeclarar `<html>`/`<body>`, fuentes y
estilos globales, sin poder compartir el diseño del sitio. Para el único caso que
cubre —un fallo de render en el propio layout raíz, muy improbable en un layout
estático— el fallback 500 por defecto de Next es aceptable. Se revisará si el
layout raíz gana lógica dinámica.

## Indicador global de navegación — no aplica

Nada de barra de progreso / spinner / `useLinkStatus`. Las transiciones de ruta
que existen (404 → `/`) son instantáneas y no hay navegación con latencia
perceptible. Un indicador global sería ruido sin nada que indicar.

**Reconsiderar si** se añaden rutas con carga perceptible: entonces evaluar un
indicador de `<Link>` pendiente (`useLinkStatus` en un componente de enlace
propio) o una barra de progreso global, junto con el `loading.tsx` del segmento.
