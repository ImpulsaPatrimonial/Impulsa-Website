# 02 · Design system

Todos los valores salen de `docs/design-reference/*.html`. Si hay diferencia entre este documento y el HTML, **manda el HTML**.

## 1. Principios

- Sobrio, institucional y editorial: mucho espacio, títulos serif grandes, fotografía con overlay azul marino.
- **Esquinas cuadradas** en todo (botones, cards, inputs, imágenes, badges).
- **Sin líneas divisorias entre título y texto.** Las únicas líneas permitidas son: separadores entre filas de listas/tablas/cronologías, divisores verticales entre cifras, borde de cards y el "eyebrow" (línea corta antes de la etiqueta de sección).
- Fotos siempre con `object-fit: cover` y un `object-position` definido (ver `06-assets.md`).

## 2. Tokens

### Colores

| Token Tailwind | Hex | Uso |
|---|---|---|
| `navy` | `#16325B` | Títulos, botón primario, secciones oscuras |
| `navy-deep` | `#0E2342` | Footer, fondos más oscuros, final de degradados |
| `brand` | `#005E9D` | Azul de marca: eyebrows, enlaces, números, acentos |
| `sky` | `#8FB8E0` | Acentos sobre fondo oscuro (eyebrows, fechas, puntos) |
| `gray-brand` | `#6B7A83` | Gris del manual (fechas de actualización, descriptor) |
| `ink` | `#3A4552` | Texto de párrafo sobre blanco |
| `muted` | `#5B6873` | Texto secundario, metadatos |
| `tint` | `#F1F5F9` | Fondo de secciones alternas, inputs, card metodología 01 |
| `tint-2` | `#E6EDF5` | Card metodología 02 |
| `tint-3` | `#C9DAEB` | Card metodología 03, bordes de marcos decorativos |
| `line` | `#DDE4EC` | Bordes de cards, separadores de listas |
| `on-dark` | `#D5DEE9` | Párrafos sobre azul marino |
| `footer-ink` | `#B9C6D6` | Enlaces del footer |

Overlay estándar de foto (`rgba(12,28,52,·)` = navy muy oscuro):

```css
/* hero interior */
linear-gradient(180deg, rgba(12,28,52,.72) 0%, rgba(12,28,52,.30) 38%, rgba(12,28,52,.90) 100%);
/* card con foto (texto abajo) */
linear-gradient(180deg, rgba(12,28,52,0) 40%, rgba(12,28,52,.88) 100%);
/* card con foto (título arriba y texto abajo) */
linear-gradient(180deg, rgba(12,28,52,.72) 0%, rgba(12,28,52,.30) 42%, rgba(12,28,52,.90) 100%);
```

Algunas fotos claras usan overlay más denso (Contacto, Legales); el valor exacto está en cada HTML.

### `tailwind.config.ts` (extracto)

```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    container: { center: true, padding: { DEFAULT: '16px', md: '32px' }, screens: { '2xl': '1200px' } },
    extend: {
      colors: {
        navy: { DEFAULT: '#16325B', deep: '#0E2342' },
        brand: '#005E9D',
        sky: '#8FB8E0',
        'gray-brand': '#6B7A83',
        ink: '#3A4552',
        muted: '#5B6873',
        tint: { DEFAULT: '#F1F5F9', 2: '#E6EDF5', 3: '#C9DAEB' },
        line: '#DDE4EC',
        'on-dark': '#D5DEE9',
        'footer-ink': '#B9C6D6',
      },
      fontFamily: {
        serif: ['"Source Serif 4 Variable"', 'Georgia', 'serif'],
        sans: ['"Montserrat Variable"', 'system-ui', 'sans-serif'],
      },
      borderRadius: { none: '0', DEFAULT: '0', sm: '0', md: '0', lg: '0', xl: '0' },
      maxWidth: { wrap: '1200px' },
      letterSpacing: { eyebrow: '.2em', label: '.16em', btn: '.04em' },
      transitionTimingFunction: { grow: 'cubic-bezier(.22,1,.36,1)' },
      keyframes: { marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } } },
      animation: { marquee: 'marquee 80s linear infinite' },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config
```

En `index.css` define `--radius: 0rem;` para shadcn y sus variables de color apuntando a la paleta (primary = navy, ring = brand).

### Opacidades de Tailwind 3

Tailwind 3 **no** genera modificadores arbitrarios de opacidad fuera de su escala por defecto. Extiende siempre `theme.extend.opacity` con los valores del diseño antes de usar clases como `border-white/18` o `bg-white/88`:

```ts
opacity: {
  6: '.06',
  8: '.08',
  14: '.14',
  16: '.16',
  18: '.18',
  22: '.22',
  35: '.35',
  55: '.55',
  62: '.62',
  86: '.86',
  88: '.88',
}
```

Si falta el token, la clase se ignora y el borde/color hereda el valor por defecto (p. ej. `border-border`), no el `rgba` de la referencia. Preferir `border-white/18` (con el token) frente a `border-[rgba(255,255,255,0.18)]` cuando el valor está en esta lista.

### Tipografía


| Estilo | Fuente | Tamaño / interlineado | Notas |
|---|---|---|---|
| H1 hero Inicio | Serif 400 | 64 / 1.06 | blanco |
| H1 hero interior | Serif 400 | 56 / 1.08 (Legales 52) | blanco |
| H2 sección | Serif 400 | 44 / 1.15 | `navy`; algunas secciones 52/1.1 (ver HTML) |
| H2 secundario | Serif 400 | 38–40 / 1.15 | bloques de servicios |
| H3 card grande | Serif 400–500 | 28–32 / 1.15–1.2 | |
| H3 card | Serif 400 | 24–26 / 1.2–1.3 | títulos de artículos, actividades |
| Cifra | Serif 400 | 40 (franja), 48 (hero), 56 (metodología), 64 (contador) | |
| Eyebrow `.eb` | Sans 600 | 12, tracking .2em, mayúsculas | línea de 32×1 px antes, color `brand` (o `sky` sobre oscuro) |
| Label `.lbl` | Sans 600 | 12, tracking .16em, mayúsculas | `brand` |
| Lead | Sans 400 | 17–18 / 1.8 | |
| Body | Sans 400 | 16 / 1.7 | `ink` |
| Small / meta | Sans 400 | 13–15 | `muted` |
| Botón | Sans 600 | 14, tracking .04em | |
| Link `.lnk` | Sans 600 | 14, tracking .03em | `brand` + flecha `→` |

Móvil (≤720 px): H1 40 px, H2 30 px. Ajustar los demás proporcionalmente con `clamp()` si hace falta.

## 3. Componentes base

Ubicación sugerida entre paréntesis.

### Botones (`ui/button.tsx`, variantes con `cva`)

Todos: `min-h-[52px] px-7 inline-flex items-center gap-2.5 text-sm font-semibold tracking-btn`, sin radio.

| Variante | Fondo / texto / borde | Hover |
|---|---|---|
| `primary` | navy / blanco / navy | brand |
| `outline` | transparente / navy / `rgba(22,50,91,.35)` | borde navy |
| `white` | blanco / navy / blanco | `#E8EEF5` |
| `ghostDark` | `rgba(255,255,255,.06)` / blanco / `rgba(255,255,255,.55)` | `rgba(255,255,255,.14)` |

Los CTA principales llevan el ícono de flecha diagonal (↗, `ArrowUpRight` 14 px).

### Eyebrow, Label y TextLink (`sections/Eyebrow.tsx`, `Label.tsx`, `TextLink.tsx`)

- `Eyebrow` acepta `tone="light" | "dark"`.
- `TextLink`: texto + `→`; variante con subrayado inferior de 1 px (`border-b border-brand pb-1.5`) como en "Conozca la firma".

### SectionHeader (`sections/SectionHeader.tsx`)

Eyebrow + H2 a la izquierda; a la derecha opcionalmente un `TextLink`, un botón o un párrafo (alineado abajo). `margin-bottom` 48–56 px.

### Hero de página interior (`sections/PageHero.tsx`)

`min-h-[520px]`, imagen de fondo con overlay estándar, contenido abajo a la izquierda: `HeroBadge` (borde blanco 30 %, fondo blanco 8 %, blur 10 px, punto cuadrado 6 px `sky`) + H1. Padding 180 px arriba / 64 px abajo. Props: `image`, `imagePosition`, `overlay?`, `badge`, `title`, `breadcrumbs?`.

### Hero de Inicio (`sections/HomeHero.tsx`)

`min-h-[820px]`, video de fondo (`autoplay muted loop playsInline`, `poster`), overlay doble (ver `01-inicio.html` `.hov`). Izquierda: eyebrow blanco con línea de 40 px, H1 64 px, párrafo. Derecha: cuadro translúcido con "14 / años acompañando a empresas en México y el extranjero" + botón blanco "Solicitar asesoría".

### CTA de cierre (`sections/CtaSection.tsx`)

Estándar en todas las páginas antes del footer: fondo `tint`, `py-28`, contenido centrado `max-w-[860px]`, eyebrow "Contacto", H2 44 px, párrafo 17 px `max-w-[680px]`, botones `primary` (Solicitar asesoría → `/contacto`) + `outline` (Escribir por WhatsApp). Props: `title`, `text`, `primaryLabel?`, `primaryHref?`.

### Cards

| Componente | Descripción | Referencia |
|---|---|---|
| `PracticeCard` | Foto 260 px arriba + label + título serif 32 + texto + link. Fondo blanco, borde `line` | Inicio · Áreas |
| `PracticeCardWide` | Variante horizontal (foto izquierda) para Legal Corporativo | Inicio · Áreas |
| `ComplementCard` | Card navy con lista separada por `·` | Inicio · Áreas |
| `PostCard` | Foto 230 px + label de categoría + título serif 24 + meta "Autor · Fecha · N min de lectura" | Inicio · Blog |
| `ActivityCard` | Foto a sangre 420 px, degradado inferior, nombre serif 28 blanco abajo; hover subraya el nombre | Actividad · Otras actividades |
| `ImageSlideCard` | Igual que `ActivityCard` pero dentro del carrusel (ver 04) | Inicio · Actividades |
| `MethodCard` | Card de color sólido con número serif 56, título y texto; crece en altura | Inicio · Metodología |
| `ValueCard` | Fondo `tint`, padding 44, número 44 `brand`, H3 30, texto | Quiénes somos · Principios |
| `BentoCard` | Card sobre navy: con ícono (fondo blanco 6 %, borde blanco 14 %) o con foto | Servicios · Complementarios |
| `StatItem` | Cifra serif con degradado de texto navy→brand + etiqueta; divisores verticales | Quiénes somos · La firma |
| `TimelineRow` | Grid `110px 1fr`, año serif 30 `brand`, texto; separador superior `line` | Quiénes somos · Trayectoria |
| `DateRow` | Grid `150px 1fr`, fecha en mayúsculas `sky`, texto; separador blanco 18 % | Inicio · Reforma PLD |

### PhotoFrame (`sections/PhotoFrame.tsx`)

Foto con marco decorativo desplazado 28 px (rectángulo `tint` con borde `tint-3` detrás). Prop `offset="bottom-right" | "bottom-left"`. Usado en La firma (Inicio) y en el carrusel de actividades.

### Formularios (shadcn adaptado)

Inputs y selects: fondo `tint`, sin borde visible o borde `line`, `min-h-[52px]`, foco con `ring-2 ring-brand`. Labels 13–14 px 600 `navy`. Mensajes de error en rojo accesible bajo el campo.

### Navbar y Footer

Ver `04-interacciones.md` (estados) y `03-paginas.md` (contenido). Medidas clave:
- Navbar inicial: transparente **sin** borde inferior, padding 22 px, logo horizontal blanco 42 px de alto, links blanco 86 % (hover/activo 100 %), botón `white` "Contactar ↗" 46 px.
- Navbar con scroll: blanco 88 % + `backdrop-blur(14px)` + borde inferior `navy` 8 % + sombra `0 8px 30px rgba(12,28,52,.08)`, padding 14 px, logo a color 38 px, links `navy`, botón `primary` 44 px.
- Link activo: inicial blanco 100 % con subrayado inset 1 px; con scroll `brand` con subrayado `brand`.

- Footer: fondo `navy-deep` + capa de degradado (`.fimg`), logo horizontal blanco 60 px de alto (ancho automático), frase serif 30 px, botón `ghostDark` "Agendar asesoría ↗"; a la derecha rejilla 2×2: [Sitio / Servicios] y [Oficinas / Contacto + redes]; barra inferior con © y links legales. **Sin** las letras "IMPPAT" gigantes.
