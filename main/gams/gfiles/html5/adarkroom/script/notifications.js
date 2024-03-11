/**
 * Notifications module that registers the notification box and handles messages.
 */
var Notifications = {

  /**
   * Initializes the notifications module with the given options.
   * @param {object} options - The configuration options for the notifications module.
   */
  init: function(options) {
    this.options = $.extend(
      this.options, // Extend the existing options with the new ones
      options
    );

    // Create the notifications box
    const elem = $('<div>').attr({
      id: 'notifications',
      className: 'notifications'
    });

    // Create the transparency gradient
    $('<div>').attr('id', 'notifyGradient').appendTo(elem);

    elem.appendTo('div#wrapper');
  },

  /**
   * Options for the notifications module.
   * @type {object}
   */
  options: {},

  /**
   * Notifications element.
   * @type {jQuery}
   */
  elem: null,

  /**
   * A queue of notifications for each module.
   * @type {object}
   */
  notifyQueue: {},

  /**
   * Displays a notification message to the player.
   * @param {string|module} module - The name of the module or the message to display.
   * @param {string} [text] - The notification text.
   * @param {boolean} [noQueue] - If true, the message will be displayed immediately without queuing.
   */
  notify: function(module, text, noQueue) {
    if (typeof text === 'undefined') return;

    if (text.slice(-1) !== ".") text += ".";

    if (module !== null && Engine.activeModule !== module) {
      if (!noQueue) {
        if (typeof this.notifyQueue[module] === 'undefined') {
          this.notifyQueue[module] = [];
        }
        this.notifyQueue[module].push(text);
      }
    } else {
      Notifications.printMessage(text);
    }

    Engine.saveGame();
  },

  /**
   * Clears hidden notifications.
   */
  clearHidden: function() {
    // To fix some memory usage issues, we clear notifications that have been hidden.

    // We use position().top here, because we know that the parent will be the same, so the position will be the same.
    const bottom = $('#notifyGradient').position().top + $('#notifyGradient').outerHeight(true);

    $('.notification').each(function() {

      if ($(this).position().top > bottom) {
        $(this).remove();
      }

    });
  },

  /**
   * Displays a message in the notification box.
   * @param {string} t - The notification text.
   */
  printMessage: function(t) {
    const text = $('<div>').addClass('notification').css('opacity', '0').text(t).prependTo('div#notifications');
    text.animate({
      opacity: 1
    }, 500, 'linear', function() {
      // Do this every time we add a new message, this way we never have a large backlog to iterate through. Keeps things faster.
      Notifications.clear
