# Sistema de Diseño

## Filosofía de diseño

El portfolio sigue un diseño **minimalista y profesional** con tema oscuro. Los principios clave son:

1. **Menos es más**: Espacios amplios, pocos elementos, máximo impacto
2. **Legibilidad**: Contraste alto entre texto y fondo
3. **Consistencia**: Los mismos colores, espaciados y animaciones en todo el sitio
4. **Profesionalismo**: Aspecto serio pero moderno, sin elementos distractores

---

## Paleta de colores

Los colores están definidos como **variables CSS** en `globals.css`, lo que permite cambiarlos en un solo lugar.

### Colores de fondo (Background)

```css
--color-bg-primary: #0F1115;    /* Fondo principal - casi negro */
--color-bg-secondary: #1A1F26;  /* Fondo secundario - gris oscuro */
--color-surface: #1E242C;       /* Superficie de tarjetas */
--color-border-subtle: #2A3140; /* Bordes sutiles */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `bg-primary` | ![#0F1115](https://via.placeholder.com/20/0F1115/0F1115) `#0F1115` | Fondo principal de la página |
| `bg-secondary` | ![#1A1F26](https://via.placeholder.com/20/1A1F26/1A1F26) `#1A1F26` | Secciones alternadas (contraste sutil) |
| `surface` | ![#1E242C](https://via.placeholder.com/20/1E242C/1E242C) `#1E242C` | Tarjetas, formularios, áreas elevadas |
| `border-subtle` | ![#2A3140](https://via.placeholder.com/20/2A3140/2A3140) `#2A3140` | Bordes y divisores |

### Colores de texto

```css
--color-text-primary: #E6E8EB;   /* Texto principal - casi blanco */
--color-text-secondary: #A1A6B0; /* Texto secundario - gris claro */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `text-primary` | ![#E6E8EB](https://via.placeholder.com/20/E6E8EB/E6E8EB) `#E6E8EB` | Títulos, texto principal |
| `text-secondary` | ![#A1A6B0](https://via.placeholder.com/20/A1A6B0/A1A6B0) `#A1A6B0` | Párrafos, texto menos importante |

### Color de acento

```css
--color-accent: #3FBF9A;        /* Verde teal - color principal */
--color-accent-hover: #35a886;  /* Verde más oscuro para hover */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `accent` | ![#3FBF9A](https://via.placeholder.com/20/3FBF9A/3FBF9A) `#3FBF9A` | Botones, enlaces, destacados |
| `accent-hover` | ![#35a886](https://via.placeholder.com/20/35a886/35a886) `#35a886` | Estado hover de botones |

### Colores de feedback

```css
--color-success: #3FBF9A;  /* Verde - mismo que accent */
--color-error: #F87171;    /* Rojo suave para errores */
```

| Variable | Color | Uso |
|----------|-------|-----|
| `success` | ![#3FBF9A](https://via.placeholder.com/20/3FBF9A/3FBF9A) `#3FBF9A` | Mensajes de éxito en formularios |
| `error` | ![#F87171](https://via.placeholder.com/20/F87171/F87171) `#F87171` | Mensajes de error en formularios |

### Uso de colores en Tailwind

Gracias a las variables CSS, puedes usar los colores así:

```tsx
// Fondos
<div className="bg-bg-primary">Fondo oscuro</div>
<div className="bg-bg-secondary">Fondo alternativo</div>
<div className="bg-surface">Tarjeta</div>

// Texto
<p className="text-text-primary">Texto principal</p>
<p className="text-text-secondary">Texto secundario</p>

// Acento
<button className="bg-accent hover:bg-accent-hover">Botón</button>
<a className="text-accent">Enlace</a>

// Bordes
<div className="border border-border-subtle">Con borde</div>
```

---

## Tipografía

### Fuente principal: Inter

**Inter** es una fuente sans-serif diseñada específicamente para pantallas. Es muy legible, incluso en tamaños pequeños.

```tsx
// Cargada en layout.tsx
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

**Características de Inter:**
- Diseñada para UI y pantallas
- Excelente legibilidad en todos los tamaños
- Gratis y open source
- Muy usada en productos tech (GitHub, Figma, Linear)

### Jerarquía tipográfica

| Elemento | Tamaño mobile | Tamaño desktop | Peso |
|----------|--------------|----------------|------|
| H1 (nombre) | 3rem (48px) | 3.75rem (60px) | Bold (700) |
| H2 (títulos sección) | 2.25rem (36px) | 3rem (48px) | Bold (700) |
| H3 (subtítulos) | 1.5rem (24px) | 1.875rem (30px) | Semibold (600) |
| Párrafos | 1rem (16px) | 1.125rem (18px) | Normal (400) |
| Texto pequeño | 0.875rem (14px) | 0.875rem (14px) | Normal (400) |

### Clases tipográficas usadas

```tsx
// Título principal (Hero)
<h1 className="text-5xl sm:text-6xl font-bold">Miguel Barra</h1>

// Títulos de sección
<h2 className="text-3xl sm:text-4xl font-bold">Sobre mí</h2>

// Etiquetas (labels)
<span className="text-sm font-medium text-accent">Ingeniero de Software</span>

// Párrafos
<p className="text-base sm:text-lg text-text-secondary">Contenido...</p>
```

### Espaciado de línea (line-height)

```css
body {
  line-height: 1.6;  /* 160% del tamaño de fuente */
}
```

Este espaciado amplio mejora la legibilidad de párrafos largos.

---

## Sistema de espaciado

El proyecto usa el sistema de espaciado de Tailwind (basado en múltiplos de 4px).

### Escala de espaciado

| Clase | Valor | Uso típico |
|-------|-------|------------|
| `p-1`, `m-1` | 4px | Espaciado mínimo |
| `p-2`, `m-2` | 8px | Espaciado pequeño |
| `p-4`, `m-4` | 16px | Espaciado base |
| `p-6`, `m-6` | 24px | Espaciado medio |
| `p-8`, `m-8` | 32px | Espaciado grande |
| `p-12`, `m-12` | 48px | Espaciado extra grande |
| `p-20`, `m-20` | 80px | Padding de secciones |

### Espaciado vertical de secciones

```tsx
// Section.tsx
<section className="py-20 sm:py-24 lg:py-32">
```

| Breakpoint | Padding vertical |
|------------|-----------------|
| Mobile | 80px (py-20) |
| Tablet (sm) | 96px (py-24) |
| Desktop (lg) | 128px (py-32) |

### Espaciado horizontal del Container

```tsx
// Container.tsx
<div className="px-4 sm:px-6 lg:px-8">
```

| Breakpoint | Padding horizontal |
|------------|-------------------|
| Mobile | 16px (px-4) |
| Tablet (sm) | 24px (px-6) |
| Desktop (lg) | 32px (px-8) |

---

## Breakpoints (responsive design)

El proyecto sigue el enfoque **mobile-first**: los estilos base son para móvil, y se agregan modificaciones para pantallas más grandes.

### Breakpoints de Tailwind

| Prefijo | Ancho mínimo | Dispositivos típicos |
|---------|--------------|---------------------|
| (ninguno) | 0px | Móviles |
| `sm:` | 640px | Móviles grandes, tablets pequeñas |
| `md:` | 768px | Tablets |
| `lg:` | 1024px | Laptops, tablets grandes |
| `xl:` | 1280px | Monitores |
| `2xl:` | 1536px | Monitores grandes |

### Ejemplos de uso

```tsx
// Texto que crece en pantallas grandes
<h1 className="text-4xl sm:text-5xl lg:text-6xl">

// Grid que cambia de columnas
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">

// Dirección de flex que cambia
<div className="flex flex-col-reverse lg:flex-row">

// Ocultar en móvil, mostrar en desktop
<span className="hidden lg:inline">Solo desktop</span>
```

---

## Animaciones y micro-interacciones

### Librería de animaciones: tw-animate-css

El proyecto usa `tw-animate-css` para animaciones declarativas en Tailwind v4.

#### Animaciones de entrada

```tsx
// Fade in básico
<div className="animate-in fade-in">

// Fade in + slide desde abajo
<div className="animate-in fade-in slide-in-from-bottom-2">

// Zoom in
<div className="animate-in zoom-in-95">

// Con duración específica
<div className="animate-in fade-in duration-300">

// Con delay (inline style)
<div
  className="animate-in fade-in"
  style={{ animationDelay: "100ms" }}
>
```

#### Clases de animación disponibles

| Clase | Efecto |
|-------|--------|
| `fade-in` | Aparece gradualmente |
| `slide-in-from-bottom-2` | Sube 8px mientras aparece |
| `slide-in-from-bottom-4` | Sube 16px mientras aparece |
| `zoom-in-95` | Crece desde 95% |
| `duration-200` | Dura 200ms |
| `duration-300` | Dura 300ms |
| `duration-500` | Dura 500ms |
| `duration-700` | Dura 700ms |

### Animación personalizada: pulse-glow

Definida en `globals.css`:

```css
@keyframes pulse-glow {
  0%, 100% { text-shadow: 0 0 0 transparent; }
  50% { text-shadow: 0 0 20px var(--color-accent); }
}

.animate-pulse-glow {
  animation: pulse-glow 1s ease-out;
}
```

**Uso**: Se aplica a las secciones cuando el usuario navega hacia ellas, creando un breve "destello" verde.

---

### Sistema de micro-interacciones CSS

El proyecto implementa un sistema completo de micro-interacciones definido en `globals.css` que diferencia entre dispositivos **desktop (hover)** y **móviles (touch)**.

#### Filosofía del sistema

En lugar de usar clases de Tailwind para hover/active, las micro-interacciones están centralizadas en CSS con:
- **Media queries específicas**: `@media (hover: hover) and (pointer: fine)` para desktop, `@media (hover: none), (pointer: coarse)` para touch
- **Transiciones consistentes**: 120-180ms con easing específico
- **Clases semánticas**: `.tech-item`, `.competency-card`, `.contact-link`, etc.

**Tokens de animación (definidos como variables CSS):**

```css
--ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* Para transforms */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Para colores/fondos */
--duration-fast: 120ms;   /* Nav, botones */
--duration-base: 150ms;   /* Interacciones estándar */
--duration-slow: 180ms;   /* Movimientos, transforms */
```

#### Clases de micro-interacciones disponibles

| Clase | Elemento | Comportamiento desktop (hover) | Comportamiento móvil (active) |
|-------|----------|--------------------------------|-------------------------------|
| `.tech-item` | Items de tecnología | translateY(-4px), border accent, sombra glow | scale(0.97), border accent |
| `.tech-icon` | Icono dentro de tech-item | color accent, scale(1.15) | color accent, scale(1.1) |
| `.tech-name` | Nombre de tecnología | color accent | color accent |
| `.competency-card` | Tarjetas de competencia | border accent, translateY(-2px), box-shadow | border accent, scale(0.98) |
| `.competency-title` | Título de competencia | color accent | color accent |
| `.contact-link` | Enlaces de contacto | translateX(4px), fondo bg-primary | scale(0.98), fondo bg-primary |
| `.contact-link-icon-wrapper` | Contenedor del icono | scale(1.1), fondo accent, sombra | fondo accent |
| `.contact-link-icon` | Icono de contacto | color bg-primary | color bg-primary |
| `.contact-link-value` | Valor del enlace | color accent | color accent |
| `.btn-primary` | Botones principales | fondo accent-hover, sombra glow | scale(0.97) |
| `.btn-secondary` | Botones secundarios | border accent, fondo bg-primary | scale(0.97), border accent |
| `.footer-link` | Enlaces del footer | fondo surface, color text-primary | scale(0.97), fondo surface |
| `.footer-link-icon` | Icono del footer | color accent, scale(1.15) | color accent, scale(1.1) |
| `.nav-logo` | Logo del header | color accent | scale(0.95), color accent |
| `.nav-cv-link` | Link de descarga CV | color bg-primary | scale(0.95) |
| `.nav-cv-icon` | Icono de descarga | color accent, translateY(2px) | color accent |
| `.nav-contact-btn` | Botón de contacto header | box-shadow glow | scale(0.95) |
| `.form-input` | Inputs del formulario | border accent, fondo bg-primary, ring glow | — |
| `.text-link` | Enlaces inline | color accent-hover, underline más visible | color accent-hover |

#### Ejemplo de implementación

```tsx
// En el componente (JSX)
<div className="tech-item flex items-center gap-3 rounded-lg px-4 py-3">
  <IconComponent className="tech-icon h-5 w-5 text-text-secondary" />
  <span className="tech-name text-sm font-medium text-text-primary">
    {tech.nombre}
  </span>
</div>

// En globals.css
.tech-item {
  position: relative;
  border: 1px solid transparent;
  transition:
    transform 180ms cubic-bezier(0.2, 0, 0, 1),
    background-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    border-color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.tech-icon {
  transition:
    color 150ms cubic-bezier(0.4, 0, 0.2, 1),
    transform 180ms cubic-bezier(0.2, 0, 0, 1);
}

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

@media (hover: none), (pointer: coarse) {
  .tech-item:active {
    transform: scale(0.97);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
  }

  .tech-item:active .tech-icon {
    color: var(--color-accent);
    transform: scale(1.1);
  }
}
```

#### Ventajas de este enfoque

1. **Separación de concerns**: Las animaciones complejas viven en CSS, no en JSX
2. **Mejor UX móvil**: Feedback táctil real sin "sticky hover"
3. **Performance**: CSS puro es más eficiente que JS para animaciones
4. **Consistencia**: Un solo lugar para modificar comportamientos
5. **Accesibilidad**: `-webkit-tap-highlight-color: transparent` elimina el highlight azul de iOS

---

### Patrón de animación on-scroll

El componente `AnimateOnScroll` detecta cuando un elemento entra en pantalla:

```tsx
// Estado inicial: invisible
<div className="opacity-0">

// Cuando entra en viewport: anima
<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
```

**Configuración del IntersectionObserver:**
- `threshold: 0.1` — Activa cuando 10% del elemento es visible
- `rootMargin: "0px 0px -50px 0px"` — Activa 50px antes del borde inferior

---

## Estados visuales

### Estados de botones

```tsx
// Botón primario
<button className="
  bg-accent
  hover:bg-accent-hover
  active:scale-95
  focus-visible:outline-2
  focus-visible:outline-accent
  transition-all
">

// Botón secundario (outline)
<button className="
  border border-border-subtle
  bg-transparent
  hover:bg-surface/50
  hover:border-accent/50
">
```

| Estado | Cambio visual |
|--------|---------------|
| Default | Color base |
| Hover | Color más oscuro o fondo sutil |
| Active (click) | Escala 95% |
| Focus | Outline verde accent |
| Disabled | Opacidad reducida |

### Estados de enlaces

```tsx
<a className="
  text-accent
  hover:text-accent-hover
  hover:underline
  transition-colors
">
```

### Estados de inputs

```tsx
<input className="
  bg-surface
  border border-border-subtle
  focus:border-accent
  focus:ring-1
  focus:ring-accent
  placeholder:text-text-secondary/50
">
```

---

## Efectos visuales especiales

### Backdrop blur (Header)

```tsx
<header className="backdrop-blur-sm bg-bg-primary/95">
```

Crea un efecto de vidrio esmerilado: el fondo es 95% opaco con blur aplicado al contenido detrás.

### Gradientes

```tsx
// Hero: División diagonal
<div className="
  absolute inset-0
  bg-gradient-to-br from-bg-secondary via-bg-secondary to-bg-primary
">

// Gradiente radial sutil
<div className="
  absolute inset-0
  bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]
  from-accent/5 via-transparent to-transparent
">
```

### Sombras

```tsx
// Sombra sutil para elementos elevados
<div className="shadow-lg shadow-black/10">

// Sombra de texto (animación glow)
text-shadow: 0 0 20px var(--color-accent);
```

---

## Accesibilidad visual

### Contraste de colores

| Combinación | Ratio | Cumple WCAG |
|-------------|-------|-------------|
| `text-primary` sobre `bg-primary` | ~14:1 | ✅ AAA |
| `text-secondary` sobre `bg-primary` | ~7:1 | ✅ AA |
| `accent` sobre `bg-primary` | ~8:1 | ✅ AA |

### Focus visible

```css
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}
```

Todos los elementos interactivos muestran un outline verde cuando se navega con teclado.

### Selección de texto

```css
::selection {
  background-color: var(--color-accent);
  color: var(--color-bg-primary);
}
```

Cuando el usuario selecciona texto, se resalta en verde.

---

## Guía rápida de colores

Cuando necesites elegir un color:

| Necesito... | Usa... |
|-------------|--------|
| Fondo de página | `bg-bg-primary` |
| Fondo alternativo | `bg-bg-secondary` |
| Fondo de tarjeta | `bg-surface` |
| Texto importante | `text-text-primary` |
| Texto normal | `text-text-secondary` |
| Destacar algo | `text-accent` o `bg-accent` |
| Borde sutil | `border-border-subtle` |
| Hover de enlace | `hover:text-accent-hover` |
| Focus | outline con `accent` |
