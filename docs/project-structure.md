# Estructura del Proyecto

## Vista general

```
portfolio/
├── app/                    # Aplicación Next.js (rutas y páginas)
│   ├── globals.css         # Estilos globales y variables CSS
│   ├── layout.tsx          # Layout raíz (estructura HTML)
│   └── page.tsx            # Página principal (home)
│
├── components/             # Componentes React
│   ├── layout/             # Componentes de estructura
│   ├── sections/           # Secciones del portfolio
│   ├── ui/                 # Componentes UI reutilizables
│   └── icons/              # Iconos SVG como componentes
│
├── hooks/                  # Custom hooks de React
│   └── useScrollToSection.ts
│
├── public/                 # Archivos estáticos públicos
│   ├── images/             # Imágenes del sitio
│   └── cv/                 # CV descargable
│
├── docs/                   # Documentación (esta carpeta)
│
└── [archivos de configuración]
```

---

## Carpeta `/app` — El corazón de Next.js

Esta carpeta usa el **App Router** de Next.js. Cada archivo aquí tiene un propósito especial.

### `layout.tsx` — El esqueleto de la página

```tsx
// Estructura simplificada
export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <Header />
        <main>{children}</main>  {/* ← Aquí entra page.tsx */}
        <Footer />
      </body>
    </html>
  );
}
```

**¿Qué hace?**
- Define la estructura HTML base (`<html>`, `<body>`)
- Carga la fuente Inter de Google Fonts
- Incluye el Header y Footer (aparecen en todas las páginas)
- Define metadata para SEO (título, descripción, Open Graph)
- Agrega el "skip link" para accesibilidad

**Metadata incluida:**
- Título: "Miguel Barra | Ingeniero de Software"
- Descripción para buscadores
- Keywords para SEO
- Configuración Open Graph (para compartir en redes)
- Configuración Twitter Card

### `page.tsx` — La página principal

```tsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <CVSection />
      <ContactSection />
    </>
  );
}
```

**¿Qué hace?**
- Renderiza las cinco secciones del portfolio en orden
- Es un Server Component (no tiene `"use client"`)
- Next.js la sirve en la ruta `/` (raíz del sitio)

**Importante**: En Next.js App Router, `page.tsx` es el archivo especial que define qué se renderiza en una ruta. Si crearas `app/proyectos/page.tsx`, existiría la ruta `/proyectos`.

### `globals.css` — Estilos globales

```css
@import "tailwindcss";      /* Importa Tailwind */
@import "tw-animate-css";   /* Importa animaciones */

@theme inline {
  /* Variables de colores y fuentes */
  --color-bg-primary: #0F1115;
  --color-accent: #3FBF9A;
  /* ... */
}

body {
  /* Estilos base del body */
}

/* Animaciones personalizadas */
@keyframes pulse-glow { ... }
```

**¿Qué contiene?**
1. **Importaciones**: Tailwind CSS y librería de animaciones
2. **Variables CSS**: Colores, fuentes (definidas en `@theme inline`)
3. **Estilos base**: Configuración del body, html, selección de texto
4. **Animaciones custom**: Como `pulse-glow` para resaltar secciones

---

## Carpeta `/components` — Piezas de LEGO

Los componentes están organizados por **responsabilidad**, no por página.

### `/components/layout` — Estructura de página

Componentes que definen la estructura visual de la página.

#### `Header.tsx`

```tsx
"use client";  // Necesita JavaScript del navegador

export function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  // ... lógica de IntersectionObserver

  return (
    <header className="fixed top-0 ...">
      <nav>
        <a href="/">MB</a>
        <a href="/cv/cv.pdf">CV</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}
```

- **Tipo**: Client Component (detecta scroll)
- **Posición**: Fijo en la parte superior
- **Altura**: 48px (h-12 en Tailwind)
- **Detecta**: Qué sección está visible y la resalta

#### `Footer.tsx`

```tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <p>© {currentYear} Miguel Barra</p>
      <div>
        {/* Enlaces a GitHub, LinkedIn, Email */}
      </div>
    </footer>
  );
}
```

- **Tipo**: Server Component
- **Contenido**: Copyright dinámico y enlaces sociales

#### `Container.tsx`

```tsx
export function Container({ children, className }) {
  return (
    <div className={`mx-auto w-full max-w-7xl px-4 ${className}`}>
      {children}
    </div>
  );
}
```

- **Propósito**: Centrar contenido con ancho máximo
- **Max-width**: 1280px (max-w-7xl)
- **Uso**: Envuelve el contenido de cada sección

#### `Section.tsx`

```tsx
export function Section({ children, variant = "primary", className, id }) {
  const bgClass = variant === "primary"
    ? "bg-bg-primary"
    : "bg-bg-secondary";

  return (
    <section id={id} className={`py-20 ${bgClass} ${className}`}>
      {children}
    </section>
  );
}
```

- **Propósito**: Wrapper para secciones con estilos consistentes
- **Variantes**: `primary` (oscuro) o `secondary` (menos oscuro)
- **Padding**: Vertical responsive (más grande en desktop)

---

### `/components/sections` — Contenido principal

Cada archivo representa una sección del portfolio.

| Archivo | Sección | Tipo | ID |
|---------|---------|------|-----|
| `HeroSection.tsx` | Presentación inicial | Client | `hero` |
| `AboutSection.tsx` | Perfil y filosofía | Server | `sobre-mi` |
| `StackSection.tsx` | Tecnologías | Client | `stack` |
| `CVSection.tsx` | Descarga de CV | Server | `cv` |
| `ContactSection.tsx` | Formulario | Client | `contacto` |

**¿Por qué algunos son Client y otros Server?**

- **Client Components**: Necesitan interactividad (formularios, animaciones con estado, scroll tracking)
- **Server Components**: Solo muestran contenido estático (texto, imágenes, enlaces)

Ver [sections.md](./sections.md) para detalles de cada sección.

---

### `/components/ui` — Componentes reutilizables

#### `AnimateOnScroll.tsx`

```tsx
"use client";

export function AnimateOnScroll({ children, className }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(/* ... */);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={isVisible ? "animate-in fade-in" : "opacity-0"}
    >
      {children}
    </div>
  );
}
```

- **Propósito**: Animar contenido cuando entra en pantalla
- **Cómo funciona**: Usa IntersectionObserver para detectar visibilidad
- **Uso**: Envuelve cualquier contenido que quieras animar

```tsx
<AnimateOnScroll>
  <h2>Este título aparece con animación</h2>
</AnimateOnScroll>
```

---

### `/components/icons` — Iconos SVG

```tsx
// components/icons/index.tsx

export function ReactIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* paths del SVG */}
    </svg>
  );
}

export function GitHubIcon({ className = "h-5 w-5" }) { /* ... */ }
export function LinkedInIcon({ className = "h-5 w-5" }) { /* ... */ }
// ... más iconos
```

**Iconos disponibles:**

| Categoría | Iconos |
|-----------|--------|
| Tecnologías | React, Next.js, TypeScript, Node.js, PostgreSQL, Prisma, Docker, Git, API |
| Plataformas | GitHub, LinkedIn, Email |
| Acciones | Download, External Link |

**¿Por qué iconos como componentes?**
- Se pueden estilizar con Tailwind (`className="h-8 w-8 text-accent"`)
- `fill="currentColor"` hereda el color del texto
- TypeScript provee autocompletado de props

---

## Carpeta `/hooks` — Lógica reutilizable

### `useScrollToSection.ts`

```tsx
"use client";

export function useScrollToSection() {
  const scrollToSection = useCallback((e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    element?.scrollIntoView({ behavior: "smooth" });
    // + animación pulse-glow
  }, []);

  const scrollToTop = useCallback((e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { scrollToSection, scrollToTop };
}
```

**¿Qué es un hook personalizado?**

Un hook es una función que encapsula lógica reutilizable. En lugar de repetir código de scroll en varios componentes, lo extraemos a un hook.

**Uso:**
```tsx
function Header() {
  const { scrollToSection, scrollToTop } = useScrollToSection();

  return (
    <a href="#contacto" onClick={(e) => scrollToSection(e, "contacto")}>
      Contacto
    </a>
  );
}
```

---

## Carpeta `/public` — Archivos estáticos

Todo en `/public` es accesible directamente por URL.

```
public/
├── images/
│   └── miguelb-logo.png    →  /images/miguelb-logo.png
├── cv/
│   └── cv.pdf              →  /cv/cv.pdf
└── file.svg                →  /file.svg
```

**Importante**: No uses `import` para archivos de `/public`. Referéncialos por su ruta:

```tsx
// ✅ Correcto
<Image src="/images/miguelb-logo.png" />
<a href="/cv/cv.pdf">Descargar CV</a>

// ❌ Incorrecto
import logo from "../public/images/miguelb-logo.png";
```

---

## Archivos de configuración

### `package.json`

```json
{
  "name": "portfolio",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "16.1.1",
    "react": "19.2.3",
    "tw-animate-css": "^1.4.0"
  },
  "devDependencies": {
    "tailwindcss": "^4",
    "typescript": "^5"
  }
}
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "strict": true,           // TypeScript estricto
    "paths": {
      "@/*": ["./*"]          // Alias para imports
    }
  }
}
```

El alias `@/*` permite imports limpios:

```tsx
// En lugar de:
import { Header } from "../../../components/layout/Header";

// Puedes escribir:
import { Header } from "@/components/layout/Header";
```

### `next.config.ts`

```ts
const nextConfig: NextConfig = {
  // Configuración vacía = usa defaults de Next.js
};
```

### `postcss.config.mjs`

```js
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Configura PostCSS para procesar Tailwind CSS v4.

---

## Resumen de convenciones

| Convención | Ejemplo |
|------------|---------|
| Nombres de componentes | PascalCase (`HeroSection.tsx`) |
| Nombres de hooks | camelCase con "use" (`useScrollToSection.ts`) |
| Nombres de IDs | kebab-case (`sobre-mi`, `contacto`) |
| Props interfaces | `ComponentNameProps` |
| Exportaciones | Named exports (no default) |
| Organización | Por tipo, no por página |

---

## Flujo de archivos en una request

Cuando un usuario visita el sitio:

```
1. Usuario solicita "/"
         ↓
2. Next.js busca app/page.tsx
         ↓
3. Next.js aplica app/layout.tsx
         ↓
4. layout.tsx carga Header y Footer
         ↓
5. page.tsx carga las 5 secciones
         ↓
6. Cada sección carga sus componentes
         ↓
7. Se aplican estilos de globals.css
         ↓
8. HTML final se envía al navegador
         ↓
9. React hidrata los Client Components
         ↓
10. Página interactiva lista
```
