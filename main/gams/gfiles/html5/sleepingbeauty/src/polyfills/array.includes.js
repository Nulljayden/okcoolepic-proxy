if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex = 0) {
    'use strict';
    const O = Object(this);
    const len = O.length >>> 0;
    if (len === 0) {
      return false;
    }
    const n = fromIndex | 0;
    const k = n >= 0 ? n : len - Math.abs(n);
    for (; k < len; k++) {
      if (O[k] === searchElement) {
        return true;
      }
    }
    return false;
  };
}

// Additional polyfill for handling NaN comparisons
Number.prototype.isNaN = function() {
  return this !== this;
};

if (!Array.prototype.includesNaN) {
  Array.prototype.includesNaN = function() {
    return this.some(el => el !== el);
  };
}
