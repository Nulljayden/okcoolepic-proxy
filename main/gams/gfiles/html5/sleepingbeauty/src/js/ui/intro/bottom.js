// Create a new div element
let node = document.createElement("div");
// Add the class "bottom" to the div
node.classList.add("bottom");
// Set the inner HTML of the div to "BOTTOM"
node.innerHTML = "BOTTOM";

// Define a string constant "TEST" with the value "xxxxxxxxxx"
const TEST = "xxxxxxxxxx";
// Define a string constant "PAD" with the value "  " (two spaces)
const PAD = "  ";

// Define an array constant "KNIGHT" with the knight ASCII art
const KNIGHT = [
	"   .-.   ",
	" __|=|__ ",
	"(_/'-'\\_)",
	"//\\___/\\\\",
	"<>/   \\<>",
	" \\|_._|/ ",
	"  <_I_>  ",
	"   |||   ",
	"  /_|_\\  "
];

// Define an array constant "FLOWER" with the flower ASCII art
const FLOWER = [
    "     ",
    "     ",
    "     ",
    "     ",
    "     ",
	" .:. ",
	"-=o=-",
	" ':' ",
	" \\|/ "
];

// Define a function "colorizeKnight" that takes a character as an argument
// and returns the character wrapped in a span element with a specific color
function colorizeKnight(ch) {
	let color = "#aae";
	return `<span style="color:${color}">${ch}</span>`;
}

// Define a function "colorizeFlower" that takes a character as an argument
// and returns the character wrapped in a span element with a specific color
function colorizeFlower(ch) {
	let color = "#f00";
	if (ch == "o") { color = "#ff0"; }
	if (ch == "\\" || ch == "/" || ch == "|") { color = "lime"; }
	ch = ch.replace(/</, "&lt;").replace(/>/, "&gt;");
	return `<span style="color:${color}">${ch}</span>`;
}

// Define a function "fit" that calculates the number of columns to fit the knight and flower ASCII art
// and sets the inner HTML of the node to the formatted ASCII art
export function fit() {
	let avail = node.parentNode.offsetWidth;
	node.innerHTML =
