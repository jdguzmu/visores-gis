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
define(['dojo/_base/declare',
  'dijit/_WidgetBase',
  'dojo/_base/lang',
  'dojo/_base/html',
  'dojo/on',
  'dojo/Evented',
  'dojo/dom-class'
],
function(declare, _WidgetBase, lang, html, on, Evented, domClass) {
  return declare([_WidgetBase, Evented], {
    'class': 'format-buttons',
    nls: null,
    bold: null,
    italic: null,
    underline: null,

    postCreate: function(){
      this.boldBtnNode = html.create('div', {
        'class': (this.bold)?'icon-btn bold-btn selected':'icon-btn bold-btn',
        'title': this.nls.insertbold
      }, this.domNode);

      this.boldBtnNode.innerHTML = 'B';

      this.italicBtnNode = html.create('div', {
        'class': (this.italic)?'icon-btn italic-btn selected':'icon-btn italic-btn',
        'title': this.nls.insertitalic
      }, this.domNode);

      this.italicBtnNode.innerHTML = 'I';

      this.underBtnNode = html.create('div', {
        'class': (this.underline)?'icon-btn under-btn selected':'icon-btn under-btn',
        'title': this.nls.insertunderline
      }, this.domNode);

      this.underBtnNode.innerHTML = 'U';

      this.own(on(this.boldBtnNode, 'click', lang.hitch(this, this._onBoldClick)));
      this.own(on(this.italicBtnNode, 'click', lang.hitch(this, this._onItalicClick)));
      this.own(on(this.underBtnNode, 'click', lang.hitch(this, this._onUnderClick)));
    },

    _onBoldClick: function(evt){
      this.bold = !this.bold;
      domClass.toggle(this.boldBtnNode, 'selected');
      evt.stopPropagation();
      this.emit('onBold', this.bold);
    },

    _onItalicClick: function(evt){
      this.italic = !this.italic;
      domClass.toggle(this.italicBtnNode, 'selected');
      evt.stopPropagation();
      this.emit('onItalic', this.italic);
    },

    _onUnderClick: function(evt){
      this.underline = !this.underline;
      domClass.toggle(this.underBtnNode, 'selected');
      evt.stopPropagation();
      this.emit('onUnderline', this.underline);
    }

  });
});
