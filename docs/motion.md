# Movimiento y animación

Referencia rápida para añadir o revisar animaciones en el portfolio.

Ver también: [feedback-patterns.md](./feedback-patterns.md) (formularios y
contenido dinámico, cuando se añadan) y [routing.md](./routing.md) (estados de
ruta del App Router).

## Enfoque

CSS puro + Tailwind v4, **sin librería de animación**. La orquestación puntual
(revelado al scroll, carruseles, menú móvil, vídeo del hero, cambio de idioma) la
hacen Client Components con `useEffect` + toggle de clases.

## Tokens (`app/globals.css`, `@theme static`)

| Token            | Valor                             | Uso                                          |
| ---------------- | --------------------------------- | -------------------------------------------- |
| `--ease-out`     | `cubic-bezier(0.22, 1, 0.36, 1)`  | entrar / salir, hover                        |
| `--ease-in-out`  | `cubic-bezier(0.77, 0, 0.175, 1)` | movimiento / morphing en pantalla            |
| `--dur-fast`     | `0.16s`                           | pulsación, hover rápido, cambio de idioma    |
| `--dur-mid`      | `0.3s`                            | hover, cambios de color / estado             |
| `--dur-reveal`   | `0.5s`                            | revelado al hacer scroll                     |
| `--dur-slow`     | `0.6s`                            | fundidos ambientales largos (vídeo del hero) |
| `--stagger-step` | `0.06s`                           | retardo incremental entre hermanos revelados |

Las duraciones que se controlan desde JS viven en `lib/motion.ts` (siempre en ms).
Las que no encajan en la escala y sólo se usan una vez (p. ej. los `38s` del
marquee) quedan en su regla, comentadas.

## Propiedades

- Anima sólo `transform` y `opacity`. Nunca `width`/`height`/`top`/`left`/`margin`
  ni **`box-shadow`** (usa la opacidad de una sombra pre-pintada en un pseudo).
- `backdrop-filter` no se anima ni cambia de valor entre estados (saltaría).
- `filter: blur()` sólo en transiciones puntuales y cortas (swaps de carrusel).

## `prefers-reduced-motion` — checklist al añadir una animación

Una sola regla `@media (prefers-reduced-motion: reduce)` al final de
`app/globals.css` ("MOVIMIENTO REDUCIDO"). "Reduce, no elimina": conserva
fundidos de opacidad/color y toda la información.

- [ ] ¿La animación es puro CSS? → la regla global ya la degrada
      (`transition-property` limitado a opacidad/color, `animation` casi instantánea).
      Añade un override explícito sólo si además cambia un `transform` decorativo
      (hover, entrada) o hace `blur`.
- [ ] ¿La orquesta un Client Component? → añade
      `window.matchMedia("(prefers-reduced-motion: reduce)")` y, si coincide, salta
      el efecto (autoplay, scroll suave, delay del swap…). Referencia:
      `RevealController`, `BackToTop`, `Projects`, `Testimonials`, `HeroVideo`,
      `LocaleProvider`.
- [ ] ¿Hay contenido que sólo se ve con la animación (marquee, carrusel)? →
      asegúrate de que con movimiento reducido se muestra completo y legible.
- [ ] Verifícalo: DevTools → Rendering → "Emulate CSS prefers-reduced-motion:
      reduce", o el ajuste del SO, y recorre la página.

## `WCAG 2.2.2` — contenido en movimiento automático (> 5 s)

Todo lo que se mueve solo necesita un control de pausa operable por teclado:
el autoplay de testimonios y el marquee del stack tienen botón de pausa
(`Testimonials`, `Arsenal`), además de pausarse con `prefers-reduced-motion`.
