// Function to update wave generation settings when a block is destroyed.
function blockDestroyed() {
	// If the next generation value of waveone is greater than 1350...
	if (waveone.nextGen > 1350) {
		// Subtract a certain amount from nextGen based on the creationSpeedModifier setting.
		waveone.nextGen -= 30 * settings.creationSpeedModifier;
	} 
	// Else if nextGen is greater than 600...
	else if (waveone.nextGen > 600) {
		// Subtract a different amount from nextGen based on the creationSpeedModifier setting.
		waveone.nextGen -= 8 * settings.creationSpeedModifier;
	} 
	// Otherwise, set nextGen to 600.
	else {
		waveone.nextGen = 600;
	}

	// If the difficulty value of waveone is less than 35...
	if (waveone.difficulty < 35) {
		// Increase the difficulty value based on the speedModifier setting.
		waveone.difficulty += 0.085 * settings.speedModifier;
	} 
	// Otherwise, set the difficulty to 35.
	else {
		waveone.difficulty = 35;
	}
}

// Wave generation constructor function.
function waveGen(hex) {
	// Initialize properties of the waveGen object.
	this.lastGen = 0;
	this.last = 0;
	this.nextGen = 2700;
	this.start = 0;
	this.colors = colors;
	this.ct = 0;
	this.hex = hex;
	this.difficulty = 1;
	this.dt = 0;

	// Update function to perform wave generation calculations.
	this.update = function() {
		// Call the current function of the waveGen object.
		this.currentFunction();
		// Calculate the time difference since the last update.
		this.dt = (settings.platform == 'mobile' ? 14 : 16.6667) * MainHex.ct;
		// Call the computeDifficulty function.
		this.computeDifficulty();
		// Check if enough time has passed to generate a new block.
		if ((this.dt - this.lastGen) * settings.creationSpeedModifier > this.nextGen) {
			// If so, update the nextGen value based on the creationSpeedModifier setting.
			if (this.nextGen > 600) {
				this.nextGen -= 11 * ((this.nextGen / 1300)) * settings.creationSpeedModifier;
			}
		}
	};

	// Function to generate new blocks randomly.
	this.randomGeneration = function() {
		// Check if enough time has passed to generate a new block.
		if (this.dt - this.lastGen > this.nextGen) {
			// If so, increment the ct property and update the lastGen property.
			this.ct++;
			this.lastGen = this.dt;
			// Generate a random index for the hexagonal side and color.
			var fv = randInt(0, MainHex.sides);
			var colorIndex = randInt(0, colors.length);
			// Add a new block with the generated index and color.
			addNewBlock(fv, colors[colorIndex], 1.6 + (this.difficulty / 15) * 3);
			// Check if the ct property has reached a certain limit.
			var lim = 5;
			if (this.ct > lim) {
				// If so, generate a random index to determine the next generation function.
				var nextPattern = randInt(0, 3 + 21);
				// Update the current function of the waveGen object based on the generated index.
				if (nextPattern > 15) {
					this.ct = 0;
					this.currentFunction = this.doubleGeneration;
				} else if (nextPattern > 10) {
					this.ct = 0;
					this.currentFunction = this.crosswiseGeneration;
				} else if (nextPattern > 7) {
					this.ct = 0;
					this.currentFunction = this.spiralGeneration;
				} else if (nextPattern > 4) {
					this.ct = 0;
					this.currentFunction = this.circleGeneration;
				} else if (nextPattern > 1) {
					this.ct = 0;
					this.currentFunction = this.halfCircleGeneration;
				}
			}
		}
	};

	// Function to compute the difficulty value based on the time difference since the last update.
	this.computeDifficulty = function() {
		// Check if the difficulty value is less than 35.
		if (this.difficulty < 35) {
			// Calculate the increment value based on the time difference and speedModifier setting.
			var increment;
			if (this.difficulty < 8) {
				increment = (this.dt - this.last) / (5166667) * settings.speedModifier;
			} else if (this.difficulty < 15) {
				increment = (this.dt - this.last) / (72333333) * settings.speedModifier;
			} else {
				increment = (this.dt - this.last) / (90000000) * settings.speedModifier;
			}
			// Increase the difficulty value based on
