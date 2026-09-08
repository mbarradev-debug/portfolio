# Patrones de feedback: formularios y contenido dinámico

Nota de arquitectura. Hoy **no aplica**: el sitio no tiene formularios ni carga
de datos asíncrona (único punto de contacto: enlace `mailto:` en `#contacto`;
contenido 100 % estático desde `content/*.ts`). Origen: hallazgos **F2.1** y
**F4.1** de la auditoría de UI/UX (DBO-1310).

Cuando se añada cualquiera de las dos cosas, seguir el patrón de aquí. Ambos
reutilizan los tokens de movimiento de `@theme static` (ver [motion.md](./motion.md),
DBO-1302) y respetan `prefers-reduced-motion`.

---

## Formulario de contacto

### Máquina de estados

Un solo estado explícito, no varios flags sueltos:

```
idle → typing → validating → error ⇄ typing
                           ↘ submitting → success
                                        ↘ error
```

- **idle** — sin tocar. Sin mensajes de error visibles.
- **typing** — el usuario escribe. La validación de un campo se dispara en
  `blur`, no en cada `keystroke` (evita marcar en rojo algo a medio escribir).
- **validating** — sólo si hay validación asíncrona (p. ej. comprobar un email
  contra una API). Indicador sutil junto al campo, no bloqueante.
- **error** — mensajes por campo + resumen. Foco al primer campo inválido.
- **submitting** — botón `disabled` con spinner/label que cambia
  ("Enviar" → "Enviando…"). Nada más de la UI se bloquea.
- **success** — confirmación que reemplaza el formulario (o lo cubre) con una
  transición de opacidad, no un corte seco.

### Transiciones

- Mensajes de error/éxito: entran y salen con `opacity` + `translateY(4px)` en
  `--dur-fast` `var(--ease-out)`. Nunca `display:none` instantáneo.
- Reservar el espacio del mensaje (min-height o grid) para que el layout no
  salte al aparecer.
- El cambio de color de borde del campo (neutro → error → ok) usa `--dur-mid`.

### Accesibilidad

- Contenedor de errores con `aria-live="polite"` (`assertive` sólo para el
  fallo de envío global).
- Cada input: `aria-invalid`, `aria-describedby` apuntando a su mensaje.
- Botón: `aria-disabled` + `disabled` reales durante `submitting`; el texto
  visible del botón comunica el estado (no sólo el spinner).
- El spinner decorativo lleva `aria-hidden`; el estado lo anuncia el `aria-live`.

### `prefers-reduced-motion`

La regla global de `globals.css` ya degrada las transiciones CSS a un fundido
corto de opacidad/color. Añadir override explícito sólo si algún estado mueve un
`transform` decorativo. El spinner de envío: sustituir el giro por un pulso de
opacidad, o por texto ("Enviando…") sin animación.

---

## Contenido que se carga (feed, respuesta de API)

### Estados

```
empty ⇄ loading → data
              ↘ error → (retry) → loading
```

- **loading** — skeleton que refleja la forma real del contenido (bloques del
  tamaño aproximado de las líneas/tarjetas finales), no un spinner centrado.
  Shimmer con `@keyframes` sobre `background-position` u `opacity`, `linear`,
  ~1.4s. Nunca skeleton para cargas < ~300 ms percibidos (parpadea): usar un
  retardo antes de mostrarlo.
- **data** — el contenido real entra con el sistema `.reveal` existente
  (`RevealController`) o un fundido de `--dur-reveal` si no está en un contenedor
  observado.
- **empty** — mensaje claro y accionable, misma caja que ocuparían los datos.
- **error** — mensaje + botón de reintento; el reintento vuelve a `loading`.

### Transición entre estados

- Cross-fade skeleton → data con `opacity` en `--dur-mid` `var(--ease-out)`;
  no cambiar la altura del contenedor de golpe (animar `height`/`grid-rows` o
  fijar `min-height`).
- Si llegan varios ítems, escalonarlos con `--stagger-step` (máx. ~5 pasos,
  como en `.reveal`).

### `prefers-reduced-motion`

- Sin shimmer: skeleton estático (bloque gris plano) o directamente el texto
  "Cargando…".
- Cross-fade permitido (es opacidad), pero sin `translate` ni escala de entrada.

### Orquestación desde JS

Cualquier `setTimeout`/retardo (delay del skeleton, autohide del toast de éxito)
va como constante en `lib/motion.ts`, en ms, igual que el resto.
