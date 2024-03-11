/**
 * Module that registers the starship!
 */
var Ship = (function() {
  const LIFTOFF_COOLDOWN = 120;
  const ALLOY_PER_HULL = 1;
  const ALLOY_PER_THRUSTER = 1;
  const BASE_HULL = 0;
  const BASE_THRUSTERS = 1;

  function createElement(tag, className, text) {
    const element = $(tag);
    if (className) element.addClass(className);
    if (text) element.text(text);
    return element;
  }

  function addEventListeners(element, eventName, eventHandler) {
    element.on(eventName, eventHandler);
  }

  function createButton(options) {
    const button = new Button.Button(options);
    button.appendTo(options.parent || 'div#shipPanel');
    return button;
  }

  function createLabel(key, value) {
    const rowKey = createElement('div', 'row_key', key);
    const rowVal = createElement('div', 'row_val', value);
    const clear = createElement('div', 'clear');
    const label = createElement('div', null, null);
    label.append(rowKey, rowVal, clear);
    return label;
  }

  function createLabels(labels) {
    return labels.map(label => createLabel(label.key, label.value));
  }

  function createLabelsAndAppend(parent, labels) {
    createLabels(labels).forEach(label => parent.append(label));
  }

  function createHullLabel() {
    return createLabel(_('hull:'), $SM.get('game.spaceShip.hull', 0));
  }

  function createThrustersLabel() {
    return createLabel(_('engine:'), $SM.get('game.spaceShip.thrusters', 0));
  }

  function reinforceHull() {
    const alloy = $SM.get('stores["alien alloy"]', true);
    if (alloy < ALLOY_PER_HULL) {
      Notifications.notify(Ship, _("not enough alien alloy"));
      return;
    }
    $SM.add('stores["alien alloy"]', -ALLOY_PER_HULL);
    $SM.add('game.spaceShip.hull', 1);
    if ($SM.get('game.spaceShip.hull') > 0) {
      Button.setDisabled($('#liftoffButton', Ship.panel), false);
    }
    $('#hullRow .row_val', Ship.panel).text($SM.get('game.spaceShip.hull'));
    AudioEngine.playSound(AudioLibrary.REINFORCE_HULL);
  }

  function upgradeEngine() {
    const alloy = $SM.get('stores["alien alloy"]', true);
    if (alloy < ALLOY_PER_THRUSTER) {
      Notifications.notify(Ship, _("not enough alien alloy"));
      return;
    }
    $SM.add('stores["alien alloy"]', -ALLOY_PER_THRUSTER);
    $SM.add('game.spaceShip.thrusters', 1);
    $('#engineRow .row_val', Ship.panel).text($SM.get('game.spaceShip.thrusters'));
    AudioEngine.playSound(AudioLibrary.UPGRADE_ENGINE);
  }

  function checkLiftOff() {
    if (!$SM.get('game.spaceShip.seenWarning')) {
      Events.startEvent({
        title: _('Ready to Leave?'),
        scenes: {
          'start': {
            text: [_("time to get out of this place. won't be coming back.")],
            buttons: {
              'fly': {
                text: _('lift off'),
                onChoose: function() {
                  $SM.set('game.spaceShip.seenWarning', true);
                  Ship.liftOff();
                },
                nextScene: 'end'
              },
              'wait': {
                text: _('linger'),
                onChoose: function() {
                  Button.clearCooldown($('#liftoffButton'));
                },
                nextScene: 'end'
              }
            }
          }
        }
      });
    } else {
      Ship.liftOff();
    }
  }

  function liftOff() {
    $('#outerSlider').animate({top: '700px'}, 300);
    Space.onArrival();
    Engine.activeModule = Space;
    AudioEngine.playSound(AudioLibrary.LIFT_OFF);
  }

  function init(options) {
    this.options = $.extend(this.options, options);

    if (!$SM.get('features.location.spaceShip')) {
      $SM.set('features.location.spaceShip', true);
      $SM.setM('game.spaceShip', {
        hull: BASE_HULL,
        thrusters: BASE_THRUSTERS
      });
    }

    this.tab = Header.addLocation(_("An Old Starship"), "ship", Ship);

    this.panel = $('<div>').attr('id', "shipPanel")
      .addClass('location')
      .appendTo('div#locationSlider');

    Engine.update
