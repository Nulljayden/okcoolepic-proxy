/**
 * Wall kicks are a way to adjust the position of a Tetris block when it is placed
 * next to a wall or another block. They are used to prevent the block from getting
 * stuck and to ensure that it can be moved in all directions.
 *
 * Each block type has its own set of wall kicks, which are applied in a specific
 * order when the block is placed. The wall kicks are represented as an array of
 * offsets, where each offset is an object with `x` and `y` properties.
 *
 * The wall kicks for each block type are defined in the `WALL_KICK_OFFSETS` object.
 */

const WALL_KICK_OFFSETS = {
  standard: [
    {
      clockwise: [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: -1, y: -1 },
        { x: 0, y: 2 },
        { x: -1, y: 2 },
      ],
      counterClockwise: [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 1, y: -1 },
        { x: 0, y: 2 },
        { x: 1, y: 2 },
      ],
    },
    // ... more wall kicks for the standard block type
  ],
  i_block: [
    {
      clockwise: [
        { x: 0, y: 0 },
        { x: -2, y: 0 },
        { x: 1, y: 0 },
        { x: -2, y: 1 },
        { x: 1, y: -2 },
      ],
      counterClockwise: [
        { x: 0, y: 0 },
        { x: -1, y: 0 },
        { x: 2, y: 0 },
        { x: -1, y: -2 },
        { x: 2, y: 1 },
      ],
    },
    // ... more wall kicks for the i_block block type
  ],
};

/**
 * Returns the wall kicks for the given block type.
 *
 * @param {string} blockType - The type of the block. Can be either "standard" or "i_block".
 * @returns {Array<Object>} The wall kicks for the given block type.
 */
function getWallKicks(blockType) {
  return WALL_KICK_OFFSETS[blockType];
}

module.exports = {
  getWallKicks,
};
