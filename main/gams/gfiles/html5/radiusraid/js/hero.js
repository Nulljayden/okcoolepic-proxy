/**
 * Hero class
 * @constructor
 */
function Hero() {
  // Position
  this.x = $.ww / 2;
  this.y = $.wh / 2;

  // Velocity
  this.vx = 0;
  this.vy = 0;
  this.vmax = 6;

  // Direction
  this.direction = 0;
  this.accel = 0.5;

  // Radius and life
  this.radius = 10;
  this.life = 1;

  // Taking damage
  this.takingDamage = 0;

  // Fill style
  this.fillStyle = '#fff';

  // Weapon
  this.weapon = {
    fireRate: 5,
    fireRateTick: 0,
    spread: 0.3,
    count: 1,
    bullet: {
      size: 15,
      lineWidth: 2,
      damage: 1,
      speed: 10,
      piercing: 0,
      strokeStyle: '#fff'
    },
    fireFlag: 0
  };
}

/**
 * Check if a key is down
 * @param {string} key - The key to check
 * @returns {boolean} True if the key is down, false otherwise
 */
Hero.prototype.isKeyDown = function(key) {
  return $.keys.state[key];
};

/**
 * Apply forces to the hero
 */
Hero.prototype.applyForces = function() {
  const force = this.accel * $.dt;

  if (this.isKeyDown('up')) {
    this.vy -= force;
    if (this.vy < -this.vmax) {
      this.vy = -this.vmax;
    }
  }

  if (this.isKeyDown('down')) {
    this.vy += force;
    if (this.vy > this.vmax) {
      this.vy = this.vmax;
    }
  }

  if (this.isKeyDown('left')) {
    this.vx -= force;
    if (this.vx < -this.vmax) {
      this.vx = -this.vmax;
    }
  }

  if (this.isKeyDown('right')) {
    this.vx += force;
    if (this.vx > this.vmax) {
      this.vx = this.vmax;
    }
  }

  this.vy *= 0.9;
  this.vx *= 0.9;

  this.x += this.vx * $.dt;
  this.y += this.vy * $.dt;
};

/**
 * Lock the hero bounds
 */
Hero.prototype.lockBounds = function() {
  if (this.x > $.ww - this.radius) {
    this.x = $.ww - this.radius;
  }
  if (this.x < this.radius) {
    this.x = this.radius;
  }
  if (this.y > $.wh - this.radius) {
    this.y = $.wh - this.radius;
  }
  if (this.y < this.radius) {
    this.y = this.radius;
  }
};

/**
 * Update the hero direction
 */
Hero.prototype.updateDirection = function() {
  const dx = $.mouse.x - this.x;
  const dy = $.mouse.y - this.y;
  this.direction = Math.atan2(dy, dx);
};

/**
 * Fire the hero weapon
 */
Hero.prototype.fireWeapon = function() {
  if (this.weapon.fireRateTick < this.weapon.fireRate) {
    this.weapon.fireRateTick += $.dt;
  } else {
    if ($.autofire || (!$.autofire && $.mouse.down)) {
      $.audio.play('shoot');
      if (
        $.powerupTimers[2] > 0 ||
        $.powerupTimers[3] > 0 ||
        $.powerupTimers[4] > 0
      ) {
        $.audio.play('shootAlt');
      }

      this.weapon.fireRateTick =
        this.weapon.fireRateTick - this.weapon.fireRate;
      this.weapon.fireFlag = 6;

      const spreadStart = -this.weapon.spread / 2;
      const spreadStep = this.weapon.spread / (this.weapon.count - 1);

      const gunX =
        this.x +
        Math.cos(this.direction) * (this.radius + this.weapon.bullet.size);
      const gunY =
        this.y +
        Math.sin(this.direction) * (this.radius + this.weapon.bullet.size);

      for (let i = 0; i < this.weapon.count; i++) {
        $.bulletsFired++;
        const color =
          this.weapon.bullet.strokeStyle ||
          `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;

        $.bullets.push(
          new $.Bullet({
            x: gunX,
            y: gunY,
            speed: this.weapon.bullet.speed,
            direction: this.
