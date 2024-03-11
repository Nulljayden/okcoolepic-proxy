/**
 * ControlGroup class represents a group of blocks that can be moved by the user.
 * It contains an array of blocks, the block type (shape), a callback function to
 * check if a block can be moved to a new position, and other properties related
 * to the block's position and state.
 * @constructor
 * @param {Array<Block>} blocks - an array of blocks of size 4 that can be operated on
 * @param {Shape} shape - the block type: i, o, j, l, s, z, t (default: 'i')
 * @param {function(number, number): boolean} isLegalCallback - a function that returns true if a block can be moved
 * to the new position (default: () => true)
 */
function ControlGroup(blocks, shape = 'i', isLegalCallback = () => true) {
    // ...
}

/**
 * Initialize the blocks' positions.
 */
ControlGroup.prototype.initializeBlocks = function() {
    // ...
};

/**
 * Check if the given position is legal to move to.
 * @param {number} x
 * @param {number} y
 * @returns {boolean} true iff the position is legal to move to
 */
ControlGroup.prototype.isLegalPosition = function (x, y) {
    // ...
};

/**
 * Shift the block left or right.
 * @param {boolean} left - true to shift left, false to shift right
 * @returns {boolean} true iff the shift was successful
 */
ControlGroup.prototype.shift = function(left) {
    // ...
};

/**
 * Update the bottomed state based on the current block positions.
 */
ControlGroup.prototype.updateBottomedState = function() {
    // ...
};

/**
 * Drop the block by one.
 */
ControlGroup.prototype.drop = function() {
    // ...
};

/**
 * Check if the block is bottomed and another should spawn.
 * @returns {boolean} true if the block is bottomed and another should spawn
 */
ControlGroup.prototype.isBottomed = function() {
    // ...
};

/**
 * Turn the block in the given direction.
 * @param {boolean} cw - true for clockwise, false for counter-clockwise
 * @returns {boolean} true iff the block was successfully turned
 */
ControlGroup.prototype.turn = function(cw) {
    // ...
};
