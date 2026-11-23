///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2017 Esri. All Rights Reserved.
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
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/on',
  'dijit/_WidgetsInTemplateMixin',
  'jimu/BaseWidget',
  'jimu/LayerInfos/LayerInfos',
  'esri/tasks/IdentifyTask',
  'esri/tasks/IdentifyParameters',
  './GestorPeticiones',
  './Peticion',
  'esri/symbols/SimpleFillSymbol',
  'esri/Color',
  'esri/symbols/SimpleLineSymbol',
  'jimu/WidgetManager',
  "esri/layers/LayerInfo",
], function(declare, lang, html, on,
  _WidgetsInTemplateMixin, BaseWidget, LayerInfos, IdentifyTask, IdentifyParameters, GestorPeticiones, Peticion, SimpleFillSymbol, Color, SimpleLineSymbol, WidgetManager, LayerInfo) {

  var clazz = declare([BaseWidget, _WidgetsInTemplateMixin], {
    name: 'CHS_CuencasVertientes',
    baseClass: 'jimu-widget-cuencasVertientes',
    identifyParams: null,
    identifyTask: null,
    // urlCapa: 'https://www.chsegura.es/arcgis/rest/services/VISOR_CHSIC3/VISOR_PUBLICO_ETRS89_v5_Web_Capas/MapServer/',
    // urlCuencasVertices: 'http://mercator:6080/arcgis/rest/services/HidrologiaCuencas/GPServer/CuencasVertientes/execute',
    // urlGeometryService: 'https://www.chsegura.es/rest/services/Utilities/Geometry/GeometryServer',
    //proxyCors: 'https://www.chsegura.es/chsic/proxyImpresion/query',
    clickMap: false,
    active: false,

    constantes: {
      CAMPO_NOMBRE: "NOMBRE",
      CAMPO_COTAMAX: "COTAMAX",
      CAMPO_COTAMIN: "COTAMIN",
      esriSRUnit_Kilometer: 9036,
      esriSRUnit_Meter: 9001
    },


    startup: function() {
      this.inherited(arguments);
    },

    onOpen: function() {
		document.getElementById("barraBotones").style.top=(this.panel.position.height/2.7)+"px";
		document.getElementById("barraBotones").style.display = "none";
    },

	
    onClose: function() {
      this.limpiarResultado();
      this.active = false;
    },


    identifica_Clicked: function() {
      if(this.active == false){
        var self = this,
          ok = false,
          btn = this.identificaButton;
        //btn.style.backgroundColor = '#e2e2e2';
        this.btnIdentificaPunto = btn;
        this.clickMap = true;
		
        this.getSubCuencas();
      }
    },

    getSubCuencas: function() {

      var cursorSniper = "url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAA05JREFUSIntVV9oU3cYPfeXm5va/G2aJoZmvd6kVWy6Yhksg5VZ6aRPorMrVphUq4hsYzD6UnFP7kWRPQzcYBuMwtgehIkbbHRDSWVqhTIQetP05iatlpY22ibmT2MSb353Lw5Ml18Ke/Y8ft/5vvOd8/IBr7ANuK2FOZ7/SPD7H7THYncBYPnYsd2F6elhQ3PzAbqxwcFkAi0WFzhd/8vZ1fWza3IyCwCKy3VBW1+/EQQiTIFIQ8MJAnxoaGn5wOj3b9Bs9nuayRhNHR2/UOA3cXz8CaamsPzokVS+f3+wUi4fMjY3X5dmZr5Qvd4BLZ3+SisWD70ORGsKyJ2dlvzcHLE3Nn5LbDY3Vyhc2p3N/smyHwb4Vq/340qpFCSEtAmSNKLn8+/4o9FrzMyejI5aFbf7j6jVemNh505xm4gRc7vfmnc4/la83ou1+mRrIX3z5vlKqfRNMZc7WcpmLyf8/jbWcsXjeZNS+rlJFPuJ0ehbOnp0oO41K8ePu+KBwG28iE4GnAlJ8rD4s07nXrmz0wkAySNHAqrPx4wTABATxdGYKJ6rS6oDpbV1cm14uOqgqogMFkv/jkDgHmuBDpDVsTEzq2+w26e1fL6PKaClUqZngvCw1vDqyMiuuNcbzkxMXGUekMnMPYtGrUwBrqHB0BQKWWoNPy8UkrRUSvFW6wJLQNvcLAEos/pQPJ6LiZ6ebiZhG8Ql6crD3t63X65VOyDkjra8/P7/Wa6Hw7xOacg+OBhhkwCiuN2/Lg0N7QCAuMvVoYriARZ/3mLplX0+JwAkQqGDalvbxFZOtQOAEkJ+KM/MjMVaWgIVSr8jZnOCJaBp2pLh6dOv493d7koyOa4Lwmd1barB4Gsrp069F7VaL887nQ+ie/bsqjsAQLbZ2uft9vWY2XywVr/KQXsksrp569YwaWx8F7o+Zcjlzi4ePuxgLU/09HSbHI4vtVzukwrHnU7s23dmK+c//0AGBKMo/mjZv/+nsqqatJWVT8HzqlEUbz9PpyNIpYrE4ejTHj/u43ie8E1NY/7ZWUWVpPPa4uL1vYBSVwAAYoCJdHX1t8vy79eGhgxvxONBjtIBbW3NxgkCOLM5wvF8OCDLyX9ndIBwAGW5fQUm/gGAWDfC9Cef6QAAAABJRU5ErkJggg==),auto";
      this.map.setMapCursor(cursorSniper);
      dojo.byId("resultadosCuenca").innerHTML = "";
      this.own(on(this.map, 'click', lang.hitch(this, 'executeIdentifyTaskSubCuencas')));

      dojo.addClass(this.btnIdentificaPunto, "jimu-state-disabled");
      var idLayerSubCuenca = "42";
      this.identifyTask = new IdentifyTask(this.config.urlCapa);
      this.identifyParams = new IdentifyParameters();
      this.identifyParams.tolerance = 1;
      this.identifyParams.returnGeometry = true;
      this.identifyParams.layerIds = [idLayerSubCuenca];
      this.identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
      this.identifyParams.width = this.map.width;
      this.identifyParams.height = this.map.height;
    },


    executeIdentifyTaskSubCuencas: function(event) {
      this.map.setMapCursor("auto");
      //this.btnIdentificaPunto.style.backgroundColor = '';
      if (this.clickMap == true && this.active == false) {
        this.active = true;
        this.addLoading();
        this.clickMap = false;
        var featuresSubCuencas = null;
        this.identifyParams.geometry = event.mapPoint;
        this.identifyParams.mapExtent = this.map.extent;
        var that = this;
        this.identifyTask.execute(this.identifyParams).addCallback(function(response) {

          if (response != null) {
            if (response && response.length > 1) {
              that.setMessageError('Error demasiados resultados');
              that.removeClickMap();
            }
            else if(response && response.length <= 0){
              that.setMessageError('No se encontraron cuencas');
              that.removeClickMap();
            }
            else {
              if (response[0].feature.attributes.CALCULO == 1) {
                that.calcularCuencaVertiente(response[0].feature);
              } else {
                that.setMessageError('Error datos cuenca');
                that.removeClickMap();
              }
            }
          } else {
            that.setMessageError('Error datos cuenca');
            that.removeClickMap();
          }
        });
      }

    },
    removeClickMap: function(event) {
      this.active = false;
      this.clickMap = false;
      dojo.removeClass(this.btnIdentificaPunto, "jimu-state-disabled");
    },
    calcularCuencaVertiente: function(featureSubCuenca) {
		document.getElementById("barraBotones").style.display = "none";//ocultamos el botón de exportación durante el cálculo
      if (featureSubCuenca != undefined || featureSubCuenca != null) {

        var _wkid = featureSubCuenca.geometry.spatialReference.wkid;
        var idTramo = featureSubCuenca.attributes.ID_TRAMO;


        var url = this.config.urlCuencasVertices;

        //almacenamos en un objeto los parametros q el buffer necesita
        var params = {
          f: "json",
          Id_de_tramo: idTramo,
          "env:outSR": _wkid,
          "env:processSR": _wkid,
          returnM: false,
          returnZ: false
        };

        //parameros de la peticion
        var peticion = Peticion();
        peticion.params = params; //parametros
        peticion.ambito = this;
        peticion.type = 'post';
        peticion.onSuccess = this.calcularCuencavertienteResponse; //si satisfactoria

        peticion.onFailure = function(error) {
          this.setMessageError("Error al cargar los datos");
          this.removeClickMap();
        }; //si erronea
        peticion.url = this.config.proxyCors + '?' + url; //url del servicio con proxy

        //Lanza la peticion
        var gPeticion = GestorPeticiones();
        gPeticion.lanzarPeticion(peticion, false);

      }
    },

    setMessageError: function(textoError) {
      this.removeLoading();
      var b = dojo.byId("resultadosCuenca");
      b.innerHTML = "<p class='label'><font class='fontResultado'>" + textoError + "</font></p>"; +
      "</b>";

    },

    calcularCuencavertienteResponse: function(response) {
      var cuencaValida = true;
      if (response && response.results) {
        var cuencaDisuelta = null;
        var cuencasSalida = null;
        var cauces = null;
        for (var e = 0; e < response.results.length; e++) {
          var feature = response.results[e];
          if (feature.paramName == "CaucesSalida") {
            cauces = feature.value.features;
          } else {
            if (feature.paramName == "CuencaDisuelta") {
              cuencaDisuelta = feature.value.features;
            } else {
              if (feature.paramName == "CuencasSalida") {
                cuencasSalida = feature.value.features;
              } else {
                if (feature.paramName == "CuencaValida") {
                  cuencaValida = feature.value;
                }
              }
            }
          }
        }
        this.limpiarResultado();
        
		if (cuencaValida) {
          this.addCuencas(cuencaDisuelta);
          this.addCauces(cauces);
          var cotaMaxMinCuencaSalida = this.getCotaMaximaYMinima(cuencasSalida);
          this.cotaMinima = cotaMaxMinCuencaSalida.cotaMin;
          this.cotaMaxima = cotaMaxMinCuencaSalida.cotaMax;
          this.getArea(cuencaDisuelta[0]);
		  document.getElementById("barraBotones").style.display = "inherit";//activamos el botón de exportar
		  //Rellenamos los atributos del grafico 1 (poligono) para la exportacion a anotaciones
			
			for(var i=0; i<this.resultados.cuencas.length; i++){
				this.resultados.cuencas[i].Nombre = "Cuenca Vertiente " + this.resultados.cuencas[i].attributes.OBJECTID
				this.resultados.cuencas[i].attributes.CotaMin = this.cotaMinima
				this.resultados.cuencas[i].attributes.CotaMax = this.cotaMaxima
			}
			for(var i=0; i<this.resultados.cauces.length; i++){
				this.resultados.cauces[i].Nombre = "Cauce " + this.resultados.cauces[i].attributes.OBJECTID
			}
		  
          var unionCaucesCuencas = [];
          unionCaucesCuencas = unionCaucesCuencas.concat(this.resultados.cauces);
          unionCaucesCuencas = unionCaucesCuencas.concat(this.resultados.cuencas);
          extent = esri.graphicsExtent(unionCaucesCuencas);
          if (extent != null) {
            extent.spatialReference = this.map.spatialReference;
            this.map.setExtent(extent, true);
            this.handleClick = this.map.graphics.on("click", dojo.hitch(this, this.onClickResult));
          }
        } else {
          var b = dojo.byId("resultadosCuenca");
          b.innerHTML = "<p class='label'><font class='fontResultado'>Con los datos disponibles, no es posible calcular las sub-cuencas</font></p>"; +
          "</b>"
        }
      } else {
        var b = dojo.byId("resultadosCuenca");
        b.innerHTML = "<p class='label'><font class='fontResultado'>Se produjo un error durante el calculo de cuenca</font></p>"; +
        "</b>"
      }
      this.removeLoading();
      this.removeClickMap();

    },

    addCuencas: function(cuencaDisuelta) {
      for (var d = 0; d < cuencaDisuelta.length; d++) {
        var cuenca = cuencaDisuelta[d];
        var estiloCuenca = new esri.symbol.SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new esri.Color([110, 110, 110, 1]), 1.33), new esri.Color([115, 76, 0, 0.39]));
        var graphicCuenca = new esri.Graphic(new esri.geometry.Polygon(cuenca.geometry), estiloCuenca, cuenca.attributes);
        this.resultados.cuencas.push(graphicCuenca);
        this.map.graphics.add(graphicCuenca);
      }
    },
    addCauces: function(cauces) {
      for (var c = 0; c < cauces.length; c++) {
        var cauce = cauces[c];
        var estiloCauce = new esri.symbol.SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new esri.Color([0, 0, 255, 0.39]), 4);
        var graphicCauce = new esri.Graphic(new esri.geometry.Polyline(cauce.geometry), estiloCauce, cauce.attributes);
        this.resultados.cauces.push(graphicCauce);
        this.map.graphics.add(graphicCauce);
      }
    },

    getCotaMaximaYMinima: function(cuencasSalida) {
      var cotaMaxMin = {};
      var cuencaCotaMax = null;
      var cuencaCotaMin = null;
      var campoCotaMax = this.constantes.CAMPO_COTAMAX;
      var campoCotaMin = this.constantes.CAMPO_COTAMIN;
      for (var c = 0; c < cuencasSalida.length; c++) {
        if (cuencaCotaMax == null) {
          cuencaCotaMax = cuencasSalida[c].attributes[campoCotaMax];
        } else {
          if (cuencasSalida[c].attributes[campoCotaMax] != null && cuencaCotaMax < cuencasSalida[c].attributes[campoCotaMax]) {
            cuencaCotaMax = cuencasSalida[c].attributes[campoCotaMax];
          }
        }
        if (cuencaCotaMin == null) {
          cuencaCotaMin = cuencasSalida[c].attributes[campoCotaMin];
        } else {
          if (cuencasSalida[c].attributes[campoCotaMin] != null && cuencaCotaMin > cuencasSalida[c].attributes[campoCotaMin]) {
            cuencaCotaMin = cuencasSalida[c].attributes[campoCotaMin];
          }
        }
      }
      cotaMaxMin.cotaMin = cuencaCotaMin;
      cotaMaxMin.cotaMax = cuencaCotaMax;
      return cotaMaxMin;
    },

    getArea: function(cuencaDisuelta) {
      var urlGeometryService = this.config.urlGeometryService + "/areasAndLengths";
      var peticion = Peticion();
      peticion.url = this.config.proxyCors + '?' + urlGeometryService;
      peticion.handleAs = "json";
      peticion.ambito = this;
      peticion.onSuccess = this.responseArea;

      peticion.onFailure = function(error) {
        this.setMessageError("Error al calcular el Área.");
      };

      peticion.params = {
        f: "json",
        polygons: "[" + dojo.toJson(cuencaDisuelta.geometry) + "]",
        areaUnit: this.constantes.esriSRUnit_Kilometer,
        lengthUnit: this.constantes.esriSRUnit_Kilometer,
        calculationType: "planar",
        sr: this.map.spatialReference.wkid
      };
      peticion.type = "post";
      var gPeticion = GestorPeticiones();
      gPeticion.lanzarPeticion(peticion, false);
    },

    responseArea: function(response) {
      if (response && response.areas) {
        this.areaTotal = response.areas[0];
        this.mostrarResultados();
		
		for(var i=0; i<this.resultados.cuencas.length; i++){
			this.resultados.cuencas[i].attributes.Area = response.areas[0] //establece el area en el grafico para la exportacion a anotaciones
		}
	  }

    },

    mostrarResultados: function() {
      this.removeLoading();
      var resultadoCuenca = dojo.byId("resultadosCuenca");
      var resultado = "<p id='cotMax' class='label'><font class='fontResultado'>Cota máxima: </font><font id='fontResultCotMax'></font><font class='fontResultUnidades'>" + this.cotaMaxima + " m</font></p>";
      resultado += "<p id='cotMin' class='label'><font class='fontResultado'>Cota mínima:  </font><font id='fontResultCotMin'></font><font class='fontResultUnidades'>" + this.cotaMinima + " m</font></p>";
      resultado += "<p id='area' class='label'><font class='fontResultado'>Área total:   </font><font id='fontResultArea'></font><font class='fontResultUnidades'>" + this.areaTotal.toFixed(3) + " Km<sup>2</sup></font></p>";
      resultadoCuenca.innerHTML = resultado;
      delete this.cotaMaxima;
      delete this.cotaMinima;
      delete this.areaTotal;

    },

    limpiarResultado: function() {
      if (this.handleClick) {
        this.handleClick.remove();
      }
      if (this.resultados) {
        for (var i = 0; i < this.resultados.cuencas.length; i++) {
          this.map.graphics.remove(this.resultados.cuencas[i]);
        }
        for (var j = 0; j < this.resultados.cauces.length; j++) {
          this.map.graphics.remove(this.resultados.cauces[j]);
        }
        if (this.currentSelection) {
          this.map.graphics.remove(this.currentSelection);
        }
      }
      this.resultados = {
        cuencas: [],
        cauces: []
      };
      dojo.byId("resultadosCuenca").innerHTML = "";
      this.map.setMapCursor("auto");
      this.removeClickMap();
    },

    limpiar_Clicked: function() {
      var self = this,
        ok = false,
        btn = this.limpiarResultado()
		document.getElementById("barraBotones").style.display = "none";
    },

    addLoading: function() {
      var src = this.config.folderUrl + "loading2.gif";
      this.infoArea.innerHTML = "<p class='label'><font class='fontResultado'><img class='jimu-loading' style='margin-right:10px' src='" + src + "'></img>Espere, calculando la cuenca vertiente…</font></p>";
    },
    removeLoading: function() {
      this.infoArea.innerHTML = "";
      this.map.setMapCursor("auto");
    },
///////////////////////////////////////////////////////
//               MODULO DE EXPORTACION               //
///////////////////////////////////////////////////////
	
	exportarAnotaciones:function() { 
		var widgetManager;
		var widget = this.widgetManager.appConfig.getConfigElementsByName("CHS_Anotaciones")[0];
		
		//si el widget de anotaciones no esta cargado lanza un error
		if (!widget){
			new Message({
				titleLabel:"Aviso",
				message: "El widget de anotaciones no está cargado en dicha aplicación"
			});
			return;			
		}
		
		widgetManager = WidgetManager.getInstance();
	
		widgetManager.triggerWidgetOpen(widget.id).then(lang.hitch(this, function() { 

          /** Inicialización de variables a consumir por el widget de anotaciones */
			var elementosExportar = [];
			
			for (var i=0; i < this.map.graphics.graphics.length; i++){
				if (this.map.graphics.graphics[i].Nombre){
					elementosExportar.push(this.map.graphics.graphics[i])
				}
			}			
						
			var objJsonAnotaciones = {};
			objJsonAnotaciones["graphics"] = [];
			
			for (var i=0; i < elementosExportar.length; i++){
			
				var obj = {};
				obj.attributes = {};
				obj.attributes = elementosExportar[i].attributes;
				for (var attr in elementosExportar[i].attributes) { //Los campos null dan error al exportar anotaciones a shape, por lo q se introducen como nulo
					if (attr != "geometry")
						obj.attributes[attr] = elementosExportar[i].attributes[attr] == null ? "nulo" : elementosExportar[i].attributes[attr];
				}
				obj.attributes.name = elementosExportar[i].Nombre ;
				obj.attributes.comment = "Anotación importada desde el widget de Cuencas Vertientes";		
				obj.geometry = elementosExportar[i]["geometry"];
				obj.symbol = elementosExportar[i].symbol;
				obj.geometry.spatialReference.wkid = this.map.spatialReference.wkid;
				obj.geometry.spatialReference.latestWkid = this.map.spatialReference.latestWkid
				
				objJsonAnotaciones.graphics.push(obj);

			}
			//Hay que añadir los siguientes campos al objJsonAnotaciones para que funcione correctamente
		    objJsonAnotaciones["displayFieldName"] = "";
            objJsonAnotaciones["fieldAliases"] = {};
            objJsonAnotaciones["spatialReference"] = {};
            objJsonAnotaciones["spatialReference"]["wkid"] = this.map.spatialReference.wkid;
            objJsonAnotaciones["spatialReference"]["latestWkid"] = this.map.spatialReference.latestWkid;
            objJsonAnotaciones["fields"] = [];
		
			
			this.publishData({
				'target': 'CHS_Anotaciones',
				"timestamp": new Date().getTime(),
				'elementosImportar': objJsonAnotaciones
			}, true);
		}))
	},	

	
  });
  return clazz;
});