/**
 * The blocks that can be moved by the user
 * @param {Array<Block>} blocks - an array of blocks of size 4 that can be operated on
 * @param {Shape} shape - the block type: i, o, j, l, s, z, t
 * @param {function(number, number): boolean} isLegalCallback - a function that returns true if a block can be moved
 * to the new position
 */
function ControlGroup(blocks, shape = 'i', isLegalCallback = () => true) {
    this.blocks = blocks;
    this.shape = shape;
    this.isLegalCallback = isLegalCallback;
    this.baseX = 0;
    this.baseY = 0;
    this.positions = SHAPES[shape].positions;
    this.spin = SHAPES[shape].spin;
    this.bottomed = false;
    this.kickOffsets = WALL_KICK_OFFSETS[SHAPES[shape].kickType];
    this.dir = 0;
    this.lastWasSpin = false;

    this.initializeBlocks();
}

/**
 * Initialize the blocks' positions
 */
ControlGroup.prototype.initializeBlocks = function() {
    for (let i = 0; i < this.blocks.length; i++) {
        const newX = this.baseX + this.positions[i].x;
        const newY = this.baseY + this.positions[i].y;

        if (!this.isLegalCallback(newX, newY)) {
            throw new Error('Illegal starting position');
        }

        this.blocks[i].setPosition(newX, newY);
    }

    this.updateBottomedState();
};

/**
 * Check if the given position is legal
 * @param {number} x
 * @param {number} y
 * @returns {boolean} true iff the position is legal to move to
 */
ControlGroup.prototype.isLegalPosition = function (x, y) {
    // If it's an occupied position, it must be legal
    for (let i = 0; i < this.blocks.length; i++) {
        if (this.blocks[i].isPosition(x, y)) {
            return true;
        }
    }

    // If it's still not proven legal, defer to the game to decide
    return this.isLegalCallback(x, y);
};

/**
 * Shift the block left or right
 * @param {boolean} left - true to shift left, false to shift right
 * @returns {boolean} true iff the shift was successful
 */
ControlGroup.prototype.shift = function(left) {
    const dx = left ? -1 : 1;

    for (let i = 0; i < this.blocks.length; i++) {
        const newX = this.blocks[i].getX() + dx;
        const newY = this.blocks[i].getY();

        if (!this.isLegalPosition(newX, newY)) {
            return false;
        }
    }

    this.lastWasSpin = false;
    this.baseX += dx;

    for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].moveBlock(dx, 0);
    }

    this.updateBottomedState();

    return true;
};

ControlGroup.prototype.updateBottomedState = function() {
    for (let i = 0; i < this.blocks.length; i++) {
        if (!this.isLegalPosition(this.blocks[i].getX(), this.blocks[i].getY() + 1)) {
            this.bottomed = true;
            return;
        }
    }

    this.bottomed = false;
};

/**
 * Drop the block by one
 */
ControlGroup.prototype.drop = function() {
    if (this.bottomed) {
        return;
    }

    this.lastWasSpin = false;
    this.baseY += 1;

    for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].moveBlock(0, 1);
    }

    this.updateBottomedState();
};

/**
 * Check if the block is bottomed and another should spawn
 * @returns {boolean} true if the block is bottomed and another should spawn
 */
ControlGroup.prototype.isBottomed = function() {
    return this.bottomed;
};

/**
 * Turn the block
 * @param {boolean} cw - true for clockwise, false for counter-clockwise
 * @returns {boolean} true iff the block was successfully turned
 */
ControlGroup.prototype.turn = function(cw) {
    const direction = cw ? 'cw' : 'ccw';
    const availableKicks = this.kickOffsets[this.dir][direction];

    for (let i = 0; i < availableKicks.length; i++) {
        const kick = availableKicks[i];
        const newPositions = this.tryTurn(cw, kick);

        if (newPositions) {
            break;
        }
    }

    if (!newPositions) {
        return false;
    }

    this.lastWasSpin = true;

    for (let i = 0; i < this.blocks.length; i++) {
        this.blocks[i].setPosition(newPositions[i].x, newPositions[i].y);
    }

    this.baseX += kick.x;
    this.baseY += kick.y;

    if (cw) {
        this.dir = (this.dir + 1) % 4;
    } else {
        this.dir
