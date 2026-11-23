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
  "require",
  "dojo/_base/declare",
  //"dijit/_WidgetBase",
  "dijit/_Widget",
  "dojo/_base/array",
  "dojo/_base/lang",
  "dojo/text!./templates/ResultItem.html",
  "jimu/BaseWidget",
  "dijit/_TemplatedMixin"
],  function(
		require,
		declare,
		_Widget,
		array,
		lang,
		resultItemTemplate,
		BaseWidget,
		_TemplatedMixin
	) {
  // Main print dijit
   return declare([_Widget, _TemplatedMixin], {
    
	//baseClass: 'jimu-widget-customwidget',
	//name: 'ResultItem',
	//widgetsInTemplate: true,
	templateString: resultItemTemplate,
	
	constructor: function(/*Object*/ params) {
		
		var prueba = params;
		
	},
	
	title: "",
	content: "",
	link: "",
	iconUrl: "",
	wms:false,
	consGeomDatos: false,
	agendaGeo:false,
	irAElemento:false,
	filter:false,
	anotacion:false,
	toAnotaciones: false,
	actionIconUrl: "",
	graphic: null,
	location: null,
	suppressImages: false,
	zoomScale: null,
	
	postCreate: function() {
		
		this.inherited(arguments);
		
		this.setTitle(this.title);
		this.setContent(this.content);
		this.setIconUrl(this.iconUrl);
		this.setLink(this.link);
		this.setWMS(this.wms);
		this.setToAnotaciones(this.toAnotaciones);
		this.setConsGeomDatos(this.consGeomDatos);
		this.setIrAElemento(this.irAElemento);
		this.setActionIconUrl(this.actionIconUrl);
		this.setZoomScale(this.zoomScale);
		this.setAnotacion(this.anotacion);
	},

	setTitle: function(/*String*/ title) {
		this.title = title;
		this.titleNode.innerHTML = this.title;
		dojo.attr(this.domNode, "title", this.title);
	},
	
	setContent: function(/*HTML*/ content) {
		if (this.suppressImages) {
			content = content.replace(/<img [^>]*>/ig,"<!--img removed-->");
		}
		this.content = content;
		this.contentNode.innerHTML = content;
		dojo.setSelectable(this.domNode, false);
	},
	
	setLink: function(/*URL*/ url) {
		this.link = url;
		if (this.link) {
			dojo.style(this.linkNode, "display", "block");
			dojo.attr(this.linkNode, "title", this.link);
		}
		else {
			dojo.style(this.linkNode, "display", "none");
		}
	},
	
	setWMS: function(/*boolean*/ wms) {

		this.wms = wms;
		if(!this.wms) {
			dojo.style(this.wmsNode, "display", "none");
			
		}
	},
	setToAnotaciones: function(/*boolean*/ toAnotaciones) {
		
		this.toAnotaciones = toAnotaciones;
		if(this.toAnotaciones) {
			this.toAnotaciones(this.toAnotacionesNode);
		}
		else {
			dojo.style(this.toAnotacionesNode, "display", "none");
		}
	},
	
	setConsGeomDatos: function(/*boolean*/ consGeomDatos) {

		this.consGeomDatos = consGeomDatos;
		if(!this.consGeomDatos) {
			dojo.style(this.consGeomDatosNode, "display", "none");
		}
	},
	
	setAnotacion: function(/*boolean*/ anotacion) {

		this.anotacion = anotacion;
		if(!this.anotacion) {
			dojo.style(this.anotacionNode, "display", "none");
		}
	},
	setIrAElemento: function(/*boolean*/ irAElemento) {

		this.irAElemento = irAElemento;
		if(!this.irAElemento) {
			//Utilizamos el icono del widget de consulta geometrica para el "Ir a punto"
			dojo.style(this.irAElementoNode, "display", "none");
		}
	},
	setAgendaGeo: function(/*boolean*/ agendaGeo) {
		
		this.agendaGeo = agendaGeo;
		if(!this.agendaGeo) {
			dojo.style(this.agendaNode, "display", "none");
			
		}
	},
	
	setIconUrl: function(/*URL*/ url) {
		this.iconUrl = url;
		if (!dojo.isIE) {
			dojo.style(this.domNode, "backgroundImage", "url(" + this.iconUrl + ")");
		}
	},
	
	setActionIconUrl: function(/*URL*/ url) {
		this.actionIconUrl = url;
		if (this.actionIconUrl) {
			dojo.style(this.actionNode, "backgroundImage", "url(" + this.actionIconUrl + ")");
			dojo.style(this.actionNode, "display", "block");
		}
		else {
			dojo.style(this.actionNode, "display", "none");
		}
	},
	
	setZoomScale: function(/*Number*/ scale) {
		if (scale) {
			try {
				var scaleInt = parseInt(scale);
				this.zoomScale = scaleInt;
				return;
			}
			catch (err) {
				console.error("ResultItem::setZoomScale could not parse scale '" + scale + "'");
			}
		}
		this.zoomScale = null;
	},
	
	applyAlternateBackground: function(/*boolean*/ isAlt) {
		if (isAlt && dojo.hasClass(this.domNode, "alt") === false) {
			dojo.addClass(this.domNode, "alt");
		}
		else if (!isAlt && dojo.hasClass(this.domNode, "alt")) {
			dojo.removeClass(this.domNode, "alt");
		}
	},
	
	removeContentImages: function() {
		dojo.query("img", this.contentNode).forEach( function(img) {
			img.parentNode.removeChild(img);
			});
	},
	
	// Trap "hover" events
	_hoverTimeout: null,
	_clearHoverTimeout: function() {
		if (this._hoverTimeout) {
			clearTimeout(this._hoverTimeout);
			this._hoverTimeout = null;
		}
	},
	
	onMouseMove: function(evt) {
		
	},
	
	onMouseOut: function(evt) {
		
	},
	
	onClick: function(evt) {
		// stub for events
		evt.resultItem = this;
	},
	
	onHover: function(evt) {
		
	},
	
	onFollowLink: function(evt) {
		window.open(this.link);
		dojo.stopEvent(evt);
	},
	
	onAction: function(evt) {
		evt.resultItem = this;
		dojo.stopEvent(evt);
	},		
	onResultClickMio: function(evt) {
		
	}
	
	
  });
});