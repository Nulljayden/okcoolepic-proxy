// Create a new div element
let node = document.createElement("div");

// Add the "text" class to the div element
node.classList.add("text");

// Set the innerHTML property of the div element to the following string:
// A story about a princess sleeping in a thorny area, with a call-to-action to start the game
node.innerHTML = 
`Into a profound slumber she sank, surrounded only by dense brambles, thorns and roses.
Many adventurers tried to find and rescue her, but none came back...
<br/><br/><span>Hit [Enter] to start the game</span>`;

// Export a function that returns the created div element
export function getNode() {
	return node;
}
