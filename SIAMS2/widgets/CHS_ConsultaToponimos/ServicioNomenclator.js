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
  'dojo/_base/lang',
  'dojo/_base/array',
  'esri/lang',
  'dojo/has', 
  'dojo/_base/sniff',
  './Servicio',
  'esri/geometry/Point'
  
], function(declare, lang, array, esriLang, has, sniff, Servicio, Point) {
  return declare([], {
	  

    constructor: function(){
		
		this.listaServicios = new Array();
		
		var servicio = new Servicio();
		
		servicio.url = "https://www.ign.es/wfs-inspire/ngbe?";
		servicio.featureNS = "urn:x-inspire:specification:gmlas:GeographicalNames:3.0";
		servicio.featureType = "NamedPlace";
		servicio.nombreNS = "gn";
		servicio.propertyName = "/gn:name";
		servicio.geometryName = "/gn:geometry";
		servicio.srsName = "urn:ogc:def:crs:EPSG::4326";
		servicio.displayField = "text";
		servicio.invertirCoords = true;
		servicio.tipoServicio="WFS";
		
		servicio.FIELDS = {
			"text": "Nombre",
			"localType": "Tipo",
			"inspireId": "inspireId"
		};
		
		servicio.requestOptions = {
			"REQUEST":"GetFeature",
			"SERVICE":"WFS",
			"VERSION":"2.0.0",
			"COUNT":100,
			"srsName":"urn:ogc:def:crs:EPSG::25830",
			"typeNames":"gn:NamedPlace",
			"namespaces":"xmlns(gn,http://inspire.ec.europa.eu/schemas/gn/4.0)",
			"FILTER":'<Filter xmlns:gn="http://inspire.ec.europa.eu/schemas/gn/4.0">'+
				'<And>'+
					'<PropertyIsLike wildCard="*" singleChar="." escapeChar="!" matchCase="false">'+
						'<ValueReference>gn:name/gn:GeographicalName/gn:spelling/gn:SpellingOfName/gn:text</ValueReference>'+
						"<Literal>{textoBusqueda}</Literal>"+
					"</PropertyIsLike>" +
					"<BBOX><ValueReference>ad:position/ad:GeographicPosition/ad:geometry</ValueReference>" +
						'<gml:Envelope xmlns:gml="http://www.opengis.net/gml/3.2" crs="urn:ogc:def:crs:EPSG::4326" srsName="urn:ogc:def:crs:EPSG::4326">'+
						'<gml:lowerCorner>{lowerCorner}</gml:lowerCorner>'+
						'<gml:upperCorner>{upperCorner}</gml:upperCorner></gml:Envelope>'+
					'</BBOX>'+
				'</And>'+
			'</Filter>'
		};
		
		servicio.parseResponse = function(response, sr) {
			
			var listaFeatures = [];
			var content = "textContent";
			var hashFeatures = {};
			
			if(response!=null) {
				
				var getElementsByTagNameNS = OpenLayers.Format.XML.prototype.getElementsByTagNameNS;
				 
				var features = getElementsByTagNameNS(response,"http://inspire.ec.europa.eu/schemas/gn/4.0","NamedPlace");
			
				for(var i=0;i<features.length;i++) {
					
					var unaFeature = features[i];
					
					var resultFeature = {
						attributes: {}
					};
					
					var id = getElementsByTagNameNS(unaFeature,"http://inspire.ec.europa.eu/schemas/base/3.3","Identifier")[0][content];
					
					resultFeature.id = id;
					var geometry = null;
					var pos =null;
					
					if(getElementsByTagNameNS(unaFeature,"http://inspire.ec.europa.eu/schemas/gn/4.0","geometry")[0].children!=null) {
						geometry = getElementsByTagNameNS(unaFeature, "http://inspire.ec.europa.eu/schemas/gn/4.0","geometry")[0].children[0];
						pos = geometry.children[0][content].split(" ");
					} else if(getElementsByTagNameNS(unaFeature,"http://inspire.ec.europa.eu/schemas/gn/4.0","geometry")[0].firstElementChild){
						pos = getElementsByTagNameNS(unaFeature,"http://inspire.ec.europa.eu/schemas/gn/4.0","geometry")[0].firstElementChild[content].replace("\n","").trim().split(" ");
					}
					
					geometry = new Point({x:pos[0],y:pos[1]});
					geometry.spatialReference = sr;
					
					resultFeature.geometry = geometry;
					resultFeature.attributes.inspireId = getElementsByTagNameNS(unaFeature, "http://inspire.ec.europa.eu/schemas/base/3.3","localId")[0][content];
					resultFeature.attributes.inspireId += " "+ getElementsByTagNameNS(unaFeature, "http://inspire.ec.europa.eu/schemas/base/3.3","namespace")[0][content];
					//resultFeature.attributes.inspireId += " "+ getElementsByTagNameNS(unaFeature, "http://inspire.ec.europa.eu/schemas/base/3.3","versionId")[0][content];
					var versionId = getElementsByTagNameNS(unaFeature, "http://inspire.ec.europa.eu/schemas/base/3.3","versionId");
					if(versionId.length>0)
						resultFeature.attributes.inspireId += " "+ versionId[0][content];

					resultFeature.attributes.localType = getElementsByTagNameNS(unaFeature, "http://www.isotc211.org/2005/gmd","LocalisedCharacterString")[0][content];
					
					var nombres = getElementsByTagNameNS(unaFeature,"http://inspire.ec.europa.eu/schemas/gn/4.0","text");
					var valor = "";
					
					for(var idx=0;idx<nombres.length;idx++) {
						if(nombres[idx][content].trim().length>0) {
							valor =nombres[idx][content];
							break;
						}
					}
					
					resultFeature.cached = true;
					resultFeature.attributes.text=valor; 
					
					var hashCode = resultFeature.attributes.text+resultFeature.attributes.localType+resultFeature.geometry.x+resultFeature.attributes.localType+resultFeature.geometry.y;
					if(!hashFeatures[hashCode]) {
						listaFeatures.push(resultFeature);
						hashFeatures[hashCode] = true;
					}
				}
				
			}
			
     		return listaFeatures;				

		};

		this.listaServicios.push(servicio);
		
    }, 
	getListaServicios: function() {
		return this.listaServicios;
	}
	
	
  });
});