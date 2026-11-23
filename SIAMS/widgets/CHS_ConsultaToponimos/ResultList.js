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
    "dojo/_base/declare", 
	"dojo/parser", 
	"dojo/ready",
	"./ResultItem",
	"dijit/_Widget",
	"dijit/_Templated",
	"dijit/_TemplatedMixin",
	"dijit/_Container"
], function(declare, parser, ready, ResultItem, _Widget, _Templated, _TemplatedMixin, _Container){

    declare("ResultList", [_Widget, _TemplatedMixin], {
		
		templateString: "<div class='resultsPane' dojoAttachPoint='containerNode'></div>",
		count: 0,
		name: "",
		suppressImages: true,
		
        constructor: function(/*Object*/ params) {
			
			this.params = params;
			
			if(params.enableexport && params.enableexport=="true") {
				params.enableexport = true;
			}
			else {
				params.enableexport = false;
			}
		
			this.connects = [];
		
		},
		clear: function(){
			
			console.log("limpiar resultados");
			dojo.forEach(this.connects, function(x){
				x.remove();
			});
			this.connects = [];
			
			var children = this.getChildren();
			dojo.forEach(children, function(x){
				x.destroyRecursive();
			});
						
			if(this.btnExport) {
				this.btnExport.destroy();
			}
			
			this.count = 0;
			this.onResultClick({}); // empty event object
						
		},

		add: function(obj, reverse) {
			
			try {
				
				if (obj) {
					
					var item = null;
					
					if (obj.declaredClass === "ResultItem") {
						item = obj;
					} else {
						if (this.suppressImages) {
							obj.suppressImages = true;
						}
						item = new ResultItem(obj);
					}
					
					item.applyAlternateBackground(this.count % 2 !== 0);
					
					var results = this.domNode.parentNode;
					
					if(this.params.enableexport || this.params.enableexport==null) {
												
						var btn = document.getElementById(results.id+"_btnExp");
						
						if(btn==null) {
							btn = document.createElement("div");
							btn.id = results.id+"_btnExp";
							results.insertBefore(btn,this.domNode);
							if(this.btnExport) {
								this.btnExport.destroy();
								this.btnExport = null;
							}
						}
						
						if(item.feature && !this.btnExport) {
							
							this.btnExport = new dijit.form.Button({
								id:btn.id,
								iconClass:'textFile',
								label:"Exportar",
								onClick:dojo.hitch(this,this.exportar)
							}, btn.id);
						}
					
						
					}
					
					if(reverse==null) {
						//this.addChild(item);
						this.domNode.appendChild(item.domNode);
					}
					else if(reverse) {
						//this.addChild(item,0);
						this.domNode.appendChild(item.domNode, 0);

					}
					
					this.count++;
					
					this.connects.push(
						//dojo.connect(item, "onClick", this, "onResultClick")
						item.on("click",dojo.hitch(this,this.onResultClick))
					);
					
					this.connects.push(
						//dojo.connect(item, "onHover", this, "onResultHover")
						item.on("hover",dojo.hitch(this,this.onResultHover))
					);
					
					this.connects.push(
						//dojo.connect(item, "onAction", this, "onResultAction")
						item.on("action",dojo.hitch(this,this.onResultAction))
					);
					
				}
				
			} catch (err) {
				console.error("Error adding ResultItem", err);
			}
			
		},
		
		onResultClick: function(evt) {
		},
		
		onResultHover: function(evt) {
		},
		
		onResultAction: function(evt) {
		},
		exportar: function(){
			console.log("Exportar");
		}
		
    });
    ready(function(){
        parser.parse();
    });
});