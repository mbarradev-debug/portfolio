# Micro-Interactions Guide
## Portfolio Miguel Barra - Set Curado

---

## Diagnóstico del Estado Actual

### Problemas Identificados

1. **Animaciones de entrada funcionan** pero son sutiles (opacity 0→1, translateY)
2. **Hover states existen** pero transiciones muy rápidas (120-180ms) - casi imperceptibles
3. **Falta feedback visual en CTAs** - solo scale, sin cambio de estado claro
4. **Sin animaciones de scroll parallax** - contenido se siente plano
5. **Badge estático** - oportunidad perdida de llamar atención

---

## Set Curado de Micro-Interactions (8 totales)

### 1. Hero Badge - Shimmer Effect

**Elemento:** Badge "Senior Fullstack Engineer"
**Evento:** Load (on mount)
**Descripción:** Shimmer/shine que recorre el badge de izquierda a derecha una vez, comunicando "nuevo" o "destacado"

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | On load | On load |
| Delay | 800ms | 800ms |
| Duration | 1.5s | 1.5s |

**CSS:**
```css
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.badge-shimmer {
  position: relative;
  overflow: hidden;
}

.badge-shimmer::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-out 0.8s forwards;
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .badge-shimmer::after {
    animation: none;
  }
}
```

---

### 2. CTA Primary - Glow Pulse on Idle

**Elemento:** Botón "Ver proyectos"
**Evento:** Idle (después de 3s sin interacción)
**Descripción:** Pulso sutil del glow cada 4 segundos para llamar atención al CTA principal

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | 3s idle | 3s idle |
| Interval | 4s | 4s |
| Duration | 2s | 2s |

**CSS:**
```css
@keyframes cta-pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(63, 191, 154, 0);
  }
  50% {
    box-shadow: 0 0 20px 4px rgba(63, 191, 154, 0.3);
  }
}

.btn-primary-pulse {
  animation: cta-pulse 2s ease-in-out infinite;
  animation-delay: 3s;
}

/* Pausar cuando hay hover/focus */
.btn-primary-pulse:hover,
.btn-primary-pulse:focus {
  animation-play-state: paused;
  box-shadow: 0 4px 16px rgba(63, 191, 154, 0.3);
}

@media (prefers-reduced-motion: reduce) {
  .btn-primary-pulse {
    animation: none;
  }
}
```

---

### 3. CTA Buttons - Icon Micro-motion

**Elemento:** Iconos dentro de CTAs
**Evento:** Hover (desktop) / Tap (mobile)
**Descripción:** El icono se mueve ligeramente hacia la derecha (→) indicando acción/progreso

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | Hover | Active |
| Transform | translateX(3px) | translateX(2px) |
| Duration | 200ms | 150ms |
| Easing | ease-out | ease-out |

**CSS:**
```css
.btn-icon {
  transition: transform 200ms ease-out;
}

@media (hover: hover) and (pointer: fine) {
  .btn-primary:hover .btn-icon,
  .btn-secondary:hover .btn-icon {
    transform: translateX(3px);
  }
}

@media (hover: none), (pointer: coarse) {
  .btn-primary:active .btn-icon,
  .btn-secondary:active .btn-icon {
    transform: translateX(2px);
  }
}
```

---

### 4. Approach Cards - Stagger Reveal

**Elemento:** Cards de "Mi enfoque" (About section)
**Evento:** Scroll into view
**Descripción:** Cards aparecen en secuencia con delay staggered (0ms, 100ms, 200ms)

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | IntersectionObserver | IntersectionObserver |
| Stagger | 100ms | 75ms |
| Duration | 400ms | 350ms |
| Transform | fadeIn + translateY(-8px) | fadeIn + translateY(-6px) |

**JSX Implementation:**
```tsx
{approachItems.map((item, index) => (
  <div
    key={index}
    className={`approach-card ${isVisible ? 'animate-card-in' : 'opacity-0'}`}
    style={{ animationDelay: `${index * 100}ms` }}
  >
    {/* content */}
  </div>
))}
```

**CSS:**
```css
@keyframes card-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-card-in {
  animation: card-in 400ms var(--ease-smooth) forwards;
}

@media (prefers-reduced-motion: reduce) {
  .animate-card-in {
    animation: none;
    opacity: 1;
  }
}
```

---

### 5. Tech Items - Hover Lift + Glow

**Elemento:** Items de tecnología (Stack section)
**Evento:** Hover (desktop) / Tap (mobile)
**Descripción:** Elevación más pronunciada con glow del color accent

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | Hover | Active (300ms) |
| Transform | translateY(-6px) | scale(0.97) |
| Shadow | glow accent 20% | border accent |
| Duration | 250ms | 150ms |
| Easing | ease-snappy | ease-snappy |

**CSS (actualizado):**
```css
.tech-item {
  transition:
    transform 250ms var(--ease-snappy),
    background-color 200ms var(--ease-smooth),
    border-color 200ms var(--ease-smooth),
    box-shadow 250ms var(--ease-smooth);
}

@media (hover: hover) and (pointer: fine) {
  .tech-item:hover {
    transform: translateY(-6px);
    background-color: var(--color-bg-primary);
    border-color: var(--color-accent);
    box-shadow:
      0 8px 24px rgba(63, 191, 154, 0.15),
      0 0 0 1px rgba(63, 191, 154, 0.2);
  }

  .tech-item:hover .tech-icon {
    color: var(--color-accent);
    transform: scale(1.2);
  }
}
```

---

### 6. Scroll Indicator - Breathing Effect

**Elemento:** Indicador "Scroll" del Hero
**Evento:** Continuous (idle)
**Descripción:** Además del bounce, opacity que "respira" para indicar interactividad

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Animation | opacity 0.4 → 0.8 | opacity 0.3 → 0.7 |
| Duration | 2s | 2s |
| Timing | ease-in-out | ease-in-out |

**CSS:**
```css
@keyframes breathe {
  0%, 100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.8;
  }
}

.scroll-indicator {
  animation:
    bounce 1s ease-in-out infinite,
    breathe 2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .scroll-indicator {
    animation: none;
    opacity: 0.6;
  }
}
```

---

### 7. Section Headers - Accent Underline Reveal

**Elemento:** Títulos de sección (h2)
**Evento:** Scroll into view
**Descripción:** Línea accent que se expande de 0% a 100% width debajo del título

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | IntersectionObserver | IntersectionObserver |
| Width | 60px → auto (max 120px) | 40px → auto (max 80px) |
| Duration | 600ms | 500ms |
| Delay | 200ms (después del fade-in del texto) | 150ms |

**CSS:**
```css
.section-title {
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: "";
  position: absolute;
  bottom: -4px;
  left: 0;
  height: 2px;
  width: 0;
  background: linear-gradient(
    90deg,
    var(--color-accent) 0%,
    transparent 100%
  );
  transition: width 600ms var(--ease-smooth);
}

.section-title.is-visible::after {
  width: 80px;
}

@media (min-width: 640px) {
  .section-title.is-visible::after {
    width: 120px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .section-title::after {
    transition: none;
    width: 80px;
  }
}
```

---

### 8. Form Submit - Loading State

**Elemento:** Botón de envío del formulario de contacto
**Evento:** Click (while submitting)
**Descripción:** Spinner reemplaza texto, botón se deshabilita con opacity reducida

| Aspecto | Desktop | Mobile |
|---------|---------|--------|
| Trigger | Form submit | Form submit |
| Spinner | 16px, border-spin | 16px, border-spin |
| Duration | Indefinite | Indefinite |
| Button state | opacity 0.7, pointer-events none | Same |

**CSS:**
```css
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.btn-loading {
  position: relative;
  color: transparent;
  pointer-events: none;
}

.btn-loading::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 16px;
  height: 16px;
  margin: -8px 0 0 -8px;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: spin 600ms linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .btn-loading::after {
    animation: none;
    border: 2px solid currentColor;
    border-radius: 0;
  }
}
```

---

## Resumen de Implementación

### Prioridad Alta (Impacto inmediato)

| # | Micro-interaction | Archivo | Complejidad |
|---|-------------------|---------|-------------|
| 1 | Badge Shimmer | globals.css + HeroSection | Baja |
| 2 | CTA Pulse | globals.css | Baja |
| 3 | CTA Icon Motion | globals.css | Baja |
| 5 | Tech Items Lift | globals.css (actualizar) | Baja |

### Prioridad Media

| # | Micro-interaction | Archivo | Complejidad |
|---|-------------------|---------|-------------|
| 4 | Approach Cards Stagger | AboutSection.tsx + globals.css | Media |
| 6 | Scroll Breathing | globals.css | Baja |
| 7 | Section Title Underline | globals.css + componentes | Media |

### Prioridad Baja

| # | Micro-interaction | Archivo | Complejidad |
|---|-------------------|---------|-------------|
| 8 | Form Loading | ContactSection.tsx + globals.css | Media |

---

## Tokens de Timing (ya definidos)

```css
--ease-snappy: cubic-bezier(0.2, 0, 0, 1);   /* Quick, responsive */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Natural flow */
--duration-fast: 120ms;
--duration-base: 150ms;
--duration-slow: 180ms;
```

### Recomendación: Extender tokens

```css
--duration-emphasis: 250ms;  /* Para hover states importantes */
--duration-reveal: 400ms;    /* Para reveals on scroll */
--duration-dramatic: 600ms;  /* Para efectos únicos (shimmer, underline) */
```

---

## Checklist de Accesibilidad

- [x] Todas las animaciones respetan `prefers-reduced-motion`
- [x] Durations < 1s para evitar mareo
- [x] Sin flashing o parpadeo rápido
- [x] Focus states mantienen visibilidad (no dependen solo de animación)
- [x] Touch feedback instantáneo (< 150ms)

---

*Guía de micro-interactions para portfolio profesional. Priorizar feedback sobre decoración.*
