// defineVariables: This function returns an object containing various constants used throughout the code.
// Each key-value pair represents a constant name and its corresponding value.
const defineVariables = () => {
  return {
    // ... rest of the code
  };
};

// drawYellowString: This function draws a yellow string on the canvas with a linear gradient fill.
// It takes a canvas context, a configuration object, and optional text alignment parameter.
// The configuration object should contain the following properties:
// - string: the text to be drawn
// - size: the font size of the text
// - x: the x-coordinate of the text's position
// - y: the y-coordinate of the text's position
// - textAlign: the text alignment (default is "center")
const drawYellowString = (ctx, { string, size, x, y, textAlign }) => {
  // ... rest of the code
};

// addFlight: This function adds a new flight instance to the engine with a given index and type.
// It creates a new Instance object, sets its properties, and adds it to the engine's instance list.
const addFlight = (engine, index, type) => {
  // ... rest of the code
};

// flightAction: This function defines the behavior of a flight instance.
// It updates the instance's position and visibility based on its velocity and current time.
const flightAction = (instance, time) => {
  // ... rest of the code
};

// flightPainter: This function paints a flight instance on the canvas.
// It draws the instance's image on the canvas at its current position.
const flightPainter = (instance, ctx) => {
  // ... rest of the code
};

// ... rest of the code
