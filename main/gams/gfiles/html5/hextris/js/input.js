// Function to register key press events and corresponding actions
function addKeyListeners() {
	// Register key press combo for left arrow key
	keypress.register_combo({
		keys: "left",
		on_keydown: function() {
			// Check if MainHex and gameState are valid
			if (MainHex && gameState !== 0) {
				MainHex.rotate(1); // Rotate MainHex clockwise
			}
		}
	});

	// Register key press combo for right arrow key
	keypress.register_combo({
		keys: "right",
		on_keydown: function() {
			// Check if MainHex and gameState are valid
			if (MainHex && gameState !== 0){
				MainHex.rotate(-1); // Rotate MainHex counter-clockwise
			}
		}
	});

	// Register key press combo for down arrow key
	keypress.register_combo({
		keys: "down",
		on_keydown: function() {
			var tempSpeed = settings.speedModifier; // Store the current speedModifier
			// Check if MainHex and gameState are valid
			if (MainHex && gameState !== 0){
				// Temporarily speed up block
				if(settings.speedUpKeyHeld == false){
					settings.speedUpKeyHeld = true;
					window.rush *=4; // Increase rush by 4 times
				}
			}
			//settings.speedModifier = tempSpeed; // Restore the original speedModifier
		},
		on_keyup:function(){
			// Check if MainHex and gameState are valid
			if (MainHex && gameState !== 0){
				// Reset the speed of the block
				window.rush /=4;
				settings.speedUpKeyHeld = false;
			}
		}	
	});

	// ... Rest of the code
}

// Function to check if a point is inside a polygon
function inside (point, vs) {
	// Ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
	// ... Rest of the code
}

// Function to handle click or tap events on the canvas
function handleClickTap(x,y) {
	// Check if the click or tap is on the help button
	if (x < 120 && y < 83 && $('.helpText').is(':visible')) {
		showHelp();
		return;
	}

	// Calculate the vertices of the hexagon
	var radius = settings.hexWidth;
	var halfRadius = radius/2;
	var triHeight = radius *(Math.sqrt(3)/2);
	var Vertexes = [
		[radius,0],
		[halfRadius,-triHeight],
		[-halfRadius,-triHeight],
		[-radius,0],
		[-halfRadius,triHeight],
		[halfRadius,triHeight]];
	Vertexes = Vertexes.map(function(coord){ 
		return [coord[0] + trueCanvas.width/2, coord[1] + trueCanvas.height/2]});

	// Check if MainHex, gameState, and gameState are valid
	if (!MainHex || gameState === 0 || gameState==-1) {
		return;
	}

	// Rotate MainHex based on the x-coordinate of the click or tap
	if (x < window.innerWidth/2) {
		MainHex.rotate(1);
	}
	if (x > window.innerWidth/2) {
		MainHex.rotate(-1);
	}
}
