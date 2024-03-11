// Import required modules: XY from "util/xy.js", Animation from "./animation.js", and pc from "being/pc.js"
import XY from "util/xy.js";
import Animation from "./animation.js";
import pc from "being/pc.js";

// Define the Board class
class Board {
  // Initialize the board with a 2D array of null values
  constructor() {
    this._data = [];

    for (let i = 0; i < W; i++) {
      let col = [];
      this._data.push(col);

      for (let j = 0; j < H; j++) {
        col.push(null);
      }
    }
  }

  // Randomize the board by setting each cell's value to a random combat option
  randomize() {
    this._data.forEach(col => {
      col.forEach((cell, i) => {
        col[i] = { value: pc.getCombatOption() };
      });
    });

    return this;
  }

  // Get the size of the board as an XY object
  getSize() {
    return new XY(W, H);
  }

  // Get or set the value of a cell at a given xy coordinate
  at(xy) {
    return this._data[xy.x][xy.y];
  }

  set(xy, value) {
    this._data[xy.x][xy.y] = value;
  }

  // Create a clone of the board
  _clone() {
    let clone = new this.constructor();
    clone._data = JSON.parse(JSON.stringify(this._data));
    return clone;
  }

  // Make cells fall down due to gravity
  fall() {
    let animation = new Animation();

    this._data.forEach((col, index) => {
      this._fallColumn(index, animation);
    });

    return animation;
  }

  // Make a single column fall
  _fallColumn(x, animation) {
    let totalFall = 0;
    let col = this._data[x];

    col.forEach((cell, y) => {
      if (cell) {
        if (totalFall == 0) { return; }
        let targetY = y - totalFall;

        col[targetY] = cell;
        col[y] = null;

        animation.add({
          cell,
          from: new XY(x, y),
          to: new XY(x, targetY),
        });
      } else {
        totalFall++;
      }
    });

    // Add new cells at the top of the column
    for (let i = 0; i < totalFall; i++) {
      let cell = { value: pc.getCombatOption() };
      let sourceY = col.length + i;
      let targetY = sourceY - totalFall;
      col[targetY] = cell;

      animation.add({
        cell,
        from: new XY(x, sourceY),
        to: new XY(x, targetY),
      });
    }
  }

  // Find a segment of connected cells with the same value as the given xy coordinate
  findSegment(xy) {
    function is(sxy) {
      return sxy.is(xy);
    }

    return this.getAllSegments().filter(segment => segment.some(is))[0];
  }

  // Get all segments of connected cells with the same value on the board
  getAllSegments() {
    let clone = this._clone();
    let segments = [];
    let xy = new XY();

    for (xy.x = 0; xy.x < W; xy.x++) {
      for (xy.y = 0; xy.y < H; xy.y++) {
        let cell = clone.at(xy);
        if (!cell) { continue; }
        let segment = clone.extractSegment(xy);
        segments.push(segment);
      }
    }

    return segments.sort((a,
