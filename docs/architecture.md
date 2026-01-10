# Arquitectura del Proyecto

## Visión general

Este portfolio sigue una arquitectura moderna basada en **Next.js App Router** con **componentes de React**. La aplicación es una Single Page Application (SPA) que renderiza cuatro secciones principales en una única página, con soporte para internacionalización (i18n).

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │               I18nClientProvider                     │   │
│  │     (Context Provider para internacionalización)     │   │
│  └─────────────────────────────────────────────────────┘   │
│                           │                                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         SkipLink (accesibilidad, hidden)            │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                     Header                           │   │
│  │  (navegación flotante, hide/show on scroll, i18n)   │   │
│  │  [Logo] [LanguageSelector] [CV] [Contacto]          │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                      Main                            │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │              HeroSection                     │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │              AboutSection                    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │              StackSection                    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │            ContactSection                    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                     Footer                           │   │
│  │              (enlaces sociales, copyright, i18n)    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Conceptos clave de Next.js

### App Router vs Pages Router

Next.js tiene dos sistemas de rutas. Este proyecto usa **App Router** (el más moderno):

| App Router (este proyecto) | Pages Router (legacy) |
|----------------------------|----------------------|
| Carpeta `/app` | Carpeta `/pages` |
| `layout.tsx` para layouts | `_app.tsx` y `_document.tsx` |
| Server Components por defecto | Client Components por defecto |
| Mejor rendimiento | Más simple pero menos eficiente |

### Server Components vs Client Components

Esta es una distinción fundamental en Next.js moderno:

**Server Components** (por defecto)
- Se ejecutan en el servidor
- No pueden usar hooks de React (`useState`, `useEffect`)
- No pueden usar eventos del navegador (`onClick`, `onScroll`)
- Más rápidos porque no envían JavaScript al navegador
- Ideales para contenido estático

**Client Components** (con `"use client"`)
- Se ejecutan en el navegador
- Pueden usar todos los hooks de React
- Pueden responder a interacciones del usuario
- Necesarios para formularios, animaciones, etc.

```typescript
// Server Component (por defecto)
// No tiene "use client" al inicio
export default function Section({ children }) {
  return <section>{children}</section>;
}

// Client Component
"use client"; // Esta línea es obligatoria

export default function ContactSection() {
  const [formData, setFormData] = useState({});
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**En este proyecto:**

| Componente | Tipo | Razón |
|------------|------|-------|
| `Header.tsx` | Client | IntersectionObserver para sección activa + scroll hide/show + i18n |
| `Footer.tsx` | Client | Usa hook `useI18n` para traducciones |
| `HeroSection.tsx` | Client | Animaciones de entrada + navegación con `useScrollToSection` + i18n |
| `AboutSection.tsx` | Client | Contenido expandible con estado + IntersectionObserver + i18n |
| `StackSection.tsx` | Client | IntersectionObserver para animaciones escalonadas + i18n |
| `ContactSection.tsx` | Client | Formulario con gestión de estado y llamada a API + i18n |
| `AnimateOnScroll.tsx` | Client | Wrapper de animación con IntersectionObserver |
| `LanguageSelector.tsx` | Client | Selector de idioma con estado |
| `SkipLink.tsx` | Client | Usa hook `useI18n` para texto traducido |
| `I18nClientProvider.tsx` | Client | Provider del contexto de i18n |
| `Container.tsx` | Server | Wrapper de layout sin interactividad |
| `Section.tsx` | Server | Wrapper de layout sin interactividad |

## Sistema de internacionalización (i18n)

El proyecto implementa un sistema de i18n propio ubicado en `/src/i18n/`:

```
src/i18n/
├── index.tsx    # Provider, hook useI18n, lógica de detección
├── types.ts     # Tipos TypeScript para traducciones
├── es.ts        # Traducciones en español
└── en.ts        # Traducciones en inglés
```

### Arquitectura del sistema i18n

```
┌─────────────────────────────────────────────────────────────┐
│                    I18nProvider                              │
│  (useSyncExternalStore para estado reactivo sin flicker)    │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  1. Detecta idioma:                                         │
│     - localStorage (preferencia guardada)                   │
│     - navigator.language (idioma del navegador)             │
│     - Fallback: español                                     │
│                                                             │
│  2. Provee contexto:                                        │
│     - locale: "es" | "en"                                   │
│     - t: objeto con todas las traducciones                  │
│     - setLocale: función para cambiar idioma                │
│                                                             │
│  3. Actualiza:                                              │
│     - document.documentElement.lang                         │
│     - localStorage al cambiar idioma                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Uso en componentes

```tsx
"use client";

import { useI18n } from "@/i18n";

export default function HeroSection() {
  const { t } = useI18n();

  return (
    <h1>{t.hero.headline}</h1>  // "Del problema al producto." o "From problem to product."
  );
}
```

## Flujo de datos

```
┌─────────────────────────────────────────────────────────────┐
│                     FLUJO DE RENDERIZADO                    │
└─────────────────────────────────────────────────────────────┘

1. Usuario solicita la página
         │
         ▼
┌─────────────────────┐
│   Next.js Server    │
│                     │
│  • Ejecuta layout   │
│  • Renderiza Server │
│    Components       │
│  • Genera HTML      │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│     Navegador       │
│                     │
│  • Recibe HTML      │
│  • Hidrata Client   │
│    Components       │
│  • I18nProvider     │
│    detecta idioma   │
│  • Activa eventos   │
└─────────────────────┘
         │
         ▼
┌─────────────────────┐
│   Usuario navega    │
│                     │
│  • Scroll suave     │
│  • Animaciones      │
│  • Formulario       │
│  • Cambio de idioma │
└─────────────────────┘
```

**Hidratación**: Es el proceso donde React "activa" el HTML estático enviado por el servidor, agregando los event listeners y la interactividad.

## Separación de responsabilidades

El proyecto sigue el principio de **separación de responsabilidades** (cada cosa en su lugar):

### 1. Capa de Presentación (`/components`)

Contiene todos los componentes visuales, organizados por tipo:

```
components/
├── layout/      → Estructura de la página (Header, Footer, Container, Section)
├── sections/    → Contenido principal (Hero, About, Stack, Contact)
├── ui/          → Componentes reutilizables (AnimateOnScroll, LanguageSelector, SkipLink)
├── providers/   → Context providers (I18nClientProvider)
└── icons/       → Iconos SVG como componentes
```

### 2. Capa de Internacionalización (`/src/i18n`)

Sistema de traducciones centralizado:

```
src/i18n/
├── index.tsx    # I18nProvider + useI18n hook
├── types.ts     # Interface Translations con estructura tipada
├── es.ts        # Textos en español
└── en.ts        # Textos en inglés
```

### 3. Capa de Lógica (`/hooks`)

Contiene la lógica reutilizable separada de los componentes:

```
hooks/
└── useScrollToSection.ts  → Lógica de navegación suave + animación pulse
```

### 4. Capa de Estilos (`/app/globals.css` y `/app/animations.css`)

Define el sistema de diseño centralizado y las micro-interacciones:

```css
/* globals.css */
@theme inline {
  /* Background */
  --color-bg-primary: #0F1115;
  --color-bg-secondary: #1A1F26;
  --color-surface: #1E242C;
  --color-border-subtle: #2A3140;

  /* Text */
  --color-text-primary: #E6E8EB;
  --color-text-secondary: #A1A6B0;

  /* Accent */
  --color-accent: #3FBF9A;
  --color-accent-hover: #35a886;

  /* Feedback */
  --color-success: #3FBF9A;
  --color-error: #F87171;

  /* Font */
  --font-sans: var(--font-inter), "Inter", sans-serif;

  /* Animation Timing */
  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 120ms;
  --duration-base: 150ms;
  --duration-slow: 180ms;
  --duration-emphasis: 250ms;
  --duration-reveal: 400ms;
}

/* Sistemas de micro-interacciones */
.tech-item { ... }        /* Items de tecnología */
.competency-card { ... }  /* Tarjetas de competencia */
.approach-card { ... }    /* Tarjetas de enfoque */
.contact-link { ... }     /* Enlaces de contacto */
.btn-primary { ... }      /* Botones principales */
.btn-secondary { ... }    /* Botones secundarios */
.footer-link { ... }      /* Enlaces del footer */
.nav-logo { ... }         /* Logo del header */
.nav-cv-link { ... }      /* Link de descarga CV */
.nav-contact-btn { ... }  /* Botón de contacto del header */
.form-input { ... }       /* Inputs del formulario */
.text-link { ... }        /* Enlaces inline de texto */
.badge-shimmer { ... }    /* Efecto shimmer en badges */
.btn-primary-pulse { ... }/* Pulso de atención en CTAs */
.scroll-breathe { ... }   /* Efecto respiración scroll indicator */
```

Las micro-interacciones usan media queries para diferenciar entre desktop (`@media (hover: hover) and (pointer: fine)`) y móvil (`@media (hover: none), (pointer: coarse)`).

### 5. Capa de Backend (`/app/api`)

API Routes de Next.js para lógica del servidor:

```
app/api/
└── contact/
    └── route.ts  → POST /api/contact (envío de emails con Resend)
```

### 6. Capa de Configuración (raíz)

Archivos de configuración del proyecto:

```
/
├── next.config.ts      → Configuración de Next.js
├── tsconfig.json       → Configuración de TypeScript (incluye alias @/i18n)
├── postcss.config.mjs  → Configuración de PostCSS/Tailwind
└── package.json        → Dependencias y scripts
```

## Patrón de composición

Los componentes se componen jerárquicamente como muñecas rusas:

```tsx
// layout.tsx
<html lang="es">
  <body>
    <I18nClientProvider>
      <SkipLink />
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </I18nClientProvider>
  </body>
</html>

// page.tsx
<>
  <HeroSection />
  <AboutSection />
  <StackSection />
  <ContactSection />
</>

// Cada Section usa...
<Section variant="primary" spacing="default" separator="visible">
  <Container>
    <AnimateOnScroll>
      {/* Contenido */}
    </AnimateOnScroll>
  </Container>
</Section>
```

Este patrón permite:
- **Consistencia**: todas las secciones tienen el mismo padding y max-width
- **Flexibilidad**: cada sección puede variar su fondo (`variant`), espaciado (`spacing`) y separador (`separator`)
- **Reutilización**: `Container` y `Section` se usan en todas partes
- **Internacionalización**: el Provider envuelve toda la app, todos los componentes acceden a traducciones

## Interactividad y estado

### Estado local con useState

Cada componente maneja su propio estado cuando es necesario:

```tsx
// Header.tsx
const [activeSection, setActiveSection] = useState("hero");
const [isVisible, setIsVisible] = useState(true);

// ContactSection.tsx
const [formStatus, setFormStatus] = useState<FormStatus>("idle");

// AboutSection.tsx
const [isExpanded, setIsExpanded] = useState(false);
```

### Estado global con Context (i18n)

El idioma se maneja globalmente mediante Context:

```tsx
// I18nProvider usa useSyncExternalStore para evitar hydration mismatch
const locale = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

// Cualquier componente puede acceder
const { locale, t, setLocale } = useI18n();
```

### Detección de scroll con IntersectionObserver

En lugar de escuchar el evento `scroll` (costoso en rendimiento), el proyecto usa `IntersectionObserver`:

```tsx
// Observa cuándo un elemento entra en pantalla
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // El elemento es visible
        setActiveSection(entry.target.id);
      }
    });
  },
  { threshold: 0.3, rootMargin: "-80px 0px -50% 0px" }
);
```

Esto se usa para:
- Resaltar la sección activa en el Header (con rootMargin para compensar el header fijo)
- Activar animaciones cuando el contenido entra en pantalla (`AnimateOnScroll`)
- Disparar animaciones escalonadas en `StackSection` (grid de tecnologías)

### Micro-interacciones CSS

El proyecto implementa feedback visual mediante clases CSS definidas en `globals.css`, con comportamiento diferenciado:

```css
/* Desktop: hover */
@media (hover: hover) and (pointer: fine) {
  .tech-item:hover {
    transform: translateY(-6px);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
    box-shadow:
      0 12px 24px rgba(63, 191, 154, 0.15),
      0 0 0 1px rgba(63, 191, 154, 0.2);
  }

  .tech-item:hover .tech-icon {
    color: var(--color-accent);
    transform: scale(1.2);
  }
}

/* Móvil: tap feedback */
@media (hover: none), (pointer: coarse) {
  .tech-item:active {
    transform: scale(0.96);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
  }
}
```

**Tokens de animación del proyecto (variables CSS):**
- `--ease-snappy`: `cubic-bezier(0.2, 0, 0, 1)` — Para transforms
- `--ease-smooth`: `cubic-bezier(0.4, 0, 0.2, 1)` — Para colores/fondos
- `--duration-fast`: 120ms — Nav, botones
- `--duration-base`: 150ms — Interacciones estándar
- `--duration-slow`: 180ms — Movimientos
- `--duration-emphasis`: 250ms — Transforms importantes
- `--duration-reveal`: 400ms — Animaciones de entrada

Este enfoque evita el problema de "sticky hover" en dispositivos táctiles y proporciona feedback apropiado para cada tipo de interacción.

## Optimizaciones

### Carga de imágenes

Next.js optimiza automáticamente las imágenes con el componente `Image`:

```tsx
<Image
  src="/images/miguelb-logo.png"
  alt={t.hero.imageAlt}
  width={480}
  height={480}
  sizes="(max-width: 640px) 112px, (max-width: 768px) 176px, (max-width: 1024px) 288px, 448px"
  priority  // Carga inmediatamente (above the fold)
  fetchPriority="high"
/>
```

### Carga de fuentes

La fuente Inter se carga de forma optimizada:

```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
```

### Code Splitting

Next.js divide automáticamente el código. Cada página solo carga el JavaScript que necesita.

### Accesibilidad

- **prefers-reduced-motion**: Respeta preferencias del usuario, desactiva animaciones si lo solicita
- **Minimum touch targets**: En dispositivos touch, botones tienen min 44px (WCAG)
- **Skip link**: Permite saltar al contenido principal
- **Focus visible**: Outline verde en elementos interactivos

## Diagrama de dependencias

```
                    layout.tsx
                         │
                         ▼
                 I18nClientProvider
                         │
           ┌─────────────┼─────────────┐
           │             │             │
           ▼             ▼             ▼
       Header.tsx    page.tsx     Footer.tsx
           │             │             │
           │    ┌────────┼────────┐    │
           │    │        │        │    │
           │    ▼        ▼        ▼    │
           │  Hero    About    Stack   │
           │             │        │    │
           │             ▼        ▼    │
           │          Contact          │
           │              │            │
           │              ▼            │
           │        /api/contact       │
           │                           │
           └──────────┬────────────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
    Container     Section    AnimateOnScroll
         │            │            │
         └────────────┼────────────┘
                      │
                      ▼
                   icons/
                      │
                      ▼
                  src/i18n/
```

## Resumen de la arquitectura

| Aspecto | Decisión |
|---------|----------|
| Framework | Next.js 16.1.1 App Router |
| Renderizado | Server Components por defecto, Client solo con interactividad |
| Estado local | `useState` (formularios, animaciones, UI) |
| Estado global | Context API (i18n via `useSyncExternalStore`) |
| Backend | API Routes de Next.js + Resend para emails |
| Estilos | Tailwind CSS v4 con variables CSS (`@theme inline`) |
| Animaciones de entrada | CSS puro (`animations.css`) + IntersectionObserver |
| Micro-interacciones | CSS puro en globals.css con media queries (hover/touch) |
| Tipado | TypeScript 5 con modo estricto (`strict: true`) |
| Organización | Por tipo de componente (layout, sections, ui, providers, icons) |
| Fuente | Inter via `next/font/google` |
| Imágenes | Optimizadas con componente `Image` de Next.js |
| i18n | Sistema propio con Context + localStorage + detección de idioma |
