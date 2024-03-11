/*==============================================================================
Init
==============================================================================*/
/**
 * Powerup constructor
 * @constructor
 * @param {object} opt - Options for the Powerup object.
 */
$.Powerup = function(opt) {
  // Initialize properties by copying the options object
  for (const [k, v] of Object.entries(opt)) {
    this[k] = v;
  }

  // Create a text object for the powerup title
  const text = $.text({
    ctx: $.ctxmg,
    x: 0,
    y: 0,
    text: this.title,
    hspacing: 1,
    vspacing: 0,
    halign: "top",
    valign: "left",
    scale: 1,
    snap: 0,
    render: 0,
  });

  // Set padding and calculate the dimensions of the powerup
  this.hpadding = 8;
  this.vpadding = 8;
  this.width = text.width + this.hpadding * 2;
  this.height = text.height + this.vpadding * 2;

  // Position the powerup and set its direction and speed
  this.x = this.x - this.width / 2;
  this.y = this.y - this.height / 2;
  this.direction = $.util.rand(0, $.twopi);
  this.speed = $.util.rand(0.5, 2);
};

/*==============================================================================
Update
==============================================================================*/
/**
 * Powerup prototype update method
 * @prototype
 * @param {number} i - Index of the Powerup object in the array.
 */
$.Powerup.prototype.update = function(i) {
  // Apply forces to move the powerup
  this.x += Math.cos(this.direction) * this.speed * $.dt;
  this.y += Math.sin(this.direction) * this.speed * $.dt;

  // Check if the powerup is within the game boundaries
  if (!$.util.rectInRect(this.x, this.y, this.width, this.height, 0, 0, $.ww, $.wh)) {
    $.powerups.splice(i, 1); // Remove the powerup if it's out of bounds
  }

  // Check for collision with the hero and apply effects
  if (
    $.hero.life > 0 &&
    $.util.arcIntersectingRect(
      $.hero.x,
      $.hero.y,
      $.hero.radius + 2,
      this.x,
      this.y,
      this.width,
      this.height
    )
  ) {
    $.audio.play("powerup"); // Play the powerup sound

    // Create a particle emitter and update the powerup counters
    $.particleEmitters.push(
      new $.ParticleEmitter({
        x: this.x + this.width / 2,
        y: this.y + this.height / 2,
        count: 15,
        spawnRange: 0,
        friction: 0.85,
        minSpeed: 2,
        maxSpeed: 15,
        minDirection: 0,
        maxDirection: $.twopi,
        hue: 0,
        saturation: 0,
      })
    );

    $.powerups.splice(i, 1); // Remove the powerup
    $.powerupsCollected++; // Increment the powerups collected counter
  }
};

/*==============================================================================
Render
==============================================================================*/
/**
 * Powerup prototype render method
 * @prototype
 * @param {number} i - Index of the Powerup object in the array.
 */
$.Powerup.prototype.render = function(i) {
  // Draw the powerup's background and border
  $.ctxmg.fillStyle = "#000";
  $.ctxmg.fillRect(this.x - 2, this.y - 2, this.width + 4, this.height + 4);
  $.ctxmg.fillStyle = "#555";
  $.ctxmg.fillRect(this.x - 1, this.y - 1, this.width + 2, this.height + 2);

  $.ctxmg.fillStyle = "#111";
  $.ctxmg.fillRect(this.x, this.y, this.width, this.height);

  // Draw the powerup's title
  $.ctxmg.beginPath();
  $.text({
    ctx: $.ctxmg,
    x: this.x + this.hpadding,
    y: this.y + this.vpadding + 1,
    text: this.title,
    hspacing: 1,
    vspacing: 0,
    halign: "top",
    valign: "left",
    scale: 1,
    snap: 0,
    render: true,
  });
  $.ctxmg.fillStyle = "#000";
  $.ctxmg.fill();

  $.ctxmg.beginPath();
  $.text({
    ctx: $.ctxmg,
    x: this.x + this.hpadding,
    y: this.y + this.vpadding,
    text: this.title,
    hspacing: 1,
    vspacing: 0,
    halign: "top",
    valign: "left",
    scale: 1,
    snap: 0,
    render: true,
  });
  $.ctxmg.fillStyle = `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`;
