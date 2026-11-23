define([
  'dojo/_base/declare',
  'dojo/_base/lang',
  'dojo/_base/array',
  'esri/lang'
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
				preventCache:true,
				sync:peticion.sync,
				content: peticion.params,
				url: url,
				load:_onSuccessFunction,
				error:_onFailure
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