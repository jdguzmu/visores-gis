define([], function () {
  "use strict";

  var HIST_URL = 'https://www.ign.es/wms/pnoa-historico'
  var PNOA_MA_WMS = 'https://www.ign.es/wms-inspire/pnoa-ma'
  var XUNTA_INTERMINISTERIAL_URL = 'https://ideg.xunta.gal/servizos/rest/services/Raster/VooInterministerial_1980_1986/ImageServer'
  var GALICIA_BBOX = '-9.55,41.75,-6.65,43.85'

  function wmsThumb (url, layer) {
    var q = new URLSearchParams({
      SERVICE: 'WMS', VERSION: '1.1.1', REQUEST: 'GetMap', FORMAT: 'image/jpeg', TRANSPARENT: 'FALSE',
      SRS: 'EPSG:4326', BBOX: GALICIA_BBOX, WIDTH: '420', HEIGHT: '240', LAYERS: Array.isArray(layer) ? layer.join(',') : layer, STYLES: ''
    })
    return `${url}?${q.toString()}`
  }

  function imageryThumb (url) {
    var query = new URLSearchParams({
      bbox: '457330,4612990,704890,4855060', bboxSR: '25829', imageSR: '25829',
      size: '420,240', format: 'jpg', f: 'image'
    })
    return url + '/exportImage?' + query.toString()
  }

  var defs = [
    { id: 'xunta-interministerial-1980-1986', title: 'Vuelo Interministerial 1980-1986', subtitle: 'Xunta de Galicia · 25 cm', category: 'custom', type: 'imagery', url: XUNTA_INTERMINISTERIAL_URL, thumbUrl: imageryThumb(XUNTA_INTERMINISTERIAL_URL), tag: '1980–86', customCategory: 'Xunta de Galicia / IDEG' },
    { id: 'pnoa-ma', title: 'PNOA Máxima Actualidad', subtitle: 'Ortofoto oficial más reciente', category: 'current', type: 'wmts', url: 'https://www.ign.es/wmts/pnoa-ma', layer: 'OI.OrthoimageCoverage', matrixSet: 'GoogleMapsCompatible', thumbUrl: wmsThumb(PNOA_MA_WMS, 'OI.OrthoimageCoverage'), tag: 'ACTUAL' },

    { id: 'pnoa-2023', title: 'PNOA 2023', subtitle: 'Ortofoto histórica con cobertura CHMS', category: 'pnoa', type: 'wms', url: HIST_URL, layer: 'PNOA2023', year: 2023, thumbUrl: wmsThumb(HIST_URL, 'PNOA2023'), tag: '2023' },
    { id: 'pnoa-2020', title: 'PNOA 2020', subtitle: 'Ortofoto histórica con cobertura CHMS', category: 'pnoa', type: 'wms', url: HIST_URL, layer: 'PNOA2020', year: 2020, thumbUrl: wmsThumb(HIST_URL, 'PNOA2020'), tag: '2020' },
    { id: 'pnoa-2017', title: 'PNOA 2017', subtitle: 'Ortofoto histórica con cobertura CHMS', category: 'pnoa', type: 'wms', url: HIST_URL, layer: 'PNOA2017', year: 2017, thumbUrl: wmsThumb(HIST_URL, 'PNOA2017'), tag: '2017' },
    { id: 'pnoa-2014', title: 'PNOA 2014', subtitle: 'Ortofoto histórica con cobertura CHMS', category: 'pnoa', type: 'wms', url: HIST_URL, layer: 'PNOA2014', year: 2014, thumbUrl: wmsThumb(HIST_URL, 'PNOA2014'), tag: '2014' },

    { id: 'pnoa-2010-2011', title: 'PNOA 2010–2011', subtitle: 'Cobertura combinada para la Demarcación Miño-Sil', category: 'pnoa', type: 'wms', url: HIST_URL, layer: ['PNOA2010', 'PNOA2011'], year: 2010, thumbUrl: wmsThumb(HIST_URL, ['PNOA2010', 'PNOA2011']), tag: '2010–11' },
    { id: 'pnoa-2008-2009', title: 'PNOA 2008–2009', subtitle: 'Cobertura combinada para la Demarcación Miño-Sil', category: 'pnoa', type: 'wms', url: HIST_URL, layer: ['PNOA2008', 'PNOA2009'], year: 2008, thumbUrl: wmsThumb(HIST_URL, ['PNOA2008', 'PNOA2009']), tag: '2008–09' },
    { id: 'pnoa-2004-2007', title: 'PNOA 2004–2007', subtitle: 'Cobertura combinada para la Demarcación Miño-Sil', category: 'pnoa', type: 'wms', url: HIST_URL, layer: ['PNOA2004', 'PNOA2005', 'PNOA2006', 'PNOA2007'], year: 2004, thumbUrl: wmsThumb(HIST_URL, ['PNOA2004', 'PNOA2005', 'PNOA2006', 'PNOA2007']), tag: '2004–07' },

    { id: 'sigpac', title: 'SIGPAC 1997–2003', subtitle: 'Vuelo SIGPAC', category: 'flights', type: 'wms', url: HIST_URL, layer: 'SIGPAC', thumbUrl: wmsThumb(HIST_URL, 'SIGPAC'), tag: '1997–03' },
    { id: 'americano-b', title: 'Americano Serie B 1956–1957', subtitle: 'Army Map Service · vuelo histórico', category: 'flights', type: 'wms', url: HIST_URL, layer: 'AMS_1956-1957', thumbUrl: wmsThumb(HIST_URL, 'AMS_1956-1957'), tag: '1956–57' },
    { id: 'mtn', title: 'Mapa Raster IGN', thumbUrl: wmsThumb('https://www.ign.es/wms-inspire/mapa-raster', 'mtn_rasterizado'), subtitle: 'Mapa Topográfico Nacional', category: 'cartography', type: 'wms', url: 'https://www.ign.es/wms-inspire/mapa-raster', layer: 'mtn_rasterizado', tag: 'MTN'},
    { id: 'blank', title: 'Mapa en blanco', subtitle: 'Sin mapa base', category: 'cartography', type: 'blank', tag: 'BLANCO'}
  ]

  return defs;
});
