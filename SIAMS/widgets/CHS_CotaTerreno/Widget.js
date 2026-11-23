///////////////////////////////////////////////////////////////////////////
// Robert Scheitlin WAB Identify Widget
///////////////////////////////////////////////////////////////////////////
/*global define, console, setTimeout, clearTimeout*/
/*jshint maxlen: 250*/
//
// Copyright © 2019 - 2021 Confederación Hidrográfica del Segura, O.A.. All Rights Reserved.

define(['dojo/_base/declare',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidget',
    'esri/config',
    'dojo/Deferred',
    'dijit/ProgressBar',
    'dojo/_base/lang',
    'dojo/on',
    'dojo/aspect',
    'dojo/_base/html',
    'dojo/_base/array',
    'dojo/promise/all',
    'jimu/utils',
    'jimu/WidgetManager',
    'jimu/PanelManager',
    './GestorPeticiones',
    './Peticion',
    'jimu/dijit/Message',
    './Highlight',
    './InfoPopup',
  ],
  function(declare, _WidgetsInTemplateMixin, BaseWidget, esriConfig, Deferred, ProgressBar, lang, on, aspect, html, array,
    all, utils, WidgetManager, PanelManager, GestorPeticiones, Peticion, Message, Highlight, InfoPopup) {
    return declare([BaseWidget, _WidgetsInTemplateMixin], { /*jshint unused: false*/
      baseClass: 'jimu-widget-customwidget',
      name: 'CHS_CotaTerreno',
      infoPopup: null,
      highlight: null,
      activo: false,

      postCreate: function() {

        this.inherited(arguments);
        var id = this.id;
        dojo.create(
          "style", {
            innerHTML: "div.jimu-panel[id*='" + id + "'] {opacity: 0 !important; left: -9999px !important;}"
          },
          dojo.body()
        );

      },
      startup: function() {

        this.setEventos();

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

      onDeActive: function() {
        this.onClose();
      },

      showInfoWin: function(idResult) {
        /*if (this.map.infoWindow) {
          idResult.graphic.setInfoTemplate(this._configurePopupTemplate(idResult));
          this.map.infoWindow.setFeatures([idResult.graphic]);
          if (this.map.infoWindow.reposition) {
            this.map.infoWindow.reposition();
          }
          this.map.infoWindow.show(idResult.centerpoint);
        }*/
      },
      setEventos: function() {

        dojo.subscribe("widgetHighlightEvent", this, "onWidgetHighlight");

      },
      onOpen: function() {

        var panel = this.getPanel();
        panel.position.left = -9999;
        panel.position.top = -9999;
        panel._originalBox = {
          l: panel.position.left || -9999,
          t: panel.position.top || -9999
        };
        panel.setPosition(panel.position);
        panel.panelManager.normalizePanel(panel);

        if (!this.activo) {
          this.activo = this.map.on("click", dojo.hitch(this, this.onClick));
          var cursor = this.getCursor();
          this.map.setMapCursor(cursor);
          this.widgetManager.activateWidget(this);
        }
      },
      onClose: function() {
        if (this.activo != null) {
          this.activo.remove();
          this.activo = null;
          this.map.setMapCursor("default");
          PanelManager.getInstance().closePanel(this.id + "_panel");
        }
      },
      onClick: function(evt) {
        this.currentScreenPoint = evt.screenPoint;
        this.currentPoint = evt.mapPoint;
        this.getCotaRaster(evt.mapPoint);
      },
      getCursor: function() {
        var cursor = "";
        var cursorUrl = this.config.folderUrl + "/cursor_raster.png";
        cursor = "url('" + cursorUrl + "'),auto";
        return cursor;
      },
      getCotaRaster: function(punto) {

        if (!this.urlServicio) {
          this.urlServicio = this.config.urlServicio;
        }

        var extent = punto.x + "," + punto.y + "," + (punto.x + 1) + "," + (punto.y + 1);

        var params = {
          f: 'json',
          geometry: dojo.toJson(punto.toJson()),
          geometryType: "esriGeometryPoint ",
          sr: this.map.spatialReference.wkid,
          tolerance: 2,
          mapExtent: extent,
          imageDisplay: "100,100,96",
          returnGeometry: false
        };

        var peticion = Peticion();
        var gPeticiones = GestorPeticiones();
        peticion.ambito = this;
        peticion.url = this.config.proxyCors + this.urlServicio;
        peticion.params = params;
        peticion.onSuccess = this.onCotaResponse;
        peticion.onFailure = this.onCotaResponse;
        //peticion.type= 'post';
        peticion.handleAs = "json";
        gPeticiones.lanzarPeticion(peticion, true);


      },
      onCotaResponse: function(response) {

        var campoCota = this.config.campoCota;
        var aux = response;
        if (response.results.length > 0) {

          var result = response.results[0];
          var content = "";

          for (attr in result.attributes) {
            if (attr == campoCota) {
              var campo = "Z";
              content += campo + ": " + (Math.round(result.attributes[attr] * 10) / 10) + "<br>";
              break;
            }
          }

          if (content.length > 0) {

            var params = {
              id: "1",
              title: this.nls.CotaRasterPromedio,
              content: content
            };

            var escala = this.map.__LOD.scale;

            dojo.publish("widgetHighlightEvent", [params, this.currentPoint, true, escala]);

          } else {
            var titulo = this.nls.CotaRasterPromedio;
            var msg = this.nls.noResultados;

            new Message({
              titleLabel: titulo,
              message: msg
            });
          }

        } else {

          new Message({
            message: "No se han encontrado resultados."
          });

        }


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

      onReceiveData: function(name, widgetId, data) {

		if (name=="CHS_PantallaInicio" && data.target=="CHS_CotaTerreno"){
			//Ceamos un puntoMenuContext y un graphicMenuContext para pasarselo al IdentifyFeatures
			var pointMC = data.elementosImportar.currentLocation;
			
            this.currentScreenPoint={
            	x:data.elementosImportar.displayX,
            	y:data.elementosImportar.displayY
            }
			
			this.currentPoint={
            	x:data.elementosImportar.currentLocation.x,
            	y:data.elementosImportar.currentLocation.y
            }
			
			this.getCotaRaster(pointMC);
			
			//Si mantenemos comentado, deja la herramienta de consulta abierta
			/*this.onActive();
				
			this.activo.remove();
			this.activo = null;
			this.map.setMapCursor("default");
			PanelManager.getInstance().closePanel(this.id + "_panel");	
			*/
			

		}
		
		
		
      },


    });
  });
