/*==============================================================================
Particle Emitter
==============================================================================*/

// Check if an object is an array
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}

// Particle constructor
function Particle(options) {
  if (options.parent && !isArray(options.parent)) {
    throw new Error('options.parent must be an array');
  }

  if (!options.x || !options.y || !options.speed || !options.friction || !options.direction || !options.lineWidth || !options.hue || !options.saturation) {
    throw new Error('options must contain x, y, speed, friction, direction, lineWidth, hue, and saturation properties');
  }

  this.parent = options.parent || [];
  this.x = options.x;
  this.y = options.y;
  this.speed = options.speed;
  this.friction = options.friction;
  this.direction = options.direction;
  this.lineWidth = options.lineWidth;
  this.hue = options.hue;
  this.saturation = options.saturation;
}

// Remove a particle from its parent array
Particle.prototype.remove = function() {
  var index = this.parent.indexOf(this);
  if (index !== -1) {
    this.parent.splice(index, 1);
  }
};

// Particle Emitter constructor
function ParticleEmitter(opt) {
  if (!isArray(opt)) {
    throw new Error('opt must be an array');
  }

  for (var k in opt) {
    this[k] = opt[k];
  }

  this.particles = [];

  for (var i = 0; i < this.count
