// Create a new div element
let node = document.createElement("div");

// Add the class 'title' to the div
node.classList.add("title");

// Set the innerHTML property of the div to a multi-line string
node.innerHTML =                                               
".oPYo. 8                       o             \n" +
"8      8                                     \n" +
"`Yooo. 8 .oPYo. .oPYo. .oPYo. o8 odYo. .oPYo.\n" +
"    `8 8 8oooo8 8oooo8 8    8  8 8' `8 8    8\n" + 
"     8 8 8.     8.     8    8  8 8   8 8    8\n" +
"`YooP' 8 `Yooo' `Yooo' 8YooP'  8 8   8 `YooP8\n" +
"                       8                    8\n" +
"                       8                 ooP'\n" +
" .oPYo.                        o             \n" +
" 8   `8                        8             \n" +
"o8YooP' .oPYo. .oPYo. o    o  o8P o    o     \n" +
" 8   `b 8oooo8 .oooo8 8    8   8  8    8     \n" +
" 8    8 8.     8    8 8    8   8  8    8     \n" +
" 8oooP' `Yooo' `YooP8 `YooP'   8  `YooP8     \n" +
"                                       8     \n" +
"                                    ooP'     ";

// Export the getNode function
export function getNode() {
	// Return the node variable
	return node;
}
