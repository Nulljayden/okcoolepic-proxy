/**
 * TextPop object constructor
 * @param {object} opt - object containing the object properties
 * The constructor for the TextPop object, which takes in an object 'opt'
 * containing the object properties.
 */
function TextPop(opt) {
  // Set the object properties
  for (var k in opt) {
    this[k] = opt[k];
  }
  // Set default values for the object properties
  this.alpha = 2;
  this.vy = 0;
  this.hue = 0;
  this.saturation = 0;
  this.lightness = 0;

  // Check if the required variables are defined
  if (typeof $.TextPops === 'undefined') {
    console.error('$.TextPops is not defined');
  }
  if (typeof $.dt === 'undefined') {
    console.error('$.dt is not defined');
  }
  if (typeof $.ctxmg === 'undefined') {
    console.error('$.ctxmg is not defined');
  }
  if (typeof $.text === 'undefined') {
    console.error('$.text is not defined');
  }
}

/**
 * Update the object properties
 * @param {number} i - index of the object in the array
 * The method updates the object properties, including the vertical velocity 'vy',
 * the y-coordinate, and the alpha value (transparency). If the alpha value is less
 * than or equal to 0, the object is removed from the array.
 */
TextPop.prototype.update = function(i) {
  this.vy -= 0.05 * $.dt;
  this.y += this.vy * $.dt;
  this.alpha -= 0.03 * $.dt;

  // Remove the object from the array if its alpha value is less than or equal to 0
  if (this.alpha <= 0) {
    $.TextPops.splice(i, 1);
  }
};
