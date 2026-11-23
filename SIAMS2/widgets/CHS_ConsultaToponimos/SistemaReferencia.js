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
  'esri/lang'
], function(declare, lang, array, esriLang) {
  return declare([], {
    
	url: null,
	featureNS: null,
	nombreNS: null,
	campoGeometrico: null,
	srsName: null,
	
    constructor: function(){
		
    },
	transformarBBOX: function(bounds, projOrigen, projDestino) {

		var bounds2 = bounds.clone();
		bounds2.transform(projOrigen, projDestino);
		return bounds2;
		
		
	},
	trasnformarPunto:function(point, projOrigen,projDestino) {
		var point2=null;
		if(point) {
			var point2 = point.clone();
			point2.transform(projOrigen,projDestino);
		}
				
		return point2;
	}
	
	
  });
});