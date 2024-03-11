import pc from "being/pc.js";
import * as pubsub from "util/pubsub.js";
import { COLORS } from "combat/types.js";

// Holds the status display node
let node;

// Initializes the status display
export function init(n) {
	node = n;
	node.classList.remove("hidden"); // Shows the status display
	pubsub.subscribe("status-change", update); // Subscribes to status change events
}

// Updates the status display
export function update() {
	let str = "";
	let level = pc.getLevel();
	if (level) {str = `Tower floor ${level.danger}. `; } // Adds tower floor level if available
	str = `${str}You have:`;
	node.innerHTML = str; // Sets the initial status message

	let ul = document.createElement("ul"); // Creates a new unordered list for status elements
	node.appendChild(ul);

	ul.appendChild(buildStatus()); // Adds the player character status to the list
	ul.appendChild(buildItems()); // Adds the player character items to the list
}

// Builds and returns the player character status element
function buildStatus() {
	let node = document.createElement("li");

	let hp = buildPercentage(pc.hp, pc.maxhp); // Builds the player character health
	let mana = buildPercentage(pc.mana, pc.maxmana); // Builds the player character mana
	let str = `${hp} health, ${mana} mana`;

	let gold = pc.inventory.getItemByType("gold"); // Gets the player character gold item
	let coins = (gold ? gold.amount : 0); // Gets the amount of gold coins
	if (coins > 0) { 
		let color = gold.getVisual().fg; // Gets the text color of the gold item
		let suffix = (coins > 1 ? "s" : ""); // Adds an "s" to the end of the word "coin" if there is more than one coin
		str = `${str}, <span style="color:${color}">${coins}</span> ${gold.toString()}${suffix}`; // Adds the gold coins to the status message
	}

	node.innerHTML = str; // Sets the text of the status element
	return node;
}

// Builds and returns a colored percentage string
function buildPercentage(value, limit) {
	let frac = value/limit; // Calculates the percentage
	let color = ROT.Color.interpolateHSL([255, 0, 0], [0, 255, 0], frac); // Interpolates a color based on the percentage
	color = ROT.Color.toRGB(color); // Converts the color to RGB format
	return `<span style="color:${color}">${value}</span>/${limit}`; // Returns the colored percentage string
}

// Builds and returns
