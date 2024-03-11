/**
 * Button object for creating clickable buttons with cooldown and cost functionality.
 * @namespace
 */
var Button = (function() {
  /**
   * Creates a new button object.
   * @constructor
   * @param {Object} options - The options for the button.
   * @param {number} [options.cooldown] - The cooldown time in seconds.
   * @param {function} [options.click] - The callback function to be executed on button click.
   * @param {Object} [options.cost] - The cost of clicking the button.
   * @param {string} [options.id] - The ID of the button.
   * @param {string} [options.text] - The text of the button.
   * @param {string} [options.ttPos] - The position of the cost tooltip.
   */
  function Button(options) {
    if (typeof options.cooldown === 'number') {
      this.data_cooldown = options.cooldown;
    }
    this.data_remaining = 0;
    if (typeof options.click === 'function') {
      this.data_handler = options.click;
    } else {
      this.data_handler = function() {
        Engine.log("click");
      };
    }

    var el = $('<div>')
      .attr('id', options.id || "BTN_" + Engine.getGuid())
      .addClass('button')
      .text(options.text || "button")
      .click(function() {
        if (!$(this).hasClass('disabled')) {
          Button.cooldown(this);
          this.data_handler(this);
        }
      })
      .data("handler", this.data_handler)
      .data("remaining", 0)
      .data("cooldown", options.cooldown || 0);

    el.append($("<div>").addClass('cooldown'));

    // waiting for expiry of residual cooldown detected in state
    Button.cooldown(el, 'state');

    if (options.cost) {
      var costTooltip = $('<div>').addClass('tooltip ' + (options.ttPos || "bottom right"));
      for (var k in options.cost) {
        costTooltip.append($("<div>").addClass('row_key').text(k));
        costTooltip.append($("<div>").addClass('row_val').text(options.cost[k]));
      }
      if (costTooltip.children().length > 0) {
        costTooltip.appendTo(el);
      }
    }

    if (options.width) {
      el.css('width', options.width);
    }

    return el;
  }

  Button.prototype.disable = function(disabled) {
    if (disabled !== undefined) {
      Button.setDisabled(this, disabled);
    } else {
      Button.setDisabled(this, !Button.isDisabled(this));
    }
  };

  Button.prototype.isOnCooldown = function() {
    return Button.isOnCooldown(this);
  };

  /**
   * Sets the disabled state of the button.
   * @param {jQuery} btn - The button element.
   * @param {boolean} disabled - The disabled state.
   */
  Button.setDisabled = function(btn, disabled) {
    if (btn) {
      if (!disabled && !btn.data('onCooldown')) {
        btn.removeClass('disabled');
      } else if (disabled) {
        btn.addClass('disabled');
      }
      btn.data('disabled', disabled);
    }
  };

  /**
   * Checks if the button is disabled.
   * @param {jQuery} btn - The button element.
   * @returns {boolean} The disabled state.
   */
  Button.isDisabled = function(btn) {
    if (btn) {
      return btn.data('disabled') === true;
    }
    return false;
  };

  /**
   * Applies cooldown to the button.
   * @param {jQuery|number} btn - The button element or cooldown time.
   * @param {string} [option] - The cooldown option.
   */
  Button.cooldown = function(btn, option) {
    var cd = btn;
    var id = 'cooldown.' + (typeof btn === 'number' ? 'global' : btn.attr('id'));
    if (typeof btn === 'number') {
      cd = btn;
      btn = $('[id="' + id.slice(10) + '"]');
    }
    if (cd > 0) {
      if (typeof option === 'number') {
        cd = option;
      }
      // param "start" takes value from cooldown time if not specified
      var start, left;
      switch (option) {
        // a switch will allow for several uses of cooldown function
        case 'state':
          if (!$SM.get(id)) {
            return;
          }
          start =
