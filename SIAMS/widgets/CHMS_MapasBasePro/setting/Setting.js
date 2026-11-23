define(["dojo/_base/declare", "jimu/BaseWidgetSetting", "../Catalog"],
function (declare, BaseWidgetSetting, catalog) {
  "use strict";
  return declare([BaseWidgetSetting], {
    baseClass: "chs-basemaps-setting",

    setConfig: function (config) {
      this.configNode.value = JSON.stringify(config || {}, null, 2);
    },

    getConfig: function () {
      try {
        var config = JSON.parse(this.configNode.value);
        if (!config || typeof config !== "object" || Array.isArray(config)) {
          throw new Error("Se requiere un objeto JSON.");
        }
        if (config.initialLayerIds !== undefined &&
            (!Array.isArray(config.initialLayerIds) || config.initialLayerIds.some(function (id) {
              return typeof id !== "string" || !id.trim();
            }))) {
          throw new Error("initialLayerIds debe ser una lista de identificadores de capa.");
        }
        var items = config.customBasemaps === undefined ? [] : config.customBasemaps;
        if (!Array.isArray(items)) { throw new Error("customBasemaps debe ser una lista."); }
        var ids = catalog.map(function (item) { return item.id; });
        items.forEach(function (item) {
          var allowed = ["wms", "wmts", "arcgis-tile", "vector-tile", "xyz", "imagery"];
          if (!item || typeof item.id !== "string" || !item.id.trim() ||
              ids.indexOf(item.id) >= 0 || /^__/.test(item.id) ||
              typeof item.title !== "string" || !item.title.trim() ||
              typeof item.url !== "string" || !/^https?:\/\//i.test(item.url) ||
              allowed.indexOf(item.type) < 0) {
            throw new Error("Cada fuente externa necesita ID único, título, tipo válido y URL HTTP(S).");
          }
          if ((item.type === "wms" || item.type === "wmts") &&
              !(typeof item.layer === "string" && item.layer.trim()) &&
              !(item.type === "wms" && Array.isArray(item.layer) && item.layer.length &&
                item.layer.every(function (name) { return typeof name === "string" && name.trim(); }))) {
            throw new Error("Las fuentes WMS y WMTS necesitan el nombre técnico de la capa.");
          }
          ids.push(item.id);
        });
        this.errorNode.textContent = "";
        return config;
      } catch (error) {
        this.errorNode.textContent = error.message;
        return false;
      }
    }
  });
});
