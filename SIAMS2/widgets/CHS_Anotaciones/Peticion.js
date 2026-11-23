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
///////////////////////////////////////////////////////////////////////////define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'esri/lang'
], function(declare, lang, array, esriLang) {
  return declare([], {
    
	constructor:function() {
				
	},
	
	/*Url de peticion*/
	url: /*String*/null,
	/*parametros a enviar a servidor en formato json {param1:value1,param2:value2}*/
	params:/*JSON*/null,
	/*handler manejador de exito en la peticion, si no se especifica se usar? por defecto el del GestorPeticiones*/
	onSuccess:/*function*/null,
	/*handler manejador de error en la peticion, si no se especifica se usar? por defecto el del GestorPeticiones*/
	onError:/*function*/null,
	/**/
	sync: false,
	/*no especificar, ser? rellenado por el gestor de peticion*/
	seq: /*int*/null,
	handleAs: "json",
	type: "post"
		
  });
});