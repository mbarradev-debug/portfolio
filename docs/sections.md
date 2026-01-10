# Secciones del Portfolio

El portfolio está dividido en cuatro secciones principales, cada una con una responsabilidad específica. Este documento explica qué hace cada sección, cómo está construida y cómo modificarla de forma segura.

---

## Vista general

| Sección | Archivo | Propósito | Tipo |
|---------|---------|-----------|------|
| Hero | `HeroSection.tsx` | Primera impresión, presentación | Client |
| Sobre mí | `AboutSection.tsx` | Perfil y filosofía | Client |
| Stack | `StackSection.tsx` | Tecnologías y competencias | Client |
| Contacto | `ContactSection.tsx` | Formulario funcional e información | Client |

**Client vs Server**: Los componentes "Client" usan JavaScript en el navegador (interactividad, animaciones con estado). Los "Server" solo renderizan HTML estático (más rápidos).

**Todos los componentes usan i18n**: Acceden a traducciones mediante el hook `useI18n()`.

---

## 1. Hero Section

**Archivo**: `components/sections/HeroSection.tsx`
**ID HTML**: `hero`
**Tipo**: Client Component

### Propósito

Es la **primera impresión** del visitante. Ocupa toda la pantalla inicial (usa `min-h-svh-safe` para compatibilidad móvil) y presenta:
- Badge de seniority con efecto shimmer
- Headline y subheadline
- Credencial rápida (años de experiencia)
- Imagen/logo con fondo circular
- Botones de acción (CTAs)
- Indicador de scroll

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│                          HEADER                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   [Mobile: Imagen arriba, contenido abajo - centrado]        │
│   [Desktop: Contenido izquierda, imagen derecha]             │
│                                                              │
│   ┌────────────────────────┐  ┌─────────────────────────┐   │
│   │ ┌──────────────────┐   │  │                         │   │
│   │ │ SENIOR FULLSTACK │   │  │    ○ (círculo verde)    │   │
│   │ └──────────────────┘   │  │     [IMAGEN]            │   │
│   │                        │  │                         │   │
│   │ Del problema al        │  │                         │   │
│   │ producto.              │  └─────────────────────────┘   │
│   │                        │                                │
│   │ Arquitectura que       │                                │
│   │ escala...              │                                │
│   │                        │                                │
│   │ +5 años llevando...    │                                │
│   │                        │                                │
│   │ [Ver proyectos] [CV]   │                                │
│   └────────────────────────┘                                │
│                                                              │
│                    SCROLL ↓                                  │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Dependencias

```tsx
import Image from "next/image";
import Section from "@/components/layout/Section";
import Container from "@/components/layout/Container";
import { useScrollToSection } from "@/hooks/useScrollToSection";
import { useI18n } from "@/i18n";
```

### Textos (i18n)

Todos los textos vienen de `t.hero`:

| Clave | Descripción |
|-------|-------------|
| `t.hero.imageAlt` | Alt text de la imagen |
| `t.hero.badge` | Texto del badge ("Senior Fullstack Engineer") |
| `t.hero.headline` | Headline principal |
| `t.hero.subheadline` | Subheadline |
| `t.hero.credential` | Credencial de experiencia |
| `t.hero.ctaStack` | Texto botón principal |
| `t.hero.ctaStackAria` | Aria-label botón principal |
| `t.hero.ctaCV` | Texto botón CV |
| `t.hero.ctaCVAria` | Aria-label botón CV |
| `t.hero.scroll` | Texto scroll indicator |
| `t.a11y.scrollToNextSection` | Aria-label scroll button |

### Animaciones

Las animaciones de entrada usan clases CSS (`hero-animate`, `hero-fade`, `hero-fade-up`, `hero-fade-zoom`) con delays escalonados (`hero-delay-0` a `hero-delay-5`):

```tsx
<span className="badge-shimmer ... hero-animate hero-fade hero-delay-0">
  {t.hero.badge}
</span>

<h1 className="... hero-animate hero-fade-up hero-delay-1">
  {t.hero.headline}
</h1>
```

### Elementos especiales

- **Badge shimmer**: Efecto de brillo que pasa una vez al cargar (`.badge-shimmer`)
- **CTA pulse**: Pulso de atención en el botón principal (`.btn-primary-pulse`)
- **Scroll breathe**: Efecto de respiración en el indicador de scroll (`.scroll-breathe`)
- **Fondo diagonal**: `clipPath: "polygon(60% 0, 100% 0, 100% 100%, 40% 100%)"`

### Cómo modificar

| Cambio | Ubicación |
|--------|-----------|
| Textos | `src/i18n/es.ts` y `src/i18n/en.ts` → `hero` |
| Imagen | `public/images/miguelb-logo.png` (mantener aspect-ratio cuadrado) |
| Link del CV | `href="/cv/cv.pdf"` en los botones |
| Colores del badge | Clases `border-accent/30 bg-accent/10 text-accent` |

---

## 2. About Section

**Archivo**: `components/sections/AboutSection.tsx`
**ID HTML**: `sobre-mi`
**Tipo**: Client Component

### Propósito

Presenta el **perfil profesional** con:
- Quote destacado
- Enfoque de trabajo (3 cards)
- Target ideal (chips)
- Biografía expandible

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│   PERFIL                                                     │
│   Sobre mí                                                   │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  "La arquitectura correcta hoy evita el rewrite     │   │
│   │   de mañana."                                        │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
│   MI ENFOQUE                                                 │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ [icon] Arquitectura desde el día uno                  │ │
│   │        Defino estructura antes de escribir código.    │ │
│   └───────────────────────────────────────────────────────┘ │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ [icon] Stack por durabilidad                          │ │
│   │        Elijo tecnologías por longevidad, no por moda. │ │
│   └───────────────────────────────────────────────────────┘ │
│   ┌───────────────────────────────────────────────────────┐ │
│   │ [icon] Código en producción                           │ │
│   │        Entrego software sirviendo usuarios reales.    │ │
│   └───────────────────────────────────────────────────────┘ │
│                                                              │
│   IDEAL PARA                                                 │
│   [Startups] [Equipos pequeños] [Proyectos con propósito]   │
│                                                              │
│   [📖 Leer historia completa ▼]                             │
│                                                              │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  (Contenido expandible - biografía completa)         │   │
│   │  Párrafos con strong + texto normal                  │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Estado interno

```tsx
const [isExpanded, setIsExpanded] = useState(false);
```

Controla si la biografía está visible o colapsada.

### Textos (i18n)

| Clave | Descripción |
|-------|-------------|
| `t.about.label` | Label superior ("Perfil") |
| `t.about.title` | Título de la sección |
| `t.about.quote` | Quote destacado |
| `t.about.approachLabel` | Label "Mi enfoque" |
| `t.about.approach.architecture` | Card arquitectura (title + description) |
| `t.about.approach.stack` | Card stack (title + description) |
| `t.about.approach.production` | Card producción (title + description) |
| `t.about.idealForLabel` | Label "Ideal para" |
| `t.about.idealFor` | Array de strings para los chips |
| `t.about.expandButton` | Texto botón expandir |
| `t.about.collapseButton` | Texto botón colapsar |
| `t.about.bio.p1` / `p1Strong` | Primer párrafo (strong + resto) |
| `t.about.bio.p2` / `p2Strong` | Segundo párrafo |
| `t.about.bio.p3` / `p3Strong` | Tercer párrafo |
| `t.about.bio.p4` / `p4Strong` | Cuarto párrafo |

### Micro-interacciones

Las tarjetas de enfoque usan la clase `.approach-card`:
- Desktop: `translateX(4px)`, border accent, shadow
- Móvil: `scale(0.98)`, border accent

### Cómo modificar

| Cambio | Ubicación |
|--------|-----------|
| Textos | `src/i18n/es.ts` y `src/i18n/en.ts` → `about` |
| Añadir chip "Ideal para" | Añadir string al array `t.about.idealFor` |
| Iconos de enfoque | Array `approachIcons` en el componente |
| Añadir párrafo a bio | Añadir `p5` / `p5Strong` en types.ts, es.ts, en.ts y renderizarlo |

---

## 3. Stack Section

**Archivo**: `components/sections/StackSection.tsx`
**ID HTML**: `stack`
**Tipo**: Client Component

### Propósito

Muestra las **competencias técnicas** y el **stack de tecnologías**:
- Descripción del enfoque técnico
- 4 cards de áreas de competencia
- Grid de tecnologías por categoría

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│   TECNOLOGÍA                                                 │
│   Stack & Engineering Approach                               │
│                                                              │
│   Selecciono el stack tecnológico y los patrones de         │
│   diseño según las necesidades específicas...               │
│                                                              │
│   Áreas de competencia                                       │
│   ┌─────────────────────┐  ┌─────────────────────┐          │
│   │ [icon]              │  │ [icon]              │          │
│   │ Arquitectura de     │  │ Desarrollo Frontend │          │
│   │ aplicaciones        │  │ ...                 │          │
│   │ ...                 │  │                     │          │
│   └─────────────────────┘  └─────────────────────┘          │
│   ┌─────────────────────┐  ┌─────────────────────┐          │
│   │ [icon]              │  │ [icon]              │          │
│   │ Desarrollo Backend  │  │ Datos y persistencia│          │
│   │ ...                 │  │ ...                 │          │
│   └─────────────────────┘  └─────────────────────┘          │
│                                                              │
│   Stack principal                                            │
│   ┌─────────────────────────────────────────────────────┐   │
│   │  Frontend                                            │   │
│   │  [React] [Next.js] [TypeScript]                     │   │
│   │                                                      │   │
│   │  Backend                                             │   │
│   │  [Node.js] [APIs REST] [PostgreSQL] [Prisma]        │   │
│   │                                                      │   │
│   │  DevOps & Tools                                      │   │
│   │  [Docker] [Git]                                      │   │
│   └─────────────────────────────────────────────────────┘   │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Estado interno

```tsx
const [techVisible, setTechVisible] = useState(false);
```

Controla cuándo se activa la animación escalonada del grid de tecnologías.

### Animaciones

El grid de tecnologías usa `IntersectionObserver` para detectar cuándo entra en pantalla:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entry.isIntersecting) {
        setTechVisible(true);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );
  // ...
}, []);
```

Cada item tiene un delay escalonado basado en su índice:

```tsx
style={{ animationDelay: techVisible ? `${itemIndex * 50}ms` : "0ms" }}
```

### Textos (i18n)

| Clave | Descripción |
|-------|-------------|
| `t.stack.label` | Label superior ("Tecnología") |
| `t.stack.title` | Título de la sección |
| `t.stack.description` | Descripción del enfoque |
| `t.stack.competenciesLabel` | Label "Áreas de competencia" |
| `t.stack.competencies.architecture` | Card arquitectura (title + description) |
| `t.stack.competencies.frontend` | Card frontend |
| `t.stack.competencies.backend` | Card backend |
| `t.stack.competencies.data` | Card datos |
| `t.stack.mainStackLabel` | Label "Stack principal" |

### Datos de tecnologías

Definidos directamente en el componente:

```tsx
const techCategories = [
  {
    name: "Frontend",
    items: [
      { nombre: "React", icon: ReactIcon },
      { nombre: "Next.js", icon: NextjsIcon },
      { nombre: "TypeScript", icon: TypeScriptIcon },
    ],
  },
  {
    name: "Backend",
    items: [
      { nombre: "Node.js", icon: NodejsIcon },
      { nombre: "APIs REST", icon: ApiIcon },
      { nombre: "PostgreSQL", icon: PostgreSQLIcon },
      { nombre: "Prisma", icon: PrismaIcon },
    ],
  },
  {
    name: "DevOps & Tools",
    items: [
      { nombre: "Docker", icon: DockerIcon },
      { nombre: "Git", icon: GitIcon },
    ],
  },
];
```

### Micro-interacciones

- **Competency cards**: Clase `.competency-card`
- **Tech items**: Clase `.tech-item` (hover eleva, tap escala)

### Cómo modificar

| Cambio | Ubicación |
|--------|-----------|
| Textos | `src/i18n/es.ts` y `src/i18n/en.ts` → `stack` |
| Añadir tecnología | Array `techCategories` + importar icono de `@/components/icons` |
| Añadir categoría | Nuevo objeto en `techCategories` |
| Añadir competencia | Añadir a `types.ts`, idiomas, `competencyKeys`, `competencyIcons` |
| Iconos | `components/icons/index.tsx` |

---

## 4. Contact Section

**Archivo**: `components/sections/ContactSection.tsx`
**ID HTML**: `contacto`
**Tipo**: Client Component

### Propósito

Facilita el **contacto** con dos opciones:
- Links directos (email, LinkedIn, GitHub)
- Formulario funcional con envío real

### Estructura visual

```
┌─────────────────────────────────────────────────────────────┐
│   CONVERSEMOS                                                │
│   Contacto                                                   │
│                                                              │
│   Si buscas construir una solución sólida desde el inicio... │
│                                                              │
│   ┌─────────────────────┐  ┌─────────────────────┐          │
│   │  Contacto directo    │  │  Envíame un mensaje │          │
│   │                      │  │                     │          │
│   │  [📧] Email          │  │  Cuéntame brevemente│          │
│   │  mbarra.3690@...     │  │  sobre tu proyecto. │          │
│   │                      │  │                     │          │
│   │  [in] LinkedIn       │  │  Nombre *           │          │
│   │  linkedin.com/in/... │  │  [____________]     │          │
│   │                      │  │                     │          │
│   │  [🐙] GitHub         │  │  Email *            │          │
│   │  github.com/...      │  │  [____________]     │          │
│   │                      │  │                     │          │
│   │                      │  │  Mensaje *          │          │
│   │                      │  │  [              ]   │          │
│   │                      │  │  [              ]   │          │
│   │                      │  │                     │          │
│   │                      │  │  [Enviar mensaje]   │          │
│   │                      │  │                     │          │
│   │                      │  │  También puedes     │          │
│   │                      │  │  escribirme a...    │          │
│   └─────────────────────┘  └─────────────────────┘          │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### Estado interno

```tsx
type FormStatus = "idle" | "submitting" | "success" | "error";

const [formStatus, setFormStatus] = useState<FormStatus>("idle");
const [errorMessage, setErrorMessage] = useState<string>("");
```

### Datos de contacto

```tsx
const contactLinks = [
  {
    label: "Email",
    value: "mbarra.3690@gmail.com",
    href: "mailto:mbarra.3690@gmail.com",
    icon: EmailIcon,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/miguelbarrarios",
    href: "https://www.linkedin.com/in/miguelbarrarios/",
    icon: LinkedInIcon,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/mbarradev-debug",
    href: "https://github.com/mbarradev-debug",
    icon: GitHubIcon,
    external: true,
  },
];
```

### Flujo del formulario

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setFormStatus("submitting");
  setErrorMessage("");

  // 1. Extrae datos del form
  const formData = new FormData(form);
  const data = {
    nombre: formData.get("nombre"),
    email: formData.get("email"),
    mensaje: formData.get("mensaje"),
  };

  // 2. Envía a API
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // 3. Maneja respuesta
  if (!response.ok) {
    setFormStatus("error");
    // Auto-reset después de 5s
  } else {
    setFormStatus("success");
    form.reset();
    // Auto-reset después de 5s
  }
};
```

### Textos (i18n)

| Clave | Descripción |
|-------|-------------|
| `t.contact.label` | Label superior ("Conversemos") |
| `t.contact.title` | Título de la sección |
| `t.contact.description` | Descripción introductoria |
| `t.contact.directContactLabel` | Label "Contacto directo" |
| `t.contact.formTitle` | Título del formulario |
| `t.contact.formDescription` | Descripción del formulario |
| `t.contact.form.name` | Label campo nombre |
| `t.contact.form.namePlaceholder` | Placeholder nombre |
| `t.contact.form.email` | Label campo email |
| `t.contact.form.emailPlaceholder` | Placeholder email |
| `t.contact.form.message` | Label campo mensaje |
| `t.contact.form.messagePlaceholder` | Placeholder mensaje |
| `t.contact.form.submit` | Texto botón enviar |
| `t.contact.form.submitting` | Texto mientras envía |
| `t.contact.form.success` | Mensaje de éxito |
| `t.contact.form.error` | Mensaje de error |
| `t.contact.alternativeContact` | Texto alternativo |
| `t.contact.alternativeContactLink` | Texto del link alternativo |

### Micro-interacciones

- **Contact links**: Clase `.contact-link`
- **Form inputs**: Clase `.form-input`
- **Primary button**: Clase `.btn-primary`
- **Text link**: Clase `.text-link`

### Cómo modificar

| Cambio | Ubicación |
|--------|-----------|
| Textos | `src/i18n/es.ts` y `src/i18n/en.ts` → `contact` |
| Datos de contacto | Array `contactLinks` en el componente |
| Email destino | `app/api/contact/route.ts` → campo `to` |
| Validaciones | `app/api/contact/route.ts` |
| Añadir campo | Form HTML + API route + tipos |

---

## Componentes wrapper utilizados

### Section

Envuelve cada sección con fondo, padding y separador:

```tsx
<Section
  variant="primary"    // "primary" (bg-primary) | "secondary" (bg-secondary)
  spacing="relaxed"    // "compact" | "default" | "relaxed"
  separator="visible"  // "subtle" | "visible" | "none"
  id="sobre-mi"        // ID para navegación con anclas
>
```

### Container

Centra el contenido y limita su ancho a 1200px:

```tsx
<Container>
  {/* Contenido con max-w-[1200px] */}
</Container>
```

### AnimateOnScroll

Activa animación cuando el contenido entra en viewport:

```tsx
<AnimateOnScroll className="...">
  {/* Contenido que aparece con animación */}
</AnimateOnScroll>
```

---

## Uso de secciones en page.tsx

```tsx
export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ContactSection />
    </>
  );
}
```

El orden determina el flujo de scroll de la página.
