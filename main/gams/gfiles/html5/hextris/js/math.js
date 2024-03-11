/**
 * Rotates a point in 2D space around the origin (0, 0) by a given angle.
 *
 * @param {number} x - The x-coordinate of the point to rotate.
 * @param {number} y - The y-coordinate of the point to rotate.
 * @param {number} theta - The angle in degrees to rotate the point by.
 * @returns {{x: number, y: number}} - The rotated point with x and y coordinates.
 */
function rotatePoint(x, y, theta) {
	// Convert the input angle from degrees to radians
	var thetaRad = theta * (Math.PI / 180);

	// Perform rotation calculations using trigonometry
	var rotX = Math.cos(thetaRad) * x - Math.sin(thetaRad) * y;
	var rotY = Math.sin(thetaRad) * x + Math.cos(thetaRad) * y;

	// Return the rotated point as an object with x and y properties
	return {
		x: rotX,
		y: rotY
	};
}

/**
 * Generates a random integer within a specified range, inclusive.
 *
 * @param {number} min - The minimum value of the range (inclusive).
 * @param {number} max - The maximum value of the range (inclusive).
 * @returns {number} - A random integer within the specified range.
 */
function randInt(min, max) {
	// Generate a random floating-point number between 0 (inclusive) and 1 (exclusive)
	return Math.floor((Math.random() * max) + min);
}
