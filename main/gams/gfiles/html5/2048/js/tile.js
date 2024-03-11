// Constructor function for creating a new Tile object with a given position and value
function Tile(position, value) {
  // The x coordinate of the tile's position
  this.x = position.x;
  // The y coordinate of the tile's position
  this.y = position.y;
  // The value of the tile, initialized to the given value or 2 if not provided
  this.value = value || 2;

  // The previous position of the tile, used for tracking movement
  this.previousPosition = null;
  // The tile that this tile merged with, used for tracking merged tiles
  this.mergedFrom = null;
}

// A prototype method for saving the current position of the tile
Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

// A prototype method for updating the position of the tile
Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

// A prototype method for serializing the tile into a plain object
Tile.prototype.serialize = function () {
  return {
    // The serialized position of the tile
    position: {
      x: this.x,
      y: this.y
    },
    // The serialized value of the tile
    value: this.value
  };
};
