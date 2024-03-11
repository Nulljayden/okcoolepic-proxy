/**
 * Represents a 2D point with x and y coordinates.
 * @class
 */
export default class XY {
  /**
   * Creates a new XY instance.
   * @param {number} x - The x coordinate. Default is 0.
   * @param {number} y - The y coordinate. Default is 0.
   */
  constructor(x = 0, y = 0) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new TypeError('Both x and y must be numbers');
    }

    this.x = x;
    this.y = y;
  }

  /**
   * Creates an XY instance from a string in the format "x,y".
   * @param {string} str - The string to parse.
   * @returns {XY} The new XY instance.
   * @static
   */
  static fromString(str) {
    if (typeof str !== 'string') {
      throw new TypeError('str must be a string');
    }

    const numbers = str.split(',').map(Number);
    if (numbers.length !== 2 || typeof numbers[0] !== 'number' || typeof numbers[1] !== 'number') {
      throw new Error('str must be in the format "x,y"');
    }

    return new this(numbers[0], numbers[1]);
  }

  /**
   * Clones the XY instance.
   * @returns {XY} The cloned XY instance.

