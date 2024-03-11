// Define a new function called Button which takes a config object as its parameter
function Button(config) {

    // Create a new instance of jaws.Sprite using the provided config object
    var parent = new jaws.Sprite(config),

        // Declare a variable called key
        key;

    // Iterate over each property in the parent object
    for (key in parent) {
        // Copy each property from the parent object to the current object
        this[key] = parent[key];
    }
}

// Add a new method to the Button prototype called isClicked
Button.prototype.isClicked = function(x, y) {
    // Return true if the point (x, y) is inside the button's rectangle, false otherwise
    return this.rect().collidePoint(x, y);
};

