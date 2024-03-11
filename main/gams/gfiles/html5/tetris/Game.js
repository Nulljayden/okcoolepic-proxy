function Game(inputMapping, autoRepeat, threshold) {
  // ... (rest of the code remains the same)
}

Game.prototype = Object.create(HTMLElement.prototype);
Game.prototype.constructor = Game;

Game.prototype.connectedCallback = function() {
  // ... (rest of the code remains the same)
};

// ... (rest of the methods remain the same with the following changes)

/**
 * Drops the controlled blocks by one
 * @param {boolean} causedByGravity - whether the drop is caused by gravity
 */
Game.prototype.dropBlock = function(causedByGravity) {
  if (!causedByGravity) {
    this.timeToNextDrop = this.dropPeriod;
  }

  this.controlGroup.drop();
};

/**
 * Updates the game state
 * @param {number} time - the current time in milliseconds
 */
Game.prototype.update = function(time) {
  const dTime = time - this.lastTime;
  this.lastTime = time;

  this.processInput(dTime);

  if (!this.controlGroup.isBottomed()) {
    this.applyGravity(dTime);
  } else {
    this.resetLockCounter(false);
    this.bottomTimer -= dTime;

    if (this.bottomTimer <= 0 || this.slideCount >= 15) {
      this.lockBlocks();
    }
  }

  this.lastBottomedState = this.controlGroup.isBottomed();

  // Update the position of the preview blocks
  if (this.controlGroup) {
    this.controlGroup.configurePreviewBlocks(this.previewBlocks);
  } else {
    for (let i = 0; i < 4; i += 1) {
      this.previewBlocks[i].setPosition(-10, -10);
    }
  }
};

/**
 * Renders the entire game scene
 * @param {number} time - the current time in milliseconds
 */
Game.prototype.draw = function(time) {
  this.scoreOutput.draw(time);
  this.linesOutput.draw(time);
  this.levelOutput.draw(time);
  this.tickerOutput.draw(time);

  // Draw the preview blocks
  for (let i = 0; i < 4; i += 1) {
    this.previewBlocks[i].drawIfInvalid();
  }

  // Draw the swap block
  if (this.swapGroup) {
    this.swapGroup.draw();
  }

  // Draw the queue
  for (let i = 0; i < this.previewGroups.length; i += 1) {
    this.previewGroups[i].draw();
  }

  for (let i = 0; i < this.blocks.length; i += 1) {
    this.blocks[i].drawIfInvalid();
  }

  requestAnimationFrame(this.draw.bind(this));
};

/**
 * Returns true iff the given position can be moved into
 * @param {number} x - the x position
 * @param {number} y - the y position
 * @returns {boolean} true iff the new position is legal
 */
Game.prototype.isLegalPosition = function(x, y) {
  // If there is a block in the way
  if (this.occupiedPositions[x + "," + y]) {
    return false;
  }

  // If it's on the field
  if (x >= 0 && x < 10 && y >= 0 && y < 20) {
    return true;
  }

  return false;
};

// ... (rest of the methods remain the same)
