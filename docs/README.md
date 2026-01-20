# Documentación del Proyecto Portfolio

**Versión del documento:** 1.0.0
**Última actualización:** Enero 2026
**Versión del proyecto:** 1.0.0

---

## Tabla de Contenidos

1. [Introducción al proyecto](#1-introducción-al-proyecto)
2. [Tecnologías utilizadas](#2-tecnologías-utilizadas)
3. [Requisitos previos](#3-requisitos-previos)
4. [Instalación del proyecto](#4-instalación-del-proyecto)
5. [Ejecución en entorno de desarrollo](#5-ejecución-en-entorno-de-desarrollo)
6. [Estructura del proyecto](#6-estructura-del-proyecto)
7. [Flujo general de la aplicación](#7-flujo-general-de-la-aplicación)
8. [Estilos y diseño](#8-estilos-y-diseño)
9. [Componentes y layout](#9-componentes-y-layout)
10. [Buenas prácticas del proyecto](#10-buenas-prácticas-del-proyecto)
11. [Build y despliegue](#11-build-y-despliegue)
12. [Versionado](#12-versionado)
13. [Cómo reutilizar este proyecto como base](#13-cómo-reutilizar-este-proyecto-como-base)
14. [Cierre](#14-cierre)

---

## 1. Introducción al proyecto

### ¿Qué es este proyecto?

Este proyecto es un **portafolio profesional web** desarrollado con tecnologías modernas de desarrollo frontend. Un portafolio profesional es un sitio web personal que presenta la información profesional de una persona: su experiencia laboral, habilidades técnicas, proyectos realizados y formas de contacto.

### ¿Para qué sirve?

El propósito principal de este proyecto es doble:

1. **Como producto final:** Funciona como un sitio web que presenta de manera profesional la trayectoria de un ingeniero de software, permitiendo a potenciales empleadores, clientes o colaboradores conocer su perfil técnico.

2. **Como template educativo:** Sirve como base de aprendizaje y punto de partida para desarrolladores que quieran crear sus propios portafolios o aplicaciones web similares.

### ¿Qué tipo de aplicación es?

Es una **aplicación web estática de página única** (Single Page Application o SPA). Esto significa que:

- Todo el contenido se muestra en una sola página HTML
- La navegación entre secciones se realiza mediante desplazamiento (scroll) suave
- No requiere un servidor backend para funcionar (aunque puede desplegarse en uno)
- El contenido no cambia dinámicamente desde una base de datos

### ¿Qué problema resuelve?

Resolver la necesidad de presentar información profesional de manera organizada, accesible y visualmente atractiva. Un archivo PDF o un perfil de LinkedIn tienen limitaciones en cuanto a diseño y personalización. Un portafolio web permite:

- Control total sobre la presentación visual
- Demostración de habilidades técnicas mediante el propio sitio
- Accesibilidad desde cualquier dispositivo con navegador
- Posibilidad de incluir elementos interactivos

### ¿Para quién está pensada?

- **Usuarios finales:** Reclutadores, gerentes de contratación, clientes potenciales o cualquier persona interesada en conocer el perfil profesional del autor.
- **Desarrolladores:** Quienes buscan un ejemplo práctico de cómo estructurar una aplicación web moderna con React y Next.js.

---

## 2. Tecnologías utilizadas

Esta sección explica cada tecnología presente en el proyecto, su función específica y por qué tiene sentido usarlas en conjunto.

### 2.1 Next.js (versión 16.1.4)

**¿Qué es?**
Next.js es un framework (marco de trabajo) construido sobre React. Un framework es un conjunto de herramientas, convenciones y código preescrito que facilita el desarrollo de aplicaciones.

**¿Para qué se usa en este proyecto?**
- Proporciona la estructura base de la aplicación
- Maneja el sistema de rutas (aunque en este proyecto solo hay una página)
- Optimiza automáticamente las fuentes tipográficas de Google
- Genera el HTML final optimizado para producción
- Proporciona un servidor de desarrollo con recarga automática

**¿Por qué Next.js y no solo React?**
React por sí solo es una biblioteca para crear interfaces. Next.js añade:
- Sistema de archivos como rutas (cada archivo en `app/` puede ser una página)
- Optimización automática de imágenes y fuentes
- Generación de sitios estáticos o con servidor
- Configuración preestablecida de TypeScript, ESLint y otras herramientas

### 2.2 React (versión 19.2.3)

**¿Qué es?**
React es una biblioteca de JavaScript creada por Meta (Facebook) para construir interfaces de usuario. Su concepto central son los "componentes": piezas de interfaz reutilizables y autocontenidas.

**¿Para qué se usa en este proyecto?**
- Crear cada sección del portafolio como un componente independiente
- Manejar la interactividad (como el menú móvil que se abre y cierra)
- Organizar la interfaz de manera declarativa (describes qué quieres ver, no cómo construirlo paso a paso)

**Concepto clave - Componentes:**
En lugar de escribir todo el HTML en un solo archivo, React permite dividir la interfaz en piezas. Por ejemplo, este proyecto tiene componentes como `Header`, `Footer`, `Hero`, `Experience`, etc. Cada uno es un archivo independiente que se puede modificar sin afectar a los demás.

### 2.3 TypeScript (versión 5)

**¿Qué es?**
TypeScript es un lenguaje que extiende JavaScript añadiendo tipos estáticos. Los "tipos" son una forma de describir qué forma tienen los datos en tu programa.

**¿Para qué se usa en este proyecto?**
- Detectar errores antes de ejecutar el código (en tiempo de compilación)
- Documentar implícitamente las estructuras de datos
- Mejorar la experiencia de desarrollo con autocompletado inteligente

**Ejemplo práctico del proyecto:**
En el archivo `Experience.tsx` existe esta definición:

```typescript
interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}
```

Esto indica que cada elemento de experiencia debe tener: un `role` (texto), una `company` (texto), un `period` (texto), una `description` (lista de textos), y opcionalmente un `isCurrent` (verdadero o falso). Si intentas crear un objeto que no cumpla esta estructura, TypeScript mostrará un error.

### 2.4 Tailwind CSS (versión 4)

**¿Qué es?**
Tailwind CSS es un framework de estilos "utility-first" (basado en utilidades). En lugar de escribir CSS tradicional con clases personalizadas, usas clases predefinidas que hacen una sola cosa cada una.

**¿Para qué se usa en este proyecto?**
- Aplicar estilos directamente en el HTML/JSX
- Mantener consistencia visual mediante tokens de diseño
- Crear diseños responsivos (que se adaptan a diferentes tamaños de pantalla)

**Ejemplo comparativo:**

CSS tradicional:
```css
.boton-principal {
  display: inline-flex;
  height: 3rem;
  padding: 0 2rem;
  background-color: #2563EB;
  color: white;
  border-radius: 0.5rem;
}
```

Con Tailwind CSS:
```html
<button class="inline-flex h-12 px-8 bg-primary text-white rounded-lg">
```

Cada clase hace una cosa: `inline-flex` define el tipo de display, `h-12` la altura, `px-8` el padding horizontal, etc.

### 2.5 Lucide React (versión 0.562.0)

**¿Qué es?**
Lucide es una biblioteca de iconos de código abierto. Lucide React es su versión optimizada para React, donde cada icono es un componente.

**¿Para qué se usa en este proyecto?**
- Mostrar iconos en la sección de Stack Técnico (Monitor, Server, Cloud, Wrench)
- Icono de correo electrónico en el Footer

**Ejemplo de uso:**
```tsx
import { Mail } from "lucide-react";

<Mail size={18} strokeWidth={1.5} />
```

### 2.6 ESLint (versión 9)

**¿Qué es?**
ESLint es una herramienta de análisis estático de código. Revisa el código fuente buscando patrones problemáticos o que no sigan ciertas convenciones.

**¿Para qué se usa en este proyecto?**
- Detectar errores potenciales (variables no usadas, imports faltantes)
- Mantener un estilo de código consistente
- Aplicar las reglas recomendadas por Next.js

### 2.7 PostCSS

**¿Qué es?**
PostCSS es una herramienta para transformar CSS con JavaScript. Funciona como un procesador que puede modificar, optimizar o extender el CSS.

**¿Para qué se usa en este proyecto?**
- Integrar Tailwind CSS en el proceso de construcción
- Procesar el archivo `globals.css` y generar el CSS final

### ¿Por qué estas tecnologías funcionan bien juntas?

Este stack tecnológico sigue un patrón común en el desarrollo web moderno:

```
Next.js (estructura y optimización)
    └── React (componentes e interactividad)
        └── TypeScript (seguridad de tipos)
            └── Tailwind CSS (estilos)
```

- **Next.js** proporciona la infraestructura y React es su sistema de componentes nativo
- **TypeScript** se integra perfectamente con ambos mediante configuración preestablecida
- **Tailwind CSS** funciona bien con el modelo de componentes porque los estilos quedan junto al markup
- **ESLint** y **PostCSS** son herramientas de soporte que mejoran la calidad y el flujo de trabajo

---

## 3. Requisitos previos

Antes de trabajar con este proyecto, necesitas tener instaladas ciertas herramientas en tu computadora.

### 3.1 Node.js

**¿Qué es?**
Node.js es un entorno de ejecución que permite ejecutar JavaScript fuera del navegador. Es necesario para ejecutar las herramientas de desarrollo y el servidor local.

**Versión requerida:** 18.0.0 o superior (recomendado: 20.x LTS)

**Cómo verificar si está instalado:**
```bash
node --version
```

Si el comando muestra un número de versión (ejemplo: `v20.10.0`), Node.js está instalado.

**Cómo instalarlo:**
- **Windows/macOS:** Descarga el instalador desde [nodejs.org](https://nodejs.org)
- **Linux (Ubuntu/Debian):**
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
  sudo apt-get install -y nodejs
  ```

### 3.2 npm (Node Package Manager)

**¿Qué es?**
npm es el gestor de paquetes de Node.js. Permite instalar, actualizar y gestionar las dependencias (bibliotecas externas) del proyecto.

**Versión requerida:** 9.0.0 o superior

**Cómo verificar:**
```bash
npm --version
```

npm se instala automáticamente con Node.js, por lo que si instalaste Node.js, ya tienes npm.

### 3.3 Git (recomendado)

**¿Qué es?**
Git es un sistema de control de versiones. Permite rastrear cambios en el código, colaborar con otros desarrolladores y mantener un historial del proyecto.

**Cómo verificar:**
```bash
git --version
```

**Cómo instalarlo:**
- **Windows:** Descarga desde [git-scm.com](https://git-scm.com)
- **macOS:** Ejecuta `git` en la terminal (macOS ofrecerá instalarlo)
- **Linux:** `sudo apt-get install git`

### 3.4 Editor de código

Se recomienda Visual Studio Code (VS Code) por su excelente soporte para TypeScript, React y Tailwind CSS.

**Extensiones recomendadas para VS Code:**
- **ES7+ React/Redux/React-Native snippets** - Atajos para código React
- **Tailwind CSS IntelliSense** - Autocompletado para clases de Tailwind
- **TypeScript Importer** - Importación automática de módulos
- **ESLint** - Integración con el linter del proyecto

### 3.5 Conocimientos que ayudan (pero no son obligatorios)

No necesitas dominar estos temas para empezar, pero te ayudará tener nociones básicas de:

- **HTML:** La estructura básica de páginas web (etiquetas, atributos)
- **CSS:** Cómo funcionan los estilos (selectores, propiedades)
- **JavaScript:** Conceptos básicos (variables, funciones, arrays, objetos)
- **Terminal/Línea de comandos:** Cómo navegar entre carpetas y ejecutar comandos

---

## 4. Instalación del proyecto

Esta sección guía paso a paso el proceso de obtener el proyecto y prepararlo para trabajar con él.

### 4.1 Clonar el repositorio

Si el proyecto está en un repositorio Git (como GitHub), el primer paso es descargarlo a tu computadora.

**¿Qué significa "clonar"?**
Clonar es crear una copia local de un repositorio remoto. A diferencia de una descarga simple, clonar preserva todo el historial de cambios y la conexión con el repositorio original.

**Comando:**
```bash
git clone <URL_DEL_REPOSITORIO>
```

Por ejemplo:
```bash
git clone https://github.com/usuario/portfolio.git
```

**¿Qué sucede?**
1. Git contacta al servidor donde está el repositorio
2. Descarga todos los archivos y el historial de cambios
3. Crea una carpeta con el nombre del proyecto (`portfolio`)
4. Configura la conexión con el repositorio remoto

### 4.2 Navegar a la carpeta del proyecto

Una vez clonado, debes entrar a la carpeta del proyecto:

```bash
cd portfolio
```

El comando `cd` significa "change directory" (cambiar directorio). Ahora la terminal está "dentro" de la carpeta del proyecto.

### 4.3 Instalar las dependencias

**¿Qué son las dependencias?**
Las dependencias son bibliotecas externas que el proyecto necesita para funcionar. Están listadas en el archivo `package.json`. Incluyen React, Next.js, Tailwind CSS y todas las demás herramientas.

**Comando:**
```bash
npm install
```

**¿Qué hace este comando?**
1. Lee el archivo `package.json` para ver qué paquetes se necesitan
2. Lee `package-lock.json` para conocer las versiones exactas
3. Descarga cada paquete desde el registro de npm (npmjs.com)
4. Guarda los paquetes en la carpeta `node_modules`
5. Verifica que todas las dependencias sean compatibles entre sí

**¿Qué deberías ver?**
La terminal mostrará el progreso de la instalación. Puede tomar entre 30 segundos y varios minutos dependiendo de tu conexión a internet. Al finalizar verás algo como:

```
added 287 packages in 45s
```

**Archivos que se generan:**
- **`node_modules/`**: Carpeta que contiene todas las dependencias descargadas. Esta carpeta:
  - Es grande (puede superar los 200MB)
  - No debe subirse al repositorio (está en `.gitignore`)
  - Se puede eliminar y regenerar con `npm install`

### 4.4 Verificar la instalación

Para confirmar que todo se instaló correctamente, puedes ejecutar:

```bash
npm run lint
```

Este comando ejecuta ESLint sobre el código. Si no muestra errores, significa que:
- Las dependencias están instaladas correctamente
- El código actual pasa las validaciones

---

## 5. Ejecución en entorno de desarrollo

El entorno de desarrollo es donde trabajas activamente en el código. Es diferente al entorno de producción, que es donde el sitio está disponible para usuarios finales.

### 5.1 Iniciar el servidor de desarrollo

**Comando:**
```bash
npm run dev
```

**¿Qué hace este comando?**

Internamente ejecuta `next dev`, que:

1. **Inicia un servidor web local:** Crea un servidor HTTP en tu computadora
2. **Compila el código TypeScript:** Convierte el código a JavaScript que el navegador entiende
3. **Procesa los estilos:** Tailwind CSS analiza las clases usadas y genera el CSS necesario
4. **Habilita Hot Module Replacement (HMR):** Cuando modificas un archivo, el navegador se actualiza automáticamente sin recargar la página completa
5. **Habilita Fast Refresh:** Preserva el estado de los componentes React durante las actualizaciones

### 5.2 ¿Qué deberías ver en la terminal?

```
   ▲ Next.js 16.1.4
   - Local:        http://localhost:3000
   - Environments: .env

 ✓ Starting...
 ✓ Ready in 2.3s
```

### 5.3 Acceder a la aplicación

Abre un navegador web y visita:

```
http://localhost:3000
```

**¿Qué es localhost?**
`localhost` es el nombre que tu computadora usa para referirse a sí misma. Es equivalente a la dirección IP `127.0.0.1`. Cuando accedes a `localhost:3000`, estás accediendo a un servidor que corre en tu propia máquina.

**¿Por qué el puerto 3000?**
Un puerto es como una "puerta" de red. El puerto 3000 es la convención que usa Next.js por defecto para desarrollo. Si ese puerto estuviera ocupado, Next.js usaría 3001, 3002, etc.

### 5.4 ¿Qué deberías ver en el navegador?

El portafolio completo con:
- Header fijo en la parte superior con navegación
- Sección Hero con el título principal y botones
- Sección de Filosofía
- Timeline de Experiencia
- Grid de Proyectos Destacados
- Sección de Stack Técnico
- Sección de Educación
- Footer con información de contacto

### 5.5 Flujo de trabajo de desarrollo

1. Mantienes la terminal abierta con `npm run dev` ejecutándose
2. Abres el proyecto en tu editor de código
3. Modificas cualquier archivo (`.tsx`, `.css`, etc.)
4. Al guardar, el navegador se actualiza automáticamente
5. Ves los cambios reflejados instantáneamente

### 5.6 Detener el servidor

Para detener el servidor de desarrollo, ve a la terminal donde está corriendo y presiona:

```
Ctrl + C
```

---

## 6. Estructura del proyecto

Esta sección explica cada carpeta y archivo del proyecto, qué contiene y cómo se relaciona con el resto.

### 6.1 Vista general

```
portfolio/
├── app/                    # Código fuente de la aplicación Next.js
├── components/             # Componentes React reutilizables
├── config/                 # Configuración centralizada del sitio
├── lib/                    # Utilidades y funciones auxiliares
├── types/                  # Definiciones de tipos TypeScript
├── public/                 # Archivos estáticos (imágenes, etc.)
├── reference/              # Documentación de referencia del proyecto
├── prompts/                # Guías para automatización con IA
├── node_modules/           # Dependencias instaladas (generado)
├── .next/                  # Archivos de build (generado)
├── package.json            # Configuración del proyecto y dependencias
├── tsconfig.json           # Configuración de TypeScript
├── next.config.ts          # Configuración de Next.js
├── postcss.config.mjs      # Configuración de PostCSS
├── eslint.config.mjs       # Configuración de ESLint
└── .gitignore              # Archivos ignorados por Git
```

### 6.2 Carpeta `app/` - El núcleo de la aplicación

Esta carpeta contiene el código principal de la aplicación usando el sistema "App Router" de Next.js.

```
app/
├── layout.tsx      # Estructura HTML base que envuelve todas las páginas
├── page.tsx        # La página principal (ruta "/")
├── globals.css     # Estilos globales y configuración de Tailwind
└── favicon.ico     # Icono que aparece en la pestaña del navegador
```

**`layout.tsx` - El layout raíz:**

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

Este archivo define la estructura que envuelve a todas las páginas:
- Configura el idioma del documento (`lang="es"`)
- Carga las fuentes tipográficas (Space Grotesk e Inter)
- Renderiza el Header arriba de todo
- Coloca el contenido de cada página en el `main`
- Renderiza el Footer al final

**`page.tsx` - La página principal:**

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Experience />
      <FeaturedProjects />
      <TechnicalInventory />
      <Education />
    </>
  );
}
```

Este archivo define qué secciones aparecen en la página principal y en qué orden.

**`globals.css` - Estilos globales:**

Contiene:
- Variables CSS (colores, tipografías)
- Configuración del tema de Tailwind CSS
- Estilos base aplicados a todo el documento
- La clase utilitaria `.glass` para el efecto de cristal

### 6.3 Carpeta `components/` - Componentes React

Los componentes están organizados en dos subcarpetas según su propósito:

```
components/
├── ui/                     # Componentes de interfaz reutilizables
│   ├── Header.tsx          # Barra de navegación superior
│   ├── Footer.tsx          # Pie de página con contacto
│   ├── Container.tsx       # Contenedor con ancho máximo centrado
│   ├── AnimatedSection.tsx # Wrapper para animaciones al scroll
│   └── index.ts            # Exporta todos los componentes UI
│
└── sections/               # Secciones específicas del portafolio
    ├── Hero.tsx            # Sección principal de bienvenida
    ├── Philosophy.tsx      # Sección de filosofía profesional
    ├── Experience.tsx      # Timeline de experiencia laboral
    ├── FeaturedProjects.tsx # Grid de proyectos destacados
    ├── TechnicalInventory.tsx # Listado de habilidades técnicas
    ├── Education.tsx       # Formación académica
    └── index.ts            # Exporta todos los componentes de sección
```

**Diferencia entre `ui/` y `sections/`:**

- **`ui/`**: Componentes genéricos que podrían usarse en cualquier proyecto. No contienen contenido específico del portafolio.
- **`sections/`**: Componentes específicos de este portafolio. Contienen el contenido real (textos, datos de experiencia, etc.).

**Archivos `index.ts` (barrel exports):**

Estos archivos simplifican las importaciones. En lugar de:

```tsx
import { Header } from "@/components/ui/Header";
import { Footer } from "@/components/ui/Footer";
```

Puedes escribir:

```tsx
import { Header, Footer } from "@/components/ui";
```

### 6.4 Carpeta `config/` - Configuración centralizada

```
config/
├── site.ts     # Datos del sitio (nombre, descripción, links)
└── index.ts    # Re-exporta la configuración
```

**`site.ts` - Configuración del sitio:**

```typescript
export const siteConfig = {
  name: "Miguel Barra — Full Stack Software Engineer",
  description: "Portafolio profesional de Miguel Barra...",
  url: "https://example.com",
  author: {
    name: "Miguel Barra",
    email: "mbarra.3690@gmail.com",
  },
  links: {
    github: "https://github.com/mbarradev-debug",
    linkedin: "https://www.linkedin.com/in/miguelbarrarios",
  },
} as const;
```

Centralizar esta información tiene ventajas:
- Si cambias tu email, solo lo modificas en un lugar
- Otros componentes pueden importar estos datos sin repetirlos
- Facilita la personalización cuando alguien reutiliza el proyecto

### 6.5 Carpetas `lib/` y `types/`

```
lib/
└── .gitkeep    # Archivo vacío para preservar la carpeta en Git

types/
└── .gitkeep    # Archivo vacío para preservar la carpeta en Git
```

Estas carpetas están preparadas para expansión futura:
- **`lib/`**: Para funciones utilitarias (formateo de fechas, helpers, etc.)
- **`types/`**: Para tipos TypeScript compartidos entre componentes

Actualmente están vacías (solo contienen `.gitkeep`), pero la estructura está lista.

### 6.6 Carpeta `public/` - Archivos estáticos

```
public/
└── images/
    └── .gitkeep
```

Los archivos en `public/` son accesibles directamente por URL. Por ejemplo, si agregas una imagen en `public/images/foto.jpg`, será accesible en `http://localhost:3000/images/foto.jpg`.

### 6.7 Carpeta `reference/` - Documentación de referencia

```
reference/
├── content/
│   └── portfolio.md    # Contenido maestro del portafolio
└── design/
    └── portfolio.html  # Prototipo HTML del diseño
```

Esta carpeta contiene documentación de referencia para el desarrollo:
- **`portfolio.md`**: Define el contenido textual que debe aparecer en el portafolio
- **`portfolio.html`**: Un prototipo HTML que sirvió como referencia para el diseño

### 6.8 Archivos de configuración raíz

**`package.json` - Manifiesto del proyecto:**

```json
{
  "name": "portfolio",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint"
  },
  "dependencies": { ... },
  "devDependencies": { ... }
}
```

Define:
- Nombre y versión del proyecto
- Scripts disponibles (`npm run dev`, etc.)
- Dependencias de producción y desarrollo

**`tsconfig.json` - Configuración de TypeScript:**

Configura cómo TypeScript compila el código:
- Target ES2017 (versión de JavaScript generado)
- Modo estricto habilitado
- Alias de paths (`@/*` apunta a la raíz del proyecto)

**`next.config.ts` - Configuración de Next.js:**

Actualmente vacío (usa valores por defecto). Aquí se configurarían opciones como redirecciones, variables de entorno, etc.

**`postcss.config.mjs` - Configuración de PostCSS:**

```javascript
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

Configura PostCSS para procesar Tailwind CSS.

**`eslint.config.mjs` - Configuración de ESLint:**

Usa la configuración recomendada por Next.js para TypeScript.

**`.gitignore` - Archivos ignorados:**

Lista archivos y carpetas que Git no debe rastrear:
- `node_modules/` (dependencias descargadas)
- `.next/` (archivos de build)
- `.env*` (variables de entorno con información sensible)

---

## 7. Flujo general de la aplicación

Esta sección explica cómo funciona la aplicación desde que el usuario la abre hasta que ve el contenido final.

### 7.1 Diagrama de flujo simplificado

```
Usuario visita localhost:3000
         │
         ▼
    Next.js recibe la petición
         │
         ▼
    Busca el archivo de layout (app/layout.tsx)
         │
         ▼
    Busca la página correspondiente (app/page.tsx)
         │
         ▼
    Renderiza el árbol de componentes:

    RootLayout
    ├── Header
    ├── main
    │   └── Home (page.tsx)
    │       ├── Hero
    │       ├── Philosophy
    │       ├── Experience
    │       ├── FeaturedProjects
    │       ├── TechnicalInventory
    │       └── Education
    └── Footer
         │
         ▼
    Envía el HTML al navegador
         │
         ▼
    El navegador muestra la página
    y ejecuta el JavaScript (hidratación)
```

### 7.2 Punto de entrada: `app/layout.tsx`

Cuando Next.js arranca, lo primero que procesa es el layout raíz. Este archivo:

1. **Importa las fuentes de Google:**
   ```tsx
   const spaceGrotesk = Space_Grotesk({
     variable: "--font-display",
     subsets: ["latin"],
   });
   ```
   Next.js descarga y optimiza estas fuentes automáticamente.

2. **Define los metadatos:**
   ```tsx
   export const metadata: Metadata = {
     title: siteConfig.name,
     description: siteConfig.description,
   };
   ```
   Estos datos aparecen en la pestaña del navegador y en los resultados de búsqueda.

3. **Construye la estructura HTML:**
   ```tsx
   <html lang="es" className="dark">
     <body className={`${spaceGrotesk.variable} ${inter.variable}`}>
       <Header />
       <main>{children}</main>
       <Footer />
     </body>
   </html>
   ```
   - `lang="es"` indica que el contenido está en español
   - `className="dark"` activa el modo oscuro
   - Las variables de fuente se inyectan en el body
   - `{children}` es donde se renderiza el contenido de cada página

### 7.3 Renderizado de la página: `app/page.tsx`

El componente `Home` se renderiza donde aparece `{children}` en el layout:

```tsx
export default function Home() {
  return (
    <>
      <Hero />
      <Philosophy />
      <Experience />
      <FeaturedProjects />
      <TechnicalInventory />
      <Education />
    </>
  );
}
```

Cada componente de sección se renderiza en orden, creando el flujo vertical de la página.

### 7.4 Componentes del cliente vs servidor

Next.js distingue entre:

**Server Components (por defecto):**
- Se renderizan en el servidor
- No pueden usar hooks de React (`useState`, `useEffect`)
- Envían HTML puro al navegador
- Ejemplos en este proyecto: `Hero`, `Philosophy`, `Experience`, `Education`

**Client Components:**
- Se marcan con `"use client"` al inicio del archivo
- Pueden usar interactividad (estado, efectos, eventos)
- Se "hidratan" en el navegador (React toma control del HTML)
- Ejemplos en este proyecto: `Header` (menú móvil), `AnimatedSection` (animaciones)

### 7.5 El proceso de hidratación

1. El servidor genera HTML estático y lo envía al navegador
2. El navegador muestra el HTML inmediatamente (el usuario ve el contenido)
3. React carga en el navegador
4. React "hidrata" la página: conecta los event listeners y habilita la interactividad
5. Ahora el menú móvil funciona, las animaciones se activan, etc.

### 7.6 Navegación interna

Este proyecto usa navegación por anclas (hashes):

```html
<a href="#experience">Experiencia</a>
```

Cuando el usuario hace clic:
1. El navegador busca el elemento con `id="experience"`
2. Hace scroll suave hasta ese elemento (definido en CSS con `scroll-behavior: smooth`)
3. La URL cambia a `localhost:3000/#experience`

No hay recarga de página ni navegación a una ruta diferente.

### 7.7 Animaciones al scroll

El componente `AnimatedSection` usa la Intersection Observer API:

```tsx
useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(element);
      }
    },
    { threshold: 0.1 }
  );
  observer.observe(element);
}, []);
```

1. Crea un observador que vigila cuando el elemento entra al viewport
2. Cuando el 10% del elemento es visible (`threshold: 0.1`), activa `isVisible`
3. El CSS transiciona de `opacity-0 translate-y-6` a `opacity-100 translate-y-0`
4. El observador se desconecta (la animación solo ocurre una vez)

---

## 8. Estilos y diseño

### 8.1 Sistema de estilos del proyecto

Este proyecto utiliza un enfoque híbrido:

1. **Tailwind CSS:** Para la mayoría de los estilos, aplicados directamente en los componentes
2. **CSS Variables (Custom Properties):** Para definir tokens de diseño reutilizables
3. **CSS Global:** Para estilos base y configuraciones que afectan todo el documento

### 8.2 Tokens de diseño en `globals.css`

Los tokens de diseño son valores centralizados que definen el sistema visual:

```css
:root {
  /* Colores primarios */
  --color-primary: #2563EB;      /* Azul principal */
  --color-primary-dark: #1d4ed8; /* Azul para hover */

  /* Fondos */
  --color-bg-dark: #0A0A0A;      /* Fondo principal */
  --color-bg-deep: #050505;      /* Fondo de secciones alternas */
  --color-bg-footer: #000000;    /* Fondo del footer */

  /* Textos */
  --color-text-light: #F3F4F6;   /* Texto principal (casi blanco) */
  --color-text-dim: #9CA3AF;     /* Texto secundario (gris) */

  /* Bordes */
  --color-border-dim: #1F2937;   /* Borde sutil */
}
```

**¿Por qué usar tokens?**
- Consistencia: El mismo azul se usa en botones, links, iconos
- Mantenibilidad: Cambiar un color en un lugar lo actualiza en toda la aplicación
- Documentación implícita: Los nombres semánticos (`primary`, `text-dim`) describen el propósito

### 8.3 Configuración de Tailwind CSS 4

Tailwind CSS 4 usa una sintaxis diferente a versiones anteriores. La configuración del tema se hace directamente en CSS:

```css
@theme inline {
  --color-primary: var(--color-primary);
  --color-bg-dark: var(--color-bg-dark);
  --font-display: var(--font-display), "Space Grotesk", sans-serif;
  --font-body: var(--font-body), "Inter", sans-serif;
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
}
```

Esto permite usar clases como:
- `bg-primary` → aplica `--color-primary` como fondo
- `text-text-dim` → aplica `--color-text-dim` como color de texto
- `font-display` → aplica la tipografía Space Grotesk
- `rounded-md` → aplica border-radius de 0.5rem

### 8.4 Estilos base globales

```css
html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--color-bg-dark);
  color: var(--color-text-light);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.1;
}
```

Estos estilos establecen los valores por defecto para todo el documento:
- Scroll suave al navegar por anclas
- Tipografía Inter para texto general
- Tipografía Space Grotesk para títulos
- Fondo oscuro y texto claro por defecto

### 8.5 Estados de accesibilidad

```css
:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
```

Cuando un usuario navega con teclado (Tab), los elementos enfocados muestran un borde azul visible. Esto es importante para accesibilidad.

### 8.6 Utilidad `.glass`

```css
.glass {
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

Esta clase crea un efecto de "cristal esmerilado" que se usa en el header:
- Fondo semitransparente
- Desenfoque del contenido detrás (blur)
- El prefijo `-webkit-` asegura compatibilidad con Safari

### 8.7 Aplicación de estilos en componentes

**Ejemplo: Botón primario en Hero.tsx**

```tsx
<a
  href="#work"
  className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-8 text-sm font-semibold text-white transition-all duration-200 ease-out hover:bg-primary-dark hover:scale-[1.02] active:scale-100"
>
  Ver proyectos
</a>
```

Desglose de las clases:
- `inline-flex h-12 items-center justify-center` → Layout del botón
- `rounded-lg` → Esquinas redondeadas
- `bg-primary` → Fondo azul primario
- `px-8` → Padding horizontal
- `text-sm font-semibold text-white` → Tipografía
- `transition-all duration-200 ease-out` → Transición suave
- `hover:bg-primary-dark` → Fondo más oscuro al pasar el mouse
- `hover:scale-[1.02]` → Crece ligeramente al hover
- `active:scale-100` → Vuelve a tamaño normal al click

### 8.8 Diseño responsivo

Tailwind usa prefijos de breakpoint para aplicar estilos según el tamaño de pantalla:

```tsx
<h1 className="text-4xl md:text-6xl lg:text-7xl">
```

- `text-4xl` → Tamaño base (móviles)
- `md:text-6xl` → A partir de 768px (tablets)
- `lg:text-7xl` → A partir de 1024px (desktop)

El enfoque es "mobile-first": primero defines el estilo móvil, luego añades modificaciones para pantallas más grandes.

### 8.9 Convenciones de espaciado

El proyecto usa una escala de espaciado consistente:

- `gap-4` → 1rem (16px) de separación
- `gap-6` → 1.5rem (24px) de separación
- `gap-8` → 2rem (32px) de separación
- `py-16 md:py-24` → Padding vertical que aumenta en pantallas grandes

---

## 9. Componentes y layout

### 9.1 ¿Qué es un layout?

Un layout es una estructura visual que se repite en múltiples páginas. Define elementos comunes como:
- Header (navegación superior)
- Footer (pie de página)
- Contenedor de contenido principal
- Estilos base compartidos

En Next.js, el archivo `layout.tsx` define esta estructura. El contenido de cada página se renderiza donde aparece `{children}`.

### 9.2 El layout raíz (`app/layout.tsx`)

```tsx
export default function RootLayout({ children }) {
  return (
    <html lang="es" className="dark">
      <body className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}>
        <Header />
        <main className="w-full flex flex-col pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
```

**Responsabilidades del layout:**
1. Establecer el idioma y modo de color del documento
2. Inyectar las variables de fuentes tipográficas
3. Renderizar el Header que permanece visible durante toda la navegación
4. Proporcionar un contenedor `main` para el contenido
5. Renderizar el Footer al final de la página

**`pt-16` en el main:**
El header tiene posición fija (`fixed`). Sin este padding-top, el contenido quedaría detrás del header. Los 4rem (16 × 0.25rem) compensan exactamente la altura del header.

### 9.3 Componente Container

```tsx
export function Container({ children, className = "", as: Component = "div" }) {
  return (
    <Component className={`max-w-5xl mx-auto w-full px-6 ${className}`}>
      {children}
    </Component>
  );
}
```

**¿Para qué sirve?**
Centraliza el contenido y limita su ancho máximo:
- `max-w-5xl` → Ancho máximo de 64rem (1024px)
- `mx-auto` → Margen automático a los lados (centra el contenido)
- `px-6` → Padding horizontal que evita que el contenido toque los bordes en móvil

**Patrón polimórfico (`as` prop):**
Permite cambiar la etiqueta HTML que se renderiza:
```tsx
<Container as="section">...</Container>  // Renderiza <section>
<Container as="nav">...</Container>      // Renderiza <nav>
<Container>...</Container>               // Renderiza <div> (por defecto)
```

### 9.4 Componente Header

El Header es un "Client Component" porque maneja estado interactivo (el menú móvil):

```tsx
"use client";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // ...
}
```

**Estructura del Header:**
1. **Logo/nombre:** Link al inicio
2. **Navegación desktop:** Visible en pantallas md+ (768px+)
3. **Botón de menú móvil:** Visible solo en pantallas pequeñas
4. **Menú móvil desplegable:** Se muestra cuando `isMenuOpen` es true

**Efecto glass:**
```tsx
<header className="fixed top-0 left-0 w-full z-50 border-b border-border-dim glass">
```
- `fixed` → Posición fija (no hace scroll con la página)
- `z-50` → Por encima de todo el contenido
- `glass` → Fondo semitransparente con blur

### 9.5 Componente Footer

```tsx
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-bg-footer py-16 md:py-20 border-t border-border-dim">
      {/* Contenido */}
    </footer>
  );
}
```

**Características:**
- `id="contact"` → Sirve como ancla para la navegación
- Muestra el año actual dinámicamente
- Incluye links a GitHub, LinkedIn y email
- Los links se abren en nueva pestaña (`target="_blank"`)
- `rel="noopener noreferrer"` → Seguridad al abrir links externos

### 9.6 Componente AnimatedSection

```tsx
"use client";

export function AnimatedSection({ children, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    observer.observe(ref.current);
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {children}
    </div>
  );
}
```

**¿Cómo funciona?**
1. El elemento empieza invisible y desplazado hacia abajo
2. Un observador vigila cuando el elemento entra al viewport
3. Cuando es visible, cambia `isVisible` a true
4. CSS transiciona suavemente a visible y posición original
5. El observador se desconecta (animación solo una vez)

**`rootMargin: "0px 0px -50px 0px"`:**
La animación se activa 50px antes de que el elemento llegue al borde inferior del viewport, creando un efecto más natural.

### 9.7 Componentes de sección

Cada sección sigue un patrón similar:

```tsx
export function NombreSeccion() {
  return (
    <section id="identificador" className="py-16 md:py-24 bg-bg-dark">
      <Container>
        <AnimatedSection>
          <h2>Título</h2>
          {/* Contenido específico */}
        </AnimatedSection>
      </Container>
    </section>
  );
}
```

**Patrón común:**
1. `<section>` con ID para navegación por anclas
2. Padding vertical que aumenta en pantallas grandes
3. Fondo que alterna entre `bg-dark` y `bg-deep`
4. Container para centrar y limitar ancho
5. AnimatedSection para efecto de entrada
6. Heading h2 seguido del contenido

### 9.8 Jerarquía de componentes completa

```
RootLayout
├── Header
│   └── Container
│       ├── Logo (link)
│       ├── Nav desktop (links)
│       └── Botón menú móvil
│           └── Nav móvil (condicional)
├── main
│   └── Home (page.tsx)
│       ├── Hero
│       │   └── Container
│       ├── Philosophy
│       │   └── Container
│       │       └── AnimatedSection
│       ├── Experience
│       │   └── Container
│       │       └── AnimatedSection
│       ├── FeaturedProjects
│       │   └── Container
│       │       └── AnimatedSection
│       ├── TechnicalInventory
│       │   └── Container
│       │       └── AnimatedSection
│       └── Education
│           └── Container
│               └── AnimatedSection
└── Footer
    └── Container (×2)
```

---

## 10. Buenas prácticas del proyecto

### 10.1 Convenciones de nombres

**Archivos de componentes:**
- Usa PascalCase: `Header.tsx`, `AnimatedSection.tsx`
- El nombre del archivo coincide con el nombre del componente exportado

**Variables y funciones:**
- Usa camelCase: `isMenuOpen`, `closeMenu`, `navLinks`

**Constantes de configuración:**
- Usa camelCase con sufijo descriptivo: `siteConfig`, `skillCategories`

**Archivos de configuración:**
- Usa lowercase con puntos: `next.config.ts`, `postcss.config.mjs`

**CSS custom properties:**
- Usa kebab-case con prefijo semántico: `--color-primary`, `--font-display`

### 10.2 Organización del código

**Componentes:**
```tsx
// 1. Imports de React y dependencias externas
import { useState } from "react";
import { Mail } from "lucide-react";

// 2. Imports de componentes locales
import { Container } from "@/components/ui";

// 3. Imports de configuración/utilidades
import { siteConfig } from "@/config";

// 4. Interfaces/tipos (si son específicos del componente)
interface Props {
  // ...
}

// 5. Datos constantes (si aplica)
const navLinks = [
  { href: "#philosophy", label: "Filosofía" },
];

// 6. Componente principal
export function Header() {
  // ...
}
```

**Barrel exports:**
- Cada carpeta de componentes tiene un `index.ts`
- Facilita las importaciones y mantiene claro qué se exporta

### 10.3 Qué cosas NO hacer

**No mezclar datos con presentación:**
```tsx
// ❌ Incorrecto: Datos hardcodeados en el JSX
<p>Miguel Barra</p>
<a href="mailto:mbarra.3690@gmail.com">Email</a>

// ✅ Correcto: Usar configuración centralizada
<p>{siteConfig.author.name}</p>
<a href={`mailto:${siteConfig.author.email}`}>Email</a>
```

**No crear componentes innecesariamente complejos:**
```tsx
// ❌ Incorrecto: Componente que hace demasiadas cosas
function App() {
  // 500 líneas de código...
}

// ✅ Correcto: Dividir en componentes con responsabilidad única
function App() {
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  );
}
```

**No ignorar la accesibilidad:**
```tsx
// ❌ Incorrecto
<div onClick={handleClick}>Clickéame</div>

// ✅ Correcto
<button onClick={handleClick}>Clickéame</button>

// ❌ Incorrecto: Imagen sin descripción
<img src="foto.jpg" />

// ✅ Correcto
<img src="foto.jpg" alt="Descripción de la imagen" />
```

**No usar `any` en TypeScript:**
```tsx
// ❌ Incorrecto
const data: any = fetchData();

// ✅ Correcto
interface UserData {
  name: string;
  email: string;
}
const data: UserData = fetchData();
```

### 10.4 Mantenibilidad y escalabilidad

**Separar concerns:**
- Datos de configuración en `config/`
- Componentes UI genéricos en `components/ui/`
- Componentes específicos en `components/sections/`
- Estilos globales en `globals.css`
- Estilos de componentes con Tailwind inline

**Usar tipos estrictos:**
```tsx
// Definir interfaces para estructuras de datos
interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string[];
  isCurrent?: boolean;
}

// Usar la interfaz
const experiences: ExperienceItem[] = [
  // TypeScript validará que cada objeto cumpla la estructura
];
```

**Evitar duplicación:**
```tsx
// ❌ Incorrecto: Repetir la misma estructura
<div className="max-w-5xl mx-auto px-6">...</div>
<div className="max-w-5xl mx-auto px-6">...</div>

// ✅ Correcto: Usar un componente
<Container>...</Container>
<Container>...</Container>
```

### 10.5 Control de versiones

**Commits atómicos:**
- Cada commit debe representar un cambio lógico completo
- Evitar commits que mezclen múltiples funcionalidades

**Mensajes de commit descriptivos:**
```
feat: add experience timeline section
fix: correct header z-index on mobile
refactor: extract Container component
docs: update installation instructions
```

**No commitear:**
- `node_modules/` (incluido en `.gitignore`)
- Archivos `.env` con credenciales
- Archivos de build (`.next/`)

---

## 11. Build y despliegue

### 11.1 ¿Qué significa "build"?

El proceso de build (construcción) transforma el código fuente de desarrollo en archivos optimizados para producción. Durante el build:

1. TypeScript se compila a JavaScript
2. JSX se transforma a llamadas de función de React
3. Los módulos se empaquetan (bundling)
4. El código se minifica (se eliminan espacios, se acortan nombres)
5. Los estilos CSS se optimizan
6. Las imágenes se procesan

### 11.2 Ejecutar el build

**Comando:**
```bash
npm run build
```

**¿Qué hace internamente?**

Ejecuta `next build`, que:

1. Compila todos los archivos TypeScript
2. Analiza las dependencias y crea bundles optimizados
3. Genera HTML estático para las páginas que pueden pre-renderizarse
4. Crea los archivos en la carpeta `.next/`

**Salida esperada:**
```
   Creating an optimized production build...
   ✓ Compiled successfully
   ✓ Linting and checking validity of types
   ✓ Collecting page data
   ✓ Generating static pages (3/3)
   ✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5.2 kB         92 kB
└ ○ /_not-found                          896 B          88 kB
+ First Load JS shared by all            87 kB

○  (Static)  prerendered as static content
```

### 11.3 Diferencias entre desarrollo y producción

| Aspecto | Desarrollo (`npm run dev`) | Producción (`npm run build` + `start`) |
|---------|---------------------------|----------------------------------------|
| Velocidad de carga | Más lenta (compilación on-demand) | Rápida (todo precompilado) |
| Tamaño de archivos | Sin optimizar | Minificados y comprimidos |
| Errores | Detallados con stack traces | Mensajes genéricos (seguridad) |
| Source maps | Completos | Opcionales/limitados |
| Hot Reload | Sí | No |
| Cache | Deshabilitado | Habilitado |

### 11.4 Iniciar en modo producción

Después de ejecutar el build, puedes probar el resultado localmente:

**Comando:**
```bash
npm run start
```

Esto inicia un servidor que sirve los archivos optimizados. Útil para verificar que todo funciona antes de desplegar.

### 11.5 Archivos generados

El build crea la carpeta `.next/` con:

```
.next/
├── cache/              # Cache de compilación
├── server/             # Código del servidor (si aplica)
├── static/             # Archivos estáticos (JS, CSS)
│   └── chunks/         # Bundles de código
└── BUILD_ID            # Identificador único del build
```

### 11.6 Opciones de despliegue

**Vercel (recomendado para Next.js):**
- Plataforma del equipo que creó Next.js
- Despliegue automático desde GitHub
- HTTPS gratuito
- CDN global

**Otras plataformas:**
- Netlify
- AWS (S3 + CloudFront, o Amplify)
- Google Cloud Platform
- Railway
- DigitalOcean App Platform

**Para despliegue estático:**

Si tu aplicación no usa características de servidor de Next.js, puedes exportarla como HTML estático:

```javascript
// next.config.ts
const nextConfig = {
  output: 'export',
};
```

Luego `npm run build` generará una carpeta `out/` con archivos HTML/CSS/JS que puedes subir a cualquier hosting estático.

---

## 12. Versionado

### 12.1 ¿Qué es el versionado semántico?

El versionado semántico (SemVer) es una convención para asignar números de versión. El formato es:

```
MAJOR.MINOR.PATCH
```

**Ejemplo:** `1.0.0`

- **MAJOR (1):** Cambios incompatibles con versiones anteriores
- **MINOR (0):** Nueva funcionalidad compatible hacia atrás
- **PATCH (0):** Corrección de bugs compatible hacia atrás

### 12.2 Versión actual del proyecto

El proyecto está en versión **1.0.0**, definida en `package.json`:

```json
{
  "version": "1.0.0"
}
```

**¿Qué significa 1.0.0?**
- Es la primera versión estable y pública
- El proyecto tiene todas las funcionalidades base implementadas
- El código está listo para uso en producción

### 12.3 Cuándo cambiar la versión

**Incrementar PATCH (1.0.0 → 1.0.1):**
- Corrección de errores tipográficos
- Arreglos de bugs menores
- Actualizaciones de dependencias (patch)

Ejemplos:
- Corregir un link roto
- Arreglar un estilo que no se ve bien en Safari
- Actualizar `lucide-react` de 0.562.0 a 0.562.1

**Incrementar MINOR (1.0.0 → 1.1.0):**
- Agregar una nueva sección al portafolio
- Añadir modo claro/oscuro
- Agregar formulario de contacto
- Nueva funcionalidad que no rompe nada existente

Ejemplos:
- Agregar sección de blog
- Implementar filtros en proyectos
- Añadir animaciones nuevas

**Incrementar MAJOR (1.0.0 → 2.0.0):**
- Rediseño completo de la interfaz
- Cambio de tecnología base (ej: de Next.js a Astro)
- Reestructuración de la configuración que requiere migración
- Cambios que rompen compatibilidad con personalizaciones existentes

### 12.4 Buenas prácticas de versionado

**Documenta los cambios:**
Mantén un archivo CHANGELOG.md que liste qué cambió en cada versión:

```markdown
## [1.1.0] - 2026-02-15
### Added
- Nueva sección de testimonios
- Formulario de contacto

### Fixed
- Menú móvil no cerraba al hacer click en link

## [1.0.0] - 2026-01-20
### Added
- Versión inicial del portafolio
- Secciones: Hero, Filosofía, Experiencia, Proyectos, Stack, Educación
```

**Usa tags de Git:**
```bash
git tag -a v1.0.0 -m "Versión inicial estable"
git push origin v1.0.0
```

**No incrementes la versión por cada commit:**
La versión se incrementa cuando hay un conjunto significativo de cambios listos para "release".

---

## 13. Cómo reutilizar este proyecto como base

Este proyecto está diseñado para ser fácilmente adaptable. Sigue estos pasos para convertirlo en tu propio portafolio o usarlo como template.

### 13.1 Clonar o hacer fork

**Opción A: Fork (recomendado si planeas contribuir)**
1. En GitHub, haz click en "Fork"
2. Clona tu fork: `git clone https://github.com/TU_USUARIO/portfolio.git`

**Opción B: Clone directo**
```bash
git clone https://github.com/USUARIO_ORIGINAL/portfolio.git mi-portafolio
cd mi-portafolio
rm -rf .git
git init
```

### 13.2 Qué partes cambiar primero

**1. Configuración del sitio (`config/site.ts`):**

```typescript
export const siteConfig = {
  name: "Tu Nombre — Tu Título Profesional",
  description: "Tu descripción profesional aquí",
  url: "https://tu-dominio.com",
  author: {
    name: "Tu Nombre",
    email: "tu@email.com",
  },
  links: {
    github: "https://github.com/tu-usuario",
    linkedin: "https://linkedin.com/in/tu-perfil",
  },
};
```

**2. Contenido del Hero (`components/sections/Hero.tsx`):**

Modifica el título, subtítulo y descripción para reflejar tu perfil.

**3. Experiencia laboral (`components/sections/Experience.tsx`):**

Reemplaza el array `experiences` con tu historial laboral:

```typescript
const experiences: ExperienceItem[] = [
  {
    role: "Tu Cargo",
    company: "Tu Empresa",
    period: "Fecha inicio – Fecha fin",
    description: [
      "Logro o responsabilidad 1",
      "Logro o responsabilidad 2",
    ],
    isCurrent: true, // Solo para el trabajo actual
  },
  // ... más experiencias
];
```

**4. Stack técnico (`components/sections/TechnicalInventory.tsx`):**

Actualiza las categorías de habilidades con las tuyas.

**5. Educación (`components/sections/Education.tsx`):**

Reemplaza con tu formación académica.

**6. Proyectos (`components/sections/FeaturedProjects.tsx`):**

Añade tus proyectos reales. El archivo actual tiene placeholders.

### 13.3 Qué partes suelen mantenerse

**Estructura general:**
- La organización de carpetas (`app/`, `components/`, `config/`)
- Los componentes UI genéricos (`Container`, `AnimatedSection`, `Header`, `Footer`)
- La configuración de herramientas (`tsconfig.json`, `eslint.config.mjs`, etc.)

**Sistema de estilos:**
- Los tokens de diseño pueden ajustarse pero la estructura se mantiene
- Las utilidades de Tailwind funcionan igual

**Layout:**
- La estructura Header + Main + Footer es estándar
- El patrón de secciones con Container y AnimatedSection

### 13.4 Personalización visual

**Cambiar colores (`app/globals.css`):**

```css
:root {
  --color-primary: #tu-color-hex;
  --color-primary-dark: #tu-color-hover;
  /* etc. */
}
```

**Cambiar tipografías (`app/layout.tsx`):**

```typescript
import { Tu_Fuente } from "next/font/google";

const tuFuente = Tu_Fuente({
  variable: "--font-display",
  subsets: ["latin"],
});
```

**Cambiar estructura de navegación (`components/ui/Header.tsx`):**

```typescript
const navLinks = [
  { href: "#tu-seccion", label: "Tu Label" },
  // ... ajusta según tus secciones
];
```

### 13.5 Agregar nuevas secciones

1. Crea el componente en `components/sections/NuevaSeccion.tsx`
2. Exporta en `components/sections/index.ts`
3. Importa y usa en `app/page.tsx`
4. (Opcional) Agrega link en el Header

Ejemplo de nueva sección:

```tsx
// components/sections/Testimonials.tsx
import { Container, AnimatedSection } from "@/components/ui";

export function Testimonials() {
  return (
    <section id="testimonials" className="py-16 md:py-24 bg-bg-deep">
      <Container>
        <AnimatedSection>
          <h2 className="text-3xl font-bold text-white mb-8">Testimonios</h2>
          {/* Tu contenido */}
        </AnimatedSection>
      </Container>
    </section>
  );
}
```

### 13.6 Consideraciones al adaptar

- Actualiza los metadatos SEO en `layout.tsx`
- Cambia el favicon (`app/favicon.ico`)
- Agrega imágenes propias en `public/images/`
- Actualiza el README con información de tu versión
- Revisa que todos los links externos funcionen

---

## 14. Cierre

### 14.1 ¿Qué representa este proyecto?

Este proyecto representa una implementación práctica de desarrollo web moderno. Más allá de ser un portafolio funcional, demuestra:

- **Arquitectura de componentes:** Cómo dividir una interfaz en piezas reutilizables y mantenibles
- **Integración de tecnologías:** Cómo Next.js, React, TypeScript y Tailwind CSS trabajan juntos
- **Buenas prácticas:** Organización de código, tipado estricto, accesibilidad
- **Flujo de desarrollo profesional:** Desde el código fuente hasta el build de producción

### 14.2 Cómo continuar aprendiendo

**Profundizar en las tecnologías:**

- **React:** Estudia hooks avanzados (`useReducer`, `useMemo`, `useCallback`), Context API, y patrones de composición
- **Next.js:** Explora el App Router en profundidad, Server Actions, rutas dinámicas, middleware
- **TypeScript:** Aprende tipos genéricos, utility types, y patrones de tipado avanzado
- **Tailwind CSS:** Investiga plugins, configuración avanzada del tema, y creación de componentes con CVA (Class Variance Authority)

**Expandir el proyecto:**

Ideas para practicar:
- Agregar un blog con contenido en MDX
- Implementar modo claro/oscuro con persistencia
- Crear un formulario de contacto funcional con validación
- Añadir tests automatizados con Jest y Testing Library
- Implementar internacionalización (i18n)

**Recursos recomendados:**

- Documentación oficial de Next.js: [nextjs.org/docs](https://nextjs.org/docs)
- Documentación de React: [react.dev](https://react.dev)
- Guía de TypeScript: [typescriptlang.org/docs](https://typescriptlang.org/docs)
- Documentación de Tailwind CSS: [tailwindcss.com/docs](https://tailwindcss.com/docs)

### 14.3 Tipos de aplicaciones posibles con esta base

Esta estructura puede adaptarse para construir:

- **Portafolios personales:** Para diseñadores, fotógrafos, escritores
- **Landing pages:** Productos, servicios, eventos
- **Sitios de empresas pequeñas:** Presentación institucional
- **Blogs estáticos:** Con la adición de MDX o un CMS headless
- **Documentación técnica:** Agregando navegación lateral y búsqueda
- **Aplicaciones SaaS (frontend):** Con autenticación y dashboards

La estructura modular permite comenzar simple y escalar según las necesidades.

### 14.4 Palabras finales

La mejor forma de aprender desarrollo web es construyendo proyectos reales. Este portafolio puede ser tu punto de partida: modifícalo, rompe cosas, arregla lo que rompiste, agrega funcionalidades. Cada error es una oportunidad de aprendizaje.

El código no es sagrado. Si algo no tiene sentido para tu caso de uso, cámbialo. Si encuentras una mejor manera de hacer algo, impleméntala. La documentación y el código están aquí como guía, no como reglas inamovibles.

---

**Fin de la documentación**

*Documento generado para el proyecto Portfolio v1.0.0*
