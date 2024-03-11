/**
 * Module that handles the random event system
 */
const Events = {
  // The range for the time between events, in minutes
  _EVENT_TIME_RANGE: [3, 6], // range, in minutes
  // Fade duration for the event panel, in milliseconds
  _PANEL_FADE: 200,
  // Fight speed, in milliseconds
  _FIGHT_SPEED: 100,
  // Cooldown for eating, in seconds
  _EAT_COOLDOWN: 5,
  // Cooldown for using medicine, in seconds
  _MEDS_COOLDOWN: 7,
  // Cooldown for leaving, in seconds
  _LEAVE_COOLDOWN: 1,
  // Duration of stun effect, in milliseconds
  STUN_DURATION: 4000,
  // Interval for blinking, set to false to disable
  BLINK_INTERVAL: false,

  /**
   * Initializes the event system by building the event pool, scheduling the next event,
   * subscribing to state updates, and initializing delayed events.
   */
  init() {
    // Build the Event Pool
    const EventPool = [].concat(Events.Global, Events.Room, Events.Outside, Events.Marketing);
    Events.eventStack = [];
    Events.scheduleNextEvent();

    // Subscribe to state updates
    $.Dispatch('stateUpdate').subscribe(Events.handleStateUpdates);

    // Check for stored delayed events
    Events.initDelay();
  },

  // ... (rest of the code)

  /**
   * Creates a new div with the specified class name.
   *
   * @param {string} className - The class name for the new div.
   * @return {jQuery} The new div element.
   */
  createDivWithClass(className) {
    return $('<div>').attr('class', className);
  },

  /**
   * Creates a new div with the specified text and class name.
   *
   * @param {string} text - The text to put in the new div.
   * @param {string} className - The class name for the new div.
   * @return {jQuery} The new div element.
   */
  createDivWithText(text, className) {
    return $('<div>').text(text).addClass(className);
  },

  /**
   * Creates a new fighter div with the specified character, health, and maximum health.
   *
   * @param {string} chara - The character to display in the fighter div.
   * @param {number} hp - The current health of the fighter.
   * @param {number} maxhp - The maximum health of the fighter.
   * @return {jQuery} The new fighter div element.
   */
  createFighterDiv(chara, hp, maxhp) {
    const fighter = $('<div>').addClass('fighter').text(_(chara))
                                .data('hp', hp)
                                .data('maxHp', maxhp)
                                .data('refname', chara);
    // ... (rest of the method)
  },

  // ... (rest of the code)
};
