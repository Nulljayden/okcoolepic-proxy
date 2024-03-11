const colours = ["red", "orange", "yellow", "dodgerblue", "yellowgreen", "darkorchid", "hotpink"],
shapes = ["minus", "circle", "triangle", "plus", "square", "hexagon", "dot"],
BOARD_SIZE = 8,
score = {
  number: 0,
  set(n) {
    this.number = n;
    squareElem.dataset.score = n;
  },
  add(n) {
    this.set(n + this.number);
  }
};

class Tile {
  constructor(x
