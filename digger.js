(function () {
  'use strict';
  
  var Digger = (function () {
    function Digger() {}
    Digger.prototype = {
      subscribe: function (evt, obj, method) {
        this._events = this._events || {};
        this._events[evt] = this._events[evt] || [];
        this._events[evt].push({
          obj: obj,
          method: method
        });
      },
      
      publish: function (evt /* args.. */) {
        this._events = this._events || {};
        if (!(evt in this._events)) return false;
        var listeners = this._events[evt];
        for(var e = 0; e < listeners.length; e++){
          var obj = listeners[e].obj,
              func = listeners[e].method;
          obj[func].apply(obj, Array.prototype.slice.call(arguments, 1));
        }
      }
    };
    
    return Digger;
  })();
  
  if( typeof module !== "undefined" && ('exports' in module)){
	module.exports	= Digger;
  }
  else {
    window.Digger = Digger;
  }
})();