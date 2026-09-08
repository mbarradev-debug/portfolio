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

## Google Search Console

Propiedad recomendada: **dominio** (`miguelbarra.cl`), que cubre todos los
subdominios y esquemas de una sola vez.

### Verificar la propiedad

Elegir **una** vía:

1. **DNS (recomendada para propiedad de dominio)**: en el panel del registrador
   añadir el registro `TXT` que entrega GSC (`google-site-verification=…`) en la
   raíz del dominio. Es la única opción para propiedades de tipo dominio y no
   depende del deploy.
2. **Meta tag (propiedad de prefijo de URL)**: copiar el `content` del tag
   `google-site-verification` que da GSC y definirlo como variable de entorno
   `GOOGLE_SITE_VERIFICATION` en _Vercel → Project → Settings → Environment
   Variables_ (Production). `app/layout.tsx` la lee y Next emite
   `<meta name="google-site-verification" …>` solo si está definida. Redeploy y
   pulsar «Verificar».

### Enviar el sitemap

Tras verificar: _Search Console → Sitemaps → Añadir un sitemap nuevo_ e
introducir `sitemap.xml` (URL completa `https://miguelbarra.cl/sitemap.xml`,
generado por `app/sitemap.ts`). Confirmar que el estado queda en «Correcto».

## Analítica

Herramienta: **Vercel Web Analytics** (`@vercel/analytics`), integrada en
`app/layout.tsx` con el componente `<Analytics />`.

- **Privacidad**: es sin cookies y no recopila datos personales ni huella de
  dispositivo, así que no necesita banner de consentimiento en Chile ni bajo
  GDPR.
- **Carga**: el componente oficial inyecta `/_vercel/insights/script.js` de
  forma diferida tras la hidratación; no bloquea el render ni el LCP.
- **Entornos**: solo envía eventos en producción. En local no hace nada
  (opcionalmente `<Analytics mode="development" />` para depurar).
- **Activación**: hay que habilitar _Web Analytics_ una vez en _Vercel →
  Project → Analytics_; sin ese paso el script responde 404 y no se registran
  visitas.

## Presupuesto de assets

Regla general: las imágenes de contenido pasan por `next/image`; los assets
estáticos de `public/` se optimizan antes de commitear y nada supera ~500 KB sin
justificación.

El vídeo del hero se re-encodó desde el original de ~7 MB a 1280×720, 10 s, sin
audio. `HeroVideo.tsx` sirve WebM con fallback MP4 vía `<source>`, y la descarga
se difiere a `load` + `requestIdleCallback`, así que nunca compite con el LCP.
Comando de referencia:

```sh
ffmpeg -i original.mp4 -an -c:v libvpx-vp9 -crf 33 -b:v 0 -row-mt 1 public/hero.webm
ffmpeg -i original.mp4 -an -c:v libx264 -crf 26 -preset slow -pix_fmt yuv420p \
  -profile:v high -movflags +faststart public/hero.mp4
```

| Asset                                                    | Presupuesto | Estado       |
| -------------------------------------------------------- | ----------- | ------------ |
| `public/hero.webm` (vídeo de fondo, VP9, sin audio)      | < 3 MB      | ~284 KB — OK |
| `public/hero.mp4` (fallback H.264, sin audio, faststart) | < 3 MB      | ~470 KB — OK |
| `public/hero-poster.jpg` (LCP del hero)                  | < 80 KB     | ~48 KB — OK  |
| `public/opengraph-image.png` / OG generada               | < 200 KB    | ~50 KB — OK  |
