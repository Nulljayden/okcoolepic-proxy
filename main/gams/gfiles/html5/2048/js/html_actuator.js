function HTMLActuator() {
  this.tileContainer = document.querySelector(".tile-container");
  this.scoreContainer = document.querySelector(".score-container");
  this.bestContainer = document.querySelector(".best-container");
  this.messageContainer = document.querySelector(".game-message");

  this.score = 0;
}

HTMLActuator.prototype = {
  constructor: HTMLActuator,

  actuate(grid, metadata) {
    const self = this;

    requestAnimationFrame(function () {
      self.clearContainer(self.tileContainer);

      for (const column of grid.cells) {
        for (const cell of column) {
          if (cell) {
            self.addTile(cell);
          }
        }
      }

      self.updateScore(metadata.score);
      self.updateBestScore(metadata.bestScore);

      if (metadata.terminated) {
        if (metadata.over) {
          self.message(false); // You lose
        } else if (metadata.won) {
          self.message(true); // You win!
        }
      }
    });
  },

  continueGame() {
    this.clearMessage();
  },

  clearContainer(container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  },

  addTile(tile) {
    const self = this;

    const wrapper = document.createElement("div");
    const inner = document.createElement("div");
    const position = tile.previousPosition || { x: tile.x, y: tile.y };
    const positionClass = this.positionClass(position);

    const classes = [
      "tile",
      `tile-${tile.value}`,
      positionClass,
    ];

    if (tile.value > 2048) classes.push("tile-super");

    wrapper.setAttribute("class", classes.join(" "));

    inner.classList.add("tile-inner");
    inner.textContent = tile.value;

    if (tile.previousPosition) {
      requestAnimationFrame(() => {
        classes[2] = self.positionClass({ x: tile.x, y: tile.y });
        wrapper.setAttribute("class", classes.join(" ")); // Update the position
      });
    } else if (tile.mergedFrom) {
      classes.push("tile-merged");
      wrapper.setAttribute("class", classes.join(" "));

      // Render the tiles that merged
      tile.mergedFrom.forEach(merged => {
        self.addTile(merged);
      });
    } else {
      classes.push("tile-new");
      wrapper.setAttribute("class", classes.join(" "));
    }

    // Add the inner part of the tile to the wrapper
    wrapper.appendChild(inner);

    // Put the tile on the board
    this.tileContainer.appendChild(wrapper);
  },

  applyClasses(element, classes) {
    element.setAttribute("class", classes.join(" "));
  },

  normalizePosition(position) {
    return { x: position.x + 1, y: position.y + 1 };
  },

  positionClass(position) {
    position = this.normalizePosition(position);
    return `tile-position-${position.x}-${position.y}`;
  },

  updateScore(score) {
    this.clearContainer(this.scoreContainer);

    const difference = score - this.score;
    this.score = score;

    this.scoreContainer.textContent = this.score.toString();

    if (difference > 0) {
      const addition = document.createElement("div");
      addition.classList.add("score-addition");
      addition.textContent = `+${difference}`;

      this.scoreContainer.appendChild(addition);
    }
  },

  updateBestScore(bestScore) {
    this.bestContainer.textContent = bestScore;
  },

  message(won) {
    const type = won ? "game-won" : "game-over";
    const message = won ? "You win!" : "Game over!";

    this.messageContainer.classList.add(type);
    this.messageContainer.querySelector("p").textContent = message;
  },

  clearMessage() {
    // IE only takes one value to remove at a time.
    this.messageContainer.classList.remove("game-won");
    this.messageContainer.classList.remove("game-over");
  },
};
