// PreviewGroup function creates a new group of 4 blocks with a specific shape and color
function PreviewGroup(baseX, baseY) {
    // Initialize the blocks array and shape variable
    this.blocks = [];
    this.shape = null;

    // Create the blocks using a for loop
    for (let i = 0; i < 4; i += 1) {
        this.blocks.push(new Block({
            boardOriginX: baseX,
            boardOriginY: baseY,
            blockX: 0,
            blockY: 0,
            shape: 'i'
        }));
    }
}

// The setShape method sets the shape and color of the blocks in the group
PreviewGroup.prototype.setShape = function(shape, preview) {
    // Get the shape configuration from the SHAPES object
    const shapeConfig = SHAPES[shape];
    let i;

    // Set the shape variable to the new shape
    this.shape = shape;

    // Set the position and color of each block in the group using a for loop
    for (i = 0; i < 4; i += 1) {
        this.blocks[i].setPosition(shapeConfig.pos[i].x, shapeConfig.pos[i].y);
        this.blocks[i].setColor(shape, preview);
    }
};

// The getShape method returns the current shape of the group
PreviewGroup.prototype.getShape = function () {
    return this.shape;
};

// The draw method draws each block in the group on the canvas
PreviewGroup.prototype.draw = function() {
    let i;
    // Loop through each block in the group and call the draw method on it
    for (i = 0; i < 4; i += 1) {
        this.blocks[i].draw();
    }
};
