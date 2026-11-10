# 01 · Arquitectura

## 1. Resumen

Sitio público de 9 plantillas de página + panel de administración privado. El sitio es una SPA con Vite + React; el contenido que cambia (blog, actividades vulnerables) y los prospectos del formulario viven en Supabase. Lo demás (servicios, metodología, sectores, textos institucionales) es contenido estático versionado en el repo.

```
Navegador ──► Vercel (SPA estática, prerender opcional)
                 │
                 ├─► Supabase REST (lectura pública: posts y actividades publicadas)
                 ├─► Supabase Auth (solo /admin)
                 ├─► Supabase Storage (imágenes de blog y actividades)
                 └─► Edge Function `submit-contact` ─► tabla `contact_leads` + correo vía Resend
```

## 2. Stack y dependencias

| Necesidad | Paquete |
|---|---|
| Build y dev server | `vite@7`, `@vitejs/plugin-react-swc` |
| UI | `react@19`, `react-dom@19` |
| Lenguaje | `typescript@~5.8` (strict). No subir a TypeScript 7 hasta que lo soporte `typescript-eslint` |
| Estilos | `tailwindcss@3`, `postcss`, `autoprefixer`, `tailwindcss-animate`, `@tailwindcss/typography` |
| Componentes base | shadcn/ui (Radix): `button`, `input`, `textarea`, `select`, `checkbox`, `label`, `form`, `accordion`, `sheet`, `navigation-menu`, `dialog`, `toast/sonner`, `table`, `tabs`, `dropdown-menu`, `badge`, `switch` |
| Rutas | `react-router-dom@6` (fijo; npm instala v7 si no se indica la versión) |
| Datos remotos | `@tanstack/react-query@5`, `@supabase/supabase-js@2` |
| Formularios | `react-hook-form`, `zod@4`, `@hookform/resolvers` |
| SEO | `react-helmet-async` |
| Íconos | `lucide-react` |
| Fuentes self-hosted | `@fontsource-variable/source-serif-4`, `@fontsource-variable/montserrat` |
| Editor del blog (admin) | `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link`, `@tiptap/extension-image` |
| Sanitizar HTML del blog | `dompurify` |
| Utilidades | `clsx`, `tailwind-merge`, `date-fns` (locale `es`) |
| Supabase CLI (dev) | `supabase` como devDependency; se ejecuta con `npx supabase ...` |

> Las fuentes se sirven desde el propio bundle (no Google Fonts) para rendimiento y privacidad. IBM Plex Mono **no** se usa en el sitio público (solo era para anotaciones del diseño).

## 3. Estructura de carpetas

```
.
├── AGENTS.md
├── .cursor/rules/imppat.mdc
├── docs/                         # especificación + referencias de diseño
├── public/
│   ├── favicon.svg / favicon.ico / apple-touch-icon.png
│   ├── og-default.jpg            # 1200×630 para redes
│   ├── robots.txt
│   └── sitemap.xml               # generado en build (ver 07)
├── src/
│   ├── assets/                   # imágenes, logos y video (ver docs/06-assets.md)
│   ├── components/
│   │   ├── ui/                   # shadcn/ui (generados, radius 0)
│   │   ├── layout/               # SiteLayout, Navbar, ServicesMenu, MobileMenu, Footer, CookieBanner, ScrollToTop
│   │   ├── sections/             # bloques reutilizables entre páginas (ver 02)
│   │   ├── blog/                 # PostCard, PostGrid, CategoryFilter, ArticleBody, ShareBar, AuthorBox, Toc
│   │   ├── activities/           # ActivityCard, ActivityToc, ThresholdsTable, ObligationsList…
│   │   └── admin/                # AdminLayout, PostForm, ActivityForm, LeadsTable, RichTextEditor, ImageUpload
│   ├── content/                  # contenido estático tipado
│   │   ├── site.ts               # datos de contacto, redes, oficinas, navegación
│   │   ├── home.ts
│   │   ├── about.ts
│   │   ├── services.ts           # 3 prácticas + complementarios
│   │   ├── methodology.ts
│   │   ├── sectors.ts
│   │   ├── pld-calendar.ts
│   │   ├── legal.ts              # textos legales (pendientes del despacho)
│   │   └── form-options.ts       # servicios, urgencia, estados
│   ├── hooks/
│   │   ├── useScrolled.ts
│   │   ├── useInView.ts
│   │   ├── useCountUp.ts
│   │   ├── useReducedMotion.ts
│   │   └── queries/              # usePosts, usePost, useActivities, useActivity, useLeads…
│   ├── lib/
│   │   ├── supabase.ts           # cliente
│   │   ├── queryClient.ts
│   │   ├── utils.ts              # cn(), formatDate(), readingTime()
│   │   ├── seo.ts                # helpers de meta y JSON-LD
│   │   └── whatsapp.ts           # genera el enlace con mensaje predefinido
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Services.tsx
│   │   ├── ServiceDetail.tsx
│   │   ├── Activities.tsx
│   │   ├── ActivityDetail.tsx
│   │   ├── Blog.tsx
│   │   ├── BlogPost.tsx
│   │   ├── Contact.tsx
│   │   ├── Legal.tsx
│   │   ├── NotFound.tsx
│   │   └── admin/ (Login, Dashboard, Posts, PostEdit, Activities, ActivityEdit, Leads, Users)
│   ├── routes.tsx
│   ├── types/                    # tipos de dominio + database.types.ts (generado por Supabase CLI)
│   ├── index.css                 # capas Tailwind + estilos base
│   └── main.tsx
├── supabase/
│   ├── migrations/               # SQL de docs/05
│   ├── seed.sql                  # categorías, 2 artículos y 5 actividades de ejemplo
│   └── functions/submit-contact/index.ts
├── tailwind.config.ts
├── vercel.json                   # rewrites SPA
└── .env.example
```

## 4. Rutas

Slugs en español, sin acentos, en minúsculas.

| Ruta | Página | Fuente de datos | Diseño de referencia |
|---|---|---|---|
| `/` | Inicio | estático + 3 últimos posts | `01-inicio.html` |
| `/quienes-somos` | Quiénes somos | estático + posts categoría "Eventos" | `02-quienes-somos.html` |
| `/servicios` | Servicios (general) | estático | `03-servicios.html` |
| `/servicios/:slug` | Servicio individual | estático (`services.ts`) + posts de su categoría | `04-servicio-pld.html` |
| `/actividades-vulnerables` | Índice de actividades | Supabase | *(sin diseño: usar cards de "Otras actividades" en rejilla de 3)* |
| `/actividades-vulnerables/:slug` | Actividad vulnerable | Supabase | `05-actividad-vulnerable.html` |
| `/blog` | Blog | Supabase | `06-blog.html` |
| `/blog/:slug` | Artículo | Supabase | `07-blog-articulo.html` |
| `/contacto` | Contacto | estático + Edge Function | `08-contacto.html` |
| `/aviso-de-privacidad` | Legal | estático (`legal.ts`) | `09-legales.html` |
| `/terminos-de-uso` | Legal | estático | `09-legales.html` |
| `/politica-de-cookies` | Legal | estático | `09-legales.html` |
| `/descargo-de-responsabilidad` | Legal | estático | `09-legales.html` |
| `/admin/login` | Login | Supabase Auth | — |
| `/admin` | Panel (resumen) | Supabase | — |
| `/admin/blog`, `/admin/blog/nuevo`, `/admin/blog/:id` | CRUD artículos | Supabase | — |
| `/admin/actividades`, `/admin/actividades/nueva`, `/admin/actividades/:id` | CRUD actividades | Supabase | — |
| `/admin/prospectos` | Leads del formulario | Supabase | — |
| `*` | 404 | — | — |

Slugs de servicios: `prevencion-de-lavado-de-dinero`, `precios-de-transferencia`, `legal-corporativo`. Los tres usan la misma plantilla `ServiceDetail`; las secciones exclusivas de PLD (calendario de exigibilidad y puente a actividades vulnerables) se muestran solo si existen en los datos del servicio.

Filtros del blog por query string: `/blog?categoria=precios-de-transferencia&q=texto&pagina=2`.

Las páginas legales comparten `Legal.tsx`; la barra lateral "Documentos" navega entre las cuatro rutas (son enlaces, no pestañas en memoria).

### Layout y comportamiento global

- `SiteLayout` envuelve todas las rutas públicas: `Navbar` + `<Outlet/>` + `Footer` + `CookieBanner`.
- `ScrollToTop` al cambiar de ruta (respetando anclas `#`).
- Lazy loading por ruta con `React.lazy` + `Suspense` (el admin en su propio chunk).
- `AdminLayout` independiente, protegido por `RequireAuth` (sesión + rol).

## 5. Capa de datos

- `src/lib/supabase.ts` crea el cliente con `VITE_SUPABASE_URL` y `VITE_SUPABASE_ANON_KEY`.
- Tipos generados: `npm run db:types` (ejecuta `supabase gen types typescript --linked` y escribe `src/types/database.types.ts`; requiere `npx supabase link` previo). No usar `>` directamente en PowerShell 5: guarda el archivo en UTF-16.
- Un hook por consulta en `src/hooks/queries/`, con claves estables: `['posts', filters]`, `['post', slug]`, `['activities']`, `['activity', slug]`, `['leads', filters]`.
- `staleTime` de 5 min para contenido público.
- Estados de carga con skeletons cuadrados del mismo tamaño que la card final; errores con mensaje amable y enlace a Contacto.

## 6. Contenido estático vs. editable

| Contenido | Dónde vive | Quién lo cambia |
|---|---|---|
| Textos de Inicio, Quiénes somos, Servicios, Contacto | `src/content/*.ts` | Docabyte (deploy) |
| Servicios individuales (PLD, PT, Legal) | `src/content/services.ts` | Docabyte |
| Textos legales | `src/content/legal.ts` | Docabyte, con texto del despacho |
| Artículos del blog, categorías y etiquetas | Supabase `blog_posts`, `blog_categories` | Cliente desde el admin |
| Actividades vulnerables | Supabase `vulnerable_activities` | Cliente desde el admin (plantilla duplicable) |
| Prospectos del formulario | Supabase `contact_leads` | Solo lectura/estado en el admin |

## 7. Variables de entorno

`.env.example`:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SITE_URL=https://impulsapatrimonial.com
VITE_GA_MEASUREMENT_ID=          # solo se carga si el usuario acepta cookies
```

Secretos de la Edge Function (en Supabase, nunca en el cliente): `RESEND_API_KEY`, `CONTACT_TO_EMAIL=contacto@impulsapatrimonial.com`, `CONTACT_FROM_EMAIL`, `SUPABASE_SERVICE_ROLE_KEY` (inyectada por Supabase).

## 8. Despliegue

- Repo en GitHub → Vercel (preset Vite). `vercel.json` con rewrite de todas las rutas a `/index.html`.
- Ramas: `main` = producción, `develop` = preview.
- Supabase: un proyecto de producción. Migraciones con Supabase CLI (`npx supabase db push`).
- Dominio `impulsapatrimonial.com` en Vercel; correos de Resend con dominio verificado (SPF/DKIM).

## 9. SEO de una SPA (decisión)

Google indexa SPAs, pero para un despacho con blog conviene que el HTML llegue con contenido. Plan en dos niveles:

1. **Mínimo (fase de lanzamiento):** `react-helmet-async` por página, `sitemap.xml` generado en build consultando Supabase, `robots.txt`, JSON-LD (`LegalService`, `Article`, `FAQPage`, `BreadcrumbList`).
2. **Recomendado (fase posterior):** prerender estático de rutas públicas en el build (p. ej. con `vite-react-ssg` o un script de Puppeteer) y un *Deploy Hook* de Vercel que se dispare al publicar un artículo o actividad desde el admin (vía trigger de base de datos o botón "Publicar y regenerar").

Detalles en `docs/07-seo-a11y-qa.md`.
