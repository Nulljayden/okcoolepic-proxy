/*==============================================================================
Bullet
==============================================================================*/

/**
 * Bullet constructor
 * @param {Object} opt - Options object
 * @param {number} opt.x - X coordinate of the bullet
 * @param {number} opt.y - Y coordinate of the bullet
 * @param {number} opt.direction - Direction of the bullet
 * @param {number} opt.speed - Speed of the bullet
 * @param {number} opt.size - Size of the bullet
 * @param {number} opt.damage - Damage caused by the bullet
 * @param {boolean} opt.piercing - Whether the bullet can pierce through enemies
 * @param {number} opt.lineWidth - Line width of the bullet
 * @param {string} opt.strokeStyle - Stroke style of the bullet
 * @constructor
 */
$.Bullet = function (opt) {
  for (var k in opt) {
    this[k] = opt[k];
  }
  this.enemiesHit = [];
  this.inView = 0;
  $.particleEmitters.push(
    new $.ParticleEmitter({
      x: this.x,
      y: this.y,
      count: 1,
      spawnRange: 1,
      friction: 0.75,
      minSpeed: 2,
      maxSpeed: 10,
      minDirection: 0,
      maxDirection: $.twopi,
      hue: 0,
      saturation: 0,
    })
  );
};

// Set Bullet.prototype to a new object created from $.Particle.prototype
$.Bullet.prototype = Object.create($.Particle.prototype);

/**
 * Update method for Bullet class
 * @param {number} i - Index of the bullet in the bullets array
 * @param {Object} ctxmg - The canvas rendering context
 * @param {Object} util - The utility object
 * @param {Object} enemies - The enemies array
 * @param {Object} particleEmitters - The particle emitters array
 * @param {number} dt - Time delta
 * @param {number} ww - Width of the game world
 * @param {number} wh - Height of the game world
 * @param {number} screen - The screen object
 * @param {number} cw - Width of the canvas
 * @param {number} ch - Height of the canvas
 * @param {number} twopi - Two Pi value
 */
$.Bullet.prototype.update = function (
  i,
  ctxmg,
  util,
  enemies,
  particleEmitters,
  dt,
  ww,
  wh,
  screen,
  cw,
  ch,
  twopi
) {
  // Apply Forces
  this.x += Math.cos(this.direction) * (this.speed * dt);
  this.y += Math.sin(this.direction) * (this.speed * dt);
  this.ex = this.x - Math.cos(this.direction) * this.size;
  this.ey = this.y - Math.sin(this.direction) * this.size;

  // Check Collisions
  var ei = enemies.length;
  while (ei--) {
    var enemy = enemies[ei];
    if (util.distance(this.x, this.y, enemy.x, enemy.y) <= enemy.radius) {
      if (this.enemiesHit.indexOf(enemy.index) == -1) {
        particleEmitters.push(
          new $.ParticleEmitter({
            x: this.x,
            y: this.y,
            count: Math.floor(util.rand(1, 4)),
            spawnRange: 0,
            friction: 0.85,
            minSpeed: 5,
            maxSpeed: 12,
            minDirection: this.direction - Math.PI - Math.PI / 5,
            maxDirection: this.direction - Math.PI + Math.PI / 5,
            hue: enemy.hue,
          })
        );

        this.enemiesHit.push(enemy.index);
        enemy.receiveDamage(ei, this.damage);

        if (this.enemiesHit.length > 3) {
          $.bullets.splice(i, 1);
        }
      }
      if (!this.piercing) {
        $.bullets.splice(i, 1);
      }
    }
  }

  // Lock Bounds
  if (!util.pointInRect(this.ex, this.ey, 0, 0, ww
