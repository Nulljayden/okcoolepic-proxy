/**
 * Button object for creating clickable buttons
 * @constructor
 */
function Button(opt) {
  if (!opt) {
    throw new Error('Button constructor requires an options object');
  }

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
 * @param i {number} - unused parameter
 */
Button.prototype.update = function(i) {
  this.checkHoverState();
  this.checkClick();
};

/**
 * Checks if the mouse is hovering over the button
 */
Button.prototype.checkHoverState = function() {
  if ($.util.pointInRect(
      $.mouse.sx,
      $.mouse.sy,
      this.sx,
      this.sy,
      this.width,
      this.height
    )) {
    this.hovering = 1;
    if (!this.ohovering) {
      $.audio.play('hover');
    }
  } else {
    this.hovering = 0;
  }
  this.ohovering = this.hovering;
};

/**
 * Checks if the mouse is clicked on the button
 */
Button.prototype.checkClick = function() {
  if (this.hovering && $.mouse.down) {
    $.audio.play('click');
    this.action();
  }
};

/**
 * Render function for the button object
 * @param i {number} - unused parameter
 */
Button.prototype.render = function(i) {
  this.drawButton();
  this.drawText();
};

/**
 * Draws the button background and border
 */
Button.prototype.drawButton = function() {
  const fillColor = this.hovering ? 'hsla(0, 0%, 10%, 1)' : 'hsla(0, 0%, 0%, 1)';
  const strokeColor = 'hsla(0, 0%, 0%, 1)';
  const strokeColor2 = this.hovering ? 'hsla(0, 0%, 100%, 0.2)' : 'hsla(0, 0%, 100%, 0.15)';

  $.ctxmg.fillStyle = fillColor;
  $.ctxmg.fillRect(Math.floor(this.sx), Math.floor(this.sy), this.width, this.height);
  $.ctxmg.strokeStyle = strokeColor;
  $.ctxmg.strokeRect(
    Math.floor(this.sx) + 0.5,
    Math.floor(this.sy) + 0.5,
    this.width - 1,
    this.height - 1,
    1
  );
  $.ctxmg.strokeStyle = strokeColor2;
  $.ctxmg.strokeRect(
    Math.floor(this.sx) + 1.5,
    Math.floor(this.sy) + 1.5,
    this.width - 3,
    this.height - 3,
    1
  );
};

/**
 * Draws the button text
 */
Button.prototype.drawText = function() {
  $.ctxmg.beginPath();
  $.text({
    ctx: $.ctxmg,
    x: this.cx,
    y: this.cy,
    text: this.title,
    hspacing: 1,
    vspacing: 0,
    halign: 'center',
    valign: 'center',
    scale: this.scale,
    snap: 1,
    render: true
  });

  const fillColor = this.hovering ? 'hsla(0, 0%, 100%, 1)' : 'hsla(0, 0%, 100%, 0.7)';
  $.ctxmg.fillStyle = fillColor;
  $.ctxmg.fill();

  $.ctxmg.fillStyle = 'hsl
