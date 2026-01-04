# Arquitectura del Proyecto

## Visión general

Este portfolio sigue una arquitectura moderna basada en **Next.js App Router** con **componentes de React**. La aplicación es una Single Page Application (SPA) que renderiza cinco secciones principales en una única página.

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                            │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                     Header                           │   │
│  │            (navegación fija, siempre visible)        │   │
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
│  │  │               CVSection                      │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  │  ┌─────────────────────────────────────────────┐    │   │
│  │  │            ContactSection                    │    │   │
│  │  └─────────────────────────────────────────────┘    │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │                     Footer                           │   │
│  │              (enlaces sociales, copyright)           │   │
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
export function AboutSection() {
  return <section>Contenido estático...</section>;
}

// Client Component
"use client"; // Esta línea es obligatoria

export function ContactSection() {
  const [formData, setFormData] = useState({});
  return <form onSubmit={handleSubmit}>...</form>;
}
```

**En este proyecto:**

| Componente | Tipo | Razón |
|------------|------|-------|
| `Header.tsx` | Client | IntersectionObserver para sección activa + scroll hide/show |
| `Footer.tsx` | Server | Solo contenido estático con iconos y año dinámico |
| `HeroSection.tsx` | Client | Navegación con `useScrollToSection` |
| `AboutSection.tsx` | Server | Solo texto estático |
| `StackSection.tsx` | Client | IntersectionObserver para animaciones escalonadas del grid |
| `CVSection.tsx` | Server | Solo enlace de descarga |
| `ContactSection.tsx` | Client | Formulario con gestión de estado |
| `AnimateOnScroll.tsx` | Client | Wrapper de animación con IntersectionObserver |
| `Container.tsx` | Server | Wrapper de layout sin interactividad |
| `Section.tsx` | Server | Wrapper de layout sin interactividad |

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
└─────────────────────┘
```

**Hidratación**: Es el proceso donde React "activa" el HTML estático enviado por el servidor, agregando los event listeners y la interactividad.

## Separación de responsabilidades

El proyecto sigue el principio de **separación de responsabilidades** (cada cosa en su lugar):

### 1. Capa de Presentación (`/components`)

Contiene todos los componentes visuales, organizados por tipo:

```
components/
├── layout/     → Estructura de la página
├── sections/   → Contenido principal
├── ui/         → Componentes reutilizables
└── icons/      → Iconos SVG
```

### 2. Capa de Lógica (`/hooks`)

Contiene la lógica reutilizable separada de los componentes:

```
hooks/
└── useScrollToSection.ts  → Lógica de navegación
```

### 3. Capa de Estilos (`/app/globals.css`)

Define el sistema de diseño centralizado y las micro-interacciones:

```css
@theme inline {
  /* Background */
  --color-bg-primary: #0F1115;
  --color-bg-secondary: #161A20;
  --color-surface: #1B2028;
  --color-border-subtle: #232834;

  /* Text */
  --color-text-primary: #E6E8EB;
  --color-text-secondary: #A1A6B0;

  /* Accent */
  --color-accent: #3FBF9A;
  --color-accent-hover: #35a886;

  /* Font */
  --font-sans: var(--font-inter), "Inter", sans-serif;
}

/* Animación personalizada */
@keyframes pulse-glow { ... }

/* Sistemas de micro-interacciones (8 en total) */
.tech-item { ... }       /* Items de tecnología */
.competency-card { ... } /* Tarjetas de competencia */
.contact-link { ... }    /* Enlaces de contacto */
.btn-primary { ... }     /* Botones principales */
.btn-secondary { ... }   /* Botones secundarios */
.footer-link { ... }     /* Enlaces del footer */
.nav-logo { ... }        /* Logo del header */
.nav-cv-link { ... }     /* Link de descarga CV */
.nav-contact-btn { ... } /* Botón de contacto del header */
.form-input { ... }      /* Inputs del formulario */
.text-link { ... }       /* Enlaces inline de texto */
```

Las micro-interacciones usan media queries para diferenciar entre desktop (`@media (hover: hover) and (pointer: fine)`) y móvil (`@media (hover: none), (pointer: coarse)`).

### 4. Capa de Configuración (raíz)

Archivos de configuración del proyecto:

```
/
├── next.config.ts      → Configuración de Next.js
├── tsconfig.json       → Configuración de TypeScript
├── postcss.config.mjs  → Configuración de PostCSS/Tailwind
└── package.json        → Dependencias y scripts
```

## Patrón de composición

Los componentes se componen jerárquicamente como muñecas rusas:

```tsx
// layout.tsx
<html>
  <body>
    <Header />
    <main>
      {children}  {/* ← Aquí entra page.tsx */}
    </main>
    <Footer />
  </body>
</html>

// page.tsx
<>
  <HeroSection />
  <AboutSection />
  <StackSection />
  <CVSection />
  <ContactSection />
</>

// Cada Section usa...
<Section variant="primary">
  <Container>
    <AnimateOnScroll>
      {/* Contenido */}
    </AnimateOnScroll>
  </Container>
</Section>
```

Este patrón permite:
- **Consistencia**: todas las secciones tienen el mismo padding y max-width
- **Flexibilidad**: cada sección puede variar su fondo (`variant`)
- **Reutilización**: `Container` y `Section` se usan en todas partes

## Interactividad y estado

### Estado local con useState

Cada componente maneja su propio estado cuando es necesario:

```tsx
// Header.tsx
const [activeSection, setActiveSection] = useState<string>("hero");

// ContactSection.tsx
const [formStatus, setFormStatus] = useState<FormStatus>("idle");
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
    transform: translateY(-4px);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
    box-shadow:
      0 4px 12px rgba(63, 191, 154, 0.2),
      0 0 0 1px rgba(63, 191, 154, 0.1);
  }

  .tech-item:hover .tech-icon {
    color: var(--color-accent);
    transform: scale(1.15);
  }
}

/* Móvil: tap feedback */
@media (hover: none), (pointer: coarse) {
  .tech-item:active {
    transform: scale(0.97);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
  }
}
```

**Easing temporal del proyecto:**
- Interacciones (transform): `cubic-bezier(0.2, 0, 0, 1)` — snappy, 120-180ms
- Transiciones (colors): `cubic-bezier(0.4, 0, 0.2, 1)` — smooth, 150ms

Este enfoque evita el problema de "sticky hover" en dispositivos táctiles y proporciona feedback apropiado para cada tipo de interacción.

## Optimizaciones

### Carga de imágenes

Next.js optimiza automáticamente las imágenes con el componente `Image`:

```tsx
<Image
  src="/images/miguelb-logo.png"
  alt="Miguel Barra"
  width={480}
  height={480}
  sizes="(max-width: 640px) 288px, 448px"
  priority  // Carga inmediatamente (above the fold)
/>
```

### Carga de fuentes

La fuente Inter se carga de forma optimizada:

```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",  // Variable CSS para usar en Tailwind
});
```

### Code Splitting

Next.js divide automáticamente el código. Cada página solo carga el JavaScript que necesita.

## Diagrama de dependencias

```
                    layout.tsx
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
           │    │        │        │    │
           │    ▼        ▼        ▼    │
           │   CV    Contact          │
           │                          │
           └──────────┬───────────────┘
                      │
         ┌────────────┼────────────┐
         ▼            ▼            ▼
    Container     Section    AnimateOnScroll
         │            │            │
         └────────────┼────────────┘
                      │
                      ▼
                   icons/
```

## Resumen de la arquitectura

| Aspecto | Decisión |
|---------|----------|
| Framework | Next.js 16.1.1 App Router |
| Renderizado | Server Components por defecto, Client solo con interactividad |
| Estado | Local con `useState` (sin Redux/Context global) |
| Estilos | Tailwind CSS v4 con variables CSS (`@theme inline`) |
| Animaciones de entrada | tw-animate-css + IntersectionObserver |
| Micro-interacciones | CSS puro en globals.css con media queries (hover/touch) |
| Tipado | TypeScript 5 con modo estricto (`strict: true`) |
| Organización | Por tipo de componente (layout, sections, ui, icons) |
| Fuente | Inter via `next/font/google` |
| Imágenes | Optimizadas con componente `Image` de Next.js |
