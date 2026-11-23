# CHMS Mapas Base Pro para Web AppBuilder

Adaptación del widget de Experience Builder a Web AppBuilder Developer Edition 2.19 (visor 2D, Dojo y ArcGIS API for JavaScript 3.x).

## Instalación

1. Extrae el ZIP y copia la carpeta `CHMS_MapasBasePro` a `client/stemapp/widgets/` dentro de Web AppBuilder Developer Edition. Comprueba que `manifest.json` quede directamente dentro de `CHMS_MapasBasePro`.
2. Recarga el constructor, abre el visor de pruebas y añade **Mapas Base Pro** desde la pestaña **Widget**. Guarda y abre la vista previa.
3. Si el visor tiene una segunda galería de mapas base, usa únicamente Mapas Base Pro para cambiar el fondo durante las pruebas. Cada selector gestiona sus propias capas.
4. Prueba **Cartografía → Mapa Raster IGN**. Cambia de escala varias veces y cierra y vuelve a abrir el panel. El fondo debe permanecer seleccionado. Prueba también **Restaurar fondo del mapa web**, **Mapa en blanco**, los periodos combinados y el comparador.

## Catálogo

Incluye PNOA Máxima Actualidad, PNOA 2023, 2020, 2017 y 2014, los periodos combinados 2010–2011, 2008–2009 y 2004–2007, SIGPAC 1997–2003, Americano Serie B 1956–1957, Mapa Raster IGN, Vuelo Interministerial de la Xunta 1980–1986 y Mapa en blanco.

Los favoritos son locales a cada navegador y ruta del visor. El comparador se cierra al salir de su modo o cerrar el widget. Los eventos de Marcadores Pro usan los mismos nombres e identificadores que el widget de origen y quedan disponibles cuando se inicia el widget.

## Configuración

Edita el JSON desde la configuración del widget en el constructor. El archivo `config.json` contiene los valores iniciales para nuevas instancias.

- `showPnoaYears`, `showHistoricalFlights`, `showCartography` y `enableCustomBasemaps` controlan las categorías.
- `defaultBasemapId` se utiliza al iniciar un mapa sin capas de servicio ni fondo identificado. En un web map normal manda el fondo inicial del web map.
- `initialLayerIds` permite indicar explícitamente los IDs del fondo inicial, incluidas sus capas de referencia. Deja la lista vacía para usar los metadatos del web map. Rellénala si el visor avisa de que no reconoce el fondo. Con la vista previa abierta, puedes consultarlos en la consola mediante `require(["jimu/MapManager"], function (m) { var map = m.getInstance().map; console.table(map.layerIds.map(function (id) { var layer = map.getLayer(id); return { id: id, nombre: layer.name, url: layer.url }; })); });`.
- `customBasemaps` admite `wms`, `wmts`, `arcgis-tile`, `vector-tile`, `xyz` e `imagery`. Cada fuente necesita `id` único, `title`, `type` y `url`. WMS y WMTS requieren `layer`; en WMS puede ser una lista ordenada. Los campos opcionales incluyen `category`, `subtitle`, `thumbnailUrl`, `attribution`, `enabled`, `matrixSet` (WMTS), `subDomains` (XYZ) y el par `useProxy` / `proxyUrl` (prefijo explícito de la URL).

Ejemplo de un elemento de `customBasemaps`:

```json
{
  "id": "cartografia-propia",
  "title": "Cartografía propia",
  "category": "CHMS",
  "type": "wms",
  "url": "https://geo.example.org/geoserver/wms",
  "layer": "cartografia:topografico",
  "enabled": true
}
```

## Proyección y pruebas en el visor

PNOA Máxima Actualidad usa WMTS GoogleMapsCompatible en mapas Web Mercator con niveles de teselas, y WMS en mapas dinámicos o con otra proyección. Cada servicio WMS debe ofrecer el CRS del visor. Si el visor usa EPSG:25829, verifica los WMS en ese CRS. Las capas teseladas necesitan una cuadrícula compatible con el mapa.

La versión para WAB inserta los fondos de este widget debajo de las capas temáticas y oculta el fondo original durante el cambio. Comprueba la lista de capas y la impresión del visor SIAMS si forman parte del uso previsto. La carga efectiva de servicios IGN e IDEG depende del acceso desde el navegador y de la configuración CORS o del proxy del visor.

## Cambio automático del MDT a PNOA en SIAMS

Con el MDT `MDT_02_CHMSb` como fondo activo, al acercar desde una escala con denominador mayor que 100.000 hasta 1:100.000 o más cerca, se activa PNOA Máxima Actualidad. Funciona aunque los niveles de zoom salten de 1:120.000 a 1:80.000. Al alejar, el PNOA sigue activo. Para volver al MDT, pulsa **Restaurar fondo del mapa web**. Los fondos seleccionados manualmente se conservan al cambiar de escala.

Web AppBuilder inicia la escucha al abrir el widget por primera vez. Para que funcione desde que se carga SIAMS, activa la apertura automática del widget en el constructor o define `"openAtStart": true` en la entrada de Mapas Base Pro del `config.json` de la aplicación. Puedes cerrar el panel después de que se abra.
