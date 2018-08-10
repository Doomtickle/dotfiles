require=function(r,e,n){function t(n,o){function i(r){return t(i.resolve(r))}function f(e){return r[n][1][e]||e}if(!e[n]){if(!r[n]){var c="function"==typeof require&&require;if(!o&&c)return c(n,!0);if(u)return u(n,!0);var l=new Error("Cannot find module '"+n+"'");throw l.code="MODULE_NOT_FOUND",l}i.resolve=f;var s=e[n]=new t.Module(n);r[n][0].call(s.exports,i,s,s.exports)}return e[n].exports}function o(r){this.id=r,this.bundle=t,this.exports={}}var u="function"==typeof require&&require;t.isParcelRequire=!0,t.Module=o,t.modules=r,t.cache=e,t.parent=u;for(var i=0;i<n.length;i++)t(n[i]);return t}({2:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var r={capture:"capture",captureError:"captureError",captureFrame:"captureFrame"};exports.default=r;var e=[];for(var a in r)e.push(r[a]);var t=exports.isValidMessage=function(r){return e.indexOf(r)>-1};
},{}],9:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=exports.genLastErrorFmt=function(e){return function(r,t){var s={name:e,message:r.message,stack:r.stack};return t&&(s.via=t),s}};
},{}],4:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.sendMessage=void 0;var e=require("./chrome.util"),r=(0,e.genLastErrorFmt)("ChromeRuntimeError"),s=exports.sendMessage=function(e){return new Promise(function(s,t){chrome.runtime.sendMessage(e,function(e){var n=chrome.runtime.lastError;return n?t(r(n,"sendMessage")):s(e)})})};
},{"./chrome.util":9}],3:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=exports.serialMap=function(e,n){var t=e.length,r=void 0===n;return Promise.resolve().then(function(){return function o(i,u){return i>=t?u:(r?e[i]():n(e[i])).then(function(e){return o(i+1,e)})}(0,void 0)})},n=exports.sleep=function(e){return new Promise(function(n){window.setTimeout(n,e)})},t=exports.timeoutWrap=function(e,n,t,r){return new Promise(function(o,i){var u=void 0;n&&(u=window.setTimeout(function(){var e="Promise timed out after "+n+"ms";t&&(e+=" "+t);var o=new Error(e);(o.name="PromiseTimeout",r)?!1===r(o,n)&&i(o):i(o)},n)),e.then(function(e){window.clearTimeout(u),o(e)}).catch(i)})},r=exports.loadImage=function(e){return new Promise(function(n,t){var r=new Image;r.onerror=function(e){return t(e)},r.onload=function(t){return n({img:r,src:e,width:r.width,height:r.height})},r.src=e})};
},{}],10:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=new Set(["iframe","frame"]),e=exports.isFrame=function(e){return t.has(e.tagName.toLowerCase())},o=exports.computeOffsets=function(t,o){o="boolean"==typeof o?o:e(t);for(var i=t.getBoundingClientRect(),r=i.width,f=i.height,w=0,a=0,l=t;l;){w+=l.offsetLeft,l===document.body?a+=l.getBoundingClientRect().top+window.scrollY:a+=l.offsetTop;var p=n(l);p&&(w+=p.m41,a+=p.m42),l=l.offsetParent}var h={left:w,top:a,width:r,height:f};if(o){var s=d(t);h.box=s,h.left+=s.left,h.top+=s.top,h.width-=s.left+s.right,h.height-=s.top+s.bottom}return h},i=exports.isOnScreen=function(t){return 0!=t.width&&0!=t.height&&t.left+t.width>0&&t.left<window.innerWidth&&t.top+t.height>0&&t.top<window.innerHeight&&"none"!==t.display&&"hidden"!==t.visibility&&0!==t.opacity},n=function(t){if(window.DOMMatrix||window.WebKitCSSMatrix){var e=window.getComputedStyle(t),o=e.transform||e.webkitTransform;return window.DOMMatrix?new window.DOMMatrix(o):new window.WebKitCSSMatrix(o)}},r=function(t){var e=t.getBoundingClientRect(),o=e.top,i=e.left;if("fixed"!==window.getComputedStyle(t)){for(var n=!1,r=t.parentElement;r;){if(o+=r.scrollTop,i+=r.scrollLeft,"fixed"===window.getComputedStyle(r).position){n=!0;break}r=r.parentElement}n||(o+=void 0===window.scrollY?window.pageYOffset:window.scrollY,i+=void 0===window.scrollX?window.pageXOffset:window.scrollX)}return{top:o,left:i,width:e.width,height:e.height}},d=function(t){var e=window.getComputedStyle(t);return{left:f(e,["borderLeftWidth","paddingLeft"]),right:f(e,["borderRightWidth","paddingRight"]),top:f(e,["paddingTop","borderTopWidth"]),bottom:f(e,["paddingBottom","borderBottomWidth"])}},f=function(t,e){return e.reduce(function(e,o){return e+w(t[o])},0)},w=function(t){var e=parseFloat(t);return isNaN(e)?0:e};
},{}],8:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=exports.LOG_LEVELS={ERROR:40,WARN:30,INFO:20,DEBUG:10,NOTSET:0},o=e.INFO,n=exports.getLogLevel=function(){return o},r=exports.setLogLevel=function(e){return o=e},t=function(n,r){if(!(n<o)){var t=n<=e.DEBUG?"log":n<=e.INFO?"info":n<=e.WARN?"warn":"error";try{(console[t]||console.log).apply(console,r)}catch(e){}}};t.debug=function(){t(e.DEBUG,arguments)},t.info=function(){t(e.INFO,arguments)},t.warn=function(){t(e.WARN,arguments)},t.error=function(){t(e.ERROR,arguments)},exports.default=t;
},{}],14:[function(require,module,exports) {
var global = typeof global === "object" ? global : typeof window === "object" ? window : typeof self === "object" ? self : this;
var e="object"==typeof e?e:"object"==typeof window?window:"object"==typeof self?self:this;!function(e,t){"object"==typeof exports?module.exports=t(e):"function"==typeof define&&define.amd?define([],t.bind(e,e)):t(e)}(void 0!==e?e:this,function(e){if(e.CSS&&e.CSS.escape)return e.CSS.escape;var t=function(e){if(0==arguments.length)throw new TypeError("`CSS.escape` requires an argument.");for(var t,o=String(e),r=o.length,n=-1,i="",f=o.charCodeAt(0);++n<r;)0!=(t=o.charCodeAt(n))?i+=t>=1&&t<=31||127==t||0==n&&t>=48&&t<=57||1==n&&t>=48&&t<=57&&45==f?"\\"+t.toString(16)+" ":(0!=n||1!=r||45!=t)&&(t>=128||45==t||95==t||t>=48&&t<=57||t>=65&&t<=90||t>=97&&t<=122)?o.charAt(n):"\\"+o.charAt(n):i+="�";return i};return e.CSS||(e.CSS={}),e.CSS.escape=t,t});
},{}],12:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(n,t,i){return t&&e(n.prototype,t),i&&e(n,i),n}}();function n(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}var t={isBfs:!1,autoAdd:!1,onlyElementNodes:!0,ignoreNodeNames:new Set(["SCRIPT","HEAD","STYLE","LINK","META"]),ignoreHidden:!0},i=function(){function i(e,o){n(this,i);this.root=e||document.body||document.documentElement,o=o||{};var r=Object.keys(o).filter(function(e){return!(e in t)});if(r.length)throw new Error("Invalid SearchNodes keys: "+r.join(", "));o=Object.assign({},t,o),this.isBfs=o.isBfs,this.autoAdd=o.autoAdd,this.onlyElementNodes=o.onlyElementNodes,this.ignoreNodeNames=o.ignoreNodeNames,this.ignoreHidden=o.ignoreHidden,this.search=this.root?[this.root]:[]}return e(i,[{key:"hasNext",value:function(){return this.search.length>0}},{key:"next",value:function(){var e=this.isBfs?this.search.shift():this.search.pop();return this.autoAdd&&this.addAll(e.childNodes),e}},{key:"addAll",value:function(e){var n=this;return(this.onlyElementNodes||this.ignoreNodeNames||this.ignoreHidden)&&(e=Array.prototype.filter.call(e,function(e){return!(n.onlyElementNodes&&e.nodeType!==e.ELEMENT_NODE||n.ignoreNodeNames&&n.ignoreNodeNames.has(e.nodeName)||n.ignoreHidden&&n.isHidden(e))})),this.search.push.apply(this.search,e),this}},{key:"isHidden",value:function(e){var n=getComputedStyle(e);return"none"===n.display||"hidden"===n.visibility||(0===o(n.height)&&"hidden"===n.overflowY||0===o(n.width)&&"hidden"===n.overflowX)}}]),i}(),o=function(e){return parseInt(e,10)};exports.default=i;
},{}],7:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.SCROLL_PAD_INNER=exports.SCROLL_PAD=void 0,require("css.escape");var t=require("../promise"),e=require("./offsets"),o=require("./log"),i=r(o),n=require("./search-nodes"),a=r(n);function r(t){return t&&t.__esModule?t:{default:t}}var d=exports.SCROLL_PAD=200,l=exports.SCROLL_PAD_INNER=100,s=!1,u=new Set(["absolute","fixed","relative","sticky"]),c=function(){var o=[],n=[],r={_stack:o,_fixedStack:n,init:function(){r.add(document.documentElement,{scrollBehavior:"auto"});var t=document.body;t&&"scroll"===window.getComputedStyle(t).overflowY&&r.add(t,{overflowY:"visible"}),r._initHangingAbsolutes(),r._initFixedPseudos(),r.hideScrollbars(),r.disableTransitions(),r.hacks()},_add:function(t,e,o){if(t){var i=t.style.cssText;r._applyStyles(t,e),o.push({elt:t,before:i,after:t.style.cssText})}},add:function(t,e){return r._add(t,e,o)},addFixed:function(t,e){return r._add(t,e,n)},_pop:function(t){var e=t.pop();if(e)switch(e.action){case"new_elt":e.elt.parentNode&&e.elt.parentNode.removeChild(e.elt);break;case"removed_attr":e.elt.setAttribute(e.attr,e.value);break;case"func":e.undo();break;default:e.elt.style.cssText=e.before}return e},popAll:function(){if(!s)for(i.default.debug("Styles popping stack",o.length);o.length;)r._pop(o)},popAllFixed:function(){if(!s)for(;n.length;)r._pop(n)},_initHangingAbsolutes:function(){var t=document.body;if(t&&!r.isPositioned(window.getComputedStyle(t))){for(var e=[],o=new a.default(document.body);o.hasNext();){var n=o.next(),d=window.getComputedStyle(n),l=d.position;"absolute"===l?e.push({elt:n,style:d}):r.isPositioned(l)||o.addAll(n.childNodes)}var s=t.getBoundingClientRect(),u=s.left+window.scrollX,c=s.top+window.scrollY;e.forEach(function(t){var e=t.elt,o=t.style,n=o.width,a=o.height,d=r.pxToFloat(o.left),l=r.pxToFloat(o.top),s={width:n,height:a,left:d-u+"px",top:l-c+"px",right:"auto",bottom:"auto"};i.default.debug("fix hanging abs",e,s),r.add(e,s)})}},isPositioned:function(t){return u.has(t)},_initFixedPseudos:function(){if(document.body)for(var t=new a.default(document.body),e=function(){var e=t.next(),o=e.getBoundingClientRect();if(o.width>.75*window.innerWidth&&o.height>.75*window.innerHeight){var n=!1;["::before","::after"].forEach(function(t){if("fixed"===window.getComputedStyle(e,t).position){n=!0,e.id||(e.id=f.next());var o="#"+window.CSS.escape(e.id)+t,a=o+" { position: absolute; }";r.addStyleSheet(a),i.default.debug("fixed pseudo",o)}}),n||t.addAll(e.childNodes)}};t.hasNext();)e()},initFixed:function(){var t=document.body&&window.getComputedStyle(document.body);if(t&&"absolute"!==t.position){var e={position:"relative"};"inline"===t.dislpay&&(e.display="block");var o=!1;if("none"===t.maxWidth&&(e.minWidth="100vw",o=c.isBoxSizingRisky(t)),"none"===t.maxHeight&&(e.minHeight="100vh",o=o||c.isBoxSizingRisky(t,!0)),"0px"!==t.marginTop){var i=parseInt(t.paddingTop)+parseInt(t.marginTop);e.paddingTop=i+"px",e.marginTop="0px",o=!0}if("0px"!==t.marginBottom){var n=parseInt(t.paddingBottom)+parseInt(t.marginBottom);e.paddingBottom=n+"px",e.marginBottom="0px",o=!0}o&&(e.boxSizing="border-box"),r.add(document.body,e)}},updateFixed:function(o,n,a,d,l){var u=r._getFixedAndStickyElts(o,l),c=u.fixed,f=u.sticky,p=u.fixedBg,h=u.fixedHeader;return n||h.forEach(function(t){i.default.debug("hide fixed header",t),s||r.addFixed(t,{visibility:"hidden",overflow:"hidden"})}),c.forEach(function(t){i.default.debug("fixed -> absolute",t);var o=window.getComputedStyle(t),n=r.pxToInt(o.left),l=r.pxToInt(o.right),s=r.pxToInt(o.top),u=r.pxToInt(o.bottom),c=r.pxToInt(o.height),f=t.scrollHeight,p=o.overflowY,h=t.computedStyleMap?t.computedStyleMap():null,g=h&&"auto"!==h.get("top").value,m=h&&"auto"!==h.get("bottom").value,b=h&&"auto"!==h.get("left").value,x=h&&"auto"!==h.get("right").value;if(r.addFixed(t,{position:"absolute",transition:"none"}),t.offsetParent){var w=(0,e.computeOffsets)(t.offsetParent),v=n-w.left,y=l-(d-(w.left+w.width)),S=s-w.top,_=u-(a-(w.top+w.height)),k=[["top",g],["right",x],["bottom",m],["left",b]].filter(function(t){return t[1]}).map(function(t){return t[0]}).join(","),T=["left","top","width","height"].map(function(t){return w[t]}).join(","),E="\noldLeft="+n+" ("+o.left+")\noldRight="+l+" ("+o.right+")\noldTop="+s+" ("+o.top+")\noldBottom="+u+" ("+o.bottom+")\noldHeight="+c+", ("+o.height+")\noldScrollHeight="+f+"\noldOverflowY="+p+"\nspecified?="+k+"\nparOffset="+T+"\ntop="+S+"\nbottom="+_+"\nleft="+v+"\nright="+y;i.default.debug(E);var N=!1,C={};if(!isNaN(v)&&v<=0?(N=!0,b||x?(b&&(C.left=v+"px"),x&&(C.right=y+"px")):C.left=v+"px"):x&&!isNaN(y)&&(N=!0,C.right=y+"px"),!isNaN(S)&&S<=0){N=!0;var H=c;"scroll"===p&&"auto"===p&&(H=Math.max(H,f)),C.height=H+"px",g||m?(g&&m&&delete C.height,g&&(C.top=S+"px"),m&&(C.bottom=_+"px")):0===u&&0!==t.offsetParent.getBoundingClientRect().height?C.bottom="0px":(C.top=S+"px",C.bottom="auto")}else m&&!isNaN(_)&&(N=!0,C.bottom=_+"px");N&&(i.default.debug("set",C),r.addFixed(t,C))}else i.default.warn("No offsetParent for",t)}),f.forEach(function(t){i.default.debug("sticky -> relative",t),r.add(t,{position:"relative",top:"auto",left:"auto",right:"auto",bottom:"auto"})}),p.forEach(function(o){i.default.debug("fixedBg -> scroll",o);var n=window.getComputedStyle(o),a={backgroundAttachment:"scroll"};if("cover"===n.backgroundSize){var d=(0,e.computeOffsets)(o);d.top<0&&(a.backgroundPositionY=-d.top+"px"),a.backgroundSize=window.innerWidth+"px",i.default.debug("...override bg size",o,a);var l=n.backgroundImage.match(/^url\(["']?(.+)["']\)$/);if(l){var s=l[1];(0,t.loadImage)(s).then(function(t){var e=t.width,i=t.height,n=window.innerHeight,a=window.innerWidth,d=a*i/e,l=void 0,s=void 0;d>=n?(l=a,s=d):(l=n*e/i,s=n),r.add(o,{backgroundSize:l+"px "+s+"px"})}).catch(function(t){return console.error(t)})}}r.add(o,a)}),c.length+f.length},_getFixedAndStickyElts:function(t,o){var n=[],r=[],d=[],l={fixed:n,sticky:r,fixedBg:d,fixedHeader:[]},s=t||document.body;if(!s)return l;for(var u=new a.default(s,{autoAdd:!0});u.hasNext();){var c=u.next();if(c!==s){var f=window.getComputedStyle(c),p=f.position;if("sticky"===p)r.push(c);else if("fixed"===p){var h=(0,e.computeOffsets)(c),g=window.innerHeight-h.top-20;if(h.top<20&&h.height<g)o&&i.default.debug("found fixed header",c),l.fixedHeader.push(c);else if(h.top+h.height<=0&&h.height>0||h.left+h.width<=0&&h.width>0||h.top>window.innerHeight&&h.height>0||h.left>window.innerWidth&&h.width>0)o&&i.default.debug("skip fixed offscreen",JSON.stringify(h),c);else if(h.height>window.innerHeight&&h.width>=2*window.innerWidth/3){var m=h.height,b=window.innerHeight;o&&i.default.debug("skip too tall",c,m,b)}else n.push(c)}"fixed"===f.backgroundAttachment&&d.push(c)}}return l},pxToInt:function(t){return parseInt(t,10)},pxToFloat:function(t){return parseFloat(t)},_applyStyles:function(t,e){if(t){var o=t.style.cssText+"; ";for(var i in e){o+=r._camelToDash(i)+": "+e[i]+" !important; "}t.style.cssText=o}},_camelToDash:function(t){return t.replace(/([a-zA-Z])(?=[A-Z])/g,"$1-").toLowerCase()},hideScrollbars:function(){(r.isMobile()||r._isImage())&&r.add(document.documentElement,{overflow:"hidden"}),r._hideScrollbars(["html","body"])},isMobile:function(){return r._isTouch()},_isTouch:function(){try{return document.createEvent("TouchEvent"),!0}catch(t){return!1}},_isImage:function(){var t=document.contentType;return t&&t.startsWith("image/")},_hideScrollbars:function(t){var e=t.map(function(t){return t+"::-webkit-scrollbar"}).join(", ")+"{ width: 0 !important; height: 0 !important }";r.addStyleSheet(e)},hideScrollbarsInner:function(t){if(t.id||(t.id=f.next()),r._twitchHideScrollbars(t))i.default.debug("Hide scrollbars twitch");else{r._gmailHideScrollbars(e);var e="#"+window.CSS.escape(t.id);r._hideScrollbars([e]);var o=["overflow","overflowY","overflowX"],n={};o.forEach(function(e){return n[e]=t.style[e]}),t.style.overflow="hidden";t.offsetWidth;o.forEach(function(e){return t.style[e]=n[e]})}},_twitchHideScrollbars:function(t){if(t.classList&&t.classList.contains("simplebar-scroll-content")){var e=p(t.parentNode.childNodes).find(function(t){return t.nodeType===t.ELEMENT_NODE&&t.classList&&t.classList.contains("simplebar-track")&&t.classList.contains("vertical")});return r.add(e,{opacity:0}),!0}return!1},_gmailHideScrollbars:function(t){var e=["::-webkit-scrollbar-button { width: 0 !important; height: 0 !important; display: none !important; }","::-webkit-scrollbar-corner { background-color: transparent !important; border: 0 !important }","::-webkit-scrollbar-thumb { background-color: transparent !important; box-shadow: none !important }"].map(function(e){return""+t+e}).join("\n");r.addStyleSheet(e)},addStyleSheet:function(t){var e=document.createElement("style");e.innerHTML=t;var i=document.getElementsByTagName("head")[0]||document.getElementsByTagName("body")[0];i&&(i.appendChild(e),o.push({elt:e,action:"new_elt"}))},disableTransitions:function(){r.addStyleSheet("* {\n          transition: none !important;\n          transition-delay: 0s !important;\n          animation-duration: 0s !important;\n          animation-delay: 0s !important;\n        }");var t=p(document.querySelectorAll("[data-aos]"));if(t.length&&(i.default.debug("disable AOS"),t.forEach(function(t){var e=t.getAttribute("data-aos");t.removeAttribute("data-aos"),o.push({elt:t,action:"removed_attr",attr:"data-aos",value:e})})),document.documentElement.classList.contains("skrollr")){i.default.debug("disable Skrollr");var e=document.body||document.head;if(e){var n=document.createElement("script");n.innerHTML='skrollr.init().destroy(); throw new Error("haha")';try{e.appendChild(n)}catch(t){i.default.error(t)}}}if(window.dispatchEvent(new CustomEvent("animateme:destroy")),o.push({action:"func",undo:function(){window.dispatchEvent(new CustomEvent("animateme:enable"))}}),document.querySelector("body > .Parallax-host-outer .Parallax-host")){r.addStyleSheet("\n          .Parallax-item, .Parallax-item figure {\n            position: absolute !important;\n            transform: translate3d(0px, 0px, 0px) !important;\n          }")}var a="body.parallax-scrolling #parallax-images .image-container";if(document.querySelector(a)){r.addStyleSheet("body.parallax-scrolling #parallax-images .image-container, body.parallax-scrolling #parallax-images .image-container img {\n              transform: translate3d(0px, 0px, 0px) !important;\n            }\n        ")}var d=p(document.querySelectorAll('[data-parallax="scroll"][data-image-src]')),l=p(document.getElementsByClassName("parallax-mirror"));if(d.length&&d.length===l.length){r.addStyleSheet("\n          .parallax-mirror { display: none !important; }\n        "),d.forEach(function(t){r.add(t,{backgroundImage:"url("+t.dataset.imageSrc+")",backgroundPosition:"center",backgroundSize:"cover"})})}},hacks:function(){r._quoraHack(),r._adwordsStickyClassHack()},_quoraHack:function(){var t=window.location.host;if("quora.com"===t||t.endsWith("quora.com")){r.addStyleSheet(".Answer.ActionBar.sticky { position: static !important }")}},_adwordsStickyClassHack:function(){r.addStyleSheet('[stickyclass="sticky"], ess-particle-table [role="row"], [acxscrollhost] .header-sticky-container  { transform: translate(0px, 0px) !important }')},isBoxSizingRisky:function(t,e){var o=["paddingTop","paddingBottom","borderTopWidth","borderBottomWidth"];!0!==e&&o.push("paddingRight","paddingLeft","borderRightWidth","borderRightWidth");var i=o.some(function(e){return t[e]&&"0px"!==t[e]});return"content-box"===t.boxSizing&&i}};return r}();exports.default=c;var f=function(){var t=0;return{next:function(){return"__FPSC_ID_"+ ++t+"_"+(new Date).getTime()}}}(),p=function(t){return Array.prototype.slice.call(t)};
},{"css.escape":14,"../promise":3,"./offsets":10,"./log":8,"./search-nodes":12}],13:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=exports.noIframes=function(){var e=/Chrome\/([0-9]+)/.exec(navigator.userAgent);return e&&"49"===e[1]};
},{}],11:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("../sniff"),t=require("./offsets"),r=require("./log"),o=d(r),i=require("./search-nodes"),n=d(i);function d(e){return e&&e.__esModule?e:{default:e}}var l=function(){var r={empty:function(){return{}},find:function(e,i,n,d,l){var f=r.empty();if(n>e+15||d>i+15){var a=n+" > "+e+" + 15 => "+(n>e+15),u=d+" > "+i+" + 15 => "+(d>i+15);return o.default.debug("Skip ScrollFinder: "+a+" OR "+u),f}if(!(l=l||document.body))return o.default.debug("Skip ScrollFinder: no document.body"),f;if(!(0,t.isFrame)(l)){var s=!0,c=!s;"trello.com"===window.location.hostname&&(s=!s,c=!c);var h=r._findByDim(l,s),m=r._findByDim(l,c),p=[h,m].filter(function(e){return e&&e!==document.body});if(1===p.length)return p[0];if(h||m)return h||m}return r._findFrame()||f},_findByDim:function(e,r){for(var i=0,d=e,l=null,f=new n.default(e);f.hasNext();){var a=!1,u=f.next(),s=u[r?"offsetHeight":"offsetWidth"],c=u[r?"scrollHeight":"scrollWidth"];if(c>s+5&&s>50&&c>i&&u[r?"offsetWidth":"offsetHeight"]>40){var h=window.getComputedStyle(u),m=h[r?"overflowY":"overflowX"],p=u.classList.contains("ps")&&u.classList.contains(r?"ps--active-y":"ps--active-x");"none"!==h.pointerEvents&&("hidden"!==m&&"visible"!==m||p)&&(i=c,d=u,l=h,a=!0)}a||f.addAll(u.childNodes)}var g=(0,t.computeOffsets)(d),v=g.height,w=g.width,y=d.scrollWidth,b=d.scrollHeight;if("hidden"===(l&&l[r?"overflowX":"overflowY"]))if(r){var F=parseFloat(l.paddingLeft)||0,_=parseFloat(l.paddingRight)||0;g.left+=F,w-=F+_,y-=_+_}else{var S=parseFloat(l.paddingTop)||0,x=parseFloat(l.paddingBottom)||0;g.top+=S,v-=S+x,b-=x+x}return d===document.body?(o.default.debug("Skip ScrollFinder: max_elt is body"),null):{elt:d,scrollHeight:Math.max(v,b),scrollWidth:Math.max(w,y),top:g.top,bottom:g.top+v,left:g.left,right:g.left+w,height:v,width:w,ready:!0}},_findFrame:function(){if((0,e.noIframes)())return null;var r=f(document.querySelectorAll("iframe, frame")),o=window.innerWidth*window.innerHeight/4,i=0,n=null;return r.forEach(function(e){var r=(0,t.computeOffsets)(e),d=r.width,l=r.height,f=d*l;if(f>=o&&f>i&&r.left>=0&&r.left+r.width<=window.innerWidth+5&&r.top>=0&&r.top+r.height<=window.innerHeight+5){i=f;var a=r.left,u=r.top;n={frame:e,width:d,height:l,top:u,left:a,url:e.src,tagName:e.nodeName.toLowerCase(),bottom:u+l,right:a+d,ready:!1}}}),null!==n?n:void 0},bodyBg:function(){for(var e=[document.body,document.documentElement].filter(function(e){return e});e.length;){var t=e.shift(),r=window.getComputedStyle(t).backgroundColor||"";if("transparent"!==r&&!r.match(/^rgba\(\d+,\s*\d+,\s*\d+,\s*0\)$/))return r}return"#ffffff"}};return r}(),f=function(e){return Array.prototype.slice.call(e)};exports.default=l;
},{"../sniff":13,"./offsets":10,"./log":8,"./search-nodes":12}],5:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},e=function(){function t(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,i,o){return i&&t(e.prototype,i),o&&t(e,o),e}}(),i=require("./offsets"),o=require("./log"),r=d(o),h=require("./styles"),n=require("./scrollfinder"),l=d(n),a=require("./search-nodes"),s=d(a);function d(t){return t&&t.__esModule?t:{default:t}}function u(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var f=function(){function t(e,i,o,r){u(this,t),this.docElt=document.documentElement,this.body=document.body,this.opts=e,this.origBodyHeightZero=i,this.scrollable=void 0,this.origWindowX=o,this.origWindowY=r,this.dimensions=this.getDimensions()}return e(t,[{key:"calculate",value:function(){void 0===this.scrollable&&this.getScrollable(),this._setRegions(),this._setPositions()}},{key:"popNextPosition",value:function(){var t=this.positions.shift();return this.lastPosition=t,t}},{key:"addPageHeightChange",value:function(t,e){var i=this;this.addedHeightChange=!0,this.positions.unshift(t);var o=this.positions.filter(function(t){return t.isMain&&t.scrollY>0}),r=g(o.map(function(t){return t.scrollY}));r>0&&(o.forEach(function(t){return t.yAdjust=e}),o.filter(function(t){return t.scrollY===r}).forEach(function(t){var o=Object.assign({},t);o.scrollY-=e,i.positions.push(o)}))}},{key:"getDimensions",value:function(){var t=this.body,e=this.docElt,o=(this.origBodyHeightZero,t?window.getComputedStyle(t):{}),h=[e.clientWidth,e.offsetWidth,"hidden"!==o.overflowX?e.scrollWidth:0,t?t.offsetWidth:0,t&&"hidden"!==o.overflowX?t.scrollWidth:0],n=[e.clientHeight,e.offsetHeight,"hidden"!==o.overflowY?e.scrollHeight:0],l=[t?t.offsetHeight:0,t&&"hidden"!==o.overflowY?t.scrollHeight:0],a=g(n),s=g(l);r.default.debug("widths: "+JSON.stringify(h)),r.default.debug("docEHt: "+JSON.stringify(n)),r.default.debug("bodyHt: "+JSON.stringify(l));var d,u,f=void 0,c=g(h),p=g([a,s]);if(document.body){var y=document.getElementById("lightbox-wrap");if(y){var w=(0,i.computeOffsets)(y),b=window.getComputedStyle(y);if("fixed"===b.position&&(d=b.zIndex,u=parseInt(d,10),(isNaN(u)?0:u)>=1e3)&&(0,i.isOnScreen)(w)){[w.left,w.top,window.innerWidth-w.width,window.innerHeight-w.height].every(function(t){return Math.abs(t)<=2})&&(r.default.debug("OVERRIDE DIMS:",w,"zIndex="+b.zIndex,y),f=y,c=window.innerWidth,p=window.innerHeight)}}}var m=c,v=p,x={windowWidth:window.innerWidth,windowHeight:window.innerHeight,bodyMaxHeight:s,docEltMaxHeight:a,fullWidth:m,fullHeight:v,nonadjustedFullHeight:p,nonadjustedFullWidth:c,root:f};return r.default.debug("DIMENSIONS:",x),x}},{key:"ignoreScrollable",value:function(){this.scrollable=l.default.empty()}},{key:"getScrollable",value:function(){var t=this.dimensions,e=l.default.find(t.windowWidth,t.windowHeight,t.fullWidth,t.fullHeight,t.root);return this.scrollable=e,e}},{key:"addFrameResponse",value:function(t){if(!this.scrollable){var e=new Error("No scrollable set inside addFrameResponse");throw e.name="AddFrameResponseError",e}if(t){var i=["width","height"].filter(function(e){return void 0===t[e]});if(i.length){var o=new Error("Bad attrs inside frameResponse: "+i.join(", "));throw o.name="AddFrameResponseError",o}this.scrollable.scrollWidth=t.width,this.scrollable.scrollHeight=t.height,this.scrollable.ready=!0}}},{key:"_setRegions",value:function(){var t=[],e=[],i=this.scrollable,o=this.dimensions,h=o.fullWidth,n=o.fullHeight,a=window,s=this.dimensions,d=s.bodyMaxHeight,u=s.docEltMaxHeight;if(d-20>u&&(r.default.debug("Scroll via body: "+d+" vs "+u),a=this.body),i.ready){var f=i.bottom<n,g=i.right<h,y=void 0,w=void 0,b=void 0,m={page:{isInner:!0,elt:i.elt,eltHeight:i.height,eltWidth:i.width,eltOffsetLeft:i.left,eltOffsetTop:i.top,top:0,left:0,right:i.scrollWidth,bottom:i.scrollHeight},capture:{x:i.left,y:i.top,width:i.scrollWidth,height:i.scrollHeight}};i.frame&&(m.page.isFrame=!0),f&&g&&t.push({page:{elt:a,top:i.bottom,left:i.right,right:h,bottom:n,isMain:!0},capture:{delay:0,x:i.right+(i.scrollWidth-i.width),y:i.bottom+(i.scrollHeight-i.height),width:h-i.right,height:n-i.bottom}}),f&&(y={page:{elt:a,top:i.bottom,left:0,right:i.right,bottom:n,isMain:!0},capture:{delay:0,x:0,y:i.bottom+(i.scrollHeight-i.height),width:i.right,height:n-i.bottom}},t.push(y),(w={x:y.capture.x+y.capture.width,y:y.capture.y,height:y.capture.height}).width=m.capture.width-i.width,b={x:m.capture.x,y:w.y,height:w.height,width:i.width},e.push({fill:w,sample:b})),g&&(y={page:{elt:a,top:0,left:i.right,right:h,bottom:i.bottom,isMain:!0},capture:{delay:0,x:i.right+(i.scrollWidth-i.width),y:0,width:h-i.right,height:i.bottom}},t.push(y),(w={x:y.capture.x,y:y.capture.y+y.capture.height,width:y.capture.width}).height=m.capture.y+m.capture.height-w.y,b={x:w.x,y:m.capture.y,width:w.width,height:y.page.bottom-m.capture.y},e.push({fill:w,sample:b})),y={page:{elt:a,top:0,left:0,right:i.right,bottom:i.bottom,isMain:!0},capture:{delay:0,x:0,y:0,width:i.right,height:i.bottom}},t.push(y),(w={x:0,y:y.capture.y+y.capture.height,width:m.capture.x}).height=m.capture.y+m.capture.height-w.y,b={x:w.x,y:m.capture.y,width:w.width,height:y.page.bottom-m.capture.y},e.push({fill:w,sample:b}),(w={x:y.capture.x+y.capture.width,y:0}).height=m.capture.y-w.y,w.width=m.capture.width-i.width,b={x:m.capture.x,y:w.y,width:i.width,height:w.height},e.push({fill:w,sample:b}),t.push(m),this.dimensions.fullWidth+=Math.max(0,m.page.right-m.page.eltWidth),this.dimensions.fullHeight+=Math.max(0,m.page.bottom-m.page.eltHeight)}else t.push({page:{elt:a,top:0,left:0,right:h,bottom:n,isMain:!0},capture:{x:0,y:0,width:h,height:n}});this.regions=t,this.bgRegions=e;var v=l.default.bodyBg();this.canvasBg=v,r.default.debug("REGIONS:",t),c(t),p(e)}},{key:"_setPositions",value:function(){var t=this.dimensions,e=t.windowWidth,i=t.windowHeight,o=t.fullWidth,n=(t.fullHeight,[]);this.regions.forEach(function(t){if(t.page.isFrame)n.push({isFrame:!0});else{var l=t.page,a=l.isInner?h.SCROLL_PAD_INNER:h.SCROLL_PAD,s={x:(l.eltOffsetLeft||0)+l.left,y:(l.eltOffsetTop||0)+l.top,width:l.eltWidth||Math.min(e,l.right-l.left),height:l.eltHeight||Math.min(i,l.bottom-l.top)};if(0!==s.width&&0!==s.height){var d=Object.assign({},s);d.y+=a,d.height-=a;var u=Object.assign({},t.capture);u.y+=a,u.height-=a;var f=l.eltHeight||i,g=l.eltWidth||e,c=f-(f>a?a:0),p=g;window.devicePixelRatio<1?c-=Math.ceil(1/window.devicePixelRatio):c-=Math.ceil(window.devicePixelRatio);for(var y=0;y<l.bottom;){for(var w=0===y,b=l.left;b<o;){var m={scrollX:b,scrollY:y,clip:w?s:d,capture:w?t.capture:u};t.page.elt&&(m.elt=t.page.elt),m.isMain=t.page.isMain||!1,w&&(m.isTopOfElt=w),n.push(m),b+=p}if(y+f>=l.bottom)break;y+=c}}else r.default.warn("clip has zero area",t,s)}}),r.default.debug("POSITIONS:",n.slice()),this.positions=n,this.numPositions=n.length}}]),t}();function g(t){return Math.max.apply(Math,t.filter(function(t){return"number"==typeof t}))}function c(t){var e={page:{top:1,left:1,right:1,bottom:1},capture:{x:1,y:1,width:1,height:1}},i={eltHeight:1,eltWidth:1,eltOffsetTop:1,eltOffsetLeft:1};if(!(0===t.filter(function(t,o){var h=!1;if(!y(t,e)){h=!0;var n=JSON.stringify(t);r.default.error("Bad shape for region "+o+": "+n)}if(t.page&&t.page.isInner&&!y(t.page,i)){h=!0;var l=JSON.stringify(t.page);r.default.error("Bad capture element shape for region "+o+": "+l)}return h}).length))throw new Error("Bad regions setup!")}function p(t){var e={x:1,y:1,width:1,height:1};if(!(0===t.filter(function(t){["sample","fill"].filter(function(i){return t[i]?!y(t[i],e)&&(r.default.error("Bad bgRegion shape "+JSON.stringify(t[i])),!0):(r.default.error("Missing "+i+" element on bgRegion!"),!0)}).length}).length))throw new Error("Bad bgRegions setup!")}exports.default=f;var y=function e(i,o){var r=void 0===i?"undefined":t(i);return r===(void 0===o?"undefined":t(o))&&("object"!==r||0===Object.keys(o).filter(function(t){return!0!==e(i[t],o[t])}).length)};
},{"./offsets":10,"./log":8,"./styles":7,"./scrollfinder":11,"./search-nodes":12}],6:[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./log"),t=a(e),r=require("../messages"),i=a(r),u=require("../chrome.runtime");function a(e){return e&&e.__esModule?e:{default:e}}var d=function(e){var r=e.scrollable,a=window.innerWidth,d={msg:i.default.captureFrame,windowWidth:a,url:r.url,tagName:r.tagName,top:r.top,left:r.left,width:r.width,height:r.height};return t.default.debug("[frame.sendMessage]",d),(0,u.sendMessage)(d).then(function(r){return t.default.debug("[frame.sendMessage] response",r),!r.skip&&r.width&&r.height?{width:r.width,height:r.height}:void e.ignoreScrollable()})};exports.default=d;
},{"./log":8,"../messages":2,"../chrome.runtime":4}],1:[function(require,module,exports) {
"use strict";var e=require("../messages"),n=f(e),t=require("../chrome.runtime"),r=require("../promise"),o=require("./arrangements"),i=f(o),s=require("./frame"),l=f(s),u=require("./styles"),a=f(u),d=require("./log"),c=f(d);function f(e){return e&&e.__esModule?e:{default:e}}var g=!1,m=!0,w=!0;g&&(0,d.setLogLevel)(d.LOG_LEVELS.DEBUG);var p=150;function h(){window._screenCapturePreviousListener&&chrome.runtime.onMessage.removeListener(window._screenCapturePreviousListener),chrome.runtime.onMessage.addListener(v),window._screenCapturePreviousListener=v}function v(n,t,r){if("scrollPage"===n.msg){try{P(r,n.canvasId,n.opts)}catch(e){W(e)}return!0}"logMessage"===n.msg?c.default.info("[POPUP LOG]",n.data):(0,e.isValidMessage)(n.msg)?c.default.error("Unknown message received from background: "+n.msg):c.default.info("Ignoring message sent by self: "+n.msg)}function P(e,n,t){var r=document.body,o=window.scrollX,s=window.scrollY,u=r&&0===r.offsetHeight||!1;a.default.init(),(m||t.fixed_elts)&&a.default.initFixed();var d=new i.default(t,u,o,s),f=d.getScrollable(),g=!!f.frame;c.default.debug("SCROLLABLE:","isFrame="+g,f),Promise.resolve().then(function(){return f.frame&&0===n?(0,l.default)(d):void 0}).then(function(e){d.addFrameResponse(e),d.calculate(),f.elt&&a.default.hideScrollbarsInner(f.elt),b(d)}).then(function(){return y(d,n)}).then(function(){return c.default.debug("capture response",n)}).then(function(){return e()}).catch(function(e){c.default.error(e),W(e)})}function b(e){if(e.length){var n=e.positions.reduce(function(e,n){return n.scrollY>e.scrollY?n:e}),t=M(n.elt,n.scrollX,n.scrollY);c.default.debug("warmup page:",t),M(n.elt,0,0)}}function y(e,n){return e.positions.length?x(e,n).then(function(t){return t?y(e,n):L(e)}):(L(e),Promise.resolve(!0))}function x(e,o){var i=e.positions.length===e.numPositions,s=e.lastPosition,l=e.popNextPosition(),u=l.scrollX,d=l.scrollY,f=l.yAdjust||0,g={msg:n.default.capture,canvasId:o,complete:(e.numPositions-e.positions.length)/e.numPositions,canvasBg:e.canvasBg,bgRegions:e.bgRegions,windowWidth:e.dimensions.windowWidth,totalWidth:e.dimensions.fullWidth,totalHeight:e.dimensions.fullHeight,devicePixelRatio:window.devicePixelRatio},w=function(n){return(0,r.timeoutWrap)(n,1e4,"page.sendMessage",function(){c.default.warn("Cleanup timeout triggered"),L(e)})};if(l.isFrame)return g.isFrame=!0,w((0,t.sendMessage)(g)).then(function(e){return!!e});if(!l.elt){c.default.error("Missing next.elt!",l);var h=new Error("Missing next.elt! "+l);return h.name="ArrangementsError",Promise.reject(h)}var v=M(l.elt,u,d+f);if(Object.assign(g,{x:v.x,y:v.y-f,clip:l.clip,capture:l.capture}),!e.addedHeightChange&&l.isMain&&s&&0===s.scrollY&&d>0){var P=e.getDimensions(),b=Math.ceil(P.fullHeight-e.dimensions.fullHeight);if(b<0)return e.addPageHeightChange(l,b),x(e,o)}var y=20;return i&&a.default.isMobile()&&(y=500),(0,r.sleep)(y).then(function(){(m||opts.fixed_elts)&&(a.default.updateFixed(e.scrollable.elt,l.isTopOfElt,e.dimensions.nonadjustedFullHeight,e.dimensions.nonadjustedFullWidth,i)&&(e.origWindowX=window.scrollX,e.origWindowY=window.scrollY))}).then(function(){var e=void 0===l.capture.delay?p:l.capture.delay;return(0,r.sleep)(e)}).then(function(){return w((0,t.sendMessage)(g))}).then(function(e){return c.default.debug("sendMessage.callback",!!e),a.default.popAllFixed(),!!e})}function L(e){a.default.popAll(),a.default.popAllFixed(),window.scrollTo(e.origWindowX,e.origWindowY)}function M(e,n,t){if(c.default.debug("scroll via",e,"to ("+n+", "+t+")"),e===document.body){var r=E(window),o=M(window,n,t);if(r.y!==o.y||r.x!==o.x||M.windowWorkedHACK)return M.windowWorkedHACK=!0,o}if(e.scrollTo&&"function"==typeof e.scrollTo?e.scrollTo(n,t):(e.scrollLeft=n,e.scrollTop=t),"dispatchEvent"in e&&"CustomEvent"in window)try{e.dispatchEvent(new CustomEvent("scroll"))}catch(e){c.default.warn("Error triggering custom scroll event",e)}return E(e)}function E(e){return{x:void 0!==e.scrollX?e.scrollX:e.scrollLeft,y:void 0!==e.scrollY?e.scrollY:e.scrollTop}}function W(e){var t={msg:n.default.captureError,name:e?e.name:"unknown",message:e?e.message:"unknown",stack:e?e.stack:"unknown"};try{console.error(JSON.stringify(t))}catch(e){console.error(t)}chrome.runtime.sendMessage(t,function(){})}h();
},{"../messages":2,"../chrome.runtime":4,"../promise":3,"./arrangements":5,"./frame":6,"./styles":7,"./log":8}]},{},[1])