/**
 * parrotjs - Client library to connect your frontend application with whatever API backend
 * @version v0.11.06
 * @link    http://github.com/sailor/parrotjs
 * @author  Kiko Beats (https://github.com/Kikobeats)
 * @license MIT
 */
(function(){"use strict";var e;e=this.parrot={version:"0.11.06",environment:"development",language:window.navigator.language.slice(0,2),initialize:{},endpoint:{},url:{},store:{local:{},session:{}},$:"undefined"!=typeof $$&&null!==$$?$$:$},function(){return e._DEFAULT={METHOD:"get",SEND:{},HEADERS:{},ASYNC:!0,DATATYPE:"json",CONTENT_TYPE:"application/x-www-form-urlencoded"},e._partial=function(e){var t;return t=Array.prototype.slice.call(arguments,1),function(){var r;return r=t.concat(Array.prototype.slice.call(arguments)),e.apply(this,r)}},e._createAjaxPromise=function(t){return new Promise(function(r){return function(n,s){return e.$.ajax({url:t.url,type:t.method||r._DEFAULT.METHOD,data:t.send||r._DEFAULT.SEND,dataType:t.datatype||r._DEFAULT.DATATYPE,contentType:t.contenttype||r._DEFAULT.CONTENT_TYPE,async:t.async||r._DEFAULT.ASYNC,headers:t.headers||r._DEFAULT.HEADERS,success:function(e){return 0===e.status?s({code:0,message:{errors:[{param:"url",msg:"Server Unavailable."}]}}):n(e)},error:function(e,t){var r;if(t="object"==typeof e?e:t,null!=t.responseJSON)r=t.responseJSON;else try{r=JSON.parse(t.response)}catch(n){r=t.response}return s({code:t.status,message:r})}})}}(this))},e.ajax=function(t,r){var n,s;return s=""+e.endpoint[e.environment](),n=function(e){return function(t,r){return e._createAjaxPromise(t).then(function(e){return r(null,e)},function(e){return r(e,null)})}}(this),t.url?t.url!==s&&t.url!==""+s+"/"+t.path&&t.url!==""+s+"?"+t.query&&t.url!==""+s+"/"+t.path+"?"+t.query&&(null!=t.path&&(t.url=""+t.url+"/"+t.path),null!=t.query&&(t.url=""+t.url+"?"+t.query)):("string"==typeof arguments[0]&&(null!=e.url._URLS[arguments[0]]?t=e.url._bindAdd(arguments[0],arguments[1]):"object"==typeof arguments[1]?(t=arguments[1],t.url=arguments[0]):t={url:arguments[0]},"object"==typeof arguments[1]&&(r=arguments[2])),t.query&&t.path?t.url=""+s+"/"+t.path+"?"+t.query:(t.query&&!t.path&&(t.url=""+s+"?"+t.query),t.path&&!t.query&&(t.url=""+s+"/"+t.path))),n(t,r)}}(),function(t){return t.add=function(e){return this[e.name]=function(){return e.url},this},t.set=function(t){return e.environment=t,this},t.remove=function(e){return delete this[e],this}}(e.endpoint),function(t){return t._URLS={},t._getQuery=function(e){var t,r,n,s,u,o,i,a,l,c;for(c=new Url,l=["protocol","path","host","port","hash"],u=0,i=l.length;i>u;u++)r=l[u],c[r]="";for(t=o=0,a=e.length;a>o;t=o+=2)n=e[t],c.query[n]=e[t+1];return s=c.toString(),"?"===s.charAt(0)&&(s=s.substring(1)),s},t._bindAdd=function(e,t){var r,n,s,u;if(null==t&&(t=void 0),null!=t){for(u=["headers","method","protocol","path","query","send","async","datatype","contenttype"],n=0,s=u.length;s>n;n++)r=u[n],null!=t[r]&&(this._URLS[e][r]=t[r]);null!=t.query&&(this._URLS[e].query=this._getQuery(t.query))}return this._URLS[e]},t.add=function(r){var n;return n=r.name,delete r.name,null!=r.query&&(r.query=this._getQuery(r.query)),this._URLS[n]=r,this[n]=e._partial(this._bindAdd,n).bind(t),this},t.remove=function(e){return delete this[e],this}}(e.url),function(t){return t._init=function(){var r,n,s,u,o,i,a,l;for(i=Object.keys(localStorage),n=0,u=i.length;u>n;n++)r=i[n],this.local[r]=e._partial(this._get,"local",r).bind(t);for(a=Object.keys(sessionStorage),l=[],s=0,o=a.length;o>s;s++)r=a[s],l.push(this.session[r]=e._partial(this._get,"session",r).bind(t));return l},t._storage=function(e){return"local"===e?localStorage:sessionStorage},t._get=function(e,t){var r,n;r=this._storage(e).getItem(t);try{return r=JSON.parse(r)}catch(s){return n=s,r}},t._set=function(r,n,s){return"string"!=typeof s&&(s=JSON.stringify(s)),this._storage(r).setItem(n,s),this[r][n]=e._partial(this._get,r,n).bind(t)},t._clear=function(e,t){return delete this[e][t],this._storage(e).removeItem(t)},t._clearAll=function(e){var t,r,n,s;for(r=Object.keys(this._storage(e)),n=0,s=r.length;s>n;n++)t=r[n],delete this[e][t];return this._storage(e).clear()},t._size=function(e){return this._storage(e).length},t._is=function(e,t){return null!=this._storage(e)[t]?!0:!1},t.local.set=function(t,r){return e.store._set("local",t,r),this},t.local.clear=function(t){return e.store._clear("local",t),this},t.local.clearAll=function(){return e.store._clearAll("local"),this},t.local.size=function(){return e.store._size("local")},t.local.isAvailable=function(t){return e.store._is("local",t)},t.session.get=function(){return e.store._get("session","session")},t.session.set=function(){var t,r;return 1===arguments.length?(r="session",t=arguments[0]):(r=arguments[0],t=arguments[1]),e.store._set("session",r,t),this},t.session.clear=function(){var t;return t=0===arguments.length?"session":arguments[0],e.store._clear("session",t),this},t.session.clearAll=function(){return e.store._clearAll("session"),this},t.session.size=function(){return e.store._size("session")},t.session.isAvailable=function(){var t;return t=0===arguments.length?"session":arguments[0],e.store._is("session",t)},e.store._init()}(e.store)}).call(this);