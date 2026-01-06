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
| **Estándar de la industria** | Es el framework de React más usado en 2025. Demuestra conocimiento actualizado. |

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

1. **Es el futuro**: Vercel recomienda App Router para nuevos proyectos
2. **Server Components**: Menos JavaScript enviado al navegador = más rápido
3. **Layouts anidados**: Más fácil compartir estructura entre páginas
4. **Mejor organización**: Archivos especiales (`layout.tsx`, `loading.tsx`, `error.tsx`)

### ¿Cuándo usar Pages Router?

Solo si necesitas compatibilidad con librerías antiguas que no soportan Server Components.

---

## TypeScript estricto

### ¿Por qué TypeScript?

```typescript
// Sin TypeScript: el error aparece cuando el usuario usa la app
function greet(name) {
  return "Hello " + name.toUpperCase();
}
greet(123); // Runtime error!

// Con TypeScript: el error aparece al escribir código
function greet(name: string) {
  return "Hello " + name.toUpperCase();
}
greet(123); // ❌ Compile error: Argument of type 'number'...
```

**Beneficios:**
- Detecta errores antes de ejecutar
- Autocompletado inteligente en el editor
- Documentación implícita (ves los tipos de las props)
- Refactoring seguro (el compilador avisa si rompes algo)

### ¿Por qué modo estricto (`strict: true`)?

El modo estricto activa todas las verificaciones de TypeScript:
- `strictNullChecks`: Obliga a manejar `null` y `undefined`
- `noImplicitAny`: Prohíbe `any` implícito
- `strictFunctionTypes`: Tipos de funciones más precisos

```typescript
// Sin strict: este código compila pero falla
function process(data) {  // data es 'any' implícito
  return data.length;
}
process(null);  // Runtime error!

// Con strict: el error se detecta al compilar
function process(data: string | null) {
  if (data === null) return 0;  // Obligado a manejar null
  return data.length;
}
```

---

## Tailwind CSS v4

### ¿Qué es Tailwind?

Tailwind es un framework de CSS "utility-first". En lugar de escribir CSS en archivos separados, usas clases directamente en el HTML:

```html
<!-- CSS tradicional -->
<button class="btn-primary">Click</button>

<style>
.btn-primary {
  background-color: #3B82F6;
  color: white;
  padding: 8px 16px;
  border-radius: 4px;
}
.btn-primary:hover {
  background-color: #2563EB;
}
</style>

<!-- Tailwind -->
<button class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
  Click
</button>
```

### ¿Por qué Tailwind?

| Razón | Explicación |
|-------|-------------|
| **Velocidad de desarrollo** | No cambias entre archivos. El estilo está donde lo ves. |
| **CSS mínimo** | Solo incluye las clases que usas. Bundle muy pequeño. |
| **Consistencia** | Sistema de espaciado, colores y breakpoints predefinido. |
| **Responsive fácil** | `sm:`, `md:`, `lg:` en lugar de media queries. |
| **Estándar de la industria** | Muy usado en empresas tech modernas. |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **CSS Modules** | Más verboso, requiere cambiar de archivos constantemente. |
| **Styled Components** | Aumenta el bundle, mezcla estilos con lógica. |
| **Sass/SCSS** | Más mantenimiento, no tiene sistema de diseño integrado. |
| **CSS puro** | Difícil mantener consistencia, más código. |

### ¿Por qué v4 en lugar de v3?

Tailwind v4 (2025) tiene mejoras importantes:
- Configuración en CSS (`@theme`) en lugar de JavaScript
- Mejor compatibilidad con App Router de Next.js
- Mejor rendimiento de compilación
- Sintaxis más limpia

---

## Tema oscuro por defecto

### ¿Por qué dark mode?

1. **Tendencia actual**: La mayoría de apps modernas tienen dark mode (GitHub, VS Code, Discord, etc.)
2. **Reduce fatiga visual**: Mejor para sesiones largas de lectura
3. **Aspecto profesional**: Se asocia con tecnología y modernidad
4. **Ahorra batería**: En pantallas OLED, el negro consume menos energía

### ¿Por qué no incluir toggle light/dark?

Decisión de simplificación:
- Un portfolio personal no necesita la complejidad de dos temas
- Mantener un solo tema asegura que los colores se vean como fueron diseñados
- Menos código = menos bugs

**Si en el futuro se quisiera agregar toggle:**
1. Crear CSS variables para ambos temas
2. Agregar Context Provider para el tema
3. Persistir preferencia en localStorage
4. Usar `prefers-color-scheme` media query para detectar preferencia del sistema

---

## Animaciones con tw-animate-css

### ¿Por qué no CSS animations puro?

Se intentó inicialmente usar `@keyframes` personalizados, pero:
- Tailwind v4 cambió cómo se definen animaciones
- Las animaciones custom requerían mucho código
- `tw-animate-css` ya tiene animaciones probadas y optimizadas

### ¿Qué ofrece tw-animate-css?

```tsx
// En lugar de definir keyframes manualmente:
<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
```

- Animaciones de entrada (`animate-in`)
- Animaciones de salida (`animate-out`)
- Direcciones (`slide-in-from-bottom-2`, `slide-in-from-bottom-4`, etc.)
- Duraciones (`duration-200`, `duration-300`, `duration-500`, etc.)
- Delays con clases (`delay-100`, `delay-200`, etc.)

### ¿Por qué IntersectionObserver para trigger?

```typescript
// ❌ Listener de scroll (malo para performance)
window.addEventListener('scroll', () => {
  // Se ejecuta cientos de veces por segundo
  // Bloquea el main thread
});

// ✅ IntersectionObserver (eficiente)
const observer = new IntersectionObserver(callback, options);
// Solo se ejecuta cuando el elemento entra/sale del viewport
// No bloquea el main thread
```

**Ventajas de IntersectionObserver:**
- API nativa del navegador (no requiere librería)
- Altamente optimizado
- No causa "jank" (saltos) en el scroll
- Soporte universal en navegadores modernos

---

## Micro-interacciones: CSS puro vs JavaScript

### ¿Qué son las micro-interacciones?

Son pequeñas animaciones que proporcionan feedback visual cuando el usuario interactúa con elementos: hover en botones, click en tarjetas, tap en móviles, etc.

### ¿Por qué CSS puro en lugar de JavaScript o clases Tailwind inline?

Se tomó la decisión de implementar todas las micro-interacciones en CSS (`globals.css`) con clases semánticas en lugar de usar Tailwind classes inline o JavaScript.

**Razones:**

1. **Separación hover/touch**: CSS permite usar media queries específicas para cada tipo de dispositivo:
   ```css
   @media (hover: hover) and (pointer: fine) { /* Desktop con mouse */ }
   @media (hover: none), (pointer: coarse) { /* Móvil/touch */ }
   ```

2. **Evita "sticky hover" en móviles**: Cuando usas `:hover` en elementos táctiles, el estado hover puede "quedarse pegado" después del tap. Con media queries, el hover solo aplica en desktop.

3. **Performance**: Las transiciones CSS están optimizadas por el navegador y corren en el compositor thread, sin bloquear el main thread.

4. **Consistencia**: Todas las transiciones usan la misma duración (120ms) y easing (`ease-out` o `cubic-bezier`).

5. **Mantenibilidad**: Un solo archivo (`globals.css`) contiene todas las interacciones, facilitando ajustes globales.

6. **Accesibilidad**: Se usa `-webkit-tap-highlight-color: transparent` para eliminar el highlight azul de iOS y proporcionar feedback visual controlado.

### Clases de micro-interacciones definidas

| Clase | Elemento | Desktop (hover) | Móvil (active) |
|-------|----------|-----------------|----------------|
| `.tech-item` | Items de tecnología | translateY(-4px), border accent, sombra glow | scale(0.97), border accent |
| `.tech-icon` | Icono en tech-item | color accent, scale(1.15) | color accent, scale(1.1) |
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
| `.nav-cv-link` | Link descarga CV | color bg-primary | scale(0.95) |
| `.nav-contact-btn` | Botón contacto header | box-shadow glow | scale(0.95) |
| `.form-input` | Inputs del formulario | border accent, fondo bg-primary, ring glow | — |
| `.text-link` | Enlaces inline | color accent-hover, underline visible | color accent-hover |

### ¿Por qué no Framer Motion u otra librería?

| Framer Motion | CSS puro (elegido) |
|---------------|-------------------|
| Animaciones complejas/físicas | Transiciones simples |
| Control imperativo (JavaScript) | Declarativo (CSS) |
| ~35KB bundle adicional | 0KB adicionales |
| Requiere Client Component | Funciona en cualquier contexto |
| Curva de aprendizaje | Conocimiento CSS estándar |

Para micro-interacciones simples (hover, active, focus), CSS puro es suficiente, más eficiente, y no agrega peso al bundle.

---

## Componentes: organización por tipo

### ¿Cómo se organizaron los componentes?

```
components/
├── layout/     → Estructura de página (Header, Footer, Container, Section)
├── sections/   → Secciones del portfolio (Hero, About, Stack, CV, Contact)
├── ui/         → Componentes reutilizables genéricos (AnimateOnScroll)
└── icons/      → Iconos SVG como componentes
```

### ¿Por qué esta organización?

| Principio | Aplicación |
|-----------|------------|
| **Separación de responsabilidades** | Cada carpeta tiene un propósito claro |
| **Fácil de encontrar** | ¿Buscas el header? → `layout/Header.tsx` |
| **Escalable** | Agregar componentes no desordena la estructura |
| **Evita carpetas anidadas** | Máximo 2 niveles de profundidad |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **Por feature** (`/hero/HeroSection.tsx`, `/hero/HeroButton.tsx`) | Excesivo para un proyecto pequeño |
| **Plano** (todo en `/components`) | Se vuelve caótico con más de 10 archivos |
| **Atomic Design** (`atoms/`, `molecules/`, `organisms/`) | Demasiado formal para este caso |

---

## Server Components vs Client Components

### Estrategia elegida

**Server Components por defecto**, Client solo cuando es necesario:

| Componente | Tipo | Razón |
|------------|------|-------|
| `Header` | Client | Usa IntersectionObserver |
| `Footer` | Server | Solo contenido estático |
| `Container` | Server | Solo wrapper de layout |
| `Section` | Server | Solo wrapper de layout |
| `HeroSection` | Client | Navegación con scroll |
| `AboutSection` | Server | Solo texto |
| `StackSection` | Client | Animaciones on-scroll |
| `CVSection` | Server | Solo enlace |
| `ContactSection` | Client | Formulario interactivo |
| `AnimateOnScroll` | Client | Usa IntersectionObserver |

### ¿Por qué esta estrategia?

1. **Menos JavaScript**: Los Server Components no envían JS al navegador
2. **Carga más rápida**: El HTML llega pre-renderizado
3. **Mejor SEO**: El contenido ya está en el HTML inicial
4. **Client solo donde hay interactividad**: Formularios, animaciones con estado, scroll tracking

---

## Fuente: Inter

### ¿Por qué Inter?

| Característica | Beneficio |
|----------------|-----------|
| **Diseñada para UI** | Optimizada para pantallas, no para impresión |
| **Altamente legible** | Clara en todos los tamaños (12px a 72px) |
| **Amplio set de caracteres** | Soporta latín, cirílico, griego, etc. |
| **Variable font** | Un solo archivo para todos los pesos |
| **Open source** | Gratis, sin restricciones de licencia |
| **Popular** | Usada por GitHub, Figma, Linear, Vercel |

### Carga optimizada con next/font

```typescript
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
```

**Beneficios de `next/font`:**
- La fuente se descarga en build time
- Se sirve desde el mismo dominio (sin request a Google Fonts)
- No hay "flash" de fuente alternativa (FOUT)
- Se aplica automáticamente `font-display: swap`

---

## Formulario de contacto funcional

### Estado actual

El formulario de contacto **envía emails realmente** usando una API Route de Next.js con Resend:

```typescript
// components/sections/ContactSection.tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus("submitting");

  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error(result.error);
  setFormStatus("success");
};
```

### Implementación elegida: Next.js API Route + Resend

| Característica | Detalles |
|----------------|----------|
| **Servicio** | Resend (3000 emails/mes gratis) |
| **Endpoint** | `POST /api/contact` en `app/api/contact/route.ts` |
| **Validación** | Server-side: campos requeridos, formato email, longitud máxima |
| **Seguridad** | Sanitización HTML para prevenir XSS en el cuerpo del email |
| **Manejo de errores** | Estados diferenciados: success, error con mensaje específico |

### ¿Por qué Resend?

| Razón | Explicación |
|-------|-------------|
| **Integración nativa** | Diseñado para Next.js y frameworks modernos |
| **API simple** | Un solo método `resend.emails.send()` |
| **Plan gratuito** | 3000 emails/mes sin costo |
| **Deliverability** | Emails no van a spam |
| **Developer experience** | SDK con TypeScript, logs claros |

### Alternativas consideradas

| Alternativa | Por qué no se eligió |
|-------------|----------------------|
| **SendGrid** | Interfaz más compleja, setup más extenso |
| **Formspree** | Menos control, branding en plan gratis |
| **Nodemailer** | Requiere servidor SMTP propio |
| **EmailJS** | Depende de cliente, menos seguro |

---

## Accesibilidad (a11y)

### Decisiones tomadas

| Decisión | Implementación |
|----------|----------------|
| **Skip link** | "Saltar al contenido principal" visible en focus |
| **Idioma declarado** | `<html lang="es">` |
| **Focus visible** | Outline verde en elementos interactivos |
| **ARIA labels** | En navegación y enlaces icon-only |
| **Contraste adecuado** | Ratio 7:1+ para texto principal |
| **Semántica HTML** | `<header>`, `<main>`, `<footer>`, `<nav>`, `<section>` |
| **Alt text en imágenes** | Descripción significativa |
| **Iconos decorativos** | `aria-hidden="true"` |

### ¿Por qué priorizar accesibilidad?

1. **Ética**: El web debería ser accesible para todos
2. **Legal**: Muchas jurisdicciones exigen accesibilidad
3. **SEO**: Los buscadores valoran el HTML semántico
4. **UX**: Las mejoras de a11y benefician a todos (no solo usuarios con discapacidad)
5. **Profesionalismo**: Demuestra conocimiento de buenas prácticas

---

## Despliegue: Vercel (implícito)

### ¿Por qué Vercel?

Aunque el proyecto no tiene deploy configurado, está optimizado para Vercel:

| Característica | Beneficio |
|----------------|-----------|
| **Creadores de Next.js** | Compatibilidad garantizada |
| **Deploy con git push** | Sin configuración manual |
| **SSL gratis** | HTTPS automático |
| **CDN global** | Contenido cerca del usuario |
| **Plan hobby gratis** | Perfecto para portfolios personales |
| **Preview deployments** | Cada PR tiene su propia URL |

### Alternativas

| Plataforma | Consideraciones |
|------------|-----------------|
| **Netlify** | Buen soporte, pero menos optimizado para Next.js |
| **AWS Amplify** | Más complejo de configurar |
| **Railway** | Bueno para apps con backend, overkill para este caso |
| **GitHub Pages** | No soporta SSR de Next.js |

---

## Resumen de decisiones clave

| Decisión | Elección | Alternativa principal |
|----------|----------|----------------------|
| Framework | Next.js 16.1.1 | Astro, Gatsby |
| Router | App Router | Pages Router |
| Lenguaje | TypeScript 5 estricto | JavaScript |
| Estilos | Tailwind CSS v4 (`@theme inline`) | CSS Modules |
| Tema | Dark mode único | Toggle light/dark |
| Animaciones de entrada | tw-animate-css 1.4.0 | Framer Motion |
| Micro-interacciones | CSS puro (globals.css) con clases semánticas | Tailwind inline / JS |
| Trigger de animación | IntersectionObserver | Scroll listener |
| Organización | Por tipo de componente | Por feature |
| Renderizado | Server Components por defecto | Client-first |
| Fuente | Inter via next/font/google | System fonts |
| Formulario | Funcional con Resend | Simulado |
| Backend | API Routes de Next.js | Serverless functions externas |
| A11y | Prioridad alta (WCAG AAA) | Básica |
| Deploy target | Vercel | Netlify |
| Easing temporal | Variables CSS (snappy/smooth) | Valores hardcodeados |

---

## Futuras decisiones a considerar

### Si el proyecto crece:

1. **Testing**: Agregar Vitest + React Testing Library
2. **Analytics**: Vercel Analytics o Plausible (privacy-friendly)
3. **CMS**: Para blog, considerar MDX o Contentful
4. **i18n**: Si se necesita multiidioma, usar `next-intl`
5. **Estado global**: Si se necesita, considerar Zustand (más simple que Redux)
6. **Rate limiting**: Implementar protección contra spam en el formulario
