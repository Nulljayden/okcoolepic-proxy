/*==============================================================================
Explosion
==============================================================================*/
$.Explosion = function(options) {
  for (var key in options) {
    if (options.hasOwnProperty(key)) {
      this[key] = options[key];
    }
  }

  this.tick = 0;
  this.tickMax = 20;

  if ($.slow) {
    $.audio.play('explosionAlt');
  } else {
    $.audio.play('explosion');
  }
};

/*==============================================================================
Update
==============================================================================*/
$.Explosion.prototype.update = function(index) {
  if (this.tick >= this.tickMax) {
    $.explosions.splice(index, 1);
  } else {
    this.tick += $.dt;
  }
};

/*==============================================================================
Render
================================
