/*==============================================================================
Init
==============================================================================*/
/**
 * @constructor
 * @param {object} opt - The options object.
 */
$.LevelPop = function(opt) {
  for (var k in opt) {
    if (opt.hasOwnProperty(k)) {
      this[k] = opt[k];
    }
  }

  this.x = $.cw - 20;
  this.y = $.ch - 20;
  this.tick = 0;
  this.tickMax = 240;
  this.baseAlpha = 0.2;

  if ($.tick !== undefined && $.tick != 0) {
    $.audio.play('levelup');
  }
};

/*==============================================================================
Update
==============================================================================*/
/**
 * @param {number} i - The index of the LevelPop object in the array.
 */
$.LevelPop.prototype.update = function(i) {
  if (this.tick >= this.tickMax) {
    $.levelPops.splice(i, 1);
  } else {
    this.tick += $.dt;
  }
};

/*==============================================================================
Render
==============================================================================*/
/**
 * @param {number} i - The index of the LevelPop object in the array.
 */
$.LevelPop.prototype.render = function(i) {
  $.ctxmg.beginPath();

  try {
    $.text({
      ctx: $.ctxmg,
      x: this.x,
      y: this.y,
      text: $.util.pad(this.level, 2),
      hspacing: 3,
      vspacing: 0,
      halign: 'right',
      valign: 'bottom',
      scale: 12,
      snap: 1,
      render: 1
    });
  } catch (e) {
    console.error('Error rendering LevelPop text:', e);
  }

  var alpha = (this.tick / this.tickMax) * this.baseAlpha;
  alpha = Math.min(1, Math.max(0, alpha));

  $.ctxmg.fillStyle = 'hsla(0, 0%, 100%, ' + alpha + ')';
  $.ctx
