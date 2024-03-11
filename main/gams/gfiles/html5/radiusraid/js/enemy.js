/*==============================================================================
Enemy Class
==============================================================================*/
class Enemy {
  constructor(opt) {
    // set always and optional
    Object.assign(this, opt);

    // set optional and defaults
    this.lightness = opt.lightness || 50;
    this.saturation = opt.saturation || 100;
    this.setup = opt.setup || function () {};
    this.death = opt.death || function () {};

    // set same for all objects
    this.index = $.indexGlobal++;
    this.inView = this.hitFlag = this.vx = this.vy = 0;
    this.lifeMax = opt.life;
    this.fillStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 0.1)`;
    this.strokeStyle = `hsla(${this.hue}, ${this.saturation}%, ${this.lightness}%, 1)`;

    // run setup
    this.setup();

    // adjust level offset difficulties
    if ($.levelDiffOffset > 0) {
      this.life += $.levelDiffOffset * 0.25;
      this.lifeMax = this.life;
      this.speed += Math.min($.hero.vmax, $.levelDiffOffset * 0.25);
      this.value += Math.floor($.levelDiffOffset * 5);
    }
  }

  /*==============================================================================
  Update
  ==============================================================================*/
  update(i) {
    /*==============================================================================
    Apply Behavior
    ==============================================================================*/
    this.behavior();

    /*==============================================================================
    Apply Forces
    ==============================================================================*/
    this.x += this.vx * $.dt;
    this.y += this.vy * $.dt;

    /*==============================================================================
    Lock Bounds
    ==============================================================================*/
    if (this.lockBounds && !$.util.arcInRect(this.x, this.y, this.radius + 10, 0, 0, $.ww, $.wh)) {
      $.enemies.splice(i, 1);
    }

    /*==============================================================================
    Update View
    ==============================================================================*/
    if ($.util.arcInRect(this.x, this.y, this.radius, -$.screen.x, -$.screen.y, $.cw, $.ch)) {
      this.inView = 1;
    } else {
      this.inView = 0;
    }
  }

  /*==============================================================================
  Receive Damage
  ==============================================================================*/
  receiveDamage(i, val) {
    if (this.inView) {
      $.audio.play('hit');
    }
    this.life -= val;
    this.hitFlag = 10;
    if (this.life <= 0) {
      if (this.inView) {
        $.explosions.push(
          new $.Explosion({
            x: this.x,
            y: this.y,
            radius: this.radius,
            hue: this.hue,
            saturation: this.saturation,
          })
        );
        $.particleEmitters.push(
          new $.ParticleEmitter({
            x: this.x,
            y: this.y,
            count: 10,
            spawnRange: this.radius,
            friction: 0.85,
            minSpeed: 5,
            maxSpeed: 20,
            minDirection: 0,
            maxDirection: $.twopi,
            hue: this.hue,
            saturation: this.saturation,
          })
        );
        $.textPops.push(
          new $.TextPop({
            x: this.x,
            y: this.y,
            value: Math.floor(this.value),
            hue: this.hue,
            saturation: this.saturation,
            lightness: 60,
          })
        );
        $.rumble.level = 6;
      }
      this.death();
      $.spawnPowerup(this.x, this.y);
      $.score += this.value;
      $.level.kills++;
      $.kills++;
      $.enemies.splice(i, 1);
    }
  }

  /*==============================================================================
  Render Health
  ==============================================================================*/
  renderHealth(i) {
    if (this.inView && this.life > 0 && this.life < this.lifeMax) {
      $.ctxmg.fillStyle = 'hsla(0, 0%, 0%, 0.75)';
      $.ctxmg.fillRect(
        this.x - this.radius,
        this.y - this.radius - 6,
        this.radius * 2,
        3
      );
      $.ctxmg.fillStyle = `hsla(${(this.life / this.lifeMax)} * 120, 100%, 50%, 0.75)`;
      $.ctxmg
