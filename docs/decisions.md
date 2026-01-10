# Decisiones Técnicas

Este documento explica el **por qué** detrás de las decisiones técnicas tomadas en el proyecto. Entender estas decisiones ayuda a mantener la coherencia del código y a tomar mejores decisiones futuras.

---

## Framework: Next.js 16

### ¿Qué es Next.js?

Next.js es un framework de React creado por Vercel. Agrega funcionalidades que React solo no tiene:
- Rutas automáticas basadas en archivos
- Server-side rendering (SSR)
- Optimización de imágenes y fuentes
- API routes integradas

### ¿Por qué Next.js para un portfolio?

| Razón | Explicación |
|-------|-------------|
| **SEO** | Los portfolios necesitan ser encontrados en Google. Next.js renderiza HTML en el servidor, lo que los buscadores indexan mejor que una SPA de React puro. |
| **Performance** | Las imágenes se optimizan automáticamente. Las fuentes cargan sin "flash". El código se divide automáticamente. |
| **Developer Experience** | Hot reload rápido, TypeScript integrado, rutas automáticas. |
| **Deployment** | Se despliega fácilmente en Vercel (gratis para proyectos personales). |
| **Estándar de la industria** | Es el framework de React más usado. Demuestra conocimiento actualizado. |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **Create React App** | Sin SSR (malo para SEO), proyecto en modo mantenimiento. |
| **Gatsby** | Más complejo para un sitio simple, enfocado en sitios estáticos con GraphQL. |
| **Astro** | Excelente opción, pero Next.js tiene mejor ecosistema y es más conocido en el mercado laboral. |
| **HTML/CSS puro** | Difícil de mantener, sin componentización, sin optimizaciones automáticas. |

---

## App Router vs Pages Router

### ¿Qué diferencia hay?

Next.js tiene dos sistemas de rutas:

| Pages Router (legacy) | App Router (moderno) |
|----------------------|---------------------|
| Carpeta `/pages` | Carpeta `/app` |
| Todos los componentes son Client | Server Components por defecto |
| `getServerSideProps`, `getStaticProps` | Más simple: async components |
| `_app.tsx` y `_document.tsx` | `layout.tsx` |

### ¿Por qué App Router?

1. **Es el futuro de Next.js** — El Pages Router está en modo mantenimiento
2. **Server Components** — Menos JavaScript al cliente = más rápido
3. **Mejor DX** — Layouts anidados, loading states, error boundaries
4. **Colocation** — CSS, componentes y API en la misma carpeta

---

## Internacionalización: Sistema propio vs librería

### ¿Por qué un sistema i18n propio?

| Razón | Explicación |
|-------|-------------|
| **Simplicidad** | Solo necesitamos 2 idiomas y ~100 strings. Una librería sería overkill. |
| **Bundle size** | Cero dependencias adicionales. Librerías como next-intl agregan ~15KB. |
| **Control total** | Sabemos exactamente cómo funciona, fácil de depurar. |
| **Aprendizaje** | Demuestra comprensión de React Context, hooks y patrones de estado. |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **next-intl** | Buena opción, pero agrega complejidad para 2 idiomas. |
| **react-i18next** | Muy potente pero diseñado para apps grandes con muchos idiomas. |
| **Hardcoded strings** | Difícil de mantener, imposible de escalar. |

### Cómo funciona nuestro sistema

```
1. I18nProvider detecta idioma (localStorage → navigator.language → fallback)
2. Provee contexto con: locale, t (traducciones), setLocale
3. useSyncExternalStore evita hydration mismatch
4. Componentes acceden via useI18n()
```

---

## Estilos: Tailwind CSS v4

### ¿Por qué Tailwind?

| Razón | Explicación |
|-------|-------------|
| **Velocidad** | Estilos directamente en el componente, sin cambiar de archivo. |
| **Consistencia** | El sistema de espaciado, colores y tipografía es predefinido. |
| **Purge automático** | Solo el CSS usado termina en producción. |
| **Responsive** | Prefijos como `sm:`, `md:`, `lg:` hacen el responsive trivial. |
| **Dark mode** | Aunque no lo usamos, sería trivial implementar. |

### ¿Por qué v4 específicamente?

Tailwind v4 introduce:
- **@theme inline** — Variables CSS declaradas directamente en el archivo
- **Mejor tree-shaking** — Bundle aún más pequeño
- **CSS-first config** — No más `tailwind.config.js` para personalización básica

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **CSS Modules** | Más verboso, requiere archivos separados. |
| **Styled Components** | Runtime overhead, CSS-in-JS tiene problemas con SSR. |
| **SASS/SCSS** | Más poder pero también más complejidad. |
| **CSS vanilla** | Difícil mantener consistencia en proyectos grandes. |

---

## Animaciones: CSS puro vs librerías

### ¿Por qué CSS puro?

| Razón | Explicación |
|-------|-------------|
| **Zero runtime** | No hay JavaScript ejecutándose para animar. Mejor performance. |
| **GPU accelerated** | `transform` y `opacity` se aceleran por hardware. |
| **Simpler** | No hay que aprender otra API (Framer Motion, GSAP). |
| **Control** | Podemos ajustar cada detalle sin limitaciones de librería. |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **Framer Motion** | Excelente pero agrega ~50KB al bundle. Overkill para animaciones simples. |
| **GSAP** | Muy potente pero pesado y con licencia comercial para algunas features. |
| **React Spring** | Bueno para animaciones basadas en física, no necesario aquí. |
| **Animate.css** | Clases predefinidas, menos control sobre timing y easing. |

### Estructura de animaciones

```css
/* animations.css - Animaciones de entrada */
.hero-fade-up { animation: fadeInUp 800ms var(--ease-snappy) forwards; }

/* globals.css - Micro-interacciones */
.tech-item:hover { transform: translateY(-6px); }
```

---

## Micro-interacciones: hover vs touch diferenciado

### ¿Por qué diferenciar?

En dispositivos táctiles, `:hover` tiene un problema llamado "sticky hover": el estado hover persiste después de tocar. Esto crea una mala experiencia.

### Solución implementada

```css
/* Desktop: hover con elevación */
@media (hover: hover) and (pointer: fine) {
  .tech-item:hover {
    transform: translateY(-6px);
  }
}

/* Móvil: tap con escala */
@media (hover: none), (pointer: coarse) {
  .tech-item:active {
    transform: scale(0.96);
  }
}
```

### Media queries utilizadas

| Query | Detecta |
|-------|---------|
| `hover: hover` | Dispositivo puede hacer hover (mouse) |
| `pointer: fine` | Puntero preciso (mouse, no dedo) |
| `hover: none` | No puede hacer hover (touch) |
| `pointer: coarse` | Puntero impreciso (dedo) |

---

## Tokens de animación

### ¿Por qué variables CSS?

| Razón | Explicación |
|-------|-------------|
| **Consistencia** | Todos los componentes usan el mismo timing. |
| **Mantenibilidad** | Cambiar un valor afecta todo el sitio. |
| **Documentación implícita** | Los nombres explican el uso: `--duration-fast`, `--ease-snappy`. |

### Tokens definidos

```css
/* Curvas de easing */
--ease-snappy: cubic-bezier(0.2, 0, 0, 1);   /* Transforms */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Colores */

/* Duraciones */
--duration-fast: 120ms;       /* Navegación */
--duration-base: 150ms;       /* Interacciones */
--duration-slow: 180ms;       /* Movimientos */
--duration-emphasis: 250ms;   /* Énfasis */
--duration-reveal: 400ms;     /* Entrada */
```

---

## Formulario: Resend vs alternativas

### ¿Por qué Resend?

| Razón | Explicación |
|-------|-------------|
| **API simple** | Una sola función para enviar emails. |
| **Tier gratuito** | 100 emails/día gratis, suficiente para un portfolio. |
| **Sin servidor propio** | No necesitamos configurar SMTP. |
| **Buena deliverability** | Los emails llegan, no van a spam. |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **EmailJS** | Funciona desde el frontend, pero expone credenciales. |
| **SendGrid** | Más complejo de configurar para un caso simple. |
| **Formspree** | Servicio de terceros, menos control. |
| **SMTP propio** | Requiere servidor, configuración compleja. |

---

## Organización de componentes

### ¿Por qué organizar por tipo?

```
components/
├── layout/     → Estructura (Header, Footer, Container)
├── sections/   → Contenido (Hero, About, Stack, Contact)
├── ui/         → Reutilizables (AnimateOnScroll, LanguageSelector)
├── providers/  → Context providers (I18nClientProvider)
└── icons/      → Iconos SVG
```

| Razón | Explicación |
|-------|-------------|
| **Predecible** | Sabes dónde buscar cada cosa. |
| **Escalable** | Agregar componentes no genera confusión. |
| **Separation of concerns** | Cada carpeta tiene un propósito claro. |

### Alternativa: organizar por feature

```
features/
├── hero/
│   ├── HeroSection.tsx
│   └── heroAnimations.css
├── contact/
│   ├── ContactSection.tsx
│   └── ContactForm.tsx
```

No se usó porque el portfolio tiene pocas features y la organización por tipo es más simple para este tamaño.

---

## TypeScript: modo estricto

### ¿Por qué `strict: true`?

| Beneficio | Ejemplo |
|-----------|---------|
| **Detecta nulls** | `object.property` falla si object puede ser null |
| **Tipos implícitos** | No permite `any` implícito |
| **Mejor autocompletado** | El editor sabe exactamente qué propiedades existen |
| **Refactoring seguro** | Renombrar una prop muestra todos los lugares que la usan |

### Configuración actual

```json
{
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"],
      "@/i18n": ["./src/i18n/index.tsx"]
    }
  }
}
```

---

## SEO y PWA

### Decisiones de SEO

| Aspecto | Implementación |
|---------|----------------|
| **Metadata** | Definida en `layout.tsx` con Open Graph y Twitter Cards |
| **robots.txt** | Permite indexación de todo el sitio |
| **sitemap.xml** | Lista la URL principal |
| **HTML semántico** | `<header>`, `<main>`, `<section>`, `<footer>` |
| **lang attribute** | Se actualiza dinámicamente según idioma |

### Decisiones de PWA

| Aspecto | Implementación |
|---------|----------------|
| **Web Manifest** | `site.webmanifest` con iconos y theme color |
| **Iconos** | android-chrome (192, 512), apple-touch-icon, favicon |
| **theme-color** | `#0F1115` (bg-primary) |

No se implementó Service Worker porque:
- El contenido es dinámico (i18n)
- No hay necesidad de funcionamiento offline
- Agregaría complejidad sin beneficio claro

---

## Accesibilidad

### Decisiones implementadas

| Aspecto | Implementación |
|---------|----------------|
| **Skip link** | `SkipLink.tsx` para saltar al contenido |
| **prefers-reduced-motion** | Desactiva animaciones si el usuario lo solicita |
| **Touch targets** | Mínimo 44px en dispositivos táctiles (WCAG AAA) |
| **Focus visible** | Outline verde en elementos interactivos |
| **ARIA labels** | En botones sin texto visible |
| **Contraste** | Mínimo WCAG AA (text-primary sobre bg-primary) |
| **scroll-margin-top** | Compensa header fijo en navegación con anclas |

---

## Decisiones futuras

### Consideraciones para escalar

Si el proyecto crece, considerar:

| Necesidad | Solución potencial |
|-----------|-------------------|
| Más páginas | Agregar rutas en `/app` |
| Blog | MDX o CMS headless (Contentful, Sanity) |
| Más idiomas | Migrar a next-intl cuando >3 idiomas |
| Proyectos dinámicos | CMS o archivos MDX |
| Analytics | Vercel Analytics o Plausible |
| Testing | Vitest + Testing Library |

### Lo que NO se implementó (intencionalmente)

| Feature | Por qué no |
|---------|------------|
| **Dark/Light toggle** | El portfolio es solo dark mode por diseño. |
| **Blog** | No es necesario para un portfolio inicial. |
| **CMS** | Contenido estático es suficiente por ahora. |
| **Service Worker** | Sin beneficio claro para este caso de uso. |
| **State management (Redux, Zustand)** | Context es suficiente para i18n. |
| **Testing** | Proyecto pequeño, verificación manual suficiente por ahora. |

---

## Resumen de decisiones

| Aspecto | Decisión | Razón principal |
|---------|----------|-----------------|
| Framework | Next.js 16 | SEO + Performance + DX |
| Router | App Router | Server Components, futuro de Next |
| Estilos | Tailwind CSS v4 | Velocidad + Consistencia |
| i18n | Sistema propio | Simplicidad, zero dependencies |
| Animaciones | CSS puro | Zero runtime, mejor performance |
| Email | Resend | API simple, tier gratuito |
| Organización | Por tipo | Predecible, escalable |
| TypeScript | Modo estricto | Seguridad de tipos |
| Micro-interacciones | hover/touch diferenciado | Mejor UX móvil |
