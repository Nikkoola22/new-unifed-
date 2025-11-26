(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))r(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function n(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(i){if(i.ep)return;i.ep=!0;const s=n(i);fetch(i.href,s)}})();var sl={exports:{}},ui={},al={exports:{}},D={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var nr=Symbol.for("react.element"),wd=Symbol.for("react.portal"),Sd=Symbol.for("react.fragment"),Nd=Symbol.for("react.strict_mode"),Ld=Symbol.for("react.profiler"),Cd=Symbol.for("react.provider"),Td=Symbol.for("react.context"),bd=Symbol.for("react.forward_ref"),Ad=Symbol.for("react.suspense"),Rd=Symbol.for("react.memo"),Pd=Symbol.for("react.lazy"),Ba=Symbol.iterator;function qd(e){return e===null||typeof e!="object"?null:(e=Ba&&e[Ba]||e["@@iterator"],typeof e=="function"?e:null)}var ol={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},ll=Object.assign,ul={};function fn(e,t,n){this.props=e,this.context=t,this.refs=ul,this.updater=n||ol}fn.prototype.isReactComponent={};fn.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};fn.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function dl(){}dl.prototype=fn.prototype;function Ws(e,t,n){this.props=e,this.context=t,this.refs=ul,this.updater=n||ol}var Xs=Ws.prototype=new dl;Xs.constructor=Ws;ll(Xs,fn.prototype);Xs.isPureReactComponent=!0;var $a=Array.isArray,cl=Object.prototype.hasOwnProperty,Ks={current:null},pl={key:!0,ref:!0,__self:!0,__source:!0};function ml(e,t,n){var r,i={},s=null,a=null;if(t!=null)for(r in t.ref!==void 0&&(a=t.ref),t.key!==void 0&&(s=""+t.key),t)cl.call(t,r)&&!pl.hasOwnProperty(r)&&(i[r]=t[r]);var l=arguments.length-2;if(l===1)i.children=n;else if(1<l){for(var u=Array(l),p=0;p<l;p++)u[p]=arguments[p+2];i.children=u}if(e&&e.defaultProps)for(r in l=e.defaultProps,l)i[r]===void 0&&(i[r]=l[r]);return{$$typeof:nr,type:e,key:s,ref:a,props:i,_owner:Ks.current}}function Id(e,t){return{$$typeof:nr,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function Ys(e){return typeof e=="object"&&e!==null&&e.$$typeof===nr}function kd(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(n){return t[n]})}var Qa=/\/+/g;function Ci(e,t){return typeof e=="object"&&e!==null&&e.key!=null?kd(""+e.key):t.toString(36)}function Tr(e,t,n,r,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var a=!1;if(e===null)a=!0;else switch(s){case"string":case"number":a=!0;break;case"object":switch(e.$$typeof){case nr:case wd:a=!0}}if(a)return a=e,i=i(a),e=r===""?"."+Ci(a,0):r,$a(i)?(n="",e!=null&&(n=e.replace(Qa,"$&/")+"/"),Tr(i,t,n,"",function(p){return p})):i!=null&&(Ys(i)&&(i=Id(i,n+(!i.key||a&&a.key===i.key?"":(""+i.key).replace(Qa,"$&/")+"/")+e)),t.push(i)),1;if(a=0,r=r===""?".":r+":",$a(e))for(var l=0;l<e.length;l++){s=e[l];var u=r+Ci(s,l);a+=Tr(s,t,n,u,i)}else if(u=qd(e),typeof u=="function")for(e=u.call(e),l=0;!(s=e.next()).done;)s=s.value,u=r+Ci(s,l++),a+=Tr(s,t,n,u,i);else if(s==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return a}function lr(e,t,n){if(e==null)return e;var r=[],i=0;return Tr(e,r,"","",function(s){return t.call(n,s,i++)}),r}function Dd(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(n){(e._status===0||e._status===-1)&&(e._status=1,e._result=n)},function(n){(e._status===0||e._status===-1)&&(e._status=2,e._result=n)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var fe={current:null},br={transition:null},_d={ReactCurrentDispatcher:fe,ReactCurrentBatchConfig:br,ReactCurrentOwner:Ks};function fl(){throw Error("act(...) is not supported in production builds of React.")}D.Children={map:lr,forEach:function(e,t,n){lr(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return lr(e,function(){t++}),t},toArray:function(e){return lr(e,function(t){return t})||[]},only:function(e){if(!Ys(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};D.Component=fn;D.Fragment=Sd;D.Profiler=Ld;D.PureComponent=Ws;D.StrictMode=Nd;D.Suspense=Ad;D.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=_d;D.act=fl;D.cloneElement=function(e,t,n){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var r=ll({},e.props),i=e.key,s=e.ref,a=e._owner;if(t!=null){if(t.ref!==void 0&&(s=t.ref,a=Ks.current),t.key!==void 0&&(i=""+t.key),e.type&&e.type.defaultProps)var l=e.type.defaultProps;for(u in t)cl.call(t,u)&&!pl.hasOwnProperty(u)&&(r[u]=t[u]===void 0&&l!==void 0?l[u]:t[u])}var u=arguments.length-2;if(u===1)r.children=n;else if(1<u){l=Array(u);for(var p=0;p<u;p++)l[p]=arguments[p+2];r.children=l}return{$$typeof:nr,type:e.type,key:i,ref:s,props:r,_owner:a}};D.createContext=function(e){return e={$$typeof:Td,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Cd,_context:e},e.Consumer=e};D.createElement=ml;D.createFactory=function(e){var t=ml.bind(null,e);return t.type=e,t};D.createRef=function(){return{current:null}};D.forwardRef=function(e){return{$$typeof:bd,render:e}};D.isValidElement=Ys;D.lazy=function(e){return{$$typeof:Pd,_payload:{_status:-1,_result:e},_init:Dd}};D.memo=function(e,t){return{$$typeof:Rd,type:e,compare:t===void 0?null:t}};D.startTransition=function(e){var t=br.transition;br.transition={};try{e()}finally{br.transition=t}};D.unstable_act=fl;D.useCallback=function(e,t){return fe.current.useCallback(e,t)};D.useContext=function(e){return fe.current.useContext(e)};D.useDebugValue=function(){};D.useDeferredValue=function(e){return fe.current.useDeferredValue(e)};D.useEffect=function(e,t){return fe.current.useEffect(e,t)};D.useId=function(){return fe.current.useId()};D.useImperativeHandle=function(e,t,n){return fe.current.useImperativeHandle(e,t,n)};D.useInsertionEffect=function(e,t){return fe.current.useInsertionEffect(e,t)};D.useLayoutEffect=function(e,t){return fe.current.useLayoutEffect(e,t)};D.useMemo=function(e,t){return fe.current.useMemo(e,t)};D.useReducer=function(e,t,n){return fe.current.useReducer(e,t,n)};D.useRef=function(e){return fe.current.useRef(e)};D.useState=function(e){return fe.current.useState(e)};D.useSyncExternalStore=function(e,t,n){return fe.current.useSyncExternalStore(e,t,n)};D.useTransition=function(){return fe.current.useTransition()};D.version="18.3.1";al.exports=D;var _=al.exports;/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Od=_,Md=Symbol.for("react.element"),Fd=Symbol.for("react.fragment"),Ud=Object.prototype.hasOwnProperty,zd=Od.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Vd={key:!0,ref:!0,__self:!0,__source:!0};function vl(e,t,n){var r,i={},s=null,a=null;n!==void 0&&(s=""+n),t.key!==void 0&&(s=""+t.key),t.ref!==void 0&&(a=t.ref);for(r in t)Ud.call(t,r)&&!Vd.hasOwnProperty(r)&&(i[r]=t[r]);if(e&&e.defaultProps)for(r in t=e.defaultProps,t)i[r]===void 0&&(i[r]=t[r]);return{$$typeof:Md,type:e,key:s,ref:a,props:i,_owner:zd.current}}ui.Fragment=Fd;ui.jsx=vl;ui.jsxs=vl;sl.exports=ui;var o=sl.exports,gl={exports:{}},Ce={},hl={exports:{}},xl={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function t(j,L){var C=j.length;j.push(L);e:for(;0<C;){var U=C-1>>>1,V=j[U];if(0<i(V,L))j[U]=L,j[C]=V,C=U;else break e}}function n(j){return j.length===0?null:j[0]}function r(j){if(j.length===0)return null;var L=j[0],C=j.pop();if(C!==L){j[0]=C;e:for(var U=0,V=j.length,St=V>>>1;U<St;){var Nt=2*(U+1)-1,Li=j[Nt],Lt=Nt+1,or=j[Lt];if(0>i(Li,C))Lt<V&&0>i(or,Li)?(j[U]=or,j[Lt]=C,U=Lt):(j[U]=Li,j[Nt]=C,U=Nt);else if(Lt<V&&0>i(or,C))j[U]=or,j[Lt]=C,U=Lt;else break e}}return L}function i(j,L){var C=j.sortIndex-L.sortIndex;return C!==0?C:j.id-L.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var a=Date,l=a.now();e.unstable_now=function(){return a.now()-l}}var u=[],p=[],g=1,v=null,f=3,y=!1,E=!1,w=!1,M=typeof setTimeout=="function"?setTimeout:null,c=typeof clearTimeout=="function"?clearTimeout:null,d=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function m(j){for(var L=n(p);L!==null;){if(L.callback===null)r(p);else if(L.startTime<=j)r(p),L.sortIndex=L.expirationTime,t(u,L);else break;L=n(p)}}function h(j){if(w=!1,m(j),!E)if(n(u)!==null)E=!0,B(N);else{var L=n(p);L!==null&&k(h,L.startTime-j)}}function N(j,L){E=!1,w&&(w=!1,c(b),b=-1),y=!0;var C=f;try{for(m(L),v=n(u);v!==null&&(!(v.expirationTime>L)||j&&!Ee());){var U=v.callback;if(typeof U=="function"){v.callback=null,f=v.priorityLevel;var V=U(v.expirationTime<=L);L=e.unstable_now(),typeof V=="function"?v.callback=V:v===n(u)&&r(u),m(L)}else r(u);v=n(u)}if(v!==null)var St=!0;else{var Nt=n(p);Nt!==null&&k(h,Nt.startTime-L),St=!1}return St}finally{v=null,f=C,y=!1}}var R=!1,A=null,b=-1,F=5,I=-1;function Ee(){return!(e.unstable_now()-I<F)}function wt(){if(A!==null){var j=e.unstable_now();I=j;var L=!0;try{L=A(!0,j)}finally{L?S():(R=!1,A=null)}}else R=!1}var S;if(typeof d=="function")S=function(){d(wt)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,q=P.port2;P.port1.onmessage=wt,S=function(){q.postMessage(null)}}else S=function(){M(wt,0)};function B(j){A=j,R||(R=!0,S())}function k(j,L){b=M(function(){j(e.unstable_now())},L)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(j){j.callback=null},e.unstable_continueExecution=function(){E||y||(E=!0,B(N))},e.unstable_forceFrameRate=function(j){0>j||125<j?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):F=0<j?Math.floor(1e3/j):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_getFirstCallbackNode=function(){return n(u)},e.unstable_next=function(j){switch(f){case 1:case 2:case 3:var L=3;break;default:L=f}var C=f;f=L;try{return j()}finally{f=C}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(j,L){switch(j){case 1:case 2:case 3:case 4:case 5:break;default:j=3}var C=f;f=j;try{return L()}finally{f=C}},e.unstable_scheduleCallback=function(j,L,C){var U=e.unstable_now();switch(typeof C=="object"&&C!==null?(C=C.delay,C=typeof C=="number"&&0<C?U+C:U):C=U,j){case 1:var V=-1;break;case 2:V=250;break;case 5:V=1073741823;break;case 4:V=1e4;break;default:V=5e3}return V=C+V,j={id:g++,callback:L,priorityLevel:j,startTime:C,expirationTime:V,sortIndex:-1},C>U?(j.sortIndex=C,t(p,j),n(u)===null&&j===n(p)&&(w?(c(b),b=-1):w=!0,k(h,C-U))):(j.sortIndex=V,t(u,j),E||y||(E=!0,B(N))),j},e.unstable_shouldYield=Ee,e.unstable_wrapCallback=function(j){var L=f;return function(){var C=f;f=L;try{return j.apply(this,arguments)}finally{f=C}}}})(xl);hl.exports=xl;var Hd=hl.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Bd=_,Le=Hd;function x(e){for(var t="https://reactjs.org/docs/error-decoder.html?invariant="+e,n=1;n<arguments.length;n++)t+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+e+"; visit "+t+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var yl=new Set,Fn={};function Mt(e,t){on(e,t),on(e+"Capture",t)}function on(e,t){for(Fn[e]=t,e=0;e<t.length;e++)yl.add(t[e])}var Ke=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ts=Object.prototype.hasOwnProperty,$d=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ga={},Ja={};function Qd(e){return ts.call(Ja,e)?!0:ts.call(Ga,e)?!1:$d.test(e)?Ja[e]=!0:(Ga[e]=!0,!1)}function Gd(e,t,n,r){if(n!==null&&n.type===0)return!1;switch(typeof t){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Jd(e,t,n,r){if(t===null||typeof t>"u"||Gd(e,t,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!t;case 4:return t===!1;case 5:return isNaN(t);case 6:return isNaN(t)||1>t}return!1}function ve(e,t,n,r,i,s,a){this.acceptsBooleans=t===2||t===3||t===4,this.attributeName=r,this.attributeNamespace=i,this.mustUseProperty=n,this.propertyName=e,this.type=t,this.sanitizeURL=s,this.removeEmptyString=a}var oe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){oe[e]=new ve(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var t=e[0];oe[t]=new ve(t,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){oe[e]=new ve(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){oe[e]=new ve(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){oe[e]=new ve(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){oe[e]=new ve(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){oe[e]=new ve(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){oe[e]=new ve(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){oe[e]=new ve(e,5,!1,e.toLowerCase(),null,!1,!1)});var Zs=/[\-:]([a-z])/g;function ea(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var t=e.replace(Zs,ea);oe[t]=new ve(t,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var t=e.replace(Zs,ea);oe[t]=new ve(t,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var t=e.replace(Zs,ea);oe[t]=new ve(t,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){oe[e]=new ve(e,1,!1,e.toLowerCase(),null,!1,!1)});oe.xlinkHref=new ve("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){oe[e]=new ve(e,1,!1,e.toLowerCase(),null,!0,!0)});function ta(e,t,n,r){var i=oe.hasOwnProperty(t)?oe[t]:null;(i!==null?i.type!==0:r||!(2<t.length)||t[0]!=="o"&&t[0]!=="O"||t[1]!=="n"&&t[1]!=="N")&&(Jd(t,n,i,r)&&(n=null),r||i===null?Qd(t)&&(n===null?e.removeAttribute(t):e.setAttribute(t,""+n)):i.mustUseProperty?e[i.propertyName]=n===null?i.type===3?!1:"":n:(t=i.attributeName,r=i.attributeNamespace,n===null?e.removeAttribute(t):(i=i.type,n=i===3||i===4&&n===!0?"":""+n,r?e.setAttributeNS(r,t,n):e.setAttribute(t,n))))}var tt=Bd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,ur=Symbol.for("react.element"),zt=Symbol.for("react.portal"),Vt=Symbol.for("react.fragment"),na=Symbol.for("react.strict_mode"),ns=Symbol.for("react.profiler"),jl=Symbol.for("react.provider"),El=Symbol.for("react.context"),ra=Symbol.for("react.forward_ref"),rs=Symbol.for("react.suspense"),is=Symbol.for("react.suspense_list"),ia=Symbol.for("react.memo"),rt=Symbol.for("react.lazy"),wl=Symbol.for("react.offscreen"),Wa=Symbol.iterator;function hn(e){return e===null||typeof e!="object"?null:(e=Wa&&e[Wa]||e["@@iterator"],typeof e=="function"?e:null)}var K=Object.assign,Ti;function Ln(e){if(Ti===void 0)try{throw Error()}catch(n){var t=n.stack.trim().match(/\n( *(at )?)/);Ti=t&&t[1]||""}return`
`+Ti+e}var bi=!1;function Ai(e,t){if(!e||bi)return"";bi=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(t)if(t=function(){throw Error()},Object.defineProperty(t.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(t,[])}catch(p){var r=p}Reflect.construct(e,[],t)}else{try{t.call()}catch(p){r=p}e.call(t.prototype)}else{try{throw Error()}catch(p){r=p}e()}}catch(p){if(p&&r&&typeof p.stack=="string"){for(var i=p.stack.split(`
`),s=r.stack.split(`
`),a=i.length-1,l=s.length-1;1<=a&&0<=l&&i[a]!==s[l];)l--;for(;1<=a&&0<=l;a--,l--)if(i[a]!==s[l]){if(a!==1||l!==1)do if(a--,l--,0>l||i[a]!==s[l]){var u=`
`+i[a].replace(" at new "," at ");return e.displayName&&u.includes("<anonymous>")&&(u=u.replace("<anonymous>",e.displayName)),u}while(1<=a&&0<=l);break}}}finally{bi=!1,Error.prepareStackTrace=n}return(e=e?e.displayName||e.name:"")?Ln(e):""}function Wd(e){switch(e.tag){case 5:return Ln(e.type);case 16:return Ln("Lazy");case 13:return Ln("Suspense");case 19:return Ln("SuspenseList");case 0:case 2:case 15:return e=Ai(e.type,!1),e;case 11:return e=Ai(e.type.render,!1),e;case 1:return e=Ai(e.type,!0),e;default:return""}}function ss(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case Vt:return"Fragment";case zt:return"Portal";case ns:return"Profiler";case na:return"StrictMode";case rs:return"Suspense";case is:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case El:return(e.displayName||"Context")+".Consumer";case jl:return(e._context.displayName||"Context")+".Provider";case ra:var t=e.render;return e=e.displayName,e||(e=t.displayName||t.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case ia:return t=e.displayName||null,t!==null?t:ss(e.type)||"Memo";case rt:t=e._payload,e=e._init;try{return ss(e(t))}catch{}}return null}function Xd(e){var t=e.type;switch(e.tag){case 24:return"Cache";case 9:return(t.displayName||"Context")+".Consumer";case 10:return(t._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=t.render,e=e.displayName||e.name||"",t.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return t;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ss(t);case 8:return t===na?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t}return null}function ht(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Sl(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(t==="checkbox"||t==="radio")}function Kd(e){var t=Sl(e)?"checked":"value",n=Object.getOwnPropertyDescriptor(e.constructor.prototype,t),r=""+e[t];if(!e.hasOwnProperty(t)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var i=n.get,s=n.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(a){r=""+a,s.call(this,a)}}),Object.defineProperty(e,t,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(a){r=""+a},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function dr(e){e._valueTracker||(e._valueTracker=Kd(e))}function Nl(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r="";return e&&(r=Sl(e)?e.checked?"true":"false":e.value),e=r,e!==n?(t.setValue(e),!0):!1}function Fr(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function as(e,t){var n=t.checked;return K({},t,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??e._wrapperState.initialChecked})}function Xa(e,t){var n=t.defaultValue==null?"":t.defaultValue,r=t.checked!=null?t.checked:t.defaultChecked;n=ht(t.value!=null?t.value:n),e._wrapperState={initialChecked:r,initialValue:n,controlled:t.type==="checkbox"||t.type==="radio"?t.checked!=null:t.value!=null}}function Ll(e,t){t=t.checked,t!=null&&ta(e,"checked",t,!1)}function os(e,t){Ll(e,t);var n=ht(t.value),r=t.type;if(n!=null)r==="number"?(n===0&&e.value===""||e.value!=n)&&(e.value=""+n):e.value!==""+n&&(e.value=""+n);else if(r==="submit"||r==="reset"){e.removeAttribute("value");return}t.hasOwnProperty("value")?ls(e,t.type,n):t.hasOwnProperty("defaultValue")&&ls(e,t.type,ht(t.defaultValue)),t.checked==null&&t.defaultChecked!=null&&(e.defaultChecked=!!t.defaultChecked)}function Ka(e,t,n){if(t.hasOwnProperty("value")||t.hasOwnProperty("defaultValue")){var r=t.type;if(!(r!=="submit"&&r!=="reset"||t.value!==void 0&&t.value!==null))return;t=""+e._wrapperState.initialValue,n||t===e.value||(e.value=t),e.defaultValue=t}n=e.name,n!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,n!==""&&(e.name=n)}function ls(e,t,n){(t!=="number"||Fr(e.ownerDocument)!==e)&&(n==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+n&&(e.defaultValue=""+n))}var Cn=Array.isArray;function Zt(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t["$"+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty("$"+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=""+ht(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function us(e,t){if(t.dangerouslySetInnerHTML!=null)throw Error(x(91));return K({},t,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ya(e,t){var n=t.value;if(n==null){if(n=t.children,t=t.defaultValue,n!=null){if(t!=null)throw Error(x(92));if(Cn(n)){if(1<n.length)throw Error(x(93));n=n[0]}t=n}t==null&&(t=""),n=t}e._wrapperState={initialValue:ht(n)}}function Cl(e,t){var n=ht(t.value),r=ht(t.defaultValue);n!=null&&(n=""+n,n!==e.value&&(e.value=n),t.defaultValue==null&&e.defaultValue!==n&&(e.defaultValue=n)),r!=null&&(e.defaultValue=""+r)}function Za(e){var t=e.textContent;t===e._wrapperState.initialValue&&t!==""&&t!==null&&(e.value=t)}function Tl(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ds(e,t){return e==null||e==="http://www.w3.org/1999/xhtml"?Tl(t):e==="http://www.w3.org/2000/svg"&&t==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var cr,bl=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(t,n,r,i){MSApp.execUnsafeLocalFunction(function(){return e(t,n,r,i)})}:e}(function(e,t){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=t;else{for(cr=cr||document.createElement("div"),cr.innerHTML="<svg>"+t.valueOf().toString()+"</svg>",t=cr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;t.firstChild;)e.appendChild(t.firstChild)}});function Un(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var Rn={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},Yd=["Webkit","ms","Moz","O"];Object.keys(Rn).forEach(function(e){Yd.forEach(function(t){t=t+e.charAt(0).toUpperCase()+e.substring(1),Rn[t]=Rn[e]})});function Al(e,t,n){return t==null||typeof t=="boolean"||t===""?"":n||typeof t!="number"||t===0||Rn.hasOwnProperty(e)&&Rn[e]?(""+t).trim():t+"px"}function Rl(e,t){e=e.style;for(var n in t)if(t.hasOwnProperty(n)){var r=n.indexOf("--")===0,i=Al(n,t[n],r);n==="float"&&(n="cssFloat"),r?e.setProperty(n,i):e[n]=i}}var Zd=K({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function cs(e,t){if(t){if(Zd[e]&&(t.children!=null||t.dangerouslySetInnerHTML!=null))throw Error(x(137,e));if(t.dangerouslySetInnerHTML!=null){if(t.children!=null)throw Error(x(60));if(typeof t.dangerouslySetInnerHTML!="object"||!("__html"in t.dangerouslySetInnerHTML))throw Error(x(61))}if(t.style!=null&&typeof t.style!="object")throw Error(x(62))}}function ps(e,t){if(e.indexOf("-")===-1)return typeof t.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var ms=null;function sa(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var fs=null,en=null,tn=null;function eo(e){if(e=sr(e)){if(typeof fs!="function")throw Error(x(280));var t=e.stateNode;t&&(t=fi(t),fs(e.stateNode,e.type,t))}}function Pl(e){en?tn?tn.push(e):tn=[e]:en=e}function ql(){if(en){var e=en,t=tn;if(tn=en=null,eo(e),t)for(e=0;e<t.length;e++)eo(t[e])}}function Il(e,t){return e(t)}function kl(){}var Ri=!1;function Dl(e,t,n){if(Ri)return e(t,n);Ri=!0;try{return Il(e,t,n)}finally{Ri=!1,(en!==null||tn!==null)&&(kl(),ql())}}function zn(e,t){var n=e.stateNode;if(n===null)return null;var r=fi(n);if(r===null)return null;n=r[t];e:switch(t){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(e=e.type,r=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!r;break e;default:e=!1}if(e)return null;if(n&&typeof n!="function")throw Error(x(231,t,typeof n));return n}var vs=!1;if(Ke)try{var xn={};Object.defineProperty(xn,"passive",{get:function(){vs=!0}}),window.addEventListener("test",xn,xn),window.removeEventListener("test",xn,xn)}catch{vs=!1}function ec(e,t,n,r,i,s,a,l,u){var p=Array.prototype.slice.call(arguments,3);try{t.apply(n,p)}catch(g){this.onError(g)}}var Pn=!1,Ur=null,zr=!1,gs=null,tc={onError:function(e){Pn=!0,Ur=e}};function nc(e,t,n,r,i,s,a,l,u){Pn=!1,Ur=null,ec.apply(tc,arguments)}function rc(e,t,n,r,i,s,a,l,u){if(nc.apply(this,arguments),Pn){if(Pn){var p=Ur;Pn=!1,Ur=null}else throw Error(x(198));zr||(zr=!0,gs=p)}}function Ft(e){var t=e,n=e;if(e.alternate)for(;t.return;)t=t.return;else{e=t;do t=e,t.flags&4098&&(n=t.return),e=t.return;while(e)}return t.tag===3?n:null}function _l(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function to(e){if(Ft(e)!==e)throw Error(x(188))}function ic(e){var t=e.alternate;if(!t){if(t=Ft(e),t===null)throw Error(x(188));return t!==e?null:e}for(var n=e,r=t;;){var i=n.return;if(i===null)break;var s=i.alternate;if(s===null){if(r=i.return,r!==null){n=r;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===n)return to(i),e;if(s===r)return to(i),t;s=s.sibling}throw Error(x(188))}if(n.return!==r.return)n=i,r=s;else{for(var a=!1,l=i.child;l;){if(l===n){a=!0,n=i,r=s;break}if(l===r){a=!0,r=i,n=s;break}l=l.sibling}if(!a){for(l=s.child;l;){if(l===n){a=!0,n=s,r=i;break}if(l===r){a=!0,r=s,n=i;break}l=l.sibling}if(!a)throw Error(x(189))}}if(n.alternate!==r)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?e:t}function Ol(e){return e=ic(e),e!==null?Ml(e):null}function Ml(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var t=Ml(e);if(t!==null)return t;e=e.sibling}return null}var Fl=Le.unstable_scheduleCallback,no=Le.unstable_cancelCallback,sc=Le.unstable_shouldYield,ac=Le.unstable_requestPaint,Z=Le.unstable_now,oc=Le.unstable_getCurrentPriorityLevel,aa=Le.unstable_ImmediatePriority,Ul=Le.unstable_UserBlockingPriority,Vr=Le.unstable_NormalPriority,lc=Le.unstable_LowPriority,zl=Le.unstable_IdlePriority,di=null,Be=null;function uc(e){if(Be&&typeof Be.onCommitFiberRoot=="function")try{Be.onCommitFiberRoot(di,e,void 0,(e.current.flags&128)===128)}catch{}}var Me=Math.clz32?Math.clz32:pc,dc=Math.log,cc=Math.LN2;function pc(e){return e>>>=0,e===0?32:31-(dc(e)/cc|0)|0}var pr=64,mr=4194304;function Tn(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function Hr(e,t){var n=e.pendingLanes;if(n===0)return 0;var r=0,i=e.suspendedLanes,s=e.pingedLanes,a=n&268435455;if(a!==0){var l=a&~i;l!==0?r=Tn(l):(s&=a,s!==0&&(r=Tn(s)))}else a=n&~i,a!==0?r=Tn(a):s!==0&&(r=Tn(s));if(r===0)return 0;if(t!==0&&t!==r&&!(t&i)&&(i=r&-r,s=t&-t,i>=s||i===16&&(s&4194240)!==0))return t;if(r&4&&(r|=n&16),t=e.entangledLanes,t!==0)for(e=e.entanglements,t&=r;0<t;)n=31-Me(t),i=1<<n,r|=e[n],t&=~i;return r}function mc(e,t){switch(e){case 1:case 2:case 4:return t+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function fc(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var a=31-Me(s),l=1<<a,u=i[a];u===-1?(!(l&n)||l&r)&&(i[a]=mc(l,t)):u<=t&&(e.expiredLanes|=l),s&=~l}}function hs(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Vl(){var e=pr;return pr<<=1,!(pr&4194240)&&(pr=64),e}function Pi(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function rr(e,t,n){e.pendingLanes|=t,t!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,t=31-Me(t),e[t]=n}function vc(e,t){var n=e.pendingLanes&~t;e.pendingLanes=t,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=t,e.mutableReadLanes&=t,e.entangledLanes&=t,t=e.entanglements;var r=e.eventTimes;for(e=e.expirationTimes;0<n;){var i=31-Me(n),s=1<<i;t[i]=0,r[i]=-1,e[i]=-1,n&=~s}}function oa(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-Me(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}var z=0;function Hl(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Bl,la,$l,Ql,Gl,xs=!1,fr=[],ut=null,dt=null,ct=null,Vn=new Map,Hn=new Map,st=[],gc="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ro(e,t){switch(e){case"focusin":case"focusout":ut=null;break;case"dragenter":case"dragleave":dt=null;break;case"mouseover":case"mouseout":ct=null;break;case"pointerover":case"pointerout":Vn.delete(t.pointerId);break;case"gotpointercapture":case"lostpointercapture":Hn.delete(t.pointerId)}}function yn(e,t,n,r,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:s,targetContainers:[i]},t!==null&&(t=sr(t),t!==null&&la(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function hc(e,t,n,r,i){switch(t){case"focusin":return ut=yn(ut,e,t,n,r,i),!0;case"dragenter":return dt=yn(dt,e,t,n,r,i),!0;case"mouseover":return ct=yn(ct,e,t,n,r,i),!0;case"pointerover":var s=i.pointerId;return Vn.set(s,yn(Vn.get(s)||null,e,t,n,r,i)),!0;case"gotpointercapture":return s=i.pointerId,Hn.set(s,yn(Hn.get(s)||null,e,t,n,r,i)),!0}return!1}function Jl(e){var t=bt(e.target);if(t!==null){var n=Ft(t);if(n!==null){if(t=n.tag,t===13){if(t=_l(n),t!==null){e.blockedOn=t,Gl(e.priority,function(){$l(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ar(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=ys(e.domEventName,e.eventSystemFlags,t[0],e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);ms=r,n.target.dispatchEvent(r),ms=null}else return t=sr(n),t!==null&&la(t),e.blockedOn=n,!1;t.shift()}return!0}function io(e,t,n){Ar(e)&&n.delete(t)}function xc(){xs=!1,ut!==null&&Ar(ut)&&(ut=null),dt!==null&&Ar(dt)&&(dt=null),ct!==null&&Ar(ct)&&(ct=null),Vn.forEach(io),Hn.forEach(io)}function jn(e,t){e.blockedOn===t&&(e.blockedOn=null,xs||(xs=!0,Le.unstable_scheduleCallback(Le.unstable_NormalPriority,xc)))}function Bn(e){function t(i){return jn(i,e)}if(0<fr.length){jn(fr[0],e);for(var n=1;n<fr.length;n++){var r=fr[n];r.blockedOn===e&&(r.blockedOn=null)}}for(ut!==null&&jn(ut,e),dt!==null&&jn(dt,e),ct!==null&&jn(ct,e),Vn.forEach(t),Hn.forEach(t),n=0;n<st.length;n++)r=st[n],r.blockedOn===e&&(r.blockedOn=null);for(;0<st.length&&(n=st[0],n.blockedOn===null);)Jl(n),n.blockedOn===null&&st.shift()}var nn=tt.ReactCurrentBatchConfig,Br=!0;function yc(e,t,n,r){var i=z,s=nn.transition;nn.transition=null;try{z=1,ua(e,t,n,r)}finally{z=i,nn.transition=s}}function jc(e,t,n,r){var i=z,s=nn.transition;nn.transition=null;try{z=4,ua(e,t,n,r)}finally{z=i,nn.transition=s}}function ua(e,t,n,r){if(Br){var i=ys(e,t,n,r);if(i===null)zi(e,t,r,$r,n),ro(e,r);else if(hc(i,e,t,n,r))r.stopPropagation();else if(ro(e,r),t&4&&-1<gc.indexOf(e)){for(;i!==null;){var s=sr(i);if(s!==null&&Bl(s),s=ys(e,t,n,r),s===null&&zi(e,t,r,$r,n),s===i)break;i=s}i!==null&&r.stopPropagation()}else zi(e,t,r,null,n)}}var $r=null;function ys(e,t,n,r){if($r=null,e=sa(r),e=bt(e),e!==null)if(t=Ft(e),t===null)e=null;else if(n=t.tag,n===13){if(e=_l(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null);return $r=e,null}function Wl(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(oc()){case aa:return 1;case Ul:return 4;case Vr:case lc:return 16;case zl:return 536870912;default:return 16}default:return 16}}var ot=null,da=null,Rr=null;function Xl(){if(Rr)return Rr;var e,t=da,n=t.length,r,i="value"in ot?ot.value:ot.textContent,s=i.length;for(e=0;e<n&&t[e]===i[e];e++);var a=n-e;for(r=1;r<=a&&t[n-r]===i[s-r];r++);return Rr=i.slice(e,1<r?1-r:void 0)}function Pr(e){var t=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function vr(){return!0}function so(){return!1}function Te(e){function t(n,r,i,s,a){this._reactName=n,this._targetInst=i,this.type=r,this.nativeEvent=s,this.target=a,this.currentTarget=null;for(var l in e)e.hasOwnProperty(l)&&(n=e[l],this[l]=n?n(s):s[l]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?vr:so,this.isPropagationStopped=so,this}return K(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=vr)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=vr)},persist:function(){},isPersistent:vr}),t}var vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},ca=Te(vn),ir=K({},vn,{view:0,detail:0}),Ec=Te(ir),qi,Ii,En,ci=K({},ir,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:pa,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==En&&(En&&e.type==="mousemove"?(qi=e.screenX-En.screenX,Ii=e.screenY-En.screenY):Ii=qi=0,En=e),qi)},movementY:function(e){return"movementY"in e?e.movementY:Ii}}),ao=Te(ci),wc=K({},ci,{dataTransfer:0}),Sc=Te(wc),Nc=K({},ir,{relatedTarget:0}),ki=Te(Nc),Lc=K({},vn,{animationName:0,elapsedTime:0,pseudoElement:0}),Cc=Te(Lc),Tc=K({},vn,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),bc=Te(Tc),Ac=K({},vn,{data:0}),oo=Te(Ac),Rc={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Pc={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},qc={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Ic(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=qc[e])?!!t[e]:!1}function pa(){return Ic}var kc=K({},ir,{key:function(e){if(e.key){var t=Rc[e.key]||e.key;if(t!=="Unidentified")return t}return e.type==="keypress"?(e=Pr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Pc[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:pa,charCode:function(e){return e.type==="keypress"?Pr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Pr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Dc=Te(kc),_c=K({},ci,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),lo=Te(_c),Oc=K({},ir,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:pa}),Mc=Te(Oc),Fc=K({},vn,{propertyName:0,elapsedTime:0,pseudoElement:0}),Uc=Te(Fc),zc=K({},ci,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Vc=Te(zc),Hc=[9,13,27,32],ma=Ke&&"CompositionEvent"in window,qn=null;Ke&&"documentMode"in document&&(qn=document.documentMode);var Bc=Ke&&"TextEvent"in window&&!qn,Kl=Ke&&(!ma||qn&&8<qn&&11>=qn),uo=" ",co=!1;function Yl(e,t){switch(e){case"keyup":return Hc.indexOf(t.keyCode)!==-1;case"keydown":return t.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function Zl(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var Ht=!1;function $c(e,t){switch(e){case"compositionend":return Zl(t);case"keypress":return t.which!==32?null:(co=!0,uo);case"textInput":return e=t.data,e===uo&&co?null:e;default:return null}}function Qc(e,t){if(Ht)return e==="compositionend"||!ma&&Yl(e,t)?(e=Xl(),Rr=da=ot=null,Ht=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case"compositionend":return Kl&&t.locale!=="ko"?null:t.data;default:return null}}var Gc={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function po(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t==="input"?!!Gc[e.type]:t==="textarea"}function eu(e,t,n,r){Pl(r),t=Qr(t,"onChange"),0<t.length&&(n=new ca("onChange","change",null,n,r),e.push({event:n,listeners:t}))}var In=null,$n=null;function Jc(e){cu(e,0)}function pi(e){var t=Qt(e);if(Nl(t))return e}function Wc(e,t){if(e==="change")return t}var tu=!1;if(Ke){var Di;if(Ke){var _i="oninput"in document;if(!_i){var mo=document.createElement("div");mo.setAttribute("oninput","return;"),_i=typeof mo.oninput=="function"}Di=_i}else Di=!1;tu=Di&&(!document.documentMode||9<document.documentMode)}function fo(){In&&(In.detachEvent("onpropertychange",nu),$n=In=null)}function nu(e){if(e.propertyName==="value"&&pi($n)){var t=[];eu(t,$n,e,sa(e)),Dl(Jc,t)}}function Xc(e,t,n){e==="focusin"?(fo(),In=t,$n=n,In.attachEvent("onpropertychange",nu)):e==="focusout"&&fo()}function Kc(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return pi($n)}function Yc(e,t){if(e==="click")return pi(t)}function Zc(e,t){if(e==="input"||e==="change")return pi(t)}function ep(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var Ue=typeof Object.is=="function"?Object.is:ep;function Qn(e,t){if(Ue(e,t))return!0;if(typeof e!="object"||e===null||typeof t!="object"||t===null)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!ts.call(t,i)||!Ue(e[i],t[i]))return!1}return!0}function vo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function go(e,t){var n=vo(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=vo(n)}}function ru(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?ru(e,t.parentNode):"contains"in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function iu(){for(var e=window,t=Fr();t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href=="string"}catch{n=!1}if(n)e=t.contentWindow;else break;t=Fr(e.document)}return t}function fa(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||t==="textarea"||e.contentEditable==="true")}function tp(e){var t=iu(),n=e.focusedElem,r=e.selectionRange;if(t!==n&&n&&n.ownerDocument&&ru(n.ownerDocument.documentElement,n)){if(r!==null&&fa(n)){if(t=r.start,e=r.end,e===void 0&&(e=t),"selectionStart"in n)n.selectionStart=t,n.selectionEnd=Math.min(e,n.value.length);else if(e=(t=n.ownerDocument||document)&&t.defaultView||window,e.getSelection){e=e.getSelection();var i=n.textContent.length,s=Math.min(r.start,i);r=r.end===void 0?s:Math.min(r.end,i),!e.extend&&s>r&&(i=r,r=s,s=i),i=go(n,s);var a=go(n,r);i&&a&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==a.node||e.focusOffset!==a.offset)&&(t=t.createRange(),t.setStart(i.node,i.offset),e.removeAllRanges(),s>r?(e.addRange(t),e.extend(a.node,a.offset)):(t.setEnd(a.node,a.offset),e.addRange(t)))}}for(t=[],e=n;e=e.parentNode;)e.nodeType===1&&t.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<t.length;n++)e=t[n],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var np=Ke&&"documentMode"in document&&11>=document.documentMode,Bt=null,js=null,kn=null,Es=!1;function ho(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Es||Bt==null||Bt!==Fr(r)||(r=Bt,"selectionStart"in r&&fa(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),kn&&Qn(kn,r)||(kn=r,r=Qr(js,"onSelect"),0<r.length&&(t=new ca("onSelect","select",null,t,n),e.push({event:t,listeners:r}),t.target=Bt)))}function gr(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n["Webkit"+e]="webkit"+t,n["Moz"+e]="moz"+t,n}var $t={animationend:gr("Animation","AnimationEnd"),animationiteration:gr("Animation","AnimationIteration"),animationstart:gr("Animation","AnimationStart"),transitionend:gr("Transition","TransitionEnd")},Oi={},su={};Ke&&(su=document.createElement("div").style,"AnimationEvent"in window||(delete $t.animationend.animation,delete $t.animationiteration.animation,delete $t.animationstart.animation),"TransitionEvent"in window||delete $t.transitionend.transition);function mi(e){if(Oi[e])return Oi[e];if(!$t[e])return e;var t=$t[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in su)return Oi[e]=t[n];return e}var au=mi("animationend"),ou=mi("animationiteration"),lu=mi("animationstart"),uu=mi("transitionend"),du=new Map,xo="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yt(e,t){du.set(e,t),Mt(t,[e])}for(var Mi=0;Mi<xo.length;Mi++){var Fi=xo[Mi],rp=Fi.toLowerCase(),ip=Fi[0].toUpperCase()+Fi.slice(1);yt(rp,"on"+ip)}yt(au,"onAnimationEnd");yt(ou,"onAnimationIteration");yt(lu,"onAnimationStart");yt("dblclick","onDoubleClick");yt("focusin","onFocus");yt("focusout","onBlur");yt(uu,"onTransitionEnd");on("onMouseEnter",["mouseout","mouseover"]);on("onMouseLeave",["mouseout","mouseover"]);on("onPointerEnter",["pointerout","pointerover"]);on("onPointerLeave",["pointerout","pointerover"]);Mt("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Mt("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Mt("onBeforeInput",["compositionend","keypress","textInput","paste"]);Mt("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Mt("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Mt("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var bn="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),sp=new Set("cancel close invalid load scroll toggle".split(" ").concat(bn));function yo(e,t,n){var r=e.type||"unknown-event";e.currentTarget=n,rc(r,t,void 0,e),e.currentTarget=null}function cu(e,t){t=(t&4)!==0;for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;e:{var s=void 0;if(t)for(var a=r.length-1;0<=a;a--){var l=r[a],u=l.instance,p=l.currentTarget;if(l=l.listener,u!==s&&i.isPropagationStopped())break e;yo(i,l,p),s=u}else for(a=0;a<r.length;a++){if(l=r[a],u=l.instance,p=l.currentTarget,l=l.listener,u!==s&&i.isPropagationStopped())break e;yo(i,l,p),s=u}}}if(zr)throw e=gs,zr=!1,gs=null,e}function $(e,t){var n=t[Cs];n===void 0&&(n=t[Cs]=new Set);var r=e+"__bubble";n.has(r)||(pu(t,e,2,!1),n.add(r))}function Ui(e,t,n){var r=0;t&&(r|=4),pu(n,e,r,t)}var hr="_reactListening"+Math.random().toString(36).slice(2);function Gn(e){if(!e[hr]){e[hr]=!0,yl.forEach(function(n){n!=="selectionchange"&&(sp.has(n)||Ui(n,!1,e),Ui(n,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[hr]||(t[hr]=!0,Ui("selectionchange",!1,t))}}function pu(e,t,n,r){switch(Wl(t)){case 1:var i=yc;break;case 4:i=jc;break;default:i=ua}n=i.bind(null,t,n,e),i=void 0,!vs||t!=="touchstart"&&t!=="touchmove"&&t!=="wheel"||(i=!0),r?i!==void 0?e.addEventListener(t,n,{capture:!0,passive:i}):e.addEventListener(t,n,!0):i!==void 0?e.addEventListener(t,n,{passive:i}):e.addEventListener(t,n,!1)}function zi(e,t,n,r,i){var s=r;if(!(t&1)&&!(t&2)&&r!==null)e:for(;;){if(r===null)return;var a=r.tag;if(a===3||a===4){var l=r.stateNode.containerInfo;if(l===i||l.nodeType===8&&l.parentNode===i)break;if(a===4)for(a=r.return;a!==null;){var u=a.tag;if((u===3||u===4)&&(u=a.stateNode.containerInfo,u===i||u.nodeType===8&&u.parentNode===i))return;a=a.return}for(;l!==null;){if(a=bt(l),a===null)return;if(u=a.tag,u===5||u===6){r=s=a;continue e}l=l.parentNode}}r=r.return}Dl(function(){var p=s,g=sa(n),v=[];e:{var f=du.get(e);if(f!==void 0){var y=ca,E=e;switch(e){case"keypress":if(Pr(n)===0)break e;case"keydown":case"keyup":y=Dc;break;case"focusin":E="focus",y=ki;break;case"focusout":E="blur",y=ki;break;case"beforeblur":case"afterblur":y=ki;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=ao;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Sc;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Mc;break;case au:case ou:case lu:y=Cc;break;case uu:y=Uc;break;case"scroll":y=Ec;break;case"wheel":y=Vc;break;case"copy":case"cut":case"paste":y=bc;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=lo}var w=(t&4)!==0,M=!w&&e==="scroll",c=w?f!==null?f+"Capture":null:f;w=[];for(var d=p,m;d!==null;){m=d;var h=m.stateNode;if(m.tag===5&&h!==null&&(m=h,c!==null&&(h=zn(d,c),h!=null&&w.push(Jn(d,h,m)))),M)break;d=d.return}0<w.length&&(f=new y(f,E,null,n,g),v.push({event:f,listeners:w}))}}if(!(t&7)){e:{if(f=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",f&&n!==ms&&(E=n.relatedTarget||n.fromElement)&&(bt(E)||E[Ye]))break e;if((y||f)&&(f=g.window===g?g:(f=g.ownerDocument)?f.defaultView||f.parentWindow:window,y?(E=n.relatedTarget||n.toElement,y=p,E=E?bt(E):null,E!==null&&(M=Ft(E),E!==M||E.tag!==5&&E.tag!==6)&&(E=null)):(y=null,E=p),y!==E)){if(w=ao,h="onMouseLeave",c="onMouseEnter",d="mouse",(e==="pointerout"||e==="pointerover")&&(w=lo,h="onPointerLeave",c="onPointerEnter",d="pointer"),M=y==null?f:Qt(y),m=E==null?f:Qt(E),f=new w(h,d+"leave",y,n,g),f.target=M,f.relatedTarget=m,h=null,bt(g)===p&&(w=new w(c,d+"enter",E,n,g),w.target=m,w.relatedTarget=M,h=w),M=h,y&&E)t:{for(w=y,c=E,d=0,m=w;m;m=Ut(m))d++;for(m=0,h=c;h;h=Ut(h))m++;for(;0<d-m;)w=Ut(w),d--;for(;0<m-d;)c=Ut(c),m--;for(;d--;){if(w===c||c!==null&&w===c.alternate)break t;w=Ut(w),c=Ut(c)}w=null}else w=null;y!==null&&jo(v,f,y,w,!1),E!==null&&M!==null&&jo(v,M,E,w,!0)}}e:{if(f=p?Qt(p):window,y=f.nodeName&&f.nodeName.toLowerCase(),y==="select"||y==="input"&&f.type==="file")var N=Wc;else if(po(f))if(tu)N=Zc;else{N=Kc;var R=Xc}else(y=f.nodeName)&&y.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(N=Yc);if(N&&(N=N(e,p))){eu(v,N,n,g);break e}R&&R(e,f,p),e==="focusout"&&(R=f._wrapperState)&&R.controlled&&f.type==="number"&&ls(f,"number",f.value)}switch(R=p?Qt(p):window,e){case"focusin":(po(R)||R.contentEditable==="true")&&(Bt=R,js=p,kn=null);break;case"focusout":kn=js=Bt=null;break;case"mousedown":Es=!0;break;case"contextmenu":case"mouseup":case"dragend":Es=!1,ho(v,n,g);break;case"selectionchange":if(np)break;case"keydown":case"keyup":ho(v,n,g)}var A;if(ma)e:{switch(e){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else Ht?Yl(e,n)&&(b="onCompositionEnd"):e==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(Kl&&n.locale!=="ko"&&(Ht||b!=="onCompositionStart"?b==="onCompositionEnd"&&Ht&&(A=Xl()):(ot=g,da="value"in ot?ot.value:ot.textContent,Ht=!0)),R=Qr(p,b),0<R.length&&(b=new oo(b,e,null,n,g),v.push({event:b,listeners:R}),A?b.data=A:(A=Zl(n),A!==null&&(b.data=A)))),(A=Bc?$c(e,n):Qc(e,n))&&(p=Qr(p,"onBeforeInput"),0<p.length&&(g=new oo("onBeforeInput","beforeinput",null,n,g),v.push({event:g,listeners:p}),g.data=A))}cu(v,t)})}function Jn(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Qr(e,t){for(var n=t+"Capture",r=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=zn(e,n),s!=null&&r.unshift(Jn(e,s,i)),s=zn(e,t),s!=null&&r.push(Jn(e,s,i))),e=e.return}return r}function Ut(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function jo(e,t,n,r,i){for(var s=t._reactName,a=[];n!==null&&n!==r;){var l=n,u=l.alternate,p=l.stateNode;if(u!==null&&u===r)break;l.tag===5&&p!==null&&(l=p,i?(u=zn(n,s),u!=null&&a.unshift(Jn(n,u,l))):i||(u=zn(n,s),u!=null&&a.push(Jn(n,u,l)))),n=n.return}a.length!==0&&e.push({event:t,listeners:a})}var ap=/\r\n?/g,op=/\u0000|\uFFFD/g;function Eo(e){return(typeof e=="string"?e:""+e).replace(ap,`
`).replace(op,"")}function xr(e,t,n){if(t=Eo(t),Eo(e)!==t&&n)throw Error(x(425))}function Gr(){}var ws=null,Ss=null;function Ns(e,t){return e==="textarea"||e==="noscript"||typeof t.children=="string"||typeof t.children=="number"||typeof t.dangerouslySetInnerHTML=="object"&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var Ls=typeof setTimeout=="function"?setTimeout:void 0,lp=typeof clearTimeout=="function"?clearTimeout:void 0,wo=typeof Promise=="function"?Promise:void 0,up=typeof queueMicrotask=="function"?queueMicrotask:typeof wo<"u"?function(e){return wo.resolve(null).then(e).catch(dp)}:Ls;function dp(e){setTimeout(function(){throw e})}function Vi(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8)if(n=i.data,n==="/$"){if(r===0){e.removeChild(i),Bn(t);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=i}while(n);Bn(t)}function pt(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t==="$"||t==="$!"||t==="$?")break;if(t==="/$")return null}}return e}function So(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="$"||n==="$!"||n==="$?"){if(t===0)return e;t--}else n==="/$"&&t++}e=e.previousSibling}return null}var gn=Math.random().toString(36).slice(2),He="__reactFiber$"+gn,Wn="__reactProps$"+gn,Ye="__reactContainer$"+gn,Cs="__reactEvents$"+gn,cp="__reactListeners$"+gn,pp="__reactHandles$"+gn;function bt(e){var t=e[He];if(t)return t;for(var n=e.parentNode;n;){if(t=n[Ye]||n[He]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=So(e);e!==null;){if(n=e[He])return n;e=So(e)}return t}e=n,n=e.parentNode}return null}function sr(e){return e=e[He]||e[Ye],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function Qt(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(x(33))}function fi(e){return e[Wn]||null}var Ts=[],Gt=-1;function jt(e){return{current:e}}function Q(e){0>Gt||(e.current=Ts[Gt],Ts[Gt]=null,Gt--)}function H(e,t){Gt++,Ts[Gt]=e.current,e.current=t}var xt={},ce=jt(xt),xe=jt(!1),It=xt;function ln(e,t){var n=e.type.contextTypes;if(!n)return xt;var r=e.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===t)return r.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in n)i[s]=t[s];return r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=t,e.__reactInternalMemoizedMaskedChildContext=i),i}function ye(e){return e=e.childContextTypes,e!=null}function Jr(){Q(xe),Q(ce)}function No(e,t,n){if(ce.current!==xt)throw Error(x(168));H(ce,t),H(xe,n)}function mu(e,t,n){var r=e.stateNode;if(t=t.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var i in r)if(!(i in t))throw Error(x(108,Xd(e)||"Unknown",i));return K({},n,r)}function Wr(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||xt,It=ce.current,H(ce,e),H(xe,xe.current),!0}function Lo(e,t,n){var r=e.stateNode;if(!r)throw Error(x(169));n?(e=mu(e,t,It),r.__reactInternalMemoizedMergedChildContext=e,Q(xe),Q(ce),H(ce,e)):Q(xe),H(xe,n)}var Ge=null,vi=!1,Hi=!1;function fu(e){Ge===null?Ge=[e]:Ge.push(e)}function mp(e){vi=!0,fu(e)}function Et(){if(!Hi&&Ge!==null){Hi=!0;var e=0,t=z;try{var n=Ge;for(z=1;e<n.length;e++){var r=n[e];do r=r(!0);while(r!==null)}Ge=null,vi=!1}catch(i){throw Ge!==null&&(Ge=Ge.slice(e+1)),Fl(aa,Et),i}finally{z=t,Hi=!1}}return null}var Jt=[],Wt=0,Xr=null,Kr=0,be=[],Ae=0,kt=null,Je=1,We="";function Ct(e,t){Jt[Wt++]=Kr,Jt[Wt++]=Xr,Xr=e,Kr=t}function vu(e,t,n){be[Ae++]=Je,be[Ae++]=We,be[Ae++]=kt,kt=e;var r=Je;e=We;var i=32-Me(r)-1;r&=~(1<<i),n+=1;var s=32-Me(t)+i;if(30<s){var a=i-i%5;s=(r&(1<<a)-1).toString(32),r>>=a,i-=a,Je=1<<32-Me(t)+i|n<<i|r,We=s+e}else Je=1<<s|n<<i|r,We=e}function va(e){e.return!==null&&(Ct(e,1),vu(e,1,0))}function ga(e){for(;e===Xr;)Xr=Jt[--Wt],Jt[Wt]=null,Kr=Jt[--Wt],Jt[Wt]=null;for(;e===kt;)kt=be[--Ae],be[Ae]=null,We=be[--Ae],be[Ae]=null,Je=be[--Ae],be[Ae]=null}var Ne=null,Se=null,G=!1,Oe=null;function gu(e,t){var n=Re(5,null,null,0);n.elementType="DELETED",n.stateNode=t,n.return=e,t=e.deletions,t===null?(e.deletions=[n],e.flags|=16):t.push(n)}function Co(e,t){switch(e.tag){case 5:var n=e.type;return t=t.nodeType!==1||n.toLowerCase()!==t.nodeName.toLowerCase()?null:t,t!==null?(e.stateNode=t,Ne=e,Se=pt(t.firstChild),!0):!1;case 6:return t=e.pendingProps===""||t.nodeType!==3?null:t,t!==null?(e.stateNode=t,Ne=e,Se=null,!0):!1;case 13:return t=t.nodeType!==8?null:t,t!==null?(n=kt!==null?{id:Je,overflow:We}:null,e.memoizedState={dehydrated:t,treeContext:n,retryLane:1073741824},n=Re(18,null,null,0),n.stateNode=t,n.return=e,e.child=n,Ne=e,Se=null,!0):!1;default:return!1}}function bs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function As(e){if(G){var t=Se;if(t){var n=t;if(!Co(e,t)){if(bs(e))throw Error(x(418));t=pt(n.nextSibling);var r=Ne;t&&Co(e,t)?gu(r,n):(e.flags=e.flags&-4097|2,G=!1,Ne=e)}}else{if(bs(e))throw Error(x(418));e.flags=e.flags&-4097|2,G=!1,Ne=e}}}function To(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;Ne=e}function yr(e){if(e!==Ne)return!1;if(!G)return To(e),G=!0,!1;var t;if((t=e.tag!==3)&&!(t=e.tag!==5)&&(t=e.type,t=t!=="head"&&t!=="body"&&!Ns(e.type,e.memoizedProps)),t&&(t=Se)){if(bs(e))throw hu(),Error(x(418));for(;t;)gu(e,t),t=pt(t.nextSibling)}if(To(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(x(317));e:{for(e=e.nextSibling,t=0;e;){if(e.nodeType===8){var n=e.data;if(n==="/$"){if(t===0){Se=pt(e.nextSibling);break e}t--}else n!=="$"&&n!=="$!"&&n!=="$?"||t++}e=e.nextSibling}Se=null}}else Se=Ne?pt(e.stateNode.nextSibling):null;return!0}function hu(){for(var e=Se;e;)e=pt(e.nextSibling)}function un(){Se=Ne=null,G=!1}function ha(e){Oe===null?Oe=[e]:Oe.push(e)}var fp=tt.ReactCurrentBatchConfig;function wn(e,t,n){if(e=n.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(x(309));var r=n.stateNode}if(!r)throw Error(x(147,e));var i=r,s=""+e;return t!==null&&t.ref!==null&&typeof t.ref=="function"&&t.ref._stringRef===s?t.ref:(t=function(a){var l=i.refs;a===null?delete l[s]:l[s]=a},t._stringRef=s,t)}if(typeof e!="string")throw Error(x(284));if(!n._owner)throw Error(x(290,e))}return e}function jr(e,t){throw e=Object.prototype.toString.call(t),Error(x(31,e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e))}function bo(e){var t=e._init;return t(e._payload)}function xu(e){function t(c,d){if(e){var m=c.deletions;m===null?(c.deletions=[d],c.flags|=16):m.push(d)}}function n(c,d){if(!e)return null;for(;d!==null;)t(c,d),d=d.sibling;return null}function r(c,d){for(c=new Map;d!==null;)d.key!==null?c.set(d.key,d):c.set(d.index,d),d=d.sibling;return c}function i(c,d){return c=gt(c,d),c.index=0,c.sibling=null,c}function s(c,d,m){return c.index=m,e?(m=c.alternate,m!==null?(m=m.index,m<d?(c.flags|=2,d):m):(c.flags|=2,d)):(c.flags|=1048576,d)}function a(c){return e&&c.alternate===null&&(c.flags|=2),c}function l(c,d,m,h){return d===null||d.tag!==6?(d=Xi(m,c.mode,h),d.return=c,d):(d=i(d,m),d.return=c,d)}function u(c,d,m,h){var N=m.type;return N===Vt?g(c,d,m.props.children,h,m.key):d!==null&&(d.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===rt&&bo(N)===d.type)?(h=i(d,m.props),h.ref=wn(c,d,m),h.return=c,h):(h=Mr(m.type,m.key,m.props,null,c.mode,h),h.ref=wn(c,d,m),h.return=c,h)}function p(c,d,m,h){return d===null||d.tag!==4||d.stateNode.containerInfo!==m.containerInfo||d.stateNode.implementation!==m.implementation?(d=Ki(m,c.mode,h),d.return=c,d):(d=i(d,m.children||[]),d.return=c,d)}function g(c,d,m,h,N){return d===null||d.tag!==7?(d=qt(m,c.mode,h,N),d.return=c,d):(d=i(d,m),d.return=c,d)}function v(c,d,m){if(typeof d=="string"&&d!==""||typeof d=="number")return d=Xi(""+d,c.mode,m),d.return=c,d;if(typeof d=="object"&&d!==null){switch(d.$$typeof){case ur:return m=Mr(d.type,d.key,d.props,null,c.mode,m),m.ref=wn(c,null,d),m.return=c,m;case zt:return d=Ki(d,c.mode,m),d.return=c,d;case rt:var h=d._init;return v(c,h(d._payload),m)}if(Cn(d)||hn(d))return d=qt(d,c.mode,m,null),d.return=c,d;jr(c,d)}return null}function f(c,d,m,h){var N=d!==null?d.key:null;if(typeof m=="string"&&m!==""||typeof m=="number")return N!==null?null:l(c,d,""+m,h);if(typeof m=="object"&&m!==null){switch(m.$$typeof){case ur:return m.key===N?u(c,d,m,h):null;case zt:return m.key===N?p(c,d,m,h):null;case rt:return N=m._init,f(c,d,N(m._payload),h)}if(Cn(m)||hn(m))return N!==null?null:g(c,d,m,h,null);jr(c,m)}return null}function y(c,d,m,h,N){if(typeof h=="string"&&h!==""||typeof h=="number")return c=c.get(m)||null,l(d,c,""+h,N);if(typeof h=="object"&&h!==null){switch(h.$$typeof){case ur:return c=c.get(h.key===null?m:h.key)||null,u(d,c,h,N);case zt:return c=c.get(h.key===null?m:h.key)||null,p(d,c,h,N);case rt:var R=h._init;return y(c,d,m,R(h._payload),N)}if(Cn(h)||hn(h))return c=c.get(m)||null,g(d,c,h,N,null);jr(d,h)}return null}function E(c,d,m,h){for(var N=null,R=null,A=d,b=d=0,F=null;A!==null&&b<m.length;b++){A.index>b?(F=A,A=null):F=A.sibling;var I=f(c,A,m[b],h);if(I===null){A===null&&(A=F);break}e&&A&&I.alternate===null&&t(c,A),d=s(I,d,b),R===null?N=I:R.sibling=I,R=I,A=F}if(b===m.length)return n(c,A),G&&Ct(c,b),N;if(A===null){for(;b<m.length;b++)A=v(c,m[b],h),A!==null&&(d=s(A,d,b),R===null?N=A:R.sibling=A,R=A);return G&&Ct(c,b),N}for(A=r(c,A);b<m.length;b++)F=y(A,c,b,m[b],h),F!==null&&(e&&F.alternate!==null&&A.delete(F.key===null?b:F.key),d=s(F,d,b),R===null?N=F:R.sibling=F,R=F);return e&&A.forEach(function(Ee){return t(c,Ee)}),G&&Ct(c,b),N}function w(c,d,m,h){var N=hn(m);if(typeof N!="function")throw Error(x(150));if(m=N.call(m),m==null)throw Error(x(151));for(var R=N=null,A=d,b=d=0,F=null,I=m.next();A!==null&&!I.done;b++,I=m.next()){A.index>b?(F=A,A=null):F=A.sibling;var Ee=f(c,A,I.value,h);if(Ee===null){A===null&&(A=F);break}e&&A&&Ee.alternate===null&&t(c,A),d=s(Ee,d,b),R===null?N=Ee:R.sibling=Ee,R=Ee,A=F}if(I.done)return n(c,A),G&&Ct(c,b),N;if(A===null){for(;!I.done;b++,I=m.next())I=v(c,I.value,h),I!==null&&(d=s(I,d,b),R===null?N=I:R.sibling=I,R=I);return G&&Ct(c,b),N}for(A=r(c,A);!I.done;b++,I=m.next())I=y(A,c,b,I.value,h),I!==null&&(e&&I.alternate!==null&&A.delete(I.key===null?b:I.key),d=s(I,d,b),R===null?N=I:R.sibling=I,R=I);return e&&A.forEach(function(wt){return t(c,wt)}),G&&Ct(c,b),N}function M(c,d,m,h){if(typeof m=="object"&&m!==null&&m.type===Vt&&m.key===null&&(m=m.props.children),typeof m=="object"&&m!==null){switch(m.$$typeof){case ur:e:{for(var N=m.key,R=d;R!==null;){if(R.key===N){if(N=m.type,N===Vt){if(R.tag===7){n(c,R.sibling),d=i(R,m.props.children),d.return=c,c=d;break e}}else if(R.elementType===N||typeof N=="object"&&N!==null&&N.$$typeof===rt&&bo(N)===R.type){n(c,R.sibling),d=i(R,m.props),d.ref=wn(c,R,m),d.return=c,c=d;break e}n(c,R);break}else t(c,R);R=R.sibling}m.type===Vt?(d=qt(m.props.children,c.mode,h,m.key),d.return=c,c=d):(h=Mr(m.type,m.key,m.props,null,c.mode,h),h.ref=wn(c,d,m),h.return=c,c=h)}return a(c);case zt:e:{for(R=m.key;d!==null;){if(d.key===R)if(d.tag===4&&d.stateNode.containerInfo===m.containerInfo&&d.stateNode.implementation===m.implementation){n(c,d.sibling),d=i(d,m.children||[]),d.return=c,c=d;break e}else{n(c,d);break}else t(c,d);d=d.sibling}d=Ki(m,c.mode,h),d.return=c,c=d}return a(c);case rt:return R=m._init,M(c,d,R(m._payload),h)}if(Cn(m))return E(c,d,m,h);if(hn(m))return w(c,d,m,h);jr(c,m)}return typeof m=="string"&&m!==""||typeof m=="number"?(m=""+m,d!==null&&d.tag===6?(n(c,d.sibling),d=i(d,m),d.return=c,c=d):(n(c,d),d=Xi(m,c.mode,h),d.return=c,c=d),a(c)):n(c,d)}return M}var dn=xu(!0),yu=xu(!1),Yr=jt(null),Zr=null,Xt=null,xa=null;function ya(){xa=Xt=Zr=null}function ja(e){var t=Yr.current;Q(Yr),e._currentValue=t}function Rs(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)!==t?(e.childLanes|=t,r!==null&&(r.childLanes|=t)):r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t),e===n)break;e=e.return}}function rn(e,t){Zr=e,xa=Xt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&t&&(he=!0),e.firstContext=null)}function qe(e){var t=e._currentValue;if(xa!==e)if(e={context:e,memoizedValue:t,next:null},Xt===null){if(Zr===null)throw Error(x(308));Xt=e,Zr.dependencies={lanes:0,firstContext:e}}else Xt=Xt.next=e;return t}var At=null;function Ea(e){At===null?At=[e]:At.push(e)}function ju(e,t,n,r){var i=t.interleaved;return i===null?(n.next=n,Ea(t)):(n.next=i.next,i.next=n),t.interleaved=n,Ze(e,r)}function Ze(e,t){e.lanes|=t;var n=e.alternate;for(n!==null&&(n.lanes|=t),n=e,e=e.return;e!==null;)e.childLanes|=t,n=e.alternate,n!==null&&(n.childLanes|=t),n=e,e=e.return;return n.tag===3?n.stateNode:null}var it=!1;function wa(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Eu(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function Xe(e,t){return{eventTime:e,lane:t,tag:0,payload:null,callback:null,next:null}}function mt(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,O&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,Ze(e,n)}return i=r.interleaved,i===null?(t.next=t,Ea(r)):(t.next=i.next,i.next=t),r.interleaved=t,Ze(e,n)}function qr(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,(n&4194240)!==0)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,oa(e,n)}}function Ao(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,s=null;if(n=n.firstBaseUpdate,n!==null){do{var a={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};s===null?i=s=a:s=s.next=a,n=n.next}while(n!==null);s===null?i=s=t:s=s.next=t}else i=s=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:r.shared,effects:r.effects},e.updateQueue=n;return}e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}function ei(e,t,n,r){var i=e.updateQueue;it=!1;var s=i.firstBaseUpdate,a=i.lastBaseUpdate,l=i.shared.pending;if(l!==null){i.shared.pending=null;var u=l,p=u.next;u.next=null,a===null?s=p:a.next=p,a=u;var g=e.alternate;g!==null&&(g=g.updateQueue,l=g.lastBaseUpdate,l!==a&&(l===null?g.firstBaseUpdate=p:l.next=p,g.lastBaseUpdate=u))}if(s!==null){var v=i.baseState;a=0,g=p=u=null,l=s;do{var f=l.lane,y=l.eventTime;if((r&f)===f){g!==null&&(g=g.next={eventTime:y,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var E=e,w=l;switch(f=t,y=n,w.tag){case 1:if(E=w.payload,typeof E=="function"){v=E.call(y,v,f);break e}v=E;break e;case 3:E.flags=E.flags&-65537|128;case 0:if(E=w.payload,f=typeof E=="function"?E.call(y,v,f):E,f==null)break e;v=K({},v,f);break e;case 2:it=!0}}l.callback!==null&&l.lane!==0&&(e.flags|=64,f=i.effects,f===null?i.effects=[l]:f.push(l))}else y={eventTime:y,lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},g===null?(p=g=y,u=v):g=g.next=y,a|=f;if(l=l.next,l===null){if(l=i.shared.pending,l===null)break;f=l,l=f.next,f.next=null,i.lastBaseUpdate=f,i.shared.pending=null}}while(!0);if(g===null&&(u=v),i.baseState=u,i.firstBaseUpdate=p,i.lastBaseUpdate=g,t=i.shared.interleaved,t!==null){i=t;do a|=i.lane,i=i.next;while(i!==t)}else s===null&&(i.shared.lanes=0);_t|=a,e.lanes=a,e.memoizedState=v}}function Ro(e,t,n){if(e=t.effects,t.effects=null,e!==null)for(t=0;t<e.length;t++){var r=e[t],i=r.callback;if(i!==null){if(r.callback=null,r=n,typeof i!="function")throw Error(x(191,i));i.call(r)}}}var ar={},$e=jt(ar),Xn=jt(ar),Kn=jt(ar);function Rt(e){if(e===ar)throw Error(x(174));return e}function Sa(e,t){switch(H(Kn,t),H(Xn,e),H($e,ar),e=t.nodeType,e){case 9:case 11:t=(t=t.documentElement)?t.namespaceURI:ds(null,"");break;default:e=e===8?t.parentNode:t,t=e.namespaceURI||null,e=e.tagName,t=ds(t,e)}Q($e),H($e,t)}function cn(){Q($e),Q(Xn),Q(Kn)}function wu(e){Rt(Kn.current);var t=Rt($e.current),n=ds(t,e.type);t!==n&&(H(Xn,e),H($e,n))}function Na(e){Xn.current===e&&(Q($e),Q(Xn))}var W=jt(0);function ti(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==void 0){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bi=[];function La(){for(var e=0;e<Bi.length;e++)Bi[e]._workInProgressVersionPrimary=null;Bi.length=0}var Ir=tt.ReactCurrentDispatcher,$i=tt.ReactCurrentBatchConfig,Dt=0,X=null,te=null,re=null,ni=!1,Dn=!1,Yn=0,vp=0;function le(){throw Error(x(321))}function Ca(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ue(e[n],t[n]))return!1;return!0}function Ta(e,t,n,r,i,s){if(Dt=s,X=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,Ir.current=e===null||e.memoizedState===null?yp:jp,e=n(r,i),Dn){s=0;do{if(Dn=!1,Yn=0,25<=s)throw Error(x(301));s+=1,re=te=null,t.updateQueue=null,Ir.current=Ep,e=n(r,i)}while(Dn)}if(Ir.current=ri,t=te!==null&&te.next!==null,Dt=0,re=te=X=null,ni=!1,t)throw Error(x(300));return e}function ba(){var e=Yn!==0;return Yn=0,e}function Ve(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return re===null?X.memoizedState=re=e:re=re.next=e,re}function Ie(){if(te===null){var e=X.alternate;e=e!==null?e.memoizedState:null}else e=te.next;var t=re===null?X.memoizedState:re.next;if(t!==null)re=t,te=e;else{if(e===null)throw Error(x(310));te=e,e={memoizedState:te.memoizedState,baseState:te.baseState,baseQueue:te.baseQueue,queue:te.queue,next:null},re===null?X.memoizedState=re=e:re=re.next=e}return re}function Zn(e,t){return typeof t=="function"?t(e):t}function Qi(e){var t=Ie(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=te,i=r.baseQueue,s=n.pending;if(s!==null){if(i!==null){var a=i.next;i.next=s.next,s.next=a}r.baseQueue=i=s,n.pending=null}if(i!==null){s=i.next,r=r.baseState;var l=a=null,u=null,p=s;do{var g=p.lane;if((Dt&g)===g)u!==null&&(u=u.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),r=p.hasEagerState?p.eagerState:e(r,p.action);else{var v={lane:g,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};u===null?(l=u=v,a=r):u=u.next=v,X.lanes|=g,_t|=g}p=p.next}while(p!==null&&p!==s);u===null?a=r:u.next=l,Ue(r,t.memoizedState)||(he=!0),t.memoizedState=r,t.baseState=a,t.baseQueue=u,n.lastRenderedState=r}if(e=n.interleaved,e!==null){i=e;do s=i.lane,X.lanes|=s,_t|=s,i=i.next;while(i!==e)}else i===null&&(n.lanes=0);return[t.memoizedState,n.dispatch]}function Gi(e){var t=Ie(),n=t.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=e;var r=n.dispatch,i=n.pending,s=t.memoizedState;if(i!==null){n.pending=null;var a=i=i.next;do s=e(s,a.action),a=a.next;while(a!==i);Ue(s,t.memoizedState)||(he=!0),t.memoizedState=s,t.baseQueue===null&&(t.baseState=s),n.lastRenderedState=s}return[s,r]}function Su(){}function Nu(e,t){var n=X,r=Ie(),i=t(),s=!Ue(r.memoizedState,i);if(s&&(r.memoizedState=i,he=!0),r=r.queue,Aa(Tu.bind(null,n,r,e),[e]),r.getSnapshot!==t||s||re!==null&&re.memoizedState.tag&1){if(n.flags|=2048,er(9,Cu.bind(null,n,r,i,t),void 0,null),ie===null)throw Error(x(349));Dt&30||Lu(n,t,i)}return i}function Lu(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=X.updateQueue,t===null?(t={lastEffect:null,stores:null},X.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function Cu(e,t,n,r){t.value=n,t.getSnapshot=r,bu(t)&&Au(e)}function Tu(e,t,n){return n(function(){bu(t)&&Au(e)})}function bu(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ue(e,n)}catch{return!0}}function Au(e){var t=Ze(e,1);t!==null&&Fe(t,e,1,-1)}function Po(e){var t=Ve();return typeof e=="function"&&(e=e()),t.memoizedState=t.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Zn,lastRenderedState:e},t.queue=e,e=e.dispatch=xp.bind(null,X,e),[t.memoizedState,e]}function er(e,t,n,r){return e={tag:e,create:t,destroy:n,deps:r,next:null},t=X.updateQueue,t===null?(t={lastEffect:null,stores:null},X.updateQueue=t,t.lastEffect=e.next=e):(n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e)),e}function Ru(){return Ie().memoizedState}function kr(e,t,n,r){var i=Ve();X.flags|=e,i.memoizedState=er(1|t,n,void 0,r===void 0?null:r)}function gi(e,t,n,r){var i=Ie();r=r===void 0?null:r;var s=void 0;if(te!==null){var a=te.memoizedState;if(s=a.destroy,r!==null&&Ca(r,a.deps)){i.memoizedState=er(t,n,s,r);return}}X.flags|=e,i.memoizedState=er(1|t,n,s,r)}function qo(e,t){return kr(8390656,8,e,t)}function Aa(e,t){return gi(2048,8,e,t)}function Pu(e,t){return gi(4,2,e,t)}function qu(e,t){return gi(4,4,e,t)}function Iu(e,t){if(typeof t=="function")return e=e(),t(e),function(){t(null)};if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function ku(e,t,n){return n=n!=null?n.concat([e]):null,gi(4,4,Iu.bind(null,t,e),n)}function Ra(){}function Du(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ca(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function _u(e,t){var n=Ie();t=t===void 0?null:t;var r=n.memoizedState;return r!==null&&t!==null&&Ca(t,r[1])?r[0]:(e=e(),n.memoizedState=[e,t],e)}function Ou(e,t,n){return Dt&21?(Ue(n,t)||(n=Vl(),X.lanes|=n,_t|=n,e.baseState=!0),t):(e.baseState&&(e.baseState=!1,he=!0),e.memoizedState=n)}function gp(e,t){var n=z;z=n!==0&&4>n?n:4,e(!0);var r=$i.transition;$i.transition={};try{e(!1),t()}finally{z=n,$i.transition=r}}function Mu(){return Ie().memoizedState}function hp(e,t,n){var r=vt(e);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Fu(e))Uu(t,n);else if(n=ju(e,t,n,r),n!==null){var i=me();Fe(n,e,r,i),zu(n,t,r)}}function xp(e,t,n){var r=vt(e),i={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Fu(e))Uu(t,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=t.lastRenderedReducer,s!==null))try{var a=t.lastRenderedState,l=s(a,n);if(i.hasEagerState=!0,i.eagerState=l,Ue(l,a)){var u=t.interleaved;u===null?(i.next=i,Ea(t)):(i.next=u.next,u.next=i),t.interleaved=i;return}}catch{}finally{}n=ju(e,t,i,r),n!==null&&(i=me(),Fe(n,e,r,i),zu(n,t,r))}}function Fu(e){var t=e.alternate;return e===X||t!==null&&t===X}function Uu(e,t){Dn=ni=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function zu(e,t,n){if(n&4194240){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,oa(e,n)}}var ri={readContext:qe,useCallback:le,useContext:le,useEffect:le,useImperativeHandle:le,useInsertionEffect:le,useLayoutEffect:le,useMemo:le,useReducer:le,useRef:le,useState:le,useDebugValue:le,useDeferredValue:le,useTransition:le,useMutableSource:le,useSyncExternalStore:le,useId:le,unstable_isNewReconciler:!1},yp={readContext:qe,useCallback:function(e,t){return Ve().memoizedState=[e,t===void 0?null:t],e},useContext:qe,useEffect:qo,useImperativeHandle:function(e,t,n){return n=n!=null?n.concat([e]):null,kr(4194308,4,Iu.bind(null,t,e),n)},useLayoutEffect:function(e,t){return kr(4194308,4,e,t)},useInsertionEffect:function(e,t){return kr(4,2,e,t)},useMemo:function(e,t){var n=Ve();return t=t===void 0?null:t,e=e(),n.memoizedState=[e,t],e},useReducer:function(e,t,n){var r=Ve();return t=n!==void 0?n(t):t,r.memoizedState=r.baseState=t,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:t},r.queue=e,e=e.dispatch=hp.bind(null,X,e),[r.memoizedState,e]},useRef:function(e){var t=Ve();return e={current:e},t.memoizedState=e},useState:Po,useDebugValue:Ra,useDeferredValue:function(e){return Ve().memoizedState=e},useTransition:function(){var e=Po(!1),t=e[0];return e=gp.bind(null,e[1]),Ve().memoizedState=e,[t,e]},useMutableSource:function(){},useSyncExternalStore:function(e,t,n){var r=X,i=Ve();if(G){if(n===void 0)throw Error(x(407));n=n()}else{if(n=t(),ie===null)throw Error(x(349));Dt&30||Lu(r,t,n)}i.memoizedState=n;var s={value:n,getSnapshot:t};return i.queue=s,qo(Tu.bind(null,r,s,e),[e]),r.flags|=2048,er(9,Cu.bind(null,r,s,n,t),void 0,null),n},useId:function(){var e=Ve(),t=ie.identifierPrefix;if(G){var n=We,r=Je;n=(r&~(1<<32-Me(r)-1)).toString(32)+n,t=":"+t+"R"+n,n=Yn++,0<n&&(t+="H"+n.toString(32)),t+=":"}else n=vp++,t=":"+t+"r"+n.toString(32)+":";return e.memoizedState=t},unstable_isNewReconciler:!1},jp={readContext:qe,useCallback:Du,useContext:qe,useEffect:Aa,useImperativeHandle:ku,useInsertionEffect:Pu,useLayoutEffect:qu,useMemo:_u,useReducer:Qi,useRef:Ru,useState:function(){return Qi(Zn)},useDebugValue:Ra,useDeferredValue:function(e){var t=Ie();return Ou(t,te.memoizedState,e)},useTransition:function(){var e=Qi(Zn)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:Su,useSyncExternalStore:Nu,useId:Mu,unstable_isNewReconciler:!1},Ep={readContext:qe,useCallback:Du,useContext:qe,useEffect:Aa,useImperativeHandle:ku,useInsertionEffect:Pu,useLayoutEffect:qu,useMemo:_u,useReducer:Gi,useRef:Ru,useState:function(){return Gi(Zn)},useDebugValue:Ra,useDeferredValue:function(e){var t=Ie();return te===null?t.memoizedState=e:Ou(t,te.memoizedState,e)},useTransition:function(){var e=Gi(Zn)[0],t=Ie().memoizedState;return[e,t]},useMutableSource:Su,useSyncExternalStore:Nu,useId:Mu,unstable_isNewReconciler:!1};function De(e,t){if(e&&e.defaultProps){t=K({},t),e=e.defaultProps;for(var n in e)t[n]===void 0&&(t[n]=e[n]);return t}return t}function Ps(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:K({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var hi={isMounted:function(e){return(e=e._reactInternals)?Ft(e)===e:!1},enqueueSetState:function(e,t,n){e=e._reactInternals;var r=me(),i=vt(e),s=Xe(r,i);s.payload=t,n!=null&&(s.callback=n),t=mt(e,s,i),t!==null&&(Fe(t,e,i,r),qr(t,e,i))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=me(),i=vt(e),s=Xe(r,i);s.tag=1,s.payload=t,n!=null&&(s.callback=n),t=mt(e,s,i),t!==null&&(Fe(t,e,i,r),qr(t,e,i))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=me(),r=vt(e),i=Xe(n,r);i.tag=2,t!=null&&(i.callback=t),t=mt(e,i,r),t!==null&&(Fe(t,e,r,n),qr(t,e,r))}};function Io(e,t,n,r,i,s,a){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(r,s,a):t.prototype&&t.prototype.isPureReactComponent?!Qn(n,r)||!Qn(i,s):!0}function Vu(e,t,n){var r=!1,i=xt,s=t.contextType;return typeof s=="object"&&s!==null?s=qe(s):(i=ye(t)?It:ce.current,r=t.contextTypes,s=(r=r!=null)?ln(e,i):xt),t=new t(n,s),e.memoizedState=t.state!==null&&t.state!==void 0?t.state:null,t.updater=hi,e.stateNode=t,t._reactInternals=e,r&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),t}function ko(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps=="function"&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps=="function"&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&hi.enqueueReplaceState(t,t.state,null)}function qs(e,t,n,r){var i=e.stateNode;i.props=n,i.state=e.memoizedState,i.refs={},wa(e);var s=t.contextType;typeof s=="object"&&s!==null?i.context=qe(s):(s=ye(t)?It:ce.current,i.context=ln(e,s)),i.state=e.memoizedState,s=t.getDerivedStateFromProps,typeof s=="function"&&(Ps(e,t,s,n),i.state=e.memoizedState),typeof t.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(t=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),t!==i.state&&hi.enqueueReplaceState(i,i.state,null),ei(e,n,i,r),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function pn(e,t){try{var n="",r=t;do n+=Wd(r),r=r.return;while(r);var i=n}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:t,stack:i,digest:null}}function Ji(e,t,n){return{value:e,source:null,stack:n??null,digest:t??null}}function Is(e,t){try{console.error(t.value)}catch(n){setTimeout(function(){throw n})}}var wp=typeof WeakMap=="function"?WeakMap:Map;function Hu(e,t,n){n=Xe(-1,n),n.tag=3,n.payload={element:null};var r=t.value;return n.callback=function(){si||(si=!0,Hs=r),Is(e,t)},n}function Bu(e,t,n){n=Xe(-1,n),n.tag=3;var r=e.type.getDerivedStateFromError;if(typeof r=="function"){var i=t.value;n.payload=function(){return r(i)},n.callback=function(){Is(e,t)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(n.callback=function(){Is(e,t),typeof r!="function"&&(ft===null?ft=new Set([this]):ft.add(this));var a=t.stack;this.componentDidCatch(t.value,{componentStack:a!==null?a:""})}),n}function Do(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new wp;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(i.add(n),e=_p.bind(null,e,t,n),t.then(e,e))}function _o(e){do{var t;if((t=e.tag===13)&&(t=e.memoizedState,t=t!==null?t.dehydrated!==null:!0),t)return e;e=e.return}while(e!==null);return null}function Oo(e,t,n,r,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===t?e.flags|=65536:(e.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(t=Xe(-1,1),t.tag=2,mt(n,t,1))),n.lanes|=1),e)}var Sp=tt.ReactCurrentOwner,he=!1;function pe(e,t,n,r){t.child=e===null?yu(t,null,n,r):dn(t,e.child,n,r)}function Mo(e,t,n,r,i){n=n.render;var s=t.ref;return rn(t,i),r=Ta(e,t,n,r,s,i),n=ba(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,et(e,t,i)):(G&&n&&va(t),t.flags|=1,pe(e,t,r,i),t.child)}function Fo(e,t,n,r,i){if(e===null){var s=n.type;return typeof s=="function"&&!Ma(s)&&s.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(t.tag=15,t.type=s,$u(e,t,s,r,i)):(e=Mr(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(s=e.child,!(e.lanes&i)){var a=s.memoizedProps;if(n=n.compare,n=n!==null?n:Qn,n(a,r)&&e.ref===t.ref)return et(e,t,i)}return t.flags|=1,e=gt(s,r),e.ref=t.ref,e.return=t,t.child=e}function $u(e,t,n,r,i){if(e!==null){var s=e.memoizedProps;if(Qn(s,r)&&e.ref===t.ref)if(he=!1,t.pendingProps=r=s,(e.lanes&i)!==0)e.flags&131072&&(he=!0);else return t.lanes=e.lanes,et(e,t,i)}return ks(e,t,n,r,i)}function Qu(e,t,n){var r=t.pendingProps,i=r.children,s=e!==null?e.memoizedState:null;if(r.mode==="hidden")if(!(t.mode&1))t.memoizedState={baseLanes:0,cachePool:null,transitions:null},H(Yt,we),we|=n;else{if(!(n&1073741824))return e=s!==null?s.baseLanes|n:n,t.lanes=t.childLanes=1073741824,t.memoizedState={baseLanes:e,cachePool:null,transitions:null},t.updateQueue=null,H(Yt,we),we|=e,null;t.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=s!==null?s.baseLanes:n,H(Yt,we),we|=r}else s!==null?(r=s.baseLanes|n,t.memoizedState=null):r=n,H(Yt,we),we|=r;return pe(e,t,i,n),t.child}function Gu(e,t){var n=t.ref;(e===null&&n!==null||e!==null&&e.ref!==n)&&(t.flags|=512,t.flags|=2097152)}function ks(e,t,n,r,i){var s=ye(n)?It:ce.current;return s=ln(t,s),rn(t,i),n=Ta(e,t,n,r,s,i),r=ba(),e!==null&&!he?(t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~i,et(e,t,i)):(G&&r&&va(t),t.flags|=1,pe(e,t,n,i),t.child)}function Uo(e,t,n,r,i){if(ye(n)){var s=!0;Wr(t)}else s=!1;if(rn(t,i),t.stateNode===null)Dr(e,t),Vu(t,n,r),qs(t,n,r,i),r=!0;else if(e===null){var a=t.stateNode,l=t.memoizedProps;a.props=l;var u=a.context,p=n.contextType;typeof p=="object"&&p!==null?p=qe(p):(p=ye(n)?It:ce.current,p=ln(t,p));var g=n.getDerivedStateFromProps,v=typeof g=="function"||typeof a.getSnapshotBeforeUpdate=="function";v||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==r||u!==p)&&ko(t,a,r,p),it=!1;var f=t.memoizedState;a.state=f,ei(t,r,a,i),u=t.memoizedState,l!==r||f!==u||xe.current||it?(typeof g=="function"&&(Ps(t,n,g,r),u=t.memoizedState),(l=it||Io(t,n,l,r,f,u,p))?(v||typeof a.UNSAFE_componentWillMount!="function"&&typeof a.componentWillMount!="function"||(typeof a.componentWillMount=="function"&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount=="function"&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount=="function"&&(t.flags|=4194308)):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=u),a.props=r,a.state=u,a.context=p,r=l):(typeof a.componentDidMount=="function"&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,Eu(e,t),l=t.memoizedProps,p=t.type===t.elementType?l:De(t.type,l),a.props=p,v=t.pendingProps,f=a.context,u=n.contextType,typeof u=="object"&&u!==null?u=qe(u):(u=ye(n)?It:ce.current,u=ln(t,u));var y=n.getDerivedStateFromProps;(g=typeof y=="function"||typeof a.getSnapshotBeforeUpdate=="function")||typeof a.UNSAFE_componentWillReceiveProps!="function"&&typeof a.componentWillReceiveProps!="function"||(l!==v||f!==u)&&ko(t,a,r,u),it=!1,f=t.memoizedState,a.state=f,ei(t,r,a,i);var E=t.memoizedState;l!==v||f!==E||xe.current||it?(typeof y=="function"&&(Ps(t,n,y,r),E=t.memoizedState),(p=it||Io(t,n,p,r,f,E,u)||!1)?(g||typeof a.UNSAFE_componentWillUpdate!="function"&&typeof a.componentWillUpdate!="function"||(typeof a.componentWillUpdate=="function"&&a.componentWillUpdate(r,E,u),typeof a.UNSAFE_componentWillUpdate=="function"&&a.UNSAFE_componentWillUpdate(r,E,u)),typeof a.componentDidUpdate=="function"&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate=="function"&&(t.flags|=1024)):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=E),a.props=r,a.state=E,a.context=u,r=p):(typeof a.componentDidUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!="function"||l===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return Ds(e,t,n,r,s,i)}function Ds(e,t,n,r,i,s){Gu(e,t);var a=(t.flags&128)!==0;if(!r&&!a)return i&&Lo(t,n,!1),et(e,t,s);r=t.stateNode,Sp.current=t;var l=a&&typeof n.getDerivedStateFromError!="function"?null:r.render();return t.flags|=1,e!==null&&a?(t.child=dn(t,e.child,null,s),t.child=dn(t,null,l,s)):pe(e,t,l,s),t.memoizedState=r.state,i&&Lo(t,n,!0),t.child}function Ju(e){var t=e.stateNode;t.pendingContext?No(e,t.pendingContext,t.pendingContext!==t.context):t.context&&No(e,t.context,!1),Sa(e,t.containerInfo)}function zo(e,t,n,r,i){return un(),ha(i),t.flags|=256,pe(e,t,n,r),t.child}var _s={dehydrated:null,treeContext:null,retryLane:0};function Os(e){return{baseLanes:e,cachePool:null,transitions:null}}function Wu(e,t,n){var r=t.pendingProps,i=W.current,s=!1,a=(t.flags&128)!==0,l;if((l=a)||(l=e!==null&&e.memoizedState===null?!1:(i&2)!==0),l?(s=!0,t.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),H(W,i&1),e===null)return As(t),e=t.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(t.mode&1?e.data==="$!"?t.lanes=8:t.lanes=1073741824:t.lanes=1,null):(a=r.children,e=r.fallback,s?(r=t.mode,s=t.child,a={mode:"hidden",children:a},!(r&1)&&s!==null?(s.childLanes=0,s.pendingProps=a):s=ji(a,r,0,null),e=qt(e,r,n,null),s.return=t,e.return=t,s.sibling=e,t.child=s,t.child.memoizedState=Os(n),t.memoizedState=_s,e):Pa(t,a));if(i=e.memoizedState,i!==null&&(l=i.dehydrated,l!==null))return Np(e,t,a,r,l,i,n);if(s){s=r.fallback,a=t.mode,i=e.child,l=i.sibling;var u={mode:"hidden",children:r.children};return!(a&1)&&t.child!==i?(r=t.child,r.childLanes=0,r.pendingProps=u,t.deletions=null):(r=gt(i,u),r.subtreeFlags=i.subtreeFlags&14680064),l!==null?s=gt(l,s):(s=qt(s,a,n,null),s.flags|=2),s.return=t,r.return=t,r.sibling=s,t.child=r,r=s,s=t.child,a=e.child.memoizedState,a=a===null?Os(n):{baseLanes:a.baseLanes|n,cachePool:null,transitions:a.transitions},s.memoizedState=a,s.childLanes=e.childLanes&~n,t.memoizedState=_s,r}return s=e.child,e=s.sibling,r=gt(s,{mode:"visible",children:r.children}),!(t.mode&1)&&(r.lanes=n),r.return=t,r.sibling=null,e!==null&&(n=t.deletions,n===null?(t.deletions=[e],t.flags|=16):n.push(e)),t.child=r,t.memoizedState=null,r}function Pa(e,t){return t=ji({mode:"visible",children:t},e.mode,0,null),t.return=e,e.child=t}function Er(e,t,n,r){return r!==null&&ha(r),dn(t,e.child,null,n),e=Pa(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function Np(e,t,n,r,i,s,a){if(n)return t.flags&256?(t.flags&=-257,r=Ji(Error(x(422))),Er(e,t,a,r)):t.memoizedState!==null?(t.child=e.child,t.flags|=128,null):(s=r.fallback,i=t.mode,r=ji({mode:"visible",children:r.children},i,0,null),s=qt(s,i,a,null),s.flags|=2,r.return=t,s.return=t,r.sibling=s,t.child=r,t.mode&1&&dn(t,e.child,null,a),t.child.memoizedState=Os(a),t.memoizedState=_s,s);if(!(t.mode&1))return Er(e,t,a,null);if(i.data==="$!"){if(r=i.nextSibling&&i.nextSibling.dataset,r)var l=r.dgst;return r=l,s=Error(x(419)),r=Ji(s,r,void 0),Er(e,t,a,r)}if(l=(a&e.childLanes)!==0,he||l){if(r=ie,r!==null){switch(a&-a){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(r.suspendedLanes|a)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,Ze(e,i),Fe(r,e,i,-1))}return Oa(),r=Ji(Error(x(421))),Er(e,t,a,r)}return i.data==="$?"?(t.flags|=128,t.child=e.child,t=Op.bind(null,e),i._reactRetry=t,null):(e=s.treeContext,Se=pt(i.nextSibling),Ne=t,G=!0,Oe=null,e!==null&&(be[Ae++]=Je,be[Ae++]=We,be[Ae++]=kt,Je=e.id,We=e.overflow,kt=t),t=Pa(t,r.children),t.flags|=4096,t)}function Vo(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),Rs(e.return,t,n)}function Wi(e,t,n,r,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i}:(s.isBackwards=t,s.rendering=null,s.renderingStartTime=0,s.last=r,s.tail=n,s.tailMode=i)}function Xu(e,t,n){var r=t.pendingProps,i=r.revealOrder,s=r.tail;if(pe(e,t,r.children,n),r=W.current,r&2)r=r&1|2,t.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Vo(e,n,t);else if(e.tag===19)Vo(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break e;for(;e.sibling===null;){if(e.return===null||e.return===t)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}r&=1}if(H(W,r),!(t.mode&1))t.memoizedState=null;else switch(i){case"forwards":for(n=t.child,i=null;n!==null;)e=n.alternate,e!==null&&ti(e)===null&&(i=n),n=n.sibling;n=i,n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),Wi(t,!1,i,n,s);break;case"backwards":for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&ti(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}Wi(t,!0,n,null,s);break;case"together":Wi(t,!1,null,null,void 0);break;default:t.memoizedState=null}return t.child}function Dr(e,t){!(t.mode&1)&&e!==null&&(e.alternate=null,t.alternate=null,t.flags|=2)}function et(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),_t|=t.lanes,!(n&t.childLanes))return null;if(e!==null&&t.child!==e.child)throw Error(x(153));if(t.child!==null){for(e=t.child,n=gt(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=gt(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function Lp(e,t,n){switch(t.tag){case 3:Ju(t),un();break;case 5:wu(t);break;case 1:ye(t.type)&&Wr(t);break;case 4:Sa(t,t.stateNode.containerInfo);break;case 10:var r=t.type._context,i=t.memoizedProps.value;H(Yr,r._currentValue),r._currentValue=i;break;case 13:if(r=t.memoizedState,r!==null)return r.dehydrated!==null?(H(W,W.current&1),t.flags|=128,null):n&t.child.childLanes?Wu(e,t,n):(H(W,W.current&1),e=et(e,t,n),e!==null?e.sibling:null);H(W,W.current&1);break;case 19:if(r=(n&t.childLanes)!==0,e.flags&128){if(r)return Xu(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),H(W,W.current),r)break;return null;case 22:case 23:return t.lanes=0,Qu(e,t,n)}return et(e,t,n)}var Ku,Ms,Yu,Zu;Ku=function(e,t){for(var n=t.child;n!==null;){if(n.tag===5||n.tag===6)e.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===t)break;for(;n.sibling===null;){if(n.return===null||n.return===t)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};Ms=function(){};Yu=function(e,t,n,r){var i=e.memoizedProps;if(i!==r){e=t.stateNode,Rt($e.current);var s=null;switch(n){case"input":i=as(e,i),r=as(e,r),s=[];break;case"select":i=K({},i,{value:void 0}),r=K({},r,{value:void 0}),s=[];break;case"textarea":i=us(e,i),r=us(e,r),s=[];break;default:typeof i.onClick!="function"&&typeof r.onClick=="function"&&(e.onclick=Gr)}cs(n,r);var a;n=null;for(p in i)if(!r.hasOwnProperty(p)&&i.hasOwnProperty(p)&&i[p]!=null)if(p==="style"){var l=i[p];for(a in l)l.hasOwnProperty(a)&&(n||(n={}),n[a]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(Fn.hasOwnProperty(p)?s||(s=[]):(s=s||[]).push(p,null));for(p in r){var u=r[p];if(l=i!=null?i[p]:void 0,r.hasOwnProperty(p)&&u!==l&&(u!=null||l!=null))if(p==="style")if(l){for(a in l)!l.hasOwnProperty(a)||u&&u.hasOwnProperty(a)||(n||(n={}),n[a]="");for(a in u)u.hasOwnProperty(a)&&l[a]!==u[a]&&(n||(n={}),n[a]=u[a])}else n||(s||(s=[]),s.push(p,n)),n=u;else p==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,l=l?l.__html:void 0,u!=null&&l!==u&&(s=s||[]).push(p,u)):p==="children"?typeof u!="string"&&typeof u!="number"||(s=s||[]).push(p,""+u):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(Fn.hasOwnProperty(p)?(u!=null&&p==="onScroll"&&$("scroll",e),s||l===u||(s=[])):(s=s||[]).push(p,u))}n&&(s=s||[]).push("style",n);var p=s;(t.updateQueue=p)&&(t.flags|=4)}};Zu=function(e,t,n,r){n!==r&&(t.flags|=4)};function Sn(e,t){if(!G)switch(e.tailMode){case"hidden":t=e.tail;for(var n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null;break;case"collapsed":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null}}function ue(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&14680064,r|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function Cp(e,t,n){var r=t.pendingProps;switch(ga(t),t.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ue(t),null;case 1:return ye(t.type)&&Jr(),ue(t),null;case 3:return r=t.stateNode,cn(),Q(xe),Q(ce),La(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(e===null||e.child===null)&&(yr(t)?t.flags|=4:e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,Oe!==null&&(Qs(Oe),Oe=null))),Ms(e,t),ue(t),null;case 5:Na(t);var i=Rt(Kn.current);if(n=t.type,e!==null&&t.stateNode!=null)Yu(e,t,n,r,i),e.ref!==t.ref&&(t.flags|=512,t.flags|=2097152);else{if(!r){if(t.stateNode===null)throw Error(x(166));return ue(t),null}if(e=Rt($e.current),yr(t)){r=t.stateNode,n=t.type;var s=t.memoizedProps;switch(r[He]=t,r[Wn]=s,e=(t.mode&1)!==0,n){case"dialog":$("cancel",r),$("close",r);break;case"iframe":case"object":case"embed":$("load",r);break;case"video":case"audio":for(i=0;i<bn.length;i++)$(bn[i],r);break;case"source":$("error",r);break;case"img":case"image":case"link":$("error",r),$("load",r);break;case"details":$("toggle",r);break;case"input":Xa(r,s),$("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!s.multiple},$("invalid",r);break;case"textarea":Ya(r,s),$("invalid",r)}cs(n,s),i=null;for(var a in s)if(s.hasOwnProperty(a)){var l=s[a];a==="children"?typeof l=="string"?r.textContent!==l&&(s.suppressHydrationWarning!==!0&&xr(r.textContent,l,e),i=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(s.suppressHydrationWarning!==!0&&xr(r.textContent,l,e),i=["children",""+l]):Fn.hasOwnProperty(a)&&l!=null&&a==="onScroll"&&$("scroll",r)}switch(n){case"input":dr(r),Ka(r,s,!0);break;case"textarea":dr(r),Za(r);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(r.onclick=Gr)}r=i,t.updateQueue=r,r!==null&&(t.flags|=4)}else{a=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Tl(n)),e==="http://www.w3.org/1999/xhtml"?n==="script"?(e=a.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof r.is=="string"?e=a.createElement(n,{is:r.is}):(e=a.createElement(n),n==="select"&&(a=e,r.multiple?a.multiple=!0:r.size&&(a.size=r.size))):e=a.createElementNS(e,n),e[He]=t,e[Wn]=r,Ku(e,t,!1,!1),t.stateNode=e;e:{switch(a=ps(n,r),n){case"dialog":$("cancel",e),$("close",e),i=r;break;case"iframe":case"object":case"embed":$("load",e),i=r;break;case"video":case"audio":for(i=0;i<bn.length;i++)$(bn[i],e);i=r;break;case"source":$("error",e),i=r;break;case"img":case"image":case"link":$("error",e),$("load",e),i=r;break;case"details":$("toggle",e),i=r;break;case"input":Xa(e,r),i=as(e,r),$("invalid",e);break;case"option":i=r;break;case"select":e._wrapperState={wasMultiple:!!r.multiple},i=K({},r,{value:void 0}),$("invalid",e);break;case"textarea":Ya(e,r),i=us(e,r),$("invalid",e);break;default:i=r}cs(n,i),l=i;for(s in l)if(l.hasOwnProperty(s)){var u=l[s];s==="style"?Rl(e,u):s==="dangerouslySetInnerHTML"?(u=u?u.__html:void 0,u!=null&&bl(e,u)):s==="children"?typeof u=="string"?(n!=="textarea"||u!=="")&&Un(e,u):typeof u=="number"&&Un(e,""+u):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(Fn.hasOwnProperty(s)?u!=null&&s==="onScroll"&&$("scroll",e):u!=null&&ta(e,s,u,a))}switch(n){case"input":dr(e),Ka(e,r,!1);break;case"textarea":dr(e),Za(e);break;case"option":r.value!=null&&e.setAttribute("value",""+ht(r.value));break;case"select":e.multiple=!!r.multiple,s=r.value,s!=null?Zt(e,!!r.multiple,s,!1):r.defaultValue!=null&&Zt(e,!!r.multiple,r.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=Gr)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(t.flags|=4)}t.ref!==null&&(t.flags|=512,t.flags|=2097152)}return ue(t),null;case 6:if(e&&t.stateNode!=null)Zu(e,t,e.memoizedProps,r);else{if(typeof r!="string"&&t.stateNode===null)throw Error(x(166));if(n=Rt(Kn.current),Rt($e.current),yr(t)){if(r=t.stateNode,n=t.memoizedProps,r[He]=t,(s=r.nodeValue!==n)&&(e=Ne,e!==null))switch(e.tag){case 3:xr(r.nodeValue,n,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&xr(r.nodeValue,n,(e.mode&1)!==0)}s&&(t.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[He]=t,t.stateNode=r}return ue(t),null;case 13:if(Q(W),r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(G&&Se!==null&&t.mode&1&&!(t.flags&128))hu(),un(),t.flags|=98560,s=!1;else if(s=yr(t),r!==null&&r.dehydrated!==null){if(e===null){if(!s)throw Error(x(318));if(s=t.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(x(317));s[He]=t}else un(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;ue(t),s=!1}else Oe!==null&&(Qs(Oe),Oe=null),s=!0;if(!s)return t.flags&65536?t:null}return t.flags&128?(t.lanes=n,t):(r=r!==null,r!==(e!==null&&e.memoizedState!==null)&&r&&(t.child.flags|=8192,t.mode&1&&(e===null||W.current&1?ne===0&&(ne=3):Oa())),t.updateQueue!==null&&(t.flags|=4),ue(t),null);case 4:return cn(),Ms(e,t),e===null&&Gn(t.stateNode.containerInfo),ue(t),null;case 10:return ja(t.type._context),ue(t),null;case 17:return ye(t.type)&&Jr(),ue(t),null;case 19:if(Q(W),s=t.memoizedState,s===null)return ue(t),null;if(r=(t.flags&128)!==0,a=s.rendering,a===null)if(r)Sn(s,!1);else{if(ne!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(a=ti(e),a!==null){for(t.flags|=128,Sn(s,!1),r=a.updateQueue,r!==null&&(t.updateQueue=r,t.flags|=4),t.subtreeFlags=0,r=n,n=t.child;n!==null;)s=n,e=r,s.flags&=14680066,a=s.alternate,a===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=a.childLanes,s.lanes=a.lanes,s.child=a.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=a.memoizedProps,s.memoizedState=a.memoizedState,s.updateQueue=a.updateQueue,s.type=a.type,e=a.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),n=n.sibling;return H(W,W.current&1|2),t.child}e=e.sibling}s.tail!==null&&Z()>mn&&(t.flags|=128,r=!0,Sn(s,!1),t.lanes=4194304)}else{if(!r)if(e=ti(a),e!==null){if(t.flags|=128,r=!0,n=e.updateQueue,n!==null&&(t.updateQueue=n,t.flags|=4),Sn(s,!0),s.tail===null&&s.tailMode==="hidden"&&!a.alternate&&!G)return ue(t),null}else 2*Z()-s.renderingStartTime>mn&&n!==1073741824&&(t.flags|=128,r=!0,Sn(s,!1),t.lanes=4194304);s.isBackwards?(a.sibling=t.child,t.child=a):(n=s.last,n!==null?n.sibling=a:t.child=a,s.last=a)}return s.tail!==null?(t=s.tail,s.rendering=t,s.tail=t.sibling,s.renderingStartTime=Z(),t.sibling=null,n=W.current,H(W,r?n&1|2:n&1),t):(ue(t),null);case 22:case 23:return _a(),r=t.memoizedState!==null,e!==null&&e.memoizedState!==null!==r&&(t.flags|=8192),r&&t.mode&1?we&1073741824&&(ue(t),t.subtreeFlags&6&&(t.flags|=8192)):ue(t),null;case 24:return null;case 25:return null}throw Error(x(156,t.tag))}function Tp(e,t){switch(ga(t),t.tag){case 1:return ye(t.type)&&Jr(),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return cn(),Q(xe),Q(ce),La(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 5:return Na(t),null;case 13:if(Q(W),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(x(340));un()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Q(W),null;case 4:return cn(),null;case 10:return ja(t.type._context),null;case 22:case 23:return _a(),null;case 24:return null;default:return null}}var wr=!1,de=!1,bp=typeof WeakSet=="function"?WeakSet:Set,T=null;function Kt(e,t){var n=e.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){Y(e,t,r)}else n.current=null}function Fs(e,t,n){try{n()}catch(r){Y(e,t,r)}}var Ho=!1;function Ap(e,t){if(ws=Br,e=iu(),fa(e)){if("selectionStart"in e)var n={start:e.selectionStart,end:e.selectionEnd};else e:{n=(n=e.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var i=r.anchorOffset,s=r.focusNode;r=r.focusOffset;try{n.nodeType,s.nodeType}catch{n=null;break e}var a=0,l=-1,u=-1,p=0,g=0,v=e,f=null;t:for(;;){for(var y;v!==n||i!==0&&v.nodeType!==3||(l=a+i),v!==s||r!==0&&v.nodeType!==3||(u=a+r),v.nodeType===3&&(a+=v.nodeValue.length),(y=v.firstChild)!==null;)f=v,v=y;for(;;){if(v===e)break t;if(f===n&&++p===i&&(l=a),f===s&&++g===r&&(u=a),(y=v.nextSibling)!==null)break;v=f,f=v.parentNode}v=y}n=l===-1||u===-1?null:{start:l,end:u}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ss={focusedElem:e,selectionRange:n},Br=!1,T=t;T!==null;)if(t=T,e=t.child,(t.subtreeFlags&1028)!==0&&e!==null)e.return=t,T=e;else for(;T!==null;){t=T;try{var E=t.alternate;if(t.flags&1024)switch(t.tag){case 0:case 11:case 15:break;case 1:if(E!==null){var w=E.memoizedProps,M=E.memoizedState,c=t.stateNode,d=c.getSnapshotBeforeUpdate(t.elementType===t.type?w:De(t.type,w),M);c.__reactInternalSnapshotBeforeUpdate=d}break;case 3:var m=t.stateNode.containerInfo;m.nodeType===1?m.textContent="":m.nodeType===9&&m.documentElement&&m.removeChild(m.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(h){Y(t,t.return,h)}if(e=t.sibling,e!==null){e.return=t.return,T=e;break}T=t.return}return E=Ho,Ho=!1,E}function _n(e,t,n){var r=t.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var i=r=r.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&Fs(t,n,s)}i=i.next}while(i!==r)}}function xi(e,t){if(t=t.updateQueue,t=t!==null?t.lastEffect:null,t!==null){var n=t=t.next;do{if((n.tag&e)===e){var r=n.create;n.destroy=r()}n=n.next}while(n!==t)}}function Us(e){var t=e.ref;if(t!==null){var n=e.stateNode;switch(e.tag){case 5:e=n;break;default:e=n}typeof t=="function"?t(e):t.current=e}}function ed(e){var t=e.alternate;t!==null&&(e.alternate=null,ed(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&(delete t[He],delete t[Wn],delete t[Cs],delete t[cp],delete t[pp])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function td(e){return e.tag===5||e.tag===3||e.tag===4}function Bo(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||td(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function zs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.nodeType===8?n.parentNode.insertBefore(e,t):n.insertBefore(e,t):(n.nodeType===8?(t=n.parentNode,t.insertBefore(e,n)):(t=n,t.appendChild(e)),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=Gr));else if(r!==4&&(e=e.child,e!==null))for(zs(e,t,n),e=e.sibling;e!==null;)zs(e,t,n),e=e.sibling}function Vs(e,t,n){var r=e.tag;if(r===5||r===6)e=e.stateNode,t?n.insertBefore(e,t):n.appendChild(e);else if(r!==4&&(e=e.child,e!==null))for(Vs(e,t,n),e=e.sibling;e!==null;)Vs(e,t,n),e=e.sibling}var se=null,_e=!1;function nt(e,t,n){for(n=n.child;n!==null;)nd(e,t,n),n=n.sibling}function nd(e,t,n){if(Be&&typeof Be.onCommitFiberUnmount=="function")try{Be.onCommitFiberUnmount(di,n)}catch{}switch(n.tag){case 5:de||Kt(n,t);case 6:var r=se,i=_e;se=null,nt(e,t,n),se=r,_e=i,se!==null&&(_e?(e=se,n=n.stateNode,e.nodeType===8?e.parentNode.removeChild(n):e.removeChild(n)):se.removeChild(n.stateNode));break;case 18:se!==null&&(_e?(e=se,n=n.stateNode,e.nodeType===8?Vi(e.parentNode,n):e.nodeType===1&&Vi(e,n),Bn(e)):Vi(se,n.stateNode));break;case 4:r=se,i=_e,se=n.stateNode.containerInfo,_e=!0,nt(e,t,n),se=r,_e=i;break;case 0:case 11:case 14:case 15:if(!de&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){i=r=r.next;do{var s=i,a=s.destroy;s=s.tag,a!==void 0&&(s&2||s&4)&&Fs(n,t,a),i=i.next}while(i!==r)}nt(e,t,n);break;case 1:if(!de&&(Kt(n,t),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){Y(n,t,l)}nt(e,t,n);break;case 21:nt(e,t,n);break;case 22:n.mode&1?(de=(r=de)||n.memoizedState!==null,nt(e,t,n),de=r):nt(e,t,n);break;default:nt(e,t,n)}}function $o(e){var t=e.updateQueue;if(t!==null){e.updateQueue=null;var n=e.stateNode;n===null&&(n=e.stateNode=new bp),t.forEach(function(r){var i=Mp.bind(null,e,r);n.has(r)||(n.add(r),r.then(i,i))})}}function ke(e,t){var n=t.deletions;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];try{var s=e,a=t,l=a;e:for(;l!==null;){switch(l.tag){case 5:se=l.stateNode,_e=!1;break e;case 3:se=l.stateNode.containerInfo,_e=!0;break e;case 4:se=l.stateNode.containerInfo,_e=!0;break e}l=l.return}if(se===null)throw Error(x(160));nd(s,a,i),se=null,_e=!1;var u=i.alternate;u!==null&&(u.return=null),i.return=null}catch(p){Y(i,t,p)}}if(t.subtreeFlags&12854)for(t=t.child;t!==null;)rd(t,e),t=t.sibling}function rd(e,t){var n=e.alternate,r=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(ke(t,e),ze(e),r&4){try{_n(3,e,e.return),xi(3,e)}catch(w){Y(e,e.return,w)}try{_n(5,e,e.return)}catch(w){Y(e,e.return,w)}}break;case 1:ke(t,e),ze(e),r&512&&n!==null&&Kt(n,n.return);break;case 5:if(ke(t,e),ze(e),r&512&&n!==null&&Kt(n,n.return),e.flags&32){var i=e.stateNode;try{Un(i,"")}catch(w){Y(e,e.return,w)}}if(r&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,a=n!==null?n.memoizedProps:s,l=e.type,u=e.updateQueue;if(e.updateQueue=null,u!==null)try{l==="input"&&s.type==="radio"&&s.name!=null&&Ll(i,s),ps(l,a);var p=ps(l,s);for(a=0;a<u.length;a+=2){var g=u[a],v=u[a+1];g==="style"?Rl(i,v):g==="dangerouslySetInnerHTML"?bl(i,v):g==="children"?Un(i,v):ta(i,g,v,p)}switch(l){case"input":os(i,s);break;case"textarea":Cl(i,s);break;case"select":var f=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var y=s.value;y!=null?Zt(i,!!s.multiple,y,!1):f!==!!s.multiple&&(s.defaultValue!=null?Zt(i,!!s.multiple,s.defaultValue,!0):Zt(i,!!s.multiple,s.multiple?[]:"",!1))}i[Wn]=s}catch(w){Y(e,e.return,w)}}break;case 6:if(ke(t,e),ze(e),r&4){if(e.stateNode===null)throw Error(x(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(w){Y(e,e.return,w)}}break;case 3:if(ke(t,e),ze(e),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Bn(t.containerInfo)}catch(w){Y(e,e.return,w)}break;case 4:ke(t,e),ze(e);break;case 13:ke(t,e),ze(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(ka=Z())),r&4&&$o(e);break;case 22:if(g=n!==null&&n.memoizedState!==null,e.mode&1?(de=(p=de)||g,ke(t,e),de=p):ke(t,e),ze(e),r&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!g&&e.mode&1)for(T=e,g=e.child;g!==null;){for(v=T=g;T!==null;){switch(f=T,y=f.child,f.tag){case 0:case 11:case 14:case 15:_n(4,f,f.return);break;case 1:Kt(f,f.return);var E=f.stateNode;if(typeof E.componentWillUnmount=="function"){r=f,n=f.return;try{t=r,E.props=t.memoizedProps,E.state=t.memoizedState,E.componentWillUnmount()}catch(w){Y(r,n,w)}}break;case 5:Kt(f,f.return);break;case 22:if(f.memoizedState!==null){Go(v);continue}}y!==null?(y.return=f,T=y):Go(v)}g=g.sibling}e:for(g=null,v=e;;){if(v.tag===5){if(g===null){g=v;try{i=v.stateNode,p?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(l=v.stateNode,u=v.memoizedProps.style,a=u!=null&&u.hasOwnProperty("display")?u.display:null,l.style.display=Al("display",a))}catch(w){Y(e,e.return,w)}}}else if(v.tag===6){if(g===null)try{v.stateNode.nodeValue=p?"":v.memoizedProps}catch(w){Y(e,e.return,w)}}else if((v.tag!==22&&v.tag!==23||v.memoizedState===null||v===e)&&v.child!==null){v.child.return=v,v=v.child;continue}if(v===e)break e;for(;v.sibling===null;){if(v.return===null||v.return===e)break e;g===v&&(g=null),v=v.return}g===v&&(g=null),v.sibling.return=v.return,v=v.sibling}}break;case 19:ke(t,e),ze(e),r&4&&$o(e);break;case 21:break;default:ke(t,e),ze(e)}}function ze(e){var t=e.flags;if(t&2){try{e:{for(var n=e.return;n!==null;){if(td(n)){var r=n;break e}n=n.return}throw Error(x(160))}switch(r.tag){case 5:var i=r.stateNode;r.flags&32&&(Un(i,""),r.flags&=-33);var s=Bo(e);Vs(e,s,i);break;case 3:case 4:var a=r.stateNode.containerInfo,l=Bo(e);zs(e,l,a);break;default:throw Error(x(161))}}catch(u){Y(e,e.return,u)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Rp(e,t,n){T=e,id(e)}function id(e,t,n){for(var r=(e.mode&1)!==0;T!==null;){var i=T,s=i.child;if(i.tag===22&&r){var a=i.memoizedState!==null||wr;if(!a){var l=i.alternate,u=l!==null&&l.memoizedState!==null||de;l=wr;var p=de;if(wr=a,(de=u)&&!p)for(T=i;T!==null;)a=T,u=a.child,a.tag===22&&a.memoizedState!==null?Jo(i):u!==null?(u.return=a,T=u):Jo(i);for(;s!==null;)T=s,id(s),s=s.sibling;T=i,wr=l,de=p}Qo(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,T=s):Qo(e)}}function Qo(e){for(;T!==null;){var t=T;if(t.flags&8772){var n=t.alternate;try{if(t.flags&8772)switch(t.tag){case 0:case 11:case 15:de||xi(5,t);break;case 1:var r=t.stateNode;if(t.flags&4&&!de)if(n===null)r.componentDidMount();else{var i=t.elementType===t.type?n.memoizedProps:De(t.type,n.memoizedProps);r.componentDidUpdate(i,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var s=t.updateQueue;s!==null&&Ro(t,s,r);break;case 3:var a=t.updateQueue;if(a!==null){if(n=null,t.child!==null)switch(t.child.tag){case 5:n=t.child.stateNode;break;case 1:n=t.child.stateNode}Ro(t,a,n)}break;case 5:var l=t.stateNode;if(n===null&&t.flags&4){n=l;var u=t.memoizedProps;switch(t.type){case"button":case"input":case"select":case"textarea":u.autoFocus&&n.focus();break;case"img":u.src&&(n.src=u.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(t.memoizedState===null){var p=t.alternate;if(p!==null){var g=p.memoizedState;if(g!==null){var v=g.dehydrated;v!==null&&Bn(v)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}de||t.flags&512&&Us(t)}catch(f){Y(t,t.return,f)}}if(t===e){T=null;break}if(n=t.sibling,n!==null){n.return=t.return,T=n;break}T=t.return}}function Go(e){for(;T!==null;){var t=T;if(t===e){T=null;break}var n=t.sibling;if(n!==null){n.return=t.return,T=n;break}T=t.return}}function Jo(e){for(;T!==null;){var t=T;try{switch(t.tag){case 0:case 11:case 15:var n=t.return;try{xi(4,t)}catch(u){Y(t,n,u)}break;case 1:var r=t.stateNode;if(typeof r.componentDidMount=="function"){var i=t.return;try{r.componentDidMount()}catch(u){Y(t,i,u)}}var s=t.return;try{Us(t)}catch(u){Y(t,s,u)}break;case 5:var a=t.return;try{Us(t)}catch(u){Y(t,a,u)}}}catch(u){Y(t,t.return,u)}if(t===e){T=null;break}var l=t.sibling;if(l!==null){l.return=t.return,T=l;break}T=t.return}}var Pp=Math.ceil,ii=tt.ReactCurrentDispatcher,qa=tt.ReactCurrentOwner,Pe=tt.ReactCurrentBatchConfig,O=0,ie=null,ee=null,ae=0,we=0,Yt=jt(0),ne=0,tr=null,_t=0,yi=0,Ia=0,On=null,ge=null,ka=0,mn=1/0,Qe=null,si=!1,Hs=null,ft=null,Sr=!1,lt=null,ai=0,Mn=0,Bs=null,_r=-1,Or=0;function me(){return O&6?Z():_r!==-1?_r:_r=Z()}function vt(e){return e.mode&1?O&2&&ae!==0?ae&-ae:fp.transition!==null?(Or===0&&(Or=Vl()),Or):(e=z,e!==0||(e=window.event,e=e===void 0?16:Wl(e.type)),e):1}function Fe(e,t,n,r){if(50<Mn)throw Mn=0,Bs=null,Error(x(185));rr(e,n,r),(!(O&2)||e!==ie)&&(e===ie&&(!(O&2)&&(yi|=n),ne===4&&at(e,ae)),je(e,r),n===1&&O===0&&!(t.mode&1)&&(mn=Z()+500,vi&&Et()))}function je(e,t){var n=e.callbackNode;fc(e,t);var r=Hr(e,e===ie?ae:0);if(r===0)n!==null&&no(n),e.callbackNode=null,e.callbackPriority=0;else if(t=r&-r,e.callbackPriority!==t){if(n!=null&&no(n),t===1)e.tag===0?mp(Wo.bind(null,e)):fu(Wo.bind(null,e)),up(function(){!(O&6)&&Et()}),n=null;else{switch(Hl(r)){case 1:n=aa;break;case 4:n=Ul;break;case 16:n=Vr;break;case 536870912:n=zl;break;default:n=Vr}n=pd(n,sd.bind(null,e))}e.callbackPriority=t,e.callbackNode=n}}function sd(e,t){if(_r=-1,Or=0,O&6)throw Error(x(327));var n=e.callbackNode;if(sn()&&e.callbackNode!==n)return null;var r=Hr(e,e===ie?ae:0);if(r===0)return null;if(r&30||r&e.expiredLanes||t)t=oi(e,r);else{t=r;var i=O;O|=2;var s=od();(ie!==e||ae!==t)&&(Qe=null,mn=Z()+500,Pt(e,t));do try{kp();break}catch(l){ad(e,l)}while(!0);ya(),ii.current=s,O=i,ee!==null?t=0:(ie=null,ae=0,t=ne)}if(t!==0){if(t===2&&(i=hs(e),i!==0&&(r=i,t=$s(e,i))),t===1)throw n=tr,Pt(e,0),at(e,r),je(e,Z()),n;if(t===6)at(e,r);else{if(i=e.current.alternate,!(r&30)&&!qp(i)&&(t=oi(e,r),t===2&&(s=hs(e),s!==0&&(r=s,t=$s(e,s))),t===1))throw n=tr,Pt(e,0),at(e,r),je(e,Z()),n;switch(e.finishedWork=i,e.finishedLanes=r,t){case 0:case 1:throw Error(x(345));case 2:Tt(e,ge,Qe);break;case 3:if(at(e,r),(r&130023424)===r&&(t=ka+500-Z(),10<t)){if(Hr(e,0)!==0)break;if(i=e.suspendedLanes,(i&r)!==r){me(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=Ls(Tt.bind(null,e,ge,Qe),t);break}Tt(e,ge,Qe);break;case 4:if(at(e,r),(r&4194240)===r)break;for(t=e.eventTimes,i=-1;0<r;){var a=31-Me(r);s=1<<a,a=t[a],a>i&&(i=a),r&=~s}if(r=i,r=Z()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*Pp(r/1960))-r,10<r){e.timeoutHandle=Ls(Tt.bind(null,e,ge,Qe),r);break}Tt(e,ge,Qe);break;case 5:Tt(e,ge,Qe);break;default:throw Error(x(329))}}}return je(e,Z()),e.callbackNode===n?sd.bind(null,e):null}function $s(e,t){var n=On;return e.current.memoizedState.isDehydrated&&(Pt(e,t).flags|=256),e=oi(e,t),e!==2&&(t=ge,ge=n,t!==null&&Qs(t)),e}function Qs(e){ge===null?ge=e:ge.push.apply(ge,e)}function qp(e){for(var t=e;;){if(t.flags&16384){var n=t.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var i=n[r],s=i.getSnapshot;i=i.value;try{if(!Ue(s(),i))return!1}catch{return!1}}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function at(e,t){for(t&=~Ia,t&=~yi,e.suspendedLanes|=t,e.pingedLanes&=~t,e=e.expirationTimes;0<t;){var n=31-Me(t),r=1<<n;e[n]=-1,t&=~r}}function Wo(e){if(O&6)throw Error(x(327));sn();var t=Hr(e,0);if(!(t&1))return je(e,Z()),null;var n=oi(e,t);if(e.tag!==0&&n===2){var r=hs(e);r!==0&&(t=r,n=$s(e,r))}if(n===1)throw n=tr,Pt(e,0),at(e,t),je(e,Z()),n;if(n===6)throw Error(x(345));return e.finishedWork=e.current.alternate,e.finishedLanes=t,Tt(e,ge,Qe),je(e,Z()),null}function Da(e,t){var n=O;O|=1;try{return e(t)}finally{O=n,O===0&&(mn=Z()+500,vi&&Et())}}function Ot(e){lt!==null&&lt.tag===0&&!(O&6)&&sn();var t=O;O|=1;var n=Pe.transition,r=z;try{if(Pe.transition=null,z=1,e)return e()}finally{z=r,Pe.transition=n,O=t,!(O&6)&&Et()}}function _a(){we=Yt.current,Q(Yt)}function Pt(e,t){e.finishedWork=null,e.finishedLanes=0;var n=e.timeoutHandle;if(n!==-1&&(e.timeoutHandle=-1,lp(n)),ee!==null)for(n=ee.return;n!==null;){var r=n;switch(ga(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&Jr();break;case 3:cn(),Q(xe),Q(ce),La();break;case 5:Na(r);break;case 4:cn();break;case 13:Q(W);break;case 19:Q(W);break;case 10:ja(r.type._context);break;case 22:case 23:_a()}n=n.return}if(ie=e,ee=e=gt(e.current,null),ae=we=t,ne=0,tr=null,Ia=yi=_t=0,ge=On=null,At!==null){for(t=0;t<At.length;t++)if(n=At[t],r=n.interleaved,r!==null){n.interleaved=null;var i=r.next,s=n.pending;if(s!==null){var a=s.next;s.next=i,r.next=a}n.pending=r}At=null}return e}function ad(e,t){do{var n=ee;try{if(ya(),Ir.current=ri,ni){for(var r=X.memoizedState;r!==null;){var i=r.queue;i!==null&&(i.pending=null),r=r.next}ni=!1}if(Dt=0,re=te=X=null,Dn=!1,Yn=0,qa.current=null,n===null||n.return===null){ne=1,tr=t,ee=null;break}e:{var s=e,a=n.return,l=n,u=t;if(t=ae,l.flags|=32768,u!==null&&typeof u=="object"&&typeof u.then=="function"){var p=u,g=l,v=g.tag;if(!(g.mode&1)&&(v===0||v===11||v===15)){var f=g.alternate;f?(g.updateQueue=f.updateQueue,g.memoizedState=f.memoizedState,g.lanes=f.lanes):(g.updateQueue=null,g.memoizedState=null)}var y=_o(a);if(y!==null){y.flags&=-257,Oo(y,a,l,s,t),y.mode&1&&Do(s,p,t),t=y,u=p;var E=t.updateQueue;if(E===null){var w=new Set;w.add(u),t.updateQueue=w}else E.add(u);break e}else{if(!(t&1)){Do(s,p,t),Oa();break e}u=Error(x(426))}}else if(G&&l.mode&1){var M=_o(a);if(M!==null){!(M.flags&65536)&&(M.flags|=256),Oo(M,a,l,s,t),ha(pn(u,l));break e}}s=u=pn(u,l),ne!==4&&(ne=2),On===null?On=[s]:On.push(s),s=a;do{switch(s.tag){case 3:s.flags|=65536,t&=-t,s.lanes|=t;var c=Hu(s,u,t);Ao(s,c);break e;case 1:l=u;var d=s.type,m=s.stateNode;if(!(s.flags&128)&&(typeof d.getDerivedStateFromError=="function"||m!==null&&typeof m.componentDidCatch=="function"&&(ft===null||!ft.has(m)))){s.flags|=65536,t&=-t,s.lanes|=t;var h=Bu(s,l,t);Ao(s,h);break e}}s=s.return}while(s!==null)}ud(n)}catch(N){t=N,ee===n&&n!==null&&(ee=n=n.return);continue}break}while(!0)}function od(){var e=ii.current;return ii.current=ri,e===null?ri:e}function Oa(){(ne===0||ne===3||ne===2)&&(ne=4),ie===null||!(_t&268435455)&&!(yi&268435455)||at(ie,ae)}function oi(e,t){var n=O;O|=2;var r=od();(ie!==e||ae!==t)&&(Qe=null,Pt(e,t));do try{Ip();break}catch(i){ad(e,i)}while(!0);if(ya(),O=n,ii.current=r,ee!==null)throw Error(x(261));return ie=null,ae=0,ne}function Ip(){for(;ee!==null;)ld(ee)}function kp(){for(;ee!==null&&!sc();)ld(ee)}function ld(e){var t=cd(e.alternate,e,we);e.memoizedProps=e.pendingProps,t===null?ud(e):ee=t,qa.current=null}function ud(e){var t=e;do{var n=t.alternate;if(e=t.return,t.flags&32768){if(n=Tp(n,t),n!==null){n.flags&=32767,ee=n;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{ne=6,ee=null;return}}else if(n=Cp(n,t,we),n!==null){ee=n;return}if(t=t.sibling,t!==null){ee=t;return}ee=t=e}while(t!==null);ne===0&&(ne=5)}function Tt(e,t,n){var r=z,i=Pe.transition;try{Pe.transition=null,z=1,Dp(e,t,n,r)}finally{Pe.transition=i,z=r}return null}function Dp(e,t,n,r){do sn();while(lt!==null);if(O&6)throw Error(x(327));n=e.finishedWork;var i=e.finishedLanes;if(n===null)return null;if(e.finishedWork=null,e.finishedLanes=0,n===e.current)throw Error(x(177));e.callbackNode=null,e.callbackPriority=0;var s=n.lanes|n.childLanes;if(vc(e,s),e===ie&&(ee=ie=null,ae=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Sr||(Sr=!0,pd(Vr,function(){return sn(),null})),s=(n.flags&15990)!==0,n.subtreeFlags&15990||s){s=Pe.transition,Pe.transition=null;var a=z;z=1;var l=O;O|=4,qa.current=null,Ap(e,n),rd(n,e),tp(Ss),Br=!!ws,Ss=ws=null,e.current=n,Rp(n),ac(),O=l,z=a,Pe.transition=s}else e.current=n;if(Sr&&(Sr=!1,lt=e,ai=i),s=e.pendingLanes,s===0&&(ft=null),uc(n.stateNode),je(e,Z()),t!==null)for(r=e.onRecoverableError,n=0;n<t.length;n++)i=t[n],r(i.value,{componentStack:i.stack,digest:i.digest});if(si)throw si=!1,e=Hs,Hs=null,e;return ai&1&&e.tag!==0&&sn(),s=e.pendingLanes,s&1?e===Bs?Mn++:(Mn=0,Bs=e):Mn=0,Et(),null}function sn(){if(lt!==null){var e=Hl(ai),t=Pe.transition,n=z;try{if(Pe.transition=null,z=16>e?16:e,lt===null)var r=!1;else{if(e=lt,lt=null,ai=0,O&6)throw Error(x(331));var i=O;for(O|=4,T=e.current;T!==null;){var s=T,a=s.child;if(T.flags&16){var l=s.deletions;if(l!==null){for(var u=0;u<l.length;u++){var p=l[u];for(T=p;T!==null;){var g=T;switch(g.tag){case 0:case 11:case 15:_n(8,g,s)}var v=g.child;if(v!==null)v.return=g,T=v;else for(;T!==null;){g=T;var f=g.sibling,y=g.return;if(ed(g),g===p){T=null;break}if(f!==null){f.return=y,T=f;break}T=y}}}var E=s.alternate;if(E!==null){var w=E.child;if(w!==null){E.child=null;do{var M=w.sibling;w.sibling=null,w=M}while(w!==null)}}T=s}}if(s.subtreeFlags&2064&&a!==null)a.return=s,T=a;else e:for(;T!==null;){if(s=T,s.flags&2048)switch(s.tag){case 0:case 11:case 15:_n(9,s,s.return)}var c=s.sibling;if(c!==null){c.return=s.return,T=c;break e}T=s.return}}var d=e.current;for(T=d;T!==null;){a=T;var m=a.child;if(a.subtreeFlags&2064&&m!==null)m.return=a,T=m;else e:for(a=d;T!==null;){if(l=T,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:xi(9,l)}}catch(N){Y(l,l.return,N)}if(l===a){T=null;break e}var h=l.sibling;if(h!==null){h.return=l.return,T=h;break e}T=l.return}}if(O=i,Et(),Be&&typeof Be.onPostCommitFiberRoot=="function")try{Be.onPostCommitFiberRoot(di,e)}catch{}r=!0}return r}finally{z=n,Pe.transition=t}}return!1}function Xo(e,t,n){t=pn(n,t),t=Hu(e,t,1),e=mt(e,t,1),t=me(),e!==null&&(rr(e,1,t),je(e,t))}function Y(e,t,n){if(e.tag===3)Xo(e,e,n);else for(;t!==null;){if(t.tag===3){Xo(t,e,n);break}else if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(ft===null||!ft.has(r))){e=pn(n,e),e=Bu(t,e,1),t=mt(t,e,1),e=me(),t!==null&&(rr(t,1,e),je(t,e));break}}t=t.return}}function _p(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),t=me(),e.pingedLanes|=e.suspendedLanes&n,ie===e&&(ae&n)===n&&(ne===4||ne===3&&(ae&130023424)===ae&&500>Z()-ka?Pt(e,0):Ia|=n),je(e,t)}function dd(e,t){t===0&&(e.mode&1?(t=mr,mr<<=1,!(mr&130023424)&&(mr=4194304)):t=1);var n=me();e=Ze(e,t),e!==null&&(rr(e,t,n),je(e,n))}function Op(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),dd(e,n)}function Mp(e,t){var n=0;switch(e.tag){case 13:var r=e.stateNode,i=e.memoizedState;i!==null&&(n=i.retryLane);break;case 19:r=e.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(t),dd(e,n)}var cd;cd=function(e,t,n){if(e!==null)if(e.memoizedProps!==t.pendingProps||xe.current)he=!0;else{if(!(e.lanes&n)&&!(t.flags&128))return he=!1,Lp(e,t,n);he=!!(e.flags&131072)}else he=!1,G&&t.flags&1048576&&vu(t,Kr,t.index);switch(t.lanes=0,t.tag){case 2:var r=t.type;Dr(e,t),e=t.pendingProps;var i=ln(t,ce.current);rn(t,n),i=Ta(null,t,r,e,i,n);var s=ba();return t.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(t.tag=1,t.memoizedState=null,t.updateQueue=null,ye(r)?(s=!0,Wr(t)):s=!1,t.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,wa(t),i.updater=hi,t.stateNode=i,i._reactInternals=t,qs(t,r,e,n),t=Ds(null,t,r,!0,s,n)):(t.tag=0,G&&s&&va(t),pe(null,t,i,n),t=t.child),t;case 16:r=t.elementType;e:{switch(Dr(e,t),e=t.pendingProps,i=r._init,r=i(r._payload),t.type=r,i=t.tag=Up(r),e=De(r,e),i){case 0:t=ks(null,t,r,e,n);break e;case 1:t=Uo(null,t,r,e,n);break e;case 11:t=Mo(null,t,r,e,n);break e;case 14:t=Fo(null,t,r,De(r.type,e),n);break e}throw Error(x(306,r,""))}return t;case 0:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:De(r,i),ks(e,t,r,i,n);case 1:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:De(r,i),Uo(e,t,r,i,n);case 3:e:{if(Ju(t),e===null)throw Error(x(387));r=t.pendingProps,s=t.memoizedState,i=s.element,Eu(e,t),ei(t,r,null,n);var a=t.memoizedState;if(r=a.element,s.isDehydrated)if(s={element:r,isDehydrated:!1,cache:a.cache,pendingSuspenseBoundaries:a.pendingSuspenseBoundaries,transitions:a.transitions},t.updateQueue.baseState=s,t.memoizedState=s,t.flags&256){i=pn(Error(x(423)),t),t=zo(e,t,r,n,i);break e}else if(r!==i){i=pn(Error(x(424)),t),t=zo(e,t,r,n,i);break e}else for(Se=pt(t.stateNode.containerInfo.firstChild),Ne=t,G=!0,Oe=null,n=yu(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(un(),r===i){t=et(e,t,n);break e}pe(e,t,r,n)}t=t.child}return t;case 5:return wu(t),e===null&&As(t),r=t.type,i=t.pendingProps,s=e!==null?e.memoizedProps:null,a=i.children,Ns(r,i)?a=null:s!==null&&Ns(r,s)&&(t.flags|=32),Gu(e,t),pe(e,t,a,n),t.child;case 6:return e===null&&As(t),null;case 13:return Wu(e,t,n);case 4:return Sa(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=dn(t,null,r,n):pe(e,t,r,n),t.child;case 11:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:De(r,i),Mo(e,t,r,i,n);case 7:return pe(e,t,t.pendingProps,n),t.child;case 8:return pe(e,t,t.pendingProps.children,n),t.child;case 12:return pe(e,t,t.pendingProps.children,n),t.child;case 10:e:{if(r=t.type._context,i=t.pendingProps,s=t.memoizedProps,a=i.value,H(Yr,r._currentValue),r._currentValue=a,s!==null)if(Ue(s.value,a)){if(s.children===i.children&&!xe.current){t=et(e,t,n);break e}}else for(s=t.child,s!==null&&(s.return=t);s!==null;){var l=s.dependencies;if(l!==null){a=s.child;for(var u=l.firstContext;u!==null;){if(u.context===r){if(s.tag===1){u=Xe(-1,n&-n),u.tag=2;var p=s.updateQueue;if(p!==null){p=p.shared;var g=p.pending;g===null?u.next=u:(u.next=g.next,g.next=u),p.pending=u}}s.lanes|=n,u=s.alternate,u!==null&&(u.lanes|=n),Rs(s.return,n,t),l.lanes|=n;break}u=u.next}}else if(s.tag===10)a=s.type===t.type?null:s.child;else if(s.tag===18){if(a=s.return,a===null)throw Error(x(341));a.lanes|=n,l=a.alternate,l!==null&&(l.lanes|=n),Rs(a,n,t),a=s.sibling}else a=s.child;if(a!==null)a.return=s;else for(a=s;a!==null;){if(a===t){a=null;break}if(s=a.sibling,s!==null){s.return=a.return,a=s;break}a=a.return}s=a}pe(e,t,i.children,n),t=t.child}return t;case 9:return i=t.type,r=t.pendingProps.children,rn(t,n),i=qe(i),r=r(i),t.flags|=1,pe(e,t,r,n),t.child;case 14:return r=t.type,i=De(r,t.pendingProps),i=De(r.type,i),Fo(e,t,r,i,n);case 15:return $u(e,t,t.type,t.pendingProps,n);case 17:return r=t.type,i=t.pendingProps,i=t.elementType===r?i:De(r,i),Dr(e,t),t.tag=1,ye(r)?(e=!0,Wr(t)):e=!1,rn(t,n),Vu(t,r,i),qs(t,r,i,n),Ds(null,t,r,!0,e,n);case 19:return Xu(e,t,n);case 22:return Qu(e,t,n)}throw Error(x(156,t.tag))};function pd(e,t){return Fl(e,t)}function Fp(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Re(e,t,n,r){return new Fp(e,t,n,r)}function Ma(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Up(e){if(typeof e=="function")return Ma(e)?1:0;if(e!=null){if(e=e.$$typeof,e===ra)return 11;if(e===ia)return 14}return 2}function gt(e,t){var n=e.alternate;return n===null?(n=Re(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&14680064,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n}function Mr(e,t,n,r,i,s){var a=2;if(r=e,typeof e=="function")Ma(e)&&(a=1);else if(typeof e=="string")a=5;else e:switch(e){case Vt:return qt(n.children,i,s,t);case na:a=8,i|=8;break;case ns:return e=Re(12,n,t,i|2),e.elementType=ns,e.lanes=s,e;case rs:return e=Re(13,n,t,i),e.elementType=rs,e.lanes=s,e;case is:return e=Re(19,n,t,i),e.elementType=is,e.lanes=s,e;case wl:return ji(n,i,s,t);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case jl:a=10;break e;case El:a=9;break e;case ra:a=11;break e;case ia:a=14;break e;case rt:a=16,r=null;break e}throw Error(x(130,e==null?e:typeof e,""))}return t=Re(a,n,t,i),t.elementType=e,t.type=r,t.lanes=s,t}function qt(e,t,n,r){return e=Re(7,e,r,t),e.lanes=n,e}function ji(e,t,n,r){return e=Re(22,e,r,t),e.elementType=wl,e.lanes=n,e.stateNode={isHidden:!1},e}function Xi(e,t,n){return e=Re(6,e,null,t),e.lanes=n,e}function Ki(e,t,n){return t=Re(4,e.children!==null?e.children:[],e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}function zp(e,t,n,r,i){this.tag=t,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Pi(0),this.expirationTimes=Pi(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Pi(0),this.identifierPrefix=r,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Fa(e,t,n,r,i,s,a,l,u){return e=new zp(e,t,n,l,u),t===1?(t=1,s===!0&&(t|=8)):t=0,s=Re(3,null,null,t),e.current=s,s.stateNode=e,s.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},wa(s),e}function Vp(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:zt,key:r==null?null:""+r,children:e,containerInfo:t,implementation:n}}function md(e){if(!e)return xt;e=e._reactInternals;e:{if(Ft(e)!==e||e.tag!==1)throw Error(x(170));var t=e;do{switch(t.tag){case 3:t=t.stateNode.context;break e;case 1:if(ye(t.type)){t=t.stateNode.__reactInternalMemoizedMergedChildContext;break e}}t=t.return}while(t!==null);throw Error(x(171))}if(e.tag===1){var n=e.type;if(ye(n))return mu(e,n,t)}return t}function fd(e,t,n,r,i,s,a,l,u){return e=Fa(n,r,!0,e,i,s,a,l,u),e.context=md(null),n=e.current,r=me(),i=vt(n),s=Xe(r,i),s.callback=t??null,mt(n,s,i),e.current.lanes=i,rr(e,i,r),je(e,r),e}function Ei(e,t,n,r){var i=t.current,s=me(),a=vt(i);return n=md(n),t.context===null?t.context=n:t.pendingContext=n,t=Xe(s,a),t.payload={element:e},r=r===void 0?null:r,r!==null&&(t.callback=r),e=mt(i,t,a),e!==null&&(Fe(e,i,a,s),qr(e,i,a)),a}function li(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Ko(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function Ua(e,t){Ko(e,t),(e=e.alternate)&&Ko(e,t)}function Hp(){return null}var vd=typeof reportError=="function"?reportError:function(e){console.error(e)};function za(e){this._internalRoot=e}wi.prototype.render=za.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(x(409));Ei(e,t,null,null)};wi.prototype.unmount=za.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;Ot(function(){Ei(null,e,null,null)}),t[Ye]=null}};function wi(e){this._internalRoot=e}wi.prototype.unstable_scheduleHydration=function(e){if(e){var t=Ql();e={blockedOn:null,target:e,priority:t};for(var n=0;n<st.length&&t!==0&&t<st[n].priority;n++);st.splice(n,0,e),n===0&&Jl(e)}};function Va(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Si(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Yo(){}function Bp(e,t,n,r,i){if(i){if(typeof r=="function"){var s=r;r=function(){var p=li(a);s.call(p)}}var a=fd(t,r,e,0,null,!1,!1,"",Yo);return e._reactRootContainer=a,e[Ye]=a.current,Gn(e.nodeType===8?e.parentNode:e),Ot(),a}for(;i=e.lastChild;)e.removeChild(i);if(typeof r=="function"){var l=r;r=function(){var p=li(u);l.call(p)}}var u=Fa(e,0,!1,null,null,!1,!1,"",Yo);return e._reactRootContainer=u,e[Ye]=u.current,Gn(e.nodeType===8?e.parentNode:e),Ot(function(){Ei(t,u,n,r)}),u}function Ni(e,t,n,r,i){var s=n._reactRootContainer;if(s){var a=s;if(typeof i=="function"){var l=i;i=function(){var u=li(a);l.call(u)}}Ei(t,a,e,i)}else a=Bp(n,t,e,i,r);return li(a)}Bl=function(e){switch(e.tag){case 3:var t=e.stateNode;if(t.current.memoizedState.isDehydrated){var n=Tn(t.pendingLanes);n!==0&&(oa(t,n|1),je(t,Z()),!(O&6)&&(mn=Z()+500,Et()))}break;case 13:Ot(function(){var r=Ze(e,1);if(r!==null){var i=me();Fe(r,e,1,i)}}),Ua(e,1)}};la=function(e){if(e.tag===13){var t=Ze(e,134217728);if(t!==null){var n=me();Fe(t,e,134217728,n)}Ua(e,134217728)}};$l=function(e){if(e.tag===13){var t=vt(e),n=Ze(e,t);if(n!==null){var r=me();Fe(n,e,t,r)}Ua(e,t)}};Ql=function(){return z};Gl=function(e,t){var n=z;try{return z=e,t()}finally{z=n}};fs=function(e,t,n){switch(t){case"input":if(os(e,n),t=n.name,n.type==="radio"&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+t)+'][type="radio"]'),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var i=fi(r);if(!i)throw Error(x(90));Nl(r),os(r,i)}}}break;case"textarea":Cl(e,n);break;case"select":t=n.value,t!=null&&Zt(e,!!n.multiple,t,!1)}};Il=Da;kl=Ot;var $p={usingClientEntryPoint:!1,Events:[sr,Qt,fi,Pl,ql,Da]},Nn={findFiberByHostInstance:bt,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Qp={bundleType:Nn.bundleType,version:Nn.version,rendererPackageName:Nn.rendererPackageName,rendererConfig:Nn.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:tt.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Ol(e),e===null?null:e.stateNode},findFiberByHostInstance:Nn.findFiberByHostInstance||Hp,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Nr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Nr.isDisabled&&Nr.supportsFiber)try{di=Nr.inject(Qp),Be=Nr}catch{}}Ce.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$p;Ce.createPortal=function(e,t){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Va(t))throw Error(x(200));return Vp(e,t,null,n)};Ce.createRoot=function(e,t){if(!Va(e))throw Error(x(299));var n=!1,r="",i=vd;return t!=null&&(t.unstable_strictMode===!0&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onRecoverableError!==void 0&&(i=t.onRecoverableError)),t=Fa(e,1,!1,null,null,n,!1,r,i),e[Ye]=t.current,Gn(e.nodeType===8?e.parentNode:e),new za(t)};Ce.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var t=e._reactInternals;if(t===void 0)throw typeof e.render=="function"?Error(x(188)):(e=Object.keys(e).join(","),Error(x(268,e)));return e=Ol(t),e=e===null?null:e.stateNode,e};Ce.flushSync=function(e){return Ot(e)};Ce.hydrate=function(e,t,n){if(!Si(t))throw Error(x(200));return Ni(null,e,t,!0,n)};Ce.hydrateRoot=function(e,t,n){if(!Va(e))throw Error(x(405));var r=n!=null&&n.hydratedSources||null,i=!1,s="",a=vd;if(n!=null&&(n.unstable_strictMode===!0&&(i=!0),n.identifierPrefix!==void 0&&(s=n.identifierPrefix),n.onRecoverableError!==void 0&&(a=n.onRecoverableError)),t=fd(t,null,e,1,n??null,i,!1,s,a),e[Ye]=t.current,Gn(e),r)for(e=0;e<r.length;e++)n=r[e],i=n._getVersion,i=i(n._source),t.mutableSourceEagerHydrationData==null?t.mutableSourceEagerHydrationData=[n,i]:t.mutableSourceEagerHydrationData.push(n,i);return new wi(t)};Ce.render=function(e,t,n){if(!Si(t))throw Error(x(200));return Ni(null,e,t,!1,n)};Ce.unmountComponentAtNode=function(e){if(!Si(e))throw Error(x(40));return e._reactRootContainer?(Ot(function(){Ni(null,null,e,!1,function(){e._reactRootContainer=null,e[Ye]=null})}),!0):!1};Ce.unstable_batchedUpdates=Da;Ce.unstable_renderSubtreeIntoContainer=function(e,t,n,r){if(!Si(n))throw Error(x(200));if(e==null||e._reactInternals===void 0)throw Error(x(38));return Ni(e,t,n,!1,r)};Ce.version="18.3.1-next-f1338f8080-20240426";function gd(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(gd)}catch(e){console.error(e)}}gd(),gl.exports=Ce;var Gp=gl.exports,hd,Zo=Gp;hd=Zo.createRoot,Zo.hydrateRoot;/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var Jp={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wp=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),J=(e,t)=>{const n=_.forwardRef(({color:r="currentColor",size:i=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:l="",children:u,...p},g)=>_.createElement("svg",{ref:g,...Jp,width:i,height:i,stroke:r,strokeWidth:a?Number(s)*24/Number(i):s,className:["lucide",`lucide-${Wp(e)}`,l].join(" "),...p},[...t.map(([v,f])=>_.createElement(v,f)),...Array.isArray(u)?u:[u]]));return n.displayName=`${e}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xd=J("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xp=J("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Lr=J("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const An=J("ChevronRight",[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kp=J("Clock",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["polyline",{points:"12 6 12 12 16 14",key:"68esgv"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yp=J("FileText",[["path",{d:"M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z",key:"1rqfz7"}],["path",{d:"M14 2v4a2 2 0 0 0 2 2h4",key:"tnqrlb"}],["path",{d:"M10 9H8",key:"b1mrlr"}],["path",{d:"M16 13H8",key:"t4e002"}],["path",{d:"M16 17H8",key:"z1uh3a"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gs=J("HelpCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3",key:"1u773s"}],["path",{d:"M12 17h.01",key:"p32p05"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zp=J("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const em=J("Mail",[["rect",{width:"20",height:"16",x:"2",y:"4",rx:"2",key:"18n3k1"}],["path",{d:"m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7",key:"1ocrg3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tm=J("MapPin",[["path",{d:"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z",key:"2oe9fu"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nm=J("MicOff",[["line",{x1:"2",x2:"22",y1:"2",y2:"22",key:"a6p6uj"}],["path",{d:"M18.89 13.23A7.12 7.12 0 0 0 19 12v-2",key:"80xlxr"}],["path",{d:"M5 10v2a7 7 0 0 0 12 5",key:"p2k8kg"}],["path",{d:"M15 9.34V5a3 3 0 0 0-5.68-1.33",key:"1gzdoj"}],["path",{d:"M9 9v3a3 3 0 0 0 5.12 2.12",key:"r2i35w"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const el=J("Mic",[["path",{d:"M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z",key:"131961"}],["path",{d:"M19 10v2a7 7 0 0 1-14 0v-2",key:"1vc78b"}],["line",{x1:"12",x2:"12",y1:"19",y2:"22",key:"x3vr5v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rm=J("Pause",[["rect",{width:"4",height:"16",x:"6",y:"4",key:"iffhe4"}],["rect",{width:"4",height:"16",x:"14",y:"4",key:"sjin7j"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const im=J("Phone",[["path",{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z",key:"foiqr5"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const sm=J("Play",[["polygon",{points:"5 3 19 12 5 21 5 3",key:"191637"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const am=J("Scale",[["path",{d:"m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"7g6ntu"}],["path",{d:"m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z",key:"ijws7r"}],["path",{d:"M7 21h10",key:"1b0cd5"}],["path",{d:"M12 3v18",key:"108xh3"}],["path",{d:"M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2",key:"3gwbw2"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yd=J("Search",[["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}],["path",{d:"m21 21-4.3-4.3",key:"1qie3q"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const tl=J("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Yi=J("Shield",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const om=J("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Zi=J("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const lm=J("Volume2",[["polygon",{points:"11 5 6 9 2 9 2 15 6 15 11 19 11 5",key:"16drj5"}],["path",{d:"M15.54 8.46a5 5 0 0 1 0 7.07",key:"ltjumu"}],["path",{d:"M19.07 4.93a10 10 0 0 1 0 14.14",key:"1kegas"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=J("X",[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const nl=J("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),um=`
{
    "chapitres": [
        {
            "titre": "Chapitre 1 : Le temps de travail",
            "page": 7,
            "mots_cles": [
                "durée légale",
                "temps de travail",
                "plages fixes",
                "plages souplesse",
                "heures supplémentaires",
                "astreintes",
                "travail de nuit",
                "temps partiel",
                "journée solidarité",
                "sujétions"
            ],
            "articles": [
                {
                    "titre": "Article 1 : Définition",
                    "page": 7,
                    "mots_cles": [
                        "travail effectif",
                        "arrêt maladie",
                        "position d'activité",
                        "1607h",
                        "jours travaillés",
                        "jours fériés",
                        "repos hebdo",
                        "solidarité"
                    ]
                },
                {
                    "titre": "Article 2 : Les durées du temps de travail",
                    "page": 7,
                    "mots_cles": [
                        "cycles hebdomadaires",
                        "annualisation",
                        "jours non travaillés",
                        "JNT",
                        "temps de travail",
                        "crèches",
                        "37h",
                        "38h"
                    ]
                },
                {
                    "titre": "Article 3 : Les plages fixes et plages de souplesse",
                    "page": 8,
                    "mots_cles": [
                        "plages fixes",
                        "plages souplesse",
                        "horaires variables",
                        "présence obligatoire",
                        "planning",
                        "flexibilité",
                        "pause méridienne",
                        "présentiel"
                    ]
                },
                {
                    "titre": "Article 4 : Les garanties minimales",
                    "page": 9,
                    "mots_cles": [
                        "repos quotidien",
                        "repos hebdomadaire",
                        "pause",
                        "amplitude",
                        "travail de nuit",
                        "décret 2000-815",
                        "dérogations",
                        "service public"
                    ]
                },
                {
                    "titre": "Article 5 : Heures supplémentaires et complémentaires",
                    "page": 9,
                    "mots_cles": [
                        "heures supplémentaires",
                        "majoration",
                        "récupération",
                        "dimanche",
                        "nuit",
                        "formulaire",
                        "agents B et C",
                        "25 heures"
                    ]
                },
                {
                    "titre": "Article 6 : Le temps partiel",
                    "page": 10,
                    "mots_cles": [
                        "temps partiel",
                        "quotité",
                        "temps partiel de droit",
                        "temps partiel sur autorisation",
                        "rémunération",
                        "congés",
                        "retraite",
                        "surcotisation"
                    ]
                },
                {
                    "titre": "Article 7 : La journée de solidarité",
                    "page": 14,
                    "mots_cles": [
                        "solidarité",
                        "7h",
                        "fractionnement",
                        "RTT",
                        "jour férié",
                        "congés",
                        "modalités",
                        "temps partiel"
                    ]
                },
                {
                    "titre": "Article 8 : Les astreintes et permanences",
                    "page": 15,
                    "mots_cles": [
                        "astreinte",
                        "permanence",
                        "intervention",
                        "rémunération",
                        "repos compensateur",
                        "logement",
                        "sécurité",
                        "filière technique"
                    ]
                },
                {
                    "titre": "Article 9 : Les sujétions particulières",
                    "page": 17,
                    "mots_cles": [
                        "sujétions",
                        "travail de nuit",
                        "dimanche",
                        "jours fériés",
                        "compensation",
                        "cycles",
                        "barème",
                        "impact santé"
                    ]
                }
            ]
        },
        {
            "titre": "Chapitre 2 : Les congés",
            "page": 19,
            "mots_cles": [
                "congés annuels",
                "congé bonifié",
                "ARTT",
                "don de jours",
                "CET",
                "congés naissance",
                "fractionnement",
                "jours fériés",
                "temps partiel",
                "report"
            ],
            "articles": [
                {
                    "titre": "Article 1 : Les congés annuels",
                    "page": 19,
                    "mots_cles": [
                        "jours ouvrés",
                        "planning",
                        "fractionnement",
                        "report",
                        "priorité",
                        "vacances scolaires",
                        "temps partiel",
                        "31 décembre"
                    ]
                },
                {
                    "titre": "Article 2 : Le congé bonifié",
                    "page": 23,
                    "mots_cles": [
                        "outre-mer",
                        "fonctionnaires",
                        "Guadeloupe",
                        "Réunion",
                        "conditions",
                        "décret 2020-851",
                        "durée",
                        "transport"
                    ]
                },
                {
                    "titre": "Article 3 : Les jours d'A.R.T.T",
                    "page": 24,
                    "mots_cles": [
                        "RTT",
                        "compensation",
                        "quotité",
                        "cycle",
                        "absence",
                        "réduction",
                        "prise",
                        "déduction"
                    ]
                },
                {
                    "titre": "Article 4 : Les dons de jours de repos",
                    "page": 27,
                    "mots_cles": [
                        "don jours",
                        "RTT",
                        "congé annuel",
                        "enfant malade",
                        "aide familiale",
                        "justificatif",
                        "congé solidaire",
                        "31 jours"
                    ]
                },
                {
                    "titre": "Article 5 : Le Compte Épargne Temps",
                    "page": 27,
                    "mots_cles": [
                        "CET",
                        "alimentation",
                        "jours non pris",
                        "formulaire",
                        "ouverture",
                        "indemnisation",
                        "retraite",
                        "report"
                    ]
                },
                {
                    "titre": "Article 6 : Les congés liés aux naissances",
                    "page": 29,
                    "mots_cles": [
                        "congé maternité",
                        "congé paternité",
                        "durée",
                        "hospitalisation",
                        "naissance",
                        "temps partiel",
                        "indemnisation",
                        "certificat"
                    ]
                }
            ]
        },
        {
            "titre": "Chapitre 3 : Autorisations spéciales d'absence",
            "page": 31,
            "mots_cles": [
                "autorisations absence",
                "fêtes religieuses",
                "garde enfant",
		            "nourrice",
                "maladie",
                "proche aidant",
                "décès",
                "maternité",
                "rentrée scolaire",
                "consultation médicale",
                "mariage"
            ],
            "articles": [
                {
                    "titre": "Article 1 : Fêtes religieuses",
                    "page": 31,
                    "mots_cles": [
                        "religion",
                        "calendrier",
                        "musulmane",
                        "juive",
                        "chrétienne",
                        "orthodoxe",
                        "préfecture",
                        "jours fériés"
                    ]
                },
                {
                    "titre": "Article 2 : Pour garde d'enfant malade",
                    "page": 31,
                    "mots_cles": [
                        "garde enfant",
			                  "nourrice",
                        "maladie",
                        "école fermée",
                        "RTT",
                        "conjoint",
                        "quotité",
                        "âge",
                        "plafond"
                    ]
                },
                {
                    "titre": "Article 3 : Pour prodiguer des soins ou assister un malade",
                    "page": 33,
                    "mots_cles": [
                        "soins",
                        "maladie",
                        "ascendants",
                        "enfant",
                        "jours ouvrés",
                        "certificat médical",
                        "temps partiel",
                        "justificatif"
                    ]
                },
                {
                    "titre": "Article 4 : Pour accompagner une personne en fin de vie",
                    "page": 33,
                    "mots_cles": [
                        "proche aidant",
                        "AJPA",
                        "pathologie",
                        "temps partiel",
                        "certificat",
                        "ascendants",
                        "absence non rémunérée",
                        "congé spécifique"
                    ]
                },
                {
                    "titre": "Article 5 : En cas de décès d'un membre de la famille",
                    "page": 34,
                    "mots_cles": [
                        "décès",
                        "famille",
                        "jours",
                        "frère",
                        "sœur",
                        "oncle",
                        "conjoint",
                        "enfant"
                    ]
                },
                {
                    "titre": "Article 6 : À l'occasion d'un mariage ou pacs",
                    "page": 35,
                    "mots_cles": [
                        "mariage",
                        "pacs",
                        "congé exceptionnel",
                        "durée",
                        "partenaire",
                        "cérémonie",
                        "justificatif",
                        "conjoint"
                    ]
                },
                {
                    "titre": "Article 7 : Absence liée à la maternité",
                    "page": 35,
                    "mots_cles": [
                        "absence maternité",
                        "mère",
                        "bébé",
                        "accouchement",
                        "congé spécifique",
                        "temps plein",
                        "certificat médical",
                        "suspension"
                    ]
                },
                {
                    "titre": "Article 8 : Pour une consultation médicale",
                    "page": 35,
                    "mots_cles": [
                        "consultation",
                        "médical",
                        "autorisée",
                        "temps partiel",
                        "justificatif",
                        "maternité",
                        "rendez-vous",
                        "absence"
                    ]
                },
                {
                    "titre": "Article 9 : Rentrée Scolaire",
                    "page": 36,
                    "mots_cles": [
                        "rentrée scolaire",
                        "enfants",
                        "parents",
                        "congés",
                        "autorisation",
                        "école",
                        "présence",
                        "temps partiel"
                    ]
                },
                {
                    "titre": "Article 10 : Déménagement",
                    "page": 36,
                    "mots_cles": [
                        "déménagement",
			                  "demenagement",
                        "changement domicile",
                        "autorisation",
                        "jour",
                        "préavis",
                        "mutation",
                        "justificatif",
                        "personnel"
                    ]
                },
                {
                    "titre": "Article 11 : Formation",
                    "page": 36,
                    "mots_cles": [
                        "formation",
                        "stage",
                        "autorisation absence",
                        "présence obligatoire",
                        "plan de formation",
                        "inscription",
                        "temps de travail",
                        "congé"
                    ]
                }
            ]
        },
        {
            "titre": "Chapitre 4 : Les absences pour maladies et accidents",
            "page": 38,
            "mots_cles": [
                "maladie",
                "accident travail",
                "accident trajet",
                "rémunération",
                "arrêt",
                "CLM",
                "CLD",
                "prise en charge",
                "pénibilité",
                "accident service"
            ],
            "articles": [
                {
                    "titre": "Article 1 : La maladie",
                    "page": 38,
                    "mots_cles": [
                        "arrêt maladie",
                        "congé maladie",
                        "rémunération",
                        "justificatif",
                        "traitement",
                        "absences",
                        "soins",
                        "certificat"
                    ]
                },
                {
                    "titre": "Article 2 : Les accidents de service et de trajet",
                    "page": 41,
                    "mots_cles": [
                        "accident service",
                        "accident trajet",
                        "responsabilité",
                        "prise en charge",
                        "déclaration",
                        "arrêt",
                        "indemnisation",
                        "soins"
                    ]
                },
                {
                    "titre": "Article 3 : La prise en charge de la rémunération",
                    "page": 41,
                    "mots_cles": [
                        "rémunération",
                        "maladie",
                        "accident",
                        "traitement indiciaire",
                        "temps partiel",
                        "invalidité",
                        "CLM",
                        "CLD"
                    ]
                }
            ]
        },
        {
            "titre": "Annexes",
            "page": 43,
            "mots_cles": [
                "cycles hebdomadaires",
                "annualisation",
                "directions",
                "travail de nuit",
                "dimanches",
                "jours fériés",
                "métiers",
                "DESS",
                "DCJ",
                "DME"
            ]
        }
    ]
}
`.trim(),rl={1:`
CHAPITRE 1 : LE TEMPS DE TRAVAIL
ARTICLE 1 : DEFINITION
La durée du travail effectif s'entend comme « le temps pendant lequel les agents sont à la disposition de leur employeur et doivent se conformer à ses directives sans pouvoir vaquer librement à des occupations personnelles ».
Lorsqu'un agent est en arrêt maladie, il est en position d'activité, mais il n'est pas en situation de travail effectif, ni de service.
Nombre total de Jours sur l'année: 365
Repos hebdomadaire (2 jours x 52 semaines): -104
Congés annuels (5 fois les obligations hebdomadaires de travail): -25
Jours fériés: -8
Nombre de jours travaillés: =228
Nombre de jours travaillés = Nb de Jours x 7 heures: 1596h, arrondi à 1600h
+ Journée de solidarité:  +7h
TOTAL en heures: 1607 heures
ARTICLE 2 : LES DUREES DU TEMPS DE TRAVAIL
LA FIXATION DE LA DUREE DE TRAVAIL HEBDOMADAIRE
Au sein de la collectivité de Gennevilliers, les cycles de travail sont définis comme suite :
    37 heures par semaine
    37.5 heures par semaine
    38 heures par semaine
    39 heures par semaine pour les agents travaillant dans les crèches
LE CYCLE ANNUALISE
L'annualisation du temps de travail permet de :
     Condenser le temps de travail de l'agent sur les périodes où le besoin est le plus intense et libérer du temps de travail sur les périodes creuses
     Lisser la rémunération, quel que soit le temps de travail effectué chaque mois.
Dans le cadre de l'annualisation du temps de travail, le nombre de jour fériés n'est pas forfaitaire mais décompté au réel.
Journée non travaillée définition (JNT) :
Les périodes non travaillées correspondent pour partie à sa quote-part de congés annuels et pour le reste à la récupération des heures effectuées en sus. A la différence d'une A.R.T.T que l'agent peut prendre selon son souhait en accord avec sa hiérarchie,
les JNT sont planifiés d'office dans un agenda et ne sont pas mutables / échangeables ou au choix.
C'est le service qui les positionne, en fonction du flux d'activités et des nécessités de services.
ARTICLE 3 : LES PLAGES FIXES ET PLAGES DE SOUPLESSE
DEFINITION DES PLAGES FIXES :
Il s'agit des horaires de travail de présence obligatoire, tels que la collectivité les propose.
DEFINITION DES PLAGES DE SOUPLESSE DE TRAVAIL :
Il s'agit d'organiser dans chacun des services, et dans la limite des nécessités de service, des horaires de travail permettant aux agents de choisir plus librement, en accord avec leur hiérarchie et dans une limite définie, les horaires de début, de pause méridienne et de fin de leur journée de travail.
La durée de travail hebdomadaire ne change pas et s'inscrit toujours dans le respect des dispositions légales et réglementaires.
Cette possibilité est ouverte à toutes les catégories d'agents. Elle est accordée dès lors que la nature du travail et les nécessités de service le permettent, notamment avec les effectifs d'agents suffisants.
               DU LUNDI AU JEUDI                           Plage fixe                 Plage de souplesse
               Matin                                     De 9h30 à 12h                  De 7h30 à 9h30
               Pause déjeuner (45 min)                        45 min                       12h à 14h
               Après-midi                                 14h à 16h30                     16h30 à 19h
               VENDREDI                                    Plage fixe                 Plage de souplesse
               Matin                                     De 9h30 à 12h                  De 7h30 à 9h30
               Pause déjeuner (45 min)                        45 min                       12h à 14h
               Après-midi                                 14h à 16h00                     16h00 à 19h
Un planning hebdomadaire sera mis en place avec chaque direction ou chef de service il sera décidé pour l'année et sera revu à chaque rentrée scolaire (en septembre).
ARTICLE 4 - LES GARANTIES MINIMALES
L'organisation du temps de travail doit respecter les garanties minimales suivantes fixées par l'article 3 du décret n°2000-815 du 25 août 2000 :
       Durée hebdomadaire de travail effectif                    48 heures maximum ou 44 heures en moyenne sur 12 semaines
       Durée quotidienne du travail                              10 heures maximum
       Travail de nuit                                           La période comprise entre 22 heures et 5 heures ou une autre période de 7 heures consécutives comprise entre 22 heures et 7 heures
       Amplitude d'une journée de travail                        12 heures maximum
       Repos hebdomadaire (heures consécutives)                  35 heures minimum
       Repos quotidien (heures consécutives)                     11 heures minimum
       Après une période continue de travail de 6 h              20 minutes de pause minimum
Il ne peut être dérogé aux garanties minimales que dans deux situations précises :
Lorsque l'objet même du service public en cause l'exige en permanence, notamment pour la protection des personnes et des biens (par décret en Conseil d'Etat qui détermine les contreparties accordées aux catégories d'agents concernés)
Lorsque des circonstances exceptionnelles le justifient et pour une période limitée, par décision de l'autorité territoriale : en ce cas, les membres du comité technique doivent être immédiatement informés.
 ARTICLE 5 - LES HEURES SUPPLEMENTAIRES, LES HEURES COMPLEMENTAIRES
Les heures supplémentaires :
Les heures supplémentaires ne se déclencheront qu'au-delà du temps de travail normal de l'agent.
Les heures supplémentaires sont obligatoirement réalisées à la demande des supérieurs hiérarchiques et ne concernent que les agents titulaires et non titulaires de catégorie B et C*.
Ne peuvent être réaliser que 25 heures supplémentaires par mois au maximum.
Elles sont formalisées et font l'objet d'un état récapitulatif signé par le chef de service.
Elles correspondent à une charge de travail exceptionnelle et ne sauraient être accordées pour effectuer des missions normales de service.
Les heures supplémentaires effectuées feront prioritairement l'objet de récupération, dans un délai maximum de deux mois et seront majorées sur un taux identique à celui appliqué à la rémunération :
Les heures supplémentaires sont majorées de 25% pour les 14 premières heures et de 27% pour les heures suivantes (de la 15ème à la 25ème).
Les heures supplémentaires de nuit (de 22h00 à 7h00) sont majorées à 100% (multipliées par 2). Les heures supplémentaires de dimanche et jours fériés sont majorées à 66%.
Ces majorations peuvent se cumuler entres elles : 
                                         De la 1ère à la 14ème heure        De 22h à 7h00 (nuit)           Le dimanche                                                                                                                            1h00                             1h00                             1h00
Heures supplémentaires effectuées
Heures majoréesà récupérer de la              1h15                            2h30                            2h05
         1° à la 14°Heure
 De la 15ème à la 25ème heure.                1h17                            2h34                             2h07        
Elles peuvent être indemnisées à titre exceptionnel, à la demande spécifique du chef de service et quand les nécessités de service n'ont pas permis la récupération.
*Pour la liste des métiers concernés se référer à la délibération correspondante
Les heures complémentaires :
Les agents titulaires et non titulaires à temps non complet ou temps partiel de catégorie A, B et C de toutes filières, peuvent être amenés exceptionnellement à effectuer des heures complémentaires jusqu'à concurrence de 35h00 / semaine.
ARTICLE 6 - LE TEMPS PARTIEL
La Ville de Gennevilliers a fixé la durée du temps partiel à hauteur de 50%, 60%, 70%, 80% ou 90% du temps complet.
LE TEMPS PARTIEL DE DROIT
Conformément au décret n°2004-777 du 29 juillet 2004 et au décret n°2024-1263 du 30 décembre 2024, l'autorisation d'accomplir un travail à temps partiel selon les quotités de 50%, 60%, 70% ou 80%, 90% est accordée de plein droit aux fonctionnaires et agents contractuels dans les conditions suivantes :
     A l'occasion de chaque naissance jusqu'au 3ème anniversaire de l'enfant
     A l'occasion de chaque adoption jusqu'à l'expiration d'un délai de trois ans à compter de l'arrivée au foyer de l'enfant adopté.
     Pour donner des soins à son conjoint, à un enfant à charge ou à un ascendant atteint d'un handicap nécessitant la présence d'une tierce personne, ou victime d'un accident ou maladie grave ;
     Aux agents reconnus travailleurs handicapés.
Les agents à temps non complet peuvent bénéficier d'un temps partiel de droit, contrairement au temps partiel sur autorisation.
Dans les cas de temps partiel de droit, les modalités restent conjointement définies entre l'agent et la collectivité.
Les agents à temps partiel n'ont pas le droit de modifier librement la répartition de leur temps de travail dans une semaine en fonction des jours fériés qui pourraient y avoir.
Les jours fériés ne sont pas récupérables lorsqu'ils tombent un jour où l'agent ne travaille pas en raison de son temps partiel.
Le temps consacré à la formation, étant du temps de travail effectif, pourra être récupéré s'il tombe un jour où l'agent ne travaille pas en raison de son temps partiel.
Quelles sont les incidences sur la rémunération ?
Le traitement indiciaire, l'indemnité de résidence, les primes et indemnités liées au grade, à l'échelon ou à l'emploi sont versés au prorata du temps travaillé pour les agents exerçant à 50 %, 60 % ou 70 % d'un temps plein.
La rémunération est légèrement supérieure pour les agents travaillant à 80 % (payée 85,72 %) ou 90 % (payée à 91,42 %).
Le supplément familial de traitement est calculé en fonction de la quotité de traitement perçu, à l'exception du supplément familial de traitement pour un enfant, qui n'est pas proratisé. En cas de retenue pour grève et pour absence de service fait, la retenue est effectuée sur la rémunération réellement perçue, et non sur celle correspondant à un temps plein.
Quelles incidences sur les congés ?
Les agents autorisés à effectuer leurs fonctions à temps partiel, de droit ou sur autorisation, ont droit aux congés annuels au prorata de leur temps de travail.
Les agents à temps partiel n'ont pas le droit de modifier librement la répartition de leur temps de travail dans la semaine en fonction des jours fériés.
Quelles sont les incidences sur la carrière et la retraite ?
Sur la carrière :
Les périodes de travail à temps partiel sont assimilées à des périodes à temps complet pour la détermination des droits à l'avancement, promotion et à formation.
Sur la retraite :
Les périodes de service à temps partiel de droit pour élever un enfant, dans la limite de 3 ans par enfant né ou adopté à partir du 1er janvier 2004, sont prises en compte pour la totalité de leur durée pour la constitution des droits à pension. Concernant la liquidation de la pension, les périodes de travail à temps partiel de droit pour élever un enfant sont assimilées à des périodes à temps plein.
Surcotisassions :
Par dérogation au principe général, les services à temps partiel accomplis à compter du 1er janvier 2004 peuvent, dans une certaine limite, être assimilés pour le décompte à des périodes de travail à temps plein, en contrepartie du versement d'une retenue pour pension.
Cette assimilation ne peut pas augmenter la durée de service retenue pour la liquidation de la pension de plus de 4 trimestres.
Le fonctionnaire souhaitant bénéficier de l'assimilation, doit présenter une demande écrite en ce sens lors de sa demande initiale de travail à temps partiel [case « surcotisassions » à cocher sur le formulaire] ou lors de son renouvellement.
Pour les fonctionnaires handicapés dont l'incapacité permanente est au moins égale à 80 %, la prise en compte de la durée non travaillée et surcotisée peut concerner 8 trimestres et la cotisation retraite est calculée sur la base du traitement effectivement versé en fonction de la quotité de travail de l'agent.
Peut-on mettre fin à l'autorisation d'exercer ses fonctions à temps partiel à n'importe quel moment ?
Suspension :
Le fonctionnaire ou l'agent contractuel placé en congé de maternité, paternité ou d'adoption, voit l'autorisation d'effectuer un temps partiel suspendue pendant la durée du congé. L'agent est donc
rétabli dans le droit des agents à temps plein.
Réintégration à temps plein avant terme :
Réintégration à temps plein ou la modification des conditions d'exercice du temps partiel peut intervenir au cours de la période, sur demande écrite de l'agent, présentée au moins deux mois avant la date souhaitée.
La réintégration à temps plein peut intervenir sans délai en cas de motif grave, tel qu'une diminution des revenus du ménage ou un changement de situation familiale.
Réintégration à temps plein à terme :
A l'issue de la période de service à temps partiel, le fonctionnaire ou l'agent contractuel est admis à réintégrer son emploi d'origine à temps plein sur demande écrite de l'agent.
LE TEMPS PARTIEL SUR AUTORISATION
Conformément au décret n°2004-777 du 29 juillet 2004, les agents peuvent être autorisés, sur leurs demandes et sous réserve de la continuité et du fonctionnement du service et des possibilités
d'aménagement de l'organisation du travail, à bénéficier d'un service à temps partiel qui ne peut être inférieur à 50%.
Les bénéficiaires de ce temps partiel sont :
    Les agents titulaires occupant un emploi à temps complet en position d'activité ou de détachement ;
    Les agents contractuels employés en continu depuis plus d'un an à temps complet ;
    Les agents stagiaires dont la durée de stage est allongée pour correspondre à la durée effectuée par les agents à temps plein, sauf ceux dont le statut prévoit l'accomplissement d'une période de stage dans un établissement de formation ou dont le stage comporte un enseignement professionnel
    Les agents ayant pour projet de créer ou de reprendre une entreprise.
Le temps partiel ne peut être imposé, il résulte d'une demande écrite de l'agent. Il n'est pas un droit, mais est accordé selon les nécessités de service.
Ainsi, un agent pourra se voir refuser le jour ou la quotité demandée et le temps partiel pourra être accordé pour un autre jour ou une autre quotité.
Quelles sont les incidences sur la rémunération ?
Le traitement indiciaire, l'indemnité de résidence, les primes et indemnités liées au grade ou à l'emploi sont versés au prorata du temps travaillé pour les agents exerçant à 50 %, 60 % ou 70 % d'un temps plein. La rémunération est légèrement supérieure pour les agents travaillant à 80 % (payée 85,72 %) et ceux travaillant à 90 % (91,42 %).
Le supplément familial de traitement est calculé en fonction de la quotité de traitement perçu, à l'exception du supplément familial de traitement perçu pour un enfant, qui n'est pas proratisé.
En cas de retenue pour grève et pour absence de service fait, la retenue est effectuée sur la rémunération réellement perçue, et non sur celle correspondant à un temps plein.
Quelles incidences sur les congés ?
Les agents autorisés à assurer leurs fonctions à temps partiel sur autorisation, ont droit aux congés annuels au prorata de leur temps de travail.
Les agents à temps partiel n'ont pas le droit de modifier librement la répartition de leur temps de travail dans la semaine en fonction des jours fériés.
Quelles sont les incidences sur la carrière et la retraite ?
Sur la carrière :
Les périodes de travail à temps partiel sont assimilées à des périodes à temps complet pour la détermination des droits à avancement, promotion et formation.
Sur la retraite :
Les périodes de service à temps partiel sur autorisation sont prises en compte pour la totalité de leur durée pour la constitution des droits à pension. En revanche, concernant la liquidation des droits, les
périodes de service à temps partiel sur autorisation sont retenues au prorata de la quotité de travail.
Surcotisassions :
Par dérogation au principe général, les services à temps partiel accomplis à compter du 1er janvier 2004 peuvent, dans une certaine limite, être assimilés pour le décompte à des périodes de travail à temps plein, en contrepartie du versement d'une retenue pour pension. Cette assimilation ne peut pas augmenter la durée de service retenue pour la liquidation de la pension de plus de 4 trimestres.
Le fonctionnaire souhaitant bénéficier de l'assimilation, doit présenter une demande écrite en ce sens lors de sa demande initiale de travail à temps partiel [case « surcotisassions » à cocher sur le formulaire] ou lors de son renouvellement.
Peut-on mettre fin à l'autorisation d'exercer ses fonctions à temps partiel à n'importe quel moment ?
Suspension :
Le fonctionnaire ou l'agent non titulaire placé en congé de maternité, paternité ou d'adoption, voit l'autorisation d'effectuer un temps partiel suspendue pendant la durée du congé. L'agent est donc rétabli dans le droit des agents à temps plein.
Réintégration à temps plein avant terme :
La réintégration à temps plein ou la modification des conditions d'exercice du temps partiel peut intervenir au cours de la période, sur demande écrite de l'agent, présentée au moins deux mois avant la date souhaitée. La réintégration à temps plein peut intervenir sans délai en cas de motif grave, tel qu'une diminution des revenus du ménage ou un changement de situation familiale.
Réintégration à temps plein à terme :
A l'issue de la période de service à temps partiel, le fonctionnaire ou l'agent non titulaire est admis à réintégrer son emploi d'origine à temps plein sur demande écrite présentée par l'agent.
LE TEMPS PARTIEL THERAPEUTIQUE
Le mi-temps thérapeutique, accordé par le médecin traitant est fixé à 50 %, 60 %, 70 %, 80 % ou 90 % correspond à un pourcentage de la quotité de travail hebdomadaire de l'agent à temps plein sur son poste (37h, 37h30, 38h ou 39h) (Décret n° 2021-1462 du 08/11/2021 article 1 ; décret n° 87-602 du 30/07/1987 article 13-1).
L'agent a droit proportionnellement aux RTT* et aux CA (5X le nombre de jours travaillés par semaine). (Décret n° 2021-1462 du 08/11/2021 article 1er ; décret n° 87-602 du 30/07/1987 article 13-11).
L'autorisation est accordée sur la base d'un certificat médical (par le médecin traitant ou la médecine professionnelle) par période de 1 à 3 mois maximum et dans la limite d'une durée totale d'un an. Au-delà de 3 mois, une visite auprès d'un médecin agréé est obligatoire pour le renouvellement et définir la quotité de travail.
ARTICLE 7 - LA JOURNEE DE SOLIDARITE
LA JOURNEE DE SOLIDARITE PEUT ETRE ACCOMPLIE SELON 3 MODALITES
       Travail un jour férié précédemment chômé (autre que le 1er mai)
       Travail d'un jour d'A.R.T.T
       Autre modalité permettant le travail de 7h précédemment non travaillé (à l'exclusion des jours de congé annuel).
Modalités d'exercice choisi :
       7 heures supplémentaires travaillées sur l'année civile, fractionnées à raison de deux minutes par jour
       Pour tous les agents de la collectivité
       Cette journée sera proratisée en fonction du temps partiel de l'agent
*Jours d'A.R.T.T. : Se référer page 25 article 3 - Les jours d'A.R.T.T
ARTICLE 8 - LES ASTREINTES ET PERMANENCES
Pour la liste des métiers ainsi que les différentes indemnités se référer à la délibération correspondante.
L'ASTREINTE - DEFINITION
La période d'astreinte s'entend comme une période pendant laquelle l'agent, sans être à la disposition permanente et immédiate de son employeur, a l'obligation de demeurer à son domicile ou à proximité afin d'être en mesure d'intervenir pour effectuer un travail au service de l'administration.
Ce temps n'est en aucun cas assimilé à du travail effectif.
C'est pourquoi, l'article 5 du décret N°2001-623 du 12 juillet 2001 prévoit que le temps passé en astreinte soit obligatoirement rémunéré ou compensé.
En revanche, le travail effectué pendant cette astreinte, à savoir « l'intervention » ainsi que le « temps de trajet » sont comptabilisés comme du temps de travail effectif.
Ces dispositions sont applicables aux agents titulaires, stagiaires et contractuels de droit public quel que soit leur cadre d'emplois, selon des modalités différentes selon que les agents relèvent de la filière technique ou des autres filières.
Sont exclus de ce dispositif les agents qui bénéficient d'une concession de logement par nécessité absolue de service ou d'une NBI au titre de l'exercice de fonctions de responsabilité supérieure (emplois fonctionnels).
Bien que la règlementation ne prévoie pas de limite au nombre maximal d'astreinte à effectuer par agent dans l'année, l'attention des services est appelée sur la fréquence du recours aux astreintes et les abus éventuels constatés, consistant à placer de façon trop importante un salarié en position d'astreinte.
Aussi, en vertu du principe de parité il est recommandé qu'un agent n'assure pas plus de 14 semaines d'astreintes par année civile.
Il convient de distinguer les astreintes pour la filière technique (régime spécifique) et les astreintes pour les agents relevant des autres filières (régime de droit commun).
Les astreintes dans la filière technique:
Il existe trois sortes d'astreintes pour la filière technique. A chacune correspond un barème d'indemnités.
Le temps d'intervention (intervention et temps de trajet) peut être indemnisé ou donner lieu à un repos compensateur.
     L'astreinte d'exploitation : elle concerne la situation des agents tenus, pour des raisons de nécessité de service, de demeurer à leur domicile ou à proximité, afin d'être en mesure d'intervenir dans le cadre d'activités particulières (déneigement, intervention sur dysfonctionnement technique …)
     L'astreinte de décision : elle concerne la situation du personnel d'encadrement pouvant être joint directement par l'autorité territoriale, en dehors des heures d'activité normales du service, afin de prendre les mesures et les dispositions nécessaires.
     L'astreinte de sécurité : elle concerne des agents appelés à participer à un plan d'intervention dans le cas d'un besoin en renforcement en moyens humains faisant suite à un évènement soudain ou imprévu (situation de crise, inondations, fortes tempêtes …)
Les astreintes ne sont pas cumulables entre elles pour la même période
Les astreintes dans les autres filières
    Il n'existe qu'une sorte d'astreinte pour les agents des filières autres que techniques : dite de sécurité.
    Les périodes d'astreinte doivent être indemnisées.
    Le temps d'intervention (intervention et temps de trajet) peut être indemnisé ou donné lieu à un repos compensateur.
LA PERMANENCE:
La permanence correspond à l'obligation faite à un agent de se trouver sur son lieu de travail habituel, ou un lieu désigné par son chef de service, pour nécessité de service, un samedi, un dimanche ou lors d'un jour férié.
Ces dispositions sont applicables aux agents titulaires, stagiaires et contractuels de droit public quel que soit leur cadre d'emploi, selon des modalités différentes pour les agents relevant de la filière technique et des autres filières.
Une période de permanence peut être indemnisée ou compensée pour les agents des filières autres que techniques. Elle ne peut qu'être indemnisée pour les agents de la filière technique.
Sont exclus de ce dispositif les agents logés et les agents qui bénéficient d'une NBI pour l'exercice de fonctions responsabilité supérieure.
ARTICLE 9 - LES SUJETIONS PARTICULIERES
DEFINITION:
Dans le cadre de cette nouvelle réforme du temps de travail, la collectivité de Gennevilliers est amenée à tenir compte de certaines sujétions particulières.
En effet, le temps de travail des agents concernés nécessite de déroger à la durée légale annuelle de 1607 heures du fait qu'ils peuvent etre amenés à travailler, de manière régulière et planifiée, les dimanches ou les jours fériés ou sur des horaires de nuit, soit en début de nuit, soit en début de  matinée et que cela pourrait un impact sur leur santé ou vie personnelle.
Il est donc décidé de prendre en compte uniquement deux sujétions particulières liées aux cyles de travail à compter du 1er janvier 2022 :
      Travail de nuit
      Travail des dimanches et jours fériés
LE TRAVAIL DE NUIT:
Il est décidé de prendre en compte le temps de travail de nuit annuel réalisé de manière régulière et planifiée, en raison de son caractère atypique et pénible et d'accorder des jours de compensation selon le bareme ci-dessous :
      Entre 21 heures annuelles de nuit et 55 heures annuelles de nuit = 1 jour de compensation
      Entre 56 heures annuelles de nuit et 100 heures annuelles de nuit = 2 jours de compensation
      Entre 101 heures annuelles de nuit et 150 heures annuelles de nuit = 2.5 jours de compensation
      Entre 151 heures annuelle de nuit et 225 heures annuelles de nuit = 3 jours de compensation
      Entre 226 heures annuelles de nuit et 286 heures annuelles de nuit = 3.5 jours de compensation
      Au-delà de 287 heures annuelles de nuit = 4 jours de compensation
LE TRAVAIL DU DIMANCHE ET JOURS FERIES:
Il est décidé de prendre en compte le nombre de dimanches et jours fériés travaillés annuellement de manière régulière et planifiée, en raison de son impact sur la vie personnelle et d'accorder des jours de compensation selon le bareme ci-dessous :
      Toute heure travaillée un dimanche ou un jour férié = vaut pour 1 journée entière travaillée
      Les modalités de compensation s'appliquent à partir d'un minimum de 10 dimanches travaillés ou jours fériés travaillés
      Entre 10 dimanches / jours fériés et 19 dimanches / jours fériés travaillés = 1 jour de compensation soit 7h
      Entre 20 dimanches / jours fériés et 29 dimanches / jours fériés travaillés = 2 jours de compensation soit 14h
      Entre 30 dimanches / jours fériés et 39 dimanches / jours fériés travaillés = 3 jours de compensation soit 21h
      40 dimanches / jours fériés travaillés et plus = 4 jours de compensation soit 28h
Les jours de compensation seront décomptés si l'agent ne réalise pas les jours pour lesquels il bénéficie de ces compensations.
Le calcul est basé sur le même principe que le décompte des jours de A.R.T.T en cas d'absence.
                `.trim(),2:`
CHAPITRE 2 - LES CONGES
ARTICLE 1 : LES CONGES ANNUELS
Les congés annuels à Gennevilliers sont de 25 jours ouvrés sur une base de 5 jours de travail hebdomadaire.
Les congés annuels sont calculés en fonction des obligations hebdomadaires et multipliés par 5.
5 jours travaillés/semaine: 25 C.A
4.5 jours travaillés/semaine: 22.5 C.A
4 jours travaillés/semaine: 20 C.A
3.5 jours travaillés/semaine: 17.5 C.A
3 jours travaillés/semaine: 15 C.A 
2.5 jours travaillés/semaine: 12.5 C.A
Les agents contractuels non permanents travaillant dans le cadre d'un contrat à durée déterminée doivent prendre leurs congés pendant la durée de leur contrat et non sur l'année civile avec les mêmes délais de prévenance que les autres agents permanents. Dans le cas d'une démission ou d'un licenciement en cours de contrat, les congés feront l'objet d'une proratisation et devront être pris avant la date effective de départ.
Il est rappelé que les droits à congé sont calculés au prorata du temps de présence.
Les agents arrivés ou partant en cours d'année exercent leur droit au prorata de leur temps de présence au travail.
LES MODALITES GENERALES
Modalités de prise des jours de CA
De manière générale, les congés annuels doivent être pris avant le 31 décembre de l'année en cours.
Ils peuvent être posé en ½ journée ou journée complète.
La demande de congés
La demande de congés est formulée par l'agent sur la fiche commune à l'ensemble des services (à télécharger sur Intranet). Les Directeurs sont responsables des modalités de gestion et de planification des congés des agents de leur direction.
Les délais minimums de demande de congé
Pour les congés dits estivaux
(mi-juin/mi-septembre) ils doivent être planifiés pour le 1er mars au plus tard, au sein de chaque service (ou direction) ; lorsque des agents n'ont pas posé leurs congés estivaux dans les délais impartis, l'octroi de leur congé s'effectuera en fonction des possibilités restantes répondant aux besoins du service.
1er mars - date limite de dépôt des congé s dits estivaux
Juin - Septembre: Période des congés dits estivaux
Pour les congés hors période dite estivale
Entre 5 et 10 jours ouvrés, ils sont posés au moins un mois avant le début du congé.
Pour les congés inférieurs à 5 jours ouvrés
Ils sont posés au minimum 15 jours avant la prise de congés.
Pour 1 journée de congé
Le délai est fixé à 5 jours ouvrés avant la prise.
Pour une situation exceptionnelle la hiérarchie pourra considérer les demandes ne respectantpas ces délais.
Les délais maximums de réponse de la hiérarchie :
Courent à compter de la date de dépôt du formulaire de demande :
Pour les congés dits estivaux
La réponse devra être donnée au plus tard le 15 mars (ou jour ouvré le plus proche).
Pour les congés hors période dite estivale
La réponse devra être donnée dans les 15 jours ouvrables suivant la demande.
Pour les congés inférieurs à 5 jours ouvrés
La réponse devra être donnée dans les 3 jours ouvrables suivant la demande.
Pour 1 journée
La réponse devra être donnée au plus tard sous 48 heures ouvrées.
Tout refus ou report de congé doit être motivé et argumenté par écrit puis notifié à l'agent par la hiérarchie dans les délais fixés ci-dessus.
L'agent qui s'absente sans attendre l'autorisation formelle ou malgré un refus se place en absence injustifiée. Une retenue sur salaire sera appliquée.
Aucun agent ne peut être placé d'office en congé annuel sans en avoir fait la demande.
L'original de la fiche de congé reste, pendant la période annuelle de travail concernée, au sein du service pour la gestion du suivi, un double étant établi et remis à l'agent s'il le souhaite à chaque demande de congés.
En cas de préavis de grève, les demandes d'autorisation d'absence sont accordées sous réserve des nécessités de service et en conformité avec les délais posés par le présent règlement. Compte tenu du risque de sous-effectif le jour de ces mobilisations, ces demandes seront examinées avec une vigilance particulière.
REGLES D'ATTRIBUTION DES CONGES ANNUELS
Le droit à congé annuel s'exerce sous réserve des nécessités du service public. Ce sont les responsables de service qui en assurent la gestion sous la responsabilité des Directeurs auxquels ils sont rattachés.
En cas de désaccord avec le responsable de service, l'agent peut saisir le directeur et si le désaccord persiste, la Direction des Ressources Humaines pour avis et vérification de l'application des règles et droits des congés.
Lorsque plusieurs agents demandent la même période et que les nécessités du service ne permettent pas de leur attribuer en même temps, une priorité est donnée aux agents :
       Ayant des charges de famille, uniquement en période de vacances scolaires ;
       Dont l'entreprise des conjoints (es) ferme un mois déterminé et place obligatoirement en congé ses salariés ce mois-là ;
       En situation de garde d'enfants partagée ou alternée ;
       Les parents d'enfants gravement handicapés - titulaires d'une carte d'invalidité quel que soit l'âge des enfants, à condition que l'établissement spécialisé auquel l'enfant a été confié, impose aux parents de le reprendre pendant ces vacances.
Ces critères de priorité doivent être justifiés.
Dans le cas où des agents d'une même unité de travail seraient confrontés aux mêmes contraintes, chacun d'entre eux bénéficiera par roulement de cette priorité.
La durée maximum autorisée d'absence lors des congés est de 31 jours consécutifs ; le décompte s'effectue à partir du 1er jour de cessation d'activité. Cette règle s'applique quelle que soit la situation des agents à temps complet, temps non complet, temps partiel...
N.B : le terme de conjoint est utilisé génériquement pour les mariages civils, les PACS et l'union libre (justificatifs nécessaires).
DEROGATION DE LA REGLE DES 31 JOURS
Les agents sont autorisés pour se rendre dans leur pays d'origine (hors U.E) ou pour accompagner leur conjoint se rendant dans leur pays d'origine, à cumuler des congés sur 2 années.
La demande de report de congé pour ce motif, accompagnée des justificatifs1, devra être faite par écrit au cours de l'année où les congés ne seront pas pris (soit en partie ou en totalité) et adressée à
la Direction des Ressources Humaines. En aucun cas, l'agent travaillant à temps complet ne pourra dépasser l'autorisation du double de CA auquel il a le droit au regard de ses obligation hebdomadaire
(ex : semaine de 4 jours de travail = 20*2 soit 40 CA).
Dans ce cas, l'agent qui réserve le maximum de congés annuels doit prendre les A.R.T.T dans les mêmes conditions que les autres agents.
S'agissant des jours de CET, ils peuvent être pris en étant accolés à des jours de congés annuels et dépasser 31 jours consécutifs.
Compte tenu de la mise en place du CET, les congés annuels doivent désormais être impérativement pris au plus tard le dernier jour des congés scolaires de Noël, sauf cas de report indiqué ci-dessous.
LES REPORTS
En principe, les congés non pris au 31 décembre sont perdus et ne peuvent pas être reportés sur l'année suivante. Néanmoins, si l'agent n'a pas pu prendre tout ou partie de ses congés annuels en raison d'une absence prolongée pour raison de santé (MO, AT, CLM, CLD, CGM) les congés annuels non pris sont automatiquement reportés dans la limite de 4 semaines de congés sur une période de 15 mois maximum après l'année de référence (arrêt du Conseil d'Etat CE26.04.2017 conformément aux dispositions de l'article 7 de la directive européenne 2003/88/CE).
A titre exceptionnel et uniquement pour les congés annuels, une dérogation peut être accordée par le chef de service s/c du directeur, aux agents qui sont en congé de maternité, afin de reporter le reliquat de congés de l'année N à l'année N+1, à l'issue d'un congé maternité ou de couches pathologiques. Les congés annuels qui seront reportés ne donnent lieu à aucune bonification pour fractionnement.
A titre exceptionnel et uniquement pour les congés annuels un report au 31 Janvier n+1 peut être accordé sous réserve de nécessité ou contrainte de service.
CONGES NON PRIS DU FAIT DE CONGES POUR INDISPONIBILITE PHYSIQUE
En cas d'arrêt de travail pour maladie survenu pendant un congé annuel, l'agent a le droit de récupérer ultérieurement la période de congé non-utilisée d'une durée équivalente à celle de sa maladie.
Aucune disposition législative ou réglementaire n'oblige l'agent à reprendre ses fonctions après un congé de maladie pour pouvoir bénéficier du reliquat de congé annuel.
Elle pourra être prise soit immédiatement à la suite du congé maladie soit à une période ultérieure sous réserve de l'accord préalable du responsable hiérarchique.
Un fonctionnaire et un agent contractuel en CDI, ayant acquis des congés annuels durant une année mais qui n'aurait pas pu en bénéficier du fait d'un congé maladie peut en retrouver l'usage à l'issue
de ce congé y compris si ce dernier se termine une autre année que l'année d'acquisition de ses congés annuels. Justificatifs : acte de naissance de l'agent, conjoint et parents ou double nationalité de l'agent ou conjoint.
CONGES ANNUELS, TEMPS PARTIEL ET TEMPS PARTIEL THERAPEUTIQUE
L'agent autorisé à effectuer son travail à temps partiel ou encore à temps partiel thérapeutique bénéficie à ce titre de congés annuels.
Ces congés annuels seront calculés sur ces obligations de travail hebdomadaire [voir Article 1 : Les congés annuels]
LES JOURS DE FRACTIONNEMENT
Seuls, les congés annuels effectivement pris entre le 1er janvier et le 30 avril et le 1er novembre et le 31 décembre de chaque année ouvrent droit à une bonification :
    1 jour de congé supplémentaire pour 5 à 7 jours de congés annuels (consécutifs ou non) pris pendant ces périodes
Ou
    2 jours supplémentaires pour 8 jours et plus de congés annuels (consécutifs ou non) pris pendant ces périodes.
En résumé, le cumul des congés pris durant ces périodes donne droit à la bonification.
Cette bonification est fixée à 2 jours de congé maximum par année civile à prendre avant le 31 décembre. Elle est accordée à partir du moment où les conditions sont remplies pour l'obtenir.
EXERCICE D'UNE ACTIVITE PENDANT LES CONGES
La règlementation relative au cumul d'activités des agents publics s'applique en période de congés annuels, du fait du maintien en position d'activité pendant cette période.
L'exercice d'une activité accessoire pendant les vacances suppose une demande et un accord préalable (exemple : animation d'une colonie de vacances, vendanges, etc.)
ARTICLE 2 - LE CONGE BONIFIE
Les fonctionnaires municipaux titulaires dont le centre des intérêts moraux et matériels se trouve dans un département ou une collectivité unique d'outre-mer ont droit aux congés bonifiés.
Il s'agit d'un congé annuel pour les fonctionnaires originaires de Guadeloupe, Martinique, Guyane,Réunion, Saint Pierre et Miquelon, Mayotte, Saint Barthélémy, Saint Martin et qui exercent en métropole.
Le congé bonifié est octroyé tous les 2 ans sous réserve d'en remplir les conditions. Le congé bonifié ne peut pas dépasser 31 jours calendaire consécutifs maximum à compter du 1er jour d'absence.
La demande de congé bonifié est à adresser au Maire, au plus tard le 28 février de l'année ouvrant droit à ces congés pour permettre l'étude des droits par la Direction des Ressources Humaines. Si les conditions légales sont remplies, le congé est accordé en fonction des nécessités du service. La Ville et ses établissements publics se réservent le droit de négocier les dates de départ et de retour en fonction des tarifs et des disponibilités des compagnies aériennes.
Les conditions d'ouverture des droits sont définies par le décret n°2020-851 du 2 juillet 2020.
Depuis le 5 juillet 2020, il n'y a plus de bonification mais des dispositions transitoires ont été prévues.
En effet, les fonctionnaires qui remplissent les conditions depuis le 5 juillet 2020 peuvent opter :
      Soit pour le bénéfice d'un dernier congé bonifié dans les conditions fixées par l'ancien dispositif dans un délai de 12 mois à compter de l'ouverture du droit (option 1)
      Soit pour l'application immédiate du nouveau dispositif (option 2)
ARTICLE 3 - LES JOURS D'A.R.T.T
Les jours de réduction du temps de travail, dits jours de A.R.T.T, constituent une compensation, sous la forme de jours de repos, à un mode d'organisation du temps de travail fixant une durée hebdomadaire de travail supérieure à 35 heures hebdomadaires toute l'année.
Ils sont générés par le travail accompli au-delà de la durée légale de travail dans la limite des plafonds fixés pour chaque cycle de travail.
Les A.R.T.T peuvent bénéficier à l'ensemble des agents répondant aux conditions d'octroi, à l'exception des agents nommés sur des postes à temps non complets qui ne génèrent quant à eux pas de jours de A.R.T.T.
Pour les agents exerçant leurs fonctions à temps partiel, le nombre de jours de A.R.T.T est proratisé à hauteur de leur quotité de travail, sur la base des droits ouverts pour un agent à temps complet soumis au même régime de temps de travail.
Pour faciliter la gestion des jours d'absence, le nombre est arrondi à la demi-journée supérieure. Le tableau ci-après précise les types d'absences qui génèrent ou non pendant cette période des droits au titre de la A.R.T.T.
LA GESTION DES A.R.T.T
Néanmoins les demandes d'absences A.R.T.T et leur planification sont soumises aux mêmes conditions que les jours de congés annuels, par journée ou demi- journée, sur les journées normalement travaillées par l'agent et avant ou après des jours de congés annuels ainsi qu'entre deux périodes de congés annuels.
Les jours A.R.T.T sont à prendre au cours de l'année civile et jusqu'au 31 Décembre. (les A.R.T.T du mois de décembre seront anticipés).
Les jours de A.R.T.T non pris sur l'année peuvent être versés sur le compte épargne temps selon les règles définies, sinon ils seront considérés comme perdus.
Les agents contractuels sur emplois saisonniers bénéficiant de A.R.T.T doivent impérativement les poser avant l'issue de leur contrat. A défaut, ils seront perdus.
Les jours de A.R.T.T ne peuvent pas faire l'objet d'une indemnisation financière au terme d'un contrat
d'engagement.
Les jours A.R.T.T attribués en compensation du dépassement de la durée annuelle de travail de 1607 heures le sont au regard de la durée hebdomadaire de travail pour les cycles hebdomadaires et en fonction du temps de travail de l'agent (temps plein ou partiel), comme suit, soit avec arrondi à la demi-journée supérieure :
Durée hebdomadaire de travail                      37 h               37,5 h                  38 h                   39 h
NB de Jours A.R.T.T pour un agent à temps complet  12 jours           15 jours                18 jours               23 jours
Temps partiel 90 % (Temps annuel)                  11 jours           13,5 jours              16 jours               21 jours
Temps partiel 80 %                                 10 jours           12 jours                14,5 jours             18,5 jours
Temps partiel 70 %                                 8,5 jours          10,5 jours              13 jours               16 jours
Temps partiel 60 %                                 7,5 jours          9 jours                 11 jours               14 jours
Temps partiel 50 %                                 6 jours            7,5 jours               9 jours                11,5 jours
LES DISPOSITIONS SPECIFIQUES LIEES AU MODE DE DECOMPTE DES A.R.T.T
Les jours non travaillés n'ont pas vocation à être considérés comme du temps de travail effectif et par voie de conséquence, n'ouvrent pas droit à des jours de réduction du temps de travail.
Les absences au titre des congés pour raison de santé réduisent proportionnellement le nombre de jours de A.R.T.T que l'agent peut acquérir, conformément aux préconisations de la circulaire du 18 janvier 2012 relative aux modalités de mise en œuvre de l'article 115 de la loi n°2010-1657 du 29 décembre 2010 de finances pour 2011.
Cette règle s'applique également aux agents exerçant leurs fonctions à temps partiel au prorata de leur quotité de travail.
Ces motifs d'absence réduisent à due proportion le nombre de jours de A.R.T.T acquis annuellement pour les agents qui se sont absentés.
Un quotient de réduction du nombre de jours de A.R.T.T est calculé de la manière suivante, arrondi à la journée supérieure :
Q = Nombre de jours travaillés par an / Nombre de jours de A.R.T.T attribués annuellement
Dès lors, pour un agent qui, en cours d'année, atteint en une seule fois ou cumulativement, un nombre
de jours d'absence pour raisons de santé égal à Q, il convient d'amputer son crédit annuel de jours
A.R.T.T d'une journée » où Q est le « quotient de réduction » déterminé de la manière suivante : Q = N1 (nombre de jours ouvrables en régime hebdomadaire soit 228 jours (365 – 104 jours de week-end – 25 jours de congés payés – 8 jours fériés) / N2 (nombre de jours maximum de RTT générés en régime hebdomadaire).
Exemple : un agent soumis à un régime hebdomadaire à 38h sur 5 jours, bénéficie de 18 A.R.T.T.
       Cycles de                         Calcul effectué                                   Quotient a appliqué
        travail
       37 heures                         228/12 A.R.T.T= 19                      1 jour déduit pour 19 jours d'absences
       37,5 heures                      228/15 A.R.T.T= 15.2                            1 jour déduit pour 15,5 jours d'absences
       38 heures                       228/18 A.R.T.T= 12 ,66                    1 jour déduit pour 13 jours d'absences
       39 heures                        228/23 A.R.T.T= 9.91                     1 jour déduit pour 10 jours d'absences
Pour les agents à temps partiel, le calcul de N1 et N2 est proratisé en fonction de leur quotité de travail.
Le décompte des jours de A.R.T.T à retrancher du crédit de A.R.T.T annuels de l'agent est réalisé au fur et à mesure, dès que l'agent est placé en congés de maladie et que le nombre de jours de congés
atteint « Q ». Aucune disposition législative ou réglementaire ne permet le report du nombre de jours A.R.T.T non pris sur l'année N+1 suite à un congé pour raisons de santé.
Lorsque l'agent atteint, au cours de l'année, cumulativement, un nombre de jours d'absence égal au quotient de réduction, une journée de A.R.T.T est déduite de son crédit annuel de jours de A.R.T.T.
La déduction de A.R.T.T sera calculée à la journée.
Les jours de A.R.T.T ainsi déduits du capital annuel à la suite d'un congé pour raisons de santé sont défalqués au fur et à mesure sur la période de référence. Dans le cas où le nombre de jours de A.R.T.T à déduire est supérieur au droit de l'agent, la déduction peut s'effectuer sur les droits de la période suivante.
MODALITES DE PRISE DES JOURS DE A.R.T.T
50% des Jours de A.R.T.T devront être pris au 15/09/N de chaque année :
       Cycle de 37h00 : 6 Jours de A.R.T.T (sur 12)
       Cycle de 37h30 : 7,5 Jours de A.R.T.T (sur 15)
       Cycle de 38h00 : 9 Jours de A.R.T.T (sur 18)
       Cycle de 39h00 : 11,5 Jours de A.R.T.T (sur 23)
ARTICLE 4 - LES DONS DE JOURS DE REPOS
À UN AGENT D'UN ENFANT GRAVEMENT MALADE OU AIDANT FAMILIAL
Un agent peut sur sa demande renoncer anonymement et sans contrepartie, à tout ou partie de ses jours de RTT non pris et de jours de congés annuels dans la limite de 5 jours par an, au bénéfice d'un autre agent public relevant du même employeur, qui :
      Assume la charge d'un enfant âgé de moins de vingt ans atteint d'une maladie, d'un handicap ou victime d'un accident d'une particulière gravité rendant indispensables une présence soutenue et des soins contraignants ;
      Vient en aide à une personne atteinte d'une perte d'autonomie d'une particulière gravité ou présentant un handicap, lorsque cette personne est, pour le bénéficiaire du don, l'une de celles mentionnées aux 1° à 9° de l'article L. 3142-16 du codedu travail.
Le don de jours non épargnés sur un compte épargne-temps peut être fait jusqu'au 31 décembre de l'année au titre de laquelle les jours de repos sont acquis.
L'agent qui souhaite bénéficier d'un don de jours de repos formule sa demande par écrit auprès de l'autorité territoriale. Cette demande est accompagnée d'un certificat médical détaillé remis sous pli confidentiel établi par le médecin qui suit l'enfant ou l'adulte et attestant la particulière gravité de la maladie, du handicap ou de l'accident rendant indispensable une présence soutenue et des soins contraignants auprès de l'enfant ou de l'adulte.
L'agent qui donne un ou plusieurs jours de repos signifie par écrit à son responsable, le don et le nombre de jours afférents. Le don est définitif après accord du chef de service.
L'autorité territoriale dispose de 15 jours ouvrables pour informer l'agent bénéficiaire du don de jours de repos.
L'absence du service des agents publics bénéficiaires d'un don de jours de repos ne peut excéder 31jours consécutifs.
ARTICLE 5 - LE COMPTE EPARGNE TEMPS
DEFINITION
Le compte épargne-temps (C.E.T) permet de conserver des jours de congés annuels ou d' A.R.T.T non pris sur plusieurs années. Il est ouvert à la demande de l'agent qui est informé annuellement des droits épargnés et consommés.
Les jours épargnés peuvent être, en tout ou partie, utilisés sous forme de congés ou, si une délibération le prévoit, indemnisés ou pris en compte pour la retraite complémentaire.
Agent Bénéficiaires
Fonctionnaire titulaire ou contractuel
Vous pouvez demander l'ouverture d'un compte épargne temps (CET), que vous occupiez un emploi à temps complet ou non complet, si vous remplissez toutes les conditions suivantes :
      Être employé de manière continue
       Avoir accompli au moins 1 an de service
       Ne pas être soumis à des obligations de service fixées par le statut particulier
Agents Exclus
Les Fonctionnaires Stagiaires
Si avant d'être nommé stagiaire, un agent avait un CET, en tant que fonctionnaire titulaire ou contractuel, il ne peut pas utiliser les jours épargnés, ni en accumuler de nouveaux, pendant son stage.
À la titularisation, il pourra de nouveau utiliser les jours épargnés sur son CET et en épargner de nouveaux.
OUVERTURE ET ALIMENTATION
Demande d'ouverture ou d'alimentation du CET doit être faite par le biais des formulaires prévus à cet effet (à télécharger sur l'intranet).
Alimentation (Nombre de jours maxi) :
       Jours de congés annuels* :5 J
       Jours de fractionnement : 2 J
       Jour de A.R.T.T
*L'agent doit obligatoirement avoir pris au minimum 20 jours de congés annuels dans l'année en cours
ARTICLE 6 - LES CONGES LIES AUX NAISSANCES
CONGE MATERNITE
La constatation médicale de grossesse doit être effectuée par un médecin ou par une sage-femme.
Une déclaration de grossesse doit être adressée avant le 4e mois :
  Au service GCR pour les fonctionnaires et les stagiaires ;
  à la caisse de sécurité sociale pour les agents relevant du régime général ainsi qu'au service GCR.
La constatation de grossesse doit être effectuée avant la fin du troisième mois et déclarée à l'autorité territoriale avant la fin du 4ème mois.
DUREE
     NB de naissance         Rang de l'enfant                                  Durée en semaines
                                                           Prénatal               Postnatal                      Total                              
                                 1 ou 2ème                     6                       10                          16
              1
                                3ème ou plus                8 ou 10*                18 ou 16*                      26
         Jumeaux                                           12 ou 16**               22 ou 18**                     34
      Triplés ou plus                                          24                      22                          36
*La période prénatale du congé peut être portée à 10 semaines ; dans ce cas la période postnatale est de 16 semaines.
** La période prénatale du congé peut être augmentée de 4 semaines au maximum ; la période postnatale est alors réduite d'autant.
CONGES SUPPLEMENTAIRES LIES A LA SANTE DE LA MERE
Sur prescription médicale, le congé de maternité peut être augmenté :
  De 2 semaines, avant la date présumée de l'accouchement, pour grossesse pathologique ;
  De 4 semaines, après l'accouchement, en cas d'arrêt de travail nécessité par les suites de couches (couches pathologiques)
LA REMUNERATION
La rémunération de l'agent est versée à plein traitement.
En cas de travail à temps partiel, l'agent est rétabli à temps plein pour les droits à rémunération et à congés annuels.
CONGE PATERNITE
Après la naissance d'un enfant, le père ou la personne vivant en couple avec la mère : mariage, pacs ou concubinage (union libre) peut bénéficier d'un congé de paternité et d'accueil de l'enfant. Le bénéficiaire du congé peut être fonctionnaire (stagiaire ou titulaire) ou contractuel. La durée du congé varie selon qu'il s'agit d'une naissance unique ou multiple.
Durée du congé :
     Naissance d'un enfant : 25 jours calendaires
     Naissances multiples : 32 jours calendaires
Sur ces 25 ou 32 jours calendaires, 4 doivent obligatoirement être pris consécutivement et immédiatement après le congé de naissance de 3 jours.
Les agents peuvent choisir de prendre la période restante de 21 ou 28 jours calendaires de manière continue ou fractionnée en 2 périodes maximum d'au moins 5 jours chacune.
Ces 21 ou 28 jours doivent être pris dans les 6 mois suivant la naissance.
HOSPITALISATION DE L'ENFANT APRES LA NAISSANCE
Quand l'état de santé de l'enfant nécessite son hospitalisation immédiate après la naissance, une période supplémentaire de congé est accordée durant l'hospitalisation.
La période de congé de 4 jours consécutifs peut être prolongée, pendant la durée de l'hospitalisation, dans la limite de 30 jours consécutifs.
La période de 21 jours calendaires doit alors être prise dans les 6 mois suivant la fin de l'hospitalisation.
L'agent doit en faire la demande. L'administration ne peut pas refuser cette prolongation.
Demande de congé de paternité ou d'accueil de l'enfant (formulaire accessible sur Intranet).`.trim(),3:`
CHAPITRE 3 - AUTORISATIONS SPECIALE D'ABSENCES
Le congé annuel ne peut pas être interrompu par une autorisation d'absence, dans la mesure où celle- ci n'est accordée que pour permettre à un agent, qui aurait dû être présent pour assurer ses fonctions de s'absenter exceptionnellement de son service. Ces autorisations ne sont pas récupérables.
ARTICLE 1 - FETES RELIGIEUSES
Conformément aux dispositions réglementaires, les agents membre de la communauté arménienne, ou de confession religieuse bouddhiste, juive, musulmane, orthodoxe sont autorisés de manière prioritaire et sous réserve des nécessités de service, à poser une journée de congés. Les calendriers religieux sont rappelés annuellement par circulaire préfectorale.
FETES JUIVES
  Roch Hacha na (Jour de l'an)
  Yom Kippour (Grand pardon)
FETES MUSULMANES
  Al Mawlid Annabi
  Aïd El Fitr
  Aïd El Adha
Les dates pour certaines de ces fêtes étant fixées à un jour près, les autorisations d'absences pourront être accordées sur demande de l'agent avec un décalage d'un jour en plus ou en moins.
ARTICLE 2 - POUR GARDE D'ENFANT MALADE
Ces autorisations d'absence sont accordées pour soigner un enfant malade ou pour en assurer momentanément la garde sous réserve de nécessité de service et sur présentation d'un justificatif uniquement lorsque la situation résulte d'une cause imprévue.
Exemple : enfant malade ou nourrice malade, crèche ou école de l'enfant fermée.
Néanmoins, lorsqu'un mouvement de grève engendre un problème de garde, la ville accepte la pose d'une journée de garde d'enfant.
Ex : Ecole fermée pour grève.
L'agent qui accompagne son enfant à une consultation médicale prévue ne peut bénéficier d'autorisation de garde d'enfant (sauf pour les maladies graves ou handicaps).
Ces autorisations d'absence sont accordées à la famille jusqu'aux 16 ans de l'enfant (sans limite d'âge pour les enfants handicapés), quel que soit le nombre d'enfants.
DUREE DE DROIT COMMUN
Pour les agents travaillant à temps complet :
1 fois les obligations hebdomadaires de services + 1 jour soit 6 jours
Pour les agents travaillant à temps partiel :
1 fois les obligations hebdomadaires de services + 1 jour /quotité de travail de l'intéressé.
Exemple : Agent travaillant à 60% : (5+1) /100*60= 3.6 soit 4 jours
Ces jours peuvent être pris de manières fractionnées ou en continue en fonction de la situation et du besoin de l'agent.
Cas particuliers :
Doublement de la durée de droit commun pour (sur justificatif) :
  L'agent assumant seul la charge d'un enfant
  Le conjoint est à la recherche d'un emploi
  Le conjoint ne bénéficie d'aucune autorisation d'absence rémunérée.
L'agent, dont le conjoint bénéficie d'un nombre d'autorisations rémunérées inférieur au sien, peut obtenir la différence en supplément.
Exemple : Agent à temps complet dont le conjoint ne peut bénéficier que de 3 jours dans son emploi aura droit à 6+3=9 jours.
Le fait que le conjoint soit au foyer ne réduit pas le nombre de jours minimum d'autorisation d'absence.
L'agent peut bénéficier de 6 jours.
La demande peut être formulée a posteriori par écrit et sur présentation des justificatifs, l'agent doit cependant impérativement prévenir son responsable hiérarchique pour demander l'autorisation de s'absenter.
Dans le cas où ces autorisations ne seraient pas attribuées de manière fractionnée, leur durée totale peut être portée à 8 jours consécutifs (samedi et dimanche inclus) dans le 1er cas et 15 jours consécutifs dans le second.
Le décompte des jours octroyés se fait sur l'année civile sans report.
La première demande d'autorisation d'absence pour garde d'enfant doit faire l'objet de la présentation d'une attestation de l'employeur du conjoint précisant si celui-ci bénéficie de ces autorisations et leur durée. Dans l'hypothèse où les deux conjoints sont employés municipaux, ils doivent respectivement informer leurs responsables de service de la solution choisie : 6 jours chacun ou 12 jours à un seul des parents, ou toute autre formule souhaitée dans le cadre des 12 jours.
La Direction des Ressources Humaines (Service GCR) centralise les autorisations d'absence pour garde d'enfants qui doivent être demandées par l'agent à son Responsable de service, qui la transmet ensuite à la GCR (Cf. courrier du 13 janvier 2003). L'agent fait sa demande par le biais du formulaire disponible sur l'intranet.
Lorsqu'un agent arrive dans la collectivité en cours d'année, il bénéficie de la totalité des autorisations d'absence « garde d'enfant ». Il n'est pas possible de les proratiser en fonction de la date d'arrivée de l'agent dans la collectivité.
Pour des raisons de sécurité et de responsabilité de la collectivité, le personnel n'est pas autorisé à venir avec ses enfants sur le lieu de travail en cas de difficulté de garde.
ARTICLE 3 - POUR PRODIGUER DES SOINS OU ASSISTER UN MALADE
Au 1 janvier 2022, les agents municipaux sont autorisés, sur présentation d'un certificat médical précisant la nécessité absolue de leur présence auprès du malade, à s'absenter pendant :
Conjoint : 5 jours ouvrés
Père, mère : 5 jours ouvrés
Enfant à charge de + 16 ans : 5 jours ouvrés
Ascendants (Agent ou conjoint), frère, sœur, oncle, tante, neveu, nièce, beau-frère, belle-sœur : 3
jours ouvrés
Ces jours ne sont pas nécessairement consécutifs mais doivent faire l'objet d'une programmation.
Pour les autres membres de la famille, l'agent peut déposer une demande de congés annuels ou A.R.T.T.
ARTICLE 4 - POUR ACCOMPAGNER UNE PERSONNE EN FIN DE VIE : CONGE PROCHE AIDANT
Dans certaines situations de dépendance d'un proche, les agents peuvent être amenés à solliciter un congé proche aidant. Il s'agit d'un congé non rémunéré permettant à l'agent bénéficiaire de cesser totalement son activité lorsqu'un ascendant, un descendant, un frère, une sœur, une personne partageant le même domicile (liste des personnes à l'article L. 3142-16 du code du travail) ou l'ayant désigné comme sa personne de confiance au sens de l'article L. 1111-6 (*) du code de la santé publique, souffre d'une pathologie mettant en jeu le pronostic vital ou est en phase avancée ou terminale d'une affection grave et incurable, quelle qu'en soit la cause.
Le congé proche aidant est accordé, sur demande écrite de l'agent (congé non rémunéré) :
Pour une période continue d'une durée maximale de trois mois, renouvelable dans la limite d'un an sur l'ensemble de la carrière.
Par périodes fractionnées d'au moins sept jours consécutifs, dont la durée cumulée ne peut être supérieure à six mois ;
Sous forme d'un service à temps partiel dont la durée est de 50 %, 60 %, 70 % ou 80 % du temps de service que les fonctionnaires à temps plein exerçant les mêmes fonctions doivent effectuer. Le service à temps partiel est accordé pour une durée maximale de trois mois, renouvelable une fois.
Pendant la période de congé de proche aidant, l'agent n'est pas rémunéré par la collectivité mais il peut demander à bénéficier d'une allocation journalière du proche aidant (AJPA) de la part de la CAF.
Lors de la demande de congés proche aidant, l'agent doit fournir à l'appui de sa demande
les pièces justificatives suivantes :
    Déclaration sur l'honneur de votre lien familial avec la personne aidée ou de l'aide apportée à une personne âgée ou handicapée avec laquelle vous résidez ou entretenez des liens étroits et stables
    Déclaration sur l'honneur précisant que vous n'avez pas déjà bénéficié, au cours de votre carrière, d'un congé de proche aidant ou bien la durée pendant laquelle vous avez bénéficié de ce congé.
    La demande doit être accompagnée de la copie d'un certificat médical attestant l'état de santé de la personne accompagnée : la décision justifiant d'un taux d'incapacité permanente au moins égal à 80 % si la personne aidée est un enfant ou un adulte handicapé ou la décision d'attribution de l'allocation personnalisée d'autonomie (APA) si la personne aidée souffre d'une perte d'autonomie
Le congé de proche aidant prend fin :
   Soit à l'expiration de l'une des périodes de trois mois ;
   Soit dans les trois jours qui suivent le décès de la personne accompagnée ;
   Soit à la demande de l'agent, à une date antérieure.
ARTICLE 5 – EN CAS DE DECES D'UN MEMBRE DE LA FAMILLE
Les agents municipaux sont autorisés, sur présentation d'un certificat de décès, au plus tard à leurretour, à s'absenter à l'occasion des obsèques.
     Conjoint : 5 jours ouvrés
     Parents : 5 jours ouvrés
     Beaux-parents : 3 jours ouvrés
     Ascendants de l'agent ou de son conjoint : 3 jours ouvrés
     Petits-Enfants : 3 jours ouvrés
     Frères et sœurs de l'agent ou de son conjoint : 3 jours ouvrés
     Oncle, tante, neveu, nièce de l'agent ou du conjoint : 1 jour ouvré
     Enfant et/ou enfant du conjoint :
 Conditions                                                     Nombre de Jours d'autorisation
 Enfant de moins de 25 ans
 Enfant de moins de 25 ans à la charge effective et             14 jours ouvrables + 8 jours dans un délai d'un an à
 permanente de l'agent                                          compter du décès
 Enfant de plus de 25 ans ayant au moins un enfant
 Enfant de plus de 25 ans sans enfant                           12 jours ouvrables
ARTICLE 6 - A L'OCCASION D'UN MARIAGE OU PACS
Le mariage ou Pacs d'un membre de la famille de l'agent ouvre droit à autorisation d'absence surprésentation d'un acte de mariage.
     Agent : 7 jours ouvrés
     Enfant des agents : 3 jours ouvrés
     Ascendant, descendant, frère, sœur, beau-frère, belle-sœur, oncle, tante, neveu, nièce : 1 jour ouvré
Les jours accordés au titre d'un PACS ne pourront être de nouveau attribués en cas de mariage pour la même personne.
Ces jours ouvrés sont consécutifs et non fractionnables et doivent être pris impérativement au moment de la célébration ou à des dates entourant obligatoirement cette célébration.
ARTICLE 7 - ABSENCE LIEE A LA MATERNITE
Une circulaire ministérielle du 21 mars 1996 prévoit que, sur présentation d'un certificat médical ou avis de la médecine professionnelle, l'agent, dans la période antérieure au congé prénatal, peut bénéficier d'autorisations spéciales d'absence pour :
     Les séances préparatoires à l'accouchement psychoprophylactique (sans douleur) lorsque ces séances ne peuvent avoir lieu en dehors des heures de service.
     Les examens prénataux obligatoires si ceux-ci ne peuvent se dérouler en dehors des heures de service. L'autorisation ne peut excéder une demi-journée.
     Une heure par jour d'aménagement des horaires de travail à partir du premier jour du troisième mois de grossesse jusqu'au congé de maternité, sans récupération. Cette heure n'est pas due en cas de congés divers ou d'arrêt pour maladie ou accident du travail.
ARTICLE 8 - POUR UNE CONSULTATION MEDICALE
Les agents exerçant leur activité à temps plein sont autorisés, exceptionnellement, à s'absenter, sous réserve des nécessités de service, pour se rendre en consultation. Ces absences doivent faire l'objet de la présentation de la convocation au rendez-vous et devront faire l'objet d'une récupération ultérieure.
Par exception, les temps de consultation à la demande de la GCR chez les médecins experts ne sont pas récupérés.
Pour un traitement hospitalier de longue durée, un aménagement d'horaire est envisageable avec le responsable de service.
Exceptionnellement, pour les agents en situation de handicap (reconnaissance RQTH) ou de maladies graves, 4 jours par an (fractionnables en 8 demi-journées) peuvent leur être octroyer afin d'assurer leur suivi médical et soins.
La médecine de prévention atteste les agents répondant aux conditions requises (Formation spécialisée du 08/12/2023).
DON DU SANG OU DE PLAQUETTE
Les agents sont autorisés à s'absenter pour le don du sang et de plaquettes. Ils doivent préalablement en faire la demande auprès de leur responsable hiérarchique et produire un justificatif à leur retour.
ARTICLE 9 - RENTREE SCOLAIRE
Le jour de la rentrée scolaire et sous réserve des nécessités de service, les agents peuvent bénéficier de facilités horaires dans la limite d'une heure (dans la journée) pour accompagner ou aller chercher leur enfant à l'école (concerne les enfants scolarisés en maternelle, primaire et l'entrée en 6ème).
ARTICLE 10 – DEMENAGEMENT
A l'occasion d'un déménagement, les agents bénéficient, la semaine précédant ou la semaine suivant le déménagement, d'une journée d'autorisation d'absence (justifié par le changement d'adresse).
ARTICLE 11 – FORMATION
La journée de formation est considérée comme une journée de travail.
Si la journée de formation tombe sur une journée non travaillée (exemple : un samedi ou un dimanche), celle-ci sera récupérée.
Si la journée de formation tombe sur une demi-journée de travail (exemple : un agent qui travaille sur 4,5 Jours ou sur 4 Jours), l'agent récupère cette demi-journée.
Si la journée de formation a une durée supérieure au temps de travail habituel, il n'y a pas de récupération, et inversement si la durée est inférieure au temps de travail habituel, l'agent ne doit pas rendre d'heure à la collectivité.
CONGE DE PARTICIPATION OU EPREUVES D'UN CONCOURS OU EXAMEN PROFESSIONNEL
Concours ou examens professionnels de la fonction publique territoriale de catégories A, B ou C : 1 jour avant la 1ère épreuve d'admissibilité et 2 jours avant la 1ère épreuve d'admission sur présentation des convocations et justificatif de présence aux épreuves.
Ces jours sont accordés pour une seule participation à un concours et un examen par année civile.
PARTICIPATION A DES JURYS DE CONCOURS ET EXAMENS OU COMME FORMATEUR
Une autorisation d'absence, sous réserve des nécessités de service, de 10 jours fractionnables (en demi-journée) est accordée pour participer en tant que jury de concours et examens ou comme formateur dans les conditions suivantes.
Il sera accordé par année civile, pour les agents à temps complet (proratisé pour les agents à temps non-complet et à temps partiel) et dans la mesure où ces prestations ouvrent droit à rémunération :
     5 jours par an pour la participation à des jurys de concours. Au-delà les absences devront être prises sur des jours de congés.
     5 jours par an pour assurer des formations ou intervenir à des colloques. Au-delà, les absences devront être prises sur des jours de congés.
Les formations assurées, à Gennevilliers, pour des agents de la Ville seront de 5 jours maximum par an.
Les agents concernés doivent, dans tous les cas, avoir obtenu préalablement une autorisation de cumuls d'emplois (à déposer à la GCR avec l'avis du responsable hiérarchique). La demande devra être déposée au minimum 15 jours avant l'absence. L'agent doit accompagner sa demande de la copie de sa lettre de mission ou d'intervention.
Aucun report ou prise par anticipation de ces autorisations d'absence ne peut être effectué.
CONGE DE REPRESENTATION
Les agents qui ont reçu mandat d'une association ou d'une mutuelle pour la représenter à l'occasion d'une réunion organisée par une des instances de l'Etat ou d'une Collectivité Territoriale peuvent bénéficier d'un congé dans la limite de 9 jours ouvrables par an avec possibilité d'un cumul maximum pouvant être porté à 12 jours ouvrables annuels dans la limite des délais légaux.
Les agents qui ont un mandat politique bénéficieront sur leur demande, des autorisations d'absence en fonction de la réglementation en vigueur.
Les agents doivent en faire la demande par écrit auprès de l'autorité territoriale au moins 15 jours avant en précisant la date et la durée de l'absence accompagnée de tous les éléments et documents justifiant qu'ils ont reçu mandat d'une association ou mutuelle pour la représenter à cette occasion. A son retour de congé, l'agent remet à l'autorité territoriale une attestation de présence effective à la réunion de cette instance.`.trim(),4:`
CHAPITRE 4 - LES ABSENCES POUR MALADIES ET ACCIDENTS
ARTICLE 1 - LA MALADIE
Il apparaît nécessaire de rappeler les règles de gestion des absences pour maladie ordinaire car leur non-respect peut notamment mettre les services en difficulté et avoir des conséquences sur la prise en charge des arrêts par la Sécurité Sociale et le versement des indemnités journalières.
Pour obtenir un congé de maladie ou son renouvellement, fonctionnaires et agents contractuels n'ont pas la même démarche à suivre. Néanmoins la première étape citée ci-après leur est commune.
Congés de maladie d'un agent annualisé :
     Si le congé de maladie est sur une journée normalement travaillée : les heures initialement prévues sont considérées comme faites.
     Si le congé de maladie est sur une journée non travaillée : aucune incidence.
     Si le congé de maladie est sur un jour de congé annuel posé et validé : l'agent a droit au report de son congé.
1ERE ETAPE - AVERTIR LE SERVICE                                                                                             38
Il est recommandé de prévenir ou de faire prévenir le service le plus rapidement possible de son absence au travail. Il en va de la bonne marche du service. Toutes les absences n'ont pas les mêmes conséquences mais toutes ont un effet sur l'organisation et plus vite le service est prévenu, plus vite il peut réagir.
L'information comprend éventuellement deux phases :
     "je ne peux pas venir travailler aujourd'hui".
     "je suis arrêté(e) jusqu'à telle date".
De même, en cas de prolongation, il est recommandé d'avertir le service, la veille de la reprise initialement prévue afin d'informer des nouvelles dates d'arrêt.
2EME ETAPE : TRANSMETTRE L'ARRÊT MALADIE
Cette seconde étape est différente selon que l'on est :
Fonctionnaire (stagiaire ou titulaire affilié à la CNRACL)
     L'agent doit adresser à la GCR les volets n°2 et n°3 de l'avis d'arrêt de travail dans les 48 heures suivant son établissement par voie postale à la Direction des Ressources Humaines - Service Gestion des Carrières et des Rémunérations (adresse postale 177, avenue Gabriel-Péri - 92237 GENNEVILLIERS cedex). Toutefois, ce délai d'envoi peut être dépassé si l'agent justifie d'une hospitalisation.
     Le volet n°1 dans lequel figurent les données médicales confidentielles doit être conservé par l'agent. En cas de contrôle médical, le médecin contrôleur peut l'exiger.
A l'exception du 1er volet, gardé par l'agent, l'arrêt de travail doit être impérativement transmis, sous 48 heures, par voie postale à la Direction des Ressources Humaines - Service Gestion des Carrières et des Rémunérations (adresse postale 177, avenue Gabriel-Péri – 92237 GENNEVILLIERS cedex).
Agent contractuel :
L'agent doit adresser dans les 48 heures suivant la date d'interruption de travail :
   Les volets n°1 et n°2 de son avis d'arrêt de travail à sa CPAM afin de bénéficier des indemnités journalières.
   Le volet n°3 à la Direction des Ressources Humaines - Service Gestion des Carrières et des Rémunérations (adresse postale 177, avenue Gabriel-Péri – 92237 GENNEVILLIERS cedex).
Les arrêts maladie sont transmis par l'agent au centre de Sécurité Sociale dont il relève, sous 48 heures. Ce délai est impératif sous peine d'un refus de prise en charge par celui-ci.
En aucun cas, l'arrêt de travail ne doit être transmis au service de l'agent.
JOURNEE DE CARENCE
Une journée de carence sera établie pour les agents titulaires et stagiaires, à temps complet, non complet et à temps partiel mais également pour les contractuels de droit public détenant une ancienneté supérieure à 4 mois.
Pour les agents de droit privé et les agents ayant moins de 4 mois d'ancienneté dans la collectivité, la carence de 3 jours sera appliquée.
Cette carence ne peut en aucun cas être compensée par des jours de congé ou de RTT. La carence ne s'applique pas dans le cadre : d'une prolongation d'arrêt, d'un deuxième arrêt initial quand la reprise entre les deux arrêts initiaux n'excède pas 48h00, d'un arrêt pour accident de service, d'une maladie professionnelle, d'un congé longue maladie, d'un congé de longue durée, d'un congé de grave maladie, d'une affection de longue durée, d'un arrêt maladie en lien avec un état de grossesse
si déclaration de grossesse transmise à l'employeur.
La retenue de la carence est effectuée sur le traitement de base, le régime indemnitaire, la NBI etl'indemnité de résidence à hauteur de 1/30ième ou 3/30ième (pour les agents de droit privé et ceux ayant moins de 4 mois d'ancienneté).
LA CONTRE VISITE
Le contrôle médical concerne tous les agents fonctionnaires, stagiaires et contractuels.                                    40
L'autorité territoriale peut procéder à tout moment à une contre visite par un médecin agréé afin de vérifier le bien-fondé du congé de maladie.
L'agent a l'obligation de s'y soumettre. Cette contre visite doit être obligatoirement organisée pendant
le congé maladie.
Le contrôle médical s'effectue, soit sur convocation au cabinet du médecin, soit au domicile de l'intéressé. Tout changement de résidence doit être signalé par l'agent à la DRH.
Lorsque le contrôle n'a pu être exercé du fait de la négligence de l'agent à communiquer l'adresse où il peut être visité, son traitement pourra être suspendu.
Le service GCR de la DRH informe l'agent du jour et du créneau horaire de la contre visite afin que celui-ci soit présent à son domicile.
L'autorité territoriale pourra suspendre le versement des rémunérations et engager une procédure disciplinaire à l'encontre de l'agent qui refuse de se soumettre au contrôle.
L'EXPERTISE MEDICALE
Concernant les accidents de service et les maladies professionnelles, une expertise peut être engagée pour vérifier la validité de l'arrêt de travail.
LES ABSENCES INJUSTIFIEES
En cas d'absence injustifiée d'un agent, le service en informe la DRH dès qu'il en a connaissance, et dans un délai maximal de deux mois. Un courrier est adressé par la DRH à l'agent afin qu'il produise un justificatif.
A défaut de justificatif, une retenue sur rémunération sera opérée.
Il est rappelé que toute absence injustifiée constitue un manquement à l'obligation de servir à laquelle est soumise tous les agents publics.
ARTICLE 2 - LES ACCIDENTS DE SERVICE (OU DE TRAVAIL) ET DE TRAJET
LES ACCIDENTS DE SERVICE ET DE TRAJET
Définitions
        L'accident de service s'applique à tout accident survenu dans le temps et sur le lieu du service, dans
        l'exercice ou à l'occasion de l'exercice des fonctions ou d'une activité qui en constitue le prolongement
        normal.
        L'accident de trajet lui concerne l'accident dont est victime l'agent qui se produit sur le parcours
        habituel entre le lieu où s'accomplit son service et son lieu de résidence ou de restauration.
Déclaration
En cas d'accident de service ou de trajet, l'agent doit transmettre à la DRH (service GCR) une
déclaration d'accident (formulaire disponible sur Intranet) et la transmettre :                                                41
   Sous 48 heures pour l'agent contractuel ou fonctionnaire rattaché au régime général
   Sous 15 jours pour le fonctionnaire affilié au Régime Spéciale
L'agent doit également faire constater son état par un médecin qui établit un certificat médical
décrivant les lésions et leur localisation ou la nature de la maladie et transmettre ce certificat médical à la DRH (service GCR) sous 48h.
ARTICLE 3 – LA PRISE EN CHARGE DE LA REMUNERATION
POUR LES AGENTS TITULAIRES AFFILIES A LA CNRACL

Nature de l'arrêt                            Durée              Plein traitement (salaire             Demi-traitement (demi-
                                            maximum                     complet)                             salaire)
Maladie ordinaire                               1 an                        3 mois                               9 mois
Longue maladie                                 3 ans                          1 an                               2 ans
Longue durée                                   5 ans                         3 ans                               2 ans
Accident de service et de trajet                       Plein traitement jusqu'à la reprise de son activité
POUR LES AGENTS TITULAIRES AFFILIES A L'IRCANTEC

Nature de l'arrêt                            Durée              Plein traitement (salaire             Demi-traitement (demi-
                                            maximum                     complet)                             salaire)
Maladie ordinaire                               1 an                        3 mois                               9 mois
Grave maladie                                  3 ans                          1 an                               2 ans
Accident de service et de trajet             Tant que                        3 ans                   Pas de demi-traitement,
                                           l'agent est                                                  la CPAM versera
                                          inapte à ses                                              directement à l'agent ses
                                            fonctions                                                indemnités journalières
POUR LES AGENTS CONTRACTUELS AFFILIES AU REGIME GENERAL DE LA SECURITE SOCIALE
Nature de l'arrêt
                                           Ancienneté de l'agent                    Plein             Demi-traitement (demi-
                                                                                 traitement                  salaire)           42
                                                                                   (salaire
                                                                                  complet)
Maladie ordinaire                                   < 4 mois
                                              > 4 mois < 2 ans                     1 mois                        1 mois
                                                 2 ans < 3 ans                     2 mois                        2 mois
                                                    > 3 ans                          3 mois                      3 mois
Grave maladie                                        > 3 ans
                                                 3 ans et plus                       1 ans                       2 ans
Accident de service et de trajet                       > 1 an                      1 mois
                                                  1= > 3 ans                       2 mois                          (**)
                                                    > 3 ans                        3 mois
`.trim()},Js=[{id:1,title:"Accident de trajet : où commence le trajet domicile-travail lorsqu'un agent réside dans un immeuble collectif ?",content:"Le trajet domicile-travail commence dès la sortie de l'immeuble collectif où réside l'agent. Cela inclut les parties communes de l'immeuble (hall, escaliers, ascenseur) jusqu'à la voie publique. En cas d'accident dans ces espaces communs, celui-ci peut être reconnu comme accident de trajet si l'agent se rendait effectivement au travail ou en revenait."},{id:2,title:"Un fonctionnaire territorial peut-il demander une mutation tout en étant en disponibilité  ?",content:"Dans la fonction publique territoriale, un fonctionnaire placé en disponibilité ne peut pas être muté directement puisqu’il n’est pas en position d’activité. Toutefois, il lui reste possible de préparer sa mobilité et de poser sa candidature à une mutation, à condition de respecter la procédure adaptée. Ce cadre juridique doit être bien compris par les services RH afin d’accompagner correctement les agents."},{id:3,title:"Repenser le recrutement pour une fonction publique plus inclusive.",content:"La fonction publique territoriale s'engage vers plus d'inclusivité en diversifiant ses méthodes de recrutement. Cela passe par l'adaptation des épreuves pour les personnes en situation de handicap, la valorisation de l'expérience professionnelle via la reconnaissance des acquis, et le développement de parcours d'insertion pour favoriser l'égalité des chances dans l'accès aux emplois publics."},{id:4,title:"Entretien avec son chef: accident de service?.",content:"La circonstance qu’un chef de service, recevant en entretien individuel l’un de ses agents, ait pu adresser à ce dernier plusieurs reproches sur sa manière de servir et s’énerver en lui reprochant notamment « tricher sur ses horaires de travail », n’est pas constitutive d’un accident de service, dès lors que la restitution de cet entretien par l’intéressé ne fait apparaitre aucun propos ou comportement excédant l'exercice normal du pouvoir hiérarchique de ce supérieur.TA Besançon 2400131 du 19.06.2025."},{id:5,title:"Sanction: Utilisation WhatApp.",content:"La circonstance qu’un agent ait envoyé depuis son téléphone personnel et sa messagerie WhatsApp, à l'attention de plusieurs personnes, dont des élus, des photos montages assortis de sous-titre déshonorants à l'encontre de la maire de la ville et de son troisième adjoint, présente un caractère fautif et non humoristique, compte-tenu de la nature des photographies diffusées et des personnes visées par ces montages. Par suite, le comportement de l’intéressé constitue un manquement à son obligation de dignité, de réserve de probité, d'intégrité et de loyauté, justifiant son exclusion de fonctions durant deux ans. La circonstance que les messages incriminés soient provenus de la messagerie privée de l'intéressé et en dehors du service est sans incidence dès lors que le comportement d'un agent public peut avoir pour effet de perturber le service ou de jeter le discrédit sur l'administration, comme en l'espèce.TA Cergy-Pontoise 2201748 du 09.07.2025."}];Js.map(e=>e.title).join(" • ");const dm="/new-unifed-/assets/RQTH-BqMk_dME.mp3",Cr=[{id:1,title:"La retraite progressive - 10/09/2025",url:"https://media.radiofrance-podcast.net/podcast09/11548-06.09.2025-ITEMA_24237901-2025F18386S0249-NET_MFI_3E105361-19F3-4A2A-BF6D-1CAB7D05CA24-27.m4a",duration:"02:25",description:"La retraite progressive",date:"10/09/2025"},{id:2,title:"Podcast Naudrh - Arrêt maladie Baisse à 90%",url:"https://audio.ausha.co/yk4aasqX1w8m.mp3",duration:"6:45",description:"Baisse de rémunération en cas de congés pour maladie ordinaire (CMO) !",date:"19/08/2025"},{id:3,title:"Podcast Radio France - Dépense publique : stop ou encore ?",url:"https://media.radiofrance-podcast.net/podcast09/24408-05.05.2025-ITEMA_24123940-2025F51881S0125-NET_MFI_2B52238C-DD76-4DED-A1BD-C848BABD1642-27.m4a",duration:"18:20",description:"Tout savoir sur la dépense",date:"18/08/2025"},{id:4,title:"Podcast Radio France - Perte d'Attractivité",url:"https://media.radiofrance-podcast.net/2025/6/3/NET_MFO_f2992cf3-ede2-46ba-a173-110376f3b3f3.mp3",duration:"25:10",description:"Les opportunités de formation",date:"17/08/2025"},{id:5,title:"Podcast Citoyen - Les types de prisons",url:"https://open.acast.com/public/streams/63f887026c3fc00011d022e2/episodes/6621010d4df82b0013c839a0.mp3",duration:"20:15",description:"Les types de prisons",date:"16/08/2025"},{id:6,title:"RQTH - Audio (local)",url:dm,duration:"00:00",description:"Fichier audio local RQTH.mp3 importé depuis src/data/podcasts",date:"08/09/2025"}],cm=[{id:1,question:"Qu'est-ce que le télétravail selon la définition de la ville de Gennevilliers ?",reponse:"Le télétravail désigne toute forme d'organisation du travail dans laquelle les fonctions qui auraient pu être exercées par un agent dans les locaux de son employeur sont réalisées hors de ces locaux de façon régulière et volontaire en utilisant les technologies de l'information et de la communication."},{id:2,question:"Quels sont les objectifs du télétravail à Gennevilliers ?",reponse:"Concilier vie privée et professionnelle, promouvoir le management par la confiance, réduire l'empreinte écologique et améliorer les conditions de travail des agents."},{id:3,question:"Le télétravail est-il obligatoire ?",reponse:"Non, le télétravail repose sur le strict volontariat de l'agent et est soumis à l'accord de son responsable hiérarchique."},{id:4,question:"Quelle est la quotité de télétravail autorisée ?",reponse:"Le télétravail est limité à 1 jour fixe par semaine accompagné d'un forfait annuel de 15 jours dans la limite de 3 jours maximum par mois. La présence sur site est obligatoire 3 jours par semaine."},{id:5,question:"Peut-on faire du télétravail en demi-journée ?",reponse:"Non, le télétravail n'est pas autorisé pour une demi-journée."},{id:6,question:"Où peut s'exercer le télétravail ?",reponse:"Le télétravail peut s'exercer au domicile principal de l'agent, dans un autre domicile sous réserve d'accord hiérarchique, ou dans un espace de travail public gratuit garantissant la confidentialité."},{id:7,question:"Quels métiers sont exclus du télétravail ?",reponse:"Les métiers en contact présentiel quotidien avec les usagers (animateurs, personnel des crèches, agents d'écoles), les métiers exercés sur la voie publique, et ceux avec des contraintes techniques ou de sécurité particulières."},{id:8,question:"Comment faire une demande de télétravail ?",reponse:"L'exercice des fonctions en télétravail est accordé sur demande écrite de l'agent qui précise les modalités d'organisation souhaitées et doit être transmise au responsable hiérarchique pour validation."},{id:9,question:"Quelle est la durée d'autorisation du télétravail ?",reponse:"La durée de l'autorisation ne peut excéder un an. Les agents qui souhaitent continuer doivent renouveler leur demande auprès de leur responsable hiérarchique."},{id:10,question:"Peut-on interrompre le télétravail ?",reponse:"Oui, il peut être mis fin au télétravail par écrit, à tout moment, à l'initiative de l'administration ou de l'agent, moyennant un délai de prévenance de quinze jours."},{id:11,question:"Qui fournit le matériel informatique pour le télétravail ?",reponse:"La collectivité met à disposition les moyens informatiques nécessaires. L'agent peut aussi utiliser son propre matériel sous réserve de compatibilité technique."},{id:12,question:"Y a-t-il une indemnisation pour les frais de télétravail ?",reponse:"Non, les agents qui exercent leurs fonctions en télétravail ne bénéficient d'aucune prise en charge ou indemnisation liée aux coûts engagés."},{id:13,question:"Le droit à la déconnexion est-il respecté ?",reponse:"Oui, en dehors des plages horaires de travail habituelles, le télétravailleur n'est pas censé être connecté et aucune réponse immédiate ne peut être attendue."},{id:14,question:"Qu'est-ce que la formation d'intégration ?",reponse:"Formation obligatoire de 10 jours pour les catégories A et B, 5 jours pour la catégorie C, à réaliser dans l'année suivant la nomination. Elle porte sur l'environnement territorial et conditionne la titularisation."},{id:15,question:"Qui a droit à la formation ?",reponse:"Les agents stagiaires, titulaires, contractuels de droit public occupant un emploi permanent, ainsi que les agents en congé parental bénéficient du droit à la formation."},{id:16,question:"Qu'est-ce que la formation de professionnalisation ?",reponse:"Formation permettant aux fonctionnaires de s'adapter à leur emploi et de maintenir leurs compétences. Elle comprend la formation au premier emploi (2 ans), tout au long de la carrière (tous les 5 ans) et suite à l'affectation sur un poste à responsabilité (6 mois)."},{id:17,question:"Les formations sont-elles considérées comme du temps de travail ?",reponse:"Oui, toute période de formation professionnelle est considérée comme du temps de travail, sauf dans les cas particuliers de disponibilité pour études."},{id:18,question:"Peut-on suivre une formation pendant un congé maladie ?",reponse:"En règle générale non, mais par exception, un agent peut bénéficier d'une formation pendant un congé d'indisponibilité physique, uniquement en vue de sa réadaptation ou reconversion professionnelle."},{id:19,question:"Qu'est-ce que le CNFPT ?",reponse:"Le Centre National de la Fonction Publique Territoriale est l'établissement public chargé de dispenser les formations. La collectivité lui verse une cotisation de 0,9% de la masse salariale."},{id:20,question:"Comment s'inscrire à une formation non dispensée par le CNFPT ?",reponse:"L'agent doit faire une demande via le formulaire dédié sur l'Intranet, avec avis hiérarchique et devis, avant transmission au service DCRH pour arbitrage."},{id:21,question:"Qu'est-ce que la préparation aux concours ?",reponse:"Formation non obligatoire pour préparer les agents aux avancements de grade ou changements de cadre d'emplois. Délai de 12 mois entre deux formations similaires."},{id:22,question:"Combien de jours de congé pour préparer un concours ?",reponse:"1 jour avant les épreuves d'admissibilité et 2 jours avant l'épreuve d'admission, accordé une seule fois par an pour un concours ou examen."},{id:23,question:"Qu'est-ce que la REP ?",reponse:"La Reconnaissance de l'Expérience Professionnelle permet aux agents de faire reconnaître leur expérience comme équivalente à un diplôme pour accéder à certains concours."},{id:24,question:"La collectivité peut-elle refuser deux fois de suite une formation ?",reponse:"L'autorité territoriale ne peut opposer deux refus successifs à un agent qu'après avis de la commission administrative paritaire. L'agent peut alors s'adresser au CNFPT avec priorité d'accès."},{id:25,question:"Quelle est la prise en charge pour les formations diplômantes ?",reponse:"Si la formation est à la demande de l'agent uniquement, la collectivité participe à hauteur de 70% des frais pédagogiques, sans prise en charge des frais annexes."},{id:26,question:"Le télétravail peut-il être utilisé pour garder ses enfants ?",reponse:"Non, le télétravail ne peut être appliqué pour garder ses enfants ou pour couvrir une maladie ordinaire."},{id:27,question:"Qu'arrive-t-il en cas de panne technique pendant le télétravail ?",reponse:"En cas de dysfonctionnement des équipements, l'agent doit informer sa hiérarchie et le service informatique. Si le télétravail n'est plus possible, le travail doit être effectué en présentiel avec la durée de déplacement comptée comme temps de travail."},{id:28,question:"Comment s'articulent les jours de forfait annuel ?",reponse:"L'articulation des jours forfait se fait sur validation hiérarchique 5 jours à l'avance, dans la limite de 3 jours par mois. En cas de non-utilisation, le report n'est pas possible."},{id:29,question:"Quelles sont les formations en hygiène et sécurité ?",reponse:"Formations obligatoires pour développer les compétences en sécurité et protéger la santé au travail : formation générale à la sécurité, premiers secours, formations techniques spécifiques (habilitation électrique, conduite d'engins, HACCP)."},{id:30,question:"Qui sont les acteurs internes de la formation dans la collectivité ?",reponse:"Les élus (votent les crédits), l'autorité territoriale (autorise les départs), la DRH/service DCRH (organise et suit), les responsables hiérarchiques (évaluent les besoins) et les agents (expriment leurs besoins)."}],pm=`
{
    "chapitres": [
        {
            "id": 1,
            "titre": "I. Le cadre juridique",
            "page": 10,
            "mots_cles": [
                "cadre juridique",
                "régime indemnitaire",
                "agents territoriaux"
            ]
        },
        {
            "id": 2,
            "titre": "II. Primes et indemnités liées aux grades ou filières territoriales",
            "page": 15,
            "mots_cles": [
                "primes",
                "indemnités",
                "grades",
                "filières territoriales",
                "RIFSEEP",
                "IHTS",
                "ISFE",
                "prime d'entrée dans le métier",
                "prime d'équipement informatique",
                "prime d'attractivité"
            ]
        },
        {
            "id": 3,
            "titre": "III. Primes et indemnités liées à des fonctions ou sujétions particulières et au télétravail",
            "page": 34,
            "mots_cles": [
                "primes",
                "indemnités",
                "fonctions particulières",
                "sujétions particulières",
                "télétravail",
                "PIPCS",
                "prime spéciale d'installation",
                "indemnité horaire travail de nuit",
                "indemnité jurys de concours",
                "indemnité formateurs",
                "indemnité d'astreinte",
                "indemnité d'intervention",
                "indemnité de permanence",
                "indemnité de panier",
                "indemnité de chaussures",
                "indemnité de petit équipement",
                "indemnité de sujétions horaires",
                "indemnité de surveillance de cantines",
                "indemnité de surveillance d'études surveillées",
                "indemnité de gardiennage des églises communales",
                "forfait télétravail",
                "prime de responsabilité",
                "IFCE",
                "indemnité horaire travail dimanche jours fériés",
                "indemnité d'utilisation d'outillage personnel",
                "prime Grand âge",
                "prime de revalorisation des médecins"
            ]
        },
        {
            "id": 4,
            "titre": "IV. Règlement des frais occasionnés par les déplacements",
            "page": 54,
            "mots_cles": [
                "frais de déplacement",
                "indemnité de mission",
                "indemnité d'intérim",
                "indemnité de stage",
                "indemnité frais de transport",
                "indemnité changement de résidence administrative",
                "forfait mobilités durables"
            ]
        }
    ]
}`;async function Ha(e,t=!1){var a,l,u;const n="/api/completions",r={model:"sonar-pro",messages:e};t&&(r.search_domain_filter=[],r.web_search=!1,r.return_images=!1,r.return_related_questions=!1);const i=await fetch(n,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!i.ok){const p=await i.text();throw new Error(p||`API error (${i.status})`)}const s=await i.json();return((u=(l=(a=s.choices)==null?void 0:a[0])==null?void 0:l.message)==null?void 0:u.content)??JSON.stringify(s)}function mm(e){return`Tu es un assistant syndical pour la mairie de Gennevilliers.

⚠️ RÈGLES CRITIQUES - VIOLATION INTERDITE ⚠️

🚫 INTERDICTIONS ABSOLUES :
- INTERDICTION TOTALE de faire des recherches web
- INTERDICTION TOTALE d'utiliser tes connaissances générales
- INTERDICTION TOTALE de citer des articles de loi externes
- INTERDICTION TOTALE de mentionner des chiffres non présents dans la documentation
- INTERDICTION TOTALE de faire référence à des textes légaux externes
- INTERDICTION TOTALE de donner des informations non documentées
- INTERDICTION TOTALE d'ajouter des précisions après avoir dit "Je ne trouve pas"

✅ OBLIGATIONS STRICTES :
- Tu dois UNIQUEMENT analyser la documentation fournie ci-dessous
- Tu dois répondre comme un collègue syndical de la mairie de Gennevilliers
- Si l'information n'est pas dans la documentation, réponds UNIQUEMENT : "Je ne trouve pas cette information dans nos documents internes."
- Tu dois te baser EXCLUSIVEMENT sur les données du dossier src/data
- ARRÊTE-TOI IMMÉDIATEMENT après avoir dit "Je ne trouve pas" - NE PAS AJOUTER DE PRÉCISIONS

🔒 DOCUMENTATION INTERNE UNIQUEMENT - AUCUNE RECHERCHE EXTERNE AUTORISÉE

--- DOCUMENTATION INTERNE DE LA MAIRIE DE GENNEVILLIERS ---
${e}
--- FIN DOCUMENTATION INTERNE ---

Rappel : Tu ne dois JAMAIS mentionner des articles de loi, des décrets, ou des références externes. Tu ne dois JAMAIS donner des chiffres qui ne sont pas explicitement dans la documentation fournie. Si tu ne trouves pas l'information, ARRÊTE-TOI IMMÉDIATEMENT.`}const an=[{id:"temps_ch1_definition",titre:"Définition du temps de travail",motsCles:["temps de travail","travail effectif","1607h","durée légale","jours travaillés","solidarité"],source:"temps",chapitre:1,resume:"Définition légale du temps de travail, calcul des 1607h annuelles, journée de solidarité"},{id:"temps_ch1_durees",titre:"Durées et cycles de travail",motsCles:["37h","38h","39h","cycle hebdomadaire","annualisation","JNT","crèches"],source:"temps",chapitre:1,resume:"Cycles de travail (37h, 37.5h, 38h, 39h), annualisation, jours non travaillés"},{id:"temps_ch1_plages",titre:"Plages fixes et plages de souplesse",motsCles:["plages fixes","plages souplesse","horaires variables","flexibilité","pause méridienne","9h30","16h30"],source:"temps",chapitre:1,resume:"Horaires de présence obligatoire (9h30-12h, 14h-16h30) et plages de souplesse"},{id:"temps_ch1_garanties",titre:"Garanties minimales",motsCles:["repos quotidien","repos hebdomadaire","11h","35h","amplitude","48h","nuit"],source:"temps",chapitre:1,resume:"Repos minimum (11h/jour, 35h/semaine), amplitude max 12h, durée max 48h/semaine"},{id:"temps_ch1_heures_sup",titre:"Heures supplémentaires et complémentaires",motsCles:["heures supplémentaires","heures complémentaires","majoration","25%","27%","récupération","nuit","dimanche"],source:"temps",chapitre:1,resume:"Heures sup majorées 25%/27%, max 25h/mois, récupération ou indemnisation"},{id:"temps_ch1_temps_partiel",titre:"Temps partiel",motsCles:["temps partiel","50%","60%","70%","80%","90%","droit","autorisation","rémunération","retraite","surcotisation"],source:"temps",chapitre:1,resume:"Temps partiel de droit (enfant, handicap) ou sur autorisation, quotités 50-90%"},{id:"temps_ch1_solidarite",titre:"Journée de solidarité",motsCles:["solidarité","7 heures","jour férié","RTT","proratisation"],source:"temps",chapitre:1,resume:"7h supplémentaires fractionnées sur l'année (2 min/jour)"},{id:"temps_ch1_astreintes",titre:"Astreintes et permanences",motsCles:["astreinte","permanence","intervention","filière technique","indemnité","repos compensateur","week-end"],source:"temps",chapitre:1,resume:"Astreintes (exploitation, décision, sécurité), permanences week-end/fériés"},{id:"temps_ch1_sujetions",titre:"Sujétions particulières (nuit, dimanche)",motsCles:["sujétions","travail de nuit","dimanche","jours fériés","compensation","pénibilité"],source:"temps",chapitre:1,resume:"Compensations pour travail de nuit et dimanches/fériés (1 à 4 jours selon volume)"},{id:"temps_ch2_conges_annuels",titre:"Congés annuels",motsCles:["congés annuels","congé annuel","congés","vacances","25 jours","CA","planning","estivaux","report","priorité","droit","combien"],source:"temps",chapitre:2,resume:"25 jours ouvrés/an, règles de pose, priorités, report exceptionnel"},{id:"temps_ch2_conge_bonifie",titre:"Congé bonifié (outre-mer)",motsCles:["congé bonifié","outre-mer","DOM","Guadeloupe","Martinique","Réunion","Guyane","Mayotte"],source:"temps",chapitre:2,resume:"Congé pour fonctionnaires originaires des DOM, tous les 2 ans, max 31 jours"},{id:"temps_ch2_rtt",titre:"Jours RTT / ARTT",motsCles:["RTT","ARTT","réduction temps travail","12 jours","15 jours","18 jours","23 jours","décompte","maladie"],source:"temps",chapitre:2,resume:"RTT selon cycle (12j à 37h, 15j à 37.5h, 18j à 38h, 23j à 39h), déduction si maladie"},{id:"temps_ch2_don_jours",titre:"Don de jours de repos",motsCles:["don jours","enfant malade","proche aidant","solidarité","anonyme"],source:"temps",chapitre:2,resume:"Don anonyme de RTT/CA (max 5j/an) pour collègue avec enfant malade ou aidant"},{id:"temps_ch2_cet",titre:"Compte Épargne Temps (CET)",motsCles:["CET","compte épargne temps","épargne","capitalisation","jours non pris"],source:"temps",chapitre:2,resume:"Épargne de jours CA (max 5j) et RTT, ouvert après 1 an de service"},{id:"temps_ch2_naissance",titre:"Congés maternité et paternité",motsCles:["maternité","paternité","naissance","accouchement","grossesse","prénatal","postnatal","16 semaines","25 jours"],source:"temps",chapitre:2,resume:"Maternité 16 semaines (+ si 3e enfant/jumeaux), paternité 25 jours calendaires"},{id:"temps_ch3_fetes_religieuses",titre:"Fêtes religieuses",motsCles:["fêtes religieuses","musulmane","juive","orthodoxe","bouddhiste","Aïd","Kippour"],source:"temps",chapitre:3,resume:"Autorisation prioritaire de poser un congé pour fêtes religieuses"},{id:"temps_ch3_garde_enfant",titre:"Garde d'enfant malade",motsCles:["garde enfant","enfant malade","nourrice","école fermée","6 jours","16 ans","grève"],source:"temps",chapitre:3,resume:"6 jours/an (doublés si parent seul), jusqu'aux 16 ans de l'enfant"},{id:"temps_ch3_soins_malade",titre:"Soins ou assistance à un malade",motsCles:["soins","malade","conjoint","ascendant","certificat médical","5 jours","3 jours"],source:"temps",chapitre:3,resume:"5 jours pour conjoint/parents/enfant, 3 jours pour autres proches"},{id:"temps_ch3_proche_aidant",titre:"Congé proche aidant (fin de vie)",motsCles:["proche aidant","fin de vie","AJPA","dépendance","handicap","non rémunéré"],source:"temps",chapitre:3,resume:"Congé non rémunéré max 3 mois renouvelable, AJPA possible via CAF"},{id:"temps_ch3_deces",titre:"Décès d'un membre de la famille",motsCles:["décès","obsèques","deuil","conjoint","parent","enfant","5 jours","14 jours"],source:"temps",chapitre:3,resume:"5j conjoint/parents, 14j enfant <25 ans, 3j grands-parents/frères/soeurs"},{id:"temps_ch3_mariage",titre:"Mariage ou PACS",motsCles:["mariage","PACS","union","cérémonie","7 jours","3 jours","1 jour"],source:"temps",chapitre:3,resume:"7 jours pour l'agent, 3 jours pour enfant, 1 jour pour autres proches"},{id:"temps_ch3_maternite_absence",titre:"Absences liées à la maternité",motsCles:["grossesse","examens prénataux","accouchement sans douleur","1 heure par jour"],source:"temps",chapitre:3,resume:"Examens prénataux, 1h/jour dès le 3e mois, préparation accouchement"},{id:"temps_ch3_consultation",titre:"Consultation médicale",motsCles:["consultation","rendez-vous médical","récupération","RQTH","4 jours"],source:"temps",chapitre:3,resume:"Absence autorisée mais récupérable, sauf RQTH (4j/an)"},{id:"temps_ch3_rentree",titre:"Rentrée scolaire",motsCles:["rentrée scolaire","école","maternelle","primaire","6ème","1 heure"],source:"temps",chapitre:3,resume:"Facilité d'1h le jour de la rentrée (maternelle, primaire, entrée en 6e)"},{id:"temps_ch3_demenagement",titre:"Déménagement",motsCles:["déménagement","changement adresse","domicile","1 jour"],source:"temps",chapitre:3,resume:"1 jour d'autorisation la semaine précédant ou suivant le déménagement"},{id:"temps_ch3_formation",titre:"Formation et concours",motsCles:["formation","concours","examen professionnel","jury","formateur","1 jour","2 jours"],source:"temps",chapitre:3,resume:"1j avant admissibilité, 2j avant admission, 5j/an jury ou formateur externe"},{id:"temps_ch4_maladie",titre:"Congé maladie",motsCles:["maladie","arrêt","carence","48h","contrôle","contre-visite","CMO"],source:"temps",chapitre:4,resume:"Transmission sous 48h, 1 jour de carence, contre-visite possible"},{id:"temps_ch4_accident",titre:"Accident de service ou de trajet",motsCles:["accident service","accident travail","accident trajet","déclaration","15 jours","certificat"],source:"temps",chapitre:4,resume:"Déclaration sous 48h (régime général) ou 15j (CNRACL), plein traitement"},{id:"temps_ch4_remuneration",titre:"Prise en charge rémunération maladie",motsCles:["rémunération","plein traitement","demi-traitement","CLM","CLD","grave maladie","CNRACL","IRCANTEC"],source:"temps",chapitre:4,resume:"Maladie ordinaire: 3 mois plein + 9 mois demi, CLM/CLD: 1-3 ans plein"},{id:"formation_obligatoire",titre:"Formations obligatoires (intégration, professionnalisation)",motsCles:["formation obligatoire","intégration","professionnalisation","CNFPT","titularisation","5 jours","10 jours"],source:"formation",resume:"Formation intégration (5-10j), professionnalisation 1er emploi (3-10j), tout au long carrière (2-10j)"},{id:"formation_concours",titre:"Préparation concours et examens",motsCles:["concours","examen professionnel","préparation","avancement","promotion"],source:"formation",resume:"Préparation aux concours/examens FPT, 1j admissibilité + 2j admission"},{id:"formation_cpf",titre:"Compte Personnel de Formation (CPF)",motsCles:["CPF","compte formation","heures","25 heures","150 heures","diplôme","certification"],source:"formation",resume:"25h/an (plafond 150h), formations diplômantes ou certifiantes"},{id:"formation_conge_pro",titre:"Congé de formation professionnelle",motsCles:["congé formation","3 ans","85%","traitement","projet professionnel"],source:"formation",resume:"Max 3 ans sur carrière (5 ans cat C), rémunéré 85% la 1ère année"},{id:"formation_bilan",titre:"Bilan de compétences",motsCles:["bilan compétences","24 heures","72 heures","projet professionnel","reconversion"],source:"formation",resume:"24h (72h si handicap/cat C), tous les 5 ans"},{id:"formation_vae",titre:"Validation des Acquis de l'Expérience (VAE)",motsCles:["VAE","validation acquis","expérience","diplôme","24 heures"],source:"formation",resume:"24h de congé (72h si handicap/cat C) pour obtenir un diplôme via expérience"},{id:"formation_transition",titre:"Congé de transition professionnelle",motsCles:["transition professionnelle","reconversion","nouveau métier","120 heures","6000€"],source:"formation",resume:"Max 1 an, formations ≥120h, frais pris en charge jusqu'à 6000€"},{id:"formation_immersion",titre:"Période d'immersion professionnelle",motsCles:["immersion","découverte métier","mobilité","2 à 10 jours"],source:"formation",resume:"2 à 10 jours pour découvrir un autre métier, max 20j sur 3 ans"},{id:"formation_syndicale",titre:"Formation syndicale",motsCles:["formation syndicale","syndicat","12 jours","représentant"],source:"formation",resume:"12 jours ouvrables par an, frais à charge du syndicat"},{id:"formation_hygiene_securite",titre:"Formations hygiène et sécurité",motsCles:["sécurité","hygiène","habilitation","CACES","électrique","premiers secours"],source:"formation",resume:"Formations obligatoires liées au poste (CACES, habilitation électrique, SST...)"},{id:"formation_perfectionnement",titre:"Formation de perfectionnement et préparation aux diplômes",motsCles:["perfectionnement","diplôme","frais","70%","prise en charge","pédagogique","qualification"],source:"formation",resume:"Formations diplômantes/qualifiantes, 70% frais pédagogiques si demande de l'agent"},{id:"formation_integration",titre:"Formation d'intégration",motsCles:["intégration","titularisation","5 jours","10 jours","catégorie A","catégorie B","catégorie C","CNFPT"],source:"formation",resume:"Obligatoire à titularisation : 10 jours (cat A/B), 5 jours (cat C)"},{id:"formation_professionnalisation",titre:"Formation de professionnalisation",motsCles:["professionnalisation","premier emploi","carrière","5 jours","10 jours","nouveau poste"],source:"formation",resume:"5 à 10 jours (1er emploi), 2 à 10 jours (tout au long de carrière)"},{id:"formation_rep",titre:"Reconnaissance de l'Expérience Professionnelle (REP)",motsCles:["REP","reconnaissance","expérience","équivalence","diplôme","concours"],source:"formation",resume:"Permet de faire reconnaître son expérience comme équivalente à un diplôme pour les concours"},{id:"formation_disponibilite_etudes",titre:"Disponibilité pour études ou recherches",motsCles:["disponibilité","études","recherches","3 ans","renouvelable"],source:"formation",resume:"Max 3 ans renouvelable une fois, sans rémunération ni avancement"},{id:"formation_formateur_interne",titre:"Formateur interne occasionnel",motsCles:["formateur","interne","expertise","RIFSEEP","déroulé pédagogique"],source:"formation",resume:"Agents avec expertise métier, formation de formateur requise, rémunéré via RIFSEEP"},{id:"teletravail_principes",titre:"Principes du télétravail",motsCles:["télétravail","principes","volontariat","réversibilité","confiance","déconnexion"],source:"teletravail",resume:"Volontaire, réversible, droit à la déconnexion, management par confiance"},{id:"teletravail_eligibilite",titre:"Éligibilité au télétravail",motsCles:["éligibilité","métiers","compatible","exclus","catégorie A","catégorie B","catégorie C"],source:"teletravail",resume:"Ouvert à tous si fonctions compatibles, exclus: contact public, voie publique, confidentialité"},{id:"teletravail_quotite",titre:"Quotité et forfait télétravail",motsCles:["forfait","jours télétravail","15 jours","1 jour par semaine","3 jours par mois","quotité"],source:"teletravail",resume:"1 jour fixe/semaine + forfait 15 jours/an (max 3j/mois), présence obligatoire 3j/semaine"},{id:"teletravail_demande",titre:"Procédure de demande télétravail",motsCles:["demande","formulaire","autorisation","refus","entretien","CAP"],source:"teletravail",resume:"Demande écrite, entretien préalable, refus motivé contestable en CAP"},{id:"teletravail_materiel",titre:"Matériel et équipement télétravail",motsCles:["matériel","ordinateur","internet","kit ergonomique","équipement"],source:"teletravail",resume:"Matériel fourni par la collectivité, kit ergonomique, connexion internet requise"},{id:"teletravail_lieu",titre:"Lieu d'exercice du télétravail",motsCles:["domicile","lieu","adresse","espace coworking","tiers lieu"],source:"teletravail",resume:"Domicile principal ou autre lieu déclaré, espaces publics possibles"},{id:"teletravail_horaires",titre:"Horaires et temps de travail en télétravail",motsCles:["horaires","plages fixes","joignable","déconnexion","heures sup"],source:"teletravail",resume:"Mêmes horaires que sur site, plages fixes obligatoires, pas d'heures sup"},{id:"teletravail_situations_particulieres",titre:"Situations particulières (grossesse, aidants, handicap)",motsCles:["grossesse","enceinte","proche aidant","handicap","situation particulière","dérogation"],source:"teletravail",resume:"Dérogation possible au-delà de 3j/semaine pour femmes enceintes, aidants, handicap"},{id:"teletravail_exceptionnel",titre:"Télétravail exceptionnel (pandémie, intempéries)",motsCles:["exceptionnel","pandémie","intempéries","circonstances","PCA","continuité"],source:"teletravail",resume:"Peut être imposé en cas de crise (pandémie, catastrophe), intégré au PCA"},{id:"teletravail_reversibilite",titre:"Réversibilité et fin du télétravail",motsCles:["réversibilité","fin","arrêt","préavis","1 mois","2 mois","adaptation"],source:"teletravail",resume:"Fin possible à tout moment : 1 mois préavis pendant adaptation, 2 mois après"}],es={temps:an.filter(e=>e.source==="temps"),formation:an.filter(e=>e.source==="formation"),teletravail:an.filter(e=>e.source==="teletravail")},fm=`
            RÈGLEMENT INTÉRIEUR FORMATION
Préambule
La formation joue un rôle clef dans la politique mise en œuvre par la collectivité. Elle doit permettre aussi d'adapter et de perfectionner les services aux nouvelles technologies, à la gestion et au développement de projets complexes. Il s'agit de maintenir une adéquation entre les compétences des agents et l'évolution de leurs emplois, pour leur permettre d'exercer plus efficacement leurs fonctions en vue de satisfaire au mieux les
besoins des usagers.
La formation doit favoriser la promotion professionnelle et le développement des qualifications et compétences des agents. C'est un outil de gestion du parcours individuel des agents.
La formation peut permettre des évolutions de carrière par l'intermédiaire des concours et examens professionnels ou faciliter l'obtention de diplômes grâce à la validation des acquis de l'expérience (VAE).
Elle concourt à l'égalité d'accès aux différents grades et emplois, en particulier entre femmes et hommes, et à la progression des personnes les moins qualifiées
Enfin la formation tient une place primordiale aussi bien dans la gestion prévisionnelle
des emplois, des effectifs et des compétences (GPEEC), que dans le cadre d'une démarche de professionnalisation des agents.
L'objectif du règlement de formation est de permettre à chaque agent de la Ville, du CCAS, de la Caisse des Ecoles, de connaître ses droits et ses obligations en matière de formation, les conditions d'accès aux formations et les modalités d'exercice.
Le droit à la formation
Les agents stagiaires, titulaires, contractuels de droit public qui occupent un emploi permanent sont concernés par la formation dans les conditions prévues par les textes de référence (loi n°2019-828 du 6 août 2019)
Sont également concernés les agents en congé parental.
L'ensemble des agents de la collectivité bénéficie d'un accès à la formation conformément à la réglementation en vigueur, et dans la mesure de la continuité du service. A cet effet, un plan de formation est réalisé annuellement grâce au recueil des
besoins de l'ensemble des agents (Art. L423-3 du Code Général de la Fonction Publique).
Toute période de formation professionnelle est considérée comme du temps de travail,
sauf dans les cas particuliers de la disponibilité pour études ou recherches.
L'autorisation de participer à une formation est toujours soumise aux nécessités de service.
Les agents en congé de maladie, d'accident de service ou en congé de maternité ne peuvent pas participer aux actions de formation.
Toutefois, par exception, un fonctionnaire peut bénéficier d'une formation ou d'un bilan de compétences, à sa demande et sous réserve d'un avis médical favorable et de l'avis du service développement des compétences RH, pendant un congé pour indisponibilité physique (congé de maladie ordinaire, congé de longue maladie, congé de longue durée, congé d'invalidité temporaire imputable au service), mais uniquement en vue de sa réadaptation ou de sa reconversion professionnelle (article L.822-30 du code général de la fonction publique). Pour les agents IRCANTEC soumis au régime général de la sécurité sociale, l'accord de la CPAM doit être également sollicité (article L.323-3-1 du code de la sécurité sociale).
Un accès à la formation est également privilégié pour les agents concernés par une
procédure de reclassement pour inaptitude physique.
Les agents en position de disponibilité sont exclus des formations prises en charge par l'employeur.
Acteurs de la formation
INTERNES A LA COLLECTIVITE :
       - Les élus : l'organe délibérant approuve, sur proposition de l'autorité territoriale, par ses délibérations, les dispositions relatives à la formation qui lui sont soumises (il vote par exemple les crédits alloués à la formation). Le plan de formation lui est présenté.
       - L'autorité territoriale autorise les départs en formation, soumis aux nécessités de service.
        - La direction des ressources humaines, par le biais du service DCRH, recueille et traite les demandes des agents et organise les formations obligatoires prévues par le statut pour certains grades. Le référent formation assure le conseil, la mise en œuvre et le suivi administratif et financier du plan de formation.
       - Le responsable hiérarchique évalue et participe à la définition des besoins individuels et collectifs des agents de son service. Il évalue également les bénéfices des actions de formation. Il a, auprès des agents, un rôle d'explication du règlement, outil sur lequel il pourra s'appuyer lors des entretiens annuels d'évaluation pour aborder les questions de formation.
       - Les agents expriment leurs besoins de formation. Ils peuvent bénéficier, à leur demande, d'un accompagnement personnalisé destiné à les aider à élaborer et à mettre en œuvre leur projet professionnel. Par leur implication, Ils sont les principaux acteurs de leur parcours de formation et à ce titre, ils font valoir leurs droits et remplissent leurs obligations règlementaires à cet égard.
LES INSTANCES CONSULTATIVES :
Le Comité Social Territorial :
Le CST de la collectivité territoriale doit être consulté pour avis sur toutes les dispositions générales relatives à la formation. Le plan de formation lui est présenté ainsi que le bilan des actions de formation, notamment dans le cadre du rapport social unique (RSU).
Les Commissions Administratives Paritaires et les Commissions
Consultatives Paritaires :
Les CAP et les CCP sont consultées sur certaines questions d'ordre individuel relatives à la formation.
EXTERNES A LA COLLECTIVITE
Le Centre National de la Fonction Publique Territoriale, le CNFPT est l'établissement public chargé de dispenser les formations, auquel la collectivité territoriale ou l'établissement public verse une cotisation correspondant à 0,9 % de la masse salariale.
La collectivité de Gennevilliers verse sa cotisation au CNFPT – délégation Ile de France.
Les agents doivent donc prioritairement s'inscrire sur les formations délivrées par celle-ci. Une copie du plan de formation est transmise à la délégation régionale du CNFPT.
LES AUTRES ORGANISMES DE FORMATION :
Lorsqu'un agent souhaite bénéficier d'une formation non dispensée par le CNFPT, il doit en faire la demande par le biais du formulaire dédié disponible sur l'Intranet de la Ville. Ce formulaire dûment complété et comportant l'avis hiérarchique doit être accompagné d'un devis avant transmission au service DCRH. La demande fait l'objet d'un arbitrage en fonction de sa pertinence, de son recensement préalable, de son coût.
Le service DCRH informe l'agent et sa direction de l'accord ou du refus de formation.
Type de formation
Formations obligatoires :
Formation d'intégration :
  •   Objectif : doter le fonctionnaire nouvellement nommé dans un cadre d'emplois
      ainsi que les agents recrutés sur un emploi permanent pour une durée d'au moins
      un an, des connaissances relatives à l'environnement territorial. La formation
      porte notamment sur l'organisation et le fonctionnement des collectivités
      territoriales et sur le statut de la fonction publique. Le suivi de cette formation en
      intégralité dans les délais impartis conditionne la titularisation.
         o   Bénéficiaires : Tous les fonctionnaires des catégories A, B, et C, ainsi que
             les agents contractuels recrutés pour une durée d'au moins un an sur poste
             permanent.
         o   Durée : 10 jours pour les catégories A et B, 5 jours pour la catégorie C.
         o   Délai : Doit être réalisée dans l'année suivant la nomination.
         o   Dispenses : Dispenses possibles pour certains agents ou sur demande
             avec justification.
         o   Démarches : Inscription dès la nomination via la plateforme du CNFPT.
         o   Prise en charge : En région Ile de France, prise en charge des frais de
             transport à 100% (transport en commun).
                 ▪   En dehors d'Ile de France, frais de transport et d'hébergement
                     indemnisés selon le barème du CNFPT.
Formation de professionnalisation :
         o   Objectif : permettre aux fonctionnaires de s'adapter à leur emploi et de maintenir leurs compétences à niveau tout au long de leur carrière. La durée des formations est au minimum celle prévue par le statut particulier de chacune d'entre elles et son contenu est choisi par l'agent en lien avec la collectivité et avec le concours du CNFPT. Elle se décline en plusieurs types, chacun répondant à des besoins spécifiques en fonction de l'évolution professionnelle de l'agent.
Formation de Professionnalisation au Premier Emploi
o Objectif : Permettre aux nouveaux agents de s'adapter rapidement à leur premier emploi, en fonction des missions définies par leurs statuts particuliers.
o Bénéficiaires : Tous les fonctionnaires nouvellement nommés stagiaires, y compris ceux en détachement et ceux nommés par promotion interne.
o Durée : 5 à 10 jours pour les agents de catégorie A et B, 3 à 10 jours pour les agents de catégorie C.
o Délai : Doit être réalisée dans les 2 ans suivant la nomination dans le cadre d'emploi.
Formation de Professionnalisation Tout au Long de la Carrière
o Objectif : Maintenir et développer les compétences des agents tout au long de leur carrière, pour répondre aux évolutions des métiers.
o Bénéficiaires : Tous les fonctionnaires.
o Durée : 2 à 10 jours pour tous les agents, indépendamment de leur catégorie.
o Périodicité : Tous les 5 ans suivant la formation de professionnalisation au premier emploi.
Formation de Professionnalisation à la suite de l'affectation sur un poste à responsabilité
o Objectif : Préparer les agents à assumer des responsabilités accrues lorsqu'ils sont affectés à un poste à responsabilité.
o Bénéficiaires : Tous les fonctionnaires.
o Durée : 3 à 10 jours pour tous les agents.
o Délai : Doit être réalisée dans les 6 mois suivant l'affectation sur un poste à responsabilité.
Dispenses
• Dispense Totale ou Partielle : Possible en concertation avec l'agent, compte tenu des formations professionnelles.
• Demande de Dispense : L'autorité territoriale présente un dossier de demande de dispense au CNFPT, qui décide de l'accorder ou non.
  o Prise en charge :
    ▪ En région Ile de France, prise en charge des frais de transport à 100% (transport en commun).
    ▪ En dehors d'Ile de France, frais de transport et d'hébergement indemnisés selon le barème du CNFPT.
    • La promotion interne est subordonnée, entre autres critères, à l'accomplissement des formations de professionnalisation prévues par le statut particulier du cadre d'emplois d'origine du fonctionnaire.
Les formations en hygiène et sécurité
        o   Objectif : permettre de développer les compétences et les connaissances des agents en vue d'assurer leur sécurité et protéger leur santé au travail. Ces obligations de formations englobent la formation générale à la sécurité (la formation aux premiers secours, gestes et postures…), ainsi que des formations techniques spécifiques liées aux postes de travail ou aux matériels utilisés (habilitation électrique, conduite d'engins ou de véhicules, HACCP…)
        o   Bénéficiaires : Fonctionnaires titulaires ou stagiaires, agents contractuels.
        o   Durée : Variable selon la formation
        o   Démarches : Demande à l'employeur, 6 semaines avant
        o   Prise en charge : Frais pédagogiques et frais annexes pris en charge par l'employeur ou le CNFPT.
Formations non obligatoires :
Préparation aux concours et examens professionnels :
        o   Objectif : Préparer les agents aux avancements de grade ou changements de cadre d'emplois.
        o   Bénéficiaires : Fonctionnaires titulaires ou stagiaires, agents contractuels.
        o   Durée : Variable selon le concours ou examen préparé.
        o   Délais : 12 mois entre deux formations similaires, sauf si la durée effective est inférieure à 8 jours.
        o   Démarches : Inscription sur la plateforme du CNFPT, demande d'autorisation à l'autorité territoriale.
        o   Prise en charge :
               ▪   Frais pédagogiques couverts par la cotisation au CNFPT
               ▪   Frais de déplacement 75 % (transport en commun) et de restauration (14 €) prise en charge par la collectivité en Ile de France
               ▪   Si préparation en dehors d'Ile de France, exceptionnellement pour des préparations non organisées en Ile de France, pris en charge de la DAF, si pas de prise en charge par le CNFPT.
Participation à des Concours ou Examens Professionnels
        o   Les jours des épreuves sont sur du temps de travail, seulement pour les concours et les examens de la fonction publique territoriale.
        o   Congés pour préparation : 1 jour avant les épreuves d'admissibilité et 2 jours avant l'épreuve d'admission, sur présentation des convocations et justificatifs de présence. Accordé une seule fois par an pour un concours ou examen.
        o   Démarches : Demande à l'employeur dès réception de la convocation à l'épreuve.
        o   Prise en charge : 75 % du titre de transport en commun si pas de passe Navigo.
Reconnaissance de l'Expérience Professionnelle (REP)
        o   Objectif : La REP permet aux agents de la fonction publique territoriale de faire reconnaître leur expérience professionnelle comme équivalente à un diplôme, facilitant ainsi l'accès à certains concours sans posséder les diplômes requis.
        o   Bénéficiaires : Tous les agents territoriaux peuvent bénéficier de la REP.
        o   Conditions d'Éligibilité : Les agents doivent justifier d'une expérience professionnelle significative et pertinente par rapport au concours visé.
        o   Démarches : L'agent doit soumettre une demande de REP à l'organisateur du concours, en fournissant les preuves de son expérience professionnelle.
        o   Examen de la Demande : L'organisateur du concours examine l'expérience professionnelle du candidat en comparaison avec les connaissances, compétences et aptitudes requises pour l'obtention du diplôme et décide si l'expérience professionnelle du candidat est suffisante pour accéder au concours sans diplôme.
Lutte contre l'illettrisme et apprentissage du français :
        o   Objectif : Réacquérir les savoirs de base en lecture, écriture, calcul.
        o   Bénéficiaires : Agents ne maîtrisant pas les savoirs de base.
        o   Durée : sans durée prescrite, selon niveaux définis par le CNFPT
        o   Démarches : Demande à l'employeur 6 semaine avant le début de la formation, autorisation sous réserve des nécessités de service.
        o   Prise en charge : Cotisation du CNFPT.
        o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
               ▪   S'il l'agent n'a pas l'accord de son employeur 2 années de suite, il peut s'adresser au CNFPT auprès duquel il bénéficie d'une priorité d'accès aux actions de formations équivalentes.
Formation diplômante ou qualifiante :
        o   Objectif : Obtenir un diplôme ou une qualification reconnue.
        o   Bénéficiaires : Fonctionnaires et agents contractuels.
        o   Durée : Variable selon le diplôme ou la qualification visée.
        o   Démarches : Demande à l'employeur 6 semaines avant le début de la formation.
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
               ▪   si formation est à la demande de l'agent uniquement, la participation de la collectivité est à hauteur de 70 % des frais pédagogique.
               ▪   Pas de prise en charge de frais annexes.
Formation de perfectionnement :
        o   Objectif : Développer ou acquérir de nouvelles compétences liées au poste et au métier.
        o   Bénéficiaires : Fonctionnaires et agents contractuels.
        o   Durée : Sans durée prescrite.
        o   Délais : 12 mois entre deux formations similaires, sauf si la durée effective est inférieure à 8 jours.
        o   Démarches : Demande à l'employeur 6 semaines avant
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
               ▪   si formation est à la demande de l'agent uniquement, la participation de la collectivité est à hauteur de 70 % des frais pédagogique.
               ▪   Pas de prise en charge de frais annexes.
        o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
               ▪   S'il l'agent n'a pas l'accord de son employeur 2 années de suite, il peut s'adresser au CNFPT auprès duquel il bénéficie d'une priorité d'accès aux actions de formations équivalentes.
Formation syndicale :
        o   Objectif : Acquérir des connaissances en matière syndicale.
        o   Bénéficiaires : Tous les agents, fonctionnaires ou contractuels. Dans les collectivités de plus de 100 agents, le pourcentage des agents partant en congé pour formation syndicale ne peut représenter que 5% de l'effectif réel.
        o   Durée : 12 jours ouvrables par an.
        o   Démarches : Demande écrite à l'autorité territoriale au moins un mois avant le début du stage.
        o   Prise en charge : Frais à la charge de l'organisation syndicale organisatrice.
        o   Refus : L'employeur peut refuser un tel congé pour des raisons de nécessité de service. En cas de refus , celui-ci doit être motivé est communiqué à la CAP/ CCP.
La formation des membres du CST :
        o   Objectif : La formation des membres du CST est essentielle pour leur permettre d'exercer efficacement leurs missions en matière de santé, de sécurité et de conditions de travail. Elle vise à leur fournir les connaissances nécessaires pour identifier les risques professionnels, proposer des actions de prévention et contribuer à l'amélioration des conditions de travail.
        o   Bénéficiaires : Tous les membres, qu'ils soient titulaires ou suppléants, doivent bénéficier de la formation nécessaire à l'exercice de leurs missions.
        o   Durée : La durée de la formation est généralement de 3 à 5 jours, selon les besoins et les thématiques abordées.
        o   Contenu : La formation couvre divers aspects, notamment :
               ▪   Les missions et le fonctionnement du CST.
               ▪   Les principes généraux de prévention des risques professionnels.
               ▪   Les méthodes d'analyse des risques et des conditions de travail.
       ▪   Les obligations de l'employeur en matière de santé et sécurité au travail.
       ▪   Les droits et devoirs des membres du CST.
o   Organisme de Formation : La formation est assurée par des organismes agréés par le ministère du Travail ou des organismes spécialisés dans la formation en santé et sécurité au travail.
o   Prise en Charge : Les frais pédagogique et les frais annexes sont pris en charge par l'employeur.
Périodes Spécifiques au Service de la Formation
Congés :
Congé de formation professionnelle :
        o   Objectif : Suivre une formation longue pour un projet professionnel ou personnel.
        o   Bénéficiaires : Fonctionnaires et agents contractuels avec au moins 3 ans de service, dont les 12 derniers mois dans la collectivité.
        o   Durée : Maximum 3 ans sur la carrière, utilisable en une ou plusieurs fois. Cette durée peut être de 5 ans pour les agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail.
        o   Démarches : Demande écrite 90 jours avant le début de la formation, réponse de l'employeur dans les 30 jours.
        o   Prise en charge : Frais de formation à la charge de l'agent sauf accord de la collectivité ;
        o    Rémunération : L'agent en formation perçoit pendant la première année de congé une indemnité mensuelle égale à 85 % de son traitement indiciaire brut et de l'indemnité de résidence perçus au moment de sa mise en congé. Toutefois, cette indemnité mensuelle ne peut pas être supérieure à 2 778,62 € brut par mois. Les années de congé suivantes ne sont pas rémunérées, sauf pour les agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail, pour qui la seconde année est rémunérée.
        o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
Congé pour bilan de compétences :
        o   Objectif : Analyser les compétences, aptitudes et motivations professionnelles.
        o   Bénéficiaires : Fonctionnaires, agents contractuels, assistants maternels et familiaux.
        o   Durée : 24 heures de temps de service, fractionnables en plusieurs
            séances. Pour les agents territoriaux appartenant à certaines catégories,
            cette durée est portée à 72 heures de temps de service. Ces catégories incluent :
               ▪   Les agents de catégorie C n'ayant pas atteint un niveau de formation sanctionné par un diplôme ou un titre professionnel correspondant au niveau 4.
               ▪   Les agents en situation de handicap.
               ▪   Les agents particulièrement exposés à un risque d'usure professionnelle.
        o   Fréquence : Un agent ne peut prétendre à un autre bilan de compétences qu'à l'expiration d'un délai de cinq ans après l'achèvement du précédent, sauf pour certains agents où ce délai est réduit à trois ans (liste ci-dessus).
        o   Démarches : Demande 60 jours avant le début du bilan, réponse de l'employeur dans les 30 jours.
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
Congé pour validation des acquis de l'expérience (VAE) :
        o   Objectif : Obtenir un diplôme ou une qualification grâce à l'expérience professionnelle.
        o   Bénéficiaires : Fonctionnaires, agents contractuels, assistants maternels et familiaux.
        o   Durée : 24 heures, 72 heures pour les agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail.
        o   Démarches : Demande 60 jours avant le début des actions de VAE, réponse de l'employeur dans les 30 jours.
        o   Prise en charge : sous réserve des priorités de la collectivité, du budget alloué et de l'inscription dans le plan de formation.
Congé de transition professionnelle :
        o   Objectif : permettre à certains agents, en cas de nécessité d'exercer un nouveau métier constaté d'un commun accord entre l'agent et la collectivité qui l'emploie, de suivre une action ou un parcours de formation longs, en vue d'exercer le nouveau métier.
        o   Sont éligibles les actions ou parcours de formation :
               ▪   D'une durée égale ou supérieure à 120 heures et sanctionnées par une certification professionnelle enregistrée au répertoire national prévu à l'article L. 6113-1 du code du travail, par une attestation de validation de blocs de compétences ou par une certification ou habilitation enregistrée dans le répertoire spécifique mentionné à l'article L. 6113-6 du même code.
               ▪   D'une durée égale ou supérieure à 70 heures et permettant d'accompagner et de conseiller les créateurs ou repreneurs d'entreprises.
        o   Bénéficiaires : agents de catégorie C ne disposant pas du baccalauréat ou bénéficiaire de l'obligation d'emploi ou confrontés à un risque d'usure professionnelle attesté par le médecin du travail.
        o   Durée : Maximum 1 an, prolongeable par un congé de formation professionnelle.
        o   Démarches : Demande 3 mois avant le début de la formation, réponse de l'employeur dans les 2 mois.
        o   Prise en charge : Frais de formation et annexes à la charge de la collectivité, dans la limite d'un plafond de 6000 €. Réf. délibération du 25 juin 2025.
        o   Rémunération : L'agent en congé de transition professionnelle conserve son traitement brut et, le cas échéant, l'indemnité de résidence et le SFT. Les primes et indemnités sont maintenues pour les situations d'agent en suppression d'emploi et en situation d'inaptitude au poste. Réf. délibération du 25 juin 2025.
Autres Dispositifs :
  •   Période d'immersion professionnelle :
         o   Objectif : permet aux agents d'appréhender la réalité d'un métier, d'observer sa pratique et l'environnement professionnel dans lequel elle se déroule. Cela vise à confirmer leur projet d'évolution professionnelle et à faire un choix éclairé de mobilité.
         o   Bénéficiaires : Tous les agents publics.
         o   Employeur d'Accueil : La période d'immersion professionnelle peut être
             effectuée auprès de divers organismes :
                ▪   Établissement public de l'État
                ▪   Collectivité territoriale ou établissement public territorial
                ▪   Établissement public hospitalier
                ▪   Tout autre organisme public.
         o   Durée : 2 à 10 jours, maximum 20 jours sur 3 ans.
         o   Démarches : Demande 3 mois avant le début de l'immersion, réponse de l'employeur dans le mois suivant.
         o   Convention Tripartite : En cas d'acceptation, la mise en œuvre d'une période d'immersion donne lieu à une convention tripartite entre l'agent, l'administration d'emploi et la structure d'accueil. La convention définit les fonctions observées par l'agent, le lieu, la durée, la ou les date, ainsi que les conditions nécessaires au bon déroulement de cette période.
         o   Prise en charge : Pas de frais spécifiques.
•   Disponibilité pour études ou recherches :
       o   Objectif : Effectuer des études ou recherches présentant un intérêt général.
       o   Bénéficiaires : Fonctionnaires.
       o   Durée : Maximum 3 ans, renouvelable une fois.
       o   Démarches : Demande écrite 3 mois avant la date souhaitée, réponse de l'employeur dans les 2 mois.
       o   Prise en charge : Pas de rémunération ni de droits à l'avancement et à la retraite pendant la disponibilité.
       o   Refus : L'autorité territoriale ne peut opposer deux refus successifs à un agent demandant à bénéficier d'une même action de formation qu'après avis de la commission administrative paritaire.
Compte Personnel d'Activité
Compte Personnel de Formation (CPF) :
•   Objectif
•   Le Compte Personnel de Formation (CPF) permet aux agents de la fonction publique territoriale d'accéder à des formations pour obtenir une qualification ou développer des compétences nécessaires à leur évolution professionnelle. Il est alimenté en heures, permettant une plus grande flexibilité dans le choix des formations.
•   Bénéficiaires : Fonctionnaires titulaires ou stagiaires, Agents contractuels
•   Alimentation du Compte : 25 heures par an, avec un plafond de 150 heures. Pour un agent à temps non complet, un calcul au prorata du temps travaillé.
•   Crédit d'heures supplémentaire :
        o   Pour les agents de catégorie C n'ayant pas atteint un niveau de formation sanctionné par un diplôme ou un titre professionnel correspondant au niveau 3, un crédit de 50 heures par an est accordé, avec un plafond de 400 heures.
        o   Pour les agents souhaitant prévenir une situation d'inaptitude physique, un crédit d'heures supplémentaires est accordé, dans la limite de 150 heures, complété par 300 heures pour un agent à temps complet ou 550 heures pour un agent de catégorie C ayant un niveau inférieur au niveau V du répertoire national des certifications professionnelles.
•   Formations éligibles : Le CPF peut être utilisé pour des formations diplômantes, certifiantes, ou pour préparer des concours et examens professionnels.
•   Démarches : L'agent doit soumettre une demande écrite à l'employeur, précisant le projet d'évolution professionnelle.
•   Accord de l'employeur : Un accord écrit est nécessaire sur la nature, le calendrier et le financement de la formation.
•   Prise en charge : Frais pédagogiques des formations via le CPF plafonnés à 5% du budget annuel dédié à la formation, Réf. délibération du 25 juin 2025. Les demandes de formation dans le cadre du CPF sont instruites selon des critères de priorité :
       o   Reconversion Professionnelle pour Motif Médical : Actions de formation, accompagnement, ou bilan de compétences permettant d'accompagner une reconversion professionnelle pour motif médical (inaptitude, préconisation ou restriction médicale).
       o   Validation des Acquis de l'Expérience (VAE) : Actions de VAE, en tenant compte des évolutions sur des métiers en tension et des besoins de la collectivité.
       o   Actions de Formation Personnelle : Actions de formation correspondant aux besoins de la collectivité identifiés dans le plan de formation.
•   Pour les dossiers prioritaires, les frais pédagogiques de formation via le CPF sont pris en charge à 100% par la collectivité. Les frais occasionnés par le déplacement des agents lors de ces formations sont pris en charge conformément à la réglementation en vigueur.
•   Les demandes de CPF non priorisées par la collectivité sont traitées par arbitrages individuels pour définir la décision (accord ou refus) du départ en formation (accord des heures CPF).
•   Portabilité des Droits : Les droits acquis dans le secteur privé peuvent être convertis en heures pour être utilisés dans la fonction publique.
•   Refus : le 3ème rejet d'une formation de même nature ne pourra être prononcé qu'après avis de l'instance paritaire compétente. L'employeur ne peut refuser les formations relevant du socle de connaissances et de compétences fondamentales. Seul un report d'une année sur l'autre en raison des nécessités de service est possible. Elles concernent notamment la communication en Français et les règles de calculs et de raisonnement mathématiques.
Compte d'Engagement Citoyen (CEC) :
 •   Objectif : Valoriser les activités bénévoles ou de volontariat par des droits à formation.
        o   Bénéficiaires : Tous les agents de la fonction publique.
        o   Alimentation : 240 euros (20 heures) par activité éligible, plafond de 720 euros (60 heures).
        o   Activités éligibles : Service civique, réserve militaire, bénévolat associatif, etc.
        o   Démarches : Déclaration des activités éligibles via le service dématérialisé.
        o   Prise en charge : Financement par l'État ou l'organisme compétent selon l'activité.
Dispositif des formateurs et des jurys de concours
Formateurs internes occasionnels :
 •   Conditions préalables pour devenir formateur interne :
        o   Les agents ayants une expertise métier ou technique
        o   Selon les besoins identifiés par la collectivité et sous réserve de l'accord de la DCRH et du responsable hiérarchique de l'agent.
        o   Suivi une formation de formateur (avec attestation)
        o   La formation ne soit pas inscrite dans le profil de l'agent ( ne fait pas partie des missions).
 •   Conditions préalables pour réaliser une formation :
        o   Chaque formateur doit proposer un déroulé pédagogique à la DCRH qui doit être validé avant toute formation. Il engage le formateur sur le contenu de la formation qu'il dispensera.
        o   En fonction des formations, un livrable pourra être conçu par le formateur et distribué aux agents ayant participé à la formation
        o   Le nombre de sessions de formation réalisé par an sera convenu entre le formateur et la DCRH, en accord avec la hiérarchie de l'agent au regard des nécessités de service.
        o   Le matériel nécessaire au formateur pour le bon déroulé de sa formation sera fourni par le service DCRH
        o   Le service DCRH se charge de l'ingénierie de la formation, dont la constitution des groupes, la réservation de la salle , la convocation des participants, les feuilles d'émargements et les attestations de formation.
 •   Droits du formateur :
        o   La préparation des formations se fera sur le temps de travail et sera rémunérée à hauteur d'une journée, lors de la première formation dispensée.
     o   Le support de formation réalisé par le formateur est sa propriété et non celle de la ville. Il ne sera pas diffusé en dehors des agents ayant suivi la formation.
     o   La formation dispensée par le formateur est rémunérée conformément aux dispositions du RIFSEEP.
     o   Les formations se déroulent en mairie et sur le temps de travail.
Participation à des Jurys ou comme Formateur
externes
     o   Sous réserve d'une autorisation de cumul d'emploi et des nécessités de service, Une autorisation d'absence de 10 jours fractionnables (en demi-journée) est accordée pour participer en tant que jury de concours et
         examens ou comme formateur en externe dans les conditions suivantes :
         Il sera accordé par année civile, pour les agents à temps complet (proratise pour les agents à temps non-complet et à temps partiel) et dans la mesure où ces prestations ouvrent droit à rémunération :
            ▪    5 jours par an pour la participation à des jurys de concours. Au-delà les absences devront être prises sur des jours de congés.
            ▪   5 jours par an pour assurer des formations ou intervenir à des colloques. Au-delà, les absences devront être prises sur des jours de congés.
L'organisation de la formation
Les modes d'organisation de la formation
       Les formations peuvent être dispensées de différentes manières :
   •   Les formations dites « INTRA » : à la suite du recueil des besoins en formation, la collectivité organise des formations dans ses locaux. Cette organisation permet de regrouper des agents de différents services autour d'une thématique commune. Les dates ainsi que le contenu du programme de formation sont personnalisables et s'adaptent en fonction des besoins des services.
   •   Les formations dites « INTER » : ces formations réunissent les agents de plusieurs collectivités autour d'une formation commune organisée par le prestataire, le CNFPT ou d'autres organismes de formation.
   •   Les formations dites « INTRA-UNION » : ce sont des formations qui sont proposées principalement par le CNFPT. Elles sont organisées par une des collectivités de l'EPT 5 sur un thème défini répondant aux demandes des collectivités.
   •   Les formations en distanciel : ce sont des formations organisées à distance, généralement via des plateformes en ligne. Cela permet une plus grande flexibilité en termes d'horaires et de lieu de formation et facilite l'accès à la formation pour les agents éloignés géographiquement ou ayant des contraintes de temps. Pour les agents qui ne disposent pas d'ordinateur ou de bureau pour suivre une formation à distance, le service DCRH mettra à leur disposition des ordinateurs portables et la salle de formation équipée en ordinateur.
   •   Les formation Mixte : ce sont des formations qui combinent des sessions en présentiel et des modules en distanciel.
       Inscription à une formation CNFPT ?
   o   L'inscription se fait uniquement en ligne (pas de format papier).
   o   Aller sur son compte IEL (inscription en ligne du CNFPT - www.cnfpt.fr), sélectionner la formation désirée puis dans le menu déroulant, choisir le type de formation (1er emploi, tout au long de la carrière…etc) puis valider.
   o   La demande arrive dans la boite mail du responsable hiérarchique pour validation ou non de la formation.
   o   Enfin, le service DCRH valide la demande.
   o   La procédure d'inscription pas à pas figure également sur l'Intranet de la ville – rubrique formation – 2 – choisir sa formation et en annexe du présent document ;
   o   Les agents du service DCRH peuvent également vous aider à créer votre compte IEL.
Inscription à une formation avec un autre organisme 
Préparation de la demande par l'agent :
   o   L'agent remplit le formulaire de demande d'inscription.
   o   Il fournit les renseignements indispensables et joint le bulletin d'inscription de l'organisme.
Soumission de la demande :
   o   L'agent soumet le formulaire complété à sa hiérarchie
   o   La demande doit être soumise 8 semaines avant le début de la formation.
Soumission de la demande au service DCRH
   o   La demande doit être soumise 6 semaines avant le début de la formation
   o   Le service DCRH vérifie que la demande est totalement et correctement remplie.
   o   Il examine la motivation de l'agent et l'utilité de la formation et sa pertinence, en fonction du plan de formation, des priorités de la collectivité et du budget alloué.
Validation de la demande :
   o   Si la demande est approuvée, elle est validée par le service DCRH.
   o   Si la demande n'est pas approuvée, le service DCRH informe la direction et l'agent.
Inscription à la formation :
   o   Le service DCRH finalise son inscription auprès de l'organisme de formation.
   o   L'agent suit la formation selon les dates et la durée spécifiées.
Attestation de formation : à l'issue de chaque formation réalisée, une attestation de formation est transmise à l'agent par l'organisme de formation. Le service DCRH reçoit automatiquement toutes les attestations du CNFPT. Pour les autres organismes la transmission n'est systématique. Les agents sont invités à les transmettre au service DCRH qui les verse dans leur dossier administratif.
Les droits et devoirs des agents
Journée de Formation est une journée d'activité :
         o   Si la formation tombe sur un jour non travaillé (ex. : week-end), l'agent récupère cette journée.
         o   Si la journée de formation tombe sur une demi-journée hors cycle de travail (exemple : un agent qui travaille sur 4,5 Jours ou sur 4 Jours), l'agent récupère cette demi-journée.
         o   Si la durée de la formation est supérieure au temps de travail habituel, il n'y a pas de récupération. Inversement, si la durée est inférieure, l'agent ne doit pas rendre d'heures.
         o   Pour une formation d'une demi-journée, l'agent doit être présent l'autre demi-journée, sauf si le trajet excède deux heures.
   •   Temps de déplacement : Lors des formations et stages les temps de déplacement ne sont pas récupérés.
Formation en dehors du temps de travail :
         o   Possible dans le cadre du Compte Personnel de Formation (CPF) à la demande de l'agent et avec accord de la hiérarchie.
Tenue et Comportement
         o   Tenue : la présentation en tenue respectant les principes du service public et des principes de laïcité et la neutralité, la journée de formation étant une journée de travail.
         o   Comportement : Téléphone portable éteint ou en mode silencieux pendant la formation, sauf utilisation demandée par le formateur.
Horaires de Stage
         o   Respect des horaires : Les horaires sont communiqués par convocation ou programme de formation.
         o   Modification : Le service DCRH peut modifier les horaires en fonction des nécessités de service.
         o   Retard et absence : Doivent être signalés immédiatement au service DCRH.
Usage du Matériel
         o   Conservation : Le matériel doit être conservé en bon état et utilisé conformément à son objet.
         o   Restitution : Tout matériel et document doivent être restitués à la fin du stage, sauf documents pédagogiques distribués.
Accès aux Formations pour les Agents en Situation de Handicap
Les agents en situation de handicap bénéficient d'un accès prioritaire à plusieurs types de formations. Les formations peuvent être adaptées pour répondre aux besoins spécifiques des agents en situation de handicap, en termes de contenu, de durée et de modalités de formation. Ils peuvent bénéficier d'un accompagnement personnalisé pour les aider à préparer les concours et examens, incluant des aménagements spécifiques pour les épreuves. Pour les dispositifs ci-dessous, les agents en situation de handicap bénéficient de conditions spécifiques et avantageuses pour accéder y accéder :
Congé de Formation Professionnelle
   •   Durée : La durée maximale du congé de formation professionnelle est portée à 5 ans sur l'ensemble de la carrière pour les agents en situation de handicap.
   •   Indemnité : Le montant de l'indemnité est porté à 100% du traitement brut et de l'indemnité de résidence pendant une durée limitée aux douze premiers mois, puis à 85% pendant une durée limitée aux douze mois suivants.
Congé pour Bilan de Compétences
   •   Durée : La durée du congé pour bilan de compétences est portée à 72 heures de temps de service pour les agents en situation de handicap.
   •   Fréquence : Le délai pour prétendre à un autre bilan de compétences est réduit à trois ans pour les agents en situation de handicap.
Congé pour Validation des Acquis de l'Expérience (VAE)
   •   Durée : La durée du congé pour VAE est portée à 72 heures de temps de service pour les agents en situation de handicap.
Congé de Transition Professionnelle
   •   Durée : La durée du congé de transition professionnelle est portée à 5 ans sur l'ensemble de la carrière pour les agents en situation de handicap.
Période d'Immersion Professionnelle
    •  Aides Spécifiques : Lorsque le bénéficiaire de la période d'immersion professionnelle est un agent en situation de handicap, son employeur s'assure qu'il bénéficie des aides nécessaires au bon déroulement de cette période. Ces aides sont définies dans la convention tripartite.
Compte Personnel de Formation (CPF)
    •  Crédit d'Heures Supplémentaire : Les agents en situation de handicap bénéficient d'un crédit d'heures supplémentaire pour prévenir une situation d'inaptitude physique, dans la limite de 150 heures, complété par 300 heures au total.
Compte d'Engagement Citoyen (CEC)
    •  Activités Éligibles : Les agents en situation de handicap peuvent bénéficier de droits supplémentaires au titre du CEC pour les activités bénévoles ou de volontariat de la vie ;
Glossaire
     •   CACES : certificat d'aptitude à la conduite d'engins en sécurité
     •   CAP : commission administrative paritaire
     •   FIMO : formation initiale minimale obligatoire
     •   HACCP : hazard analysis critical control point : analyse des dangers et
         maîtrise des points critiques
     •   VAE : validation des acquis de l'expérience`.trim(),vm=`
PROTOCOLE TÉLÉTRAVAIL
Mairie de Gennevilliers

PREAMBULE :
Le télétravail désigne « toute forme d'organisation du travail dans laquelle les fonctions qui auraient pu
être exercées par un agent dans les locaux de son employeur sont réalisées hors de ces locaux de
façon régulière et volontaire en utilisant les technologies de l'information et de la communication.
Télétravail est organisé au domicile de l'agent ou, éventuellement, dans les locaux professionnels
distincts de ceux de son employeur public ou de son lieu d'affectation ».
La ville de Gennevilliers souhaite assurer au maximum le bien être des agents communaux au travail
et adopter des mesures permettant une meilleure conciliation entre vie personnelle et vie
professionnelle.
La réflexion ne s'inscrit pas, contrairement à de nombreuses autres structures privées ou publiques,
dans un objectif de réduction des postes de travail (nombre de bureaux, d'ordinateurs…) au sein de la
collectivité.
Le télétravail est aujourd'hui un des moyens privilégiés pour améliorer les conditions de travail des
agents.
La question du temps de trajet domicile-travail est également pleinement prise en compte par les
candidats lorsqu'ils postulent et constitue un levier d'attractivité de l'employeur.
Le télétravail prévu à l'article L1222-9 du code du travail est encadré au sein de la fonction publique
par la loi n°2012-347 du 12 mars 2012 relative à l'accès à l'emploi titulaire et à l'amélioration des
conditions d'emploi des agents contractuels dans la fonction publique, à la lutte contre les discrimination
et portant diverses dispositions relatives à la fonction publique ; et le décret n°2016151 du 11 février
2016 qui précise les conditions et modalités de mise en œuvre du télétravail dans la fonction publique
et la magistrature. Plus récemment, l'accord cadre de la mise en place du télétravail dans les trois
volets de la fonction publique pousse la collectivité à délibérer.
Pour rappel, le télétravail est un mode de travail qui ne déroge en aucune façon aux règles de droits et
obligations du travail.

POURQUOI METTRE EN PLACE LE TELETRAVAIL ?
CONCILIER VIE PRIVEE ET PROFESSIONNELLE :
Le temps de déplacement entre le domicile et le lieu de travail s'ajoute au temps de travail. Il n'est pas
considéré comme un temps de travail effectif.
Agir sur le temps consacré au trajet domicile-travail est un moyen d'agir sur la fatigue et le stress
engendré par les transports. C'est un levier de bien-être au travail.

CONTINUER A PROMOUVOIR LE MANAGEMENT PAR LA CONFIANCE :
Le télétravail implique un management plus participatif, centré sur l'autonomie, la responsabilisation et
l'atteinte d'objectifs définis en même temps que les moyens pour les mettre en œuvre. Ce mode de
management est encouragé. La mise en place du télétravail constitue un outil managérial
supplémentaire. Le contrôle du travail effectué par l'agent en télétravail s'inscrira en cohérence avec le
contrôle exercé sur site.
REDUIRE L'EMPREINTE ECOLOGIQUE.
En réduisant les trajets domiciles-travail, le télétravail permet de réduire les émissions de gaz à effet
de serre et ainsi participe à l'amélioration du bilan carbone de la collectivité.

L'AMELIORATION DES CONDITIONS DE TRAVAIL
Moins sollicité en direct, dans un espace familier et au calme, le télétravailleur peut plus facilement
réaliser certaines tâches, notamment celles qui exigent de la concentration. Le télétravailleur a une
plus grande latitude pour gérer son temps et organiser ses tâches tout en restant dans son cadre
horaire habituel.

LE TELETRAVAIL A LA VILLE DE GENNEVILLIERS
REPOSE SUR LES PRINCIPES SUIVANTS :

Le strict volontariat de l'agent et soumis à l'accord de son responsable hiérarchique. Toutefois le
télétravail doit aussi, de façon exceptionnelle, pouvoir être mis en œuvre à la demande de la collectivité,
en cas de circonstances exceptionnelles et afin d'assurer tant la continuité du service public que la
protection des agents, et le cas échéant dans le cadre des plans de continuité de l'activité.

La réversibilité : le télétravail est une co-responsabilité entre l'agent qui sollicite le télétravail et le
responsable hiérarchique qui évalue le degré d'autonomie de l'agent. Il peut à tout moment être
interrompu si, par exemple, le télétravailleur est sujet au stress de devoir organiser seul sa journée de
travail. Le décret du 11 février 2016 prévoit que lorsque l'administration ou un agent décide de mettre
fin à une autorisation de télétravail, un délai de prévenance doit être respecté. Ce délai est d'un mois
pendant la période d'adaptation prévue par l'autorisation de télétravail et de deux mois au-delà de cette
période. Lorsque l'interruption du télétravail est à l'initiative de l'administration, ce délai peut être réduit
en cas de nécessité du service dûment motivée, avec un entretien préalable.

La nécessité de préserver le lien social au sein des services : le télétravail doit être limité dans le temps
pour ne pas altérer le lien social inhérent à la vie professionnelle. Le télétravail sera limité à 1 jour fixe
par semaine accompagné d'un forfait annuel de 15 jours dans la limite de 3 jours maximum par mois.
De plus chaque service devra déterminer une journée par semaine non télétravaillable pour permettre
la mise en place de réunion de service et garantir le lien social, et la présence de l'agent sur site est
obligatoire 3 jours par semaine.

Le droit à la déconnexion : le respect de la séparation entre la vie privée et la vie professionnelle est
une priorité et ne saurait en aucun cas être remis en question par la mise en place du télétravail. Comme
pour le travail sur site, le fait d'être joignable n'implique pas pour autant l'obligation d'apporter une
réponse immédiate à toute sollicitation. En dehors des plages horaires de travail habituelles, le
télétravailleur n'est pas censé être connecté, aussi aucune réponse immédiate ne peut être attendue.

En faisant acte de candidature, l'agent déclare disposer des conditions suffisantes pour travailler dans
un cadre adéquat tant sur le plan du respect des normes de sécurité qu'en matière d'ergonomie et
d'aménagement de l'espace de travail. Le médecin de prévention et le responsable du service DSCT
sont des interlocuteurs de premier plan, avec lesquels l'agent ou la hiérarchie peuvent échanger. Ils
peuvent par exemple organiser une visite sur le lieu d'exercice des fonctions en télétravail. Dans le cas
où l'agent exerce ses fonctions en télétravail à son domicile, l'accès au domicile du télétravailleur est
évidemment subordonné à l'accord de l'intéressé, dûment recueilli par écrit.

L'absence de différence de traitement entre les collaborateurs travaillant sur site et les télétravailleurs
notamment en matière de répartition des tâches, des missions et d'évaluation professionnelle.

Le télétravail à la ville de Gennevilliers n'a pas vocation à générer d'économies. Il ne saurait aboutir à
la réduction des postes de travail sur site ni à la réduction des effectifs. La collectivité s'engage à mettre
à disposition les moyens informatiques nécessaires à la mise en œuvre du télétravail.

L'égalité de traitement entre les catégories : Le télétravail est ouvert à tout agent dont les fonctions sont
compatibles avec le télétravail, peu importe son appartenance à la catégorie A, B ou C et peu importe
son statut de cadre. Il est possible que certaines activités exercées par un agent soient incompatibles
avec le télétravail. Lorsque certaines activités exercées par un agent qui souhaite télétravailler sont
incompatibles avec le travail à distance, le responsable hiérarchique étudiera comment organiser les
activités et tâches de l'agent afin de permettre le télétravail.
Le télétravail ne peut être déployé auprès de tous les métiers. En sont exclus :
o Les métiers en contact présentiel quotidien et quasi-exclusif avec les usagers, par exemple les
animateurs, le personnel des crèches, agents travaillants dans les écoles, etc…
o Les métiers exercés sur la voie publique.
o Les métiers supportant des contraintes organisationnelles, techniques ou de sécurité
particulière.
o Les activités portant sur des documents papiers confidentiels qui ne peuvent être ni numérisés
ni chiffrés ou qui ne peuvent être transportés sans risque de compromettre leur confidentialité.
Le télétravail est ouvert aux agents quel que soit leur statut (titulaires et contractuels).

1 – PROCEDURE DE DEMANDE DE TELETRAVAIL
L'exercice des fonctions en télétravail est accordé sur demande écrite de l'agent (Annexe n°1). Celleci précise les modalités d'organisation souhaitées, notamment le jour de la semaine travaillé sous cette
forme ainsi que le ou les lieux d'exercice. Si l'agent ne souhaite pas réaliser son télétravail dans son
lieu habituel de télétravail (adresse déclarée), il devra en informer la collectivité.
La demande doit être transmise pour échange et validation au responsable hiérarchique.
Le télétravail pourra se mettre en place, après validation et une fois les dispositions matérielles
opérationnelles.
Le responsable hiérarchique apprécie la compatibilité de la demande avec la nature des activités
exercées, les nécessités de service et les capacités de travail en autonomie de l'agent à l'origine de la
demande.
Toute autorisation ou refus doit faire l'objet d'un entretien préalable entre l'agent et le responsable
hiérarchique.
En cas d'autorisation, l'entretien préalable devra permettre d'échanger autour des grilles d'autoévaluation remplies préalablement par chacune des parties, sur les conditions matérielles d'exercice
du télétravail et sur les horaires de télétravail. (L'autorisation se matérialise par le formulaire en pièce
jointe complété et co-signé).
En cas de refus, le responsable hiérarchique devra, au cours de cet entretien, exposer les motifs de
son refus et les matérialiser par écrit. Avant d'émettre un avis négatif, le N+1 devra avoir échangé
obligatoirement en amont avec son N+1, c'est à dire le N+2 de l'agent. Les avis négatifs devront être
motivés par les critères suivants : l'aptitude de l'agent (autonomie, initiative, rigueur, organisation,
capacité à travailler seul et à gérer son temps), l'adéquation de la fonction et des activités avec le
télétravail tel que décrite dans le protocole, impossibilité de dégager des activités susceptibles d'être
exercées en télétravail.
En cas de refus motivé par le supérieur hiérarchique, l'agent pourra saisir la CAP ou la CCP pour
réexaminer sa demande. Suite à l'avis de la CAP ou de la CCP, la collectivité reste libre de sa décision.
Pour les agents qui ont une autorisation de télétravail, l'articulation des jours forfait se fait sur validation
hiérarchique 5 jours à l'avance, dans la limite de 3 jours par mois.

2 – DUREE DU TELETRAVAIL
L'exercice des fonctions en télétravail peut être autorisé de manière régulière à raison de 4 jours fixes
par mois dans la limite de 1 jour par semaine, et d'un forfait annuel de 15 jours soit 3 jours maximum
par mois.
Dans tous les cas, la durée de l'autorisation ne saurait excéder un an. Les agents qui souhaitent
continuer à télétravailler doivent renouveler leur demande pour validation auprès de leur responsable
hiérarchique (Annexe 1).
En cas de changement de fonctions, l'agent intéressé doit présenter une nouvelle demande.
Il peut être mis fin à cette forme d'organisation du travail par écrit, à tout moment, à l'initiative de
l'administration ou de l'agent, moyennant un délai de prévenance de quinze jours.
Le non-renouvellement ou l'interruption du télétravail pourra notamment se justifier par l'irrespect des
règles de fonctionnement définies avec le N+1, la mauvaise maîtrise des activités réalisées en
télétravail ou encore par le fait que les modalités de travail se sont avérées inadaptées au télétravail.
Par ailleurs, une demande de télétravail exceptionnelle peut être demandée dans un délai de 24h dans
les cas de difficultés à se rendre sur le lieu de travail (difficulté de transport, intempéries) sous réserve
d'un accord hiérarchique et d'un effectif suffisant sur site.
En cas d'absence quel qu'en soit le motif ou de jour férié ou de fermeture de service coïncidant avec
une journée habituellement télétravaillée, l'agent ne pourra exiger le report du jour de télétravail.

3 – SUSPENSION DU TELETRAVAIL
L'agent peut être confronté à des obligations qui sont de nature à empêcher de manière temporaire la
réalisation de ses missions depuis son domicile.
De même, des circonstances tenant à des impératifs opérationnels de service peuvent conduire à
requérir la présence de l'agent sur son lieu de travail habituel.
Dans ce cas, l'agent en télétravail ou l'administration informe de la suspension temporaire de la
situation de télétravail au moins 24h avant la date de mise en œuvre de la suspension.
L'agent ne pourra exiger le report du jour fixe de télétravail.
En cas de non-utilisation du forfait jours, le report n'est pas possible.

4 –QUOTITE DE TELETRAVAIL
A Gennevilliers, le télétravail ne peut excéder 2 jours par semaine en tenant compte d'1 jour fixe par
semaine et de l'utilisation du forfait annuel de 15 jours dans la limite de 3 jours maximum par mois. Le
temps de présence sur le lieu d'affectation ne peut être inférieur à 3 jours par semaine, sauf, à leur
demande, pour les agents dont l'état de santé le justifie, après avis du médecin de travail.
En effet, conformément à l'article 4 du Décret n° 2016-151 du 11 février 2016, à la demande des agents
dont l'état de santé le justifie et après avis du médecin du travail, il peut être dérogé pour six mois
maximum aux conditions fixées ci-dessus. Cette dérogation est renouvelable une fois après avis du
médecin du travail.
Pour les agents soumis à un planning de travail hebdomadaire, le jour de télétravail devra être fixe et
planifié dans celui-ci. Pour les agents non soumis à un planning strict, le jour télétravaillé pourra être
mouvant dans la semaine de travail.
L'agent qui pose un congé de 1 jour ou qui a une formation de 1 jour pourra télétravailler 2 jours par
semaine sous réserve des effectifs suffisants sur site.
Le télétravail n'est pas autorisé pour une demie journée.
Le télétravail ne peut être appliqué pour garder ses enfants ou pour couvrir une maladie ordinaire.
Pour les agents à temps partiel 80% ou 90%, les modalités sont les mêmes.

En revanche, pour les agents à temps partiel en dessous de 80%, le forfait de jours sera proratisé en
fonction de son temps de travail.
Au bout d'un an de mise en place du télétravail, une évaluation a permis de faire évoluer la quotité de
télétravail, et le présent protocole.

5 – OUTIL DU TELETRAVAIL
L'ouverture au télétravail devra se faire dans des conditions techniques, organisationnelles et de
sécurité qui garantissent la qualité du travail.
L'agent en télétravail doit disposer d'une ligne internet haut débit sur son lieu d'exercice du télétravail,
condition indispensable à la réalisation du télétravail.
Aussi, l'autorisation de télétravailler est conditionnée par la disponibilité des technologies de
l'information et de communication mises à disposition par la collectivité. L'utilisation de ce matériel est
strictement limitée à l'exercice de la seule activité professionnelle.
L'agent qui se verra confier du matériel informatique s'engage à en faire un usage conforme à sa
destination dans les conditions d'emploi normales, à en prendre soin et à en avoir l'usage exclusif.
L'agent qui manifesterait de sa propre initiative, le souhait de télétravailler en utilisant son propre
matériel informatique, verra sa demande étudiée au regard de la compatibilité technique du matériel et
des applications.
En cas de dysfonctionnement des équipements, les agents doivent informer sans délai leur hiérarchie
et le service informatique afin de déterminer les procédures à suivre. Si les perturbations constatées
ne permettent plus l'exercice du télétravail, le responsable hiérarchique peut exiger que le travail
attendu soit effectué en présentiel. La durée du déplacement est alors décomptée comme du temps de
travail. Le télétravailleur ne peut pas se voir imposer des congés durant une période d'indisponibilité
pour cause de problèmes techniques imputables à la collectivité.
Outre le matériel technologique, chaque agent se verra doté à sa première demande d'un Kit
ergonomique. Celui sera composé d'un support dorsal adaptable, d'un tapis de souris et d'un support
pour PC portable. Ce kit devra également être restitué à la fin de l'exercice du télétravail.

6 – LIEU DU TELETRAVAIL
Le télétravail peut s'exercer au domicile et/ou autre domicile (sous réserve d'un accord hiérarchique, à
l'exception des agents tenus par une astreinte), ou dans un autre espace de travail.
Le domicile s'entend comme le lieu de résidence principale de l'agent tel que déclaré à la DRH. Ce lieu
sera précisé dans le formulaire d'autorisation du télétravail.
L'agent s'engage à informer son responsable hiérarchique de tout changement d'adresse d'exercice
de télétravail.
Le télétravailleur a également la liberté de proposer comme adresse de télétravail un espace de travail
public gratuit dès lors que cet espace garantit une certaine confidentialité (bibliothèque, espace public
numérique, etc.)

7– RYTHME DE TELETRAVAIL
Le responsable hiérarchique veille au respect de la réglementation du temps de travail telle que définie
par les textes en vigueur : durée maximale de travail quotidien et hebdomadaire, durée minimale de
repos quotidien et hebdomadaire. La durée de travail est la même que celle des agents travaillant sur
site dans le service concerné et en application des horaires habituelles de l'agent (mêmes plages fixes
de disponibilité).
Le télétravail n'a pas vocation à générer des heures supplémentaires.

Le télétravail ne doit pas s'accompagner d'une flexibilité accrue et d'une dégradation des conditions de
travail : le principe d'égalité de traitement entre les agents doit s'appliquer s'agissant de la charge de
travail et des délais d'exécution. La charge de travail des agents exerçant leurs fonctions en télétravail
doit ainsi être équivalente à celle des agents en situation comparable travaillant sur site.
Comme pour le travail sur site, le fait d'être joignable n'implique pas pour autant l'obligation d'apporter
une réponse immédiate à toute sollicitation. Par ailleurs, l'agent en télétravail ne saurait exiger une
réponse immédiate à ses sollicitations. En dehors des plages horaires définies, le télétravailleur n'est
pas censé être connecté, aussi aucune réponse immédiate ne peut être attendue, par exemple, à un
courriel durant la pause méridienne, ou le soir en dehors des plages horaires définies, le week-end ou
pendant les congés.

8 – PRISE EN CHARGE DES COUTS DU TELETRAVAIL.
Par principe le télétravail ne saurait être un argumentaire de négociation salariale.
Les agents qui exercent leurs fonctions en télétravail ne bénéficient d'aucune prise en charge ou
indemnisation liée à des éventuels coûts ou frais engagés.
La collectivité ne saurait supporter les frais inhérents à d'éventuelles mises en conformité des
installations électriques, abonnements internet ou tout autre frais en lien avec le télétravail.
Par ailleurs, les frais de transports pris en charges par la ville dans le cadre du télétravail correspondent
à 50% du prix de leurs titres d'abonnement correspondant aux déplacements effectués entre leur
domicile et leur lieu de travail habituel au moyen de transports publics de voyageurs. Le remboursement
des frais de transport ne sera pas diminué en fonction du nombre de jour en télétravail et la collectivité
ne prendra pas en charge des frais de transport pour un lieu de travail différent du domicile.
9- LA PRISE EN COMPTE DES AGENTS EN SITUATIONS PARTICULIERES .
Le télétravail était déjà identifié avant la crise comme un levier possible du maintien en emploi de
certaines catégories d'agents (voir en ce sens la modification apportée au décret télétravail en 2019
pour les agents en situation de handicap). De manière plus générale, le télétravail est un outil
supplémentaire pour intégrer et maintenir au travail les agents qui en sont le plus éloignés, quelle qu'en
soit la raison.
S'agissant des femmes enceintes, l'article 4 du décret de 2016 prévoit déjà qu'il peut être dérogé à la
règle des trois jours de télétravail maximum, à la demande des agentes. Les signataires de l'accord
conviennent que l'autorisation pourra être donnée sans avis préalable du médecin du travail.
S'agissant des proches aidants au sens de l'article L. 3142-16 du code du travail, les signataires
reconnaissent que le télétravail peut constituer une mesure de prévention primaire, qu'il est de nature
à favoriser le maintien en emploi et qu'il permet également à l'employeur de garantir plus facilement la
continuité du service public dont il a la charge.
C'est pourquoi, à la demande de l'agent concerné, et sous réserve que ses activités soient
télétravaillables, l'employeur peut autoriser un proche aidant à bénéficier du télétravail au-delà des trois
jours hebdomadaires fixés par le décret du 11 février 2016. Cette autorisation a une durée de trois
mois, renouvelable.

10. LE TELETRAVAIL EN CAS DE CIRCONSTANCES EXCEPTIONNELLES.
Le cadre réglementaire fonde le recours au télétravail sur une demande volontaire de l'agent et l'accord
de sa hiérarchie.
Toutefois, il est nécessaire de sécuriser et mieux encadrer le recours au télétravail contraint en cas de
circonstances exceptionnelles. Il s'agit d'une organisation différente du travail rendue nécessaire en
cas de circonstances exceptionnelles durables, notamment en cas de pandémie ou de catastrophe

naturelle, qui peuvent conduire la collectivité à imposer le télétravail pour permettre de concilier la
protection des agents et la continuité du service public.
Ces modalités exceptionnelles doivent également être intégrées aux plans de continuité d'activité.

Le conseil municipal du 31 mai 2023 a délibéré l'évolution des modalités d'application du télétravail.
A compter du 01 juin 2023, le télétravail évolue à raison d'un jour fixe par semaine accompagné d'un forfait annuel de 15 jours dans la limite de 3 jours maximum par mois. La présence de l'agent sur site est obligatoire 3 jours par semaine.
L'articulation des jours forfait se fait sur validation hiérarchique 5 jours à l'avance. Pour les agents à temps partiel, le forfait annuel de 15 jours sera proratisé en fonction du temps de travail des agents en dessous de 80%.
En cas de non utilisation du forfait, le report de ces jours n'est pas possible.
Il est important de rappeler que le temps de travail est le même que sur site, avec les mêmes plages fixes de présence obligatoire.
En cas d'absence quel qu'en soit le motif ou de jour férié ou de fermeture de service coïncidant avec une journée habituellement télétravaillée, le report du jour de télétravail n'est pas autorisé.
Le protocole Télétravail sera disponible sur intranet dans la rubrique "la vie de l'agent/ télétravail" dès le 01 juin 2023.
`;function gm(){const e=[`=== SOMMAIRE DES DOCUMENTS INTERNES ===
`];return e.push("📋 TEMPS DE TRAVAIL (temps.ts):"),es.temps.forEach(t=>{e.push(`  - [${t.id}] ${t.titre}`),e.push(`    Mots-clés: ${t.motsCles.join(", ")}`)}),e.push(""),e.push("📚 FORMATION (formation.ts):"),es.formation.forEach(t=>{e.push(`  - [${t.id}] ${t.titre}`),e.push(`    Mots-clés: ${t.motsCles.join(", ")}`)}),e.push(""),e.push("🏠 TÉLÉTRAVAIL (teletravail.ts):"),es.teletravail.forEach(t=>{e.push(`  - [${t.id}] ${t.titre}`),e.push(`    Mots-clés: ${t.motsCles.join(", ")}`)}),e.join(`
`)}async function hm(e){const r=[{role:"system",content:`Tu es un assistant expert pour localiser l'information dans les documents RH de la mairie de Gennevilliers.

MISSION : Identifier la ou les sections qui contiennent la réponse à la question.

SOMMAIRE DES DOCUMENTS :
${gm()}

RÈGLES STRICTES :
1. Tu DOIS toujours trouver au moins une section pertinente
2. Réponds UNIQUEMENT avec les IDs entre crochets, exemple: [temps_ch2_conges_annuels]
3. Maximum 3 sections, classées par pertinence
4. Si la question porte sur les congés/vacances → section temps_ch2_*
5. Si la question porte sur le télétravail → section teletravail_*
6. Si la question porte sur la formation/CPF/VAE → section formation_*
7. Si la question porte sur la maladie/arrêt → section temps_ch4_*
8. Si la question porte sur le mariage/décès/absence → section temps_ch3_*
9. Si la question porte sur les heures/RTT/temps partiel → section temps_ch1_* ou temps_ch2_*
10. NE JAMAIS répondre [AUCUNE] - il y a toujours une section applicable`},{role:"user",content:`Question de l'agent: "${e}"

Quelles sections contiennent cette information ? Réponds avec les IDs.`}];try{const i=await Ha(r,!0);console.log("[UnifiedSearch] Réponse API localisation:",i);const a=(i.match(/\[([a-z_0-9]+)\]/gi)||[]).map(l=>l.replace(/[\[\]]/g,"")).filter(l=>an.some(u=>u.id===l));return console.log("[UnifiedSearch] Sections extraites:",a),a}catch(i){return console.error("Erreur localisation sections:",i),[]}}function xm(e){const t=an.find(n=>n.id===e);if(!t)return null;switch(t.source){case"temps":{const n=t.chapitre;return n&&n>=1&&n<=4?rl[n]:Object.values(rl).join(`

---

`)}case"formation":return fm;case"teletravail":return vm;default:return null}}function ym(e){if(e.length===0)return"";const t=[],n=new Set;for(const r of e){const i=an.find(l=>l.id===r);if(!i)continue;const s=i.source==="temps"?`temps_ch${i.chapitre}`:i.source;if(n.has(s))continue;n.add(s);const a=xm(r);if(a){const l=i.titre||r;t.push(`=== ${l.toUpperCase()} ===
${a}`)}}return t.join(`

---

`)}async function jm(e,t,n){const i=[{role:"system",content:mm(t)}];return n&&Array.isArray(n)&&i.push(...n),i.push({role:"user",content:e}),await Ha(i,!0)}async function Ed(e,t){console.log("[UnifiedSearch] Étape 1: Localisation des sections...");const n=await hm(e);if(console.log("[UnifiedSearch] Sections identifiées:",n),n.length===0)return{answer:"Je ne trouve pas cette information dans nos documents internes.",sectionsUsed:[],tokensOptimized:!0};console.log("[UnifiedSearch] Étape 2: Chargement du contenu ciblé...");const r=ym(n);return r?(console.log("[UnifiedSearch] Génération de la réponse..."),{answer:await jm(e,r,t),sectionsUsed:n,tokensOptimized:!0}):{answer:"Je ne trouve pas cette information dans nos documents internes.",sectionsUsed:n,tokensOptimized:!0}}async function Em(e,t){return(await Ed(e,t)).answer}async function wm(e,t){const n=await Ed(e,t),r=n.answer.match(/(\d{1,3})/),i=r?parseInt(r[1],10):null;return{text:n.answer,number:i,sectionsUsed:n.sectionsUsed}}const Sm=!1;Sm||(console.log=(...e)=>{},console.debug=(...e)=>{});const Nm="https://www.franceinfo.fr/politique.rss",Lm="https://api.allorigins.win/raw?url=",il=Lm+encodeURIComponent(Nm),Cm=[{title:"Réforme des retraites : nouvelles négociations prévues",link:"#",pubDate:new Date().toISOString(),guid:"1"},{title:"Budget 2024 : les principales mesures votées",link:"#",pubDate:new Date().toISOString(),guid:"2"},{title:"Fonction publique : accord sur les salaires",link:"#",pubDate:new Date().toISOString(),guid:"3"},{title:"Télétravail : nouvelles directives gouvernementales",link:"#",pubDate:new Date().toISOString(),guid:"4"},{title:"Dialogue social : rencontre avec les syndicats",link:"#",pubDate:new Date().toISOString(),guid:"5"}];JSON.parse(um);JSON.parse(pm);const Tm=e=>{if(!e)return!1;const t=e.toLowerCase(),n=/forfait/.test(t),r=/combien|nombre|jours|ai droit|droit|donn?e?s?|quotité/.test(t);return n&&r},bm=()=>{const[e,t]=_.useState(Cm),[n,r]=_.useState(!0),i=s=>`https://api.allorigins.win/raw?url=${encodeURIComponent(s)}`;return _.useEffect(()=>{(async()=>{try{console.log("🔄 Tentative de chargement du flux RSS:",il);const a=await fetch(il);if(!a.ok)throw console.error("❌ Erreur HTTP:",a.status,a.statusText),new Error(`HTTP ${a.status}: ${a.statusText}`);const l=await a.text();console.log("✅ RSS reçu, taille:",l.length,"caractères");const u=new DOMParser().parseFromString(l,"text/xml"),p=u.querySelector("parsererror");if(p)throw console.error("❌ Erreur de parsing XML:",p.textContent),new Error("Erreur de parsing XML");const g=Array.from(u.querySelectorAll("item")).slice(0,10).map((v,f)=>{var w,M,c,d;const E=(((w=v.querySelector("link"))==null?void 0:w.textContent)||"").replace(/\s+/g," ").trim();return{title:(((M=v.querySelector("title"))==null?void 0:M.textContent)||`Actualité ${f+1}`).trim(),link:E,pubDate:(((c=v.querySelector("pubDate"))==null?void 0:c.textContent)||new Date().toISOString()).trim(),guid:(((d=v.querySelector("guid"))==null?void 0:d.textContent)||`${f}`).trim()}});console.log("📰 Articles trouvés:",g.length),g.length?(t(g),console.log("✅ Flux RSS chargé avec succès")):console.warn("⚠️ Aucun article trouvé dans le flux RSS")}catch(a){console.error("❌ Échec du chargement du flux RSS:",a),console.log("🔄 Utilisation des données de secours")}finally{r(!1)}})()},[]),n?o.jsxs("div",{className:"flex items-center justify-center p-4 bg-blue-900/80 rounded-lg",children:[o.jsx("div",{className:"animate-spin rounded-full h-5 w-5 border-b-2 border-white"}),o.jsx("span",{className:"ml-2 text-white text-base font-medium",children:"Chargement des actualités..."})]}):o.jsxs("div",{className:"w-full backdrop-blur-xl bg-white/10 rounded-2xl overflow-hidden border border-white/20 shadow-2xl",children:[o.jsx("div",{className:"flex items-center whitespace-nowrap py-8 ticker-container",children:o.jsx("div",{className:"flex animate-ticker hover:[animation-play-state:paused]",children:[...e,...e].map((s,a)=>o.jsxs("a",{href:i(s.link),target:"_blank",rel:"noopener noreferrer",className:"group flex items-center mx-12 text-white/90 hover:text-white transition-all duration-300 no-underline",children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity"}),o.jsx("div",{className:"relative w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg",children:o.jsx("span",{className:"text-white text-sm",children:"📰"})})]}),o.jsx("span",{className:"ml-4 font-semibold text-lg group-hover:text-blue-200 transition-colors",children:s.title}),o.jsx("div",{className:"mx-8 w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors"})]},`${s.guid}-${a}`))})}),o.jsx("style",{dangerouslySetInnerHTML:{__html:`
          @keyframes ticker {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .ticker-container { overflow: hidden; white-space: nowrap; }
          .animate-ticker { display: inline-flex; animation: ticker 45s linear infinite; }
        `}})]})},Am=({onReturn:e})=>{const[t,n]=_.useState(""),[r,i]=_.useState(null),s=cm.filter(a=>a.question.toLowerCase().includes(t.toLowerCase())||a.reponse.toLowerCase().includes(t.toLowerCase()));return o.jsxs("div",{className:"backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden",children:[o.jsx("div",{className:"bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-8",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center gap-6",children:[o.jsx("button",{onClick:e,className:"text-white hover:text-orange-200 p-3 rounded-full hover:bg-white/10 transition-all duration-200 group",children:o.jsx(xd,{className:"w-6 h-6 group-hover:-translate-x-1 transition-transform"})}),o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-50"}),o.jsx("div",{className:"relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center",children:o.jsx(Gs,{className:"w-6 h-6 text-white"})})]}),o.jsxs("div",{children:[o.jsx("h3",{className:"text-2xl font-bold text-white",children:"FAQ - Questions fréquentes"}),o.jsx("p",{className:"text-orange-100 text-sm mt-1",children:"Télétravail et Formation - Ville de Gennevilliers"})]})]})]}),o.jsxs("div",{className:"text-right",children:[o.jsx("div",{className:"text-white/90 text-sm font-medium",children:"CFDT Gennevilliers"}),o.jsx("div",{className:"text-orange-200 text-xs",children:"Support syndical"})]})]})}),o.jsxs("div",{className:"p-8 bg-gradient-to-b from-white/5 to-white/10",children:[o.jsx("div",{className:"mb-8",children:o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg"}),o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none",children:o.jsx(yd,{className:"w-5 h-5 text-white/60"})}),o.jsx("input",{type:"text",placeholder:"Rechercher une question ou réponse...",value:t,onChange:a=>n(a.target.value),className:"w-full pl-12 pr-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all"})]})]})}),r&&o.jsxs("div",{className:"mb-8 relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-500/10"}),o.jsxs("div",{className:"relative p-8",children:[o.jsxs("div",{className:"flex items-start justify-between mb-6",children:[o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("div",{className:"w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg",children:r.id}),o.jsx("div",{children:o.jsx("h4",{className:"text-xl font-bold text-white mb-2",children:r.question})})]}),o.jsx("button",{onClick:()=>i(null),className:"w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200 text-white hover:text-red-300",children:o.jsx(jd,{className:"w-6 h-6"})})]}),o.jsx("div",{className:"bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20",children:o.jsx("p",{className:"text-white/90 leading-relaxed",children:r.reponse})})]})]}),o.jsxs("div",{className:"space-y-4 max-h-[60vh] overflow-y-auto",children:[s.map(a=>o.jsxs("div",{className:"group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl hover:bg-white/15 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-1",onClick:()=>i(a),children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"}),o.jsx("div",{className:"relative p-6",children:o.jsxs("div",{className:"flex items-start gap-4",children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity"}),o.jsx("div",{className:"relative w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg",children:a.id})]}),o.jsxs("div",{className:"flex-1",children:[o.jsx("h4",{className:"font-semibold text-white mb-2 group-hover:text-orange-200 transition-colors duration-300",children:a.question}),o.jsxs("p",{className:"text-sm text-white/70 truncate",children:[a.reponse.substring(0,120),"..."]}),o.jsxs("div",{className:"flex items-center gap-2 mt-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:[o.jsx("span",{className:"text-xs text-orange-300 font-medium",children:"Cliquez pour voir la réponse"}),o.jsx(An,{className:"w-4 h-4 text-orange-300"})]})]})]})})]},a.id)),s.length===0&&o.jsxs("div",{className:"text-center py-12",children:[o.jsxs("div",{className:"relative inline-block mb-6",children:[o.jsx("div",{className:"absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur-xl opacity-30"}),o.jsx("div",{className:"relative w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-2xl",children:o.jsx(Gs,{className:"w-8 h-8 text-white"})})]}),o.jsxs("p",{className:"text-white/70 text-lg",children:['Aucune question trouvée pour "',t,'"']}),o.jsx("p",{className:"text-white/50 text-sm mt-2",children:"Essayez avec d'autres mots-clés"})]})]})]})]})},Rm=()=>{const[e,t]=_.useState(null),[n,r]=_.useState(!1),[i,s]=_.useState(0),[a,l]=_.useState(0),[u,p]=_.useState(1),[g,v]=_.useState(!0),[f,y]=_.useState(null),E=_.useRef(null);_.useEffect(()=>{const d=E.current;if(!d)return;r(!1),s(0),l(0),y(null);const A={timeupdate:()=>s(d.currentTime||0),loadedmetadata:()=>{d.duration&&isFinite(d.duration)&&l(d.duration)},canplay:()=>{},ended:()=>{r(!1);const b=Cr.findIndex(F=>F.id===(e==null?void 0:e.id));b!==-1&&b<Cr.length-1&&t(Cr[b+1])},error:()=>{r(!1),y("Impossible de charger ce podcast. Vérifiez votre connexion.")},loadstart:()=>{},waiting:()=>{},playing:()=>{r(!0)},pause:()=>r(!1)};return Object.entries(A).forEach(([b,F])=>d.addEventListener(b,F)),d.volume=u,e&&d.load(),()=>{Object.entries(A).forEach(([b,F])=>d.removeEventListener(b,F))}},[e,u]);const w=async()=>{const d=E.current;if(!(!d||!e))try{n?d.pause():(y(null),await d.play())}catch(m){console.error("Error playing audio:",m),y("Impossible de lire ce podcast."),r(!1)}},M=d=>{(e==null?void 0:e.id)!==d.id&&(t(d),r(!1))},c=d=>{if(!d||isNaN(d))return"0:00";const m=Math.floor(d/60),h=Math.floor(d%60).toString().padStart(2,"0");return`${m}:${h}`};return o.jsx("div",{className:`fixed right-4 bottom-20 z-50 transition-all duration-300 ${g?"w-48 h-14":"w-80 h-auto"}`,children:o.jsxs("div",{className:"flex flex-col bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 rounded-xl shadow-lg border border-purple-500/30 overflow-hidden p-2",children:[o.jsxs("div",{className:"flex items-center justify-between gap-2",children:[o.jsxs("div",{className:"flex items-center gap-2 min-w-0",children:[o.jsx("button",{onClick:()=>v(!g),className:"text-white p-1.5 hover:bg-white/10 rounded-full",children:g?"🔼":"🔽"}),o.jsx("img",{src:"./podcast.jpg",alt:"Podcast",className:"w-8 h-8 rounded-full shadow border border-white/20"}),o.jsx("div",{className:"text-white text-xs font-medium truncate max-w-[7.5rem]",children:(e==null?void 0:e.title)??"Podcast CFDT"})]}),e&&o.jsx("button",{onClick:w,className:"bg-purple-600 hover:bg-purple-700 text-white rounded-full p-2 shrink-0",children:n?o.jsx(rm,{className:"w-5 h-5"}):o.jsx(sm,{className:"w-5 h-5"})}),!g&&o.jsxs("div",{className:"flex-grow flex items-center gap-2",children:[o.jsx(lm,{className:"w-5 h-5 text-gray-300"}),o.jsx("input",{type:"range",min:"0",max:"1",step:"0.01",value:u,onChange:d=>p(parseFloat(d.target.value)),className:"w-full h-1 bg-purple-300 rounded slider appearance-none"})]})]}),o.jsx("audio",{ref:E,src:e==null?void 0:e.url,preload:"metadata",style:{display:"none"},crossOrigin:"anonymous"}),!g&&o.jsxs("div",{className:"mt-4",children:[o.jsxs("div",{className:"flex flex-col items-center mb-4",children:[o.jsx("img",{src:"./podcast.jpg",alt:"Illustration Podcast",className:"w-32 h-32 object-cover rounded-full shadow-md border-2 border-purple-400"}),o.jsx("h4",{className:"text-white font-bold text-center mt-2",children:"Épisodes disponibles"})]}),o.jsx("ul",{className:"max-h-48 overflow-y-auto",children:Cr.map(d=>o.jsx("li",{children:o.jsx("button",{onClick:()=>M(d),className:`block w-full text-left px-3 py-2 rounded-md text-sm text-white mb-1 transition-colors ${(e==null?void 0:e.id)===d.id?"bg-purple-700 font-semibold":"bg-purple-800/60 hover:bg-purple-700/80"}`,children:d.title})},d.id))}),e&&o.jsxs("div",{className:"mt-2 px-2 text-xs text-purple-200",children:[o.jsxs("p",{className:"truncate",children:["Lecture : ",e.title]}),o.jsx("div",{children:o.jsxs("span",{children:[c(i)," / ",c(a)]})}),f&&o.jsx("div",{className:"text-red-300 mt-1",children:f})]})]})]})})};function Pm(){const[e,t]=_.useState({currentView:"menu",selectedDomain:null,messages:[],isProcessing:!1}),[n,r]=_.useState(""),[i,s]=_.useState(null),[a,l]=_.useState(!1),[u,p]=_.useState(!1),[g,v]=_.useState(""),[f,y]=_.useState(""),E=_.useRef(null),w=_.useRef(null),M=_.useRef(null),c=_.useRef(null),d=_.useRef(null);_.useEffect(()=>{var S;(S=E.current)==null||S.scrollIntoView({behavior:"smooth"})},[e.messages]),_.useEffect(()=>{if(typeof window<"u"){const S=window.SpeechRecognition||window.webkitSpeechRecognition;if(console.log("SpeechRecognition disponible:",!!S),S){p(!0);const P=new S;P.continuous=!1,P.interimResults=!0,P.lang="fr-FR",P.onstart=()=>{console.log("Reconnaissance vocale démarrée"),l(!0)},P.onresult=q=>{console.log("Résultat de reconnaissance:",q);let B="",k="";for(let j=q.resultIndex;j<q.results.length;j++){const L=q.results[j][0].transcript;q.results[j].isFinal?B+=L:k+=L}B?(console.log("Texte final:",B),r(B),v(""),setTimeout(()=>{B&&B.trim()&&(console.log("🎤 ENVOI AUTOMATIQUE TEXTE FINAL:",B),console.log("🎤 État avant envoi:",{selectedDomain:e.selectedDomain,isProcessing:e.isProcessing,messagesCount:e.messages.length}),I(String(B)))},500),l(!1),c.current&&c.current.stop()):k&&(console.log("Texte intermédiaire:",k),v(k),r(k),d.current&&clearTimeout(d.current),d.current=setTimeout(()=>{k&&k.trim()&&(console.log("🎤 ENVOI AUTOMATIQUE APRÈS SILENCE:",k),console.log("🎤 État avant envoi:",{selectedDomain:e.selectedDomain,isProcessing:e.isProcessing,messagesCount:e.messages.length}),r(k),I(String(k)),l(!1),c.current&&c.current.stop())},3e3))},P.onerror=q=>{console.error("Erreur de reconnaissance vocale:",q.error,q.message),l(!1),alert(`Erreur de reconnaissance vocale: ${q.error}`)},P.onend=()=>{console.log("Reconnaissance vocale terminée"),l(!1),d.current&&(clearTimeout(d.current),d.current=null)},c.current=P}else console.log("Reconnaissance vocale non supportée"),p(!1)}},[]),_.useEffect(()=>()=>{d.current&&clearTimeout(d.current)},[]);const m=()=>{setTimeout(()=>{var S;(S=M.current)==null||S.scrollIntoView({behavior:"smooth",block:"start"})},100)},h=S=>{const P=S.toLowerCase(),q=["temps de travail","horaires","congés","artt","rtt","temps partiel","absences","heures supplémentaires","astreintes","travail de nuit","journée solidarité","plages fixes","plages souplesse","repos","pause","amplitude","quotité","congé annuel","congé bonifié","don de jours","cet","congés naissance","fractionnement","jours fériés","report","vacances","maladie","accident","arrêt","clm","cld","pénibilité","invalidité","déménagement","demenagement","autorisation absence","jour absence","absence autorisée"],B=["formation","cours","stage","apprentissage","compétences","qualification","cpf","vae","concours","examen professionnel","bilan de compétences","cnfpt","diplôme","certification","professionnalisation","intégration","perfectionnement","syndicale","hygiène","sécurité","caces","haccp","congé formation","disponibilité","études","recherches","immersion","transition professionnelle","reconnaissance expérience","illettrisme"],k=["télétravail","télétravailler","domicile","travail à distance","forfait","quotité","jours autorisés","indemnités","modalités","charte","volontariat","réversibilité","déconnexion","rythme","lieu","outils","matériel","informatique","sécurité","confidentialité","circonstances exceptionnelles","proche aidant","handicap","grossesse"],j=["primes","indemnités","rémunération","rifseep","isfe","régime indemnitaire","bonification","supplément","complément","prime spéciale","installation","travail de nuit","dimanche","jours fériés","astreinte","intervention","permanence","panier","chaussures","équipement","sujétions horaires","surveillance","cantines","études surveillées","gardiennage","responsabilité","ifce","outillage personnel","grand âge","revalorisation","médecins"],L={0:q.filter(V=>P.includes(V)).length,1:B.filter(V=>P.includes(V)).length,2:k.filter(V=>P.includes(V)).length,9:j.filter(V=>P.includes(V)).length};console.log("🔍 Scores de détection par domaine:",L),console.log("🔍 Question analysée:",P);let C=0,U=0;return Object.entries(L).forEach(([V,St])=>{St>U&&(U=St,C=parseInt(V))}),U===0?(console.log("⚠️ Aucun mot-clé spécifique trouvé, analyse des termes généraux..."),P.includes("salaire")||P.includes("paye")||P.includes("argent")?(console.log("💰 Orientation vers domaine PRIMES (9) - termes financiers détectés"),9):P.includes("apprendre")||P.includes("évoluer")||P.includes("carrière")?(console.log("🎓 Orientation vers domaine FORMATION (1) - termes d'évolution détectés"),1):P.includes("maison")||P.includes("chez moi")||P.includes("distance")?(console.log("🏠 Orientation vers domaine TÉLÉTRAVAIL (2) - termes de localisation détectés"),2):(console.log("📅 Orientation par défaut vers domaine TEMPS DE TRAVAIL (0)"),0)):(console.log(`✅ Domaine détecté: ${C} avec score: ${U}`),C)},N=async S=>{console.log("🚀 handleInternalDocSelection appelé avec:",S);let P=0;S&&(P=h(S),console.log(`Question: "${S}" -> Domaine détecté: ${P}`));const q={0:`Bonjour ! Je peux vous aider avec vos questions sur les horaires, congés, ARTT, temps partiel, heures supplémentaires, absences, etc.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,1:`Bonjour ! Je peux vous renseigner sur le CPF, les congés de formation, la VAE, les concours, les bilans de compétences, etc. Quelle est votre question ?

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,2:`Bonjour ! Je suis l'assistant spécialiste du télétravail. Posez-moi vos questions sur la charte, les jours autorisés, les indemnités, etc.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,9:`Bonjour ! Je suis l'assistant spécialiste du régime indemnitaire et des primes. Posez-moi vos questions sur le RIFSEEP, l'ISFE, les primes, indemnités, etc.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`},B=S?{type:"user",content:S,timestamp:new Date}:null;if(t({currentView:"chat",selectedDomain:P,messages:[{type:"assistant",content:q[P]??"Bonjour, comment puis-je vous aider ?",timestamp:new Date},...B?[B]:[]],isProcessing:!!S}),m(),S)try{console.log("🚀 TRAITEMENT AUTOMATIQUE de la question:",S),console.log("🚀 État du chat avant traitement:",{selectedDomain:e.selectedDomain,messagesCount:e.messages.length,isProcessing:e.isProcessing});const k=await F(S,P);console.log("🚀 Réponse reçue:",k.substring(0,200)+"...");const j={type:"assistant",content:k,timestamp:new Date};t(L=>({...L,messages:[...L.messages,j],isProcessing:!1}))}catch(k){console.error("Erreur lors du traitement de la question:",k);const j={type:"assistant",content:"Désolé, une erreur s'est produite lors du traitement de votre question. Veuillez réessayer.",timestamp:new Date};t(L=>({...L,messages:[...L.messages,j],isProcessing:!1}))}else setTimeout(()=>{var k;return(k=w.current)==null?void 0:k.focus()},150)},R=S=>{if(S===3){window.open("https://opendata.justice-administrative.fr/recherche","_blank");return}if(S===5){t(q=>({...q,currentView:"faq"}));return}t({currentView:"chat",selectedDomain:S,messages:[{type:"assistant",content:{0:`Bonjour ! Je peux vous aider avec vos questions sur les horaires, congés, ARTT, temps partiel, heures supplémentaires, absences, etc.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,1:`Bonjour ! Je peux vous renseigner sur le CPF, les congés de formation, la VAE, les concours, les bilans de compétences, etc. Quelle est votre question ?

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,2:`Bonjour ! Je suis l'assistant spécialiste du télétravail. Posez-moi vos questions sur la charte, les jours autorisés, les indemnités, etc.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,4:`Bonjour ! Je suis votre juriste IA spécialisé dans la fonction publique. Je réponds exclusivement en me référant au site de Légifrance et au Code général de la fonction publique avec citations précises des textes légaux.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,6:`Bonjour ! Voici les actualités — vous pouvez poser une question ou consulter le fil d'actualité.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,7:`Bonjour ! Je peux vous aider à retrouver un chapitre du sommaire, ou une documentation interne (CET, congés, télétravail...).

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,8:`Bonjour ! Espace dialogue social : je peux prendre note d'une demande ou vous orienter vers les contacts syndicaux.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`,9:`Bonjour ! Je suis l'assistant spécialiste du régime indemnitaire et des primes. Posez-moi vos questions sur le RIFSEEP, l'ISFE, les primes, indemnités, etc.

Si ta prochaine question n'est pas dans ce thème, reviens à l'accueil.`}[S]??"Bonjour, comment puis-je vous aider ?",timestamp:new Date}],isProcessing:!1}),m(),setTimeout(()=>{var q;return(q=w.current)==null?void 0:q.focus()},150)},A=()=>{t({currentView:"menu",selectedDomain:null,messages:[],isProcessing:!1}),r(""),s(null)},b=async(S,P=!1)=>{console.log("🔍 appelPerplexity appelé (wrapper) disableWebSearch=",P);try{return await Ha(S,P)}catch(q){throw console.error("❌ Erreur centralisée callPerplexityAPI:",q),q}},F=async(S,P)=>{const q=P!==void 0?P:e.selectedDomain;console.log("🔍 traiterQuestion appelé avec:",{question:S,selectedDomain:q,domainParam:P,questionLength:S.length,questionWords:S.split(" ").length,isListening:a,interimText:g,inputValue:n}),console.log("🔍 État complet du chat:",e);let B="";if(console.log(`📂 SÉLECTION DU CONTEXTE POUR DOMAINE ${q}:`),console.log("🔍 VÉRIFICATION DU DOMAINE:",{currentDomain:q,isDomain0:q===0,isDomain1:q===1,isDomain2:q===2,isDomain9:q===9,isInternalDoc:q===0||q===1||q===2||q===9}),q===0||q===1||q===2||q===9){console.log("🔒 UTILISATION DE LA RECHERCHE UNIFIÉE EN 2 ÉTAPES pour le domaine:",q);const L=e.messages.slice(1).map(C=>({role:C.type==="user"?"user":"assistant",content:C.content}));if(Tm(S)){console.log("📊 Question forfait détectée - recherche avec extraction de nombre");try{const C=await wm(S,L);if(console.log("📊 Résultat recherche forfait:",{number:C.number,sectionsUsed:C.sectionsUsed,textPreview:C.text.substring(0,100)+"..."}),C!=null&&C.number)return`✅ **Forfait annuel** : ${C.number} jours de télétravail par an

*📞 Contact : Service RH - 01 40 85 64 64*`;if(String((C==null?void 0:C.text)||"").toLowerCase().includes("je ne trouve pas")||C.text)return C.text}catch(C){console.error("Erreur recherche forfait:",C)}return`✅ **Forfait annuel** : 15 jours de télétravail par an

*📞 Contact : Service RH - 01 40 85 64 64*`}try{console.log("🔍 Lancement de la recherche unifiée en 2 étapes...");const C=await Em(S,L);return console.log("✅ Réponse de la recherche unifiée:",C.substring(0,150)+"..."),C}catch(C){return console.error("❌ Erreur lors de la recherche unifiée:",C),"Erreur lors de l'analyse des documents internes. Contactez le service RH au 01 40 85 64 64."}}else if(q===4){B=`
Tu es un juriste spécialiste de la fonction publique. Tu réponds exclusivement en te référant au site de Légifrance et au Code général de la fonction publique.

SOURCES AUTORISÉES :
1. Site Legifrance (https://www.legifrance.gouv.fr/)
2. Code général de la fonction publique : https://www.legifrance.gouv.fr/download/pdf/legiOrKali?id=LEGITEXT000044416551.pdf&size=1,8%20Mo&pathToFile=/LEGI/TEXT/00/00/44/41/65/51/LEGITEXT000044416551/LEGITEXT000044416551.pdf&title=Code%20général%20de%20la%20fonction%20publique

RÈGLES STRICTES :
- Tu n'inventes pas de réponse
- Tu cites toujours soit la référence de la loi, du décret, soit la référence de la jurisprudence administrative
- Recherche prioritairement dans le Code général de la fonction publique pour les questions relatives à la fonction publique

Format de réponse attendu :
- Réponse précise basée sur les textes légaux
- Citation systématique des références (ex: "Article L. 123-4 du Code général de la fonction publique", "Décret n° 2021-123 du...", "CE, 12 mars 2021, req. n° 123456")
- Si tu ne trouves pas d'information précise sur Légifrance ou dans le Code général de la fonction publique, indique clairement "Aucune référence trouvée sur Légifrance pour cette question spécifique"
      `;const L=e.messages.slice(1).map(U=>({role:U.type==="user"?"user":"assistant",content:U.content})),C=[{role:"system",content:B},...L,{role:"user",content:S}];return await b(C)}console.log("🌐 UTILISATION DE L'API PERPLEXITY pour le domaine:",q),console.log("❌ ERREUR: Ce domaine ne devrait pas utiliser l'API externe!");const k=e.messages.slice(1).map(L=>({role:L.type==="user"?"user":"assistant",content:L.content})),j=[{role:"system",content:B},...k,{role:"user",content:S}];return await b(j)},I=async S=>{const P=S||n,q=typeof P=="string"?P.trim():"";if(console.log("handleSendMessage appelé avec:",{text:S,inputValue:n,textToSend:P,q,isProcessing:e.isProcessing,selectedDomain:e.selectedDomain,source:S?"VOICE":"MANUAL"}),!q){console.log("Aucun texte à envoyer");return}if(e.isProcessing){console.log("Déjà en cours de traitement, ignore");return}console.log("Envoi du message:",q);const B={type:"user",content:q,timestamp:new Date};t(k=>({...k,messages:[...k.messages,B],isProcessing:!0})),r(""),v("");try{console.log("Appel de traiterQuestion..."),S&&(console.log("🎤 QUESTION ORALE - Forçage du processus identique à la question écrite"),v(""),l(!1));const k=await F(q);console.log("Réponse reçue:",k);const j={type:"assistant",content:k,timestamp:new Date};t(L=>({...L,messages:[...L.messages,j],isProcessing:!1}))}catch(k){console.error("Erreur dans handleSendMessage:",k);const j={type:"assistant",content:"Erreur lors du traitement. Veuillez réessayer.",timestamp:new Date};t(L=>({...L,messages:[...L.messages,j],isProcessing:!1}))}finally{setTimeout(()=>{var k;return(k=w.current)==null?void 0:k.focus()},100)}},Ee=S=>{S.key==="Enter"&&!S.shiftKey&&(S.preventDefault(),console.log("⌨️ ENVOI MANUEL (ENTRÉE):",n),console.log("⌨️ État avant envoi:",{selectedDomain:e.selectedDomain,isProcessing:e.isProcessing,messagesCount:e.messages.length}),I())},wt=()=>{if(console.log("toggleListening appelé, isListening:",a),console.log("recognitionRef.current:",!!c.current),!c.current){console.error("Reconnaissance vocale non initialisée"),alert("Reconnaissance vocale non disponible");return}try{if(a)console.log("Arrêt de la reconnaissance vocale"),c.current.stop(),l(!1),d.current&&(clearTimeout(d.current),d.current=null);else{if(console.log("Démarrage de la reconnaissance vocale"),c.current)try{c.current.stop()}catch{}setTimeout(()=>{c.current&&c.current.start()},100)}}catch(S){console.error("Erreur lors du toggle:",S),l(!1),alert("Erreur lors de l'activation de la reconnaissance vocale")}};return o.jsxs("div",{className:"min-h-screen relative font-sans overflow-hidden",children:[o.jsxs("div",{className:"fixed inset-0 z-0",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900"}),o.jsx("div",{className:"absolute inset-0 bg-[url('./unnamed.jpg')] bg-cover bg-center opacity-20"}),o.jsx("div",{className:"absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"}),o.jsxs("div",{className:"absolute inset-0 overflow-hidden pointer-events-none",children:[[...Array(120)].map((S,P)=>{const q=(Math.random()*3+1).toFixed(2),B=(Math.random()*100).toFixed(2),k=(Math.random()*20).toFixed(2),j=(8+Math.random()*22).toFixed(2),L=(.25+Math.random()*.8).toFixed(2);return o.jsx("div",{className:"snowflake absolute rounded-full bg-white",style:{width:`${q}px`,height:`${q}px`,left:`${B}%`,top:`${-10-Math.random()*50}%`,opacity:L,animationDelay:`${k}s`,animationDuration:`${j}s`}},P)}),o.jsx("style",{dangerouslySetInnerHTML:{__html:`
            .snowflake { filter: drop-shadow(0 1px 2px rgba(255,255,255,0.05)); }
            @keyframes fall {
              0% { transform: translateY(0) translateX(0) rotate(0deg); }
              100% { transform: translateY(120vh) translateX(40px) rotate(360deg); }
            }
            /* slight horizontal sway variation */
            @keyframes fall-sway {
              0% { transform: translateY(0) translateX(0) rotate(0deg); }
              25% { transform: translateY(30vh) translateX(10px) rotate(45deg); }
              50% { transform: translateY(60vh) translateX(-10px) rotate(180deg); }
              75% { transform: translateY(90vh) translateX(5px) rotate(270deg); }
              100% { transform: translateY(120vh) translateX(40px) rotate(360deg); }
            }
            .snowflake { animation-name: fall, fall-sway; animation-timing-function: linear, ease-in-out; animation-iteration-count: infinite, infinite; animation-fill-mode: both; }
          `}})]}),o.jsx("div",{className:"absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-full blur-xl animate-pulse"}),o.jsx("div",{className:"absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse",style:{animationDelay:"1s"}}),o.jsx("div",{className:"absolute bottom-40 left-1/4 w-40 h-40 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-full blur-xl animate-pulse",style:{animationDelay:"2s"}})]}),o.jsx(Rm,{}),o.jsxs("header",{className:"relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-purple-500/10"}),o.jsxs("div",{className:"relative max-w-7xl mx-auto px-6 py-4",children:[o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center space-x-6",children:[o.jsxs("div",{className:"relative group",children:[o.jsx("div",{className:"absolute -inset-2 bg-gradient-to-r from-orange-400 to-red-500 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-300 animate-pulse"}),o.jsx("div",{className:"relative bg-white/20 backdrop-blur-xl rounded-2xl p-4 border border-white/30 shadow-xl",children:o.jsx(Zi,{className:"w-12 h-12 text-white"})})]}),o.jsxs("div",{className:"space-y-2",children:[o.jsx("h1",{className:"text-4xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent drop-shadow-lg",children:"Atlas"}),o.jsxs("div",{className:"flex items-center space-x-3",children:[o.jsx("span",{className:"text-lg font-semibold text-white/90",children:"Chatbot CFDT"}),o.jsx("div",{className:"w-2 h-2 bg-orange-400 rounded-full animate-pulse"}),o.jsx("span",{className:"text-sm text-white/70",children:"Mairie de Gennevilliers"})]}),o.jsxs("p",{className:"text-sm text-white/80 flex items-center space-x-2",children:[o.jsx(Yi,{className:"w-4 h-4"}),o.jsx("span",{children:"Assistant syndical intelligent"})]})]})]}),o.jsxs("div",{className:"relative group",children:[o.jsx("div",{className:"absolute -inset-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition duration-500 animate-pulse"}),o.jsx("div",{className:"relative w-20 h-20 bg-white backdrop-blur-xl rounded-full border-2 border-white/30 shadow-2xl overflow-hidden",children:o.jsx("img",{src:"./logo-cfdt.jpg",alt:"Logo CFDT",className:"w-full h-full object-cover"})})]})]}),o.jsxs("div",{className:"mt-3 flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center space-x-6",children:[o.jsxs("div",{className:"flex items-center space-x-2 text-white/80",children:[o.jsx("div",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),o.jsx("span",{className:"text-sm",children:"Système opérationnel"})]}),o.jsxs("div",{className:"flex items-center space-x-2 text-white/80",children:[o.jsx(nl,{className:"w-4 h-4"}),o.jsx("span",{className:"text-sm",children:"IA activée"})]})]}),o.jsx("div",{className:"flex items-center space-x-4",children:o.jsxs("div",{className:"text-right",children:[o.jsx("div",{className:"text-sm text-white/80",children:"Assistant disponible"}),o.jsx("div",{className:"text-xs text-white/60",children:"24/7 pour les agents"})]})})]})]})]}),o.jsx("div",{className:"relative max-w-7xl mx-auto px-6 mt-6 z-10",children:o.jsxs("section",{className:"relative mb-6 overflow-hidden rounded-3xl backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-purple-500/20"}),o.jsxs("div",{className:"relative h-20 flex items-center overflow-hidden",children:[o.jsx("div",{className:"absolute left-0 top-0 h-full w-48 flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 z-20 shadow-xl",children:o.jsxs("div",{className:"flex items-center space-x-3",children:[o.jsx(om,{className:"w-6 h-6 text-white"}),o.jsx("span",{className:"text-xl font-bold text-white",children:"NEWS FPT"})]})}),o.jsx("div",{className:"animate-marquee whitespace-nowrap flex items-center pl-52",style:{animation:"marquee 40s linear infinite"},children:[...Js,...Js].map((S,P)=>o.jsxs("button",{onClick:()=>s(S),className:"group mx-8 text-white/90 hover:text-white transition-all duration-300 flex items-center space-x-3",children:[o.jsx("div",{className:"w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-sm font-bold text-white shadow-lg",children:S.id}),o.jsx("span",{className:"text-lg font-medium underline decoration-dotted decoration-white/50 group-hover:decoration-white transition-all",children:S.title}),o.jsx(An,{className:"w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all"})]},`${S.id}-${P}`))})]}),o.jsx("style",{dangerouslySetInnerHTML:{__html:`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }
            `}})]})}),o.jsx("main",{className:"relative max-w-7xl mx-auto px-6 py-12 z-10",children:e.currentView==="menu"?o.jsxs(o.Fragment,{children:[i&&o.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center p-4",children:[o.jsx("div",{className:"absolute inset-0 bg-black/50 backdrop-blur-sm",onClick:()=>s(null)}),o.jsxs("div",{className:"relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 max-w-4xl w-full max-h-[80vh] overflow-hidden",children:[o.jsx("div",{className:"bg-gradient-to-r from-orange-500 to-red-500 p-6",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center space-x-4",children:[o.jsx("div",{className:"w-12 h-12 bg-white/20 rounded-full flex items-center justify-center",children:o.jsx(Zp,{className:"w-6 h-6 text-white"})}),o.jsx("h3",{className:"text-2xl font-bold text-white",children:i.title})]}),o.jsx("button",{onClick:()=>s(null),className:"w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all duration-200",children:o.jsx(jd,{className:"w-6 h-6 text-white"})})]})}),o.jsx("div",{className:"p-8 overflow-y-auto max-h-[60vh]",children:o.jsx("div",{className:"prose prose-lg max-w-none",children:o.jsx("p",{className:"whitespace-pre-wrap text-gray-700 leading-relaxed",children:i.content})})})]})]}),o.jsx("section",{className:"text-center mb-16",children:o.jsxs("div",{className:"inline-flex items-center space-x-4 mb-6",children:[o.jsx("div",{className:"w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"}),o.jsx("h2",{className:"text-3xl font-bold bg-gradient-to-r from-white via-orange-100 to-red-100 bg-clip-text text-transparent",children:"Choisissez votre domaine d'assistance"}),o.jsx("div",{className:"w-12 h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent"})]})}),o.jsx("div",{className:"mb-16",children:o.jsxs("div",{className:"group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-1",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),o.jsx("div",{className:"relative p-12",children:o.jsxs("div",{className:"flex flex-col lg:flex-row items-center gap-12",children:[o.jsx("div",{className:"flex-shrink-0 text-center lg:text-left",children:o.jsxs("div",{className:"relative group/icon",children:[o.jsx("div",{className:"absolute -inset-4 bg-gradient-to-br from-blue-400 to-indigo-600 rounded-3xl blur-xl opacity-60 group-hover/icon:opacity-80 transition-all duration-300"}),o.jsxs("div",{className:"relative p-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl shadow-2xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center",children:[o.jsx(Yp,{className:"w-16 h-16 text-white mb-4 mx-auto"}),o.jsx("h3",{className:"text-2xl font-bold text-white mb-4",children:"Documents Internes"}),o.jsxs("div",{className:"space-y-2",children:[o.jsx("div",{className:"text-white/95 text-xs font-medium",children:"⏰ Temps de travail"}),o.jsx("div",{className:"text-white/95 text-xs font-medium",children:"🎓 Formation"}),o.jsx("div",{className:"text-white/95 text-xs font-medium",children:"🏠 Télétravail"}),o.jsx("div",{className:"text-white/95 text-xs font-medium",children:"💰 Primes"})]})]})]})}),o.jsx("div",{className:"flex-1 w-full max-w-2xl",children:o.jsx("div",{className:"space-y-6",children:o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg"}),o.jsxs("div",{className:"relative bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20",children:[o.jsxs("div",{className:"flex items-center space-x-3 mb-4",children:[o.jsx(yd,{className:"w-5 h-5 text-white/80"}),o.jsx("span",{className:"text-white/90 font-medium",children:"Recherche intelligente"})]}),o.jsxs("div",{className:"flex gap-3",children:[o.jsx("div",{className:"flex-1 relative",children:o.jsx("input",{type:"text",value:f,onChange:S=>y(S.target.value),placeholder:"Posez votre question sur nos documents internes...",className:"w-full px-4 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all",onKeyPress:async S=>{S.key==="Enter"&&f.trim()&&(await N(f.trim()),y(""))}})}),o.jsxs("button",{onClick:async()=>{f.trim()?(await N(f.trim()),y("")):await N()},className:"px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105",children:[o.jsx(tl,{className:"w-5 h-5"}),f.trim()?"Poser":"Ouvrir"]})]})]})]})})})]})})]})}),o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16",children:[o.jsxs("button",{onClick:()=>R(3),className:"group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-2",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-amber-500/10 via-orange-500/10 to-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),o.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[o.jsxs("div",{className:"relative group/icon",children:[o.jsx("div",{className:"absolute -inset-3 bg-gradient-to-br from-amber-400 to-orange-600 rounded-2xl blur-lg opacity-60 group-hover/icon:opacity-80 transition-all duration-300"}),o.jsxs("div",{className:"relative p-8 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center",children:[o.jsx(am,{className:"w-12 h-12 text-white mb-4 mx-auto"}),o.jsx("h4",{className:"text-xl font-bold text-white mb-3",children:"Recherche Juridique"}),o.jsx("p",{className:"text-white/90 text-sm leading-relaxed max-w-xs",children:"Accès direct à la base de données juridique administrative"})]})]}),o.jsxs("div",{className:"flex items-center text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300",children:[o.jsx("span",{className:"text-sm font-medium",children:"Accéder"}),o.jsx(An,{className:"w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"})]})]})]}),o.jsxs("button",{onClick:()=>R(4),className:"group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-2",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),o.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[o.jsxs("div",{className:"relative group/icon",children:[o.jsx("div",{className:"absolute -inset-3 bg-gradient-to-br from-indigo-400 to-purple-600 rounded-2xl blur-lg opacity-60 group-hover/icon:opacity-80 transition-all duration-300"}),o.jsxs("div",{className:"relative p-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center",children:[o.jsx(Xp,{className:"w-12 h-12 text-white mb-4 mx-auto"}),o.jsx("h4",{className:"text-xl font-bold text-white mb-3",children:"IA Fonction Publique"}),o.jsx("p",{className:"text-white/90 text-sm leading-relaxed max-w-xs",children:"Juriste IA avec références Légifrance précises"})]})]}),o.jsxs("div",{className:"flex items-center text-indigo-400 opacity-0 group-hover:opacity-100 transition-all duration-300",children:[o.jsx("span",{className:"text-sm font-medium",children:"Accéder"}),o.jsx(An,{className:"w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"})]})]})]}),o.jsxs("button",{onClick:()=>R(5),className:"group relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 transition-all duration-500 hover:bg-white/15 hover:shadow-3xl hover:-translate-y-2",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"}),o.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-6",children:[o.jsxs("div",{className:"relative group/icon",children:[o.jsx("div",{className:"absolute -inset-3 bg-gradient-to-br from-rose-400 to-pink-600 rounded-2xl blur-lg opacity-60 group-hover/icon:opacity-80 transition-all duration-300"}),o.jsxs("div",{className:"relative p-8 bg-gradient-to-br from-rose-500 to-pink-600 rounded-2xl shadow-xl group-hover/icon:scale-110 group-hover/icon:rotate-3 transition-all duration-300 text-center",children:[o.jsx(Gs,{className:"w-12 h-12 text-white mb-4 mx-auto"}),o.jsx("h4",{className:"text-xl font-bold text-white mb-3",children:"FAQ"}),o.jsx("p",{className:"text-white/90 text-sm leading-relaxed max-w-xs",children:"Questions fréquentes sur télétravail et formation"})]})]}),o.jsxs("div",{className:"flex items-center text-rose-400 opacity-0 group-hover:opacity-100 transition-all duration-300",children:[o.jsx("span",{className:"text-sm font-medium",children:"Consulter"}),o.jsx(An,{className:"w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"})]})]})]})]})]}):e.currentView==="faq"?o.jsx(Am,{onReturn:A}):o.jsxs("div",{ref:M,className:"backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl overflow-hidden",children:[o.jsx("div",{className:"bg-gradient-to-r from-orange-500 via-red-500 to-purple-600 p-6",children:o.jsxs("div",{className:"flex items-center justify-between",children:[o.jsxs("div",{className:"flex items-center gap-6",children:[o.jsx("button",{onClick:A,className:"text-white hover:text-orange-200 p-3 rounded-full hover:bg-white/10 transition-all duration-200 group",children:o.jsx(xd,{className:"w-6 h-6 group-hover:-translate-x-1 transition-transform"})}),o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-2 bg-white/20 rounded-full blur-lg opacity-50"}),o.jsx("div",{className:"relative w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center",children:o.jsx(Zi,{className:"w-6 h-6 text-white"})})]}),o.jsxs("div",{children:[o.jsxs("h3",{className:"text-2xl font-bold text-white",children:[e.selectedDomain===0&&"Assistant Temps de Travail",e.selectedDomain===1&&"Assistant Formation",e.selectedDomain===2&&"Assistant Télétravail",e.selectedDomain===3&&"Recherche Juridique",e.selectedDomain===4&&"Juriste IA fonction publique",e.selectedDomain===5&&"FAQ",e.selectedDomain===6&&"Actualités",e.selectedDomain===7&&"Documentation",e.selectedDomain===8&&"Dialogue social",e.selectedDomain===9&&"Assistant PRIMES"]}),o.jsxs("div",{className:"flex items-center gap-3 mt-2",children:[o.jsx("div",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),o.jsx("p",{className:"text-orange-100 text-sm",children:"Assistant en ligne - Prêt à vous aider"})]})]})]})]}),o.jsx("div",{className:"flex items-center gap-3",children:o.jsxs("div",{className:"text-right",children:[o.jsx("div",{className:"text-white/90 text-sm font-medium",children:"CFDT Gennevilliers"}),o.jsx("div",{className:"text-orange-200 text-xs",children:"Support syndical"})]})})]})}),o.jsxs("div",{className:"h-[45vh] sm:h-[50vh] md:h-[60vh] overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-white/5 to-white/10",children:[e.messages.map((S,P)=>o.jsxs("div",{className:`flex items-end gap-3 ${S.type==="user"?"justify-end":"justify-start"}`,children:[S.type==="assistant"&&o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-50"}),o.jsx("div",{className:"relative w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg",children:"CFDT"})]}),o.jsxs("div",{className:`flex ${S.type==="user"?"flex-row-reverse":"flex-row"} items-start gap-4 max-w-4xl`,children:[o.jsxs("div",{className:`relative max-w-[80%] px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm ${S.type==="user"?"bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-br-lg":"bg-white/90 border border-white/20 text-gray-800 rounded-bl-lg"}`,children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-white/10 to-transparent rounded-3xl opacity-50"}),o.jsxs("div",{className:"relative",children:[o.jsx("p",{className:"text-sm leading-relaxed whitespace-pre-wrap",children:S.content}),o.jsxs("div",{className:`flex items-center gap-2 mt-3 text-xs ${S.type==="user"?"text-white/70 justify-end":"text-gray-500"}`,children:[o.jsx("span",{children:S.timestamp.toLocaleTimeString([],{hour:"2-digit",minute:"2-digit"})}),S.type==="assistant"&&o.jsxs("div",{className:"flex items-center gap-1",children:[o.jsx("div",{className:"w-1 h-1 bg-green-400 rounded-full animate-pulse"}),o.jsx("span",{children:"En ligne"})]})]})]})]}),P===0&&S.type==="assistant"&&o.jsx("div",{className:"hidden lg:block ml-8 -mt-16",children:o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-4 bg-gradient-to-r from-orange-400 to-red-500 rounded-3xl blur-xl opacity-30 animate-pulse"}),o.jsx("img",{src:"./cfdtmanga.gif",alt:"CFDT Manga",className:"relative w-80 h-80 object-contain rounded-2xl shadow-2xl"})]})})]})]},P)),e.isProcessing&&o.jsxs("div",{className:"flex items-end gap-3 justify-start",children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full blur opacity-50 animate-pulse"}),o.jsx("div",{className:"relative w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg",children:"CFDT"})]}),o.jsx("div",{className:"relative max-w-[80%] px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm bg-white/90 border border-white/20 rounded-bl-lg",children:o.jsxs("div",{className:"flex items-center space-x-3",children:[o.jsxs("div",{className:"flex space-x-1",children:[o.jsx("div",{className:"w-2 h-2 bg-orange-500 rounded-full animate-bounce",style:{animationDelay:"0ms"}}),o.jsx("div",{className:"w-2 h-2 bg-orange-500 rounded-full animate-bounce",style:{animationDelay:"150ms"}}),o.jsx("div",{className:"w-2 h-2 bg-orange-500 rounded-full animate-bounce",style:{animationDelay:"300ms"}})]}),o.jsx("span",{className:"text-sm text-gray-600",children:"L'assistant réfléchit..."})]})})]}),o.jsx("div",{ref:E}),a&&g&&o.jsxs("div",{className:"flex items-end gap-3 justify-start",children:[o.jsxs("div",{className:"relative",children:[o.jsx("div",{className:"absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur opacity-50 animate-pulse"}),o.jsx("div",{className:"relative w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white flex items-center justify-center shrink-0 text-sm font-bold shadow-lg",children:"🎤"})]}),o.jsxs("div",{className:"relative max-w-[80%] px-6 py-4 rounded-3xl shadow-lg backdrop-blur-sm bg-blue-100/90 border border-blue-300/30 rounded-bl-lg",children:[o.jsx("p",{className:"text-sm text-blue-800 italic",children:g}),o.jsxs("div",{className:"flex items-center gap-2 mt-2",children:[o.jsx("div",{className:"w-1 h-1 bg-blue-500 rounded-full animate-pulse"}),o.jsx("p",{className:"text-xs text-blue-600",children:"En cours d'écoute..."})]})]})]})]}),o.jsxs("div",{className:"p-6 bg-white/10 backdrop-blur-xl border-t border-white/20",children:[o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsxs("div",{className:"flex-1 relative",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl blur-lg opacity-50"}),o.jsx("div",{className:"relative",children:o.jsx("input",{ref:w,type:"text",value:n,onChange:S=>r(S.target.value),onKeyPress:Ee,placeholder:"Tapez votre question ici...",className:"w-full px-6 py-4 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all text-base",disabled:e.isProcessing})})]}),o.jsxs("div",{className:"flex items-center gap-3",children:[o.jsxs("button",{onClick:wt,disabled:e.isProcessing||!u,className:`relative p-4 rounded-2xl transition-all duration-200 flex items-center justify-center shadow-lg group ${u?a?"bg-gradient-to-r from-red-500 to-pink-600 text-white animate-pulse hover:from-red-600 hover:to-pink-700":"bg-gradient-to-r from-blue-500 to-indigo-600 text-white hover:from-blue-600 hover:to-indigo-700 hover:scale-105":"bg-gray-500/50 text-gray-300 cursor-not-allowed"} disabled:opacity-50 disabled:cursor-not-allowed`,title:u?a?"Arrêter l'écoute":"Parler":"Reconnaissance vocale non supportée",children:[o.jsx("div",{className:"absolute -inset-1 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"}),a?o.jsx(nm,{className:"w-5 h-5 relative"}):o.jsx(el,{className:"w-5 h-5 relative"})]}),o.jsxs("button",{onClick:()=>{console.log("🔘 ENVOI MANUEL (BOUTON):",n),console.log("🔘 État avant envoi:",{selectedDomain:e.selectedDomain,isProcessing:e.isProcessing,messagesCount:e.messages.length}),I()},disabled:!n.trim()||e.isProcessing,className:"relative p-4 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg group hover:scale-105",children:[o.jsx("div",{className:"absolute -inset-1 bg-white/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity"}),o.jsx(tl,{className:"w-5 h-5 relative"})]})]})]}),o.jsxs("div",{className:"flex items-center justify-between mt-4 text-sm text-white/70",children:[o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx("div",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),o.jsx("span",{children:"Assistant disponible"})]}),u&&o.jsxs("div",{className:"flex items-center gap-2",children:[o.jsx(el,{className:"w-4 h-4"}),o.jsx("span",{children:"Reconnaissance vocale activée"})]})]}),o.jsx("div",{className:"text-white/50",children:"Appuyez sur Entrée pour envoyer"})]})]})]})}),o.jsx("div",{className:"relative mb-8 max-w-7xl mx-auto px-6 z-10",children:o.jsxs("div",{className:"relative overflow-hidden backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-purple-500/10"}),o.jsx("div",{className:"relative p-8",children:o.jsxs("div",{className:"w-full relative",children:[o.jsx(bm,{}),o.jsx("div",{className:"absolute left-0 top-1/2 transform -translate-y-1/2 z-30 pointer-events-none",children:o.jsx("div",{className:"w-56 h-20 bg-white/95 border border-white/20 rounded-2xl shadow-2xl flex items-center justify-center text-gray-900 font-semibold",children:o.jsx("div",{className:"text-lg",children:"Actu"})})})]})})]})}),o.jsxs("footer",{className:"relative backdrop-blur-xl bg-white/10 border-t border-white/20 py-6 z-10",children:[o.jsx("div",{className:"absolute inset-0 bg-gradient-to-r from-orange-500/5 via-red-500/5 to-purple-500/5"}),o.jsxs("div",{className:"relative max-w-7xl mx-auto px-6",children:[o.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-3 gap-8",children:[o.jsxs("div",{className:"text-center md:text-left",children:[o.jsxs("div",{className:"flex items-center gap-3 mb-6",children:[o.jsx("div",{className:"w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center",children:o.jsx(Zi,{className:"w-5 h-5 text-white"})}),o.jsx("h4",{className:"text-xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent",children:"Contact CFDT"})]}),o.jsxs("div",{className:"space-y-4",children:[o.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-3 text-white/80 hover:text-white transition-colors",children:[o.jsx("div",{className:"w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center",children:o.jsx(im,{className:"w-4 h-4 text-orange-400"})}),o.jsx("span",{children:"01 40 85 64 64"})]}),o.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-3 text-white/80 hover:text-white transition-colors",children:[o.jsx("div",{className:"w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center",children:o.jsx(em,{className:"w-4 h-4 text-orange-400"})}),o.jsx("a",{href:"mailto:cfdt-interco@ville-gennevilliers.fr",className:"hover:text-orange-300 transition-colors",children:"cfdt-interco@ville-gennevilliers.fr"})]}),o.jsxs("div",{className:"flex items-center justify-center md:justify-start gap-3 text-white/80",children:[o.jsx("div",{className:"w-8 h-8 bg-orange-500/20 rounded-full flex items-center justify-center",children:o.jsx(tm,{className:"w-4 h-4 text-orange-400"})}),o.jsx("span",{children:"Mairie de Gennevilliers"})]})]})]}),o.jsxs("div",{className:"text-center",children:[o.jsxs("div",{className:"flex items-center justify-center gap-3 mb-6",children:[o.jsx("div",{className:"w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center",children:o.jsx(Yi,{className:"w-5 h-5 text-white"})}),o.jsx("h4",{className:"text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent",children:"Services"})]}),o.jsxs("ul",{className:"space-y-3 text-white/80",children:[o.jsxs("li",{className:"flex items-center justify-center gap-2",children:[o.jsx(Lr,{className:"w-4 h-4 text-green-400"}),o.jsx("span",{children:"Santé"})]}),o.jsxs("li",{className:"flex items-center justify-center gap-2",children:[o.jsx(Lr,{className:"w-4 h-4 text-green-400"}),o.jsx("span",{children:"Retraite"})]}),o.jsxs("li",{className:"flex items-center justify-center gap-2",children:[o.jsx(Lr,{className:"w-4 h-4 text-green-400"}),o.jsx("span",{children:"Juridique"})]}),o.jsxs("li",{className:"flex items-center justify-center gap-2",children:[o.jsx(Lr,{className:"w-4 h-4 text-green-400"}),o.jsx("span",{children:"Accompagnement syndical"})]})]})]}),o.jsxs("div",{className:"text-center md:text-right",children:[o.jsxs("div",{className:"flex items-center justify-center md:justify-end gap-3 mb-6",children:[o.jsx("div",{className:"w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center",children:o.jsx(Kp,{className:"w-5 h-5 text-white"})}),o.jsx("h4",{className:"text-xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent",children:"Horaires"})]}),o.jsxs("div",{className:"space-y-3 text-white/80",children:[o.jsx("div",{className:"text-lg font-medium text-white",children:"Lundi - Vendredi"}),o.jsx("div",{className:"text-xl font-bold text-white bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent",children:"9h00-12h00 / 13h30-17h00"}),o.jsx("div",{className:"text-sm text-white/60",children:"Permanences sur RDV"}),o.jsxs("div",{className:"flex items-center justify-center md:justify-end gap-2 mt-4",children:[o.jsx("div",{className:"w-2 h-2 bg-green-400 rounded-full animate-pulse"}),o.jsx("span",{className:"text-sm text-green-300",children:"Ouvert maintenant"})]})]})]})]}),o.jsx("div",{className:"border-t border-white/20 mt-6 pt-4",children:o.jsxs("div",{className:"flex flex-col md:flex-row items-center justify-between gap-4",children:[o.jsxs("div",{className:"flex items-center gap-4",children:[o.jsx("div",{className:"text-white/80",children:"© 2025 CFDT Gennevilliers"}),o.jsx("div",{className:"w-1 h-1 bg-white/40 rounded-full"}),o.jsx("div",{className:"text-white/60",children:"Assistant IA pour les agents municipaux"})]}),o.jsxs("div",{className:"flex items-center gap-6",children:[o.jsxs("div",{className:"flex items-center gap-2 text-white/70",children:[o.jsx(nl,{className:"w-4 h-4 text-orange-400"}),o.jsx("span",{className:"text-sm",children:"Powered by AI"})]}),o.jsxs("div",{className:"flex items-center gap-2 text-white/70",children:[o.jsx(Yi,{className:"w-4 h-4 text-green-400"}),o.jsx("span",{className:"text-sm",children:"Sécurisé"})]})]})]})})]})]})]})}hd(document.getElementById("root")).render(o.jsx(_.StrictMode,{children:o.jsx(Pm,{})}));
