// Text function creates a new text object with specified properties
function Text(x, y, text, font, color, incrementFunction) {
  // x and y represent the position of the text on the canvas
  this.x = x;
  this.y = y;

  // font is the font style of the text
  this.font = font;

  // color is the color of the text
  this.color = color;

  // opacity is the transparency level of the text
  this.opacity = 1;

  // text is the actual text content
  this.text = text;

  // alive is a flag to indicate whether the text is still visible or not
  this.alive = 1;

  // draw function is responsible for rendering the text on the canvas
  this.draw = function () {
    if (this.alive > 0) {
      // Set the global alpha value to adjust the opacity of the text
      ctx.globalAlpha = this.opacity;

      // renderText function is used to draw the text on the canvas
      renderText((this.x + gdx), (this.y + gdy), 50, this.color, this.text);

      // Reset the global alpha value to 1
      ctx.globalAlpha = 1;

      // Increment function is called to update the text properties
      incrementFunction(this);

      // Return true if the text is still visible
      return true;
    } else {
      // Return false if the text is not visible
      return false;
    }
  };
}

// fadeUpAndOut function is used to fade out and move up the text object
function fadeUpAndOut(text) {
  // Decrease the opacity of the text object
  text.opacity -= MainHex.dt * Math.pow(Math.pow((1 - text.opacity), 1 / 3) + 1, 3) / 100;

  // Set the alive property of the text object based on its opacity
  text.alive = text.opacity;

  // Move up the text object by 3 times the delta time
