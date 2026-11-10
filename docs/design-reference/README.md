# Referencias de diseño

HTML exportados del canvas de diseño aprobado (escritorio, 1440 px). Son la **fuente de verdad visual** del sitio.

| Archivo | Página |
|---|---|
| `00-mapa-del-sitio.html` | Arquitectura de información |
| `00-navbar-estados.html` | Navbar: estado inicial y con scroll |
| `01-inicio.html` | Inicio |
| `02-quienes-somos.html` | Quiénes somos |
| `03-servicios.html` | Servicios (general) |
| `04-servicio-pld.html` | Servicio individual (plantilla para PLD, PT y Legal Corporativo) |
| `05-actividad-vulnerable.html` | Actividad vulnerable (plantilla duplicable) |
| `06-blog.html` | Blog |
| `07-blog-articulo.html` | Artículo |
| `08-contacto.html` | Contacto |
| `09-legales.html` | Páginas legales + banner de cookies |

## Cómo leerlos

No son HTML listos para producción. Usan un formato de componentes del canvas:

- `<x-dc>` envuelve la página; `<helmet>` contiene las fuentes y el `<style>` con las clases (`.eb`, `.lbl`, `.btn`, `.btn2`, `.btnw`, `.btno`, `.lnk`, `.ph`, `.met`, `.mq`, etc.).
- Los estilos están casi todos en línea (`style="…"`): de ahí salen medidas, colores y espaciados exactos.
- `{{variable}}` son valores dinámicos; `<sc-if value="…">` es render condicional y `<sc-for list="…">` es un bucle. Sus datos y la lógica (carrusel, contador, scroll del navbar, acordeones, filtros) están en el `<script type="text/x-dc">` al final de cada archivo, dentro de `renderVals()` y `componentDidMount()`.
- `class="tag"` (etiquetas magenta) y los textos `Foto sugerida · …` / `.phc` / `.hcap` son **anotaciones del diseñador**: no se implementan.
- `.ph` es un placeholder de foto (degradado navy). Si contiene un `<img>`, se usa esa foto; si no, la foto está pendiente.
- Las rutas de imágenes apuntan a `../../src/assets/…`, así que se ven si abres el archivo directamente desde el repositorio.
- Los enlaces entre páginas (`01-inicio.html`, etc.) deben traducirse a las rutas reales de `docs/01-arquitectura.md`.
- El bloque "Referencia: menú desplegable" en `03-servicios.html` es el diseño del menú de Servicios del navbar, **no** una sección de esa página.
