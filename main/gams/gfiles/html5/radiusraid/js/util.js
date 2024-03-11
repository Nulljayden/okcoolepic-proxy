/*==============================================================================
Miscellaneous
==============================================================================*/

// Requests an animation frame
window.requestAnimFrame = (function() {
  return 
    window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame || 
    function(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
})();

/**
 * Utility object
 * @namespace
 */
$.util = {
  /** The mathematical constant pi */
  pi: Math.PI,
  /** The mathematical constant 2π */
  twopi: Math.PI * 2,
  /**
   * Converts degrees to radians
   * @param {number} deg - The angle in degrees
   * @returns {number} The equivalent angle in radians
   */
  toRadians: function(deg) {
    return deg * this.pi / 180;
  },
  /**
   * Clamps a value between a minimum and maximum
   * @param {number} value - The value to clamp
   * @param {number} min - The minimum value
   * @param {number} max - The maximum value
   * @returns {number} The clamped value
   */
  clamp: function(value, min, max) {
    return Math.min(Math.max(value, min), max);
  },
  /**
   * Returns the square of the distance between two points
   * @param {number} p1x - The x-coordinate of the first point
   * @param {number} p1y - The y-coordinate of the first point
   * @param {number} p2x - The x-coordinate of the second point
   * @param {number} p2y - The y-coordinate of the second point
   * @returns {number} The square of the distance between the two points
   */
  distanceSquared: function(p1x, p1y, p2x, p2y) {
    var xDistance = p1x - p2x,
      yDistance = p1y - p2y;
    return xDistance * xDistance + yDistance * yDistance;
  },
  /**
   * Returns a random integer within a given range
   * @param {number} min - The minimum value
   * @param {number} max - The maximum value
   * @returns {number} A random integer within the range [min, max]
   */
  randomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },
  /**
   * Pads a number with leading zeros
   * @param {number|string} amount - The number to pad
   * @param {number} digits - The total number of digits
   * @returns {string} The padded number
   */
  pad: function(amount, digits) {
    amount += '';
    if (amount.length < digits) {
      amount = '0' + amount;
      return this.pad(amount, digits);
    } else {
      return amount;
    }
  },
  /**
   * Converts seconds to a formatted time string
   * @param {number} seconds - The number of seconds
   * @returns {string} The formatted time string
   */
  convertTime: function(seconds) {
    var minutes = Math.floor(seconds / 60);
    var seconds = Math.floor(seconds % 60);
    return this.pad(minutes, 2) + ':' + this.pad(seconds, 2);
  },
  /**
   * Adds commas to a number
   * @param {number|string} nStr - The number to format
   * @returns {string} The formatted number
   */
  commas: function(nStr) {
    nStr += '';
    var x = nStr.split('.'),
      x1 = x[0],
      x2 = x.length > 1 ? '.' + x[1] : '',
      rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
  },
  /**
