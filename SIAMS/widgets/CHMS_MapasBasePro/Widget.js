define([
  "dojo/_base/declare", "dojo/dom-construct", "dojo/on", "jimu/BaseWidget",
  "esri/dijit/LayerSwipe", "./Catalog", "./LayerFactory"
], function (declare, dom, on, BaseWidget, LayerSwipe, catalog, layers) {
  "use strict";

  var eventName = "chs-mapas-base-pro:active";
  var requestName = "chs-mapas-base-pro:request";
  var pnoaScale = 100000;
  var mdtUrl = "https://siams.chminosil.es/server/rest/services/mdts/mdt_02_chmsb/mapserver";

  var categories = [
    ["current", "Actualidad"], ["pnoa", "PNOA CHMS", "showPnoaYears"],
    ["flights", "Vuelos", "showHistoricalFlights"], ["cartography", "Cartografía", "showCartography"],
    ["custom", "Otros", "enableCustomBasemaps"], ["favorites", "Favoritos"]
  ];

  function element(parent, tag, label, className) {
    var node = dom.create(tag, { className: className || "" }, parent);
    if (label) { node.textContent = label; }
    return node;
  }

  function button(parent, label, action, selected) {
    var node = element(parent, "button", label);
    node.type = "button";
    if (typeof selected === "boolean") { node.setAttribute("aria-pressed", String(selected)); }
    node.onclick = action;
    return node;
  }

  function normalize(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function storageRead(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key) || "null") || fallback; }
    catch (error) { return fallback; }
  }

  function storageWrite(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* Storage is optional. */ }
  }

  return declare([BaseWidget], {
    baseClass: "chs-mapas-base-pro",

    startup: function startup() {
      this.inherited(startup, arguments);
      this.sequence = 0;
      this.mode = "gallery";
      this.category = "current";
      this.query = "";
      this.timelineIndex = 0;
      this.leftId = "americano-b";
      this.rightId = "pnoa-ma";
      this.activeId = "__initial__";
      this.activeLayer = null;
      this.comparison = null;
      this.favoritesKey = "chs-mapas-base-pro:wab:favorites:" + location.pathname;
      this.favorites = storageRead(this.favoritesKey, []);
      if (!Array.isArray(this.favorites)) { this.favorites = []; }
      this.config = this.config || {};
      this.availableCategories = categories.filter(function (category) {
        return !category[2] || this.config[category[2]] !== false;
      }, this);
      this.items = catalog.slice();
      if (this.config.enableCustomBasemaps !== false && Array.isArray(this.config.customBasemaps)) {
        this.config.customBasemaps.forEach(function (item) {
          if (!item || item.enabled === false || !item.id || !item.title || !item.url || this._find(item.id)) { return; }
          var def = Object.assign({}, item);
          def.category = "custom";
          def.subtitle = item.subtitle || item.category || "Fuente externa";
          def.thumbUrl = item.thumbnailUrl;
          def.tag = item.category || "EXTERNO";
          this.items.push(def);
        }, this);
      }
      this.visibleItems = this.items.filter(function (def) {
        return this.availableCategories.some(function (category) { return category[0] === def.category; });
      }, this);
      this.timeline = this.visibleItems.filter(function (def) {
        return def.category === "current" || def.category === "pnoa";
      });

      this._readInitial();
      this._publish();
      this._render();
      this.own(on(window, requestName, function (event) {
        var detail = event.detail || {};
        var def = this._find(detail.id) || this.items.filter(function (item) {
          return detail.title && item.title === detail.title;
        })[0];
        if (detail.id === "__initial__") { this._restore(); }
        else if (def) { this._apply(def); }
      }.bind(this)));

      this.previousScale = this.map.getScale();
      this.own(this.map.on("extent-change", this._updateScale.bind(this)));

      var initial = this._find(this.config.defaultBasemapId || "pnoa-ma");
      if (!this.initialMetadata.length && this.map.layerIds.length === 0 && initial) { this._apply(initial); }
    },

    _updateScale: function () {
      var previousScale = this.previousScale;
      var scale = this.map.getScale();
      if (!Number.isFinite(scale) || scale <= 0) { return; }
      this.previousScale = scale;
      if (!(previousScale > pnoaScale && scale <= pnoaScale) ||
          this.activeId !== "__initial__" || this.pending || this.comparison) { return; }

      var hasMdt;
      try {
        hasMdt = this._baseLayers().some(function (layer) {
          var url = String(layer.url || "").split(/[?#]/)[0].replace(/\/+$/, "").toLowerCase();
          return layer.visible !== false && url === mdtUrl;
        });
      } catch (error) {
        this._status(error.message, true);
        return;
      }
      if (hasMdt) { return this._apply(this._find("pnoa-ma"), true); }
    },

    _find: function (id) {
      return this.items.filter(function (def) { return def.id === id; })[0];
    },

    _readInitial: function () {
      var info = this.map.itemInfo || {};
      var data = info.itemData || {};
      var base = data.baseMap || {};
      this.initialTitle = base.title || "Fondo del mapa web";
      this.initialMetadata = base.baseMapLayers || [];
      this.operationalIds = (data.operationalLayers || []).map(function (layer) { return layer.id; });
    },

    _baseLayers: function () {
      var ids = this.config.initialLayerIds || [];
      var map = this.map;
      if (ids.length) {
        var configured = ids.map(function (id) { return map.getLayer(id); });
        if (configured.some(function (layer) { return !layer; })) {
          throw new Error("Revisa initialLayerIds. Hay identificadores que no están en el mapa.");
        }
        return configured;
      }

      var matched = [];
      var candidates = map.layerIds.map(function (id) { return map.getLayer(id); }).filter(function (layer) {
        return layer && layer !== this.activeLayer && layer.id.indexOf(this.id + "-fondo-") !== 0 &&
          this.operationalIds.indexOf(layer.id) < 0;
      }, this);
      this.initialMetadata.forEach(function (entry) {
        var layer = entry.id && map.getLayer(entry.id);
        if (!layer && entry.url) {
          var matches = candidates.filter(function (candidate) { return candidate.url === entry.url; });
          if (matches.length === 1) { layer = matches[0]; }
        }
        if (layer && matched.indexOf(layer) < 0) { matched.push(layer); }
      });

      candidates.forEach(function (layer) {
        if (layer._basemapGalleryLayerType && matched.indexOf(layer) < 0) { matched.push(layer); }
      });

      if ((this.initialMetadata.length && matched.length < this.initialMetadata.length) ||
          (!this.initialMetadata.length && !matched.length && candidates.length)) {
        throw new Error("No se identificaron las capas del fondo inicial. Configura sus IDs en initialLayerIds.");
      }
      return matched;
    },

    _hideInitial: function () {
      if (this.initialVisibility) { return; }
      this.initialVisibility = this._baseLayers().map(function (layer) {
        return { layer: layer, visible: layer.visible };
      });
      this.initialVisibility.forEach(function (entry) { entry.layer.hide(); });
    },

    _showInitial: function () {
      if (!this.initialVisibility) { return; }
      this.initialVisibility.forEach(function (entry) {
        if (entry.visible) { entry.layer.show(); }
        else { entry.layer.hide(); }
      });
      this.initialVisibility = null;
    },

    _publish: function () {
      var def = this._find(this.activeId);
      var detail = { id: this.activeId, title: def ? def.title : this.initialTitle };
      this.activeNode.textContent = "Fondo activo · " + detail.title;
      storageWrite(eventName, { id: detail.id, title: detail.title, ts: Date.now() });
      window.dispatchEvent(new CustomEvent(eventName, { detail: detail }));
    },

    _status: function (message, error) {
      this.statusNode.textContent = message || "";
      this.statusNode.classList.toggle("chs-error", Boolean(error));
    },

    _remove: function (layer) {
      if (layer && this.map && this.map.getLayer(layer.id) === layer) { this.map.removeLayer(layer); }
    },

    _apply: function (def, automatic) {
      var request = ++this.sequence;
      this.pending = "base";
      this._stopCompare();
      this._status("Cargando " + def.title + "…");
      return layers.create(def, this.map, this.id + "-fondo-" + request).then(function (layer) {
        if (request !== this.sequence) { return; }
        if (automatic === true && this.map.getScale() > pnoaScale) {
          this.pending = null;
          this._status("");
          return;
        }
        var previousLayer = this.activeLayer;
        try {
          if (layer) { this.map.addLayer(layer, 0); }
          this._hideInitial();
          if (layer) { layer.show(); }
        } catch (error) {
          this._remove(layer);
          if (this.activeId === "__initial__") { this._showInitial(); }
          throw error;
        }
        this._remove(previousLayer);
        this.activeLayer = layer;
        this.activeId = def.id;
        this.pending = null;
        this._status(def.attribution || "");
        this._publish();
        this._refreshActive();
      }.bind(this)).catch(function (error) {
        if (request !== this.sequence) { return; }
        this.pending = null;
        this._status(def.title + " · " + error.message, true);
      }.bind(this));
    },

    _restore: function () {
      ++this.sequence;
      this.pending = null;
      this._stopCompare();
      this._remove(this.activeLayer);
      this.activeLayer = null;
      this._showInitial();
      this.activeId = "__initial__";
      this._status("");
      this._publish();
      this._refreshActive();
    },

    _stopCompare: function () {
      if (this.pending === "compare") {
        ++this.sequence;
        this.pending = null;
        this._status("");
      }
      var comparison = this.comparison;
      if (!comparison) { return; }
      this.comparison = null;
      if (comparison.swipe) { comparison.swipe.destroy(); }
      if (comparison.node) { dom.destroy(comparison.node); }
      this._remove(comparison.left);
      this._remove(comparison.right);
      if (this.activeLayer) { this.activeLayer.show(); }
      if (this.activeId === "__initial__") { this._showInitial(); }
    },

    _compare: function () {
      var left = this._find(this.leftId);
      var right = this._find(this.rightId);
      if (!left || !right || left === right) { return; }
      this._stopCompare();
      var request = ++this.sequence;
      var prefix = this.id + "-fondo-" + request;
      this.pending = "compare";
      this._status("Cargando los fondos del comparador…");
      Promise.all([
        layers.create(left, this.map, prefix + "-left"),
        layers.create(right, this.map, prefix + "-right")
      ]).then(function (pair) {
        if (request !== this.sequence) { return; }
        this.pending = null;
        this.comparison = { left: pair[0], right: pair[1] };
        this.map.addLayer(pair[1], 0);
        this.map.addLayer(pair[0], 1);
        this._hideInitial();
        if (this.activeLayer) { this.activeLayer.hide(); }
        pair[0].show();
        pair[1].show();
        this.comparison.node = dom.create("div", {}, this.map.root);
        this.comparison.swipe = new LayerSwipe({
          type: "vertical", map: this.map, layers: [pair[0]],
          left: Math.round(this.map.width / 2)
        }, this.comparison.node);
        this.comparison.swipe.startup();
        this._status([left.attribution, right.attribution].filter(Boolean).join(" · "));
      }.bind(this)).catch(function (error) {
        if (request !== this.sequence) { return; }
        this.pending = null;
        this._stopCompare();
        this._status("Comparador · " + error.message, true);
      }.bind(this));
    },

    _setMode: function (mode) {
      this._stopCompare();
      this.mode = mode;
      this._render();
    },

    _render: function () {
      dom.empty(this.modeNode);
      dom.empty(this.contentNode);
      [["gallery", "Galería"], ["timeline", "Tiempo"], ["compare", "Comparar"]].forEach(function (mode) {
        button(this.modeNode, mode[1], this._setMode.bind(this, mode[0]), this.mode === mode[0]);
      }, this);
      button(this.contentNode, "Restaurar fondo del mapa web", this._restore.bind(this));
      if (this.mode === "gallery") { this._gallery(); }
      if (this.mode === "timeline") { this._timeline(); }
      if (this.mode === "compare") { this._comparePanel(); }
    },

    _gallery: function () {
      var search = element(this.contentNode, "input", "", "chs-search");
      search.type = "search";
      search.placeholder = "Buscar año, vuelo o mapa…";
      search.setAttribute("aria-label", search.placeholder);
      search.value = this.query;
      search.oninput = function () {
        this.query = search.value;
        this._renderCards();
      }.bind(this);
      this.categoryNode = element(this.contentNode, "div", "", "chs-tabs");
      this.cardsNode = element(this.contentNode, "div", "", "chs-grid");
      this._renderCategories();
      this._renderCards();
    },

    _renderCategories: function () {
      dom.empty(this.categoryNode);
      this.availableCategories.forEach(function (category) {
        button(this.categoryNode, category[1], function () {
          this.category = category[0];
          this._renderCategories();
          this._renderCards();
        }.bind(this), this.category === category[0]);
      }, this);
    },

    _renderCards: function () {
      dom.empty(this.cardsNode);
      var query = normalize(this.query.trim());
      var matches = this.visibleItems.filter(function (def) {
        if (query && normalize([def.title, def.subtitle, def.tag].join(" ")).indexOf(query) < 0) { return false; }
        if (this.category === "favorites") { return this.favorites.indexOf(def.id) >= 0; }
        return Boolean(query) || this.category === def.category;
      }, this);

      matches.forEach(function (def) {
        var card = element(this.cardsNode, "article", "", "chs-card");
        var select = button(card, "", this._apply.bind(this, def), def.id === this.activeId);
        select.dataset.basemapId = def.id;
        if (def.thumbUrl) {
          var img = element(select, "img");
          img.alt = "";
          img.loading = "lazy";
          img.onerror = function () { img.hidden = true; };
          img.src = def.thumbUrl;
        }
        element(select, "strong", def.title);
        element(select, "span", def.subtitle);
        var favorite = this.favorites.indexOf(def.id) >= 0;
        var star = button(card, favorite ? "★" : "☆", function () {
          var index = this.favorites.indexOf(def.id);
          if (index >= 0) { this.favorites.splice(index, 1); }
          else { this.favorites.push(def.id); }
          storageWrite(this.favoritesKey, this.favorites);
          if (this.category === "favorites" && index >= 0) { this._renderCards(); }
          else {
            star.textContent = index >= 0 ? "☆" : "★";
            star.setAttribute("aria-pressed", String(index < 0));
          }
        }.bind(this), favorite);
        star.className = "chs-star";
        star.setAttribute("aria-label", "Favorito · " + def.title);
      }, this);
      if (!matches.length) { element(this.cardsNode, "p", "No hay mapas que coincidan."); }
    },

    _refreshActive: function () {
      if (this.mode !== "gallery" || !this.cardsNode) { return; }
      Array.prototype.forEach.call(this.cardsNode.querySelectorAll("[data-basemap-id]"), function (node) {
        node.setAttribute("aria-pressed", String(node.dataset.basemapId === this.activeId));
      }, this);
    },

    _timeline: function () {
      var activeId = this.activeId;
      var activeIndex = this.timeline.findIndex(function (item) { return item.id === activeId; });
      if (activeIndex >= 0) { this.timelineIndex = activeIndex; }
      var title = element(this.contentNode, "h3", this.timeline[this.timelineIndex].title);
      var input = element(this.contentNode, "input", "", "chs-range");
      input.type = "range";
      input.min = 0;
      input.max = this.timeline.length - 1;
      input.value = this.timelineIndex;
      input.setAttribute("aria-label", "Periodo de ortofoto");
      var update = function () {
        this.timelineIndex = Number(input.value);
        var def = this.timeline[this.timelineIndex];
        title.textContent = def.title;
        input.setAttribute("aria-valuetext", def.title);
        return def;
      }.bind(this);
      input.oninput = update;
      input.onchange = function () { this._apply(update()); }.bind(this);
      button(this.contentNode, "Aplicar ortofoto", function () { this._apply(update()); }.bind(this));
    },

    _comparePanel: function () {
      var choices = this.visibleItems.filter(function (item) { return item.type !== "blank"; });
      [["Izquierda", "leftId"], ["Derecha", "rightId"]].forEach(function (side, index) {
        var label = element(this.contentNode, "label", side[0], "chs-select");
        var select = element(label, "select");
        choices.forEach(function (def) { element(select, "option", def.title).value = def.id; });
        select.value = this[side[1]];
        if (!select.value && choices.length) { select.selectedIndex = Math.min(index, choices.length - 1); }
        this[side[1]] = select.value;
        select.onchange = function () { this[side[1]] = select.value; }.bind(this);
      }, this);
      button(this.contentNode, "Activar comparador", this._compare.bind(this));
      button(this.contentNode, "Cerrar comparador", function () {
        this._stopCompare();
        this._status("");
      }.bind(this));
    },

    onClose: function () {
      this._stopCompare();
    },

    destroy: function destroy() {
      if (typeof this.sequence === "number") {
        ++this.sequence;
        this._stopCompare();
        this._remove(this.activeLayer);
        this._showInitial();
      }
      this.inherited(destroy, arguments);
    }
  });
});
