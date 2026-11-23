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
		
		servicio.url = "http://www.cartociudad.es/geocoder/api/geocoder/candidatesJsonp?";
		servicio.getGeometryServiceUrl="http://www.cartociudad.es/geocoder/api/geocoder/find?";		
		servicio.type = "callejero";
		servicio.displayField="nombre";		
		servicio.limit=50;
		servicio.extentCHS = new esri.geometry.Extent( {
			xmin:-3.278, xmax:0.0134,
			ymin:37.1563 ,ymax:39.090
		}
		);
		
		servicio.tipoServicio="JSON";
		
		servicio.FIELDS = {
			"id":"Identificador",
			"nombre": "Nombre",
			"MUNICIPIO": "Municipio",
			"POBLACION": "Población",
			"PROVINCIA": "Provincia",
			"tip_via": "Tipo de vía"
		};
		servicio.ultimaBusqueda={};
		
		servicio.parseResponse = function(response, sr, wktUtil) {
			listaFeatures = [];					
			for(var i=0;i<response.length;i++) {
				var unElemento = response[i];			
				var unaFeature =this.buildFeature(unElemento)				
				listaFeatures.push(unaFeature);
				this.ultimaBusqueda[unaFeature.id]=unaFeature;
				
			}
     		return listaFeatures;				

		};
		
		servicio.buildFeature= function(unElemento) {
				var resultFeature = {
							attributes: {}
						};
				
				if(unElemento.geom) {
					var json = this.fromWKT2Json(unElemento.geom);
					resultFeature.geometry = new esri.geometry.Polyline(json);
				}
				
				resultFeature.id=unElemento.id;
				resultFeature.tipo=unElemento.type;
				resultFeature.attributes.id=unElemento.id;
				resultFeature.attributes.nombre=unElemento.address;
				resultFeature.attributes.MUNICIPIO=unElemento.muni;
				resultFeature.attributes.POBLACION=unElemento.poblacion;
				resultFeature.attributes.PROVINCIA=unElemento.province;
				resultFeature.attributes.tip_via=unElemento.tip_via;
				return resultFeature;
		};
		
		servicio.fromWKT2Json = function (WKTstr) {
				var mods = {};
				var convertToPointArray = function (ptArrayString) {
					var points = [],
						ptStringArray = ptArrayString.replace(/\)|\(/gi, "").split(",");
					ptStringArray.forEach(function (pt) {
					   
						var splitpt = pt.trim().split(" "),
							x = parseFloat(splitpt[0], 10),
							y = parseFloat(splitpt[1], 10);

						points[points.length] = [x, y];
					});
					return points;
				};

				mods.POINT = function (tailStr) {
					///point should be in the following format:
					//    (xxxx yyyy)
					console.log(tailStr);
					var point = tailStr.replace(/\)|\(/gi, "").trim().split(" ");
					return {
						type: 'point',
						x: parseFloat(point[0], 10),
						y: parseFloat(point[1], 10)
					};
				};
				mods.MULTILINESTRING = function (tailStr) {
					//should be in the following format:
					//    MULTILINESTRING((10 10, 20 20), (15 15, 30 15))
					///strip outermost parenthesis
					tailStr = tailStr.replace(/(\(\()|(\)\))/gi, '');
					//split on tailing parenthesis and comma
					var paths = [],
						pathsRaw = tailStr.split("),"); ///show now have ['(x1 y1, x2 y2,....)','(x1 y1, x2 y2,....)',...]

					pathsRaw.forEach(function (p) {
						paths[paths.length] = convertToPointArray(p);

					});
					return {
						type: 'polyline',
						paths: paths
					};
				};

				mods.POLYGON = function (tailStr) {
					var ml = mods.MULTILINESTRING(tailStr);
					///DIFFERENCES BETWEEN THIS AND MULTILINE IS THAT THE PATHS ARE RINGS 
					return {
						type: 'polygon',
						rings: ml.paths
					};
				};
				mods.MULTIPOLYGON = function (tailStr) {
					console.error('MULTIPOLYGON - not implemented');
				};
				mods.MULTIPOINT = function (tailStr) {
					return {
						type: 'multipoint',
						points: convertToPointArray(tailStr)
					};
				};
				mods.LINESTRING = function (tailStr) {
					//only close translation is multipoint
					return mods.MULTIPOINT(tailStr);

				};
				//chunk up the incoming geometry WKT  string
				var geoArray = WKTstr.split("("),
					head = geoArray.shift().trim(), ///head should be the geometry type
					tail = '(' + (geoArray.join("(").trim()); ///reconstitute the body

				return mods[head](tail);
			}
				

		this.listaServicios.push(servicio);
		
    }, 
	getListaServicios: function() {
		return this.listaServicios;
	}
	
	
  });
});