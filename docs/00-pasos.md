# 00 · Pasos para crear el proyecto en Cursor

Ruta: diseño aprobado → **Cursor directo** (sin pasar por Lovable). Mismo stack que Lovable: Vite + React + TypeScript + Tailwind + shadcn/ui.

Trabaja **una fase por chat** de Cursor (modo Agent), adjuntando con `@` los documentos indicados. Revisa el diff, prueba en el navegador y haz commit al terminar cada fase.

---

## Fase 0 · Preparación (manual, ~20 min)

Requisitos: Node 20 LTS o superior, Git, cuenta de GitHub, Supabase y Vercel. Los comandos son de **PowerShell**.

> **Estado: completada.** Versiones resultantes: Vite 7, React 19, TypeScript 5.8, Tailwind 3.4, React Router 6, Zod 4, Supabase CLI 3 (local).

```powershell
# 1. Crear el proyecto
# create-vite@latest (v9) ya no trae la plantilla react-swc-ts y usa TypeScript 7: fijar v7.
npm create vite@7 imppat-web -- --template react-swc-ts --no-interactive
cd imppat-web
npm install

# 2. Tailwind 3 + plugins
npm i -D tailwindcss@3 postcss autoprefixer tailwindcss-animate @tailwindcss/typography @types/node
npx tailwindcss init -p --ts

# 3. Dependencias del proyecto (React Router fijo en v6)
npm i react-router-dom@6 @tanstack/react-query @supabase/supabase-js react-hook-form zod @hookform/resolvers `
  react-helmet-async lucide-react clsx tailwind-merge class-variance-authority date-fns dompurify `
  @fontsource-variable/source-serif-4 @fontsource-variable/montserrat

# 4. Supabase CLI local (Supabase ya no permite `npm i -g supabase`); se usa con `npx supabase ...`
npm i -D supabase

# 5. Git
git init -b main; git add -A; git commit -m "chore: scaffold Vite + React + TS"
```

6. **Copia el kit** dentro de la raíz del proyecto (respetando carpetas):
   - `AGENTS.md` → raíz
   - `.cursor/rules/imppat.mdc` → `.cursor/rules/`
   - `docs/` → `docs/` (incluye `design-reference/`)
   - `src/assets/` → `src/assets/`
7. Abre la carpeta en Cursor. Verifica en *Settings → Rules* que aparece la regla `imppat` (Always).
8. Crea el proyecto en Supabase (región más cercana a México) y guarda URL y anon key. Copia `.env.example` a `.env.local` (lo crea la Fase 1): `Copy-Item .env.example .env.local`.

> shadcn/ui con Tailwind 3: usa la versión del CLI compatible con v3 (`npx shadcn@2.3.0 init`). Con React 19, si el CLI pregunta cómo resolver dependencias con npm, elige `--legacy-peer-deps`. Si prefieres Tailwind 4, avisa al agente y adapta `02-design-system.md` (los tokens se mueven a `@theme` en CSS).

---

## Fase 1 · Fundaciones

Adjunta: `@AGENTS.md @docs/01-arquitectura.md @docs/02-design-system.md @docs/04-interacciones.md @docs/design-reference/00-navbar-estados.html @docs/design-reference/01-inicio.html`

```
Configura la base del proyecto según AGENTS.md y docs/01-arquitectura.md:
1. Alias "@/": tsconfig y vite.config.
2. tailwind.config.ts e index.css con los tokens, fuentes self-hosted y radius 0 de docs/02-design-system.md.
3. Inicializa shadcn/ui (radius 0) y agrega: button, input, textarea, select, checkbox, label, form, accordion, sheet, navigation-menu, dialog, sonner.
4. Crea la estructura de carpetas de docs/01 §3, src/lib (supabase, queryClient, utils, whatsapp), los hooks useScrolled, useInView, useCountUp, useReducedMotion y src/content/site.ts (contacto, redes, oficinas, navegación).
5. Router con todas las rutas de docs/01 §4 (páginas vacías con su título por ahora), SiteLayout, ScrollToTop y 404.
6. Componentes compartidos: Navbar (dos estados + menú desplegable de Servicios + menú móvil), Footer (rejilla 2x2, sin "IMPPAT"), PageHero, HomeHero (solo estructura), SectionHeader, Eyebrow, Label, TextLink, Button (4 variantes), CtaSection, PhotoFrame, ImagePlaceholder, Seo.
7. .env.example, vercel.json (rewrites SPA) y public/robots.txt.
Replica medidas y estilos exactos del navbar y el footer de los HTML de referencia. Al final corre lint y build.
```

## Fase 2 · Inicio

Adjunta: `@docs/03-paginas.md @docs/04-interacciones.md @docs/06-assets.md @docs/design-reference/01-inicio.html`

```
Construye la página de Inicio (/) sección por sección según docs/03-paginas.md §1 y el HTML 01-inicio.html.
- Extrae todos los textos a src/content/home.ts, services.ts, methodology.ts, sectors.ts y pld-calendar.ts.
- Implementa: HomeHero con video, franja de confianza, La firma con PhotoFrame, Áreas de especialización, Reforma PLD, carrusel de actividades (docs/04 §4; por ahora datos estáticos con las 5 fotos av-*), Participación institucional con logos, cintilla de sectores (§5), metodología escalonada (§6) y CTA.
- La sección de Blog usa por ahora 3 posts de ejemplo estáticos con ImagePlaceholder (se conectará a Supabase en la Fase 6).
- Respeta prefers-reduced-motion. Verifica a 1440, 1024, 768 y 375 px.
```

## Fase 3 · Quiénes somos

Adjunta: `@docs/03-paginas.md @docs/04-interacciones.md @docs/design-reference/02-quienes-somos.html`

```
Construye /quienes-somos según docs/03-paginas.md §2 y 02-quienes-somos.html.
Incluye: hero, La firma con StatItem y contador (docs/04 §7), Principios con fondo fijo y texto izquierdo sticky (docs/04 §8), Trayectoria, Especialización, Metodología (reutiliza el componente de Inicio), Participación institucional como componente aislado AboutCredentials, cintilla de sectores (reutiliza), Blog de eventos (estático por ahora) y CTA. Textos en src/content/about.ts.
```

## Fase 4 · Servicios y servicio individual

Adjunta: `@docs/03-paginas.md @docs/design-reference/03-servicios.html @docs/design-reference/04-servicio-pld.html`

```
1. Completa src/content/services.ts con las 3 prácticas (PLD con todo el contenido del HTML; PT y Legal Corporativo con la estructura de docs/03 §4 y textos [pendiente] donde falten) y los 5 complementarios.
2. Construye /servicios (docs/03 §3): hero, introducción, 3 bloques de práctica con barra de fases, bento de complementarios con id "complementarios" y CTA. NO renderices el bloque "Referencia: menú desplegable".
3. Construye /servicios/:slug con una plantilla ServiceDetail data-driven (docs/03 §4), incluyendo FAQ con acordeón y JSON-LD FAQPage. Calendario y puente a actividades solo si hay datos. Slug inválido → 404.
```

## Fase 5 · Supabase + Contacto

Adjunta: `@docs/05-backend-supabase.md @docs/03-paginas.md @docs/design-reference/08-contacto.html`

```
1. Inicializa Supabase en el repo (npx supabase init), crea supabase/migrations/0001_init.sql y supabase/seed.sql exactamente como docs/05-backend-supabase.md §2 y §3.
2. Crea la Edge Function supabase/functions/submit-contact según §4 (con json(), sha256(), renderLeadEmail() y escape de HTML).
3. Construye /contacto según docs/03 §8: formulario con React Hook Form + Zod (campos y reglas de la tabla), preselección por ?servicio=, honeypot, envío con supabase.functions.invoke, estados de carga/éxito/error, aside de canales y sección de cobertura con el mapa y los 4 marcadores en porcentaje.
4. Genera los tipos con npm run db:types (src/types/database.types.ts).
Dame al final la lista de comandos que debo correr yo (db push, secrets, deploy de la función), en PowerShell y con npx supabase.
```

Comandos que correrás tú (referencia, PowerShell):

```powershell
npx supabase login
npx supabase link --project-ref <ref>
npx supabase db push
npx supabase secrets set RESEND_API_KEY=... CONTACT_TO_EMAIL=contacto@impulsapatrimonial.com `
  "CONTACT_FROM_EMAIL=Sitio web <web@impulsapatrimonial.com>" IP_SALT=... ALLOWED_ORIGIN=https://impulsapatrimonial.com
npx supabase functions deploy submit-contact --no-verify-jwt
npm run db:types
# seed.sql: pégalo en el SQL Editor del dashboard (psql no viene instalado en Windows)
```

## Fase 6 · Blog

Adjunta: `@docs/03-paginas.md @docs/05-backend-supabase.md @docs/04-interacciones.md @docs/design-reference/06-blog.html @docs/design-reference/07-blog-articulo.html`

```
1. Hooks de TanStack Query: usePosts({categoria, q, tag, pagina}), usePost(slug), useRelatedPosts, useCategories.
2. /blog según docs/03 §6: buscador (textSearch 'spanish' websearch), filtros por categoría y etiqueta en la URL, destacado, rejilla de 9 con paginación, estado vacío y CTA.
3. /blog/:slug según docs/03 §7: hero con hero-blog.jpg, entradilla y autor, portada, aside sticky con índice generado de los H2 y compartir, cuerpo sanitizado con DOMPurify y estilos prose, bloque CTA del servicio tras el primer H2, etiquetas, AuthorBox, relacionados, CTA y JSON-LD Article.
4. Conecta a Supabase las secciones de blog de Inicio (últimos 3), Quiénes somos (categoría eventos-y-participaciones) y Servicio individual (categoría del servicio).
```

## Fase 7 · Actividades vulnerables

Adjunta: `@docs/03-paginas.md @docs/05-backend-supabase.md @docs/04-interacciones.md @docs/design-reference/05-actividad-vulnerable.html`

```
1. Hooks useActivities y useActivity(slug).
2. /actividades-vulnerables/:slug según docs/03 §5.2 con índice lateral sticky que resalta la sección visible (docs/04 §10), tabla de umbrales con scroll horizontal en móvil, acordeón de FAQ y bloque de contacto que enlaza a /contacto?servicio=prevencion-de-lavado-de-dinero&actividad=...
3. "Otras actividades": 3 ActivityCard excluyendo la actual.
4. Índice /actividades-vulnerables (docs/03 §5.1).
5. Carrusel de Inicio: usar actividades con show_in_home_carousel, con fallback a los datos estáticos.
```

## Fase 8 · Legales, cookies, SEO

Adjunta: `@docs/03-paginas.md @docs/07-seo-a11y-qa.md @docs/design-reference/09-legales.html`

```
1. Plantilla Legal para las 4 rutas legales (docs/03 §9), textos en src/content/legal.ts con [pendiente].
2. CookieBanner con Configurar/Rechazar/Aceptar y carga condicional de GA4 (VITE_GA_MEASUREMENT_ID).
3. Seo en todas las páginas con títulos, descripciones, canonical, OG y JSON-LD de docs/07 §1.
4. Script scripts/generate-sitemap.ts en "prebuild" que genere public/sitemap.xml con rutas estáticas + slugs publicados.
5. Página 404.
```

## Fase 9 · Panel de administración

Adjunta: `@docs/05-backend-supabase.md @docs/02-design-system.md`

```
Instala @tiptap/react, @tiptap/starter-kit, @tiptap/extension-link y @tiptap/extension-image. Construye el admin según docs/05 §5: AdminLayout (sidebar navy, logo a color), login con Supabase Auth, RequireAuth por rol, Resumen, CRUD de Blog con editor TipTap y subida de imágenes a Storage (redimensionar a WebP en el cliente), CRUD de Actividades con pestañas, duplicar y orden arrastrable, Prospectos (solo admin) con filtros, detalle, cambio de estatus, notas y exportar CSV, y Usuarios (solo admin). Todo en chunks lazy y con noindex.
```

Después crea los 2 usuarios por invitación desde el dashboard de Supabase (*Authentication → Users → Invite*) y asigna `role = 'admin'` al administrador en la tabla `profiles`.

## Fase 10 · QA y despliegue

Adjunta: `@docs/07-seo-a11y-qa.md` y todo `@docs/design-reference`

```
Recorre el checklist de docs/07 §4 página por página comparando contra los HTML de referencia. Corrige diferencias visuales, responsive (375/768/1024/1440), accesibilidad y rendimiento. Reporta lo que no se pudo resolver y lo que depende de contenido del cliente.
```

Despliegue:
1. Sube el repo a GitHub (`main`).
2. En Vercel: *Add New → Project*, importa el repo (preset Vite), agrega las variables `VITE_*` y despliega.
3. Conecta el dominio `impulsapatrimonial.com` y verifica el dominio de envío en Resend (SPF/DKIM).
4. Actualiza `ALLOWED_ORIGIN` de la Edge Function al dominio final.
5. Prueba el formulario en producción y da de alta el sitio en Google Search Console con el sitemap.

---

## Consejos para trabajar con Cursor

- Empieza cada chat con la fase y los `@` indicados; no mezcles fases.
- Si el resultado se aleja del diseño, pide: *"Compara {componente} contra docs/design-reference/xx.html y corrige medidas, colores y espaciados exactos."*
- Pide al agente que no invente textos: todo sale de los HTML o de `docs/03`.
- Haz commit al cerrar cada fase (`feat: fase 2 inicio`), así puedes volver atrás.
- Las decisiones que el agente tome por su cuenta deben quedar marcadas con `// DECISIÓN:` para revisarlas.
