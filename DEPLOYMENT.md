# Despliegue

Hosting: **Vercel**. Dominio: **miguelbarra.cl**.

## Dominio canónico

La única variante canónica es **`https://miguelbarra.cl`** (sin `www`), consistente
con `metadataBase` (`app/layout.tsx`) y con el `<link rel="canonical">` del home.

| Variante                     | Comportamiento esperado            |
| ---------------------------- | ---------------------------------- |
| `http://miguelbarra.cl`      | 301/308 → `https://miguelbarra.cl` |
| `http://www.miguelbarra.cl`  | 301/308 → `https://miguelbarra.cl` |
| `https://www.miguelbarra.cl` | 301 → `https://miguelbarra.cl`     |
| `https://miguelbarra.cl`     | 200 (canónica)                     |

### Cómo se consigue

1. **http → https**: lo fuerza Vercel automáticamente para todos los dominios
   (HSTS incluido). No hay nada que configurar ni se puede desactivar.
2. **www → no-www**: redirección 301 declarada en `next.config.ts` (`redirects()`
   con `has: [{ type: "host", value: "www.miguelbarra.cl" }]`). Se aplica en el
   edge de Vercel antes de invocar cualquier función.
3. **Redundancia recomendada en Vercel**: en _Project → Settings → Domains_,
   añadir tanto `miguelbarra.cl` como `www.miguelbarra.cl`, marcar
   `miguelbarra.cl` como _Primary Domain_ y dejar `www` como _Redirect to
   miguelbarra.cl_. Así la redirección también existe si algún día se quita la
   regla de `next.config.ts`.

## Verificación (tras el deploy)

```sh
for url in \
  http://miguelbarra.cl \
  http://www.miguelbarra.cl \
  https://www.miguelbarra.cl \
  https://miguelbarra.cl ; do
  echo "== $url =="
  curl -sI "$url" | grep -iE '^HTTP/|^location:'
done
```

Esperado: las tres primeras devuelven `HTTP/… 301` (o `308` para las que resuelve
Vercel) con `location: https://miguelbarra.cl…`; la última devuelve `200`.

## Presupuesto de assets

Regla general: las imágenes de contenido pasan por `next/image`; los assets
estáticos de `public/` se optimizan antes de commitear y nada supera ~500 KB sin
justificación.

| Asset                                       | Presupuesto | Estado                                                                                                                                                                                                                                       |
| ------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `public/hero.mp4` (vídeo de fondo del hero) | < 3 MB      | **~7 MB — pendiente re-encode.** Objetivo: H.264 ~1,5 Mbps a 1280 px, u opción WebM/AV1 + fallback MP4. La descarga ya se difiere a `load` + `requestIdleCallback` en `components/sections/HeroVideo.tsx`, así que nunca compite con el LCP. |
| `public/hero-poster.jpg` (LCP del hero)     | < 80 KB     | ~48 KB — OK                                                                                                                                                                                                                                  |
| `public/opengraph-image.png` / OG generada  | < 200 KB    | ~50 KB — OK                                                                                                                                                                                                                                  |

La optimización final de assets forma parte de PNX-008 (Fase 3 — Paridad y Launch).
