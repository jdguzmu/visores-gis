System.register(["jimu-core/emotion","jimu-core","jimu-arcgis","jimu-ui","esri/geometry/SpatialReference","esri/geometry/operators/projectOperator"],function(e,t){var o={},i={},n={},a={},s={},r={};return{setters:[function(e){o.jsx=e.jsx,o.jsxs=e.jsxs},function(e){i.React=e.React,i.css=e.css},function(e){n.JimuMapViewComponent=e.JimuMapViewComponent},function(e){a.Button=e.Button,a.Icon=e.Icon,a.Tooltip=e.Tooltip},function(e){s.default=e.default||e},function(e){r.execute=e.execute,r.isLoaded=e.isLoaded,r.load=e.load}],execute:function(){e((()=>{var e={4234(e){e.exports='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="#243746" d="M32 5c-11.6 0-21 9.4-21 21 0 15.5 18.2 31.1 19 31.8a3 3 0 0 0 4 0c.8-.7 19-16.3 19-31.8 0-11.6-9.4-21-21-21"></path><circle cx="32" cy="26" r="9" fill="#00A9CE"></circle><circle cx="32" cy="26" r="4" fill="#fff"></circle></svg>'},3205(e){"use strict";e.exports=s},7835(e){"use strict";e.exports=r},2686(e){"use strict";e.exports=n},9244(e){"use strict";e.exports=i},7386(e){"use strict";e.exports=o},4321(e){"use strict";e.exports=a}},t={};function l(o){var i=t[o];if(void 0!==i)return i.exports;var n=t[o]={exports:{}};return e[o](n,n.exports,l),n.exports}l.d=(e,t)=>{for(var o in t)l.o(t,o)&&!l.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:t[o]})},l.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),l.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.p="";var c={};return l.p=window.jimuConfig.baseUrl,(()=>{"use strict";l.r(c),l.d(c,{__set_webpack_public_path__:()=>x,default:()=>f});var e=l(7386),t=l(9244),o=l(2686),i=l(4321),n=l(3205),a=l(7835);const s={_widgetLabel:"Google Maps",openGoogleMaps:"Abrir en Google Maps",openGoogleMapsTooltip:"Abrir ubicaci\xf3n actual en Google Maps",mapUnavailable:"Mapa no disponible",locationError:"No se pudo obtener la ubicaci\xf3n actual del mapa."};var r=function(e,t,o,i){return new(o||(o=Promise))(function(n,a){function s(e){try{l(i.next(e))}catch(e){a(e)}}function r(e){try{l(i.throw(e))}catch(e){a(e)}}function l(e){var t;e.done?n(e.value):(t=e.value,t instanceof o?t:new o(function(e){e(t)})).then(s,r)}l((i=i.apply(e,t||[])).next())})};const p=l(4234),{useCallback:u,useEffect:d,useState:m}=t.React,g=new n.default({wkid:4326}),h=e=>Math.max(0,Math.min(21,Math.round(e))),f=n=>{var l;const[c,f]=m(null),[x,v]=m(""),w=u(e=>n.intl.formatMessage({id:e,defaultMessage:s[e]}),[n.intl]),b=null==c?void 0:c.view,y=Boolean(null==b?void 0:b.center);d(()=>{b&&!a.isLoaded()&&a.load().catch(()=>{})},[b]);const j=()=>r(void 0,void 0,void 0,function*(){var e;const t=null===(e=null==b?void 0:b.center)||void 0===e?void 0:e.clone();var o;if(t)try{v("");const e=yield(o=t,r(void 0,void 0,void 0,function*(){const e=o.spatialReference;if((null==e?void 0:e.isWGS84)||4326===(null==e?void 0:e.wkid)||4326===(null==e?void 0:e.latestWkid))return o;a.isLoaded()||(yield a.load());const t=a.execute(o,g);if(!t)throw new Error("Projection returned no result");return t})),i=e.y,n=e.x;if(!Number.isFinite(i)||!Number.isFinite(n)||Math.abs(i)>90||Math.abs(n)>180)throw new Error("Invalid WGS84 coordinates");const s=new URL("https://www.google.com/maps/@");s.searchParams.set("api","1"),s.searchParams.set("map_action","map"),s.searchParams.set("center",`${i.toFixed(7)},${n.toFixed(7)}`);const l=((e,t,o)=>{if(Number.isFinite(e)&&e>=0)return h(e);if(Number.isFinite(t)&&t>0){const e=Math.max(.01,Math.cos(o*Math.PI/180)),i=Math.log2(591657527.591555*e/t);if(Number.isFinite(i))return h(i)}return 15})(Number(null==b?void 0:b.zoom),Number(null==b?void 0:b.scale),i);s.searchParams.set("zoom",String(l)),window.open(s.toString(),"_blank","noopener,noreferrer")}catch(e){v(w("locationError"))}else v(w("locationError"))}),M=w(y?"openGoogleMapsTooltip":"mapUnavailable");return(0,e.jsxs)("div",{className:"jimu-widget chms-google-maps",css:t.css`
  container-type: inline-size;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 44px;
  padding: 6px;

  .chms-google-maps-action {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
  }
  .chms-google-maps-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    gap: 8px;
    white-space: nowrap;
  }
  .chms-google-maps-label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .chms-google-maps-error {
    margin-top: 4px;
    color: var(--sys-color-error-main);
    font-size: 11px;
    line-height: 1.25;
    text-align: center;
  }
  .chms-google-maps-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 100%;
  }

  @container (max-width: 150px) {
    .chms-google-maps-label { display: none; }
    .chms-google-maps-button { width: 36px; min-width: 36px; padding-inline: 0; }
  }
`,children:[(null===(l=n.useMapWidgetIds)||void 0===l?void 0:l[0])&&(0,e.jsx)(o.JimuMapViewComponent,{useMapWidgetId:n.useMapWidgetIds[0],onActiveViewChange:e=>{v(""),f(null!=e?e:null)}}),(0,e.jsxs)("div",{className:"chms-google-maps-content",children:[(0,e.jsx)(i.Tooltip,{title:M,placement:"top",children:(0,e.jsx)("span",{className:"chms-google-maps-action",children:(0,e.jsxs)(i.Button,{type:"primary",className:"chms-google-maps-button",disabled:!y,"aria-label":M,onClick:()=>{j()},children:[(0,e.jsx)(i.Icon,{icon:p,size:20}),n.config.showLabel&&(0,e.jsx)("span",{className:"chms-google-maps-label",children:w("openGoogleMaps")})]})})}),x&&(0,e.jsx)("div",{className:"chms-google-maps-error",role:"status",children:x})]})]})};function x(e){l.p=e}})(),c})())}}});