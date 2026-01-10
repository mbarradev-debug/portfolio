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

### 3. Configurar variables de entorno (opcional)

Para que el formulario de contacto envíe emails reales:

```bash
# Crear archivo .env.local
echo "RESEND_API_KEY=tu_api_key_aqui" > .env.local
```

Obtén tu API key en [resend.com](https://resend.com).

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

El servidor estará disponible en: **http://localhost:3000**

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Genera build de producción |
| `npm run start` | Ejecuta build de producción |
| `npm run lint` | Ejecuta ESLint para detectar errores |

---

## Estructura para desarrollo

```
portfolio/
├── app/                    # Páginas y API
│   ├── api/contact/        # Endpoint POST /api/contact
│   ├── globals.css         # Variables CSS y micro-interacciones
│   ├── animations.css      # Animaciones de entrada
│   ├── layout.tsx          # Layout raíz con i18n provider
│   └── page.tsx            # Página principal
│
├── components/             # Componentes React
│   ├── layout/             # Header, Footer, Container, Section
│   ├── sections/           # HeroSection, AboutSection, etc.
│   ├── ui/                 # AnimateOnScroll, LanguageSelector, SkipLink
│   ├── providers/          # I18nClientProvider
│   └── icons/              # Iconos SVG
│
├── src/i18n/               # Sistema de internacionalización
│   ├── index.tsx           # Provider + hook useI18n
│   ├── types.ts            # Interface Translations
│   ├── es.ts               # Traducciones español
│   └── en.ts               # Traducciones inglés
│
├── hooks/                  # Custom hooks
│   └── useScrollToSection.ts
│
└── public/                 # Archivos estáticos
    ├── images/
    ├── cv/
    └── [iconos PWA, robots.txt, sitemap.xml]
```

---

## Flujo de trabajo típico

### 1. Modificar textos

Los textos están centralizados en el sistema i18n:

```
src/i18n/
├── es.ts    ← Español
└── en.ts    ← Inglés
```

**Ejemplo: Cambiar el headline del Hero**

```typescript
// src/i18n/es.ts
export const es: Translations = {
  hero: {
    headline: "Nuevo headline aquí",
    // ...
  },
};

// src/i18n/en.ts
export const en: Translations = {
  hero: {
    headline: "New headline here",
    // ...
  },
};
```

### 2. Agregar una nueva traducción

1. Añade la clave en `types.ts`:

```typescript
// src/i18n/types.ts
export interface Translations {
  hero: {
    headline: string;
    newKey: string;  // ← Nueva clave
  };
  // ...
}
```

2. Añade el valor en ambos idiomas:

```typescript
// src/i18n/es.ts
hero: {
  newKey: "Valor en español",
},

// src/i18n/en.ts
hero: {
  newKey: "Value in English",
},
```

3. Usa en el componente:

```tsx
const { t } = useI18n();
return <p>{t.hero.newKey}</p>;
```

### 3. Agregar un nuevo componente

**Pasos:**

1. Crea el archivo en la carpeta correspondiente:
   - Layout: `components/layout/`
   - Secciones: `components/sections/`
   - UI reutilizable: `components/ui/`
   - Iconos: `components/icons/`

2. Si necesita interactividad, añade `"use client"` al inicio

3. Si necesita textos, usa el hook `useI18n`:

```tsx
"use client";

import { useI18n } from "@/i18n";

export default function MiComponente() {
  const { t } = useI18n();

  return <div>{t.seccion.clave}</div>;
}
```

4. Si necesita micro-interacción, añade clase CSS en `globals.css`

### 4. Agregar un icono

1. Añade el icono en `components/icons/index.tsx`:

```tsx
export function NuevoIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      {/* path del SVG */}
    </svg>
  );
}
```

2. Importa donde lo necesites:

```tsx
import { NuevoIcon } from "@/components/icons";
```

### 5. Agregar una tecnología al Stack

En `components/sections/StackSection.tsx`:

```tsx
const techCategories = [
  {
    name: "Frontend",
    items: [
      // ... existentes
      { nombre: "Nueva Tech", icon: NuevaTechIcon },  // ← Añadir
    ],
  },
];
```

Recuerda crear el icono primero si no existe.

### 6. Modificar colores

Los colores están en `globals.css`:

```css
@theme inline {
  --color-bg-primary: #0F1115;
  --color-accent: #3FBF9A;
  /* ... */
}
```

Cambiar aquí actualiza todo el sitio automáticamente.

### 7. Agregar micro-interacción

1. Define la clase base y estados en `globals.css`:

```css
.mi-elemento {
  transition:
    transform var(--duration-slow) var(--ease-snappy),
    background-color var(--duration-base) var(--ease-smooth);
  -webkit-tap-highlight-color: transparent;
}

/* Desktop hover */
@media (hover: hover) and (pointer: fine) {
  .mi-elemento:hover {
    transform: translateY(-2px);
    background-color: var(--color-bg-primary);
  }
}

/* Móvil tap */
@media (hover: none), (pointer: coarse) {
  .mi-elemento:active {
    transform: scale(0.98);
  }
}
```

2. Usa la clase en el componente:

```tsx
<div className="mi-elemento">Contenido</div>
```

---

## Trabajar con el formulario de contacto

### Flujo del formulario

```
Usuario envía form → POST /api/contact → Resend API → Email enviado
```

### Modificar email de destino

En `app/api/contact/route.ts`:

```typescript
const { error } = await resend.emails.send({
  from: "Portfolio Contact <onboarding@resend.dev>",
  to: "nuevo@email.com",  // ← Cambiar aquí
  // ...
});
```

### Añadir validación

En `app/api/contact/route.ts`:

```typescript
// Después de extraer los datos
if (mensaje.length < 10) {
  return NextResponse.json(
    { error: "El mensaje debe tener al menos 10 caracteres" },
    { status: 400 }
  );
}
```

### Añadir campo al formulario

1. Añade el HTML en `ContactSection.tsx`:

```tsx
<div>
  <label htmlFor="telefono">{t.contact.form.phone}</label>
  <input
    type="tel"
    id="telefono"
    name="telefono"
    className="form-input ..."
  />
</div>
```

2. Añade las traducciones en `es.ts` y `en.ts`

3. Procesa en la API:

```typescript
const { nombre, email, mensaje, telefono } = await request.json();
```

---

## Trabajar con animaciones

### Animaciones de entrada (Hero)

Usa las clases predefinidas:

```tsx
<div className="hero-animate hero-fade-up hero-delay-2">
  Contenido con animación
</div>
```

| Clase | Efecto |
|-------|--------|
| `hero-fade` | Fade in |
| `hero-fade-up` | Fade in + slide up |
| `hero-fade-zoom` | Fade in + scale |
| `hero-delay-0` a `hero-delay-5` | Delay escalonado |

### Animaciones scroll-triggered

Usa el wrapper `AnimateOnScroll`:

```tsx
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

<AnimateOnScroll className="...">
  <div>Este contenido aparece al hacer scroll</div>
</AnimateOnScroll>
```

### Animaciones personalizadas

Define en `animations.css`:

```css
@keyframes miAnimacion {
  0% { opacity: 0; transform: translateX(-20px); }
  100% { opacity: 1; transform: translateX(0); }
}

.mi-animacion {
  animation: miAnimacion 500ms var(--ease-snappy) forwards;
}
```

---

## Trabajar con el sistema i18n

### Acceder a traducciones

```tsx
"use client";

import { useI18n } from "@/i18n";

export default function MiComponente() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div>
      <p>Idioma actual: {locale}</p>
      <p>{t.seccion.clave}</p>
      <button onClick={() => setLocale("en")}>English</button>
    </div>
  );
}
```

### Estructura de traducciones

```typescript
// types.ts define la estructura
interface Translations {
  seccion: {
    clave: string;
    nested: {
      subClave: string;
    };
    array: string[];  // Para listas
  };
}
```

### Añadir nuevo idioma

1. Crea `src/i18n/fr.ts` (por ejemplo, francés)
2. Actualiza `types.ts`:

```typescript
export type Locale = "es" | "en" | "fr";
```

3. Importa en `src/i18n/index.tsx`:

```typescript
import { fr } from "./fr";

const translations: Record<Locale, Translations> = { es, en, fr };
```

4. Actualiza `LanguageSelector.tsx` para incluir el nuevo idioma

---

## Buenas prácticas

### TypeScript

- Usa tipos explícitos para props de componentes
- Evita `any`, prefiere `unknown` si es necesario
- Define interfaces para estructuras de datos

```tsx
interface MiComponenteProps {
  titulo: string;
  items: string[];
  onSelect?: (item: string) => void;
}

export default function MiComponente({ titulo, items, onSelect }: MiComponenteProps) {
  // ...
}
```

### Componentes

- Un archivo por componente
- Nombres en PascalCase
- Client Components solo cuando es necesario
- Evita prop drilling, usa Context para estado global

### Estilos

- Usa clases de Tailwind, no CSS inline
- Usa variables CSS del sistema (`--color-accent`, etc.)
- Define micro-interacciones en `globals.css`
- Respeta `prefers-reduced-motion`

### Accesibilidad

- Siempre incluye `aria-label` en botones sin texto visible
- Usa HTML semántico (`<nav>`, `<main>`, `<section>`, etc.)
- Mantén contraste adecuado (WCAG AA mínimo)
- Asegura touch targets de 44px mínimo en móvil

### Commits

Usa mensajes descriptivos:

```bash
feat: añadir sección de proyectos
fix: corregir validación de email en formulario
style: ajustar espaciado en hero mobile
refactor: extraer lógica de animación a hook
docs: actualizar guía de desarrollo
```

---

## Solución de problemas comunes

### El servidor no inicia

```bash
# Elimina node_modules y reinstala
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Errores de TypeScript

```bash
# Verifica errores
npm run lint

# Si persisten, reinicia el servidor de TypeScript en VS Code:
# Cmd/Ctrl + Shift + P → "TypeScript: Restart TS Server"
```

### Cambios en CSS no se reflejan

1. Revisa que el archivo sea `globals.css` o `animations.css`
2. Verifica que las clases estén definidas correctamente
3. Hard refresh: `Cmd/Ctrl + Shift + R`

### Hydration mismatch

Si ves errores de hidratación:
- Verifica que los Client Components no dependan de valores que cambian entre servidor y cliente (como `localStorage`, `Date.now()`)
- El sistema i18n usa `useSyncExternalStore` para evitar esto

### Formulario no envía

1. Verifica que `RESEND_API_KEY` esté en `.env.local`
2. Revisa los logs del servidor en la terminal
3. Verifica que el email de destino sea válido

---

## Despliegue

### Vercel (recomendado)

1. Conecta el repositorio a Vercel
2. Configura variables de entorno:
   - `RESEND_API_KEY`
3. Deploy automático en cada push a main

### Build local

```bash
npm run build
npm run start
```

Verifica que no hay errores de build antes de hacer deploy.

---

## Recursos adicionales

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/)
- [Resend Docs](https://resend.com/docs)
