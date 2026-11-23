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
    "dojo/Deferred",
    'dojo/ready',
    'jimu/BaseWidget',
    'dijit/Toolbar',
    'dijit/form/Button',
    'dijit/ToolbarSeparator',
    'dijit/form/FilteringSelect',
    'dojo/_base/lang',
    'dojo/data/ItemFileReadStore',
    'dojo/store/DataStore',
    'dijit/form/TextBox',
    'dojo/_base/html',
    'dojo/query',
    'dojo/dom-style',
    'esri/symbols/SimpleMarkerSymbol',
    'dojo/aspect',
    'jimu/PanelManager',
    "esri/tasks/GeometryService",
    "esri/tasks/ProjectParameters",
  ],
  function(
    declare, _WidgetsInTemplateMixin, Deferred, ready, BaseWidget, Toolbar, Button, ToolbarSeparator, FilteringSelect, lang, ItemFileReadStore, DataStore, TextBox, html, dojoQuery, domStyle, SimpleMarkerSymbol, aspect, PanelManager, Color, GeometryService, ProjectParameters) {
    //To create a widget, you need to derive from BaseWidget.
    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      // Custom widget code goes here

      baseClass: 'jimu-widget-customwidget',

      //this property is set by the framework when widget is loaded.
      name: 'Coordenadas',



      operacionARealizar: "",
      xOperacion: null,
      yOperacion: null,
      nivelZoom: null,
      puntoABorrar: null,
      listaSimbolosMapa: new Array(),
      firstTime: true,


      startup: function() {

        this.inherited(arguments);
        var tPanel = this.getPanel();
        this.iniciarForm();
        this.setEventos();
        this.nivelZoom = this.config.nivelZoom;
        //this.setDimensionesPanel();
        gsvc = new esri.tasks.GeometryService("https://sampleserver6.arcgisonline.com/arcgis/rest/services/Utilities/Geometry/GeometryServer");
      },

      onOpen: function() {
        ready(lang.hitch(this, this.resizeWindow));

      },

      resizeWindow: function() {
        var panel = this.getPanel();
        var id = this.id;
        if (window.appInfo.isRunInMobile) {
          setTimeout(function() {

            var box = panel._getLayoutBox();
            var height = panel.containerNode.childNodes[0].children[0].clientHeight + 50;
            var top = (box.h / 2) + ((box.h / 2) - height);
            if (height <= (box.h / 2)) {
              document.querySelectorAll("div[id*="+id+"].jimu-panel.jimu-launchpad-panel")[0].style.height = height + "px";
              document.querySelectorAll("div[id*="+id+"].jimu-panel.jimu-launchpad-panel")[0].style.top = top + "px";
            }
          }, 500);
        } else {
          //Establecemos el tamaño y posicion del panel del widget
          var h_mapa = this.map.height
          var w_mapa = this.map.width

          panel.position.left = 10;
          panel.position.top = 225;
          panel.position.width = 390;
          panel.position.height = panel.containerNode.childNodes[0].children[0].clientHeight + (panel.containerNode.childNodes[0].children[0].clientHeight / 2);
          panel._originalBox = {
            w: panel.position.width,
            h: panel.position.height,
            l: panel.position.left || 0,
            t: panel.position.top || 0
          };
          panel.setPosition(panel.position);
          panel.panelManager.normalizePanel(panel);



        }
      },

      iniciarForm: function() {

        var config = lang.clone(this.config.coordenadas);

        var servidoresSistemasRef = {
          identifier: "wkid",
          label: "name",
          items: []
        };

        dojo.forEach(config.sistemasReferencia, dojo.hitch(this, function(sistemaRef) {
          servidoresSistemasRef.items.push(dojo.clone(sistemaRef));
        }));

        var servidoresSistemasRefDataStore = new ItemFileReadStore({
          data: servidoresSistemasRef
        });

        if (dojo.version.major == 1 && dojo.version.minor > 6) {
          var store = new DataStore({
            store: servidoresSistemasRefDataStore
          });
          dijit.byId("cboSistemas").store = store;
        } else {
          dijit.byId("cboSistemas").store = servidoresSistemasRefDataStore;
        }

        dijit.byId("cboSistemas").searchAttr = "name";
        //Colocamos como elemento seleccionado el primer elemento
        dijit.byId("cboSistemas").set("value", config.sistemasReferencia[0].wkid);

        this.msgAviso.innerHTML = this.config.mensajeAviso;

      },
      setEventos: function() {

        dijit.byId("toolbarCoordenada.pan").on("click", dojo.hitch(this, this._onMoverAPunto));
        dijit.byId("toolbarCoordenada.zoom").on("click", dojo.hitch(this, this._onZoomAPunto));
        dijit.byId("toolbarCoordenada.puntero").on("click", dojo.hitch(this, this._onResaltarPunto));
        dijit.byId("toolbarCoordenada.punto").on("click", dojo.hitch(this, this._onMarcarPunto));
        dijit.byId("toolbarCoordenada.puntoXY").on("click", dojo.hitch(this, this._onMarcarPuntoEtiqueta));
        dijit.byId("toolbarCoordenada.globo").on("click", dojo.hitch(this, this._onMarcarPuntoGlobo));
        dijit.byId("toolbarCoordenada.limpiar").on("click", dojo.hitch(this, this._onLimpiarSimbolos));
        dijit.byId("cboSistemas").on("change", dojo.hitch(this, this.cambiarTexto));

      },
      _onLimpiarSimbolos: function(evt) {

        for (var i = 0; i < this.listaSimbolosMapa.length; i++) {
          var simbolo = this.listaSimbolosMapa[i];
          this.map.graphics.remove(simbolo);
        }
        this.listaSimbolosMapa = new Array();
        this.map.infoWindow.hide();
      },
      _onMarcarPuntoGlobo: function(evt) {
        this.operacionARealizar = "marcarPuntoGlobo";
        if (this.ErrorCoordenadaPunto() > 0) {
          return
        } else {
          this.getCoordenadasTransformadas()
        }
      },
      _onMarcarPuntoEtiqueta: function(evt) {
        this.operacionARealizar = "marcarPuntoEtiqueta";
        if (this.ErrorCoordenadaPunto() > 0) {
          return
        } else {
          this.getCoordenadasTransformadas()
        }
      },
      _onMarcarPunto: function(evt) {
        this.operacionARealizar = "marcarPunto";
        if (this.ErrorCoordenadaPunto() > 0) {
          return
        } else {
          this.getCoordenadasTransformadas()
        }
      },
      _onResaltarPunto: function(evt) {
        this.operacionARealizar = "resaltarPunto";
        if (this.ErrorCoordenadaPunto() > 0) {
          return
        } else {
          this.getCoordenadasTransformadas()
        }
      },
      _onMoverAPunto: function() {

        this.operacionARealizar = "moverAPunto";
        if (this.ErrorCoordenadaPunto() > 0) {
          return
        } else {
          this.getCoordenadasTransformadas()
        }

      },
      _onZoomAPunto: function(evt) {
        this.operacionARealizar = "zoomAPunto";
        if (this.ErrorCoordenadaPunto() > 0) {
          return
        } else {
          this.getCoordenadasTransformadas()
        }
      },
      getCoordenadasTransformadas: function() {

        var map = this.map;
        var x = dijit.byId("txtX").get("value");
        var y = dijit.byId("txtY").get("value");

        if (x.trim() != "" && x.trim() != "" && !isNaN(x) && !isNaN(y)) {

          var wkid = parseInt(dijit.byId("cboSistemas").get("value"));

          var spatialReference = new esri.SpatialReference({
            'wkid': parseInt(wkid)
          });

          var sistemaReferenciaMapa = map.spatialReference.wkid;
          var spatialReferenceMap = new esri.SpatialReference({
            'wkid': parseInt(sistemaReferenciaMapa)
          });

          /** Es necesaria una transformación, se ha seleccionado un srs distinto al del mapa */
          if (wkid != sistemaReferenciaMapa) {

            var point = new esri.geometry.Point(x, y, spatialReference);
            /** #TODO COntinuar con la trasformación */

            var params = new esri.tasks.ProjectParameters();
            params.geometries = [point];
            params.outSR = spatialReferenceMap;

            //Si es ED50 aplicamos la rejilla del IGN NTv2 que es el wkid:108126
            if (spatialReference.wkid === 23029) {
              params.transformation = {
                wkid: 108126
              };
            };

            gsvc.project(params,
              dojo.hitch(this, this.responseProject),
              dojo.hitch(this, this.responseProject)
            );
			
          } else {
            this.xOperacion = x;
            this.yOperacion = y;
            this.redireccionarOperacion();
          }
        }
      },
	  
	  cambiarTexto: function(){
		if (document.getElementById("cboSistemas").value=="WGS 84 - GOOGLE"){
			document.getElementById("labelX").innerHTML="long";
			document.getElementById("labelY").innerHTML="lat";
		}
		else{
			document.getElementById("labelX").innerHTML="X";
			document.getElementById("labelY").innerHTML="Y";			
		}  
	  },
	  
      responseProject: function(response) {
        if (response[0] && response[0].x && response[0].y) {
          this.xOperacion = response[0].x;
          this.yOperacion = response[0].y;
          this.redireccionarOperacion();
        }
      },
      redireccionarOperacion: function() {

        //Colocamos como elemento seleccionado el primer elemento
        dijit.byId("cboSistemas").set("value", this.config.coordenadas.sistemasReferencia[0].wkid);
        //Añadimos a los campos las coordenadas transformadas
        dijit.byId("txtX").set("value", Math.round(this.xOperacion * 1000) / 1000);
        dijit.byId("txtY").set("value", Math.round(this.yOperacion * 1000) / 1000);

        switch (this.operacionARealizar) {
          case "moverAPunto":
            this.moverAPunto();
            break;
          case "zoomAPunto":
            this.zoomAPunto();
            break;
          case "resaltarPunto":
            this.resaltarPunto();
            break;
          case "marcarPunto":
            this.marcarPunto();
            break;
          case "marcarPuntoEtiqueta":
            this.marcarPuntoEtiqueta();
            break;
          case "marcarPuntoGlobo":
            this.marcarPuntoGlobo();
            break;
        }

      },
      marcarPunto: function(texto, temporal) {

        // var xTexto = dijit.byId("txtX").value;
        // var yTexto = dijit.byId("txtY").value;
        var xTexto = this.xOperacion;
        var yTexto = this.yOperacion;

        var sistemaReferenciaMapa = this.map.spatialReference.wkid;
        var spatialReference = new esri.SpatialReference({
          'wkid': sistemaReferenciaMapa
        });
        var point = new esri.geometry.Point(this.xOperacion, this.yOperacion, spatialReference);
        var symbol = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 10, null, new dojo.Color("red"));

        var graphic = new esri.Graphic(point, symbol, null, null);

        this.map.graphics.add(graphic);

        this.map.centerAt(point);

        if (temporal) {
          this.puntoABorrar = graphic;
        } else {
          this.listaSimbolosMapa.push(graphic);
        }

        if (texto) {
          var pointText = new esri.geometry.Point(this.xOperacion, this.yOperacion, spatialReference);
          var symbolText = new esri.symbol.TextSymbol(
            Math.round(xTexto * 1000) / 1000 + " , " + Math.round(yTexto * 1000) / 1000,
            new esri.symbol.Font("11pt"),
            new dojo.Color("black")
          );
          symbolText.setOffset(0, -17);
          var graphicText = new esri.Graphic(pointText, symbolText, null, null);
          this.map.graphics.add(graphicText);
          this.listaSimbolosMapa.push(graphicText);
        }

      },
      marcarPuntoEtiqueta: function() {

        this.marcarPunto(true, false);

      },
      resaltarPunto: function() {

        this.marcarPunto(false, true);

        setTimeout(dojo.hitch(this, function() {
          var simbolo = this.listaSimbolosMapa.pop();
          this.map.graphics.remove(this.puntoABorrar);
        }), 2000);

      },
      moverAPunto: function() {

        var punto = new esri.geometry.Point([this.xOperacion, this.yOperacion], new esri.SpatialReference({
          wkid: 25829
        }));
        this.map.centerAt(punto);

        if (this.handleZoom) {
          this.handleZoom.remove();
          this.handleZoom = null;
          this.botonZoom.set("disabled", false);
        }

      },
      zoomAPunto: function() {


        if (this.map.getLevel() != this.nivelZoom) {
          this.botonZoom = dijit.byId("toolbarCoordenada.zoom");
          this.botonZoom.set("disabled", true);
          try {
            this.handleZoom = this.map.on("zoom-end", dojo.hitch(this, this.moverAPunto));
            this.map.setLevel(this.nivelZoom);
          } catch (e) {
            this.botonZoom.set("disabled", false);
          }
        } else {
          this.moverAPunto(null);
        }

      },
      marcarPuntoGlobo: function() {

        this.map.infoWindow.setTitle("Coordenadas");

        // var x = dijit.byId("txtX").value;
        // var y = dijit.byId("txtY").value;
        var x = this.xOperacion;
        var y = this.yOperacion;

        var mensaje = Math.round(x * 1000) / 1000 + " , " + Math.round(y * 1000) / 1000;
        this.map.infoWindow.setContent(mensaje);

        this.map.infoWindow.resize(200, 55);

        var sistemaReferenciaMapa = this.map.spatialReference.wkid;
        var spatialReference = new esri.SpatialReference({
          'wkid': sistemaReferenciaMapa
        });
        var point = new esri.geometry.Point(this.xOperacion, this.yOperacion, spatialReference);

        var screenPoint = this.map.toScreen(point);
        this.map.infoWindow.show(point, this.map.getInfoWindowAnchor(screenPoint));

      },
      /* setDimensionesPanel: function() {

         var size = this.config.size;
         if ("undefined" !== typeof size) {
           if (typeof size === "object") {

             var wh = size.wh;
             if ("wh" === size.mode && typeof wh !== "undefined") {
               this._setWidthInCurrentScreen(wh);
               this._setHeightInCurrentScreen(wh);
             }
             if (typeof(dojoQuery(".dojoxResizeHandle.dojoxResizeNW")[0]) != "undefined") {
               domStyle.set(dojoQuery(".dojoxResizeHandle.dojoxResizeNW")[0], 'display', 'none');
             }

           }
         }
       },
       //evitar que la pantalla sea demasiado pequeña
       _setWidthInCurrentScreen: function(wh) {
         var screenWidth = window.innerWidth;
         if (!window.appInfo.isRunInMobile && wh.w <= screenWidth) {
           var panel = this.getPanel();
           var pm = PanelManager.getInstance().getPanelById(panel.id);
           pm.resize({
             w: wh.w
           });
         } else {
           var panel = this.getPanel();
           var pm = PanelManager.getPanelById(panel.id);
           pm.resize({
             w: "100%"
           });
         }
       },
       _setHeightInCurrentScreen: function(wh) {
         var screenHeight = window.innerHeight;
         if (!window.appInfo.isRunInMobile && wh.h <= screenHeight) {
           var panel = this.getPanel();
           var pm = PanelManager.getInstance().getPanelById(panel.id);
           pm.resize({
             h: wh.h
           });
         } else {
           var panel = this.getPanel();
           var pm = PanelManager.getInstance().getPanelById(panel.id);
           pm.resize({
             h: "100%"
           });
         }
       },*/

      ErrorCoordenadaPunto: function() {
        var x = document.getElementById("txtX").value;
        var y = document.getElementById("txtY").value;

        x = x.replace(",", ".");
        y = y.replace(",", ".");

        document.getElementById("txtX").value = x;
        document.getElementById("txtY").value = y;

        document.getElementById("txtX").style.color = "black";
        document.getElementById("txtY").style.color = "black";
        document.getElementById("errorCoord").innerHTML = "";
        var SR = parseInt(dijit.byId("cboSistemas").value);

        //Silas coordenadas son cartesianas huso29
        if (SR == 25829 || SR == 23029) {
          if (x < 460000 || x > 800000) {
            document.getElementById("txtX").style.color = "red";
            document.getElementById("errorCoord").innerHTML = "X fuera de ámbito.";
            x = 1
          } else {
            x = 0
          };
          if (y < 4625000 || y > 4845000) {
            document.getElementById("txtY").style.color = "red";
            document.getElementById("errorCoord").innerHTML += " Y fuera de ámbito.";
            y = 1
          } else {
            y = 0
          };
          return (x + y);
        }
		
		//Silas coordenadas son cartesianas huso30
        if (SR == 25830 || SR == 23030) {
          if (x < 12000 || x > 255000) {
            document.getElementById("txtX").style.color = "red";
            document.getElementById("errorCoord").innerHTML = "X fuera de ámbito.";
            x = 1
          } else {
            x = 0
          };
          if (y < 4600000 || y > 4850000) {
            document.getElementById("txtY").style.color = "red";
            document.getElementById("errorCoord").innerHTML += " Y fuera de ámbito.";
            y = 1
          } else {
            y = 0
          };
          return (x + y);
        }
        //Si las coordenadas son geográficas
        else {
          if (x < -9.435 || x > -5.118) {
            document.getElementById("txtX").style.color = "red";
            document.getElementById("errorCoord").innerHTML = "X fuera de ámbito.";
            x = 1
          } else {
            x = 0
          };
          if (y < 41.715 || y > 43.82) {
            document.getElementById("txtY").style.color = "red";
            document.getElementById("errorCoord").innerHTML += " Y fuera de ámbito.";
            y = 1
          } else {
            y = 0
          };
          return (x + y);
        };
      },

    });
  });
