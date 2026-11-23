///////////////////////////////////////////////////////////////////////////
// Copyright © 2014 - 2016 Esri. All Rights Reserved.
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
  'jimu/BaseFeatureAction',
  'jimu/WidgetManager',
  "esri/Color",
  "esri/map"
], function(declare, BaseFeatureAction, WidgetManager, Color, Map){
  var clazz = declare(BaseFeatureAction, {

    iconFormat: 'png',
	layer: null,
    isFeatureSupported: function(featureSet){
      //return featureSet.features.length > 0 && featureSet.features[0].geometry.type !== 'point';
	  return true
    },

    onExecute: function(featureSet){
      WidgetManager.getInstance().triggerWidgetOpen(this.widgetId)
      .then(function(myWidget) {
		   		
          var elementosAnotaciones = featureSet.features;
         
          /** Estilo de la capa */
          var estiloCapa = null;
          var estilosMultiples = null;
          var capaMultiple = false;
		  this.layer=featureSet.features[0]._layer;
		  
	/*	  
          if (this.layer._getRenderer().symbol) {
            //Simbolo unico para todos los elementos 
            estiloCapa = this.layer.renderer.getSymbol();
			if (estiloCapa.color==null){
				estiloCapa.color = new Color(estiloCapa.outline.color); //Si no tiene relleno da error, asi que le metemos el color del borde totalmente transparente
				estiloCapa.color.a=0
			}

          } else if (this.layer._getRenderer()._symbols) {
            // Simbolos multiples por valor 
            estilosMultiples = this.layer._getRenderer()._symbols;
            capaMultiple = true
          }*/

          /** Inicialización de variables a consumir por el widget de anotaciones */
          var objJsonAnotaciones = {};
          objJsonAnotaciones["graphics"] = [];

          if (!capaMultiple) {

            /** Se procede a formatear una variable para pasársela al widget de anotaciones */

            for (var k = 0; k < elementosAnotaciones.length; k++) {

              var obj = {};
              obj.attributes = {};
              obj.attributes.name = this.layer.name
			  if (elementosAnotaciones[k].attributes["OBJECTID"]){
				  obj.attributes.name = obj.attributes.name + " " + elementosAnotaciones[k].attributes["OBJECTID"];
			  }
              obj.attributes.comment = "Anotación importada";
              for (var attr in elementosAnotaciones[k].attributes) {
                if (attr != "geometry")
                  obj.attributes[attr] = elementosAnotaciones[k].attributes[attr];
              }
              obj.geometry = elementosAnotaciones[k]["geometry"];
              obj.symbol = estiloCapa;

              if ((this.layer.labelingInfo) && (this.layer.labelingInfo.length > 0)) {

                var objt = {};
                objt.attributes = {};
                objt.attributes.name = this.layer.name + " " + elementosAnotaciones[k]["OBJECTID"] + " LABEL";
                objt.attributes.comment = "Label de anotación importada";
                objt.geometry = elementosAnotaciones[k]["geometry"];
                objt.symbol = this.layer.labelingInfo[0].symbol;
                objt.symbol.text = myWidget.obtenerTextoSimboloLabel(this.layer.labelingInfo[0].labelExpression, elementosAnotaciones[k]);

                objJsonAnotaciones.graphics.push(objt);
              }


              objJsonAnotaciones.graphics.push(obj);
            }

            objJsonAnotaciones["displayFieldName"] = "";
            objJsonAnotaciones["fieldAliases"] = {};
            objJsonAnotaciones["spatialReference"] = {};
            objJsonAnotaciones["spatialReference"]["wkid"] = this.layer.spatialReference.wkid;
            objJsonAnotaciones["spatialReference"]["latestWkid"] = this.layer.spatialReference.latestWkid;
            objJsonAnotaciones["fields"] = [];
          } 
		  else {
            /** Capa con más de un estilo, hay que ir determinando añadiendo cada objeto con el estilo
             que le corresponda */
            var campoEstilo = this.layer.renderer.attributeField;
            for (var k = 0; k < elementosAnotaciones.length; k++) {

              var estiloElem = myWidget.getEstiloMultipleByValor(estilosMultiples, elementosAnotaciones[k].attributes[campoEstilo]);

              var obj = {};
              obj.attributes = {};
              obj.attributes.name = this.layer.name + " " + elementosAnotaciones[k].attributes["OBJECTID"];
              obj.attributes.comment = "Anotación importada de la tabla de atributos";
              for (var attr in elementosAnotaciones[k].attributes) {
                if (attr != "geometry")
                  obj.attributes[attr] = elementosAnotaciones[k].attributes[attr];
              }
              obj.geometry = elementosAnotaciones[k]["geometry"];
              obj.symbol = estiloElem;

              if ((this.layer.labelingInfo) && (this.layer.labelingInfo.length > 0)) {

                var objt = {};
                objt.attributes = {};
                objt.attributes.name = this.layer.name + " " + elementosAnotaciones[k]["OBJECTID"] + " LABEL";
                objt.attributes.comment = "Label de anotación importada de la tabla de atributos";
                objt.geometry = elementosAnotaciones[k]["geometry"];
                objt.symbol = this.layer.labelingInfo[0].symbol;
                objt.symbol.text = myWidget.obtenerTextoSimboloLabel(this.layer.labelingInfo[0].labelExpression, elementosAnotaciones[k]);

                objJsonAnotaciones.graphics.push(objt);
              }

              objJsonAnotaciones.graphics.push(obj);

            }

            objJsonAnotaciones["displayFieldName"] = "";
            objJsonAnotaciones["fieldAliases"] = {};
            objJsonAnotaciones["spatialReference"] = {};
            objJsonAnotaciones["spatialReference"]["wkid"] = this.layer.spatialReference.wkid;
            objJsonAnotaciones["spatialReference"]["latestWkid"] = this.layer.spatialReference.latestWkid;
            objJsonAnotaciones["fields"] = [];
          }
		  myWidget.importJsonContent(objJsonAnotaciones);
		
      });
    }	
  });
  return clazz;
});