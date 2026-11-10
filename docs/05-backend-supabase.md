# 05 · Backend (Supabase) y panel de administración

## 1. Alcance

- **Blog autoadministrable**: artículos, categorías y etiquetas.
- **Actividades vulnerables**: plantilla duplicable; el despacho crea páginas nuevas sin costo por página.
- **Prospectos** del formulario de contacto, con estado de seguimiento.
- **Roles**: 1 administrador + 1 editor (ampliable).

| Acción | admin | editor |
|---|---|---|
| Crear/editar/publicar artículos y categorías | ✓ | ✓ |
| Crear/editar/publicar actividades vulnerables | ✓ | ✓ |
| Ver y gestionar prospectos | ✓ | ✗ |
| Gestionar usuarios y roles | ✓ | ✗ |

## 2. Migración inicial (`supabase/migrations/0001_init.sql`)

```sql
-- Extensiones
create extension if not exists pgcrypto;

-- Roles
create type public.app_role as enum ('admin', 'editor');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.app_role not null default 'editor',
  created_at timestamptz not null default now()
);

-- Crear perfil automáticamente al registrar un usuario (por invitación desde el dashboard)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', new.email));
  return new;
end; $$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Helpers de rol (security definer para usarlos en políticas sin recursión)
create or replace function public.current_role_is(r public.app_role)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid() and role = r);
$$;

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles where id = auth.uid());
$$;

-- updated_at genérico
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

-- Blog
create table public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  sort_order int not null default 0
);

create table public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content_html text not null default '',
  cover_image_url text,
  cover_image_alt text,
  category_id uuid references public.blog_categories(id) on delete set null,
  tags text[] not null default '{}',
  author_name text,
  author_role text,
  author_bio text,
  reading_minutes int,
  featured boolean not null default false,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_at timestamptz,
  seo_title text,
  seo_description text,
  search tsvector generated always as (
    to_tsvector('spanish', coalesce(title, '') || ' ' || coalesce(excerpt, ''))
  ) stored,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index blog_posts_published_idx on public.blog_posts (status, published_at desc);
create index blog_posts_search_idx on public.blog_posts using gin (search);
create index blog_posts_tags_idx on public.blog_posts using gin (tags);
create trigger blog_posts_updated before update on public.blog_posts
for each row execute function public.set_updated_at();

-- Actividades vulnerables
create table public.vulnerable_activities (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  summary text,
  hero_image_url text,
  hero_image_alt text,
  card_image_url text,               -- foto para cards y carrusel
  body_image_url text,               -- foto 16:9 bajo la descripción
  body_image_alt text,
  description_html text not null default '',
  obligations jsonb not null default '[]',   -- string[]
  thresholds jsonb not null default '[]',    -- {supuesto, identificacion, aviso}[]
  deadlines jsonb not null default '[]',     -- {plazo, tramite}[]
  sanctions jsonb not null default '[]',     -- {incumplimiento, sancion}[]
  faqs jsonb not null default '[]',          -- {q, a}[]
  show_in_home_carousel boolean not null default false,
  sort_order int not null default 0,
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create trigger vulnerable_activities_updated before update on public.vulnerable_activities
for each row execute function public.set_updated_at();

-- Prospectos
create table public.contact_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  company text not null,
  email text not null,
  phone text not null,
  activity text not null,
  service text not null,
  urgency text not null,
  state text not null,
  message text,
  privacy_accepted boolean not null,
  source_path text,
  ip_hash text,
  status text not null default 'nuevo'
    check (status in ('nuevo', 'contactado', 'en_proceso', 'descartado')),
  notes text
);
create index contact_leads_created_idx on public.contact_leads (created_at desc);

-- RLS
alter table public.profiles enable row level security;
alter table public.blog_categories enable row level security;
alter table public.blog_posts enable row level security;
alter table public.vulnerable_activities enable row level security;
alter table public.contact_leads enable row level security;

create policy "perfil propio o admin" on public.profiles
  for select using (id = auth.uid() or public.current_role_is('admin'));
create policy "admin gestiona perfiles" on public.profiles
  for update using (public.current_role_is('admin'));

create policy "categorías públicas" on public.blog_categories for select using (true);
create policy "staff gestiona categorías" on public.blog_categories
  for all using (public.is_staff()) with check (public.is_staff());

create policy "posts publicados visibles" on public.blog_posts
  for select using (status = 'published' and published_at <= now());
create policy "staff ve todos los posts" on public.blog_posts
  for select using (public.is_staff());
create policy "staff gestiona posts" on public.blog_posts
  for all using (public.is_staff()) with check (public.is_staff());

create policy "actividades publicadas visibles" on public.vulnerable_activities
  for select using (status = 'published');
create policy "staff ve todas las actividades" on public.vulnerable_activities
  for select using (public.is_staff());
create policy "staff gestiona actividades" on public.vulnerable_activities
  for all using (public.is_staff()) with check (public.is_staff());

-- Prospectos: sin acceso anónimo. La inserción la hace la Edge Function con service role.
create policy "admin lee prospectos" on public.contact_leads
  for select using (public.current_role_is('admin'));
create policy "admin actualiza prospectos" on public.contact_leads
  for update using (public.current_role_is('admin'));
```

### Storage

Bucket público `media` (imágenes de blog y actividades), máx. 5 MB, tipos `image/jpeg, image/png, image/webp`.

```sql
insert into storage.buckets (id, name, public) values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media lectura pública" on storage.objects
  for select using (bucket_id = 'media');
create policy "staff sube media" on storage.objects
  for insert with check (bucket_id = 'media' and public.is_staff());
create policy "staff edita media" on storage.objects
  for update using (bucket_id = 'media' and public.is_staff());
create policy "staff borra media" on storage.objects
  for delete using (bucket_id = 'media' and public.is_staff());
```

Rutas: `media/blog/{slug}/cover.webp`, `media/actividades/{slug}/hero.webp`. Redimensionar en el cliente antes de subir (máx. 2000 px de ancho, WebP calidad 0.8) con `<canvas>`.

## 3. Seed (`supabase/seed.sql`)

- **Categorías**: `prevencion-de-lavado-de-dinero` (Prevención de Lavado de Dinero), `precios-de-transferencia`, `legal-corporativo`, `actividades-vulnerables`, `eventos-y-participaciones`.
- **Artículos** (los 2 iniciales del contrato + borradores de ejemplo):
  1. *Reforma a la LFPIORPI: qué cambia y cuándo debe cumplir su empresa* — publicado, `featured`, PLD, 7 min. Contenido completo en `07-blog-articulo.html` (secciones "Qué cambió con la reforma de 2025", "Lo que se mantiene", "Un calendario gradual", "Qué hacer antes del 30 de noviembre de 2026"). Etiquetas: reforma2025, actividadesvulnerables, avisos.
  2. *Declaraciones maestra, local y país por país: ¿su grupo está obligado?* — PT, 6 min, contenido `[pendiente]`.
  3. Borradores (status `draft`) con los títulos del diseño: Autorregularización espontánea…; Activos virtuales: nuevas obligaciones a partir de mayo de 2027; Beneficiario controlador…; Acuerdos conclusivos ante PRODECON…; Libros corporativos…; y los 3 de "Eventos y participaciones" de Quiénes somos.
- **Actividades** (5, `show_in_home_carousel = true`): Compraventa de inmuebles, Comercialización de vehículos, Joyería y metales preciosos, Activos virtuales, Juegos con apuesta y sorteos. Con las 6 obligaciones generales y el resto de campos `[pendiente]`. Imágenes: las de `src/assets/images/av-*.jpg` subidas a `media/actividades/…`.

## 4. Edge Function `submit-contact`

`supabase/functions/submit-contact/index.ts` (Deno):

```ts
import { createClient } from 'npm:@supabase/supabase-js@2'
import { z } from 'npm:zod@3'

const cors = {
  'Access-Control-Allow-Origin': Deno.env.get('ALLOWED_ORIGIN') ?? '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

const Lead = z.object({
  fullName: z.string().trim().min(3).max(120),
  company: z.string().trim().min(2).max(160),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().min(10).max(20),
  activity: z.string().trim().min(2).max(160),
  service: z.string().min(1),
  urgency: z.string().min(1),
  state: z.string().min(1),
  message: z.string().max(2000).optional().default(''),
  privacyAccepted: z.literal(true),
  website: z.string().max(0).optional(), // honeypot
  sourcePath: z.string().max(200).optional(),
})

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: cors })
  if (req.method !== 'POST') return json({ error: 'method' }, 405)

  const parsed = Lead.safeParse(await req.json().catch(() => ({})))
  if (!parsed.success) return json({ error: 'validation' }, 400)
  const d = parsed.data

  const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!)

  // Límite simple: máx. 5 envíos por IP por hora
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  const ipHash = await sha256(ip + (Deno.env.get('IP_SALT') ?? ''))
  const since = new Date(Date.now() - 3600_000).toISOString()
  const { count } = await supabase.from('contact_leads')
    .select('id', { count: 'exact', head: true }).eq('ip_hash', ipHash).gte('created_at', since)
  if ((count ?? 0) >= 5) return json({ error: 'rate_limited' }, 429)

  const { error } = await supabase.from('contact_leads').insert({
    full_name: d.fullName, company: d.company, email: d.email, phone: d.phone,
    activity: d.activity, service: d.service, urgency: d.urgency, state: d.state,
    message: d.message, privacy_accepted: d.privacyAccepted, source_path: d.sourcePath, ip_hash: ipHash,
  })
  if (error) return json({ error: 'db' }, 500)

  // Aviso por correo al despacho (Resend)
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${Deno.env.get('RESEND_API_KEY')}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: Deno.env.get('CONTACT_FROM_EMAIL'),           // p. ej. "Sitio web <web@impulsapatrimonial.com>"
      to: [Deno.env.get('CONTACT_TO_EMAIL')],             // contacto@impulsapatrimonial.com
      reply_to: d.email,
      subject: `Nuevo prospecto · ${d.service} · ${d.urgency}`,
      html: renderLeadEmail(d),                            // tabla simple con todos los campos (escapar HTML)
    }),
  }).catch(() => null) // el lead ya quedó guardado; no fallar por el correo

  return json({ ok: true }, 200)
})
```

(`json`, `sha256`, `renderLeadEmail` y el escape de HTML se implementan en el mismo archivo.)

Si el honeypot `website` viene con texto, responder `200 { ok: true }` sin guardar.

Opcional: correo de confirmación al prospecto ("Recibimos su mensaje…") — **confirmar con el cliente** antes de activarlo.

Cliente: `supabase.functions.invoke('submit-contact', { body })`.

## 5. Panel de administración (`/admin`)

Diseño funcional y sobrio con los mismos tokens (fondo `tint`, sidebar `navy`, tipografía del sitio, esquinas cuadradas). Sin indexar (`noindex`).

- **Login** (`/admin/login`): correo + contraseña (Supabase Auth). Recuperar contraseña por correo. Los usuarios se crean por **invitación** desde el dashboard de Supabase; el admin asigna el rol en `profiles`.
- **Resumen**: conteo de prospectos nuevos (solo admin), últimos artículos y actividades editados, accesos rápidos.
- **Blog**: tabla con búsqueda y filtro por estado/categoría. Formulario: título, slug (autogenerado, editable), categoría, etiquetas (chips), extracto, imagen de portada + alt, contenido (editor TipTap: H2, H3, párrafo, negritas, cursivas, listas, enlaces, cita, imagen), autor (nombre, cargo, bio), minutos de lectura (calculado de 200 palabras/min, editable), destacado, SEO (título, descripción con contador), fecha de publicación, botones Guardar borrador / Publicar / Vista previa (abre `/blog/{slug}?preview=1` usando la sesión).
- **Actividades**: tabla con orden arrastrable (`sort_order`) y botón **Duplicar** (crea copia en borrador con slug `-copia`). Formulario por pestañas: General (nombre, slug, resumen, imágenes), Descripción (TipTap), Obligaciones (lista editable), Umbrales (tabla editable), Plazos, Sanciones, Preguntas frecuentes, SEO. Casilla "Mostrar en el carrusel de Inicio".
- **Prospectos** (solo admin): tabla (fecha, nombre, empresa, servicio, urgencia, estado de la república, estatus) con filtros; detalle en panel lateral; cambiar estatus y notas; exportar CSV.
- **Usuarios** (solo admin): lista de perfiles y cambio de rol.

Seguridad: todas las rutas `/admin/*` (salvo login) bajo `RequireAuth`; el rol se valida también en RLS. El HTML del editor se sanitiza al guardar **y** al renderizar.

## 6. Regenerar sitio al publicar (si se usa prerender)

Crear un Deploy Hook en Vercel y guardarlo como secreto `VERCEL_DEPLOY_HOOK`. Una Edge Function `trigger-rebuild` (solo staff) lo llama; el admin muestra el botón "Publicar y actualizar sitio" que guarda y luego invoca la función.
