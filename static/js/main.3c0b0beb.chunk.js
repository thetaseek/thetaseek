(this.webpackJsonpthetaseek=this.webpackJsonpthetaseek||[]).push([[0],{177:function(e,n,t){"use strict";t.r(n);var o=t(0),c=t.n(o),r=t(16),i=t.n(r),a=(t(66),t(67),t(3)),s=t(5),u=Object(s.b)({name:"websocket",initialState:{isOpen:!1},reducers:{open:function(e){e.isOpen=!0},close:function(e){e.isOpen=!1}}}),l=u.actions,d=function(e){return e.websocket.isOpen},m=u.reducer;function p(){var e=Object(a.c)(d);return c.a.createElement("div",null,"Connection Status: ",e?"Open":"Closed")}var f=t(60),b=t(54),v=t.n(b),h=t(55),E=t.n(h),g=Object(s.b)({name:"tickers",initialState:{tickers:{}},reducers:{update:function(e,n){var t=n.payload;e.tickers[t.instrumentName]=t}}}),S=g.actions,k=g.reducer,y=t(30),O=t.n(y),w=t(1),N=t.n(w),A=t(56),C=t.n(A),L=t(57),T=t.n(L),W=t(58),I=t.n(W),j=t(59),D=t.n(j),R=function e(n){return I()(n)?D()(n,(function(n,t,o){return n[T()(o)]=e(t),n}),{}):N()(n)?n.map((function(n){return e(n)})):n},x=new C.a("wss://www.deribit.com/ws/api/v2",null,{automaticOpen:!1});!function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:function(){},t=null,o=1e4,c=2e3,r=function(){clearTimeout(t),t=setTimeout((function(){return console.warn("Connection is stale, no message received in ".concat(o/1e3," seconds")),n()}),o+c)};e.addEventListener("open",(function(){e.send(JSON.stringify({method:"public/set_heartbeat",params:{interval:Math.max(parseInt(o/1e3,10),10)},jsonrpc:"2.0",id:Date.now()}))})),e.addEventListener("close",(function(){clearTimeout(t)})),e.addEventListener("message",(function(n){r();var t=JSON.parse(n.data);"heartbeat"===t.method&&"test_request"===t.params.type&&e.send(JSON.stringify({method:"public/test",params:{},jsonrpc:"2.0",id:Date.now()}))}))}(x,x.refresh);var J={};x.addEventListener("open",(function(e){x.send(JSON.stringify({method:"public/subscribe",params:{channels:Object.keys(J)},jsonrpc:"2.0",id:Date.now()}))})),x.addEventListener("message",(function(e){var n=JSON.parse(e.data);if("subscription"===n.method){var t=n.params,o=t.channel,c=t.data;J[o]?J[o](R(c)):console.log("Ignoring subscription: ",o)}}));var P=x,B=Object(s.b)({name:"instruments",initialState:{instruments:[]},reducers:{success:function(e,n){var t=n.payload;e.instruments=t}}}),G=function(){return function(e){(function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.timeout,o=void 0===t?1e4:t;return new Promise((function(n,t){var c=setTimeout(t,o,new Error("Call timed out")),r=Date.now(),i=JSON.stringify({method:e.method,params:e.params,jsonrpc:"2.0",id:r});1===x.readyState?x.send(i):x.addEventListener("open",(function(){return x.send(i)}),{once:!0}),x.addEventListener("message",(function e(t){var o=JSON.parse(t.data);if(o.id===r)return x.removeEventListener("message",e),clearTimeout(c),n(o)}))}))})({method:"public/get_instruments",params:{currency:"BTC",kind:"option",expired:!1}}).then((function(e){return e.result})).then(R).then((function(n){return e(B.actions.success(n))}))}},M=function(e){return e.instruments.instruments},_=B.reducer,z=function(e){var n,t=e.instrumentName,o=(n=t,function(e){return e.tickers.tickers[n]||{}}),r=Object(a.c)(o);return c.a.createElement(c.a.Fragment,null,c.a.createElement("td",null,r.bestBidAmount||"-"),c.a.createElement("td",null,r.bestBidPrice||"-"),c.a.createElement("td",null,r.bestAskPrice||"-"),c.a.createElement("td",null,r.bestAskAmount||"-"))};function q(){var e=Object(a.b)(),n=Object(a.c)(M),t=Math.min.apply(Math,Object(f.a)(n.map((function(e){return e.expirationTimestamp})))),o=n.filter((function(e){return e.expirationTimestamp===t})),r=v()(o,"strike");return c.a.useEffect((function(){e(G())}),[e]),c.a.useEffect((function(){if(o.length>0){var n=o.map((function(e){return"ticker.".concat(e.instrumentName,".raw")}));return function(e,n){var t=O()(e);t.forEach((function(e,t){J[e]=N()(n)?n[t]:n})),x.send(JSON.stringify({method:"public/subscribe",params:{channels:t},jsonrpc:"2.0",id:Date.now()}))}(n,(function(n){return e(S.update(n))})),function(){return function(e){var n=O()(e);n.forEach((function(e){delete n[e]})),x.send(JSON.stringify({method:"public/unsubscribe",params:{channels:n},jsonrpc:"2.0",id:Date.now()}))}(n)}}return function(){}}),[e,o]),c.a.createElement("div",null,c.a.createElement("h6",null,new Date(t).toUTCString()),c.a.createElement("table",{cellPadding:"10"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",null,"Size"),c.a.createElement("th",null,"Bid"),c.a.createElement("th",null,"Ask"),c.a.createElement("th",null,"Size"),c.a.createElement("th",null,"Strike"),c.a.createElement("th",null,"Size"),c.a.createElement("th",null,"Bid"),c.a.createElement("th",null,"Ask"),c.a.createElement("th",null,"Size"))),c.a.createElement("tbody",null,E()(r,(function(e,n){var t=e.find((function(e){return"call"===e.optionType})).instrumentName,o=e.find((function(e){return"put"===e.optionType})).instrumentName;return c.a.createElement("tr",{key:n},c.a.createElement(z,{instrumentName:t}),c.a.createElement("td",null," ".concat(n," ")),c.a.createElement(z,{instrumentName:o}))})))))}var F=function(){var e=Object(a.b)();return c.a.useEffect((function(){return P.open(),P.addEventListener("open",(function(){e(l.open()),console.debug("Connection to Deribit opened")})),P.addEventListener("close",(function(){e(l.close()),console.debug("Connection to Deribit closed")}),{once:!0}),function(){console.log("Closing connection to Deribit"),P.close()}}),[e]),c.a.createElement("div",{className:"App"},c.a.createElement("header",{className:"App-header"},c.a.createElement(p,null),c.a.createElement(q,null)))},U=Object(s.a)({reducer:{instruments:_,tickers:k,websocket:m}});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(a.a,{store:U},c.a.createElement(F,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},56:function(e,n,t){var o,c,r;c=[],void 0===(r="function"===typeof(o=function(){if("WebSocket"in window)return e.prototype.onopen=function(e){},e.prototype.onclose=function(e){},e.prototype.onconnecting=function(e){},e.prototype.onmessage=function(e){},e.prototype.onerror=function(e){},e.debugAll=!1,e.CONNECTING=WebSocket.CONNECTING,e.OPEN=WebSocket.OPEN,e.CLOSING=WebSocket.CLOSING,e.CLOSED=WebSocket.CLOSED,e;function e(n,t,o){var c={debug:!1,automaticOpen:!0,reconnectInterval:1e3,maxReconnectInterval:3e4,reconnectDecay:1.5,timeoutInterval:2e3,maxReconnectAttempts:null,binaryType:"blob"};for(var r in o||(o={}),c)"undefined"!==typeof o[r]?this[r]=o[r]:this[r]=c[r];this.url=n,this.reconnectAttempts=0,this.readyState=WebSocket.CONNECTING,this.protocol=null;var i,a=this,s=!1,u=!1,l=document.createElement("div");function d(e,n){var t=document.createEvent("CustomEvent");return t.initCustomEvent(e,!1,!1,n),t}l.addEventListener("open",(function(e){a.onopen(e)})),l.addEventListener("close",(function(e){a.onclose(e)})),l.addEventListener("connecting",(function(e){a.onconnecting(e)})),l.addEventListener("message",(function(e){a.onmessage(e)})),l.addEventListener("error",(function(e){a.onerror(e)})),this.addEventListener=l.addEventListener.bind(l),this.removeEventListener=l.removeEventListener.bind(l),this.dispatchEvent=l.dispatchEvent.bind(l),this.open=function(n){if((i=new WebSocket(a.url,t||[])).binaryType=this.binaryType,n){if(this.maxReconnectAttempts&&this.reconnectAttempts>this.maxReconnectAttempts)return}else l.dispatchEvent(d("connecting")),this.reconnectAttempts=0;(a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","attempt-connect",a.url);var o=i,c=setTimeout((function(){(a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","connection-timeout",a.url),u=!0,o.close(),u=!1}),a.timeoutInterval);i.onopen=function(t){clearTimeout(c),(a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","onopen",a.url),a.protocol=i.protocol,a.readyState=WebSocket.OPEN,a.reconnectAttempts=0;var o=d("open");o.isReconnect=n,n=!1,l.dispatchEvent(o)},i.onclose=function(t){if(clearTimeout(c),i=null,s)a.readyState=WebSocket.CLOSED,l.dispatchEvent(d("close"));else{a.readyState=WebSocket.CONNECTING;var o=d("connecting");o.code=t.code,o.reason=t.reason,o.wasClean=t.wasClean,l.dispatchEvent(o),n||u||((a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","onclose",a.url),l.dispatchEvent(d("close")));var c=a.reconnectInterval*Math.pow(a.reconnectDecay,a.reconnectAttempts);setTimeout((function(){a.reconnectAttempts++,a.open(!0)}),c>a.maxReconnectInterval?a.maxReconnectInterval:c)}},i.onmessage=function(n){(a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","onmessage",a.url,n.data);var t=d("message");t.data=n.data,l.dispatchEvent(t)},i.onerror=function(n){(a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","onerror",a.url,n),l.dispatchEvent(d("error"))}},1==this.automaticOpen&&this.open(!1),this.send=function(n){if(i)return(a.debug||e.debugAll)&&console.debug("ReconnectingWebSocket","send",a.url,n),i.send(n);throw"INVALID_STATE_ERR : Pausing to reconnect websocket"},this.close=function(e,n){"undefined"==typeof e&&(e=1e3),s=!0,i&&i.close(e,n)},this.refresh=function(){i&&i.close()}}})?o.apply(n,c):o)||(e.exports=r)},61:function(e,n,t){e.exports=t(177)},66:function(e,n,t){},67:function(e,n,t){}},[[61,1,2]]]);
//# sourceMappingURL=main.3c0b0beb.chunk.js.map