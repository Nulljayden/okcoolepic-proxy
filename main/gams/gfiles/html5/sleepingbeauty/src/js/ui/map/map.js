import XY from "util/xy.js"; // Importing XY class from util/xy.js
import * as pubsub from "util/pubsub.js"; // Importing pubsub module from util/pubsub.js
import Memory from "./memory.js"; // Importing Memory class from memory.js
import ROT from "rot-js"; // Importing ROT.js library

// Constants for font size and zoom time
const FONT_BASE = 18;
const FONT_ZOOM = 120;
const ZOOM_TIME = 1000;

// Variables for level, options, display, center, and memory
let level = null;
let options = {
	width: 1,
	height: 1,
	spacing: 1.1,
	fontSize: FONT_BASE,
	fontFamily: "metrickal, monospace"
}
let display = new ROT.Display(options);
let center = new XY(0, 0); // level coords in the middle of the map
let memory = null;

// Function to convert level XY to display XY
function levelToDisplay(xy) { // level XY to display XY; center = middle point
	let half = new XY(Math.floor(options.width / 2), Math.floor(options.height / 2));
	return xy.minus(center).plus(half);
}

// Function to convert display XY to level XY
function displayToLevel(xy) { // display XY to level XY; middle point = center
	let half = new XY(Math.floor(options.width / 2), Math.floor(options.height / 2));
	return xy.minus(half).plus(center);
}

// Function to fit the display to the available space
function fit() {
	let node = display.getContainer();
	let parent = node.parentNode;
	let avail = new XY(parent.offsetWidth, parent.offsetHeight);

	let size = display.computeSize(avail.x, avail.y);
	size[0] += (size[0] % 2 ? 2 : 1);
	size[1] += (size[1] % 2 ? 2 : 1);
	options.width = size[0];
	options.height = size[1];
	display.setOptions(options);

	let current = new XY(node.offsetWidth, node.offsetHeight);
	let offset = avail.minus(current).scale(0.5);
	node.style.left = `${offset.x}px`;
	node.style.top = `${offset.y}px`;
}

// Function to update the display with the visual at a given level XY
function update(levelXY) {
	let visual = memory.visualAt(levelXY);
	if (!visual) { return; }
	let displayXY = levelToDisplay(levelXY);
	display.draw(displayXY.x, displayXY.y, visual.ch, visual.fg);
}

// Function to set the center point of the display
export function setCenter(newCenter) {
	if (newCenter && newCenter instanceof XY) {
		center = newCenter.clone();
		display.clear();

		let displayXY = new XY();
		for (displayXY.x=0; displayXY.x<options.width; displayXY.x++) {
			for (displayXY.y=0; displayXY.y<options.height; displayXY.y++) {
				update(displayToLevel(displayXY));
			}
		}
	} else {
		console.error("Invalid center parameter");
	}
}

// Function to set the level to be displayed
export function setLevel(l) {
	if (l && l instanceof Level) {
		level = l;
		memory = Memory.forLevel(level);
	} else {
		console.error("Invalid level parameter");
	}
}

// Function to zoom the display to a given font size
function zoom(size2) {
	if (size2 && size2 > 0) {
		let node = display.getContainer();
		node.style.transition = `transform ${ZOOM_TIME}ms`;

		let size1 = options.fontSize;
		let scale = size2/size1;

		node.style.transform = `scale(${scale})`;
		setTimeout(() => {
			options.fontSize = size2;
			display.setOptions(options);
			fit();
			setCenter(center);
			node.style.transition = "";
	
