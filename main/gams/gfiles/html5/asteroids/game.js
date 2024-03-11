// Canvas Asteroids
// Copyright (c) 2010 Doug McInnes

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

const KEY_STATUS = { keyDown:false };
for (const code in KEY_CODES) {
  KEY_STATUS[KEY_CODES[code]] = false;
}

const GRID_SIZE = 60;

class Matrix {
  constructor(rows, columns) {
    this.data = new Array(rows);
    for (let i = 0; i < rows; i++) {
      this.data[i] = new Array(columns);
    }

    this.configure = (rot, scale, transx, transy) => {
      const rad = (rot * Math.PI) / 180;
      const sin = Math.sin(rad) * scale;
      const cos = Math.cos(rad) * scale;
      this.set(cos, -sin, transx, sin, cos, transy);
    };

    this.set = (...args) => {
      let k = 0;
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
          this.data[i][j] = args[k];
          k++;
        }
      }
    }

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

class Sprite {
  constructor() {
    this.init = (name, points) => {
      this.name = name;
      this.points = points;

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

    this.children = {};

    this.visible = false;
    this.reap = false;
    this.bridgesH = true;
    this.bridgesV = true;

    this.collidesWith = [];

    this.x = 0;
    this.y = 0;
    this.rot = 0;
    this.scale = 1;

    this.currentNode = null;
    this.nextSprite = null;

    this.preMove = null;
    this.postMove = null;
  }

  run(delta) {
    this.move(delta);
    this.updateGrid();

    this.context.save();
    this.configureTransform();
    this.draw();

    const canidates = this.findCollisionCanidates();

    this.matrix.configure(this.rot, this.scale, this.x, this.y);
    this.checkCollisionsAgainst(canidates);

    this.context.restore();

    if (this.bridgesH && this.currentNode && this.currentNode.dupe.horizontal) {
      this.x += this.currentNode.dupe.horizontal;
      this.context.save();
      this.configureTransform();
      this.draw();
      this.checkCollisionsAgainst(canidates);
      this.context.restore();
      if (this.currentNode) {
        this.x -= this.currentNode.dupe.horizontal;
      }
    }
    if (this.
