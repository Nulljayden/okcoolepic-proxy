function checkClassListSupport() {
  // Check if classList is supported in the documentElement
  if (!("classList" in document.documentElement) && window.Element) {
    (function() {
      // Create helper variables and functions
      var prototype = Array.prototype,
        indexOf = prototype.indexOf,
        slice = prototype.slice,
        push = prototype.push,
        splice = prototype.splice,
        join = prototype.join;

      // Define DOMTokenList constructor
      function DOMTokenList(elm) {
        this._element = elm;
        this._classCache = elm.className;

        if (!this._classCache) { return; }

        var classes = this._classCache.replace(/^\s+|\s+$/g, '').split(/\s+/);
        for (var i = 0; i < classes.length; i++) {
          push.call(this, classes[i]);
        }
      }

      // Define setToClassName function
      function setToClassName(el, classes) {
        el.className = classes.join(" ");
      }

      // Define DOMTokenList prototype methods
      DOMTokenList.prototype = {
        add: function(token) {
          if (this.contains(token)) { return; }
          push.call(this, token);
          setToClassName(this._element, slice.call(this, 0));
        },
        contains: function(token) {
          return (indexOf.call(this, token) != -1);
        },
        item: function(index) {
          return this[index] || null;
        },
        remove: function(token) {
          var i = indexOf.call(this, token);
          if (i == -1) { return; }
          splice.call(this, i, 1);
          setToClassName(this._element, slice.call(this, 0));
        },
        toString: function() {
          return join.call(this, " ");
        },
        toggle: function(token) {
          if (indexOf.call(this, token) == -1) {
            this.add(token);
            return true;
          } else {
            this.remove(token);
            return false;
          }
        }
      };

      // Define Element prototype getter for classList
      function defineElementGetter(obj, prop, getter) {
        if (Object.defineProperty) {
          Object.defineProperty(obj, prop, {
            get: getter
          });
        } else {
          obj.__defineGetter__(prop, getter);
        }
      }

      defineElementGetter(Element.prototype, "classList", function() {
        return new DOMTokenList(this);
      });
    })();
  }
}

// Define SVGElement classList property
(function() {
  if (!window.SVGElement) { return; }
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  if (!("classList" in svg)) {
    var d = Object.getOwnPropertyDescriptor(HTMLElement.prototype, "classList");
    Object.defineProperty(SVGElement.prototype, "classList", d);
  }
})();

// Define additional classList methods and toggle behavior
(function() {
  var testElement = document.createElement("_");

  testElement.classList.add("c1", "c2");

  // Add createMethod function to support multiple arguments
  if (!testElement.classList.contains("c2")) {
    function createMethod(method) {
      var original = DOMTokenList.prototype[method];

      DOMTokenList.prototype[method] = function(token) {
        var i, len = arguments.length;

        for (i = 0; i < len; i++) {
          token = arguments[i];
          original.call(this, token);
        }
      };
    }
    createMethod("add");
    createMethod("remove");
  }

  testElement.classList.toggle("c3", false);

  // Modify toggle behavior
  if (testElement.classList.contains("c3")) {
    var _toggle = DOMTokenList.prototype.toggle;

    DOMTokenList.prototype.toggle = function(token, force) {
      if (1 in arguments && !this.contains(token) === !force) {
        return force;
      } else {
        return _toggle.call(this, token);
      }
    };
  }

  testElement = null;
})();

// Call checkClassListSupport function
checkClassListSupport();
