// Define a constant for the animation speed in cells per second
const SPEED = 10;

// Define a class for the animation
export default class Animation {
  // Constructor initializes the class with empty items array, and null values for _ts and _resolve
  constructor() {
    this._items = []; // array to store animation items
    this._ts = null; // timestamp of the last animation frame
    this._resolve = null; // reference to the animation promise resolve function
  }

  // Add an item to the animation
  add(item) {
    this._items.push(item); // add the item to the items array
    item.cell.animated = item.from; // set the animated property of the cell to the starting position
  }

  // Start the animation with a callback function to draw each frame
  start(drawCallback) {
    // Create a new promise and store the resolve function in _resolve
    let promise = new Promise(resolve => this._resolve = resolve);
    this._drawCallback = drawCallback; // store the draw callback function
    this._ts = Date.now(); // set the timestamp of the first animation frame
    this._step(); // start the animation
    return promise; // return the promise
  }

  // The main animation loop
  _step() {
    let time = Date.now() - this._ts; // calculate the time since the last frame

    // Iterate over the items array in reverse order
    let i = this._items.length;
    while (i --> 0) {
      let item = this._items[i]; // get the current item
      let finished = this._stepItem(item, time); // calculate the new position of the item
      if (finished) { // if the item has reached its destination
        this._items.splice(i, 1); // remove the item from the items array
        item.cell.animated = null; // clear the animated property of the cell
      }
    }

    this._drawCallback(); // draw the current frame
    if (this._items.length > 0) { // if there are still items to animate
      requestAnimationFrame(()
