// Constantes de tiempo (en ms) para animaciones que se orquestan desde JS.
// Las duraciones puramente CSS viven como tokens `--dur-*` / `--stagger-step`
// en `@theme static` de `app/globals.css`. Convención: siempre milisegundos.

/** Carrusel de proyectos: fundido + blur al cambiar de tarjeta. */
export const CASE_SWAP_MS = 170;

/** Cambio de idioma: se desvanece el contenido antes de sustituir los textos.
 *  Menor que --dur-fast (160ms) para que el swap ocurra ya semitransparente. */
export const LOCALE_SWAP_MS = 130;

/** Slider de testimonios: fundido al cambiar de cita. */
export const TESTIMONIAL_SWAP_MS = 200;

/** Slider de testimonios: intervalo de avance automático. */
export const TESTIMONIAL_AUTOPLAY_MS = 6000;

/** Vídeo del hero: espera tras el evento `load` antes de empezar a descargar. */
export const HERO_VIDEO_DEFER_MS = 1500;

/** Vídeo del hero: timeout del `requestIdleCallback` que arranca la carga. */
export const HERO_VIDEO_IDLE_TIMEOUT_MS = 3000;

/** Vídeo del hero: fallback para revelarlo si no llegan `playing`/`loadeddata`. */
export const HERO_VIDEO_REVEAL_FALLBACK_MS = 2500;
