/**
 * Represents a 2D point with x and y coordinates.
 * @class
 */
class XY {
  /**
   * Creates a new XY instance.
   * @param {number} x - The x coordinate. Default is 0.
   * @param {number} y - The y coordinate. Default is 0.
   */
  constructor(x = 0, y = 0) {
    // Ensure both x and y are numbers, throw a TypeError if not
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new TypeError('Both x and y must be numbers');
    }

    // Set the x and y properties of the instance
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
    // Ensure str is a string, throw a TypeError if not
    if (typeof str !== 'string') {
      throw new TypeError('str must be a string');
    }

    // Split the string into an array of substrings by the comma separator,
    // then map the array to a new array of numbers by parsing each substring
    const numbers = str.split(',').map(Number);

    // Check if the array has the correct length and all elements are numbers,
    // throw an Error if not
    if (numbers.length !== 2 || typeof numbers[0] !== 'number' || typeof numbers[1] !== 'number') {
      throw new Error('str must be in the format "x,y"');
    }

    // Create a new XY instance with the parsed x and y values and return it
    return new this(numbers[0], numbers[1]);
  }

  /**
   * Clones the XY instance.
   * @returns {XY} The cloned XY instance.

