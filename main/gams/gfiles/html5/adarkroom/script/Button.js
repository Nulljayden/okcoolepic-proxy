/**
 * Button object for creating clickable buttons with cooldown and cost functionality.
 * @namespace
 */
var Button = (function() {
  // Constructor function for creating a new button object
  function Button(options) {
    // Initialize the cooldown and handler data properties based on the options
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

    // Create the button element with the given options
    var el = $('<div>')
      .attr('id', options.id || "BTN_" + Engine.getGuid())
      .addClass('button')
      .text(options.text || "button")
      .click(function() {
        if (!$(this).hasClass('disabled')) {
          // Apply cooldown and execute the handler when the button is clicked
          Button.cooldown(this);
          this.data_handler(this);
        }
      })
      .data("handler", this.data_handler)
      .data("remaining", 0)
      .data("cooldown", options.cooldown || 0);

    el.append($("<div>").addClass('cooldown'));

    // Apply any residual cooldown detected in the state
    Button.cooldown(el, 'state');

    // Add cost tooltip to the button if cost options are provided
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

    // Set the width of the button if provided in the options
    if (options.width) {
      el.css('width', options.width);
    }

    // Return the button element
    return el;
  }

  // Prototype methods for the button object
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
          start = $SM.get(id)[0];
          left = start - Engine.time;
          if (left > 0) {
            $SM.set(id, [left, Engine.time + left]);
          }
          break;
        default:
          start = Engine.time;
          left = cd;
          break;
      }
      btn.data('onCooldown', true);
      btn.data('start', start);
      btn.data('left', left);
      $SM.set(id, [start, start + left]);
      setTimeout(function(btn, id) {
        Button.cooldown(btn, id);
      }, 1000, btn, id);
    }
  };

  return Button;
})();
