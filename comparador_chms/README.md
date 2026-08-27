# Comparador Cartográfico CHMS

Aplicación estática sin framework ni dependencias npm. Usa ArcGIS Maps SDK for JavaScript 5.1 desde el CDN oficial y muestra una vista 2D con mapas base IGN/PNOA u OpenStreetMap.

## Desarrollo local

Desde `C:\experiencebuilder1_21`:

```powershell
python -m http.server 8080 --directory comparador-mapas-chms
```

Configure el widget con `http://localhost:8080/`. Si Experience Builder usa, por ejemplo, `https://localhost:3001`, el origen es distinto por protocolo y puerto: se usará `postMessage`, no `BroadcastChannel`. Para reproducir el canal de producción, sirva ambas aplicaciones con igual protocolo, hostname y puerto.

## Despliegue

Publique la carpeta completa en un servidor estático. Se recomienda:

```text
https://servidor-chms.es/visor/
https://servidor-chms.es/comparador-mapas-chms/
```

Así ambas páginas comparten origen y pueden usar `BroadcastChannel`. Los servidores IGN deben ser accesibles desde el navegador y permitir las solicitudes CORS necesarias.

## Parámetros

`longitude`, `latitude`, `scale`, `basemap`, `sessionId`, `sync`, `transport` y `openerOrigin`. Todos se validan. No contienen datos sensibles. Si la conexión falla, centro, escala y fondo iniciales siguen llegando por URL.

## Catálogo

`basemaps.json` es la fuente técnica única. Para añadir un fondo, incorpore una entrada con `id`, `label` y `type` (`wms`, `wmts` u `osm`), más URL/capas o matriz cuando corresponda. Añada también el mismo id/etiqueta al selector mínimo del widget en `src/runtime/basemaps.ts`; no duplique allí URLs.

## Seguridad y limitaciones

Los mensajes validan tipo, fuente, sesión, identificador, fecha, coordenadas y escala. `postMessage` valida `origin`, `source` y nunca usa `*`. En distinto origen debe conservarse `window.opener`; COOP puede impedirlo. En mismo origen se elimina `opener` tras abrir y se usa el canal aislado por sesión.

V1 no sincroniza rotación, capas operacionales ni elementos gráficos. La escala puede diferir levemente por viewport/DPI. Un servicio fallido muestra un aviso y permite elegir otro mapa.
