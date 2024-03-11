/**
 * Button object for creating clickable buttons
 * @constructor
 * @param {Object} opt - options object to configure the button
 * @property {string} opt.title - The title of the button (default: 'Button')
 * @property {number} opt.scale - The scale of the button (default: 1)
 * @property {number} opt.x - The x-coordinate of the button (default: 0)
 * @property {number} opt.y - The y-coordinate of the button (default: 0)
 * @property {number} opt.lockedWidth - The locked width of the button (default: 100)
 * @property {number} opt.lockedHeight - The locked height of the button (default: 50)
 */
function Button(opt) {
  // Validate the options object
  if (!opt) {
    throw new Error('Button constructor requires an options object');
  }

  // Set the properties of the button using the options object
  this.title = opt.title || 'Button';
  this.scale = opt.scale || 1;
  this.x = opt.x || 0;
  this.y = opt.y || 0;
  this.lockedWidth = opt.lockedWidth || 100;
  this.lockedHeight = opt.lockedHeight || 50;
  this.width = this.lockedWidth;
  this.height = this.lockedHeight;
  this.sx = this.x - this.width / 2;
  this.sy = this.y - this.height / 2;
  this.cx = this.x;
  this.cy = this.y;
  this.ex = this.x + this.width / 2;
  this.ey = this.y + this.height / 2;
  this.hovering = 0;
  this.ohovering = 0;

  // Create a text object for the button title
  this.textObj = $.text({
    ctx: $.ctxmg,
    x: 0,
    y: 0,
    text: this.title,
    hspacing: 1,
    vspacing: 0,
    halign: 'center',
    valign: 'center',
    scale: this.scale,
    snap: 1,
    render: 0
  });
}

/**
 * Update function for the button object
 * @param {number} i - unused parameter
 */
Button.prototype.update = function(i) {
  this.checkHoverState();
  this.checkClick();
};

/**
 * Checks if the mouse is hovering over the button
 */
Button.prototype.checkHoverState = function() {
  // Check if the mouse position is inside the button's rectangle
  if ($.util.pointInRect(
      $.mouse.sx,
      $.mouse.sy,
      this.sx,
      this.sy,
      this.width,
      this.height
    )) {
    this.hovering = 1;
    // Play a hover sound if the button wasn't previously hovered
    if (!this.ohovering) {
      $.audio.play('hover');
    }
  } else {
    this.hovering = 0;
  }
  // Store the previous hover state
  this.ohovering = this.hovering;
};

/**
 * Checks if the mouse is clicked on the button
 */
Button.prototype.checkClick = function() {
  // Check if the mouse is hovering over the button and the mouse button is down
  if (this.hovering && $.mouse.down) {
    // Play a click sound and execute the button's action
    $.audio.play('click');
    this.action();
  }
};

/**
 * Render function for the button object
 * @param {number} i - unused parameter
 */
Button.prototype.render = function(i) {
  this.drawButton();
  this.drawText();
};

/**
 * Draws the button background and border
 */
Button.prototype.drawButton = function() {
  // Set the fill and stroke colors for the button
  const fillColor = this.hovering ? 'hsla(0, 0%, 10%, 1)' : 'hsla(0, 0%, 0%, 1)';
  const strokeColor = 'hsla(0, 0%, 0%, 1)';
  const strokeColor2 = this.hovering ? 'hsla(0, 0%, 100%, 0.2)' : 'hsla(0, 0%, 100%, 0.15)';

  // Fill the button's rectangle with the fill color
  $.ctxmg.fillStyle = fillColor;
  $.ctxmg.fillRect(Math.floor(this.sx), Math.floor(this.sy), this.width, this.height);

  // Stroke the button's rectangle with the stroke color
  $.ctxmg.strokeStyle = strokeColor;
  $.ctxmg.strokeRect(
    Math.floor(this.sx) + 0.5,
    Math.floor(this.sy) + 0.5,

