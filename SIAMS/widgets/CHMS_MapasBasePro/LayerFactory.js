define([
  "esri/layers/WMSLayer", "esri/layers/WMTSLayer", "esri/layers/WMTSLayerInfo",
  "esri/layers/ArcGISTiledMapServiceLayer", "esri/layers/ArcGISImageServiceLayer",
  "esri/layers/VectorTileLayer", "esri/layers/WebTiledLayer"
], function (WMS, WMTS, WMTSInfo, Tiled, Imagery, Vector, WebTiled) {
  "use strict";

  function wkid(sr) {
    var id = sr && (sr.latestWkid || sr.wkid);
    return id === 102100 || id === 102113 || id === 900913 ? 3857 : id;
  }

  function load(layer) {
    if (layer.loaded) { return Promise.resolve(layer); }
    return new Promise(function (resolve, reject) {
      var handles = [];
      var timer = setTimeout(function () {
        finish(new Error("El servicio tardó demasiado en responder."));
      }, 20000);

      function finish(error) {
        clearTimeout(timer);
        handles.forEach(function (handle) { handle.remove(); });
        if (error) { reject(error); } else { resolve(layer); }
      }

      handles.push(layer.on("load", function () { finish(); }));
      handles.push(layer.on("error", function () {
        finish(new Error("No se pudieron cargar los metadatos del servicio."));
      }));
    });
  }

  function create(def, map, id) {
    if (def.type === "blank") { return Promise.resolve(null); }
    return Promise.resolve().then(function () {
      var mapWkid = wkid(map.spatialReference);
      var type = def.type;
      var url = def.useProxy && def.proxyUrl ? def.proxyUrl + def.url : def.url;
      var names = Array.isArray(def.layer) ? def.layer : [def.layer];
      var options = { id: id, visible: false };
      var layer;

      // PNOA en WMS cuando el mapa usa otra proyección o una escala dinámica.
      if (def.id === "pnoa-ma" && (mapWkid !== 3857 || map.getLevel() < 0)) {
        type = "wms";
        url = "https://www.ign.es/wms-inspire/pnoa-ma";
      }

      switch (type) {
        case "wms":
          options.visibleLayers = names;
          options.format = "png";
          options.transparent = true;
          layer = new WMS(url, options);
          break;
        case "wmts":
          options.serviceMode = "KVP";
          options.layerInfo = new WMTSInfo({
            identifier: def.layer,
            tileMatrixSet: def.matrixSet || "GoogleMapsCompatible"
          });
          layer = new WMTS(url, options);
          break;
        case "arcgis-tile":
          layer = new Tiled(url, options);
          break;
        case "vector-tile":
          if (mapWkid !== 3857) { throw new Error("Este fondo vectorial requiere Web Mercator."); }
          layer = new Vector(url, options);
          break;
        case "xyz":
          if (mapWkid !== 3857) { throw new Error("Las teselas XYZ requieren Web Mercator."); }
          options.subDomains = typeof def.subDomains === "string" ?
            def.subDomains.split(",").map(function (name) { return name.trim(); }).filter(Boolean) : def.subDomains;
          options.copyright = def.attribution;
          url = url.replace(/\{z\}/g, "{level}").replace(/\{x\}/g, "{col}")
            .replace(/\{y\}/g, "{row}").replace(/\{s\}/g, "{subDomain}");
          layer = new WebTiled(url, options);
          break;
        case "imagery":
          layer = new Imagery(url, options);
          break;
        default:
          throw new Error("Tipo de fuente desconocido.");
      }

      layer.name = def.title;
      return load(layer).then(function () {
        if (type === "wms") {
          layer.setVisibleLayers(names);
          layer.setImageFormat("png");
          layer.setImageTransparency(true);
        }
        if (layer.tileInfo) {
          var tileWkid = wkid(layer.tileInfo.spatialReference);
          if (tileWkid && mapWkid && tileWkid !== mapWkid) {
            throw new Error("Las teselas están en un sistema de coordenadas distinto al del mapa.");
          }
          if (map.getLevel() < 0) {
            throw new Error("Este fondo teselado requiere un mapa con niveles de teselas.");
          }
        }
        return layer;
      });
    });
  }

  return { create: create };
});
