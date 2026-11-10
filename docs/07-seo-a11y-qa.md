# 07 · SEO, accesibilidad, rendimiento y QA

## 1. SEO

### Meta por página (`components/Seo.tsx` con react-helmet-async)

Props: `title`, `description`, `path`, `image?`, `type?` (`website` | `article`), `noindex?`, `jsonLd?`.
- `<title>`: `{título de página} | Impulsa Patrimonial` (Inicio: "Impulsa Patrimonial · Asesoría legal y fiscal en PLD, Precios de Transferencia y Legal Corporativo").
- `description` 140–160 caracteres, única por página.
- `canonical` = `VITE_SITE_URL + path`.
- Open Graph y Twitter card (`summary_large_image`), imagen por defecto `og-default.jpg`.
- `<html lang="es-MX">`.

| Página | Description sugerida |
|---|---|
| Inicio | Firma mexicana de contadores y abogados desde 2012. Prevención de Lavado de Dinero, Precios de Transferencia y Legal Corporativo en todo México. |
| Quiénes somos | Contadores públicos y abogados con experiencia local e internacional. Conozca nuestra trayectoria, principios y participación en IMCP y COPARMEX. |
| Servicios | Asesoría en Prevención de Lavado de Dinero, Precios de Transferencia, Legal Corporativo y soluciones fiscales, contables y de auditoría. |
| Servicio PLD | Diagnóstico, implementación y defensa en PLD para actividades vulnerables conforme a la reforma 2025 y las Reglas de Carácter General 2026. |
| Actividad | (desde `seo_description` o `summary`) |
| Blog / Artículo | (fijo / desde `seo_description` o `excerpt`) |
| Contacto | Cuéntenos sobre su empresa y le orientamos sobre sus obligaciones. Atención en línea en todo México y reuniones bajo cita. |

### Datos estructurados (JSON-LD)

- Global (Inicio): `LegalService` / `ProfessionalService` con nombre, URL, logo, teléfono `+52 33 3907 9868`, correo, `areaServed: MX`, `foundingDate: 2012`, `sameAs` (Instagram, LinkedIn). **Sin dirección** (decisión del cliente).
- Servicios: `Service` por práctica.
- Artículos: `Article` (headline, image, datePublished, dateModified, author, publisher).
- FAQs (servicio y actividad): `FAQPage`.
- Páginas internas: `BreadcrumbList`.

### Indexación

- `public/robots.txt`: permitir todo, `Disallow: /admin`, línea `Sitemap:`.
- `sitemap.xml` generado en `prebuild` con un script (`scripts/generate-sitemap.ts`) que lista rutas estáticas + slugs publicados de `blog_posts` y `vulnerable_activities` (consulta con la anon key).
- `vercel.json`: rewrites SPA y headers de caché largos para `/assets/*`.
- Fase recomendada posterior: prerender (ver `01-arquitectura.md` §9).

## 2. Accesibilidad (WCAG 2.1 AA)

- Un solo `h1` por página; jerarquía de encabezados correcta.
- Enlace "Saltar al contenido" al inicio del layout.
- Contraste: texto blanco sobre fotos siempre con overlay; verificar `sky` sobre navy solo en textos ≥ 12 px en mayúsculas/peso 600 (cumple como texto grande/UI) — no usar `sky` para párrafos.
- Áreas táctiles ≥ 44×44 px (indicadores del carrusel, íconos sociales, botones).
- Carrusel, menú y acordeones con roles y atributos ARIA (ver `04`).
- Formularios: `label` asociado, errores con `aria-describedby` y `aria-invalid`, foco al primer error al enviar.
- `prefers-reduced-motion` respetado en todo.
- Imágenes decorativas con `alt=""`.

## 3. Rendimiento (objetivo Lighthouse móvil ≥ 90 en Performance, 100 en SEO y Accesibilidad)

- Fuentes self-hosted con `font-display: swap`, solo pesos usados; precargar Source Serif 4 400.
- Hero: poster con `fetchpriority="high"`; video con `preload="metadata"`.
- Resto de imágenes `loading="lazy"` + `decoding="async"` + dimensiones explícitas.
- Code splitting por ruta; el admin y TipTap en chunks separados.
- GA4 solo tras consentimiento.

## 4. Checklist de QA antes de publicar

**Visual (comparar contra `docs/design-reference/` a 1440 px)**
- [ ] Ninguna esquina redondeada; ninguna línea entre título y texto.
- [ ] Tipografías y tamaños coinciden; eyebrows con su línea.
- [ ] Navbar cambia a blanco con scroll en todas las páginas; link activo correcto.
- [ ] Desplegable de Servicios funciona con mouse, teclado y táctil.
- [ ] Footer idéntico en todas las páginas (2×2, logo 60 px, sin "IMPPAT").
- [ ] CTA de cierre igual en todas las páginas que lo llevan.

**Interacciones**
- [ ] Video del hero se reproduce en iOS/Android (muted + playsInline).
- [ ] Carrusel: autoplay, pausa en hover/foco, indicadores, nombre arriba y marcador abajo.
- [ ] Cintilla infinita sin saltos; pausa en hover.
- [ ] Metodología crece 1.5 s después de entrar en pantalla y se repite.
- [ ] Contador 0 → 14+/15+/7+ en Quiénes somos.
- [ ] Principios: fondo fijo y texto izquierdo fijo mientras pasan las cards.
- [ ] Reduced motion: todo estático y legible.

**Responsive** (375, 768, 1024, 1440)
- [ ] Sin scroll horizontal; menú móvil completo; tablas de umbrales con scroll horizontal propio.

**Funcional**
- [ ] Formulario: validaciones, preselección por `?servicio=`, guardado en `contact_leads`, correo recibido en contacto@impulsapatrimonial.com, estado de éxito, honeypot.
- [ ] Blog: filtros, búsqueda, paginación y etiquetas reflejados en la URL; artículo con índice, compartir y relacionados.
- [ ] Admin: login, roles, CRUD de artículos y actividades, duplicar actividad, subir imágenes, prospectos (solo admin).
- [ ] Banner de cookies y carga condicional de GA4.
- [ ] 404 y enlaces rotos (correr un crawler, p. ej. `npx linkinator`).

**SEO**
- [ ] Títulos y descripciones únicos; canonical; OG; JSON-LD válido (Rich Results Test); sitemap y robots.

## 5. Pendientes del cliente (bloquean contenido, no desarrollo)

- Textos legales (aviso de privacidad, términos, cookies, descargo).
- Contenido de cada actividad vulnerable (umbrales en UMA, plazos, sanciones, FAQs).
- Contenido de PT y Legal Corporativo (descripciones, entorno, a quién aplica, FAQs, marco normativo).
- Datos de autores del blog y texto del segundo artículo inicial.
- URLs de Instagram y LinkedIn (de la firma y de la socia directora).
- Tiempo estimado de respuesta del formulario.
- Video del hero sin el logotipo de Citi.
- Fotos pendientes (ver `06-assets.md`).
- Confirmar si se envía correo de confirmación al prospecto.
- Decisión sobre el rediseño de Credenciales en Quiénes somos.
