import{E as I,s as R,f as q,P as U}from"./index-f54a1fc2.js";var D=globalThis&&globalThis.__extends||function(){var s=function(i,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},s(i,e)};return function(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");s(i,e);function t(){this.constructor=i}i.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}}(),W=function(s){D(i,s);function i(){return s!==null&&s.apply(this,arguments)||this}return i}(I),M=R.Buffer;function z(s){if(s.length>=255)throw new TypeError("Alphabet too long");for(var i=new Uint8Array(256),e=0;e<i.length;e++)i[e]=255;for(var t=0;t<s.length;t++){var r=s.charAt(t),n=r.charCodeAt(0);if(i[n]!==255)throw new TypeError(r+" is ambiguous");i[n]=t}var c=s.length,l=s.charAt(0),u=Math.log(c)/Math.log(256),o=Math.log(256)/Math.log(c);function a(f){if((Array.isArray(f)||f instanceof Uint8Array)&&(f=M.from(f)),!M.isBuffer(f))throw new TypeError("Expected Buffer");if(f.length===0)return"";for(var d=0,m=0,v=0,w=f.length;v!==w&&f[v]===0;)v++,d++;for(var y=(w-v)*o+1>>>0,p=new Uint8Array(y);v!==w;){for(var b=f[v],A=0,_=y-1;(b!==0||A<m)&&_!==-1;_--,A++)b+=256*p[_]>>>0,p[_]=b%c>>>0,b=b/c>>>0;if(b!==0)throw new Error("Non-zero carry");m=A,v++}for(var g=y-m;g!==y&&p[g]===0;)g++;for(var S=l.repeat(d);g<y;++g)S+=s.charAt(p[g]);return S}function h(f){if(typeof f!="string")throw new TypeError("Expected String");if(f.length===0)return M.alloc(0);for(var d=0,m=0,v=0;f[d]===l;)m++,d++;for(var w=(f.length-d)*u+1>>>0,y=new Uint8Array(w);f[d];){var p=i[f.charCodeAt(d)];if(p===255)return;for(var b=0,A=w-1;(p!==0||b<v)&&A!==-1;A--,b++)p+=c*y[A]>>>0,y[A]=p%256>>>0,p=p/256>>>0;if(p!==0)throw new Error("Non-zero carry");v=b,d++}for(var _=w-v;_!==w&&y[_]===0;)_++;var g=M.allocUnsafe(m+(w-_));g.fill(0,0,m);for(var S=m;_!==w;)g[S++]=y[_++];return g}function C(f){var d=h(f);if(d)return d;throw new Error("Non-base"+c+" character")}return{encode:a,decodeUnsafe:h,decode:C}}var $=z,H=$,L="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",B=H(L);const j=q(B);var T=globalThis&&globalThis.__awaiter||function(s,i,e,t){function r(n){return n instanceof e?n:new e(function(c){c(n)})}return new(e||(e=Promise))(function(n,c){function l(a){try{o(t.next(a))}catch(h){c(h)}}function u(a){try{o(t.throw(a))}catch(h){c(h)}}function o(a){a.done?n(a.value):r(a.value).then(l,u)}o((t=t.apply(s,i||[])).next())})};class F extends I{constructor(i,e){if(super(),this._network=e,this._publicKey=null,this._popup=null,this._handlerAdded=!1,this._nextRequestId=1,this._autoApprove=!1,this._responsePromises=new Map,this.handleMessage=t=>{var r;if(this._injectedProvider&&t.source===window||t.origin===((r=this._providerUrl)===null||r===void 0?void 0:r.origin)&&t.source===this._popup){if(t.data.method==="connected"){const n=new U(t.data.params.publicKey);(!this._publicKey||!this._publicKey.equals(n))&&(this._publicKey&&!this._publicKey.equals(n)&&this.handleDisconnect(),this._publicKey=n,this._autoApprove=!!t.data.params.autoApprove,this.emit("connect",this._publicKey))}else if(t.data.method==="disconnected")this.handleDisconnect();else if(t.data.result||t.data.error){const n=this._responsePromises.get(t.data.id);if(n){const[c,l]=n;t.data.result?c(t.data.result):l(new Error(t.data.error))}}}},this._beforeUnload=()=>{this.disconnect()},N(i))this._injectedProvider=i;else if(G(i))this._providerUrl=new URL(i),this._providerUrl.hash=new URLSearchParams({origin:window.location.origin,network:this._network}).toString();else throw new Error("provider parameter must be an injected provider or a URL string.")}handleConnect(){var i;return this._handlerAdded||(this._handlerAdded=!0,window.addEventListener("message",this.handleMessage),window.addEventListener("beforeunload",this._beforeUnload)),this._injectedProvider?new Promise(e=>{this.sendRequest("connect",{}),e()}):(window.name="parent",this._popup=window.open((i=this._providerUrl)===null||i===void 0?void 0:i.toString(),"_blank","location,resizable,width=460,height=675"),new Promise(e=>{this.once("connect",e)}))}handleDisconnect(){this._handlerAdded&&(this._handlerAdded=!1,window.removeEventListener("message",this.handleMessage),window.removeEventListener("beforeunload",this._beforeUnload)),this._publicKey&&(this._publicKey=null,this.emit("disconnect")),this._responsePromises.forEach(([,i],e)=>{this._responsePromises.delete(e),i(new Error("Wallet disconnected"))})}sendRequest(i,e){return T(this,void 0,void 0,function*(){if(i!=="connect"&&!this.connected)throw new Error("Wallet not connected");const t=this._nextRequestId;return++this._nextRequestId,new Promise((r,n)=>{var c,l,u,o;this._responsePromises.set(t,[r,n]),this._injectedProvider?this._injectedProvider.postMessage({jsonrpc:"2.0",id:t,method:i,params:Object.assign({network:this._network},e)}):((c=this._popup)===null||c===void 0||c.postMessage({jsonrpc:"2.0",id:t,method:i,params:e},(u=(l=this._providerUrl)===null||l===void 0?void 0:l.origin)!==null&&u!==void 0?u:""),this.autoApprove||(o=this._popup)===null||o===void 0||o.focus())})})}get publicKey(){return this._publicKey}get connected(){return this._publicKey!==null}get autoApprove(){return this._autoApprove}connect(){return T(this,void 0,void 0,function*(){this._popup&&this._popup.close(),yield this.handleConnect()})}disconnect(){return T(this,void 0,void 0,function*(){this._injectedProvider&&(yield this.sendRequest("disconnect",{})),this._popup&&this._popup.close(),this.handleDisconnect()})}sign(i,e){return T(this,void 0,void 0,function*(){if(!(i instanceof Uint8Array))throw new Error("Data must be an instance of Uint8Array");const t=yield this.sendRequest("sign",{data:i,display:e}),r=j.decode(t.signature),n=new U(t.publicKey);return{signature:r,publicKey:n}})}signTransaction(i){return T(this,void 0,void 0,function*(){const e=yield this.sendRequest("signTransaction",{message:j.encode(i.serializeMessage())}),t=j.decode(e.signature),r=new U(e.publicKey);return i.addSignature(r,t),i})}signAllTransactions(i){return T(this,void 0,void 0,function*(){const e=yield this.sendRequest("signAllTransactions",{messages:i.map(n=>j.encode(n.serializeMessage()))}),t=e.signatures.map(n=>j.decode(n)),r=new U(e.publicKey);return i=i.map((n,c)=>(n.addSignature(r,t[c]),n)),i})}diffieHellman(i){return T(this,void 0,void 0,function*(){if(!(i instanceof Uint8Array))throw new Error("Data must be an instance of Uint8Array");return yield this.sendRequest("diffieHellman",{publicKey:i})})}}function G(s){return typeof s=="string"}function N(s){return J(s)&&"postMessage"in s&&typeof s.postMessage=="function"}function J(s){return typeof s=="object"&&s!==null}var Q=globalThis&&globalThis.__extends||function(){var s=function(i,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},s(i,e)};return function(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");s(i,e);function t(){this.constructor=i}i.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}}(),O=globalThis&&globalThis.__awaiter||function(s,i,e,t){function r(n){return n instanceof e?n:new e(function(c){c(n)})}return new(e||(e=Promise))(function(n,c){function l(a){try{o(t.next(a))}catch(h){c(h)}}function u(a){try{o(t.throw(a))}catch(h){c(h)}}function o(a){a.done?n(a.value):r(a.value).then(l,u)}o((t=t.apply(s,i||[])).next())})},k=globalThis&&globalThis.__generator||function(s,i){var e={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},t,r,n,c;return c={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function l(o){return function(a){return u([o,a])}}function u(o){if(t)throw new TypeError("Generator is already executing.");for(;e;)try{if(t=1,r&&(n=o[0]&2?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[o[0]&2,n.value]),o[0]){case 0:case 1:n=o;break;case 4:return e.label++,{value:o[1],done:!1};case 5:e.label++,r=o[1],o=[0];continue;case 7:o=e.ops.pop(),e.trys.pop();continue;default:if(n=e.trys,!(n=n.length>0&&n[n.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!n||o[1]>n[0]&&o[1]<n[3])){e.label=o[1];break}if(o[0]===6&&e.label<n[1]){e.label=n[1],n=o;break}if(n&&e.label<n[2]){e.label=n[2],e.ops.push(o);break}n[2]&&e.ops.pop(),e.trys.pop();continue}o=i.call(s,e)}catch(a){o=[6,a],r=0}finally{t=n=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}},V=function(s){Q(i,s);function i(e,t){var r=s.call(this)||this;return r._instance=null,r._handleConnect=function(){r.emit("connect")},r._handleDisconnect=function(){window.clearInterval(r._pollTimer),r.emit("disconnect")},r._provider=e,r._network=t,r}return Object.defineProperty(i.prototype,"publicKey",{get:function(){return this._instance.publicKey||null},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"connected",{get:function(){return this._instance.connected||!1},enumerable:!1,configurable:!0}),i.prototype.connect=function(){return O(this,void 0,void 0,function(){var e=this;return k(this,function(t){switch(t.label){case 0:return this._instance=new F(this._provider,this._network),this._instance.on("connect",this._handleConnect),this._instance.on("disconnect",this._handleDisconnect),this._pollTimer=window.setInterval(function(){var r,n;((n=(r=e._instance)===null||r===void 0?void 0:r._popup)===null||n===void 0?void 0:n.closed)!==!1&&e._handleDisconnect()},200),[4,this._instance.connect()];case 1:return t.sent(),[2]}})})},i.prototype.disconnect=function(){return O(this,void 0,void 0,function(){return k(this,function(e){switch(e.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return this._instance.removeAllListeners("connect"),this._instance.removeAllListeners("disconnect"),[4,this._instance.disconnect()];case 1:return e.sent(),[2]}})})},i.prototype.signTransaction=function(e){return O(this,void 0,void 0,function(){return k(this,function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._instance.signTransaction(e)];case 1:return[2,t.sent()]}})})},i.prototype.signAllTransactions=function(e){return O(this,void 0,void 0,function(){return k(this,function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._instance.signAllTransactions(e)];case 1:return[2,t.sent()]}})})},i.prototype.signMessage=function(e,t){return t===void 0&&(t="hex"),O(this,void 0,void 0,function(){var r;return k(this,function(n){switch(n.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._instance.sign(e,t)];case 1:return r=n.sent().signature,[2,Uint8Array.from(r)]}})})},i}(W),X=globalThis&&globalThis.__extends||function(){var s=function(i,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},s(i,e)};return function(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");s(i,e);function t(){this.constructor=i}i.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}}(),K=globalThis&&globalThis.__awaiter||function(s,i,e,t){function r(n){return n instanceof e?n:new e(function(c){c(n)})}return new(e||(e=Promise))(function(n,c){function l(a){try{o(t.next(a))}catch(h){c(h)}}function u(a){try{o(t.throw(a))}catch(h){c(h)}}function o(a){a.done?n(a.value):r(a.value).then(l,u)}o((t=t.apply(s,i||[])).next())})},P=globalThis&&globalThis.__generator||function(s,i){var e={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},t,r,n,c;return c={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function l(o){return function(a){return u([o,a])}}function u(o){if(t)throw new TypeError("Generator is already executing.");for(;e;)try{if(t=1,r&&(n=o[0]&2?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[o[0]&2,n.value]),o[0]){case 0:case 1:n=o;break;case 4:return e.label++,{value:o[1],done:!1};case 5:e.label++,r=o[1],o=[0];continue;case 7:o=e.ops.pop(),e.trys.pop();continue;default:if(n=e.trys,!(n=n.length>0&&n[n.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!n||o[1]>n[0]&&o[1]<n[3])){e.label=o[1];break}if(o[0]===6&&e.label<n[1]){e.label=n[1],n=o;break}if(n&&e.label<n[2]){e.label=n[2],e.ops.push(o);break}n[2]&&e.ops.pop(),e.trys.pop();continue}o=i.call(s,e)}catch(a){o=[6,a],r=0}finally{t=n=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}},Y=function(s){X(i,s);function i(e,t){var r=s.call(this)||this;return r._provider=e,r._network=t,r}return Object.defineProperty(i.prototype,"publicKey",{get:function(){return this._provider.publicKey},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"connected",{get:function(){return this._provider.isConnected},enumerable:!1,configurable:!0}),i.prototype.connect=function(){return K(this,void 0,void 0,function(){var e;return P(this,function(t){switch(t.label){case 0:if(t.trys.push([0,2,,3]),this.connected)throw new Error("Wallet already connected");return[4,this._provider.connect()];case 1:return t.sent(),this.emit("connect"),[3,3];case 2:throw e=t.sent(),this.emit("disconnect"),e;case 3:return[2]}})})},i.prototype.disconnect=function(){return K(this,void 0,void 0,function(){return P(this,function(e){switch(e.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._provider.disconnect()];case 1:return e.sent(),this.emit("disconnect"),[2]}})})},i.prototype.signTransaction=function(e){return K(this,void 0,void 0,function(){return P(this,function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._provider.signTransaction(e,this._network)];case 1:return[2,t.sent()]}})})},i.prototype.signAllTransactions=function(e){return K(this,void 0,void 0,function(){return P(this,function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._provider.signAllTransactions(e,this._network)];case 1:return[2,t.sent()]}})})},i.prototype.signMessage=function(e){return K(this,void 0,void 0,function(){var t;return P(this,function(r){switch(r.label){case 0:if(!this.connected)throw new Error("Wallet not connected");if(!(e instanceof Uint8Array))throw new Error("Data must be an instance of Uint8Array");return[4,this._provider.signMessage(e)];case 1:return t=r.sent().signature,[2,t]}})})},i}(W),Z=globalThis&&globalThis.__extends||function(){var s=function(i,e){return s=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,r){t.__proto__=r}||function(t,r){for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])},s(i,e)};return function(i,e){if(typeof e!="function"&&e!==null)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");s(i,e);function t(){this.constructor=i}i.prototype=e===null?Object.create(e):(t.prototype=e.prototype,new t)}}(),E=globalThis&&globalThis.__awaiter||function(s,i,e,t){function r(n){return n instanceof e?n:new e(function(c){c(n)})}return new(e||(e=Promise))(function(n,c){function l(a){try{o(t.next(a))}catch(h){c(h)}}function u(a){try{o(t.throw(a))}catch(h){c(h)}}function o(a){a.done?n(a.value):r(a.value).then(l,u)}o((t=t.apply(s,i||[])).next())})},x=globalThis&&globalThis.__generator||function(s,i){var e={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},t,r,n,c;return c={next:l(0),throw:l(1),return:l(2)},typeof Symbol=="function"&&(c[Symbol.iterator]=function(){return this}),c;function l(o){return function(a){return u([o,a])}}function u(o){if(t)throw new TypeError("Generator is already executing.");for(;e;)try{if(t=1,r&&(n=o[0]&2?r.return:o[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,o[1])).done)return n;switch(r=0,n&&(o=[o[0]&2,n.value]),o[0]){case 0:case 1:n=o;break;case 4:return e.label++,{value:o[1],done:!1};case 5:e.label++,r=o[1],o=[0];continue;case 7:o=e.ops.pop(),e.trys.pop();continue;default:if(n=e.trys,!(n=n.length>0&&n[n.length-1])&&(o[0]===6||o[0]===2)){e=0;continue}if(o[0]===3&&(!n||o[1]>n[0]&&o[1]<n[3])){e.label=o[1];break}if(o[0]===6&&e.label<n[1]){e.label=n[1],n=o;break}if(n&&e.label<n[2]){e.label=n[2],e.ops.push(o);break}n[2]&&e.ops.pop(),e.trys.pop();continue}o=i.call(s,e)}catch(a){o=[6,a],r=0}finally{t=n=0}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}},te=function(s){Z(i,s);function i(e){var t=s.call(this)||this;return t._network="mainnet-beta",t._adapterInstance=null,t._connectHandler=null,t._connected=function(){t._connectHandler&&(t._connectHandler.resolve(),t._connectHandler=null),t.emit("connect",t.publicKey)},t._disconnected=function(){t._connectHandler&&(t._connectHandler.reject(),t._connectHandler=null),t._adapterInstance=null,t.emit("disconnect")},e!=null&&e.network&&(t._network=e==null?void 0:e.network),e!=null&&e.provider?t._provider=e==null?void 0:e.provider:window.salmon?t._provider=window.salmon:t._provider="https://app.salmonwallet.io",t}return Object.defineProperty(i.prototype,"publicKey",{get:function(){var e;return((e=this._adapterInstance)===null||e===void 0?void 0:e.publicKey)||null},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"isConnected",{get:function(){var e;return!!(!((e=this._adapterInstance)===null||e===void 0)&&e.connected)},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"connected",{get:function(){return this.isConnected},enumerable:!1,configurable:!0}),Object.defineProperty(i.prototype,"autoApprove",{get:function(){return!1},enumerable:!1,configurable:!0}),i.prototype.connect=function(){return E(this,void 0,void 0,function(){var e=this;return x(this,function(t){switch(t.label){case 0:return this.connected?[2]:(typeof this._provider=="string"?this._adapterInstance=new V(this._provider,this._network):this._adapterInstance=new Y(this._provider,this._network),this._adapterInstance.on("connect",this._connected),this._adapterInstance.on("disconnect",this._disconnected),this._adapterInstance.connect(),[4,new Promise(function(r,n){e._connectHandler={resolve:r,reject:n}})]);case 1:return t.sent(),[2]}})})},i.prototype.disconnect=function(){return E(this,void 0,void 0,function(){return x(this,function(e){switch(e.label){case 0:return this._adapterInstance?[4,this._adapterInstance.disconnect()]:[2];case 1:return e.sent(),[2]}})})},i.prototype.signTransaction=function(e){return E(this,void 0,void 0,function(){return x(this,function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._adapterInstance.signTransaction(e)];case 1:return[2,t.sent()]}})})},i.prototype.signAllTransactions=function(e){return E(this,void 0,void 0,function(){return x(this,function(t){switch(t.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._adapterInstance.signAllTransactions(e)];case 1:return[2,t.sent()]}})})},i.prototype.signMessage=function(e,t){return t===void 0&&(t="utf8"),E(this,void 0,void 0,function(){return x(this,function(r){switch(r.label){case 0:if(!this.connected)throw new Error("Wallet not connected");return[4,this._adapterInstance.signMessage(e,t)];case 1:return[2,r.sent()]}})})},i.prototype.sign=function(e,t){return t===void 0&&(t="utf8"),E(this,void 0,void 0,function(){return x(this,function(r){switch(r.label){case 0:return[4,this.signMessage(e,t)];case 1:return[2,r.sent()]}})})},i}(I);export{te as default};
