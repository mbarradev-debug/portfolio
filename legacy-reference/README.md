# legacy-reference (temporal)

Copia exacta del sitio estatico original (`index.html`, `css/style.css`, `js/scene.js`, `js/app.js`), incluida como referencia durante la migracion a Next.js.

- Esta carpeta **no es importada** por la aplicacion Next.js y no forma parte del build (ver `tsconfig.json`, `exclude`).
- Sirve para consultar tokens, estructura y comportamiento exactos del sitio actual mientras se reconstruyen los componentes.
- **Se eliminara al finalizar la migracion** (ver PMB-034).
