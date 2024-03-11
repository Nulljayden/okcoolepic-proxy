// HTMLActuator function is a constructor for creating an object that updates
// the HTML user interface based on the game's state.
function HTMLActuator() {
  // The following lines get the HTML elements that will be updated.
  this.tileContainer = document.querySelector(".tile-container");
  this.scoreContainer = document.querySelector(".score-container");
  this.bestContainer = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  // Initialize the score variable.
  this.score = 0;
}

// The prototype of HTMLActuator function contains the methods that update
// the HTML user interface.
HTMLActuator.prototype = {
  constructor: HTMLActuator,

  // The actuate method updates the HTML user interface based on the game's state.
  actuate(grid, metadata) {
    const self = this; // Store the HTMLActuator object in a variable.

    // The requestAnimationFrame function schedules a function to be called
    // before the next repaint.
    requestAnimationFrame(function () {
      self.clearContainer(self.tileContainer); // Clear the tile container.

      // Loop through the cells of the grid and add each tile to the tile container.
      for (const column of grid.cells) {
        for (const cell of column) {
          if (cell) {
            self.addTile(cell);
          }
        }
      }

      // Update the score and best score containers.
      self.updateScore(metadata.score);
      self.updateBestScore(metadata.bestScore);

      // Display a message based on the game's state.
      if (metadata.terminated) {
        if (metadata.over) {
          self.message(false); // You lose
        } else if (metadata.won) {
          self.message(true); // You win!
        }
      }
    });
  },

  // The continueGame method clears the message container.
  continueGame() {
    this.clearMessage();
  },

  // The clearContainer method removes all child nodes of a container.
  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  },

  // The addTile method adds a tile to the tile container.
  addTile(tile) {
    const self = this; // Store the HTMLActuator object in a variable.

    // Create the wrapper and inner elements for the tile.
    const wrapper = document.createElement("div");
    const inner = document.createElement("div");

    // Get the position of the tile and add the corresponding class.
    const position = tile.previousPosition || { x: tile.x, y: tile.y };
    const positionClass = this.positionClass(position);

    // Add the classes to the wrapper element.
    const classes = [
      "tile",
      `tile-${tile.value}`,
      positionClass,
    ];

    // Add the "tile-super" class if the tile's value is greater than 2048.
    if (tile.value > 2048) classes.push("tile-super");

    // Add the classes to the wrapper element.
    wrapper.setAttribute("class", classes.join(" "));

    // Add the classes to the inner element.
    inner.classList.add("tile-inner");
    inner.textContent = tile.value;

    // Add the tile's previous position class if it exists.
    if (tile.previousPosition) {
      requestAnimationFrame(() => {
        classes[2] = self.positionClass({ x: tile.x, y: tile.y });
        wrapper.setAttribute("class", classes.join(" ")); // Update the position
      });
    } else if (tile.mergedFrom) {
      // Add the "tile-merged" class if the tile was merged.
      classes.push("tile-merged");
      wrapper.setAttribute("class", classes.join(" "));

      // Add the tiles that merged.
      tile.mergedFrom.forEach(merged => {
        self.addTile(merged);
      });
    } else {
      // Add the "tile-new" class if the tile is new.
      classes.push("tile-new");
      wrapper.setAttribute("class", classes.join(" "));
    }

    // Add the inner element to the wrapper element.
    wrapper.appendChild(inner);

    // Add the wrapper element to the tile container.
    this.tileContainer.appendChild(wrapper);
  },

  // The applyClasses method sets the class attribute of an element.
  applyClasses(element, classes) {
    element.setAttribute("class", classes.join(" "));
  },

  // The normalizePosition method adds 1 to the x and y properties of a position.
  normalizePosition(position) {
    return { x: position.x + 1, y: position.y + 1 };
  },

  // The positionClass method returns the class name based on a position.
  positionClass(position) {
    position = this.normalizePosition(position);
    return `tile-position-${position.x}-${position.y}`;
  },

  // The updateScore method updates the score container.
  updateScore(score) {
    this.clearContainer(this.scoreContainer); // Clear the score container.

    // Calculate the difference between the new score and the old score.
    const difference = score - this.score;
    this.score = score;

    // Update the score container.
    this.scoreContainer.textContent = this.score.toString();

    // Add the difference to the score container if it is greater than 0.
    if (difference > 0) {
      const addition = document.createElement("div");
      addition.classList.add("score-addition");
      addition.textContent = `+${difference}`;

      this.scoreContainer.appendChild(addition);
    }
  },

  // The updateBestScore method updates the best score container.
  updateBestScore(bestScore) {
    this.bestContainer.textContent = bestScore;
  },

