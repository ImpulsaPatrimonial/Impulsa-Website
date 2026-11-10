# AGENTS.md — Impulsa Patrimonial (IMPPAT)

Instrucciones permanentes para el agente de Cursor en este repositorio. Léelas antes de cualquier tarea.

## Proyecto

Sitio web corporativo de **Impulsa Patrimonial, Asesores Legales y Fiscales, S.C. (IMPPAT)**, firma mexicana de contadores y abogados fundada en 2012. Prácticas: Prevención de Lavado de Dinero (PLD), Precios de Transferencia (PT) y Legal Corporativo. Diseño y desarrollo: Docabyte.

El diseño aprobado está en `docs/design-reference/*.html` (exportado del canvas de diseño). **Es la fuente de verdad visual**: medidas, colores, tipografía, espaciados y textos salen de ahí. La especificación funcional está en `docs/`.

## Stack (no cambiar sin aprobación)

- Vite + React (18 o 19, la que instale la plantilla) + TypeScript (strict)
- Tailwind CSS 3 + shadcn/ui (Radix) — con `--radius: 0`
- React Router 6 (`createBrowserRouter`)
- TanStack Query 5 para datos remotos
- Supabase (Postgres, Auth, Storage, Edge Functions) + Resend para correos
- React Hook Form + Zod para formularios
- react-helmet-async para SEO
- lucide-react para íconos de UI
- Despliegue en Vercel

## Reglas de diseño (obligatorias)

1. **Esquinas cuadradas en todo.** Nada de `rounded-*` (excepto `rounded-full` en elementos circulares explícitos, que hoy no existen).
2. **Nunca poner líneas divisorias entre un título y su texto.**
3. Títulos en **Source Serif 4** (peso 400–500). Texto y UI en **Montserrat**. Sin otras fuentes en el sitio público.
4. Paleta: azul marino `#16325B`, azul `#005E9D`, gris `#6B7A83`, tinte `#F1F5F9`, borde `#DDE4EC`, azul claro `#8FB8E0`. Ver `docs/02-design-system.md`.
5. Tratamiento de **usted** en todos los textos. Español de México.
6. Las etiquetas rosas/magenta (`.tag`, fondo `#FCE7F3`) y los textos en mayúsculas monoespaciadas `Foto sugerida · …` de los HTML de referencia son **anotaciones de diseño**: no se implementan.
7. Respetar `prefers-reduced-motion` en todas las animaciones.
8. Contenedor: `max-width: 1200px`, padding lateral 32px (16px en móvil ≤720px).
9. Secciones con `padding-y` de 112px salvo que la referencia indique otra cosa.
10. No mostrar domicilios de oficinas: solo ciudades y "Atención en línea en todo México".

## Reglas de código

- Componentes funcionales con TypeScript; props tipadas, sin `any`.
- Un componente por archivo, nombres en PascalCase en inglés; textos visibles en español.
- Contenido estático (servicios, metodología, sectores, etc.) en `src/content/*.ts`, nunca hardcodeado dentro del JSX de las páginas.
- Contenido editable por el cliente (blog, actividades vulnerables, leads) viene de Supabase vía hooks en `src/hooks/queries/`.
- Estilos con clases de Tailwind usando los tokens del `tailwind.config.ts`. Evitar valores arbitrarios repetidos: si se repite, crear token o componente.
- Imágenes estáticas desde `src/assets/` con `import` (Vite genera hash). Siempre con `alt` descriptivo, `width`/`height` o `aspect-ratio`, y `loading="lazy"` salvo el hero.
- Accesibilidad: HTML semántico, foco visible, `aria-*` en carrusel/acordeones/menú, contraste AA.
- No instalar dependencias nuevas sin explicar por qué.
- Variables de entorno solo con prefijo `VITE_` en el cliente; nunca exponer la service role key.

## Cómo trabajar

- Antes de construir una página, abre su HTML en `docs/design-reference/` y su sección en `docs/03-paginas.md`.
- Construye primero los componentes compartidos (`docs/02-design-system.md`) y luego las páginas.
- Al terminar cada fase, corre `npm run build` y `npm run lint` sin errores.
- Si algo del diseño no está definido (p. ej. versión móvil de una sección), propón una solución coherente con el resto y deja un comentario `// DECISIÓN:` explicando.

## Mapa de documentación

| Archivo | Contenido |
|---|---|
| `docs/01-arquitectura.md` | Estructura de carpetas, rutas, capas de datos, decisiones técnicas |
| `docs/02-design-system.md` | Tokens, tipografía, componentes base y sus variantes |
| `docs/03-paginas.md` | Especificación sección por sección de cada página, con textos |
| `docs/04-interacciones.md` | Navbar, carrusel, cintilla, animaciones, contadores, acordeones |
| `docs/05-backend-supabase.md` | Esquema SQL, RLS, storage, edge functions, admin |
| `docs/06-assets.md` | Inventario de imágenes y dónde se usa cada una |
| `docs/07-seo-a11y-qa.md` | SEO, accesibilidad, rendimiento y checklist de QA |
| `docs/design-reference/` | HTML del diseño aprobado (fuente de verdad visual) |
