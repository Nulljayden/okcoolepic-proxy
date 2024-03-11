// Production steps of ECMA-262, Edition 6, 22.1.2.1
// Reference: https://people.mozilla.org/~jorendorff/es6-draft.html#sec-array.from
if (!Array.from) {
  Array.from = (function () {
    const toInteger = Number.isFinite ? Number.isFinite : function (value) {
      return typeof value === 'number' && isFinite(value);
    };

    const toLength = function (value) {
      const len = toInteger(value);
      return Math.min(Math.max(len, 0), Math.pow(2, 53) - 1);
    };

    // The length property of the from method is 1.
    return function from(arrayLike/*, mapFn, thisArg */) {
      // 1. Let C be the this value.
      let C = this;

      // 2. Let items be ToObject(arrayLike).
      let items = Object(arrayLike);

      // 3. ReturnIfAbrupt(items).
      if (items == null) {
        throw new TypeError("Array.from requires an array-like object - not null or undefined");
      }

      // 4. If mapfn is undefined, then let mapping be false.
      let mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      let T;
      if (typeof mapFn !== 'undefined') {
        // 5. else      
        // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
        if (typeof mapFn !== 'function') {
          throw new TypeError('Array.from: when provided, the second argument must be a function');
        }

        // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      // 10. Let lenValue be Get(items, "length").
      // 11. Let len be ToLength(lenValue).
      let len = toLength(items.length);

      // 13. If IsConstructor(C) is true, then
      // 13. a. Let A be the result of calling the [[Construct]] internal method of C with an argument list containing the single item len.
      // 14. a. Else, Let A be ArrayCreate(len).
      let isConstructor = typeof C === 'function' && C.prototype;
      let A;
      if (isConstructor) {
        A = new C(len);
      } else {
        A = new Array(len);
      }

      // 16. Let k be 0.
      let k = 0;
      // 17. Repeat, while k < len… (also steps a - h)
      try {
        for (; k < len; k++) {
          const kValue = items[k];
          if (mapFn) {
            A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
          } else {
            A[k] = kValue;
          }
        }

        // 18. Let putStatus be Put(A, "length", len, true).
        A.length = len;

        // 20. Return A.
        return A;
      } catch (e) {
        // 19. If an exception occurs, return undefined.
        return undefined;
      }
    };
  }());
}

