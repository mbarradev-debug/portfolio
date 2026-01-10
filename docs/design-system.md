# Sistema de Diseño

## Filosofía de diseño

El portfolio sigue un diseño **minimalista y profesional** con tema oscuro. Los principios clave son:

1. **Menos es más**: Espacios amplios, pocos elementos, máximo impacto
2. **Legibilidad**: Contraste alto entre texto y fondo
3. **Consistencia**: Los mismos colores, espaciados y animaciones en todo el sitio
4. **Profesionalismo**: Aspecto serio pero moderno, sin elementos distractores
5. **Mobile-first**: Diseño pensado primero para móviles, luego adaptado a desktop
6. **Feedback diferenciado**: Interacciones distintas para hover (desktop) y tap (móvil)

---

## Paleta de colores

Los colores están definidos como **variables CSS** en `globals.css` usando `@theme inline` de Tailwind v4.

### Colores de fondo (Background)

```css
--color-bg-primary: #0F1115;    /* Fondo principal - casi negro */
--color-bg-secondary: #1A1F26;  /* Fondo secundario - gris oscuro */
--color-surface: #1E242C;       /* Superficie de tarjetas */
--color-border-subtle: #2A3140; /* Bordes sutiles */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `bg-primary` | `#0F1115` | Fondo principal de la página |
| `bg-secondary` | `#1A1F26` | Secciones alternadas (contraste sutil) |
| `surface` | `#1E242C` | Tarjetas, formularios, áreas elevadas |
| `border-subtle` | `#2A3140` | Bordes y divisores |

### Colores de texto

```css
--color-text-primary: #E6E8EB;   /* Texto principal - casi blanco */
--color-text-secondary: #A1A6B0; /* Texto secundario - gris claro */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `text-primary` | `#E6E8EB` | Títulos, texto principal |
| `text-secondary` | `#A1A6B0` | Párrafos, texto menos importante |

### Color de acento

```css
--color-accent: #3FBF9A;        /* Verde teal - color principal */
--color-accent-hover: #35a886;  /* Verde más oscuro para hover */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `accent` | `#3FBF9A` | Botones, enlaces, badges, indicadores activos |
| `accent-hover` | `#35a886` | Estados hover de elementos accent |

El verde teal fue elegido porque:
- Transmite **tecnología y modernidad**
- Tiene **excelente contraste** con fondos oscuros
- Es **poco común** en portfolios (diferenciación)

### Colores de feedback

```css
--color-success: #3FBF9A;  /* Mismo que accent - éxito */
--color-error: #F87171;    /* Rojo suave - errores */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `success` | `#3FBF9A` | Mensajes de éxito en formularios |
| `error` | `#F87171` | Mensajes de error, validación |

---

## Tipografía

### Fuente: Inter

```tsx
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});
```

**¿Por qué Inter?**
- Diseñada específicamente para **pantallas**
- Altamente **legible** en tamaños pequeños
- **Profesional** sin ser aburrida
- Excelente soporte de **OpenType features**
- Gratuita y bien soportada por Google Fonts

### Variable CSS

```css
--font-sans: var(--font-inter), "Inter", sans-serif;
```

### Escala tipográfica

La escala sigue el sistema responsive de Tailwind:

| Elemento | Mobile | sm (640px+) | lg (1024px+) |
|----------|--------|-------------|--------------|
| Hero headline | 2rem (text-[2rem]) | 2.25rem (text-4xl) | 3rem (text-5xl) |
| Hero subheadline | 0.9375rem | 1.25rem (text-xl) | 1.5rem (text-2xl) |
| Section titles (h2) | 1.5rem (text-2xl) | 1.875rem (text-3xl) | 2.25rem (text-4xl) |
| Subtitles (h3) | 1.125rem (text-lg) | 1.125rem (text-lg) | 1.125rem (text-lg) |
| Body text | 0.875rem-1rem | 1rem-1.125rem | 1rem-1.125rem |
| Small text | 0.75rem (text-xs) | 0.875rem (text-sm) | 0.875rem (text-sm) |

### Pesos tipográficos

| Peso | Nombre | Uso |
|------|--------|-----|
| 400 | Regular | Párrafos |
| 500 | Medium | Labels, texto enfatizado |
| 600 | Semibold | Títulos de tarjetas, subtítulos |
| 700 | Bold | Headlines importantes |
| 800 | Extrabold | Hero headline |

---

## Espaciado

### Sistema de padding en secciones

El componente `Section` define tres niveles de espaciado vertical:

```css
compact:  py-16 sm:py-20 lg:py-24   /* 64px → 80px → 96px */
default:  py-20 sm:py-24 lg:py-32   /* 80px → 96px → 128px */
relaxed:  py-24 sm:py-28 lg:py-36   /* 96px → 112px → 144px */
```

### Container

```tsx
<div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-8">
  {children}
</div>
```

| Aspecto | Valor |
|---------|-------|
| Ancho máximo | 1200px |
| Padding horizontal móvil | 16px (px-4) |
| Padding horizontal tablet | 24px (sm:px-6) |
| Padding horizontal desktop | 32px (lg:px-8) |

### Gaps comunes

| Contexto | Gap |
|----------|-----|
| Entre secciones de contenido | mt-6 a mt-16 |
| Entre elementos de grid | gap-3 a gap-4 |
| Entre items de lista | space-y-3 a space-y-4 |
| Entre botones | gap-3 a gap-4 |

---

## Tokens de animación

### Variables CSS para timing

```css
/* Curvas de easing */
--ease-snappy: cubic-bezier(0.2, 0, 0, 1);   /* Rápido, responsive - para transforms */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Natural, fluido - para colores */

/* Duraciones */
--duration-fast: 120ms;       /* Nav, botones - feedback inmediato */
--duration-base: 150ms;       /* Interacciones estándar */
--duration-slow: 180ms;       /* Movimientos, transforms */
--duration-emphasis: 250ms;   /* Transforms importantes con énfasis */
--duration-reveal: 400ms;     /* Animaciones de entrada/reveal */
```

### Uso de los tokens

| Token | Uso |
|-------|-----|
| `--ease-snappy` | Transform (translateY, scale) |
| `--ease-smooth` | Colores, backgrounds, opacidad |
| `--duration-fast` | Navegación, botones pequeños |
| `--duration-base` | Hover states, focus |
| `--duration-slow` | Elevación, movimiento |
| `--duration-emphasis` | Tech items, competency cards (lift) |
| `--duration-reveal` | Animaciones de entrada en scroll |

---

## Sistema de micro-interacciones

### Filosofía

Las micro-interacciones siguen un principio fundamental: **feedback diferenciado según el dispositivo**.

- **Desktop (hover)**: Elevación, cambio de color, sombras glow
- **Móvil (touch)**: Escala al presionar, sin "sticky hover"

### Media queries utilizadas

```css
/* Desktop con mouse preciso */
@media (hover: hover) and (pointer: fine) { }

/* Móvil o dispositivo táctil */
@media (hover: none), (pointer: coarse) { }
```

### Clases de micro-interacción

| Clase | Componente | Comportamiento desktop | Comportamiento móvil |
|-------|------------|------------------------|----------------------|
| `.tech-item` | Items en grid de tecnologías | translateY(-6px), border accent, glow | scale(0.96), border accent |
| `.competency-card` | Tarjetas de competencia | translateY(-2px), border accent | scale(0.98), border accent |
| `.approach-card` | Tarjetas de enfoque | translateX(4px), border accent, shadow | scale(0.98), border accent |
| `.contact-link` | Enlaces de contacto | translateX(4px), icon scale(1.1), icon bg-accent | scale(0.98), icon bg-accent |
| `.footer-link` | Enlaces del footer | bg-surface, icon scale(1.15) | scale(0.97), bg-surface |
| `.btn-primary` | Botones principales | bg hover, shadow glow | scale(0.97) |
| `.btn-secondary` | Botones secundarios | border accent, bg change | scale(0.97), border accent |
| `.nav-logo` | Logo del header | color accent | scale(0.95) |
| `.nav-cv-link` | Link de CV | icon translateY(2px) | scale(0.95) |
| `.nav-contact-btn` | Botón contacto header | shadow glow | scale(0.95) |
| `.form-input` | Inputs del formulario | border accent, shadow ring | border change on tap |
| `.text-link` | Enlaces inline | color hover, underline opacity | color on tap |

### Ejemplo de implementación

```css
/* Tech items - desktop hover */
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

  .tech-item:hover .tech-name {
    color: var(--color-accent);
  }
}

/* Tech items - móvil tap */
@media (hover: none), (pointer: coarse) {
  .tech-item:active {
    transform: scale(0.96);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
  }

  .tech-item:active .tech-icon {
    color: var(--color-accent);
    transform: scale(1.1);
  }

  .tech-item:active .tech-name {
    color: var(--color-accent);
  }
}
```

---

## Animaciones especiales

### Badge shimmer (Hero)

Efecto de brillo que pasa por el badge de seniority una vez al cargar:

```css
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.badge-shimmer::after {
  background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 50%, transparent 100%);
  animation: shimmer 1.2s ease-out 1s forwards;
}
```

### CTA Pulse (Hero)

Pulso de atención en el botón principal para llamar la atención:

```css
@keyframes cta-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(63, 191, 154, 0); }
  50% { box-shadow: 0 0 16px 2px rgba(63, 191, 154, 0.25); }
}

.btn-primary-pulse {
  animation: cta-pulse 2.5s ease-in-out infinite;
  animation-delay: 2s;
}

/* Se pausa en hover/focus/active */
.btn-primary-pulse:hover,
.btn-primary-pulse:focus,
.btn-primary-pulse:active {
  animation-play-state: paused;
}
```

### Scroll indicator breathing (Hero)

Efecto de respiración para el indicador de scroll:

```css
@keyframes breathe {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.7; }
}

.scroll-breathe {
  animation: breathe 2.5s ease-in-out infinite;
}
```

### Pulse glow (navegación)

Animación que destaca la sección activa al hacer scroll:

```css
@keyframes pulse-glow {
  0%, 100% { text-shadow: 0 0 0 transparent; }
  50% { text-shadow: 0 0 20px var(--color-accent); }
}

.animate-pulse-glow {
  animation: pulse-glow 1s ease-out;
}
```

---

## Animaciones de entrada

Definidas en `animations.css`:

### Hero entry animations

```css
.hero-animate {
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.2, 0, 0, 1);
}

.hero-fade {
  animation-name: fadeIn;
  animation-duration: 600ms;
}

.hero-fade-up {
  animation-name: fadeInUp;
  animation-duration: 800ms;
}

.hero-fade-zoom {
  animation-name: fadeInZoom;
  animation-duration: 700ms;
}

/* Delays escalonados */
.hero-delay-0 { animation-delay: 0ms; }
.hero-delay-1 { animation-delay: 100ms; }
.hero-delay-2 { animation-delay: 200ms; }
.hero-delay-3 { animation-delay: 300ms; }
.hero-delay-4 { animation-delay: 400ms; }
.hero-delay-5 { animation-delay: 600ms; }
```

### Scroll-triggered animations

```css
.scroll-animate {
  animation: scrollFadeIn 400ms var(--ease-snappy) forwards;
}

.tech-animate {
  animation: techFadeIn 350ms var(--ease-snappy) forwards;
}
```

Estas animaciones se activan mediante `IntersectionObserver` en:
- `AnimateOnScroll.tsx` — Wrapper genérico
- `StackSection.tsx` — Grid de tecnologías con delay escalonado

---

## Separadores de sección

El componente `Section` incluye separadores visuales:

```css
/* Visible separator - stronger visual break */
.separator-visible {
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-border-subtle) 15%,
    var(--color-accent) 50%,
    var(--color-border-subtle) 85%,
    transparent 100%
  );
  opacity: 0.6;
}
```

| Variante | Clase | Uso |
|----------|-------|-----|
| `subtle` | `.h-px.opacity-60` | Separación mínima |
| `visible` | `.separator-visible` | Separación visual clara con acento |
| `none` | `.h-0.opacity-0` | Sin separador |

---

## Accesibilidad visual

### Focus visible

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

### Reduced motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Touch targets

```css
@media (pointer: coarse) {
  button:not(.nav-logo):not(.nav-cv-link):not(.nav-contact-btn),
  a:not(.nav-logo):not(.nav-cv-link):not(.nav-contact-btn),
  [role="button"]:not(.nav-logo):not(.nav-cv-link):not(.nav-contact-btn) {
    min-height: 44px;
    min-width: 44px;
  }
}
```

**WCAG 2.1 Target Size (Level AAA)**: 44x44 píxeles mínimo para elementos táctiles.

### Selection color

```css
::selection {
  background-color: var(--color-accent);
  color: var(--color-bg-primary);
}
```

### Scroll offset

```css
[id] {
  scroll-margin-top: 4.5rem;
}
```

Compensa el header fijo al navegar con anclas.

---

## Cómo usar los colores en componentes

### Con clases de Tailwind (recomendado)

```tsx
// Fondos
<div className="bg-bg-primary">...</div>
<div className="bg-bg-secondary">...</div>
<div className="bg-surface">...</div>

// Textos
<p className="text-text-primary">Título</p>
<p className="text-text-secondary">Descripción</p>

// Bordes
<div className="border border-border-subtle">...</div>

// Accent
<button className="bg-accent text-bg-primary">Botón</button>
<span className="text-accent">Destacado</span>
```

### Con variables CSS (casos especiales)

```tsx
// Para sombras con color accent
style={{ boxShadow: '0 4px 20px rgba(63, 191, 154, 0.35)' }}

// En transiciones CSS
transition: color var(--duration-base) var(--ease-smooth);
```

---

## Checklist de diseño

Al crear nuevos componentes, verifica:

- [ ] ¿Usa colores del sistema (`bg-surface`, `text-primary`, etc.)?
- [ ] ¿Los textos tienen el peso correcto para su jerarquía?
- [ ] ¿Hay suficiente contraste? (usa `text-primary` sobre `bg-primary`)
- [ ] ¿Los espaciados usan valores del sistema de Tailwind?
- [ ] ¿Tiene micro-interacción con hover/tap diferenciado?
- [ ] ¿Respeta `prefers-reduced-motion`?
- [ ] ¿Los elementos táctiles tienen mínimo 44px?
- [ ] ¿Tiene focus visible para navegación por teclado?
- [ ] ¿Usa los tokens de animación correctos?
