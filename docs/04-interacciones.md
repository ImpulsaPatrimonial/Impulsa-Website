# 04 · Interacciones y animaciones

Reglas generales:
- Todo efecto se desactiva o se simplifica con `prefers-reduced-motion: reduce` (hook `useReducedMotion`).
- Usar CSS (transiciones/keyframes) + `IntersectionObserver`. No se necesita una librería de animación.
- El estado que activa una animación debe vivir en React (`useState`), no en `classList` manual, para que no se pierda al re-renderizar.
- Probar siempre con scroll real en el navegador (en el canvas de diseño no se apreciaban).

## 1. Navbar con dos estados — `useScrolled(48)`

- Contenedor `sticky top-0 z-50 h-0` para que el navbar quede **sobre** el hero sin empujar el contenido.
- `scrollY ≤ 48`: transparente, logo horizontal **blanco**, links blancos, botón blanco.
- `scrollY > 48`: fondo `rgba(255,255,255,.88)` + `backdrop-blur-[14px]`, borde inferior `rgba(22,50,91,.08)`, sombra `0 8px 30px rgba(12,28,52,.08)`, logo horizontal **a color**, links navy, botón primario. Padding vertical 22 → 14 px.
- Transición 250 ms en fondo, sombra y padding. Cambiar el logo con crossfade (dos `<img>` superpuestas) para evitar parpadeo.
- Listener de `scroll` pasivo + `requestAnimationFrame`.
- Todas las páginas públicas tienen hero oscuro, así que el estado inicial siempre es el transparente. En el admin y 404 sin hero, usar directamente el estado sólido (`forceSolid`).

## 2. Menú desplegable "Servicios ▾"

- Escritorio: `NavigationMenu` de Radix o implementación propia. Abre con hover (retardo 120 ms al entrar, 200 ms al salir), clic y teclado (Enter/Espacio/flecha abajo); `Esc` cierra; foco atrapado dentro mientras está abierto.
- Panel a todo el ancho bajo el navbar, fondo blanco, sombra `0 10px 30px rgba(12,28,52,.06)`, animación fade + translateY(-4px) 180 ms.
- `aria-expanded`, `aria-controls`, enlaces reales (navegables sin JS).

## 3. Hero de Inicio con video

- `<video autoPlay muted loop playsInline preload="metadata" poster={poster}>`.
- Forzar `muted = true` y llamar `play()` en `useEffect` (algunos navegadores lo bloquean); capturar el error en silencio.
- Con `prefers-reduced-motion` o `navigator.connection.saveData`, no reproducir: mostrar solo el poster.
- `aria-hidden` en el video (es decorativo).

## 4. Carrusel de actividades (Inicio) — `ActivitiesCarousel`

- 5 diapositivas superpuestas (`absolute inset-0`), crossfade de opacidad 1.1 s; la activa `opacity-100`.
- Avance automático cada 4.5 s; se pausa con hover, con foco dentro y cuando la pestaña no está visible (`visibilitychange`).
- Abajo a la izquierda, **en columna**: nombre de la actividad (serif 28 px, enlace a su página) y debajo los indicadores. Los indicadores quedan fijos en la misma posición; si el nombre ocupa dos líneas, crece hacia arriba.
- Indicadores: botones de 30×44 px con una barra de 2 px (blanco 40 %; activo blanco). `aria-label="Ver {actividad}"`, `aria-current` en el activo. Al hacer clic se reinicia el temporizador.
- Contenedor `role="region" aria-roledescription="carrusel" aria-label="Ejemplos de actividades vulnerables"`; el nombre con `aria-live="polite"`. Diapositivas inactivas con `aria-hidden`.
- Reduced motion: sin autoplay, solo indicadores.
- Alto 560 px (igual que la foto de La firma), con `PhotoFrame` desplazado 28 px.

## 5. Cintilla de sectores (marquee)

- Pista con los 15 sectores **duplicados** (para el bucle sin salto) y el isotipo (30 px) entre cada uno. `animation: marquee 80s linear infinite` (`translateX(0 → -50%)`).
- Máscara de desvanecimiento en los bordes: `mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)`.
- Pausa con hover. Reduced motion: sin animación (se ve estática).
- Accesibilidad: la pista lleva `aria-hidden`; un `<p className="sr-only">` contiene la lista completa.
- Móvil: tamaño del texto 40 px.

## 6. Metodología escalonada — `MethodologySteps`

- Contenedor relativo; encabezado absoluto arriba a la izquierda (ancho 50 % − 10 px) **sobre** el espacio libre de las cards cortas. El badge queda a la misma altura que el borde superior de la card 04 en su tamaño final.
- Rejilla de 4 columnas, `items-end`, `min-height: 520px` (reserva el alto final para que la página no salte).
- Estado inicial: las 4 cards miden 150 px y su texto (`.mcx`) está en `opacity 0; translateY(14px)`.
- Disparador: `IntersectionObserver` con `threshold: [0, .35]`. Cuando la rejilla tiene ≥ 35 % visible, esperar **1.5 s** y activar `in`. Si sale por completo de la pantalla, cancelar el temporizador y quitar `in` (la animación se repite al volver).
- Estado final: alturas 270 / 320 / 420 / 520 px, transición `height 1.1s cubic-bezier(.22,1,.36,1)` con retraso escalonado 0 / .25 / .5 / .75 s. El texto aparece 0.6 s con retraso .5 / .75 / 1 / 1.25 s.
- Colores: 01 `tint`, 02 `tint-2`, 03 `tint-3`, 04 `navy` (texto claro y link).
- ≤ 900 px: encabezado estático arriba, 1 columna, alturas automáticas (mín. 220 px), texto visible sin animación.

## 7. Contador de cifras (Quiénes somos) — `useCountUp`

- Valores 14, 15 y 7, mostrados con sufijo "+".
- Inicia 0.3 s después de que la fila de cifras tiene ≥ 50 % visible. Duración 1.8 s, easing `easeOutCubic` (1 − (1 − t)³), con `requestAnimationFrame`.
- Al salir por completo de pantalla vuelve a 0 y se repite al regresar.
- Números con `font-variant-numeric: tabular-nums` para que no bailen. Texto con degradado (`bg-clip-text`, navy → brand).
- Reduced motion: mostrar el valor final directamente.
- Para lectores de pantalla, el valor final en `aria-label` del contenedor.

## 8. Principios con fondo fijo (Quiénes somos)

- La sección tiene `overflow: clip` (no `hidden`, para no romper `sticky`).
- Capa de fondo: `div` `sticky top-0` con `height: min(100vh, 1100px)` y `margin-bottom` negativo de la misma altura; dentro, la foto (`object-cover`), una capa de tinte (`bg-navy mix-blend-color opacity-75`) y un degradado horizontal (más oscuro a la izquierda).
- Contenido encima (`relative z-10`), rejilla de 2 columnas `items-start`, `py-[140px]`.
- Columna izquierda `sticky top-[140px]`: se queda fija mientras pasan las 4 cards de la derecha y se va con la sección al terminar.
- ≤ 900 px: sin sticky en el texto, 1 columna.

## 9. Acordeones (FAQ)

- `Accordion` de shadcn, `type="single" collapsible`. Ícono `+` / `−` a la derecha. Sin bordes redondeados; separadores `line` entre ítems.

## 10. Índices laterales (Actividad vulnerable y Artículo)

- Aside `sticky top-[120px]`. Resaltar el ítem de la sección visible con `IntersectionObserver` (`rootMargin: '-40% 0px -55% 0px'`). Estilo activo: borde izquierdo 2 px `brand`, texto navy 600.
- Clic: scroll suave a la sección con compensación del navbar (`scroll-margin-top: 100px`).

## 11. Hover y foco

- Cards con enlace: cursor pointer; en `ActivityCard` el degradado se oscurece y el nombre se subraya (offset 5 px); en `PostCard` el título cambia a `brand`.
- Imágenes de cards: zoom muy sutil opcional (`scale-[1.03]` en 600 ms) — mantenerlo discreto.
- Foco visible: `outline 2px brand, offset 3px` en todos los elementos interactivos.

## 12. Formulario de contacto

- Validación al salir del campo y al enviar; mensajes en español.
- Al enviar: botón con spinner, campos deshabilitados. Éxito: reemplazar el formulario por el bloque de agradecimiento y mover el foco a su título. Error: toast "No pudimos enviar su mensaje. Intente de nuevo o escríbanos por WhatsApp." manteniendo los datos.

## 13. Banner de cookies

- Aparece con slide-up 250 ms tras 600 ms de carga si no hay consentimiento guardado. No bloquea la navegación.
