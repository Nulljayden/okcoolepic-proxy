// Canvas Asteroids
// Copyright (c) 2010 Doug McInnes

// An object that maps key codes to their corresponding string representation
const KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  70: 'f',
  71: 'g',
  72: 'h',
  77: 'm',
  80: 'p'
};

// An object to track the status of keys (whether they are down or up)
const KEY_STATUS = { keyDown: false };
// Initialize the status of each key in KEY_CODES to false
for (const code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}

// The size of the grid
const GRID_SIZE = 60;

// A class representing a matrix of values
class Matrix {
  // Initialize a new matrix with the given number of rows and columns
  constructor(rows, columns) {
    this.data = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.data[i] = new Array(columns);
    }

    // A method to configure the matrix with a rotation, scale, and translation
    this.configure = (rot, scale, transx, transy) => {
      const rad = (rot * Math.PI) / 180; // Convert the rotation to radians
      const sin = Math.sin(rad) * scale;
      const cos = Math.cos(rad) * scale;
      this.set(cos, -sin, transx, sin, cos, transy);
    };

    // A method to set the values of the matrix
    this.set = (...args) => {
      let k = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          this.data[i][j] = args[k];
          k++;
        }
      }
    }

    // A method to multiply the matrix by a vector
    this.multiply = (...args) => {
      const vector = new Array(rows);
      for (let i = 0; i < rows; i++) {
        vector[i] = 0;
        for (let j = 0; j < columns; j++) {
          vector[i] += this.data[i][j] * args[j];
        }
      }
      return vector;
    };
  }
}

// A class representing a sprite
class Sprite {
  // Initialize a new sprite
  constructor() {
    // A method to initialize the sprite with a name and a list of points
    this.init = (name, points) => {
      this.name = name;
      this.points = points;

      // Initialize the velocity and acceleration of the sprite
      this.vel = {
        x: 0,
        y: 0,
        rot: 0
      };

      this.acc = {
        x: 0,
        y: 0,
        rot: 0
      };
    };

    // An object to store child sprites
    this.children = {};

    // Flags to track the visibility and "death" of the sprite
    this.visible = false;
    this.reap = false;

    // Flags to track whether the sprite has horizontal and vertical bridges
    this.bridgesH = true;
    this.bridgesV = true;

    // An array of classes that the sprite collides with
    this.collidesWith = [];

    // The position and rotation of the sprite
    this.x = 0;
    this.y = 0;
    this.rot = 0;
    this.scale = 1;

    // The current node and next sprite in the grid
    this.currentNode = null;
    this.nextSprite = null;

    // Methods to be called before and after the sprite is moved
    this.preMove = null;
    this.postMove =
