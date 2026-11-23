///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2018 Esri. All Rights Reserved.
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
    'dojo/_base/array',
    'dojo/_base/html',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/on',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/utils',
    'jimu/BaseWidget',
    'jimu/filterUtils',
    'jimu/dijit/FilterParameters',
    'jimu/LayerInfos/LayerInfos',
    'jimu/FilterManager',
    'esri/request',
    // 'esri/tasks/query',
    // 'esri/tasks/QueryTask',
    'jimu/dijit/LayerChooserFromMapWithDropbox',
    'jimu/dijit/Filter',
    './CustomFeaturelayerChooserFromMap',
    'jimu/dijit/ToggleButton',
    './GestorPeticiones',
    './Peticion',
	'jimu/dijit/Message',
	'esri/geometry/Polygon',
	'esri/SpatialReference',
    'dojo/NodeList',
    'dojo/NodeList-dom'
  ],
  function(declare, array, html, lang, query, on, _WidgetsInTemplateMixin,
    jimuUtils, BaseWidget, FilterUtils, FilterParameters, LayerInfos, FilterManager,esriRequest,
    // Query, QueryTask,
    LayerChooserFromMapWithDropbox, Filter,
    CustomFeaturelayerChooserFromMap, ToggleButton,
	GestorPeticiones, Peticion, Message, Polygon,SpatialReference) {

    return declare([BaseWidget, _WidgetsInTemplateMixin], {
      name: 'CHS_Filtro',
      baseClass: 'jimu-widget-filter',
	  SQLFiltroEspacial: null,
      //style="display:${hasValue}"

      _itemTemplate: '<li class="filter-item" data-index="${index}">' +
        '<div class="header" >' +
          '<span class="arrow jimu-float-leading jimu-trailing-margin05" title="${toggleTip}" ></span>' +
          '<span class="icon">' +
            '<img src="${icon}" />' +
          '</span>' +
          '<span class="item-title">${title}</span>' +
          '<span class="toggle-filter jimu-trailing-margin1"></span>' +
        '</div>' +
        '<div class="body">' +
          '<div class="parameters"></div>' +
        '</div>' +
      '</li>',
      _store: null,

      postMixInProperties:function(){
        this.jimuNls = window.jimuNls;
      },

      postCreate: function(){
        this.inherited(arguments);
        this._store = {};
        this.layerInfosObj = LayerInfos.getInstanceSync();
        this.filterUtils = new FilterUtils();
        this.filterManager = FilterManager.getInstance();
		this.boton = null;

        if(this.config.allowCustom){
          html.setStyle(this.showCustomButtonNode, 'display', 'block');
        }

        var existAskForValue = false;

        var filters = this.config.filters;
        array.forEach(filters, function(filterObj, idx) {
          var isAskForValue = this.filterUtils.isAskForValues(filterObj.filter);

          if(isAskForValue){
            existAskForValue = true;
          }

          var parse = {
            icon: filterObj.icon ? jimuUtils.processUrlInWidgetConfig(filterObj.icon, this.folderUrl) :
              this.folderUrl + '/css/images/default_task_icon.png',
            index: idx,
            title: filterObj.name,
            toggleTip: this.nls.toggleTip,
            hasValue: isAskForValue ?
              (window.appInfo.isRunInMobile ? 'block !important' : '') : 'none',
            isAskForValue: isAskForValue,
            apply: lang.getObject('jimuNls.common.apply', false, window) || 'Apply'
          };

          if (!this._store[filterObj.layerId]) {
            this._store[filterObj.layerId] = {
              mapFilterControls: {}
              // filter_item_idx
            }; // filter_item_idx, mapFilterControls
          }

          var template = lang.replace(this._itemTemplate, parse, /\$\{([^\}]+)\}/ig);
          var node = html.toDom(template);
          html.place(node, this.filterList);
          var toggleButton = new ToggleButton({}, query('.toggle-filter', node)[0]);
          toggleButton.startup();
          node.toggleButton = toggleButton;
          this.own(
            query('.header', node)
            .on('click', lang.hitch(this, 'toggleFilter', node, filterObj, parse))
          );
          if(isAskForValue){
            html.addClass(node, 'has-ask-for-value');
          }else{
            html.addClass(node, 'not-has-ask-for-value');
          }
          if (parse.hasValue !== 'none') {
            // add parameters
            this.own(
              query('.arrow', node)
              .on('click', lang.hitch(this, 'configFilter', node, filterObj))
            );
            html.addClass(node, 'requesting');
            this.configFilter(node, filterObj, null, lang.hitch(this, function(){
              if(filterObj.collapse){
                html.removeClass(node, 'config-parameters');
              }

              if(filterObj.autoApplyWhenWidgetOpen){
                this.toggleFilter(node, filterObj, parse);
              }
            }));
          }else{
            if(filterObj.autoApplyWhenWidgetOpen){
              this.toggleFilter(node, filterObj, parse);
            }
          }

        }, this);

        if(!existAskForValue){
          html.addClass(this.domNode, 'not-exist-ask-for-value');
        }
      },

      startup: function() {
        this.inherited(arguments);
        this.resize();
      },

      _getPriorityOfMapFilter: function(layerId) {
        var mapFilterControls = lang.getObject(layerId + '.mapFilterControls', false, this._store);
        var count = 0;
        for (var p in mapFilterControls) {
          var control = mapFilterControls[p];
          if (control.priority > count) {
            count = control.priority;
          }
        }

        return count;
      },

      _getMapFilterControl: function(layerId) {
        var mapFilterControls = lang.getObject(layerId + '.mapFilterControls', false, this._store);
        var count = 0;
        var enable = true;
        for (var p in mapFilterControls) {
          var control = mapFilterControls[p];
          if (control.priority > count) {
            enable = !!control.enable;
          }
        }

        return enable;
      },

      _setItemFilter: function(layerId, idx, expr, enableMapFilter) {
        this._store[layerId]['filter_item_' + idx] = expr;

        var priority = this._getPriorityOfMapFilter(layerId);
        lang.setObject(layerId + '.mapFilterControls.filter_item_' + idx , {
          enable: enableMapFilter,
          priority: priority + 1
        }, this._store);
      },

      _removeItemFilter: function(layerId, idx) {
        delete this._store[layerId]['filter_item_' + idx];
        delete this._store[layerId].mapFilterControls['filter_item_' + idx];
      },

      _getExpr: function(layerId) {
        if (!this._store[layerId]) {
          return null;
        }

        var parts = [];
        var exprs = this._store[layerId];

        for (var p in exprs) {
          var expr = exprs[p];
          if (expr && p !== 'mapFilterControls') {
            parts.push('(' + expr + ')');
          }
        }

        return parts.join(' AND ');
      },

      toggleFilter: function(node, filterObj, parse) {
        if (html.hasClass(node, 'config-parameters') &&
          !(node.filterParams && node.filterParams.getFilterExpr())) {
          return;
        }
        if (parse.isAskForValue && !(node.filterParams && node.filterParams.getFilterExpr())) {
          this.configFilter(node, filterObj);
          return;
        }
        // if(node.toggleButton.isDoing){
        //   return;
        // }

        var layerId = filterObj.layerId;
        var idx = html.getAttr(node, 'data-index');
        var layerFilterExpr = null;

        var applied = html.hasClass(node, 'applied');
        if (applied) {
          html.removeClass(node, 'applied');
          node.toggleButton.uncheck();
        } else {
          html.addClass(node, 'applied');
          node.toggleButton.check();
        }

        var enableMapFilter = null;
        if (!applied) {
          var expr = this._getFilterExpr(node, filterObj);
          this._setItemFilter(layerId, idx, expr, filterObj.enableMapFilter);
          layerFilterExpr = this._getExpr(layerId);
          enableMapFilter = this._getMapFilterControl(layerId);
          this.filterManager.applyWidgetFilter(layerId, this.id, layerFilterExpr, enableMapFilter);
        } else {
          this._removeItemFilter(layerId, idx);
          layerFilterExpr = this._getExpr(layerId);
          enableMapFilter = this._getMapFilterControl(layerId);
          this.filterManager.applyWidgetFilter(layerId, this.id, layerFilterExpr, enableMapFilter);
        }

        this._afterFilterApplied(filterObj.layerId);
      },

      configFilter: function(node, filterObj, evt, cb) {
        if (!node.filterParams) {
          esriRequest({
            url: filterObj.url,
            content: {
              f: 'json'
            },
            handleAs: 'json',
            callbackPrams: 'callback'
          }).then(lang.hitch(this, function(definition) {
            html.addClass(node, 'config-parameters');
            html.removeClass(node, 'requesting');
            var pamDiv = query('.parameters', node)[0];
            node.handles = [];
            node.filterParams = new FilterParameters();
            var partsObj = lang.clone(filterObj.filter);

            var layerId = null;
            if(filterObj.enableMapFilter){
              //if enableMapFilter is true, pass layerId to filterParams,
              //so filterParams can get the layer expr defined in webmap
              layerId = filterObj.layerId;
            }

            node.filterParams.build(filterObj.url, definition, partsObj, layerId);

            this.own(on(node.filterParams, 'change', lang.hitch(this, function(expr) {
              if (expr) {
                node.expr = expr;
              } else {
                delete node.expr;
              }

              if(node.toggleButton.checked){
                this.applyFilterValues(node, filterObj);
              }

            })));

            node.expr = node.filterParams.getFilterExpr();
            node.filterParams.placeAt(pamDiv);
            this._changeItemTitleWidth(node, 60);
            if(cb){
              cb();
            }
          }));
        } else {
          if (!html.hasClass(node, 'config-parameters')) {
            html.addClass(node, 'config-parameters');
            this._changeItemTitleWidth(node, 60);
          } else {
            html.removeClass(node, 'config-parameters');
            this._changeItemTitleWidth(node, window.appInfo.isRunInMobile ? 60 : 45);
          }
          if(cb){
            cb();
          }
        }

        if (evt && evt.target) {
          evt.stopPropagation();
        }
      },

      applyFilterValues: function(node, filterObj, evt) {
        var expr = this._getFilterExpr(node, filterObj);
        if (expr) {
          node.expr = expr;
          // getFilterExpr
          var layerId = filterObj.layerId;
          var idx = html.getAttr(node, 'data-index');
          html.addClass(node, 'applied');
          this._setItemFilter(layerId, idx, node.expr, filterObj.enableMapFilter);
          var layerFilterExpr = this._getExpr(layerId);
          var enableMapFilter = this._getMapFilterControl(layerId);
          this.filterManager.applyWidgetFilter(layerId, this.id, layerFilterExpr, enableMapFilter);

          this._afterFilterApplied(filterObj.layerId);
        }

        if(evt){
          evt.stopPropagation();
        }
      },

      _getFilterExpr: function(node, filterObj){
        if(node.filterParams){
          return node.filterParams.getFilterExpr();
        }

        if(this.filterUtils.hasVirtualDate(filterObj.filter)){
          this.filterUtils.isHosted = jimuUtils.isHostedService(filterObj.url);
          return this.filterUtils.getExprByFilterObj(filterObj.filter);
        }else{
          return filterObj.filter.expr;
        }

      },

      _afterFilterApplied: function(layerId){
		  var capa = this.layerChooserSelect._selectedItem.layerInfo.layerObject
		  if (capa.filtroAlfanumerico=="" && capa.filtroEspacial==""){
			  this.boton.disabled = false;
		  }
		  else if (capa.filtroAlfanumerico=="W_Tabla"){
		  	new Message({
				titleLabel:"Aviso",
				message: "La capa esta filtrada desde el widget Tabla de Atributos."
			});
		  }
      	//activa los botones de filtrado
		/*if (document.getElementsByClassName("jimu-icon jimu-icon-delete").length==0){
      		this.boton.disabled = false;
      	}*/
		
        if(!this.config.zoomto){
          return;
        }
        var layerInfo = this.layerInfosObj.getLayerInfoById(layerId);
        if(!layerInfo){
          return;
        }
        layerInfo.zoomTo();
      },

      _isValidExtent: function(extent){
        return !(isNaN(extent.xmax) || isNaN(extent.xmax) ||
          isNaN(extent.xmax) || isNaN(extent.xmax));
      },

      resize: function() {
        this.inherited(arguments);
        this._changeItemTitleWidth(this.domNode, window.appInfo.isRunInMobile ? 60 : 45);
        if(this.customFilter){
          this.customFilter.resize();
        }
      },

      _changeItemTitleWidth: function(node, tolerace) {
        tolerace += 30;
        var itemHeader = query('.header', node)[0];
        if (itemHeader) {
          var contentBox = html.getContentBox(itemHeader);
          var maxWidth = contentBox.w - tolerace;// width of header minus others width
          if (maxWidth > 0) {
            query('.header .item-title', node).style({
              'maxWidth': maxWidth + 'px'
            });
          }
        }
      },

//Entra a pulsar el botón de crear filtro
      _onShowCustomClick: function(modo){
		  if (this.customFilterContainerNode.style.display == "" && modo=="onOpen"){ //si no se muestra el contenedor de capas se salta su visualización
			  return;
		  }
		  else if(modo=="onOpen"){
			  this._onLayerChanged();
		  }
		  
        html.setStyle(this.customFilterContainerNode, 'display', 'block');	//muestra el contenedor de filtro personalizado
        html.setStyle(this.filterListContainerNode, 'display', 'none');		//oculta el contenedor con el botón de filtro

        if(!this.layerChooserSelect){
          var layerChooser = new CustomFeaturelayerChooserFromMap({
            showLayerFromFeatureSet: false,
            showTable: false,
            onlyShowVisible: false,
            createMapResponse: this.map.webMapResponse
          });
          this.layerChooserSelect = new LayerChooserFromMapWithDropbox({
            layerChooser: layerChooser
          });
          this.layerChooserSelect.placeAt(this.layerSelectNode);

          this.own(on(this.layerChooserSelect, 'selection-change', lang.hitch(this, this._onLayerChanged)));

          this.layerChooserSelect.showLayerChooser();
        }
      },

//Al cambiar el select de capas
      _onLayerChanged: function(){
        var item = this.layerChooserSelect.getSelectedItem();	//recoge la capa seleccionada
        if(!item){
          return;
        }
        //nameTextBox
        var layerInfo = item.layerInfo;
        var layer = layerInfo.layerObject;
		if (!layerInfo.layerObject.filtroAlfanumerico){
			layerInfo.layerObject.filtroAlfanumerico = "";
		}
		if (!layerInfo.layerObject.filtroEspacial){
			layerInfo.layerObject.filtroEspacial = ""
		}		
		
        //filter
        var layerDefinition = this._getLayerDefinitionForFilterDijit(layer);

        if(!this.customFilter){
          this.customFilter = new Filter({
            enableAskForValues: false,
            featureLayerId: layer.id
          });
          this.customFilter.placeAt(this.customFilterNode);
          this.own(on(this.customFilter, 'change', lang.hitch(this, this._onCustomFilterChange)));
		  
		  /*DAMOS FORMATOS A BOTONES*/
		  //Agregamos un nuevo botón con el filtro espacial
		  this.boton = document.createElement("button");
		  this.boton.className = "jimu-btn jimu-btn-vacation jimu-float-leading";
          this.boton.id = "ConsultaEspacial";

		  this.boton.onclick = lang.hitch(this, function (e) {
			this.onConsultaEspacial();
			this.boton.disabled = true;
			//desabilitamos los otros botones
			nodoBotones = this.customFilterNode.children[0].children[2]
			this.estadoBotones()
          });
		  
		  var spanEl = document.createElement("span");
		  spanEl.innerHTML = "+ Espacial";
          this.boton.appendChild(spanEl);
		  
		  nodoBotones = this.customFilterNode.children[0].children[2]

		//Insertamos el botón nuevo entre los existentes
          nodoBotones.insertBefore(this.boton,this.customFilterNode.children[0].children[2].children[1]);
		  
		  nodoBotones.children[0].innerHTML = "+ Expresión";
		  nodoBotones.children[0].addEventListener("click", function() {document.getElementById("ConsultaEspacial").disabled = true});

		  nodoBotones.children[2].innerHTML = "+ Conjunto";
		  
		  
		  //Creamos un div para superponerlo a los botones cuando estos tengan q deshabilarse
		  	var divDeshabilitar = document.createElement("div");
			divDeshabilitar.id = "divDeshabilitar";
			divDeshabilitar.style.position = "absolute";
			divDeshabilitar.style.width = "100%";
			divDeshabilitar.style.height = "35px";
			divDeshabilitar.style.opacity = "0%";
			divDeshabilitar.style.zIndex = "-1"
			
			nodoBotones.appendChild(divDeshabilitar);
        }

		if (layerInfo.layerObject.filtroAlfanumerico=="W_Tabla"){
			this.boton.disabled = true;
			this.estadoBotones();
		}
		else{
			this.boton.disabled = false;
			this.estadoBotones("on");
		}

        this.customFilter.build({
          url: layer.url,
          featureLayerId: layer.id, // featureLayerId is necessary
          layerDefinition: layerDefinition
        });

        this.selectedLayer = layer;
      },

      _getLayerDefinitionForFilterDijit: function(layer){
        var layerDefinition = null;

        if(layer.declaredClass === 'esri.layers.FeatureLayer'){
          layerDefinition = jimuUtils.getFeatureLayerDefinition(layer);
        }

        if (!layerDefinition) {
          layerDefinition = {
            currentVersion: layer.currentVersion,
            fields: lang.clone(layer.fields)
          };
        }

        return layerDefinition;
      },

      _onBackToListClick: function(){
        html.setStyle(this.customFilterContainerNode, 'display', 'none');
        html.setStyle(this.filterListContainerNode, 'display', 'block');
      },

      _onCustomFilterToggle: function(isChecked){
        if(!this.customFilter){
          return;
        }
        if(!isChecked){
          this.filterManager.applyWidgetFilter(this.selectedLayer.id, this.id + '-custom-filter', '1=1', true);
          this._afterFilterApplied(this.selectedLayer.id);
        }else{
          this._applyCustomFilter();
        }
      },

      _onCustomFilterChange: function(){
        this._applyCustomFilter();
      },


      _applyCustomFilter: function(){
        var filterJson = this.customFilter.toJson();
        if (!filterJson){
        	return;
        }
        if(!filterJson || !this.customFilterToggleButton.checked || filterJson.parts.length === 0){
        	if (this.SQLFiltroEspacial){
        		filterJson.expr = this.SQLFiltroEspacial
        		this.filterManager.applyWidgetFilter(this.selectedLayer.id, this.id + '-custom-filter', filterJson.expr, true);
				this.selectedLayer.filtroEspacial = "W_Filtro";
                this._afterFilterApplied(this.selectedLayer.id);
				
        	}
        	else{
        		this.filterManager.applyWidgetFilter(this.selectedLayer.id, this.id + '-custom-filter', "1=1", true);
                this._afterFilterApplied(this.selectedLayer.id);
				if(this.selectedLayer.filtroAlfanumerico != "W_Tabla"){
					this.selectedLayer.filtroAlfanumerico = "";
				}
        	}
        	return;
        }

        if (this.SQLFiltroEspacial){
      		    filterJson.expr += " AND (" + this.SQLFiltroEspacial + ")";
				this.selectedLayer.filtroEspacial = "W_Filtro";
        }
        this.filterManager.applyWidgetFilter(this.selectedLayer.id, this.id + '-custom-filter', filterJson.expr, true);
        this._afterFilterApplied(this.selectedLayer.id);
		this.selectedLayer.filtroAlfanumerico = "W_Filtro";
      },
	  

      destroy: function(){
        query('.filter-item', this.filterList).forEach(function(node) {
          delete node.filterParams;
          delete node.expr;
        });
        if (this._store) {
          for (var p in this._store) {
            if (p) {
              this.filterManager.applyWidgetFilter(p, this.id, "", null);
            }
          }
        }
        this.inherited(arguments);
      },
	  
	  onConsultaEspacial: function(){
		  
		  var divEspacial = document.createElement("div");
		  divEspacial.className = "divConsultaEspacial"

		  //Agregamos SELECT consulta Espacial
		  var tipoEspacial = document.createElement("select");
		  tipoEspacial.id = "tipoEspacial";
		  tipoEspacial.style.width = "100%";
		  tipoEspacial.style.fontSize = "14px";
		  tipoEspacial.style.padding = "5px 10px";
		  tipoEspacial.style.marginTop = "15px";

		  var opcion1 = document.createElement("option");
		  opcion1.innerHTML = "Intersecta";
		  opcion1.selected = true;
		  
		  var opcion2 = document.createElement("option");
		  opcion2.innerHTML = "Contiene";
		  
		  tipoEspacial.appendChild(opcion1);
		  tipoEspacial.appendChild(opcion2);
		  
		  divEspacial.appendChild(tipoEspacial);
		  
		  //Agregamos SELECT para anotaciones
		  var tipoAnotacion = document.createElement("select");
		  tipoAnotacion.id = "tipoAnotacion";
		  
		  tipoAnotacion.style.width = "100%";
		  tipoAnotacion.style.fontSize = "14px";
		  tipoAnotacion.style.padding = "5px 10px";
		  tipoAnotacion.style.margin = "15px 0px 30px 0px";

		  var opcion21 = document.createElement("option");
		  opcion21.innerHTML = "Todas las anotaciones del tipo polígono";
		  opcion21.selected = true;
		  
		  var opcion22 = document.createElement("option");
		  opcion22.innerHTML = "Anotaciones del tipo polígono seleccionadas";
		  
		  tipoAnotacion.appendChild(opcion21);
		  tipoAnotacion.appendChild(opcion22);
		  
		  divEspacial.appendChild(tipoAnotacion);
		  
		  //Agregamos el BOTÓN aplicar filtro
		  var botonApli = document.createElement("button");
		  botonApli.className = "botonApli";
		  botonApli.id = "botonApli";


		  botonApli.onclick = dojo.hitch(this, function () {
		 	 this.onAplicarFiltroEspacial();
		  });
		  var spanApli = document.createElement("span");
		  spanApli.innerHTML = "Aplicar Filtro";
		  spanApli.style.padding = "5px";
		  
		  botonApli.appendChild(spanApli);
		  divEspacial.appendChild(botonApli);		  
		  
		  //Añadimos el divEpacial con los select al expsBox
		  expsBox = this.customFilterNode.children[0].children[0].children[2];
		  expsBox.appendChild(divEspacial);
		  
		  //Agregamos un botón de eliminar		 
		  var divEliminar = document.createElement("div");
		  divEliminar.className = "jimu-icon jimu-icon-delete";
		  divEliminar.style.position = "absolute";
		  divEliminar.style.right = "8px";
		  divEliminar.style.top = "5px";
		  divEliminar.style.cursor = "pointer";
          divEliminar.onclick = lang.hitch(this, function (e) {
              divEspacial.remove();
			  this.boton.disabled = false;
			  this.removeFiltroEspacial();
          });		  
		  divEspacial.appendChild(divEliminar);
	  },
	  
	  removeFiltroEspacial: function(){
		  this.SQLFiltroEspacial = null;
		  this._applyCustomFilter();
		  this.estadoBotones("on");
		  this.selectedLayer.filtroEspacial = "";
	  },
	  
	  onAplicarFiltroEspacial: function(){
		  
		  if (document.getElementById("tipoEspacial").value == "Intersecta"){
			  var relacionEspacial = "esriSpatialRelIntersects"
		  }
		  else {
			  var relacionEspacial = "esriSpatialRelContains"
		  }

		  if (document.getElementById("tipoAnotacion").value == "Todas las anotaciones del tipo polígono"){
			  var selected = false
		  }
		  else {
			  var selected = true
		  }		  
		  
		 var urlCapa = this.layerChooserSelect.getSelectedItem().url + "/query?"
		 var SR = parseInt(this.map.spatialReference.wkid);

		geom = this.getPoligonos(selected);
			
		if (!geom || geom.rings.length==0){
			new Message({
				titleLabel:"Aviso",
				message: "No tiene anotaciones con las que aplicar filtros"
			});
			return;
		}
		if (geom.excedeLimite==true){
			new Message({
				titleLabel:"Aviso",
				message: "Las entidades usadas para filtrar exceden el numero de nodos"
			});
			return;
		}
				
			arrayGeom = '{"rings":' + JSON.stringify(geom.rings)  + '}'
			
		var params = {
			f:'json',
			geometry:arrayGeom,
			geometryType: "esriGeometryPolygon",
			inSR:SR,
			outSR:SR,
			spatialRel:relacionEspacial,
			returnGeometry:false
        };

        var peticion = Peticion();
        var gPeticiones = GestorPeticiones();
		
        peticion.ambito = this;
        peticion.url = this.config.proxyCors + urlCapa
        peticion.params = params;
		peticion.sync = false;	//si true hacemos syncrona la petición
        peticion.onSuccess = this.onFiltroResponse;
        peticion.onFailure = this.onFiltroResponseError;
        peticion.type= 'post';
        peticion.handleAs = "json";
        gPeticiones.lanzarPeticion(peticion, true);
		  
	  },
	  
	  getPoligonos: function(selected){
		  var layers = this.map.graphicsLayerIds;
		  var geometries = [];
		  var geom = null

		//geometries = new Polygon(new SpatialReference({wkid:25830}));
		  for (l in layers) {
			  var unLayer = this.map.getLayer(this.map.graphicsLayerIds[l])
			  if (unLayer.graphics.length>0){
			  	for (g in unLayer.graphics){
			  		if (!selected){
			  			if (unLayer.graphics[g].geometry.commonType=="polygon"){
			  				geometries.push(unLayer.graphics[g]);
							//geometries.addRing(unLayer.graphics[g].geometry.rings)
							}  
			  		}
                    else{
                    	if (unLayer.graphics[g].geometry.commonType=="polygon" && unLayer.graphics[g].checked){
			  				geometries.push(unLayer.graphics[g]);
							//geometries.addRing(unLayer.graphics[g].geometry.rings)
						}  
                    }
			  	}
			  }
		  }
		  
		  //Creamos un "multipoligono" si hubiera varios seleccionados
		  geom = new Polygon(new SpatialReference({wkid:25830}));
          var cuentaNodos = 0
		  for (var i = 0; i < geometries.length; i++) {
            for (j = 0; j < geometries[i].geometry.rings.length; j++) {
              cuentaNodos += geometries[i].geometry.rings[j].length;
              geom.addRing(geometries[i].geometry.rings[j]);
            }
          }
			
			//comprobamos el numero de nodos de los poligonos usados en el filtro
          if (cuentaNodos>this.config.limiteNodos){
			geom.excedeLimite = true
		  }
		  else{
		  	geom.excedeLimite = false
		  }
		  
		  return geom;
	  },
	  
	  onFiltroResponse: function(response){
	  	this.SQLFiltroEspacial = ""
		  for (var i=0; i<response.features.length; i++){
            if(i<response.features.length-1){
            	this.SQLFiltroEspacial = this.SQLFiltroEspacial + "UPPER(" + response.displayFieldName + ")='" + Object.values(response.features[i].attributes) + "' OR "
            }
            else if (i==response.features.length-1){
            	this.SQLFiltroEspacial = this.SQLFiltroEspacial + "UPPER(" + response.displayFieldName + ")='" + Object.values(response.features[i].attributes) + "'"
            }
		  }
		  
		  //this.filterManager.applyWidgetFilter(this.selectedLayer.id, this.id + '-custom-filter', this.SQLFiltroEspacial, true);
		  this._applyCustomFilter();
	  },
	  
	  onFiltroResponseError: function(response){
		
			new Message({
				titleLabel:"Aviso",
				message: "El servicio de capas ha fallado"
			});
			return;
	  },
	  
	  estadoBotones: function(estado){
		  nodoBotones = this.customFilterNode.children[0].children[2]
		  if (estado == "on"){
			//estilos para el boton expresion y conjunto
			nodoBotones.children[0].style.backgroundColor = ""
			nodoBotones.children[0].style.cursor = ""
			nodoBotones.children[0].style.color = ""
			nodoBotones.children[2].style.backgroundColor = ""
			nodoBotones.children[2].style.cursor = ""
			nodoBotones.children[2].style.color = ""
			
			document.getElementById("divDeshabilitar").style.zIndex = "-1"
		  }
		  else{
			  //estilos para el boton expresion y conjunto
	  		nodoBotones.children[0].style.backgroundColor = "#eee"
			nodoBotones.children[0].style.cursor = "default"
			nodoBotones.children[0].style.color = "#ccc"
			//nodoBotones.children[0].onclick = event.stopPropagation();
			nodoBotones.children[2].style.backgroundColor = "#eee"
			nodoBotones.children[2].style.cursor = "default"
			nodoBotones.children[2].style.color = "#ccc"

			document.getElementById("divDeshabilitar").style.zIndex = "1"
		  }
	  },
	  
	  onOpen: function(){
		this._onShowCustomClick("onOpen");
	  }
	  
    });
  });