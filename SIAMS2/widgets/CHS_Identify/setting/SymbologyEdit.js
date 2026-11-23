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
/*global define*/
/*jshint maxlen: 250*/
define(
  ['dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/on',
    'dijit/_WidgetsInTemplateMixin',
    'jimu/BaseWidgetSetting',
    'dojo/text!./SymbologyEdit.html',
    'esri/symbols/jsonUtils',
    'jimu/dijit/SymbolPicker',
    'dijit/_WidgetBase',
    'dijit/_TemplatedMixin'
  ],
  function(
    declare,
    lang,
    on,
    _WidgetsInTemplateMixin,
    BaseWidgetSetting,
    template,
    jsonUtils
    ) {
    return declare([BaseWidgetSetting, _WidgetsInTemplateMixin], {
      baseClass: 'symbology-edit',
      templateString: template,
      config: null,
      flinfo: null,
      nls: null,
      _symbols: null,

      postCreate: function() {
        this.inherited(arguments);
        this.own(on(this.defaultPointSymbolPicker,'change',lang.hitch(this,this._onPointSymbolChange)));
        this.own(on(this.defaultLineSymbolPicker,'change',lang.hitch(this,this._onLineSymbolChange)));
        this.own(on(this.defaultPolySymbolPicker,'change',lang.hitch(this,this._onPolySymbolChange)));
        this.setConfig(this.config);
      },

      startup: function() {
        this.inherited(arguments);
      },

      setConfig:function(config){
        this.config = config;
        if(!this.config){
          return;
        }
        this._symbols = this.config.symbols;

        if(this._symbols.simplemarkersymbol){
          this.defaultPointSymbolPicker.showBySymbol(jsonUtils.fromJson(this._symbols.simplemarkersymbol));
        }else{
          this.defaultPointSymbolPicker.showByType('point');
        }
        if(this._symbols.simplelinesymbol){
          this.defaultLineSymbolPicker.showBySymbol(jsonUtils.fromJson(this._symbols.simplelinesymbol));
        }else{
          this.defaultLineSymbolPicker.showByType('line');
        }
        if(this._symbols.simplefillsymbol){
          this.defaultPolySymbolPicker.showBySymbol(jsonUtils.fromJson(this._symbols.simplefillsymbol));
        }else{
          this.defaultPolySymbolPicker.showByType('fill');
        }
      },

      _onPointSymbolChange:function(newSymbol){
        this._symbols.simplemarkersymbol = newSymbol.toJson();
      },

      _onLineSymbolChange:function(newSymbol){
        if(newSymbol.type == 'simplelinesymbol'){
          this._symbols.simplelinesymbol = newSymbol.toJson();
        }
      },

      _onPolySymbolChange:function(newSymbol){
        if(newSymbol.type == 'simplefillsymbol'){
          this._symbols.simplefillsymbol = newSymbol.toJson();
        }
      },

      getConfig: function() {
        var config = {
          symbols:this._symbols
        };

        this.config = config;
        return this.config;
      }
    });
  });
