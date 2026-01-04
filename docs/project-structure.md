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

### `globals.css` — Estilos globales y micro-interacciones

```css
@import "tailwindcss";      /* Importa Tailwind */
@import "tw-animate-css";   /* Importa animaciones */

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

body {
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  font-family: var(--font-sans);
  line-height: 1.6;
}

/* Animaciones personalizadas */
@keyframes pulse-glow { ... }

/* Sistema de micro-interacciones (8 categorías) */
.tech-item { ... }
.competency-card { ... }
.contact-link { ... }
.btn-primary { ... }
.nav-logo { ... }
.form-input { ... }
.text-link { ... }
```

**¿Qué contiene?** (~500 líneas)
1. **Importaciones**: Tailwind CSS y tw-animate-css
2. **Variables CSS**: 8 colores + fuente (definidas en `@theme inline`)
3. **Estilos base**: body, html smooth scroll, focus-visible, ::selection, scroll-margin-top
4. **Animación custom**: `pulse-glow` para resaltar secciones al navegar
5. **Separador visual**: `.separator-visible` con gradiente accent
6. **Micro-interacciones CSS puro** (con media queries hover/touch):
   - `.tech-item` / `.tech-icon` / `.tech-name` — Items del stack tecnológico
   - `.competency-card` / `.competency-title` — Tarjetas de competencia
   - `.contact-link` / `.contact-link-icon-wrapper` / `.contact-link-icon` / `.contact-link-value` — Enlaces de contacto
   - `.footer-link` / `.footer-link-icon` — Enlaces del footer
   - `.btn-primary` / `.btn-secondary` — Botones de acción
   - `.nav-logo` / `.nav-cv-link` / `.nav-cv-icon` / `.nav-contact-btn` — Header
   - `.form-input` — Inputs del formulario de contacto
   - `.text-link` — Enlaces inline de texto

---

## Carpeta `/components` — Piezas de LEGO

Los componentes están organizados por **responsabilidad**, no por página.

### `/components/layout` — Estructura de página

Componentes que definen la estructura visual de la página.

#### `Header.tsx`

```tsx
"use client";  // Necesita JavaScript del navegador

export default function Header() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const { scrollToSection, scrollToTop } = useScrollToSection();
  // ... lógica de IntersectionObserver para sección activa
  // ... lógica de scroll hide/show

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4 transition-transform duration-200">
      <nav className="flex h-11 w-full max-w-md items-center justify-between rounded-full border border-text-primary/10 bg-text-primary/95 px-5 shadow-lg shadow-black/10 backdrop-blur-sm sm:h-12 sm:px-6">
        <a href="#" onClick={scrollToTop} className="nav-logo text-base font-semibold text-bg-primary">MB</a>
        <div className="flex items-center gap-6">
          <a href="/cv/cv.pdf" download className="nav-cv-link group flex items-center gap-1.5 text-sm text-bg-secondary">
            <DownloadIcon className="nav-cv-icon h-3.5 w-3.5" />
            <span>CV</span>
          </a>
          <a href="#contacto" onClick={(e) => scrollToSection(e, "contacto")} className="nav-contact-btn ...">
            Contacto
          </a>
        </div>
      </nav>
    </header>
  );
}
```

- **Tipo**: Client Component (detecta scroll + sección activa)
- **Posición**: Fijo centrado en la parte superior
- **Diseño**: Píldora flotante con fondo claro (`bg-text-primary/95`)
- **Altura**: 44px móvil / 48px desktop (h-11 / sm:h-12)
- **Max-width**: 448px (max-w-md)
- **Comportamiento scroll**: Se oculta al scroll down, reaparece al scroll up
- **Detecta**: Qué sección está visible y resalta el botón "Contacto"
- **Micro-interacciones**: `.nav-logo`, `.nav-cv-link`, `.nav-cv-icon`, `.nav-contact-btn`
- **Usa**: Hook `useScrollToSection` para navegación suave

#### `Footer.tsx`

```tsx
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border-subtle bg-bg-secondary py-12">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p>© {currentYear} Miguel Barra. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4">
            {/* Enlaces a GitHub, LinkedIn, Email con iconos */}
            {links.map((link) => (
              <a href={link.href} className="footer-link group ...">
                <IconComponent className="footer-link-icon h-4 w-4" />
                <span>{link.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </footer>
  );
}
```

- **Tipo**: Server Component
- **Contenido**: Copyright dinámico y enlaces sociales con iconos
- **Micro-interacciones**: Usa clases `.footer-link` y `.footer-link-icon` para feedback visual

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

export default function AnimateOnScroll({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);  // Solo anima una vez
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`${className} ${
        isVisible
          ? "animate-in fade-in slide-in-from-bottom-2 duration-300"
          : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
```

- **Propósito**: Animar contenido cuando entra en pantalla
- **Cómo funciona**: Usa IntersectionObserver para detectar visibilidad
- **Animación**: `fade-in` + `slide-in-from-bottom-2` con duración de 300ms
- **Una vez**: Una vez visible, deja de observar (no re-anima al volver a entrar)
- **Uso**: Envuelve cualquier contenido que quieras animar

```tsx
<AnimateOnScroll className="max-w-3xl">
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

**Iconos disponibles (16 total):**

| Categoría | Iconos |
|-----------|--------|
| Tecnologías (9) | `ReactIcon`, `NextjsIcon`, `TypeScriptIcon`, `NodejsIcon`, `PostgreSQLIcon`, `PrismaIcon`, `DockerIcon`, `GitIcon`, `ApiIcon` |
| Plataformas (3) | `GitHubIcon`, `LinkedInIcon`, `EmailIcon` |
| Acciones (2) | `DownloadIcon`, `ExternalLinkIcon` |
| Contacto (1) | `PhoneIcon` |
| Ubicación (1) | `MapPinIcon` |

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
