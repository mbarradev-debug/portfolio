# Portfolio de Miguel Barra

## ¿Qué es este proyecto?

Este es un **portfolio profesional** construido como una aplicación web moderna. Su propósito es presentar el perfil profesional de Miguel Barra, ingeniero en computación, de una manera visual, interactiva y profesional.

El sitio funciona como una **Single Page Application (SPA)**: una única página que contiene todas las secciones (Hero, Sobre mí, Stack tecnológico, CV y Contacto), con navegación suave entre ellas.

## Objetivo del portfolio

- **Presentar** el perfil profesional de forma clara y atractiva
- **Demostrar** competencias técnicas a través del propio código del sitio
- **Facilitar** el contacto con potenciales empleadores o colaboradores
- **Ofrecer** descarga del CV en formato PDF

## Tecnologías utilizadas

### Framework principal: Next.js 16

**¿Qué es Next.js?**
Next.js es un framework de React que facilita crear aplicaciones web. Mientras React solo maneja la interfaz de usuario, Next.js agrega:

- **Rutas automáticas**: cada archivo en `/app` se convierte en una página
- **Optimización de imágenes**: las imágenes se comprimen y adaptan automáticamente
- **Server Components**: partes del sitio se renderizan en el servidor (más rápido para el usuario)
- **Carga de fuentes optimizada**: las tipografías cargan sin parpadeos

**¿Por qué Next.js para un portfolio?**
- Excelente SEO (los buscadores indexan mejor el contenido)
- Carga inicial muy rápida
- Fácil despliegue en Vercel (la empresa que crea Next.js)
- Estándar de la industria para sitios React

### Librería de UI: React 19

**¿Qué es React?**
React es una librería de JavaScript para construir interfaces de usuario. Permite crear "componentes" reutilizables (como piezas de LEGO) que se combinan para formar la página.

**¿Por qué React?**
- Es la librería de UI más popular del mundo
- Gran comunidad y ecosistema
- Componentes reutilizables y mantenibles
- Next.js está construido sobre React

### Lenguaje: TypeScript 5

**¿Qué es TypeScript?**
TypeScript es JavaScript con "tipos". Mientras JavaScript no te avisa si pasas un número donde esperabas un texto, TypeScript sí lo hace.

```typescript
// JavaScript: no hay error hasta que ejecutas
function saludar(nombre) {
  return "Hola " + nombre.toUpperCase();
}
saludar(123); // Error en ejecución!

// TypeScript: error al escribir el código
function saludar(nombre: string) {
  return "Hola " + nombre.toUpperCase();
}
saludar(123); // ❌ Error: 123 no es un string
```

**¿Por qué TypeScript?**
- Detecta errores antes de ejecutar el código
- Mejor autocompletado en el editor
- Documenta el código implícitamente
- Facilita refactorizar código con confianza

### Estilos: Tailwind CSS v4

**¿Qué es Tailwind CSS?**
Tailwind es un framework de CSS que usa "clases utilitarias". En lugar de escribir CSS en archivos separados, aplicas clases directamente en el HTML.

```html
<!-- CSS tradicional -->
<div class="card">...</div>
<style>
  .card {
    background: white;
    padding: 16px;
    border-radius: 8px;
  }
</style>

<!-- Tailwind CSS -->
<div class="bg-white p-4 rounded-lg">...</div>
```

**¿Por qué Tailwind?**
- Desarrollo más rápido (no cambias entre archivos)
- CSS final más pequeño (solo incluye lo que usas)
- Diseño consistente con sistema de espaciado
- Muy popular en la industria

### Animaciones: tw-animate-css

Una librería que agrega clases de animación compatibles con Tailwind v4. Permite escribir:

```html
<div class="animate-in fade-in slide-in-from-bottom-2 duration-300">
  Este contenido aparece con animación
</div>
```

### Micro-interacciones: CSS puro

El proyecto implementa un sistema de micro-interacciones en `globals.css` que diferencia entre dispositivos desktop (hover) y móviles (touch), proporcionando feedback visual apropiado para cada tipo de interacción.

## Características principales

| Característica | Descripción |
|----------------|-------------|
| **Tema oscuro** | Diseño dark mode profesional y moderno |
| **Responsive** | Se adapta a móviles, tablets y desktop |
| **Animaciones** | Transiciones suaves y efectos al hacer scroll |
| **Micro-interacciones** | Feedback visual diferenciado para hover (desktop) y tap (móvil) |
| **Accesible** | Navegación por teclado, contraste adecuado, ARIA labels |
| **SEO optimizado** | Metadata para buscadores y redes sociales |
| **Performance** | Imágenes optimizadas, carga rápida |

## Requisitos del sistema

- **Node.js**: versión 18 o superior
- **npm**: incluido con Node.js (o yarn/pnpm como alternativa)
- **Editor recomendado**: VS Code con extensiones de TypeScript y Tailwind

## Cómo ejecutar el proyecto

```bash
# 1. Clonar el repositorio
git clone <url-del-repo>
cd portfolio

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en el navegador
# http://localhost:3000
```

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo |
| `npm run build` | Genera la versión de producción |
| `npm run start` | Ejecuta la versión de producción |
| `npm run lint` | Analiza el código buscando errores |

## Estructura de la documentación

Esta carpeta `/docs` contiene documentación detallada:

| Archivo | Contenido |
|---------|-----------|
| [architecture.md](./architecture.md) | Arquitectura y organización general |
| [project-structure.md](./project-structure.md) | Explicación carpeta por carpeta |
| [design-system.md](./design-system.md) | Colores, tipografía y principios visuales |
| [sections.md](./sections.md) | Cada sección del portfolio explicada |
| [development-guide.md](./development-guide.md) | Cómo modificar y extender el proyecto |
| [decisions.md](./decisions.md) | Por qué se tomaron ciertas decisiones |

## Licencia

Proyecto personal de Miguel Barra.
