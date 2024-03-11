/**
 * Returns the line numbers of all the completed rows.
 * @returns {[Number]} the line numbers of all the completed rows
 */
Game.prototype.getRows = function () {
    // Initialize the rows to 0
    for (var i = 0; i < 20; i += 1) {
	rows[i] = 0;
    }
    // Increment the appropriate row for each block
    for (var i = 0; i < this.blocks.length; i += 1) {
	var curRow = this.blocks[i].getY();
	rows[curRow] += 1;
	// If the row is full, add it to the result array
	if (rows[curRow] === 10) {
	    res.push(curRow);
	}
    }

    return res;
};

/**
 * Removes the rows from the field.
 */
Game.prototype.removeRows = function (rows) {
    // Initialize drops to 0
    for (var i = -4; i < 20; i += 1) {
	dropDist[i] = 0;
    }

    // For each removed row, increment the drop distance for rows above it
    for (var i = 0; i < rows.length; i += 1) {
	remove[rows[i]] = true;
	for (var j = -4; j < rows[i]; j += 1) {
	    dropDist[j] += 1;
	}
    }

    // For each block, drop it or remove it if it's in a removed row
    for (var i = 0; i < this.blocks.length; i += 1) {
	var curBlock = this.blocks[i];
	var curY = curBlock.getY();

	// If it is being removed, remove the block and decrement i
	if (remove[curY]) {
	    this.removeBlock(i);
	    i -= 1;
	} else {
	    // Otherwise, drop the block
	    curBlock.setPosition(curBlock.getX(), curBlock.getY() + dropDist[curY]);
	}
    }
};

Game.prototype.removeBlock = function(index) {
    this.blocks[index].kill();
    return this.blocks.splice(index, 1);
};

Game.prototype.applyGravity = function (dTime) {
    this.timeToNextDrop -= dTime;

    // Drop the block until the next drop time is positive or the control group has bottomed out
    while (this.timeToNextDrop < 0 && (!this.controlGroup.isBottomed())) {
	this.dropBlock(true);
	this.timeToNextDrop += this.dropPeriod;
    }

    // If the control group has bottomed out, reset the drop period
    if (this.controlGroup.isBottomed()) {
	this.timeToNextDrop = this.dropPeriod;
    }
};

/**
 * Changes the shapes of the preview along the side.
 * @param {[Char]} queue - the queue of pieces
 */
Game.prototype.updatePreviews = function(queue) {
    for (var i = 0; i < queue.length; i += 1) {
	this.previewGroups[i].setShape(queue[i]);
    }
};

/**
 * called when the user attempts to swap a block
 */
Game.prototype.swap = function() {
    var i, j,
    newShape,
    oldShape = this.controlGroup.getShape(),
    oldBlocks = this.controlGroup.getBlocks(),
    newBlocks = [],
    thisObject = this;

    // Can only be called once per drop
    if (!this.swapAllowed) {
	return;
    }
    this.swapAllowed = false;

    // Reset the locking
    this.resetLockCounter(false);

    // Remove the blocks
    for (i = 0; i < this.blocks.length; i += 1) {
	// If the block is part of the control group, remove it
	for (j = 0; j < 4; j += 1) {
	    if (oldBlocks[j] === this.blocks[i]) {
		this.removeBlock(i);
		i -= 1;
	    }
	}
    }
    
    // If there is a block waiting
    if (this.swapGroup) {
	newShape = this.swapGroup.getShape();
	for (i = 0; i < 4; i += 1) {
	    newBlocks.push(new Block({blockX:-10, blockY:-10, shape: newShape, occupiedPositions: this.occupiedPositions}));
	    this.blocks.push(newBlocks[i]);
	}
	
	this.controlGroup = new ControlGroup(newBlocks, newShape, function(x, y){
	    return thisObject.isLegalPosition(x, y);
	});

	this.swapGroup.setShape(oldShape);

	return;
    }

    // If there is no block waiting
    this.swapGroup = new PreviewGroup(-100, 60);
    this.swapGroup.setShape(oldShape);
    this.newBlock(true);    

};

/**
* locks the currnt piece in, registers lines and makes a new block
*/
Game.prototype.lockBlocks = function() {
    // Figure out if it a t-spin/t-spin mini
    var tSpinType = this.controlGroup.getTSpin(),
    scoreObject = {},
    rows;

    if (tSpinType === 'mini') {
	scoreObject.miniT = true;
    } else if (tSpinType === 'normal') {
	scoreObject.normalT = true;
    }

    // Look for rows
    rows = this.getRows();
    scoreObject.lines = rows.length;
    if (rows.length > 0) {
	this.removeRows(rows);
    }

    // Apply the score
    this.scoreTracker.updateScore(scoreObject
