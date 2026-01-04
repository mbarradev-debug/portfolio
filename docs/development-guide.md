# Guía de Desarrollo

Esta guía explica cómo trabajar con el proyecto: desde levantar el entorno de desarrollo hasta agregar nuevas funcionalidades manteniendo la coherencia del código.

---

## Requisitos previos

### Software necesario

| Software | Versión mínima | Verificar instalación |
|----------|---------------|----------------------|
| Node.js | 18.0.0 | `node --version` |
| npm | 9.0.0 | `npm --version` |
| Git | 2.0.0 | `git --version` |

### Editor recomendado

**Visual Studio Code** con las siguientes extensiones:
- **ESLint** — Detecta errores de código
- **Tailwind CSS IntelliSense** — Autocompletado de clases
- **TypeScript** — Soporte integrado (ya viene con VS Code)
- **Prettier** (opcional) — Formato automático

---

## Levantar el proyecto

### 1. Clonar el repositorio

```bash
git clone https://github.com/mbarradev-debug/portfolio.git
cd portfolio
```

### 2. Instalar dependencias

```bash
npm install
```

Esto descarga todas las librerías definidas en `package.json`.

### 3. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

### 4. Verificar que funciona

Abre el navegador en `http://localhost:3000`. Deberías ver el portfolio completo.

**Hot Reload**: Los cambios en el código se reflejan automáticamente sin recargar la página.

---

## Scripts disponibles

| Comando | Descripción | Cuándo usarlo |
|---------|-------------|---------------|
| `npm run dev` | Servidor de desarrollo | Mientras desarrollas |
| `npm run build` | Genera build de producción | Antes de deployar |
| `npm run start` | Ejecuta build de producción | Probar build local |
| `npm run lint` | Analiza código con ESLint | Antes de commits |

### Ejemplo de flujo típico

```bash
# 1. Desarrollar
npm run dev

# 2. Antes de commit, verificar errores
npm run lint

# 3. Probar build de producción localmente
npm run build
npm run start

# 4. Si todo funciona, commit
git add .
git commit -m "feat: nueva funcionalidad"
```

---

## Estructura de un componente típico

### Server Component (por defecto)

```tsx
// components/sections/AboutSection.tsx

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";

export function AboutSection() {
  return (
    <Section variant="secondary" id="sobre-mi">
      <Container>
        <div className="max-w-3xl">
          <span className="text-sm font-medium text-accent">Perfil</span>
          <h2 className="text-3xl font-bold mt-2">Sobre mí</h2>
          <p className="text-text-secondary mt-6">
            Contenido...
          </p>
        </div>
      </Container>
    </Section>
  );
}
```

### Client Component (con interactividad)

```tsx
// components/sections/ContactSection.tsx

"use client";  // ← Obligatorio al inicio

import { useState, FormEvent } from "react";
import { Section } from "@/components/layout/Section";

export function ContactSection() {
  const [status, setStatus] = useState<"idle" | "sending">("idle");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // ...
  };

  return (
    <Section id="contacto">
      <form onSubmit={handleSubmit}>
        {/* ... */}
      </form>
    </Section>
  );
}
```

**Regla simple**: Si usas `useState`, `useEffect`, `onClick` u otros hooks/eventos → necesitas `"use client"`.

---

## Agregar una nueva sección

### Paso 1: Crear el componente

Crea el archivo en `components/sections/`:

```tsx
// components/sections/ProjectsSection.tsx

import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function ProjectsSection() {
  const projects = [
    {
      title: "Proyecto 1",
      description: "Descripción del proyecto",
      tech: ["React", "Node.js"],
      link: "https://github.com/...",
    },
    // más proyectos...
  ];

  return (
    <Section variant="primary" id="proyectos">
      <Container>
        <AnimateOnScroll>
          {/* Etiqueta */}
          <span className="inline-block text-sm font-medium text-accent mb-2">
            Trabajo
          </span>

          {/* Título */}
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary">
            Proyectos
          </h2>

          {/* Descripción */}
          <p className="text-text-secondary mt-4 max-w-2xl">
            Algunos proyectos destacados...
          </p>

          {/* Grid de proyectos */}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {projects.map((project, index) => (
              <div
                key={index}
                className="p-6 bg-surface rounded-lg border border-border-subtle"
              >
                <h3 className="font-semibold text-text-primary">
                  {project.title}
                </h3>
                <p className="text-text-secondary mt-2">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
```

### Paso 2: Agregar a la página

```tsx
// app/page.tsx

import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";  // Nuevo
import { StackSection } from "@/components/sections/StackSection";
import { CVSection } from "@/components/sections/CVSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />  {/* Nueva sección */}
      <StackSection />
      <CVSection />
      <ContactSection />
    </>
  );
}
```

### Paso 3: (Opcional) Agregar al Header

Si quieres que aparezca en la navegación:

```tsx
// components/layout/Header.tsx

const sections = [
  { id: "hero", label: null },
  { id: "sobre-mi", label: "Perfil" },
  { id: "proyectos", label: "Proyectos" },  // Nuevo
  { id: "contacto", label: "Contacto" },
];
```

---

## Agregar un nuevo icono

### Paso 1: Obtener el SVG

Busca el icono en:
- [Simple Icons](https://simpleicons.org/) — Logos de marcas
- [Heroicons](https://heroicons.com/) — Iconos de UI
- [Lucide](https://lucide.dev/) — Iconos generales

### Paso 2: Crear el componente

```tsx
// components/icons/index.tsx

// Agregar al final del archivo (en la categoría correspondiente):

export function NuevoIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      {/* Pegar los paths del SVG aquí */}
      <path d="..." />
    </svg>
  );
}
```

**Convenciones:**
- Nombre: `{Nombre}Icon` (ej: `DockerIcon`, `AWSIcon`)
- `fill="currentColor"` para heredar el color del texto (iconos sólidos)
- Para iconos outline: usar `fill="none"`, `stroke="currentColor"`, `strokeWidth={2}`
- `aria-hidden="true"` porque son decorativos
- `viewBox="0 0 24 24"` es el estándar (ajustar si el SVG es diferente)

### Paso 3: Usar el icono

```tsx
import { NuevoIcon } from "@/components/icons";

<NuevoIcon className="h-6 w-6 text-accent" />
```

### Iconos existentes (16 total)

| Categoría | Iconos disponibles |
|-----------|-------------------|
| Tecnologías (9) | `ReactIcon`, `NextjsIcon`, `TypeScriptIcon`, `NodejsIcon`, `PostgreSQLIcon`, `PrismaIcon`, `DockerIcon`, `GitIcon`, `ApiIcon` |
| Plataformas (3) | `GitHubIcon`, `LinkedInIcon`, `EmailIcon` |
| Acciones (2) | `DownloadIcon`, `ExternalLinkIcon` |
| Otros (2) | `PhoneIcon`, `MapPinIcon` |

---

## Usar micro-interacciones

El proyecto tiene un sistema de micro-interacciones definido en `globals.css`. En lugar de usar clases Tailwind para hover/active, usa las clases CSS predefinidas.

### Clases disponibles

| Clase | Uso | Ejemplo |
|-------|-----|---------|
| `.tech-item` + `.tech-icon` + `.tech-name` | Items de tecnología con icono | Stack section |
| `.competency-card` + `.competency-title` | Tarjetas con título destacado | Stack section |
| `.contact-link` + `.contact-link-icon-wrapper` + `.contact-link-icon` + `.contact-link-value` | Enlaces de contacto | Contact section |
| `.btn-primary` | Botones principales (fondo accent) | CTAs, formularios |
| `.btn-secondary` | Botones secundarios (outline) | CTAs alternativos |
| `.footer-link` + `.footer-link-icon` | Enlaces del footer | Footer |
| `.nav-logo` / `.nav-cv-link` / `.nav-contact-btn` | Elementos del header | Header |
| `.form-input` | Inputs de formulario | Contact section |
| `.text-link` | Enlaces inline de texto | Párrafos |

### Ejemplo de uso

```tsx
// Botón primario
<button className="btn-primary inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary">
  Enviar
</button>

// Tarjeta de competencia
<div className="competency-card rounded-lg border border-border-subtle bg-surface p-6">
  <h4 className="competency-title font-medium text-text-primary">Título</h4>
  <p className="text-text-secondary">Descripción...</p>
</div>
```

Las clases manejan automáticamente:
- **Desktop**: Efectos hover (elevación, cambio de color, sombras)
- **Móvil**: Efectos de tap (escala al presionar)

---

## Mantener coherencia de diseño

### Checklist antes de crear un componente

- [ ] ¿Uso los colores del sistema? (`bg-bg-primary`, `text-accent`, etc.)
- [ ] ¿Uso el espaciado consistente? (`p-4`, `mt-6`, `gap-4`)
- [ ] ¿Es responsive? (probar en móvil, tablet, desktop)
- [ ] ¿Uso las clases de micro-interacciones para elementos interactivos? (`.btn-primary`, `.tech-item`, etc.)
- [ ] ¿Los textos usan las clases correctas? (`text-text-primary` vs `text-text-secondary`)

### Colores: cuándo usar cada uno

```tsx
// Fondos
<div className="bg-bg-primary">Fondo principal</div>
<div className="bg-bg-secondary">Fondo alternativo (secciones alternas)</div>
<div className="bg-surface">Tarjetas, modales, elementos elevados</div>

// Textos
<h1 className="text-text-primary">Títulos y texto importante</h1>
<p className="text-text-secondary">Párrafos y texto normal</p>
<span className="text-accent">Etiquetas, links, destacados</span>

// Bordes
<div className="border border-border-subtle">Borde sutil</div>
<div className="border border-accent">Borde destacado</div>
```

### Espaciado: escala recomendada

| Uso | Clase | Valor |
|-----|-------|-------|
| Entre letras de icono y texto | `gap-2` | 8px |
| Entre elementos de lista | `gap-4` | 16px |
| Entre párrafos | `mt-4` o `mt-6` | 16-24px |
| Entre secciones de contenido | `mt-8` o `mt-12` | 32-48px |
| Padding de tarjetas | `p-4` o `p-6` | 16-24px |

### Tipografía: clases estándar

```tsx
// Etiquetas (labels)
<span className="text-sm font-medium text-accent">Etiqueta</span>

// Títulos principales (H1)
<h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">Título</h1>

// Títulos de sección (H2)
<h2 className="text-3xl sm:text-4xl font-bold">Sección</h2>

// Subtítulos (H3)
<h3 className="text-xl font-semibold">Subtítulo</h3>

// Párrafos
<p className="text-base sm:text-lg text-text-secondary">Texto</p>

// Texto pequeño
<span className="text-sm text-text-secondary">Nota</span>
```

---

## Errores comunes a evitar

### ❌ No usar variables de color directamente

```tsx
// ❌ Mal
<div style={{ backgroundColor: "#0F1115" }}>

// ✅ Bien
<div className="bg-bg-primary">
```

### ❌ Olvidar "use client"

```tsx
// ❌ Error: useState no funciona en Server Component
import { useState } from "react";

export function MyComponent() {
  const [count, setCount] = useState(0);  // Error!
}

// ✅ Bien
"use client";

import { useState } from "react";

export function MyComponent() {
  const [count, setCount] = useState(0);  // Funciona
}
```

### ❌ Importar de public con import

```tsx
// ❌ Mal
import logo from "../public/images/logo.png";
<img src={logo} />

// ✅ Bien
<Image src="/images/logo.png" alt="Logo" width={100} height={100} />
```

### ❌ No usar el componente Image de Next.js

```tsx
// ❌ Mal (no optimiza la imagen)
<img src="/images/foto.jpg" alt="Foto" />

// ✅ Bien (optimiza automáticamente)
import Image from "next/image";

<Image
  src="/images/foto.jpg"
  alt="Foto"
  width={400}
  height={300}
/>
```

### ❌ Hardcodear breakpoints

```tsx
// ❌ Mal
@media (min-width: 640px) { ... }

// ✅ Bien (usar clases de Tailwind)
<div className="text-sm sm:text-base lg:text-lg">
```

### ❌ No manejar estados de carga/error

```tsx
// ❌ Mal (sin feedback al usuario)
const handleSubmit = async () => {
  await sendEmail();
};

// ✅ Bien
const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

const handleSubmit = async () => {
  setStatus("loading");
  try {
    await sendEmail();
    setStatus("success");
  } catch {
    setStatus("error");
  }
};
```

---

## Testing local del build

Antes de deployar, siempre prueba el build de producción:

```bash
# 1. Generar build
npm run build

# 2. Verificar que no hay errores
# Si hay errores, el comando falla y muestra qué arreglar

# 3. Probar localmente
npm run start

# 4. Abrir http://localhost:3000 y verificar que todo funciona
```

### Qué verificar en el build

- [ ] Todas las páginas cargan correctamente
- [ ] Las imágenes se muestran
- [ ] Las animaciones funcionan
- [ ] Los links de navegación funcionan
- [ ] El formulario muestra sus estados
- [ ] Responsive: probar en diferentes tamaños

---

## Debugging tips

### Ver errores de TypeScript

```bash
# Ver todos los errores de tipo
npx tsc --noEmit
```

### Ver errores de ESLint

```bash
npm run lint
```

### Inspeccionar el bundle

```bash
# Ver qué archivos se generan y su tamaño
npm run build

# En la salida verás algo como:
# Route (app)                              Size     First Load JS
# ┌ ○ /                                    5.2 kB   90 kB
```

### Debugger en el navegador

Los Client Components se pueden debuggear normalmente con las DevTools del navegador:
1. Abre DevTools (F12)
2. Ve a la pestaña "Sources"
3. Busca tu archivo en `webpack://./components/...`
4. Pon breakpoints

---

## Flujo de Git recomendado

```bash
# 1. Crear rama para la feature
git checkout -b feat/nueva-funcionalidad

# 2. Hacer cambios...

# 3. Ver qué cambió
git status
git diff

# 4. Agregar cambios
git add .

# 5. Commit con mensaje descriptivo
git commit -m "feat: agregar sección de proyectos"

# 6. Push
git push origin feat/nueva-funcionalidad

# 7. Crear Pull Request en GitHub
```

### Convención de commits

| Prefijo | Uso |
|---------|-----|
| `feat:` | Nueva funcionalidad |
| `fix:` | Corrección de bug |
| `style:` | Cambios de estilo (CSS, formato) |
| `refactor:` | Refactoring sin cambio de funcionalidad |
| `docs:` | Documentación |
| `chore:` | Tareas de mantenimiento |

Ejemplos:
- `feat: agregar sección de proyectos`
- `fix: corregir link roto en footer`
- `style: mejorar espaciado en móvil`
- `docs: actualizar README`
