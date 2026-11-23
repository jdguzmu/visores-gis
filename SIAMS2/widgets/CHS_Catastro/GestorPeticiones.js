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
  'dojo/io/script'
], function(declare, lang, array, esriLang) {
  return declare([], {
    
	listaPeticiones:new Array(),
	
    constructor: function(){
		
    },
	
	lanzarPeticion: function(/*nim.datos.Peticion*/peticion, usarProxy) {
				
		if(usarProxy==null)
			usarProxy=true;
				
		try {
			peticion.seq=this.listaPeticiones.size;
			var _onSuccessFunction=this.onSuccess;
				
			if(peticion.onSuccess){
				_onSuccessFunction=dojo.hitch(peticion.ambito,peticion.onSuccess);
			}
			
			var _onFailure=this.onFailure;

			if(peticion.onFailure){
				_onFailure=dojo.hitch(peticion.ambito,peticion.onFailure);
			}

			var url = peticion.url;
			if(usarProxy&&this.proxy)
				url = this.proxy+url;
							
							
							
			var requestParams = {		
				handleAs:peticion.handleAs,
				preventCache:false,
				sync:peticion.sync,
				content: peticion.params,
				url: url,
				load:_onSuccessFunction,
				error:_onFailure,
				headers: {
					'X-Requested-With': null
				}
			};
							
			if(peticion.timeout) {
				requestParams.timeout = peticion.timeout;
			}else {
				requestParams.timeout = 60000;
			}
							
			if(peticion.cabecera){
				requestParams.headers = peticion.cabecera; 							
			}
							
			if(peticion.postData){
				/** uso de postData para un raw string en el post*/
				requestParams.postData = peticion.postData;
				delete requestParams.content;
			}
							
							
			if(peticion.type=='post'){
				this.listaPeticiones[this.listaPeticiones.size] = dojo.xhrPost(requestParams);
			} else {
				this.listaPeticiones[this.listaPeticiones.size] = dojo.xhrGet(requestParams);
			}		
		} catch (e) {
			console.error("ConsultaToponimos::GestorPeticiones::lanzarPeticion", e);
		}
				
	
	},
	setProxy: function(proxy) {
		this.proxy = proxy;
	},
	abortarPeticion: function(peticion) {
		this.listaPeticiones[listaPeticiones.seq].cancel();
	},
	onSuccess:function(){
		
	},
	onFailure:function(){
		
	}
	
  });
});