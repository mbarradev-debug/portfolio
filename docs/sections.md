# Secciones del Portfolio

El portfolio está dividido en cinco secciones principales, cada una con una responsabilidad específica. Este documento explica qué hace cada sección, cómo está construida y cómo modificarla de forma segura.

---

## Vista general

| Sección | Archivo | Propósito | Tipo |
|---------|---------|-----------|------|
| Hero | `HeroSection.tsx` | Primera impresión, presentación | Client |
| Sobre mí | `AboutSection.tsx` | Perfil y filosofía | Server |
| Stack | `StackSection.tsx` | Tecnologías y competencias | Client |
| CV | `CVSection.tsx` | Descarga del currículum | Server |
| Contacto | `ContactSection.tsx` | Formulario e información | Client |

**Client vs Server**: Los componentes "Client" usan JavaScript en el navegador (interactividad, animaciones con estado). Los "Server" solo renderizan HTML estático (más rápidos).

---

## 1. Hero Section

**Archivo**: `components/sections/HeroSection.tsx`
**ID HTML**: `hero`
**Tipo**: Client Component

### Propósito

Es la **primera impresión** del visitante. Ocupa toda la pantalla inicial (100vh) y presenta:
- Nombre y título profesional
- Breve descripción
- Foto/logo
- Botones de acción (CTA)

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│                          HEADER                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌────────────────────────┐  ┌─────────────────────────┐   │
│   │   INGENIERO SOFTWARE   │  │                         │   │
│   │                        │  │                         │   │
│   │   MIGUEL BARRA         │  │       [IMAGEN]          │   │
│   │                        │  │                         │   │
│   │   Ingeniero en         │  │                         │   │
│   │   Computación...       │  │                         │   │
│   │                        │  └─────────────────────────┘   │
│   │   Párrafos de intro    │                                │
│   │                        │                                │
│   │   [Ver perfil] [Contacto]                               │
│   └────────────────────────┘                                │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Contenido actual

- **Etiqueta**: "Ingeniero de Software"
- **Título H1**: "Miguel Barra"
- **Subtítulo**: "Ingeniero en Computación e Informática" + universidad
- **Descripción**: 2 párrafos sobre enfoque y filosofía profesional
- **CTA primario**: "Ver perfil" → scroll a sección About
- **CTA secundario**: "Contactar" → scroll a sección Contact
- **Imagen**: `/images/miguelb-logo.png` (480x480)

### Características técnicas

**Layout responsive:**
- Móvil: columna invertida (imagen arriba, texto abajo)
- Desktop: dos columnas (texto izquierda, imagen derecha)

```tsx
<div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between lg:gap-16">
```

**Animaciones de entrada:**
- Cada elemento tiene un delay escalonado usando clases de `tw-animate-css`
- El delay se define con la clase `delay-*` (ej: `delay-100`, `delay-200`, etc.)

```tsx
<p className="animate-in fade-in slide-in-from-bottom-4 duration-500">
  Ingeniero de Software
</p>

<h1 className="animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">
  Miguel Barra
</h1>
```

**Botones con micro-interacciones:**
```tsx
<a className="btn-primary inline-flex items-center justify-center rounded-md bg-accent px-6 py-3 ...">
  Ver perfil
</a>
<a className="btn-secondary inline-flex items-center justify-center rounded-md border border-border-subtle bg-surface px-6 py-3 ...">
  Contactar
</a>
```

Las clases `btn-primary` y `btn-secondary` están definidas en `globals.css` con transiciones para hover (desktop) y active (móvil).

**Imagen optimizada:**
```tsx
<Image
  src="/images/miguelb-logo.png"
  alt="Miguel Barra - Ingeniero de Software"
  width={480}
  height={480}
  sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 448px"
  className="h-72 w-72 object-contain sm:h-80 sm:w-80 lg:h-96 lg:w-96 xl:h-[28rem] xl:w-[28rem]"
  priority  // Carga inmediata (above the fold)
/>
```

**Fondo decorativo:**
```tsx
{/* División diagonal */}
<div
  className="pointer-events-none absolute inset-0 bg-bg-secondary"
  style={{ clipPath: "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)" }}
  aria-hidden="true"
/>

{/* Gradiente radial sutil */}
<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--color-bg-secondary)_0%,_transparent_50%)]" />
```

### Cómo modificar

| Cambio | Qué hacer |
|--------|-----------|
| Cambiar nombre | Editar el `<h1>` |
| Cambiar título | Editar la etiqueta verde |
| Cambiar descripción | Editar los `<p>` |
| Cambiar imagen | Reemplazar `/public/images/miguelb-logo.png` |
| Cambiar CTAs | Editar los `<a>` con enlaces |

**Precauciones:**
- Mantener `priority` en la imagen (importante para performance)
- Mantener los IDs de destino (`sobre-mi`, `contacto`) sincronizados

---

## 2. About Section

**Archivo**: `components/sections/AboutSection.tsx`
**ID HTML**: `sobre-mi`
**Tipo**: Server Component

### Propósito

Cuenta la historia profesional en más detalle. Expande la información del Hero con:
- Formación académica
- Enfoque técnico
- Intereses profesionales
- Principios de trabajo

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   PERFIL                    (etiqueta verde)                 │
│                                                              │
│   Sobre mí                  (título H2)                      │
│                                                              │
│   Párrafo 1: Presentación general                           │
│                                                              │
│   Párrafo 2: Enfoque técnico (análisis, arquitectura...)    │
│                                                              │
│   Párrafo 3: Tipo de proyectos que le interesan             │
│                                                              │
│   Párrafo 4: Principios de desarrollo                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Contenido actual

1. **Presentación**: Formación en ingeniería, enfoque práctico
2. **Competencias**: Análisis de requisitos, arquitectura, patrones
3. **Intereses**: Proyectos con impacto, startups, valor real
4. **Principios**: Desarrollo responsable y sostenible

### Características técnicas

- **Variante**: Secondary (fondo ligeramente más claro)
- **Animación**: Usa `AnimateOnScroll` para fade-in al scroll
- **Max-width de texto**: `max-w-3xl` (768px) para legibilidad óptima

```tsx
<Section variant="secondary" id="sobre-mi">
  <Container>
    <AnimateOnScroll>
      <div className="max-w-3xl">
        {/* Contenido */}
      </div>
    </AnimateOnScroll>
  </Container>
</Section>
```

### Cómo modificar

| Cambio | Qué hacer |
|--------|-----------|
| Editar texto | Modificar los `<p>` |
| Agregar párrafo | Añadir otro `<p className="text-text-secondary">` |
| Cambiar etiqueta | Editar "Perfil" |
| Cambiar fondo | Cambiar `variant="secondary"` a `"primary"` |

**Precauciones:**
- Mantener el `max-w-3xl` para legibilidad
- No quitar el `AnimateOnScroll` (rompe la animación)

---

## 3. Stack Section

**Archivo**: `components/sections/StackSection.tsx`
**ID HTML**: `stack`
**Tipo**: Client Component

### Propósito

Muestra las competencias técnicas y el stack tecnológico de dos formas:
1. **Competencias**: Áreas de expertise (arquitectura, frontend, backend, datos)
2. **Tecnologías**: Stack específico con iconos

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   TECNOLOGÍA                 (etiqueta verde)                │
│                                                              │
│   Stack & Engineering Approach  (título H2)                  │
│                                                              │
│   Párrafo explicativo                                        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   ┌─────────────┐  ┌─────────────┐                          │
│   │ Arquitectura│  │ Frontend    │   (grid 2 columnas)      │
│   │ de apps     │  │             │                          │
│   └─────────────┘  └─────────────┘                          │
│   ┌─────────────┐  ┌─────────────┐                          │
│   │ Backend     │  │ Datos       │                          │
│   │             │  │             │                          │
│   └─────────────┘  └─────────────┘                          │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   [React] [Next.js] [TypeScript] [Node.js]                  │
│   [APIs]  [PostgreSQL] [Prisma] [Docker] [Git]              │
│                                                              │
│   (grid responsive: 2→3→4→5 columnas)                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Datos actuales

**Competencias:**
```typescript
const competencias = [
  {
    titulo: "Arquitectura de aplicaciones",
    descripcion: "Diseño de sistemas escalables..."
  },
  {
    titulo: "Desarrollo Frontend",
    descripcion: "Interfaces modernas con React..."
  },
  // ...
];
```

**Tecnologías:**
```typescript
const tecnologias = [
  { nombre: "React", icon: ReactIcon },
  { nombre: "Next.js", icon: NextjsIcon },
  { nombre: "TypeScript", icon: TypeScriptIcon },
  // ...
];
```

### Características técnicas

**Animaciones escalonadas con IntersectionObserver:**

El componente usa un IntersectionObserver dedicado para las tecnologías, detectando cuándo el grid entra en pantalla:

```tsx
const techGridRef = useRef<HTMLDivElement>(null);
const [techVisible, setTechVisible] = useState(false);

useEffect(() => {
  const element = techGridRef.current;
  if (!element) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTechVisible(true);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  observer.observe(element);
  return () => observer.disconnect();
}, []);
```

Cada tecnología aparece con 50ms de delay entre una y otra:

```tsx
{tecnologias.map((tech, index) => {
  const IconComponent = tech.icon;
  return (
    <div
      key={tech.nombre}
      className={`tech-item flex items-center gap-3 rounded-lg px-4 py-3 ${
        techVisible ? "animate-in fade-in slide-in-from-bottom-3 duration-300" : "opacity-0 translate-y-3"
      }`}
      style={{ animationDelay: techVisible ? `${index * 50}ms` : "0ms" }}
    >
      <IconComponent className="tech-icon h-5 w-5 text-text-secondary" />
      <span className="tech-name text-sm font-medium text-text-primary">{tech.nombre}</span>
    </div>
  );
})}
```

**Micro-interacciones con CSS puro:**

Las clases `tech-item`, `tech-icon` y `tech-name` están definidas en `globals.css` con comportamiento diferenciado:

- **Desktop (hover)**: El item se eleva 4px con border accent y sombra glow, el icono se colorea accent y escala 115%, el nombre se colorea accent
- **Móvil (touch)**: El item escala al 97% con border accent, el icono se colorea accent y escala 110%

```tsx
<div className="tech-item flex items-center gap-3 rounded-lg px-4 py-3">
  <IconComponent className="tech-icon h-5 w-5 text-text-secondary" />
  <span className="tech-name text-sm font-medium text-text-primary">{tech.nombre}</span>
</div>
```

**Tarjetas de competencia:**

Usan las clases `competency-card` y `competency-title` para feedback visual al interactuar:

```tsx
<div className="competency-card group rounded-lg border border-border-subtle bg-surface p-6">
  <h4 className="competency-title font-medium text-text-primary">{item.titulo}</h4>
  <p className="mt-2 text-sm text-text-secondary">{item.descripcion}</p>
</div>
```

### Cómo modificar

| Cambio | Qué hacer |
|--------|-----------|
| Agregar tecnología | Añadir objeto a array `tecnologias` |
| Cambiar descripción | Editar array `competencias` |
| Agregar icono | Crear en `icons/index.tsx`, importar aquí |
| Cambiar grid | Modificar clases `grid-cols-*` |

**Para agregar una nueva tecnología:**

1. Si el icono no existe, créalo en `components/icons/index.tsx`:
```tsx
export function NuevoIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* path del SVG */}
    </svg>
  );
}
```

2. Importa y agrega a la lista:
```tsx
import { NuevoIcon } from "@/components/icons";

const tecnologias = [
  // ... existentes
  { nombre: "NuevoFramework", icon: NuevoIcon },
];
```

---

## 4. CV Section

**Archivo**: `components/sections/CVSection.tsx`
**ID HTML**: `cv`
**Tipo**: Server Component

### Propósito

Sección simple para descargar el CV en formato PDF.

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   DOCUMENTACIÓN              (etiqueta verde)                │
│                                                              │
│   CV                         (título H2)                     │
│                                                              │
│   Breve descripción del contenido del CV                    │
│                                                              │
│   [📄 Descargar CV]          (botón con icono)              │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Características técnicas

- **Variante**: Secondary
- **Enlace de descarga**: `/cv/cv.pdf` con atributo `download`

```tsx
<a
  href="/cv/cv.pdf"
  download
  className="inline-flex items-center gap-2 bg-accent ..."
>
  <DownloadIcon />
  Descargar CV
</a>
```

### Cómo modificar

| Cambio | Qué hacer |
|--------|-----------|
| Actualizar CV | Reemplazar `/public/cv/cv.pdf` |
| Cambiar texto del botón | Editar el texto del `<a>` |
| Cambiar nombre del archivo | Añadir `download="nuevo-nombre.pdf"` |

---

## 5. Contact Section

**Archivo**: `components/sections/ContactSection.tsx`
**ID HTML**: `contacto`
**Tipo**: Client Component

### Propósito

Ofrece múltiples formas de contacto:
1. **Enlaces directos**: Email, LinkedIn, GitHub
2. **Formulario**: Para mensajes directos

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   CONTACTO                   (etiqueta verde)                │
│                                                              │
│   Hablemos                   (título H2)                     │
│                                                              │
│   Descripción                                                │
│                                                              │
├────────────────────────────┬────────────────────────────────┤
│                            │                                 │
│   Contacto Directo         │   Enviar mensaje               │
│                            │                                 │
│   ┌──────────────────┐     │   ┌─────────────────────────┐  │
│   │ 📧 Email         │     │   │ Nombre: [___________]   │  │
│   │    contacto@...  │     │   │                         │  │
│   └──────────────────┘     │   │ Email:  [___________]   │  │
│   ┌──────────────────┐     │   │                         │  │
│   │ 💼 LinkedIn      │     │   │ Mensaje:                │  │
│   │    /in/miguel    │     │   │ [___________________]   │  │
│   └──────────────────┘     │   │ [___________________]   │  │
│   ┌──────────────────┐     │   │                         │  │
│   │ 🐙 GitHub        │     │   │ [Enviar mensaje]        │  │
│   │    /miguelbarra  │     │   └─────────────────────────┘  │
│   └──────────────────┘     │                                 │
│                            │                                 │
└────────────────────────────┴────────────────────────────────┘
```

### Datos de contacto actuales

```typescript
const contactLinks = [
  {
    label: "Email",
    value: "contacto@miguelbarra.dev",
    href: "mailto:contacto@miguelbarra.dev",
    icon: EmailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/miguelbarra",
    href: "https://linkedin.com/in/miguelbarra",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/miguelbarra",
    href: "https://github.com/miguelbarra",
    icon: GitHubIcon,
    external: true,
  },
];
```

**Enlaces con micro-interacciones:**

Los enlaces de contacto usan clases CSS definidas en `globals.css`:

```tsx
<a href={link.href} className="contact-link group flex items-center gap-4 rounded-lg px-4 py-3">
  <span className="contact-link-icon-wrapper flex h-10 w-10 items-center justify-center rounded-lg bg-bg-secondary">
    <IconComponent className="contact-link-icon h-5 w-5 text-text-secondary" />
  </span>
  <div>
    <span className="text-xs uppercase">{link.label}</span>
    <span className="contact-link-value">{link.value}</span>
  </div>
</a>
```

- **Desktop**: Se desplaza 4px a la derecha, el icono se agranda y cambia a fondo accent
- **Móvil**: Escala al 98% al presionar, el icono cambia a fondo accent

### Estados del formulario

```typescript
type FormStatus = "idle" | "submitting" | "success" | "error";

const [formStatus, setFormStatus] = useState<FormStatus>("idle");
```

| Estado | Comportamiento |
|--------|----------------|
| `idle` | Formulario normal, botón habilitado |
| `submitting` | Botón deshabilitado con texto "Enviando...", campos deshabilitados |
| `success` | Muestra mensaje verde de éxito, formulario se resetea, vuelve a idle tras 5s |
| `error` | Muestra mensaje rojo de error |

**Botón de envío con micro-interacciones:**

```tsx
<button
  type="submit"
  disabled={formStatus === "submitting"}
  className="btn-primary mt-2 inline-flex w-full items-center justify-center rounded-md bg-accent px-6 py-3 text-sm font-medium text-bg-primary disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
>
  {formStatus === "submitting" ? "Enviando..." : "Enviar mensaje"}
</button>
```

La clase `btn-primary` proporciona hover con sombra glow en desktop y feedback de escala al click en móvil.

### ⚠️ Nota importante sobre el formulario

**El formulario actualmente es simulado.** No envía emails realmente.

```typescript
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setFormStatus("submitting");

  // SIMULACIÓN - Espera 1 segundo
  await new Promise((resolve) => setTimeout(resolve, 1000));

  setFormStatus("success");
  // ...
};
```

Para hacerlo funcional, necesitarías:
1. Crear una API route en `/app/api/contact/route.ts`
2. Integrar con un servicio de email (SendGrid, Resend, Mailgun, etc.)
3. Actualizar `handleSubmit` para llamar a la API

### Cómo modificar

| Cambio | Qué hacer |
|--------|-----------|
| Cambiar email | Editar `contactLinks[0]` |
| Cambiar LinkedIn | Editar `contactLinks[1]` |
| Agregar red social | Añadir objeto a `contactLinks` |
| Cambiar campos del form | Editar los `<input>` y `<textarea>` |

---

## Resumen de IDs para navegación

Los IDs son importantes porque el Header y los CTAs los usan para scroll:

| Sección | ID | URL |
|---------|-----|-----|
| Hero | `hero` | `/#hero` |
| About | `sobre-mi` | `/#sobre-mi` |
| Stack | `stack` | `/#stack` |
| CV | `cv` | `/#cv` |
| Contacto | `contacto` | `/#contacto` |

**Si cambias un ID**, actualiza también:
- `Header.tsx` (array `sections`)
- Los CTAs en `HeroSection.tsx`
- Cualquier otro enlace interno

---

## Agregar una nueva sección

Para crear una sección nueva (ej: "Proyectos"):

1. **Crear el archivo**:
```tsx
// components/sections/ProjectsSection.tsx
import { Section } from "@/components/layout/Section";
import { Container } from "@/components/layout/Container";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

export function ProjectsSection() {
  return (
    <Section variant="primary" id="proyectos">
      <Container>
        <AnimateOnScroll>
          {/* Tu contenido */}
        </AnimateOnScroll>
      </Container>
    </Section>
  );
}
```

2. **Exportar** (si usas barrel exports):
```tsx
// components/sections/index.ts
export { ProjectsSection } from "./ProjectsSection";
```

3. **Agregar a la página**:
```tsx
// app/page.tsx
import { ProjectsSection } from "@/components/sections/ProjectsSection";

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

4. **Agregar al Header** (opcional):
```tsx
// components/layout/Header.tsx
const sections = [
  { id: "hero", label: null },
  { id: "sobre-mi", label: "Perfil" },
  { id: "proyectos", label: "Proyectos" },  // Nuevo
  { id: "contacto", label: "Contacto" },
];
```
