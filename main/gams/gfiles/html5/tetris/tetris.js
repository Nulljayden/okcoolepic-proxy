'use strict';

const FIELD_OFFSET_X = 180;
const FIELD_OFFSET_Y = 12;

class Button {
    constructor(action, image, x, y) {
        this.action = action;
        this.image = image;
        this.x = x;
        this.y = y;
    }

    isClicked(x, y) {
        // button click detection code here
    }

    draw() {
        // button drawing code here
    }
}

class Background {
    constructor() {
        // background constructor code here
    }

    draw(lastPaused) {
        // background drawing code here
    }
}

class TtyBlock {
    constructor(elementId, width, height, padding) {
        // tty block constructor code here
    }

    addLine(line) {
        // tty block add line code here
    }

    draw(dTime) {
        // tty block drawing code here
    }
}

class Game {
    constructor(inputAssignments, autoRepeatConfig, thresholdConfig) {
        // game constructor code here
    }

    update(realTime) {
        // game update code here
    }

    draw(dTime) {
        // game drawing code here
    }

    getResults() {
        // game get results code here
    }
}

const inputAssignments = {
    // input assignments here
};

const autoRepeatConfig = {
    // auto repeat config here
};

const thresholdConfig = {
    // threshold config here
};

class TetrisControl {
    constructor() {
        this.tetris = new Tetris(this);
    }

    setup() {
        this.tetris.setup();
    }

    update() {
        this.tetris.update();
    }

    draw() {
        this.tetris.draw();
    }

    restart() {
        this.tetris = new Tetris(this);
        this.tetris.setup();
        this.tetris.update();
    }
}

class Tetris {
    constructor(controller) {
        this.background = null;
        this.game = null;
        this.timeOffset = 0;

        this.lastEscapeState = false;
        this.startPauseTime = 0;
        this.paused = false;
        this.lastPaused = false;

        this.gameOver = false;

        this.mouseClick = null;

        this.continueButton = null;
        this.restartButton = null;

        this.lastTime = null;
        this.dTime = null;

        this.gameEndTty = new TtyBlock('
