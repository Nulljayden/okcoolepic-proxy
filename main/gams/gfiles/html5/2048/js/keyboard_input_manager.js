function KeyboardInputManager() {
  this.events = {};

  this.eventTouchstart =
    window.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart";
  this.eventTouchmove = window.navigator.msPointerEnabled ? "MSPointerMove" : "touchmove";
  this.eventTouchend = window.navigator.msPointerEnabled ? "MSPointerUp" : "touchend";

  this.listen();
}

KeyboardInputManager.prototype.on = function (event, callback) {
  if (!this.events[event]) {
    this.events[event] = [];
  }
  this.events[event].push(callback);
};

KeyboardInputManager.prototype.emit = function (event, data) {
  this.events[event]?.forEach(callback => callback(data));
};

KeyboardInputManager.prototype.listen = function () {
  const map = {
    38: 0, // Up
    39: 1, // Right
    40: 2, // Down
    37: 3, // Left
    75: 0, // Vim up
    76: 1, // Vim right
    74: 2, // Vim down
    72: 3, // Vim left
    87: 0, // W
    68: 1, // D
    83: 2, // S
    65: 3, // A
  };

  document.addEventListener("keydown", (event) => {
    const modifiers = event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;
    const mapped = map[event.which];

    if (!modifiers) {
      if (mapped !== undefined) {
        event.preventDefault();
        this.emit("move", mapped);
      }
    }

    if (!modifiers && event.which === 82) {
      this.restart(event);
    }
  });

  const bindButtonPress = (selector, ...fns) => {
    const button = document.querySelector(selector);
    button.addEventListener("click", (event) => {
      fns.forEach((fn) => fn.call(this, event));
      return false;
    });
    button.addEventListener(this.eventTouchend, (event) => {
      fns.forEach((fn) => fn.call(this, event));
      return false;
    });
  };

  this.bindButtonPress(".retry-button", this.restart);
  this.bindButtonPress(".restart-button", this.restart);
  this.bindButtonPress(".keep-playing-button", this.keepPlaying);

  const gameContainer = document.getElementsByClassName("game-container")[0];

  gameContainer.addEventListener(this.eventTouchstart, (event) => {
    if (
      (!window.navigator.msPointerEnabled && event.touches.length > 1) ||
      event.targetTouches.length > 1
    ) {
      return; // Ignore if touching with more than 1 finger
    }

    if (window.navigator.msPointerEnabled) {
      this.touchStartClientX = event.pageX;
      this.touchStartClientY = event.pageY;
    } else {
      this.touchStartClientX = event.touches[0].clientX;
      this.touchStartClientY = event.touches[0].clientY;
    }

    event.preventDefault();
  });

  gameContainer.addEventListener(this.eventTouchmove, (event) => {
    event.preventDefault();
  });

  gameContainer.addEventListener(this.eventTouchend, (event) => {
    if (
      (!window.navigator.msPointerEnabled && event.touches.length > 0) ||
      event.targetTouches.length > 0
    ) {
      return; // Ignore if still touching with one or more fingers
    }

    if (window.navigator.msPointerEnabled) {
      this.touchEndClientX = event.pageX;
      this.touchEndClientY = event.pageY;
    } else {
      this.touchEndClientX = event.changedTouches[0].clientX;
      this.touchEndClientY = event.changedTouches[0].clientY;
    }

    const dx = this.touchEndClientX - this.touchStartClientX;
    const absDx = Math.abs(dx);

    const dy = this.touchEndClientY - this.touchStartClientY;
    const absDy = Math.abs(dy);

    if (Math.max(absDx, absDy) > 10) {
      // (right : left) : (down : up)
      this.emit("move", absDx > absDy ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0));
    }

    event.preventDefault();
  });
};

KeyboardInputManager.prototype.restart = function (event) {
  event.preventDefault();
  this.emit("restart");
};

KeyboardInputManager.prototype.keepPlaying = function (event) {
  event.preventDefault();
  this.emit("keepPlaying");
};
