# 06 · Assets

Todos los archivos están en `src/assets/` (exportados del diseño aprobado, ya comprimidos). Impórtalos con `import img from '@/assets/images/…'`.

Recomendado en build: `vite-plugin-image-optimizer` (o generar WebP/AVIF con `sharp` en un script) y `<picture>` con `srcset` para los heroes. Mantener los JPG como respaldo.

## Marca (`src/assets/brand/`)

| Archivo | Uso |
|---|---|
| `logo-horizontal-blanco.png` | Navbar estado inicial (42 px alto), footer (60 px alto) |
| `logo-horizontal-color.png` | Navbar con scroll (38 px alto), admin |
| `logo-vertical-blanco.png` | Reserva (no se usa actualmente) |
| `logo-vertical-color.png` | Reserva / favicon / OG |
| `isotipo.png` | Separador de la cintilla de sectores (30 px), base del favicon |

Reglas del manual: no deformar, no cambiar proporción logotipo/isotipo, no omitir el descriptor "ASESORÍA LEGAL Y FISCAL". Tamaño mínimo web: 28 px (vertical) / 12 px (horizontal) de alto. **Siempre `width: auto`** con alto fijo.

Pendiente: favicon (`favicon.svg` + `favicon.ico` + `apple-touch-icon.png`) a partir del isotipo, y `og-default.jpg` 1200×630.

## Logos de terceros (`src/assets/logos/`)

| Archivo | Uso |
|---|---|
| `logo-imcp.png` | Afiliaciones (Inicio, 64 px alto) y Credenciales (Quiénes somos, 38 px) — a color, tal cual |
| `logo-coparmex.png` | Afiliaciones (Inicio, 48 px alto) y Credenciales (Quiénes somos, 28 px) — a color, tal cual |

## Video (`src/assets/video/`)

| Archivo | Uso |
|---|---|
| `hero-inicio.mp4` (3.2 MB) | Fondo del hero de Inicio |
| `hero-inicio-poster.jpg` | Poster / fallback del video |

⚠️ El video muestra en algún momento un logotipo de Citi: **reemplazar o recortar** antes de publicar. Considerar exportar una versión WebM/H.265 más ligera (< 2 MB) y servir el video desde `public/` o Storage para no inflar el bundle.

## Imágenes (`src/assets/images/`)

| Archivo | Dónde | `object-position` | Alt sugerido |
|---|---|---|---|
| `inicio-la-firma.jpg` | Inicio · La firma (560 px) | `45% center` | Equipo de la firma en una reunión de trabajo |
| `inicio-credenciales.jpg` | Inicio · Participación institucional (card 580 px) | `center 28%` | Mtra. Angélica María Ruiz López recibiendo un reconocimiento del IMCP |
| `servicio-pld.jpg` | Inicio · Áreas (PLD) `center 40%`; Servicios (bloque PLD) `88% center`; hero Servicio PLD `center 42%` | ver columna | Abogado trabajando junto a una estatuilla de la justicia |
| `servicio-precios-transferencia.jpg` | Inicio · Áreas (PT); Servicios (bloque PT) | `center 65%` | Reportes financieros, libreta y calculadora sobre un escritorio |
| `servicio-legal-corporativo.jpg` | Inicio · Áreas (Legal) `60% center`; Servicios (bloque Legal) `60% center`; hero Quiénes somos `center 55%` | ver columna | Sala de consejo con vista a la ciudad |
| `av-compraventa-inmuebles.jpg` | Carrusel Inicio; card Otras actividades | `center` | Asesora inmobiliaria con carpeta, planos y llaves |
| `av-comercializacion-vehiculos.jpg` | Carrusel Inicio; hero Actividad (ejemplo) `center 55%` | `center` | Apretón de manos frente a un automóvil en agencia |
| `av-joyeria-metales.jpg` | Carrusel Inicio; card Otras actividades | `45% center` | Anillos con piedras preciosas en vitrina |
| `av-activos-virtuales.jpg` | Carrusel Inicio; card Otras actividades | `center` | Monedas de criptoactivos frente a una gráfica de operaciones |
| `av-juegos-apuestas.jpg` | Carrusel Inicio | `center` | Mesa de ruleta con fichas de apuesta |
| `hero-servicios.jpg` | Hero Servicios | `center 32%` | Estatua de la justicia con balanza sobre fondo azul |
| `nosotros-la-firma.jpg` | Quiénes somos · La firma (440 px) | `42% center` | Mtra. Angélica María Ruiz López en las oficinas de COPARMEX Veracruz |
| `nosotros-principios-fondo.jpg` | Quiénes somos · Principios (fondo fijo con tinte azul) | `center 40%` | (decorativa, `alt=""`) |
| `nosotros-trayectoria.jpg` | Quiénes somos · Trayectoria (340 px) | `center 65%` | Equipo de trabajo en reunión en una sala con muros de cristal |
| `complementarios-fiscales.jpg` | Servicios · Soluciones fiscales | `40% center` | Formato de declaración anual del SAT con pluma |
| `complementarios-auditoria.jpg` | Servicios · Auditoría | `center 45%` | Profesionistas revisando reportes y gráficas financieras |
| `hero-blog.jpg` | Hero Blog y hero de cada artículo | `center 45%` | Biblioteca antigua con bustos de mármol y estantes de libros |
| `hero-contacto.jpg` | Hero Contacto | `center 40%` | Edificios corporativos con fachadas de cristal |
| `hero-legales.jpg` | Hero páginas legales | `center 40%` | Fachada curva de un edificio corporativo de cristal |
| `mapa-mexico.webp` | Contacto · Cobertura | — | Mapa de México con oficinas en Ciudad de México, Guadalajara, Morelia y Querétaro |

Las imágenes de actividades también deben subirse a Supabase Storage al correr el seed (las actividades nuevas tendrán su propia imagen desde el admin).

## Imágenes pendientes (mostrar placeholder elegante: degradado navy con el patrón diagonal del diseño)

- Portadas de artículos del blog (se cargan desde el admin).
- Servicio PLD · "¿A quién aplica?" (manos revisando expedientes y contratos).
- Actividad vulnerable · imagen 16:9 bajo la descripción (por actividad, desde el admin).
- Hero del índice de actividades vulnerables.
- Foto del footer (el diseño usa solo degradado; opcional).
- Retrato profesional de la socia directora (si se rediseña Credenciales en Quiénes somos).

Componente `ImagePlaceholder`: `bg-[linear-gradient(140deg,#2C5283_0%,#16325B_55%,#0E2342_100%)]` + capa `repeating-linear-gradient(115deg,rgba(255,255,255,.035) 0 2px,transparent 2px 22px)`.
