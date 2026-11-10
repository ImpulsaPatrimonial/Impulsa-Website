# 03 · Páginas

Especificación sección por sección. Para medidas exactas, abre el HTML indicado en `docs/design-reference/`. Los textos de aquí son los finales del diseño; los que van entre `[corchetes]` están pendientes del despacho.

Convenciones:
- **Fondo**: B = blanco, T = `tint`, N = `navy`.
- Cada página termina con `CtaSection` (fondo T) + `Footer`, salvo Contacto y Legales.
- Enlaces internos: usar las rutas de `01-arquitectura.md` (en el HTML todos apuntan a archivos `.html`; tradúcelos).

---

## Elementos globales

### Navbar (`layout/Navbar.tsx`)
- Logo (enlace a `/`), menú: Inicio · Quiénes somos · Servicios ▾ · Actividades vulnerables · Blog · botón "Contactar ↗" (`/contacto`). No hay link "Contacto" en el menú.
- **Servicios ▾** abre un panel desplegable (hover con retardo de 120 ms y clic/teclado) con 4 opciones, cada una con título y descripción:
  - Prevención de Lavado de Dinero — Actividades vulnerables y sector financiero *(línea lateral `brand`)*
  - Precios de Transferencia — Operaciones con partes relacionadas *(línea lateral `brand`)*
  - Legal Corporativo — Constitución, operación y reorganización *(línea lateral `line`)*
  - Soluciones complementarias — Fiscal, contable, litigio y auditoría *(línea lateral `line`, va a `/servicios#complementarios`)*
  - Diseño del panel: franja blanca a todo el ancho bajo el navbar, sombra suave, rejilla de 4 columnas (ver bloque "Referencia: menú desplegable" en `03-servicios.html`; **ese bloque es solo referencia, no se renderiza en la página Servicios**).
- "Actividades vulnerables" lleva a `/actividades-vulnerables`.
- Móvil (≤900 px): botón hamburguesa → `Sheet` lateral a pantalla completa con los mismos enlaces, Servicios como sub-lista, y el botón Contactar al final.
- Estados de scroll: ver `04-interacciones.md`.

### Footer (`layout/Footer.tsx`)
Referencia: cualquier página (todas usan el mismo footer).
- Columna izquierda: logo horizontal blanco (60 px alto), frase serif 30 px "Impulsamos el crecimiento de las empresas con seguridad jurídica y patrimonial.", botón `ghostDark` "Agendar asesoría ↗" → `/contacto`.
- Derecha, rejilla 2 × 2 (en móvil 1 columna):
  - Columna A: **Sitio** (Inicio, Quiénes somos, Servicios, Actividades vulnerables, Blog, Contacto) y debajo **Servicios** (Prevención de Lavado de Dinero, Precios de Transferencia, Legal Corporativo, Complementarios).
  - Columna B: **Oficinas** (Ciudad de México, Guadalajara, Morelia, Querétaro + separador + "Atención en línea en todo México" en blanco) y debajo **Contacto** (+52 33 3907 9868 → WhatsApp, contacto@impulsapatrimonial.com → mailto, íconos Instagram, LinkedIn, WhatsApp en cuadros de 44 px).
- Barra inferior: "© 2026 Impulsa Patrimonial · Diseñado por **Docabyte**" (enlace a https://docabyte.com) y enlaces legales: Aviso de privacidad, Términos de uso, Política de cookies, Descargo de responsabilidad.
- Año del © dinámico (`new Date().getFullYear()`).

### Banner de cookies (`layout/CookieBanner.tsx`)
Referencia: `09-legales.html`. Fijo abajo en la primera visita. Texto: "Usamos cookies propias y de terceros (Google Analytics) para medir el uso del sitio y mejorar su experiencia. Consulte nuestra Política de cookies." Botones: Configurar · Rechazar · Aceptar. Guarda la elección en `localStorage` (`imppat-consent` con versión y fecha). GA4 solo se carga tras "Aceptar". "Configurar" abre un `Dialog` con interruptores (Necesarias fijo activo, Analítica).

### CTA de WhatsApp
`lib/whatsapp.ts` → `https://wa.me/523339079868?text=` + mensaje codificado: "Hola, me interesa una asesoría con Impulsa Patrimonial." (variante por página si se pasa un servicio).

---

## 1. Inicio `/` — `01-inicio.html`

| # | Sección | Fondo | Contenido |
|---|---|---|---|
| 1 | Hero con video | video | Eyebrow "Asesoría legal y fiscal desde 2012". H1 "Cumplimiento con certeza jurídica y patrimonial". Texto: "Prevención de Lavado de Dinero, Precios de Transferencia y Legal Corporativo para empresas y personas físicas con actividad empresarial en todo México." Cuadro: **14** · "años acompañando a empresas en México y el extranjero". Botón blanco "Solicitar asesoría ↗". |
| 2 | Franja de confianza | B | Tres cifras con divisor vertical izquierdo: **2012** Año de fundación de la firma · **15** Sectores de la economía atendidos · **IMCP · COPARMEX** Participación institucional en PLD (en una sola línea, columna más ancha). |
| 3 | La firma | B | Izquierda `PhotoFrame` (foto `inicio-la-firma.jpg`, 560 px alto). Derecha: eyebrow "La firma", H2 "Cumplir no es un trámite: es la base para crecer con seguridad", texto "Somos una firma mexicana de contadores públicos y abogados fundada en 2012. Acompañamos a empresas y personas físicas con actividad empresarial en el diagnóstico, la implementación y la defensa de sus obligaciones legales, fiscales y regulatorias, con cobertura en toda la República Mexicana.", link subrayado "Conozca la firma →". |
| 4 | Áreas de especialización | T | Header: "Áreas de especialización" / "Tres prácticas, un mismo objetivo: proteger su patrimonio" / link "Ver todos los servicios →". Fila 1: 2 `PracticeCard` (PLD, PT, label "0X · Práctica principal"). Fila 2: `PracticeCardWide` Legal Corporativo + `ComplementCard` navy ("Soluciones complementarias" / "Una atención integral para su empresa" / "Soluciones fiscales · Litigio fiscal y defensa · Soluciones contables · Auditoría" / "Ver servicios complementarios →"). Textos de cada práctica en `services.ts`. |
| 5 | Reforma PLD | N | Izquierda: eyebrow "Reforma PLD 2025–2026", H2 "Las nuevas obligaciones entran en vigor el 30 de noviembre de 2026", texto, botón blanco "Evaluar mi situación ↗". Derecha: 4 `DateRow`: 30 NOV 2026, 1 MAR 2027, 1 JUN 2027, 30 MAR 2029 (textos en `pld-calendar.ts`). |
| 6 | Actividades vulnerables | B | Izquierda: eyebrow, H2 52 px "¿Su actividad es vulnerable?", texto, link subrayado "Ver todas las actividades →". Derecha: carrusel (ver 04) de 560 px de alto con `PhotoFrame` desplazado; 5 actividades: Compraventa de inmuebles, Comercialización de vehículos, Joyería y metales preciosos, Activos virtuales, Juegos con apuesta y sorteos. Abajo a la izquierda: nombre (enlace a su página) y debajo los indicadores de posición. |
| 7 | Participación institucional | B | Header: eyebrow "Participación institucional", H2 "Presencia en los organismos que definen la Prevención de Lavado de Dinero en México", botón `outline` "Conozca la firma". Card a todo el ancho (580 px alto) con foto `inicio-credenciales.jpg` y degradado; dentro: "Nuestra socia directora, la Mtra. Angélica María Ruiz López, miembro activo en:" y 3 columnas: **IMCP · Desde 2021** Presidencia de la Comisión Nacional de Prevención de Lavado de Dinero y Anticorrupción · **COPARMEX** Vicepresidencia de Prevención de Lavado de Dinero de la Comisión Fiscal Nacional · **Editorial IMCP** Coautoría de *Antilavado de dinero y sus conceptos básicos* (2026) y *Precios de Transferencia en Iberoamérica* (2025). Debajo: fila "Afiliaciones / Organismos de los que forma parte la firma" + logos COPARMEX e IMCP a color en recuadros con borde. |
| 8 | Cintilla de sectores | B | Eyebrow "15 sectores atendidos" (alineado a la izquierda). Marquee infinito con los 15 sectores en serif 64 px separados por el isotipo (ver 04). Texto oculto accesible con la lista completa. |
| 9 | Metodología | B | Encabezado sobre las cards (badge a la altura del borde superior de la card 04): "Metodología" / "Cómo trabajamos" / "Un proceso en cuatro etapas, del primer dato que nos comparte a la defensa de su cumplimiento ante la autoridad." 4 `MethodCard` escalonadas con animación (ver 04). La 04 (navy) incluye link "Solicitar asesoría →". |
| 10 | Blog | B | Header "Blog" / "Análisis y actualizaciones" / "Ver todos los artículos →". 3 `PostCard` con los últimos artículos publicados. |
| 11 | CTA | T | "¿Su empresa está preparada para sus obligaciones?" / "Cuéntenos su actividad y le orientamos sobre las obligaciones que le aplican. Atendemos en todo México en línea y con reuniones presenciales bajo cita." |

---

## 2. Quiénes somos `/quienes-somos` — `02-quienes-somos.html`

| # | Sección | Fondo | Contenido |
|---|---|---|---|
| 1 | Hero interior | foto | Badge "Quiénes somos". H1 "Especialistas en cumplimiento legal y fiscal desde 2012". Foto `servicio-legal-corporativo.jpg`, `object-position: center 55%`. |
| 2 | La firma | B | Grid 5fr/7fr. Izquierda: eyebrow arriba, foto `nosotros-la-firma.jpg` (440 px) alineada abajo. Derecha: H2 52 px "Contadores y abogados que protegen su patrimonio" y tres párrafos (la misión va dentro del segundo, sin título propio). Debajo, fila de 3 `StatItem` con contador animado: **14+** Años de experiencia · **15+** Sectores atendidos · **7+** Servicios especializados. |
| 3 | Nuestros principios | foto fija | Fondo `nosotros-principios-fondo.jpg` fijo (sticky) con tinte azul (`mix-blend-mode: color`, navy 75 %) y degradado. Izquierda **fija mientras pasan las cards**: eyebrow "Nuestros principios", H2 52 px "Los principios que guían nuestro trabajo", texto "Nuestra forma de trabajar se sostiene en la honestidad, el respeto y la efectividad en cada asunto que atendemos." Derecha: 4 `ValueCard` apiladas (gap 40): 01 Legalidad, 02 Confidencialidad, 03 Ética, 04 Profesionalismo (textos en `about.ts`). |
| 4 | Trayectoria | B | Izquierda: eyebrow, H2 "Más de una década acompañando a empresas", foto `nosotros-trayectoria.jpg` (340 px). Derecha: 5 `TimelineRow`: 2012, 2021, 2025, 2026, Hoy. |
| 5 | Especialización | B | "En qué nos especializamos": 3 cards con borde (01 PLD, 02 PT, 03 Legal Corporativo) con link "Conocer más →". |
| 6 | Metodología | B | Igual que Inicio (mismo componente). |
| 7 | Participación institucional | N | **Pendiente de rediseño** (ver nota). Versión actual: H2 "Presencia en los organismos que definen la práctica de prevención de lavado de dinero en México", lista IMCP / COPARMEX / Publicaciones, link a LinkedIn de la socia, fila de cifras y logos. |
| 8 | Cintilla de sectores | B | Igual que Inicio. |
| 9 | Blog · Eventos | B | "Blog" / "Presencia en eventos y foros" / "Ver todos los artículos →". 3 `PostCard` de la categoría **Eventos y participaciones**. |
| 10 | CTA | T | "Hablemos de las necesidades de su empresa" / "Le acompañamos en el diagnóstico, la implementación y la defensa de sus obligaciones legales, fiscales y regulatorias. Atendemos en todo México en línea y con reuniones presenciales bajo cita." |

> Nota sección 7: se propuso al cliente cambiar el enfoque a "perfil de la socia directora" (C.P.C., L.D. y M.F.; reconocimiento Mejor Obra Colaborativa 2026 del IMCP; membresías). Implementar la versión actual del HTML y dejarla como componente aislado (`AboutCredentials`) para reemplazarla fácilmente. Además, quitar su fila de cifras (2012 · 15 · 3 continentes) si se confirma, porque repite las de la sección 2.

---

## 3. Servicios `/servicios` — `03-servicios.html`

| # | Sección | Fondo | Contenido |
|---|---|---|---|
| 1 | Hero interior | foto | Badge "Servicios". H1 "Asesoría especializada para cumplir con certeza". Foto `hero-servicios.jpg` (`center 32%`), overlay más ligero. |
| — | ~~Referencia menú~~ | — | **No implementar** como sección: es el diseño del desplegable del navbar. |
| 2 | Introducción | B | Eyebrow "Nuestra práctica" + párrafo: "Integramos el conocimiento contable y jurídico para identificar sus obligaciones, documentar su cumplimiento y defenderlo ante la autoridad. Cada proyecto parte del modelo de negocio y de las operaciones que su empresa efectivamente realiza." |
| 3 | Prácticas principales | B | 3 bloques con borde `line`, alternando texto/foto (`min-h` 420 px de foto). Cada uno: label, H2 38 px, descripción, barra de 4 fases (segmentos con gap 4 px), lista de 4 servicios destacados, botón "Conocer el servicio" (+ en PLD link "Actividades vulnerables"). Datos en `services.ts`. Fotos: PLD `servicio-pld.jpg` (`88% center`), PT `servicio-precios-transferencia.jpg`, Legal `servicio-legal-corporativo.jpg`. |
| 4 | Soluciones complementarias `#complementarios` | N | Header: eyebrow + H2 "Una atención integral para su empresa" a la izquierda, texto a la derecha. Bento de 3 + 2 (`grid-cols-6`, arriba `span 2`, abajo `span 3`), cards de 400 px: **Soluciones fiscales** (foto `complementarios-fiscales.jpg`), **Litigio fiscal y defensa** (ícono balanza), **Soluciones contables** (ícono calculadora), **Sector financiero** (ícono edificio/banco), **Auditoría** (foto `complementarios-auditoria.jpg`). Cards con foto: título arriba, texto abajo, sin ícono. Cards con ícono: ícono en cuadro 56 px, título, texto abajo. Íconos lucide: `Scale`, `Calculator`, `Landmark`. |
| 5 | CTA | T | "¿No sabe qué servicio necesita?" / "Cuéntenos su actividad o giro y le orientamos sobre las obligaciones que le aplican. Atendemos en todo México en línea y con reuniones presenciales bajo cita." |

---

## 4. Servicio individual `/servicios/:slug` — `04-servicio-pld.html`

Plantilla única. El diseño está hecho con PLD; PT y Legal Corporativo usan la misma estructura con su contenido (`services.ts`). Contenido de PT y Legal: tomar de los portafolios 2026 del cliente (resumen en `services.ts`, ver tabla al final). Secciones marcadas *(solo PLD)* se ocultan si no hay datos.

| # | Sección | Fondo | Contenido (PLD) |
|---|---|---|---|
| 1 | Hero | foto | Badge "Práctica principal". H1 "Prevención de Lavado de Dinero". Foto `servicio-pld.jpg` (`center 42%`). |
| 2 | Propuesta de valor | B | Frase serif grande: "Asesoría especializada para personas físicas y morales que realizan actividades vulnerables en México." Botones "Solicitar asesoría en PLD" + "Preguntas frecuentes" (ancla `#faq`). Borde inferior. |
| 3 | Entorno regulatorio | B | Eyebrow "Entorno regulatorio", H2 "Una respuesta al entorno regulatorio", tres párrafos en dos columnas. |
| 4 | ¿A quién aplica? | T | Izquierda: eyebrow "A quién acompañamos", H2 "¿A quién aplica?", foto *(pendiente: manos revisando expedientes y contratos)*. Derecha: 4 filas numeradas (01 Personas físicas y morales con actividades vulnerables… 04 Personas con cuentas bloqueadas por la UIF). |
| 5 | Servicios especializados | B | Eyebrow, H2 "Del diagnóstico a la defensa". Barra de fases proporcional (`2fr 5fr 1.4fr 2fr`): Diagnóstico (01 · 11), Implementación (02–07), Formación (08), Evaluación y defensa (09–10). Rejilla de 11 servicios numerados (título + descripción). El 11 lleva la nota "Art. 55 de la Ley · Art. 55 Bis del Reglamento". |
| 6 | Calendario de exigibilidad *(solo PLD)* | N | Eyebrow, H2 "Aplicación gradual de las nuevas obligaciones", texto. Tres etapas (I Estructural, II Operativa, III Tecnológica y de verificación) con filas fecha/obligación (`pld-calendar.ts`). |
| 7 | Puente a actividades vulnerables *(solo PLD)* | B | Card con borde: "Consulte su actividad vulnerable" / "Obligaciones, umbrales, plazos y sanciones explicados por actividad." + enlaces a 3 actividades + "Ver todas →". |
| 8 | Preguntas frecuentes `#faq` | B | Izquierda eyebrow + H2 "Lo que más nos preguntan". Derecha acordeón (un ítem abierto a la vez), 5 preguntas (texto en `services.ts`). JSON-LD `FAQPage`. |
| 9 | Marco normativo | B | Caja T con label "Marco normativo de referencia" y párrafo legal. |
| 10 | Artículos relacionados | B | Header "Blog" / "Artículos sobre {servicio}" / "Ver todos los artículos →". 3 `PostCard` de la categoría del servicio. |
| 11 | CTA | T | "Conversemos sobre las obligaciones de su actividad" / "Le ayudamos a identificar qué debe cumplir, cómo acreditarlo y en qué plazos. Atendemos en todo México en línea y con reuniones presenciales bajo cita." Botón primario "Solicitar asesoría en {servicio corto}" → `/contacto?servicio={slug}` (preselecciona el select). |

### Datos de PT y Legal Corporativo para `services.ts`

**Precios de Transferencia** — para empresas con operaciones con partes relacionadas en México y el extranjero; base LISR arts. 76, 76-A, 179 y 180, CFF y Directrices OCDE.
Fases: Diagnóstico (01–02), Documentación (03–06), Planeación (07–08), Revisión y defensa (09–11).
Servicios: 01 Identificación de partes relacionadas · 02 Análisis funcional y de riesgos · 03 Estudio de precios de transferencia · 04 Declaración informativa de operaciones con partes relacionadas · 05 Declaraciones maestra, local y país por país · 06 Anexos del dictamen fiscal e ISSIF · 07 Reestructuraciones corporativas · 08 Ajustes de precios de transferencia · 09 Atención de requerimientos y revisiones · 10 Medios de defensa y acuerdos conclusivos (PRODECON) · 11 Resoluciones anticipadas (APA, art. 34-A CFF).

**Legal Corporativo** — constitución, operación y reorganización de empresas en México; base LGSM, Código de Comercio, CFF, Ley de Concursos Mercantiles, LFPDPPP.
Fases: Gobierno corporativo (01–04), Operación (05–06), Reorganización (07–09), Cumplimiento (10).
Servicios: 01 Constitución de sociedades · 02 Asambleas y sesiones de consejo · 03 Libros corporativos · 04 Beneficiario controlador · 05 Contratos de negocios · 06 Poderes y representación legal · 07 Fusión y escisión · 08 Reestructuración corporativa · 09 Disolución, liquidación y concurso mercantil · 10 Due diligence y compliance.

Las descripciones de cada servicio, el entorno regulatorio, "¿A quién aplica?", FAQs y marco normativo de PT y Legal están **pendientes de redacción/validación** con el despacho: dejar textos `[pendiente]` claramente marcados en `services.ts`.

---

## 5. Actividades vulnerables

### 5.1 Índice `/actividades-vulnerables` (sin diseño propio)
Hero interior (badge "Actividades vulnerables", H1 "Consulte las obligaciones de su actividad", foto `av-comercializacion-vehiculos.jpg` u otra) + párrafo introductorio + rejilla de `ActivityCard` (3 columnas) con todas las actividades publicadas + CTA estándar. Mantener el estilo de la sección "Otras actividades".

### 5.2 Detalle `/actividades-vulnerables/:slug` — `05-actividad-vulnerable.html`

Plantilla duplicable desde el admin. Todos los campos vienen de `vulnerable_activities` (ver 05).

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | Badge "Actividad vulnerable", H1 = nombre (ej. "Comercialización de vehículos"), migas: Inicio / PLD / Actividades vulnerables. Foto `hero_image`. |
| 2 | Resumen | Frase serif 28 px = `summary` + botones "Evaluar mi caso" (ancla `#contacto`) y WhatsApp. Borde inferior. |
| 3 | Cuerpo con índice lateral | Aside (270 px, **sticky**, resalta la sección visible): Descripción de la actividad · Obligaciones aplicables · Umbrales · Plazos · Sanciones · Preguntas frecuentes · Contacto. Contenido: **Descripción** (texto enriquecido + imagen horizontal 16:9 `body_image`); **Obligaciones** (rejilla de cards numeradas; por defecto las 6 generales); **Umbrales** (tabla Supuesto / Umbral de identificación / Umbral de aviso + nota "Montos expresados en Unidades de Medida y Actualización (UMA) vigentes."); **Plazos** (cards plazo/trámite); **Sanciones** (lista incumplimiento/rango + nota con enlace a autorregularización espontánea); **Preguntas frecuentes** (acordeón); **Contacto** (bloque navy "¿Realiza esta actividad?" / "Le ayudamos a identificar y cumplir sus obligaciones. Atendemos en todo México." + "Ir al formulario" → `/contacto?servicio=prevencion-de-lavado-de-dinero&actividad={nombre}` + WhatsApp). |
| 4 | Otras actividades | Fondo T. Eyebrow "Actividades vulnerables", H2 "Otras actividades vulnerables", **3** `ActivityCard` (excluye la actual; orden por `sort_order`). Solo el nombre como enlace. |

Obligaciones por defecto (editables): 01 Identificar a sus clientes y usuarios e integrar sus expedientes · 02 Conocer e identificar al beneficiario controlador · 03 Presentar avisos en los plazos y formatos oficiales · 04 Conservar la información y documentación soporte · 05 Contar con manual de cumplimiento y enfoque basado en riesgos · 06 Capacitar al personal y someterse a auditoría.

---

## 6. Blog `/blog` — `06-blog.html`

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | Badge "Blog", H1 "Análisis y actualizaciones", foto `hero-blog.jpg` (`center 45%`). |
| 2 | Buscador + filtros | Texto "Reformas, criterios y guías prácticas sobre Prevención de Lavado de Dinero, Precios de Transferencia y Legal Corporativo." Buscador (input + botón "Buscar"). Filtros por categoría como pastillas cuadradas (Todas + categorías). Estado en la URL. |
| 3 | Destacado | Artículo con `featured = true` más reciente: card horizontal (foto + contenido sobre T): label "Destacado · {categoría}", título, extracto, meta. Se oculta cuando hay filtro o búsqueda activa. |
| 4 | Rejilla | `PostCard` en 3 columnas (gap 48/32). 9 por página. Estado vacío: "No encontramos artículos con esos criterios." + botón para limpiar filtros. |
| 5 | Paginación + etiquetas | Paginación numérica cuadrada + "Siguiente →". Nube de etiquetas (`#reforma2025`…), cada una filtra por etiqueta. |
| 6 | CTA | Estándar. *(No está en el diseño del Blog; agregarlo por consistencia: "¿Tiene dudas sobre sus obligaciones?" / texto estándar.)* |

Categorías iniciales: Prevención de Lavado de Dinero · Precios de Transferencia · Legal Corporativo · Actividades vulnerables · Eventos y participaciones.

Artículos de ejemplo (seed): ver `05-backend-supabase.md`.

---

## 7. Artículo `/blog/:slug` — `07-blog-articulo.html`

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | Misma foto que el hero del Blog (`hero-blog.jpg`). Badge con la categoría, H1 = título. 540 px alto. |
| 2 | Entradilla + autor | Entradilla serif (`excerpt`). Autor: nombre, cargo, fecha de publicación · N min de lectura. |
| 3 | Imagen destacada | `cover_image` a lo ancho del contenedor (16:9). |
| 4 | Cuerpo | Aside izquierdo (220 px, sticky): "Contenido" (índice generado de los H2), "Compartir" (LinkedIn, WhatsApp, copiar URL con toast "Enlace copiado"). Columna de lectura (máx. ~720 px) con `prose` personalizado: H2 serif 34 px, H3, listas, citas. Después del primer H2 se inserta automáticamente un **bloque CTA del servicio** relacionado con la categoría ("Prevención de Lavado de Dinero / ¿Necesita un diagnóstico de sus obligaciones? / Conocer el servicio"). Al final: nota "Este contenido es informativo y no sustituye una asesoría particular.", etiquetas y `AuthorBox` (nombre, cargo · área, bio). |
| 5 | Relacionados | "Sigue leyendo" / "Artículos relacionados" / "Ver todos los artículos →" + 3 `PostCard` (misma categoría, excluyendo el actual; completar con recientes). |
| 6 | CTA | "¿Este tema aplica a su empresa?" / "Le ayudamos a revisar si estas obligaciones le aplican y qué debe hacer para cumplirlas a tiempo. Atendemos en todo México en línea y con reuniones presenciales bajo cita." |

JSON-LD `Article` + `BreadcrumbList`. Contenido HTML sanitizado con DOMPurify.

---

## 8. Contacto `/contacto` — `08-contacto.html`

| # | Sección | Contenido |
|---|---|---|
| 1 | Hero | Badge "Contacto", H1 "Cuéntenos sobre su empresa", foto `hero-contacto.jpg`. |
| 2 | Intro filtro | Izquierda: "Con esta información realizamos una primera evaluación de su caso y le contactamos." Derecha (texto menor): "Atendemos exclusivamente a empresas y personas físicas con actividad empresarial en materia de Prevención de Lavado de Dinero, Precios de Transferencia y Legal Corporativo." |
| 3 | Formulario + canales | Formulario (2 columnas en escritorio) + aside. Campos y validación abajo. Aside: card WhatsApp ("Escríbanos por WhatsApp" / "+52 33 3907 9868 · con un mensaje inicial predefinido." / "Iniciar conversación →") y card "Atención nacional en línea" (videollamada, teléfono y correo; correo y teléfono; link "Ver oficinas y cobertura ↓" a `#cobertura`). Estado de éxito reemplaza el formulario: ✓ "Gracias, recibimos su mensaje" / "Revisaremos su información y le contactaremos en breve. [Tiempo estimado de respuesta]" / "Enviar otro mensaje". |
| 4 | Cobertura `#cobertura` | Fondo T. Eyebrow "Cobertura", H2 "Atención en todo México, oficinas en el centro del país". Leyenda (punto = oficina, reuniones bajo cita; área = atención en línea). Mapa `mapa-mexico.webp` con 4 marcadores posicionados en %: Guadalajara (43%, 67.4%), Morelia (51.2%, 73.6%), Querétaro (54.1%, 69.7%), Ciudad de México (57.6%, 75.9%) — cada uno con etiqueta "Ciudad · Bajo cita". Debajo, 5 columnas: Ciudad de México (centro del país), Guadalajara (occidente), Morelia (Bajío), Querétaro (Bajío), Todo México (en línea). |

### Campos del formulario (`ContactForm`, Zod)

| Campo | Tipo | Validación |
|---|---|---|
| Nombre completo | text | requerido, 3–120 |
| Empresa o nombre comercial | text | requerido, 2–160 |
| Correo electrónico | email | requerido, email válido |
| Teléfono | tel | requerido, 10 dígitos MX (permitir +52, espacios) |
| Actividad o giro | text | requerido, 2–160 |
| Servicio de interés | select | requerido: Prevención de Lavado de Dinero · Precios de Transferencia · Legal Corporativo · Soluciones complementarias · No estoy seguro. Preseleccionar con `?servicio=` |
| ¿Qué tan urgente es su caso? | select | requerido: Inmediata: tengo un requerimiento o visita de la autoridad · En los próximos 30 días · En los próximos 3 meses · Solo estoy explorando opciones |
| Estado de la república | select | requerido: 32 entidades (lista en `form-options.ts`) |
| Mensaje | textarea | opcional, máx. 2000. Placeholder: "Cuéntenos su situación: ¿recibió un requerimiento de la autoridad?, ¿tiene una fecha límite?, ¿ya cuenta con manual o avisos presentados?" |
| Aviso de privacidad | checkbox | requerido. "He leído y acepto el Aviso de privacidad." (enlace) + nota "El envío de este formulario no crea una relación abogado-cliente." |
| Honeypot | hidden | debe ir vacío |

Botón "Enviar mensaje" (estado de carga y deshabilitado mientras envía). Envío a la Edge Function `submit-contact` (ver 05). Evento GA4 `generate_lead` si hay consentimiento.

---

## 9. Legales — `09-legales.html`

Rutas: `/aviso-de-privacidad`, `/terminos-de-uso`, `/politica-de-cookies`, `/descargo-de-responsabilidad`.
- Hero más bajo (`min-h` 420–520): badge "Información legal", H1 = nombre del documento. Foto `hero-legales.jpg` con overlay más denso.
- Cuerpo: aside "Documentos" con 4 botones-enlace (activo navy con texto blanco; inactivos fondo T) + artículo (máx. 760 px): "Última actualización: [Fecha]", secciones numeradas (H2 26 px) y caja "Aclaraciones" (borde izquierdo 2 px `brand`, fondo T): "El envío del formulario de contacto no crea una relación abogado-cliente." / "El contenido publicado en este sitio es informativo y no sustituye una asesoría particular."
- Textos legales: **pendientes del despacho**. Usar marcadores `[pendiente]` en `legal.ts`.
- Sin CTA de cierre.

---

## 10. 404
Hero interior corto con badge "Error 404", H1 "No encontramos esta página", texto y botones "Ir al inicio" / "Contactar".
