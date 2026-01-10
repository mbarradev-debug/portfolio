# Portfolio de Miguel Barra

## ¿Qué es este proyecto?

Este es un **portfolio profesional** construido como una aplicación web moderna. Su propósito es presentar el perfil profesional de Miguel Barra, ingeniero en computación, de una manera visual, interactiva y profesional.

El sitio funciona como una **Single Page Application (SPA)**: una única página que contiene todas las secciones (Hero, Sobre mí, Stack tecnológico y Contacto), con navegación suave entre ellas.

## Objetivo del portfolio

- **Presentar** el perfil profesional de forma clara y atractiva
- **Demostrar** competencias técnicas a través del propio código del sitio
- **Facilitar** el contacto con potenciales empleadores o colaboradores
- **Permitir** contacto directo mediante formulario funcional
- **Soportar** múltiples idiomas (español e inglés)

## Stack tecnológico

| Categoría | Tecnología | Versión |
|-----------|------------|---------|
| Framework | Next.js | 16.1.1 |
| UI Library | React | 19.2.3 |
| Lenguaje | TypeScript | 5 |
| Estilos | Tailwind CSS | 4 |
| Animaciones | CSS puro | - |
| Email | Resend | 6.6.0 |
| Runtime | Node.js | 18+ |

### Framework principal: Next.js 16

Next.js es un framework de React que facilita crear aplicaciones web. Mientras React solo maneja la interfaz de usuario, Next.js agrega:

- **App Router**: Sistema de rutas basado en archivos en `/app`
- **Server Components**: Componentes que se renderizan en el servidor (menor JavaScript al cliente)
- **API Routes**: Endpoints serverless para lógica backend (usado para el formulario de contacto)
- **Optimización de imágenes**: Compresión y adaptación automática con el componente `Image`
- **Carga de fuentes optimizada**: Sin FOUT (Flash of Unstyled Text) usando `next/font`

### Librería de UI: React 19

React permite crear "componentes" reutilizables que se combinan para formar la página. Este proyecto usa:
- **Server Components** por defecto (mejor performance)
- **Client Components** solo donde hay interactividad (`"use client"`)
- **Hooks** para estado local (`useState`, `useEffect`, `useRef`, `useCallback`, `useSyncExternalStore`)

### Lenguaje: TypeScript 5

TypeScript es JavaScript con "tipos" que detectan errores antes de ejecutar el código.

```typescript
// TypeScript detecta errores al escribir
function saludar(nombre: string) {
  return "Hola " + nombre.toUpperCase();
}
saludar(123); // ❌ Error en el editor: 123 no es un string
```

El proyecto usa modo estricto (`strict: true`) para máxima seguridad de tipos.

### Estilos: Tailwind CSS v4

Tailwind es un framework de CSS utility-first. En lugar de escribir CSS separado, aplicas clases directamente:

```tsx
// Tailwind CSS - estilos inline con clases utilitarias
<div className="bg-surface p-4 rounded-lg border border-border-subtle">
  Contenido
</div>
```

**Tailwind v4** usa variables CSS definidas en `@theme inline` dentro de `globals.css`.

### Animaciones: CSS puro

El proyecto implementa animaciones mediante CSS puro, definidas en dos archivos:

1. **`globals.css`**: Micro-interacciones (hover, tap), animaciones de UI (shimmer, pulse, breathe)
2. **`animations.css`**: Animaciones de entrada del Hero y scroll-triggered

```tsx
// Hero con animación de entrada escalonada
<h1 className="hero-animate hero-fade-up hero-delay-1">
  Del problema al producto.
</h1>

// Scroll-triggered animation
<div className={isVisible ? "scroll-animate" : "opacity-0"}>
  Contenido animado
</div>
```

### Micro-interacciones: CSS puro

El proyecto implementa un sistema completo de micro-interacciones en `globals.css` que diferencia entre:
- **Desktop (hover)**: Elevación, cambio de color, sombras glow
- **Móvil (touch)**: Feedback de escala al presionar, sin "sticky hover"

### Internacionalización (i18n)

El proyecto soporta múltiples idiomas mediante un sistema de i18n propio ubicado en `/src/i18n/`:

- **Idiomas soportados**: Español (es) e Inglés (en)
- **Detección automática**: Detecta el idioma del navegador
- **Persistencia**: Guarda la preferencia en localStorage
- **Selector de idioma**: Componente `LanguageSelector` en el header

## Características principales

| Característica | Descripción |
|----------------|-------------|
| **Tema oscuro** | Diseño dark mode profesional con paleta de 10 colores |
| **Responsive** | Mobile-first, adaptable a móviles, tablets y desktop |
| **Multiidioma** | Soporte para español e inglés con selector de idioma |
| **Animaciones** | CSS puro con keyframes custom, trigger con IntersectionObserver |
| **Micro-interacciones** | Sistema CSS completo para feedback visual (hover/touch diferenciado) |
| **Accesible** | Skip link, ARIA labels, contraste WCAG AAA, focus visible, prefers-reduced-motion |
| **SEO optimizado** | Metadata, Open Graph, Twitter Cards, HTML semántico, robots.txt, sitemap.xml |
| **PWA Ready** | Manifest, iconos para dispositivos móviles, favicon |
| **Performance** | Server Components, imágenes optimizadas, code splitting |
| **Formulario funcional** | Envío de emails real vía API Route + Resend |

## Requisitos del sistema

- **Node.js**: versión 18 o superior
- **npm**: incluido con Node.js (o yarn/pnpm como alternativa)
- **Editor recomendado**: VS Code con extensiones ESLint y Tailwind CSS IntelliSense

## Cómo ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd portfolio

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno (para formulario de contacto)
# Crear archivo .env.local con:
# RESEND_API_KEY=tu_api_key_de_resend

# 4. Iniciar servidor de desarrollo
npm run dev

# 5. Abrir en el navegador
# http://localhost:3000
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia servidor de desarrollo con hot reload |
| `npm run build` | Genera build de producción optimizado |
| `npm run start` | Ejecuta la versión de producción |
| `npm run lint` | Analiza el código con ESLint |

## Estructura de la documentación

Esta carpeta `/docs` contiene documentación detallada:

| Archivo | Contenido |
|---------|-----------|
| [architecture.md](./architecture.md) | Arquitectura de componentes, flujos y patrones |
| [project-structure.md](./project-structure.md) | Explicación carpeta por carpeta |
| [design-system.md](./design-system.md) | Colores, tipografía, espaciado y micro-interacciones |
| [sections.md](./sections.md) | Cada sección del portfolio explicada |
| [development-guide.md](./development-guide.md) | Cómo modificar y extender el proyecto |
| [decisions.md](./decisions.md) | Decisiones técnicas y alternativas consideradas |

## Licencia

Proyecto personal de Miguel Barra.
