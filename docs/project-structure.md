# Estructura del Proyecto

## Vista general

```
portfolio/
├── app/                    # Aplicación Next.js (rutas y páginas)
│   ├── api/                # API Routes (backend)
│   │   └── contact/        # Endpoint de contacto
│   │       └── route.ts    # POST /api/contact
│   ├── globals.css         # Estilos globales, variables CSS y micro-interacciones
│   ├── animations.css      # Animaciones de entrada (Hero, scroll-triggered)
│   ├── layout.tsx          # Layout raíz (estructura HTML, i18n provider)
│   └── page.tsx            # Página principal (home)
│
├── components/             # Componentes React
│   ├── layout/             # Componentes de estructura
│   │   ├── Container.tsx   # Wrapper de ancho máximo
│   │   ├── Footer.tsx      # Pie de página (Client Component)
│   │   ├── Header.tsx      # Navegación flotante (Client Component)
│   │   └── Section.tsx     # Wrapper de sección (Server Component)
│   │
│   ├── sections/           # Secciones del portfolio
│   │   ├── HeroSection.tsx
│   │   ├── AboutSection.tsx
│   │   ├── StackSection.tsx
│   │   └── ContactSection.tsx
│   │
│   ├── ui/                 # Componentes UI reutilizables
│   │   ├── AnimateOnScroll.tsx   # Wrapper de animación por scroll
│   │   ├── LanguageSelector.tsx  # Selector de idioma ES/EN
│   │   └── SkipLink.tsx          # Skip link para accesibilidad
│   │
│   ├── providers/          # Context Providers
│   │   └── I18nClientProvider.tsx  # Wrapper del I18nProvider
│   │
│   └── icons/              # Iconos SVG como componentes
│       └── index.tsx       # Todos los iconos exportados
│
├── src/                    # Código fuente adicional
│   └── i18n/               # Sistema de internacionalización
│       ├── index.tsx       # I18nProvider + useI18n hook
│       ├── types.ts        # Tipos TypeScript para traducciones
│       ├── es.ts           # Traducciones español
│       └── en.ts           # Traducciones inglés
│
├── hooks/                  # Custom hooks de React
│   └── useScrollToSection.ts  # Navegación suave + animación pulse
│
├── public/                 # Archivos estáticos públicos
│   ├── images/             # Imágenes del sitio
│   │   └── miguelb-logo.png
│   ├── cv/                 # CV descargable
│   │   └── cv.pdf
│   ├── favicon.ico         # Favicon principal
│   ├── favicon-32x32.png   # Favicon 32x32
│   ├── apple-touch-icon.png    # Icono para iOS
│   ├── android-chrome-192x192.png  # Icono PWA 192px
│   ├── android-chrome-512x512.png  # Icono PWA 512px
│   ├── site.webmanifest    # Web App Manifest (PWA)
│   ├── robots.txt          # Directivas para crawlers
│   └── sitemap.xml         # Sitemap para SEO
│
├── docs/                   # Documentación (esta carpeta)
│
└── [archivos de configuración]
    ├── package.json        # Dependencias y scripts
    ├── tsconfig.json       # Configuración TypeScript (incluye alias @/i18n)
    ├── next.config.ts      # Configuración Next.js
    ├── postcss.config.mjs  # Configuración PostCSS/Tailwind
    └── eslint.config.mjs   # Configuración ESLint
```

---

## Carpeta `/app` — El corazón de Next.js

Esta carpeta usa el **App Router** de Next.js. Cada archivo aquí tiene un propósito especial.

### `layout.tsx` — El esqueleto de la página

```tsx
// Estructura simplificada
export default function RootLayout({ children }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body>
        <I18nClientProvider>
          <SkipLink />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
        </I18nClientProvider>
      </body>
    </html>
  );
}
```

**¿Qué hace?**
- Define el HTML base (`<html>`, `<body>`)
- Envuelve todo con `I18nClientProvider` para internacionalización
- Incluye `SkipLink` para accesibilidad
- Carga la fuente Inter de Google Fonts
- Importa los CSS globales (`globals.css`, `animations.css`)
- Define metadata para SEO (título, descripción, Open Graph, Twitter Cards, iconos PWA)
- Incluye Header y Footer que aparecen en todas las páginas

**¿Por qué `suppressHydrationWarning`?** Porque el atributo `lang` del HTML puede cambiar dinámicamente según el idioma detectado/seleccionado, lo que podría causar un warning de hidratación en React.

### `page.tsx` — La página principal

```tsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ContactSection />
    </>
  );
}
```

**¿Qué hace?**
- Renderiza las 4 secciones principales del portfolio
- Usa React Fragments (`<>`) para no agregar divs innecesarios
- Se inserta donde dice `{children}` en el layout

### `globals.css` — Sistema de diseño y micro-interacciones

```css
@import "tailwindcss";

@theme inline {
  /* Todas las variables CSS del proyecto */
  --color-bg-primary: #0F1115;
  --color-accent: #3FBF9A;
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
  --duration-base: 150ms;
  /* ... más variables */
}

/* Micro-interacciones para cada tipo de componente */
.tech-item { /* hover/tap */ }
.competency-card { /* hover/tap */ }
.approach-card { /* hover/tap */ }
.contact-link { /* hover/tap */ }
.btn-primary { /* hover/tap */ }
.btn-secondary { /* hover/tap */ }
.footer-link { /* hover/tap */ }
.nav-logo { /* hover/tap */ }
.nav-cv-link { /* hover/tap */ }
.nav-contact-btn { /* hover/tap */ }
.form-input { /* focus */ }
.text-link { /* hover/tap */ }

/* Animaciones especiales */
.badge-shimmer { /* efecto brillo en badge */ }
.btn-primary-pulse { /* pulso de atención */ }
.scroll-breathe { /* respiración scroll indicator */ }
```

Las micro-interacciones usan media queries para diferenciar:
- `@media (hover: hover) and (pointer: fine)` — Desktop con mouse
- `@media (hover: none), (pointer: coarse)` — Móvil/touch

### `animations.css` — Animaciones de entrada

Contiene las animaciones del Hero y las scroll-triggered:

```css
/* Hero entry animations */
.hero-animate { ... }
.hero-fade { ... }
.hero-fade-up { ... }
.hero-fade-zoom { ... }
.hero-delay-0 { ... }
.hero-delay-1 { ... }
/* etc. */

/* Scroll-triggered animations */
.scroll-animate { ... }
.tech-animate { ... }
```

### `/app/api/contact/route.ts` — Endpoint de contacto

```tsx
export async function POST(request: Request) {
  // 1. Recibe datos del formulario
  const { nombre, email, mensaje } = await request.json();

  // 2. Valida campos (requeridos, formato email, longitud)
  // 3. Sanitiza HTML para prevenir XSS
  // 4. Envía email con Resend
  // 5. Retorna respuesta JSON
}
```

**Seguridad implementada:**
- Validación de campos requeridos
- Validación de formato de email con regex
- Límites de longitud (nombre: 100, email: 254, mensaje: 5000)
- Sanitización HTML para prevenir XSS

---

## Carpeta `/components` — Piezas de UI

Organizada por categoría:

### `/components/layout` — Estructura de la página

| Archivo | Tipo | Propósito |
|---------|------|-----------|
| `Container.tsx` | Server | Wrapper de ancho máximo (1200px) con padding horizontal |
| `Section.tsx` | Server | Wrapper de sección con variantes de fondo, espaciado y separadores |
| `Header.tsx` | Client | Navegación flotante con hide/show on scroll, sección activa, i18n |
| `Footer.tsx` | Client | Pie de página con enlaces sociales, copyright, i18n |

**Container:** Centra el contenido y limita su ancho

```tsx
// max-w-[1200px] px-4 sm:px-6 lg:px-8
<Container>
  {/* contenido centrado */}
</Container>
```

**Section:** Añade fondo, padding y separadores

```tsx
<Section
  variant="primary"    // "primary" | "secondary" (color de fondo)
  spacing="default"    // "compact" | "default" | "relaxed"
  separator="visible"  // "subtle" | "visible" | "none"
  id="sobre-mi"
>
  <Container>
    {/* contenido */}
  </Container>
</Section>
```

### `/components/sections` — Contenido principal

| Archivo | Propósito |
|---------|-----------|
| `HeroSection.tsx` | Presentación inicial con imagen, badge, headline, CTAs y scroll indicator |
| `AboutSection.tsx` | Perfil profesional con quote, enfoque, ideal para, y bio expandible |
| `StackSection.tsx` | Competencias técnicas y grid de tecnologías con animación |
| `ContactSection.tsx` | Formulario funcional y enlaces de contacto directo |

Todos usan el hook `useI18n()` para acceder a traducciones.

### `/components/ui` — Componentes reutilizables

| Archivo | Propósito |
|---------|-----------|
| `AnimateOnScroll.tsx` | Wrapper que activa animación cuando el contenido entra en viewport |
| `LanguageSelector.tsx` | Selector de idioma ES/EN con estilo pill |
| `SkipLink.tsx` | Link oculto para saltar al contenido principal (accesibilidad) |

### `/components/providers` — Context Providers

| Archivo | Propósito |
|---------|-----------|
| `I18nClientProvider.tsx` | Wrapper Client Component para el I18nProvider |

Este patrón es necesario porque el layout es un Server Component pero necesita envolver sus hijos con un Client Component (el Provider).

### `/components/icons` — Iconos SVG

Archivo único `index.tsx` que exporta todos los iconos como componentes:

**Tecnologías:**
- `ReactIcon`, `NextjsIcon`, `TypeScriptIcon`, `NodejsIcon`
- `PostgreSQLIcon`, `PrismaIcon`, `DockerIcon`, `GitIcon`, `ApiIcon`

**Plataformas/Enlaces:**
- `GitHubIcon`, `LinkedInIcon`, `EmailIcon`, `DownloadIcon`, `ExternalLinkIcon`

**Competencias:**
- `ArchitectureIcon`, `MonitorIcon`, `ServerIcon`, `DatabaseIcon`

Todos aceptan `className` como prop para estilización:

```tsx
<GitHubIcon className="h-5 w-5 text-text-secondary" />
```

---

## Carpeta `/src/i18n` — Sistema de internacionalización

Sistema de i18n propio sin dependencias externas:

### `index.tsx` — Provider y hook

```tsx
// Exporta:
export { I18nProvider }  // Context Provider
export { useI18n }       // Hook para acceder a traducciones
export type { Locale, Translations }  // Tipos
```

**Características:**
- Usa `useSyncExternalStore` para evitar hydration mismatch
- Detecta idioma del navegador (`navigator.language`)
- Persiste preferencia en `localStorage`
- Actualiza `document.documentElement.lang`

### `types.ts` — Estructura de traducciones

```typescript
export type Locale = "es" | "en";

export interface Translations {
  meta: { title, description, ogDescription };
  a11y: { skipToContent, mainMenu, home, ... };
  nav: { profile, contact };
  hero: { imageAlt, badge, headline, ... };
  about: { label, title, quote, approach, ... };
  stack: { label, title, description, ... };
  contact: { label, title, form, ... };
  footer: { copyright };
}
```

### `es.ts` y `en.ts` — Traducciones

Objetos que implementan la interfaz `Translations`:

```typescript
export const es: Translations = {
  hero: {
    headline: "Del problema al producto.",
    subheadline: "Arquitectura que escala. Código que perdura.",
    // ...
  },
  // ...
};
```

---

## Carpeta `/hooks` — Lógica reutilizable

### `useScrollToSection.ts`

```tsx
export function useScrollToSection() {
  const scrollToSection = (e, targetId) => {
    // 1. Previene navegación por defecto
    // 2. Hace scroll suave al elemento
    // 3. Añade animación pulse visual
  };

  const scrollToTop = (e) => {
    // Scroll suave al inicio de la página
  };

  return { scrollToSection, scrollToTop };
}
```

**Usado en:** Header (navegación), HeroSection (scroll indicator y CTA)

---

## Carpeta `/public` — Archivos estáticos

| Archivo/Carpeta | Propósito |
|-----------------|-----------|
| `images/miguelb-logo.png` | Imagen principal del Hero |
| `cv/cv.pdf` | CV descargable |
| `favicon.ico` | Favicon principal (ICO) |
| `favicon-32x32.png` | Favicon 32x32 (PNG) |
| `apple-touch-icon.png` | Icono para iOS (180x180) |
| `android-chrome-192x192.png` | Icono PWA pequeño |
| `android-chrome-512x512.png` | Icono PWA grande |
| `site.webmanifest` | Web App Manifest para PWA |
| `robots.txt` | Directivas para crawlers de buscadores |
| `sitemap.xml` | Mapa del sitio para SEO |

**Acceso:** Todos los archivos en `/public` se sirven directamente. Ejemplo: `/images/miguelb-logo.png` → `localhost:3000/images/miguelb-logo.png`

---

## Archivos de configuración (raíz)

### `package.json`

```json
{
  "dependencies": {
    "next": "16.1.1",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "resend": "^6.6.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### `tsconfig.json`

Configuración de TypeScript con:
- Modo estricto (`strict: true`)
- Path aliases:
  - `@/*` → raíz del proyecto
  - `@/i18n` → `./src/i18n/index.tsx`
- Soporte para Next.js plugins

### `next.config.ts`

Configuración de Next.js (actualmente mínima, usa defaults).

### `postcss.config.mjs`

Configuración de PostCSS con plugin de Tailwind CSS v4.

### `eslint.config.mjs`

Configuración de ESLint con reglas de Next.js.

---

## Convenciones del proyecto

| Convención | Ejemplo |
|------------|---------|
| Nombres de componentes | PascalCase (`HeroSection.tsx`) |
| Nombres de hooks | camelCase con "use" (`useScrollToSection.ts`) |
| Nombres de archivos CSS | kebab-case (`globals.css`) |
| Client Components | `"use client"` en primera línea |
| Tipos TypeScript | Interfaces para props, types para unions |
| Traducciones | Objeto anidado por sección (hero, about, etc.) |
