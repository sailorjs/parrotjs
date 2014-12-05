/**
 * parrotjs - Client library to connect your frontend application with whatever API backend
 * @version v0.11.27a
 * @link    http://github.com/sailor/parrotjs
 * @author  Kiko Beats (https://github.com/Kikobeats)
 * @license MIT
 */
(function(){"use strict";var t;t=function(){var t,e,n,r,o,u,l,i,c,a,f,s,d,p,y,h,m;return r=[],i=Object.prototype,l=/^\s*<(\w+|!)[^>]*>/,n=[1,9,11],e=/^\.([\w-]+)$/,u=/^#[\w\d-]+$/,f=/^[\w-]+$/,c=document.createElement("table"),a=document.createElement("tr"),o={tr:document.createElement("tbody"),tbody:c,thead:c,tfoot:c,td:a,th:a,"*":document.createElement("div")},t=function(e,n){var r;return e?"function"===t.toType(e)?t(document).ready(e):(r=y(e,n),h(r,e)):h()},t.query=function(t,n){var r;return e.test(n)?r=t.getElementsByClassName(n.replace(".","")):f.test(n)?r=t.getElementsByTagName(n):u.test(n)&&t===document?(r=t.getElementById(n.replace("#","")),r||(r=[])):r=t.querySelectorAll(n),r.nodeType?[r]:Array.prototype.slice.call(r)},t.extend=function(t){return Array.prototype.slice.call(arguments,1).forEach(function(e){var n,r;r=[];for(n in e)r.push(t[n]=e[n]);return r}),t},t.toType=function(t){return i.toString.call(t).match(/\s([a-z|A-Z]+)/)[1].toLowerCase()},t.each=function(e,n){var r,o,u,l,i;if(o=void 0,u=void 0,"array"===t.toType(e))for(o=l=0,i=e.length;i>l;o=++l)r=e[o],n.call(r,o,r)===!1;else for(u in e)n.call(e[u],u,e[u])===!1;return e},t.map=function(e,n){var r,o,u,l;if(l=[],r=void 0,o=void 0,"array"===t.toType(e))for(r=0;r<e.length;)u=n(e[r],r),null!=u&&l.push(u),r++;else for(o in e)u=n(e[o],o),null!=u&&l.push(u);return d(l)},t.mix=function(){var t,e,n,r,o;for(n={},t=0,r=arguments.length;r>t;){e=arguments[t];for(o in e)m(e,o)&&void 0!==e[o]&&(n[o]=e[o]);t++}return n},h=function(t,e){return null==e&&(e=""),t=t||r,t.selector=e,t.__proto__=h.prototype,t},y=function(e,r){var o,u;return o=null,u=t.toType(e),"array"===u?o=s(e):"string"===u&&l.test(e)?(o=p(e.trim(),RegExp.$1),e=null):"string"===u?(o=t.query(document,e),r&&(o=1===o.length?t.query(o[0],r):t.map(function(){return t.query(o,r)}))):(n.indexOf(e.nodeType)>=0||e===window)&&(o=[e],e=null),o},p=function(e,n){var r;return null==n&&(n="*"),n in o||(n="*"),r=o[n],r.innerHTML=""+e,t.each(Array.prototype.slice.call(r.childNodes),function(){return r.removeChild(this)})},s=function(t){return t.filter(function(t){return null!=t?t:void 0})},d=function(t){return t.length>0?r.concat.apply(r,t):t},m=function(t,e){return i.hasOwnProperty.call(t,e)},h.prototype=t.fn={},t.fn.each=function(t){return this.forEach(function(e,n){return t.call(e,n,e)}),this},t.fn.filter=function(e){return t(r.filter.call(this,function(n){return n.parentNode&&t.query(n.parentNode,e).indexOf(n)>=0}))},t.fn.forEach=r.forEach,t.fn.indexOf=r.indexOf,t.version="3.0.6",t}(),this.Quo=this.$$=t}).call(this);
(function(){"use strict";!function(t){var e,n,a,r,o,u,c,s,i,p,d,l;return e={TYPE:"GET",MIME:"json"},a={script:"text/javascript, application/javascript",json:"application/json",xml:"application/xml, text/xml",html:"text/html",text:"text/plain"},n=0,t.ajaxSettings={type:e.TYPE,async:!0,success:{},error:{},context:null,dataType:e.MIME,headers:{},xhr:function(){return new window.XMLHttpRequest},crossDomain:!1,timeout:0},t.ajax=function(n){var a,u,s,d;if(s=t.mix(t.ajaxSettings,n),s.type===e.TYPE?s.url+=t.serialize(s.data,"?"):s.data=t.serialize(s.data),r(s.url))return o(s);d=s.xhr(),d.onreadystatechange=function(){return 4===d.readyState?(clearTimeout(a),p(d,s)):void 0},d.open(s.type,s.url,s.async),i(d,s),s.timeout>0&&(a=setTimeout(function(){return l(d,s)},s.timeout));try{d.send(s.data)}catch(f){u=f,d=u,c("Resource not found",d,s)}return d},t.get=function(e,n,a,r){return t.ajax({url:e,data:n,success:a,dataType:r})},t.post=function(t,e,n,a){return s("POST",t,e,n,a)},t.put=function(t,e,n,a){return s("PUT",t,e,n,a)},t["delete"]=function(t,e,n,a){return s("DELETE",t,e,n,a)},t.json=function(e,n,a){return t.ajax({url:e,data:n,success:a})},t.serialize=function(t,e){var n,a;null==e&&(e=""),a=e;for(n in t)t.hasOwnProperty(n)&&(a!==e&&(a+="&"),a+=""+encodeURIComponent(n)+"="+encodeURIComponent(t[n]));return a===e?"":a},o=function(e){var a,r,o,u;return e.async?(r="jsonp"+ ++n,o=document.createElement("script"),u={abort:function(){return t(o).remove(),r in window?window[r]={}:void 0}},a=void 0,window[r]=function(n){return clearTimeout(a),t(o).remove(),delete window[r],d(n,u,e)},o.src=e.url.replace(RegExp("=\\?"),"="+r),t("head").append(o),e.timeout>0&&(a=setTimeout(function(){return l(u,e)},e.timeout)),u):console.error("QuoJS.ajax: Unable to make jsonp synchronous call.")},p=function(t,e){t.status>=200&&t.status<300||0===t.status?e.async&&d(u(t,e),t,e):c("QuoJS.ajax: Unsuccesful request",t,e)},d=function(t,e,n){n.success.call(n.context,t,e)},c=function(t,e,n){n.error.call(n.context,t,e,n)},i=function(t,e){var n;e.contentType&&(e.headers["Content-Type"]=e.contentType),e.dataType&&(e.headers.Accept=a[e.dataType]);for(n in e.headers)t.setRequestHeader(n,e.headers[n])},l=function(t,e){t.onreadystatechange={},t.abort(),c("QuoJS.ajax: Timeout exceeded",t,e)},s=function(e,n,a,r,o){return t.ajax({type:e,url:n,data:a,success:r,dataType:o,contentType:"application/x-www-form-urlencoded"})},r=function(t){return RegExp("=\\?").test(t)},u=function(t,n){var a,r;if(r=t,t.responseText){if(n.dataType===e.MIME)try{r=JSON.parse(t.responseText)}catch(o){a=o,r=a,c("QuoJS.ajax: Parse Error",t,n)}"xml"===n.dataType&&(r=t.responseXML)}return r}}(Quo)}).call(this);
eval(function(e,a,t,s,r,n){if(r=function(e){return(a>e?"":r(parseInt(e/a)))+((e%=a)>35?String.fromCharCode(e+29):e.toString(36))},!"".replace(/^/,String)){for(;t--;)n[r(t)]=s[t]||r(t);s=[function(e){return n[e]}],r=function(){return"\\w+"},t=1}for(;t--;)s[t]&&(e=e.replace(new RegExp("\\b"+r(t)+"\\b","g"),s[t]));return e}(";5 V=(8(){\"1D 1B\";5 j={l:'l',E:'1y',m:'m',p:'1x',q:'1v',v:'v'},19={\"1u\":1t,\"1q\":1n,\"1m\":11,\"1k\":18,\"1j\":11,\"1i\":18},S=8(a,b){5 d=1g,O=d.1f('a'),b=b||d.17.G,H=b.r(/\\/\\/(.*?)(?::(.*?))?@/)||[];O.G=b;w(5 i R j){a[i]=O[j[i]]||''}a.l=a.l.o(/:$/,'');a.q=a.q.o(/^\\?/,'');a.v=a.v.o(/^#/,'');a.F=H[1]||'';a.x=H[2]||'';a.m=(19[a.l]==a.m||a.m==0)?'':a.m;9(!a.l&&!/^([a-z]+:)?\\/\\//.1d(b)){5 c=T V(d.17.G.r(/(.*\\/)/)[0]),A=c.p.X('/'),B=a.p.X('/');A.W();w(5 i=0,C=['l','F','x','E','m'],s=C.Z;i<s;i++){a[C[i]]=c[C[i]]}10(B[0]=='..'){A.W();B.1c()}a.p=(b.1p(0,1)!='/'?A.13('/'):'')+'/'+B.13('/')}D{a.p=a.p.o(/^\\/?/,'/')}14(a)},15=8(s){s=s.o(/\\+/g,' ');s=s.o(/%([1b][0-t-f])%([P][0-t-f])%([P][0-t-f])/N,8(a,b,c,d){5 e=u(b,16)-1e,Q=u(c,16)-M;9(e==0&&Q<1h){k a}5 f=u(d,16)-M,n=(e<<12)+(Q<<6)+f;9(n>1l){k a}k K.J(n)});s=s.o(/%([1o][0-t-f])%([P][0-t-f])/N,8(a,b,c){5 d=u(b,16)-1a;9(d<2){k a}5 e=u(c,16)-M;k K.J((d<<6)+e)});s=s.o(/%([0-7][0-t-f])/N,8(a,b){k K.J(u(b,16))});k s},14=8(g){5 h=g.q;g.q=T(8(c){5 d=/([^=&]+)(=([^&]*))?/g,r;10((r=d.1r(c))){5 f=1s(r[1].o(/\\+/g,' ')),I=r[3]?15(r[3]):'';9(4[f]!=1w){9(!(4[f]y Y)){4[f]=[4[f]]}4[f].1z(I)}D{4[f]=I}}4.1A=8(){w(f R 4){9(!(4[f]y U)){1C 4[f]}}};4.L=8(){5 s='',e=1E;w(5 i R 4){9(4[i]y U){1F}9(4[i]y Y){5 a=4[i].Z;9(a){w(5 b=0;b<a;b++){s+=s?'&':'';s+=e(i)+'='+e(4[i][b])}}D{s+=(s?'&':'')+e(i)+'='}}D{s+=s?'&':'';s+=e(i)+'='+e(4[i])}}k s}})(h)};k 8(a){4.L=8(){k((4.l&&(4.l+'://'))+(4.F&&(4.F+(4.x&&(':'+4.x))+'@'))+(4.E&&4.E)+(4.m&&(':'+4.m))+(4.p&&4.p)+(4.q.L()&&('?'+4.q))+(4.v&&('#'+4.v)))};S(4,a)}}());",62,104,"||||this|var|||function|if|||||||||||return|protocol|port||replace|path|query|match||9a|parseInt|hash|for|pass|instanceof||basePath|selfPath|props|else|host|user|href|auth|value|fromCharCode|String|toString|0x80|gi|link|89ab|n2|in|parse|new|Function|Url|pop|split|Array|length|while|80||join|parseQs|decode||location|443|defaultPorts|0xC0|ef|shift|test|0xE0|createElement|document|32|wss|ws|https|0xFFFF|http|70|cd|substring|gopher|exec|decodeURIComponent|21|ftp|search|null|pathname|hostname|push|clear|strict|delete|use|encodeURIComponent|continue".split("|"),0,{}));
(function(){"use strict";var e;e=this.parrot={version:"0.11.27",environment:"development",language:window.navigator.language.slice(0,2),initialize:{},endpoint:{},url:{},local:{},session:{},$:"undefined"!=typeof $$&&null!==$$?$$:$},function(){return e._DEFAULT={METHOD:"get",SEND:{},HEADERS:{},ASYNC:!0,DATATYPE:"json",CONTENT_TYPE:"application/x-www-form-urlencoded"},e._partial=function(e){var t;return t=Array.prototype.slice.call(arguments,1),function(){var n;return n=t.concat(Array.prototype.slice.call(arguments)),e.apply(this,n)}},e._createAjaxPromise=function(t){return new Promise(function(n){return function(r,s){return e.$.ajax({url:t.url,type:t.method||n._DEFAULT.METHOD,data:t.send||n._DEFAULT.SEND,dataType:t.datatype||n._DEFAULT.DATATYPE,contentType:t.contenttype||n._DEFAULT.CONTENT_TYPE,async:t.async||n._DEFAULT.ASYNC,headers:t.headers||n._DEFAULT.HEADERS,success:function(e){return 0===e.status?s({code:0,message:{errors:[{param:"url",msg:"Server Unavailable."}]}}):r(e)},error:function(e,t){var n;if(t="object"==typeof e?e:t,null!=t.responseJSON)n=t.responseJSON;else try{n=JSON.parse(t.response)}catch(r){n=t.response}return s({code:t.status,message:n})}})}}(this))},e.ajax=function(t,n){var r,s;return s=""+e.endpoint[e.environment](),r=function(e){return function(t,n){return e._createAjaxPromise(t).then(function(e){return n(null,e)},function(e){return n(e,null)})}}(this),t.url?t.url!==s&&t.url!==""+s+"/"+t.path&&t.url!==""+s+"?"+t.query&&t.url!==""+s+"/"+t.path+"?"+t.query&&(null!=t.path&&(t.url=""+t.url+"/"+t.path),null!=t.query&&(t.url=""+t.url+"?"+t.query)):("string"==typeof arguments[0]&&(null!=e.url._URLS[arguments[0]]?t=e.url._bindAdd(arguments[0],arguments[1]):"object"==typeof arguments[1]?(t=arguments[1],t.url=arguments[0]):t={url:arguments[0]},"object"==typeof arguments[1]&&(n=arguments[2])),t.query&&t.path?t.url=""+s+"/"+t.path+"?"+t.query:(t.query&&!t.path&&(t.url=""+s+"?"+t.query),t.path&&!t.query&&(t.url=""+s+"/"+t.path))),r(t,n)}}(),function(t){return t.add=function(e){return this[e.name]=function(){return e.url},this},t.set=function(t){return e.environment=t,this},t.remove=function(e){return delete this[e],this}}(e.endpoint),function(t){return t._URLS={},t._getQuery=function(e){var t,n,r,s,u,i,a,o,l,c;for(c=new Url,l=["protocol","path","host","port","hash"],u=0,a=l.length;a>u;u++)n=l[u],c[n]="";for(t=i=0,o=e.length;o>i;t=i+=2)r=e[t],c.query[r]=e[t+1];return s=c.toString(),"?"===s.charAt(0)&&(s=s.substring(1)),s},t._bindAdd=function(e,t){var n,r,s,u;if(null==t&&(t=void 0),null!=t){for(u=["headers","method","protocol","path","query","send","async","datatype","contenttype"],r=0,s=u.length;s>r;r++)n=u[r],null!=t[n]&&(this._URLS[e][n]=t[n]);null!=t.query&&(this._URLS[e].query=this._getQuery(t.query))}return this._URLS[e]},t.add=function(n){var r;return r=n.name,delete n.name,null!=n.query&&(n.query=this._getQuery(n.query)),this._URLS[r]=n,this[r]=e._partial(this._bindAdd,r).bind(t),this},t.remove=function(e){return delete this[e],this}}(e.url),function(t){return t._init=function(){var n,r,s,u,i,a,o,l;for(a=Object.keys(localStorage),r=0,u=a.length;u>r;r++)n=a[r],this.local[n]=e._partial(this._get,"local",n).bind(t);for(o=Object.keys(sessionStorage),l=[],s=0,i=o.length;i>s;s++)n=o[s],l.push(this.session[n]=e._partial(this._get,"session",n).bind(t));return l},t._storage=function(e){return"local"===e?localStorage:sessionStorage},t._get=function(e,t){var n,r;n=this._storage(e).getItem(t);try{return n=JSON.parse(n)}catch(s){return r=s,n}},t._set=function(n,r,s){return"string"!=typeof s&&(s=JSON.stringify(s)),this._storage(n).setItem(r,s),this[n][r]=e._partial(this._get,n,r).bind(t)},t._clear=function(e,t){return delete this[e][t],this._storage(e).removeItem(t)},t._clearAll=function(e){var t,n,r,s;for(n=Object.keys(this._storage(e)),r=0,s=n.length;s>r;r++)t=n[r],delete this[e][t];return this._storage(e).clear()},t._size=function(e){return this._storage(e).length},t._is=function(e,t){return null!=this._storage(e)[t]},t.local.set=function(t,n){return e._set("local",t,n),this},t.local.clear=function(){var t,n,r;for(n=0,r=arguments.length;r>n;n++)t=arguments[n],e._clear("local",t);return this},t.local.clearAll=function(){return e._clearAll("local"),this},t.local.size=function(){return e._size("local")},t.local.isAvailable=function(t){return e._is("local",t)},t.session.get=function(){return e._get("session","session")},t.session.set=function(){var t,n;return 1===arguments.length?(n="session",t=arguments[0]):(n=arguments[0],t=arguments[1]),e._set("session",n,t),this},t.session.clear=function(){var t,n,r;if(0===arguments.length)e._clear("session","session");else for(n=0,r=arguments.length;r>n;n++)t=arguments[n],e._clear("session",t);return this},t.session.clearAll=function(){return e._clearAll("session"),this},t.session.size=function(){return e._size("session")},t.session.isAvailable=function(){var t;return t=0===arguments.length?"session":arguments[0],e._is("session",t)},e._init()}(e)}).call(this);