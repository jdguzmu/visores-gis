System.register(["jimu-core/emotion","jimu-core","jimu-ui","jimu-ui/basic/item-selector","jimu-ui/basic/copy-button","jimu-theme"],function(e,t){var a={},o={},r={},l={},i={},n={};return{setters:[function(e){a.jsx=e.jsx,a.jsxs=e.jsxs},function(e){o.AppMode=e.AppMode,o.BaseVersionManager=e.BaseVersionManager,o.DataSourceManager=e.DataSourceManager,o.DataSourceStatus=e.DataSourceStatus,o.DataSourceTypes=e.DataSourceTypes,o.DataSourcesChangeMessage=e.DataSourcesChangeMessage,o.DataSourcesChangeType=e.DataSourcesChangeType,o.ExportFormat=e.ExportFormat,o.Immutable=e.Immutable,o.MessageManager=e.MessageManager,o.MutableStoreManager=e.MutableStoreManager,o.React=e.React,o.ReactRedux=e.ReactRedux,o.ServiceManager=e.ServiceManager,o.SupportedItemTypes=e.SupportedItemTypes,o.SupportedLayerServiceTypes=e.SupportedLayerServiceTypes,o.WidgetState=e.WidgetState,o.classNames=e.classNames,o.css=e.css,o.dataSourceUtils=e.dataSourceUtils,o.defaultMessages=e.defaultMessages,o.esri=e.esri,o.focusElementInKeyboardMode=e.focusElementInKeyboardMode,o.getAppStore=e.getAppStore,o.hooks=e.hooks,o.i18n=e.i18n,o.indexedDBUtils=e.indexedDBUtils,o.loadArcGISJSAPIModule=e.loadArcGISJSAPIModule,o.loadArcGISJSAPIModules=e.loadArcGISJSAPIModules,o.moduleLoader=e.moduleLoader,o.polished=e.polished,o.requestUtils=e.requestUtils,o.utils=e.utils,o.uuidv1=e.uuidv1},function(e){r.Alert=e.Alert,r.Button=e.Button,r.CollapsablePanel=e.CollapsablePanel,r.DataActionList=e.DataActionList,r.DataActionListStyle=e.DataActionListStyle,r.Dropdown=e.Dropdown,r.DropdownButton=e.DropdownButton,r.DropdownItem=e.DropdownItem,r.DropdownMenu=e.DropdownMenu,r.FOCUSABLE_CONTAINER_CLASS=e.FOCUSABLE_CONTAINER_CLASS,r.FloatingPanel=e.FloatingPanel,r.Icon=e.Icon,r.Input=e.Input,r.Label=e.Label,r.Loading=e.Loading,r.LoadingType=e.LoadingType,r.MobilePanel=e.MobilePanel,r.NumericInput=e.NumericInput,r.PanelHeader=e.PanelHeader,r.Paper=e.Paper,r.Popper=e.Popper,r.Radio=e.Radio,r.Select=e.Select,r.Tab=e.Tab,r.Tabs=e.Tabs,r.TextInput=e.TextInput,r.Tooltip=e.Tooltip,r.UrlInput=e.UrlInput,r.defaultMessages=e.defaultMessages,r.useTrapFocusLoop=e.useTrapFocusLoop},function(e){l.ItemCategory=e.ItemCategory,l.ItemSelector=e.ItemSelector,l.ItemSelectorMode=e.ItemSelectorMode},function(e){i.CopyButton=e.CopyButton},function(e){n.useTheme=e.useTheme}],execute:function(){e((()=>{var e={26569(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 13 16"><path fill="#076FE5" d="M9.4 0H0v16h13V3.6zM12 15H1V1h7v4h4zm0-11H9V1h.31L12 3.69z" opacity=".6"></path></svg>'},21066(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#076FE5" d="M15.29 1H3v22h18V6.709zM20 22H4V2h10v6h6zm0-15h-5V2h.2L20 6.8zm-6 4h-4v-1H7v3h1v4H7v3h3v-1h4v1h3v-3h-1v-4h1v-3h-3zm2 0v1h-1v-1zm-8 0h1v1H8zm1 8H8v-1h1zm7 0h-1v-1h1zm-1-2h-1v1h-4v-1H9v-4h1v-1h4v1h1z" opacity=".8"></path></svg>'},47065(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 32 32"><path fill="#076FE5" fill-rule="evenodd" d="M27 13.018V9.699L19.3 2H5v11.018H2.018v14.964H5V30h22v-2.018h2.982V13.018zM19 3l7 7h-7zM6 3h12v8h8v2.018H6zm20 26H6v-1.018h20zm3.018-1.982H2.982V13.982h26.036zM8.85 23.268a3.179 3.179 0 1 1 4.495-4.495l-.707.707a2.18 2.18 0 1 0-3.08 3.082 2.23 2.23 0 0 0 3.08 0l.707.707a3.177 3.177 0 0 1-4.495-.001m13.19.716L19.666 18h1.076l1.768 4.453L24.304 18h1.078l-2.412 5.986zm-4.074-1.523a.84.84 0 0 0-.04-.684 1.33 1.33 0 0 0-.947-.477c-1.289-.198-1.953-.784-1.974-1.743a1.66 1.66 0 0 1 .48-1.2c.34-.354.81-.555 1.3-.557a2.11 2.11 0 0 1 1.902 1.102l-.85.526a1.12 1.12 0 0 0-1.05-.628.8.8 0 0 0-.58.249.67.67 0 0 0-.202.476c.004.206.014.616 1.126.786a2.19 2.19 0 0 1 1.652.952c.265.467.31 1.026.126 1.53a2.13 2.13 0 0 1-2.104 1.307 2.32 2.32 0 0 1-2.146-1.24l.864-.505a1.34 1.34 0 0 0 1.282.745c.482.049.944-.206 1.16-.64zM4.5 23.5a1 1 0 1 1 2 0 1 1 0 0 1-2 0" clip-rule="evenodd"></path></svg>'},65320(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><path fill="#076FE5" d="M3 18H2v-7h1v4.293L5.293 13h1.414L4.85 14.857 7.006 18H5.793l-1.662-2.424L3 16.707zm13-7v7h1v-7zm-8 2v5h1v-3a1 1 0 1 1 2 0v3h1v-3a1 1 0 0 1 2 0v3h1v-3a1.991 1.991 0 0 0-3.5-1.309 1.96 1.96 0 0 0-2.5-.413V13zm13-6.291V23H3v-4h1v3h16V8h-6V2H4v8H3V1h12.29zM20 6.8 15.2 2H15v5h5z" opacity=".8"></path></svg>'},51137(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M12 0h4v16H0v-4h12z"></path><path fill="#FFF" d="M13 1h2v14H1v-2h12z"></path></svg>'},57176(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 10"><path fill="#B6B6B6" d="M10 2.778V0L0 10h2.778zM10 5.607 5.607 10H10z"></path></svg>'},35532(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m6.036 12.157 8.01-8.01a.5.5 0 1 1 .707.707l-8.01 8.01a1 1 0 0 1-1.415 0L1.146 8.682a.5.5 0 1 1 .708-.707z"></path></svg>'},8703(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M7.5 1.5a.5.5 0 0 1 1 0v2.8a.5.5 0 0 1-1 0zm6.028.874a.5.5 0 0 1 .062.705l-1.414 1.685a.5.5 0 1 1-.766-.643l1.414-1.685a.5.5 0 0 1 .704-.062m-10.352.062a.5.5 0 1 0-.766.643l1.414 1.685a.5.5 0 0 0 .766-.643zM6.244 10.6H5.43zM.961 9.8h4.88c.211 0 .359.19.359.4q0 .207.045.4a1.8 1.8 0 0 0 3.51 0h.814a2.6 2.6 0 0 1-5.139 0H.8v3.6h14.4v-3.6H9.755q.045-.194.045-.4c0-.21.148-.4.358-.4h4.881l-2.267-3.4H3.228zm11.81-4.2a.8.8 0 0 1 .666.356l2.429 3.642a.8.8 0 0 1 .134.444V14.2a.8.8 0 0 1-.8.8H.8a.8.8 0 0 1-.8-.8v-4.158a.8.8 0 0 1 .134-.444l2.429-3.642a.8.8 0 0 1 .665-.356z" clip-rule="evenodd"></path></svg>'},67390(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M2.146 4.653a.485.485 0 0 1 .708 0L8 10.24l5.146-5.587a.485.485 0 0 1 .708 0 .54.54 0 0 1 0 .738l-5.5 5.956a.485.485 0 0 1-.708 0l-5.5-5.956a.54.54 0 0 1 0-.738" clip-rule="evenodd"></path></svg>'},37653(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M13.854 11.347a.486.486 0 0 1-.708 0L8 5.76l-5.146 5.587a.485.485 0 0 1-.708 0 .54.54 0 0 1 0-.738l5.5-5.956a.485.485 0 0 1 .708 0l5.5 5.956a.54.54 0 0 1 0 .738" clip-rule="evenodd"></path></svg>'},11595(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="m8.745 8 6.1 6.1a.527.527 0 1 1-.745.746L8 8.746l-6.1 6.1a.527.527 0 1 1-.746-.746l6.1-6.1-6.1-6.1a.527.527 0 0 1 .746-.746l6.1 6.1 6.1-6.1a.527.527 0 0 1 .746.746z"></path></svg>'},93573(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M11.227 1.312c-.404-.404-1.045-.417-1.432-.03L2.49 8.587l-.48 2.674a.637.637 0 0 0 .73.73l2.673-.48 7.305-7.306c.387-.387.374-1.028-.03-1.431zm-8.114 9.575.32-1.781 4.991-4.992 1.462 1.462-4.992 4.991zm7.473-6.012 1.402-1.4-1.462-1.463-1.401 1.402z" clip-rule="evenodd"></path><path fill="#000" d="M1.5 14a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1z"></path></svg>'},5629(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M7.5 0a.5.5 0 0 0-.5.5V7H.5a.5.5 0 0 0 0 1H7v6.5a.5.5 0 0 0 1 0V8h6.5a.5.5 0 0 0 0-1H8V.5a.5.5 0 0 0-.5-.5"></path></svg>'},15281(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0m-1.27 4.936a6.5 6.5 0 1 1 .707-.707l4.136 4.137a.5.5 0 1 1-.707.707z" clip-rule="evenodd"></path></svg>'},2101(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" d="M6 6.5a.5.5 0 0 1 1 0v6a.5.5 0 0 1-1 0zM9.5 6a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 1 0v-6a.5.5 0 0 0-.5-.5"></path><path fill="#000" fill-rule="evenodd" d="M11 0H5a1 1 0 0 0-1 1v2H.5a.5.5 0 0 0 0 1h1.6l.81 11.1a1 1 0 0 0 .995.9h8.19a1 1 0 0 0 .995-.9L13.9 4h1.6a.5.5 0 0 0 0-1H12V1a1 1 0 0 0-1-1m0 3V1H5v2zm1.895 1h-9.79l.8 11h8.19z" clip-rule="evenodd"></path></svg>'},79244(e){"use strict";e.exports=o},67386(e){"use strict";e.exports=a},1888(e){"use strict";e.exports=n},14321(e){"use strict";e.exports=r},48407(e){"use strict";e.exports=i},56340(e){"use strict";e.exports=l}},t={};function s(a){var o=t[a];if(void 0!==o)return o.exports;var r=t[a]={exports:{}};return e[a](r,r.exports,s),r.exports}s.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return s.d(t,{a:t}),t},s.d=(e,t)=>{for(var a in t)s.o(t,a)&&!s.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})},s.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.p="";var d={};return s.p=window.jimuConfig.baseUrl,(()=>{"use strict";s.r(d),s.d(d,{__set_webpack_public_path__:()=>ga,default:()=>ya});var e=s(67386),t=s(79244),a=s(14321),o=s(8703),r=s.n(o),l=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const i=a=>{const o=window.SVG,{className:i}=a,n=l(a,["className"]),s=(0,t.classNames)("jimu-icon jimu-icon-component",i);return o?(0,e.jsx)(o,Object.assign({className:s,src:r()},n)):(0,e.jsx)("svg",Object.assign({className:s},n))},n={_widgetLabel:"Add Data",urlType:"Type",arcgisUrl:"ArcGIS Server Web Service",csvUrl:"CSV Layer",geojsonUrl:"GeoJSON Layer",kmlUrl:"KML Layer",wfsUrl:"WFS OGC Web Service",wmsUrl:"WMS OGC Web Service",wmtsUrl:"WMTS OGC Web Service",dropOrBrowse:"Drop or browse",defaultPlaceholderText:"There is currently no added data.",dropOrBrowseToUpload:"Drop or browse to upload",upload:"Upload",notSupportedFileTypeError:"The file type of {fileName} is not supported.",failedToUploadError:"The file {fileName} cannot be successfully uploaded.",corruptedShapefileError:"There was an issue reading the shapefile. It may be corrupted or incomplete.",exceedMaxSizeError:"The file size of {fileName} exceeds the maximum limit.",exceedMaxRecordsError:"The number of records in {fileName} exceeds the maximum threshold.",exceedMaxFileNumberError:"The number of files exceeds the allowed limit.",cannotBeAddedError:"{layerName} cannot be added. Support for adding this type is not yet available.",supportedTypesHint:"Supported formats: Shapefile, CSV, KML, GeoJSON, GPX, FGDB.",fileIsUploading:"{fileName} is being uploaded",filesAreUploading:"{number} files are being uploaded",clickToAddData:"Click to add data",sampleUrl:"Sample URL",selectLayerToAdd:"Select a layer to add",selectTileMatrixSet:"Select tile matrix set",fileHasNoValidData:"The file {fileName} does not contain any valid data.",multiFilesNotSupportedFileTypeError:"Unsupported type: The file type for {number} file(s) is not supported.",multiFilesFailedToUploadError:"Upload failed: Unable to upload {number} file(s).",multiFilesCorruptedShapefileError:"Corrupted shapefiles: {number} file(s) are corrupted.",multiFilesExceedMaxRecordsError:"Too many records: The limit for {number} file(s) has been exceeded.",multiFilesExceedMaxSizeError:"File size too large: The limit of {number} file(s) has been exceeded.",multiFilesHasNoValidData:"Invalid data: No valid data found for {number} file(s).",confirmZipType:"Confirm data type for ZIP files",fileGeodatabase:"File geodatabase"},c=e=>(null==e?void 0:e.type)===t.DataSourceTypes.WMTS&&!!(null==e?void 0:e.wmtsLayerId)&&!!(null==e?void 0:e.wmtsTileMatrixSetId);var u=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})},p=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const m=new Map,v=new Map,f=e=>{if(!e||"object"!=typeof e)return!1;const t=e;return!!t.layerDefinition&&!!t.featureSet},y=e=>{var t;if(!(null===(t=null==e?void 0:e.isDataSourceSet)||void 0===t?void 0:t.call(e)))return;const a=e.getDataSourceJson(),o=null==a?void 0:a.childDataSourceJsons;o&&e.getChildDataSources().forEach(e=>{const t=e.jimuChildId,a=t?o[t]:null,r=Array.isArray(null==a?void 0:a.data)?a.data[0]:null,l=(f(r)?r:null)||v.get(e.id),i=v.has(e.id);l&&((null==a?void 0:a.isDataInDataSourceInstance)||i)&&h(e,l)})},h=(e,t)=>{var a,o,r;if(!e)return;const l=t||v.get(e.id)||(Array.isArray(null===(o=null===(a=null==e?void 0:e.getDataSourceJson)||void 0===a?void 0:a.call(e))||void 0===o?void 0:o.data)?e.getDataSourceJson().data[0]:null);if(!f(l))return;const i=e;if("function"!=typeof i.setLayerDefinition||"function"!=typeof i.setSourceRecords)return;i.setLayerDefinition(l.layerDefinition),l.popupInfo&&"function"==typeof i.setPopupInfo&&i.setPopupInfo(l.popupInfo);const n=((null===(r=l.featureSet)||void 0===r?void 0:r.features)||[]).map(e=>{return i.buildRecord((t=e)?Object.assign(Object.assign({},t),{attributes:Object.assign({},t.attributes||{}),geometry:t.geometry?Object.assign(Object.assign({},t.geometry),{spatialReference:t.geometry.spatialReference?Object.assign({},t.geometry.spatialReference):t.geometry.spatialReference}):t.geometry}):t);var t});i.setSourceRecords(n)},g=(e,a)=>u(void 0,void 0,void 0,function*(){const[o,r,l,i,n]=a,s={FeatureLayer:r,Graphic:l,Field:i,jsonUtils:n},d=(null==e?void 0:e.childDataSourceJsons)||{},c=yield Promise.all(Object.entries(d).map(e=>u(void 0,[e],void 0,function*([e,o]){if(!o)return null;const r=e||(null==o?void 0:o.layerId)||(null==o?void 0:o.id);if((null==o?void 0:o.type)===t.DataSourceTypes.GroupLayer||(null==o?void 0:o.childDataSourceJsons)){const e=yield g(o,a);return e&&r&&(e.id=r),e}const l=v.get(o.id)||(Array.isArray(null==o?void 0:o.data)?o.data[0]:null);if(!f(l))return null;const i=o.label||o.sourceLabel;return((e,t,a,o)=>{var r,l,i;const{FeatureLayer:n,Graphic:s,Field:d,jsonUtils:c}=e,u=null==t?void 0:t.layerDefinition,p=null==t?void 0:t.featureSet;if(!u)return null;const m=null===(r=null==u?void 0:u.drawingInfo)||void 0===r?void 0:r.renderer;return new n({id:o,source:(null===(l=null==p?void 0:p.features)||void 0===l?void 0:l.map(e=>s.fromJSON(e)))||[],objectIdField:null==u?void 0:u.objectIdField,fields:null===(i=null==u?void 0:u.fields)||void 0===i?void 0:i.map(e=>d.fromJSON(e)),sourceJSON:u,title:(null==u?void 0:u.name)||a,renderer:m?c.fromJSON(m):void 0})})(s,l,i,r)}))),p=c.filter(Boolean);return new o({title:(null==e?void 0:e.label)||(null==e?void 0:e.sourceLabel),layers:p})}),x=e=>u(void 0,void 0,void 0,function*(){const a=yield(0,t.loadArcGISJSAPIModules)(["esri/layers/GroupLayer","esri/layers/FeatureLayer","esri/Graphic","esri/layers/support/Field","esri/renderers/support/jsonUtils"]);return g(e.getDataSourceJson(),a)}),b=e=>u(void 0,void 0,void 0,function*(){var a,o,r,l;if(!(null===(a=null==e?void 0:e.isDataSourceSet)||void 0===a?void 0:a.call(e)))return;const i=e.getDataSourceJson();if((null==i?void 0:i.type)!==t.DataSourceTypes.GroupLayer||(null==i?void 0:i.url)||(null==i?void 0:i.itemId))return;const n=m.get(e.id)||(e=>{const t=null==e?void 0:e.childDataSourceJsons;if(!t)return null;const a=[],o=e=>{Object.values(e).forEach(e=>{if(null==e?void 0:e.childDataSourceJsons)return void o(e.childDataSourceJsons);const t=Array.isArray(null==e?void 0:e.data)?e.data[0]:null;(null==t?void 0:t.layerDefinition)&&(null==t?void 0:t.featureSet)&&a.push({layerDefinition:t.layerDefinition,featureSet:t.featureSet,popupInfo:t.popupInfo})})};return o(t),a.length?{layers:a}:null})(i),s=e;((e,t)=>{var a;null===(a=e.setItemInfo)||void 0===a||a.call(e,{type:"Feature Collection",typeKeywords:1===t?["Singlelayer"]:[]})})(s,(null===(o=null==n?void 0:n.layers)||void 0===o?void 0:o.length)||e.getChildDataSources().length);const d=yield x(e);if(!d)return;null===(l=(r=s).setJimuChildIdAsLayerId)||void 0===l||l.call(r,d,s),s.layer=d,s.createJSAPILayerByDataSource=()=>x(e).then(e=>{var t,a;return null===(a=(t=s).setJimuChildIdAsLayerId)||void 0===a||a.call(t,e,s),e});const c="__exb_kml_child_ds_hydrate_patched__",p=s;if(!p[c]&&"function"==typeof p.createChildDataSourceById){const e=p.createChildDataSourceById.bind(s);p[c]=!0,p.createChildDataSourceById=(...a)=>u(void 0,void 0,void 0,function*(){var o,r;const l=yield e(...a),i=null===(o=null==l?void 0:l.getDataSourceJson)||void 0===o?void 0:o.call(l);return(null===(r=null==l?void 0:l.isDataSourceSet)||void 0===r?void 0:r.call(l))&&(null==i?void 0:i.type)===t.DataSourceTypes.GroupLayer&&!(null==i?void 0:i.url)&&!(null==i?void 0:i.itemId)?(yield b(l),y(l)):h(l),y(s),l})}});var S=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};function w(e){return t.DataSourceManager.getInstance().getDataSource(e)}function j(e,a,o){const r=new t.DataSourcesChangeMessage(e,a,o);t.MessageManager.getInstance().publishMessage(r)}const I=(e,a)=>e.map(e=>{const o=Object.assign({},e.dataSourceJson);return o.disableExport=a.disableExport,o.disableExport||(o.exportOptions={formats:Object.values(t.ExportFormat).filter(e=>{var t;return!(null===(t=a.notAllowedExportFormat)||void 0===t?void 0:t.includes(e))})}),Object.assign(Object.assign({},e),{dataSourceJson:o})}),N=e=>{var a;const o=e.getDataSourceJson(),r=null===(a=e.getAllChildDataSources)||void 0===a?void 0:a.call(e);(null==r?void 0:r.length)>0&&r.forEach(e=>{const a=e.getDataSourceJson(),r=("function"==typeof(null==a?void 0:a.without)?a.without("data"):a).set("disableExport",o.disableExport).set("exportOptions",o.exportOptions);t.DataSourceManager.getInstance().updateDataSourceByDataSourceJson(e,r)})};function M(e,a,o){return S(this,arguments,void 0,function*(e,a,o,r=!0){if(!e||0===e.length)return Promise.resolve([]);let l,i,n,s,d;if(e.some(e=>e.restLayer)){const e=yield(0,t.loadArcGISJSAPIModules)(["esri/layers/FeatureLayer","esri/Graphic","esri/layers/support/Field","esri/renderers/support/jsonUtils"]);l=e[0],i=e[1],n=e[2],s=e[3]}const u=I(e,o);u.some(e=>c(e.dataSourceJson))&&(d=yield(0,t.loadArcGISJSAPIModule)("esri/layers/WMTSLayer"));const h=[],g=u.map(e=>{var a,o,r,u,y,g,x;if(e.restLayer&&l&&i&&n&&s){const d=null===(o=null===(a=e.restLayer.layerDefinition)||void 0===a?void 0:a.drawingInfo)||void 0===o?void 0:o.renderer,c={id:e.dataSourceJson.id,dataSourceJson:(0,t.Immutable)(e.dataSourceJson),layer:new l({source:(null===(u=null===(r=e.restLayer.featureSet)||void 0===r?void 0:r.features)||void 0===u?void 0:u.map(e=>i.fromJSON(e)))||[],objectIdField:null===(y=e.restLayer.layerDefinition)||void 0===y?void 0:y.objectIdField,fields:null===(x=null===(g=e.restLayer.layerDefinition)||void 0===g?void 0:g.fields)||void 0===x?void 0:x.map(e=>n.fromJSON(e)),sourceJSON:e.restLayer.layerDefinition,title:e.dataSourceJson.label||e.dataSourceJson.sourceLabel,renderer:d?s.fromJSON(d):void 0})};return h.push(c),c}const b=e.dataSourceJson,{dataSourceJson:S,itemData:w}=(e=>{const t=null==e?void 0:e.childDataSourceJsons;if(!t)return{dataSourceJson:e,itemData:null};const a=[],o=e=>{const t={};return Object.keys(e).forEach(r=>{const l=e[r];if(null==l?void 0:l.childDataSourceJsons)return void(t[r]=Object.assign(Object.assign({},l),{childDataSourceJsons:o(l.childDataSourceJsons)}));const i=Array.isArray(null==l?void 0:l.data)?l.data[0]:null;if(f(i)&&(a.push({layerDefinition:i.layerDefinition,featureSet:i.featureSet,popupInfo:i.popupInfo}),(null==l?void 0:l.id)&&v.set(l.id,i)),l){const{data:e}=l,a=p(l,["data"]);t[r]=a}}),t},r=o(t);if(!a.length)return{dataSourceJson:e,itemData:null};const l={layers:a};return(null==e?void 0:e.id)&&m.set(e.id,l),{dataSourceJson:Object.assign(Object.assign({},e),{childDataSourceJsons:r}),itemData:l}})(b),j=d&&c(S)?((e,t)=>new e({url:t.url,title:t.label||t.sourceLabel,activeLayer:{id:t.wmtsLayerId,tileMatrixSetId:t.wmtsTileMatrixSetId}}))(d,S):null;return{id:S.id,dataSourceJson:(0,t.Immutable)(S),itemData:w,layer:j}});return yield Promise.allSettled(h.filter(e=>e.layer).map(e=>S(this,void 0,void 0,function*(){var t;const a=null===(t=e.layer.sourceJSON)||void 0===t?void 0:t.capabilities;a&&(yield e.layer.load(),e.layer.sourceJSON.capabilities=a)}))),Promise.allSettled(g.map(e=>S(this,void 0,void 0,function*(){const a=yield t.DataSourceManager.getInstance().createDataSource(e),o=e.dataSourceJson;return(null==o?void 0:o.type)===t.DataSourceTypes.GroupLayer&&(null==o?void 0:o.childDataSourceJsons)&&!(null==o?void 0:o.url)&&!(null==o?void 0:o.itemId)&&(yield b(a)),a.isDataSourceSet()&&!a.areChildDataSourcesCreated()&&(yield a.childDataSourcesReady()),a}))).then(e=>e.filter(e=>"fulfilled"===e.status).map(e=>e.value)).then(o=>S(this,void 0,void 0,function*(){return o.forEach(e=>{y(e)}),yield Promise.allSettled(o.map(e=>b(e))),o.forEach(e=>{N(e)}),r&&o.length>0&&j(a,t.DataSourcesChangeType.Create,o),o.length<e.length?Promise.reject(new Error("Failed to create some data source.")):o}))})}function O(e){return S(this,void 0,void 0,function*(){return e&&0!==e.length?Promise.resolve().then(()=>{e.forEach(e=>{const a=w(e.dataSourceJson.id);a&&(t.DataSourceManager.getInstance().updateDataSourceByDataSourceJson(a,(0,t.Immutable)(e.dataSourceJson)),N(a))})}):Promise.resolve()})}function D(e,a,o=!0){const r=e.map(e=>w(e)).filter(e=>!!e);return o&&r.length>0&&j(a,t.DataSourcesChangeType.Remove,r),Promise.resolve().then(()=>{(e=>{e.forEach(e=>{e.isDataSourceSet()&&e.getAllChildDataSources().forEach(e=>{v.delete(e.id)})}),e.forEach(e=>{m.delete(e.id)})})(r),e.forEach(e=>{t.MutableStoreManager.getInstance().updateStateValue("setFilter",e,null),t.DataSourceManager.getInstance().destroyDataSource(e)})})}function C(e){var t;e.stopPropagation(),e.preventDefault(),null===(t=e.nativeEvent)||void 0===t||t.stopImmediatePropagation()}function T(e){const a=t.React.useRef(null),o=t.React.useRef(null);return Object.is(o.current,e)||(a.current=o.current,o.current=e),a.current}function F(e,t){return`add-data-${e}-${t}-${(new Date).getTime()}`}function L(e,a){return S(this,void 0,void 0,function*(){var o,r,l,i;if(1===((null==a?void 0:a.layers)||[]).concat((null==a?void 0:a.tables)||[]).length&&(1===(null===(o=null==a?void 0:a.layers)||void 0===o?void 0:o.length)&&(null===(l=null===(r=null==a?void 0:a.layers)||void 0===r?void 0:r[0])||void 0===l?void 0:l.type)===t.SupportedLayerServiceTypes.FeatureLayer||1===(null===(i=null==a?void 0:a.tables)||void 0===i?void 0:i.length))){const o=function(e,t){var a;return`${e}/${(null===(a=((null==t?void 0:t.layers)||[]).concat((null==t?void 0:t.tables)||[])[0])||void 0===a?void 0:a.id)||0}`}(e,a);return{url:o,layerDefinition:yield t.ServiceManager.getInstance().fetchServiceInfo(o).then(e=>e.definition)}}return null})}var z=s(5629),E=s.n(z),A=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const R=a=>{const o=window.SVG,{className:r}=a,l=A(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:E()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))};var J=s(56340);const k=()=>[{type:J.ItemCategory.MyContent,customLabel:"",enabled:!0,id:J.ItemCategory.MyContent},{type:J.ItemCategory.MyGroup,customLabel:"",enabled:!0,id:J.ItemCategory.MyGroup},{type:J.ItemCategory.MyOrganization,customLabel:"",enabled:!0,id:J.ItemCategory.MyOrganization},{type:J.ItemCategory.OrganizationContent,customLabel:"",enabled:!0,id:J.ItemCategory.OrganizationContent},{type:J.ItemCategory.Public,customLabel:"",enabled:!0,id:J.ItemCategory.Public},{type:J.ItemCategory.LivingAtlas,customLabel:"",enabled:!0,id:J.ItemCategory.LivingAtlas}],P=(e,t)=>((e,t)=>{var a;if(e.type!==J.ItemCategory.Curated)return t;const o=Number(null===(a=e.id.split("_"))||void 0===a?void 0:a.pop());return!o||o<2?t:`${t} ${o}`})(t,e((e=>{switch(e){case J.ItemCategory.MyContent:return"myContent";case J.ItemCategory.MyGroup:return"myGroup";case J.ItemCategory.MyOrganization:return"myOrganization";case J.ItemCategory.OrganizationContent:return"organizationContent";case J.ItemCategory.Public:return"public";case J.ItemCategory.LivingAtlas:return"livingAtlas";case J.ItemCategory.Curated:return"curated"}})(t.type)));var U=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};const B=t.dataSourceUtils.dataSourceJsonCreator,{useMemo:G,useState:V}=t.React,{useSelector:W}=t.ReactRedux,H=(0,t.Immutable)([t.SupportedItemTypes.FeatureService,t.SupportedItemTypes.MapService,t.SupportedItemTypes.SceneService,t.SupportedItemTypes.KnowledgeGraphLayer,t.SupportedItemTypes.FeatureCollection,t.SupportedItemTypes.ImageService,t.SupportedItemTypes.VectorTileService,t.SupportedItemTypes.CSV,t.SupportedItemTypes.GeoJSON,t.SupportedItemTypes.KML,t.SupportedItemTypes.WFS,t.SupportedItemTypes.WMS,t.SupportedItemTypes.WMTS,t.SupportedItemTypes.GroupLayer]),$=o=>{const{className:r="",widgetId:l,multiDataOptions:i,portalUrl:s,nextOrder:d,onChange:c,itemCategoriesInfo:u,displayedItemTypeCategories:p}=o,m=W(e=>e.dataSourcesInfo),[v,f]=V([]),y=G(()=>(0,t.Immutable)(i.filter(e=>{var a;const o=null===(a=null==m?void 0:m[e.dataSourceJson.id])||void 0===a?void 0:a.instanceStatus;return e.dataSourceJson.itemId&&(!o||o===t.DataSourceStatus.NotCreated)}).map(e=>e.dataSourceJson.itemId).concat(v)),[i,m,v]),h=G(()=>(0,t.Immutable)(i.map(e=>e.dataSourceJson.itemId).filter(e=>!y.some(t=>t===e))),[i,y]),g=t.hooks.useTranslation(a.defaultMessages,n),x=(()=>{const[e,a]=t.React.useState([]);return t.React.useEffect(()=>{"true"===t.utils.readLocalStorage("restrictEnterpriseOnly")&&a([J.ItemCategory.Public,J.ItemCategory.LivingAtlas])},[]),e})(),b=G(()=>u?u.filter(e=>e.enabled&&!x.includes(e.type)).map(e=>({id:e.id,type:e.type,customLabel:e.customLabel||P(g,e),curatedFilter:e.curatedFilter})).asMutable():void 0,[u,x,g]);return(0,e.jsx)("div",{className:`data-item-search w-100 h-100 ${r}`,css:_,children:(0,e.jsx)(J.ItemSelector,{mode:J.ItemSelectorMode.Simple,itemType:H,itemTypeCategory:p,portalUrl:s,isMultiple:!0,onSelect:(e,a)=>U(void 0,void 0,void 0,function*(){if(i.some(e=>{var t;return(null===(t=e.dataSourceJson)||void 0===t?void 0:t.itemId)===a.id}))return;f(v.concat(null==a?void 0:a.id));const e=yield function(e,a){return U(this,void 0,void 0,function*(){var o,r,l;try{if(!a)return Promise.resolve(null);if(a.type===t.SupportedItemTypes.FeatureService&&a.url&&/^(http(s)?:)?\/\//.test(a.url)){const i=a.url.split("?")[0].replace(/^http:/,"https:").replace(/\/$/,""),n=yield t.ServiceManager.getInstance().fetchServiceInfo(i).then(e=>e.definition);let s,d;const c={itemId:a.id,portalUrl:a.portalUrl};if(t.dataSourceUtils.isSupportedSingleArcGISLayerService(a.url))s=a.url,d=n;else{const e=((null==n?void 0:n.layers)||[]).concat((null==n?void 0:n.tables)||[]),t=yield L(i,n);t&&(s=t.url,d=t.layerDefinition,c.sourceLabel=a.title||(null===(o=e[0])||void 0===o?void 0:o.name))}if(s&&d)return null===(l=null===(r=B.createDataSourceJsonByLayerDefinition(e,d,s))||void 0===r?void 0:r.merge(c))||void 0===l?void 0:l.asMutable({deep:!0})}return Promise.resolve(B.createDataSourceJsonByItemInfo(e,a,a.portalUrl).asMutable({deep:!0}))}catch(e){return console.error("Failed to create data source",e),Promise.resolve(null)}})}(F(l,d),a);f(v.filter(e=>e!==(null==a?void 0:a.id))),c(i.concat({dataSourceJson:e,order:d}).filter(e=>!!e.dataSourceJson))}),onRemove:(e,t)=>{c(i.filter(e=>e.dataSourceJson.itemId!==t.id))},selectedItems:h,loadingItems:y,itemCategoriesInfo:b,disableDetailPopper:!0,allowAllSceneService:!0,showItemTypeCategoryFilter:!0,enableContentSortInSimpleMode:!0,disableDefaultSortSetting:!0})})};const _=t.css`
  position: relative;
`;var K=s(48407),q=s(15281),Z=s.n(q),X=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const Y=a=>{const o=window.SVG,{className:r}=a,l=X(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:Z()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))};var Q=s(35532),ee=s.n(Q),te=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const ae=a=>{const o=window.SVG,{className:r}=a,l=te(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:ee()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))};var oe=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};const{useState:re,useMemo:le,useRef:ie,useEffect:ne,useCallback:se}=t.React,de=1e3,ce={width:240,height:600},ue=o=>{const{open:r,url:l,reference:i,translate:n,onConfirm:s,onClose:d,onError:c,failedToFetchMessage:u}=o,[p,m]=re(!1),[v,f]=re([]),[y,h]=re(""),[g,x]=re(null),[b,S]=re(de),w=ie(null),[j,I]=re(ce),N=se(e=>oe(void 0,void 0,void 0,function*(){m(!0);try{const a=yield(0,t.loadArcGISJSAPIModule)("esri/layers/ogc/wfsUtils"),o=yield a.getCapabilities(e),r=((null==o?void 0:o.featureTypes)||[]).filter(e=>!!(null==e?void 0:e.name));if(!r.length)throw new Error("NoFeatureTypes");f(r),x(r[0].name),w.current=e}catch(e){c(u),d()}finally{m(!1)}}),[u,d,c]);ne(()=>{r&&l&&(h(""),l!==w.current&&(f([]),x(null),S(de),N(l)))},[r,l,N]);const M=se(()=>{const e=null==i?void 0:i.current;if(!e)return;const t=e.getBoundingClientRect();(null==t?void 0:t.width)&&(null==t?void 0:t.height)&&I({width:Math.round(t.width),height:Math.round(t.height)})},[i]);ne(()=>{if(!r)return;if(M(),!(null==i?void 0:i.current)||"undefined"==typeof ResizeObserver)return;const e=new ResizeObserver(()=>{M()});return e.observe(i.current),()=>{e.disconnect()}},[r,i,M]);const O=le(()=>{const e=y.trim().toLowerCase();return e?v.filter(t=>{var a,o;const r=(null===(a=null==t?void 0:t.name)||void 0===a?void 0:a.toLowerCase())||"",l=(null===(o=null==t?void 0:t.title)||void 0===o?void 0:o.toLowerCase())||"";return r.includes(e)||l.includes(e)}):v},[v,y]);return r?(0,e.jsx)(a.Popper,{open:r,toggle:d,reference:i,placement:"top-start",offsetOptions:[0,-j.height],css:pe,autoFocus:!1,trapFocus:!1,forceLatestFocusElements:!0,children:(0,e.jsxs)("div",{className:"wfs-layer-popper",style:{width:j.width,height:j.height},children:[(0,e.jsx)(a.PanelHeader,{title:n("addLayer"),className:"p-4",showClose:!1,level:1}),(0,e.jsxs)("div",{className:"wfs-layer-content",children:[(0,e.jsx)("div",{className:"url-input-label",children:n("selectLayer")}),(0,e.jsx)(a.TextInput,{className:"wfs-layer-search",allowClear:!0,prefix:(0,e.jsx)(Y,{size:"s"}),value:y,onChange:e=>{h(e.target.value)},placeholder:n("SearchLabel")}),(0,e.jsxs)("div",{className:"wfs-layer-list",role:"listbox","aria-label":n("selectLayer"),children:[p&&(0,e.jsx)("div",{className:"wfs-layer-loading",children:(0,e.jsx)(a.Loading,{className:"wfs-layer-loading-spinner",type:a.LoadingType.Donut,width:24,height:24})}),!p&&0===O.length&&(0,e.jsx)("div",{className:"wfs-layer-empty",children:n("noAvailableLayers")}),!p&&O.map(o=>{const r=o.title||o.name,l=o.name===g;return(0,e.jsx)(a.Tooltip,{title:r,enterDelay:1e3,enterNextDelay:1e3,children:(0,e.jsxs)("button",{type:"button",className:(0,t.classNames)("wfs-layer-item",{selected:l}),onClick:()=>{x(o.name)},role:"option","aria-selected":l,children:[(0,e.jsx)("span",{className:(0,t.classNames)("wfs-layer-item-icon",{selected:l}),children:(0,e.jsx)(ae,{size:"s"})}),(0,e.jsx)("span",{className:"wfs-layer-item-label",children:r})]},o.name)})})]}),(0,e.jsxs)("div",{className:"wfs-layer-max-record",children:[(0,e.jsx)("div",{className:"url-input-label wfs-layer-max-record-label",children:n("maximumRecordCount")}),(0,e.jsx)(a.NumericInput,{size:"sm",min:1,max:3e4,showHandlers:!0,value:b,onChange:e=>{"number"!=typeof e||isNaN(e)?S(de):S(Math.min(3e4,Math.max(1,Math.floor(e))))},"aria-label":n("maximumRecordCount")})]}),(0,e.jsxs)("div",{className:"wfs-layer-actions",children:[(0,e.jsx)(a.Button,{type:"primary",className:"w-100 mb-2",disabled:!g,onClick:()=>{g&&s({layerName:g,maxRecordCount:b})},children:n("ok")}),(0,e.jsx)(a.Button,{className:"w-100",onClick:d,children:n("cancel")})]})]})]})}):null},pe=t.css`
  z-index: 2;
  background: none;
  border: none;
  box-shadow: none;
  overflow: visible;
  .wfs-layer-popper {
    color: var(--sys-color-surface-overlay-text);
    display: flex;
    flex-direction: column;
    background: var(--sys-color-surface-overlay);
    border-width: 1px;
    border-style: solid;
    border-color: var(--sys-color-divider-secondary);
    border-radius: var(--sys-shape-2);
    box-shadow: var(--sys-shadow-2);
    .panel-header {
      .title {
        color: var(--sys-color-surface-overlay-text);
      }
      .jimu-btn {
        color: var(--sys-color-action-text);
      }
    }
    .url-input-label {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--sys-color-surface-overlay-text);
    }
  }
  .wfs-layer-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0 16px 16px 16px;
    .wfs-layer-search {
      .input-wrapper {
        border-bottom: none;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }
  }
  .wfs-layer-list {
    border: 1px solid var(--sys-color-divider-primary);
    border-radius: var(--sys-shape-1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-height: 140px;
    overflow-y: auto;
    margin-bottom: 12px;
    position: relative;
  }
  .wfs-layer-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px 0 6px;
    height: 28px;
    line-height: 28px;
    background: none;
    border: 1px solid transparent;
    text-align: left;
    color: inherit;
    cursor: pointer;
  }
  .wfs-layer-item:hover {
    background: var(--sys-color-action-hover);
  }
  .wfs-layer-item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    margin-right: 6px;
    opacity: 0;
  }
  .wfs-layer-item-icon.selected {
    opacity: 1;
  }
  .wfs-layer-item-label {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wfs-layer-empty {
    padding: 4px 8px;
    color: var(--sys-color-action-disabled-text);
  }
  .wfs-layer-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    padding: 12px 0;
  }
  .wfs-layer-max-record {
    margin-bottom: 12px;
  }
  .wfs-layer-max-record-label {
    margin-bottom: 6px;
  }
  .wfs-layer-actions {
    margin-top: auto;
  }
  .wfs-layer-actions .jimu-btn {
    justify-content: center;
  }
`;var me=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};const{useState:ve,useMemo:fe,useRef:ye,useEffect:he,useCallback:ge}=t.React,xe={width:240,height:600},be=o=>{const{open:r,url:l,reference:i,translate:n,onConfirm:s,onClose:d,onError:c,failedToFetchMessage:u}=o,[p,m]=ve(!1),[v,f]=ve([]),[y,h]=ve(""),[g,x]=ve(new Set),b=ye(null),[S,w]=ve(xe),j=ge(e=>me(void 0,void 0,void 0,function*(){var a,o;m(!0);try{const r=new(yield(0,t.loadArcGISJSAPIModule)("esri/layers/WMSLayer"))({url:e});yield r.load();const l=((null===(a=r.allSublayers)||void 0===a?void 0:a.toArray())||(null===(o=r.sublayers)||void 0===o?void 0:o.toArray())||[]).filter(e=>null!=(null==e?void 0:e.id)).map(e=>({id:`${e.id}`,title:e.title,name:e.name}));if(!l.length)throw new Error("NoSublayers");f(l),x(new Set),b.current=e}catch(e){c(u),d()}finally{m(!1)}}),[u,d,c]);he(()=>{r&&l&&(h(""),l!==b.current&&(f([]),x(new Set),j(l)))},[r,l,j]);const I=ge(()=>{const e=null==i?void 0:i.current;if(!e)return;const t=e.getBoundingClientRect();(null==t?void 0:t.width)&&(null==t?void 0:t.height)&&w({width:Math.round(t.width),height:Math.round(t.height)})},[i]);he(()=>{if(!r)return;if(I(),!(null==i?void 0:i.current)||"undefined"==typeof ResizeObserver)return;const e=new ResizeObserver(()=>{I()});return e.observe(i.current),()=>{e.disconnect()}},[r,i,I]);const N=fe(()=>{const e=y.trim().toLowerCase();return e?v.filter(t=>{var a,o;const r=(null===(a=t.name)||void 0===a?void 0:a.toLowerCase())||"",l=(null===(o=t.title)||void 0===o?void 0:o.toLowerCase())||"";return r.includes(e)||l.includes(e)||t.id.includes(e)}):v},[v,y]),M=v.length>0&&g.size===v.length;return r?(0,e.jsx)(a.Popper,{open:r,toggle:d,reference:i,placement:"top-start",offsetOptions:[0,-S.height],css:Se,autoFocus:!1,trapFocus:!1,forceLatestFocusElements:!0,children:(0,e.jsxs)("div",{className:"wms-layer-popper",style:{width:S.width,height:S.height},children:[(0,e.jsx)(a.PanelHeader,{title:n("addLayer"),className:"p-4",showClose:!1,level:1}),(0,e.jsxs)("div",{className:"wms-layer-content",children:[(0,e.jsx)("div",{className:"url-input-label",children:n("selectLayersToAdd")}),(0,e.jsx)(a.TextInput,{className:"wms-layer-search",allowClear:!0,prefix:(0,e.jsx)(Y,{size:"s"}),value:y,onChange:e=>{h(e.target.value)},placeholder:n("SearchLabel")}),(0,e.jsxs)("div",{className:"wms-layer-list",role:"listbox","aria-label":n("selectLayer"),children:[p&&(0,e.jsx)("div",{className:"wms-layer-loading",children:(0,e.jsx)(a.Loading,{className:"wms-layer-loading-spinner",type:a.LoadingType.Donut,width:24,height:24})}),!p&&0===N.length&&(0,e.jsx)("div",{className:"wms-layer-empty",children:n("noAvailableLayers")}),!p&&N.map(o=>{const r=o.title||o.name||o.id,l=g.has(o.id);return(0,e.jsx)(a.Tooltip,{title:r,enterDelay:1e3,enterNextDelay:1e3,children:(0,e.jsxs)("button",{type:"button",className:(0,t.classNames)("wms-layer-item",{selected:l}),onClick:()=>{var e;e=o.id,x(t=>{const a=new Set(t);return a.has(e)?a.delete(e):a.add(e),a})},role:"option","aria-selected":l,children:[(0,e.jsx)("span",{className:(0,t.classNames)("wms-layer-item-icon",{selected:l}),children:(0,e.jsx)(ae,{size:"s"})}),(0,e.jsx)("span",{className:"wms-layer-item-label",children:r})]},o.id)})})]}),(0,e.jsx)(a.Button,{className:"wms-layer-select-toggle",variant:"text",color:"primary",disabled:p||0===v.length,onClick:()=>{x(M?new Set:new Set(v.map(e=>e.id)))},children:n(M?"deselectAll":"selectAll")}),(0,e.jsxs)("div",{className:"wms-layer-actions",children:[(0,e.jsx)(a.Button,{type:"primary",className:"w-100 mb-2",disabled:!g.size,onClick:()=>{if(!g.size)return;const e=v.filter(e=>g.has(e.id)).map(e=>e.id);s({layerId:e.join("-")})},children:n("ok")}),(0,e.jsx)(a.Button,{className:"w-100",onClick:d,children:n("cancel")})]})]})]})}):null},Se=t.css`
  z-index: 2;
  background: none;
  border: none;
  box-shadow: none;
  overflow: visible;
  .wms-layer-popper {
    color: var(--sys-color-surface-overlay-text);
    display: flex;
    flex-direction: column;
    background: var(--sys-color-surface-overlay);
    border-width: 1px;
    border-style: solid;
    border-color: var(--sys-color-divider-secondary);
    border-radius: var(--sys-shape-2);
    box-shadow: var(--sys-shadow-2);
    .panel-header {
      .title {
        color: var(--sys-color-surface-overlay-text);
      }
      .jimu-btn {
        color: var(--sys-color-action-text);
      }
    }
    .url-input-label {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--sys-color-surface-overlay-text);
    }
  }
  .wms-layer-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0 16px 16px 16px;
    .wms-layer-search {
      .input-wrapper {
        border-bottom: none;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }
  }
  .wms-layer-list {
    border: 1px solid var(--sys-color-divider-primary);
    border-radius: var(--sys-shape-1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-height: 140px;
    overflow-y: auto;
    margin-bottom: 12px;
    position: relative;
  }
  .wms-layer-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 8px 0 6px;
    height: 28px;
    line-height: 28px;
    background: none;
    border: 1px solid transparent;
    text-align: left;
    color: inherit;
    cursor: pointer;
  }
  .wms-layer-item:hover {
    background: var(--sys-color-action-hover);
  }
  .wms-layer-item-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    margin-right: 6px;
    opacity: 0;
  }
  .wms-layer-item-icon.selected {
    opacity: 1;
  }
  .wms-layer-item-label {
    flex: 1 1 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .wms-layer-empty {
    padding: 4px 8px;
    color: var(--sys-color-action-disabled-text);
  }
  .wms-layer-loading {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    padding: 12px 0;
  }
  .wms-layer-actions {
    margin-top: auto;
  }
  .wms-layer-actions .jimu-btn {
    justify-content: center;
  }
  .wms-layer-select-toggle {
    padding: 0;
    width: auto;
    align-self: flex-start;
    margin-bottom: 12px;
  }
`;var we=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};const{useState:je,useMemo:Ie,useRef:Ne,useEffect:Me,useCallback:Oe}=t.React,De={width:240,height:600},Ce=o=>{const{open:r,url:l,reference:i,translate:n,onConfirm:s,onClose:d,onError:c,failedToFetchMessage:u}=o,[p,m]=je(!1),[v,f]=je([]),[y,h]=je(""),[g,x]=je(null),[b,S]=je(null),w=Ne(null),[j,I]=je(De),N=Oe(e=>we(void 0,void 0,void 0,function*(){var a,o;m(!0);try{const r=new(yield(0,t.loadArcGISJSAPIModule)("esri/layers/WMTSLayer"))({url:e});yield r.load();const l=((null===(a=r.sublayers)||void 0===a?void 0:a.toArray())||[]).filter(e=>null!=(null==e?void 0:e.id)).map(e=>{var t,a;return{id:e.id,title:e.title,tileMatrixSets:((null===(a=null===(t=e.tileMatrixSets)||void 0===t?void 0:t.toArray)||void 0===a?void 0:a.call(t))||[]).filter(e=>!!(null==e?void 0:e.id)).map(e=>({id:`${e.id}`,title:e.title}))}}).filter(e=>e.tileMatrixSets.length>0);if(!l.length)throw new Error("NoSublayers");const i=1===l.length?l[0].id:null,n=(null===(o=l[0].tileMatrixSets[0])||void 0===o?void 0:o.id)||null;f(l),x(i),S(n),w.current=e}catch(e){c(u),d()}finally{m(!1)}}),[u,d,c]);Me(()=>{r&&l&&(h(""),l!==w.current&&(f([]),x(null),S(null),N(l)))},[r,l,N]);const M=Oe(()=>{const e=null==i?void 0:i.current;if(!e)return;const t=e.getBoundingClientRect();(null==t?void 0:t.width)&&(null==t?void 0:t.height)&&I({width:Math.round(t.width),height:Math.round(t.height)})},[i]);Me(()=>{if(!r)return;if(M(),!(null==i?void 0:i.current)||"undefined"==typeof ResizeObserver)return;const e=new ResizeObserver(()=>{M()});return e.observe(i.current),()=>{e.disconnect()}},[r,i,M]);const O=Ie(()=>{const e=y.trim().toLowerCase();return e?v.filter(t=>{var a;return((null===(a=t.title)||void 0===a?void 0:a.toLowerCase())||"").includes(e)||t.id.includes(e)}):v},[v,y]),D=Ie(()=>v.find(e=>e.id===g)||null,[g,v]),C=Ie(()=>D||v[0]||null,[D,v]);Me(()=>{var e;if(!C)return void S(null);C.tileMatrixSets.some(e=>e.id===b)||S((null===(e=C.tileMatrixSets[0])||void 0===e?void 0:e.id)||null)},[C,b]);const T=Ie(()=>(null==C?void 0:C.tileMatrixSets.find(e=>e.id===b))||null,[C,b]);return r?(0,e.jsx)(a.Popper,{open:r,toggle:d,reference:i,placement:"top-start",offsetOptions:[0,-j.height],css:Te,autoFocus:!1,trapFocus:!1,forceLatestFocusElements:!0,children:(0,e.jsxs)("div",{className:"wmts-layer-popper",style:{width:j.width,height:j.height},children:[(0,e.jsx)(a.PanelHeader,{title:n("addLayer"),className:"p-4",showClose:!1,level:1}),(0,e.jsxs)("div",{className:"wmts-layer-content",children:[(0,e.jsx)("div",{className:"url-input-label",children:n("selectLayerToAdd")}),(0,e.jsx)(a.TextInput,{className:"wmts-layer-search",allowClear:!0,prefix:(0,e.jsx)(Y,{size:"s"}),value:y,onChange:e=>{h(e.target.value)},placeholder:n("SearchLabel")}),(0,e.jsxs)("div",{className:"wmts-layer-list",role:"radiogroup","aria-label":n("selectLayerToAdd"),children:[p&&(0,e.jsx)("div",{className:"wmts-layer-loading",children:(0,e.jsx)(a.Loading,{className:"wmts-layer-loading-spinner",type:a.LoadingType.Donut,width:24,height:24})}),!p&&0===O.length&&(0,e.jsx)("div",{className:"wmts-layer-empty",children:n("noAvailableLayers")}),!p&&O.map(o=>{const r=o.title||o.id,l=o.id===g;return(0,e.jsx)(a.Tooltip,{title:r,enterDelay:1e3,enterNextDelay:1e3,children:(0,e.jsxs)(a.Label,{className:(0,t.classNames)("wmts-layer-item",{selected:l}),children:[(0,e.jsx)(a.Radio,{style:{cursor:"pointer"},name:"wmts-sublayer",className:"mr-2",checked:l,onChange:()=>{x(o.id)}}),(0,e.jsx)("span",{className:"wmts-layer-item-label",children:r})]})},o.id)})]}),(0,e.jsx)("div",{className:"url-input-label mt-3",children:n("selectTileMatrixSet")}),(0,e.jsxs)(a.Dropdown,{menuRole:"listbox",activeIcon:!0,className:"w-100","aria-label":n("selectTileMatrixSet"),children:[(0,e.jsx)(a.DropdownButton,{size:"sm",className:"text-left",children:(null==T?void 0:T.title)||(null==T?void 0:T.id)||""}),(0,e.jsx)(a.DropdownMenu,{children:null==C?void 0:C.tileMatrixSets.map(t=>{const o=t.title||t.id;return(0,e.jsx)(a.DropdownItem,{active:t.id===b,onClick:()=>{S(t.id)},children:o},t.id)})})]}),(0,e.jsxs)("div",{className:"wmts-layer-actions",children:[(0,e.jsx)(a.Button,{type:"primary",className:"w-100 mb-2",disabled:!D||!b,onClick:()=>{D&&b&&s({wmtsLayerId:D.id,wmtsTileMatrixSetId:b,sourceLabel:D.title||D.id})},children:n("ok")}),(0,e.jsx)(a.Button,{className:"w-100",onClick:d,children:n("cancel")})]})]})]})}):null},Te=t.css`
  z-index: 2;
  background: none;
  border: none;
  box-shadow: none;
  overflow: visible;

  .wmts-layer-popper {
    color: var(--sys-color-surface-overlay-text);
    display: flex;
    flex-direction: column;
    background: var(--sys-color-surface-overlay);
    border-width: 1px;
    border-style: solid;
    border-color: var(--sys-color-divider-secondary);
    border-radius: var(--sys-shape-2);
    box-shadow: var(--sys-shadow-2);

    .panel-header {
      .title {
        color: var(--sys-color-surface-overlay-text);
      }

      .jimu-btn {
        color: var(--sys-color-action-text);
      }
    }

    .url-input-label {
      font-size: 13px;
      font-weight: 500;
      margin-bottom: 8px;
      color: var(--sys-color-surface-overlay-text);
    }
  }

  .wmts-layer-content {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    padding: 0 16px 16px 16px;

    .wmts-layer-search {
      .input-wrapper {
        border-bottom: none;
        border-bottom-left-radius: 0px;
        border-bottom-right-radius: 0px;
      }
    }
  }

  .wmts-layer-list {
    border: 1px solid var(--sys-color-divider-primary);
    border-radius: var(--sys-shape-1);
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    max-height: 130px;
    overflow-y: auto;
    margin-bottom: 4px;
    position: relative;
  }

  .dropdown {
    width: 100%;
    margin-bottom: 4px;
  }

  .wmts-layer-item {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 8px 10px;
    color: inherit;
    text-align: left;
    cursor: pointer;
    margin-bottom: 0;

    &:hover {
      background: var(--sys-color-state-hover);
    }

    &.selected {
      background: var(--sys-color-state-primary-hover);
    }
  }

  .wmts-layer-item-label {
    flex: 1 1 auto;
    min-width: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .wmts-layer-loading,
  .wmts-layer-empty {
    min-height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    color: var(--sys-color-surface-overlay-text);
  }

  .wmts-layer-actions {
    margin-top: auto;
    padding-top: 12px;
  }
`;var Fe=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};const Le=t.dataSourceUtils.dataSourceJsonCreator;var ze;!function(e){e.NotSupportedType="addDataErrorNotSupported",e.FailedToFetch="invalidResourceItem",e.CannotBeAdded="cannotBeAddedError"}(ze||(ze={}));const{useState:Ee,useMemo:Ae,useRef:Re,useEffect:Je,useCallback:ke}=t.React;var Pe;!function(e){e.ArcGISWebService="arcgisUrl",e.WMS="wmsUrl",e.WMTS="wmtsUrl",e.WFS="wfsUrl",e.KML="kmlUrl",e.CSV="csvUrl",e.GeoJSON="geojsonUrl"}(Pe||(Pe={}));const Ue={[Pe.ArcGISWebService]:"https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",[Pe.WMS]:"https://mesonet.agron.iastate.edu/cgi-bin/wms/nexrad/n0r.cgi?service=WMS&request=GetCapabilities",[Pe.WMTS]:"https://wayback.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/WMTS/1.0.0/default028mm/MapServer/tile/45134/%7Blevel%7D/%7Brow%7D/%7Bcol%7D",[Pe.WFS]:"https://dservices.arcgis.com/V6ZHFr6zdgNZuVG0/arcgis/services/JapanPrefectures2018/WFSServer",[Pe.KML]:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month_age_animated.kml",[Pe.CSV]:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv",[Pe.GeoJSON]:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson"},Be=["https"],Ge=o=>{const{className:r="",widgetId:l,onChange:i,setErrorMsg:s,nextOrder:d,multiDataOptions:c,popperReference:u}=o,p=t.hooks.useTranslation(t.defaultMessages,a.defaultMessages,n),[m,v]=Ee(Pe.ArcGISWebService),[f,y]=Ee({value:"",valid:!0}),[h,g]=Ee(!1),[x,b]=Ee(!1),[S,w]=Ee(!1),[j,I]=Ee(!1),N=Re(null),M=Re(null),O=Re(null),D=null!=u?u:M,C=Ve(null==f?void 0:f.value),T=Ae(()=>{const e={};return Object.values(Pe).forEach(t=>{e[t]=p(t)}),e},[p]),L=e=>{const a=function(e,a){if(!e||!a)return!0;const o=Ve(e);if(!o)return!1;return a!==Pe.ArcGISWebService?/^https:\/\//.test(o):t.dataSourceUtils.isSupportedArcGISService(o)||We(o)}(e,m);return{valid:a,msg:!a&&p("invalidUrlMessage")}};Je(()=>{m!==Pe.WFS&&x&&b(!1),m!==Pe.WMS&&S&&w(!1),m!==Pe.WMTS&&j&&I(!1)},[m,x,S,j]),Je(()=>{const e=null==f?void 0:f.value;(x||S||j)&&O.current&&e!==O.current&&(b(!1),w(!1),I(!1)),O.current=e},[null==f?void 0:f.value,x,S,j]);const z=ke(()=>{b(!0)},[]),E=ke(()=>{b(!1)},[]),A=ke(()=>{w(!0)},[]),R=ke(()=>{w(!1)},[]),J=ke(()=>{I(!0)},[]),k=ke(()=>{I(!1)},[]),P=`add-data-${l}-sample-url-content`;return(0,e.jsxs)("div",{className:`data-url-input w-100 h-100 p-4 ${r}`,css:_e,children:[(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"url-input-label",children:p("urlType")}),(0,e.jsxs)(a.Dropdown,{className:"w-100",activeIcon:!0,menuRole:"listbox","aria-label":p("urlType"),children:[(0,e.jsx)(a.DropdownButton,{size:"sm",className:"text-left",role:"combobox",children:T[m]}),(0,e.jsx)(a.DropdownMenu,{children:Object.keys(T).map((t,o)=>(0,e.jsx)(a.DropdownItem,{active:m===t,onClick:()=>{var e;(e=t)!==m&&(v(e),y({value:"",valid:f.valid}))},children:T[t]},o))})]})]}),(0,e.jsxs)("div",{className:"mt-4",children:[(0,e.jsx)("div",{className:"url-input-label",children:p("url")}),(0,e.jsx)(a.UrlInput,{className:(0,t.classNames)({"with-error":!f.valid}),height:80,schemes:Be,value:f.value,checkValidityOnChange:L,checkValidityOnAccept:L,onChange:e=>{y(e)},"aria-label":p("url")})]}),(0,e.jsx)("div",{className:"mt-4",children:(0,e.jsx)(a.Button,{onClick:()=>Fe(void 0,void 0,void 0,function*(){var e;const a=null==f?void 0:f.value,o=Ve(a);if(o)if(o!==a&&y({value:o,valid:f.valid}),m!==Pe.WFS)if(m!==Pe.WMS)if(m!==Pe.WMTS)try{g(!0);const e=yield $e(F(l,d),o,m);if(N.current=e,e.type===t.DataSourceTypes.GroupLayer)throw new Error(ze.CannotBeAdded);e&&i(c.concat({dataSourceJson:e,order:d}))}catch(t){t.message===ze.NotSupportedType?s(p(ze.NotSupportedType)):t.message===ze.CannotBeAdded?s(p(ze.CannotBeAdded,{layerName:null===(e=N.current)||void 0===e?void 0:e.sourceLabel})):s(p(ze.FailedToFetch))}finally{N.current=null,g(!1)}else J();else A();else z()}),type:"primary",disabled:!f.value||!f.valid||x||S||j,className:"px-4 w-100",title:p("add"),"aria-label":p("add"),ref:M,children:p("add")})}),(0,e.jsx)(ue,{open:x,url:C,reference:D,translate:p,onConfirm:e=>Fe(void 0,void 0,void 0,function*(){const t=Ve(null==f?void 0:f.value);if(t&&(null==e?void 0:e.layerName))try{g(!0);const a="wfs-laye-option",o=yield $e(F(l,d),t,Pe.WFS,{layerName:e.layerName,maxRecordCount:e.maxRecordCount,query:{id:a,label:a,maximum:e.maxRecordCount}});o&&i(c.concat({dataSourceJson:o,order:d}))}catch(e){s(p(ze.FailedToFetch))}finally{g(!1),b(!1)}}),onClose:E,onError:s,failedToFetchMessage:p(ze.FailedToFetch)}),(0,e.jsx)(be,{open:S,url:C,reference:D,translate:p,onConfirm:e=>Fe(void 0,void 0,void 0,function*(){const t=Ve(null==f?void 0:f.value);if(t&&(null==e?void 0:e.layerId))try{g(!0);const a=yield $e(F(l,d),t,Pe.WMS,{layerId:e.layerId});a&&i(c.concat({dataSourceJson:a,order:d}))}catch(e){s(p(ze.FailedToFetch))}finally{g(!1),w(!1)}}),onClose:R,onError:s,failedToFetchMessage:p(ze.FailedToFetch)}),(0,e.jsx)(Ce,{open:j,url:C,reference:D,translate:p,onConfirm:e=>Fe(void 0,void 0,void 0,function*(){const t=Ve(null==f?void 0:f.value);if(t&&(null==e?void 0:e.wmtsLayerId)&&(null==e?void 0:e.wmtsTileMatrixSetId))try{g(!0);const a=yield $e(F(l,d),t,Pe.WMTS,e);a&&i(c.concat({dataSourceJson:a,order:d}))}catch(e){s(p(ze.FailedToFetch))}finally{g(!1),I(!1)}}),onClose:k,onError:s,failedToFetchMessage:p(ze.FailedToFetch)}),(0,e.jsxs)("div",{className:"mt-4",children:[(0,e.jsxs)("div",{className:"url-input-label mb-1 d-flex align-items-center sample-url-title",role:"group","aria-label":p("sampleUrl"),children:[p("sampleUrl"),(0,e.jsx)(K.CopyButton,{text:Ue[m],"aria-describedby":P})]}),(0,e.jsx)("div",{className:"sample-url",id:P,children:Ue[m]})]}),h&&(0,e.jsx)("div",{className:"upload-loading-container",children:(0,e.jsx)("div",{className:"upload-loading-content",children:(0,e.jsx)(a.Loading,{className:"upload-loading",type:a.LoadingType.Primary,width:30,height:28})})})]})};function Ve(e){var t;return null!==(t=null==e?void 0:e.trim())&&void 0!==t?t:""}function We(e){return!(!e||!/^https:\/\//.test(e))&&/\/content\/items\/.+\/resources\/styles\/root.json/.test(e)}const He={[Pe.CSV]:t.DataSourceTypes.CSV,[Pe.GeoJSON]:t.DataSourceTypes.GeoJSON,[Pe.KML]:t.DataSourceTypes.KML,[Pe.WFS]:t.DataSourceTypes.WFS,[Pe.WMS]:t.DataSourceTypes.WMS,[Pe.WMTS]:t.DataSourceTypes.WMTS};function $e(e,a,o,r){return Fe(this,void 0,void 0,function*(){const l=Ve(a);if(!l||!o)return Promise.reject(new Error("Need URL."));if(a=l.replace(/^http:/,"https:"),Object.keys(He).some(e=>e===o)){const t=o===Pe.WFS?r:null,l={id:e,type:He[o],sourceLabel:(null==t?void 0:t.layerName)||a.split("?")[0].split("/").filter(e=>!!e).reverse()[0],url:a,query:null==t?void 0:t.query,layerId:null==r?void 0:r.layerId};return o===Pe.WMTS&&(null==r?void 0:r.wmtsLayerId)&&(null==r?void 0:r.wmtsTileMatrixSetId)?((e,t)=>Object.assign(Object.assign({},e),{sourceLabel:t.sourceLabel||e.sourceLabel,wmtsLayerId:t.wmtsLayerId,wmtsTileMatrixSetId:t.wmtsTileMatrixSetId}))(l,r):l}return o===Pe.ArcGISWebService?We(a=a.split("?")[0])?function(e,a){return Fe(this,void 0,void 0,function*(){if(!e||!a)return Promise.reject(new Error(ze.NotSupportedType));const o=e.match(new RegExp("(?<portalUrl>.+)content/items/.+/resources/styles/root.json")).groups.portalUrl,r=e.match(new RegExp(".+/content/items/(?<itemId>.+)/resources/styles/root.json")).groups.itemId,l=yield t.requestUtils.requestWrapper(o,e=>t.esri.restPortal.getItem(r,{portal:o,authentication:e}));return"Vector Tile Service"!==l.type?Promise.reject(new Error(ze.NotSupportedType)):{id:a,type:t.DataSourceTypes.VectorTileService,sourceLabel:l.title,url:e,itemId:r,portalUrl:o.replace("/sharing/rest/","")}})}(a,e):function(e,a){return Fe(this,void 0,void 0,function*(){if(!e||!a)return Promise.reject(new Error(ze.NotSupportedType));const o=yield t.ServiceManager.getInstance().fetchServiceInfo(e).then(e=>e.definition);let r=e,l=o;if(t.dataSourceUtils.isSupportedWholeArcGISService(e)&&Le.getDataSourceTypeFromArcGISWholeServiceUrl(e)===t.DataSourceTypes.FeatureService){const t=e.split("?")[0].replace(/^http:/,"https:").replace(/\/$/,""),a=yield L(t,o);a&&(r=a.url,l=a.layerDefinition)}return function(e,t,a){var o;const r=null===(o=Le.createDataSourceJsonByLayerDefinition(e,a,t))||void 0===o?void 0:o.asMutable({deep:!0});if(r)return r;throw new Error(ze.FailedToFetch)}(a,r,l)})}(a,e):Promise.reject(new Error(ze.NotSupportedType))})}const _e=t.css`
  position: relative;
  overflow: auto;

  .upload-loading-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }
  .upload-loading-content {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
  }

  .sample-url {
    font-style: italic;
    font-weight: 400;
    font-size: 13px;
    word-break: break-all;
    color: var(--sys-color-surface-overlay-text);
  }

  .url-input.with-error {
    margin-bottom: 60px;
  }
  .url-input-label {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 8px;
    color: var(--sys-color-surface-overlay-text);
  }
  .sample-url-title {
    justify-content: space-between;
  }
  .jimu-dropdown-button {
    color: var(--sys-color-surface-overlay-text);
  }
`;var Ke=s(1888);const qe=["xmin","ymin","xmax","ymax"];function Ze(e){var t;const a=null===(t=null==e?void 0:e.publishParameters)||void 0===t?void 0:t.layers;return!!Array.isArray(a)&&a.some(e=>{const t=null==e?void 0:e.extent;return!!t&&qe.some(e=>{const a=t[e];return null!=a&&function(e){return"number"!=typeof e||Number.isNaN(e)||!Number.isFinite(e)||Math.abs(e)>=1e300}(a)})})}var Xe,Ye=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};!function(e){e.CSV="csv",e.GeoJson="geojson",e.Shapefile="shapefile",e.KML="kml",e.GPX="gpx",e.FileGeoDatabase="fileGeodatabase"}(Xe||(Xe={}));const Qe=[Xe.Shapefile,Xe.FileGeoDatabase],et={[Xe.CSV]:10485760,[Xe.GeoJson]:10485760,[Xe.Shapefile]:2097152,[Xe.FileGeoDatabase]:10485760,[Xe.KML]:10485760,[Xe.GPX]:10485760};var tt;!function(e){e.NotSupportedType="notSupportedFileTypeError",e.FailedToUpload="failedToUploadError",e.ExceedMaxSize="exceedMaxSizeError",e.ExceedMaxRecords="exceedMaxRecordsError",e.NoValidData="fileHasNoValidData",e.CorruptedShapefile="corruptedShapefileError",e.ExceedMaxFileNumber="exceedMaxFileNumberError"}(tt||(tt={}));const at=new Map([[tt.NotSupportedType,"multiFilesNotSupportedFileTypeError"],[tt.FailedToUpload,"multiFilesFailedToUploadError"],[tt.ExceedMaxSize,"multiFilesExceedMaxSizeError"],[tt.ExceedMaxRecords,"multiFilesExceedMaxRecordsError"],[tt.NoValidData,"multiFilesHasNoValidData"],[tt.CorruptedShapefile,"multiFilesCorruptedShapefileError"]]),ot=4e3,{useState:rt,useEffect:lt,useMemo:it,useRef:nt}=t.React,st=/iPad|iPhone|iPod/.test(window.navigator.userAgent)?void 0:Object.values(Xe).map(e=>ut(e)).join(","),dt=o=>{const{className:r="",onChange:l,setErrorMsg:i,nextOrder:d,portalUrl:c,widgetId:u,multiDataOptions:p,onlyOneTab:m}=o,v=t.hooks.useTranslation(t.defaultMessages,a.defaultMessages,n),f=it(()=>`${u}-drag-to-upload`,[u]),y=it(()=>`${u}-click-to-upload`,[u]),[h,g]=rt(!1),x=nt(null),b=nt([]);lt(()=>{l(p)},[p,l]);const S=nt(null),w=e=>Ye(void 0,void 0,void 0,function*(){var a;if(!e.type)throw new Error(tt.NotSupportedType);if(e.size>et[e.type])throw new Error(tt.ExceedMaxSize);const o=yield function(e,a){return Ye(this,void 0,void 0,function*(){var o,r,l,i,n,s,d,c,u,p;const m=yield(0,t.loadArcGISJSAPIModule)("esri/request");if(e.type===Xe.KML){const a=function(){var e,a,o;const r=null===(a=null===(e=(0,t.getAppStore)().getState())||void 0===e?void 0:e.portalSelf)||void 0===a?void 0:a.isPortal;if(r){return`${null===(o=(0,t.getAppStore)().getState())||void 0===o?void 0:o.portalUrl}/sharing/kml`}const l=window.jimuConfig.hostEnv;return`https://utility${"dev"===l?"devext":"qa"===l?"qa":""}.arcgis.com/sharing/kml`}(),o=yield function(e){return new Promise(t=>{const a=new FileReader;a.onload=e=>{t(e.target.result)},a.readAsText(e.data.get("file"))})}(e),r=yield m(a,{query:{kmlString:encodeURIComponent(o),model:"simple",folders:""},responseType:"json"});return null==r?void 0:r.data}let v={},f=null;if(e.type!==Xe.GPX){if((null===(r=null===(o=(0,t.getAppStore)().getState())||void 0===o?void 0:o.portalSelf)||void 0===r?void 0:r.isPortal)&&e.type===Xe.GeoJson)v={targetSR:{wkid:102100,latestWkid:3857},type:e.type,maxRecordCount:ot};else{e.type===Xe.Shapefile&&(f=yield function(e){return Ye(this,void 0,void 0,function*(){try{const{JSZip:a}=yield t.moduleLoader.loadModule("jimu-core/jszip"),o=yield a.loadAsync(e),r=Object.keys(o.files).find(e=>e.toLowerCase().endsWith(".prj"));if(!r)return null;const l=yield o.files[r].async("string"),i=l.match(/AUTHORITY\["EPSG","(\d+)"\]/);return i?{wkid:Number(i[1])}:{wkt:l}}catch(e){return console.error("Error extracting projection from zip:",e),null}})}(e.data.get("file")));const o=`${a}/sharing/rest/content/features/analyze`;let r;e.data.set("analyzeParameters",JSON.stringify({targetSR:f,enableGlobalGeocoding:!0,sourceLocale:null!==(i=null===(l=(0,t.getAppStore)().getState().appContext)||void 0===l?void 0:l.locale)&&void 0!==i?i:"en"}));try{r=yield m(o,{body:e.data,method:"post"})}finally{e.data.delete("analyzeParameters")}if(y=e.type===Xe.Shapefile,h=null==r?void 0:r.data,y&&Ze(h))throw new Error(tt.CorruptedShapefile);v=null===(n=null==r?void 0:r.data)||void 0===n?void 0:n.publishParameters}}var y,h;const g=`${a}/sharing/rest/content/features/generate`;e.data.set("publishParameters",JSON.stringify(Object.assign(Object.assign({},v),{name:e.name,maxRecordCount:e.type===Xe.CSV?v.maxRecordCount:ot,targetSR:f})));const x=yield m(g,{body:e.data,method:"post"});return e.data.delete("publishParameters"),(null===(s=null==x?void 0:x.data)||void 0===s?void 0:s.featureCollection)&&(null===(u=null===(c=null===(d=null==x?void 0:x.data)||void 0===d?void 0:d.featureCollection)||void 0===c?void 0:c.layers)||void 0===u||u.forEach(t=>{var a,o,r,l;null===(o=null===(a=t.featureSet)||void 0===a?void 0:a.features)||void 0===o||o.forEach(e=>{var a,o;null===(o=null===(a=t.layerDefinition)||void 0===a?void 0:a.fields)||void 0===o||o.forEach(t=>{var a;const o=null===(a=e.attributes)||void 0===a?void 0:a[t.name];if("esriFieldTypeSmallInteger"===t.type){if("boolean"==typeof o)return void(e.attributes[t.name]=o?1:0);"number"!=typeof o&&(e.attributes[t.name]=null)}})}),(null===(l=null===(r=t.layerDefinition)||void 0===r?void 0:r.name)||void 0===l?void 0:l.includes(e.name))||(t.layerDefinition.name=`${e.name} - ${t.layerDefinition.name}`)})),null===(p=null==x?void 0:x.data)||void 0===p?void 0:p.featureCollection})}(e,c),r=(null==o?void 0:o.featureCollection)||o,l=e.type===Xe.KML?(null==r?void 0:r.layers)||[]:null===(a=null==r?void 0:r.layers)||void 0===a?void 0:a.filter(e=>{var t,a;return(null===(a=null===(t=null==e?void 0:e.featureSet)||void 0===t?void 0:t.features)||void 0===a?void 0:a.length)>0});if(!(null==l?void 0:l.length))throw new Error(tt.NoValidData);if(e.type===Xe.KML){const a=o,r=F(u,d),i=(null==a?void 0:a.folders)||[],n=new Map;i.forEach(e=>n.set(e.id,e));const s=e=>e.replace("esriGeometry","").toLowerCase(),c=new Map;l.forEach((e,t)=>{var a,o,r;null==(null===(a=null==e?void 0:e.layerDefinition)||void 0===a?void 0:a.id)&&(e.layerDefinition.id=t);const l=(null===(o=e.layerDefinition)||void 0===o?void 0:o.geometryType)||(null===(r=e.featureSet)||void 0===r?void 0:r.geometryType);l&&!c.has(l)&&c.set(l,e)});const p=new Map;l.forEach(e=>{var t,a,o,r;const l=(null===(t=e.layerDefinition)||void 0===t?void 0:t.geometryType)||(null===(a=e.featureSet)||void 0===a?void 0:a.geometryType);if(!l)return;const i=new Map;null===(r=null===(o=e.featureSet)||void 0===o?void 0:o.features)||void 0===r||r.forEach(e=>{var t;const a=null===(t=null==e?void 0:e.attributes)||void 0===t?void 0:t.id;"number"==typeof a&&i.set(a,e)}),p.set(l,i)});const m=(e,a,o,r,l,i)=>{const n=c.get(a);if(!n)return null;const s=Object.assign({},n.layerDefinition),d=function(e,a){var o;const r={};return null===(o=null==e?void 0:e.fields)||void 0===o||o.forEach(e=>{const a=t.dataSourceUtils.convertFieldToJimuField(e,null,null);a&&(r[a.jimuName]=a)}),{label:null==e?void 0:e.name,childId:a,jimuChildId:a,idField:null==e?void 0:e.objectIdField,fields:r}}(s,i),u=t.dataSourceUtils.getChildDataSourceId(e,i),m=p.get(a)||new Map,v=o.map(e=>m.get(e)).filter(Boolean);return{jimuChildId:i,childJson:{id:u,type:t.DataSourceTypes.FeatureLayer,sourceLabel:r,label:r,layerId:i,geometryType:null==s?void 0:s.geometryType,isDataInDataSourceInstance:!0,schema:d,data:[{layerDefinition:s,featureSet:Object.assign(Object.assign({},n.featureSet),{features:v})}]}}},v=(e,a,o)=>{const r={};a.forEach(a=>{const o=n.get(a);if(!o)return;const l=`g${o.id}`,i=t.dataSourceUtils.getChildDataSourceId(e,l),s=[],d=new Set,c=o.subFolderIds||[];for(let e=0;e<c.length;e++){const t=c[e];d.has(t)||(d.add(t),s.push(t))}const u=o.featureInfos||[];for(let e=0;e<u.length;e++){const t=u[e];if("Folder"!==(null==t?void 0:t.type))continue;const a=t.id;d.has(a)||(d.add(a),s.push(a))}const p=v(i,s,(o.featureInfos||[]).filter(e=>"Folder"!==e.type));r[l]={id:i,type:t.DataSourceTypes.GroupLayer,sourceLabel:o.name,label:o.name,childDataSourceJsons:p}});const l=new Map;return(o||[]).forEach(e=>{if("Folder"===(null==e?void 0:e.type))return;const t=l.get(e.type)||[];t.push(e.id),l.set(e.type,t)}),Array.from(l.entries()).forEach(([t,a],o)=>{const l=s(t),i=l.charAt(0).toUpperCase()+l.slice(1),n=e.split("-").pop()||"root",d=m(e,t,a,i,o,`l${n}-${l}`);d&&(r[d.jimuChildId]=d.childJson)}),r},f=i.filter(e=>null==e.parentFolderId||-1===e.parentFolderId).map(e=>e.id),y=((null==a?void 0:a.featureInfos)||[]).filter(e=>"Folder"!==e.type),h=i.length>0?v(r,f,y):l.reduce((e,t,a)=>{var o,l,i;const n=(null===(o=t.layerDefinition)||void 0===o?void 0:o.geometryType)||(null===(l=t.featureSet)||void 0===l?void 0:l.geometryType),d=((null===(i=t.featureSet)||void 0===i?void 0:i.features)||[]).map(e=>{var t;return null===(t=null==e?void 0:e.attributes)||void 0===t?void 0:t.id}).filter(e=>"number"==typeof e),c=s(n),u=c.charAt(0).toUpperCase()+c.slice(1),p=m(r,n,d,u,a,`lroot-${c}`);return p&&(e[p.jimuChildId]=p.childJson),e},{});return[{dataSourceJson:{id:r,type:t.DataSourceTypes.GroupLayer,sourceLabel:e.name,label:e.name,childDataSourceJsons:h},order:d}]}return l.map((a,o)=>{var r;return{dataSourceJson:{id:F(u,d+o),type:t.DataSourceTypes.FeatureLayer,sourceLabel:(null===(r=a.layerDefinition)||void 0===r?void 0:r.name)||(0===o?e.name:`${e.name} ${o}`)},order:d+o,restLayer:Object.assign(Object.assign({},a),{layerDefinition:Object.assign(Object.assign({},a.layerDefinition),{capabilities:"Query, Editing, Create, Delete, Update, Extract"})})}})}),[j,I]=rt(null),[N,M]=rt([]),[O,D]=rt(!1),T=e=>{if(!e.target.files)return;I(null);const a=new Map,o=Array.from(e.target.files);if(o.length>30)a.set(tt.ExceedMaxFileNumber,[]),E(a);else{const e=o.map(e=>function(e){const a=function(e){if(ct(e))return null;return Object.values(Xe).find(t=>null==e?void 0:e.endsWith(ut(t)))||null}(e.name),o=a?e.name.replace(`.${a}`,""):e.name.replace(/\.zip$/i,""),r=new FormData;r.set("file",e),a&&r.set("filetype",a);return r.set("f","json"),{id:(0,t.uuidv1)(),type:a,isZip:ct(e.name),name:o,data:r,size:e.size}}(e));x.current=e;e.filter(e=>e.isZip).length>0?(M(e),D(!0)):z(e)}},L=N.filter(e=>e.isZip).every(e=>!!e.type),z=e=>Ye(void 0,void 0,void 0,function*(){g(!0);let t=[];const a=new Map;yield Promise.allSettled(e.map(e=>w(e))).then(o=>{o.forEach((o,r)=>{var l;const i=e[r];if(b.current.some(e=>e.id===i.id))b.current=b.current.filter(e=>e.id!==i.id);else if("fulfilled"===o.status)(null===(l=o.value)||void 0===l?void 0:l.length)&&(t=t.concat(o.value));else{const e=(e=>{var t,a,o,r;return e.message===tt.NotSupportedType?tt.NotSupportedType:e.message===tt.ExceedMaxSize||(null===(o=null===(a=null===(t=e.details)||void 0===t?void 0:t.messages)||void 0===a?void 0:a[0])||void 0===o?void 0:o.includes("max size"))?tt.ExceedMaxSize:e.message===tt.ExceedMaxRecords||(null===(r=e.message)||void 0===r?void 0:r.includes("maximum number"))?tt.ExceedMaxRecords:e.message===tt.NoValidData?tt.NoValidData:e.message===tt.CorruptedShapefile?tt.CorruptedShapefile:tt.FailedToUpload})(o.reason);a.set(e,a.has(e)?a.get(e).concat(i.name):[i.name])}})}),(null==t?void 0:t.length)>0&&l(p.concat(t)),g(!1),E(a)}),E=e=>{if(e.size>0){const t=Array.from(e.keys()).map(t=>{const a=e.get(t);return a.length?1===a.length&&1===e.size?{errStr:v(t,{fileName:a[0]})}:{errStr:v(at.get(t),{number:a.length}),details:a}:{errStr:v(t)}});1!==t.length||t[0].details?I(t.map(e=>Object.assign(Object.assign({},e),{open:!0}))):i(t[0].errStr)}x.current=null,S.current.value=null},A=nt(null);(0,a.useTrapFocusLoop)(A,!0,!0,!0,O);t.hooks.useUpdateEffect(()=>{!h&&S.current&&(0,t.focusElementInKeyboardMode)(S.current)},[h]);const[J,k]=rt(!1),P=(0,Ke.useTheme)(),U=nt(null);lt(()=>{if(null==j?void 0:j.length){const e=setTimeout(()=>{U.current===e&&(I(null),U.current=null)},5e3);U.current=e}},[j]);const B=(t=!1)=>{var a,o,r;const l=null===(a=x.current)||void 0===a?void 0:a.length,i=l>1,n=i?"filesAreUploading":"fileIsUploading",s=i?"number":"fileName",d=i?l:null===(r=null===(o=x.current)||void 0===o?void 0:o[0])||void 0===r?void 0:r.name;return v(n,{[s]:!i&&t?(0,e.jsx)("div",{className:"w-100 multiple-lines-truncate font-16",children:d}):d})},G=`add-data-${u}-supported-types-desc`,V=`add-data-${u}-upload-area-desc`,W=`add-data-${u}-uploading-text-container`;return(0,e.jsxs)("div",{className:`data-file-upload w-100 h-100 pb-4 pt-6 px-4 d-flex ${r}`,css:pt(m),children:[(0,e.jsxs)("div",{className:"supported-type-icons d-flex justify-content-around align-items-center px-6 mb-4",children:[(0,e.jsx)(a.Icon,{width:13,height:16,icon:s(26569)}),(0,e.jsx)(a.Icon,{width:24,height:24,icon:s(21066)}),(0,e.jsx)(a.Icon,{width:32,height:32,icon:s(47065)}),(0,e.jsx)(a.Icon,{width:24,height:24,icon:s(65320)}),(0,e.jsx)(a.Icon,{width:13,height:16,icon:s(26569)})]}),(0,e.jsx)("div",{className:"supported-types",id:G,children:v("supportedTypesHint")}),(0,e.jsxs)("div",{className:"mt-4 drag-area-container",children:[(0,e.jsxs)(a.Label,{for:f,className:"drag-area text-center d-flex",children:[(0,e.jsx)("div",{className:"font-14",id:V,children:v("dropOrBrowseToUpload")}),(0,e.jsxs)("div",{className:"upload-btn-container mt-4",title:v("upload"),"aria-live":"assertive",children:[(0,e.jsxs)(a.Label,{for:y,className:"upload-btn text-center mb-0 text-truncate",css:J?t.css`outline: ${t.polished.rem(2)} solid ${P.sys.color.primary.dark}`:"",children:[(0,e.jsx)(R,{size:15,className:"mr-2"}),(0,e.jsx)("span",{children:v("upload")})]}),(0,e.jsx)("input",{id:y,title:"",className:"upload-btn-file-input",type:"file",accept:st,onChange:T,tabIndex:h?-1:0,ref:S,multiple:!0,onFocus:()=>{k(!0)},onBlur:()=>{k(!1)},"aria-describedby":`${V} ${G}`})]})]}),(0,e.jsx)(a.Input,{id:f,onClick:C,title:"",className:"drag-area-file-input",type:"file",accept:st,onChange:T,tabIndex:-1})]}),h&&(0,e.jsx)("div",{className:"upload-loading-container",title:B(),"aria-live":"assertive",children:(0,e.jsxs)("div",{className:"upload-loading-content d-flex flex-column",children:[(0,e.jsx)("div",{className:"w-100 px-4 upload-loading-file-name d-flex justify-content-center align-items-center",children:(0,e.jsx)("div",{className:"w-100 font-14 text-center",id:W,children:B(!0)})}),(0,e.jsx)(a.Loading,{className:"upload-loading",type:a.LoadingType.Secondary,width:30,height:28}),(0,e.jsx)("div",{className:"upload-loading-btn",children:(0,e.jsx)(a.Button,{type:"danger",onClick:()=>{b.current=b.current.concat(x.current),x.current=null,g(!1)},ref:e=>{(0,t.focusElementInKeyboardMode)(e)},"aria-describedby":W,children:v("cancel")})})]})}),O&&(0,e.jsx)("div",{className:"confirm-zip-container p-3",ref:A,role:"dialog","aria-label":v("confirmZipType"),"aria-modal":"true",children:(0,e.jsxs)("div",{className:"confirm-zip-content h-100 d-flex flex-column pt-3 pb-4 px-4",role:"",children:[(0,e.jsx)("div",{className:"title mb-4",children:v("confirmZipType")}),(0,e.jsx)("div",{className:"zip-files-content",children:N.map((t,o)=>{var r;return t.isZip&&(0,e.jsxs)("div",{children:[(0,e.jsx)("div",{className:"file-name text-truncate",title:t.name,children:t.name}),(0,e.jsx)(a.Select,{className:"mb-3",size:"sm",value:null!==(r=t.type)&&void 0!==r?r:"",placeholder:v("selectType"),onChange:(e,t)=>{((e,t)=>{const a=[...N];a[e].type=t,a[e].data.set("filetype",t),M(a)})(o,t)},"aria-label":t.name,children:Qe.map(t=>(0,e.jsx)("option",{value:t,children:t===Xe.Shapefile?"Shapefile":v(t)},t))})]},t.id)})}),(0,e.jsxs)("div",{className:"footer pt-4",children:[(0,e.jsx)(a.Button,{className:"w-100",type:"primary",size:"sm",onClick:()=>{L&&(z(N),D(!1),x.current=N)},disabled:!L,children:v("ok")}),(0,e.jsx)(a.Button,{className:"w-100",type:"default",size:"sm",onClick:()=>{const e=N.filter(e=>!e.isZip);z(e),D(!1),x.current=e},children:v("cancel")})]})]})}),(null==j?void 0:j.length)&&(0,e.jsx)("div",{className:"errors-container",children:j.map((t,o)=>{var r;return(0,e.jsx)(a.Alert,{className:"w-100 mb-2",closable:!0,withIcon:!0,form:"basic",type:"warning",title:t.errStr,open:t.open,onClose:()=>{(e=>{const t=[...j];t[e].open=!1,t.every(e=>!e.open)?I(null):I(t)})(o)},children:(null===(r=t.details)||void 0===r?void 0:r.length)&&(0,e.jsx)("div",{className:"collapse-panel-container mt-2",children:(0,e.jsx)(a.CollapsablePanel,{label:v("details"),children:t.details.map((t,a)=>(0,e.jsx)("p",{className:"mb-1",children:t},a))})})},t.errStr)})})]})};function ct(e){return null==e?void 0:e.toLowerCase().endsWith(".zip")}function ut(e){return e===Xe.Shapefile||e===Xe.FileGeoDatabase?".zip":`.${e}`}const pt=e=>t.css`
  flex-direction: column;
  color: var(--sys-color-surface-overlay-hint);

  .font-14 {
    font-size: 14px;
  }

  .font-16 {
    font-size: 16px;
    font-weight: 500;
  }
  .confirm-zip-container {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    color: var(--sys-color-surface-overlay-text);
    z-index: 20;
    .confirm-zip-content {
      background-color: var(--sys-color-surface-overlay);
      .title {
        font-family: var(--sys-typography-title2-font-family);
        font-weight: var(--sys-typography-title2-font-weight);
        font-size: var(--sys-typography-title2-font-size);
        line-height: var(--sys-typography-title2-line-height);
      }
      .zip-files-content {
        flex: 1;
        overflow-y: auto;
        .file-name {
          margin-bottom: var(--sys-spacing-1);
          font-family: var(--sys-typography-title3-font-family);
          font-weight: var(--sys-typography-title3-font-weight);
          font-size: var(--sys-typography-title3-font-size);
          line-height: var(--sys-typography-title3-line-height);
        }

      }
      .footer {
        .jimu-btn:first-of-type {
          margin-bottom: 6px;
        }
      }
    }
  }

  .upload-loading-container {
    position: absolute;
    top: ${e?"56px":"89px"};
    bottom: 0;
    right: 0;
    left: 0;
    background-color: var(--sys-color-surface-overlay);
    z-index: 2;
    .upload-loading-content {
      height: calc(100% - 60px);
      padding-top: 80px;
      color: var(--sys-color-surface-overlay-text);
      .upload-loading-file-name {
        height: 100px;
        word-break: break-word;
        overflow: hidden;
      }
      .upload-loading {
        position: relative;
        height: 146px;
      }
      .upload-loading-btn {
        height: 32px;
        margin-top: 10px;
        text-align: center;
        button.btn-danger {
          background-color: var(--sys-color-error-main);
          border: 0;
        }
      }
    }
  }

  .supported-type-icons svg {
    color: var(--sys-color-primary-main);
  }

  .supported-types {
    font-size: 13px;
  }

  .drag-area-container {
    width: 100%;
    flex: 1
  }
  .drag-area {
    border: 1px dashed var(--sys-color-divider-secondary);
    width: 100%;
    height: 100%;
    user-select: none;
    flex-direction: column;
    justify-content: center;
  }
  .upload-btn {
    border: 1px solid var(--sys-color-divider-secondary);
    color: var(--sys-color-surface-overlay-text);
    background-color: var(--sys-color-primary-text);
    border-radius: 2px;
    line-height: 28px;
    padding-left: 16px;
    padding-right: 16px;
    height: 30px;
    user-select: none;
    max-width: 100%;
  }
  .upload-btn-container {
    line-height: 0;
    width: max-content;
    margin: 0 auto;
  }
  .upload-btn-container:hover {
    .upload-btn {
      background-color: var(--sys-color-action-hover) !important;
    }
  }
  .drag-area-container, .upload-btn-container {
    position: relative;
    display: inline-block;
    z-index: 1;
  }
  .upload-btn-file-input, .drag-area-file-input {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    opacity: 0;
  }
  .upload-btn-file-input {
    cursor: pointer;
  }

  .errors-container {
    position: absolute;
    top: ${e?"56px":"89px"};
    left: 0;
    right: 0;
    z-index: 2;
    max-height: 100%;
    overflow-y: auto;
    .jimu-alert-panel-title {
      font-size: 13px;
      font-weight: 400;
    }
    .jimu-alert-panel-left-part {
      flex: 1;
    }
    .jimu-alert-message {
      flex: 1;
      color: var(--sys-color-surface-overlay-text);
    }
    .jimu-alert-action {
      color: var(--sys-color-action-text);
    }
    .collapse-label {
      font-size: 13px;
      .title {
        color: var(--sys-color-surface-overlay-text) !important;
      }
    }
    .collapse-panel-container {
      margin: 0 -30px 0 -28px;
      border-top: 1px solid var(--sys-color-divider-tertiary);
      .jimu-collapsable-action .jimu-btn {
        color: var(--sys-color-action-text);
      }
    }
  }

`;var mt=s(67390),vt=s.n(mt),ft=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const yt=a=>{const o=window.SVG,{className:r}=a,l=ft(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:vt()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))};var ht=s(37653),gt=s.n(ht),xt=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const bt=a=>{const o=window.SVG,{className:r}=a,l=xt(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:gt()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))};var St=s(11595),wt=s.n(St),jt=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const It=a=>{const o=window.SVG,{className:r}=a,l=jt(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:wt()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))},{useState:Nt,useEffect:Mt}=t.React,{useSelector:Ot}=t.ReactRedux,Dt=o=>{const{multiDataOptions:r,widgetId:l,doneButtonRef:i,config:n,onFinish:s,onRemove:d,setErrorMsg:c}=o,u=t.hooks.useTranslation(a.defaultMessages),[p,m]=Nt(!1),[v,f]=Nt(!1),y=T(r);Mt(()=>{D(((null==y?void 0:y.filter(e=>!r.some(t=>t.dataSourceJson.id===e.dataSourceJson.id)))||[]).map(e=>e.dataSourceJson.id),l,!1),f(!0);M(r.filter(e=>!(null==y?void 0:y.some(t=>e.dataSourceJson.id===t.dataSourceJson.id))),l,n,!1).catch(e=>{c(u("dataSourceCreateError"))}).finally(()=>{f(!1)})},[l,r,y,c,u,n]);const h=()=>{s(r)},g=u("numSelected",{number:r.length}),x=u(p?"collapse":"expand");return(0,e.jsx)("div",{className:"data-collapse",css:Tt,children:r.length>0&&(0,e.jsxs)("div",{className:"data-container p-4",children:[(0,e.jsxs)("div",{className:"d-flex justify-content-between align-items-center",children:[(0,e.jsxs)("div",{className:"d-flex align-items-center n-selected",role:"group","aria-label":g,children:[(0,e.jsx)("span",{className:"text-truncate",title:g,children:g}),(0,e.jsx)(a.Button,{className:"jimu-outline-inside",type:"tertiary",size:"sm",icon:!0,onClick:()=>{m(!p)},title:x,"aria-label":x,"aria-expanded":p,children:p?(0,e.jsx)(yt,{size:"s",color:"var(--sys-color-surface-overlay-text)"}):(0,e.jsx)(bt,{size:"s",color:"var(--sys-color-surface-overlay-text)"})})]}),(0,e.jsx)("div",{className:"small-done-btn",children:!p&&(0,e.jsx)(a.Button,{onClick:h,disabled:v,type:"primary",className:"text-truncate w-100 px-2",title:u("done"),ref:i,children:u("done")})})]}),p&&(0,e.jsx)("div",{className:"data-items mt-4",role:"list",children:r.map((a,o)=>(0,e.jsx)(Ct,{widgetId:l,isLoading:v,onRemove:d,dsJson:(0,t.Immutable)(a.dataSourceJson)},o))}),p&&(0,e.jsx)("div",{className:"big-done-btn w-100",children:(0,e.jsx)(a.Button,{onClick:h,disabled:v,type:"primary",className:"text-truncate w-100",title:u("done"),"aria-label":u("done"),ref:i,children:u("done")})})]})})};function Ct({widgetId:o,dsJson:r,isLoading:l,onRemove:i}){const n=t.hooks.useTranslation(a.defaultMessages),s=t.i18n.getIntl(),d=w(r.id),c=Ot(e=>{var t;return null===(t=e.dataSourcesInfo)||void 0===t?void 0:t[r.id]}),u=c?c.instanceStatus===t.DataSourceStatus.CreateError:!d&&!l,p=c?c.instanceStatus===t.DataSourceStatus.NotCreated:!d&&l,m=`add-data-${o}-collapse-panel-list-item-${r.id}`;return(0,e.jsxs)("div",{className:"d-flex align-items-center justify-content-between w-100 data-item",role:"listitem",children:[(0,e.jsxs)("div",{className:"d-flex align-items-center flex-grow-1 text-truncate",title:t.dataSourceUtils.getDsTypeString(null==r?void 0:r.type,s),children:[u&&(0,e.jsx)("div",{className:"d-flex justify-content-center align-items-center flex-shrink-0 data-error",children:(0,e.jsx)(a.Alert,{className:"flex-shrink-0",css:t.css`padding-left: 0 !important; padding-right: 0 !important;`,buttonType:"tertiary",form:"tooltip",size:"small",type:"error",text:n("dataSourceCreateError")})}),p&&(0,e.jsx)("div",{className:"d-flex justify-content-center align-items-center flex-shrink-0 data-loading",children:(0,e.jsx)(a.Loading,{type:a.LoadingType.Donut,width:16,height:16})}),!u&&!p&&(0,e.jsx)("div",{className:"d-flex justify-content-center align-items-center flex-shrink-0 data-thumbnail",children:(0,e.jsx)(a.Icon,{icon:t.dataSourceUtils.getDsIcon(r),color:"var(--sys-color-primary-text)",size:"12"})}),(0,e.jsx)("div",{className:"flex-grow-1 text-truncate pl-2 data-label",title:r.label||r.sourceLabel,id:m,children:r.label||r.sourceLabel})]}),(0,e.jsx)("div",{className:"d-flex align-items-center flex-shrink-0",children:(0,e.jsx)(a.Button,{className:"jimu-outline-inside",type:"tertiary",size:"sm",icon:!0,onClick:()=>{i(r.id)},title:n("remove"),"aria-label":n("remove"),"aria-describedby":m,children:(0,e.jsx)(It,{size:14,color:"var(--sys-color-surface-overlay-text)"})})})]})}const Tt=t.css`
  .data-container {
    position: absolute;
    right: 0;
    left: 0;
    bottom: 0;
    box-shadow: 0px -1px 4px rgba(0, 0, 0, 0.16) !important;
    border: 0 !important;
    background: var(--sys-color-surface-overlay);
    color: var(--sys-color-surface-overlay-text);
    z-index: 10;
    .n-selected {
      font-size: 14px;
      max-width: 130px;
    }
    .data-items {
      max-height: 500px;
      overflow-y: auto;
      overflow-x: hidden;
      .data-thumbnail {
        width:  26px;
        height:  26px;
        background-color: var(--sys-color-info-main);
      }
      .data-loading, .data-error {
        position: relative;
        width: 24px;
        height: 24px;
        border: 1px solid var(--sys-color-info-main);
      }
      .data-label {
        font-size: 13px;
      }
      .data-item {
        height: 26px;
        margin-bottom: 12px;
      }
    }
    .small-done-btn {
      max-width: 90px;
    }
  }
`,Ft=t.React.memo(o=>{const{isRuntime:r}=o,l=s(r?57176:51137);return(0,e.jsx)("div",{className:(0,t.classNames)("resize-handle d-flex",{"p-1":r}),children:(0,e.jsx)(a.Icon,{icon:l,size:r?10:16,currentColor:!1})})}),{useState:Lt,useMemo:zt,useRef:Et,useCallback:At,useEffect:Rt}=t.React,Jt=["search","url","file"],kt={width:240,height:600},Pt=o=>{const{portalUrl:r,widgetId:l,buttonSize:i,hiddenTabs:s,popperReference:d,nextOrder:c,config:u,onFinish:p,itemCategoriesInfo:m,hidePopper:v,buttonDescribedby:f,displayedItemTypeCategories:y,panelSize:h,onResizeStop:g}=o,[x,b]=Lt(!1),[S,w]=Lt(null),[j,I]=Lt([]),[N,M]=Lt([]),[O,D]=Lt([]),C=zt(()=>j.concat(N).concat(O).sort((e,t)=>e.order-t.order),[j,N,O]),T=zt(()=>C.length>0?Math.max(...C.map(e=>e.order))+1:c,[C,c]),F=zt(()=>Jt.filter(e=>!(null==s?void 0:s.some(t=>e===t))),[s]),L=t.hooks.useTranslation(a.defaultMessages,t.defaultMessages,n),z=Et(null),E=t.hooks.useCheckSmallBrowserSizeMode(),[A,J]=Lt(!1),k=t.ReactRedux.useSelector(e=>e.appRuntimeInfo.appMode===t.AppMode.Run),P=(0,e.jsx)(Ft,{isRuntime:k,isResizing:A}),U=k?["bottom-left","bottom-right"]:["top-left","top-right","bottom-left","bottom-right"],B=k?["bottom-left"]:[],G=Et(null);Rt(()=>{"sm"===i&&(0,t.focusElementInKeyboardMode)(G.current)},[]),Rt(()=>{S&&!z.current&&(z.current=setTimeout(()=>{w(null),z.current=null},5e3))},[S]);const V=e=>{j.some(t=>t.dataSourceJson.id===e)&&I(j.filter(t=>t.dataSourceJson.id!==e)),N.some(t=>t.dataSourceJson.id===e)&&M(N.filter(t=>t.dataSourceJson.id!==e)),O.some(t=>t.dataSourceJson.id===e)&&D(O.filter(t=>t.dataSourceJson.id!==e))},W=e=>{p(e),$()},H=Et(null),$=At(()=>{const e=!x;b(e),e||(I([]),M([]),D([]),G.current&&(0,t.focusElementInKeyboardMode)(G.current))},[x]);Rt(()=>{!E&&v&&x&&$()},[v]);const _=t.ReactRedux.useSelector(e=>e.appRuntimeInfo.currentPageId);t.hooks.useUpdateEffect(()=>{x&&$()},[_]);const K=Et(null),q=Et(null),Z=Et(null),X=null!=h?h:kt;Rt(()=>{var e,t;q.current=x&&null!==(t=null===(e=H.current)||void 0===e?void 0:e.querySelector(".action-close"))&&void 0!==t?t:null},[x]);const Y=()=>(0,e.jsx)(Bt,{errorMsg:S,translate:L,tabs:F,onFinish:W,onRemove:V,portalUrl:r,widgetId:l,nextOrder:T,multiDataOptions:C,multiDataOptionsFromSearch:j,multiDataOptionsFromUrl:N,multiDataOptionsFromFile:O,setErrorMsg:w,setMultiDataOptionsFromSearch:I,setMultiDataOptionsFromUrl:M,setMultiDataOptionsFromFile:D,itemCategoriesInfo:m,containerRef:K,panelRef:H,doneButtonInCollapseRef:Z,displayedItemTypeCategories:y,config:u});return(0,e.jsxs)("div",{className:"add-data-popper",css:Gt,children:["lg"===i&&(0,e.jsx)(a.Button,{type:"primary",className:"flex-grow-1 text-center",onClick:$,"aria-label":L("clickToAddData"),ref:G,title:L("clickToAddData"),"aria-haspopup":"dialog","aria-describedby":f,children:(0,e.jsxs)("div",{className:"w-100 px-2 d-flex align-items-center justify-content-center",children:[(0,e.jsx)(R,{size:"m",className:"mr-2"}),(0,e.jsx)("div",{className:"text-truncate",children:L("clickToAddData")})]})}),"sm"===i&&(0,e.jsx)(a.Button,{type:"primary",className:"d-flex justify-content-center align-items-center small-add-btn",onClick:$,"aria-label":L("clickToAddData"),ref:G,title:L("clickToAddData"),"aria-haspopup":"dialog",children:(0,e.jsx)(R,{size:"m",className:"m-0"})}),E?(0,e.jsx)(a.MobilePanel,{open:x,onClose:$,title:L("addData"),children:Y()}):(0,e.jsx)(a.FloatingPanel,{open:x,reference:d,placement:"right-start",ref:H,css:Vt,className:a.FOCUSABLE_CONTAINER_CLASS,"aria-label":L("addData"),headerTitle:L("addData"),headerClassName:"add-data-panel-header",onHeaderClose:$,dragBounds:"body",defaultSize:X,minSize:kt,resizeHandle:P,resizeHandles:U,transparentResizeHandles:B,onResize:()=>{J(!0)},onResizeStop:e=>{null==g||g(e),J(!1)},onKeyDown:e=>{var a,o;if("Escape"===e.key){if(!(null===(a=H.current)||void 0===a?void 0:a.contains(e.target)))return;if(e.target!==q.current){const a=!!(null===(o=e.target)||void 0===o?void 0:o.closest(".data-item-search")),r=C.length>0,l=a&&r&&Z.current&&!Z.current.disabled?Z.current:q.current;l&&(0,t.focusElementInKeyboardMode)(l)}}},children:Y()})]})},Ut=({tab:t,portalUrl:a,widgetId:o,nextOrder:r,multiDataOptionsFromSearch:l,multiDataOptionsFromUrl:i,multiDataOptionsFromFile:n,setMultiDataOptionsFromSearch:s,setMultiDataOptionsFromUrl:d,setMultiDataOptionsFromFile:c,setErrorMsg:u,itemCategoriesInfo:p,className:m,displayedItemTypeCategories:v,onlyOneTab:f,popperReference:y})=>"search"===t?(0,e.jsx)($,{className:m,portalUrl:a,widgetId:o,onChange:s,nextOrder:r,multiDataOptions:l,itemCategoriesInfo:p,displayedItemTypeCategories:v}):"url"===t?(0,e.jsx)(Ge,{className:m,widgetId:o,onChange:d,nextOrder:r,multiDataOptions:i,setErrorMsg:u,popperReference:y}):"file"===t?(0,e.jsx)(dt,{className:m,portalUrl:a,widgetId:o,nextOrder:r,onChange:c,multiDataOptions:n,setErrorMsg:u,onlyOneTab:f}):void 0,Bt=({errorMsg:o,translate:r,tabs:l,onFinish:i,onRemove:n,portalUrl:s,widgetId:d,nextOrder:c,multiDataOptions:u,multiDataOptionsFromSearch:p,multiDataOptionsFromUrl:m,multiDataOptionsFromFile:v,setMultiDataOptionsFromSearch:f,setMultiDataOptionsFromUrl:y,setMultiDataOptionsFromFile:h,setErrorMsg:g,itemCategoriesInfo:x,containerRef:b,panelRef:S,doneButtonInCollapseRef:w,displayedItemTypeCategories:j,config:I})=>(0,e.jsxs)("div",{ref:b,css:t.css`
    width: 100%;
    height: 100%;
    .add-data-popper-content {
      height: ${u.length?"calc(100% - 64px)":"100%"};
    }
    .tab-content {
      overflow: hidden;
    }
    .jimu-nav {
      border-bottom: 1px solid var(--sys-color-divider-secondary);
      .jimu-nav-link {
        &.active, &:hover:not(.active) {
          color: var(--sys-color-primary-main);
        }
        &.active {
          border-color: var(--sys-color-primary-main);
        }
      }
    }
    .multiple-lines-truncate {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-word;
      word-wrap: break-word;
    }
    .item-selector-search {
      .text-input-prefix {
        svg {
          margin-left: 0 !important;
          color: var(--sys-color-action-input-field-placeholder) !important;
        }
      }
    }
  `,children:[(0,e.jsxs)("div",{className:"add-data-popper-content",children:[l.length>1&&(0,e.jsx)(a.Tabs,{type:"underline",className:"w-100 h-100",fill:!0,defaultValue:l[0],children:l.map((t,o)=>(0,e.jsx)(a.Tab,{id:t,title:r(t),children:(0,e.jsx)(Ut,{tab:t,portalUrl:s,widgetId:d,nextOrder:c,setErrorMsg:g,multiDataOptionsFromSearch:p,multiDataOptionsFromUrl:m,multiDataOptionsFromFile:v,setMultiDataOptionsFromSearch:f,setMultiDataOptionsFromUrl:y,setMultiDataOptionsFromFile:h,itemCategoriesInfo:x,displayedItemTypeCategories:j,onlyOneTab:!1,popperReference:S})},o))}),1===l.length&&(0,e.jsx)("div",{className:"w-100 h-100",children:(0,e.jsx)(Ut,{tab:l[0],portalUrl:s,widgetId:d,nextOrder:c,setErrorMsg:g,multiDataOptionsFromSearch:p,multiDataOptionsFromUrl:m,multiDataOptionsFromFile:v,setMultiDataOptionsFromSearch:f,setMultiDataOptionsFromUrl:y,setMultiDataOptionsFromFile:h,itemCategoriesInfo:x,displayedItemTypeCategories:j,onlyOneTab:!0,popperReference:S})}),o&&(0,e.jsx)(a.Alert,{className:"w-100",css:t.css`position: absolute; top: ${1===l.length?"56px":"89px"}; left: 0; right: 0; z-index: 1;`,closable:!0,form:"basic",onClose:()=>{g(null)},open:!0,text:o,type:"warning",withIcon:!0})]}),(0,e.jsx)(Dt,{multiDataOptions:u,widgetId:d,doneButtonRef:w,config:I,onFinish:i,onRemove:n,setErrorMsg:g})]}),Gt=t.css`
  .small-add-btn {
    border-radius: 16px;
    width: 32px;
    height: 32px;
    padding: 0;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  }
`,Vt=t.css`
  background: var(--sys-color-surface-overlay);
  .add-data-panel-header {
    background: var(--sys-color-surface-overlay);
    color: var(--sys-color-surface-overlay-text);
    .title {
      font-family: var(--sys-typography-title1-font-family);
      font-size: var(--sys-typography-title1-font-size);
    }
    .jimu-btn {
      color: var(--sys-color-action-text);
    }
  }
`;var Wt=s(2101),Ht=s.n(Wt),$t=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const _t=a=>{const o=window.SVG,{className:r}=a,l=$t(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:Ht()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))};var Kt=s(93573),qt=s.n(Kt),Zt=function(e,t){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(a[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(o=Object.getOwnPropertySymbols(e);r<o.length;r++)t.indexOf(o[r])<0&&Object.prototype.propertyIsEnumerable.call(e,o[r])&&(a[o[r]]=e[o[r]])}return a};const Xt=a=>{const o=window.SVG,{className:r}=a,l=Zt(a,["className"]),i=(0,t.classNames)("jimu-icon jimu-icon-component",r);return o?(0,e.jsx)(o,Object.assign({className:i,src:qt()},l)):(0,e.jsx)("svg",Object.assign({className:i},l))},{useLayoutEffect:Yt,useState:Qt,useRef:ea,useMemo:ta}=t.React,{useSelector:aa}=t.ReactRedux,oa=o=>{const{multiDataOptions:r,enableDataAction:l,isLoading:i,onRemoveData:n,onChangeData:s,widgetId:d,disableRenaming:c}=o,u=t.hooks.useTranslation(a.defaultMessages,t.defaultMessages),[p,m]=Qt(null),v=ea(null),f=aa(e=>e.dataSourcesInfo),y=T(v),h=t.i18n.getIntl(),g=(0,Ke.useTheme)(),x=la(g);Yt(()=>{p&&v.current&&(null==y?void 0:y.current)!==v.current&&((0,t.focusElementInKeyboardMode)(v.current),v.current.select())},[v,y,p]);const b=e=>{m((null==p?void 0:p.dataSourceJson.id)===(null==e?void 0:e.dataSourceJson.id)?null:e)};return(0,e.jsx)("ul",{className:"data-list",css:x,children:r.map((o,r)=>{var m;const y=w(o.dataSourceJson.id),g=null==f?void 0:f[o.dataSourceJson.id],x=g?g.instanceStatus===t.DataSourceStatus.CreateError:!y&&!i,S=g?g.instanceStatus===t.DataSourceStatus.NotCreated:!y&&i,j=(null==p?void 0:p.dataSourceJson.id)===o.dataSourceJson.id,I=o.dataSourceJson.label||o.dataSourceJson.sourceLabel,N=t.dataSourceUtils.getDsTypeString(null===(m=o.dataSourceJson)||void 0===m?void 0:m.type,h),M=l&&y;return(0,e.jsxs)("li",{className:(0,t.classNames)("d-flex justify-content-between align-items-center data-item",{"pt-3":0!==r}),"aria-label":`${N} ${I}`,role:"group",children:[(0,e.jsxs)("div",{className:"flex-grow-1 text-truncate d-flex justify-content-start align-items-center",children:[S&&(0,e.jsx)("div",{className:"flex-shrink-0 d-flex justify-content-center align-items-center mr-1 data-item-loading",children:(0,e.jsx)(a.Loading,{type:a.LoadingType.Donut,width:16,height:16})}),(0,e.jsxs)("div",{className:"flex-grow-1 text-truncate d-flex align-items-center",title:N,children:[!S&&(0,e.jsx)("div",{className:"flex-shrink-0 d-flex justify-content-center align-items-center data-thumbnail",children:(0,e.jsx)(a.Icon,{icon:t.dataSourceUtils.getDsIcon((0,t.Immutable)(o.dataSourceJson)),color:"var(--sys-color-primary-text)",size:"12"})}),x&&(0,e.jsx)(a.Alert,{className:"flex-shrink-0 ml-2 mr-1",css:t.css`padding-left: 0 !important; padding-right: 0 !important;`,variant:"text",form:"tooltip",size:"small",type:"error",text:u("dataSourceCreateError")}),(0,e.jsx)("div",{className:(0,t.classNames)("flex-grow-1 text-truncate data-label",{"pl-2":!x}),title:p?"":I,children:j?(0,e.jsx)(a.TextInput,{className:"w-100",size:"sm",defaultValue:I,onAcceptValue:e=>{((e,t)=>{b(e),s(Object.assign(Object.assign({},e),{dataSourceJson:Object.assign(Object.assign({},e.dataSourceJson),{label:t})}))})(o,e)},ref:v}):I})]})]}),(0,e.jsxs)("div",{className:"flex-shrink-0 d-flex justify-content-end align-items-center data-item-operations",children:[!c&&!S&&!x&&(0,e.jsx)(a.Button,{className:"jimu-outline-inside",type:"tertiary",size:"sm",icon:!0,title:u("rename"),"aria-label":u("rename"),onClick:()=>{b(o)},onKeyDown:e=>{"Enter"===e.key&&e.preventDefault()},onKeyUp:e=>{var t;t=o,"Enter"===e.key&&b(t)},children:(0,e.jsx)(Xt,{size:"m"})}),M&&(0,e.jsx)(a.DataActionList,{widgetId:d,dataSets:[{dataSource:y,records:[],name:y.getDataSourceJson().label||y.getDataSourceJson().sourceLabel}],listStyle:a.DataActionListStyle.Dropdown,buttonSize:"sm",buttonType:"tertiary",hideGroupTitle:!0,buttonClassName:"jimu-outline-inside"}),(0,e.jsx)(a.Button,{className:"jimu-outline-inside",type:"tertiary",size:"sm",icon:!0,onClick:()=>{n(o.dataSourceJson.id)},title:u("remove"),"aria-label":u("remove"),children:(0,e.jsx)(_t,{size:"m"})})]})]},o.dataSourceJson.id)})})},ra=t.css`
  max-height: calc(100% - 35px);
  overflow: auto;

  margin-bottom: 38px;
  padding-left: 0;

  .data-item {
    width: 100%;
    overflow: hidden;
  }
  .data-item-loading {
    position: relative;
    width: 24px;
    height: 24px;
    border: 1px solid var(--sys-color-info-main);
  }
  .data-thumbnail {
    width:  26px;
    height:  26px;
    background-color: var(--sys-color-info-main);
  }
  .data-label {
    font-size: 13px;
    color: var(--sys-color-surface-paper-text);
  }
  .jimu-button-color-error {
    color: var(--sys-color-error-main);
  }
  .data-item-operations {
    .jimu-btn svg {
      color: var(--sys-color-surface-paper-text);
    }
  }
  .jimu-input .input-wrapper {
    color: var(--sys-color-surface-paper-text);
  }
`,la=e=>ta(()=>t.css`
    ${ra}
    .data-item-operations .data-action-dropdown .data-action-button{
      &:focus,
      &:focus-visible {
        outline-offset: -2px;
      }
      border: 0;
    }
  `,[]);class ia extends t.BaseVersionManager{constructor(){super(...arguments),this.versions=[{version:"1.12.0",description:"Allow to configure curated filter",upgrader:e=>e.disableAddBySearch||e.itemCategoriesInfo?e:e.set("itemCategoriesInfo",k())}]}}const na=new ia;var sa=function(e,t,a,o){return new(a||(a=Promise))(function(r,l){function i(e){try{s(o.next(e))}catch(e){l(e)}}function n(e){try{s(o.throw(e))}catch(e){l(e)}}function s(e){var t;e.done?r(e.value):(t=e.value,t instanceof a?t:new a(function(e){e(t)})).then(i,n)}s((o=o.apply(e,t||[])).next())})};const{useState:da,useEffect:ca,useMemo:ua,useRef:pa,useCallback:ma}=t.React,va=!window.jimuConfig.isInBuilder,fa=o=>{var r;const{portalUrl:l,id:s,enableDataAction:d=!0,config:c,mutableStateProps:u,builderSupportModules:p}=o,m=(e=>t.React.useMemo(()=>e.disableAddBySearch||e.itemCategoriesInfo?e.itemCategoriesInfo:(0,t.Immutable)(k()),[e.disableAddBySearch,e.itemCategoriesInfo]))(c),v=ua(()=>(null==u?void 0:u.multiDataOptions)||[],[null==u?void 0:u.multiDataOptions]),f=ma(e=>{t.MutableStoreManager.getInstance().updateStateValue(s,"multiDataOptions",e)},[s]),y=t.hooks.useTranslation(a.defaultMessages,n),[h,g]=da(!1),x=ua(()=>{const e=[];return c.disableAddBySearch&&e.push("search"),c.disableAddByUrl&&e.push("url"),c.disableAddByFile&&e.push("file"),e},[c.disableAddBySearch,c.disableAddByUrl,c.disableAddByFile]),b=ua(()=>v.length>0?Math.max(...v.map(e=>e.order))+1:0,[v]),S=t.React.useRef(null),N=pa(null),D=null===(r=null==p?void 0:p.jimuForBuilderLib)||void 0===r?void 0:r.getAppConfigAction;ca(()=>(N.current=new t.indexedDBUtils.IndexedDBCache(s,"add-data","added-data"),va&&N.current.init().then(()=>sa(void 0,void 0,void 0,function*(){const e=yield N.current.getAll();e.length>0&&(g(!0),M(e,s,c).catch(e=>{console.error("Failed to create data source",e)}).finally(()=>{g(!1)}),f(e.sort((e,t)=>e.order-t.order)))})).catch(e=>{console.error("Failed to read cache.",e)}),()=>{N.current.close()}),[s,f]);const C=e=>{N.current.initialized()&&N.current.putAll(e.map(e=>({key:e.dataSourceJson.id,value:e}))),g(!0),M(e,s,c).catch(e=>{console.error("Failed to create data source",e)}).finally(()=>{g(!1)}),f(v.concat(e))};t.hooks.useUpdateEffect(()=>{((e,t)=>{O(I(e,t))})(v,c)},[c.disableExport,c.notAllowedExportFormat]);const T=ma(e=>{if(!window.jimuConfig.isInBuilder||!D||!e)return;const t=null==c?void 0:c.panelSize;if((null==t?void 0:t.width)===e.width&&(null==t?void 0:t.height)===e.height)return;const a=c.set("panelSize",e);D().editWidgetConfig(s,a).exec()},[c,D,s]),F=t.ReactRedux.useSelector(e=>{var t;const a=null==e?void 0:e.widgetsRuntimeInfo;return null===(t=null==a?void 0:a[s])||void 0===t?void 0:t.state}),L=ua(()=>F===t.WidgetState.Closed,[F]),z=`${s}-placeholder`;return(0,e.jsxs)(a.Paper,{className:"widget-add-data jimu-widget d-flex align-items-center justify-content-center",css:ha,ref:S,shape:"none",children:[0===v.length&&(0,e.jsxs)("div",{className:"no-data-placeholder w-100",children:[(0,e.jsx)("div",{className:"no-data-placeholder-icon",children:(0,e.jsx)(i,{size:32})}),(0,e.jsx)("div",{className:"no-data-placeholder-text",id:z,children:(0,e.jsx)("span",{children:c.placeholderText||y("defaultPlaceholderText")})}),(0,e.jsx)("div",{className:"no-data-placeholder-btn",children:(0,e.jsx)(Pt,{buttonSize:"lg",portalUrl:l,widgetId:s,onFinish:C,hiddenTabs:x,popperReference:S,nextOrder:b,config:c,itemCategoriesInfo:m,hidePopper:L,buttonDescribedby:z,displayedItemTypeCategories:c.displayedItemTypeCategories,panelSize:null==c?void 0:c.panelSize,onResizeStop:T})})]}),v.length>0&&(0,e.jsxs)("div",{className:"w-100 h-100 p-4",children:[(0,e.jsx)(oa,{multiDataOptions:v,enableDataAction:d,isLoading:h,widgetId:s,disableRenaming:c.disableRenaming,onRemoveData:e=>{N.current.initialized()&&N.current.deleteAll([e]),f(v.filter(t=>t.dataSourceJson.id!==e)),j(s,t.DataSourcesChangeType.Remove,[w(e)])},onChangeData:e=>{N.current.initialized()&&N.current.put(e.dataSourceJson.id,e),g(!0),O([e]).catch(e=>{console.error("Failed to update data source",e)}).finally(()=>{g(!1)}),f(v.map(t=>t.dataSourceJson.id===e.dataSourceJson.id?e:t))}}),(0,e.jsx)("div",{className:"w-100 d-flex justify-content-end add-by-search-samll",children:(0,e.jsx)(Pt,{buttonSize:"sm",portalUrl:l,widgetId:s,onFinish:C,hiddenTabs:x,popperReference:S,nextOrder:b,config:c,itemCategoriesInfo:m,hidePopper:L,displayedItemTypeCategories:c.displayedItemTypeCategories,panelSize:null==c?void 0:c.panelSize,onResizeStop:T})})]})]})};fa.versionManager=na;const ya=fa,ha=t.css`
  position: relative;

  .add-by-search-samll {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .no-data-placeholder {
    padding: 8px;
    .no-data-placeholder-text, .no-data-placeholder-icon, .no-data-placeholder-btn{
      display: table;
      margin: 0 auto;
    }
    .no-data-placeholder-text {
      color: var(--sys-color-surface-paper-hint);
      font-size: 0.8125rem;
      margin-top: 1rem;
      text-align: center;
    }
    .no-data-placeholder-icon {
      color: var(--sys-color-surface-paper-hint);
    }
    .no-data-placeholder-btn {
      margin-top: 1rem;
    }
  }
`;function ga(e){s.p=e}})(),d})())}}});