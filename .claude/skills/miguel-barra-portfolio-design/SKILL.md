---
name: miguel-barra-portfolio-design
description: Sistema de diseño especializado para el portfolio profesional de Miguel Barra. Usar cuando se diseñe o implemente cualquier sección del portfolio. Define layout, tipografía, paleta de colores, motion, espaciado y detalles visuales como única fuente de verdad. Evita redefinir estilos entre sesiones.
author: Miguel Barra
version: 1.0.0
created: 2026-05-05
base_skill: frontend-design
tags: [portfolio, design-system, frontend, full-stack, react, nextjs]
---

# miguel-barra-portfolio-design

> Sistema de diseño especializado para el portfolio profesional de Miguel Barra.  
> Fuente única de verdad para layout, tipografía, color, motion, espaciado y detalles visuales.  
> Derivado del skill `frontend-design`, adaptado al perfil Full Stack Developer · Santiago, Chile.

---

## 1. Contexto y Perfil

| Atributo | Valor |
|---|---|
| **Nombre** | Miguel Barra |
| **Rol** | Full Stack Developer — React · Next.js · TypeScript |
| **Seniority** | Mid–Senior (3+ años en producción, sector público y privado) |
| **Especialización** | Frontend-heavy full stack: UI/UX, performance, APIs, DB |
| **Mercado objetivo** | Reclutadores en Chile (sector tech, consultoras, startups) |
| **Diferenciadores** | Impacto real en producto, código limpio y escalable, experiencia en salud y SaaS B2B |
| **Personalidad de marca** | Sobrio, moderno, técnico con calidez. No minimalista vacío, no maximalista ruidoso. |

**Dirección estética comprometida:** *Editorial técnico refinado* — Como un design system bien ejecutado: cada elemento tiene su razón de ser. Inspirado en la intersección entre documentación técnica premium (Vercel, Linear, Resend) y el peso editorial de publicaciones de diseño nórdicas. Nada grita, todo habla.

---

## 2. Layout — Estructura General

### Arquitectura de página (single-page scroll)

```
┌─────────────────────────────────────────────────────┐
│  NAV (fixed, minimal)                               │
│  Logo/nombre izquierda · Links derecha              │
├─────────────────────────────────────────────────────┤
│  HERO                                               │
│  Tipografía display grande · Rol + tagline          │
│  Avatar circular · CTAs (contacto, GitHub)          │
├─────────────────────────────────────────────────────┤
│  ABOUT (2 columnas: texto izq · stack visual der)   │
├─────────────────────────────────────────────────────┤
│  EXPERIENCE (timeline vertical, lado izquierdo)     │
│  Cards con empresa · fechas · bullets de impacto    │
├─────────────────────────────────────────────────────┤
│  PROJECTS (grid 2–3 cols en desktop, 1 en mobile)   │
│  Cards con preview, stack chips, links              │
├─────────────────────────────────────────────────────┤
│  SKILLS (grid de categorías con iconos/badges)      │
├─────────────────────────────────────────────────────┤
│  CONTACT (centrado, simple, directo)                │
├─────────────────────────────────────────────────────┤
│  FOOTER (minimalista: nombre · año · links)         │
└─────────────────────────────────────────────────────┘
```

### Grid base
- **Desktop (≥1280px):** `max-width: 1100px`, centrado, padding horizontal `2rem`
- **Tablet (768–1279px):** fluid, padding `1.5rem`
- **Mobile (<768px):** single column, padding `1rem`
- **Grid interno:** CSS Grid con 12 columnas, gap base `1.5rem`
- **Secciones:** separadas por `padding-block: clamp(5rem, 10vw, 9rem)`

### Filosofía de layout
- Asimetría controlada: hero y about usan proporciones 60/40 o 55/45
- Sin simetría perfecta en todas las secciones — alterna la alineación del contenido
- Un único elemento "rompe el grid" por sección para generar tensión visual (número grande de sección, línea decorativa, etc.)
- Scroll largo y respirado — no hay prisa en llegar al fondo

---

## 3. Tipografía

### Stack tipográfico

| Rol | Familia | Fuente | Uso |
|---|---|---|---|
| **Display / Hero** | `Syne` | Google Fonts | Nombre, título hero, headings de sección grandes |
| **Body / UI** | `DM Sans` | Google Fonts | Párrafos, labels, bullets, navegación |
| **Código / Técnico** | `JetBrains Mono` | Google Fonts | Stack chips, fechas, snippets, detalles técnicos |

### Razones de elección
- **Syne:** Geométrica con carácter propio, muy usada en portfolios de tech europeos modernos. Evoca diseño de sistema sin ser fría.
- **DM Sans:** Extremadamente legible en pantalla, peso óptico perfecto para densidad de texto de CV. No es Inter.
- **JetBrains Mono:** Señal cultural para developers sin ser cliché. Coherente con el trabajo de Miguel en IDEs y terminales.

### Escala tipográfica (CSS clamp)

```css
--text-xs:    clamp(0.7rem,  1.5vw, 0.75rem);
--text-sm:    clamp(0.8rem,  1.8vw, 0.875rem);
--text-base:  clamp(0.9rem,  2vw,   1rem);
--text-lg:    clamp(1rem,    2.5vw, 1.125rem);
--text-xl:    clamp(1.1rem,  3vw,   1.375rem);
--text-2xl:   clamp(1.4rem,  4vw,   1.875rem);
--text-3xl:   clamp(1.8rem,  5vw,   2.5rem);
--text-4xl:   clamp(2.5rem,  7vw,   3.75rem);
--text-hero:  clamp(3.5rem,  10vw,  6rem);
```

### Jerarquía y estilos

```css
/* Nombre / Hero display */
.text-hero {
  font-family: 'Syne', sans-serif;
  font-size: var(--text-hero);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 0.95;
}

/* Headings de sección */
.text-section-title {
  font-family: 'Syne', sans-serif;
  font-size: var(--text-3xl);
  font-weight: 700;
  letter-spacing: -0.02em;
}

/* Subtítulos / empresa */
.text-subtitle {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-lg);
  font-weight: 500;
}

/* Body */
.text-body {
  font-family: 'DM Sans', sans-serif;
  font-size: var(--text-base);
  font-weight: 400;
  line-height: 1.65;
}

/* Labels técnicos / fechas */
.text-mono {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-sm);
  font-weight: 400;
  letter-spacing: 0.02em;
}
```

### Reglas de uso
- Máximo 3 tamaños de fuente visibles en cualquier viewport a la vez
- Weights en uso: 400 (body), 500 (labels), 700–800 (headings). Nunca 300.
- `letter-spacing` negativo solo en display grande; nunca en body
- `line-height` 1.6–1.7 en párrafos; 1.1–1.2 en headings grandes

---

## 4. Color & Theme

### Paleta — Modo Oscuro (primario)

El portfolio se presenta en **dark mode como estado por defecto**, con toggle a light mode disponible.

```css
:root[data-theme="dark"] {
  /* Fondos */
  --bg-base:       #0A0A0F;   /* negro azulado profundo — no negro puro */
  --bg-surface:    #111118;   /* superficie de cards y secciones */
  --bg-elevated:   #1A1A24;   /* hover states, tooltips */
  --bg-border:     #252535;   /* bordes sutiles */

  /* Texto */
  --text-primary:  #F0EFE8;   /* blanco cálido — no #FFFFFF */
  --text-secondary:#A09FA8;   /* gris lavanda para subtítulos */
  --text-muted:    #5A5966;   /* placeholders, metadatos */

  /* Acento principal: azul eléctrico frío */
  --accent:        #4F8EF7;   /* links, CTAs, highlights */
  --accent-hover:  #6BA3FF;   /* hover del acento */
  --accent-subtle: #1C2D4F;   /* fondo tenue de badges */

  /* Acento secundario: verde menta para éxito/stack */
  --accent-alt:    #3ECFB2;   /* stack chips seleccionados, éxito */

  /* Líneas y separadores */
  --line:          rgba(255,255,255,0.07);

  /* Sombras */
  --shadow-card:   0 4px 24px rgba(0,0,0,0.4), 0 1px 4px rgba(0,0,0,0.3);
  --shadow-glow:   0 0 40px rgba(79,142,247,0.15);
}
```

### Paleta — Modo Claro

```css
:root[data-theme="light"] {
  --bg-base:       #F7F6F2;   /* blanco cálido, no frío */
  --bg-surface:    #FFFFFF;
  --bg-elevated:   #EDECEB;
  --bg-border:     #DDDBD6;

  --text-primary:  #0F0E14;
  --text-secondary:#5A5870;
  --text-muted:    #9896A4;

  --accent:        #2B6EE8;
  --accent-hover:  #1A5DD4;
  --accent-subtle: #EBF1FD;

  --accent-alt:    #198A73;

  --line:          rgba(0,0,0,0.08);
  --shadow-card:   0 2px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.05);
  --shadow-glow:   0 0 30px rgba(43,110,232,0.1);
}
```

### Semántica del color
| Color | Uso exclusivo |
|---|---|
| `--accent` | Links, botones CTA, focus rings, elemento activo en nav |
| `--accent-alt` | Stack tech chips (frontend), indicadores de éxito |
| `--text-secondary` | Empresa, fechas, descripción secundaria |
| `--text-muted` | Metadatos, numbering de secciones, placeholders |
| `--bg-surface` | Cards de proyectos y experiencia |
| `--bg-elevated` | Hover sobre cards, dropdown, tooltips |

### Reglas de color
- El acento (`--accent`) aparece como máximo en 3 elementos a la vez en el viewport
- NO usar gradientes de fondo en secciones principales — la profundidad viene del layout
- Los stack chips usan `--bg-elevated` con texto `--accent-alt` en dark / `--accent` en light
- Hover states siempre 15–20% más claro/oscuro que el base, NUNCA un color diferente

---

## 5. Motion — Animaciones y Microinteracciones

### Filosofía
*Un solo sistema coordinado, no efectos dispersos.* Las animaciones refuerzan la narrativa de scroll: el portfolio "se construye" ante el reclutador mientras avanza.

### Variables de timing

```css
:root {
  --ease-out-expo:   cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out-quad: cubic-bezier(0.45, 0, 0.55, 1);
  --ease-spring:     cubic-bezier(0.34, 1.4, 0.64, 1); /* leve overshoot */

  --dur-fast:   150ms;
  --dur-normal: 280ms;
  --dur-slow:   480ms;
  --dur-hero:   900ms;
}
```

### Secuencia de entrada (Hero)

```css
/* Staggered reveal: nombre → rol → tagline → CTA */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.hero-name    { animation: fadeSlideUp var(--dur-hero) var(--ease-out-expo) 0ms    both; }
.hero-role    { animation: fadeSlideUp var(--dur-hero) var(--ease-out-expo) 120ms  both; }
.hero-tagline { animation: fadeSlideUp var(--dur-hero) var(--ease-out-expo) 240ms  both; }
.hero-ctas    { animation: fadeSlideUp var(--dur-hero) var(--ease-out-expo) 360ms  both; }
.hero-avatar  { animation: fadeSlideUp var(--dur-hero) var(--ease-out-expo) 480ms  both; }
```

### Scroll-triggered (Intersection Observer)

```js
// Clase base — elementos ocultos
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--dur-slow) var(--ease-out-expo),
              transform var(--dur-slow) var(--ease-out-expo);
}
// Clase activada al entrar en viewport
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
// Stagger en listas (experience bullets, project cards)
.reveal:nth-child(1) { transition-delay: 0ms; }
.reveal:nth-child(2) { transition-delay: 60ms; }
.reveal:nth-child(3) { transition-delay: 120ms; }
```

### Microinteracciones

| Elemento | Comportamiento | Duración |
|---|---|---|
| Nav links | Underline que crece desde izquierda (`scaleX`) | 200ms |
| Cards (proyecto/experiencia) | `translateY(-4px)` + `shadow-glow` | 280ms |
| Stack chips | `background-color` → `--accent-subtle` | 150ms |
| CTA buttons | `translateY(-2px)` + leve `box-shadow` | 200ms |
| Avatar | Muy sutil `scale(1.02)` en hover | 400ms ease-spring |
| Section numbers | Fade in 500ms después del heading | 300ms |

### Reglas de motion
- **Reducir movimiento:** Todos los efectos deben respetear `@media (prefers-reduced-motion: reduce)` — colapsando a fade simple o ninguna animación
- Ningún loop infinito visible (sin spinners, sin pulsos constantes)
- No más de 3 elementos animándose simultáneamente en scroll
- Las animaciones no bloquean el contenido — siempre `both` fill mode con fallback visible

---

## 6. Spatial Composition — Espaciado, Ritmo y Grid

### Sistema de espaciado (escala 4px)

```css
:root {
  --space-1:  4px;
  --space-2:  8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-5:  20px;
  --space-6:  24px;
  --space-8:  32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
}
```

### Ritmo vertical por sección

| Sección | Padding vertical |
|---|---|
| Hero | `clamp(8rem, 18vw, 14rem)` top · `clamp(6rem, 12vw, 10rem)` bottom |
| About | `clamp(5rem, 10vw, 9rem)` |
| Experience | `clamp(5rem, 10vw, 9rem)` |
| Projects | `clamp(5rem, 10vw, 9rem)` |
| Skills | `clamp(4rem, 8vw, 7rem)` |
| Contact | `clamp(6rem, 12vw, 10rem)` |

### Grid interno por sección

**Hero (2 cols, 60/40):**
```css
.hero-grid {
  display: grid;
  grid-template-columns: 1fr 0.65fr;
  gap: var(--space-16);
  align-items: center;
}
```

**Projects (cards):**
```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-6);
}
```

**Skills (categorías):**
```css
.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: var(--space-4);
}
```

### Elementos que rompen el grid (uno por sección)
- **Hero:** El número de sección "01" en `--text-hero` tamaño, `opacity: 0.04`, posicionado absolute en la esquina superior derecha
- **About:** La foto/avatar ligeramente más grande de lo esperado, sobresale 2rem del contenedor en desktop
- **Experience:** La línea de timeline sale 1rem del padding izquierdo del contenedor
- **Projects:** La primera card ocupa ancho completo en desktop (featured project)

---

## 7. Background & Visual Details

### Textura base (dark mode)

```css
/* Ruido sutil para evitar el vacío plano */
body::before {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,..."); /* SVG noise filter */
  opacity: 0.025;
  pointer-events: none;
  z-index: 0;
}
```

> **Implementación recomendada:** Usar `feTurbulence` SVG filter o una imagen PNG de ruido de 200×200px tileable al 2–3% de opacidad.

### Gradient mesh (Hero background)

```css
.hero-bg {
  background:
    radial-gradient(ellipse 60% 40% at 70% 50%,
      rgba(79, 142, 247, 0.07) 0%,
      transparent 70%),
    radial-gradient(ellipse 40% 60% at 20% 80%,
      rgba(62, 207, 178, 0.05) 0%,
      transparent 70%),
    var(--bg-base);
}
```

### Decoradores de sección

```css
/* Número de sección decorativo */
.section-number {
  font-family: 'Syne', sans-serif;
  font-size: clamp(6rem, 15vw, 10rem);
  font-weight: 800;
  color: var(--text-primary);
  opacity: 0.03;
  position: absolute;
  top: -1rem;
  right: -1rem;
  pointer-events: none;
  user-select: none;
  line-height: 1;
}
```

```css
/* Línea divisoria con degradado */
.section-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--bg-border) 20%,
    var(--bg-border) 80%,
    transparent
  );
  margin-block: var(--space-1);
}
```

### Cards (proyectos y experiencia)

```css
.card {
  background: var(--bg-surface);
  border: 1px solid var(--bg-border);
  border-radius: 12px;
  padding: var(--space-8);
  box-shadow: var(--shadow-card);
  transition:
    transform var(--dur-normal) var(--ease-out-expo),
    box-shadow var(--dur-normal) var(--ease-out-expo),
    border-color var(--dur-normal) ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-card), var(--shadow-glow);
  border-color: rgba(79, 142, 247, 0.25);
}
```

### Stack chips (badges tecnológicos)

```css
.chip {
  font-family: 'JetBrains Mono', monospace;
  font-size: var(--text-xs);
  font-weight: 400;
  color: var(--accent-alt);
  background: var(--accent-subtle);
  border: 1px solid rgba(62, 207, 178, 0.15);
  border-radius: 4px;
  padding: 2px 8px;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  transition: background var(--dur-fast) ease;
}
```

### Avatar

```css
.avatar {
  width: clamp(140px, 20vw, 200px);
  height: clamp(140px, 20vw, 200px);
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--bg-border);
  box-shadow:
    0 0 0 6px var(--bg-surface),
    0 0 0 8px var(--bg-border),
    var(--shadow-card);
  transition: transform var(--dur-slow) var(--ease-spring);
}

.avatar:hover {
  transform: scale(1.03);
}
```

### Cursor personalizado (sutil, desktop only)
```css
@media (hover: hover) and (pointer: fine) {
  * { cursor: none; }

  .custom-cursor {
    width: 8px;
    height: 8px;
    background: var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9999;
    transition: transform 0.1s ease, opacity 0.2s ease;
  }

  .custom-cursor-ring {
    width: 32px;
    height: 32px;
    border: 1px solid var(--accent);
    border-radius: 50%;
    position: fixed;
    pointer-events: none;
    z-index: 9998;
    opacity: 0.4;
    transition: transform 0.25s var(--ease-out-expo);
  }
}
```

---

## 8. Componentes Clave — Especificación

### 8.1 Navegación

```
[MB]  ←→  Sobre mí · Experiencia · Proyectos · Contacto  [Toggle Theme]
```

- Fija en top, `backdrop-filter: blur(12px)` con `background: rgba(bg-base, 0.85)`
- Border-bottom: `1px solid var(--line)`
- En mobile: hamburger → drawer lateral desde la derecha
- Indicador de sección activa: punto `var(--accent)` bajo el link + `font-weight: 500`

### 8.2 Hero

```
[01]                               ← número decorativo (opacity: 0.03)

Miguel Barra                       ← Syne 800, --text-hero
Full Stack Developer               ← DM Sans 400, --text-2xl, --text-secondary
React · Next.js · TypeScript       ← JetBrains Mono, --text-sm, --accent-alt

Descripción de 2 líneas            ← DM Sans 400, --text-lg, --text-secondary
sobre impacto y enfoque.

[Ver proyectos ↓]  [GitHub ↗]      ← Botones CTA
                                                        [Avatar con ring]
```

### 8.3 Tarjeta de Proyecto (featured — ancho completo)

```
┌─────────────────────────────────────────────────────────────┐
│  [Preview visual / gradient placeholder]                     │
│  Divisapp                              [Next.js] [TypeScript]│
│  Plataforma de indicadores económicos             [↗] [GitHub]│
│  chilenos en tiempo real.                                    │
└─────────────────────────────────────────────────────────────┘
```

### 8.4 Timeline de Experiencia

```
         │
  ●──────┤  Forcast                               Jul 2024 – Ene 2026
         │  Full Stack Developer · Consultoría
         │
         │  • Desarrollé módulo SaaS B2B completo...
         │  • Módulo QR en E-Hive con Angular...
         │
         │
  ●──────┤  Valuesite Ltda.                       Mar 2022 – Jul 2024
         │  ...
```

- La línea vertical usa `--accent` en el punto activo (más reciente), `--bg-border` en anteriores
- Las fechas usan `JetBrains Mono`, `--text-muted`

---

## 9. Reglas de Consistencia — Checklist

Antes de implementar cualquier sección, verificar:

- [ ] ¿Usa únicamente colores de `--variables` definidas? No hardcodear hex
- [ ] ¿Los textos siguen la jerarquía tipográfica? (Syne → headings, DM Sans → body, JetBrains → técnico)
- [ ] ¿Las transiciones usan `--dur-*` y `--ease-*` del sistema?
- [ ] ¿El elemento de "ruptura de grid" está presente y es uno solo?
- [ ] ¿El número decorativo de sección está presente (`opacity: 0.03`)?
- [ ] ¿Los stack chips usan `--accent-alt` y `JetBrains Mono`?
- [ ] ¿Las cards tienen `border`, `box-shadow` y hover definido?
- [ ] ¿Se respeta `prefers-reduced-motion`?
- [ ] ¿El acento `--accent` aparece en máximo 3 elementos simultáneos?
- [ ] ¿El spacing es múltiplo de 4px usando `--space-*`?

---

## 10. Lo que NO hacer

| ❌ Prohibido | ✅ Alternativa |
|---|---|
| Fuentes: Inter, Roboto, Arial, Space Grotesk | Syne + DM Sans + JetBrains Mono |
| Gradientes morado/rosa/purple en fondo | Mesh sutil azul-verde solo en hero |
| Fondo blanco puro `#FFFFFF` | `#F7F6F2` (cálido) |
| Negro puro `#000000` | `#0A0A0F` (azulado profundo) |
| Cards sin borde, solo sombra | Siempre borde + sombra |
| Animaciones en loop infinito | Solo en entrada y en hover |
| Más de 2 acentos distintos visibles a la vez | `--accent` primario, `--accent-alt` solo para tech chips |
| Secciones simétricas y predecibles | Un elemento rompe el grid por sección |
| Texto muted con opacidad < 40% | Mínimo `--text-muted: #5A5966` |
| Emojis como iconografía principal | Iconos SVG de Lucide o Phosphor |

---

## 11. Tokens de Importación (HTML/Next.js)

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
```

```js
// tailwind.config.js (si se usa Tailwind)
fontFamily: {
  display: ['Syne', 'sans-serif'],
  body:    ['DM Sans', 'sans-serif'],
  mono:    ['JetBrains Mono', 'monospace'],
}
```

---

## 12. Datos del Portfolio (Hardcoded)

> Esta sección contiene **toda la información de contenido del portfolio**, extraída del CV de Miguel Barra.  
> Es la **única fuente de datos** del sitio — estática, no dinámica, no sujeta a cambios externos.  
> Organizada por sección para mantener separación de responsabilidades en el código.  
> Usar como constantes o variables en el componente/módulo correspondiente a cada sección.

---

### 12.1 Información Personal (`PERSONAL_INFO`)

```ts
const PERSONAL_INFO = {
  name: "Miguel Barra",
  role: "Full Stack Developer",
  stack: ["React", "Next.js", "TypeScript"],
  location: "Santiago, Chile",
  email: "mbarra.git@gmail.com",
  phone: "+56 9 4081 9076",
  website: "miguelbarra.cl",
  github: "github.com/mbarradev",
  linkedin: "linkedin.com/in/miguelbarrarios",
  tagline: "Full Stack Developer con más de 3 años de experiencia construyendo aplicaciones web y móviles en producción, tanto para el sector público como privado.",
} as const;
```

---

### 12.2 Perfil Profesional (`PROFILE_SUMMARY`)

```ts
const PROFILE_SUMMARY =
  "Full Stack Developer con más de 3 años de experiencia construyendo aplicaciones web y móviles en producción, tanto para el sector público como privado. Especializado en React, Next.js y TypeScript, con sólido manejo del stack completo: diseño de bases de datos, desarrollo de APIs y despliegue en la nube. Orientado a entregar código limpio, escalable y con impacto real en el producto.";
```

---

### 12.3 Habilidades Técnicas (`SKILLS`)

```ts
const SKILLS = {
  frontend:        ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "Shadcn/ui"],
  backend:         ["Node.js", "NestJS", "ASP.NET MVC (.NET)", "REST APIs", "Prisma ORM"],
  databases:       ["PostgreSQL", "Oracle PL/SQL", "Supabase"],
  infrastructure:  ["Docker", "GCP", "Vercel", "CI/CD", "Git / GitHub"],
  mobile:          ["Flutter", "Ionic (Angular)"],
} as const;
```

---

### 12.4 Experiencia Profesional (`EXPERIENCE`)

```ts
const EXPERIENCE = [
  {
    company:    "Forcast",
    role:       "Full Stack Developer",
    type:       "Consultoría de desarrollo de software",
    location:   "Santiago",
    period:     { start: "Jul 2024", end: "Ene 2026" },
    highlights: [
      "Desarrollé un módulo completo de un SaaS B2B para ITS Solutions: diseño de esquema de base de datos en PostgreSQL, implementación de autenticación con Firebase y construcción del frontend con Next.js, React y Prisma ORM.",
      "Desarrollé el módulo de escaneo QR en E-Hive (app de gestión de carga para vehículos eléctricos), utilizando Angular e integrándolo con microservicios desplegados en Docker.",
      "Optimicé el rendimiento de aplicaciones Next.js mediante mejoras en estrategias de renderizado (SSR/SSG) y carga de datos, reduciendo tiempos de respuesta perceptibles por el usuario.",
      "Diseñé e integré APIs RESTful para comunicación entre servicios frontend y backend en entornos de producción.",
    ],
  },
  {
    company:    "Valuesite Ltda.",
    role:       "Full Stack Developer",
    type:       "Desarrollo de soluciones para sector salud",
    location:   "Santiago",
    period:     { start: "Mar 2022", end: "Jul 2024" },
    highlights: [
      "Participé en la modernización del sistema legacy de iSalud (Isapre de Codelco), migrando funcionalidades críticas del frontend y mejorando la experiencia de la sucursal virtual utilizada por miles de afiliados.",
      "Desarrollé microservicios en ASP.NET MVC (.NET) e integré la lógica de negocio con base de datos Oracle mediante procedimientos almacenados y funciones PL/SQL.",
      "Colaboré en la integración de múltiples sistemas empresariales, garantizando continuidad operacional en plataformas de uso interno.",
    ],
  },
] as const;
```

---

### 12.5 Proyectos Destacados (`PROJECTS`)

```ts
const PROJECTS = [
  {
    name:        "Divisapp",
    description: "Plataforma que centraliza indicadores económicos chilenos en tiempo real (UF, dólar, IPC). Construida con foco en performance y UX.",
    url:         "https://divisapp.vercel.app",
    github:      "https://github.com/mbarradev-debug/divisapp",
    stack:       ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  },
  {
    name:        "Bolsillo",
    description: "App mobile-first para gestión de boletas de honorarios del SII, simplificando procesos administrativos para trabajadores independientes.",
    url:         "https://bolsillo-rho.vercel.app",
    github:      "https://github.com/mbarradev-debug/bolsillo",
    stack:       ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Shadcn/ui"],
  },
  {
    name:        "Portfolio Personal",
    description: "Sitio personal con diseño moderno, enfocado en rendimiento y presentación de proyectos y stack tecnológico.",
    url:         "https://miguelbarra.cl",
    github:      null,
    stack:       ["Next.js", "TypeScript", "Tailwind CSS"],
  },
] as const;
```

---

### 12.6 Educación (`EDUCATION`)

```ts
const EDUCATION = [
  {
    degree:      "Ingeniería en Computación e Informática",
    institution: "Universidad Andrés Bello",
    year:        2025,
    status:      "Titulado",
  },
] as const;
```

---

### Notas de uso

- Todas las constantes son `as const` — tratarlas como **inmutables** en el código.
- Organizar en un único archivo `src/data/portfolio.ts` (o equivalente según estructura del proyecto).
- No introducir lógica de fetching, CMS, ni i18n — el contenido es estático por diseño.
- Para renderizar listas de `highlights`, `stack`, etc., mapear directamente sobre los arrays.

---

## 13. Contenido & UX Writing

> Esta sección define **qué decir**, **cómo decirlo** y **qué no inventar**.  
> Complementa la sección 12 (datos hardcoded) con criterios de calidad textual y estructura de contenido por sección.  
> Tiene precedencia sobre cualquier texto genérico o placeholder.

---

### 13.1 Reglas de comportamiento (siempre aplicar)

- **No inventar información.** Si falta un dato clave (métrica, descripción de proyecto, etc.), preguntar antes de continuar.
- **No usar placeholders** como "Lorem ipsum", "Descripción aquí" o contenido de relleno.
- **No asumir impacto** que no esté explícitamente provisto (ej: "más de 10.000 usuarios" si no se sabe).
- **Si una sección no tiene contenido real**, marcarla como pendiente y solicitarlo antes de implementar.
- Priorizar **claridad y utilidad** sobre creatividad o efectismo visual.

---

### 13.2 Estilo de escritura (todos los textos)

| Regla | Correcto | Incorrecto |
|---|---|---|
| Primera persona | "Construí un módulo..." | "Se construyó un módulo..." |
| Directo y concreto | "Reduje el tiempo de carga un 40%" | "Mejoré el rendimiento" |
| Sin relleno | "Trabajo con React, Next.js y TypeScript" | "Apasionado por la tecnología moderna" |
| Sin jerga vacía | "Entrego código limpio y escalable" | "Soy un rockstar developer" |
| Hechos sobre adjetivos | "3 años en producción, sector público y privado" | "Muy experimentado y proactivo" |

**Palabras prohibidas en textos del portfolio:**
`apasionado`, `proactivo`, `versátil`, `dinámico`, `innovador`, `sinergia`, `orientado a resultados`, `rockstar`, `ninja`, `guru`

---

### 13.3 Secciones obligatorias y criterios de validación

Antes de implementar cualquier sección, verificar que tenga **contenido real** y cumpla estos criterios:

#### Hero / Inicio
- **Titular:** debe responder en ≤ 2 líneas: *¿quién eres?* y *¿qué haces?*
- **Subtítulo/tagline:** stack o especialización concreta (no frase motivacional)
- **CTA primario:** acción clara — "Ver proyectos" o "Contactar"
- **CTA secundario:** GitHub o CV descargable
- ✅ Válido: `"Full Stack Developer — React · Next.js · TypeScript"`
- ❌ Inválido: `"Construyendo el futuro digital, una línea de código a la vez"`

#### Proyectos *(sección principal)*
- Es la sección de mayor peso en el portfolio — debe aparecer antes que experiencia laboral en el scroll.
- Cada proyecto requiere la estructura definida en §13.4.
- Mínimo 2 proyectos con contenido completo antes de publicar.

#### Sobre mí
- Debe responder en este orden: **quién soy → qué hago → qué me diferencia**.
- Incluir trayectoria resumida (2–3 hechos concretos, no párrafos largos).
- No repetir el Hero; ampliar con contexto relevante.
- ✅ Válido: `"Soy Full Stack Developer con 3 años trabajando en salud y SaaS B2B. Me especializo en React y Next.js, y me preocupa que el código sea mantenible tanto como que funcione."`
- ❌ Inválido: `"Soy una persona apasionada por crear experiencias digitales increíbles."`

#### Contacto
Validar que existan **todos** estos elementos antes de implementar la sección:
- [ ] Email visible (no solo en formulario oculto)
- [ ] LinkedIn
- [ ] GitHub
- [ ] CTA claro: "Escribeme", "Disponible para proyectos freelance", etc.
- [ ] Formulario de contacto (opcional, pero recomendado)

Si falta alguno, solicitarlo — no omitirlo ni inventarlo.

---

### 13.4 Estructura estándar de proyecto

Cada proyecto en la sección Proyectos debe incluir los siguientes campos. Si alguno no está disponible, preguntar antes de omitirlo o inventarlo.

```ts
type ProjectContent = {
  name: string;              // Nombre del proyecto
  tagline: string;           // Qué es, en ≤ 10 palabras
  problem: string;           // Qué problema resuelve (1–2 frases)
  solution: string;          // Cómo lo resuelve (1–2 frases, no técnico puro)
  stack: string[];           // Tecnologías usadas
  outcome: string;           // Resultado, aprendizaje o utilidad concreta
  url?: string;              // URL en producción (si existe)
  github?: string;           // Repositorio (si es público)
};
```

**Reglas para el campo `outcome`:**
- Si hay métricas reales → usarlas.
- Si no hay métricas → describir la utilidad concreta o el aprendizaje obtenido.
- No inventar métricas ni usar frases como "impacto significativo".

---

### 13.5 Contenido de proyectos (precargado desde CV)

> Contenido validado. Usar directamente — no reescribir sin motivo.

#### Divisapp

```ts
{
  name:     "Divisapp",
  tagline:  "Indicadores económicos chilenos en un solo lugar",
  problem:  "La información sobre UF, dólar e IPC está dispersa en múltiples sitios oficiales, sin historial visual ni conversión integrada.",
  solution: "Centraliza los indicadores desde la API mindicador.cl/api, con conversión de divisas, historial de los últimos 30 días y gráficos de fluctuación.",
  stack:    ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
  outcome:  "Herramienta de uso cotidiano para consultar y convertir indicadores económicos sin saltar entre sitios.",
  url:      "https://divisapp.vercel.app",
  github:   "https://github.com/mbarradev-debug/divisapp",
}
```

#### Bolsillo

```ts
{
  name:     "Bolsillo",
  tagline:  "Gestión de boletas de honorarios para independientes",
  problem:  "Los trabajadores independientes en Chile deben gestionar sus boletas del SII manualmente, un proceso tedioso y propenso a errores.",
  solution: "App mobile-first que simplifica la emisión y seguimiento de boletas de honorarios, reduciendo la fricción del proceso administrativo.",
  stack:    ["Next.js", "Supabase", "PostgreSQL", "Tailwind CSS", "Shadcn/ui"],
  outcome:  "Simplifica un proceso burocrático frecuente para freelancers chilenos, reduciendo el tiempo dedicado a trámites del SII.",
  url:      "https://bolsillo-rho.vercel.app",
  github:   "https://github.com/mbarradev-debug/bolsillo",
}
```

> **Nota:** El portfolio personal (miguelbarra.cl) no se incluye como proyecto destacado — es el propio sitio. Puede mencionarse en el footer o en "Sobre mí" si es relevante.

---

### 13.6 Texto de "Sobre mí" (borrador validado)

> Basado en CV. Usar como base — puede ajustarse en tono, no en hechos.

```
Soy Full Stack Developer con más de 3 años construyendo aplicaciones en producción,
tanto para el sector público como para consultoras y SaaS B2B.

Trabajo principalmente con React, Next.js y TypeScript, y manejo el stack completo:
desde el diseño de base de datos hasta el despliegue en la nube.

Lo que me importa es que el código sea mantenible y que tenga impacto real en el producto,
no solo que funcione el día del deploy.
```

**No agregar:** frases sobre "pasión", "aprendizaje continuo" ni referencias a tecnologías que no estén en el CV.

---

### 13.7 Hero — texto validado

```
Titular:    Miguel Barra
Subtítulo:  Full Stack Developer
Stack line: React · Next.js · TypeScript       ← JetBrains Mono, --accent-alt
Tagline:    Construyo aplicaciones web que funcionan en producción.
            Tres años trabajando en salud digital y SaaS B2B.

CTA 1:      Ver proyectos ↓                    ← scroll a #proyectos
CTA 2:      GitHub ↗                           ← github.com/mbarradev
```

**Regla:** El tagline del Hero no debe cambiar por creatividad — solo puede ajustarse si el usuario provee una versión alternativa validada.

---

### 13.8 Contacto — texto validado

```
Titular:    Hablemos.
Subtítulo:  Disponible para proyectos freelance y oportunidades full-time.
Email:      mbarra.git@gmail.com               ← visible, no solo en formulario
LinkedIn:   linkedin.com/in/miguelbarrarios
GitHub:     github.com/mbarradev
CTA:        Enviar mensaje                     ← si hay formulario
```

---

*Skill generada el 05/05/2026 · basada en CV de Miguel Barra · derivada de frontend-design skill.*  
*Versión 1.2 — criterios de contenido, UX writing y estructura de secciones incorporados.*
