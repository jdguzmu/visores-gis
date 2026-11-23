///////////////////////////////////////////////////////////////////////////
// Copyright © 2019 - 2021 Confederación Hidrográfica del Segura, O.A.. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
    'dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'dijit/form/FilteringSelect',
    'dijit/form/TextBox',
    'dijit/form/Button',
    './ResultList',
    './GestorPeticiones',
    './Peticion',
    'dojo/data/ItemFileReadStore',
    'dojo/store/DataStore',
    "dojo/has",
    './Highlight',
    'jimu/dijit/Message',
    './InfoPopup',
    'esri/layers/WMSLayerInfo',
    'esri/layers/WMTSLayerInfo',
    'esri/layers/WMTSLayer',
    'esri/layers/WMSLayer',
    'esri/layers/FeatureLayer',
    'dojo/query',
    'dojo/dom-style',
    'dojo/_base/sniff'
  ],
  function(
    declare,
    _WidgetsInTemplateMixin,
    BaseWidget,
    FilteringSelect,
    TextBox,
    Button,
    ResultList,
    GestorPeticiones,
    Peticion,
    ItemFileReadStore,
    DataStore,
    has,
    Highlight,
    Message,
    InfoPopup,
    WMSLayerInfo,
    WMTSLayerInfo,
    WMTSLayer,
    WMSLayer,
    FeatureLayer,
    dojoQuery,
    domStyle
  ) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      name: 'CHS_BuscadorCatastral',

      nivelZoom: null,
      highlight: null,
      infoPopup: null,
      layers: null,
      visible: null,
      layerDetailsWMS: null,
      servicios: null,
      mxdActual: null,
      infoVisibilidades: null,
      legends: null,
      handleOnLayerAdded: null,
      refCat: "",

      startup: function() {

        this.inherited(arguments);

        this.layerDetailsWMS = [];

        this.servicios = {};

        this.infoVisibilidades = new Array();

        this.iniciarForm();

        this.setEventos();

        this.nivelZoom = this.config.nivelZoom;

        this.legends = {};

        if (this.highlight === null) {

          var theDiv = document.createElement("div");

          if (this.map) {
            var mapDiv = dojo.byId(this.map.id);
            mapDiv.appendChild(theDiv);
            this.highlight = new Highlight({
              map: this.map,
              config: this.config
            }, theDiv);
          }
        }

      },

      onClose: function(){
        this.eliminarWMS();
      },

      setEventos: function() {

        //this.handleOnLayerAdded = this.map.on("layer-add", dojo.hitch(this, this.onLayerAdded));

        dojo.subscribe("widgetHighlightEvent", this, "onWidgetHighlight");

        var btnBuscar = dojo.byId("btnBuscar");
        dojo.connect(btnBuscar, "onclick", dojo.hitch(this, this.buscar));

        var btnLimpiar = dojo.byId("btnLimpiar");
        dojo.connect(btnLimpiar, "onclick", dojo.hitch(this, this.limpiar));

        dijit.byId("cboProvincias").on("change", dojo.hitch(this, this.cambioProvincia));

        dijit.byId("cboMunicipios").on("change", dojo.hitch(this, this.cambioMunicipio));

        dijit.byId("results").on("click", dojo.hitch(this, this.irAPunto));

        dijit.byId("txtReferenciaCatastral").on("change", this.checkCampos);
        dijit.byId("cboProvincias").on("change", this.checkCampos);
        dijit.byId("cboMunicipios").on("change", this.checkCampos);
        dijit.byId("txtParcela").on("change", this.checkCampos);
        dijit.byId("txtPoligono").on("change", this.checkCampos);
      },
      iniciarForm: function() {

        this.cargarComboProvincias();

        if (typeof(dojoQuery(".dojoxResizeHandle.dojoxResizeNW")[0]) != "undefined") {
          domStyle.set(dojoQuery(".dojoxResizeHandle.dojoxResizeNW")[0], 'display', 'none');
        }

        var panelRes = document.getElementsByClassName("resultsPane")[0];

        if (panelRes.parentNode.parentNode.clientHeight > 550) {
          panelRes.setAttribute("style", "height:" + panelRes.parentNode.parentNode.clientHeight * 0.8 + "px");
        }

      },
      onLayerAdded: function() {

        /*var unLayer = evt.layer;

        if (unLayer.layerInfos && unLayer.layerInfos[0].isBaseMapVacio) {
        	this.map.removeLayer(unLayer);
        	this.vacioEliminado = true;
        	dojo.publish("capasCargadas");
        	return;
        }

        if (!(unLayer instanceof FeatureLayer)) {

        	if (!unLayer.name && unLayer.layerInfos && unLayer.layerInfos.length > 0) {
        		unLayer.name = unLayer.layerInfos[0].name;
        	}

        	this.layers.push(unLayer);

        	dojo.publish("capasCargadas");
        }

        try {
        	this.getLegendForLayer(unLayer);
        } catch (e) {
        }*/

      },
      onWidgetHighlight: function( /*esri.Graphic*/ g, /*esri.geometry.Point*/ location, /*boolean*/ forceNav, /*Number*/ zoomScale) { // g is the graphic in the map that the widget wants highlighted and infoboxed

        if (g && location) {

          try {

            if (forceNav) {
              var zoomToExt = null;
              if (zoomScale) {
                if (dojo.isString(zoomScale)) {
                  zoomScale = parseInt(zoomScale);
                }

                if (zoomScale > 1) {
                  var currentScale = this.CalculateScale(this.map);
                  // expand/shrink the scale to match zoomScale
                  if (zoomScale / currentScale > 2 || zoomScale / currentScale < 0.5) {
                    zoomToExt = this.map.extent.expand(zoomScale / currentScale);
                    zoomToExt = zoomToExt.centerAt(location);
                  }
                }
              }

              if (!zoomToExt) {
                var ext = this.map.extent.expand(0.5);
                if (!ext.contains(location)) {
                  zoomToExt = this.map.extent;
                  zoomToExt = zoomToExt.centerAt(location);
                }
              }

              if (zoomToExt) {
                this.map.setExtent(zoomToExt);
              }
            } else {
              if (!this.map.extent.contains(location)) {
                return;
              }
            }

            if (!this.highlight) {
              this.startup();
            }

            this.highlight.setCoords(location);
            this.highlight.setMode("flashing");

            // Show InfoPopup
            if (this.infoPopup === null) {
              var theDiv = document.createElement("div");
              var mapDiv = dojo.byId(this.map.id);
              mapDiv.appendChild(theDiv);
              var popup = new InfoPopup({
                map: this.map
              }, theDiv);
              this.infoPopup = popup;

              var closeHandle = dojo.connect(popup, "onClose", dojo.hitch(this, function() {
                dojo.disconnect(closeHandle);
                if (this.infoPopup === popup) {
                  this.infoPopup = null;
                  if (this.highlight) {
                    this.highlight.setMode("off");
                  }
                } else {
                  for (var i = 0; i < this.pinnedInfoPopups.length; i++) {
                    if (this.pinnedInfoPopups[i] === popup) {
                      this.pinnedInfoPopups.splice(i, 1);
                      break;
                    }
                  }
                }
                popup.destroyRecursive();
              }));

              var pinHandle = dojo.connect(popup, "onPin", dojo.hitch(this, function() {
                dojo.disconnect(pinHandle);
                if (this.infoPopup === popup) {
                  this.infoPopup = null;
                  this.pinnedInfoPopups.push(popup);
                  if (this.highlight) {
                    this.highlight.setMode("off");
                  }
                }
              }));
            } else {
              this.infoPopup.map = this.map;
            }

            this.infoPopup.feature = g.id;

            this.infoPopup.setInfo(g);
            this.infoPopup.setCoords(location);
            if (this.infoPopup.visible === false) {
              this.infoPopup.show();
            }



          } catch (err) {
            console.error("Error resaltando elemento", err);
          }



        } else {
          if (this.highlight) {
            this.highlight.setMode("off");
          }
          if (this.infoPopup) {
            this.infoPopup.hide();
          }
        }

      },

      CalculateScale: function(map) {
        var mapLayer = this.map.getLayer(map.layerIds[0]);
        var mapUnits = mapLayer.units;
        var extent = this.map.extent;

        var mapWidthMapUnits = extent.xmax - extent.xmin;

        var mapWidthMeters;

        if (mapUnits == "esriFeet") {
          mapWidthMeters = 0.3048 * mapWidthMapUnits;
        } else
        if (mapUnits == "esriMeters") {
          mapWidthMeters = mapWidthMapUnits;
        } else
        if (mapUnits == "esriDecimalDegrees") {
          lon1 = this.degreesToRadians(extent.xmin);
          lon2 = this.degreesToRadians(extent.xmax);
          lat1 = this.degreesToRadians((extent.ymin) / 2);
          lat2 = lat1;

          mapWidthMeters = 6373000 * Math.acos(Math.sin(lat1) * Math.sin(lat2) + Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));
        }

        var imageWidthPixels = map.width;
        var imageWidthMeters = (0.0254 / 96) * imageWidthPixels;

        return Math.round(mapWidthMeters / imageWidthMeters);
      },
      degreesToRadians: function(degrees) {
        return Math.PI * degrees / 180;
      },
      highlightSeleccion: function() {

        if (this.handleMapa) {
          this.handleMapa[0].remove();
          this.handleMapa[1].remove();
          this.handleMapa = null;
          var escala = this.map.__LOD.scale;
          dojo.publish("widgetHighlightEvent", [this.paramsSeleccion[0], this.paramsSeleccion[1], true, escala]);
        }

      },
      irAPunto: function(evt) {

        if (evt && evt.target.className == "irAElementoIcon" && this.handleZoom == null) {

          if (this.puntoABorrar) {
            this.graphics.remove(this.puntoABorrar);
            this.puntoABorrar = null;
          }

          if (typeof(has("ie")) != "undefined") {
            for (var i = 0; i < this.callejeroWidget.widgets.results.getChildren().length; i++) {
              if (this.callejeroWidget.widgets.results.getChildren()[i].id == evt.target.parentNode.id) {
                this.resultItem = this.callejeroWidget.widgets.results.getChildren()[i];
                break;
              }
            }

          } else {
            this.resultItem = evt.resultItem;
          }

          if (!this.resultItem.geometria) {

            var peticion = Peticion();
            var gPeticiones = GestorPeticiones();

            var urlCatastro = this.config.proxyCors + this.config.urlServicioCoordendas + this.config.peticionCoordenadas;
            //var urlCatastro = this.config.urlServicioCoordendas + this.config.peticionCoordenadas;

            peticion.params = {
              Provincia: "",
              Municipio: "",
              SRS: "EPSG:25829",
              RC: this.resultItem.refCatastral,
              encode: true
            };

            peticion.url = urlCatastro;
            peticion.onSuccess = this.obtieneCoordenadas;
            peticion.onFailure = this.obtieneCoordenadas;
            peticion.ambito = this;
            peticion.type = 'post';
            peticion.handleAs = "xml";
            peticion.cabecera = {
              'X-Requested-With': null
            };

            gPeticiones.lanzarPeticion(peticion, false);

          } else {
            this.realizarZoom(this.resultItem.geometria);
          }

        }


      },
      realizarZoom: function(geometria) {

        var content = "<b>" + this.config.literalesRC["rcDireccion"] + ":</b> " + this.resultItem.title + "<br>";

        for (var i in this.resultItem.datosAdicionales) {
          if (this.resultItem.datosAdicionales[i] instanceof Array) {
            var unArray = this.resultItem.datosAdicionales[i];
            content += "<b>" + this.config.literalesRC[i] + "</b>";
            for (var j = 0; j < unArray.length; j++) {
              content += "<ul>";
              for (key in unArray[j]) {
                content += "<li><b>" + this.config.literalesRC[key] + ":</b> " + unArray[j][key] + "</li>";
              }
              content += "</ul>";
            }
          } else {
            content += "<b>" + this.config.literalesRC[i] + ":</b> " + this.resultItem.datosAdicionales[i] + "<br>";
          }
        }

        if (this.resultItem.href.length > 0) {
          content += "<a target='_black' href=" + this.resultItem.href + ">" + this.config.literalesRC["rcHref"] + "</a><br>";
        }

        var params = {
          id: this.resultItem.refCatastral,
          title: this.config.literalesRC["rcDireccion"],
          content: content
        };

        this.handleMapa = [];

        var p = geometria;

        this.handleMapa.push(this.map.on("zoom-end", dojo.hitch(this, this.highlightSeleccion)));
        this.handleMapa.push(this.map.on("pan-end", dojo.hitch(this, this.highlightSeleccion)));

        this.paramsSeleccion = [params, p];

        if (geometria.isInstanceOf(esri.geometry.Point)) {
          //Si es un punto hacemos un zoom, y despues un move
          this.puntoZoom = geometria;

          var urlCatastro = this.config.urlServicioCatastro;

          this.addWMSCatastro();

          if (this.map.getLevel() != this.nivelZoom) {
            var zoom = this.nivelZoom;
            try {
              this.handleZoom = this.map.on("zoom-end", dojo.hitch(this, this.moverAPunto));
              this.map.setLevel(zoom);
            } catch (e) {
              if (this.handleZoom) {
                this.handleZoom.remove();
                this.handleZoom = null;
              }
            }
          } else {
            this.moverAPunto();
          }
        }
      },
      moverAPunto: function() {

        this.map.centerAt(this.puntoZoom);
        if (this.handleZoom) {
          this.handleZoom.remove();
          this.handleZoom = null;
        }

      },
      onReferenciaCatastralResponse: function(response) {

        var parser = null;
        var xmlDoc = null;
        if ("ActiveXObject" in window) // Internet Explorer
        {
          xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
          xmlDoc.async = false;
          xmlDoc.loadXML(response);
        } else {
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(response, "text/xml");
        }

        var inicioBody = response.indexOf("<body>");
        var finBody = response.indexOf("</body>") + "</body>".length;
        var body = response.substring(inicioBody, finBody);
        body = body.replace("<a ", "<a target='_blank' style='color:blue' ");

        this.map.infoWindow.setContent(body);

        var titulo = this.config.literalesRC["rcTitulo"];
        this.map.infoWindow.setTitle(titulo);

        this.map.infoWindow.show(this.currentPoint, this.map.getInfoWindowAnchor(this.currentScreenPoint));

      },
      getReferenciaCatastral: function(point, callback) {

        var BBOX = point.x + "," + point.y + "," + (point.x + 1) + "," + (point.y + 1);
        var peticion = Peticion();
        var gestorPeticiones = GestorPeticiones();

        var urlPeticion = this.config.proxyCors + this.config.urlServicioCatastro + "?request=GetFeatureInfo&service=WMS&BBOX=" + BBOX + "&WIDTH=100&HEIGHT=100&SRS=EPSG:" + this.map.spatialReference.wkid;

        peticion.ambito = this;
        peticion.url = urlPeticion;

        if (callback) {
          peticion.onSuccess = callback;
          peticion.onFailure = callback;
        } else {
          peticion.onSuccess = this.onReferenciaCatastralResponse;
          peticion.onFailure = this.onReferenciaCatastralResponse;
        }
        peticion.type = 'get';
        peticion.handleAs = "text";
        peticion.cabecera = {
          'X-Requested-With': null
        };
        gestorPeticiones.lanzarPeticion(peticion, true);

      },
      onLinkReferenciaResponse: function(punto, response) {

        var index = response.indexOf("href");
        var href = "";

        if (index != -1) {
          href = response.substring(index + "href=".length);
          href = href.substring(0, href.indexOf(">"));
        }

        this.resultItem.href = href;
        this.realizarZoom(punto);

      },
      obtieneCoordenadas: function(response) {
        if (response) {
          var x = response.getElementsByTagName('xcen');
          var y = response.getElementsByTagName('ycen');
          this.refCat = response.getElementsByTagName('pc1')[0].textContent + response.getElementsByTagName('pc2')[0].textContent;
          var punto;
          if (x && y) {
            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              punto = new esri.geometry.Point(parseFloat(x[0].text), parseFloat(y[0].text), this.map.spatialReference);
            } else {
              punto = new esri.geometry.Point(parseFloat(x[0].textContent), parseFloat(y[0].textContent), this.map.spatialReference);
            }

            if (punto.x != 0 && punto.y != 0)
              this.getReferenciaCatastral(punto, dojo.hitch(this, this.onLinkReferenciaResponse, punto));
            else {
              new Message({
                titleLabel: "Aviso",
                message: "Coordenadas no válidas."
              });
              console.log("BuscadorCatastral :: obtieneCoordenadas :: coordenadas no válidas ", punto);
            }
            this.resultItem.geometria = punto;
          }
        }
      },
      obtenerBBox: function(layer) {

        var bbox = null,
          bboxFinal = null,
          xmin = null,
          ymin = null,
          xmax = null,
          ymax = null;
        var encontrado = false;

        if (layer.getElementsByTagName("LatLonBoundingBox").length > 0) {

          bbox = layer.getElementsByTagName("LatLonBoundingBox")[0];

          xmin = bbox.getAttribute('minx');
          ymin = bbox.getAttribute('miny');
          xmax = bbox.getAttribute('maxx');
          ymax = bbox.getAttribute('maxy');
          encontrado = true;
        } else if (layer.getElementsByTagName("BoundingBox").length > 0) {
          bbox = layer.getElementsByTagName("BoundingBox");
          for (var i = 0; i < bbox.length; i++) {
            if (bbox[i].getAttribute('SRS') == "EPSG:25829" ||
              bbox[i].getAttribute('CRS') == "EPSG:25829") {
              xmin = bbox[i].getAttribute('minx');
              ymin = bbox[i].getAttribute('miny');
              xmax = bbox[i].getAttribute('maxx');
              ymax = bbox[i].getAttribute('maxy');
              encontrado = true;
              break;
            }
          }
        }

        if (encontrado) {
          bboxFinal = xmin + "," + ymin + "," + xmax + "," + ymax;
        }

        return bboxFinal;

      },
      getServiceInfo: function(response) {
        var serviceInfo = {};
        var contentText = "textContent";

        if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
          contentText = "text";
        }

        var title = response.getElementsByTagName("Title");

        if (title.length > 0) {
          title = title[0][contentText];
          serviceInfo.title = title;
        }


        var resumen = response.getElementsByTagName("Abstract");

        if (resumen.length > 0) {
          serviceInfo.resumen = resumen[0][contentText];
        }

        var contactPerson = response.getElementsByTagName("ContactPerson");

        if (contactPerson.length > 0) {
          serviceInfo.contactPerson = contactPerson[0][contentText];
        }

        var contactOrganization = response.getElementsByTagName("ContactOrganization");

        if (contactOrganization.length > 0) {
          serviceInfo.contactOrganization = contactOrganization[0][contentText];
        }

        var contactEmail = response.getElementsByTagName("ContactElectronicMailAddress");

        if (contactEmail.length > 0) {
          serviceInfo.contactEmail = '<a href=\"mailto:' + contactEmail[0][contentText] + '\">' + contactEmail[0][contentText] + '</a>';
        }

        var fees = response.getElementsByTagName("Fees");

        if (fees.length > 0) {
          serviceInfo.fees = fees[0][contentText];
        }

        var accessConstraint = response.getElementsByTagName("AccessConstraints");

        if (accessConstraint.length > 0) {
          serviceInfo.accessConstraint = accessConstraint[0][contentText];
        }

        return serviceInfo;
      },
      _getLayerPorUrl: function(url) {

        url = url.replace(this.config.proxyCors, "");
        var layer = null;

        var arrayIds = this.map.layerIds;
        for (var i = 0; i < arrayIds.length; i++) {
          var auxLayer = this.map.getLayer(arrayIds[i]);
          auxUrl = auxLayer["url"].substring(0, auxLayer["url"].indexOf("?"));
          if (auxUrl == url) {
            layer = auxLayer
          }

        }
        return layer;

      },
      _addLayerWMS: function(extent, version, url, layerInfos, visibleLayers, id, options, visible) {

        var resourceInfo = {
          version: version,
          extent: extent,
          layerInfos: layerInfos
        };
        var wmsLayer = null;
        if (layerInfos[0] instanceof WMSLayerInfo) {

          wmsLayer = new WMSLayer(url, {
            resourceInfo: resourceInfo,
            visibleLayers: visibleLayers
          });
        } else if (layerInfos[0] instanceof WMTSLayerInfo) {
          wmsLayer = new WMTSLayer(url, {
            layerInfo: layerInfos
          });

        }

        wmsLayer.serviceInfo = options.serviceInfo;
        wmsLayer.id = id;
        wmsLayer.name = id;
        wmsLayer["urlImagenLeyenda"] = options.legendURL;

        this.layerDetailsWMS[wmsLayer.name] = {
          isWMS: true,
          id: id,
          layers: [{
            isWMS: true,
            featureInfo: options.featureInfo,
            id: visibleLayers[0],
            name: options.name,
            isCheck: visible != null && !visible ? false : true,
            legendURL: options.legendURL,
            queryable: options.queryable
          }]
        };

        this.map.addLayer(wmsLayer);

        this.servicios[wmsLayer.url] = {
          layers: wmsLayer.layerInfos
        };

        // Actualizamos visibilidades del WMS
        //this.mxdActual = wmsLayer;
        //this.inicializaInfoVisibilidades();

        if (visible != null && !visible) {
          wmsLayer.setVisibility(false);
        }
      },
      _eliminaLayerInfoDeLayer: function(layer, idLayerInfo, nombreLayerInfo) {

        var existeLayerInfo = false;
        // Si el wmslayer existe en el mapa, comprobaremos si el
        // layer info existe
        // Si existe, lo borramos del wmsLayer
        for (var i = 0; i < layer.layerInfos.length; i++) {
          if (layer.layerInfos[i].id == idLayerInfo) {
            existeLayerInfo = true;
            layer.layerInfos.splice(i, 1);
            break;
          }
        }
        if (existeLayerInfo) {
          for (var i = 0; i < layer.visibleLayers.length; i++) {
            if (layer.visibleLayers[i] == nombreLayerInfo) {
              layer.visibleLayers.splice(i, 1);
              break;
            }
          }
        }

        // Actualizamos visibilidades del WMS
        this.mxdActual = layer;
        this.inicializaInfoVisibilidades();

        return existeLayerInfo;

      },
      inicializaInfoVisibilidades: function() {

        this.infoVisibilidades[this.mxdActual.url] = {};

        var layersDefinition = this.servicios[this.mxdActual.url];

        if (layersDefinition != null && layersDefinition.layers != null) {
          for (var i = 0; i < layersDefinition.layers.length; i++) {
            var unLayer = layersDefinition.layers[i];

            if (this.infoVisibilidades[this.mxdActual.url][unLayer.name] == null) {
              this.infoVisibilidades[this.mxdActual.url][unLayer.name] = new Array();
            }

            this.infoVisibilidades[this.mxdActual.url][unLayer.name].push({
              id: unLayer.id,
              visible: unLayer.defaultVisibility
            });
          }
        } else {
          this.infoVisibilidades[this.mxdActual.url] = null;
        }

      },
      _addLayerInfoToLayer: function(layer, layerInfo) {
        layer.layerInfos[layer.layerInfos.length] = layerInfo;
        layer.visibleLayers[layer.visibleLayers.length] = layerInfo.name;

        // Actualizamos visibilidades del WMS
        this.mxdActual = layer;
        this.inicializaInfoVisibilidades();
      },
      getLegendForLayer: function(unLayer, layers) {

        /*var legend = {};
        legend.layers = [];

        for (var i = 0; i < this.layerDetails[unLayer.name].layers.length; i++) {
        	var unLayerDetail = this.layerDetails[unLayer.name].layers[i];

        	if (unLayerDetail.legendURL) {
        		legend.layers.push({
        			layerId : unLayerDetail.id,
        			layerName : unLayerDetail.name,
        			legend : [ {
        				label : "",
        				url : unLayerDetail.legendURL
        			} ]
        		});
        	}
        }
        this.legends[unLayer.name] = legend;

        dojo.publish("legendCargada");
        if (layers) {
        	this.getLegendForLayers(layers);
        }*/

      },
      _removeLayer: function(layer) {

        this.map.removeLayer(layer);

        var indice = this.layers.indexOf(layer);
        if (indice > -1) {
          this.layers.splice(indice, 1);
        }

        this.servicios[layer.url] = null;
        // Actualizamos visibilidades del WMS
        this.mxdActual = layer;
        this.inicializaInfoVisibilidades();

      },
      anadirWMS: function(evt) {

        var resultItem = evt.resultItem;

        if (resultItem) {

          var layerExistente = this._getLayerPorUrl(resultItem.url);

          var layer = new WMSLayerInfo({
            name: resultItem.name,
            title: resultItem.title
          });

          layer.id = resultItem.name;
          layer.defaultVisibility = true;
          layer.parentLayerId = -1;

          //Si el WMSLayer ya existe hay que trabajar con el
          if (layerExistente) {

            var existeLayerInfo = this._eliminaLayerInfoDeLayer(layerExistente, layer.id, layer.name);

            if (!existeLayerInfo) {

              this.layerDetailsWMS[layerExistente.id] = {
                layers: []
              };
              this.layerDetailsWMS[layerExistente.id].layers.push({
                isWMS: true,
                id: resultItem.name,
                name: resultItem.title,
                queryable: resultItem.queryable,
                legendURL: resultItem.legendURL,
                featureInfo: resultItem.featureInfo
              });

              this.getLegendForLayer(layerExistente);

            } else {

              var layerDetails = [];

              for (var idx = 0; idx < this.layerDetailsWMS[layerExistente.id].layers.length; idx++) {
                var unLayerDetail = this.layerDetailsWMS[layerExistente.id].layers[idx];

                if (unLayerDetail.id != resultItem.name) {
                  layerDetails.push(unLayerDetail);
                }
              }

              this.layerDetailsWMS[layerExistente.id].layers = layerDetails;
              this.getLegendForLayer(layerExistente);

            }

            if (layerExistente.layerInfos.length == 0) {
              this._removeLayer(layerExistente);
              delete this.layerDetailsWMS[layerExistente.id];

              if (this.legends[layerExistente.name]) {
                delete this.legends[layerExistente.name];
              }
            }
            if (existeLayerInfo) {
              evt.target.className = "wmsIcon";
              evt.target.title = "Añadir capa";
            } else {
              evt.target.className = "wmsIconMenos";
              evt.target.title = "Eliminar capa";
            }

          }
          //El wms no existe. Hay que anyadirlo nuevo.
          var extent = new esri.geometry.Extent(parseInt(resultItem.xmin), parseInt(resultItem.ymin), parseInt(resultItem.xmax), parseInt(resultItem.ymax), {
            wkid: 4326
          });
          var layerInfos = [layer];
          var visibleLayers = [layer.name];

          this._addLayerWMS(
            extent,
            resultItem.version,
            resultItem.url + "?refcat=" + this.refCat,
            layerInfos, visibleLayers,
            resultItem.nombreServidor, {
              serviceInfo: resultItem.serviceInfo,
              featureInfo: resultItem.featureInfo,
              queryable: resultItem.queryable,
              legendURL: resultItem.legendURL,
              name: resultItem.title
            },
            this.visible
          );
          evt.target.className = "wmsIconMenos";
          evt.target.title = "Eliminar capa";


        }

      },
      _responseGetCapabilities: function(url, response) {

        try {

          //Obtenemos la version obteniendo el ultimo nodo del capabilities, ya que es el nodo Element.
          var version = response.childNodes[response.childNodes.length - 1].getAttribute('version');
          var layers = response.getElementsByTagName('Layer');
          var bboxPadre = this.obtenerBBox(layers[0]);
          var serviceInfo = this.getServiceInfo(response);


          var elGetFeatureInfo = dojo.query("GetFeatureInfo", response);
          var getFeatureInfo = {

          };
          if (elGetFeatureInfo.length > 0) {
            var onlineResource = dojo.query("OnlineResource", elGetFeatureInfo[0])[0];
            getFeatureInfo.url = dojo.attr(onlineResource, "xlink:href");
          }

          //Nos saltamos el primero porque es el nodo padre, no es una capa
          var layerAgregados = {};
          for (var i = 1; i < layers.length; i++) {
            var layer = layers[i];

            var legendURL = dojo.query("LegendURL", layer);

            if (legendURL.length > 0) {
              legendURL = legendURL[0];
              var onlineResource = dojo.query("OnlineResource", legendURL)[0];
              legendURL = dojo.attr(onlineResource, "xlink:href");
            } else {
              legendURL = null;
            }
            //if (layer.getAttribute('queryable') == "1"){
            var nombre;
            var titulo;
            var urlPeticion;
            var bbox = null,
              xmin = null,
              ymin = null,
              xmax = null,
              ymax = null;

            if (layer.getElementsByTagName("Name").length > 0) {
              nombre = layer.getElementsByTagName("Name")[0];
            } else {
              nombre = layer.getElementsByTagName("Identifier")[0];
            }

            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              nombre = nombre.text;
            } else {
              nombre = nombre.textContent;
            }

            var queryable = dojo.attr(layer, "queryable") == "1";

            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              titulo = layer.getElementsByTagName("Title")[0].text;
            } else {
              titulo = layer.getElementsByTagName("Title")[0].textContent;
            }
            urlPeticion = unescape(url);
            var indiceFinal = urlPeticion.indexOf("?");
            urlPeticion = urlPeticion.substring(0, indiceFinal);

            if (!bboxPadre) {
              bbox = this.obtenerBBox(layer);
            } else {
              bbox = bboxPadre;
            }

            if (bbox) {
              bbox = bbox.split(',');
              xmin = bbox[0];
              ymin = bbox[1];
              xmax = bbox[2];
              ymax = bbox[3];
            }

            var params = {
              title: titulo,
              name: nombre,
              queryable: queryable,
              serviceInfo: serviceInfo,
              nombreServidor: this.nombreServidor,
              url: urlPeticion,
              featureInfo: getFeatureInfo,
              legendURL: legendURL,
              wms: true,
              xmin: xmin,
              ymin: ymin,
              xmax: xmax,
              ymax: ymax,
              version: version
            };

            if (this.layers == null ||
              (this.layers && this.layers.indexOf(titulo) != -1)) {
              layerAgregados[titulo] = 1;
              this.anadirWMS({
                target: {

                },
                resultItem: params
              });
            }
          }
        } catch (e) {}

      },
      getCapabilities: function(config) {

        var urlValue = config.url;
        var nombreServidor = config.nombre;
        this.layers = config.layers;

        if (config.visible != null) {
          this.visible = config.visible;
        } else {
          this.visible = true;
        }

        this.url = null;
        this.nombreServidor = nombreServidor;

        if (urlValue.indexOf("?") != -1)
          urlValue = urlValue + "&";
        else
          urlValue = urlValue + "?";

        url = urlValue + "request=GetCapabilities&SERVICE=WMS&";

        var peticion = Peticion();
        var gPeticion = GestorPeticiones();

        peticion.url = this.config.proxyCors + url;
        peticion.handleAs = "xml";
        peticion.nombreServidor = nombreServidor;
        peticion.ambito = this;
        peticion.timeout = 10000;
        peticion.type = "get";
        peticion.onSuccess = dojo.hitch(this, this._responseGetCapabilities, url);
        peticion.cabecera = {
          'X-Requested-With': null
        };

        gPeticion.lanzarPeticion(peticion, false);

      },
      addWMSCatastro: function() {

        var urlCatastro = this.config.configServerWMSCatastro["url"];
        var nombreCatastro = this.config.configServerWMSCatastro["name"];
        var layerCatastro = this.config.configServerWMSCatastro["layerWMSCatastro"];

        this.getCapabilities({
          url: urlCatastro,
          nombre: nombreCatastro,
          layers: layerCatastro
        });

      },
      buscar: function(evt) {

        var provincia = dijit.byId("cboProvincias").displayedValue;
        var municipio = dijit.byId("cboMunicipios").displayedValue;

        var referencia = dijit.byId("txtReferenciaCatastral").value;

        var peticion = Peticion();
        var parcela = dijit.byId("txtParcela").value;
        var poligono = dijit.byId("txtPoligono").value;

        var gPeticiones = GestorPeticiones();

        var result = this.validarEntrada();

        if (!result.status) {
          new Message({
            titleLabel: "Aviso",
            message: result.message
          });
          return;
        }

        var urlCatastro = this.config.urlCatastro;

        if (result.porRC) {

          peticion.params = {
            Provincia: provincia,
            Municipio: municipio,
            RC: referencia
          };
          urlCatastro += this.config.peticionReferenciaCatastral;

        } else {

          urlCatastro += this.config.peticionParcela;
          peticion.params = {
            Provincia: provincia,
            Municipio: municipio,
            Poligono: poligono,
            Parcela: parcela
          };
        }

        peticion.url = this.config.proxyCors + urlCatastro;
        peticion.onSuccess = this.obtieneResultados;
        peticion.onFailure = this.obtieneResultados;
        peticion.ambito = this;
        peticion.type = 'post';
        peticion.handleAs = "xml";
        peticion.cabecera = {
          'X-Requested-With': null
        };

        gPeticiones.lanzarPeticion(peticion, false);

      },
      obtieneResultados: function(response) {

        dijit.byId("results").clear();

        var error = response.getElementsByTagName('err');

        if (!error[0]) {

          var numeroResultados = response.getElementsByTagName('cudnp')[0];

          if (numeroResultados) {

            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              numeroResultados = parseInt(numeroResultados.text);
            } else {
              numeroResultados = parseInt(numeroResultados.textContent);
            }

            var direccion = "";

            if (numeroResultados == 1) {

              var tipoVia = response.getElementsByTagName('tv');
              var calle = response.getElementsByTagName('nv');
              var numero = response.getElementsByTagName('pnp');
              var referenciaCatastral;
              var datosAdicionales = {};

              var campoContenido = "textContent";

              if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
                campoContenido = "text";
              }

              if (tipoVia[0]) {
                //Urbano
                direccion = tipoVia[0][campoContenido] + " " + calle[0][campoContenido];
                if (numero[0]) {
                  direccion += " " + numero[0][campoContenido];
                }
                var domicilio = response.getElementsByTagName("ldt");

                if (domicilio[0]) {
                  direccion = domicilio[0][campoContenido];
                }
                datosAdicionales = this.parseaDireccion(response);
              } else {
                // Rustico
                // cpo: Codigo del poligono asociado
                var codigoPoligono = response.getElementsByTagName('cpo');
                // cpa: Codigo de la parcela.
                var codigoParcela = response.getElementsByTagName('cpa');

                // npa: Nombre del paraje
                var nombreParaje = response.getElementsByTagName('npa');
                // cpaj: Codigo del paraje
                var codigoParaje = response.getElementsByTagName('cpaj');

                var domicilio = response.getElementsByTagName("ldt");


                datosAdicionales.codigoPoligono = codigoPoligono[0][campoContenido];
                datosAdicionales.codigoParcela = codigoParcela[0][campoContenido];
                datosAdicionales.nombreParaje = nombreParaje[0][campoContenido];
                datosAdicionales.codigoParaje = codigoParaje[0][campoContenido];
                direccion = domicilio[0][campoContenido];
              }
              referenciaCatastral = response.getElementsByTagName('pc1')[0][campoContenido] + response.getElementsByTagName('pc2')[0][campoContenido];
              datosAdicionales.referenciaCatastral = referenciaCatastral;
              this.agregaResultado(direccion, referenciaCatastral, datosAdicionales);

            } else if (numeroResultados > 1) {

              var resultados = response.getElementsByTagName('rcdnp');
              for (var i = 0; i < resultados.length; i++) {
                var datos = this.parseaDireccion(resultados[i]);
                var referenciaCatastral;
                if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
                  referenciaCatastral = resultados[i].getElementsByTagName('pc1')[0].text + resultados[i].getElementsByTagName('pc2')[0].text;
                } else {
                  referenciaCatastral = resultados[i].getElementsByTagName('pc1')[0].textContent + resultados[i].getElementsByTagName('pc2')[0].textContent;
                }
                direccion = datos.direccion;
                datos.referenciaCatastral = referenciaCatastral;
                delete datos.direccion;
                this.agregaResultado(direccion, referenciaCatastral, datos);
              }

            }

          }

        } else {
          var mensajeError = error[0].getElementsByTagName('des');
          if (mensajeError[0]) {
            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              new Message({
                titleLabel: "Aviso",
                message: mensajeError[0].text
              });
            } else {
              new Message({
                titleLabel: "Aviso",
                message: mensajeError[0].textContent
              });
            }
          } else {
            new Message({
              titleLabel: "Aviso",
              message: "No se han encontrado coincidencias."
            });
          }

        }

      },
      agregaResultado: function(direccion, referenciaCatastral, datosAdicionales) {

        var feature = {};
        feature.attributes = datosAdicionales;

        var params = {
          title: direccion,
          refCatastral: referenciaCatastral,
          irAElemento: true,
          datosAdicionales: datosAdicionales,
          feature: feature
        };

        dijit.byId("results").add(params);

        var indice = dijit.byId("results").getChildren().length - 1;
        var domNode = dijit.byId("results").getChildren()[indice].domNode;
        domNode.style.cssText += "padding-left:10px !important";

      },
      parseaDireccion: function(xmlElemento) {


        var direccion = "";
        var campoContenido = "textContent";
        var datosAdicionales = {

        };

        if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
          campoContenido = "text";
        }

        if (xmlElemento) {

          var domicilio = xmlElemento.getElementsByTagName('ldt');

          if (domicilio[0]) {
            direccion = domicilio[0][campoContenido];
          } else {
            var tipoVia = xmlElemento.getElementsByTagName('tv');
            var calle = xmlElemento.getElementsByTagName('nv');
            if (tipoVia[0]) {
              direccion += tipoVia[0][campoContenido] + " ";
              direccion += calle[0][campoContenido];
            }
            if (xmlElemento.getElementsByTagName('cpo')[0]) {
              // Rustico.
              // cpo: Codigo del poligono asociado
              var codigoPoligono = xmlElemento.getElementsByTagName('cpo')[0][campoContenido];
              // cpa: Codigo de la parcela.
              var codigoParcela = xmlElemento.getElementsByTagName('cpa')[0][campoContenido];

              // npa: Nombre del paraje
              var nombreParaje = xmlElemento.getElementsByTagName('npa')[0][campoContenido];
              // cpaj: Codigo del paraje
              var codigoParaje = xmlElemento.getElementsByTagName('cpaj')[0][campoContenido];

              //nm: Nombre Municipio
              var nombreMunicipio = xmlElemento.getElementsByTagName('nm')[0][campoContenido];
              //np: Nombre Provincia
              var nombreProvincia = xmlElemento.getElementsByTagName('np')[0][campoContenido];

              direccion = "Polígono " + codigoPoligono + " Parcela " + codigoParcela + " " + nombreParaje + ". " + nombreMunicipio + " " + nombreProvincia;
            }
          }

          var numero = xmlElemento.getElementsByTagName('pnp');
          var kilometro = xmlElemento.getElementsByTagName('km');
          var bloque = xmlElemento.getElementsByTagName('bq');
          var escalera = xmlElemento.getElementsByTagName('es');
          var planta = xmlElemento.getElementsByTagName('pt');
          var puerta = xmlElemento.getElementsByTagName('pu');


          var residencial = xmlElemento.getElementsByTagName('luso');
          var superficie = xmlElemento.getElementsByTagName('sfc');
          var coeficienteParticipacion = xmlElemento.getElementsByTagName('cpt');
          var antiguedad = xmlElemento.getElementsByTagName('ant');

          var lcons = xmlElemento.getElementsByTagName('lcons');

          if (numero[0]) {

            if (!domicilio[0]) {
              direccion += " " + numero[0][campoContenido];
            }

            datosAdicionales.rcNumero = numero[0][campoContenido];
          }
          if (kilometro[0]) {
            datosAdicionales.rcKilometro = kilometro[0][campoContenido];

            if (!domicilio[0]) {
              direccion += " Kil�metro " + kilometro[0][campoContenido];
            }
          }

          if (bloque[0]) {
            datosAdicionales.rcBloque = bloque[0][campoContenido];

            if (!domicilio[0]) {
              direccion += " Bloque " + bloque[0][campoContenido];
            }
          }

          if (escalera[0]) {
            datosAdicionales.rcEscalera = escalera[0][campoContenido];
            if (!domicilio[0]) {
              direccion += " Escalera " + escalera[0][campoContenido];
            }
          }

          if (planta[0]) {
            datosAdicionales.rcPlanta = planta[0][campoContenido];
            if (!domicilio[0]) {
              direccion += " Planta " + planta[0][campoContenido];
            }
          }

          if (puerta[0]) {
            datosAdicionales.rcPuerta = puerta[0][campoContenido];
            if (!domicilio[0]) {
              direccion += " Puerta " + puerta[0][campoContenido];
            }
          }

          if (residencial[0]) {
            datosAdicionales.rcResidencial = residencial[0][campoContenido];
          }

          if (superficie[0]) {
            datosAdicionales.rcSuperficie = superficie[0][campoContenido];
          }

          if (coeficienteParticipacion[0]) {
            datosAdicionales.rcCoeficienteParticipacion = coeficienteParticipacion[0][campoContenido];
          }

          if (antiguedad[0]) {
            datosAdicionales.rcAntiguedad = antiguedad[0][campoContenido];
          }
        }

        if (codigoPoligono) {
          datosAdicionales.codigoPoligono = codigoPoligono;
          datosAdicionales.codigoParcela = codigoParcela;
          datosAdicionales.nombreParaje = nombreParaje;
          datosAdicionales.codigoParaje = codigoParaje;
        }
        datosAdicionales.direccion = direccion;
        return datosAdicionales;

      },
      validarEntrada: function() {

        var result = {
          status: false
        };

        var provincia = dijit.byId("cboProvincias").displayedValue;
        var municipio = dijit.byId("cboMunicipios").displayedValue;
        var referencia = dijit.byId("txtReferenciaCatastral").value;
        var parcela = dijit.byId("txtParcela").value;
        var poligono = dijit.byId("txtPoligono").value;

        if (referencia != null && referencia.length > 0) {

          result.status = referencia.length == 14 || referencia.length == 18 || referencia.length == 20;
          result.porRC = true;

          if (!result.status) {
            result.message = this.config.literalesRC["rcErrorRC"];
          }

        } else if (provincia != "" && municipio != "" && parcela != "" && poligono != "") {
          result.status = true;
          result.porParcela = true;
          try {
            parseInt(parcela);
          } catch (e) {
            result.status = false;
            result.message = this.config.literalesRC["rcErrorParcela"];
          }

          try {
            parseInt(poligono);
          } catch (e) {
            result.status = false;
            result.message = this.config.literalesRC["rcErrorPoligono"];
          }
        } else {
          result.status = false;
          result.message = this.config.literalesRC["rcErrorFaltanDatos"];
        }

        return result;


      },
      limpiar: function(evt) {

        dijit.byId("cboProvincias").reset();
        dijit.byId("cboMunicipios").reset();
        dijit.byId("cboMunicipios").set("disabled", true);
        dijit.byId("txtReferenciaCatastral").reset();
        dijit.byId("txtParcela").reset();
        dijit.byId("txtPoligono").reset();
        dijit.byId("results").clear();
        this.eliminarWMS();

      },
      cargarComboProvincias: function() {

        var gPeticiones = GestorPeticiones();
        var peticion = Peticion();
        var urlCatastro = this.config.proxyCors + this.config.urlCatastro + this.config.peticionProvincias;
        peticion.url = urlCatastro;
        peticion.onSuccess = this.respuestaProvincias;
        peticion.onFailure = this.respuestaProvincias;
        peticion.ambito = this;
        peticion.handleAs = "xml";
        peticion.type = 'get';
        peticion.cabecera = {
          'X-Requested-With': null
        };

        gPeticiones.lanzarPeticion(peticion, false);

      },
      respuestaProvincias: function(response) {

        var provincias = response.getElementsByTagName('prov');

        if (provincias) {

          var provinciasData = {
            identifier: "codINE",
            label: "nombre",
            items: []
          };

          for (var i = 0; i < provincias.length; i++) {
            var provincia;
            var codINE;
            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              provincia = provincias[i].getElementsByTagName('np')[0].text;
              codINE = provincias[i].getElementsByTagName('cpine')[0].text;
            } else {
              provincia = provincias[i].getElementsByTagName('np')[0].textContent;
              codINE = provincias[i].getElementsByTagName('cpine')[0].textContent;
            }
            provinciasData.items.push({
              nombre: provincia,
              codINE: codINE
            });
          }

          var provinciasDataStore = new ItemFileReadStore({
            data: provinciasData
          });

          if (dojo.version.major == 1 && dojo.version.minor > 6) {
            var store = new DataStore({
              store: provinciasDataStore
            });
            dijit.byId("cboProvincias").store = store;
          } else {
            dijit.byId("cboProvincias").store = provinciasDataStore;
          }
          dijit.byId("cboProvincias").searchAttr = "nombre";
        } else {
          new Message({
            titleLabel: "Aviso",
            message: "Error cargando las provincias."
          });
        }


      },
      cambioProvincia: function(valor) {
        if (valor != "") {
          dijit.byId("cboMunicipios").reset();
          dijit.byId("cboMunicipios").set('disabled', true);
          this.cargarComboMunicipios();
        }
      },
      cargarComboMunicipios: function() {

        var callesData = {
          identifier: "codigo",
          label: "nombre",
          items: []
        };

        var callesDataStore = new ItemFileReadStore({
          data: callesData
        });

        var gPeticiones = GestorPeticiones();
        var peticion = Peticion();
        var urlCatastro = this.config.proxyCors + this.config.urlCatastro + this.config.peticionMunicipios;

        peticion.params = {
          Provincia: escape(dijit.byId("cboProvincias").displayedValue),
          Municipio: "",
          encode: true
        };

        peticion.url = urlCatastro;
        peticion.onSuccess = this.respuestaMunicipios;
        peticion.onFailure = this.respuestaMunicipios;
        peticion.ambito = this;
        peticion.type = 'post';
        peticion.handleAs = "xml";
        peticion.cabecera = {
          'X-Requested-With': null
        };

        gPeticiones.lanzarPeticion(peticion, false);

      },
      respuestaMunicipios: function(response) {

        var municipios = response.getElementsByTagName('muni');

        if (municipios) {

          var municipiosData = {
            identifier: "codigo",
            label: "nombre",
            items: []
          };

          for (var i = 0; i < municipios.length; i++) {

            var municipio;
            var codigo;

            if ((typeof(has("ie")) != "undefined") && (has("ie") < 10)) {
              municipio = municipios[i].getElementsByTagName('nm')[0].text;
              codigo = municipios[i].getElementsByTagName('cm')[0].text;
            } else {
              municipio = municipios[i].getElementsByTagName('nm')[0].textContent;
              codigo = municipios[i].getElementsByTagName('cm')[0].textContent;
            }

            municipiosData.items.push({
              nombre: municipio,
              codigo: codigo
            });

          }

          var municipiosDataStore = new ItemFileReadStore({
            data: municipiosData
          });

          if (dojo.version.major == 1 && dojo.version.minor > 6) {

            var store = new DataStore({
              store: municipiosDataStore
            });
            dijit.byId("cboMunicipios").store = store;

          } else {
            dijit.byId("cboMunicipios").store = municipiosDataStore;
          }

          dijit.byId("cboMunicipios").searchAttr = "nombre";
          dijit.byId("cboMunicipios").set('disabled', false);

        } else {
          new Message({
            titleLabel: "Aviso",
            message: this.config.literalesRC["rcErrorMunicipios"]
          });
        }

      },
      cambioMunicipio: function(valor) {


      },
      checkCampos: function() {
        var provincias = dijit.byId("cboProvincias");
        var municipios = dijit.byId("cboMunicipios");
        var parcela = dijit.byId("txtParcela");
        var poligono = dijit.byId("txtPoligono");
        var referencia = dijit.byId("txtReferenciaCatastral");
        var disable = false;

        if (this.id == "txtReferenciaCatastral") {
          if (this.value) {
            provincias.set("disabled", true);
            municipios.set("disabled", true);
            parcela.set("disabled", true);
            poligono.set("disabled", true);
          } else {
            provincias.set("disabled", false);
            municipios.set("disabled", false);
            parcela.set("disabled", false);
            poligono.set("disabled", false);
          }
        } else if (this.value) {
          referencia.set("disabled", true);
          disable = true;
        } else {
          disable = false;
          if (provincias.value || municipios.value || parcela.value || poligono.value)
            disable = true;

          if (!disable)
            referencia.set("disabled", false);
        }

      },

      eliminarWMS: function() {
        for (var key in this.layerDetailsWMS) {

          for (var i = 0; i < this.map.graphicsLayerIds.length; i++) {
            if (this.map.graphicsLayerIds[i] == key) {
              lay = this.map.getLayer(this.map.graphicsLayerIds[i])
              this.map.removeLayer(lay)
            }
          }
          for (var i = 0; i < this.map.layerIds.length; i++) {
            if (this.map.layerIds[i] == key) {
              lay = this.map.getLayer(this.map.layerIds[i])
              this.map.removeLayer(lay)
            }
          }
        }
      }

    });
  });
