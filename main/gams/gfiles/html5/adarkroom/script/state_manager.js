/**
 * StateManager module for handling game states.
 * @module StateManager
 */

const State = {};

class StateManager {

  /**
   * The maximum number of items that can be stored in a state.
   * @type {number}
   */
  static MAX_STORE = 99999999999999;

  /**
   * The categories of states.
   * @type {Array<string>}
   */
  static CATEGORIES = [
    'features',     // big features like buildings, location availability, unlocks, etc
    'stores',       // little stuff, items, weapons, etc
    'character',    // this is for player's character stats such as perks
    'income',
    'timers',
    'game',         // mostly location related: fire temp, workers, population, world map, etc
    'playStats',    // anything play related: play time, loads, etc
    'previous',     // prestige, score, trophies (in future), achievements (again, not yet), etc
    'outfit',      	// used to temporarily store the items to be taken on the path
    'config',
    'wait',			// mysterious wanderers are coming back
    'cooldown'      // residual values for cooldown buttons
  ];

  /**
   * Initialize the StateManager.
   */
  static init() {
    //create categories
    StateManager.CATEGORIES.forEach(category => {
      if (!State[category]) State[category] = {};
    });

    //subscribe to stateUpdates
    $.Dispatch('stateUpdate').subscribe(StateManager.handleStateUpdates);
  }

  /**
   * Create a state and its parents if they don't exist.
   * @param {string} stateName - The name of the state.
   * @param {*} value - The value of the state.
   * @returns {object} The object that represents the state.
   */
  static createState(stateName, value) {
    const words = stateName.split(/[.\[\]'"]+/);
    let obj = State;
    for (let i = 0; i < words.length - 1; i++) {
      const w = words[i];
      if (!obj[w]) obj[w] = {};
      obj = obj[w];
    }
    obj[words[words.length - 1]] = value;
    return obj;
  }

  /**
   * Set a single state.
   * @param {string} stateName - The name of the state.
   * @param {*} value - The value of the state.
   * @param {boolean} noEvent - If true, the state update event won't trigger.
   */
  static set(stateName, value, noEvent = false) {
    if (!stateName || typeof stateName !== 'string') {
      console.error('Invalid state name:', stateName);
      return;
    }

    const fullPath = StateManager.buildPath(stateName);

    //make sure the value isn't over the engine maximum
    if (typeof value === 'number' && value > StateManager.MAX_STORE) {
      console.warn(`Value of state ${stateName} is too large. Truncated to ${StateManager.MAX_STORE}.`);
      value = StateManager.MAX_STORE;
    }

    try {
      const obj = StateManager.getObject(fullPath);
      obj[words[words.length - 1]] = value;
    } catch (e) {
      //parent doesn't exist, so make parent
      StateManager.createState(stateName, value);
    }

    //stores values can not be negative
    if (stateName.startsWith('stores') && StateManager.get(stateName, true) < 0) {
      StateManager.set(stateName, 0);
      console.warn(`State ${stateName} can not be negative. Set to 0 instead.`);
    }

    if (!noEvent) {
      Engine.saveGame();
      StateManager.fireUpdate(stateName);
    }
  }

  /**
   * Sets a list of states.
   * @param {string} parentName - The name of the parent state.
   * @
